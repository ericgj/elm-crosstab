SOURCES = $(shell find src/ -type f -name '*.elm')
EXAMPLE_SOURCES = $(shell find examples/ -type f -name '*.elm')

build: $(SOURCES)
	elm make

build-examples: $(EXAMPLE_SOURCES)
	cd examples && elm make Main.elm --output=elm.js

format: $(SOURCES)
	elm-format $< --yes

format-examples: $(EXAMPLE_SOURCES)
	elm-format $< --yes

.PHONY: build build-examples format format-examples

