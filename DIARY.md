# Crosstab

A library for accessing cross-tabulated data

_16 Apr 2023_

## View state reconsidered

I am slowly moving towards a view where Query is put into state. Part of the
issue I had before is that Query was only partially edited by the Display.Table
view. I couldn't see how the sorting UI should work. But I have an idea now.

I think that it may be useful to split out the view into a View.Query
module, with view functions like:

    viewRowDimensions: Config a msg -> List String -> Query a -> Html msg

### Notes:

\1.
Note the `List String`, not `Window String`, for the dimension labels. `Window` 
is derived from this list and the Query state. So I think we can just store 
`List String` in Display.Table now that Query is in scope of the view. I 
think part of the complexity of the current dimension controls is due to this 
implicit shared state, spread across modules.


\2. 
As with sortable-table, the view could directly update the query state, and
the parent (e.g. View.Selectable) update just deal with it as

    New Query q ->
        State { s | query = q }

But having said that, I am not sure how reusable these views are. They are a
bit closely tied to the Display.Table view that integrates them into a 
particular place in the table. But actually I have in mind a more generic
view that would work ok in different places. So maybe this would work.


\3.
If the Display.Table views (e.g. View.Selectable) hold Query in state, then
essentially they could be passed in the Crosstab and run the query themselves.
In this division of labor, app code handles getting the data and configuring 
the Crosstab; library code handles running the Crosstab.query and allowing the 
user to update the Query parameters.

(Eventually this could be pushed back even further, theoretically speaking,
as the library provides a UI for configuring the Crosstab (i.e. Crosstab.Spec,
Crosstab.Accum) -- but that is quite a bit trickier.)



_8 Apr 2023_

## View state

Following the first draft of a view component for Crosstab, the question that
has come into focus is what "state" does the view module have? Everything
is either derived, or static config. The closest to state that the module could
be responsible for is the Query (controlling the dimensions and their sorting).
But the Crosstab itself should definitely not be put into state here (or 
maybe anywhere). And it's a bit weird we are editing the query but the 
parent module is where the query is used to generate the data to pass back into
this view.

I see two basic options:

1) State is the Query. We have Msgs like

    type Msg
        = IncrRowDim
        | DecrRowDim
        | SortColumnDims SortBy SortDir

which update query state. And the parent module Html.map's it. But the 
implementation is basically in Crosstab methods for updating Query. Which 
brings me to the second option:

2) the view is stateless, you pass in the Display.Table with config. Let's 
assume Query is moved to its own module Crosstab.Query. The view renders to
`Html Crosstab.Query.Msg`, which is dealt with in the parent, which 'owns' the 
query.

    type Msg
        = UpdateQuery Crosstab.Query.Msg

    update : Msg -> Model -> Model
    update msg model =
        case msg in
            UpdateQuery queryMsg ->
                { model | query = Crosstab.Query.update queryMsg model.query }

    view : Model -> Html Msg
    view model =
        let
            table = Crosstab.query model.query model.crosstab
        in
        div [] [Crosstab.Html.view config table |> Html.map UpdateQuery]


It may be however that the Display.Table view should be able to do more than 
throw Query-update messages. For example, clicking on a cell or row or column
in the view may cause a list of selected source records to update (outside
the table). In this case, perhaps the Display.Table view *does* need some
state: the 'current selection'. But it *doesn't* need Query in its state; you
can still ultimately unpack a Crosstab.Query.Msg and deal with it in the parent.


## Values in the view

There's a type problem and a UI problem that somewhat overlap here. The idea
was that value columns would be derived from crosstab values like this:

    List (String, a -> Html msg)

Meaning the parent would predefine rendering of value columns, including 
handling UI interaction in the context of its own update (msg). However if
the Display.Table view has its own state, it's going to render to Html Msg,
ie, in the context of its own update (Msg). 

The UI problem that this reflects (and prevents) is that you can't have both
the Display.Table view and the parent defining user interactions. I think
the way I've dealt with this before is to have the value columns render to
`Html Never` -- no interactions allowed from the parent -- and then
`Html.map (always NoOp)` or some such.

Otherwise if you do want to allow the parent to define interactions too, I
think you can inject a `(msg -> Msg)` -- very confusing but basically this 
would be an ad-hoc form of `OutMsg`. 

    -- parent msg type
    type Msg
        = DisplayTableMsg Display.Table.Msg

    -- in parent view
    Display.Table.view [("value", renderValue)] table

    -- in parent update
    case msg of
        DisplayTableMsg subMsg ->
            case subMsg of
                Display.Table.OutMsg innerMsg ->
                    update innerMsg model
                _ ->
                    { model | table = Display.Table.update subMsg model.table }
                        

    -- Display.Table msg type, note the type parameter
    type Msg parent
        = OutMsg parent

    -- Display.Table view
    view : List (String, a -> Html parent) -> Display.Table a -> Html (Msg parent)
    view vcols table =
        -- when vcols are rendered
        fn a |> Html.map OutMsg


I think at least in this case, but in many other cases as well, the UI is 
clearer if it's just one or the other handling interaction -- not both. So
you might have a stateful component -- SelectableTable -- and a separate
stateless component where the value columns define their own interactions
in the context of the parent. But to be honest, the concept of each column
defining its own interactions seems less useful.


