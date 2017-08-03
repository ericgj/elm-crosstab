
(function() {
'use strict';

function F2(fun)
{
  function wrapper(a) { return function(b) { return fun(a,b); }; }
  wrapper.arity = 2;
  wrapper.func = fun;
  return wrapper;
}

function F3(fun)
{
  function wrapper(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  }
  wrapper.arity = 3;
  wrapper.func = fun;
  return wrapper;
}

function F4(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  }
  wrapper.arity = 4;
  wrapper.func = fun;
  return wrapper;
}

function F5(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  }
  wrapper.arity = 5;
  wrapper.func = fun;
  return wrapper;
}

function F6(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  }
  wrapper.arity = 6;
  wrapper.func = fun;
  return wrapper;
}

function F7(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  }
  wrapper.arity = 7;
  wrapper.func = fun;
  return wrapper;
}

function F8(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  }
  wrapper.arity = 8;
  wrapper.func = fun;
  return wrapper;
}

function F9(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  }
  wrapper.arity = 9;
  wrapper.func = fun;
  return wrapper;
}

function A2(fun, a, b)
{
  return fun.arity === 2
    ? fun.func(a, b)
    : fun(a)(b);
}
function A3(fun, a, b, c)
{
  return fun.arity === 3
    ? fun.func(a, b, c)
    : fun(a)(b)(c);
}
function A4(fun, a, b, c, d)
{
  return fun.arity === 4
    ? fun.func(a, b, c, d)
    : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e)
{
  return fun.arity === 5
    ? fun.func(a, b, c, d, e)
    : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f)
{
  return fun.arity === 6
    ? fun.func(a, b, c, d, e, f)
    : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g)
{
  return fun.arity === 7
    ? fun.func(a, b, c, d, e, f, g)
    : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h)
{
  return fun.arity === 8
    ? fun.func(a, b, c, d, e, f, g, h)
    : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i)
{
  return fun.arity === 9
    ? fun.func(a, b, c, d, e, f, g, h, i)
    : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

var _elm_lang$lazy$Native_Lazy = function() {

function memoize(thunk)
{
    var value;
    var isForced = false;
    return function(tuple0) {
        if (!isForced) {
            value = thunk(tuple0);
            isForced = true;
        }
        return value;
    };
}

return {
    memoize: memoize
};

}();

//import Native.Utils //

var _elm_lang$core$Native_Basics = function() {

function div(a, b)
{
	return (a / b) | 0;
}
function rem(a, b)
{
	return a % b;
}
function mod(a, b)
{
	if (b === 0)
	{
		throw new Error('Cannot perform mod 0. Division by zero error.');
	}
	var r = a % b;
	var m = a === 0 ? 0 : (b > 0 ? (a >= 0 ? r : r + b) : -mod(-a, -b));

	return m === b ? 0 : m;
}
function logBase(base, n)
{
	return Math.log(n) / Math.log(base);
}
function negate(n)
{
	return -n;
}
function abs(n)
{
	return n < 0 ? -n : n;
}

function min(a, b)
{
	return _elm_lang$core$Native_Utils.cmp(a, b) < 0 ? a : b;
}
function max(a, b)
{
	return _elm_lang$core$Native_Utils.cmp(a, b) > 0 ? a : b;
}
function clamp(lo, hi, n)
{
	return _elm_lang$core$Native_Utils.cmp(n, lo) < 0
		? lo
		: _elm_lang$core$Native_Utils.cmp(n, hi) > 0
			? hi
			: n;
}

var ord = ['LT', 'EQ', 'GT'];

function compare(x, y)
{
	return { ctor: ord[_elm_lang$core$Native_Utils.cmp(x, y) + 1] };
}

function xor(a, b)
{
	return a !== b;
}
function not(b)
{
	return !b;
}
function isInfinite(n)
{
	return n === Infinity || n === -Infinity;
}

function truncate(n)
{
	return n | 0;
}

function degrees(d)
{
	return d * Math.PI / 180;
}
function turns(t)
{
	return 2 * Math.PI * t;
}
function fromPolar(point)
{
	var r = point._0;
	var t = point._1;
	return _elm_lang$core$Native_Utils.Tuple2(r * Math.cos(t), r * Math.sin(t));
}
function toPolar(point)
{
	var x = point._0;
	var y = point._1;
	return _elm_lang$core$Native_Utils.Tuple2(Math.sqrt(x * x + y * y), Math.atan2(y, x));
}

return {
	div: F2(div),
	rem: F2(rem),
	mod: F2(mod),

	pi: Math.PI,
	e: Math.E,
	cos: Math.cos,
	sin: Math.sin,
	tan: Math.tan,
	acos: Math.acos,
	asin: Math.asin,
	atan: Math.atan,
	atan2: F2(Math.atan2),

	degrees: degrees,
	turns: turns,
	fromPolar: fromPolar,
	toPolar: toPolar,

	sqrt: Math.sqrt,
	logBase: F2(logBase),
	negate: negate,
	abs: abs,
	min: F2(min),
	max: F2(max),
	clamp: F3(clamp),
	compare: F2(compare),

	xor: F2(xor),
	not: not,

	truncate: truncate,
	ceiling: Math.ceil,
	floor: Math.floor,
	round: Math.round,
	toFloat: function(x) { return x; },
	isNaN: isNaN,
	isInfinite: isInfinite
};

}();
//import //

var _elm_lang$core$Native_Utils = function() {

// COMPARISONS

function eq(x, y)
{
	var stack = [];
	var isEqual = eqHelp(x, y, 0, stack);
	var pair;
	while (isEqual && (pair = stack.pop()))
	{
		isEqual = eqHelp(pair.x, pair.y, 0, stack);
	}
	return isEqual;
}


function eqHelp(x, y, depth, stack)
{
	if (depth > 100)
	{
		stack.push({ x: x, y: y });
		return true;
	}

	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object')
	{
		if (typeof x === 'function')
		{
			throw new Error(
				'Trying to use `(==)` on functions. There is no way to know if functions are "the same" in the Elm sense.'
				+ ' Read more about this at http://package.elm-lang.org/packages/elm-lang/core/latest/Basics#=='
				+ ' which describes why it is this way and what the better version will look like.'
			);
		}
		return false;
	}

	if (x === null || y === null)
	{
		return false
	}

	if (x instanceof Date)
	{
		return x.getTime() === y.getTime();
	}

	if (!('ctor' in x))
	{
		for (var key in x)
		{
			if (!eqHelp(x[key], y[key], depth + 1, stack))
			{
				return false;
			}
		}
		return true;
	}

	// convert Dicts and Sets to lists
	if (x.ctor === 'RBNode_elm_builtin' || x.ctor === 'RBEmpty_elm_builtin')
	{
		x = _elm_lang$core$Dict$toList(x);
		y = _elm_lang$core$Dict$toList(y);
	}
	if (x.ctor === 'Set_elm_builtin')
	{
		x = _elm_lang$core$Set$toList(x);
		y = _elm_lang$core$Set$toList(y);
	}

	// check if lists are equal without recursion
	if (x.ctor === '::')
	{
		var a = x;
		var b = y;
		while (a.ctor === '::' && b.ctor === '::')
		{
			if (!eqHelp(a._0, b._0, depth + 1, stack))
			{
				return false;
			}
			a = a._1;
			b = b._1;
		}
		return a.ctor === b.ctor;
	}

	// check if Arrays are equal
	if (x.ctor === '_Array')
	{
		var xs = _elm_lang$core$Native_Array.toJSArray(x);
		var ys = _elm_lang$core$Native_Array.toJSArray(y);
		if (xs.length !== ys.length)
		{
			return false;
		}
		for (var i = 0; i < xs.length; i++)
		{
			if (!eqHelp(xs[i], ys[i], depth + 1, stack))
			{
				return false;
			}
		}
		return true;
	}

	if (!eqHelp(x.ctor, y.ctor, depth + 1, stack))
	{
		return false;
	}

	for (var key in x)
	{
		if (!eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

var LT = -1, EQ = 0, GT = 1;

function cmp(x, y)
{
	if (typeof x !== 'object')
	{
		return x === y ? EQ : x < y ? LT : GT;
	}

	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? EQ : a < b ? LT : GT;
	}

	if (x.ctor === '::' || x.ctor === '[]')
	{
		while (x.ctor === '::' && y.ctor === '::')
		{
			var ord = cmp(x._0, y._0);
			if (ord !== EQ)
			{
				return ord;
			}
			x = x._1;
			y = y._1;
		}
		return x.ctor === y.ctor ? EQ : x.ctor === '[]' ? LT : GT;
	}

	if (x.ctor.slice(0, 6) === '_Tuple')
	{
		var ord;
		var n = x.ctor.slice(6) - 0;
		var err = 'cannot compare tuples with more than 6 elements.';
		if (n === 0) return EQ;
		if (n >= 1) { ord = cmp(x._0, y._0); if (ord !== EQ) return ord;
		if (n >= 2) { ord = cmp(x._1, y._1); if (ord !== EQ) return ord;
		if (n >= 3) { ord = cmp(x._2, y._2); if (ord !== EQ) return ord;
		if (n >= 4) { ord = cmp(x._3, y._3); if (ord !== EQ) return ord;
		if (n >= 5) { ord = cmp(x._4, y._4); if (ord !== EQ) return ord;
		if (n >= 6) { ord = cmp(x._5, y._5); if (ord !== EQ) return ord;
		if (n >= 7) throw new Error('Comparison error: ' + err); } } } } } }
		return EQ;
	}

	throw new Error(
		'Comparison error: comparison is only defined on ints, '
		+ 'floats, times, chars, strings, lists of comparable values, '
		+ 'and tuples of comparable values.'
	);
}


// COMMON VALUES

var Tuple0 = {
	ctor: '_Tuple0'
};

function Tuple2(x, y)
{
	return {
		ctor: '_Tuple2',
		_0: x,
		_1: y
	};
}

function chr(c)
{
	return new String(c);
}


// GUID

var count = 0;
function guid(_)
{
	return count++;
}


// RECORDS

function update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


//// LIST STUFF ////

var Nil = { ctor: '[]' };

function Cons(hd, tl)
{
	return {
		ctor: '::',
		_0: hd,
		_1: tl
	};
}

function append(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (xs.ctor === '[]')
	{
		return ys;
	}
	var root = Cons(xs._0, Nil);
	var curr = root;
	xs = xs._1;
	while (xs.ctor !== '[]')
	{
		curr._1 = Cons(xs._0, Nil);
		xs = xs._1;
		curr = curr._1;
	}
	curr._1 = ys;
	return root;
}


// CRASHES

function crash(moduleName, region)
{
	return function(message) {
		throw new Error(
			'Ran into a `Debug.crash` in module `' + moduleName + '` ' + regionToString(region) + '\n'
			+ 'The message provided by the code author is:\n\n    '
			+ message
		);
	};
}

function crashCase(moduleName, region, value)
{
	return function(message) {
		throw new Error(
			'Ran into a `Debug.crash` in module `' + moduleName + '`\n\n'
			+ 'This was caused by the `case` expression ' + regionToString(region) + '.\n'
			+ 'One of the branches ended with a crash and the following value got through:\n\n    ' + toString(value) + '\n\n'
			+ 'The message provided by the code author is:\n\n    '
			+ message
		);
	};
}

function regionToString(region)
{
	if (region.start.line == region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'between lines ' + region.start.line + ' and ' + region.end.line;
}


// TO STRING

function toString(v)
{
	var type = typeof v;
	if (type === 'function')
	{
		return '<function>';
	}

	if (type === 'boolean')
	{
		return v ? 'True' : 'False';
	}

	if (type === 'number')
	{
		return v + '';
	}

	if (v instanceof String)
	{
		return '\'' + addSlashes(v, true) + '\'';
	}

	if (type === 'string')
	{
		return '"' + addSlashes(v, false) + '"';
	}

	if (v === null)
	{
		return 'null';
	}

	if (type === 'object' && 'ctor' in v)
	{
		var ctorStarter = v.ctor.substring(0, 5);

		if (ctorStarter === '_Tupl')
		{
			var output = [];
			for (var k in v)
			{
				if (k === 'ctor') continue;
				output.push(toString(v[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (ctorStarter === '_Task')
		{
			return '<task>'
		}

		if (v.ctor === '_Array')
		{
			var list = _elm_lang$core$Array$toList(v);
			return 'Array.fromList ' + toString(list);
		}

		if (v.ctor === '<decoder>')
		{
			return '<decoder>';
		}

		if (v.ctor === '_Process')
		{
			return '<process:' + v.id + '>';
		}

		if (v.ctor === '::')
		{
			var output = '[' + toString(v._0);
			v = v._1;
			while (v.ctor === '::')
			{
				output += ',' + toString(v._0);
				v = v._1;
			}
			return output + ']';
		}

		if (v.ctor === '[]')
		{
			return '[]';
		}

		if (v.ctor === 'Set_elm_builtin')
		{
			return 'Set.fromList ' + toString(_elm_lang$core$Set$toList(v));
		}

		if (v.ctor === 'RBNode_elm_builtin' || v.ctor === 'RBEmpty_elm_builtin')
		{
			return 'Dict.fromList ' + toString(_elm_lang$core$Dict$toList(v));
		}

		var output = '';
		for (var i in v)
		{
			if (i === 'ctor') continue;
			var str = toString(v[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return v.ctor + output;
	}

	if (type === 'object')
	{
		if (v instanceof Date)
		{
			return '<' + v.toString() + '>';
		}

		if (v.elm_web_socket)
		{
			return '<websocket>';
		}

		var output = [];
		for (var k in v)
		{
			output.push(k + ' = ' + toString(v[k]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return '<internal structure>';
}

function addSlashes(str, isChar)
{
	var s = str.replace(/\\/g, '\\\\')
			  .replace(/\n/g, '\\n')
			  .replace(/\t/g, '\\t')
			  .replace(/\r/g, '\\r')
			  .replace(/\v/g, '\\v')
			  .replace(/\0/g, '\\0');
	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}


return {
	eq: eq,
	cmp: cmp,
	Tuple0: Tuple0,
	Tuple2: Tuple2,
	chr: chr,
	update: update,
	guid: guid,

	append: F2(append),

	crash: crash,
	crashCase: crashCase,

	toString: toString
};

}();
var _elm_lang$core$Basics$never = function (_p0) {
	never:
	while (true) {
		var _p1 = _p0;
		var _v1 = _p1._0;
		_p0 = _v1;
		continue never;
	}
};
var _elm_lang$core$Basics$uncurry = F2(
	function (f, _p2) {
		var _p3 = _p2;
		return A2(f, _p3._0, _p3._1);
	});
var _elm_lang$core$Basics$curry = F3(
	function (f, a, b) {
		return f(
			{ctor: '_Tuple2', _0: a, _1: b});
	});
var _elm_lang$core$Basics$flip = F3(
	function (f, b, a) {
		return A2(f, a, b);
	});
var _elm_lang$core$Basics$always = F2(
	function (a, _p4) {
		return a;
	});
var _elm_lang$core$Basics$identity = function (x) {
	return x;
};
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<|'] = F2(
	function (f, x) {
		return f(x);
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['|>'] = F2(
	function (x, f) {
		return f(x);
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['>>'] = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<<'] = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['++'] = _elm_lang$core$Native_Utils.append;
var _elm_lang$core$Basics$toString = _elm_lang$core$Native_Utils.toString;
var _elm_lang$core$Basics$isInfinite = _elm_lang$core$Native_Basics.isInfinite;
var _elm_lang$core$Basics$isNaN = _elm_lang$core$Native_Basics.isNaN;
var _elm_lang$core$Basics$toFloat = _elm_lang$core$Native_Basics.toFloat;
var _elm_lang$core$Basics$ceiling = _elm_lang$core$Native_Basics.ceiling;
var _elm_lang$core$Basics$floor = _elm_lang$core$Native_Basics.floor;
var _elm_lang$core$Basics$truncate = _elm_lang$core$Native_Basics.truncate;
var _elm_lang$core$Basics$round = _elm_lang$core$Native_Basics.round;
var _elm_lang$core$Basics$not = _elm_lang$core$Native_Basics.not;
var _elm_lang$core$Basics$xor = _elm_lang$core$Native_Basics.xor;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['||'] = _elm_lang$core$Native_Basics.or;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['&&'] = _elm_lang$core$Native_Basics.and;
var _elm_lang$core$Basics$max = _elm_lang$core$Native_Basics.max;
var _elm_lang$core$Basics$min = _elm_lang$core$Native_Basics.min;
var _elm_lang$core$Basics$compare = _elm_lang$core$Native_Basics.compare;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['>='] = _elm_lang$core$Native_Basics.ge;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<='] = _elm_lang$core$Native_Basics.le;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['>'] = _elm_lang$core$Native_Basics.gt;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<'] = _elm_lang$core$Native_Basics.lt;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['/='] = _elm_lang$core$Native_Basics.neq;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['=='] = _elm_lang$core$Native_Basics.eq;
var _elm_lang$core$Basics$e = _elm_lang$core$Native_Basics.e;
var _elm_lang$core$Basics$pi = _elm_lang$core$Native_Basics.pi;
var _elm_lang$core$Basics$clamp = _elm_lang$core$Native_Basics.clamp;
var _elm_lang$core$Basics$logBase = _elm_lang$core$Native_Basics.logBase;
var _elm_lang$core$Basics$abs = _elm_lang$core$Native_Basics.abs;
var _elm_lang$core$Basics$negate = _elm_lang$core$Native_Basics.negate;
var _elm_lang$core$Basics$sqrt = _elm_lang$core$Native_Basics.sqrt;
var _elm_lang$core$Basics$atan2 = _elm_lang$core$Native_Basics.atan2;
var _elm_lang$core$Basics$atan = _elm_lang$core$Native_Basics.atan;
var _elm_lang$core$Basics$asin = _elm_lang$core$Native_Basics.asin;
var _elm_lang$core$Basics$acos = _elm_lang$core$Native_Basics.acos;
var _elm_lang$core$Basics$tan = _elm_lang$core$Native_Basics.tan;
var _elm_lang$core$Basics$sin = _elm_lang$core$Native_Basics.sin;
var _elm_lang$core$Basics$cos = _elm_lang$core$Native_Basics.cos;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['^'] = _elm_lang$core$Native_Basics.exp;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['%'] = _elm_lang$core$Native_Basics.mod;
var _elm_lang$core$Basics$rem = _elm_lang$core$Native_Basics.rem;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['//'] = _elm_lang$core$Native_Basics.div;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['/'] = _elm_lang$core$Native_Basics.floatDiv;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['*'] = _elm_lang$core$Native_Basics.mul;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['-'] = _elm_lang$core$Native_Basics.sub;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['+'] = _elm_lang$core$Native_Basics.add;
var _elm_lang$core$Basics$toPolar = _elm_lang$core$Native_Basics.toPolar;
var _elm_lang$core$Basics$fromPolar = _elm_lang$core$Native_Basics.fromPolar;
var _elm_lang$core$Basics$turns = _elm_lang$core$Native_Basics.turns;
var _elm_lang$core$Basics$degrees = _elm_lang$core$Native_Basics.degrees;
var _elm_lang$core$Basics$radians = function (t) {
	return t;
};
var _elm_lang$core$Basics$GT = {ctor: 'GT'};
var _elm_lang$core$Basics$EQ = {ctor: 'EQ'};
var _elm_lang$core$Basics$LT = {ctor: 'LT'};
var _elm_lang$core$Basics$JustOneMore = function (a) {
	return {ctor: 'JustOneMore', _0: a};
};

//import Native.Utils //

var _elm_lang$core$Native_Debug = function() {

function log(tag, value)
{
	var msg = tag + ': ' + _elm_lang$core$Native_Utils.toString(value);
	var process = process || {};
	if (process.stdout)
	{
		process.stdout.write(msg);
	}
	else
	{
		console.log(msg);
	}
	return value;
}

function crash(message)
{
	throw new Error(message);
}

return {
	crash: crash,
	log: F2(log)
};

}();
var _elm_lang$core$Debug$crash = _elm_lang$core$Native_Debug.crash;
var _elm_lang$core$Debug$log = _elm_lang$core$Native_Debug.log;

var _elm_lang$core$Maybe$withDefault = F2(
	function ($default, maybe) {
		var _p0 = maybe;
		if (_p0.ctor === 'Just') {
			return _p0._0;
		} else {
			return $default;
		}
	});
var _elm_lang$core$Maybe$Nothing = {ctor: 'Nothing'};
var _elm_lang$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		var _p1 = maybeValue;
		if (_p1.ctor === 'Just') {
			return callback(_p1._0);
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$Just = function (a) {
	return {ctor: 'Just', _0: a};
};
var _elm_lang$core$Maybe$map = F2(
	function (f, maybe) {
		var _p2 = maybe;
		if (_p2.ctor === 'Just') {
			return _elm_lang$core$Maybe$Just(
				f(_p2._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map2 = F3(
	function (func, ma, mb) {
		var _p3 = {ctor: '_Tuple2', _0: ma, _1: mb};
		if (((_p3.ctor === '_Tuple2') && (_p3._0.ctor === 'Just')) && (_p3._1.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A2(func, _p3._0._0, _p3._1._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map3 = F4(
	function (func, ma, mb, mc) {
		var _p4 = {ctor: '_Tuple3', _0: ma, _1: mb, _2: mc};
		if ((((_p4.ctor === '_Tuple3') && (_p4._0.ctor === 'Just')) && (_p4._1.ctor === 'Just')) && (_p4._2.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A3(func, _p4._0._0, _p4._1._0, _p4._2._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map4 = F5(
	function (func, ma, mb, mc, md) {
		var _p5 = {ctor: '_Tuple4', _0: ma, _1: mb, _2: mc, _3: md};
		if (((((_p5.ctor === '_Tuple4') && (_p5._0.ctor === 'Just')) && (_p5._1.ctor === 'Just')) && (_p5._2.ctor === 'Just')) && (_p5._3.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A4(func, _p5._0._0, _p5._1._0, _p5._2._0, _p5._3._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map5 = F6(
	function (func, ma, mb, mc, md, me) {
		var _p6 = {ctor: '_Tuple5', _0: ma, _1: mb, _2: mc, _3: md, _4: me};
		if ((((((_p6.ctor === '_Tuple5') && (_p6._0.ctor === 'Just')) && (_p6._1.ctor === 'Just')) && (_p6._2.ctor === 'Just')) && (_p6._3.ctor === 'Just')) && (_p6._4.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A5(func, _p6._0._0, _p6._1._0, _p6._2._0, _p6._3._0, _p6._4._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});

//import Native.Utils //

var _elm_lang$core$Native_List = function() {

var Nil = { ctor: '[]' };

function Cons(hd, tl)
{
	return { ctor: '::', _0: hd, _1: tl };
}

function fromArray(arr)
{
	var out = Nil;
	for (var i = arr.length; i--; )
	{
		out = Cons(arr[i], out);
	}
	return out;
}

function toArray(xs)
{
	var out = [];
	while (xs.ctor !== '[]')
	{
		out.push(xs._0);
		xs = xs._1;
	}
	return out;
}

function foldr(f, b, xs)
{
	var arr = toArray(xs);
	var acc = b;
	for (var i = arr.length; i--; )
	{
		acc = A2(f, arr[i], acc);
	}
	return acc;
}

function map2(f, xs, ys)
{
	var arr = [];
	while (xs.ctor !== '[]' && ys.ctor !== '[]')
	{
		arr.push(A2(f, xs._0, ys._0));
		xs = xs._1;
		ys = ys._1;
	}
	return fromArray(arr);
}

function map3(f, xs, ys, zs)
{
	var arr = [];
	while (xs.ctor !== '[]' && ys.ctor !== '[]' && zs.ctor !== '[]')
	{
		arr.push(A3(f, xs._0, ys._0, zs._0));
		xs = xs._1;
		ys = ys._1;
		zs = zs._1;
	}
	return fromArray(arr);
}

function map4(f, ws, xs, ys, zs)
{
	var arr = [];
	while (   ws.ctor !== '[]'
		   && xs.ctor !== '[]'
		   && ys.ctor !== '[]'
		   && zs.ctor !== '[]')
	{
		arr.push(A4(f, ws._0, xs._0, ys._0, zs._0));
		ws = ws._1;
		xs = xs._1;
		ys = ys._1;
		zs = zs._1;
	}
	return fromArray(arr);
}

function map5(f, vs, ws, xs, ys, zs)
{
	var arr = [];
	while (   vs.ctor !== '[]'
		   && ws.ctor !== '[]'
		   && xs.ctor !== '[]'
		   && ys.ctor !== '[]'
		   && zs.ctor !== '[]')
	{
		arr.push(A5(f, vs._0, ws._0, xs._0, ys._0, zs._0));
		vs = vs._1;
		ws = ws._1;
		xs = xs._1;
		ys = ys._1;
		zs = zs._1;
	}
	return fromArray(arr);
}

function sortBy(f, xs)
{
	return fromArray(toArray(xs).sort(function(a, b) {
		return _elm_lang$core$Native_Utils.cmp(f(a), f(b));
	}));
}

function sortWith(f, xs)
{
	return fromArray(toArray(xs).sort(function(a, b) {
		var ord = f(a)(b).ctor;
		return ord === 'EQ' ? 0 : ord === 'LT' ? -1 : 1;
	}));
}

return {
	Nil: Nil,
	Cons: Cons,
	cons: F2(Cons),
	toArray: toArray,
	fromArray: fromArray,

	foldr: F3(foldr),

	map2: F3(map2),
	map3: F4(map3),
	map4: F5(map4),
	map5: F6(map5),
	sortBy: F2(sortBy),
	sortWith: F2(sortWith)
};

}();
var _elm_lang$core$List$sortWith = _elm_lang$core$Native_List.sortWith;
var _elm_lang$core$List$sortBy = _elm_lang$core$Native_List.sortBy;
var _elm_lang$core$List$sort = function (xs) {
	return A2(_elm_lang$core$List$sortBy, _elm_lang$core$Basics$identity, xs);
};
var _elm_lang$core$List$singleton = function (value) {
	return {
		ctor: '::',
		_0: value,
		_1: {ctor: '[]'}
	};
};
var _elm_lang$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
				return list;
			} else {
				var _p0 = list;
				if (_p0.ctor === '[]') {
					return list;
				} else {
					var _v1 = n - 1,
						_v2 = _p0._1;
					n = _v1;
					list = _v2;
					continue drop;
				}
			}
		}
	});
var _elm_lang$core$List$map5 = _elm_lang$core$Native_List.map5;
var _elm_lang$core$List$map4 = _elm_lang$core$Native_List.map4;
var _elm_lang$core$List$map3 = _elm_lang$core$Native_List.map3;
var _elm_lang$core$List$map2 = _elm_lang$core$Native_List.map2;
var _elm_lang$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			var _p1 = list;
			if (_p1.ctor === '[]') {
				return false;
			} else {
				if (isOkay(_p1._0)) {
					return true;
				} else {
					var _v4 = isOkay,
						_v5 = _p1._1;
					isOkay = _v4;
					list = _v5;
					continue any;
				}
			}
		}
	});
var _elm_lang$core$List$all = F2(
	function (isOkay, list) {
		return !A2(
			_elm_lang$core$List$any,
			function (_p2) {
				return !isOkay(_p2);
			},
			list);
	});
var _elm_lang$core$List$foldr = _elm_lang$core$Native_List.foldr;
var _elm_lang$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			var _p3 = list;
			if (_p3.ctor === '[]') {
				return acc;
			} else {
				var _v7 = func,
					_v8 = A2(func, _p3._0, acc),
					_v9 = _p3._1;
				func = _v7;
				acc = _v8;
				list = _v9;
				continue foldl;
			}
		}
	});
var _elm_lang$core$List$length = function (xs) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (_p4, i) {
				return i + 1;
			}),
		0,
		xs);
};
var _elm_lang$core$List$sum = function (numbers) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (x, y) {
				return x + y;
			}),
		0,
		numbers);
};
var _elm_lang$core$List$product = function (numbers) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (x, y) {
				return x * y;
			}),
		1,
		numbers);
};
var _elm_lang$core$List$maximum = function (list) {
	var _p5 = list;
	if (_p5.ctor === '::') {
		return _elm_lang$core$Maybe$Just(
			A3(_elm_lang$core$List$foldl, _elm_lang$core$Basics$max, _p5._0, _p5._1));
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List$minimum = function (list) {
	var _p6 = list;
	if (_p6.ctor === '::') {
		return _elm_lang$core$Maybe$Just(
			A3(_elm_lang$core$List$foldl, _elm_lang$core$Basics$min, _p6._0, _p6._1));
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List$member = F2(
	function (x, xs) {
		return A2(
			_elm_lang$core$List$any,
			function (a) {
				return _elm_lang$core$Native_Utils.eq(a, x);
			},
			xs);
	});
var _elm_lang$core$List$isEmpty = function (xs) {
	var _p7 = xs;
	if (_p7.ctor === '[]') {
		return true;
	} else {
		return false;
	}
};
var _elm_lang$core$List$tail = function (list) {
	var _p8 = list;
	if (_p8.ctor === '::') {
		return _elm_lang$core$Maybe$Just(_p8._1);
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List$head = function (list) {
	var _p9 = list;
	if (_p9.ctor === '::') {
		return _elm_lang$core$Maybe$Just(_p9._0);
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List_ops = _elm_lang$core$List_ops || {};
_elm_lang$core$List_ops['::'] = _elm_lang$core$Native_List.cons;
var _elm_lang$core$List$map = F2(
	function (f, xs) {
		return A3(
			_elm_lang$core$List$foldr,
			F2(
				function (x, acc) {
					return {
						ctor: '::',
						_0: f(x),
						_1: acc
					};
				}),
			{ctor: '[]'},
			xs);
	});
var _elm_lang$core$List$filter = F2(
	function (pred, xs) {
		var conditionalCons = F2(
			function (front, back) {
				return pred(front) ? {ctor: '::', _0: front, _1: back} : back;
			});
		return A3(
			_elm_lang$core$List$foldr,
			conditionalCons,
			{ctor: '[]'},
			xs);
	});
var _elm_lang$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _p10 = f(mx);
		if (_p10.ctor === 'Just') {
			return {ctor: '::', _0: _p10._0, _1: xs};
		} else {
			return xs;
		}
	});
var _elm_lang$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			_elm_lang$core$List$foldr,
			_elm_lang$core$List$maybeCons(f),
			{ctor: '[]'},
			xs);
	});
var _elm_lang$core$List$reverse = function (list) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (x, y) {
				return {ctor: '::', _0: x, _1: y};
			}),
		{ctor: '[]'},
		list);
};
var _elm_lang$core$List$scanl = F3(
	function (f, b, xs) {
		var scan1 = F2(
			function (x, accAcc) {
				var _p11 = accAcc;
				if (_p11.ctor === '::') {
					return {
						ctor: '::',
						_0: A2(f, x, _p11._0),
						_1: accAcc
					};
				} else {
					return {ctor: '[]'};
				}
			});
		return _elm_lang$core$List$reverse(
			A3(
				_elm_lang$core$List$foldl,
				scan1,
				{
					ctor: '::',
					_0: b,
					_1: {ctor: '[]'}
				},
				xs));
	});
var _elm_lang$core$List$append = F2(
	function (xs, ys) {
		var _p12 = ys;
		if (_p12.ctor === '[]') {
			return xs;
		} else {
			return A3(
				_elm_lang$core$List$foldr,
				F2(
					function (x, y) {
						return {ctor: '::', _0: x, _1: y};
					}),
				ys,
				xs);
		}
	});
var _elm_lang$core$List$concat = function (lists) {
	return A3(
		_elm_lang$core$List$foldr,
		_elm_lang$core$List$append,
		{ctor: '[]'},
		lists);
};
var _elm_lang$core$List$concatMap = F2(
	function (f, list) {
		return _elm_lang$core$List$concat(
			A2(_elm_lang$core$List$map, f, list));
	});
var _elm_lang$core$List$partition = F2(
	function (pred, list) {
		var step = F2(
			function (x, _p13) {
				var _p14 = _p13;
				var _p16 = _p14._0;
				var _p15 = _p14._1;
				return pred(x) ? {
					ctor: '_Tuple2',
					_0: {ctor: '::', _0: x, _1: _p16},
					_1: _p15
				} : {
					ctor: '_Tuple2',
					_0: _p16,
					_1: {ctor: '::', _0: x, _1: _p15}
				};
			});
		return A3(
			_elm_lang$core$List$foldr,
			step,
			{
				ctor: '_Tuple2',
				_0: {ctor: '[]'},
				_1: {ctor: '[]'}
			},
			list);
	});
var _elm_lang$core$List$unzip = function (pairs) {
	var step = F2(
		function (_p18, _p17) {
			var _p19 = _p18;
			var _p20 = _p17;
			return {
				ctor: '_Tuple2',
				_0: {ctor: '::', _0: _p19._0, _1: _p20._0},
				_1: {ctor: '::', _0: _p19._1, _1: _p20._1}
			};
		});
	return A3(
		_elm_lang$core$List$foldr,
		step,
		{
			ctor: '_Tuple2',
			_0: {ctor: '[]'},
			_1: {ctor: '[]'}
		},
		pairs);
};
var _elm_lang$core$List$intersperse = F2(
	function (sep, xs) {
		var _p21 = xs;
		if (_p21.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			var step = F2(
				function (x, rest) {
					return {
						ctor: '::',
						_0: sep,
						_1: {ctor: '::', _0: x, _1: rest}
					};
				});
			var spersed = A3(
				_elm_lang$core$List$foldr,
				step,
				{ctor: '[]'},
				_p21._1);
			return {ctor: '::', _0: _p21._0, _1: spersed};
		}
	});
var _elm_lang$core$List$takeReverse = F3(
	function (n, list, taken) {
		takeReverse:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
				return taken;
			} else {
				var _p22 = list;
				if (_p22.ctor === '[]') {
					return taken;
				} else {
					var _v23 = n - 1,
						_v24 = _p22._1,
						_v25 = {ctor: '::', _0: _p22._0, _1: taken};
					n = _v23;
					list = _v24;
					taken = _v25;
					continue takeReverse;
				}
			}
		}
	});
var _elm_lang$core$List$takeTailRec = F2(
	function (n, list) {
		return _elm_lang$core$List$reverse(
			A3(
				_elm_lang$core$List$takeReverse,
				n,
				list,
				{ctor: '[]'}));
	});
var _elm_lang$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
			return {ctor: '[]'};
		} else {
			var _p23 = {ctor: '_Tuple2', _0: n, _1: list};
			_v26_5:
			do {
				_v26_1:
				do {
					if (_p23.ctor === '_Tuple2') {
						if (_p23._1.ctor === '[]') {
							return list;
						} else {
							if (_p23._1._1.ctor === '::') {
								switch (_p23._0) {
									case 1:
										break _v26_1;
									case 2:
										return {
											ctor: '::',
											_0: _p23._1._0,
											_1: {
												ctor: '::',
												_0: _p23._1._1._0,
												_1: {ctor: '[]'}
											}
										};
									case 3:
										if (_p23._1._1._1.ctor === '::') {
											return {
												ctor: '::',
												_0: _p23._1._0,
												_1: {
													ctor: '::',
													_0: _p23._1._1._0,
													_1: {
														ctor: '::',
														_0: _p23._1._1._1._0,
														_1: {ctor: '[]'}
													}
												}
											};
										} else {
											break _v26_5;
										}
									default:
										if ((_p23._1._1._1.ctor === '::') && (_p23._1._1._1._1.ctor === '::')) {
											var _p28 = _p23._1._1._1._0;
											var _p27 = _p23._1._1._0;
											var _p26 = _p23._1._0;
											var _p25 = _p23._1._1._1._1._0;
											var _p24 = _p23._1._1._1._1._1;
											return (_elm_lang$core$Native_Utils.cmp(ctr, 1000) > 0) ? {
												ctor: '::',
												_0: _p26,
												_1: {
													ctor: '::',
													_0: _p27,
													_1: {
														ctor: '::',
														_0: _p28,
														_1: {
															ctor: '::',
															_0: _p25,
															_1: A2(_elm_lang$core$List$takeTailRec, n - 4, _p24)
														}
													}
												}
											} : {
												ctor: '::',
												_0: _p26,
												_1: {
													ctor: '::',
													_0: _p27,
													_1: {
														ctor: '::',
														_0: _p28,
														_1: {
															ctor: '::',
															_0: _p25,
															_1: A3(_elm_lang$core$List$takeFast, ctr + 1, n - 4, _p24)
														}
													}
												}
											};
										} else {
											break _v26_5;
										}
								}
							} else {
								if (_p23._0 === 1) {
									break _v26_1;
								} else {
									break _v26_5;
								}
							}
						}
					} else {
						break _v26_5;
					}
				} while(false);
				return {
					ctor: '::',
					_0: _p23._1._0,
					_1: {ctor: '[]'}
				};
			} while(false);
			return list;
		}
	});
var _elm_lang$core$List$take = F2(
	function (n, list) {
		return A3(_elm_lang$core$List$takeFast, 0, n, list);
	});
var _elm_lang$core$List$repeatHelp = F3(
	function (result, n, value) {
		repeatHelp:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
				return result;
			} else {
				var _v27 = {ctor: '::', _0: value, _1: result},
					_v28 = n - 1,
					_v29 = value;
				result = _v27;
				n = _v28;
				value = _v29;
				continue repeatHelp;
			}
		}
	});
var _elm_lang$core$List$repeat = F2(
	function (n, value) {
		return A3(
			_elm_lang$core$List$repeatHelp,
			{ctor: '[]'},
			n,
			value);
	});
var _elm_lang$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(lo, hi) < 1) {
				var _v30 = lo,
					_v31 = hi - 1,
					_v32 = {ctor: '::', _0: hi, _1: list};
				lo = _v30;
				hi = _v31;
				list = _v32;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var _elm_lang$core$List$range = F2(
	function (lo, hi) {
		return A3(
			_elm_lang$core$List$rangeHelp,
			lo,
			hi,
			{ctor: '[]'});
	});
var _elm_lang$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			_elm_lang$core$List$map2,
			f,
			A2(
				_elm_lang$core$List$range,
				0,
				_elm_lang$core$List$length(xs) - 1),
			xs);
	});

var _elm_lang$core$Result$toMaybe = function (result) {
	var _p0 = result;
	if (_p0.ctor === 'Ok') {
		return _elm_lang$core$Maybe$Just(_p0._0);
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$Result$withDefault = F2(
	function (def, result) {
		var _p1 = result;
		if (_p1.ctor === 'Ok') {
			return _p1._0;
		} else {
			return def;
		}
	});
var _elm_lang$core$Result$Err = function (a) {
	return {ctor: 'Err', _0: a};
};
var _elm_lang$core$Result$andThen = F2(
	function (callback, result) {
		var _p2 = result;
		if (_p2.ctor === 'Ok') {
			return callback(_p2._0);
		} else {
			return _elm_lang$core$Result$Err(_p2._0);
		}
	});
var _elm_lang$core$Result$Ok = function (a) {
	return {ctor: 'Ok', _0: a};
};
var _elm_lang$core$Result$map = F2(
	function (func, ra) {
		var _p3 = ra;
		if (_p3.ctor === 'Ok') {
			return _elm_lang$core$Result$Ok(
				func(_p3._0));
		} else {
			return _elm_lang$core$Result$Err(_p3._0);
		}
	});
var _elm_lang$core$Result$map2 = F3(
	function (func, ra, rb) {
		var _p4 = {ctor: '_Tuple2', _0: ra, _1: rb};
		if (_p4._0.ctor === 'Ok') {
			if (_p4._1.ctor === 'Ok') {
				return _elm_lang$core$Result$Ok(
					A2(func, _p4._0._0, _p4._1._0));
			} else {
				return _elm_lang$core$Result$Err(_p4._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p4._0._0);
		}
	});
var _elm_lang$core$Result$map3 = F4(
	function (func, ra, rb, rc) {
		var _p5 = {ctor: '_Tuple3', _0: ra, _1: rb, _2: rc};
		if (_p5._0.ctor === 'Ok') {
			if (_p5._1.ctor === 'Ok') {
				if (_p5._2.ctor === 'Ok') {
					return _elm_lang$core$Result$Ok(
						A3(func, _p5._0._0, _p5._1._0, _p5._2._0));
				} else {
					return _elm_lang$core$Result$Err(_p5._2._0);
				}
			} else {
				return _elm_lang$core$Result$Err(_p5._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p5._0._0);
		}
	});
var _elm_lang$core$Result$map4 = F5(
	function (func, ra, rb, rc, rd) {
		var _p6 = {ctor: '_Tuple4', _0: ra, _1: rb, _2: rc, _3: rd};
		if (_p6._0.ctor === 'Ok') {
			if (_p6._1.ctor === 'Ok') {
				if (_p6._2.ctor === 'Ok') {
					if (_p6._3.ctor === 'Ok') {
						return _elm_lang$core$Result$Ok(
							A4(func, _p6._0._0, _p6._1._0, _p6._2._0, _p6._3._0));
					} else {
						return _elm_lang$core$Result$Err(_p6._3._0);
					}
				} else {
					return _elm_lang$core$Result$Err(_p6._2._0);
				}
			} else {
				return _elm_lang$core$Result$Err(_p6._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p6._0._0);
		}
	});
var _elm_lang$core$Result$map5 = F6(
	function (func, ra, rb, rc, rd, re) {
		var _p7 = {ctor: '_Tuple5', _0: ra, _1: rb, _2: rc, _3: rd, _4: re};
		if (_p7._0.ctor === 'Ok') {
			if (_p7._1.ctor === 'Ok') {
				if (_p7._2.ctor === 'Ok') {
					if (_p7._3.ctor === 'Ok') {
						if (_p7._4.ctor === 'Ok') {
							return _elm_lang$core$Result$Ok(
								A5(func, _p7._0._0, _p7._1._0, _p7._2._0, _p7._3._0, _p7._4._0));
						} else {
							return _elm_lang$core$Result$Err(_p7._4._0);
						}
					} else {
						return _elm_lang$core$Result$Err(_p7._3._0);
					}
				} else {
					return _elm_lang$core$Result$Err(_p7._2._0);
				}
			} else {
				return _elm_lang$core$Result$Err(_p7._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p7._0._0);
		}
	});
var _elm_lang$core$Result$mapError = F2(
	function (f, result) {
		var _p8 = result;
		if (_p8.ctor === 'Ok') {
			return _elm_lang$core$Result$Ok(_p8._0);
		} else {
			return _elm_lang$core$Result$Err(
				f(_p8._0));
		}
	});
var _elm_lang$core$Result$fromMaybe = F2(
	function (err, maybe) {
		var _p9 = maybe;
		if (_p9.ctor === 'Just') {
			return _elm_lang$core$Result$Ok(_p9._0);
		} else {
			return _elm_lang$core$Result$Err(err);
		}
	});

//import Maybe, Native.List, Native.Utils, Result //

var _elm_lang$core$Native_String = function() {

function isEmpty(str)
{
	return str.length === 0;
}
function cons(chr, str)
{
	return chr + str;
}
function uncons(str)
{
	var hd = str[0];
	if (hd)
	{
		return _elm_lang$core$Maybe$Just(_elm_lang$core$Native_Utils.Tuple2(_elm_lang$core$Native_Utils.chr(hd), str.slice(1)));
	}
	return _elm_lang$core$Maybe$Nothing;
}
function append(a, b)
{
	return a + b;
}
function concat(strs)
{
	return _elm_lang$core$Native_List.toArray(strs).join('');
}
function length(str)
{
	return str.length;
}
function map(f, str)
{
	var out = str.split('');
	for (var i = out.length; i--; )
	{
		out[i] = f(_elm_lang$core$Native_Utils.chr(out[i]));
	}
	return out.join('');
}
function filter(pred, str)
{
	return str.split('').map(_elm_lang$core$Native_Utils.chr).filter(pred).join('');
}
function reverse(str)
{
	return str.split('').reverse().join('');
}
function foldl(f, b, str)
{
	var len = str.length;
	for (var i = 0; i < len; ++i)
	{
		b = A2(f, _elm_lang$core$Native_Utils.chr(str[i]), b);
	}
	return b;
}
function foldr(f, b, str)
{
	for (var i = str.length; i--; )
	{
		b = A2(f, _elm_lang$core$Native_Utils.chr(str[i]), b);
	}
	return b;
}
function split(sep, str)
{
	return _elm_lang$core$Native_List.fromArray(str.split(sep));
}
function join(sep, strs)
{
	return _elm_lang$core$Native_List.toArray(strs).join(sep);
}
function repeat(n, str)
{
	var result = '';
	while (n > 0)
	{
		if (n & 1)
		{
			result += str;
		}
		n >>= 1, str += str;
	}
	return result;
}
function slice(start, end, str)
{
	return str.slice(start, end);
}
function left(n, str)
{
	return n < 1 ? '' : str.slice(0, n);
}
function right(n, str)
{
	return n < 1 ? '' : str.slice(-n);
}
function dropLeft(n, str)
{
	return n < 1 ? str : str.slice(n);
}
function dropRight(n, str)
{
	return n < 1 ? str : str.slice(0, -n);
}
function pad(n, chr, str)
{
	var half = (n - str.length) / 2;
	return repeat(Math.ceil(half), chr) + str + repeat(half | 0, chr);
}
function padRight(n, chr, str)
{
	return str + repeat(n - str.length, chr);
}
function padLeft(n, chr, str)
{
	return repeat(n - str.length, chr) + str;
}

function trim(str)
{
	return str.trim();
}
function trimLeft(str)
{
	return str.replace(/^\s+/, '');
}
function trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function words(str)
{
	return _elm_lang$core$Native_List.fromArray(str.trim().split(/\s+/g));
}
function lines(str)
{
	return _elm_lang$core$Native_List.fromArray(str.split(/\r\n|\r|\n/g));
}

function toUpper(str)
{
	return str.toUpperCase();
}
function toLower(str)
{
	return str.toLowerCase();
}

function any(pred, str)
{
	for (var i = str.length; i--; )
	{
		if (pred(_elm_lang$core$Native_Utils.chr(str[i])))
		{
			return true;
		}
	}
	return false;
}
function all(pred, str)
{
	for (var i = str.length; i--; )
	{
		if (!pred(_elm_lang$core$Native_Utils.chr(str[i])))
		{
			return false;
		}
	}
	return true;
}

function contains(sub, str)
{
	return str.indexOf(sub) > -1;
}
function startsWith(sub, str)
{
	return str.indexOf(sub) === 0;
}
function endsWith(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
}
function indexes(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _elm_lang$core$Native_List.Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _elm_lang$core$Native_List.fromArray(is);
}


function toInt(s)
{
	var len = s.length;

	// if empty
	if (len === 0)
	{
		return intErr(s);
	}

	// if hex
	var c = s[0];
	if (c === '0' && s[1] === 'x')
	{
		for (var i = 2; i < len; ++i)
		{
			var c = s[i];
			if (('0' <= c && c <= '9') || ('A' <= c && c <= 'F') || ('a' <= c && c <= 'f'))
			{
				continue;
			}
			return intErr(s);
		}
		return _elm_lang$core$Result$Ok(parseInt(s, 16));
	}

	// is decimal
	if (c > '9' || (c < '0' && c !== '-' && c !== '+'))
	{
		return intErr(s);
	}
	for (var i = 1; i < len; ++i)
	{
		var c = s[i];
		if (c < '0' || '9' < c)
		{
			return intErr(s);
		}
	}

	return _elm_lang$core$Result$Ok(parseInt(s, 10));
}

function intErr(s)
{
	return _elm_lang$core$Result$Err("could not convert string '" + s + "' to an Int");
}


function toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return floatErr(s);
	}
	var n = +s;
	// faster isNaN check
	return n === n ? _elm_lang$core$Result$Ok(n) : floatErr(s);
}

function floatErr(s)
{
	return _elm_lang$core$Result$Err("could not convert string '" + s + "' to a Float");
}


function toList(str)
{
	return _elm_lang$core$Native_List.fromArray(str.split('').map(_elm_lang$core$Native_Utils.chr));
}
function fromList(chars)
{
	return _elm_lang$core$Native_List.toArray(chars).join('');
}

return {
	isEmpty: isEmpty,
	cons: F2(cons),
	uncons: uncons,
	append: F2(append),
	concat: concat,
	length: length,
	map: F2(map),
	filter: F2(filter),
	reverse: reverse,
	foldl: F3(foldl),
	foldr: F3(foldr),

	split: F2(split),
	join: F2(join),
	repeat: F2(repeat),

	slice: F3(slice),
	left: F2(left),
	right: F2(right),
	dropLeft: F2(dropLeft),
	dropRight: F2(dropRight),

	pad: F3(pad),
	padLeft: F3(padLeft),
	padRight: F3(padRight),

	trim: trim,
	trimLeft: trimLeft,
	trimRight: trimRight,

	words: words,
	lines: lines,

	toUpper: toUpper,
	toLower: toLower,

	any: F2(any),
	all: F2(all),

	contains: F2(contains),
	startsWith: F2(startsWith),
	endsWith: F2(endsWith),
	indexes: F2(indexes),

	toInt: toInt,
	toFloat: toFloat,
	toList: toList,
	fromList: fromList
};

}();

//import Native.Utils //

var _elm_lang$core$Native_Char = function() {

return {
	fromCode: function(c) { return _elm_lang$core$Native_Utils.chr(String.fromCharCode(c)); },
	toCode: function(c) { return c.charCodeAt(0); },
	toUpper: function(c) { return _elm_lang$core$Native_Utils.chr(c.toUpperCase()); },
	toLower: function(c) { return _elm_lang$core$Native_Utils.chr(c.toLowerCase()); },
	toLocaleUpper: function(c) { return _elm_lang$core$Native_Utils.chr(c.toLocaleUpperCase()); },
	toLocaleLower: function(c) { return _elm_lang$core$Native_Utils.chr(c.toLocaleLowerCase()); }
};

}();
var _elm_lang$core$Char$fromCode = _elm_lang$core$Native_Char.fromCode;
var _elm_lang$core$Char$toCode = _elm_lang$core$Native_Char.toCode;
var _elm_lang$core$Char$toLocaleLower = _elm_lang$core$Native_Char.toLocaleLower;
var _elm_lang$core$Char$toLocaleUpper = _elm_lang$core$Native_Char.toLocaleUpper;
var _elm_lang$core$Char$toLower = _elm_lang$core$Native_Char.toLower;
var _elm_lang$core$Char$toUpper = _elm_lang$core$Native_Char.toUpper;
var _elm_lang$core$Char$isBetween = F3(
	function (low, high, $char) {
		var code = _elm_lang$core$Char$toCode($char);
		return (_elm_lang$core$Native_Utils.cmp(
			code,
			_elm_lang$core$Char$toCode(low)) > -1) && (_elm_lang$core$Native_Utils.cmp(
			code,
			_elm_lang$core$Char$toCode(high)) < 1);
	});
var _elm_lang$core$Char$isUpper = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('A'),
	_elm_lang$core$Native_Utils.chr('Z'));
var _elm_lang$core$Char$isLower = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('a'),
	_elm_lang$core$Native_Utils.chr('z'));
var _elm_lang$core$Char$isDigit = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('0'),
	_elm_lang$core$Native_Utils.chr('9'));
var _elm_lang$core$Char$isOctDigit = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('0'),
	_elm_lang$core$Native_Utils.chr('7'));
var _elm_lang$core$Char$isHexDigit = function ($char) {
	return _elm_lang$core$Char$isDigit($char) || (A3(
		_elm_lang$core$Char$isBetween,
		_elm_lang$core$Native_Utils.chr('a'),
		_elm_lang$core$Native_Utils.chr('f'),
		$char) || A3(
		_elm_lang$core$Char$isBetween,
		_elm_lang$core$Native_Utils.chr('A'),
		_elm_lang$core$Native_Utils.chr('F'),
		$char));
};

var _elm_lang$core$String$fromList = _elm_lang$core$Native_String.fromList;
var _elm_lang$core$String$toList = _elm_lang$core$Native_String.toList;
var _elm_lang$core$String$toFloat = _elm_lang$core$Native_String.toFloat;
var _elm_lang$core$String$toInt = _elm_lang$core$Native_String.toInt;
var _elm_lang$core$String$indices = _elm_lang$core$Native_String.indexes;
var _elm_lang$core$String$indexes = _elm_lang$core$Native_String.indexes;
var _elm_lang$core$String$endsWith = _elm_lang$core$Native_String.endsWith;
var _elm_lang$core$String$startsWith = _elm_lang$core$Native_String.startsWith;
var _elm_lang$core$String$contains = _elm_lang$core$Native_String.contains;
var _elm_lang$core$String$all = _elm_lang$core$Native_String.all;
var _elm_lang$core$String$any = _elm_lang$core$Native_String.any;
var _elm_lang$core$String$toLower = _elm_lang$core$Native_String.toLower;
var _elm_lang$core$String$toUpper = _elm_lang$core$Native_String.toUpper;
var _elm_lang$core$String$lines = _elm_lang$core$Native_String.lines;
var _elm_lang$core$String$words = _elm_lang$core$Native_String.words;
var _elm_lang$core$String$trimRight = _elm_lang$core$Native_String.trimRight;
var _elm_lang$core$String$trimLeft = _elm_lang$core$Native_String.trimLeft;
var _elm_lang$core$String$trim = _elm_lang$core$Native_String.trim;
var _elm_lang$core$String$padRight = _elm_lang$core$Native_String.padRight;
var _elm_lang$core$String$padLeft = _elm_lang$core$Native_String.padLeft;
var _elm_lang$core$String$pad = _elm_lang$core$Native_String.pad;
var _elm_lang$core$String$dropRight = _elm_lang$core$Native_String.dropRight;
var _elm_lang$core$String$dropLeft = _elm_lang$core$Native_String.dropLeft;
var _elm_lang$core$String$right = _elm_lang$core$Native_String.right;
var _elm_lang$core$String$left = _elm_lang$core$Native_String.left;
var _elm_lang$core$String$slice = _elm_lang$core$Native_String.slice;
var _elm_lang$core$String$repeat = _elm_lang$core$Native_String.repeat;
var _elm_lang$core$String$join = _elm_lang$core$Native_String.join;
var _elm_lang$core$String$split = _elm_lang$core$Native_String.split;
var _elm_lang$core$String$foldr = _elm_lang$core$Native_String.foldr;
var _elm_lang$core$String$foldl = _elm_lang$core$Native_String.foldl;
var _elm_lang$core$String$reverse = _elm_lang$core$Native_String.reverse;
var _elm_lang$core$String$filter = _elm_lang$core$Native_String.filter;
var _elm_lang$core$String$map = _elm_lang$core$Native_String.map;
var _elm_lang$core$String$length = _elm_lang$core$Native_String.length;
var _elm_lang$core$String$concat = _elm_lang$core$Native_String.concat;
var _elm_lang$core$String$append = _elm_lang$core$Native_String.append;
var _elm_lang$core$String$uncons = _elm_lang$core$Native_String.uncons;
var _elm_lang$core$String$cons = _elm_lang$core$Native_String.cons;
var _elm_lang$core$String$fromChar = function ($char) {
	return A2(_elm_lang$core$String$cons, $char, '');
};
var _elm_lang$core$String$isEmpty = _elm_lang$core$Native_String.isEmpty;

var _elm_lang$core$Tuple$mapSecond = F2(
	function (func, _p0) {
		var _p1 = _p0;
		return {
			ctor: '_Tuple2',
			_0: _p1._0,
			_1: func(_p1._1)
		};
	});
var _elm_lang$core$Tuple$mapFirst = F2(
	function (func, _p2) {
		var _p3 = _p2;
		return {
			ctor: '_Tuple2',
			_0: func(_p3._0),
			_1: _p3._1
		};
	});
var _elm_lang$core$Tuple$second = function (_p4) {
	var _p5 = _p4;
	return _p5._1;
};
var _elm_lang$core$Tuple$first = function (_p6) {
	var _p7 = _p6;
	return _p7._0;
};

//import //

var _elm_lang$core$Native_Platform = function() {


// PROGRAMS

function program(impl)
{
	return function(flagDecoder)
	{
		return function(object, moduleName)
		{
			object['worker'] = function worker(flags)
			{
				if (typeof flags !== 'undefined')
				{
					throw new Error(
						'The `' + moduleName + '` module does not need flags.\n'
						+ 'Call ' + moduleName + '.worker() with no arguments and you should be all set!'
					);
				}

				return initialize(
					impl.init,
					impl.update,
					impl.subscriptions,
					renderer
				);
			};
		};
	};
}

function programWithFlags(impl)
{
	return function(flagDecoder)
	{
		return function(object, moduleName)
		{
			object['worker'] = function worker(flags)
			{
				if (typeof flagDecoder === 'undefined')
				{
					throw new Error(
						'Are you trying to sneak a Never value into Elm? Trickster!\n'
						+ 'It looks like ' + moduleName + '.main is defined with `programWithFlags` but has type `Program Never`.\n'
						+ 'Use `program` instead if you do not want flags.'
					);
				}

				var result = A2(_elm_lang$core$Native_Json.run, flagDecoder, flags);
				if (result.ctor === 'Err')
				{
					throw new Error(
						moduleName + '.worker(...) was called with an unexpected argument.\n'
						+ 'I tried to convert it to an Elm value, but ran into this problem:\n\n'
						+ result._0
					);
				}

				return initialize(
					impl.init(result._0),
					impl.update,
					impl.subscriptions,
					renderer
				);
			};
		};
	};
}

function renderer(enqueue, _)
{
	return function(_) {};
}


// HTML TO PROGRAM

function htmlToProgram(vnode)
{
	var emptyBag = batch(_elm_lang$core$Native_List.Nil);
	var noChange = _elm_lang$core$Native_Utils.Tuple2(
		_elm_lang$core$Native_Utils.Tuple0,
		emptyBag
	);

	return _elm_lang$virtual_dom$VirtualDom$program({
		init: noChange,
		view: function(model) { return main; },
		update: F2(function(msg, model) { return noChange; }),
		subscriptions: function (model) { return emptyBag; }
	});
}


// INITIALIZE A PROGRAM

function initialize(init, update, subscriptions, renderer)
{
	// ambient state
	var managers = {};
	var updateView;

	// init and update state in main process
	var initApp = _elm_lang$core$Native_Scheduler.nativeBinding(function(callback) {
		var model = init._0;
		updateView = renderer(enqueue, model);
		var cmds = init._1;
		var subs = subscriptions(model);
		dispatchEffects(managers, cmds, subs);
		callback(_elm_lang$core$Native_Scheduler.succeed(model));
	});

	function onMessage(msg, model)
	{
		return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback) {
			var results = A2(update, msg, model);
			model = results._0;
			updateView(model);
			var cmds = results._1;
			var subs = subscriptions(model);
			dispatchEffects(managers, cmds, subs);
			callback(_elm_lang$core$Native_Scheduler.succeed(model));
		});
	}

	var mainProcess = spawnLoop(initApp, onMessage);

	function enqueue(msg)
	{
		_elm_lang$core$Native_Scheduler.rawSend(mainProcess, msg);
	}

	var ports = setupEffects(managers, enqueue);

	return ports ? { ports: ports } : {};
}


// EFFECT MANAGERS

var effectManagers = {};

function setupEffects(managers, callback)
{
	var ports;

	// setup all necessary effect managers
	for (var key in effectManagers)
	{
		var manager = effectManagers[key];

		if (manager.isForeign)
		{
			ports = ports || {};
			ports[key] = manager.tag === 'cmd'
				? setupOutgoingPort(key)
				: setupIncomingPort(key, callback);
		}

		managers[key] = makeManager(manager, callback);
	}

	return ports;
}

function makeManager(info, callback)
{
	var router = {
		main: callback,
		self: undefined
	};

	var tag = info.tag;
	var onEffects = info.onEffects;
	var onSelfMsg = info.onSelfMsg;

	function onMessage(msg, state)
	{
		if (msg.ctor === 'self')
		{
			return A3(onSelfMsg, router, msg._0, state);
		}

		var fx = msg._0;
		switch (tag)
		{
			case 'cmd':
				return A3(onEffects, router, fx.cmds, state);

			case 'sub':
				return A3(onEffects, router, fx.subs, state);

			case 'fx':
				return A4(onEffects, router, fx.cmds, fx.subs, state);
		}
	}

	var process = spawnLoop(info.init, onMessage);
	router.self = process;
	return process;
}

function sendToApp(router, msg)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		router.main(msg);
		callback(_elm_lang$core$Native_Scheduler.succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function sendToSelf(router, msg)
{
	return A2(_elm_lang$core$Native_Scheduler.send, router.self, {
		ctor: 'self',
		_0: msg
	});
}


// HELPER for STATEFUL LOOPS

function spawnLoop(init, onMessage)
{
	var andThen = _elm_lang$core$Native_Scheduler.andThen;

	function loop(state)
	{
		var handleMsg = _elm_lang$core$Native_Scheduler.receive(function(msg) {
			return onMessage(msg, state);
		});
		return A2(andThen, loop, handleMsg);
	}

	var task = A2(andThen, loop, init);

	return _elm_lang$core$Native_Scheduler.rawSpawn(task);
}


// BAGS

function leaf(home)
{
	return function(value)
	{
		return {
			type: 'leaf',
			home: home,
			value: value
		};
	};
}

function batch(list)
{
	return {
		type: 'node',
		branches: list
	};
}

function map(tagger, bag)
{
	return {
		type: 'map',
		tagger: tagger,
		tree: bag
	}
}


// PIPE BAGS INTO EFFECT MANAGERS

function dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	gatherEffects(true, cmdBag, effectsDict, null);
	gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		var fx = home in effectsDict
			? effectsDict[home]
			: {
				cmds: _elm_lang$core$Native_List.Nil,
				subs: _elm_lang$core$Native_List.Nil
			};

		_elm_lang$core$Native_Scheduler.rawSend(managers[home], { ctor: 'fx', _0: fx });
	}
}

function gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.type)
	{
		case 'leaf':
			var home = bag.home;
			var effect = toEffect(isCmd, home, taggers, bag.value);
			effectsDict[home] = insert(isCmd, effect, effectsDict[home]);
			return;

		case 'node':
			var list = bag.branches;
			while (list.ctor !== '[]')
			{
				gatherEffects(isCmd, list._0, effectsDict, taggers);
				list = list._1;
			}
			return;

		case 'map':
			gatherEffects(isCmd, bag.tree, effectsDict, {
				tagger: bag.tagger,
				rest: taggers
			});
			return;
	}
}

function toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		var temp = taggers;
		while (temp)
		{
			x = temp.tagger(x);
			temp = temp.rest;
		}
		return x;
	}

	var map = isCmd
		? effectManagers[home].cmdMap
		: effectManagers[home].subMap;

	return A2(map, applyTaggers, value)
}

function insert(isCmd, newEffect, effects)
{
	effects = effects || {
		cmds: _elm_lang$core$Native_List.Nil,
		subs: _elm_lang$core$Native_List.Nil
	};
	if (isCmd)
	{
		effects.cmds = _elm_lang$core$Native_List.Cons(newEffect, effects.cmds);
		return effects;
	}
	effects.subs = _elm_lang$core$Native_List.Cons(newEffect, effects.subs);
	return effects;
}


// PORTS

function checkPortName(name)
{
	if (name in effectManagers)
	{
		throw new Error('There can only be one port named `' + name + '`, but your program has multiple.');
	}
}


// OUTGOING PORTS

function outgoingPort(name, converter)
{
	checkPortName(name);
	effectManagers[name] = {
		tag: 'cmd',
		cmdMap: outgoingPortMap,
		converter: converter,
		isForeign: true
	};
	return leaf(name);
}

var outgoingPortMap = F2(function cmdMap(tagger, value) {
	return value;
});

function setupOutgoingPort(name)
{
	var subs = [];
	var converter = effectManagers[name].converter;

	// CREATE MANAGER

	var init = _elm_lang$core$Native_Scheduler.succeed(null);

	function onEffects(router, cmdList, state)
	{
		while (cmdList.ctor !== '[]')
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = converter(cmdList._0);
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
			cmdList = cmdList._1;
		}
		return init;
	}

	effectManagers[name].init = init;
	effectManagers[name].onEffects = F3(onEffects);

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}


// INCOMING PORTS

function incomingPort(name, converter)
{
	checkPortName(name);
	effectManagers[name] = {
		tag: 'sub',
		subMap: incomingPortMap,
		converter: converter,
		isForeign: true
	};
	return leaf(name);
}

var incomingPortMap = F2(function subMap(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});

function setupIncomingPort(name, callback)
{
	var sentBeforeInit = [];
	var subs = _elm_lang$core$Native_List.Nil;
	var converter = effectManagers[name].converter;
	var currentOnEffects = preInitOnEffects;
	var currentSend = preInitSend;

	// CREATE MANAGER

	var init = _elm_lang$core$Native_Scheduler.succeed(null);

	function preInitOnEffects(router, subList, state)
	{
		var postInitResult = postInitOnEffects(router, subList, state);

		for(var i = 0; i < sentBeforeInit.length; i++)
		{
			postInitSend(sentBeforeInit[i]);
		}

		sentBeforeInit = null; // to release objects held in queue
		currentSend = postInitSend;
		currentOnEffects = postInitOnEffects;
		return postInitResult;
	}

	function postInitOnEffects(router, subList, state)
	{
		subs = subList;
		return init;
	}

	function onEffects(router, subList, state)
	{
		return currentOnEffects(router, subList, state);
	}

	effectManagers[name].init = init;
	effectManagers[name].onEffects = F3(onEffects);

	// PUBLIC API

	function preInitSend(value)
	{
		sentBeforeInit.push(value);
	}

	function postInitSend(value)
	{
		var temp = subs;
		while (temp.ctor !== '[]')
		{
			callback(temp._0(value));
			temp = temp._1;
		}
	}

	function send(incomingValue)
	{
		var result = A2(_elm_lang$core$Json_Decode$decodeValue, converter, incomingValue);
		if (result.ctor === 'Err')
		{
			throw new Error('Trying to send an unexpected type of value through port `' + name + '`:\n' + result._0);
		}

		currentSend(result._0);
	}

	return { send: send };
}

return {
	// routers
	sendToApp: F2(sendToApp),
	sendToSelf: F2(sendToSelf),

	// global setup
	effectManagers: effectManagers,
	outgoingPort: outgoingPort,
	incomingPort: incomingPort,

	htmlToProgram: htmlToProgram,
	program: program,
	programWithFlags: programWithFlags,
	initialize: initialize,

	// effect bags
	leaf: leaf,
	batch: batch,
	map: F2(map)
};

}();

//import Native.Utils //

var _elm_lang$core$Native_Scheduler = function() {

var MAX_STEPS = 10000;


// TASKS

function succeed(value)
{
	return {
		ctor: '_Task_succeed',
		value: value
	};
}

function fail(error)
{
	return {
		ctor: '_Task_fail',
		value: error
	};
}

function nativeBinding(callback)
{
	return {
		ctor: '_Task_nativeBinding',
		callback: callback,
		cancel: null
	};
}

function andThen(callback, task)
{
	return {
		ctor: '_Task_andThen',
		callback: callback,
		task: task
	};
}

function onError(callback, task)
{
	return {
		ctor: '_Task_onError',
		callback: callback,
		task: task
	};
}

function receive(callback)
{
	return {
		ctor: '_Task_receive',
		callback: callback
	};
}


// PROCESSES

function rawSpawn(task)
{
	var process = {
		ctor: '_Process',
		id: _elm_lang$core$Native_Utils.guid(),
		root: task,
		stack: null,
		mailbox: []
	};

	enqueue(process);

	return process;
}

function spawn(task)
{
	return nativeBinding(function(callback) {
		var process = rawSpawn(task);
		callback(succeed(process));
	});
}

function rawSend(process, msg)
{
	process.mailbox.push(msg);
	enqueue(process);
}

function send(process, msg)
{
	return nativeBinding(function(callback) {
		rawSend(process, msg);
		callback(succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function kill(process)
{
	return nativeBinding(function(callback) {
		var root = process.root;
		if (root.ctor === '_Task_nativeBinding' && root.cancel)
		{
			root.cancel();
		}

		process.root = null;

		callback(succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function sleep(time)
{
	return nativeBinding(function(callback) {
		var id = setTimeout(function() {
			callback(succeed(_elm_lang$core$Native_Utils.Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}


// STEP PROCESSES

function step(numSteps, process)
{
	while (numSteps < MAX_STEPS)
	{
		var ctor = process.root.ctor;

		if (ctor === '_Task_succeed')
		{
			while (process.stack && process.stack.ctor === '_Task_onError')
			{
				process.stack = process.stack.rest;
			}
			if (process.stack === null)
			{
				break;
			}
			process.root = process.stack.callback(process.root.value);
			process.stack = process.stack.rest;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_fail')
		{
			while (process.stack && process.stack.ctor === '_Task_andThen')
			{
				process.stack = process.stack.rest;
			}
			if (process.stack === null)
			{
				break;
			}
			process.root = process.stack.callback(process.root.value);
			process.stack = process.stack.rest;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_andThen')
		{
			process.stack = {
				ctor: '_Task_andThen',
				callback: process.root.callback,
				rest: process.stack
			};
			process.root = process.root.task;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_onError')
		{
			process.stack = {
				ctor: '_Task_onError',
				callback: process.root.callback,
				rest: process.stack
			};
			process.root = process.root.task;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_nativeBinding')
		{
			process.root.cancel = process.root.callback(function(newRoot) {
				process.root = newRoot;
				enqueue(process);
			});

			break;
		}

		if (ctor === '_Task_receive')
		{
			var mailbox = process.mailbox;
			if (mailbox.length === 0)
			{
				break;
			}

			process.root = process.root.callback(mailbox.shift());
			++numSteps;
			continue;
		}

		throw new Error(ctor);
	}

	if (numSteps < MAX_STEPS)
	{
		return numSteps + 1;
	}
	enqueue(process);

	return numSteps;
}


// WORK QUEUE

var working = false;
var workQueue = [];

function enqueue(process)
{
	workQueue.push(process);

	if (!working)
	{
		setTimeout(work, 0);
		working = true;
	}
}

function work()
{
	var numSteps = 0;
	var process;
	while (numSteps < MAX_STEPS && (process = workQueue.shift()))
	{
		if (process.root)
		{
			numSteps = step(numSteps, process);
		}
	}
	if (!process)
	{
		working = false;
		return;
	}
	setTimeout(work, 0);
}


return {
	succeed: succeed,
	fail: fail,
	nativeBinding: nativeBinding,
	andThen: F2(andThen),
	onError: F2(onError),
	receive: receive,

	spawn: spawn,
	kill: kill,
	sleep: sleep,
	send: F2(send),

	rawSpawn: rawSpawn,
	rawSend: rawSend
};

}();
var _elm_lang$core$Platform_Cmd$batch = _elm_lang$core$Native_Platform.batch;
var _elm_lang$core$Platform_Cmd$none = _elm_lang$core$Platform_Cmd$batch(
	{ctor: '[]'});
var _elm_lang$core$Platform_Cmd_ops = _elm_lang$core$Platform_Cmd_ops || {};
_elm_lang$core$Platform_Cmd_ops['!'] = F2(
	function (model, commands) {
		return {
			ctor: '_Tuple2',
			_0: model,
			_1: _elm_lang$core$Platform_Cmd$batch(commands)
		};
	});
var _elm_lang$core$Platform_Cmd$map = _elm_lang$core$Native_Platform.map;
var _elm_lang$core$Platform_Cmd$Cmd = {ctor: 'Cmd'};

var _elm_lang$core$Platform_Sub$batch = _elm_lang$core$Native_Platform.batch;
var _elm_lang$core$Platform_Sub$none = _elm_lang$core$Platform_Sub$batch(
	{ctor: '[]'});
var _elm_lang$core$Platform_Sub$map = _elm_lang$core$Native_Platform.map;
var _elm_lang$core$Platform_Sub$Sub = {ctor: 'Sub'};

var _elm_lang$core$Platform$hack = _elm_lang$core$Native_Scheduler.succeed;
var _elm_lang$core$Platform$sendToSelf = _elm_lang$core$Native_Platform.sendToSelf;
var _elm_lang$core$Platform$sendToApp = _elm_lang$core$Native_Platform.sendToApp;
var _elm_lang$core$Platform$programWithFlags = _elm_lang$core$Native_Platform.programWithFlags;
var _elm_lang$core$Platform$program = _elm_lang$core$Native_Platform.program;
var _elm_lang$core$Platform$Program = {ctor: 'Program'};
var _elm_lang$core$Platform$Task = {ctor: 'Task'};
var _elm_lang$core$Platform$ProcessId = {ctor: 'ProcessId'};
var _elm_lang$core$Platform$Router = {ctor: 'Router'};

var _elm_lang$lazy$Lazy$force = function (_p0) {
	var _p1 = _p0;
	return _p1._0(
		{ctor: '_Tuple0'});
};
var _elm_lang$lazy$Lazy$Lazy = function (a) {
	return {ctor: 'Lazy', _0: a};
};
var _elm_lang$lazy$Lazy$lazy = function (thunk) {
	return _elm_lang$lazy$Lazy$Lazy(
		_elm_lang$lazy$Native_Lazy.memoize(thunk));
};
var _elm_lang$lazy$Lazy$map = F2(
	function (f, a) {
		return _elm_lang$lazy$Lazy$lazy(
			function (_p2) {
				var _p3 = _p2;
				return f(
					_elm_lang$lazy$Lazy$force(a));
			});
	});
var _elm_lang$lazy$Lazy$map2 = F3(
	function (f, a, b) {
		return _elm_lang$lazy$Lazy$lazy(
			function (_p4) {
				var _p5 = _p4;
				return A2(
					f,
					_elm_lang$lazy$Lazy$force(a),
					_elm_lang$lazy$Lazy$force(b));
			});
	});
var _elm_lang$lazy$Lazy$map3 = F4(
	function (f, a, b, c) {
		return _elm_lang$lazy$Lazy$lazy(
			function (_p6) {
				var _p7 = _p6;
				return A3(
					f,
					_elm_lang$lazy$Lazy$force(a),
					_elm_lang$lazy$Lazy$force(b),
					_elm_lang$lazy$Lazy$force(c));
			});
	});
var _elm_lang$lazy$Lazy$map4 = F5(
	function (f, a, b, c, d) {
		return _elm_lang$lazy$Lazy$lazy(
			function (_p8) {
				var _p9 = _p8;
				return A4(
					f,
					_elm_lang$lazy$Lazy$force(a),
					_elm_lang$lazy$Lazy$force(b),
					_elm_lang$lazy$Lazy$force(c),
					_elm_lang$lazy$Lazy$force(d));
			});
	});
var _elm_lang$lazy$Lazy$map5 = F6(
	function (f, a, b, c, d, e) {
		return _elm_lang$lazy$Lazy$lazy(
			function (_p10) {
				var _p11 = _p10;
				return A5(
					f,
					_elm_lang$lazy$Lazy$force(a),
					_elm_lang$lazy$Lazy$force(b),
					_elm_lang$lazy$Lazy$force(c),
					_elm_lang$lazy$Lazy$force(d),
					_elm_lang$lazy$Lazy$force(e));
			});
	});
var _elm_lang$lazy$Lazy$apply = F2(
	function (f, x) {
		return _elm_lang$lazy$Lazy$lazy(
			function (_p12) {
				var _p13 = _p12;
				return A2(
					_elm_lang$lazy$Lazy$force,
					f,
					_elm_lang$lazy$Lazy$force(x));
			});
	});
var _elm_lang$lazy$Lazy$andThen = F2(
	function (callback, a) {
		return _elm_lang$lazy$Lazy$lazy(
			function (_p14) {
				var _p15 = _p14;
				return _elm_lang$lazy$Lazy$force(
					callback(
						_elm_lang$lazy$Lazy$force(a)));
			});
	});

//import Maybe, Native.List //

var _elm_lang$core$Native_Regex = function() {

function escape(str)
{
	return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}
function caseInsensitive(re)
{
	return new RegExp(re.source, 'gi');
}
function regex(raw)
{
	return new RegExp(raw, 'g');
}

function contains(re, string)
{
	return string.match(re) !== null;
}

function find(n, re, str)
{
	n = n.ctor === 'All' ? Infinity : n._0;
	var out = [];
	var number = 0;
	var string = str;
	var lastIndex = re.lastIndex;
	var prevLastIndex = -1;
	var result;
	while (number++ < n && (result = re.exec(string)))
	{
		if (prevLastIndex === re.lastIndex) break;
		var i = result.length - 1;
		var subs = new Array(i);
		while (i > 0)
		{
			var submatch = result[i];
			subs[--i] = submatch === undefined
				? _elm_lang$core$Maybe$Nothing
				: _elm_lang$core$Maybe$Just(submatch);
		}
		out.push({
			match: result[0],
			submatches: _elm_lang$core$Native_List.fromArray(subs),
			index: result.index,
			number: number
		});
		prevLastIndex = re.lastIndex;
	}
	re.lastIndex = lastIndex;
	return _elm_lang$core$Native_List.fromArray(out);
}

function replace(n, re, replacer, string)
{
	n = n.ctor === 'All' ? Infinity : n._0;
	var count = 0;
	function jsReplacer(match)
	{
		if (count++ >= n)
		{
			return match;
		}
		var i = arguments.length - 3;
		var submatches = new Array(i);
		while (i > 0)
		{
			var submatch = arguments[i];
			submatches[--i] = submatch === undefined
				? _elm_lang$core$Maybe$Nothing
				: _elm_lang$core$Maybe$Just(submatch);
		}
		return replacer({
			match: match,
			submatches: _elm_lang$core$Native_List.fromArray(submatches),
			index: arguments[arguments.length - 2],
			number: count
		});
	}
	return string.replace(re, jsReplacer);
}

function split(n, re, str)
{
	n = n.ctor === 'All' ? Infinity : n._0;
	if (n === Infinity)
	{
		return _elm_lang$core$Native_List.fromArray(str.split(re));
	}
	var string = str;
	var result;
	var out = [];
	var start = re.lastIndex;
	var restoreLastIndex = re.lastIndex;
	while (n--)
	{
		if (!(result = re.exec(string))) break;
		out.push(string.slice(start, result.index));
		start = re.lastIndex;
	}
	out.push(string.slice(start));
	re.lastIndex = restoreLastIndex;
	return _elm_lang$core$Native_List.fromArray(out);
}

return {
	regex: regex,
	caseInsensitive: caseInsensitive,
	escape: escape,

	contains: F2(contains),
	find: F3(find),
	replace: F4(replace),
	split: F3(split)
};

}();

var _elm_lang$core$Regex$split = _elm_lang$core$Native_Regex.split;
var _elm_lang$core$Regex$replace = _elm_lang$core$Native_Regex.replace;
var _elm_lang$core$Regex$find = _elm_lang$core$Native_Regex.find;
var _elm_lang$core$Regex$contains = _elm_lang$core$Native_Regex.contains;
var _elm_lang$core$Regex$caseInsensitive = _elm_lang$core$Native_Regex.caseInsensitive;
var _elm_lang$core$Regex$regex = _elm_lang$core$Native_Regex.regex;
var _elm_lang$core$Regex$escape = _elm_lang$core$Native_Regex.escape;
var _elm_lang$core$Regex$Match = F4(
	function (a, b, c, d) {
		return {match: a, submatches: b, index: c, number: d};
	});
var _elm_lang$core$Regex$Regex = {ctor: 'Regex'};
var _elm_lang$core$Regex$AtMost = function (a) {
	return {ctor: 'AtMost', _0: a};
};
var _elm_lang$core$Regex$All = {ctor: 'All'};

var _Bogdanp$elm_combine$Combine$app = function (p) {
	var _p0 = p;
	if (_p0.ctor === 'Parser') {
		return _p0._0;
	} else {
		return _elm_lang$lazy$Lazy$force(_p0._0);
	}
};
var _Bogdanp$elm_combine$Combine$InputStream = F3(
	function (a, b, c) {
		return {data: a, input: b, position: c};
	});
var _Bogdanp$elm_combine$Combine$initStream = function (s) {
	return A3(_Bogdanp$elm_combine$Combine$InputStream, s, s, 0);
};
var _Bogdanp$elm_combine$Combine$runParser = F3(
	function (p, st, s) {
		var _p1 = A3(
			_Bogdanp$elm_combine$Combine$app,
			p,
			st,
			_Bogdanp$elm_combine$Combine$initStream(s));
		if (_p1._2.ctor === 'Ok') {
			return _elm_lang$core$Result$Ok(
				{ctor: '_Tuple3', _0: _p1._0, _1: _p1._1, _2: _p1._2._0});
		} else {
			return _elm_lang$core$Result$Err(
				{ctor: '_Tuple3', _0: _p1._0, _1: _p1._1, _2: _p1._2._0});
		}
	});
var _Bogdanp$elm_combine$Combine$parse = function (p) {
	return A2(
		_Bogdanp$elm_combine$Combine$runParser,
		p,
		{ctor: '_Tuple0'});
};
var _Bogdanp$elm_combine$Combine$ParseLocation = F3(
	function (a, b, c) {
		return {source: a, line: b, column: c};
	});
var _Bogdanp$elm_combine$Combine$currentLocation = function (stream) {
	var find = F3(
		function (position, currentLine, lines) {
			find:
			while (true) {
				var _p2 = lines;
				if (_p2.ctor === '[]') {
					return A3(_Bogdanp$elm_combine$Combine$ParseLocation, '', 1, position);
				} else {
					if (_p2._1.ctor === '[]') {
						return A3(_Bogdanp$elm_combine$Combine$ParseLocation, _p2._0, currentLine + 1, position);
					} else {
						var _p3 = _p2._0;
						var length = _elm_lang$core$String$length(_p3);
						if (_elm_lang$core$Native_Utils.cmp(position, length) > -1) {
							var _v3 = (position - length) - 1,
								_v4 = currentLine + 1,
								_v5 = _p2._1;
							position = _v3;
							currentLine = _v4;
							lines = _v5;
							continue find;
						} else {
							if (_elm_lang$core$Native_Utils.eq(currentLine, 0)) {
								return A3(_Bogdanp$elm_combine$Combine$ParseLocation, _p3, 1, position);
							} else {
								return A3(_Bogdanp$elm_combine$Combine$ParseLocation, _p3, currentLine, position - 1);
							}
						}
					}
				}
			}
		});
	var lines = A2(_elm_lang$core$String$split, '\n', stream.data);
	return A3(find, stream.position, 0, lines);
};
var _Bogdanp$elm_combine$Combine$currentSourceLine = function (_p4) {
	return function (_) {
		return _.source;
	}(
		_Bogdanp$elm_combine$Combine$currentLocation(_p4));
};
var _Bogdanp$elm_combine$Combine$currentLine = function (_p5) {
	return function (_) {
		return _.line;
	}(
		_Bogdanp$elm_combine$Combine$currentLocation(_p5));
};
var _Bogdanp$elm_combine$Combine$currentColumn = function (_p6) {
	return function (_) {
		return _.column;
	}(
		_Bogdanp$elm_combine$Combine$currentLocation(_p6));
};
var _Bogdanp$elm_combine$Combine$RecursiveParser = function (a) {
	return {ctor: 'RecursiveParser', _0: a};
};
var _Bogdanp$elm_combine$Combine$lazy = function (t) {
	return _Bogdanp$elm_combine$Combine$RecursiveParser(
		_elm_lang$lazy$Lazy$lazy(
			function (_p7) {
				var _p8 = _p7;
				return _Bogdanp$elm_combine$Combine$app(
					t(
						{ctor: '_Tuple0'}));
			}));
};
var _Bogdanp$elm_combine$Combine$Parser = function (a) {
	return {ctor: 'Parser', _0: a};
};
var _Bogdanp$elm_combine$Combine$primitive = _Bogdanp$elm_combine$Combine$Parser;
var _Bogdanp$elm_combine$Combine$bimap = F3(
	function (fok, ferr, p) {
		return _Bogdanp$elm_combine$Combine$Parser(
			F2(
				function (state, stream) {
					var _p9 = A3(_Bogdanp$elm_combine$Combine$app, p, state, stream);
					if (_p9._2.ctor === 'Ok') {
						return {
							ctor: '_Tuple3',
							_0: _p9._0,
							_1: _p9._1,
							_2: _elm_lang$core$Result$Ok(
								fok(_p9._2._0))
						};
					} else {
						return {
							ctor: '_Tuple3',
							_0: _p9._0,
							_1: _p9._1,
							_2: _elm_lang$core$Result$Err(
								ferr(_p9._2._0))
						};
					}
				}));
	});
var _Bogdanp$elm_combine$Combine$map = F2(
	function (f, p) {
		return A3(_Bogdanp$elm_combine$Combine$bimap, f, _elm_lang$core$Basics$identity, p);
	});
var _Bogdanp$elm_combine$Combine_ops = _Bogdanp$elm_combine$Combine_ops || {};
_Bogdanp$elm_combine$Combine_ops['<$>'] = _Bogdanp$elm_combine$Combine$map;
var _Bogdanp$elm_combine$Combine_ops = _Bogdanp$elm_combine$Combine_ops || {};
_Bogdanp$elm_combine$Combine_ops['<$'] = function (res) {
	return _Bogdanp$elm_combine$Combine$map(
		_elm_lang$core$Basics$always(res));
};
var _Bogdanp$elm_combine$Combine$skip = function (p) {
	return A2(
		_Bogdanp$elm_combine$Combine_ops['<$'],
		{ctor: '_Tuple0'},
		p);
};
var _Bogdanp$elm_combine$Combine_ops = _Bogdanp$elm_combine$Combine_ops || {};
_Bogdanp$elm_combine$Combine_ops['$>'] = _elm_lang$core$Basics$flip(
	F2(
		function (x, y) {
			return A2(_Bogdanp$elm_combine$Combine_ops['<$'], x, y);
		}));
var _Bogdanp$elm_combine$Combine$mapError = _Bogdanp$elm_combine$Combine$bimap(_elm_lang$core$Basics$identity);
var _Bogdanp$elm_combine$Combine_ops = _Bogdanp$elm_combine$Combine_ops || {};
_Bogdanp$elm_combine$Combine_ops['<?>'] = F2(
	function (p, m) {
		return A2(
			_Bogdanp$elm_combine$Combine$mapError,
			_elm_lang$core$Basics$always(
				{
					ctor: '::',
					_0: m,
					_1: {ctor: '[]'}
				}),
			p);
	});
var _Bogdanp$elm_combine$Combine$withState = function (f) {
	return _Bogdanp$elm_combine$Combine$Parser(
		F2(
			function (state, stream) {
				return A3(
					_Bogdanp$elm_combine$Combine$app,
					f(state),
					state,
					stream);
			}));
};
var _Bogdanp$elm_combine$Combine$withLocation = function (f) {
	return _Bogdanp$elm_combine$Combine$Parser(
		F2(
			function (state, stream) {
				return A3(
					_Bogdanp$elm_combine$Combine$app,
					f(
						_Bogdanp$elm_combine$Combine$currentLocation(stream)),
					state,
					stream);
			}));
};
var _Bogdanp$elm_combine$Combine$withLine = function (f) {
	return _Bogdanp$elm_combine$Combine$Parser(
		F2(
			function (state, stream) {
				return A3(
					_Bogdanp$elm_combine$Combine$app,
					f(
						_Bogdanp$elm_combine$Combine$currentLine(stream)),
					state,
					stream);
			}));
};
var _Bogdanp$elm_combine$Combine$withColumn = function (f) {
	return _Bogdanp$elm_combine$Combine$Parser(
		F2(
			function (state, stream) {
				return A3(
					_Bogdanp$elm_combine$Combine$app,
					f(
						_Bogdanp$elm_combine$Combine$currentColumn(stream)),
					state,
					stream);
			}));
};
var _Bogdanp$elm_combine$Combine$andThen = F2(
	function (f, p) {
		return _Bogdanp$elm_combine$Combine$Parser(
			F2(
				function (state, stream) {
					var _p10 = A3(_Bogdanp$elm_combine$Combine$app, p, state, stream);
					if (_p10._2.ctor === 'Ok') {
						return A3(
							_Bogdanp$elm_combine$Combine$app,
							f(_p10._2._0),
							_p10._0,
							_p10._1);
					} else {
						return {
							ctor: '_Tuple3',
							_0: _p10._0,
							_1: _p10._1,
							_2: _elm_lang$core$Result$Err(_p10._2._0)
						};
					}
				}));
	});
var _Bogdanp$elm_combine$Combine_ops = _Bogdanp$elm_combine$Combine_ops || {};
_Bogdanp$elm_combine$Combine_ops['>>='] = _elm_lang$core$Basics$flip(_Bogdanp$elm_combine$Combine$andThen);
var _Bogdanp$elm_combine$Combine$andMap = F2(
	function (rp, lp) {
		return A2(
			_Bogdanp$elm_combine$Combine_ops['>>='],
			lp,
			A2(_elm_lang$core$Basics$flip, _Bogdanp$elm_combine$Combine$map, rp));
	});
var _Bogdanp$elm_combine$Combine_ops = _Bogdanp$elm_combine$Combine_ops || {};
_Bogdanp$elm_combine$Combine_ops['<*>'] = _elm_lang$core$Basics$flip(_Bogdanp$elm_combine$Combine$andMap);
var _Bogdanp$elm_combine$Combine_ops = _Bogdanp$elm_combine$Combine_ops || {};
_Bogdanp$elm_combine$Combine_ops['<*'] = F2(
	function (lp, rp) {
		return A2(
			_Bogdanp$elm_combine$Combine$andMap,
			rp,
			A2(_Bogdanp$elm_combine$Combine$map, _elm_lang$core$Basics$always, lp));
	});
var _Bogdanp$elm_combine$Combine_ops = _Bogdanp$elm_combine$Combine_ops || {};
_Bogdanp$elm_combine$Combine_ops['*>'] = F2(
	function (lp, rp) {
		return A2(
			_Bogdanp$elm_combine$Combine$andMap,
			rp,
			A2(
				_Bogdanp$elm_combine$Combine$map,
				_elm_lang$core$Basics$flip(_elm_lang$core$Basics$always),
				lp));
	});
var _Bogdanp$elm_combine$Combine$between = F3(
	function (lp, rp, p) {
		return A2(
			_Bogdanp$elm_combine$Combine_ops['<*'],
			A2(_Bogdanp$elm_combine$Combine_ops['*>'], lp, p),
			rp);
	});
var _Bogdanp$elm_combine$Combine$sequence = function (ps) {
	var accumulate = F4(
		function (acc, ps, state, stream) {
			accumulate:
			while (true) {
				var _p11 = ps;
				if (_p11.ctor === '[]') {
					return {
						ctor: '_Tuple3',
						_0: state,
						_1: stream,
						_2: _elm_lang$core$Result$Ok(
							_elm_lang$core$List$reverse(acc))
					};
				} else {
					var _p12 = A3(_Bogdanp$elm_combine$Combine$app, _p11._0, state, stream);
					if (_p12._2.ctor === 'Ok') {
						var _v11 = {ctor: '::', _0: _p12._2._0, _1: acc},
							_v12 = _p11._1,
							_v13 = _p12._0,
							_v14 = _p12._1;
						acc = _v11;
						ps = _v12;
						state = _v13;
						stream = _v14;
						continue accumulate;
					} else {
						return {
							ctor: '_Tuple3',
							_0: _p12._0,
							_1: _p12._1,
							_2: _elm_lang$core$Result$Err(_p12._2._0)
						};
					}
				}
			}
		});
	return _Bogdanp$elm_combine$Combine$Parser(
		F2(
			function (state, stream) {
				return A4(
					accumulate,
					{ctor: '[]'},
					ps,
					state,
					stream);
			}));
};
var _Bogdanp$elm_combine$Combine$fail = function (m) {
	return _Bogdanp$elm_combine$Combine$Parser(
		F2(
			function (state, stream) {
				return {
					ctor: '_Tuple3',
					_0: state,
					_1: stream,
					_2: _elm_lang$core$Result$Err(
						{
							ctor: '::',
							_0: m,
							_1: {ctor: '[]'}
						})
				};
			}));
};
var _Bogdanp$elm_combine$Combine$emptyErr = _Bogdanp$elm_combine$Combine$Parser(
	F2(
		function (state, stream) {
			return {
				ctor: '_Tuple3',
				_0: state,
				_1: stream,
				_2: _elm_lang$core$Result$Err(
					{ctor: '[]'})
			};
		}));
var _Bogdanp$elm_combine$Combine$succeed = function (res) {
	return _Bogdanp$elm_combine$Combine$Parser(
		F2(
			function (state, stream) {
				return {
					ctor: '_Tuple3',
					_0: state,
					_1: stream,
					_2: _elm_lang$core$Result$Ok(res)
				};
			}));
};
var _Bogdanp$elm_combine$Combine$putState = function (state) {
	return _Bogdanp$elm_combine$Combine$Parser(
		F2(
			function (_p13, stream) {
				return A3(
					_Bogdanp$elm_combine$Combine$app,
					_Bogdanp$elm_combine$Combine$succeed(
						{ctor: '_Tuple0'}),
					state,
					stream);
			}));
};
var _Bogdanp$elm_combine$Combine$modifyState = function (f) {
	return _Bogdanp$elm_combine$Combine$Parser(
		F2(
			function (state, stream) {
				return A3(
					_Bogdanp$elm_combine$Combine$app,
					_Bogdanp$elm_combine$Combine$succeed(
						{ctor: '_Tuple0'}),
					f(state),
					stream);
			}));
};
var _Bogdanp$elm_combine$Combine$count = F2(
	function (n, p) {
		var accumulate = F2(
			function (x, acc) {
				return (_elm_lang$core$Native_Utils.cmp(x, 0) < 1) ? _Bogdanp$elm_combine$Combine$succeed(
					_elm_lang$core$List$reverse(acc)) : A2(
					_Bogdanp$elm_combine$Combine$andThen,
					function (res) {
						return A2(
							accumulate,
							x - 1,
							{ctor: '::', _0: res, _1: acc});
					},
					p);
			});
		return A2(
			accumulate,
			n,
			{ctor: '[]'});
	});
var _Bogdanp$elm_combine$Combine$string = function (s) {
	return _Bogdanp$elm_combine$Combine$Parser(
		F2(
			function (state, stream) {
				if (A2(_elm_lang$core$String$startsWith, s, stream.input)) {
					var len = _elm_lang$core$String$length(s);
					var rem = A2(_elm_lang$core$String$dropLeft, len, stream.input);
					var pos = stream.position + len;
					return {
						ctor: '_Tuple3',
						_0: state,
						_1: _elm_lang$core$Native_Utils.update(
							stream,
							{input: rem, position: pos}),
						_2: _elm_lang$core$Result$Ok(s)
					};
				} else {
					return {
						ctor: '_Tuple3',
						_0: state,
						_1: stream,
						_2: _elm_lang$core$Result$Err(
							{
								ctor: '::',
								_0: A2(
									_elm_lang$core$Basics_ops['++'],
									'expected ',
									_elm_lang$core$Basics$toString(s)),
								_1: {ctor: '[]'}
							})
					};
				}
			}));
};
var _Bogdanp$elm_combine$Combine$parens = A2(
	_Bogdanp$elm_combine$Combine$between,
	_Bogdanp$elm_combine$Combine$string('('),
	_Bogdanp$elm_combine$Combine$string(')'));
var _Bogdanp$elm_combine$Combine$braces = A2(
	_Bogdanp$elm_combine$Combine$between,
	_Bogdanp$elm_combine$Combine$string('{'),
	_Bogdanp$elm_combine$Combine$string('}'));
var _Bogdanp$elm_combine$Combine$brackets = A2(
	_Bogdanp$elm_combine$Combine$between,
	_Bogdanp$elm_combine$Combine$string('['),
	_Bogdanp$elm_combine$Combine$string(']'));
var _Bogdanp$elm_combine$Combine$regex = function (pat) {
	var pattern = A2(_elm_lang$core$String$startsWith, '^', pat) ? pat : A2(_elm_lang$core$Basics_ops['++'], '^', pat);
	return _Bogdanp$elm_combine$Combine$Parser(
		F2(
			function (state, stream) {
				var _p14 = A3(
					_elm_lang$core$Regex$find,
					_elm_lang$core$Regex$AtMost(1),
					_elm_lang$core$Regex$regex(pattern),
					stream.input);
				if ((_p14.ctor === '::') && (_p14._1.ctor === '[]')) {
					var _p15 = _p14._0;
					var len = _elm_lang$core$String$length(_p15.match);
					var rem = A2(_elm_lang$core$String$dropLeft, len, stream.input);
					var pos = stream.position + len;
					return {
						ctor: '_Tuple3',
						_0: state,
						_1: _elm_lang$core$Native_Utils.update(
							stream,
							{input: rem, position: pos}),
						_2: _elm_lang$core$Result$Ok(_p15.match)
					};
				} else {
					return {
						ctor: '_Tuple3',
						_0: state,
						_1: stream,
						_2: _elm_lang$core$Result$Err(
							{
								ctor: '::',
								_0: A2(
									_elm_lang$core$Basics_ops['++'],
									'expected input matching Regexp /',
									A2(_elm_lang$core$Basics_ops['++'], pattern, '/')),
								_1: {ctor: '[]'}
							})
					};
				}
			}));
};
var _Bogdanp$elm_combine$Combine$whitespace = A2(
	_Bogdanp$elm_combine$Combine_ops['<?>'],
	_Bogdanp$elm_combine$Combine$regex('[ \t\r\n]*'),
	'whitespace');
var _Bogdanp$elm_combine$Combine$while = function (pred) {
	var accumulate = F3(
		function (acc, state, stream) {
			accumulate:
			while (true) {
				var _p16 = _elm_lang$core$String$uncons(stream.input);
				if (_p16.ctor === 'Just') {
					var _p17 = _p16._0._0;
					if (pred(_p17)) {
						var pos = stream.position + 1;
						var c = A2(_elm_lang$core$String$cons, _p17, '');
						var _v17 = A2(_elm_lang$core$Basics_ops['++'], acc, c),
							_v18 = state,
							_v19 = _elm_lang$core$Native_Utils.update(
							stream,
							{input: _p16._0._1, position: pos});
						acc = _v17;
						state = _v18;
						stream = _v19;
						continue accumulate;
					} else {
						return {ctor: '_Tuple3', _0: state, _1: stream, _2: acc};
					}
				} else {
					return {ctor: '_Tuple3', _0: state, _1: stream, _2: acc};
				}
			}
		});
	return _Bogdanp$elm_combine$Combine$Parser(
		F2(
			function (state, stream) {
				var _p18 = A3(accumulate, '', state, stream);
				var rstate = _p18._0;
				var rstream = _p18._1;
				var res = _p18._2;
				return {
					ctor: '_Tuple3',
					_0: rstate,
					_1: rstream,
					_2: _elm_lang$core$Result$Ok(res)
				};
			}));
};
var _Bogdanp$elm_combine$Combine$end = _Bogdanp$elm_combine$Combine$Parser(
	F2(
		function (state, stream) {
			return _elm_lang$core$Native_Utils.eq(stream.input, '') ? {
				ctor: '_Tuple3',
				_0: state,
				_1: stream,
				_2: _elm_lang$core$Result$Ok(
					{ctor: '_Tuple0'})
			} : {
				ctor: '_Tuple3',
				_0: state,
				_1: stream,
				_2: _elm_lang$core$Result$Err(
					{
						ctor: '::',
						_0: 'expected end of input',
						_1: {ctor: '[]'}
					})
			};
		}));
var _Bogdanp$elm_combine$Combine$lookAhead = function (p) {
	return _Bogdanp$elm_combine$Combine$Parser(
		F2(
			function (state, stream) {
				var _p19 = A3(_Bogdanp$elm_combine$Combine$app, p, state, stream);
				if ((_p19.ctor === '_Tuple3') && (_p19._2.ctor === 'Ok')) {
					return {
						ctor: '_Tuple3',
						_0: _p19._0,
						_1: stream,
						_2: _elm_lang$core$Result$Ok(_p19._2._0)
					};
				} else {
					return _p19;
				}
			}));
};
var _Bogdanp$elm_combine$Combine$or = F2(
	function (lp, rp) {
		return _Bogdanp$elm_combine$Combine$Parser(
			F2(
				function (state, stream) {
					var _p20 = A3(_Bogdanp$elm_combine$Combine$app, lp, state, stream);
					if (_p20._2.ctor === 'Ok') {
						return _p20;
					} else {
						var _p21 = A3(_Bogdanp$elm_combine$Combine$app, rp, state, stream);
						if (_p21._2.ctor === 'Ok') {
							return _p21;
						} else {
							return {
								ctor: '_Tuple3',
								_0: state,
								_1: stream,
								_2: _elm_lang$core$Result$Err(
									A2(_elm_lang$core$Basics_ops['++'], _p20._2._0, _p21._2._0))
							};
						}
					}
				}));
	});
var _Bogdanp$elm_combine$Combine$choice = function (xs) {
	return A3(_elm_lang$core$List$foldr, _Bogdanp$elm_combine$Combine$or, _Bogdanp$elm_combine$Combine$emptyErr, xs);
};
var _Bogdanp$elm_combine$Combine_ops = _Bogdanp$elm_combine$Combine_ops || {};
_Bogdanp$elm_combine$Combine_ops['<|>'] = _Bogdanp$elm_combine$Combine$or;
var _Bogdanp$elm_combine$Combine$optional = F2(
	function (res, p) {
		return A2(
			_Bogdanp$elm_combine$Combine_ops['<|>'],
			p,
			_Bogdanp$elm_combine$Combine$succeed(res));
	});
var _Bogdanp$elm_combine$Combine$chainl = F2(
	function (op, p) {
		var accumulate = function (x) {
			return A2(
				_Bogdanp$elm_combine$Combine_ops['<|>'],
				A2(
					_Bogdanp$elm_combine$Combine$andThen,
					function (f) {
						return A2(
							_Bogdanp$elm_combine$Combine$andThen,
							function (y) {
								return accumulate(
									A2(f, x, y));
							},
							p);
					},
					op),
				_Bogdanp$elm_combine$Combine$succeed(x));
		};
		return A2(_Bogdanp$elm_combine$Combine$andThen, accumulate, p);
	});
var _Bogdanp$elm_combine$Combine$chainr = F2(
	function (op, p) {
		var accumulate = function (x) {
			return A2(
				_Bogdanp$elm_combine$Combine_ops['<|>'],
				A2(
					_Bogdanp$elm_combine$Combine$andThen,
					function (f) {
						return A2(
							_Bogdanp$elm_combine$Combine$andThen,
							function (y) {
								return _Bogdanp$elm_combine$Combine$succeed(
									A2(f, x, y));
							},
							A2(_Bogdanp$elm_combine$Combine$andThen, accumulate, p));
					},
					op),
				_Bogdanp$elm_combine$Combine$succeed(x));
		};
		return A2(_Bogdanp$elm_combine$Combine$andThen, accumulate, p);
	});
var _Bogdanp$elm_combine$Combine$maybe = function (p) {
	return _Bogdanp$elm_combine$Combine$Parser(
		F2(
			function (state, stream) {
				var _p22 = A3(_Bogdanp$elm_combine$Combine$app, p, state, stream);
				if ((_p22.ctor === '_Tuple3') && (_p22._2.ctor === 'Ok')) {
					return {
						ctor: '_Tuple3',
						_0: _p22._0,
						_1: _p22._1,
						_2: _elm_lang$core$Result$Ok(
							_elm_lang$core$Maybe$Just(_p22._2._0))
					};
				} else {
					return {
						ctor: '_Tuple3',
						_0: state,
						_1: stream,
						_2: _elm_lang$core$Result$Ok(_elm_lang$core$Maybe$Nothing)
					};
				}
			}));
};
var _Bogdanp$elm_combine$Combine$many = function (p) {
	var accumulate = F3(
		function (acc, state, stream) {
			accumulate:
			while (true) {
				var _p23 = A3(_Bogdanp$elm_combine$Combine$app, p, state, stream);
				if ((_p23.ctor === '_Tuple3') && (_p23._2.ctor === 'Ok')) {
					var _p25 = _p23._1;
					var _p24 = _p23._0;
					if (_elm_lang$core$Native_Utils.eq(stream, _p25)) {
						return {
							ctor: '_Tuple3',
							_0: _p24,
							_1: _p25,
							_2: _elm_lang$core$List$reverse(acc)
						};
					} else {
						var _v25 = {ctor: '::', _0: _p23._2._0, _1: acc},
							_v26 = _p24,
							_v27 = _p25;
						acc = _v25;
						state = _v26;
						stream = _v27;
						continue accumulate;
					}
				} else {
					return {
						ctor: '_Tuple3',
						_0: state,
						_1: stream,
						_2: _elm_lang$core$List$reverse(acc)
					};
				}
			}
		});
	return _Bogdanp$elm_combine$Combine$Parser(
		F2(
			function (state, stream) {
				var _p26 = A3(
					accumulate,
					{ctor: '[]'},
					state,
					stream);
				var rstate = _p26._0;
				var rstream = _p26._1;
				var res = _p26._2;
				return {
					ctor: '_Tuple3',
					_0: rstate,
					_1: rstream,
					_2: _elm_lang$core$Result$Ok(res)
				};
			}));
};
var _Bogdanp$elm_combine$Combine$many1 = function (p) {
	return A2(
		_Bogdanp$elm_combine$Combine_ops['<*>'],
		A2(
			_Bogdanp$elm_combine$Combine_ops['<$>'],
			F2(
				function (x, y) {
					return {ctor: '::', _0: x, _1: y};
				}),
			p),
		_Bogdanp$elm_combine$Combine$many(p));
};
var _Bogdanp$elm_combine$Combine$skipMany1 = function (p) {
	return A2(
		_Bogdanp$elm_combine$Combine_ops['<$'],
		{ctor: '_Tuple0'},
		_Bogdanp$elm_combine$Combine$many1(
			_Bogdanp$elm_combine$Combine$skip(p)));
};
var _Bogdanp$elm_combine$Combine$sepBy1 = F2(
	function (sep, p) {
		return A2(
			_Bogdanp$elm_combine$Combine_ops['<*>'],
			A2(
				_Bogdanp$elm_combine$Combine_ops['<$>'],
				F2(
					function (x, y) {
						return {ctor: '::', _0: x, _1: y};
					}),
				p),
			_Bogdanp$elm_combine$Combine$many(
				A2(_Bogdanp$elm_combine$Combine_ops['*>'], sep, p)));
	});
var _Bogdanp$elm_combine$Combine$sepBy = F2(
	function (sep, p) {
		return A2(
			_Bogdanp$elm_combine$Combine_ops['<|>'],
			A2(_Bogdanp$elm_combine$Combine$sepBy1, sep, p),
			_Bogdanp$elm_combine$Combine$succeed(
				{ctor: '[]'}));
	});
var _Bogdanp$elm_combine$Combine$sepEndBy1 = F2(
	function (sep, p) {
		return A2(
			_Bogdanp$elm_combine$Combine_ops['<*'],
			A2(_Bogdanp$elm_combine$Combine$sepBy1, sep, p),
			_Bogdanp$elm_combine$Combine$maybe(sep));
	});
var _Bogdanp$elm_combine$Combine$sepEndBy = F2(
	function (sep, p) {
		return A2(
			_Bogdanp$elm_combine$Combine_ops['<|>'],
			A2(_Bogdanp$elm_combine$Combine$sepEndBy1, sep, p),
			_Bogdanp$elm_combine$Combine$succeed(
				{ctor: '[]'}));
	});
var _Bogdanp$elm_combine$Combine$skipMany = function (p) {
	return A2(
		_Bogdanp$elm_combine$Combine_ops['<$'],
		{ctor: '_Tuple0'},
		_Bogdanp$elm_combine$Combine$many(
			_Bogdanp$elm_combine$Combine$skip(p)));
};
var _Bogdanp$elm_combine$Combine$manyTill = F2(
	function (p, end) {
		var accumulate = F3(
			function (acc, state, stream) {
				accumulate:
				while (true) {
					var _p27 = A3(_Bogdanp$elm_combine$Combine$app, end, state, stream);
					if (_p27._2.ctor === 'Ok') {
						return {
							ctor: '_Tuple3',
							_0: _p27._0,
							_1: _p27._1,
							_2: _elm_lang$core$Result$Ok(
								_elm_lang$core$List$reverse(acc))
						};
					} else {
						var _p28 = A3(_Bogdanp$elm_combine$Combine$app, p, state, stream);
						if ((_p28.ctor === '_Tuple3') && (_p28._2.ctor === 'Ok')) {
							var _v30 = {ctor: '::', _0: _p28._2._0, _1: acc},
								_v31 = _p28._0,
								_v32 = _p28._1;
							acc = _v30;
							state = _v31;
							stream = _v32;
							continue accumulate;
						} else {
							return {
								ctor: '_Tuple3',
								_0: _p27._0,
								_1: _p27._1,
								_2: _elm_lang$core$Result$Err(_p27._2._0)
							};
						}
					}
				}
			});
		return _Bogdanp$elm_combine$Combine$Parser(
			accumulate(
				{ctor: '[]'}));
	});

var _Bogdanp$elm_combine$Combine_Char$crlf = A2(
	_Bogdanp$elm_combine$Combine_ops['<$'],
	_elm_lang$core$Native_Utils.chr('\n'),
	A2(
		_Bogdanp$elm_combine$Combine_ops['<?>'],
		_Bogdanp$elm_combine$Combine$regex('\r\n'),
		'expected crlf'));
var _Bogdanp$elm_combine$Combine_Char$satisfy = function (pred) {
	return _Bogdanp$elm_combine$Combine$primitive(
		F2(
			function (state, stream) {
				var message = 'could not satisfy predicate';
				var _p0 = _elm_lang$core$String$uncons(stream.input);
				if (_p0.ctor === 'Just') {
					var _p1 = _p0._0._0;
					return pred(_p1) ? {
						ctor: '_Tuple3',
						_0: state,
						_1: _elm_lang$core$Native_Utils.update(
							stream,
							{input: _p0._0._1, position: stream.position + 1}),
						_2: _elm_lang$core$Result$Ok(_p1)
					} : {
						ctor: '_Tuple3',
						_0: state,
						_1: stream,
						_2: _elm_lang$core$Result$Err(
							{
								ctor: '::',
								_0: message,
								_1: {ctor: '[]'}
							})
					};
				} else {
					return {
						ctor: '_Tuple3',
						_0: state,
						_1: stream,
						_2: _elm_lang$core$Result$Err(
							{
								ctor: '::',
								_0: message,
								_1: {ctor: '[]'}
							})
					};
				}
			}));
};
var _Bogdanp$elm_combine$Combine_Char$char = function (c) {
	return A2(
		_Bogdanp$elm_combine$Combine_ops['<?>'],
		_Bogdanp$elm_combine$Combine_Char$satisfy(
			F2(
				function (x, y) {
					return _elm_lang$core$Native_Utils.eq(x, y);
				})(c)),
		A2(
			_elm_lang$core$Basics_ops['++'],
			'expected ',
			_elm_lang$core$Basics$toString(c)));
};
var _Bogdanp$elm_combine$Combine_Char$anyChar = A2(
	_Bogdanp$elm_combine$Combine_ops['<?>'],
	_Bogdanp$elm_combine$Combine_Char$satisfy(
		_elm_lang$core$Basics$always(true)),
	'expected any character');
var _Bogdanp$elm_combine$Combine_Char$oneOf = function (cs) {
	return A2(
		_Bogdanp$elm_combine$Combine_ops['<?>'],
		_Bogdanp$elm_combine$Combine_Char$satisfy(
			A2(_elm_lang$core$Basics$flip, _elm_lang$core$List$member, cs)),
		A2(
			_elm_lang$core$Basics_ops['++'],
			'expected one of ',
			_elm_lang$core$Basics$toString(cs)));
};
var _Bogdanp$elm_combine$Combine_Char$noneOf = function (cs) {
	return A2(
		_Bogdanp$elm_combine$Combine_ops['<?>'],
		_Bogdanp$elm_combine$Combine_Char$satisfy(
			function (_p2) {
				return !A3(_elm_lang$core$Basics$flip, _elm_lang$core$List$member, cs, _p2);
			}),
		A2(
			_elm_lang$core$Basics_ops['++'],
			'expected none of ',
			_elm_lang$core$Basics$toString(cs)));
};
var _Bogdanp$elm_combine$Combine_Char$space = A2(
	_Bogdanp$elm_combine$Combine_ops['<?>'],
	_Bogdanp$elm_combine$Combine_Char$satisfy(
		F2(
			function (x, y) {
				return _elm_lang$core$Native_Utils.eq(x, y);
			})(
			_elm_lang$core$Native_Utils.chr(' '))),
	'expected space');
var _Bogdanp$elm_combine$Combine_Char$tab = A2(
	_Bogdanp$elm_combine$Combine_ops['<?>'],
	_Bogdanp$elm_combine$Combine_Char$satisfy(
		F2(
			function (x, y) {
				return _elm_lang$core$Native_Utils.eq(x, y);
			})(
			_elm_lang$core$Native_Utils.chr('\t'))),
	'expected tab');
var _Bogdanp$elm_combine$Combine_Char$newline = A2(
	_Bogdanp$elm_combine$Combine_ops['<?>'],
	_Bogdanp$elm_combine$Combine_Char$satisfy(
		F2(
			function (x, y) {
				return _elm_lang$core$Native_Utils.eq(x, y);
			})(
			_elm_lang$core$Native_Utils.chr('\n'))),
	'expected newline');
var _Bogdanp$elm_combine$Combine_Char$eol = A2(_Bogdanp$elm_combine$Combine_ops['<|>'], _Bogdanp$elm_combine$Combine_Char$newline, _Bogdanp$elm_combine$Combine_Char$crlf);
var _Bogdanp$elm_combine$Combine_Char$lower = A2(
	_Bogdanp$elm_combine$Combine_ops['<?>'],
	_Bogdanp$elm_combine$Combine_Char$satisfy(_elm_lang$core$Char$isLower),
	'expected a lowercase character');
var _Bogdanp$elm_combine$Combine_Char$upper = A2(
	_Bogdanp$elm_combine$Combine_ops['<?>'],
	_Bogdanp$elm_combine$Combine_Char$satisfy(_elm_lang$core$Char$isUpper),
	'expected an uppercase character');
var _Bogdanp$elm_combine$Combine_Char$digit = A2(
	_Bogdanp$elm_combine$Combine_ops['<?>'],
	_Bogdanp$elm_combine$Combine_Char$satisfy(_elm_lang$core$Char$isDigit),
	'expected a digit');
var _Bogdanp$elm_combine$Combine_Char$octDigit = A2(
	_Bogdanp$elm_combine$Combine_ops['<?>'],
	_Bogdanp$elm_combine$Combine_Char$satisfy(_elm_lang$core$Char$isOctDigit),
	'expected an octal digit');
var _Bogdanp$elm_combine$Combine_Char$hexDigit = A2(
	_Bogdanp$elm_combine$Combine_ops['<?>'],
	_Bogdanp$elm_combine$Combine_Char$satisfy(_elm_lang$core$Char$isHexDigit),
	'expected a hexadecimal digit');

//import Native.List //

var _elm_lang$core$Native_Array = function() {

// A RRB-Tree has two distinct data types.
// Leaf -> "height"  is always 0
//         "table"   is an array of elements
// Node -> "height"  is always greater than 0
//         "table"   is an array of child nodes
//         "lengths" is an array of accumulated lengths of the child nodes

// M is the maximal table size. 32 seems fast. E is the allowed increase
// of search steps when concatting to find an index. Lower values will
// decrease balancing, but will increase search steps.
var M = 32;
var E = 2;

// An empty array.
var empty = {
	ctor: '_Array',
	height: 0,
	table: []
};


function get(i, array)
{
	if (i < 0 || i >= length(array))
	{
		throw new Error(
			'Index ' + i + ' is out of range. Check the length of ' +
			'your array first or use getMaybe or getWithDefault.');
	}
	return unsafeGet(i, array);
}


function unsafeGet(i, array)
{
	for (var x = array.height; x > 0; x--)
	{
		var slot = i >> (x * 5);
		while (array.lengths[slot] <= i)
		{
			slot++;
		}
		if (slot > 0)
		{
			i -= array.lengths[slot - 1];
		}
		array = array.table[slot];
	}
	return array.table[i];
}


// Sets the value at the index i. Only the nodes leading to i will get
// copied and updated.
function set(i, item, array)
{
	if (i < 0 || length(array) <= i)
	{
		return array;
	}
	return unsafeSet(i, item, array);
}


function unsafeSet(i, item, array)
{
	array = nodeCopy(array);

	if (array.height === 0)
	{
		array.table[i] = item;
	}
	else
	{
		var slot = getSlot(i, array);
		if (slot > 0)
		{
			i -= array.lengths[slot - 1];
		}
		array.table[slot] = unsafeSet(i, item, array.table[slot]);
	}
	return array;
}


function initialize(len, f)
{
	if (len <= 0)
	{
		return empty;
	}
	var h = Math.floor( Math.log(len) / Math.log(M) );
	return initialize_(f, h, 0, len);
}

function initialize_(f, h, from, to)
{
	if (h === 0)
	{
		var table = new Array((to - from) % (M + 1));
		for (var i = 0; i < table.length; i++)
		{
		  table[i] = f(from + i);
		}
		return {
			ctor: '_Array',
			height: 0,
			table: table
		};
	}

	var step = Math.pow(M, h);
	var table = new Array(Math.ceil((to - from) / step));
	var lengths = new Array(table.length);
	for (var i = 0; i < table.length; i++)
	{
		table[i] = initialize_(f, h - 1, from + (i * step), Math.min(from + ((i + 1) * step), to));
		lengths[i] = length(table[i]) + (i > 0 ? lengths[i-1] : 0);
	}
	return {
		ctor: '_Array',
		height: h,
		table: table,
		lengths: lengths
	};
}

function fromList(list)
{
	if (list.ctor === '[]')
	{
		return empty;
	}

	// Allocate M sized blocks (table) and write list elements to it.
	var table = new Array(M);
	var nodes = [];
	var i = 0;

	while (list.ctor !== '[]')
	{
		table[i] = list._0;
		list = list._1;
		i++;

		// table is full, so we can push a leaf containing it into the
		// next node.
		if (i === M)
		{
			var leaf = {
				ctor: '_Array',
				height: 0,
				table: table
			};
			fromListPush(leaf, nodes);
			table = new Array(M);
			i = 0;
		}
	}

	// Maybe there is something left on the table.
	if (i > 0)
	{
		var leaf = {
			ctor: '_Array',
			height: 0,
			table: table.splice(0, i)
		};
		fromListPush(leaf, nodes);
	}

	// Go through all of the nodes and eventually push them into higher nodes.
	for (var h = 0; h < nodes.length - 1; h++)
	{
		if (nodes[h].table.length > 0)
		{
			fromListPush(nodes[h], nodes);
		}
	}

	var head = nodes[nodes.length - 1];
	if (head.height > 0 && head.table.length === 1)
	{
		return head.table[0];
	}
	else
	{
		return head;
	}
}

// Push a node into a higher node as a child.
function fromListPush(toPush, nodes)
{
	var h = toPush.height;

	// Maybe the node on this height does not exist.
	if (nodes.length === h)
	{
		var node = {
			ctor: '_Array',
			height: h + 1,
			table: [],
			lengths: []
		};
		nodes.push(node);
	}

	nodes[h].table.push(toPush);
	var len = length(toPush);
	if (nodes[h].lengths.length > 0)
	{
		len += nodes[h].lengths[nodes[h].lengths.length - 1];
	}
	nodes[h].lengths.push(len);

	if (nodes[h].table.length === M)
	{
		fromListPush(nodes[h], nodes);
		nodes[h] = {
			ctor: '_Array',
			height: h + 1,
			table: [],
			lengths: []
		};
	}
}

// Pushes an item via push_ to the bottom right of a tree.
function push(item, a)
{
	var pushed = push_(item, a);
	if (pushed !== null)
	{
		return pushed;
	}

	var newTree = create(item, a.height);
	return siblise(a, newTree);
}

// Recursively tries to push an item to the bottom-right most
// tree possible. If there is no space left for the item,
// null will be returned.
function push_(item, a)
{
	// Handle resursion stop at leaf level.
	if (a.height === 0)
	{
		if (a.table.length < M)
		{
			var newA = {
				ctor: '_Array',
				height: 0,
				table: a.table.slice()
			};
			newA.table.push(item);
			return newA;
		}
		else
		{
		  return null;
		}
	}

	// Recursively push
	var pushed = push_(item, botRight(a));

	// There was space in the bottom right tree, so the slot will
	// be updated.
	if (pushed !== null)
	{
		var newA = nodeCopy(a);
		newA.table[newA.table.length - 1] = pushed;
		newA.lengths[newA.lengths.length - 1]++;
		return newA;
	}

	// When there was no space left, check if there is space left
	// for a new slot with a tree which contains only the item
	// at the bottom.
	if (a.table.length < M)
	{
		var newSlot = create(item, a.height - 1);
		var newA = nodeCopy(a);
		newA.table.push(newSlot);
		newA.lengths.push(newA.lengths[newA.lengths.length - 1] + length(newSlot));
		return newA;
	}
	else
	{
		return null;
	}
}

// Converts an array into a list of elements.
function toList(a)
{
	return toList_(_elm_lang$core$Native_List.Nil, a);
}

function toList_(list, a)
{
	for (var i = a.table.length - 1; i >= 0; i--)
	{
		list =
			a.height === 0
				? _elm_lang$core$Native_List.Cons(a.table[i], list)
				: toList_(list, a.table[i]);
	}
	return list;
}

// Maps a function over the elements of an array.
function map(f, a)
{
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: new Array(a.table.length)
	};
	if (a.height > 0)
	{
		newA.lengths = a.lengths;
	}
	for (var i = 0; i < a.table.length; i++)
	{
		newA.table[i] =
			a.height === 0
				? f(a.table[i])
				: map(f, a.table[i]);
	}
	return newA;
}

// Maps a function over the elements with their index as first argument.
function indexedMap(f, a)
{
	return indexedMap_(f, a, 0);
}

function indexedMap_(f, a, from)
{
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: new Array(a.table.length)
	};
	if (a.height > 0)
	{
		newA.lengths = a.lengths;
	}
	for (var i = 0; i < a.table.length; i++)
	{
		newA.table[i] =
			a.height === 0
				? A2(f, from + i, a.table[i])
				: indexedMap_(f, a.table[i], i == 0 ? from : from + a.lengths[i - 1]);
	}
	return newA;
}

function foldl(f, b, a)
{
	if (a.height === 0)
	{
		for (var i = 0; i < a.table.length; i++)
		{
			b = A2(f, a.table[i], b);
		}
	}
	else
	{
		for (var i = 0; i < a.table.length; i++)
		{
			b = foldl(f, b, a.table[i]);
		}
	}
	return b;
}

function foldr(f, b, a)
{
	if (a.height === 0)
	{
		for (var i = a.table.length; i--; )
		{
			b = A2(f, a.table[i], b);
		}
	}
	else
	{
		for (var i = a.table.length; i--; )
		{
			b = foldr(f, b, a.table[i]);
		}
	}
	return b;
}

// TODO: currently, it slices the right, then the left. This can be
// optimized.
function slice(from, to, a)
{
	if (from < 0)
	{
		from += length(a);
	}
	if (to < 0)
	{
		to += length(a);
	}
	return sliceLeft(from, sliceRight(to, a));
}

function sliceRight(to, a)
{
	if (to === length(a))
	{
		return a;
	}

	// Handle leaf level.
	if (a.height === 0)
	{
		var newA = { ctor:'_Array', height:0 };
		newA.table = a.table.slice(0, to);
		return newA;
	}

	// Slice the right recursively.
	var right = getSlot(to, a);
	var sliced = sliceRight(to - (right > 0 ? a.lengths[right - 1] : 0), a.table[right]);

	// Maybe the a node is not even needed, as sliced contains the whole slice.
	if (right === 0)
	{
		return sliced;
	}

	// Create new node.
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: a.table.slice(0, right),
		lengths: a.lengths.slice(0, right)
	};
	if (sliced.table.length > 0)
	{
		newA.table[right] = sliced;
		newA.lengths[right] = length(sliced) + (right > 0 ? newA.lengths[right - 1] : 0);
	}
	return newA;
}

function sliceLeft(from, a)
{
	if (from === 0)
	{
		return a;
	}

	// Handle leaf level.
	if (a.height === 0)
	{
		var newA = { ctor:'_Array', height:0 };
		newA.table = a.table.slice(from, a.table.length + 1);
		return newA;
	}

	// Slice the left recursively.
	var left = getSlot(from, a);
	var sliced = sliceLeft(from - (left > 0 ? a.lengths[left - 1] : 0), a.table[left]);

	// Maybe the a node is not even needed, as sliced contains the whole slice.
	if (left === a.table.length - 1)
	{
		return sliced;
	}

	// Create new node.
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: a.table.slice(left, a.table.length + 1),
		lengths: new Array(a.table.length - left)
	};
	newA.table[0] = sliced;
	var len = 0;
	for (var i = 0; i < newA.table.length; i++)
	{
		len += length(newA.table[i]);
		newA.lengths[i] = len;
	}

	return newA;
}

// Appends two trees.
function append(a,b)
{
	if (a.table.length === 0)
	{
		return b;
	}
	if (b.table.length === 0)
	{
		return a;
	}

	var c = append_(a, b);

	// Check if both nodes can be crunshed together.
	if (c[0].table.length + c[1].table.length <= M)
	{
		if (c[0].table.length === 0)
		{
			return c[1];
		}
		if (c[1].table.length === 0)
		{
			return c[0];
		}

		// Adjust .table and .lengths
		c[0].table = c[0].table.concat(c[1].table);
		if (c[0].height > 0)
		{
			var len = length(c[0]);
			for (var i = 0; i < c[1].lengths.length; i++)
			{
				c[1].lengths[i] += len;
			}
			c[0].lengths = c[0].lengths.concat(c[1].lengths);
		}

		return c[0];
	}

	if (c[0].height > 0)
	{
		var toRemove = calcToRemove(a, b);
		if (toRemove > E)
		{
			c = shuffle(c[0], c[1], toRemove);
		}
	}

	return siblise(c[0], c[1]);
}

// Returns an array of two nodes; right and left. One node _may_ be empty.
function append_(a, b)
{
	if (a.height === 0 && b.height === 0)
	{
		return [a, b];
	}

	if (a.height !== 1 || b.height !== 1)
	{
		if (a.height === b.height)
		{
			a = nodeCopy(a);
			b = nodeCopy(b);
			var appended = append_(botRight(a), botLeft(b));

			insertRight(a, appended[1]);
			insertLeft(b, appended[0]);
		}
		else if (a.height > b.height)
		{
			a = nodeCopy(a);
			var appended = append_(botRight(a), b);

			insertRight(a, appended[0]);
			b = parentise(appended[1], appended[1].height + 1);
		}
		else
		{
			b = nodeCopy(b);
			var appended = append_(a, botLeft(b));

			var left = appended[0].table.length === 0 ? 0 : 1;
			var right = left === 0 ? 1 : 0;
			insertLeft(b, appended[left]);
			a = parentise(appended[right], appended[right].height + 1);
		}
	}

	// Check if balancing is needed and return based on that.
	if (a.table.length === 0 || b.table.length === 0)
	{
		return [a, b];
	}

	var toRemove = calcToRemove(a, b);
	if (toRemove <= E)
	{
		return [a, b];
	}
	return shuffle(a, b, toRemove);
}

// Helperfunctions for append_. Replaces a child node at the side of the parent.
function insertRight(parent, node)
{
	var index = parent.table.length - 1;
	parent.table[index] = node;
	parent.lengths[index] = length(node);
	parent.lengths[index] += index > 0 ? parent.lengths[index - 1] : 0;
}

function insertLeft(parent, node)
{
	if (node.table.length > 0)
	{
		parent.table[0] = node;
		parent.lengths[0] = length(node);

		var len = length(parent.table[0]);
		for (var i = 1; i < parent.lengths.length; i++)
		{
			len += length(parent.table[i]);
			parent.lengths[i] = len;
		}
	}
	else
	{
		parent.table.shift();
		for (var i = 1; i < parent.lengths.length; i++)
		{
			parent.lengths[i] = parent.lengths[i] - parent.lengths[0];
		}
		parent.lengths.shift();
	}
}

// Returns the extra search steps for E. Refer to the paper.
function calcToRemove(a, b)
{
	var subLengths = 0;
	for (var i = 0; i < a.table.length; i++)
	{
		subLengths += a.table[i].table.length;
	}
	for (var i = 0; i < b.table.length; i++)
	{
		subLengths += b.table[i].table.length;
	}

	var toRemove = a.table.length + b.table.length;
	return toRemove - (Math.floor((subLengths - 1) / M) + 1);
}

// get2, set2 and saveSlot are helpers for accessing elements over two arrays.
function get2(a, b, index)
{
	return index < a.length
		? a[index]
		: b[index - a.length];
}

function set2(a, b, index, value)
{
	if (index < a.length)
	{
		a[index] = value;
	}
	else
	{
		b[index - a.length] = value;
	}
}

function saveSlot(a, b, index, slot)
{
	set2(a.table, b.table, index, slot);

	var l = (index === 0 || index === a.lengths.length)
		? 0
		: get2(a.lengths, a.lengths, index - 1);

	set2(a.lengths, b.lengths, index, l + length(slot));
}

// Creates a node or leaf with a given length at their arrays for perfomance.
// Is only used by shuffle.
function createNode(h, length)
{
	if (length < 0)
	{
		length = 0;
	}
	var a = {
		ctor: '_Array',
		height: h,
		table: new Array(length)
	};
	if (h > 0)
	{
		a.lengths = new Array(length);
	}
	return a;
}

// Returns an array of two balanced nodes.
function shuffle(a, b, toRemove)
{
	var newA = createNode(a.height, Math.min(M, a.table.length + b.table.length - toRemove));
	var newB = createNode(a.height, newA.table.length - (a.table.length + b.table.length - toRemove));

	// Skip the slots with size M. More precise: copy the slot references
	// to the new node
	var read = 0;
	while (get2(a.table, b.table, read).table.length % M === 0)
	{
		set2(newA.table, newB.table, read, get2(a.table, b.table, read));
		set2(newA.lengths, newB.lengths, read, get2(a.lengths, b.lengths, read));
		read++;
	}

	// Pulling items from left to right, caching in a slot before writing
	// it into the new nodes.
	var write = read;
	var slot = new createNode(a.height - 1, 0);
	var from = 0;

	// If the current slot is still containing data, then there will be at
	// least one more write, so we do not break this loop yet.
	while (read - write - (slot.table.length > 0 ? 1 : 0) < toRemove)
	{
		// Find out the max possible items for copying.
		var source = get2(a.table, b.table, read);
		var to = Math.min(M - slot.table.length, source.table.length);

		// Copy and adjust size table.
		slot.table = slot.table.concat(source.table.slice(from, to));
		if (slot.height > 0)
		{
			var len = slot.lengths.length;
			for (var i = len; i < len + to - from; i++)
			{
				slot.lengths[i] = length(slot.table[i]);
				slot.lengths[i] += (i > 0 ? slot.lengths[i - 1] : 0);
			}
		}

		from += to;

		// Only proceed to next slots[i] if the current one was
		// fully copied.
		if (source.table.length <= to)
		{
			read++; from = 0;
		}

		// Only create a new slot if the current one is filled up.
		if (slot.table.length === M)
		{
			saveSlot(newA, newB, write, slot);
			slot = createNode(a.height - 1, 0);
			write++;
		}
	}

	// Cleanup after the loop. Copy the last slot into the new nodes.
	if (slot.table.length > 0)
	{
		saveSlot(newA, newB, write, slot);
		write++;
	}

	// Shift the untouched slots to the left
	while (read < a.table.length + b.table.length )
	{
		saveSlot(newA, newB, write, get2(a.table, b.table, read));
		read++;
		write++;
	}

	return [newA, newB];
}

// Navigation functions
function botRight(a)
{
	return a.table[a.table.length - 1];
}
function botLeft(a)
{
	return a.table[0];
}

// Copies a node for updating. Note that you should not use this if
// only updating only one of "table" or "lengths" for performance reasons.
function nodeCopy(a)
{
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: a.table.slice()
	};
	if (a.height > 0)
	{
		newA.lengths = a.lengths.slice();
	}
	return newA;
}

// Returns how many items are in the tree.
function length(array)
{
	if (array.height === 0)
	{
		return array.table.length;
	}
	else
	{
		return array.lengths[array.lengths.length - 1];
	}
}

// Calculates in which slot of "table" the item probably is, then
// find the exact slot via forward searching in  "lengths". Returns the index.
function getSlot(i, a)
{
	var slot = i >> (5 * a.height);
	while (a.lengths[slot] <= i)
	{
		slot++;
	}
	return slot;
}

// Recursively creates a tree with a given height containing
// only the given item.
function create(item, h)
{
	if (h === 0)
	{
		return {
			ctor: '_Array',
			height: 0,
			table: [item]
		};
	}
	return {
		ctor: '_Array',
		height: h,
		table: [create(item, h - 1)],
		lengths: [1]
	};
}

// Recursively creates a tree that contains the given tree.
function parentise(tree, h)
{
	if (h === tree.height)
	{
		return tree;
	}

	return {
		ctor: '_Array',
		height: h,
		table: [parentise(tree, h - 1)],
		lengths: [length(tree)]
	};
}

// Emphasizes blood brotherhood beneath two trees.
function siblise(a, b)
{
	return {
		ctor: '_Array',
		height: a.height + 1,
		table: [a, b],
		lengths: [length(a), length(a) + length(b)]
	};
}

function toJSArray(a)
{
	var jsArray = new Array(length(a));
	toJSArray_(jsArray, 0, a);
	return jsArray;
}

function toJSArray_(jsArray, i, a)
{
	for (var t = 0; t < a.table.length; t++)
	{
		if (a.height === 0)
		{
			jsArray[i + t] = a.table[t];
		}
		else
		{
			var inc = t === 0 ? 0 : a.lengths[t - 1];
			toJSArray_(jsArray, i + inc, a.table[t]);
		}
	}
}

function fromJSArray(jsArray)
{
	if (jsArray.length === 0)
	{
		return empty;
	}
	var h = Math.floor(Math.log(jsArray.length) / Math.log(M));
	return fromJSArray_(jsArray, h, 0, jsArray.length);
}

function fromJSArray_(jsArray, h, from, to)
{
	if (h === 0)
	{
		return {
			ctor: '_Array',
			height: 0,
			table: jsArray.slice(from, to)
		};
	}

	var step = Math.pow(M, h);
	var table = new Array(Math.ceil((to - from) / step));
	var lengths = new Array(table.length);
	for (var i = 0; i < table.length; i++)
	{
		table[i] = fromJSArray_(jsArray, h - 1, from + (i * step), Math.min(from + ((i + 1) * step), to));
		lengths[i] = length(table[i]) + (i > 0 ? lengths[i - 1] : 0);
	}
	return {
		ctor: '_Array',
		height: h,
		table: table,
		lengths: lengths
	};
}

return {
	empty: empty,
	fromList: fromList,
	toList: toList,
	initialize: F2(initialize),
	append: F2(append),
	push: F2(push),
	slice: F3(slice),
	get: F2(get),
	set: F3(set),
	map: F2(map),
	indexedMap: F2(indexedMap),
	foldl: F3(foldl),
	foldr: F3(foldr),
	length: length,

	toJSArray: toJSArray,
	fromJSArray: fromJSArray
};

}();
var _elm_lang$core$Array$append = _elm_lang$core$Native_Array.append;
var _elm_lang$core$Array$length = _elm_lang$core$Native_Array.length;
var _elm_lang$core$Array$isEmpty = function (array) {
	return _elm_lang$core$Native_Utils.eq(
		_elm_lang$core$Array$length(array),
		0);
};
var _elm_lang$core$Array$slice = _elm_lang$core$Native_Array.slice;
var _elm_lang$core$Array$set = _elm_lang$core$Native_Array.set;
var _elm_lang$core$Array$get = F2(
	function (i, array) {
		return ((_elm_lang$core$Native_Utils.cmp(0, i) < 1) && (_elm_lang$core$Native_Utils.cmp(
			i,
			_elm_lang$core$Native_Array.length(array)) < 0)) ? _elm_lang$core$Maybe$Just(
			A2(_elm_lang$core$Native_Array.get, i, array)) : _elm_lang$core$Maybe$Nothing;
	});
var _elm_lang$core$Array$push = _elm_lang$core$Native_Array.push;
var _elm_lang$core$Array$empty = _elm_lang$core$Native_Array.empty;
var _elm_lang$core$Array$filter = F2(
	function (isOkay, arr) {
		var update = F2(
			function (x, xs) {
				return isOkay(x) ? A2(_elm_lang$core$Native_Array.push, x, xs) : xs;
			});
		return A3(_elm_lang$core$Native_Array.foldl, update, _elm_lang$core$Native_Array.empty, arr);
	});
var _elm_lang$core$Array$foldr = _elm_lang$core$Native_Array.foldr;
var _elm_lang$core$Array$foldl = _elm_lang$core$Native_Array.foldl;
var _elm_lang$core$Array$indexedMap = _elm_lang$core$Native_Array.indexedMap;
var _elm_lang$core$Array$map = _elm_lang$core$Native_Array.map;
var _elm_lang$core$Array$toIndexedList = function (array) {
	return A3(
		_elm_lang$core$List$map2,
		F2(
			function (v0, v1) {
				return {ctor: '_Tuple2', _0: v0, _1: v1};
			}),
		A2(
			_elm_lang$core$List$range,
			0,
			_elm_lang$core$Native_Array.length(array) - 1),
		_elm_lang$core$Native_Array.toList(array));
};
var _elm_lang$core$Array$toList = _elm_lang$core$Native_Array.toList;
var _elm_lang$core$Array$fromList = _elm_lang$core$Native_Array.fromList;
var _elm_lang$core$Array$initialize = _elm_lang$core$Native_Array.initialize;
var _elm_lang$core$Array$repeat = F2(
	function (n, e) {
		return A2(
			_elm_lang$core$Array$initialize,
			n,
			_elm_lang$core$Basics$always(e));
	});
var _elm_lang$core$Array$Array = {ctor: 'Array'};

var _eeue56$elm_flat_matrix$Matrix$filter = F2(
	function (f, matrix) {
		return A2(_elm_lang$core$Array$filter, f, matrix.data);
	});
var _eeue56$elm_flat_matrix$Matrix$map2 = F3(
	function (f, a, b) {
		return _elm_lang$core$Native_Utils.eq(a.size, b.size) ? _elm_lang$core$Maybe$Just(
			_elm_lang$core$Native_Utils.update(
				a,
				{
					data: _elm_lang$core$Array$fromList(
						A3(
							_elm_lang$core$List$map2,
							f,
							_elm_lang$core$Array$toList(a.data),
							_elm_lang$core$Array$toList(b.data)))
				})) : _elm_lang$core$Maybe$Nothing;
	});
var _eeue56$elm_flat_matrix$Matrix$map = F2(
	function (f, matrix) {
		return _elm_lang$core$Native_Utils.update(
			matrix,
			{
				data: A2(_elm_lang$core$Array$map, f, matrix.data)
			});
	});
var _eeue56$elm_flat_matrix$Matrix$concatVertical = F2(
	function (a, b) {
		return (!_elm_lang$core$Native_Utils.eq(
			_elm_lang$core$Tuple$first(a.size),
			_elm_lang$core$Tuple$first(b.size))) ? _elm_lang$core$Maybe$Nothing : _elm_lang$core$Maybe$Just(
			_elm_lang$core$Native_Utils.update(
				a,
				{
					size: {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Tuple$first(a.size),
						_1: _elm_lang$core$Tuple$second(a.size) + _elm_lang$core$Tuple$second(b.size)
					},
					data: A2(_elm_lang$core$Array$append, a.data, b.data)
				}));
	});
var _eeue56$elm_flat_matrix$Matrix$getColumn = F2(
	function (i, matrix) {
		var height = _elm_lang$core$Tuple$second(matrix.size);
		var width = _elm_lang$core$Tuple$first(matrix.size);
		var indices = A2(
			_elm_lang$core$List$map,
			function (x) {
				return (x * width) + i;
			},
			A2(_elm_lang$core$List$range, 0, height - 1));
		return (_elm_lang$core$Native_Utils.cmp(i, width) > -1) ? _elm_lang$core$Maybe$Nothing : _elm_lang$core$Maybe$Just(
			_elm_lang$core$Array$fromList(
				A3(
					_elm_lang$core$List$foldl,
					F2(
						function (index, ls) {
							var _p0 = A2(_elm_lang$core$Array$get, index, matrix.data);
							if (_p0.ctor === 'Just') {
								return A2(
									_elm_lang$core$Basics_ops['++'],
									ls,
									{
										ctor: '::',
										_0: _p0._0,
										_1: {ctor: '[]'}
									});
							} else {
								return ls;
							}
						}),
					{ctor: '[]'},
					indices)));
	});
var _eeue56$elm_flat_matrix$Matrix$fromList = function (list) {
	var width = _elm_lang$core$List$length(
		function () {
			var _p1 = _elm_lang$core$List$head(list);
			if (_p1.ctor === 'Just') {
				return _p1._0;
			} else {
				return {ctor: '[]'};
			}
		}());
	var allSame = _elm_lang$core$List$isEmpty(
		A2(
			_elm_lang$core$List$filter,
			function (x) {
				return !_elm_lang$core$Native_Utils.eq(
					_elm_lang$core$List$length(x),
					width);
			},
			list));
	var height = _elm_lang$core$List$length(list);
	return (!allSame) ? _elm_lang$core$Maybe$Nothing : _elm_lang$core$Maybe$Just(
		{
			size: {ctor: '_Tuple2', _0: width, _1: height},
			data: _elm_lang$core$Array$fromList(
				_elm_lang$core$List$concat(list))
		});
};
var _eeue56$elm_flat_matrix$Matrix$repeat = F3(
	function (x, y, v) {
		return {
			size: {ctor: '_Tuple2', _0: x, _1: y},
			data: A2(_elm_lang$core$Array$repeat, x * y, v)
		};
	});
var _eeue56$elm_flat_matrix$Matrix$height = function (matrix) {
	return _elm_lang$core$Tuple$second(matrix.size);
};
var _eeue56$elm_flat_matrix$Matrix$width = function (matrix) {
	return _elm_lang$core$Tuple$first(matrix.size);
};
var _eeue56$elm_flat_matrix$Matrix$get = F3(
	function (i, j, matrix) {
		var pos = (j * _eeue56$elm_flat_matrix$Matrix$width(matrix)) + i;
		return (((_elm_lang$core$Native_Utils.cmp(
			i,
			_eeue56$elm_flat_matrix$Matrix$width(matrix)) < 0) && (_elm_lang$core$Native_Utils.cmp(i, -1) > 0)) && ((_elm_lang$core$Native_Utils.cmp(
			j,
			_eeue56$elm_flat_matrix$Matrix$height(matrix)) < 0) && (_elm_lang$core$Native_Utils.cmp(j, -1) > 0))) ? A2(_elm_lang$core$Array$get, pos, matrix.data) : _elm_lang$core$Maybe$Nothing;
	});
var _eeue56$elm_flat_matrix$Matrix$getRow = F2(
	function (j, matrix) {
		var start = j * _eeue56$elm_flat_matrix$Matrix$width(matrix);
		var end = start + _eeue56$elm_flat_matrix$Matrix$width(matrix);
		return (_elm_lang$core$Native_Utils.cmp(
			end,
			_eeue56$elm_flat_matrix$Matrix$width(matrix) * _eeue56$elm_flat_matrix$Matrix$height(matrix)) > 0) ? _elm_lang$core$Maybe$Nothing : _elm_lang$core$Maybe$Just(
			A3(_elm_lang$core$Array$slice, start, end, matrix.data));
	});
var _eeue56$elm_flat_matrix$Matrix$concatHorizontal = F2(
	function (a, b) {
		var insert = F3(
			function (i, xs, array) {
				return A2(
					_elm_lang$core$Array$append,
					A2(
						_elm_lang$core$Array$append,
						A3(_elm_lang$core$Array$slice, 0, i, array),
						xs),
					A3(
						_elm_lang$core$Array$slice,
						i,
						_elm_lang$core$Array$length(array),
						array));
			});
		var finalWidth = _elm_lang$core$Tuple$first(a.size) + _elm_lang$core$Tuple$first(b.size);
		return (!_elm_lang$core$Native_Utils.eq(
			_elm_lang$core$Tuple$second(a.size),
			_elm_lang$core$Tuple$second(b.size))) ? _elm_lang$core$Maybe$Nothing : _elm_lang$core$Maybe$Just(
			_elm_lang$core$Native_Utils.update(
				a,
				{
					size: {
						ctor: '_Tuple2',
						_0: finalWidth,
						_1: _elm_lang$core$Tuple$second(a.size)
					},
					data: A3(
						_elm_lang$core$List$foldl,
						F2(
							function (_p2, acc) {
								var _p3 = _p2;
								return A3(insert, _p3._0 * finalWidth, _p3._1, acc);
							}),
						b.data,
						A3(
							_elm_lang$core$List$foldl,
							F2(
								function (i, ls) {
									var _p4 = A2(_eeue56$elm_flat_matrix$Matrix$getRow, i, a);
									if (_p4.ctor === 'Just') {
										return A2(
											_elm_lang$core$Basics_ops['++'],
											ls,
											{
												ctor: '::',
												_0: {ctor: '_Tuple2', _0: i, _1: _p4._0},
												_1: {ctor: '[]'}
											});
									} else {
										return ls;
									}
								}),
							{ctor: '[]'},
							A2(
								_elm_lang$core$List$range,
								0,
								_elm_lang$core$Tuple$second(a.size) - 1)))
				}));
	});
var _eeue56$elm_flat_matrix$Matrix$set = F4(
	function (i, j, v, matrix) {
		var pos = (j * _elm_lang$core$Tuple$first(matrix.size)) + i;
		return (((_elm_lang$core$Native_Utils.cmp(
			i,
			_eeue56$elm_flat_matrix$Matrix$width(matrix)) < 0) && (_elm_lang$core$Native_Utils.cmp(i, -1) > 0)) && ((_elm_lang$core$Native_Utils.cmp(
			j,
			_eeue56$elm_flat_matrix$Matrix$height(matrix)) < 0) && (_elm_lang$core$Native_Utils.cmp(j, -1) > 0))) ? _elm_lang$core$Native_Utils.update(
			matrix,
			{
				data: A3(_elm_lang$core$Array$set, pos, v, matrix.data)
			}) : matrix;
	});
var _eeue56$elm_flat_matrix$Matrix$update = F4(
	function (x, y, f, matrix) {
		var _p5 = A3(_eeue56$elm_flat_matrix$Matrix$get, x, y, matrix);
		if (_p5.ctor === 'Nothing') {
			return matrix;
		} else {
			return A4(
				_eeue56$elm_flat_matrix$Matrix$set,
				x,
				y,
				f(_p5._0),
				matrix);
		}
	});
var _eeue56$elm_flat_matrix$Matrix$indexedMap = F2(
	function (f, matrix) {
		var f_ = F2(
			function (i, v) {
				var y = (i / _eeue56$elm_flat_matrix$Matrix$width(matrix)) | 0;
				var x = A2(
					_elm_lang$core$Basics_ops['%'],
					i,
					_eeue56$elm_flat_matrix$Matrix$width(matrix));
				return A3(f, x, y, v);
			});
		return _elm_lang$core$Native_Utils.update(
			matrix,
			{
				data: _elm_lang$core$Array$fromList(
					A2(
						_elm_lang$core$List$indexedMap,
						f_,
						_elm_lang$core$Array$toList(matrix.data)))
			});
	});
var _eeue56$elm_flat_matrix$Matrix$toIndexedArray = function (matrix) {
	return A2(
		_eeue56$elm_flat_matrix$Matrix$indexedMap,
		F3(
			function (x, y, v) {
				return {
					ctor: '_Tuple2',
					_0: {ctor: '_Tuple2', _0: x, _1: y},
					_1: v
				};
			}),
		matrix).data;
};
var _eeue56$elm_flat_matrix$Matrix$empty = {
	size: {ctor: '_Tuple2', _0: 0, _1: 0},
	data: _elm_lang$core$Array$empty
};
var _eeue56$elm_flat_matrix$Matrix$Matrix = F2(
	function (a, b) {
		return {size: a, data: b};
	});

var _elm_lang$core$Dict$foldr = F3(
	function (f, acc, t) {
		foldr:
		while (true) {
			var _p0 = t;
			if (_p0.ctor === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var _v1 = f,
					_v2 = A3(
					f,
					_p0._1,
					_p0._2,
					A3(_elm_lang$core$Dict$foldr, f, acc, _p0._4)),
					_v3 = _p0._3;
				f = _v1;
				acc = _v2;
				t = _v3;
				continue foldr;
			}
		}
	});
var _elm_lang$core$Dict$keys = function (dict) {
	return A3(
		_elm_lang$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return {ctor: '::', _0: key, _1: keyList};
			}),
		{ctor: '[]'},
		dict);
};
var _elm_lang$core$Dict$values = function (dict) {
	return A3(
		_elm_lang$core$Dict$foldr,
		F3(
			function (key, value, valueList) {
				return {ctor: '::', _0: value, _1: valueList};
			}),
		{ctor: '[]'},
		dict);
};
var _elm_lang$core$Dict$toList = function (dict) {
	return A3(
		_elm_lang$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return {
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: key, _1: value},
					_1: list
				};
			}),
		{ctor: '[]'},
		dict);
};
var _elm_lang$core$Dict$foldl = F3(
	function (f, acc, dict) {
		foldl:
		while (true) {
			var _p1 = dict;
			if (_p1.ctor === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var _v5 = f,
					_v6 = A3(
					f,
					_p1._1,
					_p1._2,
					A3(_elm_lang$core$Dict$foldl, f, acc, _p1._3)),
					_v7 = _p1._4;
				f = _v5;
				acc = _v6;
				dict = _v7;
				continue foldl;
			}
		}
	});
var _elm_lang$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _p2) {
				stepState:
				while (true) {
					var _p3 = _p2;
					var _p9 = _p3._1;
					var _p8 = _p3._0;
					var _p4 = _p8;
					if (_p4.ctor === '[]') {
						return {
							ctor: '_Tuple2',
							_0: _p8,
							_1: A3(rightStep, rKey, rValue, _p9)
						};
					} else {
						var _p7 = _p4._1;
						var _p6 = _p4._0._1;
						var _p5 = _p4._0._0;
						if (_elm_lang$core$Native_Utils.cmp(_p5, rKey) < 0) {
							var _v10 = rKey,
								_v11 = rValue,
								_v12 = {
								ctor: '_Tuple2',
								_0: _p7,
								_1: A3(leftStep, _p5, _p6, _p9)
							};
							rKey = _v10;
							rValue = _v11;
							_p2 = _v12;
							continue stepState;
						} else {
							if (_elm_lang$core$Native_Utils.cmp(_p5, rKey) > 0) {
								return {
									ctor: '_Tuple2',
									_0: _p8,
									_1: A3(rightStep, rKey, rValue, _p9)
								};
							} else {
								return {
									ctor: '_Tuple2',
									_0: _p7,
									_1: A4(bothStep, _p5, _p6, rValue, _p9)
								};
							}
						}
					}
				}
			});
		var _p10 = A3(
			_elm_lang$core$Dict$foldl,
			stepState,
			{
				ctor: '_Tuple2',
				_0: _elm_lang$core$Dict$toList(leftDict),
				_1: initialResult
			},
			rightDict);
		var leftovers = _p10._0;
		var intermediateResult = _p10._1;
		return A3(
			_elm_lang$core$List$foldl,
			F2(
				function (_p11, result) {
					var _p12 = _p11;
					return A3(leftStep, _p12._0, _p12._1, result);
				}),
			intermediateResult,
			leftovers);
	});
var _elm_lang$core$Dict$reportRemBug = F4(
	function (msg, c, lgot, rgot) {
		return _elm_lang$core$Native_Debug.crash(
			_elm_lang$core$String$concat(
				{
					ctor: '::',
					_0: 'Internal red-black tree invariant violated, expected ',
					_1: {
						ctor: '::',
						_0: msg,
						_1: {
							ctor: '::',
							_0: ' and got ',
							_1: {
								ctor: '::',
								_0: _elm_lang$core$Basics$toString(c),
								_1: {
									ctor: '::',
									_0: '/',
									_1: {
										ctor: '::',
										_0: lgot,
										_1: {
											ctor: '::',
											_0: '/',
											_1: {
												ctor: '::',
												_0: rgot,
												_1: {
													ctor: '::',
													_0: '\nPlease report this bug to <https://github.com/elm-lang/core/issues>',
													_1: {ctor: '[]'}
												}
											}
										}
									}
								}
							}
						}
					}
				}));
	});
var _elm_lang$core$Dict$isBBlack = function (dict) {
	var _p13 = dict;
	_v14_2:
	do {
		if (_p13.ctor === 'RBNode_elm_builtin') {
			if (_p13._0.ctor === 'BBlack') {
				return true;
			} else {
				break _v14_2;
			}
		} else {
			if (_p13._0.ctor === 'LBBlack') {
				return true;
			} else {
				break _v14_2;
			}
		}
	} while(false);
	return false;
};
var _elm_lang$core$Dict$sizeHelp = F2(
	function (n, dict) {
		sizeHelp:
		while (true) {
			var _p14 = dict;
			if (_p14.ctor === 'RBEmpty_elm_builtin') {
				return n;
			} else {
				var _v16 = A2(_elm_lang$core$Dict$sizeHelp, n + 1, _p14._4),
					_v17 = _p14._3;
				n = _v16;
				dict = _v17;
				continue sizeHelp;
			}
		}
	});
var _elm_lang$core$Dict$size = function (dict) {
	return A2(_elm_lang$core$Dict$sizeHelp, 0, dict);
};
var _elm_lang$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			var _p15 = dict;
			if (_p15.ctor === 'RBEmpty_elm_builtin') {
				return _elm_lang$core$Maybe$Nothing;
			} else {
				var _p16 = A2(_elm_lang$core$Basics$compare, targetKey, _p15._1);
				switch (_p16.ctor) {
					case 'LT':
						var _v20 = targetKey,
							_v21 = _p15._3;
						targetKey = _v20;
						dict = _v21;
						continue get;
					case 'EQ':
						return _elm_lang$core$Maybe$Just(_p15._2);
					default:
						var _v22 = targetKey,
							_v23 = _p15._4;
						targetKey = _v22;
						dict = _v23;
						continue get;
				}
			}
		}
	});
var _elm_lang$core$Dict$member = F2(
	function (key, dict) {
		var _p17 = A2(_elm_lang$core$Dict$get, key, dict);
		if (_p17.ctor === 'Just') {
			return true;
		} else {
			return false;
		}
	});
var _elm_lang$core$Dict$maxWithDefault = F3(
	function (k, v, r) {
		maxWithDefault:
		while (true) {
			var _p18 = r;
			if (_p18.ctor === 'RBEmpty_elm_builtin') {
				return {ctor: '_Tuple2', _0: k, _1: v};
			} else {
				var _v26 = _p18._1,
					_v27 = _p18._2,
					_v28 = _p18._4;
				k = _v26;
				v = _v27;
				r = _v28;
				continue maxWithDefault;
			}
		}
	});
var _elm_lang$core$Dict$NBlack = {ctor: 'NBlack'};
var _elm_lang$core$Dict$BBlack = {ctor: 'BBlack'};
var _elm_lang$core$Dict$Black = {ctor: 'Black'};
var _elm_lang$core$Dict$blackish = function (t) {
	var _p19 = t;
	if (_p19.ctor === 'RBNode_elm_builtin') {
		var _p20 = _p19._0;
		return _elm_lang$core$Native_Utils.eq(_p20, _elm_lang$core$Dict$Black) || _elm_lang$core$Native_Utils.eq(_p20, _elm_lang$core$Dict$BBlack);
	} else {
		return true;
	}
};
var _elm_lang$core$Dict$Red = {ctor: 'Red'};
var _elm_lang$core$Dict$moreBlack = function (color) {
	var _p21 = color;
	switch (_p21.ctor) {
		case 'Black':
			return _elm_lang$core$Dict$BBlack;
		case 'Red':
			return _elm_lang$core$Dict$Black;
		case 'NBlack':
			return _elm_lang$core$Dict$Red;
		default:
			return _elm_lang$core$Native_Debug.crash('Can\'t make a double black node more black!');
	}
};
var _elm_lang$core$Dict$lessBlack = function (color) {
	var _p22 = color;
	switch (_p22.ctor) {
		case 'BBlack':
			return _elm_lang$core$Dict$Black;
		case 'Black':
			return _elm_lang$core$Dict$Red;
		case 'Red':
			return _elm_lang$core$Dict$NBlack;
		default:
			return _elm_lang$core$Native_Debug.crash('Can\'t make a negative black node less black!');
	}
};
var _elm_lang$core$Dict$LBBlack = {ctor: 'LBBlack'};
var _elm_lang$core$Dict$LBlack = {ctor: 'LBlack'};
var _elm_lang$core$Dict$RBEmpty_elm_builtin = function (a) {
	return {ctor: 'RBEmpty_elm_builtin', _0: a};
};
var _elm_lang$core$Dict$empty = _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
var _elm_lang$core$Dict$isEmpty = function (dict) {
	return _elm_lang$core$Native_Utils.eq(dict, _elm_lang$core$Dict$empty);
};
var _elm_lang$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {ctor: 'RBNode_elm_builtin', _0: a, _1: b, _2: c, _3: d, _4: e};
	});
var _elm_lang$core$Dict$ensureBlackRoot = function (dict) {
	var _p23 = dict;
	if ((_p23.ctor === 'RBNode_elm_builtin') && (_p23._0.ctor === 'Red')) {
		return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p23._1, _p23._2, _p23._3, _p23._4);
	} else {
		return dict;
	}
};
var _elm_lang$core$Dict$lessBlackTree = function (dict) {
	var _p24 = dict;
	if (_p24.ctor === 'RBNode_elm_builtin') {
		return A5(
			_elm_lang$core$Dict$RBNode_elm_builtin,
			_elm_lang$core$Dict$lessBlack(_p24._0),
			_p24._1,
			_p24._2,
			_p24._3,
			_p24._4);
	} else {
		return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
	}
};
var _elm_lang$core$Dict$balancedTree = function (col) {
	return function (xk) {
		return function (xv) {
			return function (yk) {
				return function (yv) {
					return function (zk) {
						return function (zv) {
							return function (a) {
								return function (b) {
									return function (c) {
										return function (d) {
											return A5(
												_elm_lang$core$Dict$RBNode_elm_builtin,
												_elm_lang$core$Dict$lessBlack(col),
												yk,
												yv,
												A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, xk, xv, a, b),
												A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, zk, zv, c, d));
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var _elm_lang$core$Dict$blacken = function (t) {
	var _p25 = t;
	if (_p25.ctor === 'RBEmpty_elm_builtin') {
		return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
	} else {
		return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p25._1, _p25._2, _p25._3, _p25._4);
	}
};
var _elm_lang$core$Dict$redden = function (t) {
	var _p26 = t;
	if (_p26.ctor === 'RBEmpty_elm_builtin') {
		return _elm_lang$core$Native_Debug.crash('can\'t make a Leaf red');
	} else {
		return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Red, _p26._1, _p26._2, _p26._3, _p26._4);
	}
};
var _elm_lang$core$Dict$balanceHelp = function (tree) {
	var _p27 = tree;
	_v36_6:
	do {
		_v36_5:
		do {
			_v36_4:
			do {
				_v36_3:
				do {
					_v36_2:
					do {
						_v36_1:
						do {
							_v36_0:
							do {
								if (_p27.ctor === 'RBNode_elm_builtin') {
									if (_p27._3.ctor === 'RBNode_elm_builtin') {
										if (_p27._4.ctor === 'RBNode_elm_builtin') {
											switch (_p27._3._0.ctor) {
												case 'Red':
													switch (_p27._4._0.ctor) {
														case 'Red':
															if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
																break _v36_0;
															} else {
																if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																	break _v36_1;
																} else {
																	if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
																		break _v36_2;
																	} else {
																		if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																			break _v36_3;
																		} else {
																			break _v36_6;
																		}
																	}
																}
															}
														case 'NBlack':
															if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
																break _v36_0;
															} else {
																if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																	break _v36_1;
																} else {
																	if (((((_p27._0.ctor === 'BBlack') && (_p27._4._3.ctor === 'RBNode_elm_builtin')) && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
																		break _v36_4;
																	} else {
																		break _v36_6;
																	}
																}
															}
														default:
															if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
																break _v36_0;
															} else {
																if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																	break _v36_1;
																} else {
																	break _v36_6;
																}
															}
													}
												case 'NBlack':
													switch (_p27._4._0.ctor) {
														case 'Red':
															if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
																break _v36_2;
															} else {
																if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																	break _v36_3;
																} else {
																	if (((((_p27._0.ctor === 'BBlack') && (_p27._3._3.ctor === 'RBNode_elm_builtin')) && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
																		break _v36_5;
																	} else {
																		break _v36_6;
																	}
																}
															}
														case 'NBlack':
															if (_p27._0.ctor === 'BBlack') {
																if ((((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
																	break _v36_4;
																} else {
																	if ((((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
																		break _v36_5;
																	} else {
																		break _v36_6;
																	}
																}
															} else {
																break _v36_6;
															}
														default:
															if (((((_p27._0.ctor === 'BBlack') && (_p27._3._3.ctor === 'RBNode_elm_builtin')) && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
																break _v36_5;
															} else {
																break _v36_6;
															}
													}
												default:
													switch (_p27._4._0.ctor) {
														case 'Red':
															if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
																break _v36_2;
															} else {
																if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																	break _v36_3;
																} else {
																	break _v36_6;
																}
															}
														case 'NBlack':
															if (((((_p27._0.ctor === 'BBlack') && (_p27._4._3.ctor === 'RBNode_elm_builtin')) && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
																break _v36_4;
															} else {
																break _v36_6;
															}
														default:
															break _v36_6;
													}
											}
										} else {
											switch (_p27._3._0.ctor) {
												case 'Red':
													if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
														break _v36_0;
													} else {
														if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
															break _v36_1;
														} else {
															break _v36_6;
														}
													}
												case 'NBlack':
													if (((((_p27._0.ctor === 'BBlack') && (_p27._3._3.ctor === 'RBNode_elm_builtin')) && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
														break _v36_5;
													} else {
														break _v36_6;
													}
												default:
													break _v36_6;
											}
										}
									} else {
										if (_p27._4.ctor === 'RBNode_elm_builtin') {
											switch (_p27._4._0.ctor) {
												case 'Red':
													if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
														break _v36_2;
													} else {
														if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
															break _v36_3;
														} else {
															break _v36_6;
														}
													}
												case 'NBlack':
													if (((((_p27._0.ctor === 'BBlack') && (_p27._4._3.ctor === 'RBNode_elm_builtin')) && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
														break _v36_4;
													} else {
														break _v36_6;
													}
												default:
													break _v36_6;
											}
										} else {
											break _v36_6;
										}
									}
								} else {
									break _v36_6;
								}
							} while(false);
							return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._3._3._1)(_p27._3._3._2)(_p27._3._1)(_p27._3._2)(_p27._1)(_p27._2)(_p27._3._3._3)(_p27._3._3._4)(_p27._3._4)(_p27._4);
						} while(false);
						return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._3._1)(_p27._3._2)(_p27._3._4._1)(_p27._3._4._2)(_p27._1)(_p27._2)(_p27._3._3)(_p27._3._4._3)(_p27._3._4._4)(_p27._4);
					} while(false);
					return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._1)(_p27._2)(_p27._4._3._1)(_p27._4._3._2)(_p27._4._1)(_p27._4._2)(_p27._3)(_p27._4._3._3)(_p27._4._3._4)(_p27._4._4);
				} while(false);
				return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._1)(_p27._2)(_p27._4._1)(_p27._4._2)(_p27._4._4._1)(_p27._4._4._2)(_p27._3)(_p27._4._3)(_p27._4._4._3)(_p27._4._4._4);
			} while(false);
			return A5(
				_elm_lang$core$Dict$RBNode_elm_builtin,
				_elm_lang$core$Dict$Black,
				_p27._4._3._1,
				_p27._4._3._2,
				A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p27._1, _p27._2, _p27._3, _p27._4._3._3),
				A5(
					_elm_lang$core$Dict$balance,
					_elm_lang$core$Dict$Black,
					_p27._4._1,
					_p27._4._2,
					_p27._4._3._4,
					_elm_lang$core$Dict$redden(_p27._4._4)));
		} while(false);
		return A5(
			_elm_lang$core$Dict$RBNode_elm_builtin,
			_elm_lang$core$Dict$Black,
			_p27._3._4._1,
			_p27._3._4._2,
			A5(
				_elm_lang$core$Dict$balance,
				_elm_lang$core$Dict$Black,
				_p27._3._1,
				_p27._3._2,
				_elm_lang$core$Dict$redden(_p27._3._3),
				_p27._3._4._3),
			A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p27._1, _p27._2, _p27._3._4._4, _p27._4));
	} while(false);
	return tree;
};
var _elm_lang$core$Dict$balance = F5(
	function (c, k, v, l, r) {
		var tree = A5(_elm_lang$core$Dict$RBNode_elm_builtin, c, k, v, l, r);
		return _elm_lang$core$Dict$blackish(tree) ? _elm_lang$core$Dict$balanceHelp(tree) : tree;
	});
var _elm_lang$core$Dict$bubble = F5(
	function (c, k, v, l, r) {
		return (_elm_lang$core$Dict$isBBlack(l) || _elm_lang$core$Dict$isBBlack(r)) ? A5(
			_elm_lang$core$Dict$balance,
			_elm_lang$core$Dict$moreBlack(c),
			k,
			v,
			_elm_lang$core$Dict$lessBlackTree(l),
			_elm_lang$core$Dict$lessBlackTree(r)) : A5(_elm_lang$core$Dict$RBNode_elm_builtin, c, k, v, l, r);
	});
var _elm_lang$core$Dict$removeMax = F5(
	function (c, k, v, l, r) {
		var _p28 = r;
		if (_p28.ctor === 'RBEmpty_elm_builtin') {
			return A3(_elm_lang$core$Dict$rem, c, l, r);
		} else {
			return A5(
				_elm_lang$core$Dict$bubble,
				c,
				k,
				v,
				l,
				A5(_elm_lang$core$Dict$removeMax, _p28._0, _p28._1, _p28._2, _p28._3, _p28._4));
		}
	});
var _elm_lang$core$Dict$rem = F3(
	function (color, left, right) {
		var _p29 = {ctor: '_Tuple2', _0: left, _1: right};
		if (_p29._0.ctor === 'RBEmpty_elm_builtin') {
			if (_p29._1.ctor === 'RBEmpty_elm_builtin') {
				var _p30 = color;
				switch (_p30.ctor) {
					case 'Red':
						return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
					case 'Black':
						return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBBlack);
					default:
						return _elm_lang$core$Native_Debug.crash('cannot have bblack or nblack nodes at this point');
				}
			} else {
				var _p33 = _p29._1._0;
				var _p32 = _p29._0._0;
				var _p31 = {ctor: '_Tuple3', _0: color, _1: _p32, _2: _p33};
				if ((((_p31.ctor === '_Tuple3') && (_p31._0.ctor === 'Black')) && (_p31._1.ctor === 'LBlack')) && (_p31._2.ctor === 'Red')) {
					return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p29._1._1, _p29._1._2, _p29._1._3, _p29._1._4);
				} else {
					return A4(
						_elm_lang$core$Dict$reportRemBug,
						'Black/LBlack/Red',
						color,
						_elm_lang$core$Basics$toString(_p32),
						_elm_lang$core$Basics$toString(_p33));
				}
			}
		} else {
			if (_p29._1.ctor === 'RBEmpty_elm_builtin') {
				var _p36 = _p29._1._0;
				var _p35 = _p29._0._0;
				var _p34 = {ctor: '_Tuple3', _0: color, _1: _p35, _2: _p36};
				if ((((_p34.ctor === '_Tuple3') && (_p34._0.ctor === 'Black')) && (_p34._1.ctor === 'Red')) && (_p34._2.ctor === 'LBlack')) {
					return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p29._0._1, _p29._0._2, _p29._0._3, _p29._0._4);
				} else {
					return A4(
						_elm_lang$core$Dict$reportRemBug,
						'Black/Red/LBlack',
						color,
						_elm_lang$core$Basics$toString(_p35),
						_elm_lang$core$Basics$toString(_p36));
				}
			} else {
				var _p40 = _p29._0._2;
				var _p39 = _p29._0._4;
				var _p38 = _p29._0._1;
				var newLeft = A5(_elm_lang$core$Dict$removeMax, _p29._0._0, _p38, _p40, _p29._0._3, _p39);
				var _p37 = A3(_elm_lang$core$Dict$maxWithDefault, _p38, _p40, _p39);
				var k = _p37._0;
				var v = _p37._1;
				return A5(_elm_lang$core$Dict$bubble, color, k, v, newLeft, right);
			}
		}
	});
var _elm_lang$core$Dict$map = F2(
	function (f, dict) {
		var _p41 = dict;
		if (_p41.ctor === 'RBEmpty_elm_builtin') {
			return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
		} else {
			var _p42 = _p41._1;
			return A5(
				_elm_lang$core$Dict$RBNode_elm_builtin,
				_p41._0,
				_p42,
				A2(f, _p42, _p41._2),
				A2(_elm_lang$core$Dict$map, f, _p41._3),
				A2(_elm_lang$core$Dict$map, f, _p41._4));
		}
	});
var _elm_lang$core$Dict$Same = {ctor: 'Same'};
var _elm_lang$core$Dict$Remove = {ctor: 'Remove'};
var _elm_lang$core$Dict$Insert = {ctor: 'Insert'};
var _elm_lang$core$Dict$update = F3(
	function (k, alter, dict) {
		var up = function (dict) {
			var _p43 = dict;
			if (_p43.ctor === 'RBEmpty_elm_builtin') {
				var _p44 = alter(_elm_lang$core$Maybe$Nothing);
				if (_p44.ctor === 'Nothing') {
					return {ctor: '_Tuple2', _0: _elm_lang$core$Dict$Same, _1: _elm_lang$core$Dict$empty};
				} else {
					return {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Dict$Insert,
						_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Red, k, _p44._0, _elm_lang$core$Dict$empty, _elm_lang$core$Dict$empty)
					};
				}
			} else {
				var _p55 = _p43._2;
				var _p54 = _p43._4;
				var _p53 = _p43._3;
				var _p52 = _p43._1;
				var _p51 = _p43._0;
				var _p45 = A2(_elm_lang$core$Basics$compare, k, _p52);
				switch (_p45.ctor) {
					case 'EQ':
						var _p46 = alter(
							_elm_lang$core$Maybe$Just(_p55));
						if (_p46.ctor === 'Nothing') {
							return {
								ctor: '_Tuple2',
								_0: _elm_lang$core$Dict$Remove,
								_1: A3(_elm_lang$core$Dict$rem, _p51, _p53, _p54)
							};
						} else {
							return {
								ctor: '_Tuple2',
								_0: _elm_lang$core$Dict$Same,
								_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _p51, _p52, _p46._0, _p53, _p54)
							};
						}
					case 'LT':
						var _p47 = up(_p53);
						var flag = _p47._0;
						var newLeft = _p47._1;
						var _p48 = flag;
						switch (_p48.ctor) {
							case 'Same':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Same,
									_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _p51, _p52, _p55, newLeft, _p54)
								};
							case 'Insert':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Insert,
									_1: A5(_elm_lang$core$Dict$balance, _p51, _p52, _p55, newLeft, _p54)
								};
							default:
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Remove,
									_1: A5(_elm_lang$core$Dict$bubble, _p51, _p52, _p55, newLeft, _p54)
								};
						}
					default:
						var _p49 = up(_p54);
						var flag = _p49._0;
						var newRight = _p49._1;
						var _p50 = flag;
						switch (_p50.ctor) {
							case 'Same':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Same,
									_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _p51, _p52, _p55, _p53, newRight)
								};
							case 'Insert':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Insert,
									_1: A5(_elm_lang$core$Dict$balance, _p51, _p52, _p55, _p53, newRight)
								};
							default:
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Remove,
									_1: A5(_elm_lang$core$Dict$bubble, _p51, _p52, _p55, _p53, newRight)
								};
						}
				}
			}
		};
		var _p56 = up(dict);
		var flag = _p56._0;
		var updatedDict = _p56._1;
		var _p57 = flag;
		switch (_p57.ctor) {
			case 'Same':
				return updatedDict;
			case 'Insert':
				return _elm_lang$core$Dict$ensureBlackRoot(updatedDict);
			default:
				return _elm_lang$core$Dict$blacken(updatedDict);
		}
	});
var _elm_lang$core$Dict$insert = F3(
	function (key, value, dict) {
		return A3(
			_elm_lang$core$Dict$update,
			key,
			_elm_lang$core$Basics$always(
				_elm_lang$core$Maybe$Just(value)),
			dict);
	});
var _elm_lang$core$Dict$singleton = F2(
	function (key, value) {
		return A3(_elm_lang$core$Dict$insert, key, value, _elm_lang$core$Dict$empty);
	});
var _elm_lang$core$Dict$union = F2(
	function (t1, t2) {
		return A3(_elm_lang$core$Dict$foldl, _elm_lang$core$Dict$insert, t2, t1);
	});
var _elm_lang$core$Dict$filter = F2(
	function (predicate, dictionary) {
		var add = F3(
			function (key, value, dict) {
				return A2(predicate, key, value) ? A3(_elm_lang$core$Dict$insert, key, value, dict) : dict;
			});
		return A3(_elm_lang$core$Dict$foldl, add, _elm_lang$core$Dict$empty, dictionary);
	});
var _elm_lang$core$Dict$intersect = F2(
	function (t1, t2) {
		return A2(
			_elm_lang$core$Dict$filter,
			F2(
				function (k, _p58) {
					return A2(_elm_lang$core$Dict$member, k, t2);
				}),
			t1);
	});
var _elm_lang$core$Dict$partition = F2(
	function (predicate, dict) {
		var add = F3(
			function (key, value, _p59) {
				var _p60 = _p59;
				var _p62 = _p60._1;
				var _p61 = _p60._0;
				return A2(predicate, key, value) ? {
					ctor: '_Tuple2',
					_0: A3(_elm_lang$core$Dict$insert, key, value, _p61),
					_1: _p62
				} : {
					ctor: '_Tuple2',
					_0: _p61,
					_1: A3(_elm_lang$core$Dict$insert, key, value, _p62)
				};
			});
		return A3(
			_elm_lang$core$Dict$foldl,
			add,
			{ctor: '_Tuple2', _0: _elm_lang$core$Dict$empty, _1: _elm_lang$core$Dict$empty},
			dict);
	});
var _elm_lang$core$Dict$fromList = function (assocs) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (_p63, dict) {
				var _p64 = _p63;
				return A3(_elm_lang$core$Dict$insert, _p64._0, _p64._1, dict);
			}),
		_elm_lang$core$Dict$empty,
		assocs);
};
var _elm_lang$core$Dict$remove = F2(
	function (key, dict) {
		return A3(
			_elm_lang$core$Dict$update,
			key,
			_elm_lang$core$Basics$always(_elm_lang$core$Maybe$Nothing),
			dict);
	});
var _elm_lang$core$Dict$diff = F2(
	function (t1, t2) {
		return A3(
			_elm_lang$core$Dict$foldl,
			F3(
				function (k, v, t) {
					return A2(_elm_lang$core$Dict$remove, k, t);
				}),
			t1,
			t2);
	});

//import Maybe, Native.Array, Native.List, Native.Utils, Result //

var _elm_lang$core$Native_Json = function() {


// CORE DECODERS

function succeed(msg)
{
	return {
		ctor: '<decoder>',
		tag: 'succeed',
		msg: msg
	};
}

function fail(msg)
{
	return {
		ctor: '<decoder>',
		tag: 'fail',
		msg: msg
	};
}

function decodePrimitive(tag)
{
	return {
		ctor: '<decoder>',
		tag: tag
	};
}

function decodeContainer(tag, decoder)
{
	return {
		ctor: '<decoder>',
		tag: tag,
		decoder: decoder
	};
}

function decodeNull(value)
{
	return {
		ctor: '<decoder>',
		tag: 'null',
		value: value
	};
}

function decodeField(field, decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'field',
		field: field,
		decoder: decoder
	};
}

function decodeIndex(index, decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'index',
		index: index,
		decoder: decoder
	};
}

function decodeKeyValuePairs(decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'key-value',
		decoder: decoder
	};
}

function mapMany(f, decoders)
{
	return {
		ctor: '<decoder>',
		tag: 'map-many',
		func: f,
		decoders: decoders
	};
}

function andThen(callback, decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'andThen',
		decoder: decoder,
		callback: callback
	};
}

function oneOf(decoders)
{
	return {
		ctor: '<decoder>',
		tag: 'oneOf',
		decoders: decoders
	};
}


// DECODING OBJECTS

function map1(f, d1)
{
	return mapMany(f, [d1]);
}

function map2(f, d1, d2)
{
	return mapMany(f, [d1, d2]);
}

function map3(f, d1, d2, d3)
{
	return mapMany(f, [d1, d2, d3]);
}

function map4(f, d1, d2, d3, d4)
{
	return mapMany(f, [d1, d2, d3, d4]);
}

function map5(f, d1, d2, d3, d4, d5)
{
	return mapMany(f, [d1, d2, d3, d4, d5]);
}

function map6(f, d1, d2, d3, d4, d5, d6)
{
	return mapMany(f, [d1, d2, d3, d4, d5, d6]);
}

function map7(f, d1, d2, d3, d4, d5, d6, d7)
{
	return mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
}

function map8(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
}


// DECODE HELPERS

function ok(value)
{
	return { tag: 'ok', value: value };
}

function badPrimitive(type, value)
{
	return { tag: 'primitive', type: type, value: value };
}

function badIndex(index, nestedProblems)
{
	return { tag: 'index', index: index, rest: nestedProblems };
}

function badField(field, nestedProblems)
{
	return { tag: 'field', field: field, rest: nestedProblems };
}

function badIndex(index, nestedProblems)
{
	return { tag: 'index', index: index, rest: nestedProblems };
}

function badOneOf(problems)
{
	return { tag: 'oneOf', problems: problems };
}

function bad(msg)
{
	return { tag: 'fail', msg: msg };
}

function badToString(problem)
{
	var context = '_';
	while (problem)
	{
		switch (problem.tag)
		{
			case 'primitive':
				return 'Expecting ' + problem.type
					+ (context === '_' ? '' : ' at ' + context)
					+ ' but instead got: ' + jsToString(problem.value);

			case 'index':
				context += '[' + problem.index + ']';
				problem = problem.rest;
				break;

			case 'field':
				context += '.' + problem.field;
				problem = problem.rest;
				break;

			case 'oneOf':
				var problems = problem.problems;
				for (var i = 0; i < problems.length; i++)
				{
					problems[i] = badToString(problems[i]);
				}
				return 'I ran into the following problems'
					+ (context === '_' ? '' : ' at ' + context)
					+ ':\n\n' + problems.join('\n');

			case 'fail':
				return 'I ran into a `fail` decoder'
					+ (context === '_' ? '' : ' at ' + context)
					+ ': ' + problem.msg;
		}
	}
}

function jsToString(value)
{
	return value === undefined
		? 'undefined'
		: JSON.stringify(value);
}


// DECODE

function runOnString(decoder, string)
{
	var json;
	try
	{
		json = JSON.parse(string);
	}
	catch (e)
	{
		return _elm_lang$core$Result$Err('Given an invalid JSON: ' + e.message);
	}
	return run(decoder, json);
}

function run(decoder, value)
{
	var result = runHelp(decoder, value);
	return (result.tag === 'ok')
		? _elm_lang$core$Result$Ok(result.value)
		: _elm_lang$core$Result$Err(badToString(result));
}

function runHelp(decoder, value)
{
	switch (decoder.tag)
	{
		case 'bool':
			return (typeof value === 'boolean')
				? ok(value)
				: badPrimitive('a Bool', value);

		case 'int':
			if (typeof value !== 'number') {
				return badPrimitive('an Int', value);
			}

			if (-2147483647 < value && value < 2147483647 && (value | 0) === value) {
				return ok(value);
			}

			if (isFinite(value) && !(value % 1)) {
				return ok(value);
			}

			return badPrimitive('an Int', value);

		case 'float':
			return (typeof value === 'number')
				? ok(value)
				: badPrimitive('a Float', value);

		case 'string':
			return (typeof value === 'string')
				? ok(value)
				: (value instanceof String)
					? ok(value + '')
					: badPrimitive('a String', value);

		case 'null':
			return (value === null)
				? ok(decoder.value)
				: badPrimitive('null', value);

		case 'value':
			return ok(value);

		case 'list':
			if (!(value instanceof Array))
			{
				return badPrimitive('a List', value);
			}

			var list = _elm_lang$core$Native_List.Nil;
			for (var i = value.length; i--; )
			{
				var result = runHelp(decoder.decoder, value[i]);
				if (result.tag !== 'ok')
				{
					return badIndex(i, result)
				}
				list = _elm_lang$core$Native_List.Cons(result.value, list);
			}
			return ok(list);

		case 'array':
			if (!(value instanceof Array))
			{
				return badPrimitive('an Array', value);
			}

			var len = value.length;
			var array = new Array(len);
			for (var i = len; i--; )
			{
				var result = runHelp(decoder.decoder, value[i]);
				if (result.tag !== 'ok')
				{
					return badIndex(i, result);
				}
				array[i] = result.value;
			}
			return ok(_elm_lang$core$Native_Array.fromJSArray(array));

		case 'maybe':
			var result = runHelp(decoder.decoder, value);
			return (result.tag === 'ok')
				? ok(_elm_lang$core$Maybe$Just(result.value))
				: ok(_elm_lang$core$Maybe$Nothing);

		case 'field':
			var field = decoder.field;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return badPrimitive('an object with a field named `' + field + '`', value);
			}

			var result = runHelp(decoder.decoder, value[field]);
			return (result.tag === 'ok') ? result : badField(field, result);

		case 'index':
			var index = decoder.index;
			if (!(value instanceof Array))
			{
				return badPrimitive('an array', value);
			}
			if (index >= value.length)
			{
				return badPrimitive('a longer array. Need index ' + index + ' but there are only ' + value.length + ' entries', value);
			}

			var result = runHelp(decoder.decoder, value[index]);
			return (result.tag === 'ok') ? result : badIndex(index, result);

		case 'key-value':
			if (typeof value !== 'object' || value === null || value instanceof Array)
			{
				return badPrimitive('an object', value);
			}

			var keyValuePairs = _elm_lang$core$Native_List.Nil;
			for (var key in value)
			{
				var result = runHelp(decoder.decoder, value[key]);
				if (result.tag !== 'ok')
				{
					return badField(key, result);
				}
				var pair = _elm_lang$core$Native_Utils.Tuple2(key, result.value);
				keyValuePairs = _elm_lang$core$Native_List.Cons(pair, keyValuePairs);
			}
			return ok(keyValuePairs);

		case 'map-many':
			var answer = decoder.func;
			var decoders = decoder.decoders;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = runHelp(decoders[i], value);
				if (result.tag !== 'ok')
				{
					return result;
				}
				answer = answer(result.value);
			}
			return ok(answer);

		case 'andThen':
			var result = runHelp(decoder.decoder, value);
			return (result.tag !== 'ok')
				? result
				: runHelp(decoder.callback(result.value), value);

		case 'oneOf':
			var errors = [];
			var temp = decoder.decoders;
			while (temp.ctor !== '[]')
			{
				var result = runHelp(temp._0, value);

				if (result.tag === 'ok')
				{
					return result;
				}

				errors.push(result);

				temp = temp._1;
			}
			return badOneOf(errors);

		case 'fail':
			return bad(decoder.msg);

		case 'succeed':
			return ok(decoder.msg);
	}
}


// EQUALITY

function equality(a, b)
{
	if (a === b)
	{
		return true;
	}

	if (a.tag !== b.tag)
	{
		return false;
	}

	switch (a.tag)
	{
		case 'succeed':
		case 'fail':
			return a.msg === b.msg;

		case 'bool':
		case 'int':
		case 'float':
		case 'string':
		case 'value':
			return true;

		case 'null':
			return a.value === b.value;

		case 'list':
		case 'array':
		case 'maybe':
		case 'key-value':
			return equality(a.decoder, b.decoder);

		case 'field':
			return a.field === b.field && equality(a.decoder, b.decoder);

		case 'index':
			return a.index === b.index && equality(a.decoder, b.decoder);

		case 'map-many':
			if (a.func !== b.func)
			{
				return false;
			}
			return listEquality(a.decoders, b.decoders);

		case 'andThen':
			return a.callback === b.callback && equality(a.decoder, b.decoder);

		case 'oneOf':
			return listEquality(a.decoders, b.decoders);
	}
}

function listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

function encode(indentLevel, value)
{
	return JSON.stringify(value, null, indentLevel);
}

function identity(value)
{
	return value;
}

function encodeObject(keyValuePairs)
{
	var obj = {};
	while (keyValuePairs.ctor !== '[]')
	{
		var pair = keyValuePairs._0;
		obj[pair._0] = pair._1;
		keyValuePairs = keyValuePairs._1;
	}
	return obj;
}

return {
	encode: F2(encode),
	runOnString: F2(runOnString),
	run: F2(run),

	decodeNull: decodeNull,
	decodePrimitive: decodePrimitive,
	decodeContainer: F2(decodeContainer),

	decodeField: F2(decodeField),
	decodeIndex: F2(decodeIndex),

	map1: F2(map1),
	map2: F3(map2),
	map3: F4(map3),
	map4: F5(map4),
	map5: F6(map5),
	map6: F7(map6),
	map7: F8(map7),
	map8: F9(map8),
	decodeKeyValuePairs: decodeKeyValuePairs,

	andThen: F2(andThen),
	fail: fail,
	succeed: succeed,
	oneOf: oneOf,

	identity: identity,
	encodeNull: null,
	encodeArray: _elm_lang$core$Native_Array.toJSArray,
	encodeList: _elm_lang$core$Native_List.toArray,
	encodeObject: encodeObject,

	equality: equality
};

}();

var _elm_lang$core$Json_Encode$list = _elm_lang$core$Native_Json.encodeList;
var _elm_lang$core$Json_Encode$array = _elm_lang$core$Native_Json.encodeArray;
var _elm_lang$core$Json_Encode$object = _elm_lang$core$Native_Json.encodeObject;
var _elm_lang$core$Json_Encode$null = _elm_lang$core$Native_Json.encodeNull;
var _elm_lang$core$Json_Encode$bool = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$float = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$int = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$string = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$encode = _elm_lang$core$Native_Json.encode;
var _elm_lang$core$Json_Encode$Value = {ctor: 'Value'};

var _elm_lang$core$Json_Decode$null = _elm_lang$core$Native_Json.decodeNull;
var _elm_lang$core$Json_Decode$value = _elm_lang$core$Native_Json.decodePrimitive('value');
var _elm_lang$core$Json_Decode$andThen = _elm_lang$core$Native_Json.andThen;
var _elm_lang$core$Json_Decode$fail = _elm_lang$core$Native_Json.fail;
var _elm_lang$core$Json_Decode$succeed = _elm_lang$core$Native_Json.succeed;
var _elm_lang$core$Json_Decode$lazy = function (thunk) {
	return A2(
		_elm_lang$core$Json_Decode$andThen,
		thunk,
		_elm_lang$core$Json_Decode$succeed(
			{ctor: '_Tuple0'}));
};
var _elm_lang$core$Json_Decode$decodeValue = _elm_lang$core$Native_Json.run;
var _elm_lang$core$Json_Decode$decodeString = _elm_lang$core$Native_Json.runOnString;
var _elm_lang$core$Json_Decode$map8 = _elm_lang$core$Native_Json.map8;
var _elm_lang$core$Json_Decode$map7 = _elm_lang$core$Native_Json.map7;
var _elm_lang$core$Json_Decode$map6 = _elm_lang$core$Native_Json.map6;
var _elm_lang$core$Json_Decode$map5 = _elm_lang$core$Native_Json.map5;
var _elm_lang$core$Json_Decode$map4 = _elm_lang$core$Native_Json.map4;
var _elm_lang$core$Json_Decode$map3 = _elm_lang$core$Native_Json.map3;
var _elm_lang$core$Json_Decode$map2 = _elm_lang$core$Native_Json.map2;
var _elm_lang$core$Json_Decode$map = _elm_lang$core$Native_Json.map1;
var _elm_lang$core$Json_Decode$oneOf = _elm_lang$core$Native_Json.oneOf;
var _elm_lang$core$Json_Decode$maybe = function (decoder) {
	return A2(_elm_lang$core$Native_Json.decodeContainer, 'maybe', decoder);
};
var _elm_lang$core$Json_Decode$index = _elm_lang$core$Native_Json.decodeIndex;
var _elm_lang$core$Json_Decode$field = _elm_lang$core$Native_Json.decodeField;
var _elm_lang$core$Json_Decode$at = F2(
	function (fields, decoder) {
		return A3(_elm_lang$core$List$foldr, _elm_lang$core$Json_Decode$field, decoder, fields);
	});
var _elm_lang$core$Json_Decode$keyValuePairs = _elm_lang$core$Native_Json.decodeKeyValuePairs;
var _elm_lang$core$Json_Decode$dict = function (decoder) {
	return A2(
		_elm_lang$core$Json_Decode$map,
		_elm_lang$core$Dict$fromList,
		_elm_lang$core$Json_Decode$keyValuePairs(decoder));
};
var _elm_lang$core$Json_Decode$array = function (decoder) {
	return A2(_elm_lang$core$Native_Json.decodeContainer, 'array', decoder);
};
var _elm_lang$core$Json_Decode$list = function (decoder) {
	return A2(_elm_lang$core$Native_Json.decodeContainer, 'list', decoder);
};
var _elm_lang$core$Json_Decode$nullable = function (decoder) {
	return _elm_lang$core$Json_Decode$oneOf(
		{
			ctor: '::',
			_0: _elm_lang$core$Json_Decode$null(_elm_lang$core$Maybe$Nothing),
			_1: {
				ctor: '::',
				_0: A2(_elm_lang$core$Json_Decode$map, _elm_lang$core$Maybe$Just, decoder),
				_1: {ctor: '[]'}
			}
		});
};
var _elm_lang$core$Json_Decode$float = _elm_lang$core$Native_Json.decodePrimitive('float');
var _elm_lang$core$Json_Decode$int = _elm_lang$core$Native_Json.decodePrimitive('int');
var _elm_lang$core$Json_Decode$bool = _elm_lang$core$Native_Json.decodePrimitive('bool');
var _elm_lang$core$Json_Decode$string = _elm_lang$core$Native_Json.decodePrimitive('string');
var _elm_lang$core$Json_Decode$Decoder = {ctor: 'Decoder'};

var _elm_lang$virtual_dom$VirtualDom_Debug$wrap;
var _elm_lang$virtual_dom$VirtualDom_Debug$wrapWithFlags;

var _elm_lang$virtual_dom$Native_VirtualDom = function() {

var STYLE_KEY = 'STYLE';
var EVENT_KEY = 'EVENT';
var ATTR_KEY = 'ATTR';
var ATTR_NS_KEY = 'ATTR_NS';

var localDoc = typeof document !== 'undefined' ? document : {};


////////////  VIRTUAL DOM NODES  ////////////


function text(string)
{
	return {
		type: 'text',
		text: string
	};
}


function node(tag)
{
	return F2(function(factList, kidList) {
		return nodeHelp(tag, factList, kidList);
	});
}


function nodeHelp(tag, factList, kidList)
{
	var organized = organizeFacts(factList);
	var namespace = organized.namespace;
	var facts = organized.facts;

	var children = [];
	var descendantsCount = 0;
	while (kidList.ctor !== '[]')
	{
		var kid = kidList._0;
		descendantsCount += (kid.descendantsCount || 0);
		children.push(kid);
		kidList = kidList._1;
	}
	descendantsCount += children.length;

	return {
		type: 'node',
		tag: tag,
		facts: facts,
		children: children,
		namespace: namespace,
		descendantsCount: descendantsCount
	};
}


function keyedNode(tag, factList, kidList)
{
	var organized = organizeFacts(factList);
	var namespace = organized.namespace;
	var facts = organized.facts;

	var children = [];
	var descendantsCount = 0;
	while (kidList.ctor !== '[]')
	{
		var kid = kidList._0;
		descendantsCount += (kid._1.descendantsCount || 0);
		children.push(kid);
		kidList = kidList._1;
	}
	descendantsCount += children.length;

	return {
		type: 'keyed-node',
		tag: tag,
		facts: facts,
		children: children,
		namespace: namespace,
		descendantsCount: descendantsCount
	};
}


function custom(factList, model, impl)
{
	var facts = organizeFacts(factList).facts;

	return {
		type: 'custom',
		facts: facts,
		model: model,
		impl: impl
	};
}


function map(tagger, node)
{
	return {
		type: 'tagger',
		tagger: tagger,
		node: node,
		descendantsCount: 1 + (node.descendantsCount || 0)
	};
}


function thunk(func, args, thunk)
{
	return {
		type: 'thunk',
		func: func,
		args: args,
		thunk: thunk,
		node: undefined
	};
}

function lazy(fn, a)
{
	return thunk(fn, [a], function() {
		return fn(a);
	});
}

function lazy2(fn, a, b)
{
	return thunk(fn, [a,b], function() {
		return A2(fn, a, b);
	});
}

function lazy3(fn, a, b, c)
{
	return thunk(fn, [a,b,c], function() {
		return A3(fn, a, b, c);
	});
}



// FACTS


function organizeFacts(factList)
{
	var namespace, facts = {};

	while (factList.ctor !== '[]')
	{
		var entry = factList._0;
		var key = entry.key;

		if (key === ATTR_KEY || key === ATTR_NS_KEY || key === EVENT_KEY)
		{
			var subFacts = facts[key] || {};
			subFacts[entry.realKey] = entry.value;
			facts[key] = subFacts;
		}
		else if (key === STYLE_KEY)
		{
			var styles = facts[key] || {};
			var styleList = entry.value;
			while (styleList.ctor !== '[]')
			{
				var style = styleList._0;
				styles[style._0] = style._1;
				styleList = styleList._1;
			}
			facts[key] = styles;
		}
		else if (key === 'namespace')
		{
			namespace = entry.value;
		}
		else if (key === 'className')
		{
			var classes = facts[key];
			facts[key] = typeof classes === 'undefined'
				? entry.value
				: classes + ' ' + entry.value;
		}
 		else
		{
			facts[key] = entry.value;
		}
		factList = factList._1;
	}

	return {
		facts: facts,
		namespace: namespace
	};
}



////////////  PROPERTIES AND ATTRIBUTES  ////////////


function style(value)
{
	return {
		key: STYLE_KEY,
		value: value
	};
}


function property(key, value)
{
	return {
		key: key,
		value: value
	};
}


function attribute(key, value)
{
	return {
		key: ATTR_KEY,
		realKey: key,
		value: value
	};
}


function attributeNS(namespace, key, value)
{
	return {
		key: ATTR_NS_KEY,
		realKey: key,
		value: {
			value: value,
			namespace: namespace
		}
	};
}


function on(name, options, decoder)
{
	return {
		key: EVENT_KEY,
		realKey: name,
		value: {
			options: options,
			decoder: decoder
		}
	};
}


function equalEvents(a, b)
{
	if (a.options !== b.options)
	{
		if (a.options.stopPropagation !== b.options.stopPropagation || a.options.preventDefault !== b.options.preventDefault)
		{
			return false;
		}
	}
	return _elm_lang$core$Native_Json.equality(a.decoder, b.decoder);
}


function mapProperty(func, property)
{
	if (property.key !== EVENT_KEY)
	{
		return property;
	}
	return on(
		property.realKey,
		property.value.options,
		A2(_elm_lang$core$Json_Decode$map, func, property.value.decoder)
	);
}


////////////  RENDER  ////////////


function render(vNode, eventNode)
{
	switch (vNode.type)
	{
		case 'thunk':
			if (!vNode.node)
			{
				vNode.node = vNode.thunk();
			}
			return render(vNode.node, eventNode);

		case 'tagger':
			var subNode = vNode.node;
			var tagger = vNode.tagger;

			while (subNode.type === 'tagger')
			{
				typeof tagger !== 'object'
					? tagger = [tagger, subNode.tagger]
					: tagger.push(subNode.tagger);

				subNode = subNode.node;
			}

			var subEventRoot = { tagger: tagger, parent: eventNode };
			var domNode = render(subNode, subEventRoot);
			domNode.elm_event_node_ref = subEventRoot;
			return domNode;

		case 'text':
			return localDoc.createTextNode(vNode.text);

		case 'node':
			var domNode = vNode.namespace
				? localDoc.createElementNS(vNode.namespace, vNode.tag)
				: localDoc.createElement(vNode.tag);

			applyFacts(domNode, eventNode, vNode.facts);

			var children = vNode.children;

			for (var i = 0; i < children.length; i++)
			{
				domNode.appendChild(render(children[i], eventNode));
			}

			return domNode;

		case 'keyed-node':
			var domNode = vNode.namespace
				? localDoc.createElementNS(vNode.namespace, vNode.tag)
				: localDoc.createElement(vNode.tag);

			applyFacts(domNode, eventNode, vNode.facts);

			var children = vNode.children;

			for (var i = 0; i < children.length; i++)
			{
				domNode.appendChild(render(children[i]._1, eventNode));
			}

			return domNode;

		case 'custom':
			var domNode = vNode.impl.render(vNode.model);
			applyFacts(domNode, eventNode, vNode.facts);
			return domNode;
	}
}



////////////  APPLY FACTS  ////////////


function applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		switch (key)
		{
			case STYLE_KEY:
				applyStyles(domNode, value);
				break;

			case EVENT_KEY:
				applyEvents(domNode, eventNode, value);
				break;

			case ATTR_KEY:
				applyAttrs(domNode, value);
				break;

			case ATTR_NS_KEY:
				applyAttrsNS(domNode, value);
				break;

			case 'value':
				if (domNode[key] !== value)
				{
					domNode[key] = value;
				}
				break;

			default:
				domNode[key] = value;
				break;
		}
	}
}

function applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}

function applyEvents(domNode, eventNode, events)
{
	var allHandlers = domNode.elm_handlers || {};

	for (var key in events)
	{
		var handler = allHandlers[key];
		var value = events[key];

		if (typeof value === 'undefined')
		{
			domNode.removeEventListener(key, handler);
			allHandlers[key] = undefined;
		}
		else if (typeof handler === 'undefined')
		{
			var handler = makeEventHandler(eventNode, value);
			domNode.addEventListener(key, handler);
			allHandlers[key] = handler;
		}
		else
		{
			handler.info = value;
		}
	}

	domNode.elm_handlers = allHandlers;
}

function makeEventHandler(eventNode, info)
{
	function eventHandler(event)
	{
		var info = eventHandler.info;

		var value = A2(_elm_lang$core$Native_Json.run, info.decoder, event);

		if (value.ctor === 'Ok')
		{
			var options = info.options;
			if (options.stopPropagation)
			{
				event.stopPropagation();
			}
			if (options.preventDefault)
			{
				event.preventDefault();
			}

			var message = value._0;

			var currentEventNode = eventNode;
			while (currentEventNode)
			{
				var tagger = currentEventNode.tagger;
				if (typeof tagger === 'function')
				{
					message = tagger(message);
				}
				else
				{
					for (var i = tagger.length; i--; )
					{
						message = tagger[i](message);
					}
				}
				currentEventNode = currentEventNode.parent;
			}
		}
	};

	eventHandler.info = info;

	return eventHandler;
}

function applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		if (typeof value === 'undefined')
		{
			domNode.removeAttribute(key);
		}
		else
		{
			domNode.setAttribute(key, value);
		}
	}
}

function applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.namespace;
		var value = pair.value;

		if (typeof value === 'undefined')
		{
			domNode.removeAttributeNS(namespace, key);
		}
		else
		{
			domNode.setAttributeNS(namespace, key, value);
		}
	}
}



////////////  DIFF  ////////////


function diff(a, b)
{
	var patches = [];
	diffHelp(a, b, patches, 0);
	return patches;
}


function makePatch(type, index, data)
{
	return {
		index: index,
		type: type,
		data: data,
		domNode: undefined,
		eventNode: undefined
	};
}


function diffHelp(a, b, patches, index)
{
	if (a === b)
	{
		return;
	}

	var aType = a.type;
	var bType = b.type;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (aType !== bType)
	{
		patches.push(makePatch('p-redraw', index, b));
		return;
	}

	// Now we know that both nodes are the same type.
	switch (bType)
	{
		case 'thunk':
			var aArgs = a.args;
			var bArgs = b.args;
			var i = aArgs.length;
			var same = a.func === b.func && i === bArgs.length;
			while (same && i--)
			{
				same = aArgs[i] === bArgs[i];
			}
			if (same)
			{
				b.node = a.node;
				return;
			}
			b.node = b.thunk();
			var subPatches = [];
			diffHelp(a.node, b.node, subPatches, 0);
			if (subPatches.length > 0)
			{
				patches.push(makePatch('p-thunk', index, subPatches));
			}
			return;

		case 'tagger':
			// gather nested taggers
			var aTaggers = a.tagger;
			var bTaggers = b.tagger;
			var nesting = false;

			var aSubNode = a.node;
			while (aSubNode.type === 'tagger')
			{
				nesting = true;

				typeof aTaggers !== 'object'
					? aTaggers = [aTaggers, aSubNode.tagger]
					: aTaggers.push(aSubNode.tagger);

				aSubNode = aSubNode.node;
			}

			var bSubNode = b.node;
			while (bSubNode.type === 'tagger')
			{
				nesting = true;

				typeof bTaggers !== 'object'
					? bTaggers = [bTaggers, bSubNode.tagger]
					: bTaggers.push(bSubNode.tagger);

				bSubNode = bSubNode.node;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && aTaggers.length !== bTaggers.length)
			{
				patches.push(makePatch('p-redraw', index, b));
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !pairwiseRefEqual(aTaggers, bTaggers) : aTaggers !== bTaggers)
			{
				patches.push(makePatch('p-tagger', index, bTaggers));
			}

			// diff everything below the taggers
			diffHelp(aSubNode, bSubNode, patches, index + 1);
			return;

		case 'text':
			if (a.text !== b.text)
			{
				patches.push(makePatch('p-text', index, b.text));
				return;
			}

			return;

		case 'node':
			// Bail if obvious indicators have changed. Implies more serious
			// structural changes such that it's not worth it to diff.
			if (a.tag !== b.tag || a.namespace !== b.namespace)
			{
				patches.push(makePatch('p-redraw', index, b));
				return;
			}

			var factsDiff = diffFacts(a.facts, b.facts);

			if (typeof factsDiff !== 'undefined')
			{
				patches.push(makePatch('p-facts', index, factsDiff));
			}

			diffChildren(a, b, patches, index);
			return;

		case 'keyed-node':
			// Bail if obvious indicators have changed. Implies more serious
			// structural changes such that it's not worth it to diff.
			if (a.tag !== b.tag || a.namespace !== b.namespace)
			{
				patches.push(makePatch('p-redraw', index, b));
				return;
			}

			var factsDiff = diffFacts(a.facts, b.facts);

			if (typeof factsDiff !== 'undefined')
			{
				patches.push(makePatch('p-facts', index, factsDiff));
			}

			diffKeyedChildren(a, b, patches, index);
			return;

		case 'custom':
			if (a.impl !== b.impl)
			{
				patches.push(makePatch('p-redraw', index, b));
				return;
			}

			var factsDiff = diffFacts(a.facts, b.facts);
			if (typeof factsDiff !== 'undefined')
			{
				patches.push(makePatch('p-facts', index, factsDiff));
			}

			var patch = b.impl.diff(a,b);
			if (patch)
			{
				patches.push(makePatch('p-custom', index, patch));
				return;
			}

			return;
	}
}


// assumes the incoming arrays are the same length
function pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function diffFacts(a, b, category)
{
	var diff;

	// look for changes and removals
	for (var aKey in a)
	{
		if (aKey === STYLE_KEY || aKey === EVENT_KEY || aKey === ATTR_KEY || aKey === ATTR_NS_KEY)
		{
			var subDiff = diffFacts(a[aKey], b[aKey] || {}, aKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[aKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(aKey in b))
		{
			diff = diff || {};
			diff[aKey] =
				(typeof category === 'undefined')
					? (typeof a[aKey] === 'string' ? '' : null)
					:
				(category === STYLE_KEY)
					? ''
					:
				(category === EVENT_KEY || category === ATTR_KEY)
					? undefined
					:
				{ namespace: a[aKey].namespace, value: undefined };

			continue;
		}

		var aValue = a[aKey];
		var bValue = b[aKey];

		// reference equal, so don't worry about it
		if (aValue === bValue && aKey !== 'value'
			|| category === EVENT_KEY && equalEvents(aValue, bValue))
		{
			continue;
		}

		diff = diff || {};
		diff[aKey] = bValue;
	}

	// add new stuff
	for (var bKey in b)
	{
		if (!(bKey in a))
		{
			diff = diff || {};
			diff[bKey] = b[bKey];
		}
	}

	return diff;
}


function diffChildren(aParent, bParent, patches, rootIndex)
{
	var aChildren = aParent.children;
	var bChildren = bParent.children;

	var aLen = aChildren.length;
	var bLen = bChildren.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (aLen > bLen)
	{
		patches.push(makePatch('p-remove-last', rootIndex, aLen - bLen));
	}
	else if (aLen < bLen)
	{
		patches.push(makePatch('p-append', rootIndex, bChildren.slice(aLen)));
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	var index = rootIndex;
	var minLen = aLen < bLen ? aLen : bLen;
	for (var i = 0; i < minLen; i++)
	{
		index++;
		var aChild = aChildren[i];
		diffHelp(aChild, bChildren[i], patches, index);
		index += aChild.descendantsCount || 0;
	}
}



////////////  KEYED DIFF  ////////////


function diffKeyedChildren(aParent, bParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var aChildren = aParent.children;
	var bChildren = bParent.children;
	var aLen = aChildren.length;
	var bLen = bChildren.length;
	var aIndex = 0;
	var bIndex = 0;

	var index = rootIndex;

	while (aIndex < aLen && bIndex < bLen)
	{
		var a = aChildren[aIndex];
		var b = bChildren[bIndex];

		var aKey = a._0;
		var bKey = b._0;
		var aNode = a._1;
		var bNode = b._1;

		// check if keys match

		if (aKey === bKey)
		{
			index++;
			diffHelp(aNode, bNode, localPatches, index);
			index += aNode.descendantsCount || 0;

			aIndex++;
			bIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var aLookAhead = aIndex + 1 < aLen;
		var bLookAhead = bIndex + 1 < bLen;

		if (aLookAhead)
		{
			var aNext = aChildren[aIndex + 1];
			var aNextKey = aNext._0;
			var aNextNode = aNext._1;
			var oldMatch = bKey === aNextKey;
		}

		if (bLookAhead)
		{
			var bNext = bChildren[bIndex + 1];
			var bNextKey = bNext._0;
			var bNextNode = bNext._1;
			var newMatch = aKey === bNextKey;
		}


		// swap a and b
		if (aLookAhead && bLookAhead && newMatch && oldMatch)
		{
			index++;
			diffHelp(aNode, bNextNode, localPatches, index);
			insertNode(changes, localPatches, aKey, bNode, bIndex, inserts);
			index += aNode.descendantsCount || 0;

			index++;
			removeNode(changes, localPatches, aKey, aNextNode, index);
			index += aNextNode.descendantsCount || 0;

			aIndex += 2;
			bIndex += 2;
			continue;
		}

		// insert b
		if (bLookAhead && newMatch)
		{
			index++;
			insertNode(changes, localPatches, bKey, bNode, bIndex, inserts);
			diffHelp(aNode, bNextNode, localPatches, index);
			index += aNode.descendantsCount || 0;

			aIndex += 1;
			bIndex += 2;
			continue;
		}

		// remove a
		if (aLookAhead && oldMatch)
		{
			index++;
			removeNode(changes, localPatches, aKey, aNode, index);
			index += aNode.descendantsCount || 0;

			index++;
			diffHelp(aNextNode, bNode, localPatches, index);
			index += aNextNode.descendantsCount || 0;

			aIndex += 2;
			bIndex += 1;
			continue;
		}

		// remove a, insert b
		if (aLookAhead && bLookAhead && aNextKey === bNextKey)
		{
			index++;
			removeNode(changes, localPatches, aKey, aNode, index);
			insertNode(changes, localPatches, bKey, bNode, bIndex, inserts);
			index += aNode.descendantsCount || 0;

			index++;
			diffHelp(aNextNode, bNextNode, localPatches, index);
			index += aNextNode.descendantsCount || 0;

			aIndex += 2;
			bIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (aIndex < aLen)
	{
		index++;
		var a = aChildren[aIndex];
		var aNode = a._1;
		removeNode(changes, localPatches, a._0, aNode, index);
		index += aNode.descendantsCount || 0;
		aIndex++;
	}

	var endInserts;
	while (bIndex < bLen)
	{
		endInserts = endInserts || [];
		var b = bChildren[bIndex];
		insertNode(changes, localPatches, b._0, b._1, undefined, endInserts);
		bIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || typeof endInserts !== 'undefined')
	{
		patches.push(makePatch('p-reorder', rootIndex, {
			patches: localPatches,
			inserts: inserts,
			endInserts: endInserts
		}));
	}
}



////////////  CHANGES FROM KEYED DIFF  ////////////


var POSTFIX = '_elmW6BL';


function insertNode(changes, localPatches, key, vnode, bIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (typeof entry === 'undefined')
	{
		entry = {
			tag: 'insert',
			vnode: vnode,
			index: bIndex,
			data: undefined
		};

		inserts.push({ index: bIndex, entry: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.tag === 'remove')
	{
		inserts.push({ index: bIndex, entry: entry });

		entry.tag = 'move';
		var subPatches = [];
		diffHelp(entry.vnode, vnode, subPatches, entry.index);
		entry.index = bIndex;
		entry.data.data = {
			patches: subPatches,
			entry: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	insertNode(changes, localPatches, key + POSTFIX, vnode, bIndex, inserts);
}


function removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (typeof entry === 'undefined')
	{
		var patch = makePatch('p-remove', index, undefined);
		localPatches.push(patch);

		changes[key] = {
			tag: 'remove',
			vnode: vnode,
			index: index,
			data: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.tag === 'insert')
	{
		entry.tag = 'move';
		var subPatches = [];
		diffHelp(vnode, entry.vnode, subPatches, index);

		var patch = makePatch('p-remove', index, {
			patches: subPatches,
			entry: entry
		});
		localPatches.push(patch);

		return;
	}

	// this key has already been removed or moved, a duplicate!
	removeNode(changes, localPatches, key + POSTFIX, vnode, index);
}



////////////  ADD DOM NODES  ////////////
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function addDomNodes(domNode, vNode, patches, eventNode)
{
	addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.descendantsCount, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.index;

	while (index === low)
	{
		var patchType = patch.type;

		if (patchType === 'p-thunk')
		{
			addDomNodes(domNode, vNode.node, patch.data, eventNode);
		}
		else if (patchType === 'p-reorder')
		{
			patch.domNode = domNode;
			patch.eventNode = eventNode;

			var subPatches = patch.data.patches;
			if (subPatches.length > 0)
			{
				addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 'p-remove')
		{
			patch.domNode = domNode;
			patch.eventNode = eventNode;

			var data = patch.data;
			if (typeof data !== 'undefined')
			{
				data.entry.data = domNode;
				var subPatches = data.patches;
				if (subPatches.length > 0)
				{
					addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.domNode = domNode;
			patch.eventNode = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.index) > high)
		{
			return i;
		}
	}

	switch (vNode.type)
	{
		case 'tagger':
			var subNode = vNode.node;

			while (subNode.type === "tagger")
			{
				subNode = subNode.node;
			}

			return addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);

		case 'node':
			var vChildren = vNode.children;
			var childNodes = domNode.childNodes;
			for (var j = 0; j < vChildren.length; j++)
			{
				low++;
				var vChild = vChildren[j];
				var nextLow = low + (vChild.descendantsCount || 0);
				if (low <= index && index <= nextLow)
				{
					i = addDomNodesHelp(childNodes[j], vChild, patches, i, low, nextLow, eventNode);
					if (!(patch = patches[i]) || (index = patch.index) > high)
					{
						return i;
					}
				}
				low = nextLow;
			}
			return i;

		case 'keyed-node':
			var vChildren = vNode.children;
			var childNodes = domNode.childNodes;
			for (var j = 0; j < vChildren.length; j++)
			{
				low++;
				var vChild = vChildren[j]._1;
				var nextLow = low + (vChild.descendantsCount || 0);
				if (low <= index && index <= nextLow)
				{
					i = addDomNodesHelp(childNodes[j], vChild, patches, i, low, nextLow, eventNode);
					if (!(patch = patches[i]) || (index = patch.index) > high)
					{
						return i;
					}
				}
				low = nextLow;
			}
			return i;

		case 'text':
		case 'thunk':
			throw new Error('should never traverse `text` or `thunk` nodes like this');
	}
}



////////////  APPLY PATCHES  ////////////


function applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return applyPatchesHelp(rootDomNode, patches);
}

function applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.domNode
		var newNode = applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function applyPatch(domNode, patch)
{
	switch (patch.type)
	{
		case 'p-redraw':
			return applyPatchRedraw(domNode, patch.data, patch.eventNode);

		case 'p-facts':
			applyFacts(domNode, patch.eventNode, patch.data);
			return domNode;

		case 'p-text':
			domNode.replaceData(0, domNode.length, patch.data);
			return domNode;

		case 'p-thunk':
			return applyPatchesHelp(domNode, patch.data);

		case 'p-tagger':
			if (typeof domNode.elm_event_node_ref !== 'undefined')
			{
				domNode.elm_event_node_ref.tagger = patch.data;
			}
			else
			{
				domNode.elm_event_node_ref = { tagger: patch.data, parent: patch.eventNode };
			}
			return domNode;

		case 'p-remove-last':
			var i = patch.data;
			while (i--)
			{
				domNode.removeChild(domNode.lastChild);
			}
			return domNode;

		case 'p-append':
			var newNodes = patch.data;
			for (var i = 0; i < newNodes.length; i++)
			{
				domNode.appendChild(render(newNodes[i], patch.eventNode));
			}
			return domNode;

		case 'p-remove':
			var data = patch.data;
			if (typeof data === 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.entry;
			if (typeof entry.index !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.data = applyPatchesHelp(domNode, data.patches);
			return domNode;

		case 'p-reorder':
			return applyPatchReorder(domNode, patch);

		case 'p-custom':
			var impl = patch.data;
			return impl.applyPatch(domNode, impl.data);

		default:
			throw new Error('Ran into an unknown patch!');
	}
}


function applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = render(vNode, eventNode);

	if (typeof newNode.elm_event_node_ref === 'undefined')
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function applyPatchReorder(domNode, patch)
{
	var data = patch.data;

	// remove end inserts
	var frag = applyPatchReorderEndInsertsHelp(data.endInserts, patch);

	// removals
	domNode = applyPatchesHelp(domNode, data.patches);

	// inserts
	var inserts = data.inserts;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.entry;
		var node = entry.tag === 'move'
			? entry.data
			: render(entry.vnode, patch.eventNode);
		domNode.insertBefore(node, domNode.childNodes[insert.index]);
	}

	// add end inserts
	if (typeof frag !== 'undefined')
	{
		domNode.appendChild(frag);
	}

	return domNode;
}


function applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (typeof endInserts === 'undefined')
	{
		return;
	}

	var frag = localDoc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.entry;
		frag.appendChild(entry.tag === 'move'
			? entry.data
			: render(entry.vnode, patch.eventNode)
		);
	}
	return frag;
}


// PROGRAMS

var program = makeProgram(checkNoFlags);
var programWithFlags = makeProgram(checkYesFlags);

function makeProgram(flagChecker)
{
	return F2(function(debugWrap, impl)
	{
		return function(flagDecoder)
		{
			return function(object, moduleName, debugMetadata)
			{
				var checker = flagChecker(flagDecoder, moduleName);
				if (typeof debugMetadata === 'undefined')
				{
					normalSetup(impl, object, moduleName, checker);
				}
				else
				{
					debugSetup(A2(debugWrap, debugMetadata, impl), object, moduleName, checker);
				}
			};
		};
	});
}

function staticProgram(vNode)
{
	var nothing = _elm_lang$core$Native_Utils.Tuple2(
		_elm_lang$core$Native_Utils.Tuple0,
		_elm_lang$core$Platform_Cmd$none
	);
	return A2(program, _elm_lang$virtual_dom$VirtualDom_Debug$wrap, {
		init: nothing,
		view: function() { return vNode; },
		update: F2(function() { return nothing; }),
		subscriptions: function() { return _elm_lang$core$Platform_Sub$none; }
	})();
}


// FLAG CHECKERS

function checkNoFlags(flagDecoder, moduleName)
{
	return function(init, flags, domNode)
	{
		if (typeof flags === 'undefined')
		{
			return init;
		}

		var errorMessage =
			'The `' + moduleName + '` module does not need flags.\n'
			+ 'Initialize it with no arguments and you should be all set!';

		crash(errorMessage, domNode);
	};
}

function checkYesFlags(flagDecoder, moduleName)
{
	return function(init, flags, domNode)
	{
		if (typeof flagDecoder === 'undefined')
		{
			var errorMessage =
				'Are you trying to sneak a Never value into Elm? Trickster!\n'
				+ 'It looks like ' + moduleName + '.main is defined with `programWithFlags` but has type `Program Never`.\n'
				+ 'Use `program` instead if you do not want flags.'

			crash(errorMessage, domNode);
		}

		var result = A2(_elm_lang$core$Native_Json.run, flagDecoder, flags);
		if (result.ctor === 'Ok')
		{
			return init(result._0);
		}

		var errorMessage =
			'Trying to initialize the `' + moduleName + '` module with an unexpected flag.\n'
			+ 'I tried to convert it to an Elm value, but ran into this problem:\n\n'
			+ result._0;

		crash(errorMessage, domNode);
	};
}

function crash(errorMessage, domNode)
{
	if (domNode)
	{
		domNode.innerHTML =
			'<div style="padding-left:1em;">'
			+ '<h2 style="font-weight:normal;"><b>Oops!</b> Something went wrong when starting your Elm program.</h2>'
			+ '<pre style="padding-left:1em;">' + errorMessage + '</pre>'
			+ '</div>';
	}

	throw new Error(errorMessage);
}


//  NORMAL SETUP

function normalSetup(impl, object, moduleName, flagChecker)
{
	object['embed'] = function embed(node, flags)
	{
		while (node.lastChild)
		{
			node.removeChild(node.lastChild);
		}

		return _elm_lang$core$Native_Platform.initialize(
			flagChecker(impl.init, flags, node),
			impl.update,
			impl.subscriptions,
			normalRenderer(node, impl.view)
		);
	};

	object['fullscreen'] = function fullscreen(flags)
	{
		return _elm_lang$core$Native_Platform.initialize(
			flagChecker(impl.init, flags, document.body),
			impl.update,
			impl.subscriptions,
			normalRenderer(document.body, impl.view)
		);
	};
}

function normalRenderer(parentNode, view)
{
	return function(tagger, initialModel)
	{
		var eventNode = { tagger: tagger, parent: undefined };
		var initialVirtualNode = view(initialModel);
		var domNode = render(initialVirtualNode, eventNode);
		parentNode.appendChild(domNode);
		return makeStepper(domNode, view, initialVirtualNode, eventNode);
	};
}


// STEPPER

var rAF =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { setTimeout(callback, 1000 / 60); };

function makeStepper(domNode, view, initialVirtualNode, eventNode)
{
	var state = 'NO_REQUEST';
	var currNode = initialVirtualNode;
	var nextModel;

	function updateIfNeeded()
	{
		switch (state)
		{
			case 'NO_REQUEST':
				throw new Error(
					'Unexpected draw callback.\n' +
					'Please report this to <https://github.com/elm-lang/virtual-dom/issues>.'
				);

			case 'PENDING_REQUEST':
				rAF(updateIfNeeded);
				state = 'EXTRA_REQUEST';

				var nextNode = view(nextModel);
				var patches = diff(currNode, nextNode);
				domNode = applyPatches(domNode, currNode, patches, eventNode);
				currNode = nextNode;

				return;

			case 'EXTRA_REQUEST':
				state = 'NO_REQUEST';
				return;
		}
	}

	return function stepper(model)
	{
		if (state === 'NO_REQUEST')
		{
			rAF(updateIfNeeded);
		}
		state = 'PENDING_REQUEST';
		nextModel = model;
	};
}


// DEBUG SETUP

function debugSetup(impl, object, moduleName, flagChecker)
{
	object['fullscreen'] = function fullscreen(flags)
	{
		var popoutRef = { doc: undefined };
		return _elm_lang$core$Native_Platform.initialize(
			flagChecker(impl.init, flags, document.body),
			impl.update(scrollTask(popoutRef)),
			impl.subscriptions,
			debugRenderer(moduleName, document.body, popoutRef, impl.view, impl.viewIn, impl.viewOut)
		);
	};

	object['embed'] = function fullscreen(node, flags)
	{
		var popoutRef = { doc: undefined };
		return _elm_lang$core$Native_Platform.initialize(
			flagChecker(impl.init, flags, node),
			impl.update(scrollTask(popoutRef)),
			impl.subscriptions,
			debugRenderer(moduleName, node, popoutRef, impl.view, impl.viewIn, impl.viewOut)
		);
	};
}

function scrollTask(popoutRef)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		var doc = popoutRef.doc;
		if (doc)
		{
			var msgs = doc.getElementsByClassName('debugger-sidebar-messages')[0];
			if (msgs)
			{
				msgs.scrollTop = msgs.scrollHeight;
			}
		}
		callback(_elm_lang$core$Native_Scheduler.succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}


function debugRenderer(moduleName, parentNode, popoutRef, view, viewIn, viewOut)
{
	return function(tagger, initialModel)
	{
		var appEventNode = { tagger: tagger, parent: undefined };
		var eventNode = { tagger: tagger, parent: undefined };

		// make normal stepper
		var appVirtualNode = view(initialModel);
		var appNode = render(appVirtualNode, appEventNode);
		parentNode.appendChild(appNode);
		var appStepper = makeStepper(appNode, view, appVirtualNode, appEventNode);

		// make overlay stepper
		var overVirtualNode = viewIn(initialModel)._1;
		var overNode = render(overVirtualNode, eventNode);
		parentNode.appendChild(overNode);
		var wrappedViewIn = wrapViewIn(appEventNode, overNode, viewIn);
		var overStepper = makeStepper(overNode, wrappedViewIn, overVirtualNode, eventNode);

		// make debugger stepper
		var debugStepper = makeDebugStepper(initialModel, viewOut, eventNode, parentNode, moduleName, popoutRef);

		return function stepper(model)
		{
			appStepper(model);
			overStepper(model);
			debugStepper(model);
		}
	};
}

function makeDebugStepper(initialModel, view, eventNode, parentNode, moduleName, popoutRef)
{
	var curr;
	var domNode;

	return function stepper(model)
	{
		if (!model.isDebuggerOpen)
		{
			return;
		}

		if (!popoutRef.doc)
		{
			curr = view(model);
			domNode = openDebugWindow(moduleName, popoutRef, curr, eventNode);
			return;
		}

		// switch to document of popout
		localDoc = popoutRef.doc;

		var next = view(model);
		var patches = diff(curr, next);
		domNode = applyPatches(domNode, curr, patches, eventNode);
		curr = next;

		// switch back to normal document
		localDoc = document;
	};
}

function openDebugWindow(moduleName, popoutRef, virtualNode, eventNode)
{
	var w = 900;
	var h = 360;
	var x = screen.width - w;
	var y = screen.height - h;
	var debugWindow = window.open('', '', 'width=' + w + ',height=' + h + ',left=' + x + ',top=' + y);

	// switch to window document
	localDoc = debugWindow.document;

	popoutRef.doc = localDoc;
	localDoc.title = 'Debugger - ' + moduleName;
	localDoc.body.style.margin = '0';
	localDoc.body.style.padding = '0';
	var domNode = render(virtualNode, eventNode);
	localDoc.body.appendChild(domNode);

	localDoc.addEventListener('keydown', function(event) {
		if (event.metaKey && event.which === 82)
		{
			window.location.reload();
		}
		if (event.which === 38)
		{
			eventNode.tagger({ ctor: 'Up' });
			event.preventDefault();
		}
		if (event.which === 40)
		{
			eventNode.tagger({ ctor: 'Down' });
			event.preventDefault();
		}
	});

	function close()
	{
		popoutRef.doc = undefined;
		debugWindow.close();
	}
	window.addEventListener('unload', close);
	debugWindow.addEventListener('unload', function() {
		popoutRef.doc = undefined;
		window.removeEventListener('unload', close);
		eventNode.tagger({ ctor: 'Close' });
	});

	// switch back to the normal document
	localDoc = document;

	return domNode;
}


// BLOCK EVENTS

function wrapViewIn(appEventNode, overlayNode, viewIn)
{
	var ignorer = makeIgnorer(overlayNode);
	var blocking = 'Normal';
	var overflow;

	var normalTagger = appEventNode.tagger;
	var blockTagger = function() {};

	return function(model)
	{
		var tuple = viewIn(model);
		var newBlocking = tuple._0.ctor;
		appEventNode.tagger = newBlocking === 'Normal' ? normalTagger : blockTagger;
		if (blocking !== newBlocking)
		{
			traverse('removeEventListener', ignorer, blocking);
			traverse('addEventListener', ignorer, newBlocking);

			if (blocking === 'Normal')
			{
				overflow = document.body.style.overflow;
				document.body.style.overflow = 'hidden';
			}

			if (newBlocking === 'Normal')
			{
				document.body.style.overflow = overflow;
			}

			blocking = newBlocking;
		}
		return tuple._1;
	}
}

function traverse(verbEventListener, ignorer, blocking)
{
	switch(blocking)
	{
		case 'Normal':
			return;

		case 'Pause':
			return traverseHelp(verbEventListener, ignorer, mostEvents);

		case 'Message':
			return traverseHelp(verbEventListener, ignorer, allEvents);
	}
}

function traverseHelp(verbEventListener, handler, eventNames)
{
	for (var i = 0; i < eventNames.length; i++)
	{
		document.body[verbEventListener](eventNames[i], handler, true);
	}
}

function makeIgnorer(overlayNode)
{
	return function(event)
	{
		if (event.type === 'keydown' && event.metaKey && event.which === 82)
		{
			return;
		}

		var isScroll = event.type === 'scroll' || event.type === 'wheel';

		var node = event.target;
		while (node !== null)
		{
			if (node.className === 'elm-overlay-message-details' && isScroll)
			{
				return;
			}

			if (node === overlayNode && !isScroll)
			{
				return;
			}
			node = node.parentNode;
		}

		event.stopPropagation();
		event.preventDefault();
	}
}

var mostEvents = [
	'click', 'dblclick', 'mousemove',
	'mouseup', 'mousedown', 'mouseenter', 'mouseleave',
	'touchstart', 'touchend', 'touchcancel', 'touchmove',
	'pointerdown', 'pointerup', 'pointerover', 'pointerout',
	'pointerenter', 'pointerleave', 'pointermove', 'pointercancel',
	'dragstart', 'drag', 'dragend', 'dragenter', 'dragover', 'dragleave', 'drop',
	'keyup', 'keydown', 'keypress',
	'input', 'change',
	'focus', 'blur'
];

var allEvents = mostEvents.concat('wheel', 'scroll');


return {
	node: node,
	text: text,
	custom: custom,
	map: F2(map),

	on: F3(on),
	style: style,
	property: F2(property),
	attribute: F2(attribute),
	attributeNS: F3(attributeNS),
	mapProperty: F2(mapProperty),

	lazy: F2(lazy),
	lazy2: F3(lazy2),
	lazy3: F4(lazy3),
	keyedNode: F3(keyedNode),

	program: program,
	programWithFlags: programWithFlags,
	staticProgram: staticProgram
};

}();

var _elm_lang$virtual_dom$VirtualDom$programWithFlags = function (impl) {
	return A2(_elm_lang$virtual_dom$Native_VirtualDom.programWithFlags, _elm_lang$virtual_dom$VirtualDom_Debug$wrapWithFlags, impl);
};
var _elm_lang$virtual_dom$VirtualDom$program = function (impl) {
	return A2(_elm_lang$virtual_dom$Native_VirtualDom.program, _elm_lang$virtual_dom$VirtualDom_Debug$wrap, impl);
};
var _elm_lang$virtual_dom$VirtualDom$keyedNode = _elm_lang$virtual_dom$Native_VirtualDom.keyedNode;
var _elm_lang$virtual_dom$VirtualDom$lazy3 = _elm_lang$virtual_dom$Native_VirtualDom.lazy3;
var _elm_lang$virtual_dom$VirtualDom$lazy2 = _elm_lang$virtual_dom$Native_VirtualDom.lazy2;
var _elm_lang$virtual_dom$VirtualDom$lazy = _elm_lang$virtual_dom$Native_VirtualDom.lazy;
var _elm_lang$virtual_dom$VirtualDom$defaultOptions = {stopPropagation: false, preventDefault: false};
var _elm_lang$virtual_dom$VirtualDom$onWithOptions = _elm_lang$virtual_dom$Native_VirtualDom.on;
var _elm_lang$virtual_dom$VirtualDom$on = F2(
	function (eventName, decoder) {
		return A3(_elm_lang$virtual_dom$VirtualDom$onWithOptions, eventName, _elm_lang$virtual_dom$VirtualDom$defaultOptions, decoder);
	});
var _elm_lang$virtual_dom$VirtualDom$style = _elm_lang$virtual_dom$Native_VirtualDom.style;
var _elm_lang$virtual_dom$VirtualDom$mapProperty = _elm_lang$virtual_dom$Native_VirtualDom.mapProperty;
var _elm_lang$virtual_dom$VirtualDom$attributeNS = _elm_lang$virtual_dom$Native_VirtualDom.attributeNS;
var _elm_lang$virtual_dom$VirtualDom$attribute = _elm_lang$virtual_dom$Native_VirtualDom.attribute;
var _elm_lang$virtual_dom$VirtualDom$property = _elm_lang$virtual_dom$Native_VirtualDom.property;
var _elm_lang$virtual_dom$VirtualDom$map = _elm_lang$virtual_dom$Native_VirtualDom.map;
var _elm_lang$virtual_dom$VirtualDom$text = _elm_lang$virtual_dom$Native_VirtualDom.text;
var _elm_lang$virtual_dom$VirtualDom$node = _elm_lang$virtual_dom$Native_VirtualDom.node;
var _elm_lang$virtual_dom$VirtualDom$Options = F2(
	function (a, b) {
		return {stopPropagation: a, preventDefault: b};
	});
var _elm_lang$virtual_dom$VirtualDom$Node = {ctor: 'Node'};
var _elm_lang$virtual_dom$VirtualDom$Property = {ctor: 'Property'};

var _elm_lang$html$Html$programWithFlags = _elm_lang$virtual_dom$VirtualDom$programWithFlags;
var _elm_lang$html$Html$program = _elm_lang$virtual_dom$VirtualDom$program;
var _elm_lang$html$Html$beginnerProgram = function (_p0) {
	var _p1 = _p0;
	return _elm_lang$html$Html$program(
		{
			init: A2(
				_elm_lang$core$Platform_Cmd_ops['!'],
				_p1.model,
				{ctor: '[]'}),
			update: F2(
				function (msg, model) {
					return A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						A2(_p1.update, msg, model),
						{ctor: '[]'});
				}),
			view: _p1.view,
			subscriptions: function (_p2) {
				return _elm_lang$core$Platform_Sub$none;
			}
		});
};
var _elm_lang$html$Html$map = _elm_lang$virtual_dom$VirtualDom$map;
var _elm_lang$html$Html$text = _elm_lang$virtual_dom$VirtualDom$text;
var _elm_lang$html$Html$node = _elm_lang$virtual_dom$VirtualDom$node;
var _elm_lang$html$Html$body = _elm_lang$html$Html$node('body');
var _elm_lang$html$Html$section = _elm_lang$html$Html$node('section');
var _elm_lang$html$Html$nav = _elm_lang$html$Html$node('nav');
var _elm_lang$html$Html$article = _elm_lang$html$Html$node('article');
var _elm_lang$html$Html$aside = _elm_lang$html$Html$node('aside');
var _elm_lang$html$Html$h1 = _elm_lang$html$Html$node('h1');
var _elm_lang$html$Html$h2 = _elm_lang$html$Html$node('h2');
var _elm_lang$html$Html$h3 = _elm_lang$html$Html$node('h3');
var _elm_lang$html$Html$h4 = _elm_lang$html$Html$node('h4');
var _elm_lang$html$Html$h5 = _elm_lang$html$Html$node('h5');
var _elm_lang$html$Html$h6 = _elm_lang$html$Html$node('h6');
var _elm_lang$html$Html$header = _elm_lang$html$Html$node('header');
var _elm_lang$html$Html$footer = _elm_lang$html$Html$node('footer');
var _elm_lang$html$Html$address = _elm_lang$html$Html$node('address');
var _elm_lang$html$Html$main_ = _elm_lang$html$Html$node('main');
var _elm_lang$html$Html$p = _elm_lang$html$Html$node('p');
var _elm_lang$html$Html$hr = _elm_lang$html$Html$node('hr');
var _elm_lang$html$Html$pre = _elm_lang$html$Html$node('pre');
var _elm_lang$html$Html$blockquote = _elm_lang$html$Html$node('blockquote');
var _elm_lang$html$Html$ol = _elm_lang$html$Html$node('ol');
var _elm_lang$html$Html$ul = _elm_lang$html$Html$node('ul');
var _elm_lang$html$Html$li = _elm_lang$html$Html$node('li');
var _elm_lang$html$Html$dl = _elm_lang$html$Html$node('dl');
var _elm_lang$html$Html$dt = _elm_lang$html$Html$node('dt');
var _elm_lang$html$Html$dd = _elm_lang$html$Html$node('dd');
var _elm_lang$html$Html$figure = _elm_lang$html$Html$node('figure');
var _elm_lang$html$Html$figcaption = _elm_lang$html$Html$node('figcaption');
var _elm_lang$html$Html$div = _elm_lang$html$Html$node('div');
var _elm_lang$html$Html$a = _elm_lang$html$Html$node('a');
var _elm_lang$html$Html$em = _elm_lang$html$Html$node('em');
var _elm_lang$html$Html$strong = _elm_lang$html$Html$node('strong');
var _elm_lang$html$Html$small = _elm_lang$html$Html$node('small');
var _elm_lang$html$Html$s = _elm_lang$html$Html$node('s');
var _elm_lang$html$Html$cite = _elm_lang$html$Html$node('cite');
var _elm_lang$html$Html$q = _elm_lang$html$Html$node('q');
var _elm_lang$html$Html$dfn = _elm_lang$html$Html$node('dfn');
var _elm_lang$html$Html$abbr = _elm_lang$html$Html$node('abbr');
var _elm_lang$html$Html$time = _elm_lang$html$Html$node('time');
var _elm_lang$html$Html$code = _elm_lang$html$Html$node('code');
var _elm_lang$html$Html$var = _elm_lang$html$Html$node('var');
var _elm_lang$html$Html$samp = _elm_lang$html$Html$node('samp');
var _elm_lang$html$Html$kbd = _elm_lang$html$Html$node('kbd');
var _elm_lang$html$Html$sub = _elm_lang$html$Html$node('sub');
var _elm_lang$html$Html$sup = _elm_lang$html$Html$node('sup');
var _elm_lang$html$Html$i = _elm_lang$html$Html$node('i');
var _elm_lang$html$Html$b = _elm_lang$html$Html$node('b');
var _elm_lang$html$Html$u = _elm_lang$html$Html$node('u');
var _elm_lang$html$Html$mark = _elm_lang$html$Html$node('mark');
var _elm_lang$html$Html$ruby = _elm_lang$html$Html$node('ruby');
var _elm_lang$html$Html$rt = _elm_lang$html$Html$node('rt');
var _elm_lang$html$Html$rp = _elm_lang$html$Html$node('rp');
var _elm_lang$html$Html$bdi = _elm_lang$html$Html$node('bdi');
var _elm_lang$html$Html$bdo = _elm_lang$html$Html$node('bdo');
var _elm_lang$html$Html$span = _elm_lang$html$Html$node('span');
var _elm_lang$html$Html$br = _elm_lang$html$Html$node('br');
var _elm_lang$html$Html$wbr = _elm_lang$html$Html$node('wbr');
var _elm_lang$html$Html$ins = _elm_lang$html$Html$node('ins');
var _elm_lang$html$Html$del = _elm_lang$html$Html$node('del');
var _elm_lang$html$Html$img = _elm_lang$html$Html$node('img');
var _elm_lang$html$Html$iframe = _elm_lang$html$Html$node('iframe');
var _elm_lang$html$Html$embed = _elm_lang$html$Html$node('embed');
var _elm_lang$html$Html$object = _elm_lang$html$Html$node('object');
var _elm_lang$html$Html$param = _elm_lang$html$Html$node('param');
var _elm_lang$html$Html$video = _elm_lang$html$Html$node('video');
var _elm_lang$html$Html$audio = _elm_lang$html$Html$node('audio');
var _elm_lang$html$Html$source = _elm_lang$html$Html$node('source');
var _elm_lang$html$Html$track = _elm_lang$html$Html$node('track');
var _elm_lang$html$Html$canvas = _elm_lang$html$Html$node('canvas');
var _elm_lang$html$Html$math = _elm_lang$html$Html$node('math');
var _elm_lang$html$Html$table = _elm_lang$html$Html$node('table');
var _elm_lang$html$Html$caption = _elm_lang$html$Html$node('caption');
var _elm_lang$html$Html$colgroup = _elm_lang$html$Html$node('colgroup');
var _elm_lang$html$Html$col = _elm_lang$html$Html$node('col');
var _elm_lang$html$Html$tbody = _elm_lang$html$Html$node('tbody');
var _elm_lang$html$Html$thead = _elm_lang$html$Html$node('thead');
var _elm_lang$html$Html$tfoot = _elm_lang$html$Html$node('tfoot');
var _elm_lang$html$Html$tr = _elm_lang$html$Html$node('tr');
var _elm_lang$html$Html$td = _elm_lang$html$Html$node('td');
var _elm_lang$html$Html$th = _elm_lang$html$Html$node('th');
var _elm_lang$html$Html$form = _elm_lang$html$Html$node('form');
var _elm_lang$html$Html$fieldset = _elm_lang$html$Html$node('fieldset');
var _elm_lang$html$Html$legend = _elm_lang$html$Html$node('legend');
var _elm_lang$html$Html$label = _elm_lang$html$Html$node('label');
var _elm_lang$html$Html$input = _elm_lang$html$Html$node('input');
var _elm_lang$html$Html$button = _elm_lang$html$Html$node('button');
var _elm_lang$html$Html$select = _elm_lang$html$Html$node('select');
var _elm_lang$html$Html$datalist = _elm_lang$html$Html$node('datalist');
var _elm_lang$html$Html$optgroup = _elm_lang$html$Html$node('optgroup');
var _elm_lang$html$Html$option = _elm_lang$html$Html$node('option');
var _elm_lang$html$Html$textarea = _elm_lang$html$Html$node('textarea');
var _elm_lang$html$Html$keygen = _elm_lang$html$Html$node('keygen');
var _elm_lang$html$Html$output = _elm_lang$html$Html$node('output');
var _elm_lang$html$Html$progress = _elm_lang$html$Html$node('progress');
var _elm_lang$html$Html$meter = _elm_lang$html$Html$node('meter');
var _elm_lang$html$Html$details = _elm_lang$html$Html$node('details');
var _elm_lang$html$Html$summary = _elm_lang$html$Html$node('summary');
var _elm_lang$html$Html$menuitem = _elm_lang$html$Html$node('menuitem');
var _elm_lang$html$Html$menu = _elm_lang$html$Html$node('menu');

var _elm_lang$html$Html_Attributes$map = _elm_lang$virtual_dom$VirtualDom$mapProperty;
var _elm_lang$html$Html_Attributes$attribute = _elm_lang$virtual_dom$VirtualDom$attribute;
var _elm_lang$html$Html_Attributes$contextmenu = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'contextmenu', value);
};
var _elm_lang$html$Html_Attributes$draggable = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'draggable', value);
};
var _elm_lang$html$Html_Attributes$itemprop = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'itemprop', value);
};
var _elm_lang$html$Html_Attributes$tabindex = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'tabIndex',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$charset = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'charset', value);
};
var _elm_lang$html$Html_Attributes$height = function (value) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'height',
		_elm_lang$core$Basics$toString(value));
};
var _elm_lang$html$Html_Attributes$width = function (value) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'width',
		_elm_lang$core$Basics$toString(value));
};
var _elm_lang$html$Html_Attributes$formaction = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'formAction', value);
};
var _elm_lang$html$Html_Attributes$list = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'list', value);
};
var _elm_lang$html$Html_Attributes$minlength = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'minLength',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$maxlength = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'maxlength',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$size = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'size',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$form = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'form', value);
};
var _elm_lang$html$Html_Attributes$cols = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'cols',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$rows = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'rows',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$challenge = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'challenge', value);
};
var _elm_lang$html$Html_Attributes$media = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'media', value);
};
var _elm_lang$html$Html_Attributes$rel = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'rel', value);
};
var _elm_lang$html$Html_Attributes$datetime = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'datetime', value);
};
var _elm_lang$html$Html_Attributes$pubdate = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'pubdate', value);
};
var _elm_lang$html$Html_Attributes$colspan = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'colspan',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$rowspan = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'rowspan',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$manifest = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'manifest', value);
};
var _elm_lang$html$Html_Attributes$property = _elm_lang$virtual_dom$VirtualDom$property;
var _elm_lang$html$Html_Attributes$stringProperty = F2(
	function (name, string) {
		return A2(
			_elm_lang$html$Html_Attributes$property,
			name,
			_elm_lang$core$Json_Encode$string(string));
	});
var _elm_lang$html$Html_Attributes$class = function (name) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'className', name);
};
var _elm_lang$html$Html_Attributes$id = function (name) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'id', name);
};
var _elm_lang$html$Html_Attributes$title = function (name) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'title', name);
};
var _elm_lang$html$Html_Attributes$accesskey = function ($char) {
	return A2(
		_elm_lang$html$Html_Attributes$stringProperty,
		'accessKey',
		_elm_lang$core$String$fromChar($char));
};
var _elm_lang$html$Html_Attributes$dir = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'dir', value);
};
var _elm_lang$html$Html_Attributes$dropzone = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'dropzone', value);
};
var _elm_lang$html$Html_Attributes$lang = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'lang', value);
};
var _elm_lang$html$Html_Attributes$content = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'content', value);
};
var _elm_lang$html$Html_Attributes$httpEquiv = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'httpEquiv', value);
};
var _elm_lang$html$Html_Attributes$language = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'language', value);
};
var _elm_lang$html$Html_Attributes$src = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'src', value);
};
var _elm_lang$html$Html_Attributes$alt = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'alt', value);
};
var _elm_lang$html$Html_Attributes$preload = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'preload', value);
};
var _elm_lang$html$Html_Attributes$poster = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'poster', value);
};
var _elm_lang$html$Html_Attributes$kind = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'kind', value);
};
var _elm_lang$html$Html_Attributes$srclang = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'srclang', value);
};
var _elm_lang$html$Html_Attributes$sandbox = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'sandbox', value);
};
var _elm_lang$html$Html_Attributes$srcdoc = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'srcdoc', value);
};
var _elm_lang$html$Html_Attributes$type_ = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'type', value);
};
var _elm_lang$html$Html_Attributes$value = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'value', value);
};
var _elm_lang$html$Html_Attributes$defaultValue = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'defaultValue', value);
};
var _elm_lang$html$Html_Attributes$placeholder = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'placeholder', value);
};
var _elm_lang$html$Html_Attributes$accept = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'accept', value);
};
var _elm_lang$html$Html_Attributes$acceptCharset = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'acceptCharset', value);
};
var _elm_lang$html$Html_Attributes$action = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'action', value);
};
var _elm_lang$html$Html_Attributes$autocomplete = function (bool) {
	return A2(
		_elm_lang$html$Html_Attributes$stringProperty,
		'autocomplete',
		bool ? 'on' : 'off');
};
var _elm_lang$html$Html_Attributes$enctype = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'enctype', value);
};
var _elm_lang$html$Html_Attributes$method = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'method', value);
};
var _elm_lang$html$Html_Attributes$name = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'name', value);
};
var _elm_lang$html$Html_Attributes$pattern = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'pattern', value);
};
var _elm_lang$html$Html_Attributes$for = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'htmlFor', value);
};
var _elm_lang$html$Html_Attributes$max = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'max', value);
};
var _elm_lang$html$Html_Attributes$min = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'min', value);
};
var _elm_lang$html$Html_Attributes$step = function (n) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'step', n);
};
var _elm_lang$html$Html_Attributes$wrap = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'wrap', value);
};
var _elm_lang$html$Html_Attributes$usemap = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'useMap', value);
};
var _elm_lang$html$Html_Attributes$shape = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'shape', value);
};
var _elm_lang$html$Html_Attributes$coords = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'coords', value);
};
var _elm_lang$html$Html_Attributes$keytype = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'keytype', value);
};
var _elm_lang$html$Html_Attributes$align = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'align', value);
};
var _elm_lang$html$Html_Attributes$cite = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'cite', value);
};
var _elm_lang$html$Html_Attributes$href = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'href', value);
};
var _elm_lang$html$Html_Attributes$target = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'target', value);
};
var _elm_lang$html$Html_Attributes$downloadAs = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'download', value);
};
var _elm_lang$html$Html_Attributes$hreflang = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'hreflang', value);
};
var _elm_lang$html$Html_Attributes$ping = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'ping', value);
};
var _elm_lang$html$Html_Attributes$start = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$stringProperty,
		'start',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$headers = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'headers', value);
};
var _elm_lang$html$Html_Attributes$scope = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'scope', value);
};
var _elm_lang$html$Html_Attributes$boolProperty = F2(
	function (name, bool) {
		return A2(
			_elm_lang$html$Html_Attributes$property,
			name,
			_elm_lang$core$Json_Encode$bool(bool));
	});
var _elm_lang$html$Html_Attributes$hidden = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'hidden', bool);
};
var _elm_lang$html$Html_Attributes$contenteditable = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'contentEditable', bool);
};
var _elm_lang$html$Html_Attributes$spellcheck = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'spellcheck', bool);
};
var _elm_lang$html$Html_Attributes$async = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'async', bool);
};
var _elm_lang$html$Html_Attributes$defer = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'defer', bool);
};
var _elm_lang$html$Html_Attributes$scoped = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'scoped', bool);
};
var _elm_lang$html$Html_Attributes$autoplay = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'autoplay', bool);
};
var _elm_lang$html$Html_Attributes$controls = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'controls', bool);
};
var _elm_lang$html$Html_Attributes$loop = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'loop', bool);
};
var _elm_lang$html$Html_Attributes$default = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'default', bool);
};
var _elm_lang$html$Html_Attributes$seamless = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'seamless', bool);
};
var _elm_lang$html$Html_Attributes$checked = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'checked', bool);
};
var _elm_lang$html$Html_Attributes$selected = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'selected', bool);
};
var _elm_lang$html$Html_Attributes$autofocus = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'autofocus', bool);
};
var _elm_lang$html$Html_Attributes$disabled = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'disabled', bool);
};
var _elm_lang$html$Html_Attributes$multiple = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'multiple', bool);
};
var _elm_lang$html$Html_Attributes$novalidate = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'noValidate', bool);
};
var _elm_lang$html$Html_Attributes$readonly = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'readOnly', bool);
};
var _elm_lang$html$Html_Attributes$required = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'required', bool);
};
var _elm_lang$html$Html_Attributes$ismap = function (value) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'isMap', value);
};
var _elm_lang$html$Html_Attributes$download = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'download', bool);
};
var _elm_lang$html$Html_Attributes$reversed = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'reversed', bool);
};
var _elm_lang$html$Html_Attributes$classList = function (list) {
	return _elm_lang$html$Html_Attributes$class(
		A2(
			_elm_lang$core$String$join,
			' ',
			A2(
				_elm_lang$core$List$map,
				_elm_lang$core$Tuple$first,
				A2(_elm_lang$core$List$filter, _elm_lang$core$Tuple$second, list))));
};
var _elm_lang$html$Html_Attributes$style = _elm_lang$virtual_dom$VirtualDom$style;

var _elm_lang$core$Set$foldr = F3(
	function (f, b, _p0) {
		var _p1 = _p0;
		return A3(
			_elm_lang$core$Dict$foldr,
			F3(
				function (k, _p2, b) {
					return A2(f, k, b);
				}),
			b,
			_p1._0);
	});
var _elm_lang$core$Set$foldl = F3(
	function (f, b, _p3) {
		var _p4 = _p3;
		return A3(
			_elm_lang$core$Dict$foldl,
			F3(
				function (k, _p5, b) {
					return A2(f, k, b);
				}),
			b,
			_p4._0);
	});
var _elm_lang$core$Set$toList = function (_p6) {
	var _p7 = _p6;
	return _elm_lang$core$Dict$keys(_p7._0);
};
var _elm_lang$core$Set$size = function (_p8) {
	var _p9 = _p8;
	return _elm_lang$core$Dict$size(_p9._0);
};
var _elm_lang$core$Set$member = F2(
	function (k, _p10) {
		var _p11 = _p10;
		return A2(_elm_lang$core$Dict$member, k, _p11._0);
	});
var _elm_lang$core$Set$isEmpty = function (_p12) {
	var _p13 = _p12;
	return _elm_lang$core$Dict$isEmpty(_p13._0);
};
var _elm_lang$core$Set$Set_elm_builtin = function (a) {
	return {ctor: 'Set_elm_builtin', _0: a};
};
var _elm_lang$core$Set$empty = _elm_lang$core$Set$Set_elm_builtin(_elm_lang$core$Dict$empty);
var _elm_lang$core$Set$singleton = function (k) {
	return _elm_lang$core$Set$Set_elm_builtin(
		A2(
			_elm_lang$core$Dict$singleton,
			k,
			{ctor: '_Tuple0'}));
};
var _elm_lang$core$Set$insert = F2(
	function (k, _p14) {
		var _p15 = _p14;
		return _elm_lang$core$Set$Set_elm_builtin(
			A3(
				_elm_lang$core$Dict$insert,
				k,
				{ctor: '_Tuple0'},
				_p15._0));
	});
var _elm_lang$core$Set$fromList = function (xs) {
	return A3(_elm_lang$core$List$foldl, _elm_lang$core$Set$insert, _elm_lang$core$Set$empty, xs);
};
var _elm_lang$core$Set$map = F2(
	function (f, s) {
		return _elm_lang$core$Set$fromList(
			A2(
				_elm_lang$core$List$map,
				f,
				_elm_lang$core$Set$toList(s)));
	});
var _elm_lang$core$Set$remove = F2(
	function (k, _p16) {
		var _p17 = _p16;
		return _elm_lang$core$Set$Set_elm_builtin(
			A2(_elm_lang$core$Dict$remove, k, _p17._0));
	});
var _elm_lang$core$Set$union = F2(
	function (_p19, _p18) {
		var _p20 = _p19;
		var _p21 = _p18;
		return _elm_lang$core$Set$Set_elm_builtin(
			A2(_elm_lang$core$Dict$union, _p20._0, _p21._0));
	});
var _elm_lang$core$Set$intersect = F2(
	function (_p23, _p22) {
		var _p24 = _p23;
		var _p25 = _p22;
		return _elm_lang$core$Set$Set_elm_builtin(
			A2(_elm_lang$core$Dict$intersect, _p24._0, _p25._0));
	});
var _elm_lang$core$Set$diff = F2(
	function (_p27, _p26) {
		var _p28 = _p27;
		var _p29 = _p26;
		return _elm_lang$core$Set$Set_elm_builtin(
			A2(_elm_lang$core$Dict$diff, _p28._0, _p29._0));
	});
var _elm_lang$core$Set$filter = F2(
	function (p, _p30) {
		var _p31 = _p30;
		return _elm_lang$core$Set$Set_elm_builtin(
			A2(
				_elm_lang$core$Dict$filter,
				F2(
					function (k, _p32) {
						return p(k);
					}),
				_p31._0));
	});
var _elm_lang$core$Set$partition = F2(
	function (p, _p33) {
		var _p34 = _p33;
		var _p35 = A2(
			_elm_lang$core$Dict$partition,
			F2(
				function (k, _p36) {
					return p(k);
				}),
			_p34._0);
		var p1 = _p35._0;
		var p2 = _p35._1;
		return {
			ctor: '_Tuple2',
			_0: _elm_lang$core$Set$Set_elm_builtin(p1),
			_1: _elm_lang$core$Set$Set_elm_builtin(p2)
		};
	});

var _elm_lang$html$Html_Events$keyCode = A2(_elm_lang$core$Json_Decode$field, 'keyCode', _elm_lang$core$Json_Decode$int);
var _elm_lang$html$Html_Events$targetChecked = A2(
	_elm_lang$core$Json_Decode$at,
	{
		ctor: '::',
		_0: 'target',
		_1: {
			ctor: '::',
			_0: 'checked',
			_1: {ctor: '[]'}
		}
	},
	_elm_lang$core$Json_Decode$bool);
var _elm_lang$html$Html_Events$targetValue = A2(
	_elm_lang$core$Json_Decode$at,
	{
		ctor: '::',
		_0: 'target',
		_1: {
			ctor: '::',
			_0: 'value',
			_1: {ctor: '[]'}
		}
	},
	_elm_lang$core$Json_Decode$string);
var _elm_lang$html$Html_Events$defaultOptions = _elm_lang$virtual_dom$VirtualDom$defaultOptions;
var _elm_lang$html$Html_Events$onWithOptions = _elm_lang$virtual_dom$VirtualDom$onWithOptions;
var _elm_lang$html$Html_Events$on = _elm_lang$virtual_dom$VirtualDom$on;
var _elm_lang$html$Html_Events$onFocus = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'focus',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onBlur = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'blur',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onSubmitOptions = _elm_lang$core$Native_Utils.update(
	_elm_lang$html$Html_Events$defaultOptions,
	{preventDefault: true});
var _elm_lang$html$Html_Events$onSubmit = function (msg) {
	return A3(
		_elm_lang$html$Html_Events$onWithOptions,
		'submit',
		_elm_lang$html$Html_Events$onSubmitOptions,
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onCheck = function (tagger) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'change',
		A2(_elm_lang$core$Json_Decode$map, tagger, _elm_lang$html$Html_Events$targetChecked));
};
var _elm_lang$html$Html_Events$onInput = function (tagger) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'input',
		A2(_elm_lang$core$Json_Decode$map, tagger, _elm_lang$html$Html_Events$targetValue));
};
var _elm_lang$html$Html_Events$onMouseOut = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mouseout',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onMouseOver = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mouseover',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onMouseLeave = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mouseleave',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onMouseEnter = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mouseenter',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onMouseUp = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mouseup',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onMouseDown = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mousedown',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onDoubleClick = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'dblclick',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onClick = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'click',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$Options = F2(
	function (a, b) {
		return {stopPropagation: a, preventDefault: b};
	});

var _elm_lang$html$Html_Keyed$node = _elm_lang$virtual_dom$VirtualDom$keyedNode;
var _elm_lang$html$Html_Keyed$ol = _elm_lang$html$Html_Keyed$node('ol');
var _elm_lang$html$Html_Keyed$ul = _elm_lang$html$Html_Keyed$node('ul');

var _elm_lang$html$Html_Lazy$lazy3 = _elm_lang$virtual_dom$VirtualDom$lazy3;
var _elm_lang$html$Html_Lazy$lazy2 = _elm_lang$virtual_dom$VirtualDom$lazy2;
var _elm_lang$html$Html_Lazy$lazy = _elm_lang$virtual_dom$VirtualDom$lazy;

var _ericgj$elm_csv_decode$Csv_Decode$listFindOk = F2(
	function (fn, list) {
		listFindOk:
		while (true) {
			var _p0 = list;
			if (_p0.ctor === '[]') {
				return _elm_lang$core$Maybe$Nothing;
			} else {
				var _p1 = fn(_p0._0);
				if (_p1.ctor === 'Ok') {
					return _elm_lang$core$Maybe$Just(
						_elm_lang$core$Result$Ok(_p1._0));
				} else {
					var _v2 = fn,
						_v3 = _p0._1;
					fn = _v2;
					list = _v3;
					continue listFindOk;
				}
			}
		}
	});
var _ericgj$elm_csv_decode$Csv_Decode$listFind = F2(
	function (pred, list) {
		listFind:
		while (true) {
			var _p2 = list;
			if (_p2.ctor === '[]') {
				return _elm_lang$core$Maybe$Nothing;
			} else {
				var _p3 = _p2._0;
				if (pred(_p3)) {
					return _elm_lang$core$Maybe$Just(_p3);
				} else {
					var _v5 = pred,
						_v6 = _p2._1;
					pred = _v5;
					list = _v6;
					continue listFind;
				}
			}
		}
	});
var _ericgj$elm_csv_decode$Csv_Decode$sequenceResultsAccumErrs = function (list) {
	var accum = F2(
		function (next, _p4) {
			var _p5 = _p4;
			var _p7 = _p5._0;
			var _p6 = {ctor: '_Tuple2', _0: next, _1: _p5._1};
			if (_p6._0.ctor === 'Ok') {
				if (_p6._1.ctor === 'Ok') {
					return {
						ctor: '_Tuple2',
						_0: _p7 - 1,
						_1: _elm_lang$core$Result$Ok(
							{ctor: '::', _0: _p6._0._0, _1: _p6._1._0})
					};
				} else {
					return {
						ctor: '_Tuple2',
						_0: _p7 - 1,
						_1: _elm_lang$core$Result$Err(_p6._1._0)
					};
				}
			} else {
				if (_p6._1.ctor === 'Ok') {
					return {
						ctor: '_Tuple2',
						_0: _p7 - 1,
						_1: _elm_lang$core$Result$Err(
							{
								ctor: '::',
								_0: {ctor: '_Tuple2', _0: _p7, _1: _p6._0._0},
								_1: {ctor: '[]'}
							})
					};
				} else {
					return {
						ctor: '_Tuple2',
						_0: _p7 - 1,
						_1: _elm_lang$core$Result$Err(
							{
								ctor: '::',
								_0: {ctor: '_Tuple2', _0: _p7, _1: _p6._0._0},
								_1: _p6._1._0
							})
					};
				}
			}
		});
	return _elm_lang$core$Tuple$second(
		A3(
			_elm_lang$core$List$foldr,
			accum,
			{
				ctor: '_Tuple2',
				_0: _elm_lang$core$List$length(list) - 1,
				_1: _elm_lang$core$Result$Ok(
					{ctor: '[]'})
			},
			list));
};
var _ericgj$elm_csv_decode$Csv_Decode$maybe = F2(
	function (fn, s) {
		return _elm_lang$core$Native_Utils.eq(s, '') ? _elm_lang$core$Result$Ok(_elm_lang$core$Maybe$Nothing) : A2(
			_elm_lang$core$Result$map,
			_elm_lang$core$Maybe$Just,
			fn(s));
	});
var _ericgj$elm_csv_decode$Csv_Decode$mapHelp = F2(
	function (fn, _p8) {
		var _p9 = _p8;
		return {
			visited: _p9.visited,
			unvisited: _p9.unvisited,
			value: fn(_p9.value)
		};
	});
var _ericgj$elm_csv_decode$Csv_Decode$decodeRecord = F3(
	function (_p10, headers, record) {
		var _p11 = _p10;
		return A2(
			_elm_lang$core$Result$map,
			function (_) {
				return _.value;
			},
			_p11._0(
				{
					visited: {ctor: '[]'},
					unvisited: A3(
						_elm_lang$core$List$map2,
						F2(
							function (v0, v1) {
								return {ctor: '_Tuple2', _0: v0, _1: v1};
							}),
						headers,
						record),
					value: _elm_lang$core$Basics$identity
				}));
	});
var _ericgj$elm_csv_decode$Csv_Decode$Csv = F2(
	function (a, b) {
		return {headers: a, records: b};
	});
var _ericgj$elm_csv_decode$Csv_Decode$State = F3(
	function (a, b, c) {
		return {visited: a, unvisited: b, value: c};
	});
var _ericgj$elm_csv_decode$Csv_Decode$Decoder = function (a) {
	return {ctor: 'Decoder', _0: a};
};
var _ericgj$elm_csv_decode$Csv_Decode$next = function (fn) {
	return _ericgj$elm_csv_decode$Csv_Decode$Decoder(
		function (_p12) {
			var _p13 = _p12;
			var _p14 = _p13.unvisited;
			if (_p14.ctor === '[]') {
				return _elm_lang$core$Result$Err('Past the end of the record');
			} else {
				var _p16 = _p14._0._1;
				var _p15 = fn(_p16);
				if (_p15.ctor === 'Ok') {
					return _elm_lang$core$Result$Ok(
						A3(
							_ericgj$elm_csv_decode$Csv_Decode$State,
							{
								ctor: '::',
								_0: {ctor: '_Tuple2', _0: _p14._0._0, _1: _p16},
								_1: _p13.visited
							},
							_p14._1,
							_p13.value(_p15._0)));
				} else {
					return _elm_lang$core$Result$Err(_p15._0);
				}
			}
		});
};
var _ericgj$elm_csv_decode$Csv_Decode$field = F2(
	function (name, fn) {
		return _ericgj$elm_csv_decode$Csv_Decode$Decoder(
			function (_p17) {
				var _p18 = _p17;
				var _p23 = _p18.unvisited;
				var _p21 = A2(
					_ericgj$elm_csv_decode$Csv_Decode$listFind,
					function (_p19) {
						var _p20 = _p19;
						return _elm_lang$core$Native_Utils.eq(_p20._0, name);
					},
					_p23);
				if (_p21.ctor === 'Nothing') {
					return _elm_lang$core$Result$Err(
						A2(
							_elm_lang$core$Basics_ops['++'],
							'No field named \'',
							A2(_elm_lang$core$Basics_ops['++'], name, '\' found')));
				} else {
					var _p22 = fn(_p21._0._1);
					if (_p22.ctor === 'Ok') {
						return _elm_lang$core$Result$Ok(
							A3(
								_ericgj$elm_csv_decode$Csv_Decode$State,
								_p18.visited,
								_p23,
								_p18.value(_p22._0)));
					} else {
						return _elm_lang$core$Result$Err(_p22._0);
					}
				}
			});
	});
var _ericgj$elm_csv_decode$Csv_Decode$assertNext = function (expected) {
	return _ericgj$elm_csv_decode$Csv_Decode$Decoder(
		function (_p24) {
			var _p25 = _p24;
			var _p26 = _p25.unvisited;
			if (_p26.ctor === '[]') {
				return _elm_lang$core$Result$Err('Past the end of the record');
			} else {
				var _p27 = _p26._0._1;
				return _elm_lang$core$Native_Utils.eq(_p27, expected) ? _elm_lang$core$Result$Ok(
					A3(
						_ericgj$elm_csv_decode$Csv_Decode$State,
						{
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: _p26._0._0, _1: _p27},
							_1: _p25.visited
						},
						_p26._1,
						_p25.value)) : _elm_lang$core$Result$Err(
					A2(
						_elm_lang$core$Basics_ops['++'],
						'Expected \'',
						A2(
							_elm_lang$core$Basics_ops['++'],
							expected,
							A2(
								_elm_lang$core$Basics_ops['++'],
								'\', was \'',
								A2(_elm_lang$core$Basics_ops['++'], _p27, '\'')))));
			}
		});
};
var _ericgj$elm_csv_decode$Csv_Decode$assertField = F2(
	function (name, expected) {
		return _ericgj$elm_csv_decode$Csv_Decode$Decoder(
			function (_p28) {
				var _p29 = _p28;
				var _p34 = _p29.unvisited;
				var _p32 = A2(
					_ericgj$elm_csv_decode$Csv_Decode$listFind,
					function (_p30) {
						var _p31 = _p30;
						return _elm_lang$core$Native_Utils.eq(_p31._0, name);
					},
					_p34);
				if (_p32.ctor === 'Nothing') {
					return _elm_lang$core$Result$Err(
						A2(
							_elm_lang$core$Basics_ops['++'],
							'No field named \'',
							A2(_elm_lang$core$Basics_ops['++'], name, '\' found')));
				} else {
					var _p33 = _p32._0._1;
					return _elm_lang$core$Native_Utils.eq(_p33, expected) ? _elm_lang$core$Result$Ok(
						A3(_ericgj$elm_csv_decode$Csv_Decode$State, _p29.visited, _p34, _p29.value)) : _elm_lang$core$Result$Err(
						A2(
							_elm_lang$core$Basics_ops['++'],
							'Expected \'',
							A2(
								_elm_lang$core$Basics_ops['++'],
								expected,
								A2(
									_elm_lang$core$Basics_ops['++'],
									'\', was \'',
									A2(_elm_lang$core$Basics_ops['++'], _p33, '\'')))));
				}
			});
	});
var _ericgj$elm_csv_decode$Csv_Decode$andMap = F2(
	function (_p36, _p35) {
		var _p37 = _p36;
		var _p38 = _p35;
		return _ericgj$elm_csv_decode$Csv_Decode$Decoder(
			function (state) {
				return A2(
					_elm_lang$core$Result$andThen,
					_p37._0,
					_p38._0(state));
			});
	});
var _ericgj$elm_csv_decode$Csv_Decode$oneOf = function (decoders) {
	return _ericgj$elm_csv_decode$Csv_Decode$Decoder(
		function (state) {
			return A2(
				_elm_lang$core$Maybe$withDefault,
				_elm_lang$core$Result$Err('No decoders succeeded'),
				A2(
					_ericgj$elm_csv_decode$Csv_Decode$listFindOk,
					function (_p39) {
						var _p40 = _p39;
						return _p40._0(state);
					},
					decoders));
		});
};
var _ericgj$elm_csv_decode$Csv_Decode$map = F2(
	function (subValue, _p41) {
		var _p42 = _p41;
		return _ericgj$elm_csv_decode$Csv_Decode$Decoder(
			function (_p43) {
				var _p44 = _p43;
				return A2(
					_elm_lang$core$Result$map,
					_ericgj$elm_csv_decode$Csv_Decode$mapHelp(_p44.value),
					_p42._0(
						{visited: _p44.visited, unvisited: _p44.unvisited, value: subValue}));
			});
	});
var _ericgj$elm_csv_decode$Csv_Decode$DecodeErrors = function (a) {
	return {ctor: 'DecodeErrors', _0: a};
};
var _ericgj$elm_csv_decode$Csv_Decode$decodeCsv = F2(
	function (decoder, _p45) {
		var _p46 = _p45;
		return A2(
			_elm_lang$core$Result$mapError,
			_ericgj$elm_csv_decode$Csv_Decode$DecodeErrors,
			_ericgj$elm_csv_decode$Csv_Decode$sequenceResultsAccumErrs(
				A2(
					_elm_lang$core$List$map,
					A2(_ericgj$elm_csv_decode$Csv_Decode$decodeRecord, decoder, _p46.headers),
					_p46.records)));
	});
var _ericgj$elm_csv_decode$Csv_Decode$CsvErrors = function (a) {
	return {ctor: 'CsvErrors', _0: a};
};
var _ericgj$elm_csv_decode$Csv_Decode$decode = function (decoder) {
	return function (_p47) {
		return A2(
			_elm_lang$core$Result$andThen,
			_ericgj$elm_csv_decode$Csv_Decode$decodeCsv(decoder),
			A2(_elm_lang$core$Result$mapError, _ericgj$elm_csv_decode$Csv_Decode$CsvErrors, _p47));
	};
};

var _evancz$elm_sortable_table$Table$findSorter = F2(
	function (selectedColumn, columnData) {
		findSorter:
		while (true) {
			var _p0 = columnData;
			if (_p0.ctor === '[]') {
				return _elm_lang$core$Maybe$Nothing;
			} else {
				if (_elm_lang$core$Native_Utils.eq(_p0._0.name, selectedColumn)) {
					return _elm_lang$core$Maybe$Just(_p0._0.sorter);
				} else {
					var _v1 = selectedColumn,
						_v2 = _p0._1;
					selectedColumn = _v1;
					columnData = _v2;
					continue findSorter;
				}
			}
		}
	});
var _evancz$elm_sortable_table$Table$applySorter = F3(
	function (isReversed, sorter, data) {
		var _p1 = sorter;
		switch (_p1.ctor) {
			case 'None':
				return data;
			case 'Increasing':
				return _p1._0(data);
			case 'Decreasing':
				return _elm_lang$core$List$reverse(
					_p1._0(data));
			case 'IncOrDec':
				var _p2 = _p1._0;
				return isReversed ? _elm_lang$core$List$reverse(
					_p2(data)) : _p2(data);
			default:
				var _p3 = _p1._0;
				return isReversed ? _p3(data) : _elm_lang$core$List$reverse(
					_p3(data));
		}
	});
var _evancz$elm_sortable_table$Table$sort = F3(
	function (_p4, columnData, data) {
		var _p5 = _p4;
		var _p6 = A2(_evancz$elm_sortable_table$Table$findSorter, _p5._0, columnData);
		if (_p6.ctor === 'Nothing') {
			return data;
		} else {
			return A3(_evancz$elm_sortable_table$Table$applySorter, _p5._1, _p6._0, data);
		}
	});
var _evancz$elm_sortable_table$Table$viewCell = F2(
	function (data, _p7) {
		var _p8 = _p7;
		var details = _p8.viewData(data);
		return A2(_elm_lang$html$Html$td, details.attributes, details.children);
	});
var _evancz$elm_sortable_table$Table$viewRowHelp = F3(
	function (columns, toRowAttrs, data) {
		return A2(
			_elm_lang$html$Html$tr,
			toRowAttrs(data),
			A2(
				_elm_lang$core$List$map,
				_evancz$elm_sortable_table$Table$viewCell(data),
				columns));
	});
var _evancz$elm_sortable_table$Table$viewRow = F4(
	function (toId, columns, toRowAttrs, data) {
		return {
			ctor: '_Tuple2',
			_0: toId(data),
			_1: A4(_elm_lang$html$Html_Lazy$lazy3, _evancz$elm_sortable_table$Table$viewRowHelp, columns, toRowAttrs, data)
		};
	});
var _evancz$elm_sortable_table$Table$simpleRowAttrs = function (_p9) {
	return {ctor: '[]'};
};
var _evancz$elm_sortable_table$Table$lightGrey = function (symbol) {
	return A2(
		_elm_lang$html$Html$span,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$style(
				{
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: 'color', _1: '#ccc'},
					_1: {ctor: '[]'}
				}),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text(
				A2(_elm_lang$core$Basics_ops['++'], ' ', symbol)),
			_1: {ctor: '[]'}
		});
};
var _evancz$elm_sortable_table$Table$darkGrey = function (symbol) {
	return A2(
		_elm_lang$html$Html$span,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$style(
				{
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: 'color', _1: '#555'},
					_1: {ctor: '[]'}
				}),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text(
				A2(_elm_lang$core$Basics_ops['++'], ' ', symbol)),
			_1: {ctor: '[]'}
		});
};
var _evancz$elm_sortable_table$Table$simpleTheadHelp = function (_p10) {
	var _p11 = _p10;
	var _p13 = _p11._0;
	var content = function () {
		var _p12 = _p11._1;
		switch (_p12.ctor) {
			case 'Unsortable':
				return {
					ctor: '::',
					_0: _elm_lang$html$Html$text(_p13),
					_1: {ctor: '[]'}
				};
			case 'Sortable':
				return {
					ctor: '::',
					_0: _elm_lang$html$Html$text(_p13),
					_1: {
						ctor: '::',
						_0: _p12._0 ? _evancz$elm_sortable_table$Table$darkGrey('↓') : _evancz$elm_sortable_table$Table$lightGrey('↓'),
						_1: {ctor: '[]'}
					}
				};
			default:
				if (_p12._0.ctor === 'Nothing') {
					return {
						ctor: '::',
						_0: _elm_lang$html$Html$text(_p13),
						_1: {
							ctor: '::',
							_0: _evancz$elm_sortable_table$Table$lightGrey('↕'),
							_1: {ctor: '[]'}
						}
					};
				} else {
					return {
						ctor: '::',
						_0: _elm_lang$html$Html$text(_p13),
						_1: {
							ctor: '::',
							_0: _evancz$elm_sortable_table$Table$darkGrey(
								_p12._0._0 ? '↑' : '↓'),
							_1: {ctor: '[]'}
						}
					};
				}
		}
	}();
	return A2(
		_elm_lang$html$Html$th,
		{
			ctor: '::',
			_0: _p11._2,
			_1: {ctor: '[]'}
		},
		content);
};
var _evancz$elm_sortable_table$Table$Customizations = F6(
	function (a, b, c, d, e, f) {
		return {tableAttrs: a, caption: b, thead: c, tfoot: d, tbodyAttrs: e, rowAttrs: f};
	});
var _evancz$elm_sortable_table$Table$HtmlDetails = F2(
	function (a, b) {
		return {attributes: a, children: b};
	});
var _evancz$elm_sortable_table$Table$simpleThead = function (headers) {
	return A2(
		_evancz$elm_sortable_table$Table$HtmlDetails,
		{ctor: '[]'},
		A2(_elm_lang$core$List$map, _evancz$elm_sortable_table$Table$simpleTheadHelp, headers));
};
var _evancz$elm_sortable_table$Table$defaultCustomizations = {
	tableAttrs: {ctor: '[]'},
	caption: _elm_lang$core$Maybe$Nothing,
	thead: _evancz$elm_sortable_table$Table$simpleThead,
	tfoot: _elm_lang$core$Maybe$Nothing,
	tbodyAttrs: {ctor: '[]'},
	rowAttrs: _evancz$elm_sortable_table$Table$simpleRowAttrs
};
var _evancz$elm_sortable_table$Table$textDetails = function (str) {
	return A2(
		_evancz$elm_sortable_table$Table$HtmlDetails,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text(str),
			_1: {ctor: '[]'}
		});
};
var _evancz$elm_sortable_table$Table$ColumnData = F3(
	function (a, b, c) {
		return {name: a, viewData: b, sorter: c};
	});
var _evancz$elm_sortable_table$Table$State = F2(
	function (a, b) {
		return {ctor: 'State', _0: a, _1: b};
	});
var _evancz$elm_sortable_table$Table$initialSort = function (header) {
	return A2(_evancz$elm_sortable_table$Table$State, header, false);
};
var _evancz$elm_sortable_table$Table$onClick = F3(
	function (name, isReversed, toMsg) {
		return A2(
			_elm_lang$html$Html_Events$on,
			'click',
			A2(
				_elm_lang$core$Json_Decode$map,
				toMsg,
				A3(
					_elm_lang$core$Json_Decode$map2,
					_evancz$elm_sortable_table$Table$State,
					_elm_lang$core$Json_Decode$succeed(name),
					_elm_lang$core$Json_Decode$succeed(isReversed))));
	});
var _evancz$elm_sortable_table$Table$Config = function (a) {
	return {ctor: 'Config', _0: a};
};
var _evancz$elm_sortable_table$Table$config = function (_p14) {
	var _p15 = _p14;
	return _evancz$elm_sortable_table$Table$Config(
		{
			toId: _p15.toId,
			toMsg: _p15.toMsg,
			columns: A2(
				_elm_lang$core$List$map,
				function (_p16) {
					var _p17 = _p16;
					return _p17._0;
				},
				_p15.columns),
			customizations: _evancz$elm_sortable_table$Table$defaultCustomizations
		});
};
var _evancz$elm_sortable_table$Table$customConfig = function (_p18) {
	var _p19 = _p18;
	return _evancz$elm_sortable_table$Table$Config(
		{
			toId: _p19.toId,
			toMsg: _p19.toMsg,
			columns: A2(
				_elm_lang$core$List$map,
				function (_p20) {
					var _p21 = _p20;
					return _p21._0;
				},
				_p19.columns),
			customizations: _p19.customizations
		});
};
var _evancz$elm_sortable_table$Table$Reversible = function (a) {
	return {ctor: 'Reversible', _0: a};
};
var _evancz$elm_sortable_table$Table$Sortable = function (a) {
	return {ctor: 'Sortable', _0: a};
};
var _evancz$elm_sortable_table$Table$Unsortable = {ctor: 'Unsortable'};
var _evancz$elm_sortable_table$Table$toHeaderInfo = F3(
	function (_p23, toMsg, _p22) {
		var _p24 = _p23;
		var _p29 = _p24._0;
		var _p28 = _p24._1;
		var _p25 = _p22;
		var _p27 = _p25.name;
		var _p26 = _p25.sorter;
		switch (_p26.ctor) {
			case 'None':
				return {
					ctor: '_Tuple3',
					_0: _p27,
					_1: _evancz$elm_sortable_table$Table$Unsortable,
					_2: A3(_evancz$elm_sortable_table$Table$onClick, _p29, _p28, toMsg)
				};
			case 'Increasing':
				return {
					ctor: '_Tuple3',
					_0: _p27,
					_1: _evancz$elm_sortable_table$Table$Sortable(
						_elm_lang$core$Native_Utils.eq(_p27, _p29)),
					_2: A3(_evancz$elm_sortable_table$Table$onClick, _p27, false, toMsg)
				};
			case 'Decreasing':
				return {
					ctor: '_Tuple3',
					_0: _p27,
					_1: _evancz$elm_sortable_table$Table$Sortable(
						_elm_lang$core$Native_Utils.eq(_p27, _p29)),
					_2: A3(_evancz$elm_sortable_table$Table$onClick, _p27, false, toMsg)
				};
			case 'IncOrDec':
				return _elm_lang$core$Native_Utils.eq(_p27, _p29) ? {
					ctor: '_Tuple3',
					_0: _p27,
					_1: _evancz$elm_sortable_table$Table$Reversible(
						_elm_lang$core$Maybe$Just(_p28)),
					_2: A3(_evancz$elm_sortable_table$Table$onClick, _p27, !_p28, toMsg)
				} : {
					ctor: '_Tuple3',
					_0: _p27,
					_1: _evancz$elm_sortable_table$Table$Reversible(_elm_lang$core$Maybe$Nothing),
					_2: A3(_evancz$elm_sortable_table$Table$onClick, _p27, false, toMsg)
				};
			default:
				return _elm_lang$core$Native_Utils.eq(_p27, _p29) ? {
					ctor: '_Tuple3',
					_0: _p27,
					_1: _evancz$elm_sortable_table$Table$Reversible(
						_elm_lang$core$Maybe$Just(_p28)),
					_2: A3(_evancz$elm_sortable_table$Table$onClick, _p27, !_p28, toMsg)
				} : {
					ctor: '_Tuple3',
					_0: _p27,
					_1: _evancz$elm_sortable_table$Table$Reversible(_elm_lang$core$Maybe$Nothing),
					_2: A3(_evancz$elm_sortable_table$Table$onClick, _p27, false, toMsg)
				};
		}
	});
var _evancz$elm_sortable_table$Table$view = F3(
	function (_p30, state, data) {
		var _p31 = _p30;
		var _p35 = _p31._0.customizations;
		var _p34 = _p31._0.columns;
		var theadDetails = _p35.thead(
			A2(
				_elm_lang$core$List$map,
				A2(_evancz$elm_sortable_table$Table$toHeaderInfo, state, _p31._0.toMsg),
				_p34));
		var thead = A2(_elm_lang$html$Html$thead, theadDetails.attributes, theadDetails.children);
		var sortedData = A3(_evancz$elm_sortable_table$Table$sort, state, _p34, data);
		var tbody = A3(
			_elm_lang$html$Html_Keyed$node,
			'tbody',
			_p35.tbodyAttrs,
			A2(
				_elm_lang$core$List$map,
				A3(_evancz$elm_sortable_table$Table$viewRow, _p31._0.toId, _p34, _p35.rowAttrs),
				sortedData));
		var withFoot = function () {
			var _p32 = _p35.tfoot;
			if (_p32.ctor === 'Nothing') {
				return {
					ctor: '::',
					_0: tbody,
					_1: {ctor: '[]'}
				};
			} else {
				return {
					ctor: '::',
					_0: A2(_elm_lang$html$Html$tfoot, _p32._0.attributes, _p32._0.children),
					_1: {
						ctor: '::',
						_0: tbody,
						_1: {ctor: '[]'}
					}
				};
			}
		}();
		return A2(
			_elm_lang$html$Html$table,
			_p35.tableAttrs,
			function () {
				var _p33 = _p35.caption;
				if (_p33.ctor === 'Nothing') {
					return {ctor: '::', _0: thead, _1: withFoot};
				} else {
					return {
						ctor: '::',
						_0: A2(_elm_lang$html$Html$caption, _p33._0.attributes, _p33._0.children),
						_1: {ctor: '::', _0: thead, _1: withFoot}
					};
				}
			}());
	});
var _evancz$elm_sortable_table$Table$Column = function (a) {
	return {ctor: 'Column', _0: a};
};
var _evancz$elm_sortable_table$Table$customColumn = function (_p36) {
	var _p37 = _p36;
	return _evancz$elm_sortable_table$Table$Column(
		A3(
			_evancz$elm_sortable_table$Table$ColumnData,
			_p37.name,
			function (_p38) {
				return _evancz$elm_sortable_table$Table$textDetails(
					_p37.viewData(_p38));
			},
			_p37.sorter));
};
var _evancz$elm_sortable_table$Table$veryCustomColumn = _evancz$elm_sortable_table$Table$Column;
var _evancz$elm_sortable_table$Table$DecOrInc = function (a) {
	return {ctor: 'DecOrInc', _0: a};
};
var _evancz$elm_sortable_table$Table$decreasingOrIncreasingBy = function (toComparable) {
	return _evancz$elm_sortable_table$Table$DecOrInc(
		_elm_lang$core$List$sortBy(toComparable));
};
var _evancz$elm_sortable_table$Table$IncOrDec = function (a) {
	return {ctor: 'IncOrDec', _0: a};
};
var _evancz$elm_sortable_table$Table$increasingOrDecreasingBy = function (toComparable) {
	return _evancz$elm_sortable_table$Table$IncOrDec(
		_elm_lang$core$List$sortBy(toComparable));
};
var _evancz$elm_sortable_table$Table$stringColumn = F2(
	function (name, toStr) {
		return _evancz$elm_sortable_table$Table$Column(
			{
				name: name,
				viewData: function (_p39) {
					return _evancz$elm_sortable_table$Table$textDetails(
						toStr(_p39));
				},
				sorter: _evancz$elm_sortable_table$Table$increasingOrDecreasingBy(toStr)
			});
	});
var _evancz$elm_sortable_table$Table$intColumn = F2(
	function (name, toInt) {
		return _evancz$elm_sortable_table$Table$Column(
			{
				name: name,
				viewData: function (_p40) {
					return _evancz$elm_sortable_table$Table$textDetails(
						_elm_lang$core$Basics$toString(
							toInt(_p40)));
				},
				sorter: _evancz$elm_sortable_table$Table$increasingOrDecreasingBy(toInt)
			});
	});
var _evancz$elm_sortable_table$Table$floatColumn = F2(
	function (name, toFloat) {
		return _evancz$elm_sortable_table$Table$Column(
			{
				name: name,
				viewData: function (_p41) {
					return _evancz$elm_sortable_table$Table$textDetails(
						_elm_lang$core$Basics$toString(
							toFloat(_p41)));
				},
				sorter: _evancz$elm_sortable_table$Table$increasingOrDecreasingBy(toFloat)
			});
	});
var _evancz$elm_sortable_table$Table$Decreasing = function (a) {
	return {ctor: 'Decreasing', _0: a};
};
var _evancz$elm_sortable_table$Table$decreasingBy = function (toComparable) {
	return _evancz$elm_sortable_table$Table$Decreasing(
		_elm_lang$core$List$sortBy(toComparable));
};
var _evancz$elm_sortable_table$Table$Increasing = function (a) {
	return {ctor: 'Increasing', _0: a};
};
var _evancz$elm_sortable_table$Table$increasingBy = function (toComparable) {
	return _evancz$elm_sortable_table$Table$Increasing(
		_elm_lang$core$List$sortBy(toComparable));
};
var _evancz$elm_sortable_table$Table$None = {ctor: 'None'};
var _evancz$elm_sortable_table$Table$unsortable = _evancz$elm_sortable_table$Table$None;

var _myrho$elm_round$Round$funNum = F3(
	function (fun, s, fl) {
		return A2(
			_elm_lang$core$Maybe$withDefault,
			1 / 0,
			_elm_lang$core$Result$toMaybe(
				_elm_lang$core$String$toFloat(
					A2(fun, s, fl))));
	});
var _myrho$elm_round$Round$splitComma = function (str) {
	var _p0 = A2(_elm_lang$core$String$split, '.', str);
	if (_p0.ctor === '::') {
		if (_p0._1.ctor === '::') {
			return {ctor: '_Tuple2', _0: _p0._0, _1: _p0._1._0};
		} else {
			return {ctor: '_Tuple2', _0: _p0._0, _1: '0'};
		}
	} else {
		return {ctor: '_Tuple2', _0: '0', _1: '0'};
	}
};
var _myrho$elm_round$Round$toDecimal = function (fl) {
	var _p1 = A2(
		_elm_lang$core$String$split,
		'e',
		_elm_lang$core$Basics$toString(fl));
	if (_p1.ctor === '::') {
		if (_p1._1.ctor === '::') {
			var _p4 = _p1._1._0;
			var _p2 = function () {
				var hasSign = _elm_lang$core$Native_Utils.cmp(fl, 0) < 0;
				var _p3 = _myrho$elm_round$Round$splitComma(_p1._0);
				var b = _p3._0;
				var a = _p3._1;
				return {
					ctor: '_Tuple3',
					_0: hasSign ? '-' : '',
					_1: hasSign ? A2(_elm_lang$core$String$dropLeft, 1, b) : b,
					_2: a
				};
			}();
			var sign = _p2._0;
			var before = _p2._1;
			var after = _p2._2;
			var e = A2(
				_elm_lang$core$Maybe$withDefault,
				0,
				_elm_lang$core$Result$toMaybe(
					_elm_lang$core$String$toInt(
						A2(_elm_lang$core$String$startsWith, '+', _p4) ? A2(_elm_lang$core$String$dropLeft, 1, _p4) : _p4)));
			var newBefore = (_elm_lang$core$Native_Utils.cmp(e, 0) > -1) ? before : ((_elm_lang$core$Native_Utils.cmp(
				_elm_lang$core$Basics$abs(e),
				_elm_lang$core$String$length(before)) < 0) ? A2(
				_elm_lang$core$Basics_ops['++'],
				A2(
					_elm_lang$core$String$left,
					_elm_lang$core$String$length(before) - _elm_lang$core$Basics$abs(e),
					before),
				A2(
					_elm_lang$core$Basics_ops['++'],
					'.',
					A2(
						_elm_lang$core$String$right,
						_elm_lang$core$Basics$abs(e),
						before))) : A2(
				_elm_lang$core$Basics_ops['++'],
				'0.',
				A2(
					_elm_lang$core$Basics_ops['++'],
					A2(
						_elm_lang$core$String$repeat,
						_elm_lang$core$Basics$abs(e) - _elm_lang$core$String$length(before),
						'0'),
					before)));
			var newAfter = (_elm_lang$core$Native_Utils.cmp(e, 0) < 1) ? after : ((_elm_lang$core$Native_Utils.cmp(
				e,
				_elm_lang$core$String$length(after)) < 0) ? A2(
				_elm_lang$core$Basics_ops['++'],
				A2(_elm_lang$core$String$left, e, after),
				A2(
					_elm_lang$core$Basics_ops['++'],
					'.',
					A2(
						_elm_lang$core$String$right,
						_elm_lang$core$String$length(after) - e,
						after))) : A2(
				_elm_lang$core$Basics_ops['++'],
				after,
				A2(
					_elm_lang$core$String$repeat,
					e - _elm_lang$core$String$length(after),
					'0')));
			return A2(
				_elm_lang$core$Basics_ops['++'],
				sign,
				A2(_elm_lang$core$Basics_ops['++'], newBefore, newAfter));
		} else {
			return _p1._0;
		}
	} else {
		return '';
	}
};
var _myrho$elm_round$Round$truncate = function (n) {
	return (_elm_lang$core$Native_Utils.cmp(n, 0) < 0) ? _elm_lang$core$Basics$ceiling(n) : _elm_lang$core$Basics$floor(n);
};
var _myrho$elm_round$Round$roundFun = F3(
	function (functor, s, fl) {
		if (_elm_lang$core$Native_Utils.eq(s, 0)) {
			return _elm_lang$core$Basics$toString(
				functor(fl));
		} else {
			if (_elm_lang$core$Native_Utils.cmp(s, 0) < 0) {
				return function (r) {
					return (!_elm_lang$core$Native_Utils.eq(r, '0')) ? A2(
						_elm_lang$core$Basics_ops['++'],
						r,
						A2(
							_elm_lang$core$String$repeat,
							_elm_lang$core$Basics$abs(s),
							'0')) : r;
				}(
					A3(
						_myrho$elm_round$Round$roundFun,
						functor,
						0,
						A2(
							F2(
								function (x, y) {
									return x / y;
								}),
							fl,
							A2(
								F2(
									function (x, y) {
										return Math.pow(x, y);
									}),
								10,
								_elm_lang$core$Basics$abs(
									_elm_lang$core$Basics$toFloat(s))))));
			} else {
				var dd = (_elm_lang$core$Native_Utils.cmp(fl, 0) < 0) ? 2 : 1;
				var n = (_elm_lang$core$Native_Utils.cmp(fl, 0) < 0) ? -1 : 1;
				var e = Math.pow(10, s);
				var _p5 = _myrho$elm_round$Round$splitComma(
					_myrho$elm_round$Round$toDecimal(fl));
				var before = _p5._0;
				var after = _p5._1;
				var a = A3(
					_elm_lang$core$String$padRight,
					s + 1,
					_elm_lang$core$Native_Utils.chr('0'),
					after);
				var b = A2(_elm_lang$core$String$left, s, a);
				var c = A2(_elm_lang$core$String$dropLeft, s, a);
				var f = functor(
					A2(
						_elm_lang$core$Maybe$withDefault,
						_elm_lang$core$Basics$toFloat(e),
						_elm_lang$core$Result$toMaybe(
							_elm_lang$core$String$toFloat(
								A2(
									_elm_lang$core$Basics_ops['++'],
									(_elm_lang$core$Native_Utils.cmp(fl, 0) < 0) ? '-' : '',
									A2(
										_elm_lang$core$Basics_ops['++'],
										'1',
										A2(
											_elm_lang$core$Basics_ops['++'],
											b,
											A2(_elm_lang$core$Basics_ops['++'], '.', c))))))));
				var g = A2(
					_elm_lang$core$String$dropLeft,
					dd,
					_elm_lang$core$Basics$toString(f));
				var h = _myrho$elm_round$Round$truncate(fl) + (_elm_lang$core$Native_Utils.eq(f - (e * n), e * n) ? ((_elm_lang$core$Native_Utils.cmp(fl, 0) < 0) ? -1 : 1) : 0);
				var j = _elm_lang$core$Basics$toString(h);
				var i = (_elm_lang$core$Native_Utils.eq(j, '0') && ((!_elm_lang$core$Native_Utils.eq(f - (e * n), 0)) && ((_elm_lang$core$Native_Utils.cmp(fl, 0) < 0) && (_elm_lang$core$Native_Utils.cmp(fl, -1) > 0)))) ? A2(_elm_lang$core$Basics_ops['++'], '-', j) : j;
				return A2(
					_elm_lang$core$Basics_ops['++'],
					i,
					A2(_elm_lang$core$Basics_ops['++'], '.', g));
			}
		}
	});
var _myrho$elm_round$Round$round = _myrho$elm_round$Round$roundFun(_elm_lang$core$Basics$round);
var _myrho$elm_round$Round$roundNum = _myrho$elm_round$Round$funNum(_myrho$elm_round$Round$round);
var _myrho$elm_round$Round$ceiling = _myrho$elm_round$Round$roundFun(_elm_lang$core$Basics$ceiling);
var _myrho$elm_round$Round$ceilingNum = _myrho$elm_round$Round$funNum(_myrho$elm_round$Round$ceiling);
var _myrho$elm_round$Round$floor = _myrho$elm_round$Round$roundFun(_elm_lang$core$Basics$floor);
var _myrho$elm_round$Round$floorCom = F2(
	function (s, fl) {
		return (_elm_lang$core$Native_Utils.cmp(fl, 0) < 0) ? A2(_myrho$elm_round$Round$ceiling, s, fl) : A2(_myrho$elm_round$Round$floor, s, fl);
	});
var _myrho$elm_round$Round$floorNumCom = _myrho$elm_round$Round$funNum(_myrho$elm_round$Round$floorCom);
var _myrho$elm_round$Round$ceilingCom = F2(
	function (s, fl) {
		return (_elm_lang$core$Native_Utils.cmp(fl, 0) < 0) ? A2(_myrho$elm_round$Round$floor, s, fl) : A2(_myrho$elm_round$Round$ceiling, s, fl);
	});
var _myrho$elm_round$Round$ceilingNumCom = _myrho$elm_round$Round$funNum(_myrho$elm_round$Round$ceilingCom);
var _myrho$elm_round$Round$floorNum = _myrho$elm_round$Round$funNum(_myrho$elm_round$Round$floor);
var _myrho$elm_round$Round$roundCom = _myrho$elm_round$Round$roundFun(
	function (fl) {
		var dec = fl - _elm_lang$core$Basics$toFloat(
			_myrho$elm_round$Round$truncate(fl));
		return (_elm_lang$core$Native_Utils.cmp(dec, 0.5) > -1) ? _elm_lang$core$Basics$ceiling(fl) : ((_elm_lang$core$Native_Utils.cmp(dec, -0.5) < 1) ? _elm_lang$core$Basics$floor(fl) : _elm_lang$core$Basics$round(fl));
	});
var _myrho$elm_round$Round$roundNumCom = _myrho$elm_round$Round$funNum(_myrho$elm_round$Round$roundCom);

var _periodic$elm_csv$Csv$textData = _Bogdanp$elm_combine$Combine_Char$noneOf(
	{
		ctor: '::',
		_0: _elm_lang$core$Native_Utils.chr('\"'),
		_1: {
			ctor: '::',
			_0: _elm_lang$core$Native_Utils.chr(','),
			_1: {
				ctor: '::',
				_0: _elm_lang$core$Native_Utils.chr('\n'),
				_1: {
					ctor: '::',
					_0: _elm_lang$core$Native_Utils.chr('\r'),
					_1: {ctor: '[]'}
				}
			}
		}
	});
var _periodic$elm_csv$Csv$nonEscaped = A2(
	_Bogdanp$elm_combine$Combine$mapError,
	_elm_lang$core$Basics$always(
		{
			ctor: '::',
			_0: 'Expected non-escaped value.',
			_1: {ctor: '[]'}
		}),
	A2(
		_Bogdanp$elm_combine$Combine$map,
		_elm_lang$core$String$fromList,
		_Bogdanp$elm_combine$Combine$many(_periodic$elm_csv$Csv$textData)));
var _periodic$elm_csv$Csv$lf = _Bogdanp$elm_combine$Combine_Char$char(
	_elm_lang$core$Native_Utils.chr('\n'));
var _periodic$elm_csv$Csv$cr = _Bogdanp$elm_combine$Combine_Char$char(
	_elm_lang$core$Native_Utils.chr('\r'));
var _periodic$elm_csv$Csv$lineSep = A2(
	_Bogdanp$elm_combine$Combine_ops['<$'],
	{ctor: '_Tuple0'},
	A2(
		_Bogdanp$elm_combine$Combine_ops['<?>'],
		A2(
			_Bogdanp$elm_combine$Combine_ops['<|>'],
			A2(_Bogdanp$elm_combine$Combine_ops['*>'], _periodic$elm_csv$Csv$cr, _periodic$elm_csv$Csv$lf),
			A2(_Bogdanp$elm_combine$Combine_ops['<|>'], _periodic$elm_csv$Csv$cr, _periodic$elm_csv$Csv$lf)),
		'Expected new line.'));
var _periodic$elm_csv$Csv$doubleQuote = _Bogdanp$elm_combine$Combine_Char$char(
	_elm_lang$core$Native_Utils.chr('\"'));
var _periodic$elm_csv$Csv$doubleDoubleQuote = A2(_Bogdanp$elm_combine$Combine_ops['*>'], _periodic$elm_csv$Csv$doubleQuote, _periodic$elm_csv$Csv$doubleQuote);
var _periodic$elm_csv$Csv$comma = _Bogdanp$elm_combine$Combine_Char$char(
	_elm_lang$core$Native_Utils.chr(','));
var _periodic$elm_csv$Csv$escaped = function () {
	var innerChar = _Bogdanp$elm_combine$Combine$choice(
		{
			ctor: '::',
			_0: _periodic$elm_csv$Csv$textData,
			_1: {
				ctor: '::',
				_0: _periodic$elm_csv$Csv$comma,
				_1: {
					ctor: '::',
					_0: _periodic$elm_csv$Csv$cr,
					_1: {
						ctor: '::',
						_0: _periodic$elm_csv$Csv$lf,
						_1: {
							ctor: '::',
							_0: _periodic$elm_csv$Csv$doubleDoubleQuote,
							_1: {ctor: '[]'}
						}
					}
				}
			}
		});
	var innerString = A2(
		_Bogdanp$elm_combine$Combine$map,
		_elm_lang$core$String$fromList,
		_Bogdanp$elm_combine$Combine$many(innerChar));
	return A2(
		_Bogdanp$elm_combine$Combine$mapError,
		_elm_lang$core$Basics$always(
			{
				ctor: '::',
				_0: 'Expected escaped value.',
				_1: {ctor: '[]'}
			}),
		A2(
			_Bogdanp$elm_combine$Combine_ops['<*'],
			A2(_Bogdanp$elm_combine$Combine_ops['*>'], _periodic$elm_csv$Csv$doubleQuote, innerString),
			_periodic$elm_csv$Csv$doubleQuote));
}();
var _periodic$elm_csv$Csv$field = _Bogdanp$elm_combine$Combine$choice(
	{
		ctor: '::',
		_0: _periodic$elm_csv$Csv$escaped,
		_1: {
			ctor: '::',
			_0: _periodic$elm_csv$Csv$nonEscaped,
			_1: {ctor: '[]'}
		}
	});
var _periodic$elm_csv$Csv$name = _periodic$elm_csv$Csv$field;
var _periodic$elm_csv$Csv$header = A2(_Bogdanp$elm_combine$Combine$sepBy, _periodic$elm_csv$Csv$comma, _periodic$elm_csv$Csv$name);
var _periodic$elm_csv$Csv$record = A2(_Bogdanp$elm_combine$Combine$sepBy, _periodic$elm_csv$Csv$comma, _periodic$elm_csv$Csv$field);
var _periodic$elm_csv$Csv$addTrailingLineSep = function (str) {
	return (!(A2(_elm_lang$core$String$endsWith, '\n', str) || A2(_elm_lang$core$String$endsWith, '\r', str))) ? A2(_elm_lang$core$Basics_ops['++'], str, '\r\n') : str;
};
var _periodic$elm_csv$Csv$thrd = function (_p0) {
	var _p1 = _p0;
	return _p1._2;
};
var _periodic$elm_csv$Csv$Csv = F2(
	function (a, b) {
		return {headers: a, records: b};
	});
var _periodic$elm_csv$Csv$file = A2(
	_Bogdanp$elm_combine$Combine_ops['<*'],
	A2(
		_Bogdanp$elm_combine$Combine_ops['<*>'],
		A2(
			_Bogdanp$elm_combine$Combine_ops['<*'],
			A2(_Bogdanp$elm_combine$Combine_ops['<$>'], _periodic$elm_csv$Csv$Csv, _periodic$elm_csv$Csv$header),
			A2(_Bogdanp$elm_combine$Combine_ops['<?>'], _periodic$elm_csv$Csv$lineSep, 'Unterminated header')),
		_Bogdanp$elm_combine$Combine$many(
			A2(
				_Bogdanp$elm_combine$Combine_ops['<*'],
				_periodic$elm_csv$Csv$record,
				A2(_Bogdanp$elm_combine$Combine_ops['<?>'], _periodic$elm_csv$Csv$lineSep, 'Unterminated record')))),
	_Bogdanp$elm_combine$Combine$end);
var _periodic$elm_csv$Csv$parse = function (_p2) {
	return A2(
		_elm_lang$core$Result$map,
		_periodic$elm_csv$Csv$thrd,
		A2(
			_elm_lang$core$Result$mapError,
			_periodic$elm_csv$Csv$thrd,
			A2(
				_Bogdanp$elm_combine$Combine$parse,
				_periodic$elm_csv$Csv$file,
				_periodic$elm_csv$Csv$addTrailingLineSep(_p2))));
};

var _user$project$Array_Util$sortByIndexes = F2(
	function (indexes, array) {
		var accum_ = F3(
			function (orig, old, _p0) {
				var _p1 = _p0;
				var _p3 = _p1._0;
				var _p2 = _p1._1;
				return {
					ctor: '_Tuple2',
					_0: _p3 + 1,
					_1: A2(
						_elm_lang$core$Maybe$withDefault,
						_p2,
						A2(
							_elm_lang$core$Maybe$map,
							function (a) {
								return A3(_elm_lang$core$Array$set, _p3, a, _p2);
							},
							A2(_elm_lang$core$Array$get, old, orig)))
				};
			});
		return _elm_lang$core$Native_Utils.eq(
			_elm_lang$core$Array$length(array),
			_elm_lang$core$List$length(indexes)) ? _elm_lang$core$Tuple$second(
			A3(
				_elm_lang$core$List$foldl,
				accum_(array),
				{ctor: '_Tuple2', _0: 0, _1: array},
				indexes)) : array;
	});
var _user$project$Array_Util$sortedIndexes = F2(
	function (accessor, array) {
		return A2(
			_elm_lang$core$List$map,
			_elm_lang$core$Tuple$first,
			A2(
				_elm_lang$core$List$sortBy,
				function (_p4) {
					return accessor(
						_elm_lang$core$Tuple$second(_p4));
				},
				_elm_lang$core$Array$toList(
					A2(
						_elm_lang$core$Array$indexedMap,
						F2(
							function (v0, v1) {
								return {ctor: '_Tuple2', _0: v0, _1: v1};
							}),
						array))));
	});
var _user$project$Array_Util$toSet = function (a) {
	return A3(_elm_lang$core$Array$foldl, _elm_lang$core$Set$insert, _elm_lang$core$Set$empty, a);
};
var _user$project$Array_Util$fromSet = function (s) {
	return A3(_elm_lang$core$Set$foldl, _elm_lang$core$Array$push, _elm_lang$core$Array$empty, s);
};
var _user$project$Array_Util$update = F3(
	function (index, func, array) {
		return A2(
			_elm_lang$core$Maybe$withDefault,
			array,
			A2(
				_elm_lang$core$Maybe$map,
				function (a) {
					return A3(
						_elm_lang$core$Array$set,
						index,
						func(a),
						array);
				},
				A2(_elm_lang$core$Array$get, index, array)));
	});
var _user$project$Array_Util$indexDict = function (array) {
	return _elm_lang$core$Tuple$second(
		A3(
			_elm_lang$core$Array$foldl,
			F2(
				function (a, _p5) {
					var _p6 = _p5;
					var _p7 = _p6._0;
					return {
						ctor: '_Tuple2',
						_0: _p7 + 1,
						_1: A3(_elm_lang$core$Dict$insert, a, _p7, _p6._1)
					};
				}),
			{ctor: '_Tuple2', _0: 0, _1: _elm_lang$core$Dict$empty},
			array));
};
var _user$project$Array_Util$find = F2(
	function (a, array) {
		return A2(
			_elm_lang$core$Dict$get,
			a,
			_user$project$Array_Util$indexDict(array));
	});

var _user$project$Crosstab_Internal$Levels = F2(
	function (a, b) {
		return {rows: a, cols: b};
	});
var _user$project$Crosstab_Internal$Summary = F3(
	function (a, b, c) {
		return {table: a, rows: b, cols: c};
	});
var _user$project$Crosstab_Internal$Table = function (a) {
	return {ctor: 'Table', _0: a};
};
var _user$project$Crosstab_Internal$Column = function (a) {
	return {ctor: 'Column', _0: a};
};
var _user$project$Crosstab_Internal$Calc = function (a) {
	return {ctor: 'Calc', _0: a};
};
var _user$project$Crosstab_Internal$customCalc = function (_p0) {
	var _p1 = _p0;
	return _user$project$Crosstab_Internal$Calc(
		{map: _p1.map, accum: _p1.accum, init: _p1.init});
};
var _user$project$Crosstab_Internal$mapCalcOf = F2(
	function (getter, _p2) {
		var _p3 = _p2;
		var _p5 = _p3._0;
		return _user$project$Crosstab_Internal$Calc(
			_elm_lang$core$Native_Utils.update(
				_p5,
				{
					accum: function (_p4) {
						return _p5.accum(
							getter(_p4));
					}
				}));
	});
var _user$project$Crosstab_Internal$mapCalcOf2 = F3(
	function (func, _p7, _p6) {
		var _p8 = _p7;
		var _p15 = _p8._0;
		var _p9 = _p6;
		var _p14 = _p9._0;
		return _user$project$Crosstab_Internal$Calc(
			{
				map: function (_p10) {
					var _p11 = _p10;
					return A2(
						func,
						_p15.map(_p11._0),
						_p14.map(_p11._1));
				},
				accum: F2(
					function (a, _p12) {
						var _p13 = _p12;
						return {
							ctor: '_Tuple2',
							_0: A2(_p15.accum, a, _p13._0),
							_1: A2(_p14.accum, a, _p13._1)
						};
					}),
				init: {ctor: '_Tuple2', _0: _p15.init, _1: _p14.init}
			});
	});
var _user$project$Crosstab_Internal$mapCalc2 = F3(
	function (func, _p17, _p16) {
		var _p18 = _p17;
		var _p27 = _p18._0;
		var _p19 = _p16;
		var _p26 = _p19._0;
		return _user$project$Crosstab_Internal$Calc(
			{
				map: function (_p20) {
					var _p21 = _p20;
					return A2(
						func,
						_p27.map(_p21._0),
						_p26.map(_p21._1));
				},
				accum: F2(
					function (_p23, _p22) {
						var _p24 = _p23;
						var _p25 = _p22;
						return {
							ctor: '_Tuple2',
							_0: A2(_p27.accum, _p24._0, _p25._0),
							_1: A2(_p26.accum, _p24._1, _p25._1)
						};
					}),
				init: {ctor: '_Tuple2', _0: _p27.init, _1: _p26.init}
			});
	});

var _user$project$Crosstab_Calc$maybeAdd = F3(
	function (accum, $new, old) {
		var _p0 = {ctor: '_Tuple2', _0: $new, _1: old};
		if (_p0._0.ctor === 'Nothing') {
			if (_p0._1.ctor === 'Nothing') {
				return _elm_lang$core$Maybe$Nothing;
			} else {
				return old;
			}
		} else {
			if (_p0._1.ctor === 'Nothing') {
				return $new;
			} else {
				return _elm_lang$core$Maybe$Just(
					A2(accum, _p0._0._0, _p0._1._0));
			}
		}
	});
var _user$project$Crosstab_Calc$map2 = _user$project$Crosstab_Internal$mapCalc2;
var _user$project$Crosstab_Calc$mapOf2 = _user$project$Crosstab_Internal$mapCalcOf2;
var _user$project$Crosstab_Calc$mapOf = _user$project$Crosstab_Internal$mapCalcOf;
var _user$project$Crosstab_Calc$custom = _user$project$Crosstab_Internal$customCalc;
var _user$project$Crosstab_Calc$maybe = F2(
	function (accum, map) {
		return _user$project$Crosstab_Calc$custom(
			{
				map: map,
				accum: _user$project$Crosstab_Calc$maybeAdd(accum),
				init: _elm_lang$core$Maybe$Nothing
			});
	});
var _user$project$Crosstab_Calc$maybeOf = F3(
	function (getter, accum, map) {
		return A2(
			_user$project$Crosstab_Calc$mapOf,
			getter,
			A2(_user$project$Crosstab_Calc$maybe, accum, map));
	});
var _user$project$Crosstab_Calc$first = A2(
	_user$project$Crosstab_Calc$maybe,
	F2(
		function (a2, a1) {
			return a1;
		}),
	_elm_lang$core$Basics$identity);
var _user$project$Crosstab_Calc$firstOf = function (getter) {
	return A2(_user$project$Crosstab_Calc$mapOf, getter, _user$project$Crosstab_Calc$first);
};
var _user$project$Crosstab_Calc$last = A2(
	_user$project$Crosstab_Calc$maybe,
	F2(
		function (a2, a1) {
			return a2;
		}),
	_elm_lang$core$Basics$identity);
var _user$project$Crosstab_Calc$lastOf = function (getter) {
	return A2(_user$project$Crosstab_Calc$mapOf, getter, _user$project$Crosstab_Calc$last);
};
var _user$project$Crosstab_Calc$list = function (map) {
	return _user$project$Crosstab_Calc$custom(
		{
			map: map,
			accum: F2(
				function (x, y) {
					return A2(_elm_lang$core$Basics_ops['++'], x, y);
				}),
			init: {ctor: '[]'}
		});
};
var _user$project$Crosstab_Calc$listOf = F2(
	function (getter, map) {
		return _user$project$Crosstab_Calc$custom(
			{
				map: map,
				accum: function (_p1) {
					return F2(
						function (x, y) {
							return {ctor: '::', _0: x, _1: y};
						})(
						getter(_p1));
				},
				init: {ctor: '[]'}
			});
	});
var _user$project$Crosstab_Calc$unique = function (map) {
	return _user$project$Crosstab_Calc$custom(
		{map: map, accum: _elm_lang$core$Set$union, init: _elm_lang$core$Set$empty});
};
var _user$project$Crosstab_Calc$uniqueOf = F2(
	function (getter, map) {
		return _user$project$Crosstab_Calc$custom(
			{
				map: map,
				accum: function (_p2) {
					return _elm_lang$core$Set$insert(
						getter(_p2));
				},
				init: _elm_lang$core$Set$empty
			});
	});
var _user$project$Crosstab_Calc$float = function (accum) {
	return _user$project$Crosstab_Calc$custom(
		{map: _elm_lang$core$Basics$identity, accum: accum, init: 0.0});
};
var _user$project$Crosstab_Calc$floatOf = F2(
	function (getter, accum) {
		return A2(
			_user$project$Crosstab_Calc$mapOf,
			getter,
			_user$project$Crosstab_Calc$float(accum));
	});
var _user$project$Crosstab_Calc$number = function (accum) {
	return _user$project$Crosstab_Calc$custom(
		{map: _elm_lang$core$Basics$identity, accum: accum, init: 0});
};
var _user$project$Crosstab_Calc$numberOf = F2(
	function (getter, accum) {
		return A2(
			_user$project$Crosstab_Calc$mapOf,
			getter,
			_user$project$Crosstab_Calc$number(accum));
	});
var _user$project$Crosstab_Calc$sumOf = function (getter) {
	return A2(
		_user$project$Crosstab_Calc$numberOf,
		getter,
		F2(
			function (x, y) {
				return x + y;
			}));
};
var _user$project$Crosstab_Calc$sum = _user$project$Crosstab_Calc$number(
	F2(
		function (x, y) {
			return x + y;
		}));
var _user$project$Crosstab_Calc$count = _user$project$Crosstab_Calc$custom(
	{
		accum: F2(
			function (_p3, b) {
				return b + 1;
			}),
		init: 0,
		map: _elm_lang$core$Basics$identity
	});
var _user$project$Crosstab_Calc$meanAccum = _user$project$Crosstab_Calc$custom(
	{
		accum: F2(
			function (_p5, _p4) {
				var _p6 = _p5;
				var _p7 = _p4;
				return {ctor: '_Tuple2', _0: _p6._0 + _p7._0, _1: _p6._1 + _p7._1};
			}),
		init: {ctor: '_Tuple2', _0: 0.0, _1: 0},
		map: function (_p8) {
			var _p9 = _p8;
			return _p9._0 / _elm_lang$core$Basics$toFloat(_p9._1);
		}
	});
var _user$project$Crosstab_Calc$mean = _user$project$Crosstab_Calc$custom(
	{
		accum: F2(
			function (v, _p10) {
				var _p11 = _p10;
				return {ctor: '_Tuple2', _0: _p11._0 + v, _1: _p11._1 + 1};
			}),
		init: {ctor: '_Tuple2', _0: 0.0, _1: 0},
		map: function (_p12) {
			var _p13 = _p12;
			return _p13._0 / _elm_lang$core$Basics$toFloat(_p13._1);
		}
	});
var _user$project$Crosstab_Calc$meanOf = function (getter) {
	return A2(_user$project$Crosstab_Calc$mapOf, getter, _user$project$Crosstab_Calc$mean);
};
var _user$project$Crosstab_Calc$firstNumber = _user$project$Crosstab_Calc$custom(
	{
		accum: F2(
			function (n2, n1) {
				return n1;
			}),
		init: 0,
		map: _elm_lang$core$Basics$identity
	});
var _user$project$Crosstab_Calc$firstNumberOf = function (getter) {
	return A2(_user$project$Crosstab_Calc$mapOf, getter, _user$project$Crosstab_Calc$firstNumber);
};
var _user$project$Crosstab_Calc$lastNumber = _user$project$Crosstab_Calc$custom(
	{
		accum: F2(
			function (n2, n1) {
				return n2;
			}),
		init: 0,
		map: _elm_lang$core$Basics$identity
	});
var _user$project$Crosstab_Calc$lastNumberOf = function (getter) {
	return A2(_user$project$Crosstab_Calc$mapOf, getter, _user$project$Crosstab_Calc$lastNumber);
};

var _user$project$Crosstab_Column$compareValuesAccum = F4(
	function (func, init, sum, values) {
		var compare_ = F5(
			function (f, a, c, pr, cum) {
				return A2(
					f,
					{column: c, prev: pr, cum: cum},
					a);
			});
		var accum = F2(
			function (a, _p0) {
				var _p1 = _p0;
				var _p3 = _p1._1;
				var _p2 = _p1._0;
				var cum = A2(
					_elm_lang$core$Maybe$withDefault,
					init,
					A2(_elm_lang$core$Array$get, _p2 - 1, _p3));
				var prev = A2(_elm_lang$core$Array$get, _p2 - 1, values);
				return {
					ctor: '_Tuple2',
					_0: _p2 + 1,
					_1: A3(
						_elm_lang$core$Array$set,
						_p2,
						A5(compare_, func, a, sum, prev, cum),
						_p3)
				};
			});
		return _elm_lang$core$Tuple$second(
			A3(
				_elm_lang$core$Array$foldl,
				accum,
				{
					ctor: '_Tuple2',
					_0: 0,
					_1: A2(
						_elm_lang$core$Array$repeat,
						_elm_lang$core$Array$length(values),
						init)
				},
				values));
	});
var _user$project$Crosstab_Column$compareValues = F3(
	function (func, sum, values) {
		var compare_ = F4(
			function (f, a, c, pr) {
				return A2(
					f,
					{column: c, prev: pr},
					a);
			});
		var map_ = F2(
			function (i, a) {
				var prev = A2(_elm_lang$core$Array$get, i - 1, values);
				return A4(compare_, func, a, sum, prev);
			});
		return A2(_elm_lang$core$Array$indexedMap, map_, values);
	});
var _user$project$Crosstab_Column$calcSummary = F2(
	function (_p4, values) {
		var _p5 = _p4;
		var _p6 = _p5._0;
		return _p6.map(
			A3(_elm_lang$core$Array$foldr, _p6.accum, _p6.init, values));
	});
var _user$project$Crosstab_Column$compareAccum = F3(
	function (comp, init, _p7) {
		var _p8 = _p7;
		var _p9 = _p8._0.summary;
		return _user$project$Crosstab_Internal$Column(
			{
				levels: _p8._0.levels,
				values: A4(_user$project$Crosstab_Column$compareValuesAccum, comp, init, _p9, _p8._0.values),
				summary: _p9
			});
	});
var _user$project$Crosstab_Column$compare = F2(
	function (comp, _p10) {
		var _p11 = _p10;
		var _p12 = _p11._0.summary;
		return _user$project$Crosstab_Internal$Column(
			{
				levels: _p11._0.levels,
				values: A3(_user$project$Crosstab_Column$compareValues, comp, _p12, _p11._0.values),
				summary: _p12
			});
	});
var _user$project$Crosstab_Column$summarize = F2(
	function (summary, _p13) {
		var _p14 = _p13;
		var _p15 = _p14._0.values;
		return _user$project$Crosstab_Internal$Column(
			{
				levels: _p14._0.levels,
				values: _p15,
				summary: A2(_user$project$Crosstab_Column$calcSummary, summary, _p15)
			});
	});
var _user$project$Crosstab_Column$summary = function (_p16) {
	var _p17 = _p16;
	return _p17._0.summary;
};
var _user$project$Crosstab_Column$valueList = function (_p18) {
	var _p19 = _p18;
	return _elm_lang$core$Array$toList(_p19._0.values);
};
var _user$project$Crosstab_Column$levelList = function (_p20) {
	var _p21 = _p20;
	return _elm_lang$core$Array$toList(_p21._0.levels);
};
var _user$project$Crosstab_Column$levelsOf = F2(
	function (map_, records) {
		var accum = F2(
			function (record, lvls) {
				return A2(
					_elm_lang$core$Set$insert,
					map_(record),
					lvls);
			});
		return _user$project$Array_Util$fromSet(
			A3(_elm_lang$core$List$foldr, accum, _elm_lang$core$Set$empty, records));
	});
var _user$project$Crosstab_Column$columnWithLevels = F5(
	function (cols, summary, _p22, toCol, records) {
		var _p23 = _p22;
		var _p24 = _p23._0;
		var finalize = function (values) {
			return _user$project$Crosstab_Internal$Column(
				{
					levels: cols,
					values: A2(_elm_lang$core$Array$map, _p24.map, values),
					summary: A2(_user$project$Crosstab_Column$calcSummary, summary, values)
				});
		};
		var initData = A2(
			_elm_lang$core$Array$repeat,
			_elm_lang$core$Array$length(cols),
			_p24.init);
		var accumHelp = F3(
			function (i, a, values) {
				return A3(
					_user$project$Array_Util$update,
					i,
					_p24.accum(a),
					values);
			});
		var colMap = _user$project$Array_Util$indexDict(cols);
		var mcol = function (record) {
			return A3(
				_elm_lang$core$Basics$flip,
				_elm_lang$core$Dict$get,
				colMap,
				toCol(record));
		};
		var accum = F2(
			function (a, values) {
				return A2(
					_elm_lang$core$Maybe$withDefault,
					values,
					A2(
						_elm_lang$core$Maybe$map,
						function (i) {
							return A3(accumHelp, i, a, values);
						},
						mcol(a)));
			});
		return finalize(
			A3(_elm_lang$core$List$foldr, accum, initData, records));
	});
var _user$project$Crosstab_Column$column = F4(
	function (summary, value, map_, records) {
		return A5(
			_user$project$Crosstab_Column$columnWithLevels,
			A2(_user$project$Crosstab_Column$levelsOf, map_, records),
			summary,
			value,
			map_,
			records);
	});
var _user$project$Crosstab_Column$Compare = F2(
	function (a, b) {
		return {column: a, prev: b};
	});
var _user$project$Crosstab_Column$CompareAccum = F3(
	function (a, b, c) {
		return {column: a, prev: b, cum: c};
	});

var _user$project$Crosstab_Sort$Desc = {ctor: 'Desc'};
var _user$project$Crosstab_Sort$Asc = {ctor: 'Asc'};

var _user$project$Matrix_Util$indexMapArray = function (array) {
	return _elm_lang$core$Tuple$second(
		A3(
			_elm_lang$core$Array$foldl,
			F2(
				function (a, _p0) {
					var _p1 = _p0;
					var _p2 = _p1._0;
					return {
						ctor: '_Tuple2',
						_0: _p2 + 1,
						_1: A3(_elm_lang$core$Dict$insert, a, _p2, _p1._1)
					};
				}),
			{ctor: '_Tuple2', _0: 0, _1: _elm_lang$core$Dict$empty},
			array));
};
var _user$project$Matrix_Util$filterMapArray = F2(
	function (f, xs) {
		var maybePush = F3(
			function (f, mx, xs) {
				var _p3 = f(mx);
				if (_p3.ctor === 'Just') {
					return A2(_elm_lang$core$Array$push, _p3._0, xs);
				} else {
					return xs;
				}
			});
		return A3(
			_elm_lang$core$Array$foldl,
			maybePush(f),
			_elm_lang$core$Array$empty,
			xs);
	});
var _user$project$Matrix_Util$updateArray = F3(
	function (index, func, array) {
		return A2(
			_elm_lang$core$Maybe$withDefault,
			array,
			A2(
				_elm_lang$core$Maybe$map,
				function (a) {
					return A3(
						_elm_lang$core$Array$set,
						index,
						func(a),
						array);
				},
				A2(_elm_lang$core$Array$get, index, array)));
	});
var _user$project$Matrix_Util$foldl = F3(
	function (accum, init, matrix) {
		var accum_ = F2(
			function (a, _p4) {
				var _p5 = _p4;
				var _p6 = _p5._0;
				var y = (_p6 / _eeue56$elm_flat_matrix$Matrix$width(matrix)) | 0;
				var x = A2(
					_elm_lang$core$Basics_ops['%'],
					_p6,
					_eeue56$elm_flat_matrix$Matrix$width(matrix));
				return {
					ctor: '_Tuple2',
					_0: _p6 + 1,
					_1: A4(accum, x, y, a, _p5._1)
				};
			});
		return _elm_lang$core$Tuple$second(
			A3(
				_elm_lang$core$Array$foldl,
				accum_,
				{ctor: '_Tuple2', _0: 0, _1: init},
				matrix.data));
	});
var _user$project$Matrix_Util$filterMatrixByIndexes = F3(
	function (xs, ys, matrix) {
		var finalize = function (m) {
			return _elm_lang$core$Native_Utils.update(
				m,
				{
					data: A2(_user$project$Matrix_Util$filterMapArray, _elm_lang$core$Basics$identity, m.data)
				});
		};
		var levelIndexMap = F2(
			function (levels, max) {
				return A2(
					_elm_lang$core$Dict$filter,
					F2(
						function (_p7, i) {
							return (_elm_lang$core$Native_Utils.cmp(i, -1) > 0) && (_elm_lang$core$Native_Utils.cmp(i, max) < 0);
						}),
					_user$project$Matrix_Util$indexMapArray(levels));
			});
		var xsMap = A2(
			levelIndexMap,
			xs,
			_eeue56$elm_flat_matrix$Matrix$width(matrix));
		var ysMap = A2(
			levelIndexMap,
			ys,
			_eeue56$elm_flat_matrix$Matrix$height(matrix));
		var accum = F4(
			function (x, y, v, m) {
				return A2(
					_elm_lang$core$Maybe$withDefault,
					m,
					A3(
						_elm_lang$core$Maybe$map2,
						F2(
							function (newX, newY) {
								return A4(
									_eeue56$elm_flat_matrix$Matrix$set,
									newX,
									newY,
									_elm_lang$core$Maybe$Just(v),
									m);
							}),
						A2(_elm_lang$core$Dict$get, x, xsMap),
						A2(_elm_lang$core$Dict$get, y, ysMap)));
			});
		return finalize(
			A3(
				_user$project$Matrix_Util$foldl,
				accum,
				A3(
					_eeue56$elm_flat_matrix$Matrix$repeat,
					_elm_lang$core$Dict$size(xsMap),
					_elm_lang$core$Dict$size(ysMap),
					_elm_lang$core$Maybe$Nothing),
				matrix));
	});
var _user$project$Matrix_Util$toListRows = function (matrix) {
	var accum = F4(
		function (c, r, a, ar) {
			return A3(
				_user$project$Matrix_Util$updateArray,
				r,
				F2(
					function (x, y) {
						return {ctor: '::', _0: x, _1: y};
					})(a),
				ar);
		});
	return _elm_lang$core$Array$toList(
		A2(
			_elm_lang$core$Array$map,
			_elm_lang$core$List$reverse,
			A3(
				_user$project$Matrix_Util$foldl,
				accum,
				A2(
					_elm_lang$core$Array$repeat,
					_eeue56$elm_flat_matrix$Matrix$height(matrix),
					{ctor: '[]'}),
				matrix)));
};
var _user$project$Matrix_Util$toListColumns = function (matrix) {
	var accum = F4(
		function (c, r, a, ar) {
			return A3(
				_user$project$Matrix_Util$updateArray,
				c,
				F2(
					function (x, y) {
						return {ctor: '::', _0: x, _1: y};
					})(a),
				ar);
		});
	return _elm_lang$core$Array$toList(
		A2(
			_elm_lang$core$Array$map,
			_elm_lang$core$List$reverse,
			A3(
				_user$project$Matrix_Util$foldl,
				accum,
				A2(
					_elm_lang$core$Array$repeat,
					_eeue56$elm_flat_matrix$Matrix$width(matrix),
					{ctor: '[]'}),
				matrix)));
};
var _user$project$Matrix_Util$sortColumnsByIndexes = F2(
	function (indexes, matrix) {
		var accum_ = F4(
			function (nrows, origMatrix, col, _p8) {
				var _p9 = _p8;
				var _p10 = _p9._0;
				return {
					ctor: '_Tuple2',
					_0: _p10 + 1,
					_1: A3(
						_elm_lang$core$List$foldr,
						F2(
							function (row, m_) {
								return A2(
									_elm_lang$core$Maybe$withDefault,
									m_,
									A2(
										_elm_lang$core$Maybe$map,
										function (a) {
											return A4(_eeue56$elm_flat_matrix$Matrix$set, _p10, row, a, m_);
										},
										A3(_eeue56$elm_flat_matrix$Matrix$get, col, row, origMatrix)));
							}),
						_p9._1,
						A2(_elm_lang$core$List$range, 0, nrows))
				};
			});
		var _p11 = matrix.size;
		var ncols = _p11._0;
		var nrows = _p11._1;
		return _elm_lang$core$Native_Utils.eq(
			_elm_lang$core$List$length(indexes),
			ncols) ? _elm_lang$core$Tuple$second(
			A3(
				_elm_lang$core$List$foldl,
				A2(accum_, nrows, matrix),
				{ctor: '_Tuple2', _0: 0, _1: matrix},
				indexes)) : matrix;
	});
var _user$project$Matrix_Util$sortRowsByIndexes = F2(
	function (indexes, matrix) {
		var accum_ = F4(
			function (ncols, origMatrix, row, _p12) {
				var _p13 = _p12;
				var _p14 = _p13._0;
				return {
					ctor: '_Tuple2',
					_0: _p14 + 1,
					_1: A3(
						_elm_lang$core$List$foldr,
						F2(
							function (col, m_) {
								return A2(
									_elm_lang$core$Maybe$withDefault,
									m_,
									A2(
										_elm_lang$core$Maybe$map,
										function (a) {
											return A4(_eeue56$elm_flat_matrix$Matrix$set, col, _p14, a, m_);
										},
										A3(_eeue56$elm_flat_matrix$Matrix$get, col, row, origMatrix)));
							}),
						_p13._1,
						A2(_elm_lang$core$List$range, 0, ncols))
				};
			});
		var _p15 = matrix.size;
		var ncols = _p15._0;
		var nrows = _p15._1;
		return _elm_lang$core$Native_Utils.eq(
			_elm_lang$core$List$length(indexes),
			nrows) ? _elm_lang$core$Tuple$second(
			A3(
				_elm_lang$core$List$foldl,
				A2(accum_, ncols, matrix),
				{ctor: '_Tuple2', _0: 0, _1: matrix},
				indexes)) : matrix;
	});
var _user$project$Matrix_Util$sortedColumnIndexes = F3(
	function (index, accessor, matrix) {
		return A2(
			_elm_lang$core$List$map,
			_elm_lang$core$Tuple$first,
			A2(
				_elm_lang$core$List$sortBy,
				function (_p16) {
					return accessor(
						_elm_lang$core$Tuple$second(_p16));
				},
				function (_p17) {
					return _elm_lang$core$Array$toList(
						A2(
							_elm_lang$core$Array$indexedMap,
							F2(
								function (v0, v1) {
									return {ctor: '_Tuple2', _0: v0, _1: v1};
								}),
							_p17));
				}(
					A2(
						_elm_lang$core$Maybe$withDefault,
						_elm_lang$core$Array$empty,
						A2(_eeue56$elm_flat_matrix$Matrix$getRow, index, matrix)))));
	});
var _user$project$Matrix_Util$sortedRowIndexes = F3(
	function (index, accessor, matrix) {
		return A2(
			_elm_lang$core$List$map,
			_elm_lang$core$Tuple$first,
			A2(
				_elm_lang$core$List$sortBy,
				function (_p18) {
					return accessor(
						_elm_lang$core$Tuple$second(_p18));
				},
				function (_p19) {
					return _elm_lang$core$Array$toList(
						A2(
							_elm_lang$core$Array$indexedMap,
							F2(
								function (v0, v1) {
									return {ctor: '_Tuple2', _0: v0, _1: v1};
								}),
							_p19));
				}(
					A2(
						_elm_lang$core$Maybe$withDefault,
						_elm_lang$core$Array$empty,
						A2(_eeue56$elm_flat_matrix$Matrix$getColumn, index, matrix)))));
	});
var _user$project$Matrix_Util$sortColumnsByRow = F3(
	function (index, accessor, matrix) {
		return function (idxs) {
			return A2(_user$project$Matrix_Util$sortColumnsByIndexes, idxs, matrix);
		}(
			A3(_user$project$Matrix_Util$sortedColumnIndexes, index, accessor, matrix));
	});
var _user$project$Matrix_Util$sortRowsByColumn = F3(
	function (index, accessor, matrix) {
		return function (idxs) {
			return A2(_user$project$Matrix_Util$sortRowsByIndexes, idxs, matrix);
		}(
			A3(_user$project$Matrix_Util$sortedRowIndexes, index, accessor, matrix));
	});

var _user$project$Crosstab_Table$sortRowsByIndexes = F2(
	function (indexes, _p0) {
		var _p1 = _p0;
		var _p2 = _p1._0;
		var updSummary = function (summary) {
			return _elm_lang$core$Native_Utils.update(
				summary,
				{
					rows: A2(_user$project$Array_Util$sortByIndexes, indexes, summary.rows)
				});
		};
		var updValues = function (values) {
			return A2(_user$project$Matrix_Util$sortRowsByIndexes, indexes, values);
		};
		var updLevels = function (levels) {
			return _elm_lang$core$Native_Utils.update(
				levels,
				{
					rows: A2(_user$project$Array_Util$sortByIndexes, indexes, levels.rows)
				});
		};
		return _user$project$Crosstab_Internal$Table(
			_elm_lang$core$Native_Utils.update(
				_p2,
				{
					levels: updLevels(_p2.levels),
					values: updValues(_p2.values),
					summary: updSummary(_p2.summary)
				}));
	});
var _user$project$Crosstab_Table$compareValuesAccum = F4(
	function (func, init, _p3, matrix) {
		var _p4 = _p3;
		var comparator = F7(
			function (t, c, r, pc, pr, cc, cr) {
				return {table: t, row: r, col: c, prevRow: pr, prevCol: pc, cumRow: cr, cumCol: cc};
			});
		var compare_ = F9(
			function (f, a, t, pc, pr, cc, cr, c, r) {
				return A2(
					f,
					A7(comparator, t, c, r, pc, pr, cc, cr),
					a);
			});
		var accum = F4(
			function (c, r, a, m) {
				var cc = A2(
					_elm_lang$core$Maybe$withDefault,
					init,
					A3(_eeue56$elm_flat_matrix$Matrix$get, c - 1, r, m));
				var cr = A2(
					_elm_lang$core$Maybe$withDefault,
					init,
					A3(_eeue56$elm_flat_matrix$Matrix$get, c, r - 1, m));
				var pc = A3(_eeue56$elm_flat_matrix$Matrix$get, c - 1, r, matrix);
				var pr = A3(_eeue56$elm_flat_matrix$Matrix$get, c, r - 1, matrix);
				return A4(
					_eeue56$elm_flat_matrix$Matrix$set,
					c,
					r,
					A2(
						_elm_lang$core$Maybe$withDefault,
						init,
						A3(
							_elm_lang$core$Maybe$map2,
							A7(compare_, func, a, _p4.table, pc, pr, cc, cr),
							A2(_elm_lang$core$Array$get, c, _p4.cols),
							A2(_elm_lang$core$Array$get, r, _p4.rows))),
					m);
			});
		var _p5 = matrix.size;
		var ncols = _p5._0;
		var nrows = _p5._1;
		return A3(
			_user$project$Matrix_Util$foldl,
			accum,
			A3(_eeue56$elm_flat_matrix$Matrix$repeat, ncols, nrows, init),
			matrix);
	});
var _user$project$Crosstab_Table$compareValues = F4(
	function (func, init, _p6, matrix) {
		var _p7 = _p6;
		var comparator = F5(
			function (t, c, r, pc, pr) {
				return {table: t, row: r, col: c, prevRow: pr, prevCol: pc};
			});
		var compare_ = F7(
			function (f, a, t, pc, pr, c, r) {
				return A2(
					f,
					A5(comparator, t, c, r, pc, pr),
					a);
			});
		var map_ = F3(
			function (c, r, a) {
				var pc = A3(_eeue56$elm_flat_matrix$Matrix$get, c - 1, r, matrix);
				var pr = A3(_eeue56$elm_flat_matrix$Matrix$get, c, r - 1, matrix);
				return A2(
					_elm_lang$core$Maybe$withDefault,
					init,
					A3(
						_elm_lang$core$Maybe$map2,
						A5(compare_, func, a, _p7.table, pc, pr),
						A2(_elm_lang$core$Array$get, c, _p7.cols),
						A2(_elm_lang$core$Array$get, r, _p7.rows)));
			});
		return A2(_eeue56$elm_flat_matrix$Matrix$indexedMap, map_, matrix);
	});
var _user$project$Crosstab_Table$calcSummary = F2(
	function (_p8, matrix) {
		var _p9 = _p8;
		var _p13 = _p9._0.map;
		var _p12 = _p9._0.init;
		var _p11 = _p9._0.accum;
		var finalize = function (v) {
			return _elm_lang$core$Native_Utils.update(
				v,
				{
					table: _p13(v.table),
					rows: A2(_elm_lang$core$Array$map, _p13, v.rows),
					cols: A2(_elm_lang$core$Array$map, _p13, v.cols)
				});
		};
		var accum_ = F4(
			function (c, r, a, v) {
				return _elm_lang$core$Native_Utils.update(
					v,
					{
						table: A2(_p11, a, v.table),
						rows: A3(
							_user$project$Array_Util$update,
							r,
							_p11(a),
							v.rows),
						cols: A3(
							_user$project$Array_Util$update,
							c,
							_p11(a),
							v.cols)
					});
			});
		var _p10 = matrix.size;
		var ncols = _p10._0;
		var nrows = _p10._1;
		return finalize(
			A3(
				_user$project$Matrix_Util$foldl,
				accum_,
				{
					table: _p12,
					rows: A2(_elm_lang$core$Array$repeat, nrows, _p12),
					cols: A2(_elm_lang$core$Array$repeat, ncols, _p12)
				},
				matrix));
	});
var _user$project$Crosstab_Table$sortRowsByColIndex = F4(
	function (index, accessor, dir, _p14) {
		var _p15 = _p14;
		var _p17 = _p15._0;
		var indexes = A3(_user$project$Matrix_Util$sortedRowIndexes, index, accessor, _p17.values);
		var _p16 = dir;
		if (_p16.ctor === 'Asc') {
			return A2(
				_user$project$Crosstab_Table$sortRowsByIndexes,
				indexes,
				_user$project$Crosstab_Internal$Table(_p17));
		} else {
			return A2(
				_user$project$Crosstab_Table$sortRowsByIndexes,
				_elm_lang$core$List$reverse(indexes),
				_user$project$Crosstab_Internal$Table(_p17));
		}
	});
var _user$project$Crosstab_Table$sortRowsByCol = F4(
	function (col, accessor, dir, _p18) {
		var _p19 = _p18;
		var _p20 = _p19._0;
		return A2(
			_elm_lang$core$Maybe$withDefault,
			_user$project$Crosstab_Internal$Table(_p20),
			A2(
				_elm_lang$core$Maybe$map,
				function (i) {
					return A4(
						_user$project$Crosstab_Table$sortRowsByColIndex,
						i,
						accessor,
						dir,
						_user$project$Crosstab_Internal$Table(_p20));
				},
				A2(_user$project$Array_Util$find, col, _p20.levels.cols)));
	});
var _user$project$Crosstab_Table$sortRowsBySummary = F3(
	function (accessor, dir, _p21) {
		var _p22 = _p21;
		var _p24 = _p22._0;
		var indexes = A2(_user$project$Array_Util$sortedIndexes, accessor, _p24.summary.rows);
		var _p23 = dir;
		if (_p23.ctor === 'Asc') {
			return A2(
				_user$project$Crosstab_Table$sortRowsByIndexes,
				indexes,
				_user$project$Crosstab_Internal$Table(_p24));
		} else {
			return A2(
				_user$project$Crosstab_Table$sortRowsByIndexes,
				_elm_lang$core$List$reverse(indexes),
				_user$project$Crosstab_Internal$Table(_p24));
		}
	});
var _user$project$Crosstab_Table$compareAccum = F3(
	function (comp, init, _p25) {
		var _p26 = _p25;
		var _p27 = _p26._0.summary;
		return _user$project$Crosstab_Internal$Table(
			{
				levels: _p26._0.levels,
				values: A4(_user$project$Crosstab_Table$compareValuesAccum, comp, init, _p27, _p26._0.values),
				summary: _p27
			});
	});
var _user$project$Crosstab_Table$compare = F3(
	function (comp, init, _p28) {
		var _p29 = _p28;
		var _p30 = _p29._0.summary;
		return _user$project$Crosstab_Internal$Table(
			{
				levels: _p29._0.levels,
				values: A4(_user$project$Crosstab_Table$compareValues, comp, init, _p30, _p29._0.values),
				summary: _p30
			});
	});
var _user$project$Crosstab_Table$summarize = F2(
	function (summary, _p31) {
		var _p32 = _p31;
		var _p33 = _p32._0.values;
		return _user$project$Crosstab_Internal$Table(
			{
				levels: _p32._0.levels,
				values: _p33,
				summary: A2(_user$project$Crosstab_Table$calcSummary, summary, _p33)
			});
	});
var _user$project$Crosstab_Table$colSummaryColumn = function (_p34) {
	var _p35 = _p34;
	var _p36 = _p35._0.summary;
	return _user$project$Crosstab_Internal$Column(
		{levels: _p35._0.levels.rows, values: _p36.cols, summary: _p36.table});
};
var _user$project$Crosstab_Table$rowSummaryColumn = function (_p37) {
	var _p38 = _p37;
	var _p39 = _p38._0.summary;
	return _user$project$Crosstab_Internal$Column(
		{levels: _p38._0.levels.cols, values: _p39.rows, summary: _p39.table});
};
var _user$project$Crosstab_Table$tableSummary = function (_p40) {
	var _p41 = _p40;
	return _p41._0.summary.table;
};
var _user$project$Crosstab_Table$colSummaryList = function (_p42) {
	var _p43 = _p42;
	return _elm_lang$core$Array$toList(_p43._0.summary.cols);
};
var _user$project$Crosstab_Table$rowSummaryList = function (_p44) {
	var _p45 = _p44;
	return _elm_lang$core$Array$toList(_p45._0.summary.rows);
};
var _user$project$Crosstab_Table$rowList = function (_p46) {
	var _p47 = _p46;
	return _user$project$Matrix_Util$toListRows(_p47._0.values);
};
var _user$project$Crosstab_Table$colLevelList = function (_p48) {
	var _p49 = _p48;
	return _elm_lang$core$Array$toList(_p49._0.levels.cols);
};
var _user$project$Crosstab_Table$rowLevelList = function (_p50) {
	var _p51 = _p50;
	return _elm_lang$core$Array$toList(_p51._0.levels.rows);
};
var _user$project$Crosstab_Table$levelsOf = F2(
	function (_p52, records) {
		var _p53 = _p52;
		var finalize = function (_p54) {
			var _p55 = _p54;
			return {
				rows: _user$project$Array_Util$fromSet(_p55._0),
				cols: _user$project$Array_Util$fromSet(_p55._1)
			};
		};
		var accum = F2(
			function (record, _p56) {
				var _p57 = _p56;
				return {
					ctor: '_Tuple2',
					_0: A2(
						_elm_lang$core$Set$insert,
						_p53.row(record),
						_p57._0),
					_1: A2(
						_elm_lang$core$Set$insert,
						_p53.col(record),
						_p57._1)
				};
			});
		return finalize(
			A3(
				_elm_lang$core$List$foldr,
				accum,
				{ctor: '_Tuple2', _0: _elm_lang$core$Set$empty, _1: _elm_lang$core$Set$empty},
				records));
	});
var _user$project$Crosstab_Table$tableWithLevels = F5(
	function (_p60, summary, _p59, _p58, records) {
		var _p61 = _p60;
		var _p66 = _p61.rows;
		var _p65 = _p61.cols;
		var _p62 = _p59;
		var _p64 = _p62._0;
		var _p63 = _p58;
		var finalize = function (matrix) {
			return _user$project$Crosstab_Internal$Table(
				{
					levels: {rows: _p66, cols: _p65},
					values: A2(_eeue56$elm_flat_matrix$Matrix$map, _p64.map, matrix),
					summary: A2(_user$project$Crosstab_Table$calcSummary, summary, matrix)
				});
		};
		var initData = A3(
			_eeue56$elm_flat_matrix$Matrix$repeat,
			_elm_lang$core$Array$length(_p65),
			_elm_lang$core$Array$length(_p66),
			_p64.init);
		var accumHelp = F4(
			function (c, r, a, matrix) {
				return A4(
					_eeue56$elm_flat_matrix$Matrix$update,
					c,
					r,
					_p64.accum(a),
					matrix);
			});
		var colMap = _user$project$Array_Util$indexDict(_p65);
		var mcol = function (record) {
			return A3(
				_elm_lang$core$Basics$flip,
				_elm_lang$core$Dict$get,
				colMap,
				_p63.col(record));
		};
		var rowMap = _user$project$Array_Util$indexDict(_p66);
		var mrow = function (record) {
			return A3(
				_elm_lang$core$Basics$flip,
				_elm_lang$core$Dict$get,
				rowMap,
				_p63.row(record));
		};
		var accum = F2(
			function (a, data) {
				return A2(
					_elm_lang$core$Maybe$withDefault,
					data,
					A3(
						_elm_lang$core$Maybe$map2,
						F2(
							function (c, r) {
								return A4(accumHelp, c, r, a, data);
							}),
						mcol(a),
						mrow(a)));
			});
		return finalize(
			A3(_elm_lang$core$List$foldr, accum, initData, records));
	});
var _user$project$Crosstab_Table$table = F4(
	function (summary, value, map, records) {
		return A5(
			_user$project$Crosstab_Table$tableWithLevels,
			A2(_user$project$Crosstab_Table$levelsOf, map, records),
			summary,
			value,
			map,
			records);
	});
var _user$project$Crosstab_Table$LevelMap = F2(
	function (a, b) {
		return {row: a, col: b};
	});
var _user$project$Crosstab_Table$Compare = F5(
	function (a, b, c, d, e) {
		return {table: a, row: b, col: c, prevRow: d, prevCol: e};
	});
var _user$project$Crosstab_Table$CompareAccum = F7(
	function (a, b, c, d, e, f, g) {
		return {table: a, row: b, col: c, prevRow: d, prevCol: e, cumRow: f, cumCol: g};
	});

var _user$project$Data$data = 'YEAR,STATE,REGION,CUSGT1M,CUSGT1F,CUSLT1M,CUSLT1F,CUSUNSM,CUSUNSF,CUSTOTM,CUSTOTF,LFCROWDM,LFCROWDF,WHITEM,WHITEF,BLACKM,BLACKF,HISPM,HISPF,AIANM,AIANF,ASIANM,ASIANF,NHPIM,NHPIF,APIM,APIF,TWORACEM,TWORACEF,ADDRACEM,ADDRACEF,UNKRACEM,UNKRACEF,TOTRACEM,TOTRACEF,NOTHISPM,NOTHISPF,UNKHISPM,UNKHISPF,TOTHCATM,TOTHCATF,COMMITM,COMMITF,RLDEATHM,RLDEATHF,RLTOTM,RLTOTF,CAPRATEM,CAPRATEF,CAPOPM,CAPOPF,CAPDESM,CAPDESF,CAPRATET,CAPOPT,CAPDEST,CUSLT18M,CUSLT18F,CUSCTZNM,CUSCTZNF,DTHEXECM,DTHEXECF,DTHILLNM,DTHILLNF,DTHAIDSM,DTHAIDSF,DTHSUICM,DTHSUICF,DTHACCM,DTHACCF,DTHHOMIM,DTHHOMIF,DTHHOMOM,DTHHOMOF,DTHPERSM,DTHPERSF,DTHOTHM,DTHOTHF,DTHTOTM,DTHTOTF,HANDLEM,HANDLEF\n1983,AL,3,8267,420,160,8,0,0,8427,428,948,53,3658,178,5711,301,1,0,3,1,-1,-1,-1,-1,2,1,-1,-1,-9,-9,1,0,9375,481,9373,481,1,0,-1,-1,4103,316,-1,-1,3305,297,-2,-2,-2,-2,-2,-2,7783,7783,7783,-1,-1,-1,-1,1,0,0,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,22,2,-1,-1,-9,-9\n1983,AK,4,776,32,124,11,384,23,1284,66,-8,-8,905,42,140,7,31,1,499,24,-1,-1,-1,-1,16,1,-1,-1,-9,-9,0,0,1560,74,1529,73,0,0,-1,-1,604,27,-1,-1,635,26,-2,-2,-2,-2,-2,-2,1359,1429,1124,-1,-1,-1,-1,-8,-8,0,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1983,AZ,4,6432,311,134,12,0,0,6566,323,0,0,5381,260,1271,62,1583,56,189,25,-1,-1,-1,-1,8,0,-1,-1,-9,-9,55,0,6904,347,5321,291,0,0,-1,-1,2709,171,-1,-1,2107,136,-2,-2,-2,-2,-2,-2,-9,6021,-9,-1,-1,-1,-1,0,0,10,0,-1,-1,1,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1983,AR,3,3940,188,-9,-9,0,0,3940,188,0,0,1966,88,2073,106,12,1,1,1,-1,-1,-1,-1,8,0,-1,-1,-9,-9,0,1,4048,196,4036,195,0,0,-1,-1,1614,137,-1,-1,1807,118,-2,-2,-2,-2,-2,-2,-9,4184,-9,-1,-1,-1,-1,0,0,7,0,-1,-1,0,0,0,0,-1,-1,-1,-1,3,0,0,0,-1,-1,-9,-9\n1983,CA,4,36275,1750,0,0,1078,270,37353,2020,1122,118,23010,1262,13193,593,9920,449,124,49,-1,-1,-1,-1,77,0,-1,-1,-9,-9,949,116,37353,2020,-9,-9,27433,1571,-1,-1,17155,1246,-1,-1,21668,1401,-2,-2,-2,-2,-2,-2,25703,37986,25703,-1,-1,-1,-1,0,0,24,1,-1,-1,19,0,0,0,-1,-1,-1,-1,11,0,0,0,-1,-1,-9,-9\n1983,CO,4,3105,137,0,0,0,0,3105,137,211,0,2433,98,648,37,745,36,21,1,-1,-1,-1,-1,6,0,-1,-1,-9,-9,0,0,3108,136,2363,100,0,0,-1,-1,1685,99,-1,-1,2024,123,-2,-2,-2,-2,-2,-2,-9,3049,-9,-1,-1,-1,-1,0,0,3,0,-1,-1,1,0,0,1,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1983,CT,1,3410,98,741,114,955,64,5106,276,-8,-8,1961,107,2340,146,880,27,7,1,-1,-1,-1,-1,5,0,-1,-1,-9,-9,880,27,5193,281,4313,254,0,0,-1,-1,2118,80,-1,-1,2272,95,-2,-2,-2,-2,-2,-2,-9,5813,4209,-1,-1,-1,-1,0,0,0,0,-1,-1,2,0,0,0,-1,-1,-1,-1,0,0,4,1,-1,-1,-9,-9\n1983,DE,3,1343,49,209,15,277,23,1829,87,-8,-8,891,38,1197,69,33,2,3,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,2091,107,2058,105,0,0,-1,-1,495,29,-1,-1,634,35,-2,-2,-2,-2,-2,-2,-9,2045,-9,-1,-1,-1,-1,0,0,6,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1983,DC,3,3376,89,678,82,63,56,4117,227,-8,-8,123,19,3994,208,-9,-9,0,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,4117,227,-9,-9,4117,227,-1,-1,1209,96,-1,-1,2277,185,-2,-2,-2,-2,-2,-2,-9,-9,3355,-1,-1,-1,-1,-8,-8,7,0,-1,-1,1,0,3,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1983,FL,3,24157,1136,897,39,0,0,25054,1175,0,0,12915,525,12206,655,785,5,3,0,-1,-1,-1,-1,30,0,-1,-1,-9,-9,0,0,25154,1180,24369,1175,0,0,-1,-1,10873,730,-1,-1,18519,1063,-2,-2,-2,-2,-2,-2,28729,28177,20575,-1,-1,-1,-1,1,0,42,1,-1,-1,3,0,2,0,-1,-1,-1,-1,7,0,0,0,-1,-1,-9,-9\n1983,GA,3,14241,694,367,56,0,0,14608,750,-9,-9,5939,303,8668,447,3,-9,0,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,1,0,14608,750,-9,-9,14605,750,-1,-1,7861,624,-1,-1,8495,629,-2,-2,-2,-2,-2,-2,-9,15534,-9,-1,-1,-1,-1,1,0,20,1,-1,-1,1,0,1,0,-1,-1,-1,-1,1,0,4,0,-1,-1,-9,-9\n1983,HI,4,941,36,149,25,342,27,1432,88,-8,-8,414,44,77,12,-9,-9,16,2,-1,-1,-1,-1,955,47,-1,-1,-9,-9,129,4,1591,109,-9,-9,1591,109,-1,-1,271,20,-1,-1,147,10,-2,-2,-2,-2,-2,-2,-9,1388,940,-1,-1,-1,-1,-8,-8,0,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1983,ID,4,1081,42,0,0,4,0,1085,42,0,0,1082,37,29,1,100,1,32,5,-1,-1,-1,-1,6,0,-1,-1,-9,-9,0,0,1149,43,1049,42,0,0,-1,-1,621,43,-1,-1,679,45,-2,-2,-2,-2,-2,-2,-9,-9,896,-1,-1,-1,-1,0,0,0,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1983,IL,2,14832,532,67,6,0,0,14899,538,86,0,4830,350,9140,185,1028,15,25,6,-1,-1,-1,-1,8,1,-1,-1,-9,-9,1035,15,15038,557,14003,542,7,0,-1,-1,6934,373,-1,-1,8729,428,-2,-2,-2,-2,-2,-2,15318,15318,11987,-1,-1,-1,-1,0,0,10,1,-1,-1,6,0,4,0,-1,-1,-1,-1,2,0,1,0,-1,-1,-9,-9\n1983,IN,2,8614,359,293,30,62,2,8969,391,0,0,5840,202,3062,185,80,0,4,2,-1,-1,-1,-1,1,0,-1,-1,-9,-9,0,0,8907,389,8827,389,0,0,-1,-1,4044,299,-1,-1,3695,264,-2,-2,-2,-2,-2,-2,6424,6424,-9,-1,-1,-1,-1,0,0,13,0,-1,-1,2,0,2,0,-1,-1,-1,-1,4,0,0,0,-1,-1,-9,-9\n1983,IA,2,2700,114,-8,-8,-8,-8,2700,114,-8,-8,2114,92,497,21,37,2,45,2,-1,-1,-1,-1,4,0,-1,-1,-9,-9,37,2,2697,117,2660,115,0,0,-1,-1,1311,56,-1,-1,1901,84,-2,-2,-2,-2,-2,-2,2816,2652,2572,-1,-1,-1,-1,-8,-8,3,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1983,KS,2,3421,199,0,0,3,0,3424,199,0,0,2193,114,1249,87,138,7,49,3,-1,-1,-1,-1,9,1,-1,-1,-9,-9,0,0,3500,205,3362,198,0,0,-1,-1,1435,146,-1,-1,1522,162,-2,-2,-2,-2,-2,-2,-9,2597,3886,-1,-1,-1,-1,-8,-8,2,0,-1,-1,1,0,1,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1983,KY,3,4471,170,0,0,0,0,4471,170,229,23,3190,75,1368,118,0,0,1,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,4559,193,4559,193,0,0,-1,-1,2345,200,-1,-1,2770,199,-2,-2,-2,-2,-2,-2,4754,4687,-9,-1,-1,-1,-1,0,0,11,1,-1,-1,0,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1983,LA,3,10158,358,0,0,0,0,10158,358,2124,175,3438,149,8841,384,-9,-9,0,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,12279,533,-9,-9,12279,533,-1,-1,3958,273,-1,-1,2490,166,-2,-2,-2,-2,-2,-2,10699,10699,10699,-1,-1,-1,-1,1,0,17,0,-1,-1,0,0,0,0,-1,-1,-1,-1,2,0,0,0,-1,-1,-9,-9\n1983,ME,1,773,17,140,13,4,0,917,30,70,5,1018,33,14,0,2,0,16,0,-1,-1,-1,-1,1,0,-1,-1,-9,-9,0,0,1049,33,1047,33,0,0,-1,-1,507,10,-1,-1,636,13,-2,-2,-2,-2,-2,-2,854,854,854,-1,-1,-1,-1,-8,-8,0,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1983,MD,3,11504,350,572,59,0,0,12076,409,0,0,3291,110,8898,298,-9,-9,8,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,11,1,12208,409,-9,-9,12208,409,-1,-1,3763,220,-1,-1,3375,233,-2,-2,-2,-2,-2,-2,8660,12416,-9,-1,-1,-1,-1,0,0,16,0,-1,-1,5,0,0,0,-1,-1,-1,-1,3,0,0,0,-1,-1,-9,-9\n1983,MA,1,4226,146,18,92,7,43,4251,281,2,0,2827,151,1410,86,307,18,6,0,-1,-1,-1,-1,1,1,-1,-1,-9,-9,0,0,4244,238,3937,220,0,0,-1,-1,1342,349,-1,-1,2027,382,-2,-2,-2,-2,-2,-2,3112,3339,3339,-1,-1,-1,-1,0,0,4,1,-1,-1,3,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1983,MI,2,13850,660,0,0,0,0,13850,660,0,0,5661,178,7799,465,165,5,71,4,-1,-1,-1,-1,0,0,-1,-1,-9,-9,198,6,13729,653,13531,647,33,1,-1,-1,4167,344,-1,-1,7323,513,-2,-2,-2,-2,-2,-2,-9,13048,-9,-1,-1,-1,-1,-8,-8,8,0,-1,-1,3,0,0,0,-1,-1,-1,-1,2,0,0,0,-1,-1,-9,-9\n1983,MN,2,2170,65,0,0,0,0,2170,65,0,0,1359,45,450,12,49,1,160,8,-1,-1,-1,-1,2,0,-1,-1,-9,-9,75,2,2046,67,1976,66,21,0,-1,-1,1052,72,-1,-1,1351,97,-2,-2,-2,-2,-2,-2,2405,2405,-9,-1,-1,-1,-1,-8,-8,3,0,-1,-1,1,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1983,MS,3,4350,192,35,3,0,0,4385,195,996,10,1516,66,3605,127,9,1,6,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,254,12,5381,205,5118,192,254,12,-1,-1,2061,138,-1,-1,2569,141,-2,-2,-2,-2,-2,-2,4557,-9,-9,-1,-1,-1,-1,1,0,10,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1983,MO,2,7718,308,0,0,0,0,7718,308,0,0,5065,289,2728,193,-9,-9,0,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,7793,482,-9,-9,7793,482,-1,-1,2899,168,-1,-1,3047,110,-2,-2,-2,-2,-2,-2,-9,8855,-9,-1,-1,-1,-1,0,0,0,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,22,1,-1,-1,-9,-9\n1983,MT,4,757,24,2,0,0,0,759,24,0,0,681,18,14,0,19,0,179,6,-1,-1,-1,-1,2,0,-1,-1,-9,-9,3,0,879,24,860,24,0,0,-1,-1,323,20,-1,-1,442,26,-2,-2,-2,-2,-2,-2,575,767,575,-1,-1,-1,-1,0,0,1,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1983,NE,2,1503,51,71,7,56,2,1630,60,0,0,985,33,515,23,41,1,62,2,-1,-1,-1,-1,9,0,-1,-1,-9,-9,0,0,1571,58,1530,57,0,0,-1,-1,472,39,-1,-1,592,54,-2,-2,-2,-2,-2,-2,1271,1541,1239,-1,-1,-1,-1,0,0,3,1,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1983,NV,4,2899,169,0,0,121,3,3020,172,0,0,1835,69,935,81,141,4,12,1,-1,-1,-1,-1,21,2,-1,-1,-9,-9,221,11,3024,164,2883,160,0,0,-1,-1,1105,92,-1,-1,985,67,-2,-2,-2,-2,-2,-2,-9,3185,2541,-1,-1,-1,-1,0,0,4,0,-1,-1,4,0,1,0,-1,-1,-1,-1,0,0,0,1,-1,-1,-9,-9\n1983,NH,1,432,2,0,0,25,0,457,2,0,0,453,14,12,0,10,1,0,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,465,14,455,13,0,0,-1,-1,225,8,-1,-1,245,5,-2,-2,-2,-2,-2,-2,490,460,392,-1,-1,-1,-1,-8,-8,0,0,-1,-1,0,0,1,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1983,NJ,1,8750,342,48,2,0,0,8798,344,967,0,3177,114,5659,228,919,4,0,0,-1,-1,-1,-1,14,0,-1,-1,-9,-9,0,0,8850,342,7931,338,0,0,-1,-1,4479,216,-1,-1,4607,225,-2,-2,-2,-2,-2,-2,-9,8857,7864,-1,-1,-1,-1,0,0,11,1,-1,-1,1,0,1,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1983,NM,4,1584,45,242,21,42,2,1868,68,0,0,1607,61,247,9,908,35,50,1,-1,-1,-1,-1,2,0,-1,-1,-9,-9,0,0,1906,71,998,36,0,0,-1,-1,865,52,-1,-1,979,106,-2,-2,-2,-2,-2,-2,1950,1950,1950,-1,-1,-1,-1,0,0,0,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,5,0,-1,-1,-9,-9\n1983,NY,1,30073,851,0,0,0,0,30073,851,0,0,14059,352,15515,485,6807,156,56,4,-1,-1,-1,-1,68,2,-1,-1,-9,-9,0,0,29698,843,22891,687,0,0,-1,-1,9993,422,-1,-1,11652,499,-2,-2,-2,-2,-2,-2,26284,31182,26530,-1,-1,-1,-1,-8,-8,41,2,-1,-1,9,0,0,0,-1,-1,-1,-1,3,0,0,0,-1,-1,-9,-9\n1983,NC,3,13754,503,1052,86,78,12,14884,601,0,0,6346,279,8022,298,-9,-9,377,12,-1,-1,-1,-1,3,0,-1,-1,-9,-9,58,0,14806,589,-9,-9,14806,589,-1,-1,7193,455,-1,-1,9467,568,-2,-2,-2,-2,-2,-2,-9,16261,-9,-1,-1,-1,-1,0,0,28,0,-1,-1,4,0,2,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1983,ND,2,354,8,58,2,0,0,412,10,0,0,325,5,7,1,4,0,68,4,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,400,10,396,10,0,0,-1,-1,277,12,-1,-1,224,13,-2,-2,-2,-2,-2,-2,471,471,471,-1,-1,-1,-1,-8,-8,0,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1983,OH,2,15594,822,1201,149,0,0,16795,971,-8,-8,8603,416,8427,561,89,1,0,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,17030,977,16706,970,235,6,-1,-1,7970,848,-1,-1,9521,885,-2,-2,-2,-2,-2,-2,-9,-9,16417,-1,-1,-1,-1,0,0,24,1,-1,-1,3,0,1,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1983,OK,3,6687,338,0,0,0,0,6687,338,0,0,4610,232,1959,98,85,4,382,20,-1,-1,-1,-1,1,0,-1,-1,-9,-9,120,6,7072,356,6952,350,35,2,-1,-1,3535,301,-1,-1,3282,303,-2,-2,-2,-2,-2,-2,7666,7666,5099,-1,-1,-1,-1,0,0,8,0,-1,-1,0,0,0,0,-1,-1,-1,-1,7,0,2,0,-1,-1,-9,-9\n1983,OR,4,3207,111,0,0,0,0,3207,111,0,0,3260,94,404,43,136,0,99,6,-1,-1,-1,-1,8,0,-1,-1,-9,-9,26,1,3797,144,3661,144,0,0,-1,-1,1800,110,-1,-1,2767,178,-2,-2,-2,-2,-2,-2,2333,3494,2699,-1,-1,-1,-1,-8,-8,0,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,9,0,-1,-1,-9,-9\n1983,PA,1,11299,392,61,7,38,1,11398,400,0,0,5055,181,6305,216,-9,-9,7,0,-1,-1,-1,-1,3,0,-1,-1,-9,-9,0,0,11370,397,-9,-9,11370,397,-1,-1,3703,223,-1,-1,4239,230,-2,-2,-2,-2,-2,-2,-9,-9,9517,-1,-1,-1,-1,0,0,21,1,-1,-1,5,0,0,0,-1,-1,-1,-1,2,0,0,0,-1,-1,-9,-9\n1983,RI,1,850,17,87,7,176,13,1113,37,-8,-8,782,22,336,15,51,1,1,0,-1,-1,-1,-1,1,0,-1,-1,-9,-9,0,0,1120,37,1069,36,0,0,-1,-1,339,8,-1,-1,406,7,-2,-2,-2,-2,-2,-2,1248,1122,-9,-1,-1,-1,-1,0,0,0,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1983,SC,3,7910,315,421,53,15,2,8346,370,485,1,3712,179,5414,247,-9,-9,9,0,-1,-1,-1,-1,2,0,-1,-1,-9,-9,13,0,9150,426,-9,-9,9150,426,-1,-1,2868,203,-1,-1,3528,213,-2,-2,-2,-2,-2,-2,-9,7630,6581,-1,-1,-1,-1,0,0,23,0,-1,-1,1,0,2,0,-1,-1,-1,-1,2,0,2,0,-1,-1,-9,-9\n1983,SD,2,775,37,15,3,0,0,790,40,0,0,577,22,20,0,6,0,188,19,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,785,41,779,41,0,0,-1,-1,411,40,-1,-1,435,45,-2,-2,-2,-2,-2,-2,996,894,636,-1,-1,-1,-1,0,0,0,0,-1,-1,2,0,1,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1983,TN,3,7497,379,0,0,0,0,7497,379,1100,0,4334,221,3450,176,-9,-9,-9,-9,-1,-1,-1,-1,-9,-9,-1,-1,-9,-9,19,1,7803,398,-9,-9,7803,398,-1,-1,3393,239,-1,-1,4083,243,-2,-2,-2,-2,-2,-2,-9,7982,6544,-1,-1,-1,-1,0,0,7,0,-1,-1,4,0,0,0,-1,-1,-1,-1,7,0,0,0,-1,-1,-9,-9\n1983,TX,3,33789,1470,0,0,0,0,33789,1470,0,0,19187,747,14602,723,6554,184,0,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,33789,1470,27235,1286,0,0,-1,-1,16449,1224,-1,-1,22085,1664,-2,-2,-2,-2,-2,-2,39785,37796,39785,-1,-1,-1,-1,0,0,49,1,-1,-1,11,0,3,0,-1,-1,-1,-1,9,0,1,0,-1,-1,-9,-9\n1983,UT,4,1144,47,10,3,29,1,1183,51,55,0,1073,39,116,9,247,10,29,2,-1,-1,-1,-1,5,1,-1,-1,-9,-9,0,0,1223,51,976,41,0,0,-1,-1,452,31,-1,-1,760,45,-2,-2,-2,-2,-2,-2,1031,1346,1170,-1,-1,-1,-1,0,0,1,0,-1,-1,0,0,1,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1983,VT,1,384,6,74,2,63,6,521,14,6,0,0,0,0,0,-9,-9,0,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,488,9,488,9,-9,-9,488,9,-1,-1,151,2,-1,-1,337,9,-2,-2,-2,-2,-2,-2,553,586,479,-1,-1,-1,-1,-8,-8,3,0,-1,-1,1,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1983,VA,3,8862,335,24,1,0,0,8886,336,189,57,3985,144,5543,222,-9,-9,0,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,184,15,9712,381,-9,-9,9712,381,-1,-1,4135,286,-1,-1,5162,312,-2,-2,-2,-2,-2,-2,9544,9544,9175,-1,-1,-1,-1,0,0,31,2,-1,-1,2,0,0,0,-1,-1,-1,-1,0,0,36,1,-1,-1,-9,-9\n1983,WA,4,5982,216,0,0,0,0,5982,216,28,0,4448,136,1211,79,328,8,247,15,-1,-1,-1,-1,42,1,-1,-1,-9,-9,449,21,6397,252,6069,244,0,0,-1,-1,1563,92,-1,-1,2284,127,-2,-2,-2,-2,-2,-2,4491,6172,-9,-1,-1,-1,-1,0,0,8,0,-1,-1,2,0,1,0,-1,-1,-1,-1,0,0,2,0,-1,-1,-9,-9\n1983,WV,3,1551,58,0,0,55,3,1606,61,0,0,1329,48,227,18,1,0,2,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,1558,66,1557,66,0,0,-1,-1,823,41,-1,-1,816,28,-2,-2,-2,-2,-2,-2,1446,1539,1466,-1,-1,-1,-1,-8,-8,0,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,4,0,-1,-1,-9,-9\n1983,WI,2,4033,193,0,0,0,0,4033,193,74,0,2767,114,1761,97,256,15,121,3,-1,-1,-1,-1,1,0,-1,-1,-9,-9,0,1,4650,215,4392,193,2,7,-1,-1,1936,133,-1,-1,2367,131,-2,-2,-2,-2,-2,-2,3986,3986,3986,-1,-1,-1,-1,-8,-8,0,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,7,0,-1,-1,-9,-9\n1983,WY,4,648,33,0,0,0,0,648,33,0,0,640,29,26,1,53,2,21,3,-1,-1,-1,-1,1,0,-1,-1,-9,-9,0,0,688,33,635,31,0,0,-1,-1,305,25,-1,-1,322,20,-2,-2,-2,-2,-2,-2,-9,701,566,-1,-1,-1,-1,0,0,0,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1983,ST,7,366449,15216,7950,908,3877,553,378276,16677,8692,442,196850,8424,181335,8435,32563,1053,3199,232,-1,-1,-1,-1,1322,58,-1,-1,0,0,5206,251,387912,17400,221406,10038,133943,6309,-1,-1,161901,11388,-1,-1,197591,12958,-2,-2,-2,-2,-2,-2,227293,351835,243604,-1,-1,-1,-1,5,0,479,15,-1,-1,98,0,27,1,-1,-1,-1,-1,75,0,121,6,-1,-1,0,0\n1983,US,5,388900,16601,10089,1040,6645,623,405634,18264,8692,442,216522,9380,191020,9196,39744,1344,3833,253,-1,-1,-1,-1,1503,74,-1,-1,0,0,5206,251,418084,19154,244397,11501,133943,6309,-1,-1,174887,12521,-1,-1,211611,14245,-2,-2,-2,-2,-2,-2,251692,382126,268003,-1,-1,-1,-1,5,0,528,16,-1,-1,105,0,28,1,-1,-1,-1,-1,86,0,121,6,-1,-1,0,0\n1983,FE,6,22451,1385,2139,132,2768,70,27358,1587,0,0,19672,956,9685,761,7181,291,634,21,-1,-1,-1,-1,181,16,-1,-1,-9,-9,0,0,30172,1754,22991,1463,0,0,-1,-1,12986,1133,-1,-1,14020,1287,-2,-2,-2,-2,-2,-2,24399,30291,24399,-1,-1,-1,-1,0,0,49,1,-1,-1,7,0,1,0,-1,-1,-1,-1,11,0,0,0,-1,-1,-9,-9\n1984,AL,3,9348,476,177,24,0,0,9525,500,436,21,3976,202,5978,317,0,0,5,2,-1,-1,-1,-1,2,0,-1,-1,-9,-9,0,0,9961,521,9961,521,0,0,9961,521,4108,340,-1,-1,3835,315,-2,-2,-2,-2,-2,-2,9166,9166,9166,-1,-1,-1,-1,0,0,0,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,34,1,-1,-1,-9,-9\n1984,AK,4,1015,37,167,9,445,25,1627,71,-9,-9,1058,44,151,6,19,1,660,28,-1,-1,-1,-1,19,1,-1,-1,-9,-9,0,0,1888,79,1869,78,0,0,1888,79,657,28,-1,-1,517,28,-2,-2,-2,-2,-2,-2,-9,1684,-9,-1,-1,-1,-1,-8,-8,0,0,-1,-1,0,0,2,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1984,AZ,4,7290,356,192,7,0,0,7482,363,-9,-9,5866,287,1257,61,1855,72,262,15,-1,-1,-1,-1,7,0,-1,-1,-9,-9,90,0,7482,363,5627,291,0,0,7482,363,2801,164,-1,-1,2356,150,-2,-2,-2,-2,-2,-2,-9,6491,-9,-1,-1,-1,-1,0,0,11,0,-1,-1,1,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1984,AR,3,4156,190,-9,-9,0,0,4156,190,0,0,2096,85,2178,110,30,0,0,1,-1,-1,-1,-1,1,0,-1,-1,-9,-9,1,0,4276,196,4246,196,0,0,4276,196,1536,106,-1,-1,1833,145,-2,-2,-2,-2,-2,-2,-9,4398,-9,-1,-1,-1,-1,0,0,5,0,-1,-1,1,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1984,CA,4,39623,2029,0,0,1269,276,40892,2305,1366,147,25513,1453,14007,647,11151,569,132,69,-1,-1,-1,-1,69,4,-1,-1,-9,-9,1297,137,41018,2310,0,0,29867,1741,41018,2310,16203,1349,-1,-1,24162,1761,-2,-2,-2,-2,-2,-2,24483,40724,28483,-1,-1,-1,-1,0,0,44,0,-1,-1,16,0,0,0,-1,-1,-1,-1,16,0,0,0,-1,-1,-9,-9\n1984,CO,4,3089,141,0,0,0,0,3089,141,159,0,2396,100,640,40,773,36,31,0,-1,-1,-1,-1,9,0,-1,-1,-9,-9,15,0,3091,140,2318,104,0,0,3091,140,1778,95,-1,-1,2237,119,-2,-2,-2,-2,-2,-2,-9,3182,-9,-1,-1,-1,-1,0,0,2,0,-1,-1,1,0,0,0,-1,-1,-1,-1,2,0,0,0,-1,-1,-9,-9\n1984,CT,1,3527,138,764,96,1034,52,5325,286,-9,-9,1955,103,2444,152,1017,30,7,1,-1,-1,-1,-1,8,1,-1,-1,-9,-9,1017,30,5431,287,4414,257,0,0,5431,287,2008,117,-1,-1,2448,162,-2,-2,-2,-2,-2,-2,4900,5383,3691,-1,-1,-1,-1,0,0,0,0,-1,-1,1,0,1,0,-1,-1,-1,-1,0,0,7,0,-1,-1,-9,-9\n1984,DE,3,1291,49,179,16,335,23,1805,88,-9,-9,882,39,1208,68,45,2,5,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,2095,107,2050,105,0,0,2095,107,436,30,-1,-1,676,28,-2,-2,-2,-2,-2,-2,-9,2041,-9,-1,-1,-1,-1,0,0,2,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1984,DC,3,3633,85,581,52,101,69,4315,206,-9,-9,123,16,4192,190,0,0,0,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,4315,206,0,0,4315,206,4315,206,1278,127,-1,-1,2169,201,-2,-2,-2,-2,-2,-2,-9,-9,3503,-1,-1,-1,-1,-8,-8,7,1,-1,-1,2,0,1,0,-1,-1,-1,-1,3,0,0,0,-1,-1,-9,-9\n1984,FL,3,25617,1134,140,15,0,0,25757,1149,-9,-9,12838,512,12533,628,1828,83,0,0,-1,-1,-1,-1,393,10,-1,-1,-9,-9,0,0,25764,1150,23936,1067,0,0,25764,1150,10482,695,-1,-1,11610,763,-2,-2,-2,-2,-2,-2,29452,28827,20999,-1,-1,-1,-1,8,0,45,0,-1,-1,7,0,3,0,-1,-1,-1,-1,5,0,9,0,-1,-1,-9,-9\n1984,GA,3,13907,689,734,74,0,0,14641,763,-9,-9,6161,291,8876,478,4,0,-9,-9,-1,-1,-1,-1,-9,-9,-1,-1,-9,-9,2,0,15039,769,0,0,15035,769,15039,769,7244,532,-1,-1,9052,624,-2,-2,-2,-2,-2,-2,-9,15502,-9,-1,-1,-1,-1,2,0,27,0,-1,-1,3,0,-9,-9,-1,-1,-1,-1,2,1,4,0,-1,-1,-9,-9\n1984,HI,4,1189,55,160,10,298,22,1647,87,-9,-9,427,23,74,6,0,0,0,0,-1,-1,-1,-1,1115,70,-1,-1,-9,-9,242,8,1858,107,0,0,1858,107,1858,107,346,21,-1,-1,145,20,-2,-2,-2,-2,-2,-2,-9,1444,992,-1,-1,-1,-1,-8,-8,1,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1984,ID,4,1138,47,0,0,1,0,1139,47,-9,-9,1144,43,25,2,109,3,29,5,-1,-1,-1,-1,5,0,-1,-1,-9,-9,0,0,1203,50,1094,47,0,0,1203,50,596,46,-1,-1,743,43,-2,-2,-2,-2,-2,-2,-9,1175,971,-1,-1,-1,-1,0,0,1,0,-1,-1,2,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1984,IL,2,16314,598,0,0,0,0,16314,598,22,38,5417,207,9814,400,1159,16,25,7,-1,-1,-1,-1,4,1,-1,-1,-9,-9,1219,20,16479,635,15260,615,60,4,16479,635,6361,421,-1,-1,8051,495,-2,-2,-2,-2,-2,-2,17392,-9,-9,-1,-1,-1,-1,0,0,14,0,-1,-1,4,0,1,0,-1,-1,-1,-1,4,0,2,0,-1,-1,-9,-9\n1984,IN,2,8686,377,247,18,64,0,8997,395,-9,-9,5857,206,3071,189,80,2,4,0,-1,-1,-1,-1,1,0,-1,-1,-9,-9,0,0,8933,395,8853,393,0,0,8933,395,3661,258,-1,-1,3808,253,-2,-2,-2,-2,-2,-2,6259,6259,-9,-1,-1,-1,-1,0,0,8,0,-1,-1,1,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1984,IA,2,2733,103,-8,-8,-8,-8,2733,103,-9,-9,2139,81,503,19,42,1,46,2,-1,-1,-1,-1,3,0,-1,-1,-9,-9,42,1,2733,103,2691,102,0,0,2733,103,1277,47,-1,-1,1919,79,-2,-2,-2,-2,-2,-2,2816,2652,2572,-1,-1,-1,-1,-8,-8,6,1,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1984,KS,2,3916,214,0,0,4,0,3920,214,-9,-9,2545,130,1395,102,157,6,55,2,-1,-1,-1,-1,14,1,-1,-1,-9,-9,0,0,4009,235,3852,229,0,0,4009,235,1280,145,-1,-1,1419,159,-2,-2,-2,-2,-2,-2,-9,2722,3841,-1,-1,-1,-1,-8,-8,3,0,-1,-1,1,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1984,KY,3,4527,183,0,0,0,0,4527,183,700,15,3093,124,1523,74,0,5,1,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,5,4617,203,4617,198,0,0,4617,203,1704,172,-1,-1,2658,217,-2,-2,-2,-2,-2,-2,4834,4727,-9,-1,-1,-1,-1,0,0,7,0,-1,-1,0,0,0,0,-1,-1,-1,-1,2,0,0,0,-1,-1,-9,-9\n1984,LA,3,10303,382,0,0,0,0,10303,382,2659,226,3654,170,9397,438,0,0,0,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,13051,608,0,0,13051,608,13051,608,3739,283,-1,-1,3243,215,-2,-2,-2,-2,-2,-2,10967,10967,10967,-1,-1,-1,-1,5,0,5,0,-1,-1,0,0,0,0,-1,-1,-1,-1,3,0,8,0,-1,-1,-9,-9\n1984,ME,1,788,14,170,10,0,0,958,24,51,2,969,27,16,0,3,0,20,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,1005,27,1002,27,0,0,1005,27,385,12,-1,-1,486,11,-2,-2,-2,-2,-2,-2,951,-9,-9,-1,-1,-1,-1,-8,-8,0,0,-1,-1,1,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1984,MD,3,11933,383,617,58,0,0,12550,441,-9,-9,3501,137,9157,303,0,0,12,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,13,1,12683,441,0,0,12683,441,12683,441,3371,216,-1,-1,3499,212,-2,-2,-2,-2,-2,-2,9421,13160,-9,-1,-1,-1,-1,0,0,18,1,-1,-1,7,0,0,0,-1,-1,-1,-1,4,0,0,0,-1,-1,-9,-9\n1984,MA,1,4584,154,35,110,43,48,4662,312,0,0,3069,166,1540,97,370,21,7,0,-1,-1,-1,-1,3,1,-1,-1,-9,-9,0,0,4619,264,4249,243,0,0,4619,264,1423,348,-1,-1,2278,376,-2,-2,-2,-2,-2,-2,3135,3362,3362,-1,-1,-1,-1,-8,-8,4,0,-1,-1,0,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1984,MI,2,13921,683,0,0,0,0,13921,683,-9,-9,5787,184,7850,484,173,9,64,4,-1,-1,-1,-1,3,0,-1,-1,-9,-9,217,11,13921,683,13704,672,44,2,13921,683,4336,344,-1,-1,7044,555,-2,-2,-2,-2,-2,-2,-9,12930,-9,-1,-1,-1,-1,-8,-8,14,0,-1,-1,2,0,2,0,-1,-1,-1,-1,6,0,0,0,-1,-1,-9,-9\n1984,MN,2,2254,77,0,0,0,0,2254,77,-9,-9,1399,48,459,21,50,0,170,8,-1,-1,-1,-1,2,0,-1,-1,-9,-9,58,2,2088,79,2037,78,1,1,2088,79,1080,69,-1,-1,1372,73,-2,-2,-2,-2,-2,-2,2410,2410,2500,-1,-1,-1,-1,-8,-8,2,0,-1,-1,5,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1984,MS,3,4567,199,51,2,0,0,4618,201,1237,59,1665,85,3833,169,7,0,7,1,-1,-1,-1,-1,5,0,-1,-1,-9,-9,345,5,5855,260,5503,255,345,5,5855,260,2187,122,-1,-1,2307,113,-2,-2,-2,-2,-2,-2,4868,-9,-9,-1,-1,-1,-1,0,0,8,1,-1,-1,1,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1984,MO,2,8343,342,0,0,0,0,8343,342,-9,-9,5476,213,2949,142,0,0,0,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,8425,355,0,0,8425,355,8425,355,2998,158,-1,-1,3471,145,-2,-2,-2,-2,-2,-2,-9,8833,-9,-1,-1,-1,-1,0,0,0,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,18,1,-1,-1,-9,-9\n1984,MT,4,788,38,0,0,0,0,788,38,-9,-9,733,30,14,0,29,0,172,6,-1,-1,-1,-1,5,0,-1,-1,-9,-9,5,0,929,36,900,36,0,0,929,36,366,21,-1,-1,446,18,-2,-2,-2,-2,-2,-2,737,1011,737,-1,-1,-1,-1,0,0,0,0,-1,-1,1,0,1,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1984,NE,2,1518,64,73,11,23,1,1614,76,-9,-9,996,37,502,30,51,1,74,5,-1,-1,-1,-1,10,0,-1,-1,-9,-9,0,0,1582,72,1531,71,0,0,1582,72,497,38,-1,-1,584,36,-2,-2,-2,-2,-2,-2,1562,1513,1542,-1,-1,-1,-1,0,0,2,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1984,NV,4,3230,200,0,0,40,0,3270,200,-9,-9,1924,114,1103,104,153,4,48,3,-1,-1,-1,-1,29,3,-1,-1,-9,-9,156,4,3260,228,3107,224,0,0,3260,228,1108,102,-1,-1,1085,58,-2,-2,-2,-2,-2,-2,-9,-9,2952,-1,-1,-1,-1,0,0,4,0,-1,-1,1,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1984,NH,1,520,1,0,0,27,0,547,1,-9,-9,557,13,10,1,6,1,0,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,567,14,561,13,0,0,567,14,220,9,-1,-1,193,9,-2,-2,-2,-2,-2,-2,565,540,501,-1,-1,-1,-1,-8,-8,1,0,-1,-1,1,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1984,NJ,1,9977,368,0,0,0,0,9977,368,1527,9,3330,123,6628,245,1199,18,0,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,37,0,9995,368,8796,350,0,0,9995,368,3502,236,-1,-1,3932,256,-2,-2,-2,-2,-2,-2,8424,9934,-9,-1,-1,-1,-1,0,0,24,0,-1,-1,1,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1984,NM,4,1749,65,197,16,8,0,1954,81,-9,-9,1735,70,244,11,1008,42,61,4,-1,-1,-1,-1,4,0,-1,-1,-9,-9,0,0,2044,85,1036,43,0,0,2044,85,1014,86,-1,-1,1238,92,-2,-2,-2,-2,-2,-2,-9,2390,2390,-1,-1,-1,-1,0,0,0,0,-1,-1,0,0,0,0,-1,-1,-1,-1,4,0,0,0,-1,-1,-9,-9\n1984,NY,1,32744,1038,0,0,0,0,32744,1038,-9,-9,15519,460,16365,551,8347,228,53,2,-1,-1,-1,-1,94,1,-1,-1,-9,-9,60,4,32091,1018,23744,790,0,0,32091,1018,9298,497,-1,-1,11804,445,-2,-2,-2,-2,-2,-2,-9,35035,34292,-1,-1,-1,-1,-8,-8,94,2,-1,-1,5,0,2,0,-1,-1,-1,-1,7,0,0,0,-1,-1,-9,-9\n1984,NC,3,14612,607,1057,95,93,5,15762,707,-9,-9,6769,302,8500,382,0,0,315,18,-1,-1,-1,-1,2,0,-1,-1,-9,-9,83,0,15669,702,0,0,15669,702,15669,702,7369,475,-1,-1,7571,416,-2,-2,-2,-2,-2,-2,-9,16695,-9,-1,-1,-1,-1,1,1,15,0,-1,-1,2,0,1,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1984,ND,2,381,8,53,4,0,0,434,12,-9,-9,338,7,7,1,7,0,75,4,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,420,12,413,12,0,0,420,12,211,6,-1,-1,208,7,-2,-2,-2,-2,-2,-2,471,471,471,-1,-1,-1,-1,-8,-8,0,0,-1,-1,1,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1984,OH,2,16164,829,1200,139,0,0,17364,968,-9,-9,9096,407,8271,562,144,0,8,0,-1,-1,-1,-1,7,0,-1,-1,-9,-9,219,49,17601,1018,17148,965,309,53,17601,1018,7335,780,-1,-1,9174,882,-2,-2,-2,-2,-2,-2,-9,-9,11600,-1,-1,-1,-1,0,0,15,0,-1,-1,1,0,0,0,-1,-1,-1,-1,0,0,1,0,-1,-1,-9,-9\n1984,OK,3,6542,418,0,-9,0,0,6542,418,-9,-9,4729,289,2124,142,103,4,399,34,-1,-1,-1,-1,1,0,-1,-1,-9,-9,147,7,7400,472,7253,465,44,3,7400,472,3604,313,-1,-1,3637,314,-2,-2,-2,-2,-2,-2,7221,7221,5435,-1,-1,-1,-1,0,0,12,0,-1,-1,1,0,0,0,-1,-1,-1,-1,6,0,1,0,-1,-1,-9,-9\n1984,OR,4,3313,126,0,0,0,0,3313,126,-9,-9,3512,120,399,35,158,10,90,10,-1,-1,-1,-1,2,0,-1,-1,-9,-9,51,5,4054,170,3867,157,29,3,4054,170,1980,129,-1,-1,3043,202,-2,-2,-2,-2,-2,-2,2333,3510,2699,-1,-1,-1,-1,0,0,-9,-9,-1,-1,-9,-9,-9,-9,-1,-1,-1,-1,0,0,12,1,-1,-1,-9,-9\n1984,PA,1,12541,463,80,12,30,0,12651,475,-9,-9,5542,185,7064,288,1,2,6,0,-1,-1,-1,-1,2,0,-1,-1,-9,-9,1,2,12615,475,0,0,12614,473,12615,475,3954,238,-1,-1,4396,244,-2,-2,-2,-2,-2,-2,-9,-9,10025,-1,-1,-1,-1,0,0,31,1,-1,-1,3,1,0,0,-1,-1,-1,-1,4,0,0,0,-1,-1,-9,-9\n1984,RI,1,866,22,96,4,233,12,1195,38,-9,-9,825,19,363,14,80,1,0,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,1188,33,1108,32,0,0,1188,33,282,9,-1,-1,430,11,-2,-2,-2,-2,-2,-2,1347,1213,1347,-1,-1,-1,-1,-8,-8,0,0,-1,-1,0,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1984,SC,3,7994,322,487,67,21,3,8502,392,474,0,3770,188,5627,249,17,0,5,0,-1,-1,-1,-1,2,0,-1,-1,-9,-9,17,0,9421,437,0,0,9404,437,9421,437,3247,210,-1,-1,4102,249,-2,-2,-2,-2,-2,-2,7976,7976,6927,-1,-1,-1,-1,0,0,22,0,-1,-1,2,1,2,0,-1,-1,-1,-1,7,0,0,0,-1,-1,-9,-9\n1984,SD,2,861,32,17,0,2,0,880,32,-9,-9,652,22,22,0,8,0,215,10,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,889,32,881,32,0,0,889,32,472,34,-1,-1,451,48,-2,-2,-2,-2,-2,-2,996,894,636,-1,-1,-1,-1,0,0,1,0,-1,-1,1,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1984,TN,3,6929,298,0,0,0,0,6929,298,1450,65,3841,204,3128,109,0,0,-9,-9,-1,-1,-1,-1,-9,-9,-1,-1,-9,-9,19,1,6988,314,0,0,6988,314,6988,314,3717,274,-1,-1,5623,397,-2,-2,-2,-2,-2,-2,-9,-9,7686,-1,-1,-1,-1,0,0,14,0,-1,-1,1,1,0,0,-1,-1,-1,-1,8,0,0,0,-1,-1,-9,-9\n1984,TX,3,34987,1695,0,0,0,0,34987,1695,-9,-9,20150,905,14837,790,7098,223,0,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,34987,1695,27889,1472,0,0,34987,1695,15188,1349,-1,-1,20598,1433,-2,-2,-2,-2,-2,-2,10674,38641,40674,-1,-1,-1,-1,3,0,43,1,-1,-1,9,0,0,0,-1,-1,-1,-1,25,0,0,0,-1,-1,-9,-9\n1984,UT,4,1446,45,10,3,39,3,1495,51,32,0,1278,50,124,14,254,7,21,3,-1,-1,-1,-1,10,0,-1,-1,-9,-9,0,0,1433,67,1179,60,0,0,1433,67,681,48,-1,-1,779,52,-2,-2,-2,-2,-2,-2,1383,1299,1286,-1,-1,-1,-1,0,0,5,0,-1,-1,2,0,1,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1984,VT,1,352,9,66,3,60,1,478,13,0,0,0,0,0,0,0,0,0,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,503,12,503,12,0,0,503,12,503,12,293,12,-1,-1,327,9,-2,-2,-2,-2,-2,-2,529,529,489,-1,-1,-1,-1,-8,-8,0,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1984,VA,3,9407,377,2,0,0,0,9409,377,623,40,4241,148,6126,282,0,0,0,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,39,3,10406,433,0,0,10406,433,10406,433,3350,313,-1,-1,4100,323,-2,-2,-2,-2,-2,-2,9557,9557,9351,-1,-1,-1,-1,1,0,22,0,-1,-1,1,0,0,0,-1,-1,-1,-1,0,0,42,0,-1,-1,-9,-9\n1984,WA,4,6118,224,0,0,0,0,6118,224,61,0,4591,144,1214,79,359,13,270,12,-1,-1,-1,-1,36,2,-1,-1,-9,-9,456,17,6567,254,6201,241,7,0,6567,254,1474,94,-1,-1,2221,141,-2,-2,-2,-2,-2,-2,4484,6312,4484,-1,-1,-1,-1,0,0,11,0,-1,-1,2,0,0,0,-1,-1,-1,-1,1,0,1,0,-1,-1,-9,-9\n1984,WV,3,1528,51,0,0,23,4,1551,55,-9,-9,1319,38,220,7,1,0,1,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,1540,45,1539,45,0,0,1540,45,767,29,-1,-1,849,45,-2,-2,-2,-2,-2,-2,2063,2111,2038,-1,-1,-1,-1,-8,-8,0,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,5,0,-1,-1,-9,-9\n1984,WI,2,4632,213,0,0,0,0,4632,213,75,0,2780,117,1762,91,275,10,134,6,-1,-1,-1,-1,0,0,-1,-1,-9,-9,8,4,4684,218,4406,197,3,11,4684,218,1740,130,-1,-1,2318,153,-2,-2,-2,-2,-2,-2,4078,4078,-9,-1,-1,-1,-1,-8,-8,0,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,4,0,-1,-1,-9,-9\n1984,WY,4,667,39,0,0,0,0,667,39,-9,-9,632,35,30,3,50,2,22,1,-1,-1,-1,-1,1,0,-1,-1,-9,-9,0,0,685,39,635,37,0,0,685,39,286,20,-1,-1,318,19,-2,-2,-2,-2,-2,-2,-9,682,606,-1,-1,-1,-1,0,0,2,0,-1,-1,2,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1984,ST,7,387558,16687,7552,855,4193,544,399303,18086,10872,622,207865,9003,189754,9133,38220,1422,3511,263,-1,-1,-1,-1,1868,95,-1,-1,0,0,6359,328,409357,18822,229477,10720,141660,6680,409357,18822,155230,11697,-1,-1,192765,13121,-2,-2,-2,-2,-2,-2,195454,339651,239215,-1,-1,-1,-1,20,1,552,8,-1,-1,93,3,17,0,-1,-1,-1,-1,117,1,148,3,-1,-1,0,0\n1984,US,5,410974,18076,9178,1042,8039,655,428491,19773,10872,622,229323,10105,199692,9981,46125,1781,4189,285,-1,-1,-1,-1,2061,119,-1,-1,0,0,6359,328,441624,20818,253839,12357,141660,6680,441624,20818,167833,12585,-1,-1,207598,14170,-2,-2,-2,-2,-2,-2,220376,370812,264137,-1,-1,-1,-1,20,1,611,12,-1,-1,101,3,19,1,-1,-1,-1,-1,127,1,148,3,-1,-1,0,0\n1984,FE,6,23416,1389,1626,187,3846,111,29188,1687,-9,-9,21458,1102,9938,848,7905,359,678,22,-1,-1,-1,-1,193,24,-1,-1,-9,-9,0,0,32267,1996,24362,1637,0,0,32267,1996,12603,888,-1,-1,14833,1049,-2,-2,-2,-2,-2,-2,24922,31161,24922,-1,-1,-1,-1,0,0,59,4,-1,-1,8,0,2,1,-1,-1,-1,-1,10,0,0,0,-1,-1,-9,-9\n1985,AL,3,9927,522,244,22,0,0,10171,544,382,16,4210,226,6227,333,1,0,5,3,-1,-1,-1,-1,11,0,-1,-1,-9,-9,0,0,10453,562,10452,562,0,0,10453,562,3795,338,-1,-1,3590,314,-2,-2,-2,-2,-2,-2,9787,9787,9787,-1,-1,-1,-1,0,0,0,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,23,0,-1,-1,-9,-9\n1985,AK,4,1205,45,91,12,530,46,1826,103,-9,-9,1238,71,198,20,4,1,749,31,-1,-1,-1,-1,22,0,-1,-1,-9,-9,0,0,2207,122,2203,121,0,0,2207,122,792,33,-1,-1,642,24,-2,-2,-2,-2,-2,-2,1968,1968,1968,-1,-1,-1,-1,-8,-8,2,0,-1,-1,1,0,1,1,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1985,AZ,4,7894,379,240,18,0,0,8134,397,-9,-9,6499,314,1297,65,2081,83,298,17,-1,-1,-1,-1,8,0,-1,-1,-9,-9,32,1,8134,397,6053,314,0,0,8134,397,3023,221,-1,-1,3281,217,-2,-2,-2,-2,-2,-2,6595,8452,-9,-1,-1,-1,-1,0,0,4,0,-1,-1,9,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1985,AR,3,4292,212,-9,-9,0,0,4292,212,115,0,2241,106,2153,111,23,0,0,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,4394,217,4371,217,0,0,4394,217,1528,153,-1,-1,2016,171,-2,-2,-2,-2,-2,-2,-9,4512,-9,-1,-1,-1,-1,0,0,10,0,-1,-1,1,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1985,CA,4,45804,2522,0,0,1444,388,47248,2910,995,127,29173,1854,16138,816,13014,779,179,66,-1,-1,-1,-1,63,3,-1,-1,-9,-9,1652,167,47205,2906,0,0,34191,2127,47205,2906,19170,1694,-1,-1,29092,2164,-2,-2,-2,-2,-2,-2,29702,45237,29702,-1,-1,-1,-1,0,0,37,1,-1,-1,16,0,0,0,-1,-1,-1,-1,15,0,0,0,-1,-1,-9,-9\n1985,CO,4,3238,148,-9,-9,0,0,3238,148,245,0,2534,90,665,40,802,31,27,1,-1,-1,-1,-1,12,0,-1,-1,-9,-9,0,0,3238,131,2436,100,0,0,3238,131,1798,133,-1,-1,2330,159,-2,-2,-2,-2,-2,-2,3381,3381,-9,-1,-1,-1,-1,0,0,2,0,-1,-1,0,0,1,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1985,CT,1,3808,147,822,99,1069,65,5699,311,-9,-9,2094,116,2620,145,1101,61,4,1,-1,-1,-1,-1,7,0,-1,-1,-9,-9,1101,61,5826,323,4725,262,0,0,5826,323,2224,81,-1,-1,2353,92,-2,-2,-2,-2,-2,-2,6072,4968,3781,-1,-1,-1,-1,0,0,0,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,11,0,-1,-1,-9,-9\n1985,DE,3,1485,56,208,17,394,32,2087,105,-9,-9,1063,44,1356,87,73,1,2,0,-1,-1,-1,-1,1,0,-1,-1,-9,-9,0,0,2422,131,2349,130,0,0,2422,131,629,43,-1,-1,660,47,-2,-2,-2,-2,-2,-2,-9,2207,2217,-1,-1,-1,-1,0,0,2,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1985,DC,3,4538,66,513,46,1125,116,6176,228,-9,-9,155,17,6021,211,0,0,0,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,6176,228,0,0,6176,228,6176,228,1554,108,-1,-1,2358,206,-2,-2,-2,-2,-2,-2,5711,6193,-9,-1,-1,-1,-1,-8,-8,0,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,24,0,-1,-1,-9,-9\n1985,FL,3,26772,1282,114,4,0,0,26886,1286,-9,-9,13747,583,13427,715,1993,95,0,0,-1,-1,-1,-1,122,6,-1,-1,-9,-9,0,0,27296,1304,25303,1209,0,0,27296,1304,13491,1034,-1,-1,13691,1002,-2,-2,-2,-2,-2,-2,29022,29022,33824,-1,-1,-1,-1,3,0,39,0,-1,-1,5,0,1,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1985,GA,3,14614,749,813,86,0,0,15427,835,-9,-9,6138,345,9043,488,0,0,-9,-9,-1,-1,-1,-1,-9,-9,-1,-1,-9,-9,-9,-9,15181,833,0,0,15181,833,15181,833,7283,575,-1,-1,8764,614,-2,-2,-2,-2,-2,-2,-9,16021,-9,-1,-1,-1,-1,3,0,21,0,-1,-1,5,0,-9,0,-1,-1,-1,-1,1,0,5,0,-1,-1,-9,-9\n1985,HI,4,1250,67,189,8,331,36,1770,111,-9,-9,491,13,98,4,70,3,8,4,-1,-1,-1,-1,982,63,-1,-1,-9,-9,384,64,1963,148,1607,90,286,55,1963,148,348,29,-1,-1,321,18,-2,-2,-2,-2,-2,-2,-9,1125,1162,-1,-1,-1,-1,-8,-8,0,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1985,ID,4,1266,51,0,0,0,0,1266,51,-9,-9,1215,43,31,1,125,3,41,7,-1,-1,-1,-1,6,0,-1,-1,-9,-9,0,0,1293,51,1168,48,0,0,1293,51,582,21,-1,-1,834,32,-2,-2,-2,-2,-2,-2,1315,1315,1022,-1,-1,-1,-1,0,0,0,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,2,0,-1,-1,-9,-9\n1985,IL,2,17626,653,-8,-8,0,0,17626,653,0,43,5828,224,10721,411,1320,25,18,7,-1,-1,-1,-1,4,1,-1,-1,-9,-9,1390,30,17961,673,16571,643,70,5,17961,673,7006,401,-1,-1,8705,562,-2,-2,-2,-2,-2,-2,19118,19118,15356,-1,-1,-1,-1,0,0,17,1,-1,-1,6,0,1,0,-1,-1,-1,-1,3,0,0,0,-1,-1,-9,-9\n1985,IN,2,9341,426,264,25,30,2,9635,453,-9,-9,6198,235,3249,215,85,3,6,1,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,9453,451,9368,448,0,0,9453,451,3835,300,-1,-1,3578,274,-2,-2,-2,-2,-2,-2,6628,-9,-9,-1,-1,-1,-1,1,0,10,1,-1,-1,4,0,2,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1985,IA,2,2577,110,-8,-8,-8,-8,2577,110,-9,-9,2088,89,545,23,44,2,35,2,-1,-1,-1,-1,4,0,-1,-1,-9,-9,44,2,2716,116,2672,114,0,0,2716,116,1372,84,-1,-1,2132,116,-2,-2,-2,-2,-2,-2,2816,2652,2572,-1,-1,-1,-1,-8,-8,3,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1985,KS,2,4313,252,0,0,8,0,4321,252,-9,-9,2827,148,1556,122,174,7,63,2,-1,-1,-1,-1,13,1,-1,-1,-9,-9,0,0,4459,273,4285,266,0,0,4459,273,1349,138,-1,-1,1603,138,-2,-2,-2,-2,-2,-2,3410,4939,-9,-1,-1,-1,-1,-8,-8,4,0,-1,-1,1,0,3,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1985,KY,3,4749,207,0,0,0,0,4749,207,800,26,3230,152,1520,72,0,0,1,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,4751,224,0,0,4751,224,4751,224,1877,165,-1,-1,2776,181,-2,-2,-2,-2,-2,-2,-9,5020,-9,-1,-1,-1,-1,0,0,7,0,-1,-1,2,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1985,LA,3,10603,374,0,0,0,0,10603,374,2677,246,3718,140,9562,470,0,0,0,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,13280,610,0,0,13280,610,13280,610,3325,222,-1,-1,3428,234,-2,-2,-2,-2,-2,-2,11017,11017,11017,-1,-1,-1,-1,1,0,15,1,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1985,ME,1,1008,20,83,7,0,0,1091,27,46,5,1161,32,15,0,2,0,18,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,1194,32,1192,32,0,0,1194,32,397,13,-1,-1,380,10,-2,-2,-2,-2,-2,-2,1033,1033,1033,-1,-1,-1,-1,-8,-8,4,0,-1,-1,0,0,0,0,-1,-1,-1,-1,2,0,0,0,-1,-1,-9,-9\n1985,MD,3,11822,361,646,50,0,0,12468,411,-9,-9,3476,133,9093,277,0,0,6,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,19,1,12594,411,0,0,12594,411,12594,411,3366,198,-1,-1,3954,236,-2,-2,-2,-2,-2,-2,-9,13328,9435,-1,-1,-1,-1,0,0,18,0,-1,-1,2,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1985,MA,1,4987,173,92,138,-9,63,5079,374,123,0,3326,201,1740,109,514,28,8,1,-1,-1,-1,-1,5,0,-1,-1,-9,-9,0,0,5079,311,4565,283,0,0,5079,311,1542,281,-1,-1,2593,290,-2,-2,-2,-2,-2,-2,3257,-9,-9,-1,-1,-1,-1,-8,-8,7,0,-1,-1,2,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1985,MI,2,16941,814,0,0,0,0,16941,814,-9,-9,7108,224,9497,579,199,7,80,2,-1,-1,-1,-1,-9,-9,-1,-1,-9,-9,256,9,16941,814,16742,807,0,0,16941,814,4779,314,-1,-1,4847,375,-2,-2,-2,-2,-2,-2,-9,14387,-9,-1,-1,-1,-1,-8,-8,12,0,-1,-1,4,0,1,0,-1,-1,-1,-1,5,0,14,0,-1,-1,-9,-9\n1985,MN,2,2408,87,0,0,0,0,2408,87,-9,-9,1504,59,480,22,84,2,174,7,-1,-1,-1,-1,3,1,-1,-1,-9,-9,91,2,2252,91,2166,89,2,0,2252,91,1161,82,-1,-1,1363,95,-2,-2,-2,-2,-2,-2,2410,2410,2546,-1,-1,-1,-1,-8,-8,2,0,-1,-1,2,1,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1985,MS,3,5122,242,82,13,0,0,5204,255,899,34,1831,109,4156,168,11,2,6,1,-1,-1,-1,-1,7,0,-1,-1,-9,-9,103,11,6103,289,5989,276,103,11,6103,289,2171,145,-1,-1,2562,129,-2,-2,-2,-2,-2,-2,5650,-9,-9,-1,-1,-1,-1,0,0,12,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1985,MO,2,9401,379,0,0,0,0,9401,379,-9,-9,5649,229,3766,152,0,0,0,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,9415,381,0,0,9415,381,9415,381,3187,210,-1,-1,3527,228,-2,-2,-2,-2,-2,-2,-9,10191,-9,-1,-1,-1,-1,0,0,0,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,20,0,-1,-1,-9,-9\n1985,MT,4,1057,39,0,0,0,0,1057,39,-9,-9,861,28,16,0,34,0,201,11,-1,-1,-1,-1,6,0,-1,-1,-9,-9,6,0,1090,39,1056,39,0,0,1090,39,362,18,-1,-1,358,32,-2,-2,-2,-2,-2,-2,749,1094,749,-1,-1,-1,-1,0,0,2,0,-1,-1,2,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1985,NE,2,1695,58,73,8,50,2,1818,68,-9,-9,1136,37,524,29,59,0,76,4,-1,-1,-1,-1,8,0,-1,-1,-9,-9,0,0,1744,70,1685,69,0,1,1744,70,581,33,-1,-1,496,48,-2,-2,-2,-2,-2,-2,1562,1513,1542,-1,-1,-1,-1,0,0,3,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1985,NV,4,3542,232,0,0,20,0,3562,232,-9,-9,2109,127,1123,117,210,5,35,5,-1,-1,-1,-1,35,5,-1,-1,-9,-9,210,5,3512,259,3302,254,0,0,3512,259,1355,120,-1,-1,1353,103,-2,-2,-2,-2,-2,-2,3729,3729,3000,-1,-1,-1,-1,1,0,3,0,-1,-1,2,0,0,0,-1,-1,-1,-1,2,0,0,0,-1,-1,-9,-9\n1985,NH,1,629,1,0,0,13,0,642,1,-9,-9,654,15,11,3,6,1,0,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,665,18,659,17,0,0,665,18,245,9,-1,-1,231,7,-2,-2,-2,-2,-2,-2,565,565,501,-1,-1,-1,-1,-8,-8,3,0,-1,-1,1,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1985,NJ,1,10940,388,0,0,0,0,10940,388,1470,16,3709,132,7238,245,1533,32,0,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,11,10947,388,9414,345,0,11,10947,388,3817,221,-1,-1,4651,270,-2,-2,-2,-2,-2,-2,-9,11564,9287,-1,-1,-1,-1,0,0,54,4,-1,-1,2,0,1,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1985,NM,4,1912,116,190,5,0,0,2102,121,-9,-9,1826,109,230,9,1098,63,68,3,-1,-1,-1,-1,4,0,-1,-1,-9,-9,59,5,2187,126,1030,58,59,5,2187,126,1244,125,-1,-1,1491,102,-2,-2,-2,-2,-2,-2,2390,-9,-9,-1,-1,-1,-1,0,0,0,0,-1,-1,1,0,0,0,-1,-1,-1,-1,3,0,0,0,-1,-1,-9,-9\n1985,NY,1,34273,1073,0,0,0,0,34273,1073,-9,-9,16518,514,16958,539,9016,257,56,2,-1,-1,-1,-1,93,0,-1,-1,-9,-9,31,1,33656,1056,24609,798,31,1,33656,1056,11925,495,-1,-1,13394,572,-2,-2,-2,-2,-2,-2,35934,35934,32714,-1,-1,-1,-1,-8,-8,135,6,-1,-1,6,0,5,0,-1,-1,-1,-1,4,0,7,0,-1,-1,-9,-9\n1985,NC,3,15349,658,1248,89,145,12,16742,759,-9,-9,7276,315,8930,411,0,0,332,20,-1,-1,-1,-1,0,0,-1,-1,-9,-9,59,1,16597,747,0,0,16597,747,16597,747,7764,510,-1,-1,7994,487,-2,-2,-2,-2,-2,-2,-9,16633,-9,-1,-1,-1,-1,0,0,17,0,-1,-1,2,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1985,ND,2,387,8,46,2,0,0,433,10,-9,-9,339,5,4,1,2,0,68,3,-1,-1,-1,-1,2,0,-1,-1,-9,-9,0,0,413,9,411,9,0,0,413,9,209,6,-1,-1,235,7,-2,-2,-2,-2,-2,-2,-9,471,471,-1,-1,-1,-1,-8,-8,0,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1985,OH,2,17834,942,1582,181,0,0,19416,1123,-9,-9,10523,463,8904,649,165,0,12,0,-1,-1,-1,-1,2,0,-1,-1,-9,-9,270,41,19711,1153,19276,1112,270,41,19711,1153,7841,792,-1,-1,8074,799,-2,-2,-2,-2,-2,-2,-9,-9,13282,-1,-1,-1,-1,0,0,23,0,-1,-1,0,1,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1985,OK,3,6706,402,-9,-9,0,0,6706,402,-9,-9,4952,307,2271,163,108,4,444,28,-1,-1,-1,-1,2,0,-1,-1,-9,-9,154,9,7823,507,7669,498,46,5,7823,507,3741,256,-1,-1,3653,243,-2,-2,-2,-2,-2,-2,7492,7117,-9,-1,-1,-1,-1,0,0,11,0,-1,-1,2,0,2,0,-1,-1,-1,-1,12,0,4,0,-1,-1,-9,-9\n1985,OR,4,3556,158,0,0,0,0,3556,158,-9,-9,3582,136,462,41,158,0,100,12,-1,-1,-1,-1,4,0,-1,-1,-9,-9,117,0,4265,189,4011,189,96,0,4265,189,1993,145,-1,-1,3245,236,-2,-2,-2,-2,-2,-2,2459,3688,2739,-1,-1,-1,-1,0,0,-9,-9,-1,-1,-9,-9,-9,-9,-1,-1,-1,-1,0,0,18,0,-1,-1,-9,-9\n1985,PA,1,13645,487,90,18,26,1,13761,506,-9,-9,5988,196,7731,304,0,0,6,0,-1,-1,-1,-1,2,0,-1,-1,-9,-9,0,0,13727,500,0,0,13727,500,13727,500,3878,205,-1,-1,4809,242,-2,-2,-2,-2,-2,-2,-9,-9,10690,-1,-1,-1,-1,0,0,29,3,-1,-1,2,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1985,RI,1,945,20,100,11,235,11,1280,42,-9,-9,903,23,362,16,100,3,0,0,-1,-1,-1,-1,3,0,-1,-1,-9,-9,0,0,1268,39,1168,36,0,0,1268,39,304,15,-1,-1,426,18,-2,-2,-2,-2,-2,-2,1456,1407,1359,-1,-1,-1,-1,-8,-8,1,0,-1,-1,1,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1985,SC,3,8791,411,544,53,29,1,9364,465,430,0,3953,206,6032,294,33,1,4,0,-1,-1,-1,-1,3,0,-1,-1,-9,-9,17,1,10009,501,7686,437,2290,63,10009,501,3455,295,-1,-1,4105,251,-2,-2,-2,-2,-2,-2,7976,7976,6927,-1,-1,-1,-1,1,0,12,2,-1,-1,2,0,1,0,-1,-1,-1,-1,2,0,1,0,-1,-1,-9,-9\n1985,SD,2,959,41,44,0,0,0,1003,41,-9,-9,760,25,21,1,9,0,227,13,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,1008,39,999,39,0,0,1008,39,508,38,-1,-1,464,36,-2,-2,-2,-2,-2,-2,1189,1090,1189,-1,-1,-1,-1,0,0,3,0,-1,-1,1,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1985,TN,3,6646,297,0,0,0,0,6646,297,628,-9,3716,188,3045,108,0,0,-9,-9,-1,-1,-1,-1,-9,-9,-1,-1,-9,-9,64,6,6825,302,0,0,6825,302,6825,302,3217,318,-1,-1,4685,350,-2,-2,-2,-2,-2,-2,7664,7664,-9,-1,-1,-1,-1,0,0,11,0,-1,-1,3,0,1,0,-1,-1,-1,-1,7,0,0,0,-1,-1,-9,-9\n1985,TX,3,35938,1594,0,0,0,0,35938,1594,-9,-9,21087,874,14828,720,7587,234,0,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,23,0,35938,1594,28351,1360,0,0,35938,1594,16995,1472,-1,-1,23959,1950,-2,-2,-2,-2,-2,-2,40134,38127,40134,-1,-1,-1,-1,6,0,62,0,-1,-1,8,0,6,0,-1,-1,-1,-1,27,0,1,0,-1,-1,-9,-9\n1985,UT,4,1560,63,10,0,36,1,1606,64,33,0,1384,53,142,7,282,10,32,3,-1,-1,-1,-1,12,0,-1,-1,-9,-9,0,0,1570,63,1288,53,0,0,1570,63,493,32,-1,-1,819,44,-2,-2,-2,-2,-2,-2,1457,1457,1372,-1,-1,-1,-1,0,0,1,0,-1,-1,3,0,1,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1985,VT,1,407,10,134,5,93,2,634,17,10,0,0,0,0,0,0,0,0,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,660,17,660,17,0,0,660,17,660,17,304,6,-1,-1,345,5,-2,-2,-2,-2,-2,-2,586,586,536,-1,-1,-1,-1,-8,-8,2,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1985,VA,3,10400,378,3,1,0,0,10403,379,723,63,4733,181,6825,286,0,0,-9,0,-1,-1,-1,-1,-9,0,-1,-1,-9,-9,46,2,11604,469,0,0,11604,469,11604,469,3895,263,-1,-1,3990,315,-2,-2,-2,-2,-2,-2,9617,9617,9351,-1,-1,-1,-1,2,0,31,0,-1,-1,1,0,1,0,-1,-1,-1,-1,1,0,42,0,-1,-1,-9,-9\n1985,WA,4,6266,202,0,0,0,0,6266,202,49,0,4712,151,1218,55,370,14,260,7,-1,-1,-1,-1,48,3,-1,-1,-9,-9,441,14,6679,230,6308,216,1,0,6679,230,1798,85,-1,-1,2599,155,-2,-2,-2,-2,-2,-2,5291,7278,5291,-1,-1,-1,-1,0,0,9,0,-1,-1,3,0,1,0,-1,-1,-1,-1,1,0,2,0,-1,-1,-9,-9\n1985,WV,3,1658,67,0,0,28,1,1686,68,-9,-9,1424,41,244,16,1,0,0,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,1668,57,1667,57,0,0,1668,57,790,34,-1,-1,717,34,-2,-2,-2,-2,-2,-2,1547,1640,1567,-1,-1,-1,-1,-8,-8,1,0,-1,-1,0,0,1,0,-1,-1,-1,-1,2,0,0,0,-1,-1,-9,-9\n1985,WI,2,4983,237,20,3,0,0,5003,240,89,0,3104,120,1954,118,302,5,124,12,-1,-1,-1,-1,2,0,-1,-1,-9,-9,6,2,5190,252,4882,245,6,2,5190,252,1835,134,-1,-1,2024,127,-2,-2,-2,-2,-2,-2,4089,-9,-9,-1,-1,-1,-1,-8,-8,0,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,2,0,-1,-1,-9,-9\n1985,WY,4,684,42,0,0,0,0,684,42,-9,-9,656,34,33,3,61,3,26,5,-1,-1,-1,-1,1,0,-1,-1,-9,-9,0,0,716,42,655,39,0,0,716,42,328,27,-1,-1,342,25,-2,-2,-2,-2,-2,-2,605,675,605,-1,-1,-1,-1,0,0,3,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1985,ST,7,417753,18268,8485,921,5606,779,431844,19968,9714,576,224647,10077,204280,9791,42854,1765,3799,281,-1,-1,-1,-1,1497,83,-1,-1,0,0,7235,463,441458,20695,250343,11881,148261,7049,441458,20695,170461,12670,-1,-1,205839,14386,-2,-2,-2,-2,-2,-2,285383,378108,268728,-1,-1,-1,-1,18,0,644,19,-1,-1,102,2,30,1,-1,-1,-1,-1,96,0,176,0,-1,-1,0,0\n1985,US,5,445061,20175,10269,1035,10158,895,465488,22105,9714,576,249418,11429,216344,10793,52460,2212,4480,310,-1,-1,-1,-1,1800,104,-1,-1,0,0,7235,463,479277,23099,278556,13838,148261,7049,479277,23099,184594,13905,-1,-1,219042,15454,-2,-2,-2,-2,-2,-2,311514,410693,294859,-1,-1,-1,-1,18,0,708,23,-1,-1,109,3,32,1,-1,-1,-1,-1,105,0,176,0,-1,-1,0,0\n1985,FE,6,27308,1907,1784,114,4552,116,33644,2137,-9,-9,24771,1352,12064,1002,9606,447,681,29,-1,-1,-1,-1,303,21,-1,-1,-9,-9,0,0,37819,2404,28213,1957,0,0,37819,2404,14133,1235,-1,-1,13203,1068,-2,-2,-2,-2,-2,-2,26131,32585,26131,-1,-1,-1,-1,0,0,64,4,-1,-1,7,1,2,0,-1,-1,-1,-1,9,0,0,0,-1,-1,-9,-9\n1986,AL,3,10915,522,179,22,-8,0,11094,544,487,27,4423,226,6657,387,5,0,5,3,-1,-1,-1,-1,9,0,-1,-1,-9,-9,0,0,11094,616,11089,616,0,0,11094,616,3088,249,-1,-1,3267,262,-2,-2,-2,-2,-2,-2,10374,10374,10374,-1,-1,-1,-1,1,0,0,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,45,0,-1,-1,-9,-9\n1986,AK,4,1597,45,190,12,557,46,2344,103,-9,-9,1313,65,211,10,47,2,797,40,-1,-1,-1,-1,23,1,-1,-1,-9,-9,0,0,2344,116,2297,114,0,0,2344,116,974,41,-1,-1,983,29,-2,-2,-2,-2,-2,-2,2336,-9,-9,-1,-1,-1,-1,-8,-8,3,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1986,AZ,4,8574,379,374,18,-8,0,8948,397,-9,-9,7148,378,1452,95,2323,108,322,13,-1,-1,-1,-1,14,0,-1,-1,-9,-9,12,0,8948,486,6625,378,0,0,8948,486,3463,250,-1,-1,3628,236,-2,-2,-2,-2,-2,-2,-9,9911,-9,-1,-1,-1,-1,0,0,16,0,-1,-1,7,0,0,0,-1,-1,-1,-1,3,0,0,0,-1,-1,-9,-9\n1986,AR,3,4477,212,-9,-9,-8,0,4477,212,458,0,2237,128,2238,96,20,0,2,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,4477,224,0,224,4457,0,4477,224,1591,138,-1,-1,2057,152,-2,-2,-2,-2,-2,-2,-9,4620,-9,-1,-1,-1,-1,0,0,10,0,-1,-1,0,0,1,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1986,CA,4,54512,2522,-8,0,1408,388,55920,2910,-9,-9,34038,2280,19549,982,15877,942,218,77,-1,-1,-1,-1,62,2,-1,-1,-9,-9,2053,223,55920,3564,0,0,40043,2622,55920,3564,22238,1986,-1,-1,36687,2839,-2,-2,-2,-2,-2,-2,32853,53887,32853,-1,-1,-1,-1,0,0,91,3,-1,-1,13,0,0,0,-1,-1,-1,-1,20,0,0,0,-1,-1,-9,-9\n1986,CO,4,3627,148,-9,-9,-8,0,3627,148,343,0,2796,119,786,57,920,34,36,1,-1,-1,-1,-1,9,0,-1,-1,-9,-9,0,0,3627,177,2707,143,0,0,3627,177,1986,127,-1,-1,2396,147,-2,-2,-2,-2,-2,-2,3760,3760,-9,-1,-1,-1,-1,0,0,4,0,-1,-1,2,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1986,CT,1,4165,147,941,99,1404,65,6510,311,-9,-9,2246,141,2890,194,1364,57,3,2,-1,-1,-1,-1,7,1,-1,-1,-9,-9,1364,57,6510,395,5146,338,0,0,6510,395,2270,87,-1,-1,2341,92,-2,-2,-2,-2,-2,-2,6072,4968,3781,-1,-1,-1,-1,0,0,0,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,11,0,-1,-1,-9,-9\n1986,DE,3,1863,56,353,17,461,32,2677,105,-9,-9,1117,53,1545,104,89,0,4,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,2666,157,2577,157,0,0,2666,157,653,56,-1,-1,717,47,-2,-2,-2,-2,-2,-2,-9,2563,2404,-1,-1,-1,-1,0,0,1,0,-1,-1,1,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1986,DC,3,4713,66,625,46,1031,116,6369,228,-9,-9,128,10,6241,239,0,0,0,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,6369,249,0,0,6369,249,6369,249,1410,91,-1,-1,2969,153,-2,-2,-2,-2,-2,-2,6769,6577,-9,-1,-1,-1,-1,-8,-8,0,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,21,2,-1,-1,-9,-9\n1986,FL,3,30594,1282,8,4,-8,0,30602,1286,-9,-9,15116,686,15486,949,2265,121,0,0,-1,-1,-1,-1,-9,-9,-1,-1,-9,-9,0,0,30602,1635,28337,1514,0,0,30602,1635,17420,1334,-1,-1,16062,1071,-2,-2,-2,-2,-2,-2,35982,32290,25561,-1,-1,-1,-1,3,0,50,2,-1,-1,3,0,1,0,-1,-1,-1,-1,5,0,0,0,-1,-1,-9,-9\n1986,GA,3,15067,749,958,86,-8,0,16025,835,-9,-9,6569,365,9847,582,0,0,-9,-9,-1,-1,-1,-1,-9,-9,-1,-1,-9,-9,-9,-9,16416,947,0,0,16416,947,16416,947,7818,627,-1,-1,8985,659,-2,-2,-2,-2,-2,-2,-9,16323,-9,-1,-1,-1,-1,1,0,18,0,-1,-1,5,0,-9,0,-1,-1,-1,-1,0,0,8,0,-1,-1,-9,-9\n1986,HI,4,1442,67,222,8,380,36,2044,111,-9,-9,530,34,101,11,58,2,8,3,-1,-1,-1,-1,1037,55,-1,-1,-9,-9,368,33,2044,136,1793,112,193,22,2044,136,472,29,-1,-1,407,36,-2,-2,-2,-2,-2,-2,1252,-9,1252,-1,-1,-1,-1,-8,-8,0,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1986,ID,4,1387,51,-8,0,-8,0,1387,51,0,0,1307,53,31,1,154,3,40,7,-1,-1,-1,-1,9,0,-1,-1,-9,-9,0,0,1387,61,1231,58,2,0,1387,61,573,40,-1,-1,763,45,-2,-2,-2,-2,-2,-2,1149,1470,1149,-1,-1,-1,-1,0,0,0,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,4,0,-1,-1,-9,-9\n1986,IL,2,18692,653,-9,-8,-8,0,18692,653,0,48,6112,248,11103,474,1456,34,20,7,-1,-1,-1,-1,1,1,-1,-1,-9,-9,1456,34,18692,764,17236,730,0,0,18692,764,7267,492,-1,-1,10007,652,-2,-2,-2,-2,-2,-2,19705,19705,15943,-1,-1,-1,-1,0,0,29,1,-1,-1,4,0,1,0,-1,-1,-1,-1,3,0,0,0,-1,-1,-9,-9\n1986,IN,2,9586,426,185,25,-8,2,9771,453,-9,-9,6546,211,3216,193,90,4,9,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,9771,404,9681,400,0,0,9771,404,3997,283,-1,-1,3969,348,-2,-2,-2,-2,-2,-2,8710,-9,-9,-1,-1,-1,-1,0,0,6,0,-1,-1,1,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1986,IA,2,2653,110,-8,-8,-8,-8,2653,110,-9,-9,2058,96,525,25,37,2,40,2,-1,-1,-1,-1,5,0,-1,-1,-9,-9,25,1,2653,124,2574,120,42,2,2653,124,1335,74,-1,-1,2098,98,-2,-2,-2,-2,-2,-2,-9,2702,2918,-1,-1,-1,-1,-8,-8,2,0,-1,-1,1,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1986,KS,2,5048,252,-8,0,-8,0,5048,252,-9,-9,3290,156,1681,138,212,7,62,3,-1,-1,-1,-1,15,0,-1,-1,-9,-9,0,0,5048,297,4836,290,0,0,5048,297,1377,154,-1,-1,1603,175,-2,-2,-2,-2,-2,-2,3502,5015,-9,-1,-1,-1,-1,-8,-8,6,1,-1,-1,2,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1986,KY,3,5067,207,-8,0,-8,0,5067,207,831,55,3421,133,1645,88,0,0,1,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,5067,221,0,0,5067,221,5067,221,1922,165,-1,-1,2705,205,-2,-2,-2,-2,-2,-2,4921,5327,-9,-1,-1,-1,-1,0,0,7,0,-1,-1,2,0,0,0,-1,-1,-1,-1,2,0,0,0,-1,-1,-9,-9\n1986,LA,3,13673,374,-8,0,-8,0,13673,374,2932,237,3828,144,9845,483,0,0,0,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,13673,627,0,0,13673,627,13673,627,3700,265,-1,-1,3768,268,-2,-2,-2,-2,-2,-2,11080,11080,11080,-1,-1,-1,-1,0,0,30,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1986,ME,1,1219,20,70,7,-8,0,1289,27,34,2,1270,27,11,0,2,0,8,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,1289,27,1287,27,0,0,1289,27,493,18,-1,-1,579,20,-2,-2,-2,-2,-2,-2,1033,1033,1033,-1,-1,-1,-1,-8,-8,2,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1986,MD,3,12179,361,703,50,-8,0,12882,411,-9,-9,3525,140,9333,304,0,0,7,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,17,0,12882,444,0,0,12882,444,12882,444,3745,238,-1,-1,4006,233,-2,-2,-2,-2,-2,-2,-9,13646,9544,-1,-1,-1,-1,0,0,17,0,-1,-1,4,0,0,0,-1,-1,-1,-1,2,0,0,0,-1,-1,-9,-9\n1986,MA,1,5205,173,105,138,-8,63,5310,374,102,0,3249,207,1721,90,617,40,10,2,-1,-1,-1,-1,9,0,-1,-1,-9,-9,321,27,5310,326,4693,286,0,0,5310,326,1638,173,-1,-1,3238,170,-2,-2,-2,-2,-2,-2,3265,-9,-9,-1,-1,-1,-1,-8,-8,7,0,-1,-1,4,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1986,MI,2,19724,814,-8,0,-8,0,19724,814,-9,-9,8224,306,11174,696,242,11,84,4,-1,-1,-1,-1,0,-9,-1,-1,-9,-9,242,12,19724,1018,19482,1007,0,0,19724,1018,5315,371,-1,-1,5307,364,-2,-2,-2,-2,-2,-2,-9,16784,-9,-1,-1,-1,-1,-8,-8,25,0,-1,-1,4,0,0,0,-1,-1,-1,-1,7,0,22,3,-1,-1,-9,-9\n1986,MN,2,2365,87,-8,0,-8,0,2365,87,-9,-9,1537,64,514,24,122,2,180,7,-1,-1,-1,-1,3,0,-1,-1,-9,-9,131,2,2365,97,2242,95,1,0,2365,97,1186,94,-1,-1,1437,109,-2,-2,-2,-2,-2,-2,2495,2495,2633,-1,-1,-1,-1,-8,-8,1,0,-1,-1,2,0,1,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1986,MS,3,6267,242,176,13,-8,0,6443,255,1106,63,1881,102,4432,191,7,0,9,2,-1,-1,-1,-1,6,0,-1,-1,-9,-9,115,9,6443,304,6321,295,115,9,6443,304,2161,176,-1,-1,2457,177,-2,-2,-2,-2,-2,-2,5878,-9,-9,-1,-1,-1,-1,0,0,12,1,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1986,MO,2,9856,379,-8,0,-8,0,9856,379,-9,-9,5914,272,3942,181,0,0,0,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,9856,453,0,0,9856,453,9856,453,3615,283,-1,-1,4607,287,-2,-2,-2,-2,-2,-2,-9,11588,-9,-1,-1,-1,-1,0,0,0,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,17,2,-1,-1,-9,-9\n1986,MT,4,1069,39,0,0,-8,0,1069,39,-9,-9,864,34,16,0,43,0,185,8,-1,-1,-1,-1,3,0,-1,-1,-9,-9,1,0,1069,42,1026,42,0,0,1069,42,411,20,-1,-1,548,29,-2,-2,-2,-2,-2,-2,936,1190,936,-1,-1,-1,-1,0,0,4,0,-1,-1,2,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1986,NE,2,1879,58,80,8,-8,2,1959,68,-9,-9,1246,52,539,31,57,1,71,2,-1,-1,-1,-1,12,0,-1,-1,-9,-9,0,0,1868,85,1811,84,0,0,1868,85,621,55,-1,-1,626,66,-2,-2,-2,-2,-2,-2,1562,1513,1542,-1,-1,-1,-1,0,0,0,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1986,NV,4,4326,232,-8,0,-8,0,4326,232,-9,-9,2438,146,1300,134,248,6,42,6,-1,-1,-1,-1,41,6,-1,-1,-9,-9,248,6,4069,298,3821,292,0,0,4069,298,1569,145,-1,-1,1348,125,-2,-2,-2,-2,-2,-2,-9,-9,3911,-1,-1,-1,-1,0,0,9,0,-1,-1,2,0,0,0,-1,-1,-1,-1,3,0,0,0,-1,-1,-9,-9\n1986,NH,1,760,1,-8,0,-8,0,760,1,-9,-9,738,20,21,2,16,1,0,0,-1,-1,-1,-1,1,0,-1,-1,-9,-9,0,0,760,22,744,21,0,0,760,22,308,9,-1,-1,301,7,-2,-2,-2,-2,-2,-2,689,689,539,-1,-1,-1,-1,-8,-8,2,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1986,NJ,1,11603,388,0,0,-8,0,11603,388,2162,82,4061,142,7542,267,1624,38,0,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,8,11603,417,9979,371,0,8,11603,417,3878,262,-1,-1,5013,291,-2,-2,-2,-2,-2,-2,10401,11394,9777,-1,-1,-1,-1,0,0,54,0,-1,-1,2,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1986,NM,4,2172,116,101,5,-8,0,2273,121,-9,-9,1978,129,205,10,1273,84,81,3,-1,-1,-1,-1,6,0,-1,-1,-9,-9,3,1,2273,143,997,58,3,1,2273,143,1266,96,-1,-1,1542,107,-2,-2,-2,-2,-2,-2,2363,2593,2363,-1,-1,-1,-1,0,0,0,0,-1,-1,0,0,0,1,-1,-1,-1,-1,4,0,0,0,-1,-1,-9,-9\n1986,NY,1,37123,1073,-8,0,-8,0,37123,1073,-9,-9,18121,621,18844,700,10005,364,56,2,-1,-1,-1,-1,102,3,-1,-1,-9,-9,0,0,37123,1326,27118,962,0,0,37123,1326,14198,721,-1,-1,14554,615,-2,-2,-2,-2,-2,-2,37743,39502,35891,-1,-1,-1,-1,-8,-8,155,4,-1,-1,2,0,2,0,-1,-1,-1,-1,7,0,12,0,-1,-1,-9,-9\n1986,NC,3,15666,658,1202,89,-8,12,16868,759,-9,-9,7219,385,9133,427,0,0,420,18,-1,-1,-1,-1,6,0,-1,-1,-9,-9,90,0,16868,830,0,0,16868,830,16868,830,8099,570,-1,-1,8724,550,-2,-2,-2,-2,-2,-2,-9,-9,16575,-1,-1,-1,-1,1,0,12,0,-1,-1,1,0,1,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1986,ND,2,352,8,58,2,-8,0,410,10,-9,-9,332,8,6,0,2,0,71,3,-1,-1,-1,-1,1,0,-1,-1,-9,-9,0,0,410,11,408,11,0,0,410,11,233,10,-1,-1,300,10,-2,-2,-2,-2,-2,-2,-9,471,471,-1,-1,-1,-1,-8,-8,0,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1986,OH,2,21250,942,-9,181,-8,0,21250,1123,-9,-9,10607,460,10415,693,220,0,10,0,-1,-1,-1,-1,4,0,-1,-1,-9,-9,214,60,21250,1213,20816,1153,214,60,21250,1213,8312,946,-1,-1,9058,1011,-2,-2,-2,-2,-2,-2,-9,-9,13282,-1,-1,-1,-1,0,0,28,2,-1,-1,0,0,0,0,-1,-1,-1,-1,6,0,0,0,-1,-1,-9,-9\n1986,OK,3,9021,402,-9,-9,-8,0,9021,402,-9,-9,5571,394,2621,236,145,4,519,40,-1,-1,-1,-1,8,0,-1,-1,-9,-9,198,9,8917,679,8719,670,53,5,8917,679,3916,382,-1,-1,3544,272,-2,-2,-2,-2,-2,-2,7642,7260,-9,-1,-1,-1,-1,0,0,11,1,-1,-1,2,0,1,1,-1,-1,-1,-1,6,0,2,0,-1,-1,-9,-9\n1986,OR,4,4532,158,-8,0,-8,0,4532,158,-9,-9,3862,182,529,43,205,3,115,12,-1,-1,-1,-1,5,0,-1,-1,-9,-9,21,1,4532,238,4327,235,0,0,4532,238,2337,176,-1,-1,3395,323,-2,-2,-2,-2,-2,-2,-9,4057,2815,-1,-1,-1,-1,0,0,5,0,-1,-1,2,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1986,PA,1,14585,487,25,18,-8,1,14610,506,-9,-9,6334,254,8268,337,0,0,6,0,-1,-1,-1,-1,2,0,-1,-1,-9,-9,0,0,14610,591,0,0,14610,591,14610,591,3751,283,-1,-1,4987,255,-2,-2,-2,-2,-2,-2,-9,-9,11048,-1,-1,-1,-1,0,0,25,2,-1,-1,7,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1986,RI,1,979,20,135,11,198,11,1312,42,-9,-9,924,33,384,13,115,1,4,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,1312,46,1197,45,0,0,1312,46,329,17,-1,-1,487,14,-2,-2,-2,-2,-2,-2,1456,1440,1359,-1,-1,-1,-1,-8,-8,3,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1986,SC,3,10490,411,585,53,-8,1,11075,465,448,3,4564,238,6489,362,25,1,2,0,-1,-1,-1,-1,4,1,-1,-1,-9,-9,16,0,11075,601,9122,576,1928,24,11075,601,3960,302,-1,-1,4226,291,-2,-2,-2,-2,-2,-2,9212,9212,8163,-1,-1,-1,-1,1,0,20,1,-1,-1,0,0,1,0,-1,-1,-1,-1,1,0,2,0,-1,-1,-9,-9\n1986,SD,2,1001,41,31,0,-8,0,1032,41,-9,-9,823,33,28,2,9,1,264,14,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,1115,49,1106,48,0,0,1115,49,593,52,-1,-1,589,50,-2,-2,-2,-2,-2,-2,1189,1090,1189,-1,-1,-1,-1,0,0,6,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1986,TN,3,7178,297,0,0,-8,0,7178,297,1201,-9,4030,262,3000,142,0,0,-9,-9,-1,-1,-1,-1,-9,-9,-1,-1,-9,-9,148,9,7178,413,0,0,7178,413,7178,413,2707,304,-1,-1,3090,233,-2,-2,-2,-2,-2,-2,7801,-9,-9,-1,-1,-1,-1,0,0,7,0,-1,-1,2,0,0,0,-1,-1,-1,-1,3,0,0,0,-1,-1,-9,-9\n1986,TX,3,36789,1594,-8,0,-8,0,36789,1594,-9,-9,13423,749,15207,750,8159,246,0,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,8159,246,36789,1745,28630,1499,0,0,36789,1745,20168,1963,-1,-1,29348,2340,-2,-2,-2,-2,-2,-2,40392,38373,40392,-1,-1,-1,-1,10,0,64,2,-1,-1,-9,0,-9,0,-1,-1,-1,-1,-9,0,-9,0,-1,-1,-9,-9\n1986,UT,4,1678,63,26,0,-8,1,1704,64,80,4,1586,65,143,5,283,12,36,1,-1,-1,-1,-1,9,0,-1,-1,-9,-9,0,0,1774,71,1491,59,0,0,1774,71,596,36,-1,-1,758,69,-2,-2,-2,-2,-2,-2,1805,1805,1537,-1,-1,-1,-1,0,0,3,0,-1,-1,1,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1986,VT,1,435,10,127,5,124,2,686,17,8,0,682,11,-9,0,0,0,-9,0,-1,-1,-1,-1,-9,0,-1,-1,-9,-9,4,0,686,11,0,0,686,11,686,11,322,2,-1,-1,422,8,-2,-2,-2,-2,-2,-2,597,597,547,-1,-1,-1,-1,-8,-8,0,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1986,VA,3,12081,378,361,1,-8,0,12442,379,1169,88,5101,196,7291,290,0,0,-9,-9,-1,-1,-1,-1,-9,-9,-1,-1,-9,-9,50,2,12442,488,0,0,12442,488,12442,488,4492,413,-1,-1,4671,445,-2,-2,-2,-2,-2,-2,10159,10159,9753,-1,-1,-1,-1,1,0,16,1,-1,-1,3,0,0,0,-1,-1,-1,-1,1,0,33,4,-1,-1,-9,-9\n1986,WA,4,6381,202,-8,0,-8,0,6381,202,62,0,4484,137,1182,59,360,6,242,16,-1,-1,-1,-1,46,1,-1,-1,-9,-9,427,9,6381,222,6021,216,0,0,6381,222,1829,110,-1,-1,2864,154,-2,-2,-2,-2,-2,-2,5324,6040,5324,-1,-1,-1,-1,0,0,10,1,-1,-1,4,0,1,0,-1,-1,-1,-1,1,0,2,0,-1,-1,-9,-9\n1986,WV,3,1405,67,-8,0,-8,1,1405,68,-9,-9,1204,55,201,22,1,0,0,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,1405,77,1404,77,0,0,1405,77,522,47,-1,-1,868,39,-2,-2,-2,-2,-2,-2,1547,1640,1547,-1,-1,-1,-1,-8,-8,1,0,-1,-1,0,0,0,0,-1,-1,-1,-1,7,0,0,0,-1,-1,-9,-9\n1986,WI,2,5435,237,16,3,-8,0,5451,240,-9,-9,3132,128,2136,137,330,16,121,14,-1,-1,-1,-1,3,0,-1,-1,-9,-9,23,3,5415,282,5051,264,34,2,5415,282,1963,150,-1,-1,2370,138,-2,-2,-2,-2,-2,-2,-9,4591,-9,-1,-1,-1,-1,-8,-8,0,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,8,0,-1,-1,-9,-9\n1986,WY,4,810,42,-8,0,-8,0,810,42,-9,-9,739,42,32,5,72,2,28,6,-1,-1,-1,-1,3,0,-1,-1,-9,-9,0,0,802,53,730,51,0,0,802,53,286,30,-1,-1,231,24,-2,-2,-2,-2,-2,-2,-9,950,-9,-1,-1,-1,-1,0,0,4,0,-1,-1,0,0,3,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1986,ST,7,463467,18268,7836,921,5563,779,476866,19968,11423,609,233886,11420,221708,11261,49099,2155,4138,318,-1,-1,-1,-1,1465,71,-1,-1,0,0,15706,752,476903,23822,264672,13638,163132,8029,476903,23822,188373,14942,-1,-1,230907,16340,-2,-2,-2,-2,-2,-2,301954,380684,289486,-1,-1,-1,-1,18,0,776,22,-1,-1,85,0,13,2,-1,-1,-1,-1,88,0,187,11,-1,-1,0,0\n1986,US,5,497540,20175,10769,1035,10132,895,518441,22105,11423,609,261658,13043,234430,12403,59908,2702,4928,363,-1,-1,-1,-1,1756,94,-1,-1,0,0,15706,752,518478,26655,295438,15924,163132,8029,518478,26655,203142,16240,-1,-1,245587,17594,-2,-2,-2,-2,-2,-2,329892,415574,317424,-1,-1,-1,-1,18,0,839,24,-1,-1,91,0,17,3,-1,-1,-1,-1,100,0,187,11,-1,-1,0,0\n1986,FE,6,34073,1907,2933,114,4569,116,41575,2137,-9,-9,27772,1623,12722,1142,10809,547,790,45,-1,-1,-1,-1,291,23,-1,-1,-9,-9,0,0,41575,2833,30766,2286,0,0,41575,2833,14769,1298,-1,-1,14680,1254,-2,-2,-2,-2,-2,-2,27938,34890,27938,-1,-1,-1,-1,0,0,63,2,-1,-1,6,0,4,1,-1,-1,-1,-1,12,0,0,0,-1,-1,-9,-9\n1987,AL,3,11667,689,187,38,0,0,11854,727,732,31,4803,283,7281,446,5,0,7,3,-1,-1,-1,-1,4,0,-1,-1,-9,-9,0,0,12095,732,12090,732,0,0,12095,732,3547,277,-1,-1,3506,239,-2,-2,-2,-2,-2,-2,11107,11107,11107,-1,-1,-1,-1,1,0,0,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,32,3,-1,-1,-9,-9\n1987,AK,4,1377,61,103,12,542,23,2022,96,-9,-9,1348,67,217,11,48,2,819,41,-1,-1,-1,-1,24,1,-1,-1,-9,-9,0,0,2408,120,2360,118,0,0,2408,120,825,43,-1,-1,922,38,-2,-2,-2,-2,-2,-2,-9,2356,-9,-1,-1,-1,-1,-8,-8,0,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1987,AZ,4,9978,580,361,29,0,0,10339,609,0,0,8260,472,1675,112,2808,141,379,25,-1,-1,-1,-1,16,0,-1,-1,-9,-9,9,0,10339,609,7522,468,9,0,10339,609,3987,311,-1,-1,3748,266,-2,-2,-2,-2,-2,-2,-9,10958,-9,-1,-1,-1,-1,0,0,19,0,-1,-1,4,0,2,0,-1,-1,-1,-1,2,0,0,0,-1,-1,-9,-9\n1987,AR,3,5075,248,-9,-9,0,0,5075,248,50,0,2634,152,2536,110,21,0,0,0,-1,-1,-1,-1,4,0,-1,-1,-9,-9,5,0,5179,262,0,262,5158,0,5179,262,2192,168,-1,-1,2261,167,-2,-2,-2,-2,-2,-2,-9,5400,-9,-1,-1,-1,-1,0,0,10,1,-1,-1,2,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1987,CA,4,61104,3708,0,0,1719,444,62823,4152,-9,-9,37923,2621,22184,1200,17765,1032,278,84,-1,-1,-1,-1,66,2,-1,-1,-9,-9,2372,245,62823,4152,0,0,45058,3120,62823,4152,24983,2362,-1,-1,48603,4008,-2,-2,-2,-2,-2,-2,-9,67424,41094,-1,-1,-1,-1,0,0,91,6,-1,-1,16,0,0,0,-1,-1,-1,-1,20,0,0,0,-1,-1,-9,-9\n1987,CO,4,4559,243,-9,-9,0,0,4559,243,208,0,3465,154,959,76,1155,46,36,2,-1,-1,-1,-1,9,0,-1,-1,-9,-9,96,11,4565,243,3314,186,96,11,4565,243,2219,163,-1,-1,2198,153,-2,-2,-2,-2,-2,-2,4597,-9,3560,-1,-1,-1,-1,0,0,5,0,-1,-1,1,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1987,CT,1,4120,160,723,96,1717,145,6560,401,-9,-9,2305,156,3070,213,1672,79,7,1,-1,-1,-1,-1,5,2,-1,-1,-9,-9,1672,80,7059,452,5387,372,0,1,7059,452,2650,99,-1,-1,2754,118,-2,-2,-2,-2,-2,-2,6072,4968,3781,-1,-1,-1,-1,0,0,0,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,11,0,-1,-1,-9,-9\n1987,DE,3,1932,89,213,30,451,26,2596,145,-9,-9,1173,65,1595,99,103,2,4,0,-1,-1,-1,-1,3,0,-1,-1,-9,-9,0,0,2775,164,2672,162,0,0,2775,164,686,51,-1,-1,801,73,-2,-2,-2,-2,-2,-2,-9,2763,2604,-1,-1,-1,-1,0,0,3,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1987,DC,3,5494,120,767,132,1034,98,7295,350,-9,-9,169,30,7126,320,0,0,0,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,7295,350,0,0,7295,350,7295,350,1818,160,-1,-1,3054,215,-2,-2,-2,-2,-2,-2,7032,7341,-9,-1,-1,-1,-1,-8,-8,0,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,34,3,-1,-1,-9,-9\n1987,FL,3,30149,1690,79,6,0,0,30228,1696,-9,-9,13857,761,16074,920,2394,77,15,0,-1,-1,-1,-1,19,0,-1,-1,-9,-9,799,0,30764,1681,28370,1604,0,0,30764,1681,23446,1969,-1,-1,25462,1996,-2,-2,-2,-2,-2,-2,36363,33140,25700,-1,-1,-1,-1,1,0,61,3,-1,-1,6,0,3,0,-1,-1,-1,-1,4,0,0,0,-1,-1,-9,-9\n1987,GA,3,16870,854,777,74,0,0,17647,928,-9,-9,6782,327,10865,601,0,0,-9,-9,-1,-1,-1,-1,-9,-9,-1,-1,-9,-9,-9,-9,17647,928,0,0,17647,928,17647,928,9416,782,-1,-1,10030,861,-2,-2,-2,-2,-2,-2,-9,17098,-9,-1,-1,-1,-1,5,0,41,2,-1,-1,6,0,-9,0,-1,-1,-1,-1,-9,0,4,0,-1,-1,-9,-9\n1987,HI,4,1359,76,180,17,430,37,1969,130,-9,-9,520,44,109,7,62,2,0,0,-1,-1,-1,-1,1051,48,-1,-1,-9,-9,430,59,2110,158,1813,114,235,42,2110,158,377,51,-1,-1,404,45,-2,-2,-2,-2,-2,-2,1670,-9,1670,-1,-1,-1,-1,-8,-8,3,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1987,ID,4,1271,70,0,0,0,0,1271,70,130,0,1286,70,25,0,148,1,36,6,-1,-1,-1,-1,11,0,-1,-1,-9,-9,1,0,1359,76,1210,75,1,0,1359,76,611,60,-1,-1,877,67,-2,-2,-2,-2,-2,-2,1149,1470,1149,-1,-1,-1,-1,0,0,0,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,3,0,-1,-1,-9,-9\n1987,IL,2,19071,779,-9,-9,0,0,19071,779,-9,-9,6103,265,11422,474,1526,31,18,7,-1,-1,-1,-1,2,2,-1,-1,-9,-9,1526,31,19071,779,17545,748,0,0,19071,779,7569,510,-1,-1,10426,682,-2,-2,-2,-2,-2,-2,19911,19911,16303,-1,-1,-1,-1,0,0,26,3,-1,-1,3,0,3,0,-1,-1,-1,-1,3,0,0,0,-1,-1,-9,-9\n1987,IN,2,10178,456,158,35,44,0,10380,491,-9,-9,7132,275,3192,216,117,6,12,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,10336,491,10219,485,0,0,10336,491,4224,329,-1,-1,3881,273,-2,-2,-2,-2,-2,-2,9802,-9,-9,-1,-1,-1,-1,0,0,12,1,-1,-1,1,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1987,IA,2,2729,122,-8,-8,-8,-8,2729,122,-9,-9,2093,93,573,26,45,2,3,0,-1,-1,-1,-1,42,2,-1,-1,-9,-9,18,1,2729,122,2649,118,35,2,2729,122,1367,109,-1,-1,2271,171,-2,-2,-2,-2,-2,-2,2918,2858,2918,-1,-1,-1,-1,-8,-8,2,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1987,KS,2,5596,275,0,0,4,0,5600,275,-9,-9,3342,147,1829,119,245,7,65,2,-1,-1,-1,-1,24,1,-1,-1,-9,-9,245,7,5505,276,5260,269,0,0,5505,276,1426,155,-1,-1,1907,214,-2,-2,-2,-2,-2,-2,3786,3786,-9,-1,-1,-1,-1,-8,-8,11,0,-1,-1,3,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1987,KY,3,5246,225,0,0,0,0,5246,225,898,67,3543,135,1702,90,0,0,1,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,5246,225,0,0,5246,225,5246,225,2077,121,-1,-1,2571,146,-2,-2,-2,-2,-2,-2,5170,5576,-9,-1,-1,-1,-1,0,0,3,2,-1,-1,1,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1987,LA,3,11111,393,0,0,0,0,11111,393,3504,280,4117,154,10585,519,0,0,0,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,14702,673,0,0,14702,673,14702,673,4901,375,-1,-1,4585,372,-2,-2,-2,-2,-2,-2,11738,11738,11738,-1,-1,-1,-1,8,0,19,1,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,27,3,-1,-1,-9,-9\n1987,ME,1,1174,23,58,3,0,0,1232,26,23,0,1265,25,15,0,3,0,19,1,-1,-1,-1,-1,3,0,-1,-1,-9,-9,0,0,1302,26,1299,26,0,0,1302,26,557,26,-1,-1,649,30,-2,-2,-2,-2,-2,-2,934,1237,934,-1,-1,-1,-1,-8,-8,4,1,-1,-1,2,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1987,MD,3,12353,392,483,63,0,0,12836,455,-9,-9,3597,130,9382,327,0,0,8,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,23,0,13010,457,0,0,13010,457,13010,457,4104,267,-1,-1,4311,265,-2,-2,-2,-2,-2,-2,-9,13874,10958,-1,-1,-1,-1,0,0,17,1,-1,-1,1,0,0,0,-1,-1,-1,-1,0,0,1,0,-1,-1,-9,-9\n1987,MA,1,5738,234,121,175,17,76,5876,485,142,0,3460,263,2001,91,798,79,12,0,-1,-1,-1,-1,19,0,-1,-1,-9,-9,367,55,5859,409,5059,330,2,0,5859,409,1891,234,-1,-1,3224,213,-2,-2,-2,-2,-2,-2,-9,-9,3790,-1,-1,-1,-1,-8,-8,11,1,-1,-1,1,0,1,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1987,MI,2,22696,1183,0,0,0,0,22696,1183,-9,-9,9533,363,12674,802,285,12,102,3,-1,-1,-1,-1,0,-9,-1,-1,-9,-9,387,15,22696,1183,22411,1171,0,0,22696,1183,6036,428,-1,-1,5663,410,-2,-2,-2,-2,-2,-2,-9,20076,-9,-1,-1,-1,-1,-8,-8,23,2,-1,-1,1,0,0,0,-1,-1,-1,-1,4,0,19,0,-1,-1,-9,-9\n1987,MN,2,2433,120,0,0,153,0,2586,120,-9,-9,1572,68,576,38,65,1,200,8,-1,-1,-1,-1,3,0,-1,-1,-9,-9,80,1,2431,115,2363,114,3,0,2431,115,1298,100,-1,-1,1626,102,-2,-2,-2,-2,-2,-2,2605,2605,2717,-1,-1,-1,-1,-8,-8,6,0,-1,-1,4,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1987,MS,3,5577,277,88,13,0,0,5665,290,892,33,1950,102,4542,220,14,0,9,1,-1,-1,-1,-1,4,0,-1,-1,-9,-9,52,0,6557,323,6491,323,52,0,6557,323,2174,161,-1,-1,2683,176,-2,-2,-2,-2,-2,-2,6375,-9,-9,-1,-1,-1,-1,2,0,14,0,-1,-1,1,0,2,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1987,MO,2,10728,629,0,0,0,0,10728,629,-9,-9,6359,328,4240,219,0,0,0,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,10599,547,0,0,10599,547,10599,547,4079,345,-1,-1,4937,338,-2,-2,-2,-2,-2,-2,-9,11357,-9,-1,-1,-1,-1,0,0,0,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,21,0,-1,-1,-9,-9\n1987,MT,4,1139,48,0,0,0,0,1139,48,-9,-9,922,33,22,0,41,0,192,14,-1,-1,-1,-1,2,0,-1,-1,-9,-9,2,0,1140,47,1099,47,0,0,1140,47,459,30,-1,-1,508,36,-2,-2,-2,-2,-2,-2,956,1190,956,-1,-1,-1,-1,0,0,0,0,-1,-1,1,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1987,NE,2,1948,77,111,17,70,1,2129,95,-9,-9,1367,55,547,34,61,1,67,5,-1,-1,-1,-1,10,1,-1,-1,-9,-9,0,0,1991,95,1930,94,0,0,1991,95,618,60,-1,-1,752,74,-2,-2,-2,-2,-2,-2,1562,1513,1542,-1,-1,-1,-1,0,0,6,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1987,NV,4,4041,262,0,0,65,3,4106,265,-9,-9,2530,159,1245,104,208,11,42,0,-1,-1,-1,-1,33,6,-1,-1,-9,-9,303,12,4153,281,3945,270,0,0,4153,281,1464,193,-1,-1,1948,165,-2,-2,-2,-2,-2,-2,-9,4132,3283,-1,-1,-1,-1,0,0,6,0,-1,-1,3,0,0,0,-1,-1,-1,-1,1,0,1,0,-1,-1,-9,-9\n1987,NH,1,827,1,0,0,17,0,844,1,-9,-9,827,15,21,3,19,1,1,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,849,18,830,17,0,0,849,18,301,6,-1,-1,334,16,-2,-2,-2,-2,-2,-2,689,689,539,-1,-1,-1,-1,-8,-8,0,0,-1,-1,0,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1987,NJ,1,13166,484,0,0,0,0,13166,484,2180,103,4481,165,8697,319,1977,44,0,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,13178,484,11201,440,0,0,13178,484,4764,338,-1,-1,5189,356,-2,-2,-2,-2,-2,-2,11571,12693,10877,-1,-1,-1,-1,0,0,71,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1987,NM,4,2456,130,77,7,2,0,2535,137,-9,-9,2215,131,257,15,1424,80,81,5,-1,-1,-1,-1,5,0,-1,-1,-9,-9,0,1,2558,152,1134,71,0,1,2558,152,1115,82,-1,-1,1261,98,-2,-2,-2,-2,-2,-2,2459,2689,2459,-1,-1,-1,-1,0,0,0,0,-1,-1,0,0,0,0,-1,-1,-1,-1,9,0,0,0,-1,-1,-9,-9\n1987,NY,1,39355,1487,0,0,0,0,39355,1487,-9,-9,19616,744,19576,735,11411,450,60,2,-1,-1,-1,-1,103,5,-1,-1,-9,-9,0,1,39355,1487,27944,1037,0,0,39355,1487,14850,802,-1,-1,17068,794,-2,-2,-2,-2,-2,-2,-9,41242,36462,-1,-1,-1,-1,-8,-8,205,3,-1,-1,3,0,3,0,-1,-1,-1,-1,6,0,10,0,-1,-1,-9,-9\n1987,NC,3,15415,703,995,105,174,12,16584,820,-9,-9,6873,361,8983,428,0,0,418,17,-1,-1,-1,-1,12,2,-1,-1,-9,-9,124,0,16410,808,0,0,16410,808,16410,808,8794,612,-1,-1,10261,686,-2,-2,-2,-2,-2,-2,16694,18000,-9,-1,-1,-1,-1,0,0,21,0,-1,-1,3,0,1,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1987,ND,2,400,32,47,3,0,0,447,35,-9,-9,359,6,4,0,4,0,59,1,-1,-1,-1,-1,1,0,-1,-1,-9,-9,0,0,423,7,419,7,0,0,423,7,264,8,-1,-1,281,13,-2,-2,-2,-2,-2,-2,-9,494,494,-1,-1,-1,-1,-8,-8,0,0,-1,-1,1,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1987,OH,2,22668,1275,-9,-9,0,0,22668,1275,-9,-9,11585,479,10576,762,0,0,0,0,-1,-1,-1,-1,1,0,-1,-1,-9,-9,203,47,22365,1288,0,0,22365,1288,22365,1288,9053,1037,-1,-1,9859,1071,-2,-2,-2,-2,-2,-2,-9,-9,17782,-1,-1,-1,-1,0,0,35,0,-1,-1,2,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1987,OK,3,7778,603,-9,-9,0,0,7778,603,-9,-9,5559,381,2675,264,150,4,510,40,-1,-1,-1,-1,8,0,-1,-1,-9,-9,193,9,8945,694,8752,685,43,5,8945,694,4691,394,-1,-1,5208,430,-2,-2,-2,-2,-2,-2,7643,7261,-9,-1,-1,-1,-1,0,0,20,0,-1,-1,5,1,4,0,-1,-1,-1,-1,4,0,0,0,-1,-1,-9,-9\n1987,OR,4,4131,178,0,0,0,0,4131,178,-9,-9,4361,233,670,58,221,6,119,15,-1,-1,-1,-1,7,0,-1,-1,-9,-9,18,1,5175,307,4954,301,0,0,5175,307,2323,223,-1,-1,3834,410,-2,-2,-2,-2,-2,-2,4201,4309,2815,-1,-1,-1,-1,0,0,9,0,-1,-1,0,0,2,0,-1,-1,-1,-1,0,0,2,0,-1,-1,-9,-9\n1987,PA,1,15590,668,8,13,23,0,15621,681,-9,-9,6753,288,8817,389,0,0,8,2,-1,-1,-1,-1,10,0,-1,-1,-9,-9,0,0,15588,679,0,0,15588,679,15588,679,3533,268,-1,-1,5031,269,-2,-2,-2,-2,-2,-2,-9,-9,12447,-1,-1,-1,-1,0,0,43,1,-1,-1,3,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1987,RI,1,975,24,114,39,270,18,1359,81,-9,-9,949,53,393,27,134,6,3,0,-1,-1,-1,-1,3,0,-1,-1,-9,-9,0,0,1348,80,1214,74,0,0,1348,80,253,6,-1,-1,464,19,-2,-2,-2,-2,-2,-2,1456,1489,1359,-1,-1,-1,-1,-8,-8,1,0,-1,-1,1,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1987,SC,3,9827,495,634,92,21,1,10482,588,464,4,4723,273,7242,384,32,3,7,1,-1,-1,-1,-1,3,0,-1,-1,-9,-9,28,3,12003,661,10430,611,1541,47,12003,661,3957,312,-1,-1,4555,347,-2,-2,-2,-2,-2,-2,10202,10202,9035,-1,-1,-1,-1,0,0,14,2,-1,-1,3,0,1,0,-1,-1,-1,-1,3,0,1,0,-1,-1,-9,-9\n1987,SD,2,1075,53,0,0,0,0,1075,53,-9,-9,810,32,24,2,10,0,246,19,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,1080,53,1070,53,0,0,1080,53,506,44,-1,-1,544,50,-2,-2,-2,-2,-2,-2,1189,1090,1189,-1,-1,-1,-1,0,0,2,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1987,TN,3,6887,362,0,0,0,0,6887,362,1610,-9,4052,254,3019,137,0,0,-9,-9,-1,-1,-1,-1,-9,-9,-1,-1,-9,-9,153,9,7224,400,0,0,7224,400,7224,400,1662,258,-1,-1,2458,342,-2,-2,-2,-2,-2,-2,-9,7744,-9,-1,-1,-1,-1,0,0,11,0,-1,-1,4,0,0,0,-1,-1,-1,-1,3,0,6,0,-1,-1,-9,-9\n1987,TX,3,37279,1542,0,0,0,0,37279,1542,-9,-9,13108,671,15780,652,8391,219,0,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,8391,219,37279,1542,28888,1323,0,0,37279,1542,20527,2023,-1,-1,31258,2957,-2,-2,-2,-2,-2,-2,40506,38481,40506,-1,-1,-1,-1,6,0,62,0,-1,-1,-9,0,-9,0,-1,-1,-1,-1,-9,0,-9,0,-1,-1,-9,-9\n1987,UT,4,1644,67,14,2,82,9,1740,78,102,4,1579,64,161,7,294,17,35,3,-1,-1,-1,-1,10,1,-1,-1,-9,-9,14,0,1799,75,1491,58,14,0,1799,75,495,28,-1,-1,768,44,-2,-2,-2,-2,-2,-2,-9,2182,1877,-1,-1,-1,-1,1,0,1,1,-1,-1,2,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1987,VT,1,482,8,122,4,126,2,730,14,10,0,745,14,-9,0,0,0,-9,0,-1,-1,-1,-1,-9,0,-1,-1,-9,-9,-9,0,745,14,0,0,745,14,745,14,385,5,-1,-1,388,1,-2,-2,-2,-2,-2,-2,597,597,547,-1,-1,-1,-1,-8,-8,0,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1987,VA,3,11125,397,0,0,0,0,11125,397,787,61,5283,211,7488,286,0,0,-9,-9,-1,-1,-1,-1,-9,-9,-1,-1,-9,-9,51,2,12822,499,0,0,12822,499,12822,499,5038,439,-1,-1,5634,475,-2,-2,-2,-2,-2,-2,10746,10746,9816,-1,-1,-1,-1,1,0,18,1,-1,-1,1,0,2,0,-1,-1,-1,-1,3,0,56,3,-1,-1,-9,-9\n1987,WA,4,6171,240,0,0,19,0,6190,240,46,0,3996,143,1129,49,426,6,242,8,-1,-1,-1,-1,65,3,-1,-1,-9,-9,479,17,5911,220,5485,214,0,0,5911,220,1992,132,-1,-1,3212,163,-2,-2,-2,-2,-2,-2,5838,5870,5838,-1,-1,-1,-1,0,0,9,0,-1,-1,2,0,0,0,-1,-1,-1,-1,2,0,0,0,-1,-1,-9,-9\n1987,WV,3,1380,69,0,0,28,0,1408,69,-9,-9,1190,48,200,21,1,0,0,0,-1,-1,-1,-1,2,0,-1,-1,-9,-9,0,0,1392,69,1391,69,0,0,1392,69,638,44,-1,-1,767,43,-2,-2,-2,-2,-2,-2,1547,1640,1547,-1,-1,-1,-1,-8,-8,1,0,-1,-1,0,0,0,0,-1,-1,-1,-1,3,0,0,0,-1,-1,-9,-9\n1987,WI,2,5538,292,15,2,0,0,5553,294,-9,-9,3395,145,2234,138,338,8,134,10,-1,-1,-1,-1,6,0,-1,-1,-9,-9,27,8,5796,301,5431,285,27,8,5796,301,2024,153,-1,-1,2349,156,-2,-2,-2,-2,-2,-2,4680,4680,-9,-1,-1,-1,-1,-8,-8,0,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,8,0,-1,-1,-9,-9\n1987,WY,4,870,46,0,0,0,0,870,46,-9,-9,710,31,30,8,91,5,37,2,-1,-1,-1,-1,2,0,-1,-1,-9,-9,91,5,870,46,779,41,0,0,870,46,284,24,-1,-1,260,29,-2,-2,-2,-2,-2,-2,-9,950,-9,-1,-1,-1,-1,0,0,1,0,-1,-1,1,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1987,ST,7,481752,23239,6435,1007,7008,895,495195,25141,11778,583,246579,12539,236239,12078,54512,2381,4291,328,-1,-1,-1,-1,1592,76,-1,-1,0,0,18159,839,506860,25860,256421,13374,195927,10105,506860,25860,208450,17177,-1,-1,267545,20682,-2,-2,-2,-2,-2,-2,253765,436926,301393,-1,-1,-1,-1,25,0,917,32,-1,-1,88,1,24,0,-1,-1,-1,-1,74,0,236,12,-1,-1,0,0\n1987,US,5,514507,25594,8572,1151,11934,1056,535013,27801,11778,583,277229,14377,249730,13228,66781,3029,5106,355,-1,-1,-1,-1,1909,88,-1,-1,0,0,18159,839,552133,28887,289425,15753,195927,10105,552133,28887,223352,18535,-1,-1,283001,22097,-2,-2,-2,-2,-2,-2,281619,472202,329247,-1,-1,-1,-1,25,0,991,37,-1,-1,96,1,30,1,-1,-1,-1,-1,91,0,236,12,-1,-1,0,0\n1987,FE,6,32755,2355,2137,144,4926,161,39818,2660,-9,-9,30650,1838,13491,1150,12269,648,815,27,-1,-1,-1,-1,317,12,-1,-1,-9,-9,0,0,45273,3027,33004,2379,0,0,45273,3027,14902,1358,-1,-1,15456,1415,-2,-2,-2,-2,-2,-2,27854,35276,27854,-1,-1,-1,-1,0,0,74,5,-1,-1,8,0,6,1,-1,-1,-1,-1,17,0,0,0,-1,-1,-9,-9\n1988,AL,3,11408,704,211,42,0,0,11619,746,442,29,4605,273,7244,478,5,0,5,1,-1,-1,-1,-1,4,0,-1,-1,-9,-9,0,0,11858,752,11853,752,0,0,11858,752,3842,388,-1,-1,5176,439,-2,-2,-2,-2,-2,-2,11162,11162,11162,-1,-1,-1,-1,0,0,0,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,26,1,-1,-1,-9,-9\n1988,AK,4,1604,57,87,10,509,40,2200,107,-9,-9,1380,68,271,20,49,2,789,34,-1,-1,-1,-1,25,1,-1,-1,-9,-9,0,0,2465,123,2416,121,0,0,2465,123,889,37,-1,-1,903,55,-2,-2,-2,-2,-2,-2,-9,2793,-9,-1,-1,-1,-1,-8,-8,2,0,-1,-1,1,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1988,AZ,4,10892,686,489,28,0,0,11381,714,428,57,9199,545,1775,132,3063,153,389,36,-1,-1,-1,-1,15,0,-1,-1,-9,-9,3,1,11381,714,8314,560,4,1,11381,714,4024,357,-1,-1,4111,332,-2,-2,-2,-2,-2,-2,-9,12240,12240,-1,-1,-1,-1,0,0,20,0,-1,-1,4,0,0,0,-1,-1,-1,-1,1,0,1,0,-1,-1,-9,-9\n1988,AR,3,5167,288,-9,-9,0,0,5167,288,335,5,2547,152,2646,140,29,2,0,1,-1,-1,-1,-1,2,0,-1,-1,-9,-9,29,2,5224,295,0,293,5195,0,5224,295,1893,233,-1,-1,2546,231,-2,-2,-2,-2,-2,-2,-9,5530,-9,-1,-1,-1,-1,0,0,11,1,-1,-1,2,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1988,CA,4,69379,4401,0,0,1899,492,71278,4893,-9,-9,41741,2962,26438,1520,19808,1192,-9,-9,-1,-1,-1,-1,-9,-9,-1,-1,-9,-9,3099,411,71278,4893,0,0,51470,3701,71278,4893,27401,2557,-1,-1,59657,4773,-2,-2,-2,-2,-2,-2,46279,70706,46279,-1,-1,-1,-1,0,0,144,2,-1,-1,21,0,2,0,-1,-1,-1,-1,9,0,0,0,-1,-1,-9,-9\n1988,CO,4,5402,244,-9,-9,0,0,5402,244,281,40,4138,176,1229,94,1438,49,60,2,-1,-1,-1,-1,12,0,-1,-1,-9,-9,49,5,5488,277,4001,223,49,5,5488,277,2204,142,-1,-1,2144,153,-2,-2,-2,-2,-2,-2,4985,5058,3538,-1,-1,-1,-1,0,0,4,0,-1,-1,3,0,0,0,-1,-1,-1,-1,1,0,2,0,-1,-1,-9,-9\n1988,CT,1,4174,206,737,128,2102,169,7013,503,-9,-9,2204,181,3541,253,1697,114,7,2,-1,-1,-1,-1,6,0,-1,-1,-9,-9,1697,114,7455,550,5758,436,0,0,7455,550,3315,291,-1,-1,4317,313,-2,-2,-2,-2,-2,-2,7731,7153,-9,-1,-1,-1,-1,0,0,-9,-9,-1,-1,-9,0,-9,0,-1,-1,-1,-1,-9,0,14,1,-1,-1,-9,-9\n1988,DE,3,2040,89,339,34,505,38,2884,161,-9,-9,1193,62,1823,114,92,6,2,0,-1,-1,-1,-1,2,1,-1,-1,-9,-9,0,0,3020,177,2928,171,0,0,3020,177,778,54,-1,-1,915,78,-2,-2,-2,-2,-2,-2,2090,2880,2090,-1,-1,-1,-1,0,0,5,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1988,DC,3,6049,129,476,80,1484,163,8009,372,-9,-9,254,15,8205,357,0,0,0,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,8459,372,0,0,8459,372,8459,372,1749,127,-1,-1,4222,242,-2,-2,-2,-2,-2,-2,7417,-9,-9,-1,-1,-1,-1,-8,-8,-9,-9,-1,-1,-9,0,-9,0,-1,-1,-1,-1,-9,0,17,0,-1,-1,-9,-9\n1988,FL,3,32328,1948,47,4,0,0,32375,1952,-9,-9,14640,1142,17510,869,2499,70,15,0,-1,-1,-1,-1,13,0,-1,-1,-9,-9,543,0,32721,2011,30222,1941,0,0,32721,2011,31008,2933,-1,-1,31582,2753,-2,-2,-2,-2,-2,-2,38894,35618,27418,-1,-1,-1,-1,2,0,76,5,-1,-1,2,0,1,0,-1,-1,-1,-1,4,0,0,0,-1,-1,-9,-9\n1988,GA,3,17145,873,713,56,0,0,17858,929,-9,-9,6429,372,11429,557,0,0,-9,-9,-1,-1,-1,-1,-9,-9,-1,-1,-9,-9,-9,-9,17858,929,0,0,17858,929,17858,929,7497,632,-1,-1,9591,750,-2,-2,-2,-2,-2,-2,-9,17296,-9,-1,-1,-1,-1,1,0,37,0,-1,-1,2,0,1,0,-1,-1,-1,-1,1,0,3,0,-1,-1,-9,-9\n1988,HI,4,1333,65,144,16,539,58,2016,139,-9,-9,632,70,140,4,85,1,14,0,-1,-1,-1,-1,1199,88,-1,-1,-9,-9,143,10,2128,172,2043,171,0,0,2128,172,409,29,-1,-1,461,49,-2,-2,-2,-2,-2,-2,-9,2130,1691,-1,-1,-1,-1,-8,-8,1,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1988,ID,4,1414,79,0,0,0,0,1414,79,200,0,1419,77,23,1,168,6,41,5,-1,-1,-1,-1,10,1,-1,-1,-9,-9,4,0,1497,84,1319,78,10,0,1497,84,701,39,-1,-1,865,48,-2,-2,-2,-2,-2,-2,1163,1406,1163,-1,-1,-1,-1,0,0,0,0,-1,-1,0,0,0,0,-1,-1,-1,-1,1,0,5,0,-1,-1,-9,-9\n1988,IL,2,20182,899,-9,-9,0,0,20182,899,-9,-9,6338,303,11975,541,1780,40,20,9,-1,-1,-1,-1,3,3,-1,-1,-9,-9,1846,43,20182,899,18336,856,66,3,20182,899,8075,609,-1,-1,9127,594,-2,-2,-2,-2,-2,-2,20100,20100,16492,-1,-1,-1,-1,0,0,30,0,-1,-1,4,0,3,0,-1,-1,-1,-1,5,0,0,0,-1,-1,-9,-9\n1988,IN,2,10773,498,131,4,38,0,10942,502,0,0,7524,281,3367,221,123,6,13,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,10904,502,10781,496,0,0,10904,502,4509,333,-1,-1,4227,323,-2,-2,-2,-2,-2,-2,10412,-9,-9,-1,-1,-1,-1,0,0,7,0,-1,-1,1,0,1,0,-1,-1,-1,-1,2,0,0,0,-1,-1,-9,-9\n1988,IA,2,2894,140,-8,-8,-8,-8,2894,140,-9,-9,2199,94,629,42,49,0,43,4,-1,-1,-1,-1,4,0,-1,-1,-9,-9,19,0,2894,140,2536,110,309,30,2894,140,1453,132,-1,-1,2378,195,-2,-2,-2,-2,-2,-2,2918,2858,2918,-1,-1,-1,-1,-8,-8,2,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1988,KS,2,5658,272,0,0,2,0,5660,272,-9,-9,3348,145,1857,120,246,6,70,3,-1,-1,-1,-1,19,3,-1,-1,-9,-9,246,6,5540,277,5294,271,0,0,5540,277,1726,186,-1,-1,2690,240,-2,-2,-2,-2,-2,-2,-9,4293,-9,-1,-1,-1,-1,-8,-8,15,1,-1,-1,0,0,1,0,-1,-1,-1,-1,2,0,0,0,-1,-1,-9,-9\n1988,KY,3,5947,240,0,0,0,0,5947,240,824,108,4712,227,2058,121,0,0,1,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,6771,348,0,0,6771,348,6771,348,2394,261,-1,-1,3027,284,-2,-2,-2,-2,-2,-2,6602,6469,-9,-1,-1,-1,-1,0,0,13,0,-1,-1,1,0,1,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1988,LA,3,11611,499,0,0,0,0,11611,499,3962,170,4360,153,11213,516,0,0,0,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,15573,669,0,0,15573,669,15573,669,4401,298,-1,-1,4458,337,-2,-2,-2,-2,-2,-2,12330,12330,12330,-1,-1,-1,-1,3,0,24,1,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1988,ME,1,1176,26,56,7,20,0,1252,33,21,1,1221,35,15,1,0,0,5,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,1241,36,1241,36,0,0,1241,36,490,20,-1,-1,634,21,-2,-2,-2,-2,-2,-2,934,934,934,-1,-1,-1,-1,-8,-8,5,0,-1,-1,1,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1988,MD,3,12929,460,642,53,0,0,13571,513,-9,-9,3701,160,10031,352,0,0,7,2,-1,-1,-1,-1,0,0,-1,-1,-9,-9,21,2,13760,516,0,0,13760,516,13760,516,4701,336,-1,-1,4692,283,-2,-2,-2,-2,-2,-2,-9,14561,11352,-1,-1,-1,-1,0,0,19,2,-1,-1,1,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1988,MA,1,6195,260,115,187,5,100,6315,547,298,5,3602,268,2215,110,972,86,9,1,-1,-1,-1,-1,22,0,-1,-1,-9,-9,462,68,6310,447,5338,361,0,0,6310,447,1903,238,-1,-1,3646,238,-2,-2,-2,-2,-2,-2,-9,-9,3891,-1,-1,-1,-1,-8,-8,20,1,-1,-1,1,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1988,MI,2,26279,1333,0,0,0,0,26279,1333,-9,-9,10787,431,14939,875,335,21,101,3,-1,-1,-1,-1,12,0,-1,-1,-9,-9,440,24,26279,1333,25944,1312,0,0,26279,1333,7535,490,-1,-1,7038,487,-2,-2,-2,-2,-2,-2,21454,-9,-9,-1,-1,-1,-1,-8,-8,27,0,-1,-1,3,0,0,0,-1,-1,-1,-1,4,0,14,1,-1,-1,-9,-9\n1988,MN,2,2677,130,0,0,135,0,2812,130,-9,-9,1664,68,707,50,74,1,207,9,-1,-1,-1,-1,3,0,-1,-1,-9,-9,90,1,2671,128,2594,127,3,0,2671,128,1560,130,-1,-1,1791,153,-2,-2,-2,-2,-2,-2,2964,2964,2976,-1,-1,-1,-1,-8,-8,5,0,-1,-1,3,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1988,MS,3,5968,309,55,16,0,0,6023,325,1007,29,2095,112,4898,242,16,0,10,0,-1,-1,-1,-1,7,0,-1,-1,-9,-9,20,0,7030,354,6994,354,20,0,7030,354,2240,191,-1,-1,2436,208,-2,-2,-2,-2,-2,-2,6651,6318,6511,-1,-1,-1,-1,0,0,20,1,-1,-1,3,0,1,0,-1,-1,-1,-1,2,0,0,0,-1,-1,-9,-9\n1988,MO,2,11546,630,0,0,0,0,11546,630,-9,-9,6154,336,5369,292,85,5,16,1,-1,-1,-1,-1,6,1,-1,-1,-9,-9,1,0,11546,630,11461,625,0,0,11546,630,4382,286,-1,-1,5378,508,-2,-2,-2,-2,-2,-2,-9,12800,-9,-1,-1,-1,-1,0,0,10,0,-1,-1,2,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1988,MT,4,1192,57,0,0,0,0,1192,57,-9,-9,964,42,17,0,46,3,230,16,-1,-1,-1,-1,1,0,-1,-1,-9,-9,2,0,1214,58,1166,55,2,0,1214,58,255,42,-1,-1,462,41,-2,-2,-2,-2,-2,-2,784,1073,784,-1,-1,-1,-1,0,0,2,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1988,NE,2,1961,87,71,12,29,1,2061,100,-9,-9,1396,52,593,38,68,1,62,7,-1,-1,-1,-1,0,0,-1,-1,-9,-9,8,0,2059,97,1991,96,0,0,2059,97,731,78,-1,-1,880,95,-2,-2,-2,-2,-2,-2,-9,-9,1651,-1,-1,-1,-1,0,0,4,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1988,NV,4,4470,331,0,0,97,4,4567,335,-9,-9,2624,197,1421,118,372,18,59,3,-1,-1,-1,-1,36,5,-1,-1,-9,-9,399,19,4539,342,4167,324,0,0,4539,342,1796,209,-1,-1,1898,196,-2,-2,-2,-2,-2,-2,-9,4637,3731,-1,-1,-1,-1,0,0,5,0,-1,-1,5,0,1,0,-1,-1,-1,-1,2,0,0,0,-1,-1,-9,-9\n1988,NH,1,954,5,0,0,24,0,978,5,-9,-9,962,22,32,2,32,2,0,0,-1,-1,-1,-1,1,0,-1,-1,-9,-9,0,0,995,24,963,22,0,0,995,24,398,15,-1,-1,349,11,-2,-2,-2,-2,-2,-2,774,998,572,-1,-1,-1,-1,-8,-8,3,0,-1,-1,1,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1988,NJ,1,14079,573,0,0,0,0,14079,573,2136,131,5587,224,9393,412,2454,74,4,0,-1,-1,-1,-1,8,0,-1,-1,-9,-9,1240,68,16232,704,13144,581,634,49,16232,704,4790,361,-1,-1,6340,400,-2,-2,-2,-2,-2,-2,12172,13324,11441,-1,-1,-1,-1,0,0,69,3,-1,-1,3,0,1,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1988,NM,4,2513,130,91,11,0,0,2604,141,-9,-9,2310,131,284,13,1475,80,77,6,-1,-1,-1,-1,4,0,-1,-1,-9,-9,0,0,2675,150,1200,70,0,0,2675,150,1038,80,-1,-1,1781,142,-2,-2,-2,-2,-2,-2,2671,2751,2671,-1,-1,-1,-1,-9,0,-9,-9,-1,-1,-9,0,-9,0,-1,-1,-1,-1,-9,0,4,0,-1,-1,-9,-9\n1988,NY,1,42800,1760,0,0,0,0,42800,1760,-9,-9,21121,923,21495,825,12982,604,80,5,-1,-1,-1,-1,104,7,-1,-1,-9,-9,0,0,42800,1760,29818,1156,0,0,42800,1760,16372,1014,-1,-1,19005,904,-2,-2,-2,-2,-2,-2,-9,45141,40095,-1,-1,-1,-1,-8,-8,219,10,-1,-1,4,0,0,0,-1,-1,-1,-1,4,0,14,0,-1,-1,-9,-9\n1988,NC,3,15555,696,740,87,190,24,16485,807,-9,-9,6487,333,9256,424,0,0,409,20,-1,-1,-1,-1,8,2,-1,-1,-9,-9,135,4,16295,783,0,0,16295,783,16295,783,9978,735,-1,-1,11635,833,-2,-2,-2,-2,-2,-2,18668,14767,-9,-1,-1,-1,-1,0,0,31,0,-1,-1,1,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1988,ND,2,449,24,50,2,0,0,499,26,-9,-9,376,6,7,0,5,0,74,1,-1,-1,-1,-1,1,1,-1,-1,-9,-9,0,0,458,8,453,8,0,0,458,8,261,10,-1,-1,263,8,-2,-2,-2,-2,-2,-2,-9,516,516,-1,-1,-1,-1,-8,-8,2,0,-1,-1,1,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1988,OH,2,24589,1524,-9,-9,0,0,24589,1524,-9,-9,12689,637,12196,940,0,0,0,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,24885,1577,0,0,24885,1577,24885,1577,10263,1261,-1,-1,10632,1124,-2,-2,-2,-2,-2,-2,-9,-9,18482,-1,-1,-1,-1,0,0,22,1,-1,-1,11,0,2,0,-1,-1,-1,-1,2,0,0,0,-1,-1,-9,-9\n1988,OK,3,8297,624,-9,-9,0,0,8297,624,-9,-9,5791,385,3003,284,282,13,583,43,-1,-1,-1,-1,0,1,-1,-1,-9,-9,340,18,9717,731,9377,713,58,5,9717,731,5072,467,-1,-1,4735,486,-2,-2,-2,-2,-2,-2,-9,7378,-9,-1,-1,-1,-1,0,0,19,1,-1,-1,2,0,1,0,-1,-1,-1,-1,2,0,4,0,-1,-1,-9,-9\n1988,OR,4,4489,214,0,0,0,0,4489,214,0,0,4485,255,703,62,302,10,122,17,-1,-1,-1,-1,12,1,-1,-1,-9,-9,322,12,5644,347,5342,337,0,0,5644,347,2421,252,-1,-1,4397,543,-2,-2,-2,-2,-2,-2,4077,4722,2746,-1,-1,-1,-1,0,0,5,0,-1,-1,2,0,3,0,-1,-1,-1,-1,0,0,2,0,-1,-1,-9,-9\n1988,PA,1,17130,760,6,11,21,1,17157,772,-9,-9,7318,306,9785,459,0,0,10,1,-1,-1,-1,-1,15,0,-1,-1,-9,-9,5,1,17133,767,0,0,17133,767,17133,767,3819,315,-1,-1,5128,334,-2,-2,-2,-2,-2,-2,-9,-9,12972,-1,-1,-1,-1,0,0,38,2,-1,-1,7,0,0,0,-1,-1,-1,-1,2,0,0,0,-1,-1,-9,-9\n1988,RI,1,1147,40,231,52,413,35,1791,127,-9,-9,1153,61,619,62,216,11,4,1,-1,-1,-1,-1,6,0,-1,-1,-9,-9,0,0,1782,124,1566,113,0,0,1782,124,410,22,-1,-1,464,21,-2,-2,-2,-2,-2,-2,1546,1579,1449,-1,-1,-1,-1,-8,-8,6,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1988,SC,3,11505,559,839,91,8,0,12352,650,434,4,4918,307,8131,489,28,2,7,1,-1,-1,-1,-1,2,0,-1,-1,-9,-9,31,2,13089,799,11709,769,1352,28,13089,799,3982,396,-1,-1,4451,339,-2,-2,-2,-2,-2,-2,11793,11793,9443,-1,-1,-1,-1,0,0,27,0,-1,-1,0,0,1,0,-1,-1,-1,-1,2,0,0,0,-1,-1,-9,-9\n1988,SD,2,976,54,0,0,0,0,976,54,-9,-9,710,23,28,3,10,1,236,20,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,974,46,964,45,0,0,974,46,486,42,-1,-1,708,58,-2,-2,-2,-2,-2,-2,1170,1090,1189,-1,-1,-1,-1,0,0,1,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1988,TN,3,6957,397,0,0,0,0,6957,397,2218,-9,4134,241,2972,156,0,0,-9,-9,-1,-1,-1,-1,-9,-9,-1,-1,-9,-9,224,5,7330,402,0,0,7330,402,7330,402,1284,208,-1,-1,1971,258,-2,-2,-2,-2,-2,-2,-9,7754,-9,-1,-1,-1,-1,0,0,15,0,-1,-1,1,0,0,0,-1,-1,-1,-1,4,0,0,0,-1,-1,-9,-9\n1988,TX,3,38789,1648,0,0,0,0,38789,1648,-9,-9,13192,690,16956,722,8551,231,1,2,-1,-1,-1,-1,0,0,-1,-1,-9,-9,8640,234,38789,1648,30238,1417,0,0,38789,1648,19345,1868,-1,-1,30638,2485,-2,-2,-2,-2,-2,-2,41319,39244,41319,-1,-1,-1,-1,3,0,-9,-9,-1,-1,-9,0,-9,0,-1,-1,-1,-1,-9,0,58,0,-1,-1,-9,-9\n1988,UT,4,1851,92,15,2,80,17,1946,111,49,0,1619,74,167,7,280,15,32,6,-1,-1,-1,-1,21,1,-1,-1,-9,-9,33,1,1872,89,1559,73,33,1,1872,89,523,55,-1,-1,912,74,-2,-2,-2,-2,-2,-2,-9,2464,2210,-1,-1,-1,-1,1,0,2,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1988,VT,1,484,19,134,5,124,4,742,28,34,0,792,28,-9,-9,0,0,-9,-9,-1,-1,-1,-1,-9,-9,-1,-1,-9,-9,-9,-9,792,28,0,0,792,28,792,28,415,10,-1,-1,448,1,-2,-2,-2,-2,-2,-2,597,597,597,-1,-1,-1,-1,-8,-8,0,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1988,VA,3,12361,426,0,0,0,0,12361,426,874,86,5302,241,8239,341,0,0,-9,-9,-1,-1,-1,-1,-9,-9,-1,-1,-9,-9,55,6,13596,588,0,0,13596,588,13596,588,5513,525,-1,-1,5594,500,-2,-2,-2,-2,-2,-2,11460,11460,11460,-1,-1,-1,-1,1,0,24,0,-1,-1,1,0,1,0,-1,-1,-1,-1,2,0,51,0,-1,-1,-9,-9\n1988,WA,4,6726,302,15,0,45,1,6786,303,-9,-9,3529,168,1225,57,490,9,206,5,-1,-1,-1,-1,67,6,-1,-1,-9,-9,540,13,5567,249,5077,240,0,0,5567,249,2576,189,-1,-1,3355,193,-2,-2,-2,-2,-2,-2,5914,6523,5914,-1,-1,-1,-1,0,0,4,0,-1,-1,4,0,3,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1988,WV,3,1389,66,0,-8,27,0,1416,66,-9,-9,1188,50,199,16,1,0,1,0,-1,-1,-1,-1,1,0,-1,-1,-9,-9,0,0,1389,66,1388,66,0,0,1389,66,558,37,-1,-1,658,42,-2,-2,-2,-2,-2,-2,1547,1640,1547,-1,-1,-1,-1,-8,-8,0,0,-1,-1,0,0,0,0,-1,-1,-1,-1,2,0,0,0,-1,-1,-9,-9\n1988,WI,2,5869,266,23,1,0,0,5892,267,0,0,3637,148,2244,119,357,9,133,7,-1,-1,-1,-1,9,0,-1,-1,-9,-9,48,8,6071,282,5646,270,68,3,6071,282,1975,143,-1,-1,2385,191,-2,-2,-2,-2,-2,-2,4683,-9,4683,-1,-1,-1,-1,-8,-8,4,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1988,WY,4,880,65,0,0,0,0,880,65,-9,-9,698,45,52,11,82,5,46,4,-1,-1,-1,-1,2,0,-1,-1,-9,-9,82,5,880,65,798,60,0,0,880,65,286,21,-1,-1,322,16,-2,-2,-2,-2,-2,-2,-9,950,-9,-1,-1,-1,-1,0,0,4,0,-1,-1,1,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1988,ST,7,519582,26184,6457,939,8296,1147,534335,28270,13543,665,261068,14297,260564,13582,60646,2848,4200,278,-1,-1,-1,-1,1662,122,-1,-1,0,0,20816,1083,548310,29362,285939,15709,201725,10805,548310,29362,225626,19684,-1,-1,297423,23382,-2,-2,-2,-2,-2,-2,323261,438000,338457,-1,-1,-1,-1,11,0,1003,31,-1,-1,99,0,24,0,-1,-1,-1,-1,58,0,215,3,-1,-1,0,0\n1988,US,5,554929,28687,8203,1060,12538,1393,575670,31140,13543,665,292534,16178,274570,14892,72784,3616,5040,310,-1,-1,-1,-1,2036,141,-1,-1,0,0,20816,1083,594996,32604,320487,18183,201725,10805,594996,32604,240060,21182,-1,-1,311942,24880,-2,-2,-2,-2,-2,-2,352373,475469,367569,-1,-1,-1,-1,11,0,1100,36,-1,-1,109,0,30,0,-1,-1,-1,-1,67,0,215,3,-1,-1,0,0\n1988,FE,6,35347,2503,1746,121,4242,246,41335,2870,-9,-9,31466,1881,14006,1310,12138,768,840,32,-1,-1,-1,-1,374,19,-1,-1,-9,-9,0,0,46686,3242,34548,2474,0,0,46686,3242,14434,1498,-1,-1,14519,1498,-2,-2,-2,-2,-2,-2,29112,37469,29112,-1,-1,-1,-1,0,0,97,5,-1,-1,10,0,6,0,-1,-1,-1,-1,9,0,0,0,-1,-1,-9,-9\n1989,AL,3,12486,801,294,38,0,0,12780,839,792,32,4998,326,8056,519,1,0,4,0,-1,-1,-1,-1,3,0,-1,-1,-9,-9,1,0,13062,845,13061,845,0,0,13062,845,4432,520,-1,-1,5009,574,-2,-2,-2,-2,-2,-2,11662,11662,11662,-1,-1,-1,-1,4,0,0,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,29,2,-1,-1,-9,-9\n1989,AK,4,1649,76,108,9,587,55,2344,140,-9,-9,1420,88,310,19,65,4,827,51,-1,-1,-1,-1,26,3,-1,-1,-9,-9,0,0,2583,161,2518,157,0,0,2583,161,874,73,-1,-1,968,51,-2,-2,-2,-2,-2,-2,2596,-9,-9,-1,-1,-1,-1,-8,-8,0,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1989,AZ,4,11975,751,496,29,0,0,12471,780,110,7,10036,580,2033,164,3207,141,387,34,-1,-1,-1,-1,12,1,-1,-1,-9,-9,3,1,12471,780,9264,639,0,0,12471,780,4844,416,-1,-1,4568,445,-2,-2,-2,-2,-2,-2,-9,13304,-9,-1,-1,-1,-1,0,0,17,1,-1,-1,2,0,2,0,-1,-1,-1,-1,1,0,3,0,-1,-1,-9,-9\n1989,AR,3,5390,284,99,4,0,0,5489,288,335,84,2877,183,3126,187,33,1,0,1,-1,-1,-1,-1,0,0,-1,-1,-9,-9,33,2,6036,373,5923,370,80,2,6036,373,2395,188,-1,-1,2938,260,-2,-2,-2,-2,-2,-2,-9,5790,-9,-1,-1,-1,-1,0,0,12,0,-1,-1,0,0,0,0,-1,-1,-1,-1,2,0,0,0,-1,-1,-9,-9\n1989,CA,4,78911,5427,0,0,2386,573,81297,6000,-9,-9,47496,3401,30066,2175,23137,1356,-9,-9,-1,-1,-1,-1,-9,-9,-1,-1,-9,-9,3735,424,81297,6000,0,0,58160,4644,81297,6000,31296,3359,-1,-1,70457,6040,-2,-2,-2,-2,-2,-2,48311,82115,48311,-1,-1,-1,-1,0,0,107,12,-1,-1,19,1,0,0,-1,-1,-1,-1,4,0,5,0,-1,-1,-9,-9\n1989,CO,4,6049,382,-9,-9,0,0,6049,382,401,9,4779,249,1492,120,1687,63,66,3,-1,-1,-1,-1,18,4,-1,-1,-9,-9,158,19,6513,395,4703,317,123,15,6513,395,2495,239,-1,-1,2197,158,-2,-2,-2,-2,-2,-2,4299,5590,3538,-1,-1,-1,-1,0,0,7,0,-1,-1,2,0,0,0,-1,-1,-1,-1,1,0,5,1,-1,-1,-9,-9\n1989,CT,1,5619,317,715,128,1858,140,8192,585,-9,-9,2447,214,4172,286,2020,145,7,1,-1,-1,-1,-1,8,1,-1,-1,-9,-9,2020,145,8654,647,6634,502,0,0,8654,647,5601,395,-1,-1,7549,567,-2,-2,-2,-2,-2,-2,7929,8722,-9,-1,-1,-1,-1,0,0,-9,-9,-1,-1,-9,-9,-9,-9,-1,-1,-1,-1,-9,-9,13,1,-1,-1,-9,-9\n1989,DE,3,2013,65,279,28,614,74,2906,167,-9,-9,1141,69,2045,153,116,7,2,0,-1,-1,-1,-1,3,1,-1,-1,-9,-9,43,1,3234,224,3041,215,77,2,3234,224,800,68,-1,-1,933,93,-2,-2,-2,-2,-2,-2,2915,3138,2015,-1,-1,-1,-1,0,0,5,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1989,DC,3,5570,344,1472,69,1588,175,8630,588,-9,-9,120,32,9320,552,11,1,0,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,11,4,9451,588,0,0,9440,587,9451,588,1565,136,-1,-1,4868,249,-2,-2,-2,-2,-2,-2,8253,9315,8253,-1,-1,-1,-1,-8,-8,-9,-9,-1,-1,-9,-9,-9,-9,-1,-1,-1,-1,-9,-9,20,0,-1,-1,-9,-9\n1989,FL,3,37066,2467,28,5,0,0,37094,2472,-9,-9,15883,1026,20750,1520,2842,56,11,0,-1,-1,-1,-1,11,5,-1,-1,-9,-9,793,0,37448,2551,34606,2495,0,0,37448,2551,38356,3981,-1,-1,36631,3695,-2,-2,-2,-2,-2,-2,45293,44839,31309,-1,-1,-1,-1,2,0,88,2,-1,-1,4,0,6,0,-1,-1,-1,-1,2,0,0,0,-1,-1,-9,-9\n1989,GA,3,18619,1000,1156,110,0,0,19775,1110,-9,-9,6696,414,13001,693,209,6,13,1,-1,-1,-1,-1,1,0,-1,-1,-9,-9,64,2,19775,1110,0,0,19566,1104,19775,1110,10696,933,-1,-1,12496,973,-2,-2,-2,-2,-2,-2,-9,20421,-9,-1,-1,-1,-1,1,0,31,4,-1,-1,2,0,1,0,-1,-1,-1,-1,1,0,7,0,-1,-1,-9,-9\n1989,HI,4,1437,58,164,20,535,77,2136,155,-9,-9,599,66,137,10,69,6,14,4,-1,-1,-1,-1,1232,76,-1,-1,-9,-9,305,27,2287,183,2190,173,28,4,2287,183,246,14,-1,-1,328,31,-2,-2,-2,-2,-2,-2,-9,2141,1577,-1,-1,-1,-1,-8,-8,1,0,-1,-1,1,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1989,ID,4,1538,103,0,0,0,0,1538,103,121,9,1559,100,24,2,168,11,87,6,-1,-1,-1,-1,10,0,-1,-1,-9,-9,58,4,1738,112,1481,95,89,6,1738,112,792,86,-1,-1,856,81,-2,-2,-2,-2,-2,-2,1259,1826,1259,-1,-1,-1,-1,0,0,0,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,2,0,-1,-1,-9,-9\n1989,IL,2,23693,1019,-9,-9,0,0,23693,1019,-9,-9,7176,353,14276,605,2131,47,18,9,-1,-1,-1,-1,13,3,-1,-1,-9,-9,2210,49,23693,1019,21483,970,79,2,23693,1019,10053,679,-1,-1,10229,707,-2,-2,-2,-2,-2,-2,22514,22514,18810,-1,-1,-1,-1,0,0,26,1,-1,-1,3,0,1,0,-1,-1,-1,-1,3,0,7,0,-1,-1,-9,-9\n1989,IN,2,11599,621,118,3,8,4,11725,628,633,0,7206,406,4488,216,188,10,23,1,-1,-1,-1,-1,0,1,-1,-1,-9,-9,0,0,11717,624,11529,614,0,0,11717,624,4490,409,-1,-1,4037,318,-2,-2,-2,-2,-2,-2,9101,-9,-9,-1,-1,-1,-1,0,0,6,1,-1,-1,1,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1989,IA,2,3405,179,-8,-8,-8,-8,3405,179,-9,-9,2589,133,735,42,65,1,40,2,-1,-1,-1,-1,6,0,-1,-1,-9,-9,35,2,3405,179,3131,148,209,30,3405,179,1729,178,-1,-1,2314,203,-2,-2,-2,-2,-2,-2,3003,3003,3003,-1,-1,-1,-1,-8,-8,6,0,-1,-1,1,0,1,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1989,KS,2,5379,249,0,0,0,0,5379,249,-9,-9,3258,138,1757,99,267,7,67,2,-1,-1,-1,-1,21,0,-1,-1,-9,-9,267,7,5370,246,5103,239,0,0,5370,246,1998,248,-1,-1,3337,328,-2,-2,-2,-2,-2,-2,5285,-9,-9,-1,-1,-1,-1,-8,-8,6,1,-1,-1,2,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1989,KY,3,6538,340,0,0,0,0,6538,340,1304,107,5485,277,2356,170,0,0,1,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,7842,447,0,0,7842,447,7842,447,2778,302,-1,-1,2996,334,-2,-2,-2,-2,-2,-2,6646,6485,-9,-1,-1,-1,-1,0,0,11,0,-1,-1,2,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1989,LA,3,12591,528,0,0,0,0,12591,528,3968,170,4637,160,11922,538,0,0,0,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,16559,698,0,0,16559,698,16559,698,4583,313,-1,-1,5308,396,-2,-2,-2,-2,-2,-2,13535,13535,13535,-1,-1,-1,-1,0,0,38,0,-1,-1,0,0,0,0,-1,-1,-1,-1,3,0,4,0,-1,-1,-9,-9\n1989,ME,1,1377,42,20,3,0,0,1397,45,22,0,1378,45,16,1,6,0,15,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,1409,46,1403,46,0,0,1409,46,713,33,-1,-1,720,33,-2,-2,-2,-2,-2,-2,1049,1049,1049,-1,-1,-1,-1,-8,-8,6,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1989,MD,3,14515,614,1007,112,0,0,15522,726,-9,-9,4087,189,11674,537,0,0,5,2,-1,-1,-1,-1,0,0,-1,-1,-9,-9,20,0,15786,728,0,0,15786,728,15786,728,6004,472,-1,-1,5252,343,-2,-2,-2,-2,-2,-2,-9,16554,11477,-1,-1,-1,-1,0,0,22,1,-1,-1,1,0,0,0,-1,-1,-1,-1,2,0,1,0,-1,-1,-9,-9\n1989,MA,1,6933,335,93,163,0,86,7026,584,365,12,3819,272,2657,113,1201,121,10,2,-1,-1,-1,-1,34,0,-1,-1,-9,-9,506,111,7026,498,5825,377,0,0,7026,498,2522,322,-1,-1,3906,283,-2,-2,-2,-2,-2,-2,-9,-9,4494,-1,-1,-1,-1,-8,-8,0,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,6,1,-1,-1,-9,-9\n1989,MI,2,30053,1586,0,0,0,0,30053,1586,-9,-9,12147,522,17290,1029,378,27,107,5,-1,-1,-1,-1,16,0,-1,-1,-9,-9,493,30,30053,1586,29675,1559,0,0,30053,1586,8943,653,-1,-1,8793,585,-2,-2,-2,-2,-2,-2,24850,-9,-9,-1,-1,-1,-1,-8,-8,46,0,-1,-1,7,0,0,0,-1,-1,-1,-1,6,0,6,3,-1,-1,-9,-9\n1989,MN,2,2944,152,0,0,44,0,2988,152,-9,-9,1820,89,795,59,79,1,236,10,-1,-1,-1,-1,3,0,-1,-1,-9,-9,90,1,2944,159,2865,158,0,0,2944,159,1664,159,-1,-1,1926,163,-2,-2,-2,-2,-2,-2,3098,3113,3098,-1,-1,-1,-1,-8,-8,4,0,-1,-1,1,0,2,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1989,MS,3,6300,324,112,16,0,0,6412,340,1097,62,2252,141,5221,260,27,1,10,0,-1,-1,-1,-1,9,1,-1,-1,-9,-9,17,0,7509,402,7465,401,17,0,7509,402,2862,222,-1,-1,2961,216,-2,-2,-2,-2,-2,-2,7204,7657,7091,-1,-1,-1,-1,1,0,15,1,-1,-1,1,1,0,0,-1,-1,-1,-1,3,0,0,0,-1,-1,-9,-9\n1989,MO,2,13203,718,0,0,0,0,13203,718,-9,-9,7039,394,6129,324,121,9,26,0,-1,-1,-1,-1,7,0,-1,-1,-9,-9,2,0,13203,718,13075,709,7,0,13203,718,5570,322,-1,-1,6467,515,-2,-2,-2,-2,-2,-2,15121,15121,-9,-1,-1,-1,-1,1,0,14,0,-1,-1,3,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1989,MT,4,1245,63,0,0,0,0,1245,63,-9,-9,1011,48,24,1,38,3,228,14,-1,-1,-1,-1,1,1,-1,-1,-9,-9,0,0,1264,64,1226,61,0,0,1264,64,315,23,-1,-1,531,44,-2,-2,-2,-2,-2,-2,1030,1314,1030,-1,-1,-1,-1,0,0,3,0,-1,-1,1,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1989,NE,2,2165,127,94,17,14,2,2273,146,-9,-9,1454,73,711,58,106,2,74,9,-1,-1,-1,-1,0,0,-1,-1,-9,-9,11,3,2250,143,2144,140,0,1,2250,143,934,78,-1,-1,983,106,-2,-2,-2,-2,-2,-2,-9,-9,1666,-1,-1,-1,-1,0,0,5,0,-1,-1,1,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1989,NV,4,4888,422,0,0,63,1,4951,423,-9,-9,2491,246,1351,159,678,18,47,5,-1,-1,-1,-1,37,8,-1,-1,-9,-9,748,20,4674,438,3961,418,35,2,4674,438,2224,290,-1,-1,2582,244,-2,-2,-2,-2,-2,-2,5382,5382,4370,-1,-1,-1,-1,2,0,13,0,-1,-1,0,0,1,0,-1,-1,-1,-1,1,0,1,0,-1,-1,-9,-9\n1989,NH,1,1096,5,0,0,34,0,1130,5,-9,-9,1079,37,46,1,41,3,0,0,-1,-1,-1,-1,3,0,-1,-1,-9,-9,0,0,1128,38,1087,35,0,0,1128,38,413,25,-1,-1,413,17,-2,-2,-2,-2,-2,-2,834,1058,683,-1,-1,-1,-1,-8,-8,2,0,-1,-1,0,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1989,NJ,1,15345,672,0,0,0,0,15345,672,2861,163,6274,261,11448,531,3021,152,6,0,-1,-1,-1,-1,13,0,-1,-1,-9,-9,812,94,18553,886,15301,696,231,38,18553,886,6170,474,-1,-1,6716,477,-2,-2,-2,-2,-2,-2,12742,13969,11977,-1,-1,-1,-1,0,0,87,2,-1,-1,3,0,1,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1989,NM,4,2628,162,165,8,32,6,2825,176,-9,-9,2351,136,312,16,1490,71,100,6,-1,-1,-1,-1,5,0,-1,-1,-9,-9,0,6,2768,164,1278,87,0,6,2768,164,1346,111,-1,-1,1857,133,-2,-2,-2,-2,-2,-2,2997,3001,2997,-1,-1,-1,-1,0,0,-9,-9,-1,-1,-9,-9,-9,-9,-1,-1,-1,-1,-9,-9,7,0,-1,-1,-9,-9\n1989,NY,1,48767,2465,0,0,0,0,48767,2465,-9,-9,24102,1266,24112,1137,15618,922,125,12,-1,-1,-1,-1,118,6,-1,-1,-9,-9,305,44,48762,2465,32839,1499,305,44,48762,2465,19923,1612,-1,-1,20616,1197,-2,-2,-2,-2,-2,-2,51617,51617,42472,-1,-1,-1,-1,-8,-8,196,7,-1,-1,10,0,0,0,-1,-1,-1,-1,9,0,20,1,-1,-1,-9,-9\n1989,NC,3,15869,759,742,84,172,39,16783,882,-9,-9,6366,355,9673,456,0,0,390,26,-1,-1,-1,-1,11,2,-1,-1,-9,-9,171,4,16611,843,0,0,16611,843,16611,843,12057,1072,-1,-1,14151,1181,-2,-2,-2,-2,-2,-2,18838,15097,-9,-1,-1,-1,-1,0,0,25,1,-1,-1,3,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1989,ND,2,423,41,46,1,0,0,469,42,-9,-9,359,19,4,0,12,0,66,2,-1,-1,-1,-1,1,0,-1,-1,-9,-9,0,0,430,21,418,21,0,0,430,21,254,25,-1,-1,331,16,-2,-2,-2,-2,-2,-2,-9,556,556,-1,-1,-1,-1,-8,-8,0,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1989,OH,2,28346,1954,-9,-9,0,0,28346,1954,-9,-9,13986,778,14557,1217,0,0,0,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,28543,1995,0,0,28543,1995,28543,1995,13836,1809,-1,-1,12720,1529,-2,-2,-2,-2,-2,-2,-9,-9,19848,-1,-1,-1,-1,0,0,37,0,-1,-1,7,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1989,OK,3,9029,789,-9,-9,0,0,9029,789,0,0,6230,512,3457,404,254,11,645,46,-1,-1,-1,-1,0,0,-1,-1,-9,-9,301,13,10633,975,10332,962,47,2,10633,975,5647,838,-1,-1,5196,641,-2,-2,-2,-2,-2,-2,-9,7888,-9,-1,-1,-1,-1,0,0,23,0,-1,-1,4,0,0,1,-1,-1,-1,-1,5,0,1,0,-1,-1,-9,-9\n1989,OR,4,5463,251,0,0,0,0,5463,251,74,53,4903,321,872,80,369,5,133,22,-1,-1,-1,-1,17,1,-1,-1,-9,-9,389,6,6314,430,5945,425,0,0,6314,430,2653,299,-1,-1,4510,566,-2,-2,-2,-2,-2,-2,5167,5493,-9,-1,-1,-1,-1,0,0,7,0,-1,-1,1,0,3,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1989,PA,1,18722,937,3,8,22,0,18747,945,-9,-9,8507,390,10975,550,379,20,13,1,-1,-1,-1,-1,15,0,-1,-1,-9,-9,15,3,19525,944,1253,3,17893,921,19525,944,5429,491,-1,-1,5822,416,-2,-2,-2,-2,-2,-2,-9,-9,13616,-1,-1,-1,-1,0,0,46,3,-1,-1,7,0,3,0,-1,-1,-1,-1,3,0,0,0,-1,-1,-9,-9\n1989,RI,1,1419,48,374,113,474,48,2267,209,-9,-9,1501,122,761,82,318,28,4,1,-1,-1,-1,-1,8,0,-1,-1,-9,-9,0,0,2274,205,1956,177,0,0,2274,205,548,28,-1,-1,483,27,-2,-2,-2,-2,-2,-2,1756,1804,1674,-1,-1,-1,-1,-8,-8,4,0,-1,-1,2,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1989,SC,3,13149,746,886,112,15,1,14050,859,399,6,5386,303,9361,625,32,1,9,0,-1,-1,-1,-1,2,0,-1,-1,-9,-9,33,1,14791,929,13554,903,1205,25,14791,929,4434,427,-1,-1,4357,388,-2,-2,-2,-2,-2,-2,14768,14768,11119,-1,-1,-1,-1,0,0,28,1,-1,-1,3,0,1,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1989,SD,2,1189,88,0,0,0,0,1189,88,-9,-9,847,51,32,2,9,1,290,30,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,1169,83,1160,82,0,0,1169,83,634,69,-1,-1,540,37,-2,-2,-2,-2,-2,-2,560,695,560,-1,-1,-1,-1,0,0,0,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1989,TN,3,7356,369,37,7,0,0,7393,376,2640,93,5365,289,4364,155,0,0,-9,-9,-1,-1,-1,-1,-9,-9,-1,-1,-9,-9,430,27,10159,471,0,0,10159,471,10159,471,2646,278,-1,-1,3481,372,-2,-2,-2,-2,-2,-2,-9,8387,-9,-1,-1,-1,-1,0,0,22,2,-1,-1,1,0,0,0,-1,-1,-1,-1,4,0,0,0,-1,-1,-9,-9\n1989,TX,3,41953,2069,0,0,0,0,41953,2069,-9,-9,13383,837,19366,948,9088,279,1,3,-1,-1,-1,-1,115,2,-1,-1,-9,-9,9088,279,41953,2069,32865,1790,0,0,41953,2069,19661,2063,-1,-1,30785,2558,-2,-2,-2,-2,-2,-2,43117,40961,43117,-1,-1,-1,-1,4,0,-9,-9,-1,-1,-9,-9,-9,-9,-1,-1,-1,-1,-9,-9,61,0,-1,-1,-9,-9\n1989,UT,4,2219,88,18,1,99,8,2336,97,82,10,1964,91,196,12,374,24,50,4,-1,-1,-1,-1,25,1,-1,-1,-9,-9,50,1,2285,109,1861,84,50,1,2285,109,689,55,-1,-1,888,80,-2,-2,-2,-2,-2,-2,-9,2464,2210,-1,-1,-1,-1,0,0,3,0,-1,-1,1,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1989,VT,1,575,26,161,9,108,1,844,36,34,0,869,36,-9,-9,0,0,-9,-9,-1,-1,-1,-1,-9,-9,-1,-1,-9,-9,-9,-9,869,36,0,0,869,36,869,36,455,14,-1,-1,433,10,-2,-2,-2,-2,-2,-2,597,597,597,-1,-1,-1,-1,-8,-8,1,0,-1,-1,1,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1989,VA,3,13853,533,29,0,0,0,13882,533,860,165,5848,264,9739,523,57,2,6,0,-1,-1,-1,-1,18,4,-1,-1,-9,-9,72,3,15683,794,0,0,15626,792,15683,794,6669,554,-1,-1,6354,491,-2,-2,-2,-2,-2,-2,12083,12083,12083,-1,-1,-1,-1,1,0,39,9,-1,-1,3,0,0,0,-1,-1,-1,-1,1,0,27,0,-1,-1,-9,-9\n1989,WA,4,6609,331,28,0,53,3,6690,334,-9,-9,4211,228,1315,62,708,13,232,18,-1,-1,-1,-1,61,5,-1,-1,-9,-9,778,18,6597,331,870,27,5019,291,6597,331,3303,240,-1,-1,2841,202,-2,-2,-2,-2,-2,-2,5756,6547,5756,-1,-1,-1,-1,0,0,11,0,-1,-1,1,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1989,WV,3,1463,73,0,0,37,0,1500,73,-9,-9,1250,63,211,10,2,0,1,0,-1,-1,-1,-1,1,0,-1,-1,-9,-9,0,0,1463,73,1461,73,0,0,1463,73,742,67,-1,-1,765,77,-2,-2,-2,-2,-2,-2,1547,1640,1547,-1,-1,-1,-1,-8,-8,1,1,-1,-1,0,0,0,0,-1,-1,-1,-1,3,1,0,0,-1,-1,-9,-9\n1989,WI,2,6369,288,12,0,0,0,6381,288,73,0,3837,152,2501,145,384,7,145,3,-1,-1,-1,-1,2,3,-1,-1,-9,-9,0,0,6485,303,6101,296,0,0,6485,303,2362,167,-1,-1,2648,170,-2,-2,-2,-2,-2,-2,4889,6672,4889,-1,-1,-1,-1,-8,-8,0,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,9,0,-1,-1,-9,-9\n1989,WY,4,943,83,0,0,0,0,943,83,-9,-9,736,68,51,6,97,5,48,4,-1,-1,-1,-1,1,0,-1,-1,-9,-9,97,5,933,83,836,78,0,0,933,83,305,48,-1,-1,337,45,-2,-2,-2,-2,-2,-2,788,795,609,-1,-1,-1,-1,0,0,2,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1989,ST,7,577935,32171,8756,1097,8743,1293,595434,34561,16171,982,287254,16813,299287,17573,71103,3588,4589,340,-1,-1,-1,-1,1887,129,-1,-1,0,0,24164,1356,617181,36211,321423,18886,224655,13737,617181,36211,271950,25877,-1,-1,338384,28665,-2,-2,-2,-2,-2,-2,428391,500682,353857,-1,-1,-1,-1,16,0,1023,50,-1,-1,101,2,22,1,-1,-1,-1,-1,61,1,234,9,-1,-1,0,0\n1989,US,5,618823,35078,10845,1475,15521,1640,645189,38193,16171,982,324124,19426,315683,19269,85798,4585,5598,396,-1,-1,-1,-1,2316,164,-1,-1,0,0,24196,1391,671917,40646,361432,22289,224687,13772,671917,40646,288391,27824,-1,-1,354971,30508,-2,-2,-2,-2,-2,-2,460885,500682,353857,-1,-1,-1,-1,16,0,1122,56,-1,-1,111,2,25,1,-1,-1,-1,-1,66,1,235,9,-1,-1,0,0\n1989,FE,6,40888,2907,2089,378,6778,347,49755,3632,-9,-9,36870,2613,16396,1696,14695,997,1009,56,-1,-1,-1,-1,429,35,-1,-1,-9,-9,32,35,54736,4435,40009,3403,32,35,54736,4435,16441,1947,-1,-1,16587,1843,-2,-2,-2,-2,-2,-2,32494,-9,-9,-1,-1,-1,-1,0,0,99,6,-1,-1,10,0,3,0,-1,-1,-1,-1,5,0,1,0,-1,-1,-9,-9\n1990,AL,3,14141,910,261,39,0,0,14402,949,806,52,5421,326,9282,519,1,0,4,0,-1,-1,-1,-1,2,0,-1,-1,-9,-9,1,0,14710,845,14709,955,0,0,14710,955,4622,389,-1,-1,5100,401,-2,-2,-2,-2,-2,-2,13782,13782,13782,-1,-1,-1,-1,1,0,0,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,49,0,-1,-1,-9,-9\n1990,AK,4,1610,68,115,5,530,34,2255,107,-9,-9,1390,88,288,19,64,3,791,51,-1,-1,-1,-1,25,3,-1,-1,-9,-9,0,0,2494,161,2430,125,0,0,2494,128,1072,123,-1,-1,1306,140,-2,-2,-2,-2,-2,-2,2808,-9,-9,-1,-1,-1,-1,-8,-8,2,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,1,0,-1,-1,-9,-9\n1990,AZ,4,12964,817,462,18,0,0,13426,835,49,3,10702,580,2283,164,3656,163,430,34,-1,-1,-1,-1,10,1,-1,-1,-9,-9,1,1,13426,780,9770,672,0,0,13426,835,5152,452,-1,-1,5097,505,-2,-2,-2,-2,-2,-2,-9,13884,-9,-1,-1,-1,-1,0,0,19,0,-1,-1,2,0,6,0,-1,-1,-1,-1,1,0,3,0,-1,-1,-9,-9\n1990,AR,3,6176,345,40,8,0,0,6216,353,645,132,3396,183,2948,187,36,2,0,1,-1,-1,-1,-1,1,0,-1,-1,-9,-9,36,2,6381,373,6345,383,0,0,6381,385,2950,352,-1,-1,3643,458,-2,-2,-2,-2,-2,-2,-9,6535,-9,-1,-1,-1,-1,2,0,13,0,-1,-1,2,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1990,CA,4,88264,5858,0,0,2543,644,90807,6502,-9,-9,54409,3401,32190,2175,27716,1496,-9,-9,-1,-1,-1,-1,-9,-9,-1,-1,-9,-9,4208,424,90807,6000,58883,4593,4208,413,90807,6502,35881,3614,-1,-1,78686,7292,-2,-2,-2,-2,-2,-2,-9,-9,52698,-1,-1,-1,-1,0,0,101,1,-1,-1,17,0,2,0,-1,-1,-1,-1,9,0,0,0,-1,-1,-9,-9\n1990,CO,4,6365,418,-9,-9,0,0,6365,418,652,1,4807,249,1525,120,1717,74,62,3,-1,-1,-1,-1,16,4,-1,-1,-9,-9,176,19,6586,395,4739,346,130,12,6586,432,2163,210,-1,-1,3074,255,-2,-2,-2,-2,-2,-2,-9,6120,4605,-1,-1,-1,-1,0,0,7,0,-1,-1,0,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1990,CT,1,7125,345,640,107,1734,150,9499,602,-9,-9,2586,214,4818,286,2385,157,7,1,-1,-1,-1,-1,20,1,-1,-1,-9,-9,2386,145,9817,647,7431,526,1,0,9817,683,6012,446,-1,-1,9832,813,-2,-2,-2,-2,-2,-2,9159,10075,-9,-1,-1,-1,-1,0,0,-9,-9,-1,-1,-9,0,-9,-9,-1,-1,-1,-1,-9,-9,20,0,-1,-1,-9,-9\n1990,DE,3,1967,67,333,29,597,65,2897,161,-9,-9,1079,69,2102,153,124,4,1,0,-1,-1,-1,-1,4,1,-1,-1,-9,-9,59,1,3245,224,3119,222,2,0,3245,226,760,75,-1,-1,1034,83,-2,-2,-2,-2,-2,-2,2915,3138,2015,-1,-1,-1,-1,0,0,3,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1990,DC,3,5709,263,789,93,1610,173,8108,529,-9,-9,110,32,9222,552,9,0,0,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,9,4,9341,588,9332,606,0,0,9341,606,1046,91,-1,-1,5697,261,-2,-2,-2,-2,-2,-2,8253,9121,7764,-1,-1,-1,-1,-8,-8,-9,-9,-1,-1,-9,-9,-9,-9,-1,-1,-1,-1,-9,-9,0,0,-1,-1,-9,-9\n1990,FL,3,41398,2587,7,0,0,0,41405,2587,-9,-9,17106,1026,23824,1520,3004,56,7,0,-1,-1,-1,-1,10,5,-1,-1,-9,-9,776,0,41723,2551,38719,2608,0,0,41723,2664,36280,3856,-1,-1,35055,4100,-2,-2,-2,-2,-2,-2,50645,45237,34826,-1,-1,-1,-1,4,0,85,4,-1,-1,2,0,2,0,-1,-1,-1,-1,3,0,0,0,-1,-1,-9,-9\n1990,GA,3,20495,1176,673,67,-8,-8,21168,1243,-9,-9,7083,414,14025,693,181,8,12,1,-1,-1,-1,-1,5,0,-1,-1,-9,-9,0,2,21125,1110,0,0,20944,1212,21125,1220,12233,1227,-1,-1,13897,1272,-2,-2,-2,-2,-2,-2,-9,22424,-9,-1,-1,-1,-1,0,0,46,0,-1,-1,3,0,0,0,-1,-1,-1,-1,1,0,2,0,-1,-1,-9,-9\n1990,HI,4,1598,78,90,5,559,60,2247,143,-9,-9,538,66,132,10,83,4,33,4,-1,-1,-1,-1,1294,76,-1,-1,-9,-9,365,27,2362,183,2232,159,47,8,2362,171,533,59,-1,-1,799,76,-2,-2,-2,-2,-2,-2,-9,2141,1577,-1,-1,-1,-1,-8,-8,2,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1990,ID,4,1739,109,0,0,0,0,1739,109,122,1,1720,100,27,2,215,15,78,6,-1,-1,-1,-1,14,0,-1,-1,-9,-9,2,4,1841,112,1615,104,11,1,1841,120,785,99,-1,-1,910,108,-2,-2,-2,-2,-2,-2,-9,1845,1586,-1,-1,-1,-1,0,0,7,0,-1,-1,1,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1990,IL,2,26333,1183,-9,-9,0,0,26333,1183,-9,-9,7556,353,16220,605,2401,48,30,9,-1,-1,-1,-1,23,3,-1,-1,-9,-9,2504,49,26333,1019,23829,1134,103,1,26333,1183,12583,905,-1,-1,14548,957,-2,-2,-2,-2,-2,-2,22691,22691,18987,-1,-1,-1,-1,1,0,46,2,-1,-1,4,0,1,0,-1,-1,-1,-1,6,0,6,0,-1,-1,-9,-9\n1990,IN,2,11942,673,110,7,3,1,12055,681,757,0,7471,406,4566,216,229,4,16,1,-1,-1,-1,-1,2,1,-1,-1,-9,-9,0,0,12055,624,11826,677,0,0,12055,681,4520,432,-1,-1,4440,413,-2,-2,-2,-2,-2,-2,10861,-9,-9,-1,-1,-1,-1,0,0,5,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1990,IA,2,3755,212,-8,-8,-8,-8,3755,212,-9,-9,2854,133,810,42,82,0,50,2,-1,-1,-1,-1,10,0,-1,-1,-9,-9,31,2,3755,179,3381,209,292,3,3755,212,1787,202,-1,-1,2476,242,-2,-2,-2,-2,-2,-2,3035,3035,3035,-1,-1,-1,-1,-8,-8,8,0,-1,-1,2,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1990,KS,2,5504,286,0,0,0,0,5504,286,-9,-9,3211,138,1876,99,301,5,79,2,-1,-1,-1,-1,24,0,-1,-1,-9,-9,301,7,5491,246,5190,279,0,0,5491,284,2065,194,-1,-1,3148,302,-2,-2,-2,-2,-2,-2,-9,5405,-9,-1,-1,-1,-1,-8,-8,8,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1990,KY,3,7917,413,0,0,0,0,7917,413,627,66,5979,277,2563,170,0,0,2,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,8544,447,0,0,8544,479,8544,479,2990,323,-1,-1,3589,375,-2,-2,-2,-2,-2,-2,8051,7866,-9,-1,-1,-1,-1,0,0,19,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1990,LA,3,13588,518,0,0,0,0,13588,518,4236,257,4991,160,12830,538,0,0,0,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,3,0,17824,698,0,0,17824,775,17824,775,5087,380,-1,-1,5721,439,-2,-2,-2,-2,-2,-2,14697,14697,14697,-1,-1,-1,-1,1,0,34,1,-1,-1,3,0,0,0,-1,-1,-1,-1,1,0,3,1,-1,-1,-9,-9\n1990,ME,1,1457,41,41,2,0,0,1498,43,10,0,1440,45,29,1,4,0,10,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,1479,46,1475,44,0,0,1479,44,652,34,-1,-1,795,45,-2,-2,-2,-2,-2,-2,1193,1193,1193,-1,-1,-1,-1,-8,-8,4,0,-1,-1,1,-9,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1990,MD,3,15701,768,993,105,-8,-8,16694,873,-9,-9,3735,189,13135,537,0,0,4,2,-1,-1,-1,-1,0,0,-1,-1,-9,-9,97,0,16971,728,0,0,16971,877,16971,877,6393,549,-1,-1,6392,445,-2,-2,-2,-2,-2,-2,-9,17907,12246,-1,-1,-1,-1,0,0,22,2,-1,-1,2,0,1,0,-1,-1,-1,-1,1,0,2,0,-1,-1,-9,-9\n1990,MA,1,7626,388,111,140,12,68,7749,596,418,12,4017,272,2895,113,1479,109,11,2,-1,-1,-1,-1,43,0,-1,-1,-9,-9,725,111,7691,498,6200,405,12,68,7691,582,2552,345,-1,-1,4294,386,-2,-2,-2,-2,-2,-2,-9,-9,4864,-1,-1,-1,-1,-8,-8,18,2,-1,-1,1,0,1,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1990,MI,2,32579,1688,0,0,0,0,32579,1688,-9,-9,13247,522,18616,1029,461,30,116,5,-1,-1,-1,-1,20,0,-1,-1,-9,-9,580,30,32579,1586,32118,1658,0,0,32579,1688,8589,666,-1,-1,9981,753,-2,-2,-2,-2,-2,-2,26266,-9,-9,-1,-1,-1,-1,-8,-8,59,2,-1,-1,5,0,0,0,-1,-1,-1,-1,1,0,5,2,-1,-1,-9,-9\n1990,MN,2,3017,159,0,0,39,0,3056,159,-9,-9,1806,89,838,59,105,4,244,10,-1,-1,-1,-1,2,0,-1,-1,-9,-9,127,1,3017,159,2912,155,0,0,3017,159,1668,150,-1,-1,2150,183,-2,-2,-2,-2,-2,-2,3198,3198,3198,-1,-1,-1,-1,-8,-8,8,1,-1,-1,3,0,1,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1990,MS,3,7117,336,142,5,0,0,7259,341,668,107,2217,141,5663,260,26,2,6,0,-1,-1,-1,-1,6,1,-1,-1,-9,-9,35,0,7927,402,7892,445,9,1,7927,448,2828,280,-1,-1,3140,261,-2,-2,-2,-2,-2,-2,8136,8594,8091,-1,-1,-1,-1,0,0,23,1,-1,-1,1,0,3,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1990,MO,2,14166,777,0,0,0,0,14166,777,-9,-9,7606,394,6531,324,128,8,25,0,-1,-1,-1,-1,4,0,-1,-1,-9,-9,0,0,14166,718,14032,769,6,0,14166,777,5351,385,-1,-1,6543,587,-2,-2,-2,-2,-2,-2,14822,14893,-9,-1,-1,-1,-1,3,0,11,0,-1,-1,1,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1990,MT,4,1324,74,0,0,0,0,1324,74,-9,-9,1089,48,20,1,38,2,240,14,-1,-1,-1,-1,0,1,-1,-1,-9,-9,0,0,1349,64,1311,74,0,0,1349,76,459,46,-1,-1,523,42,-2,-2,-2,-2,-2,-2,1079,1407,1079,-1,-1,-1,-1,0,0,1,0,-1,-1,4,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1990,NE,2,2196,118,93,21,16,2,2305,141,-9,-9,1436,73,727,58,107,4,86,9,-1,-1,-1,-1,0,0,-1,-1,-9,-9,9,3,2258,143,2151,138,0,3,2258,145,940,94,-1,-1,1133,112,-2,-2,-2,-2,-2,-2,-9,-9,1666,-1,-1,-1,-1,0,0,7,0,-1,-1,2,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1990,NV,4,5106,394,0,0,130,11,5236,405,-9,-9,2822,246,1529,159,462,14,64,5,-1,-1,-1,-1,39,8,-1,-1,-9,-9,462,20,4916,438,4454,392,0,0,4916,406,2258,252,-1,-1,2576,335,-2,-2,-2,-2,-2,-2,5406,5406,4394,-1,-1,-1,-1,1,0,10,0,-1,-1,2,0,0,0,-1,-1,-1,-1,1,0,1,0,-1,-1,-9,-9\n1990,NH,1,1265,39,0,10,19,24,1284,73,-9,-9,1239,37,56,1,55,3,0,0,-1,-1,-1,-1,3,0,-1,-1,-9,-9,0,0,1298,38,1243,41,0,0,1298,44,515,23,-1,-1,484,21,-2,-2,-2,-2,-2,-2,1268,1492,1112,-1,-1,-1,-1,-8,-8,6,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1990,NJ,1,16943,803,0,0,0,0,16943,803,2549,192,6629,261,12856,531,3214,156,0,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,602,94,20087,886,16873,885,0,0,20087,1041,7761,577,-1,-1,8432,513,-2,-2,-2,-2,-2,-2,-9,-9,13383,-1,-1,-1,-1,0,0,57,0,-1,-1,2,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1990,NM,4,2884,183,240,16,50,6,3174,205,-9,-9,2561,136,295,16,1646,101,100,6,-1,-1,-1,-1,6,0,-1,-1,-9,-9,32,6,2994,164,1317,86,31,6,2994,193,1208,124,-1,-1,1795,172,-2,-2,-2,-2,-2,-2,3225,3596,3225,-1,-1,-1,-1,0,0,-9,-9,-1,-1,-9,-9,-9,-9,-1,-1,-1,-1,-9,-9,7,1,-1,-1,-9,-9\n1990,NY,1,52204,2691,0,0,0,0,52204,2691,-9,-9,25426,1266,26026,1137,16607,980,128,12,-1,-1,-1,-1,136,6,-1,-1,-9,-9,488,44,52204,2465,35109,1678,488,33,52204,2691,21432,1683,-1,-1,24807,1709,-2,-2,-2,-2,-2,-2,55820,56833,45946,-1,-1,-1,-1,-8,-8,209,5,-1,-1,1,0,3,0,-1,-1,-1,-1,8,0,20,0,-1,-1,-9,-9\n1990,NC,3,16917,847,549,98,188,20,17654,965,-9,-9,6364,355,10500,456,0,0,387,26,-1,-1,-1,-1,8,2,-1,-1,-9,-9,207,4,17466,843,0,0,17466,945,17466,945,14280,1343,-1,-1,15868,1385,-2,-2,-2,-2,-2,-2,15942,19324,-9,-1,-1,-1,-1,0,0,38,2,-1,-1,2,1,1,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1990,ND,2,468,26,44,4,0,0,512,30,-9,-9,374,19,5,0,8,0,82,2,-1,-1,-1,-1,1,0,-1,-1,-9,-9,1,0,463,21,455,20,0,0,463,20,287,22,-1,-1,306,27,-2,-2,-2,-2,-2,-2,-9,576,576,-1,-1,-1,-1,-8,-8,0,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1990,OH,2,29605,1896,-9,-9,0,0,29605,1896,-9,-9,14340,778,15535,1217,0,0,0,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,29875,1995,0,0,29875,1947,29875,1947,14586,1938,-1,-1,15758,2149,-2,-2,-2,-2,-2,-2,-9,-9,20598,-1,-1,-1,-1,0,0,39,3,-1,-1,3,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1990,OK,3,9674,828,-9,-9,-8,-8,9674,828,189,21,6413,512,3793,404,299,14,672,46,-1,-1,-1,-1,0,0,-1,-1,-9,-9,336,13,11214,975,10878,1053,37,4,11214,1071,5181,684,-1,-1,5120,635,-2,-2,-2,-2,-2,-2,-9,8088,-9,-1,-1,-1,-1,1,0,24,0,-1,-1,4,0,3,1,-1,-1,-1,-1,2,1,0,0,-1,-1,-9,-9\n1990,OR,4,5913,323,0,0,0,0,5913,323,33,28,4601,321,811,80,528,5,126,22,-1,-1,-1,-1,23,1,-1,-1,-9,-9,569,6,6130,430,5574,351,28,6,6130,362,2645,305,-1,-1,5141,573,-2,-2,-2,-2,-2,-2,-9,6170,-9,-1,-1,-1,-1,0,0,8,2,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1990,PA,1,20864,1005,5,4,24,1,20893,1010,-9,-9,9534,390,11672,550,782,72,22,1,-1,-1,-1,-1,38,0,-1,-1,-9,-9,18,3,21284,944,1800,6,18702,928,21284,1006,5977,446,-1,-1,6754,490,-2,-2,-2,-2,-2,-2,-9,-9,14338,-1,-1,-1,-1,0,0,49,3,-1,-1,7,0,4,1,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1990,RI,1,1532,49,264,74,418,40,2214,163,-9,-9,1488,122,722,82,283,18,5,1,-1,-1,-1,-1,11,0,-1,-1,-9,-9,0,0,2226,205,1943,148,0,0,2226,166,562,36,-1,-1,707,40,-2,-2,-2,-2,-2,-2,2396,2444,2314,-1,-1,-1,-1,-8,-8,4,0,-1,-1,1,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1990,SC,3,13825,765,886,131,13,1,14724,897,437,6,5621,303,10598,625,31,1,11,0,-1,-1,-1,-1,3,0,-1,-1,-9,-9,33,1,16266,929,15917,1043,318,9,16266,1053,4714,457,-1,-1,4940,499,-2,-2,-2,-2,-2,-2,15438,15438,11958,-1,-1,-1,-1,1,0,38,3,-1,-1,2,0,1,1,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1990,SD,2,1279,81,0,0,0,0,1279,81,-9,-9,921,51,39,2,0,0,304,30,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,1264,83,0,0,1264,77,1264,77,627,66,-1,-1,681,86,-2,-2,-2,-2,-2,-2,1189,1130,1189,-1,-1,-1,-1,0,0,3,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1990,TN,3,8144,375,-9,-9,0,0,8144,375,1854,15,5219,289,4428,155,0,0,-9,-9,-1,-1,-1,-1,-9,-9,-1,-1,-9,-9,351,27,9998,471,0,0,9998,390,9998,390,2876,268,-1,-1,4636,439,-2,-2,-2,-2,-2,-2,-9,8803,-9,-1,-1,-1,-1,0,0,23,2,-1,-1,3,0,1,0,-1,-1,-1,-1,3,0,0,0,-1,-1,-9,-9\n1990,TX,3,47846,2196,0,0,0,0,47846,2196,-9,-9,14253,837,22634,948,10789,338,2,3,-1,-1,-1,-1,168,2,-1,-1,-9,-9,10789,279,47846,2069,37057,1858,0,0,47846,2196,26289,2419,-1,-1,36585,3224,-2,-2,-2,-2,-2,-2,49325,46859,49325,-1,-1,-1,-1,4,0,-9,-9,-1,-1,-9,-9,-9,-9,-1,-1,-1,-1,-9,-9,79,0,-1,-1,-9,-9\n1990,UT,4,2312,123,24,0,80,4,2416,127,0,0,2021,91,208,12,383,24,55,4,-1,-1,-1,-1,37,1,-1,-1,-9,-9,50,1,2371,109,1938,100,50,1,2371,125,632,68,-1,-1,1275,106,-2,-2,-2,-2,-2,-2,-9,2911,3032,-1,-1,-1,-1,0,0,2,0,-1,-1,3,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1990,VT,1,601,23,219,7,136,6,956,36,34,0,1013,36,-9,-9,0,0,-9,-9,-1,-1,-1,-1,-9,-9,-1,-1,-9,-9,-9,-9,1013,36,0,0,1013,36,1013,36,520,21,-1,-1,596,28,-2,-2,-2,-2,-2,-2,647,647,647,-1,-1,-1,-1,-8,-8,0,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1990,VA,3,13995,625,4,0,-8,-8,13999,625,1337,232,5954,264,10617,523,58,0,4,0,-1,-1,-1,-1,20,4,-1,-1,-9,-9,71,3,16666,794,0,0,16608,927,16666,927,7450,860,-1,-1,8120,816,-2,-2,-2,-2,-2,-2,13537,13537,13537,-1,-1,-1,-1,3,0,17,1,-1,-1,10,0,0,0,-1,-1,-1,-1,2,0,49,0,-1,-1,-9,-9\n1990,WA,4,6957,379,0,0,46,2,7003,381,-9,-9,4959,228,1489,62,1028,41,287,18,-1,-1,-1,-1,68,5,-1,-1,-9,-9,757,18,7560,331,3810,359,2722,35,7560,435,3521,337,-1,-1,3248,282,-2,-2,-2,-2,-2,-2,5411,6446,6446,-1,-1,-1,-1,0,0,10,0,-1,-1,1,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1990,WV,3,1489,76,0,0,0,0,1489,76,87,15,1272,63,215,10,2,0,1,0,-1,-1,-1,-1,1,0,-1,-1,-9,-9,0,0,1489,73,1487,76,0,0,1489,76,644,40,-1,-1,806,38,-2,-2,-2,-2,-2,-2,1700,1565,1850,-1,-1,-1,-1,-8,-8,1,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1990,WI,2,6896,333,13,5,0,0,6909,338,78,20,4062,152,2783,145,389,11,158,3,-1,-1,-1,-1,11,3,-1,-1,-9,-9,3,0,7017,303,6615,333,13,1,7017,345,2578,198,-1,-1,2685,195,-2,-2,-2,-2,-2,-2,5241,5241,5241,-1,-1,-1,-1,-8,-8,0,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,9,1,-1,-1,-9,-9\n1990,WY,4,1022,88,0,0,0,0,1022,88,-9,-9,809,68,49,6,104,8,56,4,-1,-1,-1,-1,3,0,-1,-1,-9,-9,105,5,1022,83,918,80,0,0,1022,88,381,47,-1,-1,350,42,-2,-2,-2,-2,-2,-2,793,795,614,-1,-1,-1,-1,0,0,1,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1990,ST,7,631514,34823,7148,1000,8747,1312,647409,37135,15588,1160,306897,16813,326845,17573,81220,3984,4808,340,-1,-1,-1,-1,2111,129,-1,-1,0,0,27305,1356,667966,36211,419029,25795,167717,9198,667966,38977,294877,28192,-1,-1,384673,35110,-2,-2,-2,-2,-2,-2,378929,442489,387634,-1,-1,-1,-1,22,0,1097,37,-1,-1,97,1,30,3,-1,-1,-1,-1,48,1,256,5,-1,-1,0,0\n1990,US,5,674774,38211,10464,1401,16839,1693,702077,41305,15588,1160,348404,19426,345940,19269,97927,5138,5847,396,-1,-1,-1,-1,2645,164,-1,-1,0,0,27305,1391,730141,40646,464497,29898,167717,9198,730141,44234,294877,28192,-1,-1,384673,35110,-2,-2,-2,-2,-2,-2,378929,442489,430946,-1,-1,-1,-1,22,0,1097,37,-1,-1,97,1,30,3,-1,-1,-1,-1,48,1,256,5,-1,-1,0,0\n1990,FE,6,43260,3388,3316,401,8092,381,54668,4170,-9,-9,41507,2613,19095,1696,16707,1154,1039,56,-1,-1,-1,-1,534,35,-1,-1,-9,-9,0,35,62175,4435,45468,4103,0,0,62175,5257,-9,-9,-1,-1,-9,-9,-2,-2,-2,-2,-2,-2,-9,-9,43312,-1,-1,-1,-1,0,0,0,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1991,AL,3,15079,1004,314,46,0,0,15393,1050,1241,69,5579,379,10119,674,2,0,4,2,-1,-1,-1,-1,2,0,-1,-1,-9,-9,1,0,15705,1055,15703,1055,0,0,15705,1055,5177,544,-1,-1,6255,618,-2,-2,-2,-2,-2,-2,14604,14604,14604,-1,-1,-1,-1,0,0,0,0,0,0,0,0,0,0,-1,-1,-1,-1,0,0,48,4,-1,-1,-9,-9\n1991,AK,4,1649,52,85,6,635,56,2369,114,-9,-9,1414,74,314,25,76,1,816,31,-1,-1,-1,-1,30,2,-1,-1,-9,-9,0,0,2574,132,2498,131,0,0,2574,132,938,83,-1,-1,1246,106,-2,-2,-2,-2,-2,-2,2523,2602,-9,-1,-1,-1,-1,-8,-8,0,0,0,0,1,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1991,AZ,4,13945,898,531,41,0,0,14476,939,46,3,11569,702,2432,201,4140,211,463,35,-1,-1,-1,-1,12,0,-1,-1,-9,-9,0,1,14476,939,10336,728,0,0,14476,939,5613,531,-1,-1,6078,650,-2,-2,-2,-2,-2,-2,-9,14994,-9,-1,-1,-1,-1,0,0,16,2,4,0,3,0,2,0,-1,-1,-1,-1,4,0,3,0,-1,-1,-9,-9\n1991,AR,3,6999,436,42,2,-8,-8,7041,438,87,0,3134,168,4171,266,22,1,1,2,-1,-1,-1,-1,1,0,-1,-1,-9,-9,22,1,7329,437,7307,436,0,0,7329,437,2849,332,-1,-1,3716,410,-2,-2,-2,-2,-2,-2,-9,7335,-9,-1,-1,-1,-1,0,0,15,1,1,0,2,0,2,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1991,CA,4,92837,5678,0,0,2669,624,95506,6302,-9,-9,57880,3714,32981,2224,30400,1424,575,87,-1,-1,-1,-1,-9,-9,-1,-1,-9,-9,4070,277,95506,6302,60461,4514,4645,364,95506,6302,34786,3467,-1,-1,84446,8026,-2,-2,-2,-2,-2,-2,-9,-9,55692,-1,-1,-1,-1,0,0,76,2,37,1,15,0,0,0,-1,-1,-1,-1,4,0,0,0,-1,-1,-9,-9\n1991,CO,4,7868,443,-9,-9,-8,-8,7868,443,71,10,5699,291,1801,136,2028,94,104,4,-1,-1,-1,-1,26,1,-1,-1,-9,-9,309,21,7939,453,5709,343,202,16,7939,453,2657,230,-1,-1,3019,297,-2,-2,-2,-2,-2,-2,-9,7416,6239,-1,-1,-1,-1,0,0,3,0,1,0,4,0,1,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1991,CT,1,7856,393,613,80,1520,111,9989,584,-9,-9,2813,240,4856,288,2618,129,5,2,-1,-1,-1,-1,25,1,-1,-1,-9,-9,2618,129,10317,660,7699,531,0,0,10317,660,5820,581,-1,-1,10030,988,-2,-2,-2,-2,-2,-2,9935,10928,-9,-1,-1,-1,-1,0,0,-9,-9,11,0,-9,-9,-9,0,-1,-1,-1,-1,-9,0,61,3,-1,-1,-9,-9\n1991,DE,3,2148,101,367,28,610,54,3125,183,-9,-9,1101,74,2287,162,143,5,2,0,-1,-1,-1,-1,2,1,-1,-1,-9,-9,85,3,3477,240,3320,234,14,1,3477,240,721,73,-1,-1,926,91,-2,-2,-2,-2,-2,-2,2915,3138,2015,-1,-1,-1,-1,0,0,4,0,2,0,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1991,DC,3,5642,215,813,111,1627,195,8082,521,-9,-9,188,30,9513,724,0,0,0,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,9701,754,9701,754,0,0,9701,754,976,85,-1,-1,5915,252,-2,-2,-2,-2,-2,-2,9788,9508,8101,-1,-1,-1,-1,-8,-8,-9,-9,-9,-9,-9,-9,-9,0,-1,-1,-1,-1,-9,0,0,0,-1,-1,-9,-9\n1991,FL,3,43826,2621,2,0,-8,-8,43828,2621,-9,-9,17323,1060,25607,1578,3083,55,0,0,-1,-1,-1,-1,105,0,-1,-1,-9,-9,860,0,43895,2638,40812,2583,0,0,43895,2638,29863,3231,-1,-1,31615,3674,-2,-2,-2,-2,-2,-2,53652,47572,36470,-1,-1,-1,-1,3,0,62,1,50,1,3,0,4,0,-1,-1,-1,-1,2,0,0,0,-1,-1,-9,-9\n1991,GA,3,21700,1309,647,87,-8,-8,22347,1396,-9,-9,7130,483,15031,900,164,8,20,0,-1,-1,-1,-1,6,0,-1,-1,-9,-9,66,8,22253,1391,0,0,22089,1383,22253,1391,11080,1109,-1,-1,13358,1215,-2,-2,-2,-2,-2,-2,-9,22895,-9,-1,-1,-1,-1,1,0,38,3,13,0,2,0,1,0,-1,-1,-1,-1,0,0,4,0,-1,-1,-9,-9\n1991,HI,4,1509,79,62,8,734,52,2305,139,-9,-9,592,50,145,10,94,6,27,7,-1,-1,-1,-1,1399,71,-1,-1,-9,-9,370,29,2533,167,2430,156,9,5,2533,167,748,98,-1,-1,1505,187,-2,-2,-2,-2,-2,-2,-9,2569,1658,-1,-1,-1,-1,-8,-8,1,0,1,0,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1991,ID,4,1952,107,0,0,0,0,1952,107,94,9,1888,109,29,3,249,14,85,9,-1,-1,-1,-1,15,0,-1,-1,-9,-9,5,0,2022,121,1758,105,15,2,2022,121,1009,92,-1,-1,1108,112,-2,-2,-2,-2,-2,-2,-9,2086,1831,-1,-1,-1,-1,0,0,4,0,1,0,2,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1991,IL,2,27858,1257,-9,-9,0,0,27858,1257,-9,-9,7685,370,17501,805,2605,70,40,9,-1,-1,-1,-1,25,3,-1,-1,-9,-9,2607,70,27858,1257,25251,1187,2,0,27858,1257,13689,961,-1,-1,16205,1076,-2,-2,-2,-2,-2,-2,23961,23961,20217,-1,-1,-1,-1,0,0,34,1,10,0,2,0,1,0,-1,-1,-1,-1,5,0,2,0,-1,-1,-9,-9\n1991,IN,2,12170,695,124,9,8,2,12302,706,711,0,7580,420,4687,284,254,6,29,1,-1,-1,-1,-1,6,1,-1,-1,-9,-9,0,0,12302,706,12048,700,0,0,12302,706,5045,458,-1,-1,5209,468,-2,-2,-2,-2,-2,-2,11934,14211,-9,-1,-1,-1,-1,0,0,20,0,5,0,2,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1991,IA,2,3949,196,-8,-8,-8,-8,3949,196,-9,-9,2956,133,885,55,98,2,62,7,-1,-1,-1,-1,15,0,-1,-1,-9,-9,31,1,3949,196,3752,183,99,11,3949,196,1633,185,-1,-1,2557,250,-2,-2,-2,-2,-2,-2,3003,3003,3003,-1,-1,-1,-1,-8,-8,1,0,0,0,0,0,0,0,-1,-1,-1,-1,0,0,2,0,-1,-1,-9,-9\n1991,KS,2,5617,294,0,0,0,0,5617,294,-9,-9,3178,151,2014,131,304,7,78,3,-1,-1,-1,-1,33,0,-1,-1,-9,-9,307,8,5610,293,5303,285,3,1,5610,293,1957,161,-1,-1,3085,264,-2,-2,-2,-2,-2,-2,-9,6622,-9,-1,-1,-1,-1,-8,-8,2,0,2,0,3,0,1,0,-1,-1,-1,-1,1,0,1,0,-1,-1,-9,-9\n1991,KY,3,8464,469,0,0,0,0,8464,469,822,44,6354,318,2929,194,-9,-9,2,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,1,1,9286,513,-9,-9,9286,513,9286,513,3355,365,-1,-1,3913,427,-2,-2,-2,-2,-2,-2,8455,8270,-9,-1,-1,-1,-1,0,0,16,0,2,0,2,0,0,0,-1,-1,-1,-1,1,0,1,0,-1,-1,-9,-9\n1991,LA,3,14406,569,-9,-9,0,0,14406,569,4686,342,4956,212,14135,699,-9,-9,-9,-9,-1,-1,-1,-1,-9,-9,-1,-1,-9,-9,1,0,19092,911,-9,-9,19092,911,19092,911,3933,267,-1,-1,6499,478,-2,-2,-2,-2,-2,-2,15493,15493,15493,-1,-1,-1,-1,1,0,-9,-9,0,0,-9,-9,-9,0,-1,-1,-1,-1,-9,0,33,1,-1,-1,-9,-9\n1991,ME,1,1486,57,19,2,0,0,1505,59,2,0,1463,59,34,3,16,0,16,0,-1,-1,-1,-1,4,0,-1,-1,-9,-9,0,0,1517,62,1501,62,0,0,1517,62,627,45,-1,-1,809,41,-2,-2,-2,-2,-2,-2,1193,1193,1193,-1,-1,-1,-1,-8,-8,3,0,0,0,0,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1991,MD,3,16770,768,1283,162,-8,-8,18053,930,-9,-9,4346,235,13946,692,-9,-9,5,1,-1,-1,-1,-1,0,0,-1,-1,-9,-9,63,3,18360,931,-9,-9,18360,931,18360,931,6499,509,-1,-1,6898,573,-2,-2,-2,-2,-2,-2,-9,18880,13984,-1,-1,-1,-1,0,0,22,1,13,1,3,0,2,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1991,MA,1,8418,403,361,173,0,60,8779,636,820,13,4128,282,2899,137,1574,128,11,3,-1,-1,-1,-1,50,1,-1,-1,-9,-9,1437,207,8525,630,6682,420,269,82,8525,630,2407,298,-1,-1,4513,425,-2,-2,-2,-2,-2,-2,-9,-9,5650,-1,-1,-1,-1,-8,-8,14,0,8,0,3,0,1,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1991,MI,2,34689,1734,0,0,0,0,34689,1734,-9,-9,13951,635,19930,1055,542,27,126,11,-1,-1,-1,-1,23,2,-1,-1,-9,-9,659,31,34689,1734,34147,1707,0,0,34689,1734,8400,654,-1,-1,10472,825,-2,-2,-2,-2,-2,-2,26209,-9,-9,-1,-1,-1,-1,-8,-8,49,1,-8,-8,3,0,0,0,-1,-1,-1,-1,2,0,1,0,-1,-1,-9,-9\n1991,MN,2,3299,173,0,0,42,2,3341,175,-9,-9,1865,95,991,60,142,1,272,15,-1,-1,-1,-1,1,0,-1,-1,-9,-9,170,3,3299,173,3129,170,28,2,3299,173,1744,161,-1,-1,2084,188,-2,-2,-2,-2,-2,-2,3414,3414,3414,-1,-1,-1,-1,-8,-8,6,0,0,0,2,0,1,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1991,MS,3,7554,447,136,12,0,0,7690,459,783,64,2287,150,6055,355,34,3,7,0,-1,-1,-1,-1,9,0,-1,-1,-9,-9,38,3,8396,508,8358,505,4,0,8396,508,2978,316,-1,-1,3028,284,-2,-2,-2,-2,-2,-2,8524,8098,8524,-1,-1,-1,-1,0,0,11,0,1,0,0,1,3,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1991,MO,2,15076,821,0,0,0,0,15076,821,-9,-9,8103,444,6941,376,136,7,29,1,-1,-1,-1,-1,3,0,-1,-1,-9,-9,0,0,15076,821,14940,814,0,0,15076,821,5731,433,-1,-1,7174,628,-2,-2,-2,-2,-2,-2,15056,15411,-9,-1,-1,-1,-1,3,0,14,0,0,0,3,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1991,MT,4,1371,70,0,0,0,0,1371,70,-9,-9,1134,55,19,1,29,1,252,17,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,1405,73,1376,72,0,0,1405,73,453,36,-1,-1,544,46,-2,-2,-2,-2,-2,-2,1117,1441,1117,-1,-1,-1,-1,0,0,2,0,0,0,1,0,0,0,-1,-1,-1,-1,5,0,0,0,-1,-1,-9,-9\n1991,NE,2,2321,144,100,19,6,1,2427,164,-9,-9,1490,74,773,57,137,4,89,6,-1,-1,-1,-1,0,0,-1,-1,-9,-9,5,1,2357,138,2220,134,0,0,2357,138,977,87,-1,-1,1189,126,-2,-2,-2,-2,-2,-2,-9,-9,1706,-1,-1,-1,-1,0,0,1,0,0,0,1,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1991,NV,4,5266,434,0,0,131,11,5397,445,-9,-9,2895,246,1567,152,492,19,71,6,-1,-1,-1,-1,41,9,-1,-1,-9,-9,497,19,5071,432,4579,413,0,0,5071,432,2131,290,-1,-1,2689,293,-2,-2,-2,-2,-2,-2,6166,6166,5014,-1,-1,-1,-1,0,0,6,0,0,0,2,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1991,NH,1,1401,68,0,18,8,23,1409,109,-9,-9,1371,72,79,1,98,5,5,0,-1,-1,-1,-1,5,0,-1,-1,-9,-9,0,0,1460,73,1362,68,0,0,1460,73,633,44,-1,-1,613,24,-2,-2,-2,-2,-2,-2,1318,1542,1162,-1,-1,-1,-1,0,0,4,0,0,0,0,0,0,0,-1,-1,-1,-1,2,0,0,0,-1,-1,-9,-9\n1991,NJ,1,18195,877,0,0,0,0,18195,877,3367,156,6467,295,14226,779,3556,143,4,0,-1,-1,-1,-1,40,1,-1,-1,-9,-9,1639,32,22376,1107,17999,964,821,0,22376,1107,8046,619,-1,-1,9113,666,-2,-2,-2,-2,-2,-2,-9,-9,14898,-1,-1,-1,-1,0,0,27,2,66,0,1,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1991,NM,4,2859,143,88,15,28,4,2975,162,-9,-9,2551,129,300,16,1711,83,91,6,-1,-1,-1,-1,4,0,-1,-1,-9,-9,13,9,2959,160,1235,68,13,9,2959,160,1075,77,-1,-1,1532,151,-2,-2,-2,-2,-2,-2,3236,3236,3236,-1,-1,-1,-1,0,0,-9,-9,0,0,-9,-9,-9,0,-1,-1,-1,-1,-9,0,4,1,-1,-1,-9,-9\n1991,NY,1,54494,3368,0,0,0,0,54494,3368,-9,-9,26541,1640,27438,1713,17491,1232,131,4,-1,-1,-1,-1,151,4,-1,-1,-9,-9,233,7,54494,3368,36770,2129,233,7,54494,3368,21856,2263,-1,-1,24872,1904,-2,-2,-2,-2,-2,-2,58687,55699,48363,-1,-1,-1,-1,-8,-8,82,1,199,11,6,0,7,0,-1,-1,-1,-1,11,0,1,0,-1,-1,-9,-9\n1991,NC,3,17319,953,563,68,188,25,18070,1046,-9,-9,6338,409,10939,583,-9,-9,397,24,-1,-1,-1,-1,10,1,-1,-1,-9,-9,198,4,17882,1021,-9,-9,17882,1021,17882,1021,16339,1717,-1,-1,19387,1801,-2,-2,-2,-2,-2,-2,16126,19646,-9,-1,-1,-1,-1,1,0,23,2,14,0,2,0,1,0,-1,-1,-1,-1,2,0,1,0,-1,-1,-9,-9\n1991,ND,2,459,41,46,5,0,0,505,46,-9,-9,372,25,4,0,11,0,82,6,-1,-1,-1,-1,3,0,-1,-1,-9,-9,0,0,461,31,450,31,0,0,461,31,270,23,-1,-1,318,16,-2,-2,-2,-2,-2,-2,-9,576,576,-1,-1,-1,-1,-8,-8,0,0,0,0,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1991,OH,2,33189,2257,-9,-9,0,0,33189,2257,-9,-9,15555,878,17896,1415,-9,-9,0,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,33451,2293,-9,-9,33451,2293,33451,2293,16207,2170,-1,-1,16172,2044,-2,-2,-2,-2,-2,-2,-9,-9,20783,-1,-1,-1,-1,0,0,33,3,2,0,3,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1991,OK,3,10201,906,-9,-9,-8,-8,10201,906,411,23,6927,595,4090,562,332,19,703,57,-1,-1,-1,-1,0,0,-1,-1,-9,-9,384,22,12104,1236,11720,1215,52,2,12104,1236,4979,739,-1,-1,4568,620,-2,-2,-2,-2,-2,-2,8964,11243,-9,-1,-1,-1,-1,0,0,21,2,3,0,3,0,0,0,-1,-1,-1,-1,3,0,0,0,-1,-1,-9,-9\n1991,OR,4,5159,305,1048,91,0,0,6207,396,-9,-9,4698,296,849,74,531,9,123,24,-1,-1,-1,-1,49,2,-1,-1,-9,-9,604,13,6323,409,5722,396,70,4,6323,409,2984,324,-1,-1,5430,577,-2,-2,-2,-2,-2,-2,-9,6690,-9,-1,-1,-1,-1,0,0,12,0,0,0,2,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1991,PA,1,22306,1087,1,1,10,0,22317,1088,-9,-9,8042,428,12510,580,1679,76,26,2,-1,-1,-1,-1,43,2,-1,-1,-9,-9,1679,76,22300,1088,-9,-9,20621,1012,22300,1088,5952,483,-1,-1,7998,508,-2,-2,-2,-2,-2,-2,-9,-9,15915,-1,-1,-1,-1,0,0,54,1,19,0,3,0,2,0,-1,-1,-1,-1,1,0,3,0,-1,-1,-9,-9\n1991,RI,1,1663,53,418,101,505,43,2586,197,-9,-9,1717,139,843,56,412,17,5,0,-1,-1,-1,-1,11,0,-1,-1,-9,-9,0,0,2576,195,2164,178,0,0,2576,195,562,27,-1,-1,637,40,-2,-2,-2,-2,-2,-2,3042,3042,2789,-1,-1,-1,-1,-8,-8,1,0,1,0,0,0,0,0,-1,-1,-1,-1,0,0,1,0,-1,-1,-9,-9\n1991,SC,3,14301,755,904,104,18,0,15223,859,416,2,5767,332,11410,710,40,3,13,0,-1,-1,-1,-1,2,0,-1,-1,-9,-9,32,3,17224,1045,16390,1029,794,13,17224,1045,4940,402,-1,-1,5507,502,-2,-2,-2,-2,-2,-2,16138,16138,12335,-1,-1,-1,-1,1,0,27,1,12,0,2,0,5,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1991,SD,2,1310,81,0,0,0,0,1310,81,-9,-9,943,49,31,1,-9,-9,320,30,-1,-1,-1,-1,-9,-9,-1,-1,-9,-9,0,0,1294,80,-9,-9,1294,80,1294,80,515,68,-1,-1,657,74,-2,-2,-2,-2,-2,-2,1189,1130,1189,-1,-1,-1,-1,0,0,7,0,0,0,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1991,TN,3,9086,370,-9,-9,0,0,9086,370,1929,89,5618,239,5287,216,-9,-9,-9,-9,-1,-1,-1,-1,-9,-9,-1,-1,-9,-9,110,4,11015,459,-9,-9,11015,459,11015,459,3702,324,-1,-1,4841,423,-2,-2,-2,-2,-2,-2,9409,9349,9642,-1,-1,-1,-1,0,0,28,1,1,0,4,0,0,0,-1,-1,-1,-1,3,0,0,0,-1,-1,-9,-9\n1991,TX,3,49186,2491,0,0,0,0,49186,2491,-9,-9,14168,845,23249,1271,11578,367,2,4,-1,-1,-1,-1,189,4,-1,-1,-9,-9,11578,367,49186,2491,37608,2124,0,0,49186,2491,19223,2194,-1,-1,33203,2982,-2,-2,-2,-2,-2,-2,47770,50698,62212,-1,-1,-1,-1,5,0,-9,-9,18,0,-9,-9,-9,0,-1,-1,-1,-1,-9,0,88,0,-1,-1,-9,-9\n1991,UT,4,2567,130,19,1,71,6,2657,137,88,8,2167,97,207,15,414,21,60,7,-1,-1,-1,-1,36,0,-1,-1,-9,-9,35,1,2505,120,2056,98,35,1,2505,120,671,49,-1,-1,1356,136,-2,-2,-2,-2,-2,-2,3131,2890,-9,-1,-1,-1,-1,0,0,1,0,0,0,0,0,0,0,-1,-1,-1,-1,0,0,3,0,-1,-1,-9,-9\n1991,VT,1,679,24,230,7,142,6,1051,37,23,0,1081,37,-9,-9,-9,-9,-9,-9,-1,-1,-1,-1,-9,-9,-1,-1,-9,-9,0,0,1081,37,-9,-9,1081,37,1081,37,298,12,-1,-1,404,14,-2,-2,-2,-2,-2,-2,647,862,647,-1,-1,-1,-1,-8,-8,0,0,0,0,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1991,VA,3,16258,669,1,0,-8,-8,16259,669,1218,292,6562,380,12109,660,63,0,2,0,-1,-1,-1,-1,41,0,-1,-1,-9,-9,75,0,18789,1040,0,0,18726,1040,18789,1040,8749,967,-1,-1,9254,1017,-2,-2,-2,-2,-2,-2,13970,13970,13970,-1,-1,-1,-1,2,0,31,1,8,0,1,0,1,0,-1,-1,-1,-1,1,0,57,4,-1,-1,-9,-9\n1991,WA,4,8593,540,1,0,69,2,8663,542,-9,-9,6032,313,1810,156,1293,49,345,27,-1,-1,-1,-1,86,5,-1,-1,-9,-9,344,38,8617,539,7152,474,172,16,8617,539,3738,332,-1,-1,3452,292,-2,-2,-2,-2,-2,-2,5452,6710,6710,-1,-1,-1,-1,0,0,7,0,0,0,2,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1991,WV,3,1432,70,-8,-8,68,3,1500,73,263,24,1222,60,208,10,2,0,1,0,-1,-1,-1,-1,1,0,-1,-1,-9,-9,0,0,1432,70,1430,70,0,0,1432,70,551,33,-1,-1,711,42,-2,-2,-2,-2,-2,-2,1585,1644,1736,-1,-1,-1,-1,-8,-8,4,0,0,0,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1991,WI,2,7321,337,26,2,0,0,7347,339,68,10,4118,157,3148,177,469,8,171,7,-1,-1,-1,-1,15,0,-1,-1,-9,-9,54,2,7506,343,6971,333,66,2,7506,343,2962,246,-1,-1,3319,268,-2,-2,-2,-2,-2,-2,6497,6497,6497,-1,-1,-1,-1,-8,-8,4,0,1,0,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1991,WY,4,1042,57,30,0,0,0,1042,57,-9,-9,825,48,48,3,112,5,55,1,-1,-1,-1,-1,2,0,-1,-1,-9,-9,112,5,1042,57,930,52,0,0,1042,57,360,34,-1,-1,378,65,-2,-2,-2,-2,-2,-2,88,777,619,-1,-1,-1,-1,0,0,1,0,0,0,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1991,ST,7,670744,37449,8874,1199,9089,1280,688677,39928,17146,1158,319763,18716,351273,21245,89174,4260,5727,458,-1,-1,-1,-1,2521,111,-1,-1,0,0,31312,1399,710596,41929,440979,27451,180443,10218,710596,41929,288408,28829,-1,-1,399807,37184,-2,-2,-2,-2,-2,-2,415191,484149,429204,-1,-1,-1,-1,17,0,787,26,506,14,88,1,35,0,-1,-1,-1,-1,55,0,314,13,-1,-1,0,0\n1991,US,5,719007,41388,11927,1587,16958,1698,747862,44673,17146,1158,363274,22073,371864,23381,106979,5541,6860,547,-1,-1,-1,-1,3240,183,-1,-1,0,0,31312,1399,776550,47583,489128,31824,180443,10218,776550,47583,288408,28829,-1,-1,399807,37184,-2,-2,-2,-2,-2,-2,458944,484149,429204,-1,-1,-1,-1,17,0,787,26,506,14,88,1,35,0,-1,-1,-1,-1,55,0,314,13,-1,-1,0,0\n1991,FE,6,48263,3939,3053,388,7869,418,59185,4745,-9,-9,43511,3357,20591,2136,17805,1281,1133,89,-1,-1,-1,-1,719,72,-1,-1,-9,-9,0,0,65954,5654,48149,4373,0,0,65954,5654,-9,-9,-1,-1,-9,-9,-2,-2,-2,-2,-2,-2,43753,-9,-9,-1,-1,-1,-1,-9,0,-9,-9,-9,-9,-9,-9,-9,0,-1,-1,-1,-1,-9,0,-9,-9,-1,-1,-9,-9\n1992,AL,3,15600,1036,455,60,0,0,16055,1096,923,43,5658,387,10660,711,1,0,4,1,-1,-1,-1,-1,2,0,-1,-1,-9,-9,28,2,16352,1101,16351,1101,0,0,16352,1101,5365,605,-1,-1,6942,739,-2,-2,-2,-2,-2,-2,14788,14788,14788,-1,-1,-1,-1,2,0,-9,-9,-9,-9,-9,-9,-9,-9,-1,-1,-1,-1,-9,0,55,1,-1,-1,-9,-9\n1992,AK,4,1629,57,133,9,624,46,2386,112,-9,-9,1377,82,327,28,75,1,902,35,-1,-1,-1,-1,35,2,-1,-1,-9,-9,75,2,2716,149,2641,148,0,0,2716,149,1097,123,-1,-1,1283,104,-2,-2,-2,-2,-2,-2,2472,-9,-9,-1,-1,-1,-1,-8,-8,0,0,0,0,3,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1992,AZ,4,14889,961,587,40,0,0,15476,1001,95,0,12144,728,2654,234,4757,236,535,34,-1,-1,-1,-1,15,0,-1,-1,-9,-9,128,5,15476,1001,10719,765,0,0,15476,1001,5316,507,-1,-1,6035,663,-2,-2,-2,-2,-2,-2,-9,15520,-9,-1,-1,-1,-1,1,0,28,2,0,0,8,0,1,0,-1,-1,-1,-1,2,0,0,0,-1,-1,-9,-9\n1992,AR,3,7224,434,48,3,0,0,7272,437,446,50,3344,181,4449,282,25,0,1,1,-1,-1,-1,-1,2,0,-1,-1,-9,-9,25,0,7821,464,7796,464,0,0,7821,464,2978,322,-1,-1,3732,395,-2,-2,-2,-2,-2,-2,-9,7614,-9,-1,-1,-1,-1,2,0,12,0,1,1,1,0,0,0,-1,-1,-1,-1,2,0,0,0,-1,-1,-9,-9\n1992,CA,4,99494,5973,0,0,3255,774,102749,6747,-9,-9,63015,3800,34279,2371,33749,1376,630,94,-1,-1,-1,-1,-9,-9,-1,-1,-9,-9,4825,482,102749,6747,63545,4795,5455,576,102749,6747,36519,3639,-1,-1,80385,7140,-2,-2,-2,-2,-2,-2,-9,-9,57367,-1,-1,-1,-1,1,0,65,2,41,0,13,0,1,0,-1,-1,-1,-1,9,0,5,0,-1,-1,-9,-9\n1992,CO,4,7957,503,-9,-9,-8,-8,7957,503,513,24,6012,328,1912,177,2138,89,140,7,-1,-1,-1,-1,31,0,-1,-1,-9,-9,375,15,8470,527,5957,423,375,15,8470,527,3005,257,-1,-1,3503,251,-2,-2,-2,-2,-2,-2,-9,7496,6136,-1,-1,-1,-1,0,0,6,0,1,0,2,0,1,0,-1,-1,-1,-1,4,0,0,0,-1,-1,-9,-9\n1992,CT,1,8073,411,641,79,1707,144,10421,634,-9,-9,2969,249,4897,305,2796,153,9,2,-1,-1,-1,-1,21,1,-1,-1,-9,-9,2797,153,10693,710,7896,557,1,0,10693,710,4629,420,-1,-1,8634,935,-2,-2,-2,-2,-2,-2,10093,11102,-9,-1,-1,-1,-1,0,0,-9,-9,31,3,-9,-9,-9,-9,-1,-1,-1,-1,-9,0,47,3,-1,-1,-9,-9\n1992,DE,3,2544,134,611,75,561,50,3716,259,-9,-9,1205,79,2476,189,161,8,1,0,-1,-1,-1,-1,2,2,-1,-1,-9,-9,93,4,3777,274,3562,258,54,8,3777,274,929,89,-1,-1,982,106,-2,-2,-2,-2,-2,-2,4009,3987,2928,-1,-1,-1,-1,1,0,6,0,4,0,2,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1992,DC,3,6717,256,1442,90,1506,232,9665,578,-9,-9,159,29,9996,691,10,0,0,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,10155,720,10027,718,118,2,10155,720,828,72,-1,-1,6848,312,-2,-2,-2,-2,-2,-2,11087,11087,8746,-1,-1,-1,-1,-8,-8,-9,-9,-9,-9,-9,-9,-9,-9,-1,-1,-1,-1,-9,0,-9,-9,-1,-1,-9,-9\n1992,FL,3,45688,2597,15,2,-8,-8,45703,2599,-9,-9,18057,990,26823,1601,3003,57,18,0,-1,-1,-1,-1,161,7,-1,-1,-9,-9,644,1,45703,2599,42700,2542,0,0,45703,2599,27122,2854,-1,-1,29442,3430,-2,-2,-2,-2,-2,-2,49939,55100,37887,-1,-1,-1,-1,2,0,60,0,65,2,6,0,2,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1992,GA,3,23464,1384,371,71,-8,-8,23835,1455,-9,-9,7586,508,16125,939,166,5,21,0,-1,-1,-1,-1,6,0,-1,-1,-9,-9,97,8,23835,1455,0,0,23669,1450,23835,1455,10961,1160,-1,-1,13225,1359,-2,-2,-2,-2,-2,-2,-9,25252,-9,-1,-1,-1,-1,0,0,30,2,32,2,3,0,0,0,-1,-1,-1,-1,0,0,11,0,-1,-1,-9,-9\n1992,HI,4,1884,90,45,11,597,47,2526,148,-9,-9,547,58,156,12,184,13,39,7,-1,-1,-1,-1,1547,89,-1,-1,-9,-9,440,31,2729,197,2445,180,100,4,2729,197,818,103,-1,-1,1251,130,-2,-2,-2,-2,-2,-2,-9,2382,1566,-1,-1,-1,-1,-8,-8,3,1,0,0,1,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1992,ID,4,2055,109,0,0,0,0,2055,109,202,38,1983,111,26,1,301,13,92,10,-1,-1,-1,-1,20,1,-1,-1,-9,-9,10,2,2131,125,1793,105,37,7,2131,125,979,94,-1,-1,1220,123,-2,-2,-2,-2,-2,-2,2015,2158,-9,-1,-1,-1,-1,0,0,5,0,1,0,1,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1992,IL,2,30184,1456,-9,-9,0,0,30184,1456,-9,-9,7865,419,19444,950,2798,76,29,8,-1,-1,-1,-1,38,3,-1,-1,-9,-9,2808,76,30184,1456,27376,1380,10,0,30184,1456,14595,1188,-1,-1,16262,1142,-2,-2,-2,-2,-2,-2,24562,24562,20818,-1,-1,-1,-1,0,0,33,0,14,0,3,0,1,0,-1,-1,-1,-1,5,0,6,0,-1,-1,-9,-9\n1992,IN,2,13058,733,144,4,5,1,13207,738,761,18,7906,424,5255,312,300,6,35,1,-1,-1,-1,-1,11,1,-1,-1,-9,-9,0,0,13207,738,12907,732,0,0,13207,738,5464,480,-1,-1,5830,477,-2,-2,-2,-2,-2,-2,11983,13817,-9,-1,-1,-1,-1,0,0,33,1,-9,0,2,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1992,IA,2,4275,243,-8,-8,-8,-8,4275,243,-9,-9,3169,160,1000,76,109,3,66,6,-1,-1,-1,-1,11,0,-1,-1,-9,-9,29,1,4275,243,4113,231,53,9,4275,243,1955,213,-1,-1,2739,228,-2,-2,-2,-2,-2,-2,3265,3265,3265,-1,-1,-1,-1,-8,-8,4,0,0,0,0,0,0,0,-1,-1,-1,-1,1,0,1,0,-1,-1,-9,-9\n1992,KS,2,5712,321,0,0,0,0,5712,321,-9,-9,3115,152,2112,152,340,12,96,6,-1,-1,-1,-1,43,0,-1,-1,-9,-9,340,12,5706,322,5366,310,0,0,5706,322,1942,244,-1,-1,3255,325,-2,-2,-2,-2,-2,-2,6621,-9,-9,-1,-1,-1,-1,-8,-8,7,0,1,0,0,0,0,0,-1,-1,-1,-1,1,0,2,0,-1,-1,-9,-9\n1992,KY,3,8389,331,0,0,0,0,8389,331,489,85,6676,332,3140,212,7,0,0,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,3,1,9819,545,9812,545,0,0,9819,545,3946,417,-1,-1,4802,505,-2,-2,-2,-2,-2,-2,9119,8923,-9,-1,-1,-1,-1,0,0,16,0,3,0,2,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1992,LA,3,15631,537,63,2,0,0,15694,539,4180,483,4571,235,15303,787,-9,-9,-9,-9,-1,-1,-1,-1,-9,-9,-1,-1,-9,-9,0,0,19874,1022,-9,-9,19874,1022,19874,1022,7377,678,-1,-1,8876,722,-2,-2,-2,-2,-2,-2,17131,17131,17131,-1,-1,-1,-1,0,0,35,0,-9,-9,-9,-9,-9,-9,-1,-1,-1,-1,-9,0,7,0,-1,-1,-9,-9\n1992,ME,1,1428,55,25,2,-8,-8,1453,57,-9,-9,1411,56,29,4,12,1,15,0,-1,-1,-1,-1,4,0,-1,-1,-9,-9,0,0,1459,60,1447,59,0,0,1459,60,570,31,-1,-1,855,42,-2,-2,-2,-2,-2,-2,1353,1353,1353,-1,-1,-1,-1,-8,-8,4,0,0,0,2,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1992,MD,3,17704,820,1020,133,-8,-8,18724,953,-9,-9,4387,258,14570,690,0,0,2,1,-1,-1,-1,-1,0,0,-1,-1,-9,-9,64,5,19023,954,0,0,19023,954,19023,954,6901,571,-1,-1,7563,577,-2,-2,-2,-2,-2,-2,-9,19804,12856,-1,-1,-1,-1,0,0,22,0,13,0,1,0,0,0,-1,-1,-1,-1,5,0,0,0,-1,-1,-9,-9\n1992,MA,1,9280,385,209,131,0,48,9489,564,908,8,4702,279,3062,113,1780,117,11,5,-1,-1,-1,-1,63,1,-1,-1,-9,-9,1651,166,9489,564,7530,395,179,52,9489,564,2321,254,-1,-1,4207,351,-2,-2,-2,-2,-2,-2,-9,-9,6999,-1,-1,-1,-1,-8,-8,9,0,14,1,4,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1992,MI,2,37271,1842,0,0,0,0,37271,1842,-9,-9,15118,672,21272,1129,597,22,144,6,-1,-1,-1,-1,20,2,-1,-1,-9,-9,717,33,37271,1842,36674,1820,0,0,37271,1842,8228,707,-1,-1,10325,876,-2,-2,-2,-2,-2,-2,27086,-9,-9,-1,-1,-1,-1,-8,-8,68,1,-9,-9,4,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1992,MN,2,3598,183,0,0,58,10,3656,193,0,0,2008,104,1126,64,168,3,288,16,-1,-1,-1,-1,2,0,-1,-1,-9,-9,210,4,3634,188,3462,185,4,0,3634,188,1972,172,-1,-1,2354,214,-2,-2,-2,-2,-2,-2,3678,3678,3678,-1,-1,-1,-1,-8,-8,4,1,0,0,1,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1992,MS,3,7316,424,118,15,0,0,7434,439,841,66,2147,149,6069,353,36,2,7,0,-1,-1,-1,-1,10,1,-1,-1,-9,-9,42,2,8275,505,8233,503,6,0,8275,505,3679,356,-1,-1,4199,384,-2,-2,-2,-2,-2,-2,8557,9083,9007,-1,-1,-1,-1,0,0,28,2,-9,-9,1,0,1,1,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1992,MO,2,15262,919,8,0,-8,-8,15270,919,-9,-9,7946,472,7282,444,176,8,33,1,-1,-1,-1,-1,7,2,-1,-1,-9,-9,2,0,15270,919,15080,911,14,0,15270,919,6031,640,-1,-1,8252,715,-2,-2,-2,-2,-2,-2,15630,16187,-9,-1,-1,-1,-1,1,0,18,2,3,0,2,1,0,0,-1,-1,-1,-1,3,0,0,0,-1,-1,-9,-9\n1992,MT,4,1385,81,0,0,-8,-8,1385,81,-9,-9,1144,64,24,1,23,0,249,16,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,1417,81,1394,81,0,0,1417,81,470,44,-1,-1,634,44,-2,-2,-2,-2,-2,-2,1160,1465,1160,-1,-1,-1,-1,0,0,3,0,1,0,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1992,NE,2,2419,158,59,17,16,1,2494,176,-9,-9,1472,88,787,73,138,9,80,10,-1,-1,-1,-1,0,0,-1,-1,-9,-9,2,2,2341,173,2203,164,0,0,2341,173,980,95,-1,-1,1257,125,-2,-2,-2,-2,-2,-2,-9,-9,1706,-1,-1,-1,-1,0,0,6,0,1,0,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1992,NV,4,5404,416,0,0,152,6,5556,422,-9,-9,3379,267,1622,144,496,14,70,7,-1,-1,-1,-1,42,6,-1,-1,-9,-9,498,14,5611,438,5110,424,5,0,5611,438,2229,268,-1,-1,2659,345,-2,-2,-2,-2,-2,-2,5743,5743,4770,-1,-1,-1,-1,0,0,10,0,1,0,2,1,1,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1992,NH,1,1719,77,0,16,18,34,1737,127,-9,-9,1609,77,78,1,118,6,5,0,-1,-1,-1,-1,6,1,-1,-1,-9,-9,0,0,1698,79,1580,73,0,0,1698,79,686,42,-1,-1,630,42,-2,-2,-2,-2,-2,-2,1358,1576,1162,-1,-1,-1,-1,0,0,3,0,2,0,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1992,NJ,1,18175,942,0,0,0,0,18175,942,3370,153,6267,361,14038,709,3662,144,5,0,-1,-1,-1,-1,41,2,-1,-1,-9,-9,1207,23,21558,1095,17878,949,18,2,21558,1095,8327,729,-1,-1,12401,924,-2,-2,-2,-2,-2,-2,-9,-9,14980,-1,-1,-1,-1,0,0,36,1,62,3,1,0,0,0,-1,-1,-1,-1,1,0,12,0,-1,-1,-9,-9\n1992,NM,4,2974,165,98,19,32,2,3104,186,-9,-9,2622,149,339,26,1761,96,112,7,-1,-1,-1,-1,4,0,-1,-1,-9,-9,10,2,3087,184,1316,86,10,2,3087,184,1321,114,-1,-1,1964,153,-2,-2,-2,-2,-2,-2,3427,3290,3443,-1,-1,-1,-1,0,0,-9,-9,0,0,-9,-9,-9,-9,-1,-1,-1,-1,-9,0,6,3,-1,-1,-9,-9\n1992,NY,1,58237,3499,0,0,0,0,58237,3499,-9,-9,28039,1660,29314,1812,18686,1236,120,6,-1,-1,-1,-1,197,4,-1,-1,-9,-9,567,17,58237,3499,38984,2246,567,17,58237,3499,23265,1888,-1,-1,25966,2187,-2,-2,-2,-2,-2,-2,60054,57005,49543,-1,-1,-1,-1,-8,-8,65,1,194,16,9,0,2,0,-1,-1,-1,-1,12,0,10,1,-1,-1,-9,-9\n1992,NC,3,19051,914,453,36,179,29,19683,979,-9,-9,6658,340,12167,577,-9,-9,447,24,-1,-1,-1,-1,16,0,-1,-1,-9,-9,216,9,19504,950,-9,-9,19504,950,19504,950,18496,1786,-1,-1,21100,2057,-2,-2,-2,-2,-2,-2,17913,20900,-9,-1,-1,-1,-1,1,0,23,0,10,1,2,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1992,ND,2,471,30,48,1,0,0,519,31,-9,-9,367,8,7,1,11,0,86,5,-1,-1,-1,-1,3,0,-1,-1,-9,-9,0,0,463,14,452,14,0,0,463,14,232,11,-1,-1,304,26,-2,-2,-2,-2,-2,-2,-9,576,576,-1,-1,-1,-1,-8,-8,0,0,0,0,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1992,OH,2,35633,2364,-9,-9,0,0,35633,2364,-9,-9,16793,924,19166,1495,-9,-9,0,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,35959,2419,-9,-9,35959,2419,35959,2419,16984,2351,-1,-1,18355,2463,-2,-2,-2,-2,-2,-2,-9,-9,21738,-1,-1,-1,-1,0,0,65,2,11,0,2,0,1,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1992,OK,3,11184,1027,-9,-9,-8,-8,11184,1027,442,29,7489,658,4644,651,444,26,832,63,-1,-1,-1,-1,0,0,-1,-1,-9,-9,456,28,13421,1400,12965,1372,12,2,13421,1400,5748,790,-1,-1,5042,705,-2,-2,-2,-2,-2,-2,9130,12451,-9,-1,-1,-1,-1,2,0,29,2,2,0,4,0,4,0,-1,-1,-1,-1,5,0,0,0,-1,-1,-9,-9\n1992,OR,4,4941,221,1213,112,0,0,6154,333,-9,-9,4546,256,855,56,629,9,114,13,-1,-1,-1,-1,63,3,-1,-1,-9,-9,666,11,6244,339,5579,328,36,2,6244,339,1875,174,-1,-1,4381,471,-2,-2,-2,-2,-2,-2,-9,6557,-9,-1,-1,-1,-1,0,0,10,1,1,0,2,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1992,PA,1,23868,1100,2,6,13,1,23883,1107,-9,-9,8200,402,13542,614,2032,87,31,1,-1,-1,-1,-1,63,2,-1,-1,-9,-9,2032,87,23868,1106,-9,-9,21836,1019,23868,1106,5971,436,-1,-1,7944,539,-2,-2,-2,-2,-2,-2,-9,-9,16713,-1,-1,-1,-1,0,0,55,3,13,0,4,0,5,0,-1,-1,-1,-1,2,0,0,0,-1,-1,-9,-9\n1992,RI,1,1644,48,440,72,485,50,2569,170,-9,-9,1727,134,844,47,396,16,5,0,-1,-1,-1,-1,18,0,-1,-1,-9,-9,0,0,2594,181,2198,165,0,0,2594,181,539,36,-1,-1,816,52,-2,-2,-2,-2,-2,-2,3292,3292,3292,-1,-1,-1,-1,-8,-8,1,0,0,0,0,0,1,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1992,SC,3,14472,817,1027,133,13,0,15512,950,408,12,5601,379,11857,740,38,7,10,0,-1,-1,-1,-1,3,0,-1,-1,-9,-9,45,8,17516,1127,16819,1106,659,14,17516,1127,5763,565,-1,-1,7137,613,-2,-2,-2,-2,-2,-2,16216,16216,12527,-1,-1,-1,-1,0,0,30,4,21,0,2,0,1,0,-1,-1,-1,-1,2,0,0,0,-1,-1,-9,-9\n1992,SD,2,1426,83,0,0,0,0,1426,83,-9,-9,1029,50,341,28,-9,-9,38,1,-1,-1,-1,-1,-9,-9,-1,-1,-9,-9,0,0,1408,79,-9,-9,1408,79,1408,79,629,54,-1,-1,671,70,-2,-2,-2,-2,-2,-2,1189,1130,1189,-1,-1,-1,-1,0,0,2,1,-9,-9,0,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1992,TN,3,10351,378,-9,-9,0,0,10351,378,970,150,5685,296,5586,230,-9,-9,-9,-9,-1,-1,-1,-1,-9,-9,-1,-1,-9,-9,50,2,11321,528,-9,-9,11321,528,11321,528,3960,354,-1,-1,5921,468,-2,-2,-2,-2,-2,-2,11119,10837,11463,-1,-1,-1,-1,0,0,23,1,3,0,2,0,0,0,-1,-1,-1,-1,3,0,1,0,-1,-1,-9,-9\n1992,TX,3,58691,2487,0,0,0,0,58691,2487,-9,-9,16594,779,27588,1317,14307,385,0,1,-1,-1,-1,-1,222,5,-1,-1,-9,-9,14307,385,58691,2487,44384,2102,0,0,58691,2487,22245,1658,-1,-1,27824,2561,-2,-2,-2,-2,-2,-2,57455,54459,-9,-1,-1,-1,-1,12,0,-9,-9,54,0,-9,-9,-9,-9,-1,-1,-1,-1,-9,0,84,2,-1,-1,-9,-9\n1992,UT,4,2746,113,14,0,78,7,2838,120,92,16,2184,103,234,18,407,25,99,3,-1,-1,-1,-1,41,0,-1,-1,-9,-9,17,0,2575,124,2151,99,17,0,2575,124,690,55,-1,-1,1469,119,-2,-2,-2,-2,-2,-2,3184,2897,-9,-1,-1,-1,-1,1,0,4,0,0,0,1,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1992,VT,1,799,23,243,18,123,5,1165,46,11,0,1208,46,-9,-9,0,0,-9,-9,-1,-1,-1,-1,-9,-9,-1,-1,-9,-9,0,0,1208,46,0,0,1208,46,1208,46,216,16,-1,-1,331,19,-2,-2,-2,-2,-2,-2,847,852,647,-1,-1,-1,-1,-8,-8,0,0,0,0,0,0,0,0,-1,-1,-1,-1,0,0,1,0,-1,-1,-9,-9\n1992,VA,3,16269,665,0,0,-8,-8,16269,665,1773,210,7014,422,12896,738,60,3,4,0,-1,-1,-1,-1,52,0,-1,-1,-9,-9,70,3,20036,1163,0,0,19976,1160,20036,1163,9916,1115,-1,-1,10710,1196,-2,-2,-2,-2,-2,-2,13852,13852,13852,-1,-1,-1,-1,4,0,30,0,18,0,2,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1992,WA,4,9320,619,1,0,40,1,9361,620,-9,-9,6567,374,2036,169,1476,60,346,33,-1,-1,-1,-1,149,7,-1,-1,-9,-9,243,35,9341,618,7744,541,121,17,9341,618,4405,391,-1,-1,4291,382,-2,-2,-2,-2,-2,-2,6190,7779,7779,-1,-1,-1,-1,0,0,13,0,0,0,2,1,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1992,WV,3,1594,80,-8,-8,0,0,1594,80,362,19,1354,72,239,8,2,1,1,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,1594,80,1592,79,0,0,1594,80,443,46,-1,-1,374,41,-2,-2,-2,-2,-2,-2,1680,1745,1730,-1,-1,-1,-1,-8,-8,8,0,0,0,0,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1992,WI,2,7672,320,17,3,166,13,7855,336,223,15,4518,192,3775,186,527,20,148,6,-1,-1,-1,-1,13,1,-1,-1,-9,-9,65,8,8519,393,7934,372,58,1,8519,393,3511,281,-1,-1,3362,272,-2,-2,-2,-2,-2,-2,6342,6342,6342,-1,-1,-1,-1,-8,-8,11,0,1,0,3,0,1,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1992,WY,4,999,64,0,0,1,0,1000,64,-9,-9,795,52,48,4,98,6,56,2,-1,-1,-1,-1,2,0,-1,-1,-9,-9,98,6,999,64,901,58,0,0,999,64,344,34,-1,-1,415,27,-2,-2,-2,-2,-2,-2,977,977,977,-1,-1,-1,-1,1,0,4,0,0,0,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1992,ST,7,717770,38885,9550,1160,9629,1501,736949,41546,17009,1419,337938,19395,376471,22472,99000,4351,5976,439,-1,-1,-1,-1,2986,143,-1,-1,0,0,35952,1645,759303,44094,478616,29386,181687,10357,759303,44094,304772,29529,-1,-1,408959,38146,-2,-2,-2,-2,-2,-2,444516,504230,380114,-1,-1,-1,-1,31,0,927,30,619,29,100,3,23,1,-1,-1,-1,-1,67,0,248,10,-1,-1,0,0\n1992,US,5,773842,43554,12636,1597,17080,1857,803558,47008,17009,1419,386103,23162,399775,24931,119225,5793,7160,525,-1,-1,-1,-1,3793,230,-1,-1,0,0,36352,1645,833163,50493,531851,34343,182087,10357,833163,50493,304772,29529,-1,-1,408959,38146,-2,-2,-2,-2,-2,-2,497273,504230,380114,-1,-1,-1,-1,31,0,927,30,619,29,100,3,23,1,-1,-1,-1,-1,67,0,248,10,-1,-1,0,0\n1992,FE,6,56072,4669,3086,437,7451,356,66609,5462,-9,-9,48165,3767,23304,2459,20225,1442,1184,86,-1,-1,-1,-1,807,87,-1,-1,-9,-9,400,0,73860,6399,53235,4957,400,0,73860,6399,-9,-9,-1,-1,-9,-9,-2,-2,-2,-2,-2,-2,52757,-9,-9,-1,-1,-1,-1,-9,0,-9,-9,-9,-9,-9,-9,-9,-9,-1,-1,-1,-1,-9,0,-9,-9,-1,-1,-9,-9\n1993,AL,3,16781,1077,409,46,0,0,17190,1123,1156,48,6011,400,11450,729,2,0,3,1,-1,-1,-1,-1,3,0,-1,-1,-9,-9,26,1,17493,1131,17491,1131,0,0,17493,1131,5869,622,-1,-1,6773,735,-2,-2,-2,-2,-2,-2,15979,15979,15979,-1,-1,-1,-1,0,0,-9,-9,8,0,-9,-9,-9,-9,-1,-1,-1,-1,-9,-9,42,4,-1,-1,-9,-9\n1993,AK,4,2581,122,-9,-9,-9,-9,2581,122,-9,-9,1325,60,313,23,58,4,853,34,-1,-1,-1,-1,32,1,-1,-1,-9,-9,58,4,2581,122,2523,118,0,0,2581,122,943,125,-1,-1,1674,180,-2,-2,-2,-2,-2,-2,2523,2602,-9,-1,-1,-1,-1,-8,-8,3,0,0,0,3,0,4,1,-1,-1,-1,-1,2,0,2,0,-1,-1,-9,-9\n1993,AZ,4,16167,993,607,44,0,0,16774,1037,157,0,13164,772,2865,222,5330,259,543,41,-1,-1,-1,-1,22,1,-1,-1,-9,-9,180,1,16774,1037,11442,777,2,1,16774,1037,6042,564,-1,-1,6170,693,-2,-2,-2,-2,-2,-2,-9,16089,-9,-1,-1,-1,-1,2,0,33,1,0,0,5,0,2,0,-1,-1,-1,-1,1,0,1,0,-1,-1,-9,-9\n1993,AR,3,7112,462,106,22,0,0,7218,484,667,0,3444,209,4642,283,31,1,8,1,-1,-1,-1,-1,5,1,-1,-1,-9,-9,31,1,8130,495,8099,494,0,0,8130,495,2452,285,-1,-1,3656,391,-2,-2,-2,-2,-2,-2,-9,8014,-9,-1,-1,-1,-1,0,0,9,0,0,0,1,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1993,CA,4,108828,6745,0,0,3542,836,112370,7581,-9,-9,71139,4622,36461,2643,39362,1858,748,80,-1,-1,-1,-1,1046,43,-1,-1,-9,-9,2976,193,112370,7581,70032,5530,2976,193,112370,7581,39210,3939,-1,-1,81850,7233,-2,-2,-2,-2,-2,-2,-9,-9,63293,-1,-1,-1,-1,1,0,93,2,61,1,27,1,2,0,-1,-1,-1,-1,12,0,0,0,-1,-1,-9,-9\n1993,CO,4,8412,490,-9,-9,-8,-9,8412,490,508,52,6469,333,2152,175,2299,101,160,8,-1,-1,-1,-1,39,0,-1,-1,-9,-9,100,26,8920,542,6521,415,100,26,8920,542,2882,249,-1,-1,3680,365,-2,-2,-2,-2,-2,-2,-9,7880,6612,-1,-1,-1,-1,0,0,10,0,1,0,2,0,1,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1993,CT,1,9637,595,856,129,1982,185,12475,909,-9,-9,3323,349,5873,437,3463,208,8,0,-1,-1,-1,-1,30,0,-1,-1,-9,-9,3463,208,12697,994,9234,786,0,0,12697,994,2692,315,-1,-1,5262,562,-2,-2,-2,-2,-2,-2,12133,13347,-9,-1,-1,-1,-1,0,0,-9,-9,43,2,1,0,-9,-9,-1,-1,-1,-1,-9,-9,43,2,-1,-1,-9,-9\n1993,DE,3,2653,126,663,79,566,42,3882,247,-9,-9,1264,62,2606,194,181,9,0,0,-1,-1,-1,-1,1,1,-1,-1,-9,-9,82,0,3953,257,3678,242,94,6,3953,257,881,94,-1,-1,1110,141,-2,-2,-2,-2,-2,-2,-9,4206,3192,-1,-1,-1,-1,2,0,6,0,0,0,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1993,DC,3,8370,321,294,90,1181,86,9845,497,-9,-9,135,27,10023,660,18,0,0,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,10158,687,10007,685,133,2,10158,687,581,70,-1,-1,5820,259,-2,-2,-2,-2,-2,-2,10330,10330,8746,-1,-1,-1,-1,-8,-8,-9,-9,-9,-9,-9,-9,-9,-9,-1,-1,-1,-1,-9,-9,-9,-9,-1,-1,-9,-9\n1993,FL,3,50187,2696,162,3,-8,-8,50349,2699,-9,-9,19949,1080,29385,1612,3245,64,21,0,-1,-1,-1,-1,151,7,-1,-1,-9,-9,843,0,50349,2699,47104,2635,0,0,50349,2699,22766,2530,-1,-1,24633,3055,-2,-2,-2,-2,-2,-2,54041,53501,41030,-1,-1,-1,-1,3,0,75,1,78,1,5,0,1,0,-1,-1,-1,-1,3,0,0,0,-1,-1,-9,-9\n1993,GA,3,25386,1693,637,67,-8,-8,26023,1760,-9,-9,8153,608,17713,1142,193,2,20,4,-1,-1,-1,-1,44,4,-1,-1,-9,-9,93,2,26023,1760,0,0,25830,1758,26023,1760,9846,1059,-1,-1,11806,995,-2,-2,-2,-2,-2,-2,-9,27791,-9,-1,-1,-1,-1,2,0,32,0,38,2,3,0,1,0,-1,-1,-1,-1,0,0,2,1,-1,-1,-9,-9\n1993,HI,4,1953,98,71,5,634,53,2658,156,-9,-9,581,56,152,11,144,10,42,4,-1,-1,-1,-1,1636,111,-1,-1,-9,-9,512,24,2923,206,2675,196,104,0,2923,206,914,96,-1,-1,1532,183,-2,-2,-2,-2,-2,-2,-9,2627,1672,-1,-1,-1,-1,-8,-8,2,0,0,0,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1993,ID,4,2356,144,0,0,0,0,2356,144,192,21,2237,134,47,2,358,20,121,6,-1,-1,-1,-1,21,1,-1,-1,-9,-9,32,5,2458,148,2071,125,29,3,2458,148,1192,135,-1,-1,1273,147,-2,-2,-2,-2,-2,-2,1929,2177,-9,-1,-1,-1,-1,0,0,3,0,1,0,4,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1993,IL,2,32807,1688,-9,-9,0,0,32807,1688,-9,-9,8105,464,21428,1107,3180,109,39,6,-1,-1,-1,-1,55,2,-1,-1,-9,-9,3180,109,32807,1688,29627,1579,0,0,32807,1688,15504,1292,-1,-1,17577,1285,-2,-2,-2,-2,-2,-2,26369,26369,22625,-1,-1,-1,-1,0,0,59,4,22,1,3,1,3,0,-1,-1,-1,-1,8,1,1,0,-1,-1,-9,-9\n1993,IN,2,13591,773,96,4,5,1,13692,778,981,24,8072,434,5565,341,286,9,41,3,-1,-1,-1,-1,14,0,-1,-1,-9,-9,0,0,13692,778,13406,769,0,0,13692,778,5716,501,-1,-1,5765,492,-2,-2,-2,-2,-2,-2,12255,14289,-9,-1,-1,-1,-1,0,0,26,0,1,0,2,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1993,IA,2,4617,281,-8,-8,-8,-8,4617,281,-9,-9,3288,170,1121,100,116,6,60,5,-1,-1,-1,-1,17,0,-1,-1,-9,-9,131,6,4617,281,4486,275,15,0,4617,281,1939,205,-1,-1,2943,288,-2,-2,-2,-2,-2,-2,3265,3265,3265,-1,-1,-1,-1,-8,-8,7,0,0,0,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1993,KS,2,5456,276,-8,-8,-8,-8,5456,276,-9,-9,3246,146,2099,124,275,10,72,4,-1,-1,-1,-1,35,1,-1,-1,-9,-9,0,0,5452,275,5177,265,0,0,5452,275,1856,199,-1,-1,3767,387,-2,-2,-2,-2,-2,-2,6600,-9,-9,-1,-1,-1,-1,-8,-8,8,0,0,0,0,0,2,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1993,KY,3,8240,382,0,0,0,0,8240,382,378,18,6607,316,3275,228,23,0,0,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,13,1,9895,545,9872,545,0,0,9895,545,3753,410,-1,-1,5215,534,-2,-2,-2,-2,-2,-2,9560,9383,-9,-1,-1,-1,-1,0,0,20,1,2,0,2,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1993,LA,3,15537,541,-8,-8,-8,-8,15537,541,5817,573,4885,336,16424,777,-9,-9,3,0,-1,-1,-1,-1,2,0,-1,-1,-9,-9,40,1,21354,1114,-9,-9,21354,1114,21354,1114,7859,467,-1,-1,9632,773,-2,-2,-2,-2,-2,-2,17131,17131,17131,-1,-1,-1,-1,1,0,-9,-9,-9,-9,-9,-9,-9,-9,-1,-1,-1,-1,-9,-9,60,2,-1,-1,-9,-9\n1993,ME,1,1363,51,22,1,-8,-8,1385,52,-9,-9,1368,46,34,3,2,0,10,1,-1,-1,-1,-1,3,0,-1,-1,-9,-9,4,0,1419,50,1417,50,0,0,1419,50,467,17,-1,-1,765,38,-2,-2,-2,-2,-2,-2,1353,1353,1353,-1,-1,-1,-1,-8,-8,4,0,0,0,1,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1993,MD,3,18022,841,996,133,-8,-8,19018,974,-9,-9,4414,248,14816,723,0,0,2,1,-1,-1,-1,-1,0,0,-1,-1,-9,-9,56,4,19288,976,0,0,19288,976,19288,976,6583,540,-1,-1,7882,605,-2,-2,-2,-2,-2,-2,-9,20279,13361,-1,-1,-1,-1,0,0,21,0,20,0,2,0,1,0,-1,-1,-1,-1,2,0,0,0,-1,-1,-9,-9\n1993,MA,1,8889,385,492,186,195,82,9576,653,871,0,4515,293,2883,139,1715,116,10,1,-1,-1,-1,-1,59,1,-1,-1,-9,-9,1914,219,9381,653,7247,432,419,105,9381,653,2193,236,-1,-1,4905,348,-2,-2,-2,-2,-2,-2,-9,-9,6902,-1,-1,-1,-1,-8,-8,12,0,14,0,2,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1993,MI,2,37520,1798,0,0,0,0,37520,1798,-9,-9,15554,689,21026,1073,636,19,161,7,-1,-1,-1,-1,32,1,-1,-1,-9,-9,747,28,37520,1798,36884,1779,0,0,37520,1798,6961,603,-1,-1,11432,953,-2,-2,-2,-2,-2,-2,27548,-9,-9,-1,-1,-1,-1,-8,-8,96,2,-9,-9,6,1,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1993,MN,2,3837,193,0,0,29,1,3866,194,134,0,2111,98,1335,69,203,5,298,20,-1,-1,-1,-1,-9,-9,-1,-1,-9,-9,264,5,4008,192,3805,187,0,0,4008,192,2033,158,-1,-1,2450,207,-2,-2,-2,-2,-2,-2,3845,3845,3845,-1,-1,-1,-1,-8,-8,4,0,1,0,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1993,MS,3,7731,434,137,24,0,0,7868,458,1424,119,2318,178,6945,396,43,3,7,0,-1,-1,-1,-1,11,0,-1,-1,-9,-9,49,3,9330,577,9281,574,6,0,9330,577,4094,382,-1,-1,3497,388,-2,-2,-2,-2,-2,-2,-9,8746,9206,-1,-1,-1,-1,0,0,17,1,3,0,2,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1993,MO,2,15258,920,0,0,-8,-8,15258,920,-9,-9,7930,473,7284,444,179,8,34,1,-1,-1,-1,-1,8,2,-1,-1,-9,-9,2,0,15258,920,15065,912,14,0,15258,920,6229,685,-1,-1,8925,896,-2,-2,-2,-2,-2,-2,15911,15832,-9,-1,-1,-1,-1,4,0,26,0,2,0,1,0,7,0,-1,-1,-1,-1,0,0,3,0,-1,-1,-9,-9\n1993,MT,4,1474,67,0,0,-8,-8,1474,67,-9,-9,1207,49,27,0,24,0,235,18,-1,-1,-1,-1,5,0,-1,-1,-9,-9,0,0,1474,67,1450,67,0,0,1474,67,288,16,-1,-1,624,63,-2,-2,-2,-2,-2,-2,-9,1260,850,-1,-1,-1,-1,0,0,3,0,0,0,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1993,NE,2,2276,140,42,9,16,0,2334,149,-9,-9,1489,79,796,78,162,4,63,11,-1,-1,-1,-1,1,1,-1,-1,-9,-9,0,0,2349,169,2187,165,0,0,2349,169,1012,110,-1,-1,1295,141,-2,-2,-2,-2,-2,-2,-9,-9,2013,-1,-1,-1,-1,0,0,6,0,0,0,1,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1993,NV,4,5622,404,0,0,118,9,5740,413,-9,-9,3297,247,1709,114,545,12,86,6,-1,-1,-1,-1,57,5,-1,-1,-9,-9,606,11,5755,383,5207,371,3,0,5755,383,2299,274,-1,-1,2713,400,-2,-2,-2,-2,-2,-2,6440,-9,5278,-1,-1,-1,-1,0,0,7,0,1,0,1,0,1,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1993,NH,1,1742,84,0,19,22,32,1764,135,-9,-9,1610,81,73,3,133,11,1,0,-1,-1,-1,-1,5,2,-1,-1,-9,-9,0,0,1689,86,1556,75,0,0,1689,86,661,59,-1,-1,899,60,-2,-2,-2,-2,-2,-2,1358,1576,1162,-1,-1,-1,-1,0,0,1,0,1,0,1,0,1,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1993,NJ,1,19133,962,135,7,-8,-8,19268,969,3430,164,6301,338,14885,786,3977,140,3,0,-1,-1,-1,-1,40,1,-1,-1,-9,-9,1469,8,22698,1133,18705,993,16,0,22698,1133,7884,679,-1,-1,10625,876,-2,-2,-2,-2,-2,-2,-9,-9,15032,-1,-1,-1,-1,0,0,35,3,65,5,3,0,0,0,-1,-1,-1,-1,1,0,9,0,-1,-1,-9,-9\n1993,NM,4,3173,166,118,42,-9,-9,3291,208,-9,-9,2788,155,367,28,1868,102,113,4,-1,-1,-1,-1,5,0,-1,-1,-9,-9,19,19,3292,206,1405,85,19,19,3292,206,1130,133,-1,-1,1920,195,-2,-2,-2,-2,-2,-2,3561,3561,3575,-1,-1,-1,-1,0,0,-9,-9,-9,-9,-9,-9,-9,-9,-1,-1,-1,-1,-9,-9,6,0,-1,-1,-9,-9\n1993,NY,1,61041,3528,0,0,0,0,61041,3528,-9,-9,25508,1446,33221,2054,19910,1225,171,6,-1,-1,-1,-1,216,4,-1,-1,-9,-9,1925,18,61041,3528,40848,2301,283,2,61041,3528,23016,1881,-1,-1,30485,2484,-2,-2,-2,-2,-2,-2,61761,58675,50339,-1,-1,-1,-1,-8,-8,95,2,211,9,10,0,4,0,-1,-1,-1,-1,24,0,20,2,-1,-1,-9,-9\n1993,NC,3,20286,1081,486,39,191,15,20963,1135,0,0,6822,401,13288,689,-9,-9,426,20,-1,-1,-1,-1,13,0,-1,-1,-9,-9,223,10,20772,1120,-9,-9,20772,1120,20772,1120,18579,2109,-1,-1,21978,2197,-2,-2,-2,-2,-2,-2,17913,21400,-9,-1,-1,-1,-1,0,0,23,1,15,0,2,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1993,ND,2,493,27,49,3,0,0,542,30,-9,-9,374,18,12,0,16,0,89,3,-1,-1,-1,-1,2,0,-1,-1,-9,-9,0,0,477,21,461,21,0,0,477,21,258,17,-1,-1,316,18,-2,-2,-2,-2,-2,-2,-9,596,596,-1,-1,-1,-1,-8,-8,0,0,0,0,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1993,OH,2,37715,2538,-9,-9,0,0,37715,2538,-9,-9,17392,1023,20665,1561,-9,-9,-9,-9,-1,-1,-1,-1,-9,-9,-1,-1,-9,-9,-9,-9,38057,2584,-9,-9,38057,2584,38057,2584,16152,2340,-1,-1,17904,2416,-2,-2,-2,-2,-2,-2,-9,-9,22521,-1,-1,-1,-1,0,0,54,3,5,0,8,0,0,0,-1,-1,-1,-1,9,0,0,0,-1,-1,-9,-9\n1993,OK,3,11000,1108,-9,-9,-8,-8,11000,1108,332,48,8310,732,5066,718,474,37,922,89,-1,-1,-1,-1,2,1,-1,-1,-9,-9,527,42,14827,1582,14353,1545,0,0,14827,1582,5511,774,-1,-1,4795,666,-2,-2,-2,-2,-2,-2,9775,13363,-9,-1,-1,-1,-1,0,0,33,4,2,0,8,0,5,0,-1,-1,-1,-1,4,0,0,0,-1,-1,-9,-9\n1993,OR,4,4905,201,1304,134,0,0,6209,335,-9,-9,4561,253,817,55,671,10,106,19,-1,-1,-1,-1,59,1,-1,-1,-9,-9,674,12,6217,340,5544,328,2,2,6217,340,1530,119,-1,-1,3425,299,-2,-2,-2,-2,-2,-2,-9,6517,-9,-1,-1,-1,-1,0,0,5,1,0,0,3,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1993,PA,1,24855,1190,1,4,8,1,24864,1195,-9,-9,8442,450,14068,638,1669,93,39,1,-1,-1,-1,-1,62,1,-1,-1,-9,-9,2245,104,24856,1194,-9,-9,23187,1101,24856,1194,5496,457,-1,-1,8304,510,-2,-2,-2,-2,-2,-2,-9,-9,18844,-1,-1,-1,-1,0,0,63,2,7,2,2,1,0,0,-1,-1,-1,-1,2,0,0,0,-1,-1,-9,-9\n1993,RI,1,1636,41,421,59,404,39,2461,139,-9,-9,1766,116,835,39,373,17,6,0,-1,-1,-1,-1,21,0,-1,-1,-9,-9,0,0,2628,155,2255,138,0,0,2628,155,565,31,-1,-1,823,43,-2,-2,-2,-2,-2,-2,3070,3070,3070,-1,-1,-1,-1,-8,-8,1,0,2,0,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1993,SC,3,15144,803,822,142,22,0,15988,945,412,4,5376,360,12151,739,32,3,13,0,-1,-1,-1,-1,6,0,-1,-1,-9,-9,53,6,17599,1105,17018,1042,549,60,17599,1105,5648,472,-1,-1,7252,653,-2,-2,-2,-2,-2,-2,16221,16221,12527,-1,-1,-1,-1,0,0,42,4,13,1,1,0,1,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1993,SD,2,1482,88,0,0,0,0,1482,88,-9,-9,1092,56,47,0,-9,-9,326,32,-1,-1,-1,-1,-9,0,-1,-1,-9,-9,0,0,1465,88,-9,-9,1465,88,1465,88,599,43,-1,-1,707,47,-2,-2,-2,-2,-2,-2,1477,1418,1477,-1,-1,-1,-1,0,0,4,5,-9,-9,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1993,TN,3,11106,389,-9,-9,0,0,11106,389,1210,119,6308,287,5965,217,-9,-9,-9,-9,-1,-1,-1,-1,-9,-9,-1,-1,-9,-9,43,4,12316,508,-9,-9,12316,508,12316,508,3718,251,-1,-1,5293,427,-2,-2,-2,-2,-2,-2,11967,11720,-9,-1,-1,-1,-1,0,0,19,1,5,0,3,0,0,0,-1,-1,-1,-1,2,0,0,0,-1,-1,-9,-9\n1993,TX,3,66320,3807,-9,-9,-8,-8,66320,3807,29546,-9,17184,1175,29260,2017,15311,603,-9,-9,-1,-1,-1,-1,-9,-9,-1,-1,-9,-9,19876,615,66320,3807,46690,3204,4319,0,66320,3807,13807,1717,-1,-1,18496,1760,-2,-2,-2,-2,-2,-2,72854,72854,-9,-1,-1,-1,-1,17,0,126,3,78,1,16,1,-9,-9,-1,-1,-1,-1,2,0,-9,-9,-1,-1,-9,-9\n1993,UT,4,2846,120,21,1,55,3,2922,124,103,19,2342,108,230,13,443,27,128,1,-1,-1,-1,-1,42,0,-1,-1,-9,-9,23,1,2765,123,2299,95,23,1,2765,123,842,65,-1,-1,1615,125,-2,-2,-2,-2,-2,-2,3234,3079,-9,-1,-1,-1,-1,0,0,1,0,0,0,1,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1993,VT,1,830,28,191,13,119,7,1140,48,7,0,1175,48,-9,-9,0,0,-9,-9,-1,-1,-1,-1,-9,-9,-1,-1,-9,-9,-9,-9,1175,48,0,0,1175,48,1175,48,304,18,-1,-1,447,22,-2,-2,-2,-2,-2,-2,947,947,947,-1,-1,-1,-1,-8,-8,0,0,0,0,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1993,VA,3,17586,670,2,0,-8,-9,17588,670,3223,387,7392,423,14093,793,77,0,3,0,-1,-1,-1,-1,56,3,-1,-1,-9,-9,87,0,21631,1219,0,0,21554,1219,21631,1219,8972,999,-1,-1,9663,1180,-2,-2,-2,-2,-2,-2,15359,15359,15359,-1,-1,-1,-1,5,0,23,1,14,0,4,0,0,0,-1,-1,-1,-1,3,0,0,0,-1,-1,-9,-9\n1993,WA,4,9729,669,1,0,29,1,9759,670,-9,-9,7065,406,2096,175,1610,57,296,37,-1,-1,-1,-1,187,11,-1,-1,-9,-9,109,37,9753,666,7835,604,308,5,9753,666,4313,386,-1,-1,4561,404,-2,-2,-2,-2,-2,-2,6894,9117,9117,-1,-1,-1,-1,1,0,16,2,0,0,0,0,1,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1993,WV,3,1726,79,-8,-8,0,0,1726,79,241,21,1467,67,257,12,5,0,1,0,-1,-1,-1,-1,1,0,-1,-1,-9,-9,0,0,1726,79,1721,79,0,0,1726,79,711,42,-1,-1,692,59,-2,-2,-2,-2,-2,-2,1800,1805,1800,-1,-1,-1,-1,-8,-8,1,0,0,0,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1993,WI,2,8077,345,23,3,294,39,8394,387,262,48,4280,162,3908,203,511,10,154,15,-1,-1,-1,-1,37,1,-1,-1,-9,-9,15,6,8394,387,7863,377,20,0,8394,387,3826,304,-1,-1,4344,302,-2,-2,-2,-2,-2,-2,6550,6550,6550,-1,-1,-1,-1,-8,-8,16,0,0,0,3,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1993,WY,4,1035,66,1,0,0,0,1036,66,-9,-9,954,52,53,6,106,6,53,2,-1,-1,-1,-1,3,0,-1,-1,-9,-9,0,6,1063,66,957,60,0,0,1063,66,377,40,-1,-1,406,43,-2,-2,-2,-2,-2,-2,977,977,977,-1,-1,-1,-1,0,0,4,0,0,0,1,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1993,ST,7,764523,42726,9165,1308,9412,1432,783100,45466,51051,1665,354109,21135,401806,24595,109259,5178,6498,492,-1,-1,-1,-1,4086,208,-1,-1,0,0,42690,1740,809189,48170,505498,32051,194432,10941,809189,48170,288955,29114,-1,-1,399576,37523,-2,-2,-2,-2,-2,-2,462930,535100,390246,-1,-1,-1,-1,38,0,1144,44,714,25,140,5,37,1,-1,-1,-1,-1,83,1,189,11,-1,-1,0,0\n1993,US,5,828690,47702,12194,1774,17208,1813,858092,51289,51051,1665,406632,25148,429278,27292,131978,6721,7726,574,-1,-1,-1,-1,5114,294,-1,-1,0,0,43135,1753,891885,55061,565030,37386,194877,10954,891885,55061,310565,31157,-1,-1,417058,39350,-2,-2,-2,-2,-2,-2,522779,535100,390246,-1,-1,-1,-1,38,0,1144,44,714,25,140,5,37,1,-1,-1,-1,-1,83,1,352,18,-1,-1,0,0\n1993,FE,6,64167,4976,3029,466,7796,381,74992,5823,-9,-9,52523,4013,27472,2697,22719,1543,1228,82,-1,-1,-1,-1,1028,86,-1,-1,-9,-9,445,13,82696,6891,59532,5335,445,13,82696,6891,21610,2043,-1,-1,17482,1827,-2,-2,-2,-2,-2,-2,59849,-9,-9,-1,-1,-1,-1,0,0,-9,-9,-9,-9,-9,-9,-9,-9,-1,-1,-1,-1,-9,-9,163,7,-1,-1,-9,-9\n1994,AL,3,17567,1158,408,46,0,0,17975,1204,1465,82,6323,441,11996,771,2,0,3,0,-1,-1,-1,-1,1,0,-1,-1,-9,-9,36,2,18359,1214,18357,1214,0,0,18359,1214,5670,604,-1,-1,6930,689,-2,-2,-2,-2,-2,-2,16508,16508,16508,-1,-1,-1,-1,0,0,-9,-9,12,2,-9,-9,-9,-9,-1,-1,-1,-1,-9,-9,44,1,-1,-1,-9,-9\n1994,AK,4,1588,57,226,11,775,88,2589,156,-9,-9,1492,102,415,40,86,10,1045,65,-1,-1,-1,-1,36,1,-1,-1,-9,-9,86,10,3074,218,2988,208,0,0,3074,218,-9,-9,-1,-1,-9,-9,-2,-2,-2,-2,-2,-2,3044,-9,-9,-1,-1,-1,-1,-8,-8,-9,-9,-9,-9,-9,-9,-9,-9,-1,-1,-1,-1,-9,-9,-9,-9,-1,-1,-9,-9\n1994,AZ,4,17812,1193,661,80,0,0,18473,1273,118,0,14503,963,3085,249,5806,323,648,55,-1,-1,-1,-1,36,1,-1,-1,-9,-9,201,5,18473,1273,12665,949,2,1,18473,1273,6681,681,-1,-1,6738,712,-2,-2,-2,-2,-2,-2,-9,19651,-9,-1,-1,-1,-1,0,0,36,0,0,0,2,0,0,0,-1,-1,-1,-1,2,0,1,0,-1,-1,-9,-9\n1994,AR,3,7571,556,88,27,0,0,7659,583,301,0,3421,270,4612,307,30,3,6,2,-1,-1,-1,-1,3,1,-1,-1,-9,-9,21,0,8063,580,8033,577,0,0,8063,580,2983,347,-1,-1,4055,349,-2,-2,-2,-2,-2,-2,8044,8044,8044,-1,-1,-1,-1,5,0,20,0,2,0,1,0,2,0,-1,-1,-1,-1,4,0,0,0,-1,-1,-9,-9\n1994,CA,4,113705,7379,0,0,3685,836,117390,8215,-9,-9,74992,4952,37472,2816,41377,1944,846,164,-1,-1,-1,-1,1294,23,-1,-1,-9,-9,2786,260,117390,8215,73227,6011,2786,260,117390,8215,37547,4035,-1,-1,91318,8470,-2,-2,-2,-2,-2,-2,-9,-9,68366,-1,-1,-1,-1,0,0,103,8,57,0,15,0,0,0,-1,-1,-1,-1,3,0,0,0,-1,-1,-9,-9\n1994,CO,4,8597,580,-9,-9,-8,-8,8597,580,1045,90,7052,433,2364,217,2580,124,198,14,-1,-1,-1,-1,46,1,-1,-1,-9,-9,387,5,10047,670,7080,541,387,5,10047,670,3209,314,-1,-1,3421,288,-2,-2,-2,-2,-2,-2,-9,8051,6848,-1,-1,-1,-1,0,0,9,0,1,0,2,0,2,0,-1,-1,-1,-1,0,0,1,0,-1,-1,-9,-9\n1994,CT,1,9793,598,1000,157,2505,193,13298,948,-9,-9,3467,318,6175,458,3682,221,18,0,-1,-1,-1,-1,39,2,-1,-1,-9,-9,3682,221,13381,999,9699,778,0,0,13381,999,724,77,-1,-1,1684,204,-2,-2,-2,-2,-2,-2,13363,14699,-9,-1,-1,-1,-1,0,0,11,1,21,3,2,0,0,0,-1,-1,-1,-1,1,1,0,0,-1,-1,-9,-9\n1994,DE,3,2701,136,828,88,641,57,4170,281,-9,-9,1308,81,2797,199,183,8,0,0,-1,-1,-1,-1,2,2,-1,-1,-9,-9,77,0,4184,282,3926,260,75,14,4184,282,778,112,-1,-1,1162,137,-2,-2,-2,-2,-2,-2,-9,4206,3192,-1,-1,-1,-1,0,0,13,1,0,0,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1994,DC,3,9203,530,298,49,416,101,9917,680,-9,-9,133,22,10129,665,16,1,0,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,10262,687,10108,682,138,4,10262,687,803,60,-1,-1,8941,462,-2,-2,-2,-2,-2,-2,7251,11099,9419,-1,-1,-1,-1,-8,-8,5,-9,13,-9,5,-9,0,-9,-1,-1,-1,-1,1,-9,29,-9,-1,-1,-9,-9\n1994,FL,3,54092,3065,8,3,-8,-8,54100,3068,-9,-9,21513,1276,31335,1788,3853,85,23,0,-1,-1,-1,-1,43,0,-1,-1,-9,-9,1186,4,54100,3068,50222,2979,25,4,54100,3068,19174,2014,-1,-1,23161,2462,-2,-2,-2,-2,-2,-2,-9,57364,43536,-1,-1,-1,-1,1,0,78,5,128,1,11,0,2,0,-1,-1,-1,-1,4,0,0,0,-1,-1,-9,-9\n1994,GA,3,30614,1909,799,103,-8,-8,31413,2012,-9,-9,10140,727,21153,1279,273,5,37,2,-1,-1,-1,-1,38,2,-1,-1,-9,-9,45,2,31413,2012,0,0,31140,2007,31413,2012,10468,854,-1,-1,9413,864,-2,-2,-2,-2,-2,-2,32918,32918,32918,-1,-1,-1,-1,1,0,45,2,43,0,0,1,1,0,-1,-1,-1,-1,0,0,2,0,-1,-1,-9,-9\n1994,HI,4,1951,90,60,10,735,63,2746,163,-9,-9,604,70,162,12,111,11,42,6,-1,-1,-1,-1,1729,114,-1,-1,-9,-9,539,55,3076,257,2831,226,134,20,3076,257,865,128,-1,-1,1607,175,-2,-2,-2,-2,-2,-2,-9,2608,1694,-1,-1,-1,-1,-8,-8,4,0,0,0,1,0,2,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1994,ID,4,2346,147,0,0,0,0,2346,147,305,25,2144,125,35,1,326,13,95,13,-1,-1,-1,-1,18,0,-1,-1,-9,-9,347,33,2639,172,1823,102,490,57,2639,172,1056,120,-1,-1,1310,133,-2,-2,-2,-2,-2,-2,2222,2519,2222,-1,-1,-1,-1,1,0,8,0,3,0,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1994,IL,2,34718,1813,-9,-9,0,0,34718,1813,-9,-9,8421,471,22794,1214,3414,115,34,9,-1,-1,-1,-1,51,4,-1,-1,-9,-9,3418,115,34718,1813,31300,1698,4,0,34718,1813,16516,1460,-1,-1,19742,1567,-2,-2,-2,-2,-2,-2,26385,26385,22641,-1,-1,-1,-1,1,0,34,3,34,1,8,0,1,0,-1,-1,-1,-1,3,0,9,2,-1,-1,-9,-9\n1994,IN,2,14100,816,81,8,7,2,14188,826,869,34,8217,488,5909,333,325,7,45,5,-1,-1,-1,-1,17,0,-1,-1,-9,-9,0,0,14188,826,13863,819,0,0,14188,826,6014,529,-1,-1,6114,520,-2,-2,-2,-2,-2,-2,12539,14711,-9,-1,-1,-1,-1,1,0,30,0,2,0,1,0,1,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1994,IA,2,5086,351,-8,-8,-8,-8,5086,351,-9,-9,3547,233,1271,106,144,5,80,7,-1,-1,-1,-1,33,0,-1,-1,-9,-9,155,5,5086,351,4931,346,11,0,5086,351,2044,240,-1,-1,3204,371,-2,-2,-2,-2,-2,-2,3265,3265,3265,-1,-1,-1,-1,-8,-8,2,0,0,0,2,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1994,KS,2,6020,349,-8,-8,-8,-8,6020,349,-9,-9,3537,181,2356,153,339,9,88,8,-1,-1,-1,-1,44,1,-1,-1,-9,-9,2,1,6027,344,5688,335,0,0,6027,344,1660,219,-1,-1,3065,316,-2,-2,-2,-2,-2,-2,6655,-9,-9,-1,-1,-1,-1,0,0,13,0,1,0,1,0,0,0,-1,-1,-1,-1,0,0,1,0,-1,-1,-9,-9\n1994,KY,3,8660,437,0,0,0,0,8660,437,593,39,6659,338,3746,299,29,0,0,0,-1,-1,-1,-1,2,0,-1,-1,-9,-9,22,0,10429,637,10400,637,0,0,10429,637,4352,489,-1,-1,5495,552,-2,-2,-2,-2,-2,-2,10156,9483,-9,-1,-1,-1,-1,0,0,20,1,5,0,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1994,LA,3,15435,547,-8,-8,-8,-8,15435,547,7333,748,5130,360,17593,935,-9,-9,5,0,-1,-1,-1,-1,1,0,-1,-1,-9,-9,39,0,22768,1295,-9,-9,22768,1295,22768,1295,5674,472,-1,-1,9922,819,-2,-2,-2,-2,-2,-2,15884,15675,-9,-1,-1,-1,-1,0,0,-9,-9,-9,-9,-9,-9,-9,-9,-1,-1,-1,-1,-9,-9,51,0,-1,-1,-9,-9\n1994,ME,1,1399,37,23,1,-8,-8,1422,38,-9,-9,1383,43,25,4,2,0,11,1,-1,-1,-1,-1,3,0,-1,-1,-9,-9,4,0,1426,48,1424,48,0,0,1426,48,479,19,-1,-1,782,41,-2,-2,-2,-2,-2,-2,1353,1353,1353,-1,-1,-1,-1,-8,-8,4,0,0,0,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1994,MD,3,18704,885,983,147,-8,-8,19687,1032,-9,-9,4462,295,15454,739,-9,-9,1,3,-1,-1,-1,-1,0,1,-1,-1,-9,-9,42,1,19959,1039,-9,-9,19959,1039,19959,1039,7161,593,-1,-1,8166,631,-2,-2,-2,-2,-2,-2,-9,20952,12392,-1,-1,-1,-1,1,0,27,3,23,2,7,0,2,0,-1,-1,-1,-1,3,0,0,0,-1,-1,-9,-9\n1994,MA,1,10112,392,328,225,250,89,10690,706,966,0,4428,316,2866,117,1809,100,11,1,-1,-1,-1,-1,65,1,-1,-1,-9,-9,3320,271,10690,706,7189,433,1692,173,10690,706,2189,212,-1,-1,3979,304,-2,-2,-2,-2,-2,-2,-9,-9,6904,-1,-1,-1,-1,-8,-8,12,0,21,0,5,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1994,MI,2,38610,2021,0,0,0,0,38610,2021,0,0,15915,783,21686,1201,683,20,169,7,-1,-1,-1,-1,46,1,-1,-1,-9,-9,794,29,38610,2021,37927,2001,0,0,38610,2021,6928,592,-1,-1,10204,902,-2,-2,-2,-2,-2,-2,27966,-9,-9,-1,-1,-1,-1,-8,-8,92,2,-9,-9,10,0,3,0,-1,-1,-1,-1,0,0,1,0,-1,-1,-9,-9\n1994,MN,2,4162,210,-8,-8,-8,-8,4162,210,85,0,2285,122,1458,93,218,4,296,17,-1,-1,-1,-1,1,0,-1,-1,-9,-9,298,5,4338,237,4120,233,0,0,4338,237,2029,185,-1,-1,2621,205,-2,-2,-2,-2,-2,-2,4095,4095,4095,-1,-1,-1,-1,-8,-8,10,0,1,0,2,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1994,MS,3,8918,596,162,29,0,0,9080,625,1508,61,2520,193,7693,454,46,1,8,0,-1,-1,-1,-1,11,0,-1,-1,-9,-9,50,1,10282,648,10232,647,4,0,10282,648,3784,341,-1,-1,3080,277,-2,-2,-2,-2,-2,-2,9678,9678,9678,-1,-1,-1,-1,0,0,23,1,6,0,3,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1994,MO,2,16867,1044,0,0,-8,-8,16867,1044,-9,-9,8666,534,8125,505,214,12,45,1,-1,-1,-1,-1,18,2,-1,-1,-9,-9,2,0,16856,1042,16621,1030,21,0,16856,1042,6692,770,-1,-1,8660,893,-2,-2,-2,-2,-2,-2,-9,18162,-9,-1,-1,-1,-1,0,0,33,2,0,0,4,0,5,0,-1,-1,-1,-1,3,0,2,0,-1,-1,-9,-9\n1994,MT,4,1625,83,-8,-8,0,0,1625,83,0,0,1352,69,32,1,32,2,283,23,-1,-1,-1,-1,4,0,-1,-1,-9,-9,0,0,1671,93,1639,91,0,0,1671,93,322,17,-1,-1,635,35,-2,-2,-2,-2,-2,-2,-9,1344,850,-1,-1,-1,-1,0,0,1,0,0,0,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1994,NE,2,2488,149,34,8,20,2,2542,159,-9,-9,1617,90,831,67,198,7,84,11,-1,-1,-1,-1,3,2,-1,-1,-9,-9,0,6,2535,176,2337,163,0,6,2535,176,1124,103,-1,-1,1265,143,-2,-2,-2,-2,-2,-2,-9,-9,2013,-1,-1,-1,-1,1,0,6,0,1,0,4,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1994,NV,4,6204,452,221,7,0,0,6425,459,-9,-9,3669,264,1861,128,740,23,92,12,-1,-1,-1,-1,72,11,-1,-1,-9,-9,858,26,6552,441,5806,418,6,0,6552,441,2672,292,-1,-1,2558,288,-2,-2,-2,-2,-2,-2,6457,6739,5316,-1,-1,-1,-1,0,0,11,1,4,1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1994,NH,1,1879,102,3,24,46,12,1928,138,-9,-9,1806,105,97,4,146,6,1,0,-1,-1,-1,-1,7,1,-1,-1,-9,-9,0,0,1911,110,1765,104,0,0,1911,110,711,66,-1,-1,764,55,-2,-2,-2,-2,-2,-2,1358,1873,1716,-1,-1,-1,-1,0,0,3,0,0,0,1,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1994,NJ,1,20154,977,76,12,-8,-8,20230,989,3234,179,6621,341,15256,811,4063,154,3,0,-1,-1,-1,-1,41,4,-1,-1,-9,-9,1543,12,23464,1168,19398,1014,3,0,23464,1168,8413,741,-1,-1,11408,979,-2,-2,-2,-2,-2,-2,-9,-9,13869,-1,-1,-1,-1,0,0,22,1,62,4,4,0,0,0,-1,-1,-1,-1,2,0,33,2,-1,-1,-9,-9\n1994,NM,4,3474,168,168,58,0,0,3642,226,0,0,2948,129,402,27,2006,95,137,4,-1,-1,-1,-1,2,0,-1,-1,-9,-9,32,31,3521,191,1483,65,32,31,3521,191,1101,96,-1,-1,1972,186,-2,-2,-2,-2,-2,-2,4054,4061,4074,-1,-1,-1,-1,0,0,-9,-9,0,0,-9,-9,-9,-9,-1,-1,-1,-1,-9,-9,13,0,-1,-1,-9,-9\n1994,NY,1,63175,3575,-8,-8,-8,-8,63175,3575,-9,-9,26816,1590,34218,1965,20705,1230,172,9,-1,-1,-1,-1,297,4,-1,-1,-9,-9,1672,7,63175,3575,42229,2344,241,1,63175,3575,21357,1796,-1,-1,29969,2407,-2,-2,-2,-2,-2,-2,64280,61195,51049,-1,-1,-1,-1,-8,-8,113,4,232,12,13,1,2,0,-1,-1,-1,-1,13,0,14,0,-1,-1,-9,-9\n1994,NC,3,21913,1133,552,50,172,16,22637,1199,248,0,7063,428,14674,723,-9,-9,438,22,-1,-1,-1,-1,13,0,-1,-1,-9,-9,277,10,22465,1183,-9,-9,22465,1183,22465,1183,16257,1945,-1,-1,19916,2272,-2,-2,-2,-2,-2,-2,21004,23500,-9,-1,-1,-1,-1,1,0,23,1,26,0,4,0,0,0,-1,-1,-1,-1,2,0,0,0,-1,-1,-9,-9\n1994,ND,2,537,40,34,1,-8,-8,571,41,-9,-9,411,8,18,0,21,0,89,8,-1,-1,-1,-1,2,0,-1,-1,-9,-9,0,0,520,16,499,16,0,0,520,16,298,21,-1,-1,315,30,-2,-2,-2,-2,-2,-2,600,600,600,-1,-1,-1,-1,-8,-8,0,0,0,0,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1994,OH,2,37715,2538,-9,-9,-9,-9,37715,2538,-9,-9,17615,968,21562,1573,-9,-9,-9,-9,-1,-1,-1,-1,-9,-9,-1,-1,-9,-9,1341,15,40518,2556,-9,-9,40518,2556,40518,2556,16852,2346,-1,-1,17496,2477,-2,-2,-2,-2,-2,-2,-9,-9,24526,-1,-1,-1,-1,0,0,58,4,19,1,2,1,1,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1994,OK,3,12266,1120,-9,-9,-8,-8,12266,1120,328,47,8158,746,5334,718,526,31,947,108,-1,-1,-1,-1,10,1,-1,-1,-9,-9,575,34,15024,1607,14498,1576,0,0,15024,1607,5615,837,-1,-1,6016,929,-2,-2,-2,-2,-2,-2,9775,13642,-9,-1,-1,-1,-1,0,0,57,4,1,0,3,0,3,0,-1,-1,-1,-1,5,0,1,0,-1,-1,-9,-9\n1994,OR,4,5682,233,863,137,0,0,6545,370,0,0,4913,293,823,51,649,14,119,18,-1,-1,-1,-1,52,3,-1,-1,-9,-9,650,14,6557,379,5907,365,1,0,6557,379,1424,92,-1,-1,2668,243,-2,-2,-2,-2,-2,-2,-9,6517,-9,-1,-1,-1,-1,0,0,5,0,1,0,4,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1994,PA,1,29955,1322,0,0,8,0,26963,1322,-9,-9,9023,502,17828,814,2531,111,53,3,-1,-1,-1,-1,63,0,-1,-1,-9,-9,13,3,26980,1322,24449,1211,-8,-8,26980,1322,6287,498,-1,-1,8595,570,-2,-2,-2,-2,-2,-2,20455,20455,20455,-1,-1,-1,-1,0,0,58,4,24,0,6,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1994,RI,1,1869,50,476,41,452,49,2797,140,-9,-9,1786,115,954,35,438,20,10,0,-1,-1,-1,-1,19,0,-1,-1,-9,-9,0,0,2769,150,2331,130,0,0,2769,150,602,38,-1,-1,753,46,-2,-2,-2,-2,-2,-2,3438,3438,3438,-1,-1,-1,-1,-8,-8,5,0,0,0,0,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1994,SC,3,15860,739,673,90,-8,-8,16533,829,332,27,5398,345,12502,672,46,6,19,1,-1,-1,-1,-1,5,0,-1,-1,-9,-9,53,4,17977,1022,17440,899,491,117,17977,1022,5103,421,-1,-1,6986,642,-2,-2,-2,-2,-2,-2,16310,16310,12673,-1,-1,-1,-1,0,0,43,2,34,0,4,0,1,0,-1,-1,-1,-1,4,0,0,0,-1,-1,-9,-9\n1994,SD,2,1626,108,-9,-9,-8,-8,1626,108,-9,-9,1187,59,57,3,-9,-9,361,41,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,1605,103,-9,-9,1605,103,1605,103,594,71,-1,-1,645,69,-2,-2,-2,-2,-2,-2,1477,1418,1477,-1,-1,-1,-1,0,0,3,0,0,0,2,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1994,TN,3,12174,398,-9,-9,0,0,12174,398,1640,189,6845,335,6918,251,38,0,8,1,-1,-1,-1,-1,5,0,-1,-1,-9,-9,38,0,13814,587,13776,587,0,0,13814,587,3176,298,-1,-1,4529,435,-2,-2,-2,-2,-2,-2,12919,12654,-9,-1,-1,-1,-1,0,0,29,1,7,0,4,0,3,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1994,TX,3,91845,5529,89,12,-8,-8,91934,5541,17422,3298,26201,1657,40451,2975,25282,909,-9,-9,-1,-1,-1,-1,-9,-9,-1,-1,-9,-9,42704,4207,109356,8839,66652,4632,17422,3298,109356,8839,24668,1972,-1,-1,16599,1637,-2,-2,-2,-2,-2,-2,98844,98844,100744,-1,-1,-1,-1,14,0,176,17,79,8,12,1,-9,-9,-1,-1,-1,-1,6,0,-9,-9,-1,-1,-9,-9\n1994,UT,4,2967,138,15,2,103,13,3085,153,161,8,2482,109,253,19,490,18,120,0,-1,-1,-1,-1,44,1,-1,-1,-9,-9,15,2,2914,131,2409,112,15,1,2914,131,813,72,-1,-1,1698,140,-2,-2,-2,-2,-2,-2,3384,3213,-9,-1,-1,-1,-1,0,0,9,1,1,0,0,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1994,VT,1,915,32,169,12,134,5,1218,49,-9,-9,1212,48,29,1,7,0,11,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,1252,49,1245,49,0,0,1252,49,328,10,-1,-1,344,12,-2,-2,-2,-2,-2,-2,919,1020,947,-1,-1,-1,-1,-8,-8,0,0,0,0,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1994,VA,3,20136,966,6,0,-8,-8,20142,966,1862,201,8218,537,17002,1024,101,1,0,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,183,4,25403,1565,0,0,25302,1564,25403,1565,9289,1010,-1,-1,7536,898,-2,-2,-2,-2,-2,-2,14940,14940,14940,-1,-1,-1,-1,2,0,32,2,19,0,0,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1994,WA,4,10118,699,1,0,28,1,10147,700,-9,-9,7281,446,2278,173,1635,62,275,33,-1,-1,-1,-1,228,7,-1,-1,-9,-9,73,39,10135,698,8357,632,143,4,10135,698,4449,432,-1,-1,4844,493,-2,-2,-2,-2,-2,-2,6967,9588,9588,-1,-1,-1,-1,1,0,18,1,4,0,2,0,1,1,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1994,WV,3,1839,91,-8,-8,0,0,1839,91,383,15,1563,77,274,14,4,0,1,0,-1,-1,-1,-1,1,0,-1,-1,-9,-9,0,0,1839,91,1835,91,0,0,1839,91,722,42,-1,-1,713,32,-2,-2,-2,-2,-2,-2,1900,1900,1900,-1,-1,-1,-1,-8,-8,6,1,0,0,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1994,WI,2,9143,378,20,2,447,32,9610,412,322,55,4802,167,4577,223,615,12,173,12,-1,-1,-1,-1,40,1,-1,-1,-9,-9,18,9,9610,412,8961,398,34,2,9610,412,3920,323,-1,-1,4293,366,-2,-2,-2,-2,-2,-2,7230,7230,7230,-1,-1,-1,-1,-8,-8,10,0,1,0,4,0,0,0,-1,-1,-1,-1,3,0,0,0,-1,-1,-9,-9\n1994,WY,4,992,73,0,0,0,0,992,73,-9,-9,887,63,55,5,127,12,60,2,-1,-1,-1,-1,6,0,-1,-1,-9,-9,127,12,1135,82,1008,70,0,0,1135,82,457,39,-1,-1,454,25,-2,-2,-2,-2,-2,-2,977,1126,1035,-1,-1,-1,-1,0,0,0,0,0,0,0,0,0,0,-1,-1,-1,-1,0,0,5,0,-1,-1,-9,-9\n1994,ST,7,836882,47989,9353,1440,10424,1559,853659,50988,40520,5098,382136,23628,440992,27232,125948,5734,7210,688,-1,-1,-1,-1,4491,192,-1,-1,0,0,67711,5460,902540,57200,588678,37721,187914,13745,902540,57200,292034,29045,-1,-1,397745,37752,-2,-2,-2,-2,-2,-2,498614,613033,531515,-1,-1,-1,-1,30,0,1320,73,888,35,151,4,32,1,-1,-1,-1,-1,67,1,207,5,-1,-1,0,0\n1994,US,5,905733,53122,11999,1840,18524,1929,933256,56891,40520,5098,436453,27714,471583,30089,149552,7356,8515,768,-1,-1,-1,-1,5705,300,-1,-1,0,0,68178,5469,990434,64340,652501,43230,188381,13754,990434,64340,313850,31185,-1,-1,417136,39806,-2,-2,-2,-2,-2,-2,566835,613033,531515,-1,-1,-1,-1,30,0,1320,73,888,35,151,4,32,1,-1,-1,-1,-1,67,1,400,9,-1,-1,0,0\n1994,FE,6,68851,5133,2646,400,8100,370,79597,5903,-9,-9,54317,4086,30591,2857,23604,1622,1305,80,-1,-1,-1,-1,1214,108,-1,-1,-9,-9,467,9,87894,7140,63823,5509,467,9,87894,7140,21816,2140,-1,-1,19391,2054,-2,-2,-2,-2,-2,-2,68221,-9,-9,-1,-1,-1,-1,0,0,-9,-9,-9,-9,-9,-9,-9,-9,-1,-1,-1,-1,-9,-9,193,4,-1,-1,-9,-9\n1995,AL,3,18768,1193,527,61,0,0,19295,1254,776,24,6654,477,12715,816,2,0,3,0,-1,-1,-1,-1,2,0,-1,-1,-9,-9,49,2,19423,1295,19421,1295,0,0,19423,1295,5999,628,-1,-1,7153,704,-2,-2,-2,-2,-2,-2,19262,19262,19262,-1,-1,-1,-1,2,0,-9,-9,20,0,-9,-9,-9,-9,-1,-1,-1,-1,-9,-9,62,4,-1,-1,-9,-9\n1995,AK,4,1519,73,267,18,866,89,2652,180,-9,-9,1630,119,440,41,106,7,1049,73,-1,-1,-1,-1,51,3,-1,-1,-9,-9,109,7,3279,243,3170,236,3,0,3279,243,1153,167,-1,-1,1689,207,-2,-2,-2,-2,-2,-2,2603,-9,-9,-1,-1,-1,-1,-8,-8,3,0,0,0,2,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1995,AZ,4,18963,1328,946,104,0,0,19909,1432,322,0,15793,1098,3142,246,6405,357,732,79,-1,-1,-1,-1,45,4,-1,-1,-9,-9,197,5,19909,1432,13503,1075,1,0,19909,1432,6155,676,-1,-1,6703,759,-2,-2,-2,-2,-2,-2,-9,18486,-9,-1,-1,-1,-1,1,0,48,1,0,0,2,0,2,0,-1,-1,-1,-1,3,0,1,0,-1,-1,-9,-9\n1995,AR,3,7423,551,387,3,0,0,7810,554,675,0,3994,296,4841,255,15,2,7,1,-1,-1,-1,-1,0,0,-1,-1,-9,-9,15,2,8857,554,8842,552,0,0,8857,554,3215,362,-1,-1,4230,470,-2,-2,-2,-2,-2,-2,8060,8060,8060,-1,-1,-1,-1,2,0,16,2,1,0,2,0,1,0,-1,-1,-1,-1,2,0,0,0,-1,-1,-9,-9\n1995,CA,4,122969,8263,-8,-8,3110,791,126079,9054,-9,-9,36840,3363,39399,3062,44963,2091,919,126,-1,-1,-1,-1,1307,23,-1,-1,-9,-9,48099,2508,126564,9082,81601,6991,0,0,126564,9082,40896,4563,-1,-1,97026,9412,-2,-2,-2,-2,-2,-2,-9,-9,71641,-1,-1,-1,-1,0,0,126,4,86,5,25,0,2,0,-1,-1,-1,-1,5,0,9,0,-1,-1,-9,-9\n1995,CO,4,8800,708,-9,-9,-8,-8,8800,708,544,5,7451,448,2496,248,2833,124,223,14,-1,-1,-1,-1,49,1,-1,-1,-9,-9,131,2,10350,713,7386,587,131,2,10350,713,3454,344,-1,-1,4508,480,-2,-2,-2,-2,-2,-2,-9,8543,7050,-1,-1,-1,-1,0,0,15,0,6,0,1,0,0,1,-1,-1,-1,-1,2,0,0,0,-1,-1,-9,-9\n1995,CT,1,9772,558,1379,167,2572,233,13723,958,-9,-9,3538,307,6406,451,3808,213,26,1,-1,-1,-1,-1,48,3,-1,-1,-9,-9,3808,213,13826,975,10018,762,0,0,13826,975,659,64,-1,-1,1413,173,-2,-2,-2,-2,-2,-2,-9,-9,-9,-1,-1,-1,-1,0,0,16,0,23,1,2,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1995,DE,3,2814,163,928,132,700,62,4442,357,-9,-9,1431,124,2929,228,181,10,1,0,-1,-1,-1,-1,2,1,-1,-1,-9,-9,82,4,4445,357,4104,343,160,4,4445,357,745,85,-1,-1,1067,127,-2,-2,-2,-2,-2,-2,-9,4206,3192,-1,-1,-1,-1,1,0,8,0,0,0,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1995,DC,3,8138,381,279,35,373,71,8790,487,-9,-9,112,15,9070,475,5,0,0,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,124,4,9306,494,9177,490,124,4,9306,494,3143,237,-1,-1,4899,345,-2,-2,-2,-2,-2,-2,7251,11099,9419,-1,-1,-1,-1,-8,-8,-9,-9,-9,-9,3,-9,0,-9,-1,-1,-1,-1,4,-9,-9,0,-1,-1,-9,-9\n1995,FL,3,60207,3659,12,1,-8,-8,60219,3660,-9,-9,24657,1560,34313,2094,4695,98,54,6,-1,-1,-1,-1,39,0,-1,-1,-9,-9,1156,0,60219,3660,55524,3562,0,0,60219,3660,16951,1625,-1,-1,17859,1767,-2,-2,-2,-2,-2,-2,68996,-9,50801,-1,-1,-1,-1,3,0,83,4,143,7,4,0,1,0,-1,-1,-1,-1,9,0,0,0,-1,-1,-9,-9\n1995,GA,3,32149,2019,81,17,-8,-8,32230,2036,-9,-9,10291,720,21838,1313,253,8,50,2,-1,-1,-1,-1,33,1,-1,-1,-9,-9,18,0,32230,2036,0,0,31977,2028,32230,2036,10600,1169,-1,-1,12490,1269,-2,-2,-2,-2,-2,-2,35659,35659,35659,-1,-1,-1,-1,2,0,54,3,46,4,9,1,1,0,-1,-1,-1,-1,0,0,7,0,-1,-1,-9,-9\n1995,HI,4,1790,139,42,3,776,62,2608,204,-9,-9,630,59,156,8,108,9,36,3,-1,-1,-1,-1,1641,124,-1,-1,-9,-9,785,118,3248,312,2750,210,390,93,3248,312,671,110,-1,-1,1453,155,-2,-2,-2,-2,-2,-2,-9,2646,1750,-1,-1,-1,-1,-8,-8,6,0,1,0,3,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1995,ID,4,2882,197,-8,-8,-8,-8,2882,197,-9,-9,2506,189,50,5,402,30,128,10,-1,-1,-1,-1,17,1,-1,-1,-9,-9,415,7,3116,212,2149,125,565,57,3116,212,1512,184,-1,-1,1664,182,-2,-2,-2,-2,-2,-2,-9,2908,2203,-1,-1,-1,-1,0,0,1,0,0,0,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1995,IL,2,35462,2196,-9,-9,0,0,35462,2196,-9,-9,8637,559,23153,1483,3569,135,45,12,-1,-1,-1,-1,57,7,-1,-1,-9,-9,3570,135,35462,2196,31892,2061,1,0,35462,2196,16546,1859,-1,-1,21411,1833,-2,-2,-2,-2,-2,-2,27376,27376,23714,-1,-1,-1,-1,5,0,53,2,30,1,6,0,2,0,-1,-1,-1,-1,4,0,0,0,-1,-1,-9,-9\n1995,IN,2,15162,884,64,7,7,1,15233,892,1119,20,8688,527,6484,362,380,5,46,2,-1,-1,-1,-1,15,1,-1,-1,-9,-9,0,0,15233,892,14853,887,0,0,15233,892,6952,640,-1,-1,6590,624,-2,-2,-2,-2,-2,-2,12539,15490,-9,-1,-1,-1,-1,0,0,37,3,1,0,2,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1995,IA,2,5481,425,-8,-8,-8,-8,5481,425,-9,-9,3841,272,1362,119,178,5,66,29,-1,-1,-1,-1,30,0,-1,-1,-9,-9,182,5,5481,425,5299,420,4,0,5481,425,2150,282,-1,-1,3206,397,-2,-2,-2,-2,-2,-2,3603,3603,3603,-1,-1,-1,-1,-8,-8,7,1,0,0,1,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1995,KS,2,6601,454,-8,-8,-8,-8,6601,454,-9,-9,3873,238,2581,198,423,13,95,11,-1,-1,-1,-1,56,2,-1,-1,-9,-9,0,0,6605,449,6112,432,70,4,6605,449,2310,342,-1,-1,3093,353,-2,-2,-2,-2,-2,-2,7452,-9,-9,-1,-1,-1,-1,0,0,12,0,0,0,0,0,1,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1995,KY,3,9452,476,0,0,0,0,9452,476,527,32,7190,427,4109,307,38,0,5,0,-1,-1,-1,-1,3,0,-1,-1,-9,-9,19,0,11326,734,11288,734,0,0,11326,734,4433,541,-1,-1,5363,611,-2,-2,-2,-2,-2,-2,10411,10164,-9,-1,-1,-1,-1,0,0,27,0,2,0,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1995,LA,3,16352,624,-8,-8,-8,-8,16352,624,7836,835,5282,412,18439,1009,-9,-9,2,0,-1,-1,-1,-1,2,0,-1,-1,-9,-9,46,3,23771,1424,-9,-9,23771,1424,23771,1424,5649,522,-1,-1,10759,994,-2,-2,-2,-2,-2,-2,17231,17804,-9,-1,-1,-1,-1,1,0,-9,-9,-9,-9,-9,-9,-9,-9,-1,-1,-1,-1,-9,-9,62,5,-1,-1,-9,-9\n1995,ME,1,1400,30,25,0,-8,-8,1425,30,-9,-9,1303,31,26,4,2,0,10,1,-1,-1,-1,-1,2,0,-1,-1,-9,-9,19,0,1360,36,1358,36,0,0,1360,36,450,10,-1,-1,736,28,-2,-2,-2,-2,-2,-2,1353,1353,1353,-1,-1,-1,-1,-8,-8,0,0,0,0,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1995,MD,3,19161,974,889,100,-8,-8,20050,1074,-9,-9,4458,318,15879,758,0,0,2,2,-1,-1,-1,-1,2,0,-1,-1,-9,-9,33,1,20374,1079,0,0,20374,1079,20374,1079,7450,676,-1,-1,8414,671,-2,-2,-2,-2,-2,-2,-9,21589,13384,-1,-1,-1,-1,0,0,24,1,25,0,0,0,1,0,-1,-1,-1,-1,3,0,0,0,-1,-1,-9,-9\n1995,MA,1,8748,373,426,209,538,75,9712,657,662,0,4315,285,2718,117,1764,127,13,0,-1,-1,-1,-1,74,2,-1,-1,-9,-9,3911,252,11031,656,7018,399,2249,130,11031,656,2216,219,-1,-1,3963,302,-2,-2,-2,-2,-2,-2,-9,-9,7603,-1,-1,-1,-1,-8,-8,17,0,14,0,2,1,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1995,MI,2,39270,1842,0,0,0,0,39270,1842,393,-9,16170,705,21859,1081,727,23,174,7,-1,-1,-1,-1,45,1,-1,-1,-9,-9,1022,48,39270,1842,38373,1804,170,15,39270,1842,7068,626,-1,-1,11083,1003,-2,-2,-2,-2,-2,-2,-9,41371,-9,-1,-1,-1,-1,-8,-8,95,0,-9,-9,8,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1995,MN,2,4427,201,0,0,0,0,4427,201,63,0,2369,102,1620,85,240,10,314,19,-1,-1,-1,-1,65,1,-1,-1,-9,-9,261,10,4629,217,4389,207,0,0,4629,217,2164,194,-1,-1,2777,274,-2,-2,-2,-2,-2,-2,4554,4554,4554,-1,-1,-1,-1,-8,-8,5,0,1,0,1,1,1,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1995,MS,3,9358,632,107,27,0,0,9465,659,2268,89,2952,254,8852,536,60,1,9,0,-1,-1,-1,-1,16,0,-1,-1,-9,-9,64,1,11893,791,11829,790,4,0,11893,791,4119,414,-1,-1,3098,348,-2,-2,-2,-2,-2,-2,10535,10535,10535,-1,-1,-1,-1,0,0,32,0,5,0,3,0,1,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1995,MO,2,17978,1173,0,0,-8,-8,17978,1173,-9,-9,9258,598,8626,571,224,13,50,5,-1,-1,-1,-1,24,0,-1,-1,-9,-9,2,0,17960,1174,17710,1157,26,4,17960,1174,6647,770,-1,-1,9548,1024,-2,-2,-2,-2,-2,-2,-9,19132,-9,-1,-1,-1,-1,6,0,29,1,3,1,2,0,2,1,-1,-1,-1,-1,5,0,3,0,-1,-1,-9,-9\n1995,MT,4,1536,65,-8,-8,-8,-8,1536,65,133,0,1526,84,36,1,32,2,317,26,-1,-1,-1,-1,2,0,-1,-1,-9,-9,6,1,1887,112,1849,109,6,1,1887,112,358,28,-1,-1,567,42,-2,-2,-2,-2,-2,-2,900,1414,900,-1,-1,-1,-1,1,0,9,0,0,0,0,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1995,NE,2,2784,177,50,13,26,1,2860,191,-9,-9,1860,113,896,83,252,5,103,12,-1,-1,-1,-1,4,1,-1,-1,-9,-9,0,2,2863,211,2611,205,0,1,2863,211,1168,127,-1,-1,1203,135,-2,-2,-2,-2,-2,-2,-9,2517,2013,-1,-1,-1,-1,0,0,11,1,0,0,1,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1995,NV,4,6924,509,154,12,0,0,7078,521,-9,-9,4043,321,1954,163,876,19,101,16,-1,-1,-1,-1,79,9,-1,-1,-9,-9,1006,21,7183,530,6300,511,7,0,7183,530,2745,365,-1,-1,2859,341,-2,-2,-2,-2,-2,-2,-9,7342,5842,-1,-1,-1,-1,0,0,13,2,6,0,1,1,0,0,-1,-1,-1,-1,1,1,0,0,-1,-1,-9,-9\n1995,NH,1,1868,105,9,14,2,4,1879,123,0,-9,1773,99,121,8,111,5,1,0,-1,-1,-1,-1,11,0,-1,-1,-9,-9,1,0,1907,107,919,68,877,34,1907,107,601,57,-1,-1,905,73,-2,-2,-2,-2,-2,-2,1358,1913,1716,-1,-1,-1,-1,0,0,0,0,2,0,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1995,NJ,1,21797,1011,-9,-9,-8,-8,21797,1011,3962,296,7229,419,16668,877,4628,157,5,0,-1,-1,-1,-1,65,2,-1,-1,-9,-9,1792,9,25759,1307,21129,1150,2,0,25759,1307,9018,729,-1,-1,11585,1001,-2,-2,-2,-2,-2,-2,-9,-9,13869,-1,-1,-1,-1,0,0,25,1,58,8,6,0,2,0,-1,-1,-1,-1,1,0,36,0,-1,-1,-9,-9\n1995,NM,4,3654,232,261,62,0,0,3915,294,369,0,3078,181,444,46,2093,116,142,10,-1,-1,-1,-1,5,0,-1,-1,-9,-9,131,41,3800,278,1576,121,131,41,3800,278,1138,122,-1,-1,1842,112,-2,-2,-2,-2,-2,-2,4636,4636,4645,-1,-1,-1,-1,0,0,-9,-9,0,0,-9,-9,-9,-9,-1,-1,-1,-1,-9,-9,7,1,-1,-1,-9,-9\n1995,NY,1,64871,3615,0,0,0,0,64871,3615,-9,-9,27867,1631,34953,1958,21214,1225,177,9,-1,-1,-1,-1,310,3,-1,-1,-9,-9,1567,14,64874,3615,43368,2383,292,7,64874,3615,21145,1835,-1,-1,30464,2485,-2,-2,-2,-2,-2,-2,67712,64585,52475,-1,-1,-1,-1,0,0,97,9,237,21,10,0,6,0,-1,-1,-1,-1,16,0,0,0,-1,-1,-9,-9\n1995,NC,3,24689,1522,760,116,198,28,25647,1666,396,0,8554,643,18104,1062,-9,-9,500,34,-1,-1,-1,-1,26,1,-1,-1,-9,-9,317,12,27501,1752,-9,-9,27501,1752,27501,1752,11999,1345,-1,-1,13455,1411,-2,-2,-2,-2,-2,-2,27305,27500,27305,-1,-1,-1,-1,2,0,36,1,27,1,1,0,1,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1995,ND,2,573,33,60,4,-8,-8,633,37,0,0,451,22,18,0,17,1,110,7,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,579,29,562,28,0,0,579,29,358,37,-1,-1,401,34,-2,-2,-2,-2,-2,-2,600,600,600,-1,-1,-1,-1,-8,-8,1,0,0,0,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1995,OH,2,41595,2743,-9,-9,0,0,41595,2743,-9,-9,18583,1173,22739,1617,684,49,40,0,-1,-1,-1,-1,29,1,-1,-1,-9,-9,479,2,41870,2793,40707,2742,479,2,41870,2793,16058,2475,-1,-1,17370,2553,-2,-2,-2,-2,-2,-2,26058,-9,26058,-1,-1,-1,-1,0,0,77,4,23,0,10,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1995,OK,3,13355,1213,-9,-9,-8,-8,13355,1213,257,34,8853,916,5796,750,585,25,1043,123,-1,-1,-1,-1,9,0,-1,-1,-9,-9,635,26,16336,1815,15751,1790,0,0,16336,1815,5990,952,-1,-1,5339,867,-2,-2,-2,-2,-2,-2,11369,14151,-9,-1,-1,-1,-1,3,0,35,0,3,1,7,0,5,0,-1,-1,-1,-1,10,1,0,1,-1,-1,-9,-9\n1995,OR,4,6179,272,1183,178,0,0,7362,450,17,2,5600,374,938,61,674,11,143,18,-1,-1,-1,-1,65,1,-1,-1,-9,-9,675,11,7421,465,6746,454,1,0,7421,465,1650,146,-1,-1,2900,218,-2,-2,-2,-2,-2,-2,-9,7202,-9,-1,-1,-1,-1,0,0,15,1,5,0,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1995,PA,1,30911,1485,1,0,5,0,30917,1485,-9,-9,10260,560,17563,796,2951,124,63,3,-1,-1,-1,-1,73,1,-1,-1,-9,-9,2966,125,30925,1485,27974,1361,-8,-8,30925,1485,5683,390,-1,-1,6501,450,-2,-2,-2,-2,-2,-2,-9,20970,-9,-1,-1,-1,-1,2,0,50,4,33,5,15,0,9,0,-1,-1,-1,-1,3,0,1,0,-1,-1,-9,-9\n1995,RI,1,1774,49,426,50,509,46,2709,145,-9,-9,1739,110,964,45,418,20,8,2,-1,-1,-1,-1,34,0,-1,-1,-9,-9,0,0,2745,157,2327,137,0,0,2745,157,546,37,-1,-1,863,50,-2,-2,-2,-2,-2,-2,3349,3349,3349,-1,-1,-1,-1,-8,-8,5,0,0,0,1,0,0,0,-1,-1,-1,-1,0,0,1,0,-1,-1,-9,-9\n1995,SC,3,17402,915,466,81,-8,-8,17868,996,377,22,5537,328,12931,710,65,5,17,3,-1,-1,-1,-1,9,0,-1,-1,-9,-9,72,4,18566,1045,18430,846,71,194,18566,1045,5151,449,-1,-1,6893,564,-2,-2,-2,-2,-2,-2,17586,18864,15333,-1,-1,-1,-1,1,0,61,1,-9,-9,1,0,0,1,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1995,SD,2,1730,134,-9,-9,-8,-8,1730,134,-9,-9,1275,80,63,6,-9,-9,371,46,-1,-1,-1,-1,0,0,-1,-1,-9,-9,-8,-8,1709,132,-9,-9,1709,132,1709,132,689,94,-1,-1,769,77,-2,-2,-2,-2,-2,-2,-9,1565,-9,-1,-1,-1,-1,0,0,3,0,0,0,2,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1995,TN,3,12622,418,-8,-8,-8,-8,12622,418,1843,214,6967,375,7537,261,46,0,13,1,-1,-1,-1,-1,6,0,-1,-1,-9,-9,46,0,14569,637,14523,637,0,0,14569,637,3677,387,-1,-1,5741,537,-2,-2,-2,-2,-2,-2,13605,13328,-9,-1,-1,-1,-1,0,0,44,2,12,0,1,0,1,0,-1,-1,-1,-1,4,0,0,0,-1,-1,-9,-9\n1995,TX,3,116019,7330,3812,605,-8,-8,119831,7935,-9,-9,32594,2396,55602,4404,31156,1111,-9,-9,-1,-1,-1,-1,-9,-9,-1,-1,-9,-9,31635,1135,119831,7935,88675,6824,0,0,119831,7935,33044,3800,-1,-1,39797,6064,-2,-2,-2,-2,-2,-2,132707,132707,136891,-1,-1,-1,-1,19,0,256,17,66,8,18,1,5,0,-1,-1,-1,-1,5,0,4,0,-1,-1,-9,-9\n1995,UT,4,3690,204,24,1,53,13,3767,218,272,7,2826,132,278,17,583,24,108,6,-1,-1,-1,-1,58,3,-1,-1,-9,-9,21,3,3291,161,2687,134,21,3,3291,161,1166,96,-1,-1,1839,162,-2,-2,-2,-2,-2,-2,-9,3509,3893,-1,-1,-1,-1,0,0,4,0,0,0,1,0,1,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1995,VT,1,982,32,115,3,104,9,1201,44,-9,-9,1220,44,15,0,5,0,0,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,0,0,1235,44,1230,44,0,0,1235,44,379,32,-1,-1,462,41,-2,-2,-2,-2,-2,-2,1052,1052,991,-1,-1,-1,-1,-8,-8,0,0,0,0,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1995,VA,3,22590,1217,74,9,-8,-8,22664,1226,2546,433,8165,540,17403,1113,102,3,4,1,-1,-1,-1,-1,73,2,-1,-1,-9,-9,111,3,25756,1659,0,0,25654,1656,25756,1659,8443,1051,-1,-1,9856,1166,-2,-2,-2,-2,-2,-2,16166,16166,16166,-1,-1,-1,-1,5,0,45,3,27,0,2,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1995,WA,4,10797,795,40,0,47,0,10884,795,-9,-9,7699,503,2500,203,1695,64,298,43,-1,-1,-1,-1,266,10,-1,-1,-9,-9,52,34,10815,793,9041,711,79,18,10815,793,4775,519,-1,-1,4877,517,-2,-2,-2,-2,-2,-2,7231,9916,9916,-1,-1,-1,-1,0,0,19,0,3,1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1995,WV,3,2223,126,-8,-8,26,3,2249,129,134,0,1975,107,405,22,6,0,2,0,-1,-1,-1,-1,1,0,-1,-1,-9,-9,0,0,2383,129,2377,129,0,0,2383,129,925,96,-1,-1,895,70,-2,-2,-2,-2,-2,-2,2438,2377,2485,-1,-1,-1,-1,-8,-8,6,0,0,0,0,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1995,WI,2,9872,465,20,0,805,37,10697,502,339,15,5296,202,5094,277,739,16,218,11,-1,-1,-1,-1,60,2,-1,-1,-9,-9,29,10,10697,502,9922,483,36,3,10697,502,4084,392,-1,-1,5309,436,-2,-2,-2,-2,-2,-2,7499,7499,7499,-1,-1,-1,-1,-8,-8,10,0,3,0,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1995,WY,4,1160,90,0,0,0,0,1160,90,0,0,989,82,65,8,147,12,80,3,-1,-1,-1,-1,4,0,-1,-1,-9,-9,151,13,1289,106,1138,93,4,1,1289,106,470,55,-1,-1,411,39,-2,-2,-2,-2,-2,-2,981,1244,1035,-1,-1,-1,-1,0,0,1,0,0,0,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1995,ST,7,906643,54273,13814,2032,10717,1525,931174,57830,25830,2028,369822,24938,476590,30360,140460,6275,7923,777,-1,-1,-1,-1,4814,211,-1,-1,0,0,105809,4793,964958,61079,687608,46115,136890,8689,964958,61079,304567,32925,-1,-1,425298,43957,-2,-2,-2,-2,-2,-2,579437,648246,606764,-1,-1,-1,-1,56,0,1537,68,912,64,155,5,45,3,-1,-1,-1,-1,85,2,193,11,-1,-1,0,0\n1995,US,5,978274,59409,16358,2491,19908,2102,1014540,64002,25830,2028,425796,29225,510760,33245,166221,8073,9302,874,-1,-1,-1,-1,6143,340,-1,-1,0,0,105809,4793,1057810,68477,754699,51715,136890,8689,1057810,68477,326403,35061,-1,-1,445652,46206,-2,-2,-2,-2,-2,-2,651582,648246,606764,-1,-1,-1,-1,56,0,1537,68,912,64,155,5,45,3,-1,-1,-1,-1,85,2,406,20,-1,-1,0,0\n1995,FE,6,71631,5136,2544,459,9191,577,83366,6172,-9,-9,55974,4287,34170,2885,25761,1798,1379,97,-1,-1,-1,-1,1329,129,-1,-1,-9,-9,0,0,92852,7398,67091,5600,0,0,92852,7398,21836,2136,-1,-1,20354,2249,-2,-2,-2,-2,-2,-2,72145,-9,-9,-1,-1,-1,-1,0,0,-9,-9,-9,-9,-9,-9,-9,-9,-1,-1,-1,-1,-9,-9,213,9,-1,-1,-9,-9\n1996,AL,3,19490,1282,587,65,0,0,20077,1347,1092,76,6940,515,13397,839,2,0,3,0,-1,-1,-1,-1,2,0,-1,-1,-9,-9,61,3,20403,1357,20401,1357,0,0,20403,1357,6761,716,-1,-1,7946,826,-2,-2,-2,-2,-2,-2,19927,19927,19927,-1,-1,-1,-1,1,0,-9,-9,13,0,-9,-9,-9,-9,-1,-1,-1,-1,-9,-9,73,2,-1,-1,-9,-9\n1996,AK,4,1739,89,211,19,831,79,2781,187,0,0,1651,139,486,43,108,7,1138,78,-1,-1,-1,-1,62,3,-1,-1,-9,-9,109,7,3446,270,3337,263,1,0,3446,270,1351,198,-1,-1,1820,264,-2,-2,-2,-2,-2,-2,2603,-9,-9,-1,-1,-1,-1,-8,-8,3,0,0,0,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1996,AZ,4,20108,1415,870,100,0,0,20978,1515,124,0,16682,1149,3172,260,6901,379,857,93,-1,-1,-1,-1,55,3,-1,-1,-9,-9,212,10,20978,1515,14075,1136,2,0,20978,1515,6344,670,-1,-1,7039,819,-2,-2,-2,-2,-2,-2,-9,20270,-9,-1,-1,-1,-1,2,0,49,2,0,0,2,0,4,0,-1,-1,-1,-1,1,0,1,0,-1,-1,-9,-9\n1996,AR,3,8065,532,68,10,0,0,8133,542,1201,0,3898,267,4873,274,49,3,7,2,-1,-1,-1,-1,22,2,-1,-1,-9,-9,59,3,8859,548,8810,545,0,0,8859,548,2922,312,-1,-1,4294,451,-2,-2,-2,-2,-2,-2,8160,8160,8160,-1,-1,-1,-1,1,0,18,0,2,0,0,0,1,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1996,CA,4,132986,9395,-9,-9,2495,689,135481,10084,-9,-9,39702,3634,42300,3453,48053,2386,996,129,-1,-1,-1,-1,1444,22,-1,-1,-9,-9,51500,2869,135942,10107,84442,7238,3447,483,135942,10107,41490,4975,-1,-1,102221,10535,-2,-2,-2,-2,-2,-2,-9,-9,72621,-1,-1,-1,-1,2,0,145,9,47,2,18,0,1,0,-1,-1,-1,-1,11,0,18,0,-1,-1,-9,-9\n1996,CO,4,9473,829,-9,-9,-8,-8,9473,829,1147,16,8137,548,2747,275,3184,160,226,17,-1,-1,-1,-1,61,1,-1,-1,-9,-9,422,4,11593,845,7987,681,422,4,11593,845,3968,378,-1,-1,4319,404,-2,-2,-2,-2,-2,-2,-9,8605,7104,-1,-1,-1,-1,0,0,19,0,0,0,2,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1996,CT,1,9800,613,1420,260,2873,267,14093,1140,-9,-9,3635,375,6396,486,3774,270,22,1,-1,-1,-1,-1,47,1,-1,-1,-9,-9,3774,270,13874,1133,10100,863,0,0,13874,1133,378,26,-1,-1,1228,116,-2,-2,-2,-2,-2,-2,-9,-9,-9,-1,-1,-1,-1,0,0,13,1,30,2,3,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1996,DE,3,2952,164,966,126,810,89,4728,379,-9,-9,1586,149,3060,220,187,16,0,0,-1,-1,-1,-1,2,3,-1,-1,-9,-9,83,7,4731,379,4389,361,155,2,4731,379,832,104,-1,-1,1223,153,-2,-2,-2,-2,-2,-2,-9,4206,3192,-1,-1,-1,-1,3,0,14,2,0,0,1,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1996,DC,3,7755,356,259,32,351,66,8365,454,-9,-9,124,20,8617,437,4,0,0,0,-1,-1,-1,-1,0,0,-1,-1,-9,-9,174,4,8915,461,8737,457,174,4,8915,461,3021,283,-1,-1,6475,502,-2,-2,-2,-2,-2,-2,7251,9866,9419,-1,-1,-1,-1,-8,-8,22,-9,-9,-9,1,-9,0,0,-1,-1,-1,-1,6,-9,-9,-9,-1,-1,-9,-9\n1996,FL,3,60447,3299,14,3,-8,-8,60461,3302,-9,-9,25551,1458,33643,1818,5178,144,74,4,-1,-1,-1,-1,48,1,-1,-1,-9,-9,1145,21,60461,3302,55283,3158,0,0,60461,3302,18422,1550,-1,-1,22115,2214,-2,-2,-2,-2,-2,-2,71449,68582,62065,-1,-1,-1,-1,2,0,105,5,120,4,5,0,2,0,-1,-1,-1,-1,4,0,-9,-9,-1,-1,-9,-9\n1996,GA,3,32193,2135,707,104,-8,-8,32900,2239,-9,-9,10560,822,22206,1412,261,7,53,2,-1,-1,-1,-1,34,2,-1,-1,-9,-9,47,1,32900,2239,0,0,32639,2232,32900,2239,11160,1373,-1,-1,14000,1471,-2,-2,-2,-2,-2,-2,-9,32889,-9,-1,-1,-1,-1,2,0,55,1,47,1,3,0,1,0,-1,-1,-1,-1,0,0,4,0,-1,-1,-9,-9\n1996,HI,4,2123,201,83,13,825,64,3031,278,-9,-9,768,98,187,18,178,12,44,6,-1,-1,-1,-1,1972,197,-1,-1,-9,-9,655,66,3626,385,3353,369,95,4,3626,385,1164,189,-1,-1,1716,276,-2,-2,-2,-2,-2,-2,-9,2650,1754,-1,-1,-1,-1,-8,-8,1,0,0,0,3,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1996,ID,4,3028,229,-8,-8,-8,-8,3028,229,0,0,2863,245,57,6,463,38,146,12,-1,-1,-1,-1,18,0,-1,-1,-9,-9,477,8,3561,271,2493,160,605,73,3561,271,1721,250,-1,-1,1778,244,-2,-2,-2,-2,-2,-2,2447,3301,2447,-1,-1,-1,-1,0,0,2,0,1,0,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1996,IL,2,36603,2249,-9,-9,0,0,36603,2249,-9,-9,8930,531,23751,1570,3813,129,47,13,-1,-1,-1,-1,61,6,-1,-1,-9,-9,3814,129,36603,2249,32789,2120,1,0,36603,2249,16434,1856,-1,-1,21138,2209,-2,-2,-2,-2,-2,-2,28200,28200,24538,-1,-1,-1,-1,1,0,45,5,30,2,6,0,2,0,-1,-1,-1,-1,4,0,0,1,-1,-1,-9,-9\n1996,IN,2,14673,924,150,9,5,5,14828,938,1124,70,9117,613,6769,390,379,16,45,4,-1,-1,-1,-1,21,1,-1,-1,-9,-9,0,0,15952,1008,15573,992,0,0,15952,1008,7275,741,-1,-1,7416,686,-2,-2,-2,-2,-2,-2,13611,15730,-9,-1,-1,-1,-1,1,0,34,0,2,0,2,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1996,IA,2,5872,470,-8,-8,-8,-8,5872,470,-9,-9,4052,335,1457,111,221,8,99,16,-1,-1,-1,-1,39,0,-1,-1,-9,-9,225,8,5872,470,5651,462,0,0,5872,470,2322,282,-1,-1,3294,426,-2,-2,-2,-2,-2,-2,4201,4201,4201,-1,-1,-1,-1,-8,-8,7,0,0,0,2,0,0,0,-1,-1,-1,-1,0,0,1,0,-1,-1,-9,-9\n1996,KS,2,7277,478,-8,-8,-8,-8,7277,478,-9,-9,4276,255,2771,203,472,17,112,10,-1,-1,-1,-1,63,2,-1,-1,-9,-9,58,6,7280,476,6750,453,58,6,7280,476,2498,361,-1,-1,3117,425,-2,-2,-2,-2,-2,-2,7883,-9,-9,-1,-1,-1,-1,0,0,16,1,2,0,1,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1996,KY,3,9640,508,-8,-8,-8,-8,9640,508,721,57,7609,481,4451,339,60,2,3,0,-1,-1,-1,-1,7,0,-1,-1,-9,-9,20,0,12090,820,12030,818,0,0,12090,820,5061,611,-1,-1,6130,705,-2,-2,-2,-2,-2,-2,9232,9003,7104,-1,-1,-1,-1,0,0,29,0,0,0,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1996,LA,3,16882,782,-8,-8,-8,-8,16882,782,8373,774,5603,452,19561,1106,-9,-9,3,0,-1,-1,-1,-1,2,0,-1,-1,-9,-9,49,3,25218,1561,-9,-9,25218,1561,25218,1561,5650,556,-1,-1,11468,1123,-2,-2,-2,-2,-2,-2,17631,17664,-9,-1,-1,-1,-1,1,0,50,2,19,1,0,1,0,0,-1,-1,-1,-1,0,0,12,0,-1,-1,-9,-9\n1996,ME,1,1388,33,49,6,-8,-8,1437,39,-9,-9,-9,-9,-9,-9,-9,-9,-9,-9,-1,-1,-1,-1,-9,-9,-1,-1,-9,-9,-9,-9,1378,48,-9,-9,-9,-9,1378,48,501,27,-1,-1,829,24,-2,-2,-2,-2,-2,-2,1490,1490,1490,-1,-1,-1,-1,-8,-8,1,0,0,0,0,0,0,0,-1,-1,-1,-1,0,0,2,0,-1,-1,-9,-9\n1996,MD,3,19710,964,969,86,-8,-8,20679,1050,-9,-9,4605,288,16349,765,-9,-9,1,1,-1,-1,-1,-1,8,0,-1,-1,-9,-9,32,1,20995,1055,-9,-9,-9,-9,-9,-9,7286,688,-1,-1,8397,788,-2,-2,-2,-2,-2,-2,-9,22885,-9,-1,-1,-1,-1,0,0,20,1,16,0,6,0,0,0,-1,-1,-1,-1,2,0,3,0,-1,-1,-9,-9\n1996,MA,1,9479,462,45,131,556,130,10080,723,554,0,5174,404,3328,153,2350,180,23,2,-1,-1,-1,-1,101,2,-1,-1,-9,-9,2420,189,11046,750,8514,560,182,10,11046,750,1999,202,-1,-1,2723,236,-2,-2,-2,-2,-2,-2,-9,-9,7838,-1,-1,-1,-1,-8,-8,19,0,7,0,3,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1996,MI,2,40429,1920,-8,-8,-8,-8,40429,1920,330,-9,16599,763,22493,1093,825,28,183,12,-1,-1,-1,-1,51,1,-1,-1,-9,-9,1103,51,40429,1920,39443,1874,161,18,40429,1920,7432,617,-1,-1,11552,942,-2,-2,-2,-2,-2,-2,-9,42959,-9,-1,-1,-1,-1,-8,-8,111,2,-9,-9,9,0,1,1,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1996,MN,2,4576,223,0,0,5,0,4581,223,208,0,2461,127,1758,83,282,10,334,13,-1,-1,-1,-1,-9,-9,-1,-1,-9,-9,371,11,4924,234,4642,224,0,0,4924,234,2292,186,-1,-1,2779,213,-2,-2,-2,-2,-2,-2,5014,5014,5014,-1,-1,-1,-1,-8,-8,7,1,1,0,1,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1996,MS,3,9065,646,283,36,0,0,9348,682,3126,116,3177,286,9726,601,42,2,10,2,-1,-1,-1,-1,11,0,-1,-1,-9,-9,44,2,12968,891,12924,889,2,0,12968,891,4339,423,-1,-1,4158,417,-2,-2,-2,-2,-2,-2,12440,12440,12440,-1,-1,-1,-1,0,0,22,0,5,0,3,0,1,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1996,MO,2,20550,1464,4,0,-8,-8,20554,1464,0,0,10776,801,9665,657,255,10,69,5,-1,-1,-1,-1,27,1,-1,-1,-9,-9,2,0,20539,1464,20258,1451,26,3,20539,1464,7021,895,-1,-1,9447,1146,-2,-2,-2,-2,-2,-2,-9,20611,-9,-1,-1,-1,-1,6,0,18,0,0,0,6,0,0,0,-1,-1,-1,-1,0,0,6,1,-1,-1,-9,-9\n1996,MT,4,1516,74,-8,-8,-8,-8,1516,74,80,5,1692,95,51,0,43,6,317,45,-1,-1,-1,-1,0,0,-1,-1,-9,-9,82,11,2142,151,2088,145,11,0,2142,151,578,85,-1,-1,726,89,-2,-2,-2,-2,-2,-2,-9,1417,896,-1,-1,-1,-1,0,0,4,0,0,0,0,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1996,NE,2,2917,212,50,12,22,3,2989,227,-9,-9,2004,120,931,86,264,8,115,15,-1,-1,-1,-1,12,1,-1,-1,-9,-9,0,3,3062,225,2798,215,0,2,3062,225,1226,144,-1,-1,1395,151,-2,-2,-2,-2,-2,-2,-9,2517,2013,-1,-1,-1,-1,1,0,7,0,0,0,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1996,NV,4,7373,571,133,4,0,0,7506,575,-9,-9,4332,369,2127,165,1146,37,113,17,-1,-1,-1,-1,100,7,-1,-1,-9,-9,1169,40,7841,598,6694,561,1,0,7841,598,2629,346,-1,-1,3177,369,-2,-2,-2,-2,-2,-2,7667,7326,5842,-1,-1,-1,-1,1,0,18,1,8,0,3,1,2,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1996,NH,1,1883,105,11,27,2,9,1896,141,65,0,1831,100,110,5,103,5,1,0,-1,-1,-1,-1,14,0,-1,-1,-9,-9,1,0,1957,105,1160,78,694,22,1957,105,587,54,-1,-1,872,77,-2,-2,-2,-2,-2,-2,1886,1786,1716,-1,-1,-1,-1,0,0,1,0,0,0,1,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1996,NJ,1,22108,1015,-9,-9,-8,-8,22108,1015,4101,266,7022,383,16991,866,4769,173,4,0,-1,-1,-1,-1,73,2,-1,-1,-9,-9,2119,30,26209,1281,21440,1108,0,0,26209,1281,8665,717,-1,-1,13364,1213,-2,-2,-2,-2,-2,-2,-9,-9,13869,-1,-1,-1,-1,0,0,37,4,72,2,0,0,0,0,-1,-1,-1,-1,0,0,27,0,-1,-1,-9,-9\n1996,NM,4,4118,336,234,45,0,0,4352,381,307,0,3639,290,495,65,2305,178,199,23,-1,-1,-1,-1,13,0,-1,-1,-9,-9,0,0,4346,378,2041,200,0,0,4346,378,1412,230,-1,-1,2017,247,-2,-2,-2,-2,-2,-2,4515,4515,4515,-1,-1,-1,-1,0,0,-9,-9,0,0,-9,-9,-9,-9,-1,-1,-1,-1,-9,-9,4,0,-1,-1,-9,-9\n1996,NY,1,65981,3728,0,0,0,0,65981,3728,0,0,28451,1558,35501,2100,21531,1188,172,5,-1,-1,-1,-1,362,6,-1,-1,-9,-9,1495,59,65981,3728,44190,2486,260,54,65981,3728,19482,1710,-1,-1,28650,2279,-2,-2,-2,-2,-2,-2,68996,65700,53366,-1,-1,-1,-1,0,0,113,3,172,10,13,0,12,0,-1,-1,-1,-1,7,0,0,0,-1,-1,-9,-9\n1996,NC,3,24281,1388,2433,377,247,30,26961,1795,516,0,8877,711,18919,1092,-9,-9,591,41,-1,-1,-1,-1,31,4,-1,-1,-9,-9,361,20,28779,1868,-9,-9,28779,1868,28779,1868,8674,927,-1,-1,13105,1417,-2,-2,-2,-2,-2,-2,24175,-9,24175,-1,-1,-1,-1,0,0,41,3,25,1,2,0,0,0,-1,-1,-1,-1,2,0,0,0,-1,-1,-9,-9\n1996,ND,2,642,48,66,9,-8,-8,708,57,86,5,496,34,22,1,44,1,156,10,-1,-1,-1,-1,3,0,-1,-1,-9,-9,0,0,677,45,633,44,0,0,677,45,445,43,-1,-1,444,35,-2,-2,-2,-2,-2,-2,623,623,623,-1,-1,-1,-1,-8,-8,0,0,0,0,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1996,OH,2,43190,2778,-9,-9,-8,-8,43190,2778,-9,-9,19535,1227,23516,1573,691,51,41,1,-1,-1,-1,-1,27,2,-1,-1,-9,-9,250,2,43369,2805,42428,2752,250,2,43369,2805,15537,2411,-1,-1,17600,2616,-2,-2,-2,-2,-2,-2,34337,-9,-9,-1,-1,-1,-1,0,0,86,2,19,1,4,0,3,0,-1,-1,-1,-1,2,0,0,0,-1,-1,-9,-9\n1996,OK,3,13808,1322,-9,-9,-8,-8,13808,1322,227,58,9587,1001,6123,768,674,34,1204,133,-1,-1,-1,-1,21,4,-1,-1,-9,-9,718,34,17653,1940,16979,1906,0,0,17653,1940,5931,936,-1,-1,5079,912,-2,-2,-2,-2,-2,-2,11369,14388,-9,-1,-1,-1,-1,2,0,47,1,4,0,4,0,5,0,-1,-1,-1,-1,3,0,0,0,-1,-1,-9,-9\n1996,OR,4,6798,332,1124,203,0,0,7922,535,65,26,5988,450,981,82,875,16,150,20,-1,-1,-1,-1,95,3,-1,-1,-9,-9,876,16,8090,571,7214,555,1,0,8090,571,1965,176,-1,-1,2721,190,-2,-2,-2,-2,-2,-2,-9,7202,-9,-1,-1,-1,-1,1,0,17,0,2,0,4,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1996,PA,1,32999,1475,0,0,2,0,33001,1475,0,0,10922,560,18772,793,3174,116,78,3,-1,-1,-1,-1,100,1,-1,-1,-9,-9,3188,120,33060,1477,29886,1361,0,0,33060,1477,5384,360,-1,-1,7227,566,-2,-2,-2,-2,-2,-2,-9,21740,22170,-1,-1,-1,-1,0,0,70,4,28,3,10,0,1,0,-1,-1,-1,-1,3,0,7,0,-1,-1,-9,-9\n1996,RI,1,1944,65,530,111,546,37,3020,213,-9,-9,1901,155,1096,72,484,19,7,2,-1,-1,-1,-1,38,0,-1,-1,-9,-9,0,0,3042,229,2558,210,0,0,3042,229,672,43,-1,-1,797,42,-2,-2,-2,-2,-2,-2,3441,3441,3441,-1,-1,-1,-1,-8,-8,6,0,1,0,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1996,SC,3,18134,1063,566,97,-8,-8,18700,1160,390,23,5681,400,13464,795,159,4,20,2,-1,-1,-1,-1,7,0,-1,-1,-9,-9,72,5,19244,1202,19019,935,66,263,19244,1202,5303,527,-1,-1,6957,543,-2,-2,-2,-2,-2,-2,18614,18614,15189,-1,-1,-1,-1,6,0,34,2,26,1,5,0,0,0,-1,-1,-1,-1,2,0,0,0,-1,-1,-9,-9\n1996,SD,2,1922,141,-9,-9,-8,-8,1922,141,-9,-9,1457,86,80,7,-8,-8,385,48,-1,-1,-1,-1,0,0,-1,-1,-9,-9,-8,-8,1922,141,-8,-8,1922,141,1922,141,787,104,-1,-1,834,117,-2,-2,-2,-2,-2,-2,-9,1832,-9,-1,-1,-1,-1,0,0,3,0,0,0,1,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1996,TN,3,13130,435,-8,-8,-8,-8,13130,435,1711,247,7158,421,7711,262,46,4,11,1,-1,-1,-1,-1,12,0,-1,-1,-9,-9,46,4,14938,688,14892,684,0,0,14938,688,4116,462,-1,-1,7170,730,-2,-2,-2,-2,-2,-2,-9,13811,14095,-1,-1,-1,-1,0,0,48,3,8,0,0,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1996,TX,3,119064,8974,3386,959,-8,-8,122450,9933,-9,-9,33676,3114,55810,5322,32464,1476,-9,-9,-1,-1,-1,-1,-9,-9,-1,-1,-9,-9,32964,1497,122450,9933,89986,8457,0,0,122450,9933,21099,3369,-1,-1,30578,3521,-2,-2,-2,-2,-2,-2,136195,136195,138849,-1,-1,-1,-1,3,0,210,10,118,4,20,0,3,0,-1,-1,-1,-1,5,0,4,0,-1,-1,-9,-9\n1996,UT,4,4203,246,28,1,66,16,4297,263,245,63,3213,186,311,17,687,33,118,5,-1,-1,-1,-1,80,1,-1,-1,-9,-9,39,2,3761,211,3035,176,39,2,3761,211,1191,162,-1,-1,1873,215,-2,-2,-2,-2,-2,-2,-9,4048,4230,-1,-1,-1,-1,1,0,3,0,1,0,1,0,1,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1996,VT,1,780,21,132,4,175,7,1087,32,-9,-9,1000,32,14,0,5,0,7,0,-1,-1,-1,-1,6,0,-1,-1,-9,-9,60,0,1087,32,1082,32,0,0,1087,32,194,10,-1,-1,1003,47,-2,-2,-2,-2,-2,-2,1160,1160,1023,-1,-1,-1,-1,-8,-8,0,0,0,0,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1996,VA,3,23496,1301,309,43,-8,-8,23805,1344,2163,343,8328,572,17436,1103,110,3,5,8,-1,-1,-1,-1,81,2,-1,-1,-9,-9,118,2,25968,1687,0,0,25858,1684,25968,1687,7280,911,-1,-1,8878,1143,-2,-2,-2,-2,-2,-2,16166,16166,16166,-1,-1,-1,-1,8,0,35,3,31,0,4,1,0,2,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1996,WA,4,11584,917,50,3,33,1,11667,921,-9,-9,8229,608,2694,225,1812,77,321,52,-1,-1,-1,-1,297,8,-1,-1,-9,-9,66,27,11607,920,9701,831,94,12,11607,920,4913,619,-1,-1,4939,604,-2,-2,-2,-2,-2,-2,7371,10057,10057,-1,-1,-1,-1,0,0,22,1,9,0,1,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1996,WV,3,2311,133,-8,-8,20,4,2331,137,275,11,2181,125,416,24,6,0,2,0,-1,-1,-1,-1,1,0,-1,-1,-9,-9,0,0,2600,149,2594,149,0,0,2600,149,802,74,-1,-1,741,66,-2,-2,-2,-2,-2,-2,2640,2730,2580,-1,-1,-1,-1,-8,-8,6,0,0,0,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1996,WI,2,11321,621,23,4,553,8,11897,633,326,12,5952,284,5989,333,865,35,271,18,-1,-1,-1,-1,72,3,-1,-1,-9,-9,62,7,12346,645,11429,609,52,1,12346,645,4176,443,-1,-1,4838,423,-2,-2,-2,-2,-2,-2,9538,9538,9538,-1,-1,-1,-1,-8,-8,8,1,4,0,1,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1996,WY,4,1233,94,0,0,0,0,1233,94,16,0,1067,92,73,5,161,11,82,4,-1,-1,-1,-1,4,0,-1,-1,-9,-9,161,11,1387,112,1226,101,0,0,1387,112,459,64,-1,-1,450,60,-2,-2,-2,-2,-2,-2,981,1244,1035,-1,-1,-1,-1,0,0,3,1,0,0,0,0,0,0,-1,-1,-1,-1,4,0,0,0,-1,-1,-9,-9\n1996,ST,7,943039,59057,15760,2899,10417,1504,969216,63460,28573,2168,388695,27728,492853,32373,149459,7299,8865,875,-1,-1,-1,-1,5607,292,-1,-1,0,0,110703,5563,1008101,66879,715054,50026,121215,8451,987106,65824,293151,33396,-1,-1,434057,45287,-2,-2,-2,-2,-2,-2,561213,704703,594702,-1,-1,-1,-1,45,0,1644,71,870,34,151,3,40,3,-1,-1,-1,-1,65,0,162,4,-1,-1,0,0\n1996,US,5,1019387,64609,18301,3284,20067,2116,1057755,70009,28573,2168,446136,32172,530140,35409,177520,9241,10434,959,-1,-1,-1,-1,7154,428,-1,-1,0,0,110703,5563,1105945,74579,784837,55784,121215,8451,1084950,73524,317989,35904,-1,-1,456599,47690,-2,-2,-2,-2,-2,-2,638110,704703,594702,-1,-1,-1,-1,45,0,1644,71,870,34,151,3,40,3,-1,-1,-1,-1,65,0,379,16,-1,-1,0,0\n1996,FE,6,76348,5552,2541,385,9650,612,88539,6549,-9,-9,57441,4444,37287,3036,28061,1942,1569,84,-1,-1,-1,-1,1547,136,-1,-1,-9,-9,0,0,97844,7700,69783,5758,0,0,97844,7700,24838,2508,-1,-1,22542,2403,-2,-2,-2,-2,-2,-2,76897,-9,-9,-1,-1,-1,-1,0,0,-9,-9,-9,-9,-9,-9,-9,-9,-1,-1,-1,-1,-9,-9,217,12,-1,-1,-9,-9\n1997,AL,3,20065,1299,562,48,0,0,20627,1347,1873,92,7070,545,13784,810,1,0,3,0,1,0,-9,-9,-1,-1,-1,-1,-9,-9,72,5,20930,1360,20929,1360,0,0,20930,1360,7004,792,-1,-1,8098,933,-2,-2,-2,-2,-2,-2,20412,20412,20412,-1,-1,-1,-1,3,0,-9,-9,14,0,-9,-9,-9,-9,-1,-1,-1,-1,-9,0,71,3,-1,-1,-9,-9\n1997,AK,4,1818,100,249,21,926,90,2993,211,55,-9,1743,152,538,62,131,7,1370,81,75,2,-9,-9,-1,-1,-1,-1,-9,-9,135,7,3861,304,3726,297,4,0,3861,304,1611,250,-1,-1,2127,322,-2,-2,-2,-2,-2,-2,2603,2603,2603,-1,-1,-1,-1,-8,-8,2,1,0,0,1,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1997,AZ,4,20938,1415,986,145,0,0,21924,1560,211,0,17490,1196,3255,268,7365,367,900,84,57,3,-9,-9,-1,-1,-1,-1,-9,-9,222,9,21924,1560,14559,1193,0,0,21924,1560,6376,564,-1,-1,7578,814,-2,-2,-2,-2,-2,-2,-9,24137,21370,-1,-1,-1,-1,2,0,51,1,0,0,3,0,1,0,-1,-1,-1,-1,2,0,1,0,-1,-1,-9,-9\n1997,AR,3,8331,595,42,11,0,0,8373,606,1376,0,4160,288,5222,321,71,3,7,1,14,1,0,0,-1,-1,-1,-1,-9,-9,7,0,9410,611,9339,608,0,0,9410,611,2955,307,-1,-1,4355,428,-2,-2,-2,-2,-2,-2,8760,8760,8760,-1,-1,-1,-1,4,0,20,1,0,0,3,0,0,0,-1,-1,-1,-1,3,0,0,0,-1,-1,-9,-9\n1997,CA,4,141944,10281,-9,-9,2448,603,144392,10884,-9,-9,42866,4091,44682,3649,50995,2585,1058,139,1280,31,77,3,-1,-1,-1,-1,-9,-9,54913,3001,144876,10914,89963,7913,3918,416,144876,10914,41563,5203,-1,-1,110938,11711,-2,-2,-2,-2,-2,-2,-9,-9,76352,-1,-1,-1,-1,0,0,180,11,33,3,18,0,4,1,-1,-1,-1,-1,14,0,3,1,-1,-1,-9,-9\n1997,CO,4,9744,822,-9,-9,-8,-8,9744,822,1759,127,8978,584,3030,290,3550,181,249,19,77,2,-9,-9,-1,-1,-1,-1,-9,-9,178,54,12512,949,8784,714,178,54,12512,949,3931,437,-1,-1,4791,519,-2,-2,-2,-2,-2,-2,-9,9046,7643,-1,-1,-1,-1,1,0,25,0,0,0,5,0,0,0,-1,-1,-1,-1,3,0,0,0,-1,-1,-9,-9\n1997,CT,1,10195,570,1464,217,2840,272,14499,1059,-9,-9,4138,492,7456,603,4169,302,25,1,52,3,-9,-9,-1,-1,-1,-1,-9,-9,4169,302,15840,1401,11671,1099,0,0,15840,1401,813,73,-1,-1,1384,207,-2,-2,-2,-2,-2,-2,-9,-9,-9,-1,-1,-1,-1,0,0,15,2,12,1,2,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1997,DE,3,3102,159,1053,128,894,96,5049,383,-9,-9,1806,136,3237,244,199,13,0,1,5,1,-9,-9,-1,-1,-1,-1,-9,-9,4,1,5052,383,4767,364,86,6,5052,383,951,112,-1,-1,1447,170,-2,-2,-2,-2,-2,-2,-9,4206,3192,-1,-1,-1,-1,0,0,11,1,0,0,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1997,DC,3,6197,312,193,28,261,57,6651,397,-9,-9,76,15,8704,392,4,0,0,0,0,0,-9,-9,-1,-1,-1,-1,-9,-9,166,0,8946,407,8776,407,166,0,8946,407,3097,332,-1,-1,6826,556,-2,-2,-2,-2,-2,-2,7251,9729,9419,-1,-1,-1,-1,-8,-8,21,-9,-9,-9,1,-9,0,-9,-1,-1,-1,-1,3,0,-9,-9,-1,-1,-9,-9\n1997,FL,3,61162,3412,45,7,-8,-8,61207,3419,-9,-9,25968,1477,33958,1813,5354,188,39,9,3,0,-9,-9,-1,-1,-1,-1,-9,-9,1239,120,61207,3419,55802,3216,51,15,61207,3419,19789,1791,-1,-1,22952,1908,-2,-2,-2,-2,-2,-2,77425,71276,52865,-1,-1,-1,-1,1,0,117,4,104,4,4,0,2,3,-1,-1,-1,-1,3,0,0,0,-1,-1,-9,-9\n1997,GA,3,33586,2201,637,81,-8,-8,34223,2282,-9,-9,11103,880,22996,1396,290,10,53,4,37,2,-9,-9,-1,-1,-1,-1,-9,-9,34,0,34223,2282,0,0,33933,2272,34223,2282,10506,1211,-1,-1,12594,1413,-2,-2,-2,-2,-2,-2,36610,-9,-9,-1,-1,-1,-1,0,0,59,2,38,3,6,0,1,0,-1,-1,-1,-1,0,0,5,0,-1,-1,-9,-9\n1997,HI,4,2360,232,152,20,1173,141,3685,393,-9,-9,890,144,208,24,221,17,32,6,710,44,1812,229,-1,-1,-1,-1,-9,-9,808,71,4460,518,4132,493,107,8,4460,518,1478,257,-1,-1,2016,329,-2,-2,-2,-2,-2,-2,-9,2912,1991,-1,-1,-1,-1,-8,-8,4,0,1,0,3,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1997,ID,4,3082,230,-8,-8,-8,-8,3082,230,31,0,2927,238,59,6,476,37,150,12,18,0,-9,-9,-1,-1,-1,-1,-9,-9,494,7,3648,263,2561,155,611,71,3648,263,1540,247,-1,-1,1933,313,-2,-2,-2,-2,-2,-2,2483,3437,2483,-1,-1,-1,-1,0,0,7,0,2,0,0,1,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1997,IL,2,38358,2430,-9,-9,0,0,38358,2430,-9,-9,9412,583,24841,1681,4001,148,43,13,59,5,-9,-9,-1,-1,-1,-1,-9,-9,4003,148,38358,2430,34355,2282,2,0,38358,2430,17495,2000,-1,-1,22447,2300,-2,-2,-2,-2,-2,-2,28797,28797,25135,-1,-1,-1,-1,2,0,66,1,14,2,10,1,2,1,-1,-1,-1,-1,2,0,0,0,-1,-1,-9,-9\n1997,IN,2,15311,1027,153,12,6,2,15470,1041,1293,30,9509,623,7262,445,394,19,42,3,19,0,0,0,-1,-1,-1,-1,-9,-9,0,0,16832,1071,16438,1052,0,0,16832,1071,8163,826,-1,-1,8107,828,-2,-2,-2,-2,-2,-2,13611,16892,-9,-1,-1,-1,-1,1,0,40,1,1,0,2,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1997,IA,2,6410,528,-8,-8,-8,-8,6410,528,-9,-9,4428,372,1569,127,275,8,91,19,45,1,-9,-9,-1,-1,-1,-1,-9,-9,277,9,6410,528,6133,519,2,1,6410,528,2538,332,-1,-1,3351,494,-2,-2,-2,-2,-2,-2,4951,4951,4951,-1,-1,-1,-1,-8,-8,9,0,0,0,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1997,KS,2,7435,479,-8,-8,-8,-8,7435,479,-9,-9,4339,269,2830,198,507,18,141,8,66,0,-9,-9,-1,-1,-1,-1,-9,-9,59,1,7435,476,6869,457,59,1,7435,476,2433,345,-1,-1,3562,456,-2,-2,-2,-2,-2,-2,8168,-9,-9,-1,-1,-1,-1,0,0,21,0,1,0,2,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1997,KY,3,10209,666,-8,-8,-8,-8,10209,666,1076,68,8334,642,5176,410,62,2,6,0,7,0,-9,-9,-1,-1,-1,-1,-9,-9,25,0,13548,1052,13486,1050,0,0,13548,1052,5297,707,-1,-1,5861,683,-2,-2,-2,-2,-2,-2,10774,10827,8934,-1,-1,-1,-1,1,0,26,1,0,0,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1997,LA,3,17529,941,-8,-8,-8,-8,17529,941,-9,-9,6262,590,21085,1275,-9,-9,7,0,0,0,-9,-9,-1,-1,-1,-1,-9,-9,43,3,27397,1868,-9,-9,27397,1868,27397,1868,5830,581,-1,-1,11986,1237,-2,-2,-2,-2,-2,-2,18470,18467,-9,-1,-1,-1,-1,1,0,57,1,17,0,1,0,2,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1997,ME,1,1486,51,60,4,-8,-8,1546,55,-9,-9,1412,57,56,2,0,0,13,1,0,0,-9,-9,-1,-1,-1,-1,-9,-9,77,2,1558,62,1486,60,72,2,1558,62,606,24,-1,-1,634,25,-2,-2,-2,-2,-2,-2,1437,1590,1437,-1,-1,-1,-1,-8,-8,1,0,0,0,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1997,MD,3,19760,983,1009,118,-8,-8,20769,1101,-9,-9,4665,333,16423,773,-9,-9,2,1,7,1,-9,-9,-1,-1,-1,-1,-9,-9,27,0,21124,1108,-9,-9,21124,1108,21124,1108,6541,722,-1,-1,9416,881,-2,-2,-2,-2,-2,-2,-9,22921,-9,-1,-1,-1,-1,1,0,24,0,12,0,8,0,0,0,-1,-1,-1,-1,4,0,5,0,-1,-1,-9,-9\n1997,MA,1,9519,423,114,178,575,109,10208,710,466,18,5187,403,3290,158,2467,167,34,1,114,4,0,0,-1,-1,-1,-1,-9,-9,2589,167,11214,733,8552,564,195,2,11214,733,1994,238,-1,-1,3151,317,-2,-2,-2,-2,-2,-2,-9,-9,8138,-1,-1,-1,-1,-8,-8,18,0,2,0,4,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1997,MI,2,42715,2056,-8,-8,-8,-8,42715,2056,151,-9,17645,837,23763,1173,925,28,212,11,55,2,-9,-9,-1,-1,-1,-1,-9,-9,1040,33,42715,2056,41788,2028,2,0,42715,2056,7603,627,-1,-1,10606,932,-2,-2,-2,-2,-2,-2,-9,45146,-9,-1,-1,-1,-1,-8,-8,67,1,15,3,5,0,2,0,-1,-1,-1,-1,3,0,3,0,-1,-1,-9,-9\n1997,MN,2,5056,251,-8,-8,18,2,5074,253,50,0,2435,124,1858,106,320,10,366,17,-9,-9,-9,-9,-1,-1,-1,-1,-9,-9,409,11,5068,258,4748,248,0,0,5068,258,2308,232,-1,-1,3172,277,-2,-2,-2,-2,-2,-2,5327,5327,5327,-1,-1,-1,-1,-8,-8,4,0,1,0,0,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1997,MS,3,9181,829,273,64,0,0,9454,893,3882,69,3320,240,9946,717,53,1,13,1,13,1,-9,-9,-1,-1,-1,-1,-9,-9,42,3,13334,962,13279,961,2,0,13334,962,4664,540,-1,-1,4653,498,-2,-2,-2,-2,-2,-2,-9,14428,15187,-1,-1,-1,-1,0,0,38,2,4,0,3,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1997,MO,2,21991,1643,15,3,0,0,22006,1646,55,0,11981,936,10225,743,278,18,71,10,26,4,-9,-9,-1,-1,-1,-1,-9,-9,2,0,22305,1693,22003,1670,24,5,22305,1693,7252,989,-1,-1,10228,1261,-2,-2,-2,-2,-2,-2,-9,22317,-9,-1,-1,-1,-1,6,0,32,2,6,0,1,0,1,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1997,MT,4,1776,86,-9,-9,-8,-8,1776,86,193,20,1935,123,33,2,47,1,335,41,0,0,0,0,-1,-1,-1,-1,-9,-9,47,1,2350,167,2303,166,0,0,2350,167,707,119,-1,-1,840,76,-2,-2,-2,-2,-2,-2,-9,1400,896,-1,-1,-1,-1,0,0,4,0,0,0,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1997,NE,2,3046,207,58,15,22,0,3126,222,-9,-9,2105,132,932,76,184,13,124,11,16,2,-9,-9,-1,-1,-1,-1,-9,-9,3,1,3180,222,2996,209,0,0,3180,222,1191,131,-1,-1,1361,180,-2,-2,-2,-2,-2,-2,-9,2517,2013,-1,-1,-1,-1,1,0,8,0,0,0,0,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1997,NV,4,7916,625,76,6,0,0,7992,631,-9,-9,4620,429,2208,199,1224,44,141,18,110,3,-9,-9,-1,-1,-1,-1,-9,-9,1250,46,8329,695,7102,651,3,0,8329,695,2913,382,-1,-1,3453,381,-2,-2,-2,-2,-2,-2,8851,-9,6557,-1,-1,-1,-1,0,0,17,1,2,1,4,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1997,NH,1,1969,110,4,15,0,6,1973,131,66,0,1916,103,117,3,92,6,0,1,21,0,0,0,-1,-1,-1,-1,-9,-9,1,2,2055,109,1409,88,554,15,2055,109,620,57,-1,-1,875,71,-2,-2,-2,-2,-2,-2,1841,1644,1744,-1,-1,-1,-1,0,0,1,0,0,0,3,0,1,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1997,NJ,1,24211,1286,-9,-9,-8,-8,24211,1286,2746,118,6881,435,17653,919,4844,185,5,0,73,2,-9,-9,-1,-1,-1,-1,-9,-9,2345,48,26957,1404,22113,1219,0,0,26957,1404,9262,885,-1,-1,14048,1293,-2,-2,-2,-2,-2,-2,-9,-9,15906,-1,-1,-1,-1,0,0,39,4,40,1,1,0,4,0,-1,-1,-1,-1,5,0,6,1,-1,-1,-9,-9\n1997,NM,4,3055,318,210,56,0,0,3265,374,557,0,3595,297,488,57,2465,175,218,20,13,0,-9,-9,-1,-1,-1,-1,-9,-9,0,0,4314,374,1849,199,0,0,4314,374,1587,252,-1,-1,2737,352,-2,-2,-2,-2,-2,-2,-9,4435,-9,-1,-1,-1,-1,0,0,-9,-9,0,0,-9,-9,-9,-9,-1,-1,-1,-1,-9,0,7,0,-1,-1,-9,-9\n1997,NY,1,65539,3569,244,31,0,0,65783,3600,903,15,28274,1381,35394,2094,21307,1114,199,5,386,5,-9,-9,-1,-1,-1,-1,-9,-9,1286,84,65539,3569,44014,2429,218,26,65539,3569,19129,1675,-1,-1,28081,2388,-2,-2,-2,-2,-2,-2,60947,65823,53463,-1,-1,-1,-1,0,0,132,8,58,2,14,0,3,0,-1,-1,-1,-1,4,0,0,0,-1,-1,-9,-9\n1997,NC,3,25725,1273,3240,472,247,33,29212,1778,280,0,9318,726,19346,1072,-9,-9,626,40,40,3,-9,-9,-1,-1,-1,-1,-9,-9,422,19,29752,1860,-9,-9,29752,1860,29752,1860,8284,794,-1,-1,11314,1186,-2,-2,-2,-2,-2,-2,26887,-9,26887,-1,-1,-1,-1,0,0,40,6,8,0,2,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1997,ND,2,682,59,75,7,-8,-8,757,66,73,6,567,44,19,1,37,3,143,16,6,1,-9,-9,-1,-1,-1,-1,-9,-9,0,0,735,62,698,59,0,0,735,62,427,48,-1,-1,486,40,-2,-2,-2,-2,-2,-2,579,579,579,-1,-1,-1,-1,-8,-8,1,0,0,0,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1997,OH,2,44997,2811,-9,-9,-8,-8,44997,2811,-9,-9,20599,1247,24344,1594,816,48,48,0,47,1,-9,-9,-1,-1,-1,-1,-9,-9,136,0,45174,2842,44222,2794,136,0,45174,2842,14154,1996,-1,-1,16143,2166,-2,-2,-2,-2,-2,-2,34706,-9,-9,-1,-1,-1,-1,0,0,93,2,6,0,9,1,2,0,-1,-1,-1,-1,4,0,0,0,-1,-1,-9,-9\n1997,OK,3,13578,1315,-9,-9,-8,-8,13578,1315,693,109,10102,1086,6310,787,726,36,1277,141,30,3,-9,-9,-1,-1,-1,-1,-9,-9,770,36,18489,2053,17763,2017,0,0,18489,2053,6164,1047,-1,-1,5655,1000,-2,-2,-2,-2,-2,-2,11439,15414,-9,-1,-1,-1,-1,1,0,55,3,3,0,2,0,1,0,-1,-1,-1,-1,3,0,0,0,-1,-1,-9,-9\n1997,OR,4,6731,359,611,73,-8,-8,7342,432,9,0,5495,344,940,70,860,7,155,26,98,3,-9,-9,-1,-1,-1,-1,-9,-9,861,7,7549,450,6688,443,1,0,7549,450,1909,188,-1,-1,2761,230,-2,-2,-2,-2,-2,-2,-9,7548,-9,-1,-1,-1,-1,1,0,16,0,0,0,2,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1997,PA,1,33506,1416,5,1,1,0,33512,1417,0,25,11063,569,19108,739,3184,107,67,4,101,1,-9,-9,-1,-1,-1,-1,-9,-9,3201,111,33540,1424,30339,1313,17,4,33540,1424,5547,428,-1,-1,8526,635,-2,-2,-2,-2,-2,-2,-9,22875,23156,-1,-1,-1,-1,0,0,67,4,18,1,8,0,3,0,-1,-1,-1,-1,4,0,4,0,-1,-1,-9,-9\n1997,RI,1,2011,72,499,65,603,60,3113,197,-9,-9,2002,155,1119,56,485,19,5,0,32,2,0,0,-1,-1,-1,-1,-9,-9,0,0,3158,213,2673,194,0,0,3158,213,671,32,-1,-1,861,54,-2,-2,-2,-2,-2,-2,3774,3774,3774,-1,-1,-1,-1,-8,-8,4,0,1,0,0,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1997,SC,3,18589,1117,769,138,-8,-8,19358,1255,371,29,5858,424,13893,869,116,3,17,1,3,0,-9,-9,-1,-1,-1,-1,-9,-9,100,8,19871,1302,19700,979,55,320,19871,1302,5269,548,-1,-1,7076,628,-2,-2,-2,-2,-2,-2,-9,22474,21731,-1,-1,-1,-1,2,0,32,1,18,1,1,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1997,SD,2,2070,169,-9,-9,-8,-8,2070,169,-9,-9,1599,106,93,6,-9,-9,381,57,-9,-9,-9,-9,-1,-1,-1,-1,-9,-9,0,0,2073,169,-9,-9,2073,169,2073,169,831,119,-1,-1,871,112,-2,-2,-2,-2,-2,-2,-9,-9,2329,-1,-1,-1,-1,0,0,4,0,0,0,1,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1997,TN,3,14490,605,-8,-8,-8,-8,14490,605,1242,186,7639,475,8121,316,70,5,15,2,16,0,-9,-9,-1,-1,-1,-1,-9,-9,70,5,15861,798,15791,793,0,0,15861,798,4493,508,-1,-1,7523,756,-2,-2,-2,-2,-2,-2,16150,15808,-9,-1,-1,-1,-1,0,0,49,2,13,0,3,1,0,0,-1,-1,-1,-1,2,0,0,0,-1,-1,-9,-9\n1997,TX,3,126539,9026,3512,1274,-8,-8,130051,10300,-9,-9,35504,3193,58393,5490,35567,1570,-9,-9,-9,-9,-9,-9,-1,-1,-1,-1,-9,-9,36154,1617,130051,10300,94484,8730,0,0,130051,10300,22401,3007,-1,-1,31360,5089,-2,-2,-2,-2,-2,-2,143928,143928,146779,-1,-1,-1,-1,37,0,201,13,51,5,16,1,3,0,-1,-1,-1,-1,9,0,5,0,-1,-1,-9,-9\n1997,UT,4,4521,254,23,4,54,5,4598,263,282,67,3519,190,318,10,800,36,131,4,93,6,-9,-9,-1,-1,-1,-1,-9,-9,27,3,4088,213,3261,174,27,3,4088,213,1240,145,-1,-1,2269,262,-2,-2,-2,-2,-2,-2,4495,4261,-9,-1,-1,-1,-1,0,0,3,0,0,0,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1997,VT,1,794,34,264,8,159,11,1217,53,-9,-9,1146,47,35,1,22,0,8,0,5,0,-9,-9,-1,-1,-1,-1,-9,-9,23,5,1217,53,1177,48,18,5,1217,53,200,10,-1,-1,977,53,-2,-2,-2,-2,-2,-2,1140,1140,1023,-1,-1,-1,-1,-8,-8,1,0,0,0,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1997,VA,3,23114,1188,296,34,-8,-8,23410,1222,3265,488,8627,594,17859,1111,89,2,4,1,85,2,-9,-9,-1,-1,-1,-1,-9,-9,100,2,26675,1710,0,0,26586,1708,26675,1710,8471,980,-1,-1,9314,1152,-2,-2,-2,-2,-2,-2,16111,16111,16111,-1,-1,-1,-1,9,0,52,1,14,0,3,1,0,0,-1,-1,-1,-1,1,0,11,0,-1,-1,-9,-9\n1997,WA,4,12254,919,18,2,31,2,12303,923,-9,-9,8757,619,2742,220,1775,83,382,45,306,14,-9,-9,-1,-1,-1,-1,-9,-9,103,26,12290,924,10382,804,133,37,12290,924,5174,630,-1,-1,5307,767,-2,-2,-2,-2,-2,-2,7963,10971,10971,-1,-1,-1,-1,0,0,21,1,1,0,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1997,WV,3,2264,121,-8,-8,10,2,2274,123,708,67,2487,156,472,30,3,0,2,0,1,0,0,0,-1,-1,-1,-1,-9,-9,0,0,2962,186,2959,186,0,0,2962,186,801,72,-1,-1,605,49,-2,-2,-2,-2,-2,-2,2378,2404,2370,-1,-1,-1,-1,-8,-8,9,0,0,0,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1997,WI,2,12682,734,21,2,257,4,12960,740,276,18,7458,452,7292,496,928,46,355,26,68,3,-9,-9,-1,-1,-1,-1,-9,-9,117,10,15290,987,14140,927,222,14,15290,987,4066,404,-1,-1,4693,448,-2,-2,-2,-2,-2,-2,10288,10288,10288,-1,-1,-1,-1,-8,-8,15,0,1,0,2,0,0,0,-1,-1,-1,-1,0,0,4,0,-1,-1,-9,-9\n1997,WY,4,1287,131,0,0,0,0,1287,131,29,0,1077,113,74,8,169,13,88,2,5,0,-9,-9,-1,-1,-1,-1,-9,-9,169,13,1413,136,1244,123,0,0,1413,136,390,90,-1,-1,553,69,-2,-2,-2,-2,-2,-2,1231,1243,1047,-1,-1,-1,-1,0,0,2,0,0,0,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1997,ST,7,980830,61739,16932,3288,10525,1495,1008287,66522,23971,1552,410287,29687,512756,33912,157918,7645,9653,903,4295,158,1889,232,-1,-1,-1,-1,0,0,118219,5998,1057099,70890,751453,53255,147728,9990,1057099,70890,300239,34286,-1,-1,451902,49249,-2,-2,-2,-2,-2,-2,599787,702818,623823,-1,-1,-1,-1,74,0,1781,78,511,27,153,6,32,5,-1,-1,-1,-1,75,0,125,5,-1,-1,0,0\n1997,US,5,1062492,67615,19634,3793,20852,2178,1102978,73586,23971,1552,470946,34567,553370,37084,188827,9846,11367,1006,5975,309,1889,232,-1,-1,-1,-1,0,0,118219,5998,1161766,79196,825211,59360,147728,9990,1161766,79196,327933,37152,-1,-1,477042,51806,-2,-2,-2,-2,-2,-2,685174,702818,623823,-1,-1,-1,-1,74,0,1781,78,511,27,153,6,32,5,-1,-1,-1,-1,75,0,354,14,-1,-1,0,0\n1997,FE,6,81662,5876,2702,505,10327,683,94691,7064,-9,-9,60659,4880,40614,3172,30909,2201,1714,103,1680,151,-9,-9,-1,-1,-1,-1,-9,-9,0,0,104667,8306,73758,6105,0,0,104667,8306,27694,2866,-1,-1,25140,2557,-2,-2,-2,-2,-2,-2,85387,-9,-9,-1,-1,-1,-1,0,0,-9,-9,-9,-9,-9,-9,-9,-9,-1,-1,-1,-1,-9,0,229,9,-1,-1,-9,-9\n1998,AL,3,20461,1377,367,62,0,0,20828,1439,-9,-9,7062,631,14080,825,5,0,3,0,1,0,-9,-9,-1,-1,-1,-1,-9,-9,69,5,21215,1461,21210,1461,0,0,21215,1461,6014,650,-1,-1,6591,689,-2,-2,-2,-2,-2,-2,21800,21800,21800,-1,-1,48,1,1,0,-9,-9,-9,-9,-9,-9,-9,0,-1,-1,-1,-1,-9,0,73,2,-1,-1,-9,-9\n1998,AK,4,1264,105,279,23,847,83,2390,211,-9,-9,1732,146,509,47,123,9,1363,96,68,4,-9,-9,-1,-1,-1,-1,-9,-9,123,9,3795,302,3672,293,0,0,3795,302,1380,232,-1,-1,2336,341,-2,-2,-2,-2,-2,-2,2603,2691,2603,-1,-1,26,2,-8,-8,3,1,0,0,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1998,AZ,4,21979,1521,1739,276,0,0,23718,1797,-9,-9,18752,1389,3444,295,7991,413,1018,81,53,8,-9,-9,-1,-1,-1,-1,-9,-9,264,7,23531,1780,15540,1367,0,0,23531,1780,7014,695,-1,-1,7805,768,-2,-2,-2,-2,-2,-2,-9,23036,23036,-1,-1,2730,34,4,0,46,4,0,0,5,0,0,0,-1,-1,-1,-1,1,0,2,0,-1,-1,-9,-9\n1998,AR,3,9332,640,66,4,0,0,9398,644,-9,-9,4452,416,5421,278,76,1,7,2,9,0,0,0,-1,-1,-1,-1,-9,-9,53,0,9942,696,9866,695,0,0,9942,696,3333,399,-1,-1,5070,509,-2,-2,-2,-2,-2,-2,10208,10208,10208,-1,-1,-9,-9,1,0,30,0,0,0,3,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1998,CA,4,145997,10863,-9,-9,2081,622,148078,11485,-9,-9,43229,4366,46235,3817,52358,2730,1157,162,1182,46,202,14,-1,-1,-1,-1,-9,-9,56595,3122,148600,11527,92005,8405,4237,392,148600,11527,41191,5338,-1,-1,117144,12656,-2,-2,-2,-2,-2,-2,-9,-9,79875,-1,-1,18449,497,1,0,198,10,25,4,21,0,7,0,-1,-1,-1,-1,15,0,3,0,-1,-1,-9,-9\n1998,CO,4,10597,981,-9,-9,-8,-8,10597,981,-9,-9,9770,722,3059,317,3770,212,263,23,90,4,-9,-9,-1,-1,-1,-1,-9,-9,60,4,13242,1070,9412,854,60,4,13242,1070,4109,476,-1,-1,5447,583,-2,-2,-2,-2,-2,-2,-9,9842,8037,-1,-1,696,14,0,0,17,1,0,0,5,0,0,0,-1,-1,-1,-1,3,0,0,0,-1,-1,-9,-9\n1998,CT,1,10559,570,1561,234,2869,311,14989,1115,-9,-9,4245,446,7675,615,4255,285,18,2,54,9,-9,-9,-1,-1,-1,-1,-9,-9,4256,285,16248,1357,11992,1072,1,0,16248,1357,874,73,-1,-1,1430,230,-2,-2,-2,-2,-2,-2,-9,-9,-9,-1,-1,611,30,0,0,16,0,12,2,0,1,0,0,-1,-1,-1,-1,0,0,1,1,-1,-1,-9,-9\n1998,DE,3,3012,195,1023,146,1079,99,5114,440,-9,-9,1850,178,3260,261,209,17,2,0,3,1,-9,-9,-1,-1,-1,-1,-9,-9,3,0,5118,440,4827,416,82,7,5118,440,950,168,-1,-1,1746,195,-2,-2,-2,-2,-2,-2,-9,4206,3192,-1,-1,88,8,0,0,8,0,0,0,1,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1998,DC,3,6390,226,103,26,228,35,6721,287,-9,-9,81,12,9229,345,3,0,0,0,0,0,-9,-9,-1,-1,-1,-1,-9,-9,160,2,9470,359,9307,357,160,2,9470,359,2961,138,-1,-1,8991,443,-2,-2,-2,-2,-2,-2,7973,7289,-9,-1,-1,-9,-9,-8,-8,15,-9,-9,-9,2,-9,0,0,-1,-1,-1,-1,3,0,-9,-9,-1,-1,-9,-9\n1998,FL,3,63672,3521,26,5,-8,-8,63698,3526,-9,-9,27117,1515,35265,1878,5700,184,6,12,8,0,-9,-9,-1,-1,-1,-1,-9,-9,1302,121,63698,3526,57414,3299,584,43,63698,3526,20164,1773,-1,-1,21047,1858,-2,-2,-2,-2,-2,-2,77370,70785,52407,-1,-1,3606,145,3,1,122,8,58,3,4,2,1,0,-1,-1,-1,-1,5,0,0,0,-1,-1,-9,-9\n1998,GA,3,36349,2409,439,65,-8,-8,36788,2474,-9,-9,12109,946,24508,1514,315,21,71,6,44,3,-9,-9,-1,-1,-1,-1,-9,-9,56,5,36788,2474,0,0,36473,2453,36788,2474,10100,1229,-1,-1,11238,1369,-2,-2,-2,-2,-2,-2,-9,39320,-9,-1,-1,426,20,1,0,68,2,15,0,3,2,2,0,-1,-1,-1,-1,1,0,4,0,-1,-1,-9,-9\n1998,HI,4,2040,286,166,16,991,70,3197,372,-9,-9,934,105,204,16,136,6,52,2,722,50,1901,191,-1,-1,-1,-1,-9,-9,681,66,4494,430,4271,417,87,7,4494,430,1657,346,-1,-1,2648,611,-2,-2,-2,-2,-2,-2,-9,3122,2197,-1,-1,133,6,-8,-8,7,1,1,0,1,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1998,ID,4,3178,281,-8,-8,-8,-8,3178,281,-9,-9,3039,288,53,4,467,45,124,25,23,0,-9,-9,-1,-1,-1,-1,-9,-9,523,4,3762,321,2641,190,654,86,3762,321,1211,120,-1,-1,2145,341,-2,-2,-2,-2,-2,-2,3167,3991,3167,-1,-1,188,2,0,0,8,0,1,0,0,1,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1998,IL,2,40405,2646,-9,-9,0,0,40405,2646,-9,-9,9735,636,26374,1846,4170,146,58,14,67,4,-9,-9,-1,-1,-1,-1,-9,-9,4171,146,40405,2646,36234,2500,1,0,40405,2646,17559,2096,-1,-1,22680,2419,-2,-2,-2,-2,-2,-2,32062,32062,27342,-1,-1,473,-9,1,0,59,4,14,0,12,0,3,0,-1,-1,-1,-1,4,0,2,0,-1,-1,-9,-9\n1998,IN,2,16288,1136,159,13,8,1,16455,1150,-9,-9,10302,714,7629,480,441,19,44,4,24,0,0,0,-1,-1,-1,-1,-9,-9,0,0,17999,1198,17558,1179,0,0,17999,1198,8543,952,-1,-1,8360,920,-2,-2,-2,-2,-2,-2,13983,17119,-9,-1,-1,97,0,1,0,45,0,-9,0,-9,0,-9,0,-1,-1,-1,-1,-9,0,-9,0,-1,-1,-9,-9\n1998,IA,2,6903,491,-8,-8,-8,-8,6903,491,-9,-9,4753,364,1671,99,302,8,108,17,59,0,-9,-9,-1,-1,-1,-1,-9,-9,312,11,6903,491,6590,480,11,3,6903,491,2942,370,-1,-1,3717,625,-2,-2,-2,-2,-2,-2,5701,5701,5701,-1,-1,-9,-9,-8,-8,6,0,0,0,1,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1998,KS,2,7655,525,-8,-8,-8,-8,7655,525,-9,-9,4539,314,2851,199,561,25,146,8,68,0,-9,-9,-1,-1,-1,-1,-9,-9,56,2,7660,523,7043,496,56,2,7660,523,2514,372,-1,-1,3793,452,-2,-2,-2,-2,-2,-2,8189,-9,-9,-1,-1,137,6,0,0,19,0,0,0,1,0,1,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1998,KY,3,10544,670,-8,-8,-8,-8,10544,670,-9,-9,8736,637,5166,408,85,4,7,0,7,0,-9,-9,-1,-1,-1,-1,-9,-9,25,1,13941,1046,13856,1042,0,0,13941,1046,5445,726,-1,-1,6727,875,-2,-2,-2,-2,-2,-2,11428,11180,7421,-1,-1,42,0,0,0,29,1,0,0,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1998,LA,3,18035,940,-8,-8,-8,-8,18035,940,-9,-9,6854,705,23149,1472,-9,-9,6,0,1,0,-9,-9,-1,-1,-1,-1,-9,-9,38,3,30048,2180,-9,-9,30048,2180,30048,2180,6666,701,-1,-1,12688,1428,-2,-2,-2,-2,-2,-2,19016,18975,-9,-1,-1,241,19,0,0,-9,-9,-9,-9,-9,-9,-9,0,-1,-1,-1,-1,-9,0,77,3,-1,-1,-9,-9\n1998,ME,1,1519,60,43,7,-8,-8,1562,67,-9,-9,1433,92,56,1,4,0,12,1,5,1,-9,-9,-1,-1,-1,-1,-9,-9,172,8,1678,103,1510,95,164,8,1678,103,431,18,-1,-1,581,25,-2,-2,-2,-2,-2,-2,1460,1629,1460,-1,-1,8,1,-8,-8,1,0,0,0,1,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1998,MD,3,20202,1012,907,111,-8,-8,21109,1123,-9,-9,4706,333,16690,805,-9,-9,4,1,7,1,-9,-9,-1,-1,-1,-1,-9,-9,25,0,21432,1140,-9,-9,-9,-9,21432,1140,6882,670,-1,-1,9722,904,-2,-2,-2,-2,-2,-2,-9,22688,-9,-1,-1,446,20,1,0,23,2,11,0,1,1,2,0,-1,-1,-1,-1,0,0,5,0,-1,-1,-9,-9\n1998,MA,1,9632,405,116,195,516,118,10264,718,-9,-9,4930,395,3223,161,2545,185,30,2,135,4,0,0,-1,-1,-1,-1,-9,-9,2735,184,11053,746,8318,561,190,0,11053,746,1920,234,-1,-1,3025,305,-2,-2,-2,-2,-2,-2,-9,-9,9162,-1,-1,-9,-9,-8,-8,20,0,3,0,1,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1998,MI,2,43827,2052,-8,-8,-8,-8,43827,2052,-9,-9,18226,841,24186,1150,1024,40,222,13,62,2,-9,-9,-1,-1,-1,-1,-9,-9,1131,46,43827,2052,42801,2012,2,0,43827,2052,7401,623,-1,-1,12231,1096,-2,-2,-2,-2,-2,-2,-9,44804,-9,-1,-1,451,11,-8,-8,78,2,3,0,7,0,5,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1998,MN,2,5192,273,-8,-8,12,3,5204,276,-9,-9,2481,138,1981,107,374,11,349,27,-9,-9,-9,-9,-1,-1,-1,-1,-9,-9,473,16,5284,288,4908,275,2,2,5284,288,2730,271,-1,-1,3741,315,-2,-2,-2,-2,-2,-2,5567,5724,5724,-1,-1,-9,-9,-8,-8,6,0,1,0,1,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1998,MS,3,8787,860,241,55,0,0,9028,915,-9,-9,3740,410,11643,799,57,0,15,3,10,1,-9,-9,-1,-1,-1,-1,-9,-9,57,0,15465,1213,15408,1213,0,0,15465,1213,4823,478,-1,-1,4043,448,-2,-2,-2,-2,-2,-2,-9,13916,14649,-1,-1,-9,-9,0,0,41,3,2,0,2,0,1,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1998,MO,2,23147,1892,22,1,2,0,23171,1893,-9,-9,12543,1074,10450,793,301,20,71,8,26,4,-9,-9,-1,-1,-1,-1,-9,-9,4,1,23094,1880,22739,1736,54,124,23094,1880,6807,1015,-1,-1,10934,1440,-2,-2,-2,-2,-2,-2,-9,26302,-9,-1,-1,289,18,3,0,29,2,0,0,5,2,1,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1998,MT,4,2131,209,-9,-9,-8,-8,2131,209,-9,-9,1941,167,48,1,58,9,434,69,0,1,0,0,-1,-1,-1,-1,-9,-9,63,10,2486,248,2423,238,5,1,2486,248,577,61,-1,-1,996,100,-2,-2,-2,-2,-2,-2,-9,1748,1244,-1,-1,11,0,1,0,5,0,0,0,1,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1998,NE,2,3275,228,68,19,21,1,3364,248,-9,-9,2366,154,908,71,377,13,134,21,18,2,-9,-9,-1,-1,-1,-1,-9,-9,1,1,3427,249,3049,236,1,0,3427,249,1309,153,-1,-1,1373,159,-2,-2,-2,-2,-2,-2,-9,2963,2371,-1,-1,148,5,0,0,5,0,0,0,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1998,NV,4,8265,682,267,3,20,2,8552,687,-9,-9,4861,463,2435,222,1320,35,156,18,112,4,-9,-9,-1,-1,-1,-1,-9,-9,1344,36,8908,743,7586,708,2,0,8908,743,3177,440,-1,-1,3675,471,-2,-2,-2,-2,-2,-2,9251,-9,6820,-1,-1,587,15,1,0,18,1,1,0,2,0,1,0,-1,-1,-1,-1,3,0,0,0,-1,-1,-9,-9\n1998,NH,1,1973,122,7,27,0,11,1980,160,-9,-9,1925,106,108,7,91,4,0,2,18,0,-9,-9,-1,-1,-1,-1,-9,-9,2,1,2053,116,1491,103,471,9,2053,116,580,49,-1,-1,936,63,-2,-2,-2,-2,-2,-2,1841,1864,1744,-1,-1,37,5,0,0,5,0,1,0,1,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1998,NJ,1,25905,1405,-9,-9,-8,-8,25905,1405,-9,-9,7394,486,19205,1118,5360,181,4,0,95,3,-9,-9,-1,-1,-1,-1,-9,-9,2770,46,29468,1653,24108,1472,0,0,29468,1653,9084,854,-1,-1,12839,1202,-2,-2,-2,-2,-2,-2,-9,-9,17282,-1,-1,-9,-9,0,0,34,2,15,1,2,0,1,0,-1,-1,-1,-1,1,0,13,0,-1,-1,-9,-9\n1998,NM,4,3009,279,125,27,0,0,3134,306,-9,-9,3900,240,506,54,2606,151,253,21,11,0,-9,-9,-1,-1,-1,-1,-9,-9,0,0,4670,315,2064,164,0,0,4670,315,1530,101,-1,-1,2035,229,-2,-2,-2,-2,-2,-2,-9,3447,-9,-1,-1,297,2,0,0,-9,-9,-9,-9,-9,-9,-9,0,-1,-1,-1,-1,-9,0,2,0,-1,-1,-9,-9\n1998,NY,1,66499,3502,310,39,0,0,66809,3541,-9,-9,29527,1279,36079,2205,21452,1014,267,3,376,6,-9,-9,-1,-1,-1,-1,-9,-9,250,9,66499,3502,44800,2476,247,12,66499,3502,17962,1535,-1,-1,25742,2236,-2,-2,-2,-2,-2,-2,60879,65717,53409,-1,-1,8234,243,0,0,147,11,39,0,13,1,1,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1998,NC,3,24645,1255,3939,560,249,34,28833,1849,-9,-9,9605,814,19290,1065,-9,-9,561,39,44,3,-9,-9,-1,-1,-1,-1,-9,-9,523,17,30023,1938,-9,-9,30023,1938,30023,1938,8846,736,-1,-1,10804,922,-2,-2,-2,-2,-2,-2,27866,-9,27866,-1,-1,182,2,3,0,35,2,6,0,2,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1998,ND,2,794,66,77,4,-8,-8,871,70,-9,-9,649,54,30,1,52,1,158,14,9,0,-9,-9,-1,-1,-1,-1,-9,-9,0,0,846,69,794,68,0,0,846,69,546,67,-1,-1,581,65,-2,-2,-2,-2,-2,-2,1005,952,1005,-1,-1,8,1,-8,-8,1,0,0,0,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1998,OH,2,45285,2886,-9,-9,-8,-8,45285,2886,-9,-9,21109,1325,24216,1582,950,46,90,3,51,2,-9,-9,-1,-1,-1,-1,-9,-9,72,0,45538,2912,44516,2866,72,0,45538,2912,15495,2157,-1,-1,17896,2307,-2,-2,-2,-2,-2,-2,37245,-9,-9,-1,-1,233,15,0,0,117,7,7,0,7,0,2,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1998,OK,3,13558,1207,-9,-9,-8,-8,13558,1207,-9,-9,10273,1124,6338,781,775,41,1344,141,30,2,-9,-9,-1,-1,-1,-1,-9,-9,816,43,18801,2091,18026,2050,0,0,18801,2091,5301,1001,-1,-1,5848,1099,-2,-2,-2,-2,-2,-2,-9,21578,-9,-1,-1,331,16,4,0,44,3,2,0,2,0,0,0,-1,-1,-1,-1,2,0,0,0,-1,-1,-9,-9\n1998,OR,4,8117,487,41,7,-8,-8,8158,494,-9,-9,6181,380,1046,90,899,16,172,31,106,6,-9,-9,-1,-1,-1,-1,-9,-9,899,16,8404,523,7505,507,0,0,8404,523,2060,207,-1,-1,2475,202,-2,-2,-2,-2,-2,-2,-9,8646,-9,-1,-1,251,2,0,0,7,0,0,0,4,1,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1998,PA,1,34930,1506,2,2,0,0,34932,1508,-9,-9,11656,631,19656,757,3359,121,64,7,125,1,-9,-9,-1,-1,-1,-1,-9,-9,3359,121,34860,1517,31501,1396,0,0,34860,1517,6152,498,-1,-1,8703,567,-2,-2,-2,-2,-2,-2,24247,30992,24247,-1,-1,411,15,0,0,87,2,20,0,10,1,4,0,-1,-1,-1,-1,0,0,2,1,-1,-1,-9,-9\n1998,RI,1,2072,78,546,83,499,40,3117,201,-9,-9,1705,140,930,62,534,33,8,0,32,0,1,0,-1,-1,-1,-1,-9,-9,534,33,3210,235,2676,202,0,0,3210,235,648,52,-1,-1,865,51,-2,-2,-2,-2,-2,-2,3858,3858,3858,-1,-1,-9,-9,-8,-8,2,0,3,0,0,0,1,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1998,SC,3,18964,1184,703,146,-8,-8,19667,1330,-9,-9,6158,493,14429,910,94,8,19,1,5,0,-9,-9,-1,-1,-1,-1,-9,-9,92,8,20703,1412,20553,1073,56,331,20703,1412,5884,637,-1,-1,7251,691,-2,-2,-2,-2,-2,-2,-9,22595,21265,-1,-1,35,1,7,0,45,1,14,0,2,1,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1998,SD,2,2227,203,5,0,0,0,2232,203,-9,-9,1688,138,92,5,-9,-9,439,60,-9,-9,-9,-9,-1,-1,-1,-1,-9,-9,0,0,2219,203,-9,-9,2219,203,2219,203,914,173,-1,-1,998,164,-2,-2,-2,-2,-2,-2,-9,2470,-9,-1,-1,9,1,0,0,0,0,0,0,2,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1998,TN,3,14838,620,-8,-8,23,2,14861,622,-9,-9,8068,547,8662,331,85,5,18,2,19,1,-9,-9,-1,-1,-1,-1,-9,-9,85,5,16852,886,16767,881,0,0,16852,886,4323,532,-1,-1,6839,852,-2,-2,-2,-2,-2,-2,16130,15778,-9,-1,-1,94,2,0,0,36,2,2,0,5,0,1,0,-1,-1,-1,-1,2,0,0,0,-1,-1,-9,-9\n1998,TX,3,130662,9201,3516,1131,-8,-8,134178,10332,-9,-9,37973,3410,59709,5424,35960,1467,-9,-9,-9,-9,-9,-9,-1,-1,-1,-1,-9,-9,36496,1498,134178,10332,98218,8865,0,0,134178,10332,30156,4720,-1,-1,46927,8254,-2,-2,-2,-2,-2,-2,148756,148756,151430,-1,-1,6253,130,19,1,161,9,54,4,22,0,6,0,-1,-1,-1,-1,6,0,86,5,-1,-1,-9,-9\n1998,UT,4,4700,304,56,2,48,8,4804,314,-9,-9,3581,244,324,22,789,37,130,9,109,5,-9,-9,-1,-1,-1,-1,-9,-9,29,0,4173,280,3355,243,29,0,4173,280,1218,160,-1,-1,2680,274,-2,-2,-2,-2,-2,-2,-9,4280,4462,-1,-1,255,3,0,0,3,0,0,0,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1998,VT,1,708,22,289,18,191,12,1188,52,-9,-9,1172,44,45,1,-9,-9,14,0,6,0,-9,-9,-1,-1,-1,-1,-9,-9,184,7,1421,52,-9,-9,1421,52,1421,52,195,16,-1,-1,620,75,-2,-2,-2,-2,-2,-2,1140,1140,1023,-1,-1,0,0,-8,-8,1,0,0,0,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1998,VA,3,24573,1525,271,48,-8,-8,24844,1573,-9,-9,9272,686,18888,1162,125,2,5,1,109,5,-9,-9,-1,-1,-1,-1,-9,-9,145,3,28419,1857,0,0,28294,1855,28419,1857,7678,981,-1,-1,8041,963,-2,-2,-2,-2,-2,-2,29171,29171,29171,-1,-1,-9,-9,13,0,34,3,12,0,2,0,0,0,-1,-1,-1,-1,1,0,0,0,-1,-1,-9,-9\n1998,WA,4,13132,1010,7,5,31,3,13170,1018,-9,-9,9314,692,2997,258,1777,80,420,37,326,15,-9,-9,-1,-1,-1,-1,-9,-9,86,16,13143,1018,11088,877,278,61,13143,1018,5497,714,-1,-1,5440,764,-2,-2,-2,-2,-2,-2,8902,11575,11575,-1,-1,1477,37,1,0,31,3,2,0,3,0,1,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1998,WV,3,2647,161,-8,-8,17,2,2664,163,-9,-9,2744,179,520,32,6,0,2,0,1,0,0,0,-1,-1,-1,-1,-9,-9,0,0,3267,211,3261,211,0,0,3267,211,1159,100,-1,-1,1023,91,-2,-2,-2,-2,-2,-2,2698,2827,2695,-1,-1,10,0,-8,-8,5,0,0,0,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1998,WI,2,13174,910,32,5,378,7,13584,922,-9,-9,8376,526,8397,619,1181,48,420,43,88,3,-9,-9,-1,-1,-1,-1,-9,-9,133,8,17414,1199,15916,1138,317,13,17414,1199,4293,497,-1,-1,5913,551,-2,-2,-2,-2,-2,-2,-9,11136,-9,-1,-1,-9,-9,-8,-8,24,0,1,0,5,0,0,0,-1,-1,-1,-1,1,0,3,0,-1,-1,-9,-9\n1998,WY,4,1313,119,0,0,0,0,1313,119,-9,-9,1086,110,69,9,190,9,93,3,2,0,-9,-9,-1,-1,-1,-1,-9,-9,190,9,1440,131,1250,122,0,0,1440,131,387,74,-1,-1,654,81,-2,-2,-2,-2,-2,-2,1231,1243,1047,-1,-1,40,0,0,0,3,0,0,0,1,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-9,-9\n1998,ST,7,1014362,65108,17518,3365,10110,1464,1041990,69937,0,0,429874,32245,532938,35321,163312,7702,10361,1034,4420,201,2104,205,-1,-1,-1,-1,0,0,121417,5935,1101114,74941,780069,56311,136301,9788,1101114,74941,310592,36678,-1,-1,477034,54278,-2,-2,-2,-2,-2,-2,594747,789126,640495,-1,-1,48088,1329,66,2,1744,87,325,14,163,13,41,0,-1,-1,-1,-1,55,0,273,12,-1,-1,0,0\n1998,US,5,1103291,71807,20355,3945,21177,2145,1144823,77897,0,0,495593,37645,577289,38817,198154,10183,12241,1155,6325,370,2104,205,-1,-1,-1,-1,0,0,121417,5935,1214969,84127,859082,63016,136301,9788,1214969,84127,341573,40073,-1,-1,503675,57345,-2,-2,-2,-2,-2,-2,681062,789126,640495,-1,-1,73984,3115,66,2,1744,87,325,14,163,13,41,0,-1,-1,-1,-1,55,0,485,23,-1,-1,0,0\n1998,FE,6,88929,6699,2837,580,11067,681,102833,7960,-9,-9,65719,5400,44351,3496,34842,2481,1880,121,1905,169,-9,-9,-1,-1,-1,-1,-9,-9,0,0,113855,9186,79013,6705,0,0,113855,9186,30981,3395,-1,-1,26641,3067,-2,-2,-2,-2,-2,-2,86315,-9,-9,-1,-1,25896,1786,-9,-9,-9,-9,-9,-9,-9,-9,-9,0,-1,-1,-1,-1,-9,0,212,11,-1,-1,-9,-9\n1999,AL,3,19474,1298,392,63,0,0,19866,1361,0,0,7788,734,15206,934,5,0,4,0,3,0,-9,-9,-1,-1,-1,-1,-9,-9,62,2,23063,1670,22996,1668,62,2,23063,1670,-9,-9,53,-9,8417,-9,20361,1439,20361,1439,20361,1439,-1,-1,-1,-1,-1,54,5,2,-9,46,-9,-9,-9,1,-9,4,-9,-9,-9,-9,-9,-1,-1,-9,-9,53,-9,-1,-1\n1999,AK,4,1147,103,229,21,928,101,2304,225,0,0,1698,161,467,45,105,8,1423,95,70,3,-9,-9,-1,-1,-1,-1,105,8,2,0,3765,312,3658,304,2,0,3765,312,1159,184,4,2,2246,319,2603,-7,2691,-7,2603,-9,-1,-1,-1,-1,-1,25,4,-8,-8,3,1,0,0,1,0,0,0,0,0,0,0,-1,-1,0,1,4,2,-1,-1\n1999,AZ,4,22374,1570,1757,285,0,0,24131,1855,0,0,10854,1031,3539,292,8347,422,1058,90,333,20,-9,-9,-1,-1,-1,-1,8347,422,0,0,24131,1855,15784,1433,0,0,24131,1855,6314,634,66,1,8222,778,-9,-9,23108,1202,23108,1202,-1,-1,-1,-1,-1,2849,47,7,0,51,1,4,0,2,0,1,0,0,0,0,0,-1,-1,1,0,66,1,-1,-1\n1999,AR,3,9623,702,52,11,0,0,9675,713,0,0,4839,463,5572,312,89,5,7,1,10,0,3,0,-1,-1,-1,-1,89,5,0,0,10520,781,10431,776,0,0,10520,781,3262,415,26,1,4893,552,9764,662,9764,662,9764,662,-1,-1,-1,-1,-1,-9,-9,4,0,25,1,0,0,1,0,0,0,0,0,0,0,-1,-1,0,0,30,1,-1,-1\n1999,CA,4,147555,10653,0,0,1958,521,149513,11174,0,0,42993,4286,46578,3751,52836,2627,1241,130,1203,69,209,16,-1,-1,-1,-1,57289,2922,0,0,149513,11174,92224,8252,4453,295,151699,11368,38158,4778,289,15,117109,13071,-9,-9,143689,10778,74042,6230,-1,-1,-1,-1,-1,21736,549,2,0,201,12,30,2,24,0,11,0,12,0,0,0,-1,-1,9,1,289,15,-1,-1\n1999,CO,4,11849,1146,0,0,0,0,11849,1146,2608,67,10725,818,3310,360,4196,236,301,29,111,6,-9,-9,-1,-1,-1,-1,0,0,10,0,14457,1213,10251,977,10,0,14457,1213,3769,443,36,0,5158,548,-9,-9,10347,883,8632,792,-1,-1,-1,-1,-1,797,9,0,0,30,0,0,0,3,0,1,0,1,0,1,0,-1,-1,0,0,36,0,-1,-1\n1999,CT,1,11096,667,1757,250,2898,319,15751,1236,0,0,4550,504,8042,628,4502,321,28,1,58,5,-8,-8,-1,-1,-1,-1,4502,321,0,0,17180,1459,12678,1138,0,0,17180,1459,4660,543,21,1,5091,581,-8,-8,-8,-8,-8,-8,-1,-1,-1,-1,-1,601,34,0,0,20,0,6,0,1,2,0,0,1,0,0,0,-1,-1,0,0,28,2,-1,-1\n1999,DE,3,3233,207,1513,260,1247,125,5993,592,-9,-9,2294,254,4070,356,277,19,1,0,3,2,-9,-9,-1,-1,-1,-1,-9,-9,3,0,6371,612,6024,583,70,10,6371,612,1136,192,13,0,1936,276,-9,-9,3934,272,2920,272,-1,-1,-1,-1,-1,114,5,2,0,11,0,-9,-9,0,0,0,0,0,0,0,0,-1,-1,0,0,13,0,-1,-1\n1999,DC,3,3140,22,267,7,1146,46,4553,75,-9,-9,132,3,9796,212,3,0,0,0,0,0,0,0,-1,-1,-1,-1,255,6,-9,-9,10183,221,10180,221,-9,-9,10183,221,926,89,26,1,5426,239,5424,-7,5424,-7,-9,-9,-1,-1,-1,-1,-1,225,-9,-8,-8,19,1,7,0,0,0,0,0,0,0,-9,-9,-1,-1,-9,-9,26,1,-1,-1\n1999,FL,3,65774,3820,2,0,0,0,65776,3820,-9,-9,28360,1659,35982,1997,6226,218,86,10,45,1,4,0,-1,-1,-1,-1,1294,153,5,0,65776,3820,59550,3602,0,0,65776,3820,21747,2062,166,11,27742,2329,76480,4011,69623,3702,51327,2925,-1,-1,-1,-1,-1,4236,164,1,0,105,5,47,6,6,0,2,0,1,0,1,0,-1,-1,3,0,166,11,-1,-1\n1999,GA,3,39411,2597,73,10,0,0,39484,2607,0,-9,13048,1059,26271,1541,106,4,60,3,44,2,-8,-8,-1,-1,-1,-1,61,2,-9,-9,39484,2607,39305,2595,0,0,39484,2607,14566,1210,77,5,15314,1859,-8,-8,41005,2803,-8,-8,-1,-1,-1,-1,-1,426,20,0,0,59,-9,13,-9,1,-9,0,-9,0,-9,0,0,-1,-1,9,0,82,-9,-1,-1\n1999,HI,4,2072,317,88,17,917,75,3077,409,0,0,882,157,192,21,226,27,61,5,712,57,1898,247,-1,-1,-1,-1,562,62,73,9,4380,558,4081,522,73,9,4350,553,674,106,14,0,1203,180,-9,-9,3406,-7,2481,-7,-1,-1,-1,-1,-1,115,6,-8,-8,7,0,0,0,7,0,0,0,0,0,0,0,-1,-1,0,0,14,0,-1,-1\n1999,ID,4,3533,301,0,0,0,0,3533,301,235,65,4111,354,71,7,649,39,173,30,33,2,-8,-8,-1,-1,-1,-1,51,6,4,0,4443,399,3739,354,55,6,4443,399,1195,198,16,0,1455,304,2974,208,3665,291,2974,208,-1,-1,-1,-1,-1,228,3,0,0,11,0,0,0,1,0,1,0,0,0,0,0,-1,-1,3,0,16,0,-1,-1\n1999,IL,2,41858,2802,0,0,0,0,41858,2802,-9,-9,10167,713,27204,1911,4352,156,47,17,88,5,-9,-9,-1,-1,-1,-1,4352,156,0,0,41858,2802,37506,2646,0,0,41858,2802,17722,2243,92,1,23964,2718,30304,2009,30304,2009,25546,1983,-1,-1,-1,-1,-1,392,39,1,0,67,1,5,0,10,0,2,0,1,0,0,0,-1,-1,6,0,92,1,-1,-1\n1999,IN,2,15922,1178,36,3,10,0,15968,1181,1183,41,10289,730,7728,484,461,22,42,7,28,1,0,0,-1,-1,-1,-1,0,0,0,0,18087,1222,17626,1200,0,0,18087,1222,8568,979,45,2,9293,1037,14260,1123,16627,1317,-9,-9,-1,-1,-1,-1,-1,99,0,1,0,41,2,-9,-9,3,0,0,0,0,0,0,0,-1,-1,0,0,45,2,-1,-1\n1999,IA,2,6693,539,0,0,0,0,6693,539,-9,-9,4613,387,1627,122,291,9,105,20,57,1,-9,-9,-1,-1,-1,-1,291,9,0,0,6693,539,6402,530,0,0,6693,539,2641,315,14,1,4134,588,5830,389,5830,389,5830,389,-1,-1,-1,-1,-1,-9,-9,-8,-8,12,1,0,0,2,0,0,0,0,0,0,0,-1,-1,0,0,14,1,-1,-1\n1999,KS,2,7996,573,0,0,0,0,7996,573,-9,-9,4847,335,2878,223,616,23,161,9,67,2,-9,-9,-1,-1,-1,-1,0,0,44,1,7997,570,7337,546,44,1,7997,570,2551,396,14,0,3989,523,8227,633,-9,-9,-9,-9,-1,-1,-1,-1,-1,168,10,0,0,11,0,0,0,3,0,0,0,0,0,0,0,-1,-1,0,0,14,0,-1,-1\n1999,KY,3,10455,670,0,0,0,0,10455,670,0,0,8750,643,5335,449,90,4,6,0,8,0,-9,-9,-1,-1,-1,-1,31,1,0,0,14130,1093,14130,1093,0,0,14220,1097,4014,598,33,1,5849,798,11267,680,11049,658,6934,487,-1,-1,-1,-1,-1,48,0,1,0,33,1,0,0,0,0,0,0,0,0,0,0,-1,-1,0,0,34,1,-1,-1\n1999,LA,3,18215,959,0,0,0,0,18215,959,0,0,7183,716,23475,1506,-9,-9,5,2,3,2,-9,-9,-1,-1,-1,-1,45,4,0,0,30711,2230,-9,-9,-9,-9,30711,2230,6511,709,76,6,13781,1606,18215,959,18423,940,-9,-9,-1,-1,-1,-1,-1,175,18,1,0,-9,-9,-9,-9,-9,-9,-9,-9,-9,-9,-9,-9,-1,-1,75,6,76,6,-1,-1\n1999,ME,1,1537,49,44,9,0,0,1581,58,-9,-9,1508,62,60,2,6,0,11,0,4,0,0,0,-1,-1,-1,-1,55,0,8,0,1646,64,1582,64,58,0,1646,64,400,20,6,0,676,49,1407,53,1581,58,1407,53,-1,-1,-1,-1,-1,7,0,-8,-8,6,0,0,0,0,0,0,0,0,0,0,0,-1,-1,0,0,6,0,-1,-1\n1999,MD,3,20733,974,778,113,0,0,21511,1087,0,0,4760,330,17183,782,-9,-9,4,1,11,0,-9,-9,-1,-1,-1,-1,0,0,24,0,21982,1113,-9,-9,-9,-9,21982,1113,6769,627,49,1,9474,966,-9,-9,22092,1121,-9,-9,-1,-1,-1,-1,-1,415,17,0,0,32,1,2,0,4,0,1,0,4,0,0,0,-1,-1,6,0,49,1,-1,-1\n1999,MA,1,9255,395,120,198,538,126,9913,719,434,17,4774,395,3034,145,2490,197,33,2,125,3,0,0,-1,-1,-1,-1,2490,197,158,0,10614,742,7966,545,158,0,10614,742,1644,191,20,1,3016,258,-9,-9,-9,-9,8753,589,-1,-1,-1,-1,-1,-9,-9,-8,-8,17,1,3,0,0,0,0,0,0,0,0,0,-1,-1,0,0,20,1,-1,-1\n1999,MI,2,44590,2027,0,0,0,0,44590,2027,262,0,18585,847,24476,1126,1139,32,223,14,62,4,-9,-9,-1,-1,-1,-1,1244,36,0,0,44590,2027,43451,1995,0,0,44590,2027,6925,541,112,2,11304,973,-8,-8,45041,2137,-8,-8,-1,-1,-1,-1,-1,500,10,-8,-8,92,2,5,0,7,0,5,0,1,0,1,0,-1,-1,1,0,112,2,-1,-1\n1999,MN,2,5350,317,0,0,12,2,5362,319,0,0,2550,200,2112,111,426,10,400,31,-9,-9,-9,-9,-1,-1,-1,-1,550,13,2,0,5614,355,5186,345,2,0,5614,355,2744,312,9,0,4101,374,5372,292,5432,354,5432,354,-1,-1,-1,-1,-1,-9,-9,-8,-8,7,0,0,0,2,0,0,0,0,0,0,0,-1,-1,0,0,9,0,-1,-1\n1999,MS,3,8592,966,252,39,0,0,8844,1005,3166,183,4054,477,12707,915,60,2,10,7,11,4,0,0,-1,-1,-1,-1,60,2,0,0,16842,1405,16782,1403,0,0,16842,1405,4692,538,31,0,3764,450,-9,-9,16728,-7,-9,-9,-1,-1,-1,-1,-1,-9,-9,0,0,30,0,1,0,1,0,2,0,0,0,0,0,-1,-1,0,0,34,0,-1,-1\n1999,MO,2,24249,1889,18,4,0,0,24267,1893,-9,-9,13212,1212,10971,781,297,20,96,11,49,1,-9,-9,-1,-1,-1,-1,0,0,17,0,24345,2005,23865,1909,183,76,24345,2005,7183,1067,52,3,11274,1620,-8,-8,25271,2145,-8,-8,-1,-1,-1,-1,-1,300,23,9,0,32,1,4,1,4,0,0,0,1,0,0,0,-1,-1,2,1,52,3,-1,-1\n1999,MT,4,1458,113,0,0,0,0,1458,113,0,0,2112,171,48,1,69,9,401,68,3,1,0,0,-1,-1,-1,-1,128,21,0,0,2692,262,2623,253,0,0,2692,262,538,61,5,0,955,136,-9,-9,1330,70,850,46,-1,-1,-1,-1,-1,5,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,-1,-1,0,0,5,0,-1,-1\n1999,NE,2,3258,233,44,14,16,1,3318,248,-9,-9,2379,157,896,65,379,12,155,17,17,2,0,0,-1,-1,-1,-1,0,0,0,0,3447,241,3068,229,0,0,3444,241,1224,121,10,0,1429,152,-8,-8,2720,243,2176,195,-1,-1,-1,-1,-1,142,4,0,0,8,0,0,0,2,0,0,0,0,0,0,0,-1,-1,0,0,10,0,-1,-1\n1999,NV,4,8522,150,77,0,3,0,8602,150,0,0,4729,461,2460,221,1339,36,140,14,114,6,-9,-9,-1,-1,-1,-1,1350,33,1,1,8794,736,7454,699,1,1,8794,736,2950,435,36,2,4019,517,8619,760,-9,-9,6397,551,-1,-1,-1,-1,-1,566,17,1,0,23,1,9,1,2,0,1,0,0,0,0,0,-1,-1,0,0,36,2,-1,-1\n1999,NH,1,2079,128,4,16,0,20,2083,164,33,1,1987,103,115,8,101,3,5,2,18,0,-8,-8,-1,-1,-1,-1,0,0,15,4,2140,117,1614,104,425,10,2140,117,663,67,1,0,914,81,1786,250,1883,181,1844,100,-1,-1,-1,-1,-1,36,5,0,0,1,0,0,0,0,0,-8,-8,0,0,0,0,-1,-1,0,0,1,0,-1,-1\n1999,NJ,1,23351,1297,0,0,0,0,23351,1297,0,0,7291,573,19196,1215,5454,195,13,1,98,7,0,0,-1,-1,-1,-1,3012,64,21,2,29631,1862,24177,1667,0,0,29631,1862,8784,902,89,3,13486,1248,-9,-9,-9,-9,16549,733,-1,-1,-1,-1,-1,-9,-9,0,0,61,3,14,0,7,0,0,0,1,0,0,0,-1,-1,6,0,89,3,-1,-1\n1999,NM,4,4357,301,326,68,0,0,4683,369,0,-9,3842,280,533,49,2690,184,261,21,12,0,0,0,-1,-1,-1,-1,0,0,157,19,4805,369,2058,166,157,19,4664,460,998,99,7,0,1801,207,-8,-8,5129,463,4879,625,-1,-1,-1,-1,-1,277,1,0,0,4,0,0,0,1,0,0,0,5,0,0,0,-1,-1,0,0,10,0,-1,-1\n1999,NY,1,67964,3508,312,25,0,0,68276,3533,1315,112,17510,1163,36963,2248,20224,851,294,4,378,3,-8,-8,-1,-1,-1,-1,11608,53,1211,37,67964,3508,47385,2627,355,30,69279,3620,17668,1498,184,10,25820,2214,57893,3372,62892,3492,51059,2756,-1,-1,-1,-1,-1,8950,332,0,0,144,7,24,2,9,0,3,0,0,0,0,0,-1,-1,4,1,184,10,-1,-1\n1999,NC,3,23990,1258,3722,492,198,23,27910,1773,0,-9,9347,838,18691,967,-9,-9,552,49,49,6,-9,-9,-1,-1,-1,-1,577,20,19,0,29235,1880,-9,-9,29235,1888,29235,1888,8220,677,54,0,10023,788,25731,1414,-9,-9,25731,1414,-1,-1,-1,-1,-1,250,3,4,0,49,1,5,0,1,0,0,0,0,0,0,0,-1,-1,1,0,60,1,-1,-1\n1999,ND,2,774,63,71,6,0,0,845,69,24,-9,667,50,38,1,46,3,162,19,6,0,0,0,-1,-1,-1,-1,0,0,0,0,873,70,827,67,0,0,873,70,528,53,0,0,608,64,910,95,857,95,910,95,-1,-1,-1,-1,-1,14,1,-8,-8,-9,-9,-9,-9,-9,-9,-9,-9,-9,-9,0,0,-1,-1,0,0,0,0,-1,-1\n1999,OH,2,43813,2806,0,0,0,0,43813,2806,-9,-9,20592,1338,23111,1496,800,47,99,4,49,2,-9,-9,-1,-1,-1,-1,-8,-8,150,1,44001,2841,43051,2793,150,1,44001,2841,15377,2167,128,1,20479,2439,-9,-9,-9,-9,-9,-9,-1,-1,-1,-1,-1,251,15,1,0,116,1,-9,-9,8,0,1,0,2,0,0,0,-1,-1,0,0,128,1,-1,-1\n1999,OK,3,13527,1343,0,0,0,0,13527,1343,935,117,10984,1268,6593,823,876,44,1548,175,33,3,-9,-9,-1,-1,-1,-1,43,3,876,44,20077,2316,19201,2272,0,0,20077,2316,5493,1066,79,4,5190,1003,-9,-9,20234,2360,-9,-9,-1,-1,-1,-1,-1,283,14,6,0,59,4,2,0,5,0,2,0,3,0,0,0,-1,-1,2,0,79,4,-1,-1\n1999,OR,4,8873,536,8,0,0,0,8891,536,10,-9,6917,440,1043,95,996,11,209,30,110,8,-9,-9,-1,-1,-1,-1,-8,-8,997,11,9276,584,8279,573,1,0,9276,584,2552,252,20,0,2970,264,-8,-8,8969,581,-9,-9,-1,-1,-1,-1,-1,321,1,0,0,16,0,0,0,2,0,1,0,1,0,0,0,-1,-1,0,0,20,0,-1,-1\n1999,PA,1,34871,1583,2,1,0,0,34873,1584,34,26,11563,678,19623,802,3499,122,62,9,142,1,-9,-9,-1,-1,-1,-1,3517,128,0,0,34907,1618,31408,1496,0,0,34907,1618,6415,483,110,5,9593,572,23949,1279,30920,1464,23949,1279,-1,-1,-1,-1,-1,404,12,1,0,87,4,11,1,9,0,0,0,0,0,0,0,-1,-1,2,0,110,5,-1,-1\n1999,RI,1,1801,53,520,90,421,41,2742,184,-9,-9,1469,112,831,50,443,24,15,0,30,0,0,0,-1,-1,-1,-1,443,24,0,0,2788,186,2345,162,0,0,2815,188,928,121,0,0,1228,146,3403,321,3403,321,3517,345,-1,-1,-1,-1,-1,-9,-9,-8,-8,-9,-9,-9,-9,1,-9,-9,-9,-9,-9,0,0,-1,-1,0,0,1,0,-1,-1\n1999,SC,3,18957,1272,625,132,30,0,19612,1404,0,0,6163,528,14269,902,106,11,13,4,4,2,0,0,-1,-1,-1,-1,111,11,1,0,20561,1447,20411,1090,44,346,20561,1447,5422,627,51,4,7265,696,-9,-9,22068,1497,20830,1347,-1,-1,-1,-1,-1,27,1,4,0,31,1,9,3,3,0,2,0,2,0,0,0,-1,-1,0,0,51,4,-1,-1\n1999,SD,2,2286,188,8,0,10,0,2304,188,-9,-9,1761,126,84,7,-9,-9,472,56,0,0,0,0,-1,-1,-1,-1,0,0,0,0,2317,189,-9,-9,-9,-9,2317,189,929,134,2,0,1134,188,-8,-8,2335,210,-8,-8,-1,-1,-1,-1,-1,30,0,-9,-9,2,0,-9,-9,-9,-9,-9,-9,-9,-9,0,0,-1,-1,0,0,2,0,-1,-1\n1999,TN,3,12457,853,0,0,22,4,12479,857,1622,137,9500,757,11440,602,148,5,21,3,25,1,-9,-9,-1,-1,-1,-1,148,5,0,0,21134,1368,20986,1363,0,0,21134,1368,7620,1057,72,0,11140,1485,16531,991,16164,963,-9,-9,-1,-1,-1,-1,-1,100,4,0,0,63,0,2,0,2,0,1,0,4,0,0,0,-1,-1,0,0,72,0,-1,-1\n1999,TX,3,122150,8659,4379,1694,0,0,126529,10353,0,0,84963,6246,64980,6198,39095,1681,27,11,27,0,0,0,-1,-1,-1,-1,575,25,116,22,150688,12502,111543,10820,116,22,150688,12502,26477,3643,395,14,45887,6450,144087,11837,141205,11600,144087,11837,-1,-1,-1,-1,-1,6581,132,34,1,362,13,-8,-8,21,1,5,0,7,0,0,0,-1,-1,0,0,429,15,-1,-1\n1999,UT,4,3645,229,12,2,89,15,3746,246,785,94,4303,318,390,24,883,46,154,13,124,2,0,0,-1,-1,-1,-1,0,0,87,11,5058,368,4088,311,87,11,5058,368,1170,184,7,0,2263,300,-9,-9,4148,270,4298,286,-1,-1,-1,-1,-1,224,2,1,0,7,0,0,0,1,0,0,0,0,0,0,0,-1,-1,0,0,9,0,-1,-1\n1999,VT,1,749,41,117,8,210,10,1076,59,-9,-9,1248,51,66,2,-9,-9,9,0,6,1,0,0,-1,-1,-1,-1,0,0,148,5,1477,59,-9,-9,-9,-9,1477,59,209,38,5,0,767,74,1102,38,1162,38,985,38,-1,-1,-1,-1,-1,0,0,-8,-8,5,0,0,0,0,0,0,0,0,0,0,0,-1,-1,0,0,5,0,-1,-1\n1999,VA,3,26907,1690,219,38,0,0,27126,1728,-9,-9,7900,589,16158,980,115,2,5,0,94,3,0,0,-1,-1,-1,-1,10,0,3801,395,27968,1967,24052,1570,3801,395,27968,1967,6538,786,83,2,6924,761,-9,-9,-9,-9,-9,-9,-1,-1,-1,-1,-1,-9,-9,14,0,51,2,11,0,0,0,0,0,3,0,0,0,-1,-1,4,0,83,2,-1,-1\n1999,WA,4,13121,1105,27,5,22,3,13170,1113,-9,-9,9588,772,3035,252,1779,99,459,53,325,16,0,0,-1,-1,-1,-1,69,18,3,0,13479,1111,11606,989,94,23,13479,1111,5309,739,31,0,5746,785,8317,545,11306,730,11306,730,-1,-1,-1,-1,-1,1418,99,0,0,27,0,1,0,2,0,0,0,1,0,0,0,-1,-1,0,0,31,0,-1,-1\n1999,WV,3,2714,150,0,0,13,3,2727,153,566,86,2761,201,526,38,15,0,4,0,2,0,0,0,-1,-1,-1,-1,0,0,0,0,3293,239,3278,239,0,0,3293,239,1119,62,7,0,1217,37,2829,230,2727,153,2800,150,-1,-1,-1,-1,-1,10,0,-8,-8,7,0,0,0,0,0,0,0,0,0,0,0,-1,-1,0,0,7,0,-1,-1\n1999,WI,2,13979,984,41,8,268,6,14288,998,843,63,9175,634,9127,696,1290,51,474,45,116,4,0,0,-1,-1,-1,-1,35,2,104,5,19031,1386,17418,1325,323,10,19031,1386,5559,536,19,2,6430,465,-9,-9,10315,636,-9,-9,-1,-1,-1,-1,-1,-9,-9,-8,-8,13,1,1,0,5,0,0,0,0,0,0,0,-1,-1,0,1,19,2,-1,-1\n1999,WY,4,1168,90,0,0,0,0,1168,90,36,-9,1187,125,81,4,188,10,109,3,6,0,-9,-9,-1,-1,-1,-1,188,10,0,0,1571,142,1383,132,0,0,1571,142,437,86,3,0,586,77,1087,144,1113,130,963,84,-1,-1,-1,-1,-1,41,0,0,0,2,0,0,0,1,0,0,0,0,0,0,0,-1,-1,0,0,3,0,-1,-1\n1999,ST,7,1012497,65374,17892,3889,10956,1441,1041355,70704,14091,1009,467504,36509,548183,36759,168330,7847,11249,1116,4926,258,2114,263,-1,-1,-1,-1,103487,4742,8119,569,1145582,80216,880989,65648,39959,3155,1149026,80622,303057,35284,2758,102,496705,54145,543730,35981,886275,59756,575244,40196,-1,-1,-1,-1,-1,53440,1606,97,1,2111,69,216,16,166,3,46,0,51,0,3,0,-1,-1,134,11,2824,100,-1,-1\n1999,US,5,1110064,72791,21141,4434,23327,2146,1154542,79371,14091,1009,539406,42326,597462,40528,208154,10550,13322,1258,7005,443,2114,263,-1,-1,-1,-1,103487,4742,8119,569,1270915,90129,966498,72858,39959,3155,1274359,90535,336871,38925,3004,113,525366,57647,633805,35981,886275,59756,575244,40196,-1,-1,-1,-1,-1,85087,3724,97,1,2337,78,231,17,178,3,46,0,56,0,3,0,-1,-1,134,11,3082,110,-1,-1\n1999,FE,6,97567,7417,3249,545,12371,705,113187,8667,-9,-9,71902,5817,49279,3769,39824,2703,2073,142,2079,185,-9,-9,-1,-1,-1,-1,0,0,0,0,125333,9913,85509,7210,0,0,125333,9913,33814,3641,246,11,28661,3502,90075,-7,-9,-9,-9,-9,-1,-1,-1,-1,-1,31647,2118,0,0,226,9,15,1,12,0,0,0,5,0,0,0,-1,-1,0,0,258,10,-1,-1\n2000,AL,3,21230,1476,300,34,0,0,21530,1510,-9,-9,7358,684,14727,870,0,0,3,0,3,0,0,0,-1,-1,-1,-1,65,2,0,0,22156,1556,-1,-1,-1,-1,-1,-1,4896,603,64,2,6572,759,-8,-8,21304,1502,21304,1502,-1,-1,-1,116,1,64,0,4,0,60,2,8,0,0,0,0,0,0,0,0,0,-1,-1,0,0,72,2,-1,-1\n2000,AK,4,1099,72,184,15,1242,145,2525,232,-9,-9,1764,140,474,31,100,10,1465,97,82,6,0,0,-1,-1,-1,-1,0,0,4,0,3889,284,-1,-1,-1,-1,-1,-1,981,151,8,1,2339,324,2603,-7,2691,-7,2603,-9,-1,-1,-1,9,0,19,1,-8,-8,3,1,0,0,3,0,0,0,1,0,0,0,-1,-1,1,0,8,1,-1,-1\n2000,AZ,4,23623,1789,923,175,0,0,24546,1964,-9,-9,10893,1070,3544,312,8594,452,1160,107,355,23,0,0,-1,-1,-1,-1,0,0,0,0,24546,1964,-1,-1,-1,-1,-1,-1,6300,704,63,1,8306,814,-9,-9,22650,2297,22650,2297,-1,-1,-1,150,2,2840,43,3,0,54,0,2,0,3,1,0,0,3,0,0,0,-1,-1,0,0,65,1,-1,-1\n2000,AR,3,10366,725,47,5,0,0,10413,730,-9,-9,5319,473,5772,296,37,2,8,1,7,0,0,0,-1,-1,-1,-1,0,0,0,0,11143,772,-1,-1,-1,-1,-1,-1,3146,405,26,3,5630,694,9914,662,9914,662,9914,662,-1,-1,-1,51,0,-9,-9,1,1,23,2,0,0,3,0,0,0,0,0,0,0,-1,-1,0,0,27,3,-1,-1\n2000,CA,4,147690,10427,-9,-9,1987,551,149677,10978,-9,-9,43078,4178,46243,3656,53186,2648,1318,152,1209,75,214,36,-1,-1,-1,-1,4429,233,0,0,149677,10978,-1,-1,-1,-1,-1,-1,35734,4543,167,9,117436,12835,-9,-9,144072,10625,74237,6230,-1,-1,-1,101,5,21383,474,1,0,218,18,9,3,16,0,2,0,8,0,1,0,-1,-1,4,1,259,22,-1,-1\n2000,CO,4,13324,1331,-9,-9,-8,-8,13324,1331,-9,-9,6935,639,3586,384,4543,267,310,35,125,8,0,0,-1,-1,-1,-1,0,0,1,0,15500,1333,-1,-1,-1,-1,-1,-1,4063,452,29,3,5559,651,-9,-9,11727,1099,10599,1008,-1,-1,-1,84,3,822,13,0,0,22,2,0,1,0,0,6,0,1,0,0,0,-1,-1,0,0,29,3,-1,-1\n2000,CT,1,11166,646,1596,240,2730,293,15492,1179,-9,-9,4524,524,7882,579,4469,295,25,5,49,3,0,0,-1,-1,-1,-1,0,0,0,0,16949,1406,-1,-1,-1,-1,-1,-1,4576,373,24,1,5658,634,-8,-8,-8,-8,-8,-8,-1,-1,-1,365,17,673,40,0,0,19,2,8,0,6,0,0,0,0,0,0,0,-1,-1,0,0,33,2,-1,-1\n2000,DE,3,3443,236,1527,251,1019,96,5989,583,-9,-9,2355,235,3965,360,0,0,1,0,2,2,0,0,-1,-1,-1,-1,0,0,1,0,6324,597,-1,-1,-1,-1,-1,-1,1276,178,4,0,2024,263,-9,-9,3934,272,2920,272,-1,-1,-1,18,1,95,7,1,0,3,0,0,0,0,0,0,0,0,0,0,0,-1,-1,0,0,4,0,-1,-1\n2000,DC,3,2159,10,224,4,1341,47,3724,61,-9,-9,311,21,9319,323,34,1,0,0,1,0,0,0,-1,-1,-1,-1,320,11,11,0,9996,356,-1,-1,-1,-1,-1,-1,782,86,0,0,3266,84,4586,-7,4586,-7,-9,-9,-1,-1,-1,-8,-8,-8,-8,-8,-8,2,0,6,0,0,0,0,0,0,0,0,0,-1,-1,6,0,14,0,-1,-1\n2000,FL,3,67213,4105,1,0,-8,-8,67214,4105,-9,-9,24414,1782,36147,2029,6450,266,84,13,50,4,2,0,-1,-1,-1,-1,48,7,19,4,67214,4105,-1,-1,-1,-1,-1,-1,22772,2354,186,11,31255,2872,78697,4329,71833,4009,52902,3199,-1,-1,-1,441,25,4270,146,6,0,123,7,45,3,7,1,1,0,4,0,0,0,-1,-1,0,0,186,11,-1,-1\n2000,GA,3,41390,2751,84,7,-8,-8,41474,2758,-9,-9,13792,1157,27126,1572,445,22,62,4,49,3,0,0,-1,-1,-1,-1,0,0,0,0,41474,2758,-1,-1,-1,-1,-1,-1,12370,1350,101,2,13324,1724,-8,-8,42349,2807,-8,-8,-1,-1,-1,126,3,647,18,0,0,90,0,8,0,5,0,0,0,0,0,0,0,-1,-1,0,0,103,0,-1,-1\n2000,HI,4,1963,233,444,98,810,59,3217,390,-9,-9,1019,169,210,18,90,4,19,2,932,82,2057,271,-1,-1,-1,-1,93,7,72,8,4492,561,-1,-1,-1,-1,-1,-1,797,222,5,0,1104,287,-9,-9,3406,-7,2481,-7,-1,-1,-1,1,0,43,2,-8,-8,3,0,0,0,2,0,0,0,0,0,0,0,-1,-1,0,0,5,0,-1,-1\n2000,ID,4,3506,301,-8,-8,-8,-8,3506,301,-9,-9,3928,394,74,8,782,51,190,33,26,1,0,0,-1,-1,-1,-1,13,0,29,6,5042,493,-1,-1,-1,-1,-1,-1,1701,284,7,0,2309,405,4937,291,4754,276,4246,208,-1,-1,-1,3,1,126,2,0,0,5,0,0,0,0,0,0,0,0,0,0,0,-1,-1,2,0,7,0,-1,-1\n2000,IL,2,42432,2849,-9,-9,0,0,42432,2849,-9,-9,10608,785,27271,1868,4413,170,54,21,85,5,0,0,-1,-1,-1,-1,0,0,1,0,42432,2849,-1,-1,-1,-1,-1,-1,16928,2184,78,3,26331,3033,30722,2273,30722,2273,25964,2247,-1,-1,-1,142,3,358,34,0,0,55,0,6,0,9,0,1,0,0,0,0,0,-1,-1,7,3,78,3,-1,-1\n2000,IN,2,16536,1367,2,2,37,3,16575,1372,-9,-9,10321,846,7754,569,520,32,51,5,27,0,0,0,-1,-1,-1,-1,0,0,0,0,18673,1452,-1,-1,-1,-1,-1,-1,9271,1271,43,3,9924,1145,14260,1123,18289,1540,-9,-9,-1,-1,-1,78,6,147,0,0,0,41,3,0,0,1,0,0,0,1,0,0,0,-1,-1,0,0,43,3,-1,-1\n2000,IA,2,7363,592,-8,-8,-8,-8,7363,592,-9,-9,5033,439,1719,123,410,12,128,16,61,1,0,0,-1,-1,-1,-1,0,0,12,1,7363,592,-1,-1,-1,-1,-1,-1,2924,340,12,0,3934,460,6229,543,6229,543,6229,543,-1,-1,-1,28,0,-9,-9,-8,-8,11,0,0,0,1,0,0,0,0,0,0,0,-1,-1,0,0,12,0,-1,-1\n2000,KS,2,7843,509,-8,-8,-8,-8,7843,509,-9,-9,4191,276,2803,183,581,22,160,20,68,2,0,0,-1,-1,-1,-1,0,0,37,1,7840,504,-1,-1,-1,-1,-1,-1,2523,336,18,0,4627,609,8152,634,-9,-9,-9,-9,-1,-1,-1,19,4,180,9,0,0,16,0,0,0,1,0,0,0,1,0,0,0,-1,-1,0,0,18,0,-1,-1\n2000,KY,3,9109,650,-8,-8,5,1,9114,651,-9,-9,8869,667,4850,381,106,1,6,0,7,2,0,0,-1,-1,-1,-1,0,0,17,1,13855,1052,-1,-1,-1,-1,-1,-1,5084,753,46,2,6921,945,10765,680,10537,659,-9,-9,-1,-1,-1,0,0,52,0,0,0,43,2,0,0,3,0,0,0,0,0,0,0,-1,-1,0,0,46,2,-1,-1\n2000,LA,3,18401,960,0,0,0,0,18401,960,-9,-9,7562,709,25374,1502,0,0,6,2,3,2,0,0,-1,-1,-1,-1,43,4,0,0,32988,2219,-1,-1,-1,-1,-1,-1,5781,588,88,4,13135,1539,18428,1020,18641,1060,-9,-9,-1,-1,-1,39,1,53,5,1,0,0,0,0,0,0,0,0,0,0,0,0,0,-1,-1,88,4,89,4,-1,-1\n2000,ME,1,1541,51,40,4,0,0,1581,55,-9,-9,1394,57,46,2,7,0,14,1,4,0,0,0,-1,-1,-1,-1,151,10,6,0,1622,70,-1,-1,-1,-1,-1,-1,382,21,8,0,652,36,1381,47,1573,68,1407,53,-1,-1,-1,1,0,8,1,-8,-8,6,0,0,0,2,0,0,0,0,0,0,0,-1,-1,0,0,8,0,-1,-1\n2000,MD,3,21204,1051,881,157,153,8,22238,1216,-9,-9,4788,343,17481,873,0,0,7,2,21,1,0,0,-1,-1,-1,-1,0,0,22,0,22319,1219,-1,-1,-1,-1,-1,-1,6140,641,42,5,9314,837,-9,-9,22431,1228,-9,-9,-1,-1,-1,90,3,434,21,0,0,31,3,4,1,6,1,0,0,3,0,0,0,-1,-1,0,0,44,5,-1,-1\n2000,MA,1,8851,221,130,317,699,117,9680,655,-9,-9,4561,443,2837,163,2473,23,35,1,117,2,0,0,-1,-1,-1,-1,0,0,36,31,10059,663,-1,-1,-1,-1,-1,-1,1404,181,20,3,2838,373,-9,-9,-9,-9,8573,589,-1,-1,-1,36,14,-9,-9,-8,-8,18,1,2,0,0,2,0,0,0,0,0,0,-1,-1,0,0,20,3,-1,-1\n2000,MI,2,45138,2131,-8,-8,-8,-8,45138,2131,-9,-9,18946,934,25076,1139,1152,34,225,17,83,4,0,0,-1,-1,-1,-1,103,3,2,0,45587,2131,-1,-1,-1,-1,-1,-1,7086,599,120,3,11061,900,-8,-8,46699,2275,-8,-8,-1,-1,-1,93,8,502,8,-8,-8,103,2,4,0,5,0,1,0,1,0,3,0,-1,-1,3,1,120,3,-1,-1\n2000,MN,2,5701,340,-8,-8,11,1,5712,341,-9,-9,2898,215,2157,108,281,2,398,39,14,0,0,0,-1,-1,-1,-1,0,0,122,4,5870,368,-1,-1,-1,-1,-1,-1,2719,304,10,0,3848,397,5962,359,5962,359,5962,359,-1,-1,-1,16,8,-9,-9,-8,-8,6,0,0,0,2,0,0,0,2,0,0,0,-1,-1,0,0,10,0,-1,-1\n2000,MS,3,9481,1197,337,69,-8,-8,9818,1264,-9,-9,4803,589,13662,1067,69,5,16,5,21,3,-9,-9,-1,-1,-1,-1,-9,-9,1,0,18572,1669,-1,-1,-1,-1,-1,-1,5080,581,34,0,4461,479,-9,-9,16753,-7,-9,-9,-1,-1,-1,135,3,-9,-9,0,0,-9,-9,-9,-9,2,0,-9,-9,-9,-9,-9,-9,-1,-1,29,0,31,0,-1,-1\n2000,MO,2,25378,1983,19,5,0,0,25397,1988,-9,-9,13768,1222,11112,738,349,16,110,9,49,3,0,0,-1,-1,-1,-1,0,0,9,0,25397,1988,-1,-1,-1,-1,-1,-1,7393,1077,42,2,12351,1822,-8,-8,26353,2145,-8,-8,-1,-1,-1,75,4,320,18,5,0,31,2,2,0,4,0,1,0,0,0,0,0,-1,-1,0,0,43,2,-1,-1\n2000,MT,4,1460,111,-9,-9,-8,-8,1460,111,-9,-9,2180,208,45,3,83,9,474,81,5,0,0,0,-1,-1,-1,-1,12,5,0,0,2799,306,-1,-1,-1,-1,-1,-1,458,72,5,1,958,116,-9,-9,1330,70,850,46,-1,-1,-1,1,0,5,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,-1,-1,0,0,5,0,-1,-1\n2000,NE,2,3465,250,64,10,19,2,3548,262,-9,-9,2086,163,920,68,435,12,169,20,19,2,0,0,-1,-1,-1,-1,0,1,0,0,3629,266,-1,-1,-1,-1,-1,-1,1291,152,7,1,1357,161,-8,-8,2720,243,2176,195,-1,-1,-1,44,0,170,3,0,0,7,1,0,0,0,0,0,0,0,0,0,0,-1,-1,0,0,7,1,-1,-1\n2000,NV,4,8898,291,83,0,8,0,8989,291,-9,-9,4976,548,2526,236,1321,37,152,15,128,10,0,0,-1,-1,-1,-1,114,0,0,0,9217,846,-1,-1,-1,-1,-1,-1,3186,492,24,1,3870,504,9657,942,-9,-9,7619,673,-1,-1,-1,90,1,451,16,0,0,20,0,0,0,2,0,0,0,0,0,2,1,-1,-1,0,0,24,1,-1,-1\n2000,NH,1,2117,130,8,14,3,11,2128,155,-9,-9,1911,112,98,4,99,2,5,0,14,0,0,0,-1,-1,-1,-1,0,0,10,2,2137,120,-1,-1,-1,-1,-1,-1,625,61,4,0,980,86,2500,-9,2286,-9,2216,-9,-1,-1,-1,0,0,35,9,0,0,2,0,1,0,1,0,0,0,0,0,0,0,-1,-1,0,0,4,0,-1,-1\n2000,NJ,1,22741,1320,-9,-9,-8,-8,22741,1320,-9,-9,5237,428,17691,1025,5090,189,9,0,88,8,0,0,-1,-1,-1,-1,18,0,1,0,28134,1650,-1,-1,-1,-1,-1,-1,7911,846,92,2,13867,1495,-9,-9,-9,-9,16389,733,-1,-1,-1,19,1,-9,-9,0,0,52,1,20,0,2,0,1,0,1,0,0,0,-1,-1,16,1,92,2,-1,-1\n2000,NM,4,2805,0,382,0,-9,-9,3187,0,-9,-9,1170,145,490,65,2859,246,219,43,7,0,7,3,-1,-1,-1,-1,51,0,28,9,4831,511,-1,-1,-1,-1,-1,-1,1939,292,11,0,2969,435,-8,-8,5423,313,5515,313,-1,-1,-1,1,0,250,0,-9,-9,-9,-9,-9,-9,-9,-9,-9,-9,-9,-9,-9,-9,-1,-1,-9,-9,-9,-9,-1,-1\n2000,NY,1,66875,3279,312,24,0,0,67187,3303,-9,-9,11258,630,33972,1747,20420,876,263,7,342,3,0,0,-1,-1,-1,-1,363,2,257,13,66875,3278,-1,-1,-1,-1,-1,-1,17226,1337,165,4,27711,2282,59462,3311,63921,3491,52646,2800,-1,-1,-1,252,12,8686,290,0,0,127,3,8,0,16,1,2,0,2,0,4,0,-1,-1,6,0,165,4,-1,-1\n2000,NC,3,25505,1324,3661,462,230,16,29396,1802,-9,-9,9328,853,18935,982,-9,-9,526,40,67,6,-9,-9,-1,-1,-1,-1,755,27,13,0,29624,1908,-1,-1,-1,-1,-1,-1,8376,687,52,3,8979,708,27635,1472,-9,-9,27635,1472,-1,-1,-1,254,9,322,10,1,0,59,3,-9,-9,4,0,1,0,0,0,0,0,-1,-1,-9,-9,65,3,-1,-1\n2000,ND,2,793,52,68,14,-8,-8,861,66,-9,-9,721,52,45,0,57,1,179,15,6,0,0,0,-1,-1,-1,-1,0,0,0,0,1008,68,-1,-1,-1,-1,-1,-1,440,38,2,0,540,64,910,95,857,95,910,95,-1,-1,-1,7,0,11,1,-8,-8,1,0,0,0,1,0,0,0,0,0,0,0,-1,-1,0,0,2,0,-1,-1\n2000,OH,2,40844,2743,-9,-9,-8,-8,40844,2743,-9,-9,19797,1332,22175,1429,788,37,88,4,43,3,0,0,-1,-1,-1,-1,0,0,134,3,43025,2808,-1,-1,-1,-1,-1,-1,16353,2348,118,9,22168,2628,37680,2247,-9,-9,-9,-9,-1,-1,-1,104,2,236,24,0,0,109,6,3,0,5,2,0,1,1,0,0,0,-1,-1,0,0,118,9,-1,-1\n2000,OK,3,13593,1413,-9,-9,-8,-8,13593,1413,-9,-9,11666,1379,6575,761,913,62,1561,184,33,4,0,0,-1,-1,-1,-1,0,0,39,4,20787,2394,-1,-1,-1,-1,-1,-1,6258,996,56,5,5751,957,-9,-9,20616,2534,-9,-9,-1,-1,-1,16,1,177,7,11,0,34,4,2,0,3,0,2,0,3,0,1,1,-1,-1,0,0,56,5,-1,-1\n2000,OR,4,9555,557,25,2,0,0,9580,559,-9,-9,7496,450,1040,89,1105,16,208,32,132,8,0,0,-1,-1,-1,-1,0,0,3,1,9984,596,-1,-1,-1,-1,-1,-1,2610,203,19,0,3132,272,-8,-8,9551,581,-9,-9,-1,-1,-1,14,0,360,2,0,0,16,0,0,0,3,0,0,0,0,0,0,0,-1,-1,0,0,19,0,-1,-1\n2000,PA,1,35207,1574,2,1,0,0,35209,1575,-9,-9,11820,676,19596,779,3615,108,68,5,151,4,0,0,-1,-1,-1,-1,0,0,18,7,35268,1579,-1,-1,-1,-1,-1,-1,6680,523,112,6,11140,748,24231,1459,31457,1723,24321,1459,-1,-1,-1,66,3,407,13,0,0,88,6,13,0,5,0,3,0,0,0,0,0,-1,-1,3,0,112,6,-1,-1\n2000,RI,1,1897,62,689,133,594,50,3180,245,-9,-9,1592,149,879,57,530,32,0,0,36,1,-9,-9,-1,-1,-1,-1,-9,-9,11,1,3048,240,-1,-1,-1,-1,-1,-1,3084,442,6,0,2807,416,3401,316,3401,316,3533,345,-1,-1,-1,3,1,-9,-9,-8,-8,1,0,0,0,4,0,0,0,0,0,0,0,-1,-1,1,0,6,0,-1,-1\n2000,SC,3,18829,1270,628,118,31,1,19488,1389,-9,-9,5676,550,14467,849,127,8,30,5,13,2,0,0,-1,-1,-1,-1,45,6,0,0,20358,1420,-1,-1,-1,-1,-1,-1,5502,633,58,2,7896,796,-9,-9,21895,1617,20838,1391,-1,-1,-1,127,4,111,4,1,0,48,1,5,2,3,0,0,0,1,0,0,0,-1,-1,0,0,58,3,-1,-1\n2000,SD,2,2353,191,3,0,0,0,2356,191,-9,-9,1804,128,105,2,0,0,507,70,0,0,0,0,-1,-1,-1,-1,0,0,0,0,2416,200,-1,-1,-1,-1,-1,-1,876,119,4,0,1170,165,-8,-8,2417,202,-8,-8,-1,-1,-1,8,0,26,0,0,0,2,0,0,0,2,0,0,0,0,0,0,0,-1,-1,0,0,4,0,-1,-1\n2000,TN,3,12576,876,-8,-8,30,1,12606,877,-9,-9,9464,785,11108,573,175,7,17,2,33,2,0,0,-1,-1,-1,-1,0,0,0,0,20797,1369,-1,-1,-1,-1,-1,-1,7799,1141,44,2,12447,1681,16967,991,16592,963,-9,-9,-1,-1,-1,20,2,97,5,1,0,39,2,0,0,3,0,0,0,1,0,0,0,-1,-1,0,0,44,2,-1,-1\n2000,TX,3,119975,8752,4702,1350,-8,-8,124677,9922,-9,-9,45363,4693,61861,5783,37901,1719,20,11,8,0,0,0,-1,-1,-1,-1,566,38,33,1,145752,12245,-1,-1,-1,-1,-1,-1,28272,3974,435,19,77391,9391,148853,12883,145876,12625,148853,12883,-1,-1,-1,253,10,5993,134,39,1,389,16,0,0,30,1,0,0,8,0,0,0,-1,-1,8,2,474,20,-1,-1\n2000,UT,4,3860,257,4,0,68,19,3932,276,-9,-9,3587,281,420,30,886,49,186,16,87,4,44,0,-1,-1,-1,-1,0,0,40,2,5250,382,-1,-1,-1,-1,-1,-1,1366,171,8,0,2554,350,-9,-9,4344,293,4573,308,-1,-1,-1,7,1,162,1,0,0,5,0,0,0,1,0,2,0,0,0,0,0,-1,-1,0,0,8,0,-1,-1\n2000,VT,1,892,44,128,17,210,19,1230,80,-9,-9,1407,72,75,2,0,0,13,0,9,0,0,0,-1,-1,-1,-1,0,0,113,6,1617,80,-1,-1,-1,-1,-1,-1,343,43,2,0,863,86,1226,75,1286,75,1127,57,-1,-1,-1,12,0,11,3,-8,-8,2,0,0,0,0,0,0,0,0,0,0,0,-1,-1,0,0,2,0,-1,-1\n2000,VA,3,26831,1901,374,67,-8,-8,27205,1968,-9,-9,9107,794,18709,1262,170,2,8,0,101,0,0,0,-1,-1,-1,-1,12,1,2,2,28109,2059,-1,-1,-1,-1,-1,-1,7809,1019,75,3,8146,1002,30001,2165,-8,-8,-8,-8,-1,-1,-1,34,4,-9,-9,8,0,45,2,5,0,4,0,1,0,0,0,0,0,-1,-1,12,1,75,3,-1,-1\n2000,WA,4,13652,1003,192,57,16,0,13860,1060,-9,-9,8218,657,3052,249,1737,87,443,45,371,14,0,0,-1,-1,-1,-1,29,13,0,0,13850,1065,-1,-1,-1,-1,-1,-1,5558,666,31,0,6028,877,8921,545,12832,730,12832,730,-1,-1,-1,78,4,1614,16,0,0,26,0,1,0,4,0,0,0,0,0,0,0,-1,-1,0,0,31,0,-1,-1\n2000,WV,3,2901,145,-8,-8,11,3,2912,148,-9,-9,2932,262,598,41,16,0,6,0,1,0,0,0,-1,-1,-1,-1,0,0,0,0,3553,303,-1,-1,-1,-1,-1,-1,953,136,14,2,1154,115,2985,138,3103,150,2985,138,-1,-1,-1,-8,-8,8,0,-8,-8,13,2,0,0,1,0,0,0,0,0,0,0,-1,-1,0,0,14,2,-1,-1\n2000,WI,2,13896,1197,22,0,384,7,14302,1204,-9,-9,8293,607,8851,628,1377,66,505,39,128,6,0,0,-1,-1,-1,-1,9,0,97,6,19260,1352,-1,-1,-1,-1,-1,-1,5408,544,31,2,7437,721,-9,-9,10917,822,-9,-9,-1,-1,-1,88,8,-9,-9,-8,-8,25,2,0,0,3,0,0,0,0,0,0,0,-1,-1,3,0,31,2,-1,-1\n2000,WY,4,1187,80,0,0,0,0,1187,80,-9,-9,1150,128,93,2,173,17,100,9,4,0,0,0,-1,-1,-1,-1,4,0,0,0,1524,156,-1,-1,-1,-1,-1,-1,400,83,7,0,631,71,1152,162,1162,141,1152,99,-1,-1,-1,2,0,38,0,0,0,4,0,0,0,2,0,0,0,1,0,0,0,-1,-1,0,0,7,0,-1,-1\n2000,ST,7,1019857,66825,18086,3652,11638,1450,1049581,71745,0,0,411671,35073,545537,35820,168968,7917,11611,1230,5276,309,2324,310,-1,-1,-1,-1,7243,370,1201,113,1153831,81140,-1,-1,-1,-1,-1,-1,312832,37599,2627,120,546125,61048,572217,38762,909395,63957,588161,42906,-1,-1,-1,3717,175,52206,1380,83,2,2105,96,162,10,180,9,24,1,43,0,11,2,-1,-1,189,13,2797,133,-1,-1\n2000,US,5,1120521,74073,20154,4169,24762,2369,1165437,80429,0,0,483637,41080,597595,39505,207998,10690,13770,1390,7359,492,2324,310,-1,-1,-1,-1,7243,370,1201,113,1321127,93948,-1,-1,-1,-1,-1,-1,348441,41293,2892,132,578058,65003,660237,46116,909395,63957,588161,42906,-1,-1,-1,3717,175,86130,3546,83,2,2337,106,183,10,193,9,28,1,48,0,11,2,-1,-1,189,13,3072,143,-1,-1\n2000,FE,6,100664,7248,2068,517,13124,919,115856,8684,-9,-9,71966,6007,52058,3685,39030,2773,2159,160,2083,183,0,0,-1,-1,-1,-1,0,0,0,0,167296,12808,-1,-1,-1,-1,-1,-1,35609,3694,265,12,31933,3955,88020,7354,-9,-9,-9,-9,-1,-1,-1,0,0,33924,2166,0,0,232,10,21,0,13,0,4,0,5,0,0,0,-1,-1,0,0,275,10,-1,-1\n2001,AL,3,22681,1555,432,73,0,0,23113,1628,-1,-1,8219,771,15384,890,0,0,2,0,2,0,0,0,-1,-1,-1,-1,73,1,0,0,23680,1662,-1,-1,-1,-1,-1,-1,5996,679,82,3,7222,878,22657,1591,-9,-9,11688,718,-1,-1,-1,76,1,76,0,0,0,82,3,0,0,0,0,0,0,0,0,0,0,-1,-1,0,0,82,3,-1,-1\n2001,AK,4,1162,96,392,48,1187,148,2741,292,-1,-1,1926,171,475,48,111,9,1607,122,89,9,0,0,-1,-1,-1,-1,0,0,4,0,4212,359,-1,-1,-1,-1,-1,-1,957,153,8,2,1837,243,-9,-9,-9,-9,-9,-9,-1,-1,-1,13,3,18,0,-8,-8,5,0,0,0,1,0,0,0,0,1,0,0,-1,-1,2,1,8,2,-1,-1\n2001,AZ,4,24502,1961,1040,207,0,0,25542,2168,-1,-1,11243,1187,3651,348,9055,471,1207,135,386,27,0,0,-1,-1,-1,-1,0,0,0,0,25542,2168,-1,-1,-1,-1,-1,-1,6931,796,66,1,8273,794,-9,-9,25556,2392,-9,-9,-1,-1,-1,138,4,2981,49,0,0,54,1,2,0,2,0,1,0,1,0,0,0,-1,-1,4,0,64,1,-1,-1\n2001,AR,3,10661,751,56,8,13,0,10730,759,-1,-1,5788,533,5892,313,37,3,5,1,8,0,0,0,-1,-1,-1,-1,0,0,12,1,11742,851,-1,-1,-1,-1,-1,-1,3605,444,48,0,5989,674,11299,747,10627,755,9985,662,-1,-1,-1,38,0,-9,-9,1,0,36,0,2,0,7,0,1,0,1,0,0,0,-1,-1,0,0,48,0,-1,-1\n2001,CA,4,145662,9375,-9,-9,1729,376,147391,9751,-1,-1,42165,3732,44862,3171,53005,2400,1371,123,1277,85,264,26,-1,-1,-1,-1,4447,214,0,0,147391,9751,-1,-1,-1,-1,-1,-1,33753,4170,275,11,117736,12672,-9,-9,141099,9437,73727,6230,-1,-1,-1,95,0,20127,489,1,0,190,10,15,0,29,1,12,0,12,0,0,0,-1,-1,16,0,275,11,-1,-1\n2001,CO,4,13530,1358,-9,-9,-8,-8,13530,1358,-1,-1,7234,664,3641,365,4710,294,338,40,150,12,0,0,-1,-1,-1,-1,0,0,0,0,16073,1375,-1,-1,-1,-1,-1,-1,4195,508,44,3,6242,758,-9,-9,11824,1098,10720,1028,-1,-1,-1,62,3,889,15,0,0,29,3,7,0,1,0,5,0,1,0,1,0,-1,-1,0,0,44,3,-1,-1\n2001,CT,1,11290,687,1833,238,3145,314,16268,1239,-1,-1,4819,542,8125,603,4715,296,32,3,58,3,0,0,-1,-1,-1,-1,0,0,0,0,17749,1447,-1,-1,-1,-1,-1,-1,4978,438,30,0,6026,643,-8,-8,-8,-8,-8,-8,-1,-1,-1,309,21,669,84,0,0,20,0,5,0,4,0,1,0,0,0,0,0,-1,-1,0,0,30,0,-1,-1\n2001,DE,3,3715,244,1395,204,1162,121,6272,569,-1,-1,2386,250,4024,337,0,0,1,0,1,4,0,0,-1,-1,-1,-1,0,0,0,0,6412,591,-1,-1,-1,-1,-1,-1,1187,190,10,0,2049,320,-9,-9,3934,272,2920,272,-1,-1,-1,25,1,91,4,2,0,6,0,7,0,3,0,0,0,0,0,0,0,-1,-1,0,0,18,0,-1,-1\n2001,DC,3,-8,-8,-8,-8,-8,-8,-8,-8,-1,-1,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-1,-1,-1,-1,-1,-1,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-1,-1,-1,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-1,-1,-8,-8,-8,-8,-1,-1\n2001,FL,3,68122,4282,0,0,-8,-8,68122,4282,-1,-1,24765,1910,36399,2045,6750,301,96,12,48,4,2,1,-1,-1,-1,-1,58,8,4,1,68122,4282,-1,-1,-1,-1,-1,-1,22513,2405,176,6,31057,3062,-9,-9,72143,4375,53114,3493,-1,-1,-1,366,29,4271,151,1,0,135,3,35,3,3,0,0,0,2,0,0,0,-1,-1,1,0,177,6,-1,-1\n2001,GA,3,43075,2829,28,5,-8,-8,43103,2834,-1,-1,14500,1251,27390,1475,523,21,61,4,54,4,0,0,-1,-1,-1,-1,0,0,0,0,42528,2755,-1,-1,-1,-1,-1,-1,12751,1505,97,3,14262,1740,-9,-9,-9,-9,-9,-9,-1,-1,-1,57,2,744,24,4,0,71,1,13,2,7,0,0,0,2,0,0,0,-1,-1,0,0,97,3,-1,-1\n2001,HI,4,1987,287,463,91,952,85,3402,463,-1,-1,1092,174,202,19,118,10,27,3,989,98,2141,285,-1,-1,-1,-1,213,22,33,5,4815,616,-1,-1,-1,-1,-1,-1,585,117,7,0,1342,259,-8,-8,3406,-9,2481,-9,-1,-1,-1,3,0,64,8,-8,-8,5,0,0,0,1,0,1,0,0,0,0,0,-1,-1,0,0,7,0,-1,-1\n2001,ID,4,3624,298,-8,-8,-8,-8,3624,298,-1,-1,3854,450,82,10,790,49,192,22,32,3,0,0,-1,-1,-1,-1,18,0,35,7,5003,541,-1,-1,-1,-1,-1,-1,1960,420,18,0,2143,396,3727,253,3541,240,3019,175,-1,-1,-1,8,0,-9,-9,0,0,17,0,0,0,1,0,0,0,0,0,0,0,-1,-1,0,0,18,0,-1,-1\n2001,IL,2,41601,2747,-9,-9,0,0,41601,2747,-1,-1,10597,767,26510,1791,4366,168,50,15,77,6,0,0,-1,-1,-1,-1,0,0,1,0,41601,2747,-1,-1,-1,-1,-1,-1,17824,2261,83,3,32720,3788,32473,2102,32473,2102,27715,2076,-1,-1,-1,108,2,349,28,0,0,57,1,11,0,8,2,1,0,2,0,1,0,-1,-1,3,0,83,3,-1,-1\n2001,IN,2,17237,1411,4,0,71,8,17312,1419,-1,-1,10768,901,8005,602,581,32,44,5,26,2,0,0,-1,-1,-1,-1,0,0,0,0,19424,1542,-1,-1,-1,-1,-1,-1,10318,1379,45,3,10815,1404,14288,1123,18964,1564,-9,-9,-1,-1,-1,65,1,198,1,2,0,42,2,1,1,1,0,0,0,1,0,0,0,-1,-1,0,0,47,3,-1,-1\n2001,IA,2,7327,635,-8,-8,-8,-8,7327,635,-1,-1,5098,484,1688,123,379,13,96,10,50,1,0,0,-1,-1,-1,-1,16,3,0,1,7327,635,-1,-1,-1,-1,-1,-1,2930,396,8,1,4839,537,6229,543,6229,543,6229,543,-1,-1,-1,18,1,-9,-9,-8,-8,6,1,0,0,2,0,0,0,0,0,0,0,-1,-1,0,0,8,1,-1,-1\n2001,KS,2,8074,500,-8,-8,-8,-8,8074,500,-1,-1,4362,281,2839,180,613,17,166,17,69,2,0,0,-1,-1,-1,-1,0,0,31,0,8080,497,-1,-1,-1,-1,-1,-1,2639,350,21,0,3821,452,8182,634,-8,-8,-8,-8,-1,-1,-1,12,1,184,10,0,0,18,0,0,0,2,0,0,0,0,0,0,0,-1,-1,1,0,21,0,-1,-1\n2001,KY,3,8971,623,64,29,4,1,9039,653,-1,-1,9392,794,4738,336,132,3,3,0,4,3,0,0,-1,-1,-1,-1,0,0,17,2,14286,1138,-1,-1,-1,-1,-1,-1,4748,767,39,1,7340,1005,10985,695,10757,673,-8,-8,-1,-1,-1,0,0,-9,-9,0,0,36,1,0,0,1,0,0,0,2,0,0,0,-1,-1,0,0,39,1,-1,-1\n2001,LA,3,18622,1038,0,0,0,0,18622,1038,-1,-1,8223,581,25165,1777,0,0,6,1,0,0,0,0,-1,-1,-1,-1,54,3,0,0,33448,2362,-1,-1,-1,-1,-1,-1,5430,419,72,5,14247,1006,18622,1038,18941,990,-8,-8,-1,-1,-1,33,1,133,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-1,-1,0,0,72,5,-1,-1\n2001,ME,1,1549,52,59,4,0,0,1608,56,-1,-1,1306,41,47,3,8,1,23,0,6,0,0,0,-1,-1,-1,-1,250,14,5,0,1645,59,-1,-1,-1,-1,-1,-1,445,24,8,0,751,50,1381,47,1573,68,1407,53,-1,-1,-1,0,0,9,1,-8,-8,8,0,0,0,0,0,0,0,0,0,0,0,-1,-1,0,0,8,0,-1,-1\n2001,MD,3,21548,1058,763,138,103,1,22414,1197,-1,-1,4971,315,17504,885,0,0,15,1,26,4,0,0,-1,-1,-1,-1,0,0,29,2,22545,1207,-1,-1,-1,-1,-1,-1,5778,643,67,1,9258,924,-8,-8,22658,1216,-9,-9,-1,-1,-1,55,2,445,23,0,0,41,0,10,1,8,0,0,0,1,0,0,0,-1,-1,9,0,69,1,-1,-1\n2001,MA,1,8549,424,184,120,763,163,9496,707,-1,-1,4481,418,2721,124,2488,158,40,2,113,2,0,0,-1,-1,-1,-1,30,6,2,3,9875,713,-1,-1,-1,-1,-1,-1,1342,428,29,0,2425,299,-8,-8,-8,-8,8365,561,-1,-1,-1,11,6,-9,-9,-8,-8,29,0,0,0,2,0,0,0,0,0,0,0,-1,-1,0,0,31,0,-1,-1\n2001,MI,2,46251,2149,-8,-8,-8,-8,46251,2149,-1,-1,19446,933,25597,1156,1214,39,249,16,93,4,0,0,-1,-1,-1,-1,100,1,1,0,46700,2149,-1,-1,-1,-1,-1,-1,7745,614,110,4,11843,1007,-9,-9,47147,2177,-9,-9,-1,-1,-1,48,5,497,10,-8,-8,96,3,5,0,7,1,0,0,0,0,0,0,-1,-1,2,0,110,4,-1,-1\n2001,MN,2,6050,347,-8,-8,9,0,6059,347,-1,-1,3368,236,2310,102,0,0,399,39,144,6,0,0,-1,-1,-1,-1,0,0,2,0,6223,383,-1,-1,-1,-1,-1,-1,2788,286,13,0,3900,360,6216,366,6216,366,6216,366,-1,-1,-1,13,1,-9,-9,-8,-8,13,0,0,0,0,0,0,0,0,0,0,0,-1,-1,0,0,13,0,-1,-1\n2001,MS,3,9856,1264,305,72,-8,-8,10161,1336,-1,-1,5351,696,14179,1107,74,9,17,6,15,5,0,0,-1,-1,-1,-1,0,0,1,0,19637,1823,-1,-1,-1,-1,-1,-1,5372,626,39,3,5121,588,-8,-8,-9,-9,-9,-9,-1,-1,-1,86,4,-9,-9,0,0,33,3,2,0,2,0,1,1,0,0,0,0,-1,-1,0,0,38,4,-1,-1\n2001,MO,2,26442,2112,18,2,0,0,26460,2115,-1,-1,14773,1357,11302,739,390,18,117,8,41,1,0,0,-1,-1,-1,-1,0,0,10,1,26633,2124,-1,-1,-1,-1,-1,-1,7562,1106,62,2,12881,1776,-9,-9,26889,2273,-9,-9,-1,-1,-1,49,1,341,14,1,0,46,2,2,0,5,0,1,0,0,0,0,0,-1,-1,1,0,62,2,-1,-1\n2001,MT,4,1572,136,-9,-9,-9,-9,1572,136,-1,-1,2288,246,59,4,84,11,518,100,9,1,0,0,-1,-1,-1,-1,7,1,0,0,2965,363,-1,-1,-1,-1,-1,-1,1115,188,8,0,1131,145,-8,-8,1300,70,850,46,-1,-1,-1,0,0,11,0,0,0,7,0,0,0,1,0,0,0,0,0,0,0,-1,-1,0,0,8,0,-1,-1\n2001,NE,2,3459,318,52,11,58,17,3569,346,-1,-1,2091,224,914,75,403,14,169,22,17,2,0,0,-1,-1,-1,-1,0,2,1,3,3595,342,-1,-1,-1,-1,-1,-1,1363,208,8,0,1600,155,-8,-8,3750,173,3192,139,-1,-1,-1,24,0,158,2,0,0,7,0,0,0,1,0,0,0,0,0,0,0,-1,-1,0,0,8,0,-1,-1\n2001,NV,4,9022,282,75,0,4,1,9101,283,-1,-1,5078,555,2567,224,1362,39,160,13,116,9,0,0,-1,-1,-1,-1,109,1,0,0,9392,841,-1,-1,-1,-1,-1,-1,3032,421,28,0,3937,543,9696,852,-9,-9,7669,643,-1,-1,-1,66,1,969,27,1,0,23,0,1,0,2,0,0,0,1,0,0,0,-1,-1,0,0,28,0,-1,-1\n2001,NH,1,2251,129,6,7,4,22,2261,158,-1,-1,2093,121,118,5,0,0,7,0,12,0,0,0,-1,-1,-1,-1,0,0,33,3,2263,129,-1,-1,-1,-1,-1,-1,700,91,3,0,943,103,2261,158,2066,172,2041,172,-1,-1,-1,2,2,31,2,0,0,2,0,0,0,0,0,0,0,0,0,0,0,-1,-1,0,0,2,0,-1,-1\n2001,NJ,1,22145,1287,-9,-9,-8,-8,22145,1287,-1,-1,4892,440,16836,1005,4680,176,9,0,85,7,0,0,-1,-1,-1,-1,12,0,0,0,26514,1628,-1,-1,-1,-1,-1,-1,8524,814,66,5,14687,1377,-9,-9,-9,-9,16389,733,-1,-1,-1,28,0,-9,-9,0,0,39,5,19,0,1,0,0,0,0,0,1,0,-1,-1,6,0,66,5,-1,-1\n2001,NM,4,3031,0,130,0,23,0,3184,0,-1,-1,1212,153,511,58,3101,258,291,39,9,0,3,2,-1,-1,-1,-1,0,0,24,7,5151,517,-1,-1,-1,-1,-1,-1,2013,267,12,0,2867,355,5519,587,5519,587,5384,602,-1,-1,-1,8,1,202,11,1,0,7,0,0,0,2,0,0,0,2,0,0,0,-1,-1,0,0,12,0,-1,-1\n2001,NY,1,64262,3133,129,30,0,0,64391,3163,-1,-1,11103,669,32603,1648,19327,802,259,3,354,2,0,0,-1,-1,-1,-1,380,2,235,7,64261,3133,-1,-1,-1,-1,-1,-1,15287,1212,172,7,27131,2053,58593,3251,61197,3295,51797,2730,-1,-1,-1,246,8,8385,270,0,0,130,6,24,1,8,0,6,0,1,0,2,0,-1,-1,1,0,172,7,-1,-1\n2001,NC,3,26081,1365,3898,564,267,28,30246,1957,-1,-1,9570,943,19043,987,0,0,549,48,89,6,0,0,-1,-1,-1,-1,795,31,69,27,30211,2042,-1,-1,-1,-1,-1,-1,8213,638,72,1,8396,634,27468,1786,-8,-8,27468,1786,-1,-1,-1,203,9,323,10,5,0,61,1,0,0,4,0,1,0,0,0,0,0,-1,-1,1,0,72,1,-1,-1\n2001,ND,2,836,98,96,14,-8,-8,932,112,-1,-1,682,89,49,1,89,0,185,20,5,0,0,0,-1,-1,-1,-1,0,0,0,0,1010,110,-1,-1,-1,-1,-1,-1,519,95,3,0,649,66,910,95,857,95,910,95,-1,-1,-1,2,0,10,0,-8,-8,3,0,0,0,0,0,0,0,0,0,0,0,-1,-1,0,0,3,0,-1,-1\n2001,OH,2,40192,2752,-9,-9,-8,-8,40192,2752,-1,-1,19655,1369,21778,1417,764,37,85,3,43,3,0,0,-1,-1,-1,-1,0,0,127,0,42452,2829,-1,-1,-1,-1,-1,-1,16693,2388,114,5,22325,2634,37403,2247,-9,-9,-9,-9,-1,-1,-1,80,1,352,22,1,0,106,5,0,0,5,0,1,0,1,0,0,0,-1,-1,0,0,114,5,-1,-1\n2001,OK,3,13656,1405,-9,-9,-8,-8,13656,1405,-1,-1,11669,1341,6225,673,893,56,1617,216,45,2,0,0,-1,-1,-1,-1,0,0,41,2,20490,2290,-1,-1,-1,-1,-1,-1,6125,1072,71,6,7059,1307,-8,-8,20770,2534,-8,-8,-1,-1,-1,9,0,139,5,15,3,41,3,1,0,4,0,3,0,1,0,0,0,-1,-1,6,0,71,6,-1,-1\n2001,OR,4,10292,617,39,2,0,0,10331,619,-1,-1,8022,530,1176,75,1199,9,213,40,134,6,0,0,-1,-1,-1,-1,0,0,5,1,10749,661,-1,-1,-1,-1,-1,-1,2870,282,21,2,3415,295,-8,-8,10611,687,10321,687,-1,-1,-1,11,0,420,1,0,0,18,2,1,0,2,0,0,0,0,0,0,0,-1,-1,0,0,21,2,-1,-1\n2001,PA,1,35498,1638,5,0,0,0,35503,1638,-1,-1,12150,743,19991,796,3962,152,73,7,153,6,0,0,-1,-1,-1,-1,0,0,22,7,36351,1711,-1,-1,-1,-1,-1,-1,6946,589,116,8,9957,689,31955,1802,31955,1802,24648,1538,-1,-1,-1,54,1,450,8,0,0,80,7,15,0,4,0,2,0,0,0,2,0,-1,-1,13,1,116,8,-1,-1\n2001,RI,1,1837,53,649,93,680,52,3166,198,-1,-1,975,60,1501,107,526,24,9,1,35,0,-9,-9,-1,-1,-1,-1,-9,-9,2,1,3048,193,-1,-1,-1,-1,-1,-1,2974,368,3,0,2785,412,3355,337,3355,337,3563,340,-1,-1,-1,3,0,-9,-9,-8,-8,2,0,1,0,0,0,0,0,0,0,0,0,-1,-1,0,0,3,0,-1,-1\n2001,SC,3,19417,1317,798,155,25,1,20240,1473,-1,-1,6382,636,14439,853,143,5,35,5,15,1,0,0,-1,-1,-1,-1,53,9,0,0,21067,1509,-1,-1,-1,-1,-1,-1,5979,613,66,4,7909,743,-8,-8,21688,1637,20463,1398,-1,-1,-1,130,3,130,4,0,0,62,4,4,1,1,0,1,0,1,0,0,0,-1,-1,0,0,69,5,-1,-1\n2001,SD,2,2500,239,8,1,16,4,2524,240,-1,-1,1876,151,111,4,0,0,583,65,0,0,0,0,-1,-1,-1,-1,0,0,0,0,2570,220,-1,-1,-1,-1,-1,-1,879,139,4,0,1190,198,-9,-9,2483,230,-9,-9,-1,-1,-1,4,0,29,2,0,0,2,0,0,0,2,0,0,0,0,0,0,0,-1,-1,0,0,4,0,-1,-1\n2001,TN,3,12878,885,-8,-8,25,0,12903,885,-1,-1,10244,867,11672,591,231,7,20,1,36,2,0,0,-1,-1,-1,-1,0,0,0,0,22203,1468,-1,-1,-1,-1,-1,-1,7723,1043,58,1,11300,1595,17171,991,16766,963,-9,-9,-1,-1,-1,35,6,86,0,0,0,53,1,0,0,1,0,1,0,3,0,0,0,-1,-1,0,0,58,1,-1,-1\n2001,TX,3,118155,7716,4961,1317,-8,-8,123116,9033,-1,-1,46192,4942,62030,5453,40823,1909,18,11,2,0,0,0,-1,-1,-1,-1,630,54,6,0,149701,12369,-1,-1,-1,-1,-1,-1,38143,5167,413,13,58528,7700,142578,14160,139251,13848,142578,14160,-1,-1,-1,203,5,7178,154,17,0,339,10,31,1,19,2,3,0,4,0,0,0,-1,-1,0,0,413,13,-1,-1\n2001,UT,4,3837,233,8,0,59,8,3904,241,-1,-1,3389,232,407,21,860,46,192,13,130,3,0,0,-1,-1,-1,-1,0,0,46,0,5024,315,-1,-1,-1,-1,-1,-1,1209,165,5,0,2771,380,-8,-8,4006,280,4213,296,-1,-1,-1,7,1,197,2,0,0,5,0,0,0,0,0,0,0,0,0,0,0,-1,-1,0,0,5,0,-1,-1\n2001,VT,1,915,57,92,9,298,29,1305,95,-1,-1,1427,85,88,6,0,0,18,0,9,0,0,0,-1,-1,-1,-1,0,0,104,4,1646,95,-1,-1,-1,-1,-1,-1,307,46,4,0,981,96,1266,45,1316,45,1175,45,-1,-1,-1,8,0,6,0,-8,-8,4,0,0,0,0,0,0,0,0,0,0,0,-1,-1,0,0,4,0,-1,-1\n2001,VA,3,27794,2112,0,0,-8,-8,27794,2112,-1,-1,9608,911,19458,1317,226,5,7,1,107,6,13,0,-1,-1,-1,-1,0,0,3,0,29422,2240,-1,-1,-1,-1,-1,-1,8821,1174,71,0,8778,1038,29952,2165,-8,-8,-8,-8,-1,-1,-1,28,3,-9,-9,2,0,32,0,9,0,2,0,0,0,0,0,0,0,-1,-1,28,0,73,0,-1,-1\n2001,WA,4,13961,1048,111,28,66,12,14138,1088,-1,-1,8488,681,3022,228,1684,97,469,54,387,13,0,0,-1,-1,-1,-1,29,6,1,0,14080,1079,-1,-1,-1,-1,-1,-1,5648,731,33,1,6174,884,9404,494,12139,654,12139,654,-1,-1,-1,66,0,1347,23,1,0,27,1,0,0,3,0,0,0,0,0,1,0,-1,-1,1,0,33,1,-1,-1\n2001,WV,3,3176,204,-8,-8,20,3,3196,207,-1,-1,3214,294,623,52,19,0,12,0,1,0,0,0,-1,-1,-1,-1,0,0,0,0,3869,346,-1,-1,-1,-1,-1,-1,1080,70,18,0,1340,86,-8,-8,3320,219,2970,219,-1,-1,-1,-8,-8,10,0,-8,-8,17,0,0,0,1,0,0,0,0,0,0,0,-1,-1,0,0,18,0,-1,-1\n2001,WI,2,15618,1255,10,5,434,15,16062,1275,-1,-1,10000,642,9443,613,0,0,578,44,152,6,0,0,-1,-1,-1,-1,0,0,53,2,20226,1307,-1,-1,-1,-1,-1,-1,4802,446,48,0,6355,672,-9,-9,12820,952,-9,-9,-1,-1,-1,85,7,-9,-9,-8,-8,33,0,1,0,6,0,0,0,0,0,0,0,-1,-1,8,0,48,0,-1,-1\n2001,WY,4,929,92,0,0,0,0,929,92,-1,-1,1171,109,80,3,201,15,90,8,6,0,0,0,-1,-1,-1,-1,0,0,1,0,1549,135,-1,-1,-1,-1,-1,-1,504,77,5,0,634,100,998,116,946,106,1029,112,-1,-1,-1,2,0,47,0,0,0,3,0,0,0,1,0,1,0,0,0,0,0,-1,-1,0,0,5,0,-1,-1\n2001,ST,7,1025402,66454,18103,3475,11117,1409,1054622,71335,-1,-1,423598,36472,537476,34765,170636,7974,12330,1299,5709,360,2423,314,-1,-1,-1,-1,7274,378,960,87,1160502,81649,-1,-1,-1,-1,-1,-1,325801,39428,2879,105,536981,59895,514588,38225,820092,59227,556385,42572,-1,-1,-1,2992,137,52566,1465,55,3,2178,79,224,10,167,6,43,1,39,1,8,0,-1,-1,103,2,2895,107,-1,-1\n2001,US,5,1131510,74105,20172,4035,24333,2406,1182530,80543,-1,-1,504868,43075,597761,38757,170636,7974,14607,1478,7897,559,2423,314,-1,-1,-1,-1,7274,378,960,87,1306522,92622,-1,-1,-1,-1,-1,-1,361887,43535,3167,122,571680,63881,606799,46213,820092,59227,556385,42572,-1,-1,-1,2992,137,84196,3721,57,3,2411,93,245,11,185,6,49,1,47,1,8,0,-1,-1,103,2,3183,122,-1,-1\n2001,FE,6,106108,7651,2069,560,13216,997,127908,9208,-1,-1,81270,6603,60285,3992,0,0,2277,179,2188,199,0,0,-1,-1,-1,-1,0,0,0,0,146020,10973,-1,-1,-1,-1,-1,-1,36086,4107,288,17,34699,3986,92211,7988,-8,-8,-8,-8,-1,-1,-1,0,0,31630,2256,2,0,233,14,21,1,18,0,6,0,8,0,0,0,-1,-1,0,0,288,15,-1,-1\n2002,AL,3,23113,1596,340,51,0,0,23453,1647,-1,-1,9417,859,16753,838,0,0,3,0,3,0,0,0,-1,-1,-1,-1,0,0,74,0,26250,1697,-1,-1,-1,-1,-1,-1,5439,696,87,1,6856,818,-8,-8,-9,-9,11688,771,-1,-1,-1,56,1,72,0,1,1,74,0,12,0,0,0,1,0,0,0,0,0,-1,-1,0,0,88,1,-1,-1\n2002,AK,4,1472,120,173,18,1081,127,2726,265,-1,-1,1833,163,459,31,130,19,1533,125,81,10,0,0,-1,-1,-1,-1,0,0,13,1,4049,349,-1,-1,-1,-1,-1,-1,957,153,8,2,1837,243,2801,297,2895,311,-9,-9,-1,-1,-1,8,0,13,1,-8,-8,6,1,0,0,2,0,4,0,0,0,0,0,-1,-1,0,0,12,1,-1,-1\n2002,AZ,4,25803,2205,1128,223,0,0,26931,2428,-1,-1,11804,1342,3720,320,9712,583,1274,154,421,29,0,0,-1,-1,-1,-1,0,0,0,0,26931,2428,-1,-1,-1,-1,-1,-1,7885,1044,68,6,9082,998,23786,2442,26910,2496,22988,2358,-1,-1,-1,146,1,3347,65,0,0,62,5,2,1,4,0,0,0,0,0,0,0,-1,-1,0,0,68,6,-1,-1\n2002,AR,3,11008,786,44,5,4,2,11056,793,-1,-1,6090,546,6093,307,39,0,3,1,9,0,0,0,-1,-1,-1,-1,0,0,3,0,12237,854,-1,-1,-1,-1,-1,-1,3389,398,33,1,7140,540,11187,785,11404,785,10599,700,-1,-1,-1,30,1,-9,-9,0,0,34,1,0,0,0,0,0,0,0,0,0,0,-1,-1,0,0,34,1,-1,-1\n2002,CA,4,148328,9426,-9,-9,1571,370,149899,9796,-1,-1,42714,3804,44807,3027,54787,2509,1428,134,1276,89,272,27,-1,-1,-1,-1,4615,206,0,0,149899,9796,-1,-1,-1,-1,-1,-1,34464,4141,322,16,109214,10914,-9,-9,145363,9724,74357,6230,-1,-1,-1,111,1,18984,434,1,0,265,16,20,0,22,0,5,0,9,0,0,0,-1,-1,0,0,322,16,-1,-1\n2002,CO,4,14646,1538,-9,-9,-9,-9,14646,1538,-1,-1,7855,801,3788,362,5103,346,357,46,164,11,0,0,-1,-1,-1,-1,0,0,0,0,17267,1566,-1,-1,-1,-1,-1,-1,4774,601,52,5,6220,724,-9,-9,12738,1187,11494,1099,-1,-1,-1,62,1,1052,14,0,0,38,4,1,0,8,0,4,1,1,0,0,0,-1,-1,0,0,52,5,-1,-1\n2002,CT,1,11874,778,2107,329,3305,323,17286,1430,-1,-1,5303,686,8526,683,5101,318,30,5,66,2,0,0,-1,-1,-1,-1,0,0,0,0,19026,1694,-1,-1,-1,-1,-1,-1,5380,512,30,0,5890,646,-8,-8,-8,-8,-8,-8,-1,-1,-1,353,13,833,92,0,0,18,0,6,0,5,0,1,0,0,0,0,0,-1,-1,0,0,30,0,-1,-1\n2002,DE,3,3368,212,1731,198,1015,113,6114,523,-1,-1,2271,243,3997,304,0,0,2,0,2,3,0,0,-1,-1,-1,-1,0,0,3,0,6275,550,-1,-1,-1,-1,-1,-1,2349,293,8,0,3640,515,-9,-9,3934,272,2920,272,-1,-1,-1,24,1,92,8,0,0,6,0,1,0,1,0,0,0,0,0,0,0,-1,-1,0,0,8,0,-1,-1\n2002,DC,3,-8,-8,-8,-8,-8,-8,-8,-8,-1,-1,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-1,-1,-1,-1,-1,-1,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-1,-1,-1,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-1,-1,-8,-8,-8,-8,-1,-1\n2002,FL,3,70610,4594,5,1,-8,-8,70615,4595,-1,-1,26139,2104,37163,2145,7099,319,100,18,51,2,3,0,-1,-1,-1,-1,57,7,3,0,70615,4595,-1,-1,-1,-1,-1,-1,23925,2632,174,12,30732,3095,-9,-9,73852,4953,54414,3982,-1,-1,-1,286,20,4357,169,2,1,127,5,32,4,8,0,4,1,1,0,0,0,-1,-1,1,1,175,12,-1,-1\n2002,GA,3,44297,3127,19,2,-8,-8,44316,3129,-1,-1,15414,1398,27777,1676,876,39,60,3,47,5,0,0,-1,-1,-1,-1,0,0,142,8,44316,3129,-1,-1,-1,-1,-1,-1,13714,1860,104,6,15053,1888,-8,-8,44323,3383,-8,-8,-1,-1,-1,37,2,736,35,4,0,76,4,14,2,4,0,0,0,3,0,0,0,-1,-1,3,0,104,6,-1,-1\n2002,HI,4,2084,280,436,75,716,131,3236,486,-1,-1,1082,188,226,26,170,15,30,6,1007,114,2145,308,-1,-1,-1,-1,53,5,41,7,4754,669,-1,-1,-1,-1,-1,-1,674,130,10,0,1477,267,-9,-9,3406,-7,-9,-9,-1,-1,-1,3,0,70,6,-8,-8,11,0,1,0,1,0,0,0,0,0,0,0,-1,-1,0,0,13,0,-1,-1\n2002,ID,4,3718,467,-8,-8,-8,-8,3718,467,-1,-1,4261,503,95,12,897,73,220,35,43,1,0,0,-1,-1,-1,-1,21,2,36,4,5573,630,-1,-1,-1,-1,-1,-1,2205,472,9,0,2425,439,5387,484,5073,471,4269,295,-1,-1,-1,5,0,250,0,0,0,7,0,0,0,2,0,0,0,0,0,0,0,-1,-1,0,0,9,0,-1,-1\n2002,IL,2,40173,2520,-9,-9,0,0,40173,2520,-1,-1,10587,791,25034,1546,4416,160,42,16,93,7,0,0,-1,-1,-1,-1,0,0,1,0,40173,2520,-1,-1,-1,-1,-1,-1,20227,2552,73,1,32576,3738,29301,2050,29301,2050,25232,2024,-1,-1,-1,109,2,294,30,0,0,57,1,5,0,7,0,2,0,0,0,1,0,-1,-1,1,0,73,1,-1,-1\n2002,IN,2,17937,1500,2,0,62,5,18001,1505,-1,-1,11169,961,8147,590,635,24,45,6,32,2,0,0,-1,-1,-1,-1,0,0,0,0,20028,1583,-1,-1,-1,-1,-1,-1,10965,1462,48,2,11798,1553,14736,1123,19378,1661,-9,-9,-1,-1,-1,41,1,246,4,0,0,44,2,0,0,3,0,0,0,1,0,0,0,-1,-1,0,0,48,2,-1,-1\n2002,IA,2,7695,703,-8,-8,-8,-8,7695,703,-1,-1,5389,528,1710,142,396,13,114,16,65,1,0,0,-1,-1,-1,-1,20,2,1,1,7695,703,-1,-1,-1,-1,-1,-1,3087,465,11,0,5083,687,6229,543,6229,543,6229,543,-1,-1,-1,12,1,-9,-9,-8,-8,8,0,0,0,1,0,0,0,0,0,0,0,-1,-1,2,0,11,0,-1,-1\n2002,KS,2,8406,561,-8,-8,-8,-8,8406,561,-1,-1,4581,298,2924,202,658,21,143,14,60,2,0,0,-1,-1,-1,-1,0,0,32,0,8398,537,-1,-1,-1,-1,-1,-1,3029,400,21,1,4053,473,8482,632,-9,-9,-9,-9,-1,-1,-1,12,0,198,6,0,0,19,1,0,0,1,0,0,0,0,0,0,0,-1,-1,1,0,21,1,-1,-1\n2002,KY,3,9196,683,50,19,0,0,9246,702,-1,-1,9698,947,4767,326,142,4,6,0,10,1,0,0,-1,-1,-1,-1,0,0,19,3,14642,1281,-1,-1,-1,-1,-1,-1,5319,893,55,4,7402,1015,-9,-9,11444,718,-9,-9,-1,-1,-1,0,0,-9,-9,0,0,42,0,0,0,1,0,0,0,0,0,0,0,-1,-1,12,4,55,4,-1,-1\n2002,LA,3,18976,1034,0,0,0,0,18976,1034,-1,-1,8139,817,25421,1576,10,0,12,2,1,0,0,0,-1,-1,-1,-1,51,3,0,0,33634,2398,-1,-1,-1,-1,-1,-1,8655,1099,85,6,13493,1455,18654,1034,19040,970,-9,-9,-1,-1,-1,55,1,106,7,1,0,0,0,0,0,0,0,0,0,0,0,0,0,-1,-1,0,0,85,6,-1,-1\n2002,ME,1,1690,74,73,10,0,0,1763,84,-1,-1,1440,59,62,2,9,1,15,0,6,0,0,0,-1,-1,-1,-1,273,28,5,0,1810,90,-1,-1,-1,-1,-1,-1,547,44,6,0,824,49,1697,82,1697,82,1697,82,-1,-1,-1,1,0,6,1,-8,-8,5,0,0,0,1,0,0,0,0,0,0,0,-1,-1,0,0,6,0,-1,-1\n2002,MD,3,21906,1109,737,142,92,1,22735,1252,-1,-1,4995,353,17834,902,0,0,11,3,33,4,0,0,-1,-1,-1,-1,0,0,25,2,22898,1264,-1,-1,-1,-1,-1,-1,6096,633,69,1,8937,812,-9,-9,22990,1273,-9,-9,-1,-1,-1,80,0,449,21,0,0,39,2,11,0,5,0,1,0,4,0,1,0,-1,-1,8,0,69,2,-1,-1\n2002,MA,1,8176,373,23,170,984,153,9183,696,-1,-1,4251,448,2708,114,2450,139,47,2,108,1,1,0,-1,-1,-1,-1,0,0,60,0,9625,704,-1,-1,-1,-1,-1,-1,1211,335,7,0,1925,449,-9,-9,-9,-9,7129,592,-1,-1,-1,9,2,-9,-9,-8,-8,19,0,0,0,1,0,0,0,0,0,0,0,-1,-1,0,0,20,0,-1,-1\n2002,MI,2,47864,2267,-8,-8,-8,-8,47864,2267,-1,-1,20360,1024,26273,1181,1212,34,289,21,98,4,0,0,-1,-1,-1,-1,91,3,1,0,48324,2267,-1,-1,-1,-1,-1,-1,8794,779,114,3,12212,1091,-8,-8,49059,2370,-8,-8,-1,-1,-1,103,3,537,9,-8,-8,98,1,2,0,3,0,0,0,0,0,1,0,-1,-1,10,2,114,3,-1,-1\n2002,MN,2,6430,416,-8,-8,8,1,6438,417,-1,-1,3698,278,2392,125,0,0,429,45,153,6,0,0,-1,-1,-1,-1,0,0,2,1,6674,455,-1,-1,-1,-1,-1,-1,3173,387,14,1,4289,426,6642,422,6642,422,6642,422,-1,-1,-1,13,1,143,7,-8,-8,12,1,0,0,1,0,1,0,0,0,0,0,-1,-1,0,0,14,1,-1,-1\n2002,MS,3,10108,1414,324,74,-8,-8,10432,1488,-1,-1,5088,660,13052,990,83,7,20,1,18,3,0,0,-1,-1,-1,-1,1,0,0,0,18262,1661,-1,-1,-1,-1,-1,-1,4897,554,34,2,4988,604,-9,-9,21011,-7,-9,-9,-1,-1,-1,104,3,-9,-9,2,0,34,2,0,0,0,0,0,0,1,0,0,0,-1,-1,0,0,37,2,-1,-1\n2002,MO,2,27530,2246,14,5,0,0,27544,2251,-1,-1,15490,1457,11775,775,390,26,117,12,44,4,0,0,-1,-1,-1,-1,0,0,9,0,27825,2274,-1,-1,-1,-1,-1,-1,8449,1266,71,0,14136,1961,-8,-8,28169,2411,-8,-8,-1,-1,-1,53,3,372,21,6,0,61,0,2,0,1,0,0,0,1,0,0,0,-1,-1,0,0,71,0,-1,-1\n2002,MT,4,1701,206,-9,-9,-8,-8,1701,206,-1,-1,2248,218,69,4,86,11,565,110,3,0,0,0,-1,-1,-1,-1,7,2,0,0,2978,345,-1,-1,-1,-1,-1,-1,1123,155,8,0,1369,187,-9,-9,1400,200,-9,-9,-1,-1,-1,0,0,9,0,0,0,7,0,0,0,1,0,0,0,0,0,0,0,-1,-1,0,0,8,0,-1,-1\n2002,NE,2,3521,332,57,14,104,20,3682,366,-1,-1,2160,236,937,76,412,18,169,20,28,1,0,0,-1,-1,-1,-1,0,1,0,0,3706,352,-1,-1,-1,-1,-1,-1,1489,204,8,0,1648,220,-8,-8,3750,174,3000,139,-1,-1,-1,15,2,172,1,0,0,8,0,0,0,0,0,0,0,0,0,0,0,-1,-1,0,0,8,0,-1,-1\n2002,NV,4,9222,356,84,0,5,0,9311,356,-1,-1,5215,557,2555,215,1430,50,173,15,142,12,112,1,-1,-1,-1,-1,0,0,0,1,9627,851,-1,-1,-1,-1,-1,-1,3118,457,24,1,4165,569,9670,862,-9,-9,7672,643,-1,-1,-1,51,3,1021,26,0,0,20,1,2,0,0,0,0,0,1,0,0,0,-1,-1,1,0,24,1,-1,-1\n2002,NH,1,2303,147,4,5,8,8,2315,160,-1,-1,2121,133,130,5,0,0,7,2,13,1,0,0,-1,-1,-1,-1,0,0,36,3,2307,144,-1,-1,-1,-1,-1,-1,647,75,8,0,974,92,2261,158,2066,172,2041,172,-1,-1,-1,2,0,28,4,0,0,8,0,0,0,0,0,0,0,0,0,0,0,-1,-1,0,0,8,0,-1,-1\n2002,NJ,1,22428,1272,-9,-9,-8,-8,22428,1272,-1,-1,4922,412,16722,990,4545,175,7,0,104,9,0,0,-1,-1,-1,-1,0,0,5,0,26305,1586,-1,-1,-1,-1,-1,-1,8999,845,70,1,13490,1337,-9,-9,-9,-9,16389,733,-1,-1,-1,18,0,-9,-9,0,0,53,0,11,0,2,1,0,0,0,0,0,0,-1,-1,4,0,70,1,-1,-1\n2002,NM,4,3086,2,168,0,45,0,3299,2,-1,-1,1227,133,526,63,3240,268,334,45,13,0,4,1,-1,-1,-1,-1,0,0,129,6,5473,516,-1,-1,-1,-1,-1,-1,1125,117,20,0,4752,1076,5628,617,5628,611,5374,611,-1,-1,-1,6,1,96,2,0,0,17,0,2,0,1,0,0,0,0,0,0,0,-1,-1,0,0,20,0,-1,-1\n2002,NY,1,63749,2996,153,27,0,0,63902,3023,-1,-1,11160,672,32000,1566,19237,744,271,3,355,2,0,0,-1,-1,-1,-1,353,1,373,8,63749,2996,-1,-1,-1,-1,-1,-1,15796,1213,179,11,25831,2029,58056,3209,60322,3209,51542,2668,-1,-1,-1,202,8,8064,242,0,0,140,9,18,0,11,2,2,0,2,0,3,0,-1,-1,3,0,179,11,-1,-1\n2002,NC,3,26995,1446,3591,614,247,25,30833,2085,-1,-1,9570,943,19043,987,0,0,549,48,89,6,0,0,-1,-1,-1,-1,795,31,69,27,30711,2042,-1,-1,-1,-1,-1,-1,8213,638,72,1,8396,634,-9,-9,28284,-9,-9,-9,-1,-1,-1,191,9,555,20,5,0,61,1,0,0,4,0,1,0,0,0,0,0,-1,-1,1,0,72,1,-1,-1\n2002,ND,2,911,96,83,4,-8,-8,994,100,-1,-1,710,79,49,4,56,1,191,19,3,0,0,0,-1,-1,-1,-1,0,0,0,0,1009,103,-1,-1,-1,-1,-1,-1,527,98,1,0,663,110,910,95,857,95,910,95,-1,-1,-1,1,0,10,2,-8,-8,1,0,0,0,0,0,0,0,0,0,0,0,-1,-1,0,0,1,0,-1,-1\n2002,OH,2,40474,2883,-9,-9,-8,-8,40474,2883,-1,-1,20077,1529,21530,1356,769,35,85,3,43,6,0,0,-1,-1,-1,-1,0,0,213,0,42717,2929,-1,-1,-1,-1,-1,-1,17745,2470,125,2,22687,2667,34023,2247,-9,-9,-9,-9,-1,-1,-1,82,1,344,27,3,0,111,2,8,0,3,0,0,0,0,0,0,0,-1,-1,0,0,125,2,-1,-1\n2002,OK,3,13960,1566,-9,-9,-8,-8,13960,1566,-1,-1,11763,1384,6053,590,909,59,1661,201,40,2,0,0,-1,-1,-1,-1,0,0,38,2,20464,2238,-1,-1,-1,-1,-1,-1,6342,1045,70,1,7203,1305,-9,-9,21038,2528,-9,-9,-1,-1,-1,9,1,127,6,7,0,49,0,3,1,1,0,6,0,3,0,0,0,-1,-1,1,0,70,1,-1,-1\n2002,OR,4,10870,777,3,1,0,0,10873,777,-1,-1,8548,675,1197,69,1163,16,224,41,137,10,0,0,-1,-1,-1,-1,0,0,4,1,11273,812,-1,-1,-1,-1,-1,-1,3072,368,29,4,3990,366,-8,-8,10841,715,10841,715,-1,-1,-1,23,1,478,6,0,0,24,3,0,0,2,1,2,0,0,0,0,0,-1,-1,1,0,29,4,-1,-1\n2002,PA,1,37430,1753,2,2,0,0,37432,1755,-1,-1,12984,859,20777,780,4317,159,71,9,173,5,0,0,-1,-1,-1,-1,25,9,0,0,38347,1821,-1,-1,-1,-1,-1,-1,7618,629,123,5,10093,755,32849,1734,32849,1734,25635,1478,-1,-1,-1,42,1,488,12,0,0,93,5,17,0,4,0,1,0,0,0,3,0,-1,-1,5,0,123,5,-1,-1\n2002,RI,1,2013,55,696,88,570,51,3279,194,-1,-1,1685,129,911,54,653,31,12,0,40,0,0,0,-1,-1,-1,-1,0,0,5,0,3306,214,-1,-1,-1,-1,-1,-1,3224,396,8,0,2991,321,3567,340,3567,340,3713,348,-1,-1,-1,5,0,-9,-9,-8,-8,5,0,0,0,2,0,0,0,0,0,0,0,-1,-1,1,0,8,0,-1,-1\n2002,SC,3,20507,1471,698,164,35,0,21240,1635,-1,-1,6674,715,15090,926,160,9,32,7,14,3,1,0,-1,-1,-1,-1,73,11,0,0,22044,1671,-1,-1,-1,-1,-1,-1,5973,679,45,2,7889,761,-9,-9,21010,1590,21231,1724,-1,-1,-1,133,7,114,5,3,0,34,2,5,0,1,0,1,0,2,0,0,0,-1,-1,0,0,46,2,-1,-1\n2002,SD,2,2634,254,6,1,14,2,2654,257,-1,-1,1948,153,124,4,0,0,619,70,0,0,0,0,-1,-1,-1,-1,0,0,0,0,2691,227,-1,-1,-1,-1,-1,-1,1086,162,11,0,1560,240,-8,-8,2587,240,-8,-8,-1,-1,-1,3,0,49,1,0,0,6,0,0,0,3,0,1,0,2,0,0,0,-1,-1,0,0,12,0,-1,-1\n2002,TN,3,12929,1143,-8,-8,24,1,12953,1144,-1,-1,11001,1071,11915,660,263,8,23,1,46,1,0,0,-1,-1,-1,-1,0,0,0,0,23248,1741,-1,-1,-1,-1,-1,-1,7912,1245,65,5,12076,1689,17923,1215,17511,1180,-9,-9,-1,-1,-1,15,1,93,4,0,0,62,5,0,0,0,0,0,0,3,0,0,0,-1,-1,0,0,65,5,-1,-1\n2002,TX,3,120277,7994,5635,1767,-8,-8,125912,9761,-1,-1,45547,5306,60339,5551,42377,2131,16,10,1,0,0,0,-1,-1,-1,-1,668,53,4,0,148952,13051,-1,-1,-1,-1,-1,-1,39903,5852,377,20,57612,7108,145285,14382,141922,13077,145285,14382,-1,-1,-1,220,10,7822,180,32,0,321,16,21,1,28,3,1,0,6,0,0,0,-1,-1,0,0,409,20,-1,-1\n2002,UT,4,3919,277,13,0,62,14,3994,291,-1,-1,3759,296,393,17,673,46,177,10,75,2,53,0,-1,-1,-1,-1,0,0,62,2,5192,373,-1,-1,-1,-1,-1,-1,1358,203,8,1,2558,308,-9,-9,3916,280,4123,296,-1,-1,-1,7,0,170,1,0,0,3,0,0,0,2,1,2,0,1,0,0,0,-1,-1,0,0,8,1,-1,-1\n2002,VT,1,755,81,127,10,347,41,1229,132,-1,-1,1529,124,99,2,0,0,16,0,7,1,0,0,-1,-1,-1,-1,0,0,80,5,1731,132,-1,-1,-1,-1,-1,-1,676,91,5,0,1632,225,1286,-9,1286,-9,1226,-9,-1,-1,-1,1,0,3,1,-8,-8,4,0,0,0,1,0,0,0,0,0,0,0,-1,-1,0,0,5,0,-1,-1\n2002,VA,3,27233,2135,0,0,-8,-8,27233,2135,-1,-1,9608,911,19458,1317,226,5,7,1,107,6,13,0,-1,-1,-1,-1,0,0,3,0,29422,2240,-1,-1,-1,-1,-1,-1,8821,1174,0,0,8778,1038,28658,2267,-8,-8,-8,-8,-1,-1,-1,41,1,-9,-9,2,0,32,0,9,0,2,0,0,0,0,0,0,0,-1,-1,28,0,73,0,-1,-1\n2002,WA,4,14744,1223,108,32,136,20,14988,1275,-1,-1,8926,812,3245,258,1685,94,491,66,418,15,0,0,-1,-1,-1,-1,38,9,5,0,14808,1254,-1,-1,-1,-1,-1,-1,6647,979,30,0,6579,915,9404,494,12139,654,12139,654,-1,-1,-1,54,2,1448,28,0,0,25,0,1,0,2,0,0,0,0,0,2,0,-1,-1,0,0,30,0,-1,-1\n2002,WV,3,3316,239,-8,-8,16,4,3332,243,-1,-1,3516,320,635,41,16,0,14,1,1,0,0,0,-1,-1,-1,-1,0,0,0,0,4182,362,-1,-1,-1,-1,-1,-1,1331,177,8,0,1609,200,-9,-9,3320,219,2970,219,-1,-1,-1,0,0,13,0,-8,-8,8,0,0,0,0,0,0,0,0,0,0,0,-1,-1,0,0,8,0,-1,-1\n2002,WI,2,16406,1309,17,3,446,22,16869,1334,-1,-1,8440,669,7782,612,0,0,499,48,133,4,0,0,-1,-1,-1,-1,4,0,10,0,16868,1333,-1,-1,-1,-1,-1,-1,5065,552,44,3,7058,641,-9,-9,14418,1141,-9,-9,-1,-1,-1,82,5,-9,-9,-8,-8,35,3,0,0,6,0,0,0,0,0,0,0,-1,-1,3,0,44,3,-1,-1\n2002,WY,4,1023,91,0,0,0,0,1023,91,-1,-1,1158,134,91,5,213,13,103,15,5,0,0,0,-1,-1,-1,-1,0,0,0,0,1570,167,-1,-1,-1,-1,-1,-1,530,87,4,0,639,64,995,116,945,106,1029,112,-1,-1,-1,11,0,45,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,-1,-1,0,0,4,0,-1,-1\n2002,ST,7,1048814,70133,18651,4054,10897,1434,1078362,75620,-1,-1,435564,39728,537173,34354,176745,8523,12646,1410,5881,387,2604,337,-1,-1,-1,-1,7145,373,1506,82,1179860,85194,-1,-1,-1,-1,-1,-1,347944,43712,2855,127,537524,60257,479417,37630,931108,64347,554778,44359,-1,-1,-1,2927,111,53306,1498,69,2,2293,93,206,9,158,8,40,2,41,0,11,0,-1,-1,86,7,2988,127,-1,-1\n2002,US,5,1161584,78336,20721,4601,24291,2392,1212138,85328,-1,-1,520602,46541,599704,38327,176745,8523,15068,1624,8184,621,2604,337,-1,-1,-1,-1,7145,373,1506,82,1332154,96428,-1,-1,-1,-1,-1,-1,386094,47865,3191,139,575729,64620,575192,45752,931108,64347,554778,44359,-1,-1,-1,2927,111,84931,3746,69,2,2572,103,222,10,175,8,45,2,44,0,11,0,-1,-1,90,7,3312,138,-1,-1\n2002,FE,6,112770,8203,2070,547,13394,958,133776,9708,-1,-1,85038,6813,62531,3973,0,0,2422,214,2303,234,0,0,-1,-1,-1,-1,0,0,0,0,152294,11234,-1,-1,-1,-1,-1,-1,38150,4153,336,12,38205,4363,95775,8122,-9,-9,-9,-9,-1,-1,-1,0,0,31625,2248,0,0,279,10,16,1,17,0,5,0,3,0,0,0,-1,-1,4,0,324,11,-1,-1\n2003,AL,3,23665,1625,542,84,0,0,24207,1709,-1,-1,9410,982,16031,851,0,0,0,0,0,0,0,0,-1,-1,-1,-1,0,0,59,0,25500,1833,-1,-1,-1,-1,-1,-1,9524,-7,97,0,10191,-9,-9,-9,23676,1322,11693,695,-1,-1,-1,50,0,73,0,0,0,97,0,0,0,0,0,0,0,0,0,0,0,-1,-1,0,0,97,0,-1,-1\n2003,AK,4,1432,133,253,35,1090,143,2775,311,-1,-1,1966,189,441,29,117,11,1495,149,98,11,0,0,-1,-1,-1,-1,-9,-9,18,3,4135,392,-1,-1,-1,-1,-1,-1,1281,168,2,0,2483,270,-9,-9,3098,-9,3098,-9,-1,-1,-1,18,0,15,1,-8,-8,4,0,-9,0,1,0,-9,0,-9,0,-9,0,-1,-1,-9,0,5,0,-1,-1\n2003,AZ,4,25001,2414,1104,242,0,0,26105,2656,-1,-1,12295,1476,3832,346,10562,629,1337,180,488,25,0,0,-1,-1,-1,-1,0,0,0,0,28514,2656,-1,-1,-1,-1,-1,-1,8517,1033,85,1,9360,1049,24480,2460,27882,2744,22988,2358,-1,-1,-1,112,4,3605,65,0,0,72,1,3,0,10,0,0,0,0,0,0,0,-1,-1,0,0,85,1,-1,-1\n2003,AR,3,11262,752,49,5,0,0,11311,757,-1,-1,6301,621,5866,315,76,9,8,1,11,1,-9,-9,-1,-1,-1,-1,10,1,1,0,12273,948,-1,-1,-1,-1,-1,-1,3644,467,46,3,6472,705,12009,857,11792,857,11107,869,-1,-1,-1,27,1,0,0,1,0,27,1,1,0,2,0,1,0,2,0,-9,-9,-1,-1,4,0,38,1,-1,-1\n2003,CA,4,149914,10097,0,0,1417,357,151331,10454,-1,-1,42506,4094,44439,3104,56505,2761,1459,122,1302,109,283,37,-1,-1,-1,-1,4837,227,0,0,151331,10454,-1,-1,-1,-1,-1,-1,38441,4972,197,4,108765,10325,-9,-9,147356,9714,74657,5830,-1,-1,-1,147,0,18177,392,0,0,187,3,13,0,35,0,5,0,13,0,2,0,-1,-1,51,4,306,7,-1,-1\n2003,CO,4,14802,1635,0,0,0,0,14802,1635,-1,-1,8153,887,3797,398,5449,395,352,43,184,13,0,0,-1,-1,-1,-1,0,0,0,0,17935,1736,-1,-1,-1,-1,-1,-1,4637,658,47,4,6703,825,-8,-8,12785,1284,11513,1098,-1,-1,-1,45,5,906,18,0,0,35,3,2,0,5,0,4,1,1,0,0,0,-1,-1,0,0,47,4,-1,-1\n2003,CT,1,11532,756,1835,267,3283,350,16650,1373,-1,-1,5093,684,8110,556,4989,297,30,6,76,5,0,0,-1,-1,-1,-1,0,0,-9,-9,18298,1548,-1,-1,-1,-1,-1,-1,4950,412,36,0,6527,706,-8,-8,-8,-8,-8,-8,-1,-1,-1,280,20,865,69,0,0,24,0,8,0,4,0,0,0,0,0,0,0,-1,-1,0,0,36,0,-1,-1\n2003,DE,3,3816,210,1362,176,961,105,6139,491,-1,-1,2025,224,3938,273,312,9,2,0,3,5,-9,-9,-1,-1,-1,-1,-9,-9,3,0,6283,511,-1,-1,-1,-1,-1,-1,1272,142,7,0,1908,303,-9,-9,5039,320,4023,200,-1,-1,-1,28,0,184,22,0,0,7,0,0,0,0,0,0,0,0,0,0,0,-1,-1,0,0,7,0,-1,-1\n2003,DC,3,-8,-8,-8,-8,-8,-8,-8,-8,-1,-1,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-1,-1,-1,-1,-1,-1,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-1,-1,-1,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-1,-1,-8,-8,-8,-8,-1,-1\n2003,FL,3,74520,5065,6,3,0,0,74526,5068,-1,-1,28645,2532,39920,2289,8047,315,114,20,50,4,3,1,-1,-1,-1,-1,67,4,1,0,76847,5165,-1,-1,-1,-1,-1,-1,26648,3048,211,13,31466,3319,-9,-9,75849,5093,56130,3870,-1,-1,-1,285,13,4541,198,3,0,142,7,39,3,4,1,1,0,4,0,0,0,-1,-1,18,2,211,13,-1,-1\n2003,GA,3,44056,3144,7,1,0,0,44063,3145,-1,-1,15837,1505,26933,1591,1029,33,63,2,46,5,155,9,-1,-1,-1,-1,0,0,0,0,44063,3145,-1,-1,-1,-1,-1,-1,13190,1742,131,6,15787,1909,-8,-8,44099,3153,-8,-8,-1,-1,-1,63,2,1017,13,4,0,97,4,17,1,9,0,3,0,2,0,0,0,-1,-1,2,1,134,6,-1,-1\n2003,HI,4,2254,304,501,78,749,135,3504,517,-1,-1,1148,190,235,25,195,14,39,4,1089,122,2335,320,-1,-1,-1,-1,56,4,46,6,5143,685,-1,-1,-1,-1,-1,-1,652,133,7,1,1278,248,-8,-8,3487,-9,2451,-8,-1,-1,-1,1,0,75,7,-8,-8,4,0,0,0,3,1,0,0,0,0,0,0,-1,-1,0,0,7,1,-1,-1\n2003,ID,4,3781,510,0,0,0,0,3781,510,-1,-1,4104,498,90,6,833,58,190,26,27,2,0,0,-1,-1,-1,-1,23,2,28,0,5295,592,-1,-1,-1,-1,-1,-1,2285,485,12,1,2513,526,5387,484,5073,471,4269,295,-1,-1,-1,2,0,278,0,0,0,11,1,0,0,0,0,0,0,0,0,0,0,-1,-1,1,0,12,1,-1,-1\n2003,IL,2,40718,2700,0,0,0,0,40718,2700,-1,-1,11118,939,24765,1556,4690,183,48,11,95,11,0,0,-1,-1,-1,-1,0,0,2,0,40718,2700,-1,-1,-1,-1,-1,-1,20577,2742,77,4,31998,3519,29384,2050,29384,2050,25315,2024,-1,-1,-1,96,6,304,27,0,0,62,1,10,2,1,1,0,0,1,0,0,0,-1,-1,3,0,77,4,-1,-1\n2003,IN,2,18987,1644,1,0,56,5,19044,1649,-1,-1,12153,1089,8356,623,717,41,47,3,38,2,0,0,-1,-1,-1,-1,0,0,0,0,21311,1758,-1,-1,-1,-1,-1,-1,11938,1762,59,1,12345,1813,15632,1123,21054,1817,-9,-9,-1,-1,-1,24,0,277,2,2,0,49,1,1,0,4,0,2,0,1,0,0,0,-1,-1,0,0,59,1,-1,-1\n2003,IA,2,7830,716,0,0,0,0,7830,716,-1,-1,5526,530,1726,154,392,16,103,12,57,4,0,0,-1,-1,-1,-1,21,0,5,0,7830,716,-1,-1,-1,-1,-1,-1,3047,459,12,1,5375,758,6229,543,6229,543,6229,543,-1,-1,-1,15,3,-9,-9,-8,-8,9,1,0,0,3,0,0,0,0,0,0,0,-1,-1,0,0,12,1,-1,-1\n2003,KS,2,8508,660,0,0,0,0,8508,660,-1,-1,4737,367,2869,204,670,36,131,17,73,4,0,0,-1,-1,-1,-1,0,0,23,1,8503,629,-1,-1,-1,-1,-1,-1,2799,451,31,1,3965,445,8524,720,-9,-9,-9,-9,-1,-1,-1,7,0,214,3,0,0,28,0,1,0,2,0,0,0,0,0,0,0,-1,-1,0,1,31,1,-1,-1\n2003,KY,3,9212,679,92,28,8,1,9312,708,-1,-1,9977,999,4797,339,176,1,7,0,13,0,-9,-9,-1,-1,-1,-1,-9,-9,21,4,14991,1343,-1,-1,-1,-1,-1,-1,5780,921,69,8,8093,1225,-9,-9,11557,718,-9,-9,-1,-1,-1,0,0,-9,-9,-9,-9,39,7,4,-9,1,-9,-9,-9,-9,-9,-9,-9,-1,-1,26,-9,70,7,-1,-1\n2003,LA,3,18469,1029,0,0,0,0,18469,1029,-1,-1,8747,625,24794,1773,11,1,13,1,2,0,0,0,-1,-1,-1,-1,75,5,0,0,33642,2405,-1,-1,-1,-1,-1,-1,9052,1257,85,2,12627,1361,18474,1024,19060,970,-9,-9,-1,-1,-1,12,0,114,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-1,-1,0,0,85,2,-1,-1\n2003,ME,1,1775,107,56,6,0,0,1831,113,-1,-1,1613,97,91,5,0,0,13,1,2,0,0,0,-1,-1,-1,-1,39,4,131,17,1889,124,-1,-1,-1,-1,-1,-1,371,41,1,0,774,52,1697,82,1697,82,1697,82,-1,-1,-1,0,0,8,1,-8,-8,3,0,0,0,0,0,0,0,0,0,0,0,-1,-1,0,0,3,0,-1,-1\n2003,MD,3,21714,1162,497,56,206,11,22417,1229,-1,-1,5104,366,17375,877,0,0,8,2,25,2,0,0,-1,-1,-1,-1,0,0,31,1,22543,1248,-1,-1,-1,-1,-1,-1,5966,627,67,0,9483,868,-8,-8,22507,1238,-9,-9,-1,-1,-1,63,1,482,26,0,0,52,0,7,0,4,0,0,0,0,0,0,0,-1,-1,4,0,67,0,-1,-1\n2003,MA,1,8077,384,7,154,1046,160,9130,698,-1,-1,4220,447,2620,118,2452,136,56,1,103,4,0,0,-1,-1,-1,-1,0,0,73,2,9524,708,-1,-1,-1,-1,-1,-1,1694,227,28,2,2196,276,-8,-8,-8,-8,7129,592,-1,-1,-1,4,1,-9,-9,-8,-8,27,2,0,0,0,0,0,0,1,0,0,0,-1,-1,0,0,28,2,-1,-1\n2003,MI,2,46680,2198,0,0,0,0,46680,2198,-1,-1,20518,1028,25169,1109,945,27,311,23,116,6,0,0,-1,-1,-1,-1,98,5,3,0,47160,2198,-1,-1,-1,-1,-1,-1,7970,664,125,7,13220,1030,-8,-8,47797,2306,-9,-9,-1,-1,-1,104,3,585,11,-8,-8,100,5,1,0,2,1,0,0,0,0,0,0,-1,-1,22,1,125,7,-1,-1\n2003,MN,2,7138,386,0,0,44,1,7182,387,-1,-1,4366,310,2524,111,0,0,518,47,184,5,0,0,-1,-1,-1,-1,0,0,0,0,7592,473,-1,-1,-1,-1,-1,-1,3646,411,13,1,4838,599,-8,-8,7173,422,-8,-8,-1,-1,-1,18,2,216,8,-8,-8,8,1,0,0,4,0,1,0,0,0,0,0,-1,-1,0,0,13,1,-1,-1\n2003,MS,3,10429,1527,0,0,0,0,10775,1625,-1,-1,6137,955,14727,1189,106,8,20,6,29,5,0,0,-1,-1,-1,-1,0,0,0,0,21019,2163,-1,-1,-1,-1,-1,-1,6603,770,54,4,7146,821,21737,-9,21737,-8,21737,-8,-1,-1,-1,80,2,-9,-9,0,0,0,0,0,0,2,0,0,0,0,0,0,0,-1,-1,0,0,2,0,-1,-1\n2003,MO,2,27628,2208,25,3,0,0,27653,2211,-1,-1,15649,1526,11867,689,404,16,110,7,42,1,0,0,-1,-1,-1,-1,0,0,6,2,28078,2241,-1,-1,-1,-1,-1,-1,8506,1433,67,3,15787,2453,-8,-8,29089,2411,-8,-8,-1,-1,-1,34,1,363,21,2,0,57,3,1,0,2,0,0,0,3,0,0,0,-1,-1,-9,-9,65,3,-1,-1\n2003,MT,4,1725,269,0,0,0,0,1725,269,-1,-1,2497,298,64,6,91,15,526,100,8,0,0,0,-1,-1,-1,-1,3,0,12,0,3201,419,-1,-1,-1,-1,-1,-1,1289,256,13,0,1442,247,-8,-8,1400,200,-8,-8,-1,-1,-1,1,0,10,0,0,0,9,0,0,0,3,0,0,0,1,0,0,0,-1,-1,0,0,13,0,-1,-1\n2003,NE,2,3578,295,45,14,112,29,3735,338,-1,-1,2193,216,918,64,408,14,175,25,23,2,0,0,-1,-1,-1,-1,0,2,0,0,3717,323,-1,-1,-1,-1,-1,-1,1536,199,7,0,1723,253,-8,-8,3625,174,2900,139,-1,-1,-1,13,0,154,2,0,0,5,0,0,0,2,0,0,0,0,0,0,0,-1,-1,0,0,7,0,-1,-1\n2003,NV,4,9747,753,79,0,5,0,9831,753,-1,-1,5215,557,2555,215,1430,50,173,15,142,12,112,1,-1,-1,-1,-1,0,0,36,30,9663,880,-1,-1,-1,-1,-1,-1,3118,457,0,0,4239,561,10270,852,9908,731,7677,643,-1,-1,-1,16,1,1064,27,-9,-9,-9,-9,-9,-9,-9,-9,-9,-9,-9,-9,-9,-9,-1,-1,-9,-9,-9,-9,-1,-1\n2003,NH,1,2288,114,4,8,2,11,2294,133,-1,-1,2107,107,120,6,0,0,4,1,14,0,-9,-9,-1,-1,-1,-1,-9,-9,72,3,2317,117,-1,-1,-1,-1,-1,-1,645,67,4,1,1074,121,2261,158,2066,172,2041,172,-1,-1,-1,2,0,34,6,0,0,2,0,0,0,2,2,0,0,0,0,0,0,-1,-1,0,0,4,2,-1,-1\n2003,NJ,1,21903,1179,0,0,0,0,21903,1179,-1,-1,4847,394,16319,946,4442,167,7,0,93,5,0,0,-1,-1,-1,-1,20,5,1,0,25729,1517,-1,-1,-1,-1,-1,-1,9305,838,60,3,13738,1305,-9,-9,25165,1371,-9,-9,-1,-1,-1,11,0,-9,-9,0,0,38,2,9,1,3,0,3,0,1,0,0,0,-1,-1,6,0,60,3,-1,-1\n2003,NM,4,3308,2,132,0,30,0,3470,2,-1,-1,1308,173,585,55,3305,292,373,43,11,0,5,0,-1,-1,-1,-1,-9,-9,60,13,5647,576,-1,-1,-1,-1,-1,-1,2282,331,9,2,3452,492,5774,617,5774,611,5374,611,-1,-1,-1,5,0,63,0,0,0,9,2,0,0,0,0,0,0,0,0,0,0,-1,-1,0,0,9,2,-1,-1\n2003,NY,1,62284,2913,155,36,0,0,62439,2949,-1,-1,11143,684,31133,1457,18611,724,301,5,351,3,0,0,-1,-1,-1,-1,411,1,334,39,62284,2913,-1,-1,-1,-1,-1,-1,16181,1162,195,5,26663,1840,57218,3174,59394,3174,50954,2647,-1,-1,-1,217,14,8129,241,0,0,158,4,15,0,13,1,1,0,2,0,0,0,-1,-1,6,0,195,5,-1,-1\n2003,NC,3,27784,1610,3520,646,276,38,31580,2294,-1,-1,10218,1115,19239,1049,0,0,570,50,100,8,0,0,-1,-1,-1,-1,1058,31,181,3,31366,2256,-1,-1,-1,-1,-1,-1,8429,670,73,3,8479,655,28581,1680,-8,-8,-8,-8,-1,-1,-1,173,5,680,15,7,0,56,3,3,0,4,0,3,0,0,0,0,0,-1,-1,0,0,73,3,-1,-1\n2003,ND,2,916,92,87,5,0,0,1003,97,-1,-1,805,73,52,4,61,1,205,35,3,0,0,0,-1,-1,-1,-1,0,0,0,0,1126,113,-1,-1,-1,-1,-1,-1,717,101,1,0,755,119,910,95,857,95,910,95,-1,-1,-1,2,0,8,1,-8,-8,0,0,0,0,1,0,0,0,0,0,0,0,-1,-1,0,0,1,0,-1,-1\n2003,OH,2,39593,2856,0,0,0,0,39593,2856,-1,-1,19935,1625,20815,1234,838,29,84,3,42,6,0,0,-1,-1,-1,-1,-9,-9,167,0,41881,2897,-1,-1,-1,-1,-1,-1,18591,2588,101,5,24524,2877,34279,2247,-9,-9,-9,-9,-1,-1,-1,67,1,435,22,3,0,86,4,8,0,3,1,0,0,1,0,0,0,-1,-1,0,0,101,5,-1,-1\n2003,OK,3,14190,2167,270,39,0,0,14460,2206,-1,-1,11830,1447,5811,576,940,54,1653,213,63,2,5,0,-1,-1,-1,-1,44,1,2,-9,20348,2293,-1,-1,-1,-1,-1,-1,5124,864,88,8,6993,1213,21161,2695,-9,-9,-9,-9,-1,-1,-1,11,1,85,3,14,0,68,7,2,0,2,1,1,0,1,0,0,0,-1,-1,-9,-9,88,8,-1,-1\n2003,OR,4,11357,834,13,3,0,0,11370,837,-1,-1,9313,745,1196,73,941,12,237,42,134,10,0,0,-1,-1,-1,-1,0,0,4,1,11825,883,-1,-1,-1,-1,-1,-1,3122,411,24,1,4021,478,-8,-8,11415,831,11415,831,-1,-1,-1,6,0,666,15,0,0,20,1,0,0,3,0,0,0,1,0,0,0,-1,-1,0,0,24,1,-1,-1\n2003,PA,1,38559,1775,2,2,6,0,38567,1777,-1,-1,13611,911,20788,704,4413,174,61,12,168,8,0,0,-1,-1,-1,-1,26,14,0,0,39067,1823,-1,-1,-1,-1,-1,-1,8021,681,146,1,12553,958,32486,1754,32486,1754,24996,1497,-1,-1,-1,49,1,504,14,0,0,110,0,16,1,6,0,1,0,0,0,0,0,-1,-1,13,0,146,1,-1,-1\n2003,RI,1,1892,48,651,107,810,68,3353,223,-1,-1,1653,144,929,41,659,33,15,1,43,1,0,0,-1,-1,-1,-1,4,2,2,0,3305,222,-1,-1,-1,-1,-1,-1,3253,443,9,0,3279,405,3577,345,3577,345,3737,348,-1,-1,-1,3,0,-9,-9,-8,-8,3,0,0,0,3,0,0,0,0,0,0,0,-1,-1,3,0,9,0,-1,-1\n2003,SC,3,20677,1419,642,127,33,0,21352,1546,-1,-1,6761,699,15085,859,159,4,39,3,12,4,1,0,-1,-1,-1,-1,86,7,0,0,22143,1576,-1,-1,-1,-1,-1,-1,5920,663,60,1,8923,938,-9,-9,22274,1672,-9,-9,-1,-1,-1,131,9,145,3,0,0,55,1,3,0,1,-9,0,0,1,0,0,0,-1,-1,0,0,60,1,-1,-1\n2003,SD,2,2697,264,7,3,21,2,2725,269,-1,-1,1995,172,125,11,0,0,658,88,0,0,0,0,-1,-1,-1,-1,0,0,2,0,2780,271,-1,-1,-1,-1,-1,-1,1070,218,12,0,1700,292,2894,315,-9,-9,-8,-8,-1,-1,-1,1,0,32,1,0,0,10,0,0,0,2,0,0,0,0,0,0,0,-1,-1,0,0,12,0,-1,-1\n2003,TN,3,12935,1136,0,0,19,2,12954,1138,-1,-1,11340,1191,11894,630,293,13,24,10,45,1,0,0,-1,-1,-1,-1,0,0,0,0,23596,1845,-1,-1,-1,-1,-1,-1,7043,1036,93,5,12150,1813,18907,1215,18490,1180,-9,-9,-1,-1,-1,16,2,117,6,0,0,81,5,6,0,4,0,0,0,2,0,0,0,-1,-1,0,0,93,5,-1,-1\n2003,TX,3,120532,8115,6108,1731,0,0,126640,9846,-1,-1,46645,5676,60605,5487,45469,2254,12,6,3,0,690,64,-1,-1,-1,-1,0,0,0,0,153424,13487,-1,-1,-1,-1,-1,-1,31560,4406,388,19,57583,7590,144394,14693,140979,14372,144394,14693,-1,-1,-1,209,9,8376,187,24,0,325,17,22,1,16,1,0,0,1,0,0,0,-1,-1,0,0,388,19,-1,-1\n2003,UT,4,4246,297,14,0,55,11,4315,308,-1,-1,3806,328,366,23,819,58,170,11,65,3,68,3,-1,-1,-1,-1,0,0,49,1,5343,427,-1,-1,-1,-1,-1,-1,1510,263,11,0,2700,390,-8,-8,4258,278,4458,294,-1,-1,-1,5,0,209,0,0,0,9,0,0,0,2,0,0,0,0,0,0,0,-1,-1,0,0,11,0,-1,-1\n2003,VT,1,869,84,146,15,341,36,1356,135,-1,-1,1588,125,124,3,0,0,14,0,8,2,0,0,-1,-1,-1,-1,-9,-9,75,5,1809,135,-1,-1,-1,-1,-1,-1,796,109,5,1,1698,287,1491,145,1491,145,1358,116,-1,-1,-1,7,0,20,2,-8,-8,2,-9,-9,-9,2,1,1,-9,-9,-9,-9,-9,-1,-1,-9,-9,5,1,-1,-1\n2003,VA,3,27272,2081,0,0,0,0,27272,2081,-1,-1,10982,1180,20927,1482,324,11,10,3,130,5,0,0,-1,-1,-1,-1,10,0,3,0,32386,2681,-1,-1,-1,-1,-1,-1,9728,1362,91,3,10258,1348,28799,2275,-8,-8,-8,-8,-1,-1,-1,39,1,282,31,2,0,65,3,3,0,7,0,0,0,0,0,0,0,-1,-1,16,0,93,3,-1,-1\n2003,WA,4,14530,1252,82,30,284,49,14896,1331,-1,-1,9154,868,3118,232,1572,95,553,64,412,16,0,0,-1,-1,-1,-1,48,10,3,3,14860,1288,-1,-1,-1,-1,-1,-1,6835,1011,33,1,8009,1161,11392,1115,13623,1201,13623,1201,-1,-1,-1,47,0,1232,30,0,0,29,1,1,0,2,0,0,0,0,0,1,0,-1,-1,0,0,33,1,-1,-1\n2003,WV,3,3422,347,0,0,17,4,3439,351,-1,-1,3635,358,679,46,19,0,17,1,3,0,0,0,-1,-1,-1,-1,0,0,0,0,4353,405,-1,-1,-1,-1,-1,-1,1244,161,13,0,1712,174,3061,337,3509,371,3061,337,-1,-1,-1,0,0,12,0,-8,-8,13,1,0,0,1,0,0,0,0,0,0,0,-1,-1,0,0,14,1,-1,-1\n2003,WI,2,18372,1315,11,1,484,63,18867,1379,-1,-1,10349,707,9385,572,0,0,579,50,186,5,-9,-9,-1,-1,-1,-1,38,2,18,1,20555,1337,-1,-1,-1,-1,-1,-1,5019,534,41,0,7421,686,-8,-8,14798,1153,-8,-8,-1,-1,-1,75,5,-9,-9,-8,-8,38,0,0,0,3,0,0,0,0,0,0,0,-1,-1,0,0,41,0,-1,-1\n2003,WY,4,1033,104,0,0,0,0,1033,104,-1,-1,1297,149,82,6,211,11,101,9,6,0,0,0,-1,-1,-1,-1,0,0,0,0,1697,175,-1,-1,-1,-1,-1,-1,583,76,1,1,585,76,1074,116,1040,106,1049,112,-1,-1,-1,6,0,55,2,0,0,1,0,0,0,0,1,0,0,0,0,0,0,-1,-1,0,0,1,1,-1,-1\n2003,ST,7,1058909,73366,18305,3905,11355,1581,1088915,78950,-1,-1,451575,43102,538226,34311,183682,9007,13035,1474,6218,439,3657,435,-1,-1,-1,-1,6974,327,1472,135,1204839,89230,-1,-1,-1,-1,-1,-1,355911,43932,3044,127,556974,61684,552082,43171,953549,67451,541983,42192,-1,-1,-1,2627,113,54611,1501,62,0,2333,92,196,9,183,12,27,1,39,0,3,0,-1,-1,175,9,3103,125,-1,-1\n2003,US,5,1178537,82111,20571,4563,25389,2529,1230427,89301,-1,-1,542030,50244,604155,38306,183682,9007,15588,1713,8705,698,3657,435,-1,-1,-1,-1,6974,327,1472,135,1366263,100865,-1,-1,-1,-1,-1,-1,397275,48281,3363,142,596804,66053,649771,51528,953549,67451,541983,42192,-1,-1,-1,2627,113,86751,3817,63,0,2628,112,210,9,189,12,31,1,44,0,3,0,-1,-1,177,9,3430,145,-1,-1\n2003,FE,6,119628,8745,2266,658,14034,948,141512,10351,-1,-1,90455,7142,65929,3995,0,0,2553,239,2487,259,0,0,-1,-1,-1,-1,0,0,0,0,161424,11635,-1,-1,-1,-1,-1,-1,41364,4349,319,15,39830,4369,97689,8357,-9,-9,-9,-9,-1,-1,-1,0,0,32140,2316,1,0,295,20,14,0,6,0,4,0,5,0,0,0,-1,-1,2,0,327,20,-1,-1\n2004,AL,3,23156,1619,530,86,0,0,23686,1705,-1,-1,9172,993,14903,749,0,0,3,1,6,0,0,0,-1,-1,-1,-1,0,0,45,1,24129,1744,-1,-1,-1,-1,-1,-1,6413,958,63,4,8188,1160,-8,-8,24256,958,11838,550,-1,-1,-1,25,0,71,0,0,0,63,4,0,0,0,0,0,0,0,0,0,0,-1,-1,0,0,63,4,-1,-1\n2004,AK,4,1392,137,246,36,1195,136,2833,309,-1,-1,1931,199,454,28,133,7,1523,152,103,8,0,0,-1,-1,-1,-1,0,0,13,3,4157,397,-1,-1,-1,-1,-1,-1,-9,-9,8,0,2475,268,-9,-9,3098,-7,3098,-9,-1,-1,-1,13,0,17,0,-8,-8,5,0,0,0,1,0,1,0,1,0,2,0,-1,-1,-9,-9,10,0,-1,-1\n2004,AZ,4,24426,2545,1017,220,0,0,25443,2765,-1,-1,12668,1517,3929,333,11254,704,1412,185,487,26,0,0,-1,-1,-1,-1,0,0,0,0,29750,2765,-1,-1,-1,-1,-1,-1,8288,982,62,1,9180,1025,27948,2660,31222,2986,23788,2558,-1,-1,-1,97,1,3875,49,0,0,55,1,4,0,1,0,1,0,1,0,0,0,-1,-1,0,0,62,1,-1,-1\n2004,AR,3,11900,623,46,8,0,0,11946,631,-1,-1,6741,749,5702,326,98,9,5,4,10,1,-9,-9,-1,-1,-1,-1,6,0,3,1,12565,1090,-1,-1,-1,-1,-1,-1,3883,795,56,5,6746,879,12307,758,12090,758,11502,673,-1,-1,-1,15,0,116,9,1,-9,39,3,-9,-9,2,-9,3,-9,5,2,-9,-9,-1,-1,6,0,56,5,-1,-1\n2004,CA,4,151681,10671,0,0,1285,302,152966,10973,-1,-1,42561,4271,44487,3235,57799,2926,1448,140,1278,109,258,45,-1,-1,-1,-1,5135,247,0,0,152966,10973,-1,-1,-1,-1,-1,-1,41045,5767,187,10,107112,10971,-9,-9,149674,10274,75060,5830,-1,-1,-1,123,0,17485,405,0,0,292,9,0,0,27,3,3,0,8,0,0,0,-1,-1,14,0,344,12,-1,-1\n2004,CO,4,15062,1774,0,0,0,0,15062,1774,-1,-1,8468,1007,3797,387,5577,441,352,51,199,14,0,0,-1,-1,-1,-1,0,0,0,0,18393,1900,-1,-1,-1,-1,-1,-1,4793,733,42,3,7621,977,-9,-9,12773,1380,11545,1291,-1,-1,-1,42,4,1000,22,0,0,27,0,2,1,3,1,6,1,3,0,1,0,-1,-1,0,0,42,3,-1,-1\n2004,CT,1,11586,695,1801,255,3294,362,16681,1312,-1,-1,5016,630,7902,528,4985,316,31,4,75,10,-9,-9,-1,-1,-1,-1,-9,-9,-9,-9,18009,1488,-1,-1,-1,-1,-1,-1,5009,414,32,2,6490,621,-8,-8,-8,-8,-8,-8,-1,-1,-1,297,24,814,81,0,0,19,1,5,0,8,1,0,0,0,0,0,0,-1,-1,-9,-9,32,2,-1,-1\n2004,DE,3,3792,207,1420,217,997,120,6209,544,-1,-1,2088,253,3948,292,326,10,3,0,2,2,0,0,-1,-1,-1,-1,-9,-9,3,0,6370,557,-1,-1,-1,-1,-1,-1,1028,106,11,0,1826,280,6087,450,5039,320,4023,200,-1,-1,-1,27,0,214,27,0,0,10,0,0,0,0,0,0,0,0,0,0,0,-1,-1,1,0,11,0,-1,-1\n2004,DC,3,-8,-8,-8,-8,-8,-8,-8,-8,-1,-1,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-1,-1,-1,-1,-1,-1,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-1,-1,-1,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-1,-1,-8,-8,-8,-8,-1,-1\n2004,FL,3,77643,5519,3,0,0,0,77646,5519,-1,-1,30299,2935,41003,2343,8320,352,126,22,50,4,4,1,-1,-1,-1,-1,70,2,1,1,79873,5660,-1,-1,-1,-1,-1,-1,27003,3296,218,12,33342,3702,-9,-9,79057,5628,58835,4295,-1,-1,-1,209,5,4657,177,2,0,168,8,15,2,4,0,1,0,2,0,-9,-9,-1,-1,26,2,218,12,-1,-1\n2004,GA,3,47656,3433,12,3,0,0,47668,3436,-1,-1,14754,1216,31439,2143,1238,34,34,2,37,3,0,0,-1,-1,-1,-1,0,0,77,2,47579,3400,-1,-1,-1,-1,-1,-1,10394,1095,92,5,16896,2219,-8,-8,46226,3505,-8,-8,-1,-1,-1,77,5,1187,17,1,0,75,4,5,1,7,0,1,0,3,0,0,0,-1,-1,0,0,92,5,-1,-1\n2004,HI,4,2063,295,521,93,787,130,3371,518,-1,-1,1164,181,246,26,177,14,38,3,1130,126,2369,334,-1,-1,-1,-1,61,7,76,8,5261,699,-1,-1,-1,-1,-1,-1,623,141,8,0,1402,289,-9,-9,3487,-7,2451,-7,-1,-1,-1,0,0,85,7,-8,-8,6,0,0,0,2,0,0,0,0,0,0,0,-1,-1,0,0,8,0,-1,-1\n2004,ID,4,3946,549,0,0,0,0,3946,549,-1,-1,4621,627,107,13,980,73,212,40,32,1,0,0,-1,-1,-1,-1,24,1,48,1,6024,756,-1,-1,-1,-1,-1,-1,2620,579,12,0,2926,564,5939,-7,5902,-7,5939,-7,-1,-1,-1,0,0,154,0,0,0,9,0,0,0,4,0,0,0,0,0,0,0,-1,-1,0,0,13,0,-1,-1\n2004,IL,2,41304,2750,0,0,0,0,41304,2750,-1,-1,11304,977,24949,1572,4895,183,44,12,106,6,0,0,-1,-1,-1,-1,0,0,6,0,41304,2750,-1,-1,-1,-1,-1,-1,21456,3056,94,6,34819,3980,30559,2050,30559,2050,25315,2024,-1,-1,-1,106,4,746,36,0,0,72,6,4,0,10,0,2,0,2,0,1,0,-1,-1,3,0,94,6,-1,-1\n2004,IN,2,19520,1754,3,0,55,11,19578,1765,-1,-1,12513,1218,8778,625,740,37,47,9,38,3,0,0,-1,-1,-1,-1,0,0,0,0,22116,1892,-1,-1,-1,-1,-1,-1,11609,1827,55,2,13156,1955,15526,1211,20789,1989,-9,-9,-1,-1,-1,18,3,258,3,0,0,51,2,1,0,3,0,0,0,0,0,0,0,-1,-1,0,0,55,2,-1,-1\n2004,IA,2,7768,757,0,0,0,0,7768,757,-1,-1,5452,548,1726,157,397,21,104,25,78,6,0,0,-1,-1,-1,-1,0,0,11,0,7768,757,-1,-1,-1,-1,-1,-1,3487,-9,16,-9,6444,-9,6416,573,7285,569,6416,573,-1,-1,-1,11,1,-9,-9,-8,-8,-9,-9,-9,-9,-9,-9,-9,-9,-9,-9,-9,-9,-1,-1,-9,-9,-9,-9,-1,-1\n2004,KS,2,8348,643,0,0,0,0,8348,643,-1,-1,4631,369,2787,177,697,51,140,18,68,5,0,0,-1,-1,-1,-1,0,0,23,0,8346,620,-1,-1,-1,-1,-1,-1,2820,462,29,2,4142,548,8524,733,-9,-9,-9,-9,-1,-1,-1,1,0,232,3,0,0,25,2,1,0,3,0,0,0,0,0,0,0,-1,-1,0,0,29,2,-1,-1\n2004,KY,3,10550,883,65,14,62,2,10677,899,-1,-1,10889,1225,5096,325,188,4,7,0,16,0,0,0,-1,-1,-1,-1,23,4,12,1,16231,1559,-1,-1,-1,-1,-1,-1,9003,1072,42,2,9224,1648,11575,726,11575,726,11575,726,-1,-1,-1,0,0,-9,-9,0,0,36,2,0,0,2,0,0,0,0,0,0,0,-1,-1,0,0,38,2,-1,-1\n2004,LA,3,18484,986,0,0,0,0,18484,986,-1,-1,9364,981,25120,1403,12,1,7,0,2,0,0,0,-1,-1,-1,-1,48,1,0,0,34553,2386,-1,-1,-1,-1,-1,-1,8834,1179,102,7,13462,1655,18484,986,18694,970,-9,-9,-1,-1,-1,8,0,106,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-1,-1,0,0,102,7,-1,-1\n2004,ME,1,1808,110,58,5,0,0,1866,115,-1,-1,1635,102,111,5,0,0,32,6,6,1,0,0,-1,-1,-1,-1,30,3,85,8,1899,125,-1,-1,-1,-1,-1,-1,240,20,4,0,602,45,1697,82,1697,82,1697,82,-1,-1,-1,0,0,6,0,-8,-8,4,0,0,0,0,0,0,0,0,0,0,0,-1,-1,0,0,4,0,-1,-1\n2004,MD,3,21248,1095,525,55,228,11,22001,1161,-1,-1,5116,379,16916,793,0,0,7,3,27,3,0,0,-1,-1,-1,-1,0,0,39,2,22105,1180,-1,-1,-1,-1,-1,-1,6182,635,74,4,9748,939,-9,-9,22529,1238,-9,-9,-1,-1,-1,63,0,524,20,1,0,50,1,12,2,2,0,0,0,3,0,1,0,-1,-1,7,1,76,4,-1,-1\n2004,MA,1,8039,373,4,205,1041,163,9084,741,-1,-1,4138,491,2561,119,2476,122,54,2,108,4,0,1,-1,-1,-1,-1,-9,-9,66,2,9403,741,-1,-1,-1,-1,-1,-1,1788,197,12,0,2300,281,-9,-9,-9,-9,7186,592,-1,-1,-1,4,2,-9,-9,-8,-8,23,0,0,0,2,0,0,0,0,0,0,0,-1,-1,-9,-9,25,0,-1,-1\n2004,MI,2,46238,2113,0,0,0,0,46238,2113,-1,-1,20614,1021,24728,1033,864,23,337,24,117,7,0,0,-1,-1,-1,-1,107,5,3,0,46770,2113,-1,-1,-1,-1,-1,-1,7382,600,137,3,12925,1062,-8,-8,47370,2167,-8,-8,-1,-1,-1,79,5,641,17,-8,-8,116,3,0,0,10,0,2,0,0,0,0,0,-1,-1,9,0,137,3,-1,-1\n2004,MN,2,7471,473,0,0,37,2,7508,475,-1,-1,4796,354,2650,123,0,0,570,59,196,7,0,0,-1,-1,-1,-1,0,0,2,1,8214,544,-1,-1,-1,-1,-1,-1,3912,475,6,0,5310,539,7577,431,7577,431,-8,-8,-1,-1,-1,21,1,397,12,-8,-8,5,0,0,0,1,0,0,0,0,0,0,0,-1,-1,0,0,6,0,-1,-1\n2004,MS,3,9340,1455,315,75,352,78,10007,1608,-1,-1,5570,817,13434,959,122,8,17,2,29,6,0,0,-1,-1,-1,-1,-9,-9,15,4,19187,1796,-1,-1,-1,-1,-1,-1,7027,942,51,2,7571,1097,-9,-9,22180,-7,-9,-9,-1,-1,-1,70,4,-9,-9,0,0,48,2,2,0,1,0,0,0,0,0,0,0,-1,-1,0,0,51,2,-1,-1\n2004,MO,2,28178,2484,16,4,0,0,28194,2488,-1,-1,16119,1726,11950,747,414,19,127,18,47,5,0,0,-1,-1,-1,-1,-9,-9,15,1,28672,2516,-1,-1,-1,-1,-1,-1,8390,1467,73,4,16240,2321,-8,-8,29791,2401,-8,-8,-1,-1,-1,34,2,375,23,0,0,70,4,0,0,2,0,0,0,1,0,0,0,-1,-1,0,0,73,4,-1,-1\n2004,MT,4,1599,209,0,0,0,0,1599,209,-1,-1,2575,348,77,4,112,12,618,105,10,2,0,0,-1,-1,-1,-1,1,0,11,2,3404,473,-1,-1,-1,-1,-1,-1,1454,302,12,0,1650,325,-9,-9,1500,200,-9,-9,-1,-1,-1,3,0,6,0,0,0,11,0,0,0,1,0,0,0,0,0,0,0,-1,-1,0,0,12,0,-1,-1\n2004,NE,2,3590,335,65,18,100,29,3755,382,-1,-1,2209,266,944,59,434,22,149,19,22,0,0,0,-1,-1,-1,-1,1,3,2,0,3761,369,-1,-1,-1,-1,-1,-1,1562,225,7,0,1838,215,-8,-8,3625,344,2900,275,-1,-1,-1,15,0,151,1,0,0,5,0,0,0,0,0,0,0,0,0,0,0,-1,-1,2,0,7,0,-1,-1\n2004,NV,4,10065,877,85,0,6,0,10156,877,-1,-1,5550,562,2794,218,1658,55,184,21,205,22,73,0,-1,-1,-1,-1,23,0,0,0,10487,878,-1,-1,-1,-1,-1,-1,4937,648,31,2,4557,519,9955,858,9888,737,7682,653,-1,-1,-1,27,1,1202,40,2,0,23,2,2,0,1,0,0,0,2,0,0,0,-1,-1,1,0,31,2,-1,-1\n2004,NH,1,2309,114,2,3,2,13,2313,130,-1,-1,2084,105,123,9,0,0,3,0,13,0,0,0,-1,-1,-1,-1,-9,-9,106,5,2329,119,-1,-1,-1,-1,-1,-1,611,52,5,1,997,89,2261,158,2066,172,2041,172,-1,-1,-1,1,0,46,4,-9,-9,-9,-9,-9,-9,-9,-9,-9,-9,-9,-9,-9,-9,-1,-1,-9,-9,-9,-9,-1,-1\n2004,NJ,1,21767,1158,0,0,0,0,21767,1158,-1,-1,4855,447,15928,856,4375,159,3,0,101,5,0,0,-1,-1,-1,-1,20,3,5,0,25287,1470,-1,-1,-1,-1,-1,-1,8971,785,59,3,13312,1106,-9,-9,24656,1384,-9,-9,-1,-1,-1,20,1,-9,-9,0,0,35,2,7,0,5,0,0,0,1,0,2,0,-1,-1,11,1,61,3,-1,-1\n2004,NM,4,3539,2,133,1,42,0,3714,3,-1,-1,1378,166,549,58,3455,312,388,35,15,2,5,1,-1,-1,-1,-1,0,0,8,7,5798,581,-1,-1,-1,-1,-1,-1,2330,320,16,1,3559,531,-8,-8,6016,617,5596,611,-1,-1,-1,13,0,65,0,0,0,13,1,0,0,2,0,0,0,1,0,0,0,-1,-1,-9,-9,16,1,-1,-1\n2004,NY,1,60910,2789,289,36,0,0,61199,2825,-1,-1,11300,772,30747,1332,17534,665,322,3,348,2,0,0,-1,-1,-1,-1,423,1,236,12,60910,2787,-1,-1,-1,-1,-1,-1,15259,1129,147,7,25192,1832,57063,3174,58489,3174,50964,2647,-1,-1,-1,221,4,7775,252,0,0,117,6,12,1,8,0,1,0,0,0,2,0,-1,-1,7,0,147,7,-1,-1\n2004,NC,3,28843,1653,4076,658,278,36,33197,2347,-1,-1,10875,1263,19997,1062,0,0,638,59,109,4,0,0,-1,-1,-1,-1,1086,39,299,3,33004,2430,-1,-1,-1,-1,-1,-1,9256,800,85,2,8692,679,29364,2136,-9,-9,-9,-9,-1,-1,-1,183,9,852,16,4,0,83,3,2,0,2,0,2,0,0,0,0,0,-1,-1,4,1,97,4,-1,-1\n2004,ND,2,913,93,89,0,0,0,1002,93,-1,-1,896,91,50,4,20,1,230,33,2,0,0,0,-1,-1,-1,-1,0,0,0,0,1198,129,-1,-1,-1,-1,-1,-1,771,144,2,0,792,132,910,95,857,95,910,95,-1,-1,-1,1,0,14,1,-8,-8,1,0,0,0,1,0,0,0,0,0,0,0,-1,-1,0,0,2,0,-1,-1\n2004,OH,2,39118,3103,0,0,0,0,39118,3103,-1,-1,20016,1854,20390,1284,874,35,83,3,42,9,0,0,-1,-1,-1,-1,-9,-9,208,0,41613,3185,-1,-1,-1,-1,-1,-1,19936,3025,127,6,25095,3113,32813,2616,-9,-9,-9,-9,-1,-1,-1,54,2,517,30,7,0,105,5,4,0,10,1,0,0,1,0,0,0,-1,-1,-9,-9,127,6,-1,-1\n2004,OK,3,14341,2009,306,60,0,0,14647,2069,-1,-1,12010,1461,6010,583,1024,66,1819,246,50,4,6,0,-1,-1,-1,-1,39,1,-9,-9,20958,2361,-1,-1,-1,-1,-1,-1,5041,866,58,7,7162,1401,20971,2811,21028,2831,21028,2831,-1,-1,-1,2,2,79,2,6,0,45,7,2,0,2,0,0,0,1,0,0,0,-1,-1,1,0,57,7,-1,-1\n2004,OR,4,11709,931,8,4,0,0,11717,935,-1,-1,9487,838,1207,78,1121,18,244,42,133,9,0,0,-1,-1,-1,-1,0,0,0,0,12195,985,-1,-1,-1,-1,-1,-1,3242,469,36,0,4406,514,-8,-8,11415,831,11415,831,-1,-1,-1,6,0,715,13,0,0,31,0,1,0,3,0,0,0,0,0,0,0,-1,-1,1,0,36,0,-1,-1\n2004,PA,1,38345,1763,0,0,25,7,38370,1770,-1,-1,13820,948,20544,686,4512,162,56,8,173,10,0,0,-1,-1,-1,-1,31,13,0,0,39136,1827,-1,-1,-1,-1,-1,-1,7752,683,160,4,13694,1043,35408,2162,35408,2162,35408,2162,-1,-1,-1,39,1,492,11,0,0,122,4,21,0,8,0,1,0,1,0,2,0,-1,-1,5,0,160,4,-1,-1\n2004,RI,1,1775,43,580,73,647,51,3002,167,-1,-1,1619,137,894,36,646,29,17,1,41,2,0,0,-1,-1,-1,-1,5,3,0,0,3222,208,-1,-1,-1,-1,-1,-1,571,42,6,0,836,42,3577,284,3577,284,3737,317,-1,-1,-1,5,0,-9,-9,-8,-8,4,0,0,0,1,0,0,0,0,0,0,0,-1,-1,1,0,6,0,-1,-1\n2004,SC,3,20525,1407,551,131,30,0,21106,1538,-1,-1,6747,742,14777,800,190,11,46,3,14,2,0,0,-1,-1,-1,-1,92,4,0,0,21866,1562,-1,-1,-1,-1,-1,-1,5841,653,57,3,9137,957,-9,-9,21918,1681,-9,-9,-1,-1,-1,110,4,175,4,4,0,50,3,0,0,3,0,0,0,0,0,0,0,-1,-1,0,0,57,3,-1,-1\n2004,SD,2,2745,270,5,2,7,18,2757,290,-1,-1,1971,182,147,12,0,0,684,98,0,0,0,0,-1,-1,-1,-1,-9,-9,1,-9,2803,292,-1,-1,-1,-1,-1,-1,1169,213,5,-9,2101,331,-8,-8,2881,313,-8,-8,-1,-1,-1,1,0,17,0,0,0,4,0,0,0,1,0,0,0,0,0,0,0,-1,-1,-9,-9,5,0,-1,-1\n2004,TN,3,13053,1149,0,0,21,3,13074,1152,-1,-1,11625,1260,11944,620,343,14,26,10,41,1,0,0,-1,-1,-1,-1,0,0,0,0,23979,1905,-1,-1,-1,-1,-1,-1,6897,1031,62,3,11687,1821,18907,1215,18490,1180,-9,-9,-1,-1,-1,13,0,141,5,0,0,58,3,0,0,2,0,1,0,1,0,0,0,-1,-1,0,0,62,3,-1,-1\n2004,TX,3,123479,8747,6097,1691,0,0,129576,10438,-1,-1,47635,5971,59065,5438,46726,2472,9,3,2,0,0,0,-1,-1,-1,-1,710,74,0,0,154147,13958,-1,-1,-1,-1,-1,-1,38364,5897,377,17,58249,7555,145892,15116,142438,14784,145892,15116,-1,-1,-1,201,9,8850,198,23,0,337,15,12,0,22,2,3,0,3,0,0,0,-1,-1,0,0,400,17,-1,-1\n2004,UT,4,4208,440,7,0,58,7,4273,447,-1,-1,3734,390,420,24,931,61,224,25,66,3,82,5,-1,-1,-1,-1,-9,-9,25,0,5482,508,-1,-1,-1,-1,-1,-1,1552,288,14,0,2642,409,-9,-9,4419,413,4603,437,-1,-1,-1,7,2,220,0,0,0,6,0,0,0,3,0,1,0,0,0,0,0,-1,-1,4,0,14,0,-1,-1\n2004,VT,1,944,80,120,14,322,49,1386,143,-1,-1,1603,130,128,2,0,0,11,1,13,2,0,0,-1,-1,-1,-1,-9,-9,70,8,1825,143,-1,-1,-1,-1,-1,-1,858,117,1,-9,1976,285,1560,156,1560,156,1227,128,-1,-1,-1,5,2,19,4,-8,-8,1,-9,-9,-9,1,-9,-9,-9,-9,-9,-9,-9,-1,-1,-9,-9,2,-9,-1,-1\n2004,VA,3,27249,2255,0,0,0,0,27249,2255,-1,-1,11188,1289,21022,1397,488,8,7,1,133,8,0,0,-1,-1,-1,-1,17,2,3,1,32858,2706,-1,-1,-1,-1,-1,-1,9817,1289,83,3,9872,1276,28999,2359,-8,-8,-8,-8,-1,-1,-1,28,5,370,41,5,0,59,3,4,0,3,0,0,0,1,0,0,0,-1,-1,16,0,88,3,-1,-1\n2004,WA,4,14623,1298,84,27,390,81,15097,1406,-1,-1,9578,932,3159,221,1491,87,616,68,427,17,-9,-9,-1,-1,-1,-1,-9,-9,13,5,15284,1330,-1,-1,-1,-1,-1,-1,7319,1067,34,3,10151,1509,11260,1244,13718,1344,13718,1344,-1,-1,-1,15,1,1060,16,0,0,26,2,3,-9,5,1,-9,-9,-9,-9,-9,-9,-1,-1,-9,-9,34,3,-1,-1\n2004,WV,3,3588,374,0,0,22,6,3610,380,-1,-1,3909,414,668,43,11,0,17,2,3,0,0,0,-1,-1,-1,-1,0,0,0,0,4608,459,-1,-1,-1,-1,-1,-1,1486,159,13,0,1782,174,3253,337,3701,371,3253,337,-1,-1,-1,0,0,14,0,-8,-8,10,0,0,0,1,0,0,0,1,0,0,0,-1,-1,1,0,13,0,-1,-1\n2004,WI,2,19978,1304,14,0,719,58,20711,1362,-1,-1,10707,742,10042,577,0,0,574,61,-9,-9,192,3,-1,-1,-1,-1,46,2,22,2,21583,1387,-1,-1,-1,-1,-1,-1,4906,522,36,2,7879,717,-9,-9,16645,1153,-9,-9,-1,-1,-1,59,4,-9,-9,-8,-8,30,2,0,0,7,1,0,0,0,0,0,0,-1,-1,0,0,37,3,-1,-1\n2004,WY,4,1071,138,0,0,0,0,1071,138,-1,-1,1352,177,86,7,231,16,96,9,5,1,0,0,-1,-1,-1,-1,0,0,0,0,1770,210,-1,-1,-1,-1,-1,-1,544,101,2,0,594,78,1097,135,1069,121,1049,112,-1,-1,-1,0,0,67,4,0,0,2,0,0,0,0,0,0,0,0,0,0,0,-1,-1,0,0,2,0,-1,-1\n2004,ST,7,1072885,76484,19093,3994,12002,1675,1103980,82153,-1,-1,460347,46273,540435,33851,187868,9560,13744,1638,6215,462,2989,390,-1,-1,-1,-1,7998,415,1552,81,1221151,92670,-1,-1,-1,-1,-1,-1,363675,47625,2921,138,567999,65678,578109,45516,998234,72779,593871,47462,-1,-1,-1,2369,108,55807,1560,56,0,2446,110,121,7,187,10,29,1,42,2,11,0,-1,-1,120,5,3114,142,-1,-1\n2004,US,5,1198895,85568,21350,4606,25788,2758,1252092,92932,-1,-1,554783,53868,608774,37866,187868,9560,16522,1919,8826,735,2989,390,-1,-1,-1,-1,7998,415,1552,81,1389315,104834,-1,-1,-1,-1,-1,-1,405203,51893,3232,156,610406,70181,687607,45516,998234,72779,593871,47462,-1,-1,-1,2369,108,87988,3801,56,0,2723,128,139,7,198,10,35,1,45,2,11,0,-1,-1,120,5,3429,160,-1,-1\n2004,FE,6,126010,9084,2257,612,13786,1083,148112,10779,-1,-1,94436,7595,68339,4015,0,0,2778,281,2611,273,0,0,-1,-1,-1,-1,0,0,0,0,168164,12164,-1,-1,-1,-1,-1,-1,41528,4268,311,18,42407,4503,109498,-7,-9,-9,-9,-9,-1,-1,-1,0,0,32181,2241,0,0,277,18,18,0,11,0,6,0,3,0,0,0,-1,-1,-9,-9,315,18,-1,-1\n2005,AL,3,22428,1142,207,30,186,2,22821,1174,-1,-1,10148,1203,15725,761,0,0,2,1,4,0,0,0,-1,-1,0,0,0,0,44,0,25923,1965,-1,-1,-1,-1,-1,-1,7208,1066,71,4,9351,1308,-8,-8,25206,-7,12444,-7,-1,-1,-1,33,1,65,0,4,0,67,4,0,0,0,0,0,0,0,0,0,0,-1,-1,0,0,71,4,-1,-1\n2005,AK,4,1480,139,261,38,1314,201,3055,378,-1,-1,2092,246,452,36,115,11,1568,160,109,9,-9,-9,-1,-1,-9,-9,-9,-9,11,3,4347,465,-1,-1,-1,-1,-1,-1,-9,-9,3,0,2454,265,2801,297,2895,311,-9,-9,-1,-1,-1,8,2,12,0,-8,-8,3,0,0,0,0,0,0,0,0,0,0,0,-1,-1,1,0,4,0,-1,-1\n2005,AZ,4,24352,2567,1297,329,0,0,25649,2896,-1,-1,12913,1638,3992,323,11747,713,1455,194,62,14,0,0,-1,-1,0,0,399,13,7,1,30575,2896,-1,-1,-1,-1,-1,-1,8916,1153,72,5,10643,1297,25449,2628,30829,3109,27218,2833,-1,-1,-1,77,1,4117,62,0,0,60,5,1,0,8,0,0,0,3,0,0,0,-1,-1,0,0,72,5,-1,-1\n2005,AR,3,11659,752,40,4,0,0,11699,756,-1,-1,6532,774,5622,334,175,11,10,4,18,2,-9,-9,-1,-1,-9,-9,10,0,1,1,12368,1126,-1,-1,-1,-1,-1,-1,4905,998,57,1,8072,1076,12815,685,12598,685,12010,600,-1,-1,-1,19,0,129,6,1,0,38,1,3,0,2,0,2,0,2,0,8,0,-1,-1,1,0,57,1,-1,-1\n2005,CA,4,155313,11076,0,0,1260,386,156573,11462,-1,-1,42863,4436,44975,3285,60385,3173,1448,145,1277,106,264,42,-1,-1,0,0,5361,275,0,0,156573,11462,-1,-1,-1,-1,-1,-1,42601,5996,211,4,109940,12016,-9,-9,154013,10146,81360,5890,-1,-1,-1,5,0,16259,354,2,0,291,14,9,0,32,0,7,0,11,2,0,0,-1,-1,5,1,357,17,-1,-1\n2005,CO,4,15195,1829,0,0,0,0,15195,1829,-1,-1,8946,1180,3845,388,5985,491,352,47,208,14,-9,-9,-1,-1,-9,-9,-9,-9,0,0,19336,2120,-1,-1,-1,-1,-1,-1,5242,870,59,6,8139,1197,-9,-9,12773,1380,11545,1291,-1,-1,-1,32,6,1007,22,0,0,43,3,2,2,6,0,6,1,0,0,2,0,-1,-1,0,0,59,6,-1,-1\n2005,CT,1,11444,671,1829,255,3359,370,16632,1296,-1,-1,5198,639,7764,530,4890,304,32,4,69,12,-9,-9,-1,-1,-9,-9,-9,-9,-9,-9,17953,1489,-1,-1,-1,-1,-1,-1,4957,417,39,2,6249,568,-9,-9,-9,-9,-9,-9,-1,-1,-1,363,20,828,69,1,0,22,2,9,0,7,0,0,0,0,0,0,0,-1,-1,-9,-9,39,2,-1,-1\n2005,DE,3,3715,183,1389,222,1143,136,6247,541,-1,-1,2121,273,3946,266,325,15,1,0,2,1,0,0,-1,-1,0,0,-9,-9,3,0,6398,555,-1,-1,-1,-1,-1,-1,921,70,22,0,1417,166,6162,517,6120,545,5050,425,-1,-1,-1,26,0,255,21,1,0,13,0,0,0,2,0,0,0,0,0,0,0,-1,-1,6,0,22,0,-1,-1\n2005,DC,3,-8,-8,-8,-8,-8,-8,-8,-8,-1,-1,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-1,-1,-1,-1,-1,-1,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-1,-1,-1,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-1,-1,-8,-8,-8,-8,-1,-1\n2005,FL,3,80598,5959,2,0,0,0,80600,5959,-1,-1,38121,3400,42784,2466,2439,255,129,23,59,5,3,2,-1,-1,-9,-9,73,2,7,-9,83615,6153,-1,-1,-1,-1,-1,-1,29362,3745,236,12,38052,4296,-9,-9,82138,6018,61751,4890,-1,-1,-1,178,7,4617,155,1,-9,209,11,13,1,7,-9,4,-9,2,-9,-9,-9,-1,-1,-9,-9,236,12,-1,-1\n2005,GA,3,45848,2893,7,0,0,0,45856,2893,-1,-1,16821,1436,27503,1408,1246,36,51,2,43,3,0,0,-1,-1,0,0,0,0,192,8,45856,2893,-1,-1,-1,-1,-1,-1,9970,1039,121,7,16207,1912,-8,-8,45159,2383,-8,-8,-1,-1,-1,71,4,-9,-9,3,0,97,5,9,1,9,1,2,0,1,0,0,0,-1,-1,0,0,121,7,-1,-1\n2005,HI,4,2087,269,345,87,905,144,3337,500,-1,-1,1201,173,246,28,169,18,29,3,1180,141,2447,354,-1,-1,0,0,72,8,70,7,5414,732,-1,-1,-1,-1,-1,-1,630,104,7,1,1217,222,-9,-9,3487,-7,2451,-7,-1,-1,-1,1,0,93,8,-8,-8,7,1,0,0,0,0,0,0,0,0,0,0,-1,-1,0,0,7,1,-1,-1\n2005,ID,4,4127,526,0,0,0,0,4127,526,-1,-1,4880,717,134,16,1031,86,223,32,30,3,0,0,-1,-1,0,0,31,4,94,6,6423,864,-1,-1,-1,-1,-1,-1,3070,680,16,0,2962,611,5145,700,4888,665,5145,700,-1,-1,-1,3,0,291,2,0,0,14,0,0,0,2,0,0,0,0,0,0,0,-1,-1,0,0,16,0,-1,-1\n2005,IL,2,42194,2725,0,0,0,0,42194,2725,-1,-1,11603,1088,25522,1440,4887,166,55,17,120,14,0,0,-1,-1,0,0,0,0,7,0,42194,2725,-1,-1,-1,-1,-1,-1,22472,3049,72,2,35130,4036,31751,2050,31751,2050,27837,2024,-1,-1,-1,81,1,1033,32,0,0,57,2,5,0,5,0,2,0,0,0,0,0,-1,-1,3,0,72,2,-1,-1\n2005,IN,2,20773,1833,0,0,31,8,20804,1841,-1,-1,12738,1260,8629,561,808,39,47,6,38,1,-9,-9,-1,-1,0,0,-9,-9,311,17,22571,1884,-1,-1,-1,-1,-1,-1,12389,2047,48,2,14175,2324,16307,1283,22013,2154,-9,-9,-1,-1,-1,17,1,305,5,5,0,36,2,2,0,2,0,0,0,2,0,0,0,-1,-1,1,0,48,2,-1,-1\n2005,IA,2,7937,800,0,0,0,0,7937,800,-1,-1,5410,553,1826,184,493,29,69,9,112,25,0,0,-1,-1,0,0,10,0,17,0,7937,800,-1,-1,-1,-1,-1,-1,3102,509,19,0,5371,825,-9,-9,-9,-9,6665,573,-1,-1,-1,15,0,162,7,-8,-8,19,0,0,0,0,0,0,0,0,0,0,0,-1,-1,-9,-9,19,0,-1,-1\n2005,KS,2,8394,696,0,0,0,0,8394,696,-1,-1,4659,390,2757,212,750,55,125,14,76,3,0,0,-1,-1,0,0,0,0,27,0,8394,674,-1,-1,-1,-1,-1,-1,3026,502,18,1,4257,540,8624,733,-9,-9,-9,-9,-1,-1,-1,9,1,221,5,0,0,18,1,0,0,0,0,0,0,0,0,0,0,-1,-1,0,0,18,1,-1,-1\n2005,KY,3,11683,870,83,39,11,0,11777,903,-1,-1,11941,1604,5432,384,219,10,11,3,15,2,0,0,-1,-1,0,0,40,1,0,0,17658,2004,-1,-1,-1,-1,-1,-1,8378,1791,43,3,10569,1891,11340,717,11340,717,-9,-9,-1,-1,-1,0,0,-9,-9,0,0,35,1,0,0,3,0,2,0,0,0,0,0,-1,-1,0,0,40,1,-1,-1\n2005,LA,3,18341,1030,0,0,0,0,18341,1030,-1,-1,10323,1146,26071,1425,27,4,8,0,21,0,0,0,-1,-1,0,0,13,1,0,0,36463,2576,-1,-1,-1,-1,-1,-1,8337,1135,99,4,13544,1582,18341,1030,18960,1090,-9,-9,-1,-1,-1,10,0,109,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-1,-1,0,0,99,4,-1,-1\n2005,ME,1,1723,105,108,14,0,0,1831,119,-1,-1,1669,107,112,3,0,0,39,7,9,2,0,0,-1,-1,0,0,24,5,41,5,1894,129,-1,-1,-1,-1,-1,-1,279,23,1,0,562,42,1815,82,1815,82,1815,82,-1,-1,-1,0,0,10,0,-8,-8,1,0,0,0,0,0,0,0,0,0,0,0,-1,-1,0,0,1,0,-1,-1\n2005,MD,3,20793,998,515,69,176,2,21484,1069,-1,-1,5058,341,16494,749,0,0,9,3,30,3,0,0,-1,-1,0,0,-9,-9,49,1,21640,1097,-1,-1,-1,-1,-1,-1,6006,523,56,1,10013,870,-9,-9,21570,1077,-9,-9,-1,-1,-1,47,4,539,18,-9,-9,-9,-9,-9,-9,-9,-9,-9,-9,-9,-9,-9,-9,-1,-1,-9,-9,56,1,-1,-1\n2005,MA,1,8458,382,5,205,1103,195,9566,782,-1,-1,4306,528,2720,129,2581,117,51,3,116,5,2,0,-1,-1,0,0,-9,-9,137,6,9913,788,-1,-1,-1,-1,-1,-1,2039,227,29,3,1987,272,-9,-9,-9,-9,7186,592,-1,-1,-1,3,0,-9,-9,-8,-8,30,3,0,0,4,0,0,0,0,0,0,0,-1,-1,0,0,34,3,-1,-1\n2005,MI,2,47382,2111,0,0,0,0,47382,2111,-1,-1,21107,1083,24904,977,843,16,341,25,121,5,0,0,-1,-1,0,0,116,5,3,0,47435,2111,-1,-1,-1,-1,-1,-1,7720,627,133,8,11715,898,-8,-8,47691,2146,-8,-8,-1,-1,-1,96,2,700,15,-8,-8,86,8,0,0,5,0,3,0,1,0,0,0,-1,-1,38,0,133,8,-1,-1\n2005,MN,2,7424,518,0,0,12,4,7436,522,-1,-1,4460,351,2792,135,624,23,634,83,204,12,0,0,-1,-1,0,0,-9,-9,2,0,8716,604,-1,-1,-1,-1,-1,-1,4155,513,12,1,6434,692,-8,-8,7630,573,-8,-8,-1,-1,-1,16,0,331,7,-8,-8,10,1,0,0,2,0,0,0,0,0,0,0,-1,-1,0,0,12,1,-1,-1\n2005,MS,3,9017,1482,344,81,320,66,9681,1629,-1,-1,5379,850,13162,913,123,13,22,3,35,5,0,0,-1,-1,0,0,0,0,8,2,18729,1786,-1,-1,-1,-1,-1,-1,6753,902,60,5,8108,1081,-9,-9,22403,-7,-9,-9,-1,-1,-1,55,0,-9,-9,1,0,51,4,1,1,2,0,1,0,1,0,0,0,-1,-1,3,0,60,5,-1,-1\n2005,MO,2,27906,2489,17,3,0,0,27923,2492,-1,-1,15912,1711,11921,686,456,22,12,91,1,0,0,0,-1,-1,0,0,-9,-9,9,1,28311,2511,-1,-1,-1,-1,-1,-1,8736,1605,74,1,16586,2644,-8,-8,28363,2425,-8,-8,-1,-1,-1,20,1,386,22,5,0,60,1,0,0,8,0,0,0,1,0,0,0,-1,-1,-9,-9,74,1,-1,-1\n2005,MT,4,1641,286,0,0,0,0,1641,286,-1,-1,2375,245,73,1,111,8,560,95,9,2,0,0,-1,-1,0,0,0,0,27,3,3155,354,-1,-1,-1,-1,-1,-1,1597,327,14,0,1745,382,-9,-9,1397,194,-9,-9,-1,-1,-1,2,0,6,1,0,0,12,0,0,0,2,0,0,0,0,0,0,0,-1,-1,0,0,14,0,-1,-1\n2005,NE,2,3863,381,90,27,36,8,3989,416,-1,-1,2343,298,1019,67,478,22,167,30,24,0,0,0,-1,-1,0,0,0,4,1,2,4032,423,-1,-1,-1,-1,-1,-1,1657,272,6,2,1734,269,-8,-8,3625,344,2900,275,-1,-1,-1,15,1,158,2,0,0,6,2,0,0,0,0,0,0,0,0,0,0,-1,-1,0,0,6,2,-1,-1\n2005,NV,4,10637,940,78,0,7,0,10722,940,-1,-1,5555,607,2858,225,1870,74,175,16,222,18,0,0,-1,-1,0,0,99,2,1,0,10780,942,-1,-1,-1,-1,-1,-1,2778,323,30,2,4858,621,10215,848,10084,10811,7683,83,-1,-1,-1,16,0,1364,38,0,0,29,2,0,0,2,0,0,0,0,0,0,-9,-1,-1,0,0,31,2,-1,-1\n2005,NH,1,2287,126,4,1,5,0,2296,127,-1,-1,2000,122,132,6,0,0,12,0,16,0,0,0,-1,-1,0,0,0,0,178,10,2338,147,-1,-1,-1,-1,-1,-1,537,61,6,2,1253,133,2300,145,2500,150,2150,140,-1,-1,-1,1,0,51,4,0,0,5,2,0,0,1,0,0,0,0,0,0,0,-1,-1,0,0,6,2,-1,-1\n2005,NJ,1,21893,1126,0,0,0,0,21893,1126,-1,-1,5019,431,16134,824,4635,184,5,0,99,8,0,0,-1,-1,0,0,18,2,0,0,25910,1449,-1,-1,-1,-1,-1,-1,9147,733,60,1,12582,1067,-9,-9,24611,1338,-9,-9,-1,-1,-1,27,1,-9,-9,0,0,48,1,5,0,2,0,0,0,0,0,0,0,-1,-1,5,0,60,1,-1,-1\n2005,NM,4,3559,3,151,0,15,0,3725,3,-1,-1,1416,196,515,61,3600,341,354,55,14,4,1,0,-1,-1,0,0,0,0,5,9,5905,666,-1,-1,-1,-1,-1,-1,2191,385,19,0,3590,489,-8,-8,6094,619,5616,611,-1,-1,-1,2,0,126,0,0,0,18,0,0,0,1,0,0,0,0,0,0,0,-1,-1,0,0,19,0,-1,-1\n2005,NY,1,59706,2768,224,34,271,29,60201,2831,-1,-1,11658,842,30606,1314,16416,608,316,2,320,5,0,0,-1,-1,0,0,388,1,226,30,59930,2802,-1,-1,-1,-1,-1,-1,14888,1166,167,5,24361,1728,56758,3146,58184,3146,51148,2695,-1,-1,-1,216,7,7223,221,0,0,123,4,16,1,19,0,2,0,1,0,0,0,-1,-1,6,0,167,5,-1,-1\n2005,NC,3,29668,1854,4108,735,238,43,34014,2632,-1,-1,11341,1423,20312,1051,0,0,694,66,106,5,0,0,-1,-1,0,0,1265,39,98,5,33816,2589,-1,-1,-1,-1,-1,-1,9158,879,70,3,8987,823,-9,-9,-9,-9,29244,2256,-1,-1,-1,164,5,1155,27,5,0,64,3,1,0,0,0,0,0,0,0,0,0,-1,-1,0,0,70,3,-1,-1\n2005,ND,2,1060,153,58,0,0,0,1118,153,-1,-1,863,102,63,3,61,4,241,45,2,1,0,0,-1,-1,0,0,0,0,0,0,1230,155,-1,-1,-1,-1,-1,-1,708,139,1,0,850,154,910,95,857,95,910,95,-1,-1,-1,4,0,8,1,-8,-8,1,0,0,0,0,0,0,0,0,0,0,0,-1,-1,0,0,1,0,-1,-1\n2005,OH,2,39924,3190,0,0,0,0,39924,3190,-1,-1,20785,1985,20616,1222,937,41,42,6,44,6,0,0,-1,-1,0,0,0,0,170,0,42594,3260,-1,-1,-1,-1,-1,-1,21033,3129,118,4,24635,3463,32915,2616,-9,-9,-9,-9,-1,-1,-1,49,2,539,22,2,0,107,4,1,0,5,0,0,0,2,0,0,0,-1,-1,1,0,118,4,-1,-1\n2005,OK,3,14472,2149,331,47,0,0,14803,2196,-1,-1,12134,1438,6063,612,1196,59,1796,259,54,2,5,0,-1,-1,0,0,39,0,0,0,21287,2370,-1,-1,-1,-1,-1,-1,5388,953,73,6,7194,1356,21489,2656,21489,2656,21489,2656,-1,-1,-1,10,0,92,4,4,0,46,5,2,0,5,0,3,0,5,0,0,1,-1,-1,8,0,73,6,-1,-1\n2005,OR,4,11892,978,15,2,0,0,11907,980,-1,-1,9481,849,1227,88,1280,33,256,39,150,6,0,0,-1,-1,0,0,0,0,3,0,12397,1015,-1,-1,-1,-1,-1,-1,3820,572,40,1,5508,718,-8,-8,11815,831,11815,831,-1,-1,-1,6,0,846,31,0,0,34,1,2,0,2,0,2,0,0,0,0,0,-1,-1,-9,-9,40,1,-1,-1\n2005,PA,1,39430,1936,4,2,65,1,39499,1939,-1,-1,14692,1129,20916,684,4480,179,61,10,166,17,0,0,-1,-1,0,0,0,0,36,10,40351,2029,-1,-1,-1,-1,-1,-1,8026,803,141,8,14473,1024,36257,2090,36257,2090,36257,2090,-1,-1,-1,31,0,507,14,0,0,117,7,10,0,9,1,1,0,0,0,1,0,-1,-1,3,0,141,8,-1,-1\n2005,RI,1,1912,46,683,77,631,65,3226,188,-1,-1,1696,150,971,44,696,30,15,3,41,2,0,0,-1,-1,0,0,4,2,0,0,3423,231,-1,-1,-1,-1,-1,-1,739,31,0,0,773,42,3577,284,3577,284,3737,317,-1,-1,-1,4,0,-9,-9,-8,-8,0,0,0,0,1,0,1,0,0,0,0,0,-1,-1,-9,-9,2,0,-1,-1\n2005,SC,3,20344,1382,576,115,25,0,20945,1497,-1,-1,6810,761,14451,736,227,8,45,2,14,0,0,0,-1,-1,0,0,99,7,0,0,21646,1514,-1,-1,-1,-1,-1,-1,5744,665,73,3,8830,904,-9,-9,21508,1661,-9,-9,-1,-1,-1,113,7,195,4,3,0,60,3,3,0,6,0,0,0,1,0,0,0,-1,-1,0,0,73,3,-1,-1\n2005,SD,2,2990,308,7,2,15,14,3012,324,-1,-1,2185,224,180,10,0,0,739,122,0,0,0,0,-1,-1,0,0,-9,-9,3,0,3107,356,-1,-1,-1,-1,-1,-1,1171,270,4,0,2253,399,-8,-8,3099,346,-8,-8,-1,-1,-1,2,0,17,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,-1,-1,0,0,4,0,-1,-1\n2005,TN,3,12935,1160,0,0,10,3,12945,1163,-1,-1,11906,1370,11984,627,377,15,41,8,39,2,-9,-9,-1,-1,-9,-9,-9,-9,-9,-9,24347,2022,-1,-1,-1,-1,-1,-1,7371,1196,72,3,12692,2018,18907,1215,18490,1180,-9,-9,-1,-1,-1,8,0,150,4,0,0,62,3,0,0,6,0,0,0,2,0,0,0,-1,-1,2,0,72,3,-1,-1\n2005,TX,3,123549,8670,5838,1507,0,0,129387,10177,-1,-1,48901,6077,59320,5150,47530,2651,0,0,0,0,0,0,-1,-1,0,0,786,73,0,0,156537,13951,-1,-1,-1,-1,-1,-1,36686,5759,309,14,63138,7952,149258,12817,145527,12497,149258,12817,-1,-1,-1,155,12,9141,205,18,1,284,18,10,0,21,1,4,0,3,0,0,0,-1,-1,11,0,351,20,-1,-1\n2005,UT,4,4524,431,8,0,78,17,4610,448,-1,-1,3923,421,418,31,1047,78,237,26,70,8,88,5,-1,-1,0,0,0,0,23,0,5806,569,-1,-1,-1,-1,-1,-1,1623,320,8,0,2740,510,-9,-9,5674,529,5858,553,-1,-1,-1,6,1,310,0,0,0,5,0,0,0,2,0,1,0,0,0,0,0,-1,-1,0,0,8,0,-1,-1\n2005,VT,1,1000,94,132,14,337,44,1469,152,-1,-1,1676,142,160,6,0,0,17,1,9,0,0,0,-1,-1,0,0,0,0,64,3,1926,152,-1,-1,-1,-1,-1,-1,847,156,1,0,1937,323,1560,156,1560,156,1227,128,-1,-1,-1,4,1,13,1,-8,-8,5,1,-9,-9,-9,-9,-9,-9,-9,-9,-9,-9,-1,-1,-9,-9,5,1,-1,-1\n2005,VA,3,26959,2194,0,0,0,0,26959,2194,-1,-1,11317,1310,20743,1325,498,13,13,2,131,9,0,0,-1,-1,-9,-9,14,1,2,0,32718,2660,-1,-1,-1,-1,-1,-1,10067,1488,80,4,10624,1551,28999,2359,-8,-8,-8,-8,-1,-1,-1,27,0,0,0,0,0,71,2,3,0,3,2,0,0,1,0,0,0,-1,-1,2,0,80,4,-1,-1\n2005,WA,4,14995,1434,45,17,228,62,15268,1513,-1,-1,9960,987,3207,217,1616,114,593,97,495,26,-9,-9,-1,-1,48,14,-9,-9,8,0,15927,1455,-1,-1,-1,-1,-1,-1,7224,1133,46,-9,10496,1515,11828,1164,13730,1284,13730,1284,-1,-1,-1,3,0,974,12,0,0,40,0,4,0,2,0,-9,-9,-9,-9,-9,-9,-1,-1,-9,-9,46,0,-1,-1\n2005,WV,3,3597,419,0,0,18,2,3615,421,-1,-1,4108,433,662,45,17,0,20,1,1,0,0,0,-1,-1,24,1,0,0,0,0,4832,480,-1,-1,-1,-1,-1,-1,1637,253,10,0,1965,192,3318,337,3771,455,3318,337,-1,-1,-1,0,0,9,0,-8,-8,9,0,1,0,0,0,0,0,0,0,0,0,-1,-1,0,0,10,0,-1,-1\n2005,WI,2,19858,1271,8,1,736,47,20602,1319,-1,-1,10680,754,9481,540,0,0,585,47,0,0,182,3,-1,-1,0,0,47,2,33,6,21368,1352,-1,-1,-1,-1,-1,-1,4445,490,29,1,8097,755,-9,-9,16202,1123,-9,-9,-1,-1,-1,64,2,-9,-9,-8,-8,21,0,2,0,5,1,0,0,0,0,0,0,-1,-1,1,1,29,2,-1,-1\n2005,WY,4,1134,116,0,0,0,0,1134,116,-1,-1,1389,192,87,7,241,12,102,9,5,1,1,1,-1,-1,0,0,0,0,0,0,1825,222,-1,-1,-1,-1,-1,-1,556,120,8,0,609,113,1148,135,1139,121,1119,112,-1,-1,-1,4,0,70,1,0,0,8,0,0,0,0,0,0,0,0,0,0,0,-1,-1,0,0,8,0,-1,-1\n2005,ST,7,1084100,77460,18809,3957,12535,1849,1115445,83260,-1,-1,480614,49615,541528,32535,187631,10081,13809,1820,5990,509,2993,407,-1,-1,72,15,8908,447,1918,136,1243823,95574,-1,-1,-1,-1,-1,-1,370212,51214,2963,132,589078,71132,542392,40785,982429,79466,609936,47180,-1,-1,-1,2118,90,54423,1409,56,1,2446,127,114,6,200,6,43,1,39,2,11,1,-1,-1,97,2,3161,151,-1,-1\n2005,US,5,1215959,86814,21028,4641,26787,2799,1263775,94248,-1,-1,578574,57481,613017,36502,187631,10081,16777,2101,8769,817,2993,407,-1,-1,72,15,8908,447,1918,136,1419019,107996,-1,-1,-1,-1,-1,-1,414322,55827,3326,153,633149,75835,661763,40785,982429,79466,609936,47180,-1,-1,-1,2118,90,87471,3646,56,1,2752,148,139,8,213,6,49,1,54,2,11,1,-1,-1,97,2,3526,174,-1,-1\n2005,FE,6,131859,9354,2219,684,14252,950,148330,10988,-1,-1,97960,7866,71489,3967,0,0,2968,281,2779,308,0,0,-1,-1,0,0,-9,-9,0,0,175196,12422,-1,-1,-1,-1,-1,-1,44110,4613,363,21,44071,4703,119371,-9,-9,-9,-9,-9,-1,-1,-1,0,0,33048,2237,0,0,306,21,25,2,13,0,6,0,15,0,0,0,-1,-1,0,0,365,23,-1,-1\n2006,AL,3,22511,1220,321,42,0,0,22832,1262,-1,-1,10255,1255,15889,793,0,0,2,1,3,0,0,0,-1,-1,0,0,0,0,42,1,26191,2050,-1,-1,-1,-1,-1,-1,7470,1084,44,1,10157,1335,-9,-9,25310,-9,11949,737,-1,-1,-1,67,3,52,0,1,0,43,1,0,0,0,0,0,0,0,0,0,0,-1,-1,0,0,44,1,-1,-1\n2006,AK,4,1466,167,143,23,1359,213,2968,403,-1,-1,2184,282,477,37,105,7,1649,178,119,10,-9,-9,-1,-1,-9,-9,-9,-9,17,4,4551,518,-1,-1,-1,-1,-1,-1,-9,-9,5,1,2457,273,2801,257,2895,311,-9,-9,-1,-1,-1,4,0,11,0,-8,-8,5,1,0,0,0,0,0,0,0,0,0,0,-1,-1,0,0,5,1,-1,-1\n2006,AZ,4,26126,2780,1265,368,0,0,27391,3148,-1,-1,13507,1713,4378,359,12702,821,1579,228,78,15,0,0,-1,-1,0,0,380,14,20,1,32644,3151,-1,-1,-1,-1,-1,-1,10254,1242,61,0,10945,1275,28540,2660,32361,3153,26801,2550,-1,-1,-1,111,1,4352,80,0,0,59,1,1,0,8,0,2,0,2,0,0,0,-1,-1,0,0,72,1,-1,-1\n2006,AR,3,11843,953,49,9,0,0,11892,962,-1,-1,6483,652,5874,336,289,19,10,6,27,1,0,0,-1,-1,0,0,0,0,4,28,12687,1042,-1,-1,-1,-1,-1,-1,3857,687,37,1,4803,873,11640,876,12228,961,11640,876,-1,-1,-1,17,0,165,0,0,0,32,1,2,0,1,0,1,0,1,0,0,0,-1,-1,0,0,37,1,-1,-1\n2006,CA,4,159396,11369,-9,-9,1144,389,160540,11758,-1,-1,43059,4494,46294,3360,62672,3306,1463,160,1245,136,253,52,-1,-1,-9,-9,5784,250,0,0,160770,11758,-1,-1,-1,-1,-1,-1,42508,6132,239,10,117216,13030,-9,-9,156818,11332,77741,5810,-1,-1,-1,0,0,15528,321,1,0,312,3,-9,-9,39,3,13,0,13,0,1,0,-1,-1,37,0,416,6,-1,-1\n2006,CO,4,15165,2031,-9,-9,-9,-9,15165,2031,-1,-1,9285,1268,4005,386,6278,575,393,60,218,13,-9,-9,-1,-1,-9,-9,-9,-9,0,0,20179,2302,-1,-1,-1,-1,-1,-1,5494,881,49,1,8754,1284,-9,-9,12789,1571,11515,1512,-1,-1,-1,29,4,1108,29,0,0,30,1,1,0,6,0,9,0,1,0,2,0,-1,-1,0,0,49,1,-1,-1\n2006,CT,1,11999,689,1968,282,3568,396,17535,1367,-1,-1,5493,714,8168,559,5197,301,35,4,79,16,0,0,-1,-1,-9,-9,9,-9,-9,9,18972,1594,-1,-1,-1,-1,-1,-1,5324,403,16,1,5924,542,-9,-9,-9,-9,-9,-9,-1,-1,-1,405,20,881,75,0,0,18,4,4,0,0,1,1,0,0,0,1,0,-1,-1,3,0,27,5,-1,-1\n2006,DE,3,3900,218,1380,197,1187,139,6467,554,-1,-1,2185,290,4048,260,376,20,1,0,3,1,0,0,-1,-1,0,0,-9,-9,2,0,6615,571,-1,-1,-1,-1,-1,-1,1029,81,8,0,1293,185,5401,371,5039,320,4223,200,-1,-1,-1,23,0,255,8,0,0,9,1,0,0,2,0,0,0,0,0,0,0,-1,-1,1,0,12,1,-1,-1\n2006,DC,3,-8,-8,-8,-8,-8,-8,-8,-8,-1,-1,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-1,-1,-1,-1,-1,-1,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-1,-1,-1,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-1,-1,-8,-8,-8,-8,-1,-1\n2006,FL,3,79038,4894,91,4,-9,-9,79129,4898,-1,-1,38327,3554,42930,2466,2539,253,93,26,-9,-9,-9,-9,-1,-1,-9,-9,208,11,4,0,84101,6310,-1,-1,-1,-1,-1,-1,32025,4130,257,12,31673,3925,-9,-9,85111,6678,64034,5437,-1,-1,-1,210,11,5731,256,4,0,-9,-9,-9,-9,-9,-9,-9,-9,-9,-9,-9,-9,-1,-1,-9,-9,-9,-9,-1,-1\n2006,GA,3,49224,3557,11,0,-9,-9,49235,3557,-1,-1,18126,1845,28927,1603,1317,68,598,24,44,3,0,0,-1,-1,0,0,-9,-9,223,14,49235,3557,-1,-1,-1,-1,-1,-1,15871,2354,108,4,16090,1921,-9,-9,52077,3907,-9,-9,-1,-1,-1,57,4,872,16,0,0,87,2,9,1,9,1,2,0,1,0,0,0,-1,-1,0,0,108,4,-1,-1\n2006,HI,4,2000,249,266,57,885,138,3151,444,-1,-1,1158,192,232,26,169,22,30,4,1106,132,2406,339,-1,-1,-9,-9,51,3,81,16,5233,734,-1,-1,-1,-1,-1,-1,630,134,4,1,1255,259,-9,-9,3487,-9,2451,-9,-1,-1,-1,1,0,95,8,-8,-8,3,1,-9,-9,-9,-9,-9,-9,-9,-9,1,0,-1,-1,-9,-9,4,1,-1,-1\n2006,ID,4,4104,636,-9,-9,-9,-9,4104,636,-1,-1,4781,620,135,15,1024,91,236,41,34,3,-9,-9,-1,-1,-9,-9,30,2,107,5,6347,777,-1,-1,-1,-1,-1,-1,3199,672,16,4,3110,725,5452,623,5179,592,5452,623,-1,-1,-1,2,1,217,16,0,0,14,4,-9,-9,2,0,0,0,0,0,0,0,-1,-1,0,0,16,4,-1,-1\n2006,IL,2,42386,2720,-9,-9,-9,-9,42386,2720,-1,-1,11753,1144,25809,1374,4883,158,61,20,127,25,0,0,-1,-1,0,0,0,0,8,0,42639,2713,-1,-1,-1,-1,-1,-1,22980,3046,61,0,32286,4064,31921,2050,31921,2050,28038,31921,-1,-1,-1,95,8,1245,32,-9,-9,-9,-9,-9,-9,-9,-9,-9,-9,-9,-9,-9,-9,-1,-1,-9,-9,61,-9,-1,-1\n2006,IN,2,21519,2062,0,0,24,6,21543,2068,-1,-1,13459,1447,9291,658,963,36,43,6,-9,-9,-9,-9,-1,-1,3,12,38,5,127,3,23924,2167,-1,-1,-1,-1,-1,-1,13020,2099,68,2,14389,2228,-9,-9,22691,2117,-9,-9,-1,-1,-1,27,2,381,7,1,0,61,2,0,0,4,0,1,0,0,0,1,0,-1,-1,-9,-9,68,2,-1,-1\n2006,IA,2,8049,789,-9,-9,-9,-9,8049,789,-1,-1,5948,752,2101,209,538,44,113,28,83,5,0,0,-1,-1,-9,-9,-9,-9,28,1,8048,790,-1,-1,-1,-1,-1,-1,3075,461,12,0,5353,877,-9,-9,-9,-9,6683,573,-1,-1,-1,17,0,186,3,-8,-8,11,0,1,0,0,0,0,0,0,0,0,0,-1,-1,0,0,12,0,-1,-1\n2006,KS,2,8180,653,-9,-9,-9,-9,8180,653,-1,-1,4498,382,2699,185,770,52,112,15,73,4,-9,9,-1,-1,-9,-9,0,0,26,0,8178,638,-1,-1,-1,-1,-1,-1,3048,524,16,0,4667,669,8649,748,-9,-9,-9,-9,-1,-1,-1,12,1,261,3,0,0,14,0,0,0,1,0,0,0,1,0,0,0,-1,-1,0,0,16,0,-1,-1\n2006,KY,3,12054,882,95,38,13,0,12162,920,-1,-1,12156,1668,5519,383,245,6,7,2,17,1,0,0,-1,-1,0,0,27,8,19,0,17990,2068,-1,-1,-1,-1,-1,-1,8662,1910,87,11,11211,2265,-9,-9,12580,1172,-9,-9,-1,-1,-1,0,0,-9,-9,0,0,41,1,-9,-9,0,1,0,0,0,0,0,0,-1,-1,0,0,41,2,-1,-1\n2006,LA,3,19110,1133,0,0,560,12,19670,1145,-1,-1,9282,1132,24627,1239,29,2,8,1,24,2,24,0,-1,-1,-9,-9,5,1,-9,-9,33999,2377,-1,-1,-1,-1,-1,-1,8545,1181,85,2,13373,1396,19670,1145,19190,1162,-9,-9,-1,-1,-1,9,0,99,9,0,0,-9,-9,-9,-9,-9,-9,-9,-9,-9,-9,-9,-9,-1,-1,-9,-9,85,2,-1,-1\n2006,ME,1,1810,126,115,13,0,0,1925,139,-1,-1,1739,131,122,4,33,1,41,3,9,2,0,0,-1,-1,0,0,19,3,12,0,1975,145,-1,-1,-1,-1,-1,-1,367,26,5,0,495,27,1815,70,1815,70,1815,70,-1,-1,-1,0,0,10,0,-8,-8,5,0,0,0,0,0,0,0,0,0,0,0,-1,-1,0,0,5,0,-1,-1\n2006,MD,3,20993,1005,560,60,41,3,21594,1068,-1,-1,5084,369,16686,705,-9,-9,7,2,33,5,-9,-9,-1,-1,-9,-9,-9,-9,54,0,21864,1081,-1,-1,-1,-1,-1,-1,6065,563,60,2,9553,803,-9,-9,22350,1080,-9,-9,-1,-1,-1,66,2,463,25,0,0,41,1,3,0,5,1,0,0,4,0,0,0,-1,-1,7,0,60,2,-1,-1\n2006,MA,1,8822,415,7,202,1102,225,9931,842,-1,-1,4420,557,2812,149,2706,127,58,3,116,3,2,0,-1,-1,-9,-9,-9,-9,72,7,10186,846,-1,-1,-1,-1,-1,-1,2123,295,29,0,2015,303,-9,-9,-9,-9,7210,592,-1,-1,-1,3,1,863,52,-8,-8,32,0,0,0,6,1,0,0,0,0,0,0,-1,-1,-9,-9,38,1,-1,-1\n2006,MI,2,49352,2163,-9,-9,-9,-9,49352,2163,-1,-1,22176,1121,25803,999,785,13,377,22,124,8,-9,-9,-1,-1,-9,-9,141,7,1,0,49407,2170,-1,-1,-1,-1,-1,-1,8357,714,134,4,11703,984,-9,-9,49762,2224,-9,-9,-1,-1,-1,112,0,655,9,-8,-8,101,2,1,0,8,0,1,0,0,0,0,0,-1,-1,23,2,134,4,-1,-1\n2006,MN,2,7303,522,-9,-9,10,0,7313,522,-1,-1,4291,332,2770,124,608,21,665,70,210,14,0,0,-1,-1,-9,-9,0,0,2,1,8546,562,-1,-1,-1,-1,-1,-1,4269,501,9,0,6828,763,-9,-9,7382,573,-9,-9,-1,-1,-1,11,0,294,10,-8,-8,9,0,0,0,0,0,0,0,0,0,0,0,-1,-1,0,0,9,0,-1,-1\n2006,MS,3,8996,1422,313,90,602,101,9911,1613,-1,-1,5640,856,13451,916,124,11,22,2,29,4,0,0,-1,-1,0,0,-9,-9,13,0,19279,1789,-1,-1,-1,-1,-1,-1,7643,1041,55,6,8905,1264,-9,-9,22116,-7,22116,-9,-1,-1,-1,37,1,-9,-9,1,0,51,5,0,0,2,1,0,0,0,0,0,0,-1,-1,1,0,55,6,-1,-1\n2006,MO,2,27518,2577,21,0,0,0,27539,2577,-1,-1,15500,1812,11419,718,471,29,96,12,38,3,0,0,-1,-1,0,0,0,0,60,3,27584,2577,-1,-1,-1,-1,-1,-1,8362,1484,64,2,17705,2590,-9,-9,28297,2500,-9,-9,-1,-1,-1,37,1,385,24,0,0,58,2,0,0,5,0,1,0,0,0,0,0,-1,-1,-9,-9,64,2,-1,-1\n2006,MT,4,1523,230,-9,-9,-9,-9,1523,230,-1,-1,2382,235,80,1,116,9,581,106,5,2,0,0,-1,-1,0,0,18,4,6,2,3188,359,-1,-1,-1,-1,-1,-1,1485,364,6,0,1853,468,-9,-9,1467,194,-9,-9,-1,-1,-1,0,1,6,0,1,-9,4,-9,-9,-9,1,-9,-9,-9,-9,-9,-9,-9,-1,-1,-9,-9,6,-9,-1,-1\n2006,NE,2,3784,372,169,38,30,6,3983,416,-1,-1,2250,272,1020,75,511,21,181,38,31,1,-9,-9,-1,-1,-9,-9,0,6,1,0,3994,413,-1,-1,-1,-1,-1,-1,1453,234,7,2,1820,286,-9,-9,3625,344,2900,275,-1,-1,-1,8,0,185,0,0,0,7,2,0,0,0,0,0,0,0,0,0,0,-1,-1,0,0,7,2,-1,-1\n2006,NV,4,11534,1126,86,0,8,0,11628,1126,-1,-1,5861,737,3237,252,2081,94,182,19,237,25,0,0,-1,-1,0,0,80,0,31,3,11709,1130,-1,-1,-1,-1,-1,-1,4672,734,0,0,4532,454,10215,846,10084,727,7683,643,-1,-1,-1,0,0,-9,-9,1,0,26,1,0,1,5,0,0,0,2,0,0,0,-1,-1,-9,-9,34,2,-1,-1\n2006,NH,1,2465,148,45,16,2,0,2512,164,-1,-1,2259,148,155,10,-9,-9,15,1,0,0,0,0,-1,-1,0,0,0,0,204,13,2633,172,-1,-1,-1,-1,-1,-1,616,75,6,0,1187,159,2214,140,-9,-9,2214,140,-1,-1,-1,0,1,51,4,0,0,5,0,0,0,1,0,0,0,0,0,0,0,-1,-1,0,0,6,0,-1,-1\n2006,NJ,1,21866,1086,-9,-9,-9,-9,21866,1086,-1,-1,5171,414,15997,808,4655,196,8,0,104,9,0,0,-1,-1,-9,-9,8,1,0,0,25943,1428,-1,-1,-1,-1,-1,-1,9209,798,72,4,12906,1080,-9,-9,22245,1112,16228,648,-1,-1,-1,17,0,-9,-9,0,0,51,2,4,1,5,1,3,0,1,0,0,0,-1,-1,8,0,72,4,-1,-1\n2006,NM,4,3538,2,146,0,23,0,3707,2,-1,-1,1420,198,532,57,3588,359,409,42,15,3,3,0,-1,-1,0,0,0,0,5,8,5972,667,-1,-1,-1,-1,-1,-1,2190,320,13,0,3671,603,-9,-9,6072,813,5616,803,-1,-1,-1,0,0,121,1,0,0,13,0,0,0,1,0,0,0,0,0,0,0,-1,-1,0,0,14,0,-1,-1\n2006,NY,1,60153,2810,292,49,224,10,60669,2869,-1,-1,12095,864,31048,1314,16081,625,309,6,306,8,-9,-9,-1,-1,-9,-9,347,26,259,16,60445,2859,-1,-1,-1,-1,-1,-1,15072,1180,129,2,24106,1698,56816,3146,58242,3146,54908,2855,-1,-1,-1,211,8,6699,213,0,0,106,1,9,0,7,1,5,0,0,0,0,0,-1,-1,2,0,129,2,-1,-1\n2006,NC,3,30336,1883,4438,803,230,35,35004,2721,-1,-1,11640,1491,20660,1068,-9,-9,675,64,94,5,-9,-9,-1,-1,-9,-9,1304,51,401,7,34774,2686,-1,-1,-1,-1,-1,-1,9604,855,77,2,9200,828,-9,-9,33366,-9,-9,-9,-1,-1,-1,176,12,1272,27,4,0,70,5,3,1,5,0,3,0,0,0,0,0,-1,-1,3,0,88,6,-1,-1\n2006,ND,2,1179,158,-9,-9,-9,-9,1179,158,-1,-1,825,111,73,1,76,1,247,51,3,1,0,0,-1,-1,0,0,0,0,0,0,1224,165,-1,-1,-1,-1,-1,-1,700,143,1,0,854,186,910,134,857,134,910,134,-1,-1,-1,1,0,6,1,-8,-8,1,0,0,0,0,0,0,0,0,0,0,0,-1,-1,0,0,1,0,-1,-1\n2006,OH,2,42755,3647,-9,-9,-9,-9,42755,3647,-1,-1,22096,2338,22051,1313,1046,41,45,4,45,4,-9,-9,-1,-1,-9,-9,0,0,182,1,45465,3701,-1,-1,-1,-1,-1,-1,23465,3710,106,6,24990,3595,34875,2735,-9,-9,-9,-9,-1,-1,-1,63,1,577,26,4,0,94,6,4,0,4,0,0,0,0,0,0,0,-1,-1,0,0,106,6,-1,-1\n2006,OK,3,14598,2198,319,50,-9,-9,14917,2248,-1,-1,12097,1421,6482,619,1339,85,1861,271,57,5,7,0,-1,-1,-9,-9,40,1,3,0,21886,2402,-1,-1,-1,-1,-1,-1,5295,796,81,3,6842,1185,22267,2652,22267,2652,22267,2652,-1,-1,-1,4,1,271,12,4,0,63,3,1,0,5,0,2,0,4,0,0,0,-1,-1,2,0,81,3,-1,-1\n2006,OR,4,12171,984,29,7,0,0,12200,991,-1,-1,9612,848,1297,92,1412,40,251,36,165,7,-9,-9,-1,-1,-9,-9,0,0,4,0,12741,1023,-1,-1,-1,-1,-1,-1,3227,470,39,2,4556,589,-9,-9,12196,992,12196,992,-1,-1,-1,6,0,1244,48,0,0,-9,-9,-9,-9,-9,-9,-9,-9,-9,-9,-9,-9,-1,-1,-9,-9,-9,-9,-1,-1\n2006,PA,1,40468,2106,1,2,384,48,40853,2156,-1,-1,15569,1277,21545,746,4759,181,57,10,169,16,-9,-9,-1,-1,-9,-9,49,19,0,0,42148,2249,-1,-1,-1,-1,-1,-1,8751,827,122,4,14868,1219,36457,2090,36457,2090,36457,2090,-1,-1,-1,36,2,492,5,0,0,91,3,12,1,5,0,2,0,0,0,2,0,-1,-1,10,0,122,4,-1,-1\n2006,RI,1,2007,57,683,87,794,85,3484,229,-1,-1,1782,170,1074,61,787,39,18,3,42,1,-9,9,-1,-1,-9,-9,11,5,2,1,3716,280,-1,-1,-1,-1,-1,-1,709,45,4,0,964,71,3577,315,3577,315,3737,348,-1,-1,-1,5,0,-9,-9,-8,-8,1,0,1,0,2,0,0,0,0,0,0,0,-1,-1,3,1,7,1,-1,-1\n2006,SC,3,20683,1468,627,121,18,0,21328,1589,-1,-1,6861,805,14717,774,279,13,43,5,17,0,0,0,-1,-1,-9,-9,96,6,-9,-9,22013,1603,-1,-1,-1,-1,-1,-1,5583,715,64,2,8352,871,-9,-9,21786,1664,-9,-9,-1,-1,-1,121,8,218,6,1,0,57,1,2,1,2,0,0,0,2,0,0,0,-1,-1,0,0,64,2,-1,-1\n2006,SD,2,2933,329,7,2,29,4,2969,335,-1,-1,1938,215,167,8,90,8,802,119,11,0,-9,-9,-1,-1,-9,-9,-9,9,1,0,3009,350,-1,-1,-1,-1,-1,-1,1056,240,5,0,2693,453,-9,-9,3192,402,-9,-9,-1,-1,-1,0,1,52,1,0,0,4,0,0,0,0,0,1,0,0,0,0,0,-1,-1,-9,-9,5,0,-1,-1\n2006,TN,3,13001,1167,-9,-9,11,7,13012,1174,-1,-1,11670,1308,11639,620,395,18,43,8,40,4,0,0,-1,-1,0,0,0,0,0,0,23787,1958,-1,-1,-1,-1,-1,-1,6783,1130,67,3,13372,2136,18907,1215,18490,1180,-9,-9,-1,-1,-1,14,0,173,7,1,0,57,23,0,0,6,0,0,0,1,0,0,0,-1,-1,2,0,67,3,-1,-1\n2006,TX,3,123832,8587,6043,1421,0,0,129875,10008,-1,-1,48942,6076,59492,4925,49076,2721,-9,-9,-9,-9,-9,-9,-1,-1,-9,-9,807,77,-9,-9,158317,13799,-1,-1,-1,-1,-1,-1,36891,5785,418,16,62285,8128,149719,12789,146113,12789,149719,12789,-1,-1,-1,156,6,9025,202,24,0,379,19,6,0,29,1,3,0,6,0,0,0,-1,-1,-9,-9,447,20,-1,-1\n2006,UT,4,4471,468,12,2,59,19,4542,489,-1,-1,3902,434,438,38,1019,99,262,31,76,9,94,7,-1,-1,0,0,0,0,22,0,5813,618,-1,-1,-1,-1,-1,-1,1551,331,9,0,2931,538,-9,-9,5900,529,6086,553,-1,-1,-1,1,0,255,3,0,0,7,0,0,0,1,0,1,0,0,0,0,0,-1,-1,0,0,9,0,-1,-1\n2006,VT,1,1007,105,157,20,370,32,1534,157,-1,-1,1750,143,206,8,9,-9,13,1,11,1,-9,-9,-1,-1,-9,-9,-9,-9,78,4,2058,157,-1,-1,-1,-1,-1,-1,898,127,6,0,1993,336,1560,172,1560,172,1227,144,-1,-1,-1,4,1,15,1,-8,-8,7,0,0,0,0,0,0,0,0,0,0,0,-1,-1,0,0,7,0,-1,-1\n2006,VA,3,26987,2287,0,0,-9,-9,26987,2287,-1,-1,11649,1421,21502,1455,557,15,12,3,131,8,0,0,-1,-1,0,0,12,1,1,0,33864,2903,-1,-1,-1,-1,-1,-1,10719,1537,76,2,11300,1494,29382,2359,-9,-9,-9,-9,-1,-1,-1,31,0,-9,-9,4,0,71,2,1,0,3,0,1,0,0,0,0,0,-1,-1,0,0,80,2,-1,-1\n2006,WA,4,15053,1472,54,24,178,46,15285,1542,-1,-1,10036,1018,3207,224,1663,124,606,80,495,32,-9,-9,-1,-1,48,17,-9,-9,10,1,16065,1496,-1,-1,-1,-1,-1,-1,7273,1146,30,1,13544,1901,12007,1164,13830,1284,13830,1284,-1,-1,-1,0,0,938,13,0,0,26,1,1,0,0,0,1,0,2,0,0,0,-1,-1,0,0,30,1,-1,-1\n2006,WV,3,3933,420,-9,-9,9,5,3942,425,-1,-1,4345,518,749,51,22,0,10,2,5,0,6,1,-1,-1,22,2,-9,-9,-9,-9,5159,574,-1,-1,-1,-1,-1,-1,1360,203,13,0,2107,300,3318,337,3891,455,3438,337,-1,-1,-1,0,0,16,2,-8,-8,13,0,0,0,0,0,0,0,0,0,0,0,-1,-1,0,0,13,0,-1,-1\n2006,WI,2,20416,35,5,0,746,69,21157,1404,-1,-1,11040,799,10070,555,-9,-9,628,58,-9,-9,199,3,-1,-1,-9,-9,36,3,32,8,22005,1426,-1,-1,-1,-1,-1,-1,4728,505,43,0,8029,720,-9,-9,16289,1123,-9,-9,-1,-1,-1,50,3,-9,-9,-8,-8,31,0,3,0,7,0,0,0,0,0,0,0,-1,-1,4,0,45,0,-1,-1\n2006,WY,4,1081,171,0,0,0,0,1081,171,-1,-1,1413,203,93,8,255,15,100,14,8,1,2,2,-1,-1,0,0,0,0,0,0,1871,243,-1,-1,-1,-1,-1,-1,614,115,3,0,675,109,1213,298,1153,283,1150,278,-1,-1,-1,3,0,72,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,-1,-1,0,0,3,0,-1,-1\n2006,ST,7,1104638,78548,19718,4027,13610,1988,1137956,85863,-1,-1,489394,52046,551997,32946,194639,10687,15057,1890,5906,548,2996,422,-1,-1,73,31,9500,513,2164,157,1270943,98948,-1,-1,-1,-1,-1,-1,388081,54030,2926,114,591790,73267,499326,39192,1054057,74173,622234,77866,-1,-1,-1,2259,105,55797,1555,52,0,2223,102,69,6,187,12,53,0,41,0,8,0,-1,-1,106,3,2881,105,-1,-1\n2006,US,5,1241907,88684,21704,4652,25884,2816,1289485,97452,-1,-1,589728,60437,625842,36860,194639,10687,18105,2196,8750,912,2996,422,-1,-1,73,31,9500,513,2164,157,1451014,111923,-1,-1,-1,-1,-1,-1,433545,58770,3241,134,635656,77875,618569,39192,1054057,74173,622234,77866,-1,-1,-1,2259,105,87353,3700,52,0,2499,120,80,7,199,12,55,0,49,0,8,0,-1,-1,106,3,3190,124,-1,-1\n2006,FE,6,137269,10136,1986,625,12274,828,151529,11589,-1,-1,100334,8391,73845,3914,-9,-9,3048,306,2844,364,-9,-9,-1,-1,-9,-9,-9,-9,-9,-9,180071,12975,-1,-1,-1,-1,-1,-1,45464,4740,315,20,43866,4608,119243,-9,-9,-9,-9,-9,-1,-1,-1,0,0,31556,2145,0,0,276,18,11,1,12,0,2,0,8,0,0,0,-1,-1,0,0,309,19,-1,-1\n2007,AL,3,23095,1484,268,51,0,0,23363,1535,-1,-1,10520,1275,16690,883,-9,-9,2,0,3,0,-9,-9,-1,-1,-9,-9,39,0,-9,-9,27254,2158,-1,-1,-1,-1,-1,-1,8025,1222,68,3,9880,1435,-9,-9,25686,-9,12571,1157,-1,-1,-1,106,2,105,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2007,AK,4,1603,214,197,40,1362,211,3162,465,-1,-1,2274,296,481,50,99,12,1604,193,127,9,-9,-9,-1,-1,-9,-9,-9,-9,18,4,4603,564,-1,-1,-1,-1,-1,-1,-9,-9,3,1,2851,465,2801,257,2895,311,-9,-9,-1,-1,-1,10,0,14,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2007,AZ,4,25078,3113,1372,347,0,0,26450,3460,-1,-1,13668,1843,4570,403,13762,911,1738,267,81,22,0,0,-1,-1,0,0,431,12,36,2,34286,3460,-1,-1,-1,-1,-1,-1,10466,1446,74,2,11209,1358,26347,2772,35898,3792,31514,2960,-1,-1,-1,125,4,4797,77,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2007,AR,3,12310,961,4,0,0,0,12314,961,-1,-1,6677,691,6140,341,378,24,15,5,28,5,0,0,-1,-1,0,0,0,0,10,0,13248,1066,-1,-1,-1,-1,-1,-1,4167,604,52,-9,5366,688,12113,848,12677,933,12015,848,-1,-1,-1,19,0,168,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2007,CA,4,159022,11107,-9,-9,1006,309,160028,11416,-1,-1,42352,4319,46975,3326,64361,3381,1455,177,1252,147,275,46,-1,-1,-9,-9,5984,232,0,0,162654,11628,-1,-1,-1,-1,-1,-1,41115,5865,209,10,122480,13608,-9,-9,154360,11049,77627,5309,-1,-1,-1,0,0,18060,387,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2007,CO,4,15720,2068,-9,-9,-9,-9,15720,2068,-1,-1,9235,1247,4066,404,6535,608,445,62,225,14,-9,-9,-1,-1,-9,-9,-9,-9,0,0,20506,2335,-1,-1,-1,-1,-1,-1,5557,913,51,3,9609,1497,-9,-9,13328,1609,11515,1512,-1,-1,-1,35,2,1093,30,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2007,CT,1,12664,707,1929,248,3551,339,18144,1294,-1,-1,5611,672,8427,517,5268,295,38,5,84,7,0,0,-1,-1,-9,-9,-9,-9,-9,-9,19428,1496,-1,-1,-1,-1,-1,-1,5105,411,22,-9,6035,542,-9,-9,-9,-9,-9,-9,-1,-1,-1,417,27,734,54,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2007,DE,3,3933,204,1415,197,1202,159,6550,560,-1,-1,2226,294,4080,254,365,25,3,0,7,2,0,0,-1,-1,0,0,0,0,1,0,6682,575,-1,-1,-1,-1,-1,-1,1267,119,13,1,1614,298,6699,404,6437,320,5119,200,-1,-1,-1,28,0,295,12,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2007,DC,3,-8,-8,-8,-8,-8,-8,-8,-8,-1,-1,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-1,-1,-1,-1,-1,-1,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-1,-1,-1,-8,-8,-8,-8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2007,FL,3,81515,4903,0,0,0,0,81515,4903,-1,-1,35356,3807,45940,2602,9823,414,97,20,7,1,-9,-9,-1,-1,-9,-9,142,10,0,0,91365,6854,-1,-1,-1,-1,-1,-1,28714,3539,204,8,25487,3218,-9,-9,88556,6685,67057,5499,-1,-1,-1,-9,-9,-9,-9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2007,GA,3,50687,3545,24,0,-9,-9,50711,3545,-1,-1,18824,1935,31552,1589,0,0,58,4,50,3,0,0,-1,-1,-9,-9,-9,-9,227,14,50711,3545,-1,-1,-1,-1,-1,-1,10934,1222,117,9,17182,2116,-9,-9,53809,4422,-9,-9,-1,-1,-1,60,5,1849,57,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2007,HI,4,1805,256,318,69,758,122,2881,447,-1,-1,1142,193,226,21,193,18,34,6,1109,123,2360,363,-1,-1,-9,-9,50,3,118,19,5232,746,-1,-1,-1,-1,-1,-1,653,90,12,1,1308,223,-9,-9,3487,-9,2451,-9,-1,-1,-1,1,0,94,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2007,ID,4,4360,726,-9,-9,-9,-9,4360,726,-1,-1,4844,649,142,9,1084,91,224,38,32,2,-9,-9,-1,-1,-9,-9,32,5,161,6,6519,800,-1,-1,-1,-1,-1,-1,3199,616,19,0,3249,619,5705,643,5420,611,5705,643,-1,-1,-1,1,0,282,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2007,IL,2,42391,2824,-9,-9,0,0,42391,2824,-1,-1,11691,1135,25284,1503,5234,157,55,17,119,12,0,0,-1,-1,-9,-9,0,0,8,0,42391,2824,-1,-1,-1,-1,-1,-1,22443,2882,105,2,32582,3337,32235,2065,32235,2065,28352,2039,-1,-1,-1,-9,-9,-9,-9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2007,IN,2,21319,2117,0,0,18,0,21337,2117,-1,-1,11690,1394,8612,640,912,46,37,8,10,2,13,6,-1,-1,-9,-9,-9,-9,28,12,21319,2108,-1,-1,-1,-1,-1,-1,9625,1745,55,2,14795,2513,-9,-9,22860,2129,-9,-9,-1,-1,-1,51,1,439,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2007,IA,2,7977,715,-9,-9,-9,-9,7977,715,-1,-1,5262,522,2026,153,515,23,127,16,64,3,0,0,-1,-1,-9,-9,-9,-9,21,-9,8015,717,-1,-1,-1,-1,-1,-1,2869,428,16,1,5033,805,-9,-9,-9,-9,6698,715,-1,-1,-1,15,0,195,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2007,KS,2,8075,646,-9,-9,-9,-9,8075,646,-1,-1,4385,368,2678,191,791,50,120,12,63,3,-9,-9,-1,-1,-9,-9,0,0,34,1,8071,625,-1,-1,-1,-1,-1,-1,2848,487,19,1,4387,598,8553,764,-9,-9,-9,-9,-1,-1,-1,10,0,276,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2007,KY,3,12009,826,51,25,44,5,12104,856,-1,-1,13498,1971,6192,446,245,8,15,1,30,4,0,0,-1,-1,36,11,0,0,0,0,20016,2441,-1,-1,-1,-1,-1,-1,8926,2043,113,9,11556,2432,-9,-9,12540,1142,12853,1164,-1,-1,-1,0,0,43,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2007,LA,3,19101,1162,0,0,191,7,19292,1169,-1,-1,9904,1233,25097,1219,29,2,9,2,19,1,21,0,-1,-1,-9,-9,3,1,0,0,35082,2458,-1,-1,-1,-1,-1,-1,8222,1138,105,4,13602,1517,19292,1169,19509,1132,-9,-9,-1,-1,-1,11,0,100,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2007,ME,1,1797,110,180,19,0,0,1977,129,-1,-1,1774,122,122,5,-9,-9,39,4,5,1,0,1,-1,-1,0,0,0,0,69,6,2009,139,-1,-1,-1,-1,-1,-1,510,43,0,0,1021,101,1815,70,1815,70,1815,70,-1,-1,-1,0,0,14,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2007,MD,3,21251,1125,598,43,16,0,21865,1168,-1,-1,4977,388,16446,728,-9,-9,8,2,32,3,-9,-9,-1,-1,-9,-9,-9,-9,786,63,22249,1184,-1,-1,-1,-1,-1,-1,6238,608,59,1,9700,724,-9,-9,21974,1181,-9,-9,-1,-1,-1,35,3,549,21,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2007,MA,1,9324,436,5,173,948,185,10277,794,-1,-1,4441,522,3073,126,2917,122,71,1,119,5,1,0,-1,-1,-9,-9,-9,-9,24,14,10646,790,-1,-1,-1,-1,-1,-1,2174,250,24,1,2019,285,-9,-9,-9,-9,7283,592,-1,-1,-1,3,1,917,41,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2007,MI,2,48153,2080,-9,-9,-9,-9,48153,2080,-1,-1,21666,1089,25143,943,698,12,372,19,115,8,-9,-9,-1,-1,-9,-9,159,9,0,0,48153,2080,-1,-1,-1,-1,-1,-1,8042,672,81,0,13694,1025,-9,-9,49118,2225,-9,-9,-1,-1,-1,144,5,614,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2007,MN,2,7384,593,-9,-9,29,3,7413,596,-1,-1,4354,354,2966,132,641,24,698,75,207,17,-9,-9,-1,-1,-9,-9,-9,-9,-9,-9,8866,602,-1,-1,-1,-1,-1,-1,4533,534,13,0,7214,757,-9,-9,7234,573,-9,-9,-1,-1,-1,10,0,275,9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2007,MS,3,10559,1645,336,96,42,6,10937,1747,-1,-1,5922,956,14308,992,166,7,18,3,37,2,0,0,-1,-1,0,0,0,0,18,1,20469,1961,-1,-1,-1,-1,-1,-1,7448,1075,86,8,7375,1098,-9,-9,22725,-9,22725,-9,-1,-1,-1,71,1,-9,-9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2007,MO,2,27294,2516,9,4,0,0,27303,2520,-1,-1,15362,1775,11356,696,472,30,96,13,55,7,-9,-9,-1,-1,-9,-9,-9,-9,14,1,27355,2522,-1,-1,-1,-1,-1,-1,8302,1433,83,1,16949,2693,-9,-9,28363,2425,-9,-9,-1,-1,-1,17,4,423,24,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2007,MT,4,1421,164,-9,-9,-9,-9,1421,164,-1,-1,2299,194,87,1,127,13,591,88,7,0,0,0,-1,-1,10,1,0,0,12,1,3133,298,-1,-1,-1,-1,-1,-1,1270,227,8,0,1848,414,-9,-9,1387,194,-9,-9,-1,-1,-1,3,0,5,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2007,NE,2,3838,352,156,32,20,4,4014,388,-1,-1,2291,248,1074,75,528,26,183,32,29,1,1,0,-1,-1,-9,-9,0,7,0,0,4106,389,-1,-1,-1,-1,-1,-1,1547,251,11,1,1681,302,-9,-9,3625,344,2900,275,-1,-1,-1,12,1,174,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2007,NV,4,12038,1175,90,0,8,0,12136,1175,-1,-1,6117,769,3378,263,2172,98,190,20,247,26,0,0,-1,-1,0,0,83,0,32,3,12219,1179,-1,-1,-1,-1,-1,-1,4876,766,0,0,4730,474,11061,-9,10811,-9,8326,-9,-1,-1,-1,47,0,1029,24,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2007,NH,1,2557,187,8,5,2,0,2567,192,-1,-1,2323,177,166,11,-9,-9,11,1,17,2,-9,-9,-1,-1,0,0,0,0,224,11,2741,202,-1,-1,-1,-1,-1,-1,553,62,8,0,1307,92,2375,149,2850,150,2123,147,-1,-1,-1,0,0,49,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2007,NJ,1,21605,1063,-9,-9,-9,-9,21605,1063,-1,-1,4847,461,15705,763,4733,177,10,0,114,9,0,0,-1,-1,-9,-9,8,0,0,0,25417,1410,-1,-1,-1,-1,-1,-1,9156,813,58,4,13227,1131,-9,-9,22235,1065,16228,648,-1,-1,-1,21,0,-9,-9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2007,NM,4,3560,1,128,0,17,3,3705,4,-1,-1,1416,175,519,45,3503,301,428,45,17,1,4,0,-1,-1,0,0,0,0,3,9,5890,576,-1,-1,-1,-1,-1,-1,2115,289,23,1,3867,640,-9,-9,6324,807,5850,803,-1,-1,-1,0,0,156,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2007,NY,1,59464,2692,384,62,128,8,59976,2762,-1,-1,12188,846,30826,1260,15721,582,279,5,303,21,-9,-9,-1,-1,-9,-9,292,23,239,17,59848,2754,-1,-1,-1,-1,-1,-1,15288,1173,142,4,25846,1879,57128,3114,58244,3146,54914,2854,-1,-1,-1,243,5,6496,220,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2007,NC,3,31115,1901,4229,725,235,35,35579,2661,-1,-1,11828,1446,20850,1051,-9,-9,699,60,99,5,-9,-9,-1,-1,-9,-9,1391,54,496,10,35363,2626,-1,-1,-1,-1,-1,-1,9658,834,94,1,9290,828,31080,2279,35745,2767,-9,-9,-1,-1,-1,152,9,1430,31,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2007,ND,2,1245,147,-9,-9,-9,-9,1245,147,-1,-1,838,87,84,1,77,5,268,54,0,0,0,0,-1,-1,0,0,0,0,0,0,1267,147,-1,-1,-1,-1,-1,-1,642,120,0,0,821,163,910,134,857,134,910,134,-1,-1,-1,0,0,15,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2007,OH,2,44032,3724,-9,-9,-9,-9,44032,3724,-1,-1,22617,2529,22871,1246,1122,31,53,4,67,11,-9,-9,-1,-1,-9,-9,-9,-9,179,1,46909,3822,-1,-1,-1,-1,-1,-1,23129,3649,124,2,25390,3876,35585,2735,-9,-9,-9,-9,-1,-1,-1,93,0,660,39,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2007,OK,3,15218,2266,327,50,-9,-9,15545,2316,-1,-1,11849,1411,6805,632,1506,108,1873,301,58,7,9,0,-1,-1,-9,-9,39,1,2,2,22141,2462,-1,-1,-1,-1,-1,-1,5486,912,95,4,7257,1250,22161,2684,22161,2684,22161,2684,-1,-1,-1,6,0,326,13,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2007,OR,4,12324,1026,21,2,0,0,12345,1028,-1,-1,9675,878,1265,89,1538,38,252,40,156,15,-9,-9,-1,-1,-9,-9,2,0,0,0,12888,1060,-1,-1,-1,-1,-1,-1,3147,468,38,0,4523,562,-9,-9,12196,992,12196,992,-1,-1,-1,-9,-9,-9,-9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2007,PA,1,41688,2256,2,6,509,47,42199,2309,-1,-1,16180,1375,22157,853,4899,196,52,7,163,14,-9,-9,-1,-1,-9,-9,55,18,0,0,43506,2463,-1,-1,-1,-1,-1,-1,9326,896,146,5,15576,1256,39412,2280,39412,2280,39412,2280,-1,-1,-1,58,2,500,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2007,RI,1,2290,96,639,72,593,55,3522,223,-1,-1,1795,194,1075,44,799,35,18,6,40,0,-9,-9,-1,-1,-9,-9,8,3,1,0,3736,282,-1,-1,-1,-1,-1,-1,916,77,4,0,892,48,3705,299,3705,299,3916,349,-1,-1,-1,5,0,-9,-9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2007,SC,3,21192,1443,769,147,18,0,21979,1590,-1,-1,7048,848,15078,730,339,12,48,5,19,0,0,0,-1,-1,0,0,103,9,0,0,22635,1604,-1,-1,-1,-1,-1,-1,5947,649,64,6,8596,878,-9,-9,22260,1658,-9,-9,-1,-1,-1,120,3,303,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2007,SD,2,2890,328,5,0,28,4,2923,332,-1,-1,1887,215,178,6,99,5,768,141,9,2,0,0,-1,-1,0,0,1,0,0,0,2942,369,-1,-1,-1,-1,-1,-1,989,240,9,0,2832,439,-9,-9,3085,402,-9,-9,-1,-1,-1,4,1,64,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2007,TN,3,12993,1134,-9,-9,17,3,13010,1137,-1,-1,11858,1290,11955,604,446,17,44,8,41,4,0,0,-1,-1,0,0,0,0,0,0,24344,1923,-1,-1,-1,-1,-1,-1,7488,1135,54,1,13466,2251,19043,1215,18624,1180,-9,-9,-1,-1,-1,25,0,227,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2007,TX,3,123719,8721,5860,1405,0,0,129579,10126,-1,-1,48475,6200,58925,4851,49683,2799,53,22,252,21,0,0,-1,-1,0,0,455,38,16,0,157859,13931,-1,-1,-1,-1,-1,-1,38746,5895,422,13,65095,7934,149943,12617,146268,12310,149943,12617,-1,-1,-1,141,9,9185,237,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2007,UT,4,4563,511,8,2,67,14,4638,527,-1,-1,3872,429,427,29,1106,124,265,37,74,7,103,5,-1,-1,0,0,0,0,31,0,5878,631,-1,-1,-1,-1,-1,-1,1523,299,6,1,2856,537,-9,-9,5993,657,6197,689,-1,-1,-1,5,0,229,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2007,VT,1,828,77,103,16,341,25,1272,118,-1,-1,1695,146,205,8,-9,-9,14,1,11,0,-9,-9,-1,-1,-9,-9,-9,-9,62,3,1987,158,-1,-1,-1,-1,-1,-1,710,98,0,0,2047,344,1560,172,1560,172,1227,144,-1,-1,-1,5,1,16,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2007,VA,3,29074,2368,0,0,-8,-8,29074,2368,-1,-1,12192,1532,22127,1375,575,12,9,1,140,7,0,0,-1,-1,0,0,12,1,0,1,35055,2929,-1,-1,-1,-1,-1,-1,11647,1567,69,4,11063,1496,30306,2459,-9,-9,-9,-9,-1,-1,-1,30,0,1135,52,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2007,WA,4,15034,1505,9,6,299,58,15342,1569,-1,-1,9987,1025,3280,242,1708,121,675,79,555,36,0,0,-1,-1,44,11,0,0,9,0,16258,1514,-1,-1,-1,-1,-1,-1,7078,1094,36,4,14466,2075,12550,1227,14218,1284,14218,1284,-1,-1,-1,3,0,918,27,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2007,WV,3,4382,518,-9,-9,4,3,4386,521,-1,-1,4458,556,772,58,63,6,13,1,9,1,47,6,-1,-1,60,6,0,0,0,0,5422,634,-1,-1,-1,-1,-1,-1,1550,208,18,3,2567,414,3642,493,4469,546,3642,493,-1,-1,-1,0,0,2,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2007,WI,2,19999,1387,2,0,1311,117,21312,1504,-1,-1,11147,903,10125,547,-9,-9,664,63,-9,-9,203,6,-1,-1,-9,-9,29,1,48,7,22216,1527,-1,-1,-1,-1,-1,-1,4576,509,38,2,8195,708,-9,-9,16260,1123,-9,-9,-1,-1,-1,49,5,-9,-9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2007,WY,4,1089,208,0,0,0,0,1089,208,-1,-1,1394,208,90,8,242,14,100,15,9,1,3,0,-1,-1,0,0,0,0,0,0,1838,246,-1,-1,-1,-1,-1,-1,554,104,8,1,683,109,1213,298,1153,283,1150,278,-1,-1,-1,1,0,63,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2007,ST,7,1116584,81333,19446,3842,12764,1722,1148794,86897,-1,-1,487931,53192,562616,32965,205474,10980,14938,1986,6316,594,3040,433,-1,-1,150,29,9318,427,2927,208,1292727,100814,-1,-1,-1,-1,-1,-1,379299,51720,3078,125,604318,74052,537234,41147,1074368,77151,650613,49379,-1,-1,-1,2192,91,54318,1448,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2007,US,5,1255784,91755,21297,4415,25916,2499,1302997,98669,-1,-1,591748,61941,638932,36837,205474,10980,18092,2342,9309,955,3040,433,-1,-1,150,29,9318,427,2927,208,1479007,114152,-1,-1,-1,-1,-1,-1,423307,56403,3431,143,648601,78759,659695,41147,1074368,77151,650613,49379,-1,-1,-1,2192,91,83666,3569,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2007,FE,6,139200,10422,1851,573,13152,777,154203,11772,-1,-1,103817,8749,76316,3872,-9,-9,3154,356,2993,361,-9,-9,-1,-1,-9,-9,-9,-9,-9,-9,186280,13338,-1,-1,-1,-1,-1,-1,44008,4683,353,18,44283,4707,122461,-9,-9,-9,-9,-9,-1,-1,-1,0,0,29348,2121,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2008,AL,3,23524,1401,302,35,0,0,23826,1436,-1,-1,10830,1296,17405,935,-9,-9,2,0,3,0,-9,-9,-1,-1,-9,-9,-9,-9,37,0,28277,2231,-1,-1,-1,-1,-1,-1,8395,1232,96,6,10388,1477,-9,-9,-9,-9,12511,892,-1,-1,-1,123,0,113,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2008,AK,4,1580,220,271,52,1268,156,3119,428,-1,-1,2153,275,465,35,117,11,1626,164,134,15,-9,-9,-1,-1,-9,-9,-9,-9,16,3,4511,503,-1,-1,-1,-1,-1,-1,-9,-9,8,1,3183,558,2801,257,2895,311,-9,-9,-1,-1,-1,9,1,13,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2008,AZ,4,25887,3314,1436,449,0,0,27323,3763,-1,-1,13742,1991,4808,416,14838,1017,1752,302,97,23,0,0,-1,-1,0,0,424,13,78,1,35739,3763,-1,-1,-1,-1,-1,-1,10918,1518,83,4,11676,1538,32226,3060,35275,4017,34205,3123,-1,-1,-1,154,2,2654,108,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2008,AR,3,12074,1024,32,5,0,0,12106,1029,-1,-1,6869,696,6338,325,388,21,20,7,34,1,0,0,-1,-1,0,0,7,0,0,10,13656,1060,-1,-1,-1,-1,-1,-1,4645,641,43,2,5859,756,12046,1117,12610,1202,12046,1117,-1,-1,-1,17,0,168,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2008,CA,4,158878,11142,-9,-9,816,249,159694,11391,-1,-1,41141,4236,47123,3377,64709,3428,1418,147,819,107,672,111,-1,-1,-9,-9,6168,214,0,0,162050,11620,-1,-1,-1,-1,-1,-1,40306,6074,187,5,123704,13356,-9,-9,150537,10993,78726,5340,-1,-1,-1,0,0,16575,435,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2008,CO,4,15919,2018,-9,-9,-9,-9,15919,2018,-1,-1,9266,1179,4164,395,6666,631,512,92,221,18,-9,-9,-1,-1,-9,-9,0,0,0,0,20829,2315,-1,-1,-1,-1,-1,-1,5522,833,39,4,9553,1508,-9,-9,13337,1609,11543,1512,-1,-1,-1,36,1,1082,30,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2008,CT,1,12434,658,1799,255,3478,354,17711,1267,-1,-1,5458,728,8398,498,5198,265,37,4,68,7,0,0,-1,-1,-9,-9,-9,-9,-9,-9,19159,1502,-1,-1,-1,-1,-1,-1,4942,393,19,5,6245,572,-9,-9,-9,-9,-9,-9,-1,-1,-1,349,26,710,32,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2008,DE,3,3803,197,1290,202,1312,140,6405,539,-1,-1,2106,286,4061,248,327,19,0,0,7,2,0,0,-1,-1,0,0,-9,-9,1,0,6502,555,-1,-1,-1,-1,-1,-1,1077,98,13,0,1378,243,5274,374,4930,320,3961,200,-1,-1,-1,25,0,342,18,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2008,DC,3,-8,-8,-8,-8,-8,-8,-8,-8,-1,-1,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-1,-1,-1,-1,-1,-1,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-1,-1,-1,-8,-8,-8,-8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2008,FL,3,85485,5235,0,0,0,0,85485,5235,-1,-1,38875,3076,43234,1923,3050,214,96,13,10,2,-9,-9,-1,-1,-9,-9,214,7,6,0,85485,5235,-1,-1,-1,-1,-1,-1,35439,4558,279,17,32950,4327,-9,-9,95145,7480,-9,-9,-1,-1,-1,295,6,5885,216,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2008,GA,3,49014,3691,13,1,-9,-9,49027,3692,-1,-1,17698,1974,30972,1693,-9,-9,68,2,57,9,0,0,-1,-1,-9,-9,-9,-9,232,9,49027,3687,-1,-1,-1,-1,-1,-1,9417,1314,129,8,18249,2206,-9,-9,52757,3548,-9,-9,-1,-1,-1,113,5,1738,28,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2008,HI,4,1830,253,412,75,668,109,2910,437,-1,-1,1176,192,223,23,182,18,33,4,1080,132,2342,340,-1,-1,-9,-9,71,7,120,12,5227,728,-1,-1,-1,-1,-1,-1,717,106,14,0,1530,278,-9,-9,3487,-9,2451,-9,-1,-1,-1,0,0,92,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2008,ID,4,4234,685,-9,-9,-9,-9,4234,685,-1,-1,4849,591,158,13,1131,95,221,46,32,2,-9,-9,-1,-1,-9,-9,38,5,103,6,6532,758,-1,-1,-1,-1,-1,-1,3016,568,20,1,3273,635,5905,629,5610,597,5905,629,-1,-1,-1,0,0,312,12,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2008,IL,2,42753,2721,-9,-9,0,0,42753,2721,-1,-1,11751,1127,25358,1393,5458,169,57,11,119,19,0,0,-1,-1,-9,-9,0,0,10,2,42753,2721,-1,-1,-1,-1,-1,-1,21653,2613,69,3,32533,3372,32235,2065,32235,2065,28352,2039,-1,-1,-1,74,3,1698,48,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2008,IN,2,21409,2324,0,0,17,0,21426,2324,-1,-1,14377,1675,10127,738,1141,44,44,10,34,5,6,0,-1,-1,7,6,0,0,93,15,25829,2493,-1,-1,-1,-1,-1,-1,9363,1802,64,4,15892,2626,-9,-9,24711,2373,-9,-9,-1,-1,-1,62,1,454,14,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2008,IA,2,7976,747,-9,-9,-9,-9,7976,747,-1,-1,5202,539,2060,159,555,25,134,20,64,6,0,0,-1,-1,-9,-9,9,-9,2,0,8017,749,-1,-1,-1,-1,-1,-1,2703,370,22,0,4841,726,-9,-9,-9,-9,6840,6840,-1,-1,-1,16,0,183,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2008,KS,2,7969,587,-9,-9,-9,-9,7969,587,-1,-1,4344,346,2654,148,781,62,104,8,64,4,-9,-9,-1,-1,-9,-9,0,0,23,1,7970,569,-1,-1,-1,-1,-1,-1,2727,415,23,2,4105,564,8553,764,-9,-9,-9,-9,-1,-1,-1,3,1,278,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2008,KY,3,12163,809,36,26,8,9,12207,844,-1,-1,13098,1851,5960,391,267,8,16,1,26,5,-9,-9,-1,-1,69,14,-9,-9,0,0,19436,2270,-1,-1,-1,-1,-1,-1,8657,1967,72,6,12861,2772,12541,1167,12541,1167,12854,1189,-1,-1,-1,0,0,131,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2008,LA,3,19155,1125,0,0,541,36,19696,1161,-1,-1,10054,1225,25703,1287,40,1,9,0,23,0,30,2,-1,-1,-9,-9,6,1,-9,-9,35865,2516,-1,-1,-1,-1,-1,-1,9326,1261,118,7,13541,1604,19696,1161,19540,1229,-9,-9,-1,-1,-1,25,1,103,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2008,ME,1,1735,120,165,27,0,0,1900,147,-1,-1,1789,138,111,6,45,6,38,3,8,0,0,0,-1,-1,0,0,-9,-9,48,3,2039,156,-1,-1,-1,-1,-1,-1,344,35,0,0,675,65,1815,70,1815,70,1815,70,-1,-1,-1,0,0,16,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2008,MD,3,21396,960,478,87,32,2,21906,1049,-1,-1,5092,383,16666,658,-9,-9,8,1,27,5,-9,-9,-1,-1,-9,-9,-9,-9,471,13,22264,1060,-1,-1,-1,-1,-1,-1,6008,512,69,0,9651,911,-9,-9,22507,1131,-9,-9,-1,-1,-1,60,1,663,23,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2008,MA,1,9497,440,11,147,916,163,10424,750,-1,-1,4384,498,3057,120,2977,94,70,3,136,7,1,0,-1,-1,-9,-9,32,29,0,0,10657,751,-1,-1,-1,-1,-1,-1,2352,326,27,1,2355,370,-9,-9,-9,-9,7367,592,-1,-1,-1,2,1,874,40,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2008,MI,2,46781,1957,-9,-9,-9,-9,46781,1957,-1,-1,22535,1033,25822,897,-9,-9,382,19,138,7,-9,-9,-1,-1,-9,-9,91,1,0,0,48968,1957,-1,-1,-1,-1,-1,-1,7101,576,112,8,12716,920,-9,-9,48259,2203,-9,-9,-1,-1,-1,137,3,608,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2008,MN,2,7809,587,-9,-9,21,2,7830,589,-1,-1,4152,356,3102,140,636,30,673,84,215,18,-9,-9,-1,-1,-9,-9,-9,-9,-9,-9,8778,628,-1,-1,-1,-1,-1,-1,4383,536,17,0,7201,735,-9,-9,7696,665,-9,-9,-1,-1,-1,13,0,302,9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2008,MS,3,10153,1626,478,98,31,13,10662,1737,-1,-1,6001,953,14528,1011,181,11,22,3,27,2,0,0,-1,-1,0,0,0,0,14,1,20773,1981,-1,-1,-1,-1,-1,-1,6076,782,59,3,6913,918,-9,-9,24019,-9,24019,-9,-1,-1,-1,38,1,-9,-9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2008,MO,2,27685,2441,8,3,0,0,27693,2444,-1,-1,15566,1756,11524,638,503,41,90,8,40,5,-9,-9,-1,-1,-9,-9,-9,-9,14,1,27737,2449,-1,-1,-1,-1,-1,-1,8549,1403,86,2,16387,2594,-9,-9,28141,3155,-9,-9,-1,-1,-1,25,1,411,29,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2008,MT,4,1407,191,-9,-9,-9,-9,1407,191,-1,-1,2323,233,99,4,144,17,611,101,10,1,0,0,-1,-1,22,3,0,1,9,1,3218,361,-1,-1,-1,-1,-1,-1,1412,269,9,0,1844,332,-9,-9,1485,194,-9,-9,-1,-1,-1,7,1,13,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2008,NE,2,3910,359,148,29,18,6,4076,394,-1,-1,2254,258,1133,66,527,29,181,27,31,2,0,0,-1,-1,-9,-9,4,8,0,0,4130,390,-1,-1,-1,-1,-1,-1,1542,247,6,0,1715,275,-9,-9,3625,344,2900,275,-1,-1,-1,15,0,184,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2008,NV,4,11754,980,87,0,54,2,11895,982,-1,-1,5391,610,3424,240,2372,92,6,7,249,16,0,0,-1,-1,195,15,85,0,39,2,11761,982,-1,-1,-1,-1,-1,-1,2894,290,38,0,4573,705,10959,935,10085,806,7990,6990,-1,-1,-1,115,3,-9,-9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2008,NH,1,2652,202,-9,-9,-9,-9,2652,202,-1,-1,2263,218,162,8,-9,-9,11,1,13,1,-9,-9,-1,-1,-9,-9,-9,-9,221,6,2670,234,-1,-1,-1,-1,-1,-1,-9,-9,-9,-9,1337,170,2000,145,2670,234,2000,145,-1,-1,-1,0,0,-9,-9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2008,NJ,1,21268,926,-9,-9,-9,-9,21268,926,-1,-1,4803,417,15199,711,4519,162,10,0,119,9,0,0,-1,-1,-9,-9,4,0,0,0,24654,1299,-1,-1,-1,-1,-1,-1,8945,770,66,4,12752,1133,-9,-9,21957,1065,16228,648,-1,-1,-1,19,0,-9,-9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2008,NM,4,3378,1,-9,-9,7,0,3385,1,-1,-1,1344,160,487,46,3440,304,460,44,11,2,5,0,-1,-1,0,0,0,0,7,12,5754,568,-1,-1,-1,-1,-1,-1,2085,307,18,0,3491,522,-9,-9,6416,608,5850,608,-1,-1,-1,1,0,120,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2008,NY,1,57186,2542,345,40,71,14,57602,2596,-1,-1,11991,836,29918,1170,14820,513,300,6,301,24,-9,-9,-1,-1,-9,-9,274,28,188,10,57792,2587,-1,-1,-1,-1,-1,-1,14108,1070,127,7,26326,1827,56734,3096,57850,3128,54567,2836,-1,-1,-1,202,4,6148,186,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2008,NC,3,32402,2038,4537,769,184,27,37123,2834,-1,-1,12312,1555,21505,1102,-9,-9,729,60,112,5,-9,-9,-1,-1,-9,-9,1566,46,480,10,36704,2778,-1,-1,-1,-1,-1,-1,10449,928,97,7,9771,846,36842,2687,37175,2839,31994,2370,-1,-1,-1,178,8,1641,46,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2008,ND,2,1220,159,-9,-9,-9,-9,1220,159,-1,-1,847,108,84,2,80,3,279,45,2,2,0,0,-1,-1,0,0,0,0,0,0,1292,160,-1,-1,-1,-1,-1,-1,653,80,1,0,900,156,910,134,857,134,910,134,-1,-1,-1,0,0,11,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2008,OH,2,44904,3847,-9,-9,-9,-9,44904,3847,-1,-1,22858,2561,23437,1298,1181,38,54,4,70,11,-9,-9,-1,-1,-9,-9,-9,-9,173,1,47773,3913,-1,-1,-1,-1,-1,-1,21466,3415,104,2,24931,3624,35585,2735,-9,-9,-9,-9,-1,-1,-1,73,2,644,41,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2008,OK,3,15267,2274,378,46,-9,-9,15645,2320,-1,-1,11630,1375,6963,682,1554,107,1910,321,54,8,6,0,-1,-1,-9,-9,37,0,11,2,22165,2495,-1,-1,-1,-1,-1,-1,4671,859,84,6,6737,1211,22675,2637,22675,2637,22675,2637,-1,-1,-1,7,0,348,15,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2008,OR,4,12440,1068,29,4,0,0,12469,1072,-1,-1,9601,918,1286,90,1722,39,287,44,161,17,-9,-9,-1,-1,-9,-9,9,-9,1,1,13058,1109,-1,-1,-1,-1,-1,-1,3226,477,35,0,4503,560,-9,-9,13221,1132,13221,1132,-1,-1,-1,8,0,1643,103,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2008,PA,1,45176,2521,0,0,183,37,45359,2558,-1,-1,17524,1616,23452,901,5283,204,47,11,150,14,-9,-9,-1,-1,-9,-9,82,23,-9,-9,46538,2769,-1,-1,-1,-1,-1,-1,9658,906,150,4,14766,1289,40529,2769,40529,2769,40529,2769,-1,-1,-1,53,2,985,23,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2008,RI,1,2339,85,536,61,669,49,3544,195,-1,-1,1809,159,1106,45,815,32,17,3,43,0,-9,-9,-1,-1,-9,-9,11,4,1,0,3802,243,-1,-1,-1,-1,-1,-1,873,56,5,0,1046,84,3705,299,3705,299,3916,349,-1,-1,-1,10,0,-9,-9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2008,SC,3,21348,1449,690,171,14,1,22052,1621,-1,-1,7012,869,15151,735,361,13,38,6,21,1,2,0,-1,-1,0,0,108,9,0,0,22693,1633,-1,-1,-1,-1,-1,-1,5840,643,82,2,8687,835,-9,-9,22435,1691,-9,-9,-1,-1,-1,93,3,371,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2008,SD,2,2958,320,8,1,48,2,3014,323,-1,-1,1867,202,199,11,107,2,798,139,14,1,0,0,-1,-1,-9,-9,2,0,0,0,2987,355,-1,-1,-1,-1,-1,-1,956,229,6,0,2670,440,-9,-9,3067,384,-9,-9,-1,-1,-1,0,0,56,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2008,TN,3,13063,1150,-9,-9,11,0,13074,1150,-1,-1,12180,1460,12286,643,547,16,43,9,43,1,0,0,-1,-1,0,0,0,0,0,0,25099,2129,-1,-1,-1,-1,-1,-1,7205,1220,61,2,13442,2179,19193,1215,18769,1180,-9,-9,-1,-1,-1,13,1,243,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2008,TX,3,123785,8792,5336,1283,0,0,129121,10075,-1,-1,47631,6263,59508,4858,50743,2650,66,25,294,28,0,0,-1,-1,0,0,396,26,15,3,158653,13853,-1,-1,-1,-1,-1,-1,40062,6223,433,27,64043,8130,147821,12550,147821,12550,151523,12865,-1,-1,-1,151,6,9700,240,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2008,UT,4,4491,519,9,2,92,19,4592,540,-1,-1,3867,448,416,29,1154,119,256,31,72,5,106,8,-1,-1,0,0,0,0,35,0,5906,640,-1,-1,-1,-1,-1,-1,1484,293,12,0,2847,553,-9,-9,5993,657,6197,689,-1,-1,-1,5,0,264,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2008,VT,1,828,77,103,16,341,25,1272,118,-1,-1,1728,104,187,5,-9,-9,16,2,12,2,-9,-9,-1,-1,-9,-9,-9,-9,55,5,1998,118,-1,-1,-1,-1,-1,-1,711,88,2,0,1910,361,1560,172,1292,178,1227,144,-1,-1,-1,8,0,18,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2008,VA,3,28655,2395,0,0,-9,-9,28655,2395,-1,-1,12196,1558,22313,1385,599,14,7,1,126,7,-9,-9,-1,-1,-9,-9,7,2,1,0,35249,2967,-1,-1,-1,-1,-1,-1,11444,1557,96,4,11623,1571,30710,2540,-9,-9,-9,-9,-1,-1,-1,45,0,1179,44,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2008,WA,4,15670,1387,9,6,78,38,15757,1431,-1,-1,10253,962,3209,186,1728,127,689,81,564,35,-9,-9,-1,-1,62,11,-9,-9,17,2,16522,1404,-1,-1,-1,-1,-1,-1,6931,987,38,0,13312,1783,12530,1227,14218,1284,14218,1284,-1,-1,-1,3,0,1029,46,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2008,WV,3,4370,507,-9,-9,12,7,4382,514,-1,-1,4561,591,765,48,39,0,15,1,5,0,0,0,-1,-1,26,8,0,0,0,0,5411,648,-1,-1,-1,-1,-1,-1,1260,198,18,1,2693,439,3642,493,4471,546,3642,493,-1,-1,-1,0,0,8,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2008,WI,2,20042,1260,5,4,851,74,20898,1338,-1,-1,11136,819,9953,447,-9,-9,652,66,-9,-9,199,8,-1,-1,-9,-9,-9,-9,83,17,22023,1357,-1,-1,-1,-1,-1,-1,4218,395,40,1,8589,802,-9,-9,-9,-9,16646,1127,-1,-1,-1,40,7,-9,-9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2008,WY,4,1094,183,0,0,0,0,1094,183,-1,-1,1447,175,99,8,233,8,86,14,7,1,4,2,-1,-1,0,0,0,0,0,0,1876,208,-1,-1,-1,-1,-1,-1,577,84,7,2,662,130,1415,298,1320,283,1320,278,-1,-1,-1,4,0,53,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2008,ST,7,1122750,81514,18951,3894,11741,1534,1153442,86942,-1,-1,493336,52875,566362,32187,201158,10699,15000,2001,5967,594,3373,471,-1,-1,381,57,9645,424,2604,149,1297808,99457,-1,-1,-1,-1,-1,-1,376306,51524,3203,158,612829,75588,559902,44596,1039683,79077,640148,61316,-1,-1,-1,2626,91,60063,1849,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2008,US,5,1262882,91925,20672,4395,23497,2265,1307051,98585,-1,-1,599245,61674,642330,35943,201158,10699,18128,2367,8969,946,3373,471,-1,-1,381,57,9645,424,2604,149,1485815,112730,-1,-1,-1,-1,-1,-1,421048,56052,3570,176,660426,80550,559902,44596,1039683,79077,640148,61316,-1,-1,-1,2626,91,86971,3936,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2008,FE,6,140132,10411,1721,501,11756,731,153609,11643,-1,-1,105909,8799,75968,3756,-9,-9,3128,366,3002,352,-9,-9,-1,-1,-9,-9,-9,-9,-9,-9,188007,13273,-1,-1,-1,-1,-1,-1,44742,4528,367,18,47597,4962,-9,-9,-9,-9,-9,-9,-1,-1,-1,0,0,26908,2087,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2009,AL,3,24181,1595,329,30,216,7,24726,1632,-1,-1,11297,1502,18084,953,0,0,2,0,3,0,0,0,-1,-1,-9,-9,0,0,33,0,29419,2455,-1,-1,-1,-1,-1,-1,9115,1447,116,8,11074,1570,-9,-9,25341,-9,12511,892,-1,-1,-1,114,4,147,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2009,AK,4,1354,173,722,148,1250,199,3326,520,-1,-1,2212,328,506,44,115,13,1684,182,150,16,-9,-9,-1,-1,-9,-9,-9,-9,29,6,4696,589,-1,-1,-1,-1,-1,-1,-9,-9,2,0,2729,490,2801,257,2895,311,-9,-9,-1,-1,-1,7,0,11,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2009,AZ,4,26521,3441,1276,335,0,0,27797,3776,-1,-1,13783,1943,4949,407,15666,1075,1788,317,109,22,0,0,-1,-1,0,0,439,11,34,1,36768,3776,-1,-1,-1,-1,-1,-1,11000,1454,74,4,12289,1578,32873,3066,37252,4174,32873,3066,-1,-1,-1,149,8,3116,143,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2009,AR,3,12262,1031,43,2,0,0,12305,1033,-1,-1,7027,724,6622,310,421,19,21,7,38,1,0,0,-1,-1,0,0,7,0,11,0,14147,1061,-1,-1,-1,-1,-1,-1,4516,653,46,1,6204,787,12146,1117,12710,1202,12046,1117,-1,-1,-1,17,0,183,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2009,CA,4,157150,10561,-9,-9,868,251,158018,10812,-1,-1,40023,3983,46591,3089,64481,3327,1414,141,835,117,628,127,-1,-1,-9,-9,6314,205,0,0,160286,10989,-1,-1,-1,-1,-1,-1,39476,5450,226,6,119795,12937,-9,-9,146849,10578,78611,5445,-1,-1,-1,0,0,18073,465,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2009,CO,4,15888,1880,-9,-9,-9,-9,15888,1880,-1,-1,8976,1038,4142,361,6832,583,522,94,222,25,-9,-9,-1,-1,-9,-9,-9,-9,-9,-9,20694,2101,-1,-1,-1,-1,-1,-1,5229,754,56,3,10136,1538,-9,-9,13337,1719,11543,1512,-1,-1,-1,43,0,1207,43,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2009,CT,1,11774,549,1710,219,3489,312,16973,1080,-1,-1,5445,680,7902,410,4928,237,35,1,71,7,0,0,-1,-1,-9,-9,-9,-9,-9,-9,18381,1335,-1,-1,-1,-1,-1,-1,4654,344,22,1,6647,630,-9,-9,-9,-9,-9,-9,-1,-1,-1,310,22,762,34,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2009,DE,3,3728,185,1131,155,1251,131,6110,471,-1,-1,2197,269,3779,206,297,13,1,0,6,3,0,0,-1,-1,0,0,-9,-9,4,0,6284,491,-1,-1,-1,-1,-1,-1,1157,126,9,0,1483,222,5099,347,4930,320,3961,200,-1,-1,-1,28,0,296,20,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2009,DC,3,-8,-8,-8,-8,-8,-8,-8,-8,-1,-1,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-1,-1,-1,-1,-1,-1,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-1,-1,-1,-8,-8,-8,-8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2009,FL,3,86312,5249,0,0,0,0,86312,5249,-1,-1,43935,4358,48786,2661,3520,231,108,17,17,3,-9,-9,-1,-1,-9,-9,257,13,9,0,96632,7283,-1,-1,-1,-1,-1,-1,33100,4051,270,12,33036,4131,-9,-9,98672,7761,-9,-9,-1,-1,-1,384,9,6131,213,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2009,GA,3,43533,3616,1070,190,-9,-9,44603,3806,-1,-1,16019,1953,31619,1800,-9,-9,31,3,97,3,-9,-9,-1,-1,-9,-9,-9,-9,1831,20,49597,3777,-1,-1,-1,-1,-1,-1,9007,1023,93,2,15161,1783,-9,-9,53809,4422,-9,-9,-1,-1,-1,94,5,1780,31,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2009,HI,4,1550,311,434,84,726,95,2710,490,-1,-1,1139,185,251,21,173,16,28,4,1031,116,2311,325,-1,-1,0,0,139,18,118,16,5190,701,-1,-1,-1,-1,-1,-1,670,122,14,1,1618,298,-9,-9,3327,-9,2291,-9,-1,-1,-1,2,0,115,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2009,ID,4,4426,692,-9,-9,-9,-9,4426,692,-1,-1,4887,583,171,12,1182,86,237,48,32,2,-9,-9,-1,-1,-9,-9,44,4,103,9,6656,744,-1,-1,-1,-1,-1,-1,2971,535,13,1,3177,583,6402,669,6082,635,6402,669,-1,-1,-1,0,0,275,13,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2009,IL,2,42571,2590,-9,-9,0,0,42571,2590,-1,-1,11670,1111,25043,1256,5641,184,63,15,145,20,0,0,-1,-1,-9,-9,0,0,9,4,42571,2590,-1,-1,-1,-1,-1,-1,22274,2533,72,3,34824,3291,32408,2065,32408,2065,28525,2039,-1,-1,-1,105,1,1900,46,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2009,IN,2,21914,2338,0,0,17,0,21931,2338,-1,-1,14780,1743,10114,677,1229,46,40,10,37,5,5,0,-1,-1,9,12,0,0,88,13,26302,2506,-1,-1,-1,-1,-1,-1,10478,2119,89,3,16918,2923,-9,-9,26499,2579,-9,-9,-1,-1,-1,54,0,496,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2009,IA,2,8087,722,-9,-9,-9,-9,8166,748,-1,-1,5246,521,2073,152,557,21,145,24,67,5,-9,-9,-1,-1,-9,-9,-9,-9,2,0,8090,723,-1,-1,-1,-1,-1,-1,2671,331,14,0,4112,544,-9,-9,-9,-9,6841,573,-1,-1,-1,13,0,148,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2009,KS,2,8070,574,-9,-9,-9,-9,8070,574,-1,-1,4381,344,2708,148,782,56,118,14,69,2,-9,-9,-1,-1,-9,-9,0,0,18,1,8076,565,-1,-1,-1,-1,-1,-1,3072,463,20,0,4169,562,8131,749,-9,-9,-9,-9,-1,-1,-1,5,0,283,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2009,KY,3,11544,842,81,17,4,5,11629,864,-1,-1,13211,1923,5746,343,264,8,16,2,20,4,-9,-9,-1,-1,86,15,-9,-9,0,0,19343,2295,-1,-1,-1,-1,-1,-1,8771,1990,60,5,11791,2485,12555,1167,12555,1167,12868,1189,-1,-1,-1,0,0,164,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2009,LA,3,18788,1101,0,0,0,0,18788,1101,-1,-1,10660,1282,26378,1326,41,2,14,1,23,2,45,2,-1,-1,-9,-9,3,1,-9,-9,37164,2616,-1,-1,-1,-1,-1,-1,8878,1202,109,7,13466,1587,18788,1101,19491,1229,-9,-9,-1,-1,-1,14,1,102,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2009,ME,1,1716,168,168,22,0,0,1884,190,-1,-1,1793,141,108,2,40,5,36,5,9,0,0,0,-1,-1,5,0,0,0,57,5,2048,158,-1,-1,-1,-1,-1,-1,478,52,0,0,1054,106,2172,167,1988,145,2172,167,-1,-1,-1,0,0,20,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2009,MD,3,20571,987,334,47,22,1,20927,1035,-1,-1,5112,401,15948,639,-9,-9,5,2,27,2,-9,-9,-1,-1,-9,-9,-9,-9,114,5,21206,1049,-1,-1,-1,-1,-1,-1,5637,511,56,1,10278,653,-9,-9,22239,1001,-9,-9,-1,-1,-1,57,1,408,22,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2009,MA,1,9484,421,5,146,950,150,10439,717,-1,-1,4367,476,3062,120,2929,77,67,2,142,7,0,0,-1,-1,-9,-9,30,37,-9,-9,10597,719,-1,-1,-1,-1,-1,-1,2114,299,23,2,2597,347,-9,-9,-9,-9,7387,592,-1,-1,-1,5,3,883,35,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2009,MI,2,43723,1755,-9,-9,-9,-9,43723,1755,-1,-1,19709,939,23413,785,-9,-9,350,21,116,5,-9,-9,-1,-1,-9,-9,135,5,0,0,43723,1755,-1,-1,-1,-1,-1,-1,6805,516,145,3,17130,1082,-9,-9,48236,2199,-9,-9,-1,-1,-1,129,3,670,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2009,MN,2,8633,645,-9,-9,28,3,8661,648,-1,-1,4261,393,3401,130,682,30,740,101,228,20,-9,-9,-1,-1,-9,-9,-9,-9,-9,-9,9312,674,-1,-1,-1,-1,-1,-1,4245,544,13,0,6978,799,-9,-9,8434,665,-9,-9,-1,-1,-1,11,2,452,17,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2009,MS,3,10117,1342,365,102,0,0,10482,1444,-1,-1,5934,896,13610,822,156,12,19,4,23,1,0,0,-1,-1,0,0,0,0,5,0,19747,1735,-1,-1,-1,-1,-1,-1,6316,820,49,5,8081,1206,-9,-9,23795,-9,23795,-9,-1,-1,-1,27,1,-9,-9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2009,MO,2,28087,2423,7,2,-9,-9,28094,2425,-1,-1,15837,1726,11650,623,476,50,81,18,46,9,-9,-9,-1,-1,-9,-9,-9,9,46,1,28136,2427,-1,-1,-1,-1,-1,-1,8314,1463,79,6,15608,2502,-9,-9,28403,2756,-9,-9,-1,-1,-1,30,1,428,24,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2009,MT,4,1488,163,-9,-9,-9,-9,1488,163,-1,-1,2347,245,86,7,133,14,582,118,5,0,0,0,-1,-1,50,4,9,3,2,0,3214,391,-1,-1,-1,-1,-1,-1,1396,275,3,0,1952,336,-9,-9,1485,194,-9,-9,-1,-1,-1,2,0,6,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2009,NE,2,3959,351,145,19,10,6,4114,376,-1,-1,2260,228,1106,73,523,30,178,25,31,0,2,0,-1,-1,-9,-9,8,10,-9,-9,4108,366,-1,-1,-1,-1,-1,-1,1609,203,11,2,1903,254,-9,-9,3625,344,2900,275,-1,-1,-1,19,2,200,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2009,NV,4,11529,947,88,0,4,2,11621,949,-1,-1,5175,584,3351,216,2423,89,9,12,265,25,92,1,-1,-1,35,1,0,0,183,21,11533,949,-1,-1,-1,-1,-1,-1,4123,604,38,1,5188,779,11631,1084,8394,970,9858,857,-1,-1,-1,115,3,-9,-9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2009,NH,1,2728,187,-9,-9,-9,-9,2728,187,-1,-1,2130,147,159,11,149,2,-9,-9,-9,9,-9,-9,-1,-1,-9,-9,-9,-9,126,7,2564,167,-1,-1,-1,-1,-1,-1,193,20,6,0,1340,224,-9,-9,-9,-9,2054,145,-1,-1,-1,0,0,79,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2009,NJ,1,20286,879,-9,-9,-9,-9,20286,879,-1,-1,4765,381,14902,665,4371,149,9,0,128,10,0,0,-1,-1,-9,-9,1,0,0,1,24176,1206,-1,-1,-1,-1,-1,-1,8722,660,58,6,11892,968,-9,-9,21168,1065,15504,648,-1,-1,-1,21,0,-9,-9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2009,NM,4,3718,1,-9,-9,36,7,3754,8,-1,-1,1368,156,492,44,3370,346,484,46,12,1,6,1,-1,-1,0,0,-9,-9,43,5,5775,599,-1,-1,-1,-1,-1,-1,2027,38,15,1,3672,458,5419,582,6376,608,6013,606,-1,-1,-1,3,0,102,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2009,NY,1,55680,2455,205,25,104,10,55989,2490,-1,-1,11982,874,28821,1085,14187,469,315,7,287,20,-9,-9,-1,-1,-9,-9,302,15,304,19,56198,2489,-1,-1,-1,-1,-1,-1,13892,982,136,6,24452,1600,54828,3010,55944,3042,54110,2758,-1,-1,-1,184,6,5922,189,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2009,NC,3,32766,2097,4286,711,244,29,37296,2837,-1,-1,12284,1574,21607,1099,2162,66,758,54,115,6,16,0,-1,-1,-9,-9,-9,-9,103,9,37045,2808,-1,-1,-1,-1,-1,-1,10709,1040,77,4,10528,967,-9,-9,37175,2839,31994,2370,-1,-1,-1,206,9,1742,43,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2009,ND,2,1262,174,-9,-9,-9,-9,1262,174,-1,-1,846,117,96,2,79,5,290,49,1,1,0,0,-1,-1,0,0,0,0,0,0,1312,174,-1,-1,-1,-1,-1,-1,440,81,0,0,860,153,910,134,857,134,910,134,-1,-1,-1,0,0,13,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2009,OH,2,44680,3908,-9,-9,-9,-9,44680,3908,-1,-1,22780,2674,23347,1253,1196,45,50,2,68,12,-9,-9,-1,-1,-9,-9,-9,-9,176,3,47617,3989,-1,-1,-1,-1,-1,-1,20390,3196,118,7,23601,3352,35585,3080,-9,-9,-9,-9,-1,-1,-1,84,2,548,36,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2009,OK,3,15344,2341,333,46,-9,-9,15677,2387,-1,-1,11639,1509,7035,632,1565,94,1886,327,52,6,10,2,-1,-1,-9,-9,43,3,0,0,22230,2573,-1,-1,-1,-1,-1,-1,4646,754,80,3,6830,1182,22626,2624,22626,2624,22626,2624,-1,-1,-1,17,2,331,9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2009,OR,4,12620,1084,27,4,0,0,12647,1088,-1,-1,9621,934,1314,88,1846,46,312,42,184,15,-9,-9,-1,-1,-9,-9,-9,-9,1,0,13278,1125,-1,-1,-1,-1,-1,-1,3705,521,34,0,4807,621,-9,-9,-9,-9,-9,-9,-1,-1,-1,9,4,1625,79,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2009,PA,1,46803,2592,0,0,142,28,46945,2620,-1,-1,18323,1644,24501,940,5476,206,46,10,139,7,-9,-9,-1,-1,-9,-9,116,21,0,0,48601,2828,-1,-1,-1,-1,-1,-1,9862,916,160,5,13546,1321,41007,2577,41007,2577,41007,2577,-1,-1,-1,59,2,985,23,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2009,RI,1,2055,76,546,51,625,60,3226,187,-1,-1,1604,151,1022,40,742,30,16,3,45,2,-9,-9,-1,-1,-9,-9,14,3,1,1,3444,230,-1,-1,-1,-1,-1,-1,728,55,4,0,1212,83,3705,299,3705,299,3916,349,-1,-1,-1,1,0,-9,-9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2009,SC,3,21454,1398,693,106,19,1,22166,1505,-1,-1,7012,869,15151,735,361,13,38,6,21,1,1,0,-1,-1,-9,-9,108,9,0,0,22692,1633,-1,-1,-1,-1,-1,-1,5778,571,49,4,8507,836,-9,-9,22496,1676,-9,-9,-1,-1,-1,88,1,449,13,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2009,SD,2,3006,339,4,0,25,3,3035,342,-1,-1,1899,211,201,10,105,5,839,153,10,1,0,0,-1,-1,-9,-9,0,0,0,0,3054,380,-1,-1,-1,-1,-1,-1,1062,235,4,0,2661,428,-9,-9,3159,403,-9,-9,-1,-1,-1,1,0,59,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2009,TN,3,13639,1171,-9,-9,13,1,13652,1172,-1,-1,11942,1379,12376,600,545,18,40,8,53,4,0,0,-1,-1,0,0,0,0,0,0,24956,2009,-1,-1,-1,-1,-1,-1,7358,1201,58,2,13751,2220,19731,1215,19302,1196,-9,-9,-1,-1,-1,20,2,231,9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2009,TX,3,124330,8844,5076,1085,-9,-9,129406,9929,-1,-1,47163,6020,58027,4604,51722,2864,55,34,340,29,-9,-9,-1,-1,-9,-9,372,19,-9,-9,157679,13570,-1,-1,-1,-1,-1,-1,40600,5840,398,17,64415,7907,150634,12672,146957,12365,150634,12672,-1,-1,-1,152,4,9371,247,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2009,UT,4,4709,522,10,3,0,0,4719,525,-1,-1,3866,406,442,22,1173,96,273,30,69,6,102,13,-1,-1,0,0,0,0,27,8,5952,581,-1,-1,-1,-1,-1,-1,1659,292,17,0,2902,596,-9,-9,6022,639,6232,669,-1,-1,-1,6,0,281,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2009,VT,1,964,98,99,13,334,44,1397,155,-1,-1,1769,137,206,13,-9,-9,16,2,12,0,-9,-9,-1,-1,-9,-9,-9,-9,62,3,2065,155,-1,-1,-1,-1,-1,-1,628,85,1,0,1720,288,1439,174,1439,174,1084,238,-1,-1,-1,4,0,17,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2009,VA,3,27072,2348,0,0,-9,-9,27072,2348,-1,-1,12020,1502,22358,1249,775,20,20,0,115,5,-9,-9,-1,-1,-9,-9,15,1,1,0,35304,2777,-1,-1,-1,-1,-1,-1,10716,1489,92,2,11616,1552,29709,2469,-9,-9,-9,-9,-1,-1,-1,16,0,1172,37,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2009,WA,4,15780,1270,24,10,36,11,15840,1291,-1,-1,10594,995,3330,197,1535,89,706,65,566,31,0,0,-1,-1,68,16,-9,-9,37,4,16836,1397,-1,-1,-1,-1,-1,-1,6793,886,50,0,15194,1885,15810,1327,16668,1383,16668,1383,-1,-1,-1,2,0,774,24,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2009,WV,3,4526,505,-9,-9,25,6,4551,511,-1,-1,4814,628,787,50,35,1,13,0,2,0,0,0,-1,-1,32,5,0,0,0,0,5683,684,-1,-1,-1,-1,-1,-1,1480,242,18,2,2490,460,3642,493,4588,525,3642,493,-1,-1,-1,0,0,6,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2009,WI,2,20161,1239,123,2,674,46,20958,1287,-1,-1,9466,762,9540,391,1972,70,615,74,189,4,-9,-9,-1,-1,-9,-9,-9,-9,66,4,21848,1305,-1,-1,-1,-1,-1,-1,3907,414,39,2,8070,701,-9,-9,-9,-9,16438,1123,-1,-1,-1,37,0,-9,-9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2009,WY,4,1327,189,0,0,0,0,1327,189,-1,-1,1447,186,81,6,240,9,86,10,5,3,2,0,-1,-1,0,0,0,0,0,0,1861,214,-1,-1,-1,-1,-1,-1,598,102,8,0,725,107,1415,298,1320,283,1320,278,-1,-1,-1,1,0,68,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2009,ST,7,1113870,80369,19334,3574,11112,1408,1144395,85377,-1,-1,493017,53755,566994,31329,207097,10867,15201,2110,6277,595,3220,471,-1,-1,285,53,8356,387,3643,166,1304090,99713,-1,-1,-1,-1,-1,-1,373969,49504,3144,138,614189,73912,531466,42743,1053565,78268,628736,47660,-1,-1,-1,2645,98,62031,1882,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2009,US,5,1258912,90874,21330,4203,23184,2164,1303505,97267,-1,-1,603761,62819,644219,35038,207097,10867,18532,2531,9470,1026,3220,471,-1,-1,285,53,8356,387,3643,166,1498583,113338,-1,-1,-1,-1,-1,-1,420975,54022,3144,138,660404,78588,647537,52483,1053565,78268,628736,47660,-1,-1,-1,2645,98,90435,3923,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2009,FE,6,145042,10505,1996,629,12072,756,159110,11890,-1,-1,110744,9064,77225,3709,-9,-9,3331,421,3193,431,-9,-9,-1,-1,-9,-9,-9,-9,-9,-9,194493,13625,-1,-1,-1,-1,-1,-1,47006,4518,-9,-9,46215,4676,116071,9740,-9,-9,-9,-9,-1,-1,-1,0,0,28404,2041,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2010,AL,3,24178,1619,278,36,206,4,24662,1659,-1,-1,11257,1535,17550,910,0,0,1,1,2,0,0,0,-1,-1,0,0,0,0,36,0,28846,2446,-1,-1,-1,-1,-9,-9,8263,1350,85,7,10922,1566,-8,-8,-9,-9,12703,700,-1,-1,-1,29,0,175,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2010,AK,4,1434,228,669,108,1138,194,3241,530,-1,-1,2332,350,491,37,147,16,1784,218,9,2,3,0,-1,-1,0,0,0,0,29,4,4953,648,-1,-1,-1,-1,-9,-9,-9,-9,-9,-9,2667,424,2801,257,2895,311,-9,-9,-1,-1,-1,7,0,21,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2010,AZ,4,29996,3373,1092,313,0,0,31088,3686,-1,-1,13617,1856,4889,412,15537,1078,1804,296,119,24,0,0,-1,-1,0,0,468,20,10,0,36444,3686,-1,-1,-1,-1,-9,-9,9709,1296,72,9,11956,1556,32723,4366,38421,4590,32723,4366,-1,-1,-1,123,8,4610,152,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2010,AR,3,13060,1093,34,5,0,0,13094,1098,-1,-1,7611,843,6903,282,443,29,24,7,47,3,0,0,-1,-1,0,0,9,0,3,0,15040,1164,-1,-1,-1,-1,-9,-9,4281,593,57,1,5952,712,12813,1212,12813,1212,12249,1212,-1,-1,-1,8,1,153,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2010,CA,4,152418,9588,0,0,629,186,153047,9774,-1,-1,38231,3489,44956,2819,62956,3114,1387,139,844,96,626,105,-1,-1,0,0,6104,196,0,0,155104,9958,-1,-1,-1,-1,-9,-9,36173,5348,246,3,110530,11458,-9,-9,139874,9750,78811,5370,-1,-1,-1,0,0,17216,425,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2010,CO,4,16235,2019,0,0,0,0,16235,2019,-1,-1,9020,1031,4083,326,6946,582,495,89,217,24,0,0,-1,-1,0,0,0,0,2,0,20763,2052,-1,-1,-1,-1,-9,-9,4719,650,52,3,9864,1479,-9,-9,13537,1495,11646,1419,-1,-1,-1,38,0,1198,58,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2010,CT,1,11712,533,1554,192,3449,306,16715,1031,-1,-1,5380,638,7664,390,4928,209,33,0,70,9,0,0,-1,-1,0,0,0,0,0,0,18075,1246,-1,-1,-1,-1,-9,-9,4673,324,19,1,5969,547,-8,-8,-8,-8,-8,-8,-1,-1,-1,211,6,741,27,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2010,DE,3,3720,187,1164,152,1047,108,5931,447,-1,-1,2056,269,3600,162,268,13,1,0,3,3,0,0,-1,-1,0,0,0,0,3,0,5931,447,-1,-1,-1,-1,-9,-9,1155,140,20,0,1509,177,5931,447,4890,320,3961,200,-1,-1,-1,17,0,280,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2010,DC,3,-8,-8,-8,-8,-8,-8,-8,-8,-1,-1,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-1,-1,-1,-1,-9,-9,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-1,-1,-1,-8,-8,-8,-8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2010,FL,3,84886,5388,0,0,0,0,84886,5388,-1,-1,44435,4634,48473,2493,3627,200,105,12,9,4,0,0,-1,-1,0,0,297,6,10,1,96956,7350,-1,-1,-1,-1,-9,-9,28247,3739,235,11,29129,3639,-9,-9,97998,7816,-9,-9,-1,-1,-1,341,14,6127,235,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2010,GA,3,42707,3370,1276,208,0,0,43983,3578,-1,-1,14649,1969,28915,1814,0,0,28,3,89,3,0,0,-1,-1,0,0,0,0,1674,20,45355,3809,-1,-1,-1,-1,-9,-9,8601,928,97,2,15803,1757,54176,4587,49812,4325,-8,-8,-1,-1,-1,94,2,1687,35,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2010,HI,4,1544,322,413,102,853,129,2810,553,-1,-1,1153,198,233,17,176,16,26,7,1016,109,2297,355,-1,-1,137,18,0,0,146,8,5184,728,-1,-1,-1,-1,-9,-9,659,182,10,0,1401,363,-9,-9,3327,-7,2291,-7,-1,-1,-1,0,0,90,9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2010,ID,4,4262,737,0,0,0,0,4262,737,-1,-1,4847,623,169,12,1140,103,256,55,32,1,0,0,-1,-1,0,0,47,6,130,10,6621,810,-1,-1,-1,-1,-9,-9,3357,664,14,1,3642,635,6355,673,6037,640,6355,673,-1,-1,-1,1,0,150,13,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2010,IL,2,45496,2922,0,0,0,0,45496,2922,-1,-1,12701,1313,26457,1341,6111,230,71,16,143,18,0,0,-1,-1,0,0,0,0,13,4,45496,2922,-1,-1,-1,-1,-9,-9,18160,2054,87,7,28629,2497,31836,1864,31836,1864,27953,1838,-1,-1,-1,72,1,2057,47,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2010,IN,2,21984,2457,0,0,14,1,21998,2458,-1,-1,14376,1824,9687,593,1247,52,34,5,32,3,4,1,-1,-1,19,17,0,0,123,11,25522,2506,-1,-1,-1,-1,-9,-9,10097,2067,67,2,17162,2873,-9,-9,26891,2683,-9,-9,-1,-1,-1,48,1,536,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2010,IA,2,8626,764,0,0,48,19,8674,783,-1,-1,5565,574,2266,159,612,23,151,17,80,7,0,0,-1,-1,0,0,0,0,1,0,8675,780,-1,-1,-1,-1,-9,-9,3318,439,14,0,3859,510,-9,-9,-9,-9,6624,585,-1,-1,-1,13,0,175,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2010,KS,2,8422,633,0,0,0,0,8422,633,-1,-1,4542,370,2828,165,835,66,133,17,68,4,0,0,-1,-1,0,0,0,0,22,1,8428,623,-1,-1,-1,-1,-9,-9,3250,475,23,0,4050,511,8259,795,-9,-9,-9,-9,-1,-1,-1,9,1,303,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2010,KY,3,11049,1273,17,8,5,22,11071,1303,-1,-1,12862,1831,5165,273,239,11,20,5,23,2,0,0,-1,-1,97,16,0,0,0,0,18406,2138,-1,-1,-1,-1,-9,-9,8861,2022,55,9,13257,2865,12541,1361,12541,1361,12831,1406,-1,-1,-1,0,0,152,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2010,LA,3,15008,1078,0,0,1,0,15009,1078,-1,-1,10603,1175,26294,1227,63,2,10,1,30,2,35,0,-1,-1,0,0,2,1,0,0,37037,2408,-1,-1,-1,-1,-9,-9,11406,1454,116,0,15475,1894,17930,1078,19195,1138,-9,-9,-1,-1,-1,22,0,105,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2010,ME,1,1636,130,164,24,0,0,1800,154,-1,-1,1719,143,142,5,23,4,40,5,10,1,0,0,-1,-1,8,0,0,0,46,8,1988,166,-1,-1,-1,-1,-9,-9,561,61,0,0,1105,83,2172,167,1988,145,2172,167,-1,-1,-1,0,0,20,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2010,MD,3,21100,926,315,49,396,0,21811,975,-1,-1,5498,403,16082,542,0,0,4,3,29,3,0,0,-1,-1,0,0,0,0,73,8,21686,959,-1,-1,-1,-1,-9,-9,5638,490,41,0,8716,759,-9,-9,22011,1005,-9,-9,-1,-1,-1,54,3,633,20,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2010,MA,1,9383,501,4,97,1010,167,10397,765,-1,-1,4340,530,3081,125,2881,60,75,2,137,5,1,0,-1,-1,0,0,32,50,0,0,10547,772,-1,-1,-1,-1,-9,-9,2091,337,33,2,2678,348,-9,-9,-9,-9,7437,592,-1,-1,-1,1,2,845,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2010,MI,2,44244,1869,0,0,0,0,42244,1869,-1,-1,18364,996,22971,827,425,7,367,27,115,7,0,0,-1,-1,0,0,0,0,2,5,42244,1869,-1,-1,-1,-1,-9,-9,6785,579,87,6,16096,942,43193,2088,42525,1895,-8,-8,-1,-1,-1,106,3,604,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2010,MN,2,8763,611,0,0,23,0,8786,611,-1,-1,4162,369,3346,128,694,16,734,104,220,20,0,0,-1,-1,0,0,0,0,2,1,9158,638,-1,-1,-1,-1,-9,-9,4044,478,15,0,7103,779,-8,-8,8434,665,-8,-8,-1,-1,-1,29,3,505,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2010,MS,3,9616,1211,305,81,0,0,9921,1292,-1,-1,5984,835,13351,678,153,7,25,4,24,1,0,0,-1,-1,0,0,0,0,5,0,19542,1525,-1,-1,-1,-1,-9,-9,5915,768,60,5,7660,1040,-9,-9,24236,-7,-9,-9,-1,-1,-1,24,1,0,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2010,MO,2,28113,2455,7,2,0,0,28120,2457,-1,-1,16127,1800,11397,572,470,55,73,23,49,10,0,0,-1,-1,0,0,0,0,47,0,28163,2460,-1,-1,-1,-1,-9,-9,8041,1462,84,6,15328,2481,-8,-8,28667,2756,-8,-8,-1,-1,-1,21,1,423,22,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2010,MT,4,1452,183,0,0,0,0,1452,183,-1,-1,2357,268,100,3,128,9,622,134,8,0,0,0,-1,-1,64,7,8,3,4,1,3291,425,-1,-1,-1,-1,-9,-9,1476,283,2,0,1898,329,-9,-9,1485,194,-9,-9,-1,-1,-1,0,0,10,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2010,NE,2,4030,393,125,23,27,10,4182,426,-1,-1,2323,242,1117,88,526,35,162,28,38,0,0,0,-1,-1,0,0,6,18,4,0,4176,411,-1,-1,-1,-1,-9,-9,1749,265,11,1,1905,247,-8,-8,3625,344,2900,275,-1,-1,-1,23,0,258,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2010,NV,4,11195,900,97,0,0,0,11292,900,-1,-1,5166,601,3388,223,2538,0,193,29,283,24,5,0,-1,-1,0,0,96,1,20,1,11689,963,-1,-1,-1,-1,-9,-9,4100,651,41,1,5248,788,-9,-9,-9,-9,-9,-9,-1,-1,-1,33,1,0,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2010,NH,1,2444,173,0,0,0,0,2444,173,-1,-1,2149,181,162,9,145,4,8,0,10,2,0,0,-1,-1,0,0,10,1,76,4,2560,201,-1,-1,-1,-1,-9,-9,634,86,44,5,1481,188,-9,-9,-9,-9,-9,-9,-1,-1,-1,0,0,65,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2010,NJ,1,20801,846,0,0,0,0,20801,846,-1,-1,4843,371,14786,613,4106,142,7,0,127,10,0,0,-1,-1,0,0,2,0,0,0,23871,1136,-1,-1,-1,-1,-9,-9,8841,660,57,1,11909,912,-9,-9,21618,885,15504,648,-1,-1,-1,18,0,0,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2010,NM,4,3714,2,0,0,38,0,3752,2,-1,-1,1428,174,472,46,3537,321,489,44,14,1,6,1,-1,-1,0,0,83,1,30,12,6059,600,-1,-1,-1,-1,-9,-9,1209,260,12,1,3443,510,5557,582,6515,608,5522,606,-1,-1,-1,2,0,116,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2010,NY,1,53927,2181,168,26,107,11,54202,2218,-1,-1,11863,804,27658,970,13707,391,324,14,252,14,0,0,-1,-1,0,0,305,8,329,17,54438,2218,-1,-1,-1,-1,-9,-9,13575,882,117,6,24234,1618,54510,2995,55541,3005,53829,2761,-1,-1,-1,217,4,5794,194,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2010,NC,3,33314,2134,3995,685,224,23,37533,2842,-1,-1,12326,1632,21764,1059,2210,62,782,47,104,7,17,2,-1,-1,0,0,0,0,94,10,37297,2819,-1,-1,-1,-1,-9,-9,10569,899,71,7,10632,907,-9,-9,38950,2755,33460,2296,-1,-1,-1,177,7,1730,45,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2010,ND,2,1243,173,0,0,0,0,1243,173,-1,-1,821,102,102,3,72,6,311,68,2,0,0,0,-1,-1,0,0,0,0,0,0,1308,179,-1,-1,-1,-1,-9,-9,645,134,1,0,848,175,910,134,857,134,910,134,-1,-1,-1,0,0,7,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2010,OH,2,44783,3888,0,0,0,0,44783,3888,-1,-1,22972,2784,23247,1152,1241,38,42,3,64,12,0,0,-1,-1,0,0,0,0,154,3,47720,3992,-1,-1,-1,-1,-9,-9,19245,3000,127,5,21319,3179,35309,3080,-9,-9,-9,-9,-1,-1,-1,76,2,569,27,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2010,OK,3,15509,2244,327,48,0,0,15836,2292,-1,-1,11928,1475,6912,585,1611,98,1850,334,60,7,11,1,-1,-1,36,4,0,0,0,0,22408,2504,-1,-1,-1,-1,-9,-9,4775,732,60,3,6716,1210,22845,2507,22845,2507,22845,2507,-1,-1,-1,16,1,350,9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2010,OR,4,12719,1103,34,3,0,0,12753,1106,-1,-1,9608,947,1348,83,1914,45,321,40,186,15,0,0,-1,-1,0,0,0,0,6,1,13383,1131,-1,-1,-1,-1,-9,-9,3314,485,39,0,4703,591,-8,-8,-9,-9,-9,-9,-1,-1,-1,6,2,1678,74,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2010,PA,1,44351,2482,6,8,187,38,44544,2528,-1,-1,18359,1602,24493,854,5404,214,40,12,114,12,0,0,-1,-1,0,0,142,18,0,0,48552,2712,-1,-1,-1,-1,-9,-9,9829,946,141,2,15568,1518,41222,2615,41222,2615,41222,2615,-1,-1,-1,56,2,1120,28,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2010,RI,1,1925,86,469,45,587,47,2981,178,-1,-1,1502,129,922,42,656,38,19,2,42,2,0,0,-1,-1,0,0,12,4,0,1,3153,218,-1,-1,-1,-1,-9,-9,658,60,4,0,1086,69,3916,367,3906,367,3705,323,-1,-1,-1,1,0,0,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2010,SC,3,20882,1344,634,118,14,0,21530,1462,-1,-1,6835,809,14658,638,444,15,39,4,23,1,1,0,-1,-1,0,0,105,6,0,0,22105,1473,-1,-1,-1,-1,-9,-9,5114,540,68,3,7966,763,-8,-8,22538,1781,-8,-8,-1,-1,-1,102,4,488,16,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2010,SD,2,2981,369,0,0,38,0,3019,369,-1,-1,1900,203,181,6,101,6,831,191,9,4,1,1,-1,-1,0,0,0,0,0,0,3023,411,-1,-1,-1,-1,-9,-9,1014,225,8,0,2485,384,-8,-8,3120,403,-8,-8,-1,-1,-1,1,0,61,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2010,TN,3,13721,1178,0,0,16,2,13737,1180,-1,-1,12258,1455,12425,627,573,16,33,7,56,1,0,0,-1,-1,0,0,0,0,0,0,25345,2106,-1,-1,-1,-1,-9,-9,7612,1191,62,1,12924,2045,19731,1215,19302,1196,-9,-9,-1,-1,-1,28,1,238,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2010,TX,3,125879,9148,4857,1203,0,0,130736,10351,-1,-1,47580,6318,57752,4823,53207,3120,79,43,345,28,0,0,-1,-1,0,0,335,19,0,0,159298,14351,-1,-1,-1,-1,-9,-9,42058,6412,338,16,63896,7604,150411,12970,146742,12654,150411,12970,-1,-1,-1,144,6,8917,225,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2010,UT,4,4892,540,8,2,0,0,4900,542,-1,-1,4078,435,434,20,1223,98,256,28,69,4,109,15,-1,-1,0,0,0,0,30,8,6199,608,-1,-1,-1,-1,-9,-9,1729,336,14,1,2582,527,-9,-9,6022,639,6232,669,-1,-1,-1,3,0,267,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2010,VT,1,991,98,81,19,296,32,1368,149,-1,-1,1650,135,199,8,0,0,12,2,11,1,0,0,-1,-1,0,0,0,0,58,3,1930,149,-1,-1,-1,-1,-9,-9,637,93,6,0,1835,323,1439,174,1439,174,1084,238,-1,-1,-1,3,0,16,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2010,VA,3,27986,2365,0,0,0,0,27986,2365,-1,-1,11859,1543,21551,1259,874,20,7,0,123,6,0,0,-1,-1,0,0,0,0,156,12,34570,2840,-1,-1,-1,-1,-9,-9,10669,1395,98,4,11533,1487,30381,2540,-8,-8,-8,-8,-1,-1,-1,11,0,1342,48,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2010,WA,4,15692,1253,8,15,34,26,15734,1294,-1,-1,10718,1005,3259,181,1397,74,711,88,590,38,0,0,-1,-1,88,39,0,0,45,2,16808,1427,-1,-1,-1,-1,-9,-9,6417,825,39,1,15289,1794,15271,1149,16542,1259,16542,1259,-1,-1,-1,1,0,877,27,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2010,WV,3,4552,489,0,0,24,7,4576,496,-1,-1,5071,662,799,57,33,1,13,0,5,0,2,0,-1,-1,33,5,0,0,0,0,5956,725,-1,-1,-1,-1,-9,-9,1442,247,19,1,2516,497,3801,503,4589,525,3801,503,-1,-1,-1,0,0,8,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2010,WI,2,20013,1202,89,1,630,48,20732,1251,-1,-1,9311,764,9265,345,2008,70,628,76,191,6,0,0,-1,-1,0,0,0,0,57,3,21460,1264,-1,-1,-1,-1,-9,-9,3918,390,25,0,7990,650,-9,-9,-9,-9,16473,1123,-1,-1,-1,29,1,0,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2010,WY,4,1671,204,0,0,0,0,1671,204,-1,-1,1462,194,91,3,232,17,87,14,6,3,3,0,-1,-1,0,0,0,0,0,0,1881,231,-1,-1,-1,-1,-9,-9,613,102,3,0,703,99,2120,261,2120,261,1960,261,-1,-1,-1,2,0,51,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2010,ST,7,1110259,80265,18190,3573,11041,1380,1137490,85218,-1,-1,491798,54433,558078,30006,207808,10733,15547,2264,6149,559,3121,481,-1,-1,482,106,8063,358,3440,159,1294644,99204,-1,-1,-1,-1,-1,-1,359846,48999,2996,134,591171,70309,618153,49987,979343,76277,591865,47716,-1,-1,-1,2217,78,62768,1826,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2010,US,5,1257819,90729,19942,4121,23106,2129,1298867,96979,-1,-1,603827,63450,635808,33721,207808,10733,18891,2680,9268,960,3121,481,-1,-1,482,106,8063,358,3440,159,1490866,112753,-1,-1,-1,-1,-1,-1,404876,53484,3355,151,639055,75176,735474,59529,979343,76277,591865,47716,-1,-1,-1,2217,78,91104,3826,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2010,FE,6,147560,10464,1752,548,12065,749,161377,11761,-1,-1,112029,9017,77730,3715,0,0,3344,416,3119,401,0,0,-1,-1,0,0,0,0,0,0,196222,13549,-1,-1,-1,-1,-9,-9,45030,4485,359,17,47884,4867,117321,9542,-9,-9,-9,-9,-1,-1,-1,0,0,28336,2000,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2011,AL,3,24168,1598,261,42,195,4,24624,1644,-1,-1,11785,1720,17866,852,0,0,1,0,2,0,0,0,-1,-1,0,0,0,0,42,2,29696,2574,-1,-1,-1,-1,-1,-1,8009,1293,115,7,10110,1536,-8,-8,-9,-9,12511,892,-1,-1,-1,21,0,182,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2011,AK,4,1641,276,908,174,1318,211,3867,661,-1,-1,2319,358,505,47,124,11,1815,222,8,2,138,17,-1,-1,0,0,0,0,23,8,4932,665,-1,-1,-1,-1,-1,-1,-9,-9,-9,-9,2953,646,2801,257,2895,311,-9,-9,-1,-1,-1,0,0,32,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2011,AZ,4,28930,3272,1014,276,0,0,29944,3548,-1,-1,13797,1857,4970,395,15314,997,1709,264,144,20,0,0,-1,-1,0,0,456,15,11,0,36401,3548,-1,-1,-1,-1,-1,-1,9206,1203,81,6,11599,1563,32873,4366,37995,4438,32873,4366,-1,-1,-1,83,11,5195,141,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2011,AR,3,13023,1035,28,4,0,0,13051,1039,-1,-1,7757,817,6714,268,431,17,31,9,53,3,0,0,-1,-1,0,0,9,0,0,0,14995,1114,-1,-1,-1,-1,-1,-1,4911,605,52,1,6468,784,12829,1212,12829,1212,12265,1212,-1,-1,-1,6,0,1125,100,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2011,CA,4,139149,7902,0,0,395,132,139544,8034,-1,-1,33430,2838,41209,2269,58365,2624,1186,102,787,99,573,90,-1,-1,0,0,5832,165,0,0,141382,8187,-1,-1,-1,-1,-1,-1,32193,4183,244,6,100110,9475,-9,-9,131123,8274,78790,5340,-1,-1,-1,0,0,15719,370,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2011,CO,4,15605,1954,0,0,0,0,15605,1954,-1,-1,8746,1056,3905,307,6607,553,487,78,212,27,0,0,-1,-1,0,0,0,0,0,0,19957,2021,-1,-1,-1,-1,-1,-1,4472,661,38,3,9173,1236,-9,-9,13364,1471,12365,1419,-1,-1,-1,17,2,1723,60,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2011,CT,1,11050,567,1515,196,3411,283,15976,1046,-1,-1,5216,655,7180,368,4591,202,35,3,68,6,0,0,-1,-1,0,0,0,0,0,0,17090,1234,-1,-1,-1,-1,-1,-1,4469,349,23,0,6321,503,-8,-8,-8,-8,-8,-8,-1,-1,-1,138,5,675,24,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2011,DE,3,3772,183,1215,199,1037,140,6024,522,-1,-1,2272,342,3653,187,269,6,1,0,7,2,0,0,-1,-1,0,0,0,0,0,0,6202,537,-1,-1,-1,-1,-1,-1,2298,416,14,0,3034,577,5407,375,4890,320,3961,200,-1,-1,-1,11,0,296,15,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2011,DC,3,-8,-8,-8,-8,-8,-8,-8,-8,-1,-1,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-1,-1,-1,-1,-1,-1,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-1,-1,-1,-8,-8,-8,-8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2011,FL,3,83822,5212,0,0,0,0,83822,5212,-1,-1,44379,4623,47419,2306,3689,189,93,11,13,5,0,0,-1,-1,0,0,309,7,11,1,95913,7142,-1,-1,-1,-1,-1,-1,28699,3659,285,16,30709,3964,-9,-9,103295,9473,-9,-9,-1,-1,-1,200,9,9783,360,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2011,GA,3,42055,3492,1521,161,0,0,43576,3653,-1,-1,16503,1994,33230,1862,2091,50,26,3,120,6,0,0,-1,-1,0,0,0,0,57,2,52027,3917,-1,-1,-1,-1,-1,-1,11989,1265,146,6,14381,1226,56324,4284,51169,3953,-8,-8,-1,-1,-1,87,3,2816,141,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2011,HI,4,1695,282,602,158,834,116,3131,556,-1,-1,1156,187,232,21,156,19,31,3,1092,135,2349,343,-1,-1,84,8,0,0,204,17,5304,733,-1,-1,-1,-1,-1,-1,601,91,7,0,1163,241,-9,-9,3327,-7,2291,-7,-1,-1,-1,0,0,243,19,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2011,ID,4,4308,830,0,0,0,0,4308,830,-1,-1,5074,687,183,8,1126,109,257,65,38,1,0,0,-1,-1,0,0,0,0,176,15,6854,885,-1,-1,-1,-1,-1,-1,2894,637,9,2,3424,687,6355,673,6037,640,6355,673,-1,-1,-1,0,0,0,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2011,IL,2,45562,2865,0,0,0,0,45562,2865,-1,-1,12851,1337,26375,1266,6146,237,49,7,131,13,0,0,-1,-1,0,0,0,0,10,5,45562,2865,-1,-1,-1,-1,-1,-1,18154,1914,94,3,28793,2428,31838,1865,31838,1865,27955,1839,-1,-1,-1,71,1,2103,61,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2011,IN,2,22080,2356,0,0,13,1,22093,2357,-1,-1,14867,1884,10057,535,1280,49,40,6,43,3,5,0,-1,-1,17,17,0,0,97,6,26406,2500,-1,-1,-1,-1,-1,-1,8285,1630,75,0,15838,2754,-9,-9,27820,2704,-9,-9,-1,-1,-1,33,2,567,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2011,IA,2,8333,723,0,0,42,17,8375,740,-1,-1,5307,562,2266,137,582,27,152,8,68,4,0,0,-1,-1,0,0,0,0,3,0,8378,738,-1,-1,-1,-1,-1,-1,3301,446,13,0,4491,619,-9,-9,-9,-9,7209,585,-1,-1,-1,12,1,298,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2011,KS,2,5713,334,2871,338,0,0,8584,672,-1,-1,4619,385,2900,199,897,60,138,22,67,6,0,0,-1,-1,0,0,0,0,26,8,8647,680,-1,-1,-1,-1,-1,-1,3308,523,25,0,4147,552,8514,666,8260,773,8391,773,-1,-1,-1,4,1,338,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2011,KY,3,10537,1332,53,9,1,19,10591,1360,-1,-1,13651,2139,5036,274,224,9,24,5,24,2,0,0,-1,-1,129,24,0,0,3,1,19091,2454,-1,-1,-1,-1,-1,-1,8954,2125,81,4,12199,2557,12101,1361,12101,1361,12401,1406,-1,-1,-1,0,0,584,77,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2011,LA,3,14808,1084,0,0,1,0,14809,1084,-1,-1,10902,1198,26250,1179,84,2,11,2,27,2,50,0,-1,-1,0,0,2,1,0,0,37326,2384,-1,-1,-1,-1,-1,-1,10053,1325,110,8,14903,1808,17759,1084,17742,1098,-9,-9,-1,-1,-1,172,6,121,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2011,ME,1,1674,128,154,22,0,0,1828,150,-1,-1,1727,144,133,4,21,3,46,8,11,0,0,0,-1,-1,10,0,0,0,33,5,1981,164,-1,-1,-1,-1,-1,-1,524,64,3,0,993,98,2172,167,1988,145,2172,167,-1,-1,-1,0,0,0,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2011,MD,3,21222,958,271,30,427,15,21920,1003,-1,-1,5612,411,15863,562,0,0,5,2,31,2,0,0,-1,-1,0,0,0,0,65,5,21576,982,-1,-1,-1,-1,-1,-1,5738,476,39,1,9293,595,-9,-9,22924,1057,-9,-9,-1,-1,-1,36,3,769,25,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2011,MA,1,9686,484,4,76,997,220,10687,780,-1,-1,4448,558,3162,120,2968,58,76,3,143,8,0,0,-1,-1,0,0,35,44,0,0,10832,791,-1,-1,-1,-1,-1,-1,2104,400,27,1,2240,484,-9,-9,-9,-9,7417,612,-1,-1,-1,2,1,1042,53,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2011,MI,2,40995,1909,0,0,0,0,40995,1909,-1,-1,18038,1033,22137,832,410,8,328,31,82,5,0,0,-1,-1,0,0,0,0,0,0,40995,1909,-1,-1,-1,-1,-1,-1,6619,613,116,3,13471,906,42312,2088,41697,1983,-8,-8,-1,-1,-1,106,0,561,12,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2011,MN,2,8693,605,0,0,11,0,8704,605,-1,-1,4096,380,3355,130,694,12,788,106,221,14,0,0,-1,-1,0,0,0,0,2,2,9156,644,-1,-1,-1,-1,-1,-1,3943,519,18,0,6969,765,-8,-8,8434,665,-8,-8,-1,-1,-1,5,0,551,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2011,MS,3,9259,1046,331,85,0,0,9590,1131,-1,-1,6104,895,13510,668,143,8,21,3,27,3,0,0,-1,-1,0,0,0,0,3,1,19808,1578,-1,-1,-1,-1,-1,-1,5894,747,58,2,7300,897,-9,-9,24075,-7,-9,-9,-1,-1,-1,23,0,19,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2011,MO,2,28213,2752,4,0,0,0,28217,2752,-1,-1,16294,1913,11319,568,469,56,84,22,48,14,0,0,-1,-1,0,0,0,0,44,2,28258,2575,-1,-1,-1,-1,-1,-1,7921,1495,70,5,15287,2543,-8,-8,28607,2724,-8,-8,-1,-1,-1,19,0,605,46,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2011,MT,4,1512,195,0,0,0,0,1512,195,-1,-1,2371,263,81,1,101,3,612,117,9,0,0,0,-1,-1,93,15,0,0,7,5,3274,404,-1,-1,-1,-1,-1,-1,1348,255,10,0,1762,342,-9,-9,1485,194,-9,-9,-1,-1,-1,0,0,9,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2011,NE,2,4098,347,136,24,46,6,4280,377,-1,-1,2300,220,1163,76,559,32,167,23,40,1,0,0,-1,-1,0,0,6,17,12,0,4247,369,-1,-1,-1,-1,-1,-1,1832,260,17,1,2099,339,-8,-8,3625,344,2900,275,-1,-1,-1,19,0,256,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2011,NV,4,11175,892,92,0,0,0,11267,892,-1,-1,5199,618,3466,210,2600,85,210,22,213,20,8,0,-1,-1,0,0,91,2,24,10,11811,967,-1,-1,-1,-1,-1,-1,3897,605,37,1,5161,749,-9,-9,-9,-9,-9,-9,-1,-1,-1,60,1,0,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2011,NH,1,2275,148,0,0,0,0,2275,148,-1,-1,2107,155,139,6,128,5,8,0,6,1,0,0,-1,-1,0,0,12,2,44,1,2444,170,-1,-1,-1,-1,-1,-1,700,89,0,0,1740,212,-9,-9,2275,148,2085,105,-1,-1,-1,0,0,68,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2011,NJ,1,19973,782,0,0,0,0,19973,782,-1,-1,4962,372,14005,549,3669,139,6,1,120,11,0,0,-1,-1,0,0,0,0,0,0,22762,1072,-1,-1,-1,-1,-1,-1,6944,571,64,6,10912,832,-9,-9,20730,910,15180,648,-1,-1,-1,6,1,1483,37,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2011,NM,4,3761,34,38,1,0,0,3799,35,-1,-1,1561,203,505,55,3666,311,498,51,15,1,7,2,-1,-1,0,0,0,0,24,7,6276,630,-1,-1,-1,-1,-1,-1,2000,297,16,1,3132,398,5538,654,6430,678,6430,678,-1,-1,-1,1,1,197,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2011,NY,1,52632,2280,150,23,92,19,52874,2322,-1,-1,11915,899,26525,937,13235,417,303,22,238,13,0,0,-1,-1,0,0,314,7,594,17,53124,2312,-1,-1,-1,-1,-1,-1,13158,1009,114,4,23427,1425,50408,2979,51310,2979,49983,2755,-1,-1,-1,179,3,4476,153,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2011,NC,3,33039,2072,3770,568,181,32,36990,2672,-1,-1,12253,1490,21352,1002,2147,61,822,69,108,11,15,1,-1,-1,0,0,0,0,103,6,36800,2640,-1,-1,-1,-1,-1,-1,10097,914,59,2,10888,990,-9,-9,36305,2761,31176,2307,-1,-1,-1,110,5,1669,46,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2011,ND,2,1238,147,0,0,0,0,1238,147,-1,-1,815,101,88,2,68,5,300,39,5,0,0,0,-1,-1,0,0,0,0,0,0,1276,147,-1,-1,-1,-1,-1,-1,569,74,1,0,843,179,910,134,857,134,910,134,-1,-1,-1,0,0,7,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2011,OH,2,44145,3812,0,0,0,0,44145,3812,-1,-1,22701,2739,22829,1102,1271,40,49,3,63,15,0,0,-1,-1,0,0,0,0,148,4,47061,3903,-1,-1,-1,-1,-1,-1,17098,2622,101,5,19999,2902,-2207,-9,-9,-9,-9,-9,-1,-1,-1,59,0,548,28,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2011,OK,3,15251,2102,332,39,0,0,15583,2141,-1,-1,11654,1422,6772,525,1580,110,1929,304,59,2,13,2,-1,-1,46,4,0,0,0,0,22053,2369,-1,-1,-1,-1,-1,-1,4443,656,87,2,6580,1122,16279,2328,16279,2328,16279,2328,-1,-1,-1,15,2,0,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2011,OR,4,12640,1042,39,7,0,0,12679,1049,-1,-1,9552,949,1302,77,2002,47,338,36,189,14,0,0,-1,-1,0,0,0,0,4,0,13387,1123,-1,-1,-1,-1,-1,-1,3221,471,39,2,4092,482,-8,-8,-9,-9,12679,1683,-1,-1,-1,1,0,1615,50,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2011,PA,1,45771,2502,8,7,172,55,45951,2564,-1,-1,18402,1665,24625,875,5464,198,37,12,108,11,0,0,-1,-1,0,0,0,0,159,22,48795,2783,-1,-1,-1,-1,-1,-1,9988,946,156,5,16551,1487,45603,2773,45603,2773,45603,2773,-1,-1,-1,41,2,1091,30,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2011,RI,1,1908,67,407,38,569,43,2884,148,-1,-1,1405,108,934,34,651,23,16,4,46,2,0,0,-1,-1,0,0,12,2,0,2,3064,175,-1,-1,-1,-1,-1,-1,651,44,4,0,928,81,3556,313,3381,273,3546,313,-1,-1,-1,0,0,47,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2011,SC,3,20377,1279,583,92,12,0,20972,1371,-1,-1,6676,762,14241,589,440,19,33,3,21,0,0,0,-1,-1,0,0,117,13,0,0,21528,1386,-1,-1,-1,-1,-1,-1,5085,557,52,5,7201,722,-8,-8,22577,1784,-8,-8,-1,-1,-1,44,0,486,20,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2011,SD,2,3085,439,2,3,21,1,3108,443,-1,-1,1920,228,195,9,103,5,861,195,12,3,3,1,-1,-1,0,0,0,0,0,0,3094,441,-1,-1,-1,-1,-1,-1,970,277,11,0,2326,420,-8,-8,3091,417,-8,-8,-1,-1,-1,0,0,53,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2011,TN,3,13490,1177,0,0,16,1,13506,1178,-1,-1,12772,1718,12637,656,576,20,30,7,50,3,0,0,-1,-1,0,0,0,0,5,5,26070,2409,-1,-1,-1,-1,-1,-1,7570,1336,48,2,12928,2244,19378,1245,18952,1225,-9,-9,-1,-1,-1,11,0,257,14,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2011,TX,3,126223,9248,4756,1126,0,0,130979,10374,-1,-1,46911,6356,57207,4604,53115,3144,79,36,418,30,0,0,-1,-1,0,0,306,18,0,0,158036,14188,-1,-1,-1,-1,-1,-1,43154,6482,400,12,66365,8182,152898,13733,146913,13221,152898,13733,-1,-1,-1,97,7,9068,229,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2011,UT,4,4780,512,2,0,0,0,4782,512,-1,-1,4131,416,435,28,1237,111,242,34,68,5,123,16,-1,-1,0,0,0,0,30,3,6266,613,-1,-1,-1,-1,-1,-1,1720,315,13,1,2679,527,-9,-9,6320,641,6530,671,-1,-1,-1,1,0,424,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2011,VT,1,987,102,93,8,303,38,1383,148,-1,-1,1637,132,195,7,0,0,9,3,8,0,0,0,-1,-1,0,0,0,0,56,6,1905,148,-1,-1,-1,-1,-1,-1,558,82,0,0,1800,296,1489,173,1489,173,1144,178,-1,-1,-1,1,0,18,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2011,VA,3,26657,2305,0,0,0,0,26657,2305,-1,-1,12416,1593,21636,1175,884,14,12,0,122,14,0,0,-1,-1,0,0,0,0,251,13,35321,2809,-1,-1,-1,-1,-1,-1,9724,1287,112,5,10997,1383,29614,2540,-8,-8,-8,-8,-1,-1,-1,2,0,499,20,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2011,WA,4,15757,1273,32,7,25,15,15814,1295,-1,-1,10044,930,3167,172,1910,156,639,88,601,36,0,0,-1,-1,46,11,0,0,45,2,16452,1395,-1,-1,-1,-1,-1,-1,6487,881,29,1,14742,1699,15111,1171,15720,1259,15720,1259,-1,-1,-1,1,0,2314,78,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2011,WV,3,4635,492,0,0,18,4,4653,496,-1,-1,5193,695,787,53,32,3,12,0,5,0,1,0,-1,-1,44,1,0,0,0,0,6074,752,-1,-1,-1,-1,-1,-1,1479,221,22,0,2776,494,3860,503,4660,525,3860,503,-1,-1,-1,0,0,16,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2011,WI,2,20542,1127,45,1,591,46,21178,1174,-1,-1,9394,723,9195,322,2034,65,597,69,211,7,0,0,-1,-1,0,0,0,0,37,0,21468,1186,-1,-1,-1,-1,-1,-1,3463,385,43,1,7187,638,-9,-9,-9,-9,16241,969,-1,-1,-1,27,1,0,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2011,WY,4,1688,229,0,0,0,0,1688,229,-1,-1,1522,199,88,5,223,15,101,17,7,2,3,0,-1,-1,0,0,0,0,0,1,1944,239,-1,-1,-1,-1,-1,-1,631,108,3,0,682,114,2281,296,2281,296,1960,261,-1,-1,-1,1,0,41,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2011,ST,7,1083632,77784,21237,3714,10728,1418,1115597,82916,-1,-1,490763,54929,552998,28435,204376,10334,15344,2140,6209,584,3288,472,-1,-1,469,80,7501,293,2353,184,1283301,97451,-1,-1,-1,-1,-1,-1,351326,47383,3181,130,573166,67703,578210,47240,975291,77530,609789,51057,-1,-1,-1,1722,68,69989,2276,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2011,US,5,1234522,88597,23252,4338,21909,2123,1279683,95058,-1,-1,608885,64394,630651,31995,204376,10334,18901,2588,9339,1011,3288,472,-1,-1,469,80,7501,293,2353,184,1485763,111351,-1,-1,-1,-1,-1,-1,402266,52260,3561,152,623611,72695,696651,56446,975291,77530,609789,51057,-1,-1,-1,1722,68,98471,4338,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2011,FE,6,150890,10813,2015,624,11181,705,164086,12142,-1,-1,118122,9465,77653,3560,0,0,3557,448,3130,427,0,0,-1,-1,0,0,0,0,0,0,202462,13900,-1,-1,-1,-1,-1,-1,50940,4877,380,22,50445,4992,118441,9206,-9,-9,-9,-9,-1,-1,-1,0,0,28482,2062,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2012,AL,3,24186,1573,243,33,191,4,24620,1610,-1,-1,11948,1785,17772,859,0,0,1,0,2,0,0,0,-1,-1,0,0,0,0,59,5,29782,2649,-1,-1,-1,-1,-1,-1,7870,1331,104,5,10391,1567,-8,-8,-9,-9,12511,892,-1,-1,-1,87,1,197,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2012,AK,4,1706,282,803,180,1371,233,3880,695,-1,-1,2303,352,472,49,132,14,1852,257,8,3,138,16,-1,-1,0,0,0,0,29,7,4934,699,-1,-1,-1,-1,-1,-1,-9,-9,-9,-9,3080,694,2801,257,2895,311,-9,-9,-1,-1,-1,0,0,0,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2012,AZ,4,28952,3337,995,294,0,0,29947,3631,-1,-1,13936,1944,4969,331,15139,1023,1707,286,154,20,0,0,-1,-1,0,0,459,27,18,0,36382,3631,-1,-1,-1,-1,-1,-1,9202,1267,86,3,11588,1420,32459,4222,37476,4294,32459,4222,-1,-1,-1,61,8,4769,123,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2012,AR,3,13022,990,19,12,0,0,13041,1002,-1,-1,6842,772,6216,266,447,13,28,6,46,3,0,0,-1,-1,0,0,12,0,3,0,13594,1060,-1,-1,-1,-1,-1,-1,4043,545,42,3,5647,652,13329,1078,13384,1078,12785,1078,-1,-1,-1,15,2,175,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2012,CA,4,126764,5860,0,0,245,66,127009,5926,-1,-1,29193,2075,37990,1716,53584,1942,1111,85,707,62,547,59,-1,-1,0,0,5304,159,0,0,128436,6098,-1,-1,-1,-1,-1,-1,24383,1894,210,3,43489,4216,-9,-9,117371,5991,78790,5340,-1,-1,-1,0,0,14745,334,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2012,CO,4,14667,1722,0,0,0,0,14667,1722,-1,-1,8224,918,3672,269,6171,463,481,59,191,14,0,0,-1,-1,0,0,0,0,0,0,18739,1723,-1,-1,-1,-1,-1,-1,4422,587,56,1,9653,1372,-9,-9,12750,1471,11759,1419,-1,-1,-1,7,0,1592,63,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2012,CT,1,10600,506,1295,180,3422,344,15317,1030,-1,-1,4995,631,6815,376,4403,200,28,2,71,9,0,0,-1,-1,0,0,0,0,0,0,16312,1218,-1,-1,-1,-1,-1,-1,4384,327,22,0,5870,547,-8,-8,-8,-8,-8,-8,-1,-1,-1,102,4,572,23,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2012,DE,3,3875,211,1175,212,1131,126,6181,549,-1,-1,2410,368,3660,186,267,11,0,0,6,1,0,0,-1,-1,0,0,0,0,5,0,6348,566,-1,-1,-1,-1,-1,-1,2195,415,9,0,3343,679,5278,391,4890,320,3961,200,-1,-1,-1,12,0,287,17,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2012,DC,3,-8,-8,-8,-8,-8,-8,-8,-8,-1,-1,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-1,-1,-1,-1,-1,-1,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-1,-1,-1,-8,-8,-8,-8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2012,FL,3,83106,5028,0,0,0,0,83106,5028,-1,-1,44085,4599,46833,2197,3605,170,85,7,16,4,0,0,-1,-1,0,0,311,6,10,2,94945,6985,-1,-1,-1,-1,-1,-1,27551,3578,315,14,29866,3795,-9,-9,104376,9498,-9,-9,-1,-1,-1,185,11,9631,345,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2012,GA,3,42545,3480,1144,109,0,0,43689,3589,-1,-1,16682,1901,32662,1600,2320,73,29,2,146,7,0,0,-1,-1,0,0,0,0,29,6,51868,3589,-1,-1,-1,-1,-1,-1,12649,1291,116,6,14070,1638,56900,4284,52111,3953,-8,-8,-1,-1,-1,92,1,2596,124,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2012,HI,4,1754,317,561,106,808,115,3123,538,-1,-1,1168,182,225,19,134,11,32,3,1088,123,2176,323,-1,-1,90,8,0,0,230,19,5143,688,-1,-1,-1,-1,-1,-1,733,121,12,1,1425,206,-9,-9,3327,-7,2291,-7,-1,-1,-1,0,0,269,18,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2012,ID,4,4086,904,0,0,0,0,4086,904,-1,-1,5155,790,200,14,1120,121,266,59,37,4,0,0,-1,-1,0,0,61,8,138,12,6977,1008,-1,-1,-1,-1,-1,-1,3523,783,13,2,3979,645,-9,-9,6486,784,6656,786,-1,-1,-1,0,0,0,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2012,IL,2,46599,2749,0,0,0,0,46599,2749,-1,-1,13143,1283,26975,1215,6286,227,50,7,134,12,0,0,-1,-1,0,0,0,0,10,5,46599,2749,-1,-1,-1,-1,-1,-1,17985,1896,91,3,27825,2346,-9,-9,-9,-9,-9,-9,-1,-1,-1,0,0,0,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2012,IN,2,21400,2375,0,0,8,0,21408,2375,-1,-1,15024,1980,9737,497,1274,51,51,6,50,4,6,0,-1,-1,41,21,0,0,82,7,26265,2566,-1,-1,-1,-1,-1,-1,12504,2873,57,2,15930,2806,-9,-9,27017,2666,-9,-9,-1,-1,-1,26,1,556,9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2012,IA,2,7917,771,0,0,32,15,7949,786,-1,-1,5113,578,2097,158,522,26,142,17,75,5,0,0,-1,-1,0,0,0,0,0,0,7949,784,-1,-1,-1,-1,-1,-1,3234,520,22,1,4837,632,-9,-9,-9,-9,6624,585,-1,-1,-1,8,0,257,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2012,KS,2,5994,363,2707,353,5,0,8706,716,-1,-1,4859,463,2924,186,935,55,142,19,64,4,0,0,-1,-1,0,0,0,0,28,3,8952,730,-1,-1,-1,-1,-1,-1,3176,525,18,0,4278,571,8514,666,8460,773,8391,773,-1,-1,-1,4,0,332,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2012,KY,3,10706,1339,46,10,65,20,10817,1369,-1,-1,14055,2373,4926,273,234,8,15,3,30,1,0,0,-1,-1,148,26,0,0,17,1,19425,2685,-1,-1,-1,-1,-1,-1,8902,2360,82,9,13339,3064,11612,1370,11851,1361,12401,1406,-1,-1,-1,0,0,229,18,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2012,LA,3,14567,1076,0,0,2,0,14569,1076,-1,-1,11149,1263,26454,1120,72,0,15,3,34,2,58,0,-1,-1,0,0,1,1,0,0,37783,2389,-1,-1,-1,-1,-1,-1,10813,1384,130,3,15451,1776,17523,1076,17760,1098,-9,-9,-1,-1,-1,38,0,121,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2012,ME,1,1691,116,142,28,0,0,1833,144,-1,-1,1684,141,140,7,18,2,49,9,8,0,1,0,-1,-1,11,3,0,0,33,2,1944,164,-1,-1,-1,-1,-1,-1,503,60,0,0,1003,110,2172,167,1988,145,2172,167,-1,-1,-1,1,0,22,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2012,MD,3,20304,872,234,5,349,19,20887,896,-1,-1,5415,392,15076,476,0,0,27,3,39,2,0,0,-1,-1,0,0,0,0,89,3,20646,876,-1,-1,-1,-1,-1,-1,5457,402,42,3,9781,632,-9,-9,23491,1063,-9,-9,-1,-1,-1,23,1,634,17,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2012,MA,1,9395,420,7,54,979,272,10381,746,-1,-1,4432,522,3052,106,2785,67,76,6,149,4,0,0,-1,-1,0,0,55,54,0,0,10549,759,-1,-1,-1,-1,-1,-1,2076,309,30,1,2637,433,-9,-9,-9,-9,7437,592,-1,-1,-1,1,0,972,53,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2012,MI,2,41605,1989,0,0,0,0,41605,1989,-1,-1,17862,1110,22639,833,461,6,366,31,118,3,4,0,-1,-1,0,0,0,0,155,6,41605,1989,-1,-1,-1,-1,-1,-1,6886,591,123,1,12242,960,42925,2191,42197,2087,-8,-8,-1,-1,-1,89,2,595,22,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2012,MN,2,8719,679,0,0,22,1,8741,680,-1,-1,4185,415,3339,134,691,19,779,120,232,20,0,0,-1,-1,0,0,0,0,2,2,9228,710,-1,-1,-1,-1,-1,-1,4147,588,15,0,6957,773,-8,-8,8434,665,-8,-8,-1,-1,-1,7,0,545,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2012,MS,3,9619,1070,617,151,0,0,10236,1221,-1,-1,6464,944,13956,719,158,7,20,3,43,0,0,0,-1,-1,0,0,0,0,5,0,20646,1673,-1,-1,-1,-1,-1,-1,5692,720,56,0,6869,859,-9,-9,25611,-7,-9,-9,-1,-1,-1,8,0,14,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2012,MO,2,28502,2700,3,0,0,0,28505,2700,-1,-1,16635,2055,11229,563,476,59,88,17,56,7,0,0,-1,-1,0,0,0,0,60,2,28544,2703,-1,-1,-1,-1,-1,-1,8136,1612,73,1,15387,2586,-8,-8,28662,2724,-8,-8,-1,-1,-1,8,0,499,34,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2012,MT,4,1486,191,0,0,0,0,1486,191,-1,-1,2438,253,93,0,0,0,647,131,8,1,0,0,-1,-1,0,0,0,0,24,14,3210,399,-1,-1,-1,-1,-1,-1,1263,256,12,1,1749,342,1689,1689,-9,-9,-9,-9,-1,-1,-1,0,0,16,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2012,NE,2,4211,334,109,17,49,1,4369,352,-1,-1,2382,213,1197,70,564,25,162,30,33,0,0,0,-1,-1,0,0,12,15,2,0,4352,353,-1,-1,-1,-1,-1,-1,1888,274,9,3,2362,381,-9,-9,3625,344,2900,275,-1,-1,-1,9,0,238,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2012,NV,4,11484,1015,95,0,0,0,11579,1015,-1,-1,5246,660,3399,220,2540,93,212,27,273,35,0,0,-1,-1,0,0,93,0,82,3,11845,1038,-1,-1,-1,-1,-1,-1,3432,571,35,1,4919,704,-9,-9,-9,-9,-9,-9,-1,-1,-1,0,0,0,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2012,NH,1,2401,167,0,0,0,0,2401,167,-1,-1,2104,187,156,5,142,6,4,1,7,0,0,0,-1,-1,0,0,19,5,151,3,2583,207,-1,-1,-1,-1,-1,-1,752,116,0,0,1420,235,-9,-9,2401,167,2085,105,-1,-1,-1,0,0,110,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2012,NJ,1,19548,785,0,0,0,0,19548,785,-1,-1,4972,372,13577,538,3482,140,9,2,111,9,0,0,-1,-1,0,0,1,0,12,0,22164,1061,-1,-1,-1,-1,-1,-1,6976,528,46,4,10340,716,19476,780,20275,844,21727,1001,-1,-1,-1,6,1,1435,31,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2012,NM,4,3551,49,41,0,0,0,3592,49,-1,-1,1448,177,485,47,3949,385,80,11,15,1,8,0,-1,-1,0,0,0,0,25,9,6010,630,-1,-1,-1,-1,-1,-1,1933,292,15,0,2974,398,5538,654,6431,680,6431,680,-1,-1,-1,0,0,170,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2012,NY,1,51543,2223,117,20,126,29,51786,2272,-1,-1,11935,853,25940,965,12728,366,331,30,259,10,0,0,-1,-1,0,0,397,8,373,15,51963,2247,-1,-1,-1,-1,-1,-1,12873,980,113,2,23043,1505,50258,2906,51160,2906,49839,2748,-1,-1,-1,132,4,4196,125,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2012,NC,3,32856,2137,1829,324,205,27,34890,2488,-1,-1,11791,1473,19838,861,2040,54,790,61,103,6,18,2,-1,-1,0,0,0,0,95,4,34675,2461,-1,-1,-1,-1,-1,-1,10467,1002,72,4,11355,972,-9,-9,33791,2879,28879,2425,-1,-1,-1,115,4,1534,35,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2012,ND,2,1242,171,0,0,0,0,1242,171,-1,-1,973,104,87,6,56,8,221,53,3,0,0,0,-1,-1,1,0,0,0,0,0,1341,171,-1,-1,-1,-1,-1,-1,545,95,3,0,890,192,910,134,857,134,910,134,-1,-1,-1,0,0,11,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2012,OH,2,41770,3759,0,0,0,0,41770,3759,-1,-1,22962,2764,22445,1040,1292,39,61,6,66,14,0,0,-1,-1,0,0,0,0,182,5,47008,3868,-1,-1,-1,-1,-1,-1,16401,2538,113,17,18869,2759,24346,3325,-9,-9,-9,-9,-1,-1,-1,30,0,545,18,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2012,OK,3,15458,2130,324,35,0,0,15782,2165,-1,-1,12106,1494,6788,510,1632,119,2078,364,63,3,18,2,-1,-1,0,0,43,5,0,0,22728,2497,-1,-1,-1,-1,-1,-1,4493,742,79,6,5958,994,15973,2157,-9,-9,-9,-9,-1,-1,-1,14,2,0,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2012,OR,4,12893,1202,25,3,0,0,12918,1205,-1,-1,9808,1044,1318,90,1961,44,335,39,186,14,0,0,-1,-1,0,0,0,0,1,0,13609,1231,-1,-1,-1,-1,-1,-1,3210,519,24,2,4470,562,-8,-8,-9,-9,12679,1683,-1,-1,-1,0,0,1212,21,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2012,PA,1,46303,2449,5,4,197,51,46505,2504,-1,-1,18420,1680,24172,835,5475,190,36,13,100,10,0,0,-1,-1,0,0,0,0,177,17,48380,2745,-1,-1,-1,-1,-1,-1,9798,960,153,4,17517,1640,45784,2795,45784,2795,45784,2795,-1,-1,-1,21,1,1043,28,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2012,RI,1,1856,71,404,49,618,44,2878,164,-1,-1,1397,128,904,32,663,22,15,2,44,1,0,0,-1,-1,0,0,18,1,2,0,3043,186,-1,-1,-1,-1,-1,-1,650,47,3,1,932,66,3676,313,3501,273,3660,313,-1,-1,-1,0,0,68,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2012,SC,3,19961,1230,560,97,19,0,20540,1327,-1,-1,6605,732,13830,568,433,20,31,4,23,0,0,0,-1,-1,0,0,129,13,0,0,21051,1337,-1,-1,-1,-1,-1,-1,4733,472,59,2,6707,618,-8,-8,22217,1814,-8,-8,-1,-1,-1,31,1,473,20,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2012,SD,2,3197,364,6,0,13,1,3216,365,-1,-1,2035,226,217,10,107,9,855,173,10,4,3,1,-1,-1,0,0,0,0,0,0,3227,423,-1,-1,-1,-1,-1,-1,956,179,8,0,1648,322,-8,-8,3241,435,-8,-8,-1,-1,-1,0,0,75,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2012,TN,3,13448,1174,0,0,28,2,13476,1176,-1,-1,12834,1688,12538,632,579,27,31,7,60,4,0,0,-1,-1,0,0,0,0,6,5,26048,2363,-1,-1,-1,-1,-1,-1,7197,1380,71,9,13549,2614,19503,1259,19007,1234,-9,-9,-1,-1,-1,19,0,262,14,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2012,TX,3,122183,8792,4551,1052,0,0,126734,9844,-1,-1,45884,6197,54743,4229,51445,3048,84,28,417,28,0,0,-1,-1,0,0,250,19,0,0,152823,13549,-1,-1,-1,-1,-1,-1,42976,7095,438,18,72532,9598,153121,13177,147152,12664,153121,13177,-1,-1,-1,81,5,8592,216,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2012,UT,4,4763,544,2,0,0,0,4765,544,-1,-1,4159,456,415,19,1251,119,258,23,64,8,121,11,-1,-1,0,0,0,0,55,3,6323,639,-1,-1,-1,-1,-1,-1,1593,352,13,2,2549,514,-9,-9,6389,641,6599,671,-1,-1,-1,2,0,343,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2012,VT,1,946,73,88,12,369,42,1403,127,-1,-1,1633,112,187,9,0,0,15,0,11,2,0,0,-1,-1,0,0,0,0,61,4,1907,127,-1,-1,-1,-1,-1,-1,538,59,2,0,1720,284,1503,178,1503,178,1144,178,-1,-1,-1,2,0,25,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2012,VA,3,25710,2439,0,0,0,0,25710,2439,-1,-1,12236,1546,21045,1091,735,22,16,3,125,11,0,0,-1,-1,0,0,0,0,205,9,34362,2682,-1,-1,-1,-1,-1,-1,10156,1351,81,8,10266,1319,28172,2540,-8,-8,-8,-8,-1,-1,-1,3,0,603,16,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2012,WA,4,15610,1254,14,3,18,20,15642,1277,-1,-1,9727,905,3041,135,1883,157,603,89,575,39,0,0,-1,-1,39,12,0,0,66,0,15934,1337,-1,-1,-1,-1,-1,-1,6720,902,37,0,16223,1982,15263,1158,14884,1064,-9,-9,-1,-1,-1,24,0,890,26,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2012,WV,3,4821,497,0,0,10,7,4831,504,-1,-1,5396,757,766,43,36,1,12,0,3,0,0,0,-1,-1,52,4,0,0,0,0,6265,805,-1,-1,-1,-1,-1,-1,1458,266,19,2,2771,535,4038,522,4838,552,4038,522,-1,-1,-1,0,0,17,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2012,WI,2,20045,1146,513,29,633,36,21190,1211,-1,-1,9463,757,8991,350,2068,54,604,56,213,8,0,0,-1,-1,0,0,0,0,36,0,21375,1225,-1,-1,-1,-1,-1,-1,3350,424,44,0,7150,610,-9,-9,-9,-9,16169,967,-1,-1,-1,13,0,601,12,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2012,WY,4,1729,222,0,0,0,0,1729,222,-1,-1,1530,206,100,4,217,11,105,16,9,1,3,0,-1,-1,0,0,2,0,0,0,1966,238,-1,-1,-1,-1,-1,-1,654,116,5,1,768,126,2006,282,2006,282,2111,296,-1,-1,-1,0,0,39,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2012,ST,7,1060433,75082,18201,3343,12250,1569,1090884,79994,-1,-1,486445,54820,540302,26478,196512,9527,15035,2179,6285,523,3101,414,-1,-1,382,74,7167,321,2557,173,1257787,94510,-1,-1,-1,-1,-1,-1,345478,47495,3178,149,521584,64965,595548,49571,910661,70168,554022,45430,-1,-1,-1,1276,49,62107,1826,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2012,US,5,1210201,86113,20123,3954,24619,2337,1254943,92404,-1,-1,533731,59863,605355,29394,261023,13453,18211,2561,8818,813,3101,414,-1,-1,382,74,7167,321,2557,173,1440346,107067,-1,-1,-1,-1,-1,-1,391829,52385,3517,164,572961,69859,714892,58842,910661,70168,554022,45430,-1,-1,-1,1276,49,89030,3862,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2012,FE,6,149768,11031,1922,611,12369,768,164059,12410,-1,-1,47286,5043,65053,2916,64511,3926,3176,382,2533,290,0,0,-1,-1,0,0,0,0,0,0,182559,12557,-1,-1,-1,-1,-1,-1,46351,4890,339,15,51377,4894,119344,9271,-9,-9,-9,-9,-1,-1,-1,0,0,26923,2036,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2013,AL,3,24145,1610,279,43,190,4,24614,1657,-1,-1,11986,1844,17594,868,0,0,1,0,2,0,0,0,-1,-1,0,0,0,0,77,9,29660,2721,-1,-1,-1,-1,-1,-1,7795,1396,119,6,10553,1628,-8,-8,-8,-8,12426,892,-1,-1,-1,39,2,203,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2013,AK,4,1885,312,887,199,1516,258,4286,768,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,-1,-1,0,0,0,0,0,0,0,0,-1,-1,-1,-1,-1,-1,-9,-9,-9,-9,3080,694,2801,257,2895,311,-8,-8,-1,-1,-1,0,0,0,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2013,AZ,4,29574,3387,1283,382,0,0,30857,3769,-1,-1,14123,2022,5070,345,15650,1009,1747,314,168,27,0,0,-1,-1,0,0,488,51,16,1,37262,3769,-1,-1,-1,-1,-1,-1,9802,1267,93,4,11518,1424,32459,4222,37731,4294,32459,4222,-1,-1,-1,55,3,4846,121,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2013,AR,3,13154,1108,27,6,0,0,13181,1114,-1,-1,8168,992,7148,311,486,20,36,5,52,3,0,0,-1,-1,0,0,12,0,2,0,15904,1331,-1,-1,-1,-1,-1,-1,2196,529,54,2,5755,789,13346,1078,13401,1078,12800,1085,-1,-1,-1,13,1,205,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2013,CA,4,128211,6128,0,0,0,0,128211,6128,-1,-1,28158,2005,37402,1697,53697,2028,1364,104,1010,76,214,17,-1,-1,0,0,7457,271,0,0,129302,6198,-1,-1,-1,-1,-1,-1,29440,2455,0,0,33996,2357,-8,-8,119120,5875,82249,3805,-1,-1,-1,0,0,0,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2013,CO,4,14531,1755,0,0,0,0,14531,1755,-1,-1,8181,945,3571,277,6104,515,505,65,195,13,0,0,-1,-1,0,0,0,0,0,0,18556,1815,-1,-1,-1,-1,-1,-1,4662,717,43,3,9072,1164,-8,-8,12625,1464,12988,1540,-1,-1,-1,1,0,1215,54,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2013,CT,1,10884,589,1235,197,3366,323,15485,1109,-1,-1,4980,650,6907,363,4329,216,29,1,83,5,0,0,-1,-1,0,0,0,0,0,0,16328,1235,-1,-1,-1,-1,-1,-1,4238,359,20,2,5054,444,-8,-8,-8,-8,-8,-8,-1,-1,-1,86,2,537,18,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2013,DE,3,3832,228,1119,175,1271,173,6222,576,-1,-1,2391,390,3729,196,276,12,0,0,6,1,0,0,-1,-1,0,0,0,0,3,0,6405,599,-1,-1,-1,-1,-1,-1,2329,469,10,0,3535,729,5354,421,4890,320,3961,200,-1,-1,-1,7,0,329,24,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2013,DC,3,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8\n2013,FL,3,83853,5286,0,0,0,0,83853,5286,-1,-1,44408,4898,47294,2187,3655,165,76,6,15,3,0,0,-1,-1,0,0,0,0,309,12,95757,7271,-1,-1,-1,-1,-1,-1,28475,3898,292,24,29181,3674,-8,-8,105783,9212,-8,-8,-1,-1,-1,136,8,6868,222,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2013,GA,3,41810,3525,432,34,0,0,42242,3559,-1,-1,16288,1921,31751,1562,2206,63,22,4,140,9,0,0,-1,-1,0,0,0,0,38,0,50445,3559,-1,-1,-1,-1,-1,-1,15578,2016,113,1,17924,2066,56101,4537,50408,4175,-8,-8,-1,-1,-1,87,5,2451,126,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2013,HI,4,1786,289,531,111,894,141,3211,541,-1,-1,1048,173,242,23,149,9,29,2,901,100,2270,329,-1,-1,132,11,0,0,201,13,4972,660,-1,-1,-1,-1,-1,-1,671,87,10,0,1393,222,-8,-8,3327,-7,2291,-7,-1,-1,-1,0,0,293,38,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2013,ID,4,3734,740,0,0,0,0,3734,740,-1,-1,4846,783,186,17,1032,122,235,67,39,4,0,0,-1,-1,0,0,0,0,185,33,6523,1026,-1,-1,-1,-1,-1,-1,2857,682,9,1,3075,687,-8,-8,6157,767,6224,786,-1,-1,-1,17,0,397,23,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2013,IL,2,45737,2916,0,0,0,0,45737,2916,-1,-1,12721,1416,26954,1237,5833,226,54,21,158,11,0,0,-1,-1,0,0,0,0,17,5,45737,2916,-1,-1,-1,-1,-1,-1,19421,2340,78,0,28714,2712,30287,1788,30287,1788,26428,1764,-1,-1,-1,67,1,1903,52,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2013,IN,2,25860,2627,0,0,8,0,25868,2627,-1,-1,15829,2251,9769,500,1263,40,57,5,45,5,5,2,-1,-1,61,25,0,0,49,7,27078,2835,-1,-1,-1,-1,-1,-1,12934,2839,56,2,15197,2922,-8,-8,28032,2885,-8,-8,-1,-1,-1,30,2,638,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2013,IA,2,7959,705,0,0,32,11,7991,716,-1,-1,5126,548,2120,130,531,20,140,14,66,2,0,0,-1,-1,0,0,0,0,0,0,7983,714,-1,-1,-1,-1,-1,-1,3291,535,19,0,4639,809,-8,-8,-8,-8,6624,485,-1,-1,-1,15,0,227,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2013,KS,2,6010,414,2745,292,35,19,8790,725,-1,-1,4971,479,2909,173,915,60,141,19,66,3,0,0,-1,-1,0,0,0,0,24,3,9026,737,-1,-1,-1,-1,-1,-1,3176,543,27,1,4536,644,8514,666,8460,773,8391,773,-1,-1,-1,0,0,341,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2013,KY,3,10713,1284,48,10,73,13,10834,1307,-1,-1,13555,2028,4723,243,226,16,15,3,30,2,0,0,-1,-1,153,21,0,0,15,0,18717,2313,-1,-1,-1,-1,-1,-1,7796,1937,37,4,13731,3201,10854,1303,11701,1361,12451,1406,-1,-1,-1,14,0,228,16,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2013,LA,3,14533,1102,0,0,1,0,14534,1102,-1,-1,11132,1195,25788,1028,58,1,17,2,29,1,45,1,-1,-1,0,0,2,0,0,0,37071,2228,-1,-1,-1,-1,-1,-1,10593,1365,129,2,15878,1872,16950,1171,14433,1098,15593,1171,-1,-1,-1,23,0,82,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2013,ME,1,1746,114,192,21,0,0,1938,135,-1,-1,1733,139,149,5,20,1,59,9,11,1,0,0,-1,-1,13,3,0,0,28,2,2013,160,-1,-1,-1,-1,-1,-1,542,65,0,0,886,89,2172,167,1988,45,2172,167,-1,-1,-1,0,0,19,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2013,MD,3,19976,925,305,4,452,14,20733,943,-1,-1,5503,449,14685,467,0,0,51,4,51,3,0,0,-1,-1,0,0,0,0,120,2,20410,925,-1,-1,-1,-1,-1,-1,5147,432,59,0,8965,587,-8,-8,22394,1071,-8,-8,-1,-1,-1,18,4,613,21,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2013,MA,1,8941,429,3,80,886,283,9830,792,-1,-1,4273,564,2923,118,2687,54,68,3,141,4,0,0,-1,-1,0,0,51,64,0,0,10143,807,-1,-1,-1,-1,-1,-1,1926,364,30,0,2514,416,-8,-8,-8,-8,7437,592,-1,-1,-1,2,1,683,28,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2013,MI,2,41645,2059,0,0,0,0,41645,2059,-1,-1,17947,1181,22528,825,416,7,385,33,126,5,3,1,-1,-1,0,0,0,0,240,7,41645,2059,-1,-1,-1,-1,-1,-1,7188,657,123,3,13210,1099,42687,2159,41883,2102,-8,-8,-1,-1,-1,72,1,505,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2013,MN,2,8690,669,0,0,28,4,8718,673,-1,-1,4359,422,3445,128,694,18,806,136,258,18,0,0,-1,-1,0,0,0,0,4,1,9566,723,-1,-1,-1,-1,-1,-1,4300,601,20,0,6934,874,-8,-8,8434,665,-8,-8,-1,-1,-1,13,0,517,14,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2013,MS,3,9504,1014,504,175,0,0,10008,1189,-1,-1,6353,892,13769,710,162,9,33,5,34,1,0,0,-1,-1,0,0,0,0,1,0,20352,1617,-1,-1,-1,-1,-1,-1,5301,671,74,5,7229,973,-8,-8,25611,-7,-8,-8,-1,-1,-1,8,0,17,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2013,MO,2,28720,2779,0,0,0,0,28720,2779,-1,-1,16820,2143,11241,548,499,53,86,29,57,7,0,0,-1,-1,0,0,0,0,52,2,28755,2782,-1,-1,-1,-1,-1,-1,8385,1858,96,7,15756,3042,-8,-8,28844,2837,-8,-8,-1,-1,-1,13,0,487,29,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2013,MT,4,1471,195,0,0,0,0,1471,195,-1,-1,2463,263,85,6,0,0,670,141,12,2,0,0,-1,-1,0,0,0,0,0,0,3230,412,-1,-1,-1,-1,-1,-1,1489,337,10,0,1937,414,1485,194,-8,-8,-8,-8,-1,-1,-1,1,0,15,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2013,NE,2,4505,356,91,13,43,4,4639,373,-1,-1,2568,242,1290,53,571,33,175,35,31,2,2,0,-1,-1,0,0,17,5,2,0,4656,370,-1,-1,-1,-1,-1,-1,1959,296,15,1,2261,367,-8,-8,3625,344,2900,275,-1,-1,-1,15,0,222,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2013,NV,4,11630,1063,0,0,96,0,11726,1063,-1,-1,5246,660,3399,220,2540,93,212,27,273,35,0,0,-1,-1,0,0,93,0,82,3,11845,1038,-1,-1,-1,-1,-1,-1,3432,571,35,1,4919,704,-8,-8,-8,-8,-8,-8,-1,-1,-1,0,0,0,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2013,NH,1,2450,173,0,0,0,0,2450,173,-1,-1,2164,186,113,5,152,8,6,1,11,0,1,0,-1,-1,0,0,16,4,173,8,2636,212,-1,-1,-1,-1,-1,-1,744,117,9,0,1443,196,-8,-8,2450,173,2085,105,-1,-1,-1,0,0,110,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2013,NJ,1,18776,752,0,0,0,0,18776,752,-1,-1,4742,377,12989,504,3376,119,7,2,125,10,0,0,-1,-1,0,0,0,0,188,13,21427,1025,-1,-1,-1,-1,-1,-1,6667,536,46,0,10214,738,18711,750,20114,845,21900,1002,-1,-1,-1,8,0,1365,26,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2013,NM,4,3738,0,45,0,0,0,3783,0,-1,-1,1489,184,461,48,3658,357,448,56,11,1,11,1,-1,-1,0,0,0,0,36,6,6114,653,-1,-1,-1,-1,-1,-1,2109,344,15,1,2921,426,5853,632,6772,656,6772,656,-1,-1,-1,0,0,148,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2013,NY,1,50749,2325,102,20,99,17,50950,2362,-1,-1,11803,954,25419,965,12534,351,351,34,252,20,0,0,-1,-1,0,0,507,14,327,19,51193,2357,-1,-1,-1,-1,-1,-1,12494,947,140,3,22323,1333,50311,2544,50864,2544,49904,2426,-1,-1,-1,127,4,4010,138,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2013,NC,3,32953,2239,1488,253,220,23,34661,2515,-1,-1,12138,1537,19366,815,1887,52,796,74,103,6,16,1,-1,-1,0,0,0,0,124,7,34430,2492,-1,-1,-1,-1,-1,-1,11455,1266,72,4,12590,1239,-8,-8,36327,2879,31190,2425,-1,-1,-1,64,4,1407,32,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2013,ND,2,1204,0,53,0,0,0,1257,0,-1,-1,986,107,81,4,67,5,262,41,4,0,0,0,-1,-1,0,0,0,0,0,0,1396,157,-1,-1,-1,-1,-1,-1,591,93,1,0,978,209,-8,-8,-8,-8,-8,-8,-1,-1,-1,0,0,16,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2013,OH,2,42202,4022,0,0,0,0,42202,4022,-1,-1,23772,3075,22308,1015,1223,36,62,7,57,14,0,0,-1,-1,0,0,0,0,157,3,47579,4150,-1,-1,-1,-1,-1,-1,16269,2817,118,6,18462,2776,27939,3325,-8,-8,-8,-8,-1,-1,-1,17,3,507,20,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2013,OK,3,15598,2373,308,34,0,0,15906,2407,-1,-1,12399,1629,6786,497,1685,130,2167,420,68,4,25,5,-1,-1,0,0,45,10,0,0,23175,2695,-1,-1,-1,-1,-1,-1,4770,848,88,6,6303,1072,16279,2328,16279,2328,16279,2328,-1,-1,-1,3,1,1131,65,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2013,OR,4,13329,1258,16,2,0,0,13345,1260,-1,-1,10082,1088,1354,94,1946,53,335,37,198,15,0,0,-1,-1,0,0,0,0,5,0,13920,1287,-1,-1,-1,-1,-1,-1,3280,543,29,3,4421,636,-8,-8,-8,-8,-8,-8,-1,-1,-1,0,0,1138,25,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2013,PA,1,46738,2410,11,3,205,58,46954,2471,-1,-1,18096,1616,23770,799,5480,199,33,9,110,10,0,0,-1,-1,0,0,0,0,179,11,47668,2644,-1,-1,-1,-1,-1,-1,10462,1017,148,9,18826,1799,45050,2730,45050,2730,45050,2730,-1,-1,-1,28,0,1046,27,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2013,RI,1,1899,60,445,49,668,47,3012,156,-1,-1,1407,127,938,32,740,28,19,1,45,2,0,0,-1,-1,0,0,19,0,1,2,3169,192,-1,-1,-1,-1,-1,-1,621,38,1,0,857,58,3676,313,3501,273,3660,313,-1,-1,-1,0,0,61,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2013,SC,3,19626,1283,518,95,12,0,20156,1378,-1,-1,6586,814,13475,544,407,17,32,4,20,0,0,0,-1,-1,0,0,149,12,0,0,20669,1391,-1,-1,-1,-1,-1,-1,4642,520,64,2,6181,542,-8,-8,21994,1812,-8,-8,-1,-1,-1,26,1,476,18,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2013,SD,2,3187,381,9,1,18,0,3214,382,-1,-1,2006,234,214,12,133,13,836,181,18,2,1,0,-1,-1,0,0,1,0,0,0,3209,442,-1,-1,-1,-1,-1,-1,873,186,5,1,1536,302,-8,-8,3211,422,-8,-8,-1,-1,-1,0,0,95,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2013,TN,3,14167,1461,0,0,25,2,14192,1463,-1,-1,13064,1814,12353,600,562,25,28,6,57,7,0,0,-1,-1,0,0,0,0,5,0,26069,2452,-1,-1,-1,-1,-1,-1,6948,1326,81,0,13909,2673,20692,1572,19987,1541,-8,-8,-1,-1,-1,7,1,269,12,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2013,TX,3,125060,9724,4457,1598,0,0,129517,11322,-1,-1,46731,6359,54565,4165,52381,3245,83,21,441,27,0,0,-1,-1,0,0,249,13,0,0,154450,13830,-1,-1,-1,-1,-1,-1,42459,7366,392,12,65108,8985,149352,11821,143537,11364,149352,11821,-1,-1,-1,67,2,8593,210,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2013,UT,4,4837,542,3,0,0,0,4840,542,-1,-1,4211,486,428,24,1249,100,283,31,63,8,122,11,-1,-1,0,0,0,0,57,2,6413,662,-1,-1,-1,-1,-1,-1,1607,356,24,1,2469,519,-8,-8,6516,675,6726,705,-1,-1,-1,1,0,281,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2013,VT,1,983,96,81,12,361,46,1425,154,-1,-1,1642,147,205,3,4,0,8,0,12,1,0,0,-1,-1,0,0,0,0,53,3,1924,154,-1,-1,-1,-1,-1,-1,590,72,6,0,1565,236,1503,178,1503,178,1144,178,-1,-1,-1,2,0,20,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2013,VA,3,26010,2421,0,0,0,0,26010,2421,-1,-1,12361,1710,20712,1098,813,20,17,3,118,12,0,0,-1,-1,0,0,0,0,112,6,34133,2849,-1,-1,-1,-1,-1,-1,10039,1492,85,2,10492,1406,29118,2540,-8,-8,-8,-8,-1,-1,-1,9,0,466,15,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2013,WA,4,16310,1413,30,7,0,0,16340,1420,-1,-1,10053,969,3142,163,1999,158,619,92,584,51,0,0,-1,-1,0,0,4,1,134,15,16535,1449,-1,-1,-1,-1,-1,-1,7096,1010,40,3,18566,2337,15555,1244,15424,1064,-8,-8,-1,-1,-1,23,1,857,25,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2013,WV,3,5202,502,0,0,0,4,5202,506,-1,-1,5170,775,744,32,36,0,12,0,4,0,1,0,-1,-1,49,1,0,0,0,0,6016,808,-1,-1,-1,-1,-1,-1,1449,280,25,0,3164,630,4426,522,5226,552,4426,522,-1,-1,-1,0,0,20,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2013,WI,2,20067,1163,510,33,631,39,21208,1235,-1,-1,9603,808,8859,308,1943,47,594,71,215,5,0,0,-1,-1,0,0,0,0,18,0,21232,1239,-1,-1,-1,-1,-1,-1,4180,465,35,2,5090,392,-8,-8,21643,1280,16157,1024,-1,-1,-1,26,1,496,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2013,WY,4,1791,245,0,0,0,0,1791,245,-1,-1,1548,219,117,4,247,12,122,24,8,1,5,0,-1,-1,0,0,3,0,0,0,2050,260,-1,-1,-1,-1,-1,-1,683,125,3,1,781,133,2006,282,2006,282,2111,296,-1,-1,-1,0,0,40,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2013,ST,7,1071915,78451,17757,3849,11130,1483,1100800,83782,-1,-1,487229,56710,535070,25968,196521,9765,14133,2169,6523,539,2721,368,-1,-1,408,61,9113,445,3034,195,1254748,96220,-1,-1,-1,-1,-1,-1,354951,51050,2998,125,509641,65240,620777,48763,975544,74046,600635,45573,-1,-1,-1,1140,48,46393,1468,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2013,US,5,1219456,89703,20920,4393,21897,2046,1262271,96141,-1,-1,534515,61753,600123,28884,261032,13691,17094,2516,9056,829,2721,368,-1,-1,408,61,9113,445,3034,195,1437307,108777,-1,-1,-1,-1,-1,-1,398815,56004,3399,135,559704,70245,741069,59378,975544,74046,600635,45573,-1,-1,-1,1140,48,70226,3439,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2013,FE,6,147541,11252,3163,544,10767,563,161471,12359,-1,-1,47286,5043,65053,2916,64511,3926,2961,347,2533,290,0,0,-1,-1,0,0,0,0,0,0,182559,12557,-1,-1,-1,-1,-1,-1,43864,4954,401,10,50063,5005,120292,10615,-8,-8,-8,-8,-1,-1,-1,0,0,23833,1971,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2014,AL,3,23727,1509,206,29,190,3,24123,1541,-1,-1,11892,1763,17183,815,0,0,1,0,2,0,0,0,-1,-1,0,0,0,0,104,11,29182,2589,-1,-1,-1,-1,-1,-1,7494,1333,118,5,10527,1800,-8,-8,-8,-8,12554,764,-1,-1,-1,0,0,77,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2014,AK,4,1909,152,1226,205,1900,336,5035,693,-1,-1,2180,365,429,32,114,14,1654,214,22,2,21,2,-1,-1,115,17,0,0,33,2,4568,648,-1,-1,-1,-1,-1,-1,-9,-9,3,1,3080,694,-8,-8,-8,-8,-8,-8,-1,-1,-1,0,0,0,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2014,AZ,4,30027,3550,1196,408,0,0,31223,3958,-1,-1,14557,2128,5275,331,15807,1068,1833,341,154,22,0,0,-1,-1,0,0,542,68,10,0,38178,3958,-1,-1,-1,-1,-1,-1,10525,1464,99,1,11981,1540,33459,4222,38667,4294,33459,4222,-1,-1,-1,55,1,4609,134,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2014,AR,3,14003,1227,18,2,0,0,14021,1229,-1,-1,8636,1031,7243,328,490,23,41,11,53,5,0,0,-1,-1,0,0,10,0,3,0,16476,1398,-1,-1,-1,-1,-1,-1,3543,675,51,7,7762,1053,14360,1090,14339,1090,14439,1090,-1,-1,-1,11,0,114,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2014,CA,4,127969,6093,-9,-9,331,37,128300,6130,-1,-1,28055,2028,37284,1647,54555,2062,1312,115,1117,85,254,22,-1,-1,0,0,6768,254,0,0,129345,6213,-1,-1,-1,-1,-1,-1,30957,2540,-9,-9,35922,2637,-8,-8,121554,6040,83382,3805,-1,-1,-1,0,0,0,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2014,CO,4,14842,1845,-8,-8,-8,-8,14842,1845,-1,-1,8443,1042,3618,244,5966,544,515,66,195,12,0,0,-1,-1,0,0,0,0,1,0,18738,1908,-1,-1,-1,-1,-1,-1,4530,745,40,0,8649,1221,-8,-8,13026,1476,13026,1476,-1,-1,-1,3,0,1473,52,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2014,CT,1,10768,567,1149,163,3204,316,15121,1046,-1,-1,4922,592,6454,340,4028,184,37,4,69,4,0,0,-1,-1,0,0,0,0,0,2,15510,1126,-1,-1,-1,-1,-1,-1,4234,298,9,1,5721,407,-8,-8,-8,-8,-8,-8,-1,-1,-1,83,1,511,12,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2014,DE,3,3874,210,1103,204,1187,152,6164,566,-1,-1,2472,415,3613,166,268,11,0,0,7,2,0,0,-1,-1,0,0,0,0,1,0,6361,594,-1,-1,-1,-1,-1,-1,2246,465,13,0,3454,776,5257,392,4890,320,3961,200,-1,-1,-1,3,0,312,18,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2014,DC,3,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8\n2014,FL,3,83140,5338,0,0,0,0,83140,5338,-1,-1,44475,4930,46950,2164,3733,185,79,10,12,2,0,0,-1,-1,0,0,304,11,14,1,95567,7303,-1,-1,-1,-1,-1,-1,27151,3833,339,20,28898,3856,-8,-8,101021,8170,-8,-8,-1,-1,-1,122,4,6937,262,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2014,GA,3,40911,3475,396,36,0,0,41307,3511,-1,-1,16087,1923,31020,1508,2097,60,25,1,160,13,1,0,-1,-1,45,6,0,0,3,0,49438,3511,-1,-1,-1,-1,-1,-1,14635,1979,116,4,17327,2067,55098,4468,49167,4251,-8,-8,-1,-1,-1,94,2,2335,115,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2014,HI,4,1870,256,578,164,958,139,3406,559,-1,-1,1178,199,248,27,147,9,29,3,988,110,2166,270,-1,-1,147,24,295,26,0,0,5198,668,-1,-1,-1,-1,-1,-1,986,130,9,0,1010,174,-8,-8,-8,-8,-8,-8,-1,-1,-1,0,0,140,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2014,ID,4,6029,760,63,6,-9,-9,6092,766,-1,-1,5319,817,211,18,1066,111,264,65,41,5,0,0,-1,-1,0,0,0,0,179,21,7080,1037,-1,-1,-1,-1,-1,-1,1306,264,22,2,3693,847,6224,786,-8,-8,-8,-8,-1,-1,-1,0,0,210,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2014,IL,2,45390,2888,-9,-9,0,0,45390,2888,-1,-1,12641,1391,26765,1250,5763,209,50,17,152,18,0,0,-1,-1,0,0,0,0,19,3,45390,2888,-1,-1,-1,-1,-1,-1,18655,2114,87,5,27594,2523,30308,1787,30308,1787,26449,1763,-1,-1,-1,17,1,1767,46,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2014,IN,2,25363,2700,0,0,10,0,25373,2700,-1,-1,15657,2309,9284,465,1219,55,54,9,46,2,14,2,-1,-1,75,27,0,0,47,6,26396,2875,-1,-1,-1,-1,-1,-1,11778,2664,66,4,15182,2901,-8,-8,27649,2868,-8,-8,-1,-1,-1,40,2,623,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2014,IA,2,8062,743,0,0,28,12,8090,755,-1,-1,5160,562,2134,138,578,32,145,18,69,2,0,0,-1,-1,0,0,0,0,0,0,8086,752,-1,-1,-1,-1,-1,-1,3156,555,15,0,4564,763,6498,778,6498,778,6498,778,-1,-1,-1,4,1,150,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2014,KS,2,8483,713,277,66,0,0,8760,779,-1,-1,4960,541,2791,146,908,67,138,21,77,7,0,0,-1,-1,1,0,0,0,6,0,8881,782,-1,-1,-1,-1,-1,-1,3535,743,19,2,4791,794,8514,666,8460,773,8391,773,-1,-1,-1,1,0,331,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2014,KY,3,10678,1309,41,9,62,15,10781,1333,-1,-1,13904,2303,4701,232,254,13,15,2,31,2,0,0,-1,-1,169,21,0,0,10,0,19084,2573,-1,-1,-1,-1,-1,-1,8389,2224,48,2,14482,3336,10832,1332,10229,1361,10519,1406,-1,-1,-1,0,0,237,18,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2014,LA,3,14456,1104,0,0,8,0,14464,1104,-1,-1,10969,1099,24812,971,72,1,19,4,36,0,42,0,-1,-1,0,0,0,0,5,0,35955,2075,-1,-1,-1,-1,-1,-1,10162,1477,124,2,16039,1927,16950,1171,14588,1098,15593,1171,-1,-1,-1,18,0,143,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2014,ME,1,1850,137,175,37,0,0,2025,174,-1,-1,1775,158,171,5,17,2,54,10,8,1,1,0,-1,-1,13,2,0,0,24,1,2063,179,-1,-1,-1,-1,-1,-1,517,69,0,0,961,79,2172,167,1988,145,2172,167,-1,-1,-1,0,0,0,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2014,MD,3,19702,895,255,21,350,13,20307,929,-1,-1,5419,442,14463,460,0,0,50,4,50,3,0,0,-1,-1,0,0,0,0,118,2,20100,911,-1,-1,-1,-1,-1,-1,5147,432,59,0,8914,600,-8,-8,22394,1071,-8,-8,-1,-1,-1,18,4,600,23,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2014,MA,1,8824,422,6,83,897,215,9727,720,-1,-1,4252,497,2898,95,2580,56,63,2,146,1,0,2,-1,-1,0,0,46,75,0,0,9985,728,-1,-1,-1,-1,-1,-1,1912,356,41,1,2287,445,-8,-8,-8,-8,7437,592,-1,-1,-1,0,0,672,27,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2014,MI,2,41236,2123,-8,-8,-8,-8,41236,2123,-1,-1,17874,1183,22337,888,427,8,358,34,108,5,2,0,-1,-1,0,0,0,0,130,5,41236,2123,-1,-1,-1,-1,-1,-1,6971,731,122,3,13078,1102,42695,2224,41753,2186,-8,-8,-1,-1,-1,89,1,485,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2014,MN,2,8894,659,-8,-8,21,2,8915,661,-1,-1,4478,432,3505,121,745,32,894,135,272,16,0,0,-1,-1,0,0,0,0,7,0,9901,736,-1,-1,-1,-1,-1,-1,4452,643,23,1,6793,849,-8,-8,8804,650,-8,-8,-1,-1,-1,10,0,599,35,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2014,MS,3,7563,849,425,118,0,0,7988,967,-1,-1,5356,743,11889,589,141,8,20,2,36,3,0,0,-1,-1,0,0,0,0,6,0,17448,1345,-1,-1,-1,-1,-1,-1,4479,596,53,8,8493,949,-8,-8,-8,-8,-8,-8,-1,-1,-1,19,0,29,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2014,MO,2,28796,3103,4,0,-8,-8,28800,3103,-1,-1,17174,2445,10992,557,482,58,83,33,45,11,0,0,-1,-1,0,0,0,0,60,2,28836,3106,-1,-1,-1,-1,-1,-1,8149,1931,98,8,15818,2955,-8,-8,28773,2900,-8,-8,-1,-1,-1,11,1,475,35,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2014,MT,4,1481,206,0,0,0,0,1481,206,-1,-1,2543,251,96,10,0,0,664,122,8,5,0,0,-1,-1,0,0,0,0,0,0,3311,388,-1,-1,-1,-1,-1,-1,1539,349,15,0,1940,456,1485,194,-8,-8,-8,-8,-1,-1,-1,1,0,18,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2014,NE,2,4684,421,80,13,23,7,4787,441,-1,-1,2757,287,1363,77,626,39,194,24,35,1,2,0,-1,-1,0,0,17,12,7,0,5001,440,-1,-1,-1,-1,-1,-1,1822,308,13,0,1992,334,-8,-8,3750,344,3000,275,-1,-1,-1,22,0,219,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2014,NV,4,11545,1106,0,0,37,5,11582,1111,-1,-1,4975,664,3367,237,2467,115,209,25,296,42,71,2,-1,-1,67,0,0,0,0,0,11452,1085,-1,-1,-1,-1,-1,-1,3804,684,44,1,5041,797,-8,-8,-8,-8,-8,-8,-1,-1,-1,9,0,0,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2014,NH,1,2494,181,16,1,28,3,2538,185,-1,-1,2227,219,166,5,158,9,8,1,11,0,0,0,-1,-1,0,0,20,6,125,8,2715,248,-1,-1,-1,-1,-1,-1,572,86,5,0,1435,231,-8,-8,2538,185,2085,105,-1,-1,-1,0,0,90,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2014,NJ,1,17853,780,-9,-9,-8,-8,17853,780,-1,-1,4392,409,12588,484,3351,117,5,1,118,8,0,0,-1,-1,0,0,0,0,117,0,20571,1019,-1,-1,-1,-1,-1,-1,6347,480,48,3,9786,661,17806,778,19113,845,22105,1003,-1,-1,-1,7,0,1307,28,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2014,NM,4,3827,2,47,0,0,0,3874,2,-1,-1,1526,181,465,38,3777,382,443,69,10,1,14,0,-1,-1,0,0,0,0,40,2,6275,673,-1,-1,-1,-1,-1,-1,2119,381,23,1,3016,499,6104,736,6962,746,6962,746,-1,-1,-1,0,0,136,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2014,NY,1,49809,2300,101,18,117,17,50027,2335,-1,-1,11616,1012,24761,885,12311,364,364,27,226,17,0,0,-1,-1,0,0,575,12,339,9,50192,2326,-1,-1,-1,-1,-1,-1,12038,1016,114,7,21739,1495,48940,2540,49328,2540,48538,2422,-1,-1,-1,94,3,4022,120,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2014,NC,3,33337,2444,1130,197,215,25,34682,2666,-1,-1,12324,1668,19166,815,1880,51,831,92,117,5,15,2,-1,-1,0,0,0,0,122,8,34455,2641,-1,-1,-1,-1,-1,-1,12127,1544,83,4,13832,1432,-8,-8,40861,2954,35001,2502,-1,-1,-1,82,3,1342,28,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2014,ND,2,1254,0,71,0,-8,-8,1325,0,-1,-1,1029,120,114,5,82,6,278,70,5,1,0,0,-1,-1,6,2,0,0,0,0,1514,204,-1,-1,-1,-1,-1,-1,778,175,0,0,884,183,1353,126,1353,126,1353,126,-1,-1,-1,0,0,15,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2014,OH,2,42059,4092,-9,-9,0,0,42059,4092,-1,-1,23767,3114,21963,1029,1260,40,66,8,58,10,0,0,-1,-1,0,0,0,0,197,7,47311,4208,-1,-1,-1,-1,-1,-1,15527,2774,95,13,19431,2968,31642,3344,-8,-8,-8,-8,-1,-1,-1,23,1,480,15,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2014,OK,3,16356,2405,317,48,-8,-8,16673,2453,-1,-1,13315,1769,6970,471,1839,121,2542,478,76,5,16,2,-1,-1,0,0,41,5,0,0,24799,2851,-1,-1,-1,-1,-1,-1,5956,987,108,2,7314,1341,14532,1997,16241,2397,14532,1997,-1,-1,-1,7,0,0,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2014,OR,4,13231,1251,10,0,0,0,13241,1251,-1,-1,10086,1064,1328,94,1853,60,346,41,184,16,0,0,-1,-1,0,0,0,0,2,1,13799,1276,-1,-1,-1,-1,-1,-1,3190,511,29,2,4768,668,-8,-8,-8,-8,13744,1253,-1,-1,-1,0,0,0,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2014,PA,1,45793,2428,4,3,237,73,46034,2504,-1,-1,18616,1757,23782,786,5217,184,39,8,125,11,0,0,-1,-1,0,0,0,0,157,12,47936,2758,-1,-1,-1,-1,-1,-1,9320,932,141,4,19037,1757,45188,2757,45188,2757,45188,2757,-1,-1,-1,29,0,1025,26,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2014,RI,1,1969,51,473,36,562,42,3004,129,-1,-1,1373,110,952,20,744,19,23,2,35,4,0,0,-1,-1,0,0,26,2,2,1,3155,158,-1,-1,-1,-1,-1,-1,665,34,3,2,836,63,3676,313,3501,273,3660,313,-1,-1,-1,2,0,64,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2014,SC,3,19099,1274,483,82,10,0,19592,1356,-1,-1,6436,825,12979,508,422,16,31,7,21,0,0,0,-1,-1,0,0,143,13,0,0,20032,1369,-1,-1,-1,-1,-1,-1,4521,528,61,5,6298,609,-8,-8,21551,1718,-8,-8,-1,-1,-1,23,1,465,19,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2014,SD,2,3135,343,2,1,15,1,3152,345,-1,-1,1949,223,216,8,128,10,897,165,9,3,0,0,-1,-1,0,0,0,0,0,0,3199,409,-1,-1,-1,-1,-1,-1,877,196,6,1,2031,398,-8,-8,3173,449,-8,-8,-1,-1,-1,0,0,77,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2014,TN,3,14204,1462,-8,-8,29,4,14233,1466,-1,-1,13424,1961,12095,605,546,31,31,7,59,5,0,0,-1,-1,0,0,0,0,5,0,26160,2609,-1,-1,-1,-1,-1,-1,7415,1496,77,5,13108,2661,20692,1571,19986,1540,-8,-8,-1,-1,-1,13,0,263,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2014,TX,3,123970,10262,4230,1417,0,0,128200,11679,-1,-1,46429,6850,52937,4029,51577,3375,91,26,440,33,0,0,-1,-1,0,0,243,13,0,0,151717,14326,-1,-1,-1,-1,-1,-1,42459,7366,407,13,68264,9013,147982,11601,142187,11144,147982,11601,-1,-1,-1,66,3,8423,259,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2014,UT,4,4754,550,3,0,0,0,4757,550,-1,-1,4176,501,424,19,1208,81,303,38,73,7,124,14,-1,-1,0,0,0,0,56,2,6364,662,-1,-1,-1,-1,-1,-1,1328,268,24,0,2464,515,-8,-8,6516,675,6726,705,-1,-1,-1,1,0,200,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2014,VT,1,975,105,88,22,329,29,1392,156,-1,-1,1546,148,196,3,6,0,12,2,11,0,0,0,-1,-1,0,0,0,0,52,3,1823,156,-1,-1,-1,-1,-1,-1,528,73,6,0,1513,272,1503,178,1503,178,1144,178,-1,-1,-1,0,0,17,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2014,VA,3,26060,2420,-8,-8,-8,-8,26060,2420,-1,-1,12845,1862,20652,1113,805,22,21,2,111,12,0,0,-1,-1,0,0,0,0,95,4,34529,3015,-1,-1,-1,-1,-1,-1,10451,1699,84,4,10650,1465,-8,-8,27974,2540,22079,2140,-1,-1,-1,9,0,582,19,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2014,WA,4,15819,1294,53,14,0,0,15872,1308,-1,-1,10103,963,3080,155,2093,171,662,98,582,54,0,0,-1,-1,0,0,37,12,109,1,16666,1454,-1,-1,-1,-1,-1,-1,6757,885,44,2,18622,2309,-8,-8,15605,1139,-8,-8,-1,-1,-1,1,0,760,15,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2014,WV,3,5283,582,0,0,0,2,5283,584,-1,-1,5174,799,771,31,43,0,11,1,2,0,3,0,-1,-1,61,0,0,0,0,0,6065,831,-1,-1,-1,-1,-1,-1,1576,309,24,0,2858,631,4056,591,5318,605,4506,591,-1,-1,-1,0,0,22,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2014,WI,2,20050,1302,513,33,633,41,21196,1376,-1,-1,9540,917,8817,324,2005,44,625,79,220,14,0,0,-1,-1,0,0,0,0,12,0,21219,1378,-1,-1,-1,-1,-1,-1,3607,522,44,1,5097,345,-8,-8,21638,1280,16157,1024,-1,-1,-1,17,1,490,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2014,WY,4,1861,253,0,0,0,0,1861,253,-1,-1,1609,231,115,5,262,17,106,23,7,1,4,0,-1,-1,0,0,3,0,0,0,2106,277,-1,-1,-1,-1,-1,-1,650,102,12,0,765,109,2006,282,2006,282,2111,296,-1,-1,-1,1,0,52,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2014,ST,7,1069268,80141,14739,3436,11381,1489,1095388,85066,-1,-1,491612,59243,525633,25293,196117,10086,16535,2537,6735,588,2750,318,-1,-1,699,99,9070,509,2217,114,1251368,98787,-1,-1,-1,-1,-1,-1,350882,51966,3084,147,519741,67507,579332,46091,1000400,75975,634753,48241,-1,-1,-1,1005,30,42898,1407,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2014,US,5,1213967,91177,17502,3969,21354,2029,1252823,97175,-1,-1,542395,64883,600209,28587,261405,14457,19830,2930,9360,889,2750,318,-1,-1,699,99,9070,509,2217,114,1447936,112786,-1,-1,-1,-1,-1,-1,392384,56609,3523,170,569394,72567,701489,56665,1000400,75975,634753,48241,-1,-1,-1,1005,30,64565,3272,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2014,FE,6,144699,11036,2763,533,9973,540,157435,12109,-1,-1,50783,5640,74576,3294,65288,4371,3295,393,2625,301,0,0,-1,-1,0,0,0,0,0,0,196568,13999,-1,-1,-1,-1,-1,-1,41502,4643,439,23,49653,5060,122157,10574,-8,-8,-8,-8,-1,-1,-1,0,0,21667,1865,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2015,AL,3,22859,1525,209,34,182,5,23250,1564,-1,-1,11564,1829,16530,754,0,0,1,0,2,0,0,0,-1,-1,0,0,0,0,123,7,28220,2590,-1,-1,-1,-1,-1,-1,7145,1362,149,7,10665,1702,-8,-8,-8,-8,12576,742,-1,-1,-1,14,0,165,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2015,AK,4,2076,173,1005,139,1598,256,4679,568,-1,-1,2160,310,502,29,133,16,1716,203,153,12,57,2,-1,-1,0,0,0,0,40,5,4761,577,-1,-1,-1,-1,-1,-1,-9,-9,2,1,2966,1119,-8,-8,-8,-8,-8,-8,-1,-1,-1,0,0,0,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2015,AZ,4,30698,3638,1056,341,0,0,31754,3979,-1,-1,14659,2074,5495,368,15905,1108,1882,341,148,22,0,0,-1,-1,0,0,562,66,13,0,38664,3979,-1,-1,-1,-1,-1,-1,10476,1444,95,9,12505,1595,33016,4222,39429,4318,33016,4222,-1,-1,-1,79,2,4446,124,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2015,AR,3,14417,1339,15,13,0,0,14432,1352,-1,-1,8508,1030,7186,330,504,28,39,10,51,4,3,0,-1,-1,0,0,12,0,2,0,16305,1402,-1,-1,-1,-1,-1,-1,4634,846,50,3,8427,1275,14910,1284,14949,1284,14154,1228,-1,-1,-1,15,0,279,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2015,CA,4,122056,5388,-9,-9,318,53,122374,5441,-1,-1,26267,1852,35583,1515,53164,1963,1282,116,1175,80,289,18,-1,-1,0,0,6048,241,0,0,123808,5785,-1,-1,-1,-1,-1,-1,28570,2174,-9,-9,38322,2935,-8,-8,121444,6038,83482,3805,-1,-1,-1,0,0,0,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2015,CO,4,14141,1831,-8,-8,-8,-8,14141,1831,-1,-1,8265,988,3380,263,5838,510,523,69,193,12,0,0,-1,-1,0,0,0,0,0,0,18199,1842,-1,-1,-1,-1,-1,-1,4456,697,56,2,8681,1277,-8,-8,13028,1556,13028,1556,-1,-1,-1,2,0,1403,55,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2015,CT,1,10463,539,1030,166,2938,364,14431,1069,-1,-1,4600,614,6163,299,3822,189,36,7,74,10,0,0,-1,-1,0,0,0,0,0,2,14695,1121,-1,-1,-1,-1,-1,-1,4225,257,9,0,5681,410,-8,-8,-8,-8,-8,-8,-1,-1,-1,84,0,472,13,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2015,DE,3,3915,220,941,163,1061,137,5917,520,-1,-1,2305,365,3534,160,270,11,0,0,0,0,6,1,-1,-1,0,0,0,0,2,0,6117,537,-1,-1,-1,-1,-1,-1,2056,379,10,0,3520,752,5151,349,4890,320,3961,200,-1,-1,-1,8,0,311,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2015,DC,3,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8\n2015,FL,3,82018,4980,0,0,0,0,82018,4980,-1,-1,43538,4615,46575,2109,3947,195,83,10,16,2,0,0,-1,-1,0,0,309,11,13,1,94481,6943,-1,-1,-1,-1,-1,-1,26137,3530,337,20,28734,3956,-8,-8,97629,7722,-8,-8,-1,-1,-1,128,3,6961,232,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2015,GA,3,40028,3573,408,40,0,0,40436,3613,-1,-1,16013,2043,30379,1505,1944,50,22,1,161,11,1,0,-1,-1,50,4,0,0,8,1,48578,3615,-1,-1,-1,-1,-1,-1,13094,1825,124,4,16122,1890,54662,4670,49440,4521,-8,-8,-1,-1,-1,75,5,2291,104,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2015,HI,4,1993,305,567,155,911,142,3471,602,-1,-1,1194,204,234,26,146,8,24,2,918,106,2328,331,-1,-1,0,0,0,0,333,25,5177,702,-1,-1,-1,-1,-1,-1,716,128,7,0,1082,211,-8,-8,-8,-8,-8,-8,-1,-1,-1,0,0,79,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2015,ID,4,5311,721,70,12,551,28,5932,761,-1,-1,5288,778,205,14,1153,105,251,47,30,1,0,0,-1,-1,0,0,0,0,141,39,7068,984,-1,-1,-1,-1,-1,-1,1315,284,19,2,4252,1068,6106,797,-8,-8,-8,-8,-1,-1,-1,1,0,223,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2015,IL,2,43565,2675,-9,-9,0,0,43565,2675,-1,-1,12265,1303,25466,1110,5605,228,51,16,154,14,0,0,-1,-1,0,0,0,0,24,4,43565,2675,-1,-1,-1,-1,-1,-1,16320,1755,117,2,27300,2432,30082,1782,30082,1782,26223,1758,-1,-1,-1,20,0,1638,43,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2015,IN,2,24201,2364,0,0,21,0,24222,2364,-1,-1,14680,2061,8793,387,1129,52,46,9,59,6,9,0,-1,-1,69,22,0,0,30,3,24815,2540,-1,-1,-1,-1,-1,-1,9934,2099,77,7,13677,2548,-8,-8,27157,2863,-8,-8,-1,-1,-1,33,1,576,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2015,IA,2,8028,803,0,0,25,8,8053,811,-1,-1,5194,610,2099,133,547,30,134,29,67,6,0,0,-1,-1,0,0,0,0,0,0,8041,808,-1,-1,-1,-1,-1,-1,3014,538,18,1,4736,786,6544,778,6544,778,6544,778,-1,-1,-1,5,0,183,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2015,KS,2,8461,759,248,65,0,0,8709,824,-1,-1,4995,583,2722,152,1036,73,165,20,84,10,0,0,-1,-1,0,0,1,0,15,1,9018,839,-1,-1,-1,-1,-1,-1,3049,542,23,4,5129,821,8514,666,8699,815,8391,773,-1,-1,-1,0,0,323,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2015,KY,3,11061,898,0,0,0,0,11061,898,-1,-1,14018,2332,4599,208,266,12,15,2,27,4,0,0,-1,-1,171,27,0,0,14,2,19110,2587,-1,-1,-1,-1,-1,-1,8411,2298,63,3,14936,3624,13333,1016,13333,1016,13333,1016,-1,-1,-1,0,0,141,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2015,LA,3,14324,941,0,0,30,0,14354,941,-1,-1,10415,1181,23768,861,47,0,19,1,38,2,43,0,-1,-1,0,0,1,1,0,0,34331,2046,-1,-1,-1,-1,-1,-1,9366,1435,132,2,16144,1913,16950,1171,14588,936,15593,1171,-1,-1,-1,11,0,126,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2015,ME,1,1584,123,445,74,0,0,2033,157,-1,-1,1709,182,169,6,97,4,51,11,11,1,1,0,-1,-1,12,2,0,0,22,1,2072,207,-1,-1,-1,-1,-1,-1,361,47,5,0,643,51,2056,200,2279,199,2279,199,-1,-1,-1,0,0,42,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2015,MD,3,19437,878,150,35,403,18,19990,931,-1,-1,4907,468,13757,399,624,13,82,6,47,0,13,1,-1,-1,0,0,232,16,34,2,19696,905,-1,-1,-1,-1,-1,-1,6025,686,59,1,9426,851,-8,-8,22022,1003,-8,-8,-1,-1,-1,4,0,603,17,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2015,MA,1,8188,389,4,49,670,193,8862,631,-1,-1,3933,441,2635,94,2471,47,61,1,130,1,0,2,-1,-1,0,0,38,68,0,0,9268,654,-1,-1,-1,-1,-1,-1,1685,310,31,0,2396,375,-8,-8,-8,-8,7151,577,-1,-1,-1,0,0,600,19,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2015,MI,2,40355,2273,-8,-8,-8,-8,40355,2273,-1,-1,17491,1268,21860,951,418,8,350,36,106,5,2,0,-1,-1,0,0,0,0,128,5,40355,2273,-1,-1,-1,-1,-1,-1,6695,717,32,1,12671,1057,42302,2432,41589,2407,-8,-8,-1,-1,-1,87,1,540,15,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2015,MN,2,8874,680,-8,-8,23,1,8897,681,-1,-1,4494,462,3647,121,729,30,885,143,261,15,0,0,-1,-1,0,0,0,0,11,0,10027,771,-1,-1,-1,-1,-1,-1,4448,669,16,0,6798,871,-8,-8,8804,650,-8,-8,-1,-1,-1,10,0,458,14,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2015,MS,3,8693,904,344,80,0,0,9037,984,-1,-1,5641,763,11757,537,132,10,25,4,36,1,0,0,-1,-1,0,0,0,0,4,1,17595,1316,-1,-1,-1,-1,-1,-1,4173,529,48,0,5431,674,-8,-8,-8,-8,-8,-8,-1,-1,-1,27,0,23,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2015,MO,2,29028,3265,2,0,-8,-8,29030,3265,-1,-1,17617,2606,10777,552,463,67,92,28,54,11,0,0,-1,-1,0,0,0,0,60,3,29063,3267,-1,-1,-1,-1,-1,-1,7717,1892,108,3,14833,3103,-8,-8,29141,3100,-8,-8,-1,-1,-1,10,0,448,26,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2015,MT,4,1479,207,0,0,0,0,1479,207,-1,-1,2490,246,89,4,0,0,709,135,7,5,0,0,-1,-1,0,0,0,0,0,0,3295,390,-1,-1,-1,-1,-1,-1,1501,315,16,1,2002,414,1480,212,-8,-8,-8,-8,-1,-1,-1,0,0,17,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2015,NE,2,4632,415,45,11,23,7,4700,433,-1,-1,2687,282,1339,75,651,36,193,26,41,1,5,0,-1,-1,0,0,17,9,10,0,4943,429,-1,-1,-1,-1,-1,-1,1626,249,17,0,2029,329,-8,-8,3750,344,3000,275,-1,-1,-1,10,0,234,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2015,NV,4,12003,1189,0,0,38,5,12041,1194,-1,-1,5324,522,3423,335,2553,250,238,23,310,30,0,0,-1,-1,0,0,0,0,57,6,11905,1166,-1,-1,-1,-1,-1,-1,4144,718,44,1,5041,797,-8,-8,-8,-8,-8,-8,-1,-1,-1,9,0,0,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2015,NH,1,2471,190,0,0,0,0,2471,190,-1,-1,2399,183,106,17,77,14,4,1,18,1,0,0,-1,-1,0,0,13,8,44,12,2661,236,-1,-1,-1,-1,-1,-1,672,124,10,0,1423,248,2401,182,2500,200,1819,147,-1,-1,-1,0,0,125,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2015,NJ,1,16715,716,-9,-9,-8,-8,16715,716,-1,-1,4244,377,11887,416,3170,100,9,2,112,8,0,0,-1,-1,0,0,0,0,159,5,19581,908,-1,-1,-1,-1,-1,-1,5999,457,49,2,9711,725,16714,713,17804,801,22140,1012,-1,-1,-1,5,0,1246,24,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2015,NM,4,4006,1,71,0,0,0,4077,1,-1,-1,1545,207,468,40,3871,404,442,51,11,3,16,0,-1,-1,0,0,0,0,45,1,6398,706,-1,-1,-1,-1,-1,-1,2268,385,21,0,3214,523,6309,784,7088,794,7088,794,-1,-1,-1,0,0,151,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2015,NY,1,48893,2326,102,19,111,34,49106,2379,-1,-1,11508,1094,24300,845,12049,344,390,25,238,12,0,0,-1,-1,0,0,601,17,287,17,49373,2354,-1,-1,-1,-1,-1,-1,11412,978,115,1,20662,1383,48935,2545,49131,2545,48530,2427,-1,-1,-1,87,2,4026,106,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2015,NC,3,33037,2498,902,192,225,34,34164,2724,-1,-1,12373,1707,18671,791,1800,60,836,110,111,5,12,3,-1,-1,0,0,0,0,125,13,33928,2689,-1,-1,-1,-1,-1,-1,11430,1591,80,4,14638,1715,-8,-8,40861,2954,35001,2502,-1,-1,-1,67,5,1323,28,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2015,ND,2,1336,0,9,0,-8,-8,1345,0,-1,-1,1053,128,136,5,92,10,294,63,7,1,0,0,-1,-1,5,1,0,0,0,0,1587,208,-1,-1,-1,-1,-1,-1,750,153,0,0,1243,282,-8,-8,1353,-8,1353,-8,-1,-1,-1,0,0,22,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2015,OH,2,41972,4218,-9,-9,0,0,41972,4218,-1,-1,24204,3279,22049,1092,1243,36,60,5,65,12,0,0,-1,-1,0,0,0,0,182,6,47803,4430,-1,-1,-1,-1,-1,-1,15271,2936,129,6,18767,2992,-8,-8,-8,-8,-8,-8,-1,-1,-1,28,1,461,16,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2015,OK,3,16907,2572,336,60,-8,-8,17243,2632,-1,-1,13543,1908,6999,465,1925,145,2600,481,74,7,19,5,-1,-1,0,0,44,8,0,0,25204,3019,-1,-1,-1,-1,-1,-1,6047,1049,98,10,7559,1352,14532,1997,16890,2607,14532,1997,-1,-1,-1,8,1,0,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2015,OR,4,13364,1281,10,0,0,0,13374,1281,-1,-1,10381,974,1290,121,1719,161,355,33,193,18,0,0,-1,-1,0,0,0,0,0,0,13938,1307,-1,-1,-1,-1,-1,-1,3257,345,28,1,4652,436,-8,-8,-8,-8,13744,1253,-1,-1,-1,0,0,0,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2015,PA,1,45317,2607,25,0,280,12,45622,2619,-1,-1,18756,1845,23009,755,4954,193,41,11,131,7,0,0,-1,-1,0,0,0,0,148,8,47039,2819,-1,-1,-1,-1,-1,-1,8775,922,157,9,19371,1769,45291,2734,45291,2734,45291,2734,-1,-1,-1,16,1,1036,53,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2015,RI,1,2014,46,368,29,482,43,2864,118,-1,-1,1293,86,943,25,772,28,24,2,43,4,0,0,-1,-1,0,0,25,1,2,0,3102,146,-1,-1,-1,-1,-1,-1,499,25,2,0,772,41,3676,313,3501,273,3660,313,-1,-1,-1,0,0,51,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2015,SC,3,18666,1245,442,91,13,0,19121,1336,-1,-1,6439,845,12536,472,418,20,31,5,20,0,0,0,-1,-1,0,0,128,13,2,0,19574,1355,-1,-1,-1,-1,-1,-1,4373,504,73,3,6002,603,-8,-8,21436,1720,-8,-8,-1,-1,-1,28,1,443,18,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2015,SD,2,3087,388,4,2,27,6,3118,396,-1,-1,1897,232,232,8,132,9,871,167,12,0,2,0,-1,-1,0,0,2,0,0,0,3148,416,-1,-1,-1,-1,-1,-1,957,263,7,0,2291,473,-8,-8,3155,439,-8,-8,-1,-1,-1,0,0,82,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2015,TN,3,13076,1503,-8,-8,44,5,13120,1508,-1,-1,13110,2002,11770,596,561,27,28,8,57,7,0,0,-1,-1,0,0,0,0,6,0,25532,2640,-1,-1,-1,-1,-1,-1,6660,1294,92,2,12281,2419,19684,1571,18999,1540,-8,-8,-1,-1,-1,7,0,253,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2015,TX,3,123341,10041,3398,1419,0,0,126739,11460,-1,-1,46379,7011,51076,3865,51234,3462,98,20,479,36,0,0,-1,-1,0,0,235,14,0,0,149501,14408,-1,-1,-1,-1,-1,-1,41838,7794,395,16,66358,9831,146365,13652,140663,13126,146365,13652,-1,-1,-1,41,7,8240,208,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2015,UT,4,4387,442,2,0,0,0,4389,442,-1,-1,3857,386,409,13,1146,67,271,26,66,6,125,13,-1,-1,0,0,0,0,103,4,5977,515,-1,-1,-1,-1,-1,-1,1220,199,16,1,2790,556,-8,-8,6516,675,6726,705,-1,-1,-1,1,0,342,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2015,VT,1,966,83,78,17,315,50,1359,150,-1,-1,1356,142,172,3,5,0,11,2,10,0,0,0,-1,-1,0,0,0,0,46,3,1600,150,-1,-1,-1,-1,-1,-1,528,73,6,0,1633,302,1503,178,1503,178,1144,178,-1,-1,-1,0,0,17,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2015,VA,3,28105,2325,-8,-8,-8,-8,28105,2325,-1,-1,13219,2057,20842,1139,936,25,23,2,130,13,0,0,-1,-1,0,0,0,0,17,0,35167,3236,-1,-1,-1,-1,-1,-1,10006,1664,103,2,10871,1619,-8,-8,27286,2347,-8,-8,-1,-1,-1,6,0,680,16,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2015,WA,4,15848,1297,72,5,0,0,15920,1302,-1,-1,10154,957,3089,148,2159,178,701,104,583,55,0,0,-1,-1,0,0,38,10,105,3,16829,1455,-1,-1,-1,-1,-1,-1,6563,926,41,2,19405,2588,-8,-8,15630,1198,-8,-8,-1,-1,-1,0,0,753,16,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2015,WV,3,5319,606,0,0,0,0,5319,606,-1,-1,5416,810,764,51,7,1,14,1,4,1,2,0,-1,-1,46,1,0,0,0,0,6253,865,-1,-1,-1,-1,-1,-1,1890,398,29,1,2986,666,4536,623,5352,635,4536,623,-1,-1,-1,0,0,17,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2015,WI,2,20346,1329,520,34,643,42,21509,1405,-1,-1,9663,941,8998,332,1989,45,680,82,225,7,0,0,-1,-1,0,0,0,0,12,1,21567,1408,-1,-1,-1,-1,-1,-1,3676,557,37,0,5108,445,-8,-8,21618,1278,16157,1024,-1,-1,-1,34,3,459,13,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2015,WY,4,1888,245,0,0,0,0,1888,245,-1,-1,1641,219,119,8,274,21,111,18,7,1,3,0,-1,-1,0,0,2,0,0,0,2157,267,-1,-1,-1,-1,-1,-1,637,118,7,0,769,148,2006,282,2006,282,2111,296,-1,-1,-1,0,0,54,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2015,ST,7,1054949,78954,12878,3245,10932,1443,1078763,83602,-1,-1,486651,59402,512531,24504,194127,10393,16869,2515,6949,576,2936,376,-1,-1,353,57,8308,483,2367,181,1231091,98487,-1,-1,-1,-1,-1,-1,336021,50480,3159,134,516655,69952,547058,45153,997380,77978,612928,47957,-1,-1,-1,960,33,42363,1265,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2015,US,5,1192289,89180,15620,3755,20258,1987,1228171,94882,-1,-1,534559,64685,582338,27554,254342,14397,19994,2848,9396,858,2936,376,-1,-1,353,57,8308,483,2367,181,1414593,111440,-1,-1,-1,-1,-1,-1,374176,54898,3577,147,571272,75609,670796,55876,997380,77978,612928,47957,-1,-1,-1,960,33,62162,2945,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n2015,FE,6,137340,10226,2742,510,9326,544,149408,11280,-1,-1,47908,5283,69807,3050,60215,4004,3125,333,2447,282,0,0,-1,-1,0,0,0,0,0,0,183502,12953,-1,-1,-1,-1,-1,-1,38155,4418,418,13,54617,5657,123738,10723,-8,-8,-8,-8,-1,-1,-1,0,0,19799,1680,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1';
var _user$project$Data$Custody = function (a) {
	return function (b) {
		return function (c) {
			return function (d) {
				return function (e) {
					return function (f) {
						return function (g) {
							return function (h) {
								return function (i) {
									return function (j) {
										return function (k) {
											return function (l) {
												return function (m) {
													return function (n) {
														return function (o) {
															return function (p) {
																return function (q) {
																	return {year: a, state: b, region: c, greaterThan1YearM: d, greaterThan1YearF: e, lessThan1YearM: f, lessThan1YearF: g, unsentencedM: h, unsentencedF: i, totalM: j, totalF: k, blackF: l, hispF: m, asianF: n, nativeHawaiianF: o, asianPacificF: p, twoRaceF: q};
																};
															};
														};
													};
												};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var _user$project$Data$StateTotal = {ctor: 'StateTotal'};
var _user$project$Data$Fed = {ctor: 'Fed'};
var _user$project$Data$USTotal = {ctor: 'USTotal'};
var _user$project$Data$West = {ctor: 'West'};
var _user$project$Data$South = {ctor: 'South'};
var _user$project$Data$Midwest = {ctor: 'Midwest'};
var _user$project$Data$Northeast = {ctor: 'Northeast'};
var _user$project$Data$mapRegion = function (s) {
	var _p0 = s;
	switch (_p0) {
		case '1':
			return _elm_lang$core$Result$Ok(_user$project$Data$Northeast);
		case '2':
			return _elm_lang$core$Result$Ok(_user$project$Data$Midwest);
		case '3':
			return _elm_lang$core$Result$Ok(_user$project$Data$South);
		case '4':
			return _elm_lang$core$Result$Ok(_user$project$Data$West);
		case '5':
			return _elm_lang$core$Result$Ok(_user$project$Data$USTotal);
		case '6':
			return _elm_lang$core$Result$Ok(_user$project$Data$Fed);
		case '7':
			return _elm_lang$core$Result$Ok(_user$project$Data$StateTotal);
		default:
			return _elm_lang$core$Result$Err(
				A2(_elm_lang$core$Basics_ops['++'], 'Unknown region code: ', s));
	}
};
var _user$project$Data$custody = A2(
	_ericgj$elm_csv_decode$Csv_Decode$map,
	_user$project$Data$Custody,
	A2(
		_ericgj$elm_csv_decode$Csv_Decode$andMap,
		A2(_ericgj$elm_csv_decode$Csv_Decode$field, 'TWORACEF', _elm_lang$core$String$toInt),
		A2(
			_ericgj$elm_csv_decode$Csv_Decode$andMap,
			A2(_ericgj$elm_csv_decode$Csv_Decode$field, 'APIF', _elm_lang$core$String$toInt),
			A2(
				_ericgj$elm_csv_decode$Csv_Decode$andMap,
				A2(_ericgj$elm_csv_decode$Csv_Decode$field, 'NHPIF', _elm_lang$core$String$toInt),
				A2(
					_ericgj$elm_csv_decode$Csv_Decode$andMap,
					A2(_ericgj$elm_csv_decode$Csv_Decode$field, 'ASIANF', _elm_lang$core$String$toInt),
					A2(
						_ericgj$elm_csv_decode$Csv_Decode$andMap,
						A2(_ericgj$elm_csv_decode$Csv_Decode$field, 'HISPF', _elm_lang$core$String$toInt),
						A2(
							_ericgj$elm_csv_decode$Csv_Decode$andMap,
							A2(_ericgj$elm_csv_decode$Csv_Decode$field, 'BLACKF', _elm_lang$core$String$toInt),
							A2(
								_ericgj$elm_csv_decode$Csv_Decode$andMap,
								A2(_ericgj$elm_csv_decode$Csv_Decode$field, 'CUSTOTF', _elm_lang$core$String$toInt),
								A2(
									_ericgj$elm_csv_decode$Csv_Decode$andMap,
									A2(_ericgj$elm_csv_decode$Csv_Decode$field, 'CUSTOTM', _elm_lang$core$String$toInt),
									A2(
										_ericgj$elm_csv_decode$Csv_Decode$andMap,
										A2(_ericgj$elm_csv_decode$Csv_Decode$field, 'CUSUNSF', _elm_lang$core$String$toInt),
										A2(
											_ericgj$elm_csv_decode$Csv_Decode$andMap,
											A2(_ericgj$elm_csv_decode$Csv_Decode$field, 'CUSUNSM', _elm_lang$core$String$toInt),
											A2(
												_ericgj$elm_csv_decode$Csv_Decode$andMap,
												A2(_ericgj$elm_csv_decode$Csv_Decode$field, 'CUSLT1F', _elm_lang$core$String$toInt),
												A2(
													_ericgj$elm_csv_decode$Csv_Decode$andMap,
													A2(_ericgj$elm_csv_decode$Csv_Decode$field, 'CUSLT1M', _elm_lang$core$String$toInt),
													A2(
														_ericgj$elm_csv_decode$Csv_Decode$andMap,
														A2(_ericgj$elm_csv_decode$Csv_Decode$field, 'CUSGT1F', _elm_lang$core$String$toInt),
														A2(
															_ericgj$elm_csv_decode$Csv_Decode$andMap,
															A2(_ericgj$elm_csv_decode$Csv_Decode$field, 'CUSGT1M', _elm_lang$core$String$toInt),
															A2(
																_ericgj$elm_csv_decode$Csv_Decode$andMap,
																A2(_ericgj$elm_csv_decode$Csv_Decode$field, 'REGION', _user$project$Data$mapRegion),
																A2(
																	_ericgj$elm_csv_decode$Csv_Decode$andMap,
																	A2(_ericgj$elm_csv_decode$Csv_Decode$field, 'STATE', _elm_lang$core$Result$Ok),
																	A2(_ericgj$elm_csv_decode$Csv_Decode$field, 'YEAR', _elm_lang$core$String$toInt))))))))))))))))));
var _user$project$Data$parsed = A2(
	_ericgj$elm_csv_decode$Csv_Decode$decode,
	_user$project$Data$custody,
	_periodic$elm_csv$Csv$parse(_user$project$Data$data));

var _user$project$Static$displayTable = F2(
	function (_p0, crosstab) {
		var _p1 = _p0;
		var _p2 = _p1.summary;
		var vertAlign = {ctor: '_Tuple2', _0: 'vertical-align', _1: 'bottom'};
		var widthCols = {ctor: '_Tuple2', _0: 'min-width', _1: '100px'};
		var styleRowHeads = _elm_lang$html$Html_Attributes$style(
			{
				ctor: '::',
				_0: widthCols,
				_1: {
					ctor: '::',
					_0: vertAlign,
					_1: {ctor: '[]'}
				}
			});
		var alignCols = {ctor: '_Tuple2', _0: 'text-align', _1: 'right'};
		var styleCols = _elm_lang$html$Html_Attributes$style(
			{
				ctor: '::',
				_0: widthCols,
				_1: {
					ctor: '::',
					_0: vertAlign,
					_1: {
						ctor: '::',
						_0: alignCols,
						_1: {ctor: '[]'}
					}
				}
			});
		var styleRowSums = _elm_lang$html$Html_Attributes$style(
			{
				ctor: '::',
				_0: widthCols,
				_1: {
					ctor: '::',
					_0: vertAlign,
					_1: {
						ctor: '::',
						_0: alignCols,
						_1: {ctor: '[]'}
					}
				}
			});
		var bodyRow = F3(
			function (r, cvalues, csum) {
				return A2(
					_elm_lang$html$Html$tr,
					{ctor: '[]'},
					A2(
						_elm_lang$core$Basics_ops['++'],
						{
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$td,
								{
									ctor: '::',
									_0: styleRowHeads,
									_1: {ctor: '[]'}
								},
								{
									ctor: '::',
									_0: _p1.rowLabel(r),
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						},
						A2(
							_elm_lang$core$Basics_ops['++'],
							A2(
								_elm_lang$core$List$map,
								function (v) {
									return A2(
										_elm_lang$html$Html$td,
										{
											ctor: '::',
											_0: styleCols,
											_1: {ctor: '[]'}
										},
										{
											ctor: '::',
											_0: _p1.cell(v),
											_1: {ctor: '[]'}
										});
								},
								cvalues),
							{
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$td,
									{
										ctor: '::',
										_0: styleRowSums,
										_1: {ctor: '[]'}
									},
									{
										ctor: '::',
										_0: _p2(csum),
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							})));
			});
		var tableSummary = _user$project$Crosstab_Table$tableSummary(crosstab);
		var colSummary = _user$project$Crosstab_Table$colSummaryList(crosstab);
		var foot = {
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$tr,
				{ctor: '[]'},
				A2(
					_elm_lang$core$Basics_ops['++'],
					{
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$td,
							{
								ctor: '::',
								_0: styleRowHeads,
								_1: {ctor: '[]'}
							},
							{
								ctor: '::',
								_0: _p1.colTotalLabel,
								_1: {ctor: '[]'}
							}),
						_1: {ctor: '[]'}
					},
					A2(
						_elm_lang$core$Basics_ops['++'],
						A2(
							_elm_lang$core$List$map,
							function (c) {
								return A2(
									_elm_lang$html$Html$td,
									{
										ctor: '::',
										_0: styleCols,
										_1: {ctor: '[]'}
									},
									{
										ctor: '::',
										_0: _p2(c),
										_1: {ctor: '[]'}
									});
							},
							colSummary),
						{
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$td,
								{
									ctor: '::',
									_0: styleRowSums,
									_1: {ctor: '[]'}
								},
								{
									ctor: '::',
									_0: _p2(tableSummary),
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						}))),
			_1: {ctor: '[]'}
		};
		var rowSummary = _user$project$Crosstab_Table$rowSummaryList(crosstab);
		var values = _user$project$Crosstab_Table$rowList(crosstab);
		var colLevels = _user$project$Crosstab_Table$colLevelList(crosstab);
		var head = {
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$tr,
				{ctor: '[]'},
				A2(
					_elm_lang$core$Basics_ops['++'],
					{
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$th,
							{
								ctor: '::',
								_0: styleRowHeads,
								_1: {ctor: '[]'}
							},
							{ctor: '[]'}),
						_1: {ctor: '[]'}
					},
					A2(
						_elm_lang$core$Basics_ops['++'],
						A2(
							_elm_lang$core$List$map,
							function (col) {
								return A2(
									_elm_lang$html$Html$th,
									{
										ctor: '::',
										_0: styleCols,
										_1: {ctor: '[]'}
									},
									{
										ctor: '::',
										_0: _p1.colLabel(col),
										_1: {ctor: '[]'}
									});
							},
							colLevels),
						{
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$th,
								{
									ctor: '::',
									_0: styleRowSums,
									_1: {ctor: '[]'}
								},
								{
									ctor: '::',
									_0: _p1.rowTotalLabel,
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						}))),
			_1: {ctor: '[]'}
		};
		var rowLevels = _user$project$Crosstab_Table$rowLevelList(crosstab);
		var body = A4(_elm_lang$core$List$map3, bodyRow, rowLevels, values, rowSummary);
		return A2(
			_elm_lang$html$Html$table,
			{ctor: '[]'},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$thead,
					{ctor: '[]'},
					head),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$tbody,
						{ctor: '[]'},
						body),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$tfoot,
							{ctor: '[]'},
							foot),
						_1: {ctor: '[]'}
					}
				}
			});
	});
var _user$project$Static$displayColumn = F2(
	function (_p3, column) {
		var _p4 = _p3;
		var vertAlign = {ctor: '_Tuple2', _0: 'vertical-align', _1: 'bottom'};
		var widthCols = {ctor: '_Tuple2', _0: 'min-width', _1: '100px'};
		var styleHeads = _elm_lang$html$Html_Attributes$style(
			{
				ctor: '::',
				_0: widthCols,
				_1: {
					ctor: '::',
					_0: vertAlign,
					_1: {ctor: '[]'}
				}
			});
		var alignCols = {ctor: '_Tuple2', _0: 'text-align', _1: 'right'};
		var styleCells = _elm_lang$html$Html_Attributes$style(
			{
				ctor: '::',
				_0: widthCols,
				_1: {
					ctor: '::',
					_0: vertAlign,
					_1: {
						ctor: '::',
						_0: alignCols,
						_1: {ctor: '[]'}
					}
				}
			});
		var bodyRow = F2(
			function (clabel, cvalue) {
				return A2(
					_elm_lang$html$Html$tr,
					{ctor: '[]'},
					{
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$td,
							{
								ctor: '::',
								_0: styleHeads,
								_1: {ctor: '[]'}
							},
							{
								ctor: '::',
								_0: _p4.label(clabel),
								_1: {ctor: '[]'}
							}),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$td,
								{
									ctor: '::',
									_0: styleCells,
									_1: {ctor: '[]'}
								},
								{
									ctor: '::',
									_0: _p4.cell(cvalue),
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						}
					});
			});
		var styleSums = _elm_lang$html$Html_Attributes$style(
			{
				ctor: '::',
				_0: widthCols,
				_1: {
					ctor: '::',
					_0: vertAlign,
					_1: {
						ctor: '::',
						_0: alignCols,
						_1: {ctor: '[]'}
					}
				}
			});
		var head = {
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$tr,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$th,
						{
							ctor: '::',
							_0: styleHeads,
							_1: {ctor: '[]'}
						},
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$th,
							{
								ctor: '::',
								_0: styleSums,
								_1: {ctor: '[]'}
							},
							{
								ctor: '::',
								_0: _p4.unitsLabel,
								_1: {ctor: '[]'}
							}),
						_1: {ctor: '[]'}
					}
				}),
			_1: {ctor: '[]'}
		};
		var summaryValue = _user$project$Crosstab_Column$summary(column);
		var foot = {
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$tr,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$td,
						{
							ctor: '::',
							_0: styleHeads,
							_1: {ctor: '[]'}
						},
						{
							ctor: '::',
							_0: _p4.summaryLabel,
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$td,
							{
								ctor: '::',
								_0: styleSums,
								_1: {ctor: '[]'}
							},
							{
								ctor: '::',
								_0: _p4.summary(summaryValue),
								_1: {ctor: '[]'}
							}),
						_1: {ctor: '[]'}
					}
				}),
			_1: {ctor: '[]'}
		};
		var values = _user$project$Crosstab_Column$valueList(column);
		var levels = _user$project$Crosstab_Column$levelList(column);
		var body = A3(_elm_lang$core$List$map2, bodyRow, levels, values);
		return A2(
			_elm_lang$html$Html$table,
			{ctor: '[]'},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$thead,
					{ctor: '[]'},
					head),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$tbody,
						{ctor: '[]'},
						body),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$tfoot,
							{ctor: '[]'},
							foot),
						_1: {ctor: '[]'}
					}
				}
			});
	});
var _user$project$Static$yearCustodyOf = function (getter) {
	return A3(
		_user$project$Crosstab_Column$column,
		_user$project$Crosstab_Calc$sum,
		_user$project$Crosstab_Calc$sumOf(getter),
		function (_p5) {
			return _elm_lang$core$Basics$toString(
				function (_) {
					return _.year;
				}(_p5));
		});
};
var _user$project$Static$yearCustodyOfAll = _user$project$Static$yearCustodyOf(
	function (r) {
		return r.totalM + r.totalF;
	});
var _user$project$Static$stateCustodySumsOf = F3(
	function (getter, state1, state2) {
		return A3(
			_user$project$Crosstab_Table$table,
			_user$project$Crosstab_Calc$sum,
			_user$project$Crosstab_Calc$sumOf(getter),
			{
				row: function (r) {
					return (_elm_lang$core$Native_Utils.eq(r.state, state1) || _elm_lang$core$Native_Utils.eq(r.state, state2)) ? r.state : 'All Other';
				},
				col: function (_p6) {
					return _elm_lang$core$Basics$toString(
						function (_) {
							return _.year;
						}(_p6));
				}
			});
	});
var _user$project$Static$stateCustodyW = F2(
	function (state1, state2) {
		return A3(
			_user$project$Static$stateCustodySumsOf,
			function (_) {
				return _.totalF;
			},
			state1,
			state2);
	});
var _user$project$Static$stateCustodyWOC = F2(
	function (state1, state2) {
		var woc = function (r) {
			return ((((r.blackF + r.hispF) + r.asianF) + r.nativeHawaiianF) + r.asianPacificF) + r.twoRaceF;
		};
		return A3(_user$project$Static$stateCustodySumsOf, woc, state1, state2);
	});
var _user$project$Static$carryValue = F3(
	function (func, comp, x) {
		return {
			ctor: '_Tuple2',
			_0: x,
			_1: A2(func, comp, x)
		};
	});
var _user$project$Static$cumPct = F2(
	function (_p7, val) {
		var _p8 = _p7;
		return function (_p9) {
			var _p10 = _p9;
			return {
				ctor: '_Tuple2',
				_0: _p10._0 + val,
				_1: A2(
					_elm_lang$core$Maybe$map,
					function (last) {
						return last + (_elm_lang$core$Basics$toFloat(val) / _elm_lang$core$Basics$toFloat(_p8.column));
					},
					_p10._1)
			};
		}(_p8.cum);
	});
var _user$project$Static$prevColPct = F2(
	function (_p11, val) {
		var _p12 = _p11;
		return A2(
			_elm_lang$core$Maybe$map,
			function (prev) {
				return _elm_lang$core$Basics$toFloat(val - prev) / _elm_lang$core$Basics$toFloat(val);
			},
			_p12.prevCol);
	});
var _user$project$Static$colPct = F2(
	function (_p13, val) {
		var _p14 = _p13;
		return _elm_lang$core$Basics$toFloat(val) / _elm_lang$core$Basics$toFloat(_p14.col);
	});
var _user$project$Static$columnConfig = function () {
	var cell = function (_p15) {
		var _p16 = _p15;
		var html = function (pct) {
			return A2(
				_elm_lang$html$Html$div,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$div,
						{ctor: '[]'},
						{
							ctor: '::',
							_0: _elm_lang$html$Html$text(pct),
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$div,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$style(
									{
										ctor: '::',
										_0: {ctor: '_Tuple2', _0: 'opacity', _1: '0.5'},
										_1: {
											ctor: '::',
											_0: {ctor: '_Tuple2', _0: 'font-size', _1: '0.7em'},
											_1: {ctor: '[]'}
										}
									}),
								_1: {ctor: '[]'}
							},
							{
								ctor: '::',
								_0: _elm_lang$html$Html$text(
									_elm_lang$core$Basics$toString(_p16._0)),
								_1: {ctor: '[]'}
							}),
						_1: {ctor: '[]'}
					}
				});
		};
		return A2(
			_elm_lang$core$Maybe$withDefault,
			html('-'),
			A2(
				_elm_lang$core$Maybe$map,
				function (_p17) {
					return html(
						A3(
							_elm_lang$core$Basics$flip,
							F2(
								function (x, y) {
									return A2(_elm_lang$core$Basics_ops['++'], x, y);
								}),
							'%',
							A2(
								_myrho$elm_round$Round$round,
								1,
								A2(
									F2(
										function (x, y) {
											return x * y;
										}),
									100,
									_p17))));
				},
				_p16._1));
	};
	return {
		label: _elm_lang$html$Html$text,
		summaryLabel: _elm_lang$html$Html$text('Total'),
		unitsLabel: _elm_lang$html$Html$text('Cumulative %'),
		cell: cell,
		summary: function (_p18) {
			return _elm_lang$html$Html$text(
				_elm_lang$core$Basics$toString(_p18));
		}
	};
}();
var _user$project$Static$tableConfig = function () {
	var cell = function (_p19) {
		var _p20 = _p19;
		var html = function (pct) {
			return A2(
				_elm_lang$html$Html$div,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$div,
						{ctor: '[]'},
						{
							ctor: '::',
							_0: _elm_lang$html$Html$text(pct),
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$div,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$style(
									{
										ctor: '::',
										_0: {ctor: '_Tuple2', _0: 'opacity', _1: '0.5'},
										_1: {
											ctor: '::',
											_0: {ctor: '_Tuple2', _0: 'font-size', _1: '0.7em'},
											_1: {ctor: '[]'}
										}
									}),
								_1: {ctor: '[]'}
							},
							{
								ctor: '::',
								_0: _elm_lang$html$Html$text(
									_elm_lang$core$Basics$toString(_p20._0)),
								_1: {ctor: '[]'}
							}),
						_1: {ctor: '[]'}
					}
				});
		};
		return A2(
			_elm_lang$core$Maybe$withDefault,
			html('-'),
			A2(
				_elm_lang$core$Maybe$map,
				function (_p21) {
					return html(
						A3(
							_elm_lang$core$Basics$flip,
							F2(
								function (x, y) {
									return A2(_elm_lang$core$Basics_ops['++'], x, y);
								}),
							'%',
							A2(
								_myrho$elm_round$Round$round,
								1,
								A2(
									F2(
										function (x, y) {
											return x * y;
										}),
									100,
									_p21))));
				},
				_p20._1));
	};
	return {
		rowLabel: _elm_lang$html$Html$text,
		colLabel: _elm_lang$html$Html$text,
		rowTotalLabel: _elm_lang$html$Html$text('Total'),
		colTotalLabel: _elm_lang$html$Html$text('Total'),
		cell: cell,
		summary: function (_p22) {
			return _elm_lang$html$Html$text(
				_elm_lang$core$Basics$toString(_p22));
		}
	};
}();
var _user$project$Static$viewCumPctColumn = function (col) {
	return A2(
		_user$project$Static$displayColumn,
		_user$project$Static$columnConfig,
		A3(
			_user$project$Crosstab_Column$compareAccum,
			_user$project$Static$cumPct,
			{
				ctor: '_Tuple2',
				_0: 0,
				_1: _elm_lang$core$Maybe$Just(0)
			},
			col));
};
var _user$project$Static$viewColPctTable = function (tab) {
	return A2(
		_user$project$Static$displayTable,
		_user$project$Static$tableConfig,
		A3(
			_user$project$Crosstab_Table$sortRowsBySummary,
			_elm_lang$core$Basics$identity,
			_user$project$Crosstab_Sort$Desc,
			A3(
				_user$project$Crosstab_Table$compare,
				_user$project$Static$carryValue(_user$project$Static$prevColPct),
				{ctor: '_Tuple2', _0: 0, _1: _elm_lang$core$Maybe$Nothing},
				tab)));
};
var _user$project$Static$view = function (data) {
	return A2(
		_elm_lang$html$Html$div,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$h1,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _elm_lang$html$Html$text('Women of Color in US prisons by year, % change, sorted descending by total'),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: _user$project$Static$viewColPctTable(
					A3(_user$project$Static$stateCustodyWOC, 'PA', 'CA', data)),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$hr,
						{ctor: '[]'},
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$h2,
							{ctor: '[]'},
							{
								ctor: '::',
								_0: _elm_lang$html$Html$text('Example cumulative percent column'),
								_1: {ctor: '[]'}
							}),
						_1: {
							ctor: '::',
							_0: _user$project$Static$viewCumPctColumn(
								_user$project$Static$yearCustodyOfAll(data)),
							_1: {ctor: '[]'}
						}
					}
				}
			}
		});
};

var _user$project$SortableTable$tableSummaryCols = function (ctab) {
	return {
		values: _user$project$Crosstab_Table$colSummaryList(ctab),
		summary: _user$project$Crosstab_Table$tableSummary(ctab)
	};
};
var _user$project$SortableTable$tableRows = function (ctab) {
	var construct = F3(
		function (level, cvals, rsum) {
			return {
				level: level,
				values: _elm_lang$core$Array$fromList(cvals),
				summary: rsum
			};
		});
	var rowsums = _user$project$Crosstab_Table$rowSummaryList(ctab);
	var values = _user$project$Crosstab_Table$rowList(ctab);
	var rowLevels = _user$project$Crosstab_Table$rowLevelList(ctab);
	return A4(_elm_lang$core$List$map3, construct, rowLevels, values, rowsums);
};
var _user$project$SortableTable$sortableColumn = function (_p0) {
	var _p1 = _p0;
	var _p5 = _p1.maybeValue;
	return _evancz$elm_sortable_table$Table$veryCustomColumn(
		{
			name: _p1.name,
			viewData: function (_p2) {
				return A2(
					_elm_lang$core$Maybe$withDefault,
					A2(
						_evancz$elm_sortable_table$Table$HtmlDetails,
						{ctor: '[]'},
						{ctor: '[]'}),
					A2(
						_elm_lang$core$Maybe$map,
						_p1.toHtml,
						_p5(_p2)));
			},
			sorter: _evancz$elm_sortable_table$Table$increasingOrDecreasingBy(
				function (_p3) {
					return A2(
						_elm_lang$core$Maybe$withDefault,
						{ctor: '[]'},
						A2(
							_elm_lang$core$Maybe$map,
							function (_p4) {
								return _elm_lang$core$List$singleton(
									_p1.sortValue(_p4));
							},
							_p5(_p3)));
				})
		});
};
var _user$project$SortableTable$sortableColumns = F2(
	function (c, cols) {
		return A2(
			_elm_lang$core$Basics_ops['++'],
			{
				ctor: '::',
				_0: function (name) {
					return A2(
						_evancz$elm_sortable_table$Table$stringColumn,
						name,
						function (_p6) {
							return c.rowLevel(
								function (_) {
									return _.level;
								}(_p6));
						});
				}(
					A2(_elm_lang$core$Maybe$withDefault, '', c.rowColumnLabel)),
				_1: {ctor: '[]'}
			},
			A2(
				_elm_lang$core$Basics_ops['++'],
				A2(
					_elm_lang$core$List$indexedMap,
					F2(
						function (i, name) {
							return _user$project$SortableTable$sortableColumn(
								{
									maybeValue: function (_p7) {
										return A2(
											_elm_lang$core$Array$get,
											i,
											function (_) {
												return _.values;
											}(_p7));
									},
									toHtml: c.value,
									sortValue: c.sortValue,
									name: c.colLevel(name)
								});
						}),
					cols),
				{
					ctor: '::',
					_0: function (name) {
						return _user$project$SortableTable$sortableColumn(
							{
								maybeValue: function (_p8) {
									return _elm_lang$core$Maybe$Just(
										function (_) {
											return _.summary;
										}(_p8));
								},
								toHtml: c.summary,
								sortValue: c.sortSummary,
								name: name
							});
					}(
						A2(_elm_lang$core$Maybe$withDefault, '', c.rowSummaryLabel)),
					_1: {ctor: '[]'}
				}));
	});
var _user$project$SortableTable$sortableCustomize = F2(
	function (c, colSums) {
		var htmlHeader = function (_p9) {
			var _p10 = _p9;
			return A2(_elm_lang$html$Html$th, _p10.attributes, _p10.children);
		};
		var textHeader = function (s) {
			return A2(
				_elm_lang$html$Html$th,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _elm_lang$html$Html$text(s),
					_1: {ctor: '[]'}
				});
		};
		var footer = F2(
			function (c, _p11) {
				var _p12 = _p11;
				return A2(
					_evancz$elm_sortable_table$Table$HtmlDetails,
					{ctor: '[]'},
					A2(
						_elm_lang$core$Basics_ops['++'],
						{
							ctor: '::',
							_0: textHeader(
								A2(_elm_lang$core$Maybe$withDefault, '', c.colSummaryLabel)),
							_1: {ctor: '[]'}
						},
						A2(
							_elm_lang$core$Basics_ops['++'],
							A2(
								_elm_lang$core$List$map,
								function (_p13) {
									return htmlHeader(
										c.summary(_p13));
								},
								_p12.values),
							{
								ctor: '::',
								_0: htmlHeader(
									c.summary(_p12.summary)),
								_1: {ctor: '[]'}
							})));
			});
		return function (custom) {
			return _elm_lang$core$Native_Utils.update(
				custom,
				{
					tfoot: _elm_lang$core$Maybe$Just(
						A2(footer, c, colSums))
				});
		}(_evancz$elm_sortable_table$Table$defaultCustomizations);
	});
var _user$project$SortableTable$sortableConfigHelp = F3(
	function (c, colLevels, colSums) {
		return _evancz$elm_sortable_table$Table$customConfig(
			{
				toId: function (_p14) {
					return c.rowLevel(
						function (_) {
							return _.level;
						}(_p14));
				},
				toMsg: c.toMsg,
				columns: A2(_user$project$SortableTable$sortableColumns, c, colLevels),
				customizations: A2(_user$project$SortableTable$sortableCustomize, c, colSums)
			});
	});
var _user$project$SortableTable$sortableConfig = F2(
	function (config, ctab) {
		var colSums = _user$project$SortableTable$tableSummaryCols(ctab);
		var colLevels = _user$project$Crosstab_Table$colLevelList(ctab);
		return A3(_user$project$SortableTable$sortableConfigHelp, config, colLevels, colSums);
	});
var _user$project$SortableTable$viewSortable = F3(
	function (config, state, ctab) {
		return function (c) {
			return A3(
				_evancz$elm_sortable_table$Table$view,
				c,
				state,
				_user$project$SortableTable$tableRows(ctab));
		}(
			A2(_user$project$SortableTable$sortableConfig, config, ctab));
	});
var _user$project$SortableTable$stateCustodySumsOf = F3(
	function (getter, state1, state2) {
		return A3(
			_user$project$Crosstab_Table$table,
			_user$project$Crosstab_Calc$sum,
			_user$project$Crosstab_Calc$sumOf(getter),
			{
				row: function (r) {
					return (_elm_lang$core$Native_Utils.eq(r.state, state1) || _elm_lang$core$Native_Utils.eq(r.state, state2)) ? r.state : 'All Other';
				},
				col: function (_p15) {
					return _elm_lang$core$Basics$toString(
						function (_) {
							return _.year;
						}(_p15));
				}
			});
	});
var _user$project$SortableTable$stateCustodyWOC = F2(
	function (state1, state2) {
		var woc = function (r) {
			return ((((r.blackF + r.hispF) + r.asianF) + r.nativeHawaiianF) + r.asianPacificF) + r.twoRaceF;
		};
		return A3(_user$project$SortableTable$stateCustodySumsOf, woc, state1, state2);
	});
var _user$project$SortableTable$carryValue = F3(
	function (func, comp, x) {
		return {
			ctor: '_Tuple2',
			_0: x,
			_1: A2(func, comp, x)
		};
	});
var _user$project$SortableTable$prevColPct = F2(
	function (_p16, val) {
		var _p17 = _p16;
		return A2(
			_elm_lang$core$Maybe$map,
			function (prev) {
				return _elm_lang$core$Basics$toFloat(val - prev) / _elm_lang$core$Basics$toFloat(val);
			},
			_p17.prevCol);
	});
var _user$project$SortableTable$colPctTable = function (tab) {
	return A3(
		_user$project$Crosstab_Table$compare,
		_user$project$SortableTable$carryValue(_user$project$SortableTable$prevColPct),
		{ctor: '_Tuple2', _0: 0, _1: _elm_lang$core$Maybe$Nothing},
		tab);
};
var _user$project$SortableTable$htmlColPctSummary = function (count) {
	return A2(
		_evancz$elm_sortable_table$Table$HtmlDetails,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$style(
				{
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: 'text-align', _1: 'right'},
					_1: {
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: 'min-width', _1: '100px'},
						_1: {ctor: '[]'}
					}
				}),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$div,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _elm_lang$html$Html$text(
						_elm_lang$core$Basics$toString(count)),
					_1: {ctor: '[]'}
				}),
			_1: {ctor: '[]'}
		});
};
var _user$project$SortableTable$update = F2(
	function (msg, model) {
		var _p18 = msg;
		if (_p18.ctor === 'TableMsg') {
			return _elm_lang$core$Native_Utils.update(
				model,
				{table: _p18._0});
		} else {
			return _elm_lang$core$Native_Utils.update(
				model,
				{sortBy: _p18._0});
		}
	});
var _user$project$SortableTable$Model = F2(
	function (a, b) {
		return {table: a, sortBy: b};
	});
var _user$project$SortableTable$SortableConfig = function (a) {
	return function (b) {
		return function (c) {
			return function (d) {
				return function (e) {
					return function (f) {
						return function (g) {
							return function (h) {
								return function (i) {
									return function (j) {
										return {toMsg: a, rowLevel: b, colLevel: c, value: d, summary: e, sortValue: f, sortSummary: g, rowColumnLabel: h, rowSummaryLabel: i, colSummaryLabel: j};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var _user$project$SortableTable$TableRow = F3(
	function (a, b, c) {
		return {level: a, values: b, summary: c};
	});
var _user$project$SortableTable$TableSummary = F2(
	function (a, b) {
		return {values: a, summary: b};
	});
var _user$project$SortableTable$SetSortBy = function (a) {
	return {ctor: 'SetSortBy', _0: a};
};
var _user$project$SortableTable$TableMsg = function (a) {
	return {ctor: 'TableMsg', _0: a};
};
var _user$project$SortableTable$SortByColPct = {ctor: 'SortByColPct'};
var _user$project$SortableTable$SortByCount = {ctor: 'SortByCount'};
var _user$project$SortableTable$init = {
	table: _evancz$elm_sortable_table$Table$initialSort('rowLabels'),
	sortBy: _user$project$SortableTable$SortByCount
};
var _user$project$SortableTable$htmlColPctValue = F2(
	function (sortBy, _p19) {
		var _p20 = _p19;
		var greaterStyle = {ctor: '[]'};
		var lesserStyle = {
			ctor: '::',
			_0: {ctor: '_Tuple2', _0: 'opacity', _1: '0.5'},
			_1: {
				ctor: '::',
				_0: {ctor: '_Tuple2', _0: 'font-size', _1: '0.7em'},
				_1: {ctor: '[]'}
			}
		};
		var formatPct = function ($float) {
			return function (s) {
				return A2(_elm_lang$core$Basics_ops['++'], s, '%');
			}(
				A2(_myrho$elm_round$Round$round, 1, $float * 100));
		};
		return A2(
			_evancz$elm_sortable_table$Table$HtmlDetails,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$style(
					{
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: 'text-align', _1: 'right'},
						_1: {
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: 'min-width', _1: '100px'},
							_1: {ctor: '[]'}
						}
					}),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$div,
					{ctor: '[]'},
					{
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$div,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$style(
									_elm_lang$core$Native_Utils.eq(sortBy, _user$project$SortableTable$SortByCount) ? greaterStyle : lesserStyle),
								_1: {ctor: '[]'}
							},
							{
								ctor: '::',
								_0: _elm_lang$html$Html$text(
									_elm_lang$core$Basics$toString(_p20._0)),
								_1: {ctor: '[]'}
							}),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$div,
								{
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$style(
										_elm_lang$core$Native_Utils.eq(sortBy, _user$project$SortableTable$SortByColPct) ? greaterStyle : lesserStyle),
									_1: {ctor: '[]'}
								},
								{
									ctor: '::',
									_0: _elm_lang$html$Html$text(
										A2(
											_elm_lang$core$Maybe$withDefault,
											'-',
											A2(_elm_lang$core$Maybe$map, formatPct, _p20._1))),
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						}
					}),
				_1: {ctor: '[]'}
			});
	});
var _user$project$SortableTable$colPctTableConfig = function (sortBy) {
	return {
		toMsg: _user$project$SortableTable$TableMsg,
		rowLevel: _elm_lang$core$Basics$identity,
		colLevel: _elm_lang$core$Basics$identity,
		value: _user$project$SortableTable$htmlColPctValue(sortBy),
		summary: _user$project$SortableTable$htmlColPctSummary,
		sortValue: function () {
			var _p21 = sortBy;
			if (_p21.ctor === 'SortByCount') {
				return function (_p22) {
					return _elm_lang$core$Basics$toFloat(
						_elm_lang$core$Tuple$first(_p22));
				};
			} else {
				return function (_p23) {
					return A2(
						_elm_lang$core$Maybe$withDefault,
						0.0,
						_elm_lang$core$Tuple$second(_p23));
				};
			}
		}(),
		sortSummary: _elm_lang$core$Basics$identity,
		rowColumnLabel: _elm_lang$core$Maybe$Nothing,
		rowSummaryLabel: _elm_lang$core$Maybe$Just('Total'),
		colSummaryLabel: _elm_lang$core$Maybe$Just('Total')
	};
};
var _user$project$SortableTable$view = F2(
	function (data, _p24) {
		var _p25 = _p24;
		var _p26 = _p25.sortBy;
		return A2(
			_elm_lang$html$Html$div,
			{ctor: '[]'},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$h1,
					{ctor: '[]'},
					{
						ctor: '::',
						_0: _elm_lang$html$Html$text('Women of Color in US prisons by year, % change'),
						_1: {ctor: '[]'}
					}),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$div,
						{ctor: '[]'},
						{
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$input,
								{
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$type_('radio'),
									_1: {
										ctor: '::',
										_0: _elm_lang$html$Html_Attributes$id('count'),
										_1: {
											ctor: '::',
											_0: _elm_lang$html$Html_Attributes$name('sortby'),
											_1: {
												ctor: '::',
												_0: _elm_lang$html$Html_Attributes$value('count'),
												_1: {
													ctor: '::',
													_0: _elm_lang$html$Html_Attributes$checked(
														_elm_lang$core$Native_Utils.eq(_p26, _user$project$SortableTable$SortByCount)),
													_1: {
														ctor: '::',
														_0: _elm_lang$html$Html_Events$onClick(
															_user$project$SortableTable$SetSortBy(_user$project$SortableTable$SortByCount)),
														_1: {ctor: '[]'}
													}
												}
											}
										}
									}
								},
								{ctor: '[]'}),
							_1: {
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$label,
									{
										ctor: '::',
										_0: _elm_lang$html$Html_Attributes$for('count'),
										_1: {ctor: '[]'}
									},
									{
										ctor: '::',
										_0: _elm_lang$html$Html$text('sort by count'),
										_1: {ctor: '[]'}
									}),
								_1: {
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$input,
										{
											ctor: '::',
											_0: _elm_lang$html$Html_Attributes$type_('radio'),
											_1: {
												ctor: '::',
												_0: _elm_lang$html$Html_Attributes$id('pct'),
												_1: {
													ctor: '::',
													_0: _elm_lang$html$Html_Attributes$name('sortby'),
													_1: {
														ctor: '::',
														_0: _elm_lang$html$Html_Attributes$value('pct'),
														_1: {
															ctor: '::',
															_0: _elm_lang$html$Html_Attributes$checked(
																_elm_lang$core$Native_Utils.eq(_p26, _user$project$SortableTable$SortByColPct)),
															_1: {
																ctor: '::',
																_0: _elm_lang$html$Html_Events$onClick(
																	_user$project$SortableTable$SetSortBy(_user$project$SortableTable$SortByColPct)),
																_1: {ctor: '[]'}
															}
														}
													}
												}
											}
										},
										{ctor: '[]'}),
									_1: {
										ctor: '::',
										_0: A2(
											_elm_lang$html$Html$label,
											{
												ctor: '::',
												_0: _elm_lang$html$Html_Attributes$for('pct'),
												_1: {ctor: '[]'}
											},
											{
												ctor: '::',
												_0: _elm_lang$html$Html$text('sort by % change'),
												_1: {ctor: '[]'}
											}),
										_1: {ctor: '[]'}
									}
								}
							}
						}),
					_1: {
						ctor: '::',
						_0: function (tab) {
							return A3(
								_user$project$SortableTable$viewSortable,
								_user$project$SortableTable$colPctTableConfig(_p26),
								_p25.table,
								tab);
						}(
							_user$project$SortableTable$colPctTable(
								A3(_user$project$SortableTable$stateCustodyWOC, 'PA', 'CA', data))),
						_1: {ctor: '[]'}
					}
				}
			});
	});

var _user$project$Main$onClickCustom = function (msg) {
	return A3(
		_elm_lang$html$Html_Events$onWithOptions,
		'click',
		{preventDefault: true, stopPropagation: false},
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _user$project$Main$viewRef = A2(
	_elm_lang$html$Html$p,
	{
		ctor: '::',
		_0: _elm_lang$html$Html_Attributes$style(
			{
				ctor: '::',
				_0: {ctor: '_Tuple2', _0: 'font-size', _1: '0.7em'},
				_1: {ctor: '[]'}
			}),
		_1: {ctor: '[]'}
	},
	{
		ctor: '::',
		_0: A2(
			_elm_lang$html$Html$span,
			{ctor: '[]'},
			{
				ctor: '::',
				_0: _elm_lang$html$Html$text('Source (Public Domain): '),
				_1: {ctor: '[]'}
			}),
		_1: {
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$span,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$a,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$href('http://doi.org/10.3886/ICPSR36657.v1'),
							_1: {ctor: '[]'}
						},
						{
							ctor: '::',
							_0: _elm_lang$html$Html$text('National Prisoner Statistics, 1978-2015 (ICPSR 36657)'),
							_1: {ctor: '[]'}
						}),
					_1: {ctor: '[]'}
				}),
			_1: {ctor: '[]'}
		}
	});
var _user$project$Main$viewErrs = function (errs) {
	var decodeErrors = function (errs) {
		return A2(
			_elm_lang$html$Html$div,
			{ctor: '[]'},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$h1,
					{ctor: '[]'},
					{
						ctor: '::',
						_0: _elm_lang$html$Html$text('Errors occurred decoding CSV data to records'),
						_1: {ctor: '[]'}
					}),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$ul,
						{ctor: '[]'},
						A2(
							_elm_lang$core$List$map,
							function (_p0) {
								var _p1 = _p0;
								return A2(
									_elm_lang$html$Html$li,
									{ctor: '[]'},
									{
										ctor: '::',
										_0: _elm_lang$html$Html$text(
											A2(
												_elm_lang$core$Basics_ops['++'],
												_p1._1,
												A2(
													_elm_lang$core$Basics_ops['++'],
													' (line ',
													A2(
														_elm_lang$core$Basics_ops['++'],
														_elm_lang$core$Basics$toString(_p1._0),
														')')))),
										_1: {ctor: '[]'}
									});
							},
							errs)),
					_1: {ctor: '[]'}
				}
			});
	};
	var parseErrors = function (errs) {
		return A2(
			_elm_lang$html$Html$div,
			{ctor: '[]'},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$h1,
					{ctor: '[]'},
					{
						ctor: '::',
						_0: _elm_lang$html$Html$text('Errors occurred parsing CSV data'),
						_1: {ctor: '[]'}
					}),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$ul,
						{ctor: '[]'},
						A2(
							_elm_lang$core$List$map,
							function (e) {
								return A2(
									_elm_lang$html$Html$li,
									{ctor: '[]'},
									{
										ctor: '::',
										_0: _elm_lang$html$Html$text(e),
										_1: {ctor: '[]'}
									});
							},
							errs)),
					_1: {ctor: '[]'}
				}
			});
	};
	var _p2 = errs;
	if (_p2.ctor === 'CsvErrors') {
		return parseErrors(_p2._0);
	} else {
		return decodeErrors(_p2._0);
	}
};
var _user$project$Main$isActiveSortableTable = function (model) {
	var _p3 = model;
	if (_p3.ctor === 'SortableTable') {
		return true;
	} else {
		return false;
	}
};
var _user$project$Main$isActiveStatic = function (model) {
	var _p4 = model;
	if (_p4.ctor === 'Static') {
		return true;
	} else {
		return false;
	}
};
var _user$project$Main$SortableTable = function (a) {
	return {ctor: 'SortableTable', _0: a};
};
var _user$project$Main$Static = {ctor: 'Static'};
var _user$project$Main$init = _user$project$Main$Static;
var _user$project$Main$update = F2(
	function (msg, model) {
		var _p5 = {ctor: '_Tuple2', _0: msg, _1: model};
		_v4_4:
		do {
			if (_p5.ctor === '_Tuple2') {
				switch (_p5._0.ctor) {
					case 'SortableTableMsg':
						if (_p5._1.ctor === 'SortableTable') {
							return _user$project$Main$SortableTable(
								A2(_user$project$SortableTable$update, _p5._0._0, _p5._1._0));
						} else {
							break _v4_4;
						}
					case 'SetActiveStatic':
						return _user$project$Main$Static;
					case 'SetActiveSortableTable':
						return _user$project$Main$SortableTable(_user$project$SortableTable$init);
					default:
						return model;
				}
			} else {
				break _v4_4;
			}
		} while(false);
		return model;
	});
var _user$project$Main$NoOp = {ctor: 'NoOp'};
var _user$project$Main$SetActiveSortableTable = {ctor: 'SetActiveSortableTable'};
var _user$project$Main$SetActiveStatic = {ctor: 'SetActiveStatic'};
var _user$project$Main$viewTOC = function (model) {
	return A2(
		_elm_lang$html$Html$ul,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$li,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$classList(
						{
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'active',
								_1: _user$project$Main$isActiveStatic(model)
							},
							_1: {ctor: '[]'}
						}),
					_1: {ctor: '[]'}
				},
				{
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$a,
						{
							ctor: '::',
							_0: _user$project$Main$onClickCustom(_user$project$Main$SetActiveStatic),
							_1: {ctor: '[]'}
						},
						{
							ctor: '::',
							_0: _elm_lang$html$Html$text('Static'),
							_1: {ctor: '[]'}
						}),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$li,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$classList(
							{
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'active',
									_1: _user$project$Main$isActiveSortableTable(model)
								},
								_1: {ctor: '[]'}
							}),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$a,
							{
								ctor: '::',
								_0: _user$project$Main$onClickCustom(_user$project$Main$SetActiveSortableTable),
								_1: {ctor: '[]'}
							},
							{
								ctor: '::',
								_0: _elm_lang$html$Html$text('Sortable Table'),
								_1: {ctor: '[]'}
							}),
						_1: {ctor: '[]'}
					}),
				_1: {ctor: '[]'}
			}
		});
};
var _user$project$Main$SortableTableMsg = function (a) {
	return {ctor: 'SortableTableMsg', _0: a};
};
var _user$project$Main$viewExample = F2(
	function (data, model) {
		var _p6 = model;
		if (_p6.ctor === 'Static') {
			return A2(
				_elm_lang$html$Html$map,
				_elm_lang$core$Basics$always(_user$project$Main$NoOp),
				_user$project$Static$view(data));
		} else {
			return A2(
				_elm_lang$html$Html$map,
				_user$project$Main$SortableTableMsg,
				A2(_user$project$SortableTable$view, data, _p6._0));
		}
	});
var _user$project$Main$view = function (model) {
	return A2(
		_elm_lang$html$Html$div,
		{ctor: '[]'},
		function () {
			var _p7 = _user$project$Data$parsed;
			if (_p7.ctor === 'Ok') {
				return {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$nav,
						{ctor: '[]'},
						{
							ctor: '::',
							_0: _user$project$Main$viewTOC(model),
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$aside,
							{ctor: '[]'},
							{
								ctor: '::',
								_0: _user$project$Main$viewRef,
								_1: {ctor: '[]'}
							}),
						_1: {
							ctor: '::',
							_0: A3(
								_elm_lang$html$Html$node,
								'main',
								{ctor: '[]'},
								{
									ctor: '::',
									_0: A2(_user$project$Main$viewExample, _p7._0, model),
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						}
					}
				};
			} else {
				return {
					ctor: '::',
					_0: _user$project$Main$viewErrs(_p7._0),
					_1: {ctor: '[]'}
				};
			}
		}());
};
var _user$project$Main$main = _elm_lang$html$Html$beginnerProgram(
	{model: _user$project$Main$init, update: _user$project$Main$update, view: _user$project$Main$view})();

var Elm = {};
Elm['Main'] = Elm['Main'] || {};
if (typeof _user$project$Main$main !== 'undefined') {
    _user$project$Main$main(Elm['Main'], 'Main', undefined);
}

if (typeof define === "function" && define['amd'])
{
  define([], function() { return Elm; });
  return;
}

if (typeof module === "object")
{
  module['exports'] = Elm;
  return;
}

var globalElm = this['Elm'];
if (typeof globalElm === "undefined")
{
  this['Elm'] = Elm;
  return;
}

for (var publicModule in Elm)
{
  if (publicModule in globalElm)
  {
    throw new Error('There are two Elm modules called `' + publicModule + '` on this page! Rename one of them.');
  }
  globalElm[publicModule] = Elm[publicModule];
}

}).call(this);

