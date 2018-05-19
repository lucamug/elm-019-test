(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}




var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === elm_lang$core$Basics$EQ ? 0 : ord === elm_lang$core$Basics$LT ? -1 : 1;
	}));
});



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Error_throw(5);
		return false;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = elm_lang$core$Set$toList(x);
		y = elm_lang$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = elm_lang$core$Dict$toList(x);
		y = elm_lang$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = elm_lang$core$Dict$toList(x);
		y = elm_lang$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (!x.$)
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? elm_lang$core$Basics$LT : n ? elm_lang$core$Basics$GT : elm_lang$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
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


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Error_throw(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Error_throw(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm_lang$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm_lang$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm_lang$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
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

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[94m' + string + '\x1b[0m' : string;
}



function _Error_throw_UNUSED(identifier)
{
	throw new Error('https://github.com/elm-lang/core/blob/master/hints/' + identifier + '.md');
}


function _Error_throw(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('Internal red-black tree invariant violated');

		case 1:
			var url = fact1;
			throw new Error('Cannot navigate to the following URL. It seems to be invalid:\n' + url);

		case 2:
			var message = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + message);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at http://package.elm-lang.org/packages/elm-lang/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Error_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Error_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm-lang/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Error_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}

function _Error_dictBug()
{
	_Error_throw(0);
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Error_throw(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

var _Json_decodeInt = { $: 2 };
var _Json_decodeBool = { $: 3 };
var _Json_decodeFloat = { $: 4 };
var _Json_decodeValue = { $: 5 };
var _Json_decodeString = { $: 6 };

function _Json_decodeList(decoder) { return { $: 7, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 8, b: decoder }; }

function _Json_decodeNull(value) { return { $: 9, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 10,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 11,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 12,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 13,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 14,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 15,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return elm_lang$core$Result$Err(A2(elm_lang$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 3:
			return (typeof value === 'boolean')
				? elm_lang$core$Result$Ok(value)
				: _Json_expecting('a BOOL', value);

		case 2:
			if (typeof value !== 'number') {
				return _Json_expecting('an INT', value);
			}

			if (-2147483647 < value && value < 2147483647 && (value | 0) === value) {
				return elm_lang$core$Result$Ok(value);
			}

			if (isFinite(value) && !(value % 1)) {
				return elm_lang$core$Result$Ok(value);
			}

			return _Json_expecting('an INT', value);

		case 4:
			return (typeof value === 'number')
				? elm_lang$core$Result$Ok(value)
				: _Json_expecting('a FLOAT', value);

		case 6:
			return (typeof value === 'string')
				? elm_lang$core$Result$Ok(value)
				: (value instanceof String)
					? elm_lang$core$Result$Ok(value + '')
					: _Json_expecting('a STRING', value);

		case 9:
			return (value === null)
				? elm_lang$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 5:
			return elm_lang$core$Result$Ok(_Json_wrap(value));

		case 7:
			if (!Array.isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 8:
			if (!Array.isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 10:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return (elm_lang$core$Result$isOk(result)) ? result : elm_lang$core$Result$Err(A2(elm_lang$json$Json$Decode$Field, field, result.a));

		case 11:
			var index = decoder.e;
			if (!Array.isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return (elm_lang$core$Result$isOk(result)) ? result : elm_lang$core$Result$Err(A2(elm_lang$json$Json$Decode$Index, index, result.a));

		case 12:
			if (typeof value !== 'object' || value === null || Array.isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!elm_lang$core$Result$isOk(result))
					{
						return elm_lang$core$Result$Err(A2(elm_lang$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return elm_lang$core$Result$Ok(elm_lang$core$List$reverse(keyValuePairs));

		case 13:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!elm_lang$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return elm_lang$core$Result$Ok(answer);

		case 14:
			var result = _Json_runHelp(decoder.b, value);
			return (!elm_lang$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 15:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if (elm_lang$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return elm_lang$core$Result$Err(elm_lang$json$Json$Decode$OneOf(elm_lang$core$List$reverse(errors)));

		case 1:
			return elm_lang$core$Result$Err(A2(elm_lang$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return elm_lang$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!elm_lang$core$Result$isOk(result))
		{
			return elm_lang$core$Result$Err(A2(elm_lang$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return elm_lang$core$Result$Ok(toElmValue(array));
}

function _Json_toElmArray(array)
{
	return A2(elm_lang$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return elm_lang$core$Result$Err(A2(elm_lang$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 3:
		case 2:
		case 4:
		case 6:
		case 5:
			return true;

		case 9:
			return x.c === y.c;

		case 7:
		case 8:
		case 12:
			return _Json_equality(x.b, y.b);

		case 10:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 11:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 13:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 14:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 15:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel);
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, object)
{
	object['worker'] = function(flags)
	{
		return _Platform_initialize(
			flagDecoder,
			flags,
			impl.init,
			impl.update,
			impl.subscriptions,
			function() { return function() {} }
		);
	};
	return object;
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, flags, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(flags));
	elm_lang$core$Result$isOk(result) || _Error_throw(2, result.a);
	var managers = {};
	result = init(result.a);
	var model = result.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		result = A2(update, msg, model);
		stepper(model = result.a, viewMetadata);
		_Platform_dispatchEffects(managers, result.b, subscriptions(model));
	}

	_Platform_dispatchEffects(managers, result.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm-lang/browser and elm-lang/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				p: bag.n,
				q: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.q)
		{
			x = temp.p(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Error_throw(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		r: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

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


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		r: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, incomingValue);

		elm_lang$core$Result$isOk(result) || _Error_throw(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (typeof name === 'function')
				? _Error_throw(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (typeof name === 'function')
				? _Error_throw(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}



function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800)
			+
			String.fromCharCode(code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return word
		? elm_lang$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(string[0] + string[1], string.slice(2))
				: _Utils_Tuple2(string[0], string.slice(1))
		)
		: elm_lang$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(s)
{
	var len = s.length;

	// if empty
	if (len === 0)
	{
		return elm_lang$core$Maybe$Nothing;
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
			return elm_lang$core$Maybe$Nothing;
		}
		return elm_lang$core$Maybe$Just(parseInt(s, 16));
	}

	// is decimal
	if (c > '9' || (c < '0' && ((c !== '-' && c !== '+') || len === 1)))
	{
		return elm_lang$core$Maybe$Nothing;
	}
	for (var i = 1; i < len; ++i)
	{
		var c = s[i];
		if (c < '0' || '9' < c)
		{
			return elm_lang$core$Maybe$Nothing;
		}
	}

	return elm_lang$core$Maybe$Just(parseInt(s, 10));
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return elm_lang$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? elm_lang$core$Maybe$Just(n) : elm_lang$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}





// STRINGS


var _Parser_isSubString = F5(function(smallString, offset, row, col, bigString)
{
	var smallLength = smallString.length;
	var isGood = offset + smallLength <= bigString.length;

	for (var i = 0; isGood && i < smallLength; )
	{
		var code = bigString.charCodeAt(offset);
		isGood =
			smallString[i++] === bigString[offset++]
			&& (
				code === 0x000A /* \n */
					? ( row++, col=1 )
					: ( col++, (code & 0xF800) === 0xD800 ? smallString[i++] === bigString[offset++] : 1 )
			)
	}

	return _Utils_Tuple3(isGood ? offset : -1, row, col);
});



// CHARS


var _Parser_isSubChar = F3(function(predicate, offset, string)
{
	return (
		string.length <= offset
			? -1
			:
		(string.charCodeAt(offset) & 0xF800) === 0xD800
			? (predicate(_Utils_chr(string.substr(offset, 2))) ? offset + 2 : -1)
			:
		(predicate(_Utils_chr(string[offset]))
			? ((string[offset] === '\n') ? -2 : (offset + 1))
			: -1
		)
	);
});


var _Parser_isAsciiChar = F3(function(char, offset, string)
{
	return char[0] === string[offset];
});



// FIND STRING


var _Parser_findSubString = F5(function(smallString, offset, row, col, bigString)
{
	var newOffset = bigString.indexOf(smallString, offset);
	var target = newOffset < 0 ? bigString.length : newOffset + smallString.length;

	while (offset < target)
	{
		var code = bigString.charCodeAt(offset++);
		code === 0x000A /* \n */
			? ( col=1, row++ )
			: ( col++, (code & 0xF800) === 0xD800 && offset++ )
	}

	return _Utils_Tuple3(newOffset, row, col);
});



// SEND REQUEST

var _Http_toTask = F2(function(request, maybeProgress)
{
	return _Scheduler_binding(function(callback)
	{
		var xhr = new XMLHttpRequest();

		_Http_configureProgress(xhr, maybeProgress);

		xhr.addEventListener('error', function() {
			callback(_Scheduler_fail(elm_lang$http$Http$NetworkError));
		});
		xhr.addEventListener('timeout', function() {
			callback(_Scheduler_fail(elm_lang$http$Http$Timeout));
		});
		xhr.addEventListener('load', function() {
			callback(_Http_handleResponse(xhr, request.expect.a));
		});

		try
		{
			xhr.open(request.method, request.url, true);
		}
		catch (e)
		{
			return callback(_Scheduler_fail(elm_lang$http$Http$BadUrl(request.url)));
		}

		_Http_configureRequest(xhr, request);

		var body = request.body;
		xhr.send(elm_lang$http$Http$Internal$isStringBody(body)
			? (xhr.setRequestHeader('Content-Type', body.a), body.b)
			: body.a
		);

		return function() { xhr.abort(); };
	});
});

function _Http_configureProgress(xhr, maybeProgress)
{
	if (!elm_lang$core$Maybe$isJust(maybeProgress))
	{
		return;
	}

	xhr.addEventListener('progress', function(event) {
		if (!event.lengthComputable)
		{
			return;
		}
		_Scheduler_rawSpawn(maybeProgress.a({
			bytes: event.loaded,
			bytesExpected: event.total
		}));
	});
}

function _Http_configureRequest(xhr, request)
{
	for (var headers = request.headers; headers.b; headers = headers.b) // WHILE_CONS
	{
		xhr.setRequestHeader(headers.a.a, headers.a.b);
	}

	xhr.responseType = request.expect.b;
	xhr.withCredentials = request.withCredentials;

	elm_lang$core$Maybe$isJust(request.timeout) && (xhr.timeout = request.timeout.a);
}


// RESPONSES

function _Http_handleResponse(xhr, responseToResult)
{
	var response = _Http_toResponse(xhr);

	if (xhr.status < 200 || 300 <= xhr.status)
	{
		response.body = xhr.responseText;
		return _Scheduler_fail(elm_lang$http$Http$BadStatus(response));
	}

	var result = responseToResult(response);

	if (elm_lang$core$Result$isOk(result))
	{
		return _Scheduler_succeed(result.a);
	}
	else
	{
		response.body = xhr.responseText;
		return _Scheduler_fail(elm_lang$http$Http$BadPayload(result.a, response));
	}
}

function _Http_toResponse(xhr)
{
	return {
		url: xhr.responseURL,
		status: { code: xhr.status, message: xhr.statusText },
		headers: _Http_parseHeaders(xhr.getAllResponseHeaders()),
		body: xhr.response
	};
}

function _Http_parseHeaders(rawHeaders)
{
	var headers = elm_lang$core$Dict$empty;

	if (!rawHeaders)
	{
		return headers;
	}

	var headerPairs = rawHeaders.split('\u000d\u000a');
	for (var i = headerPairs.length; i--; )
	{
		var headerPair = headerPairs[i];
		var index = headerPair.indexOf('\u003a\u0020');
		if (index > 0)
		{
			var key = headerPair.substring(0, index);
			var value = headerPair.substring(index + 2);

			headers = A3(elm_lang$core$Dict$update, key, function(oldValue) {
				return elm_lang$core$Maybe$Just(elm_lang$core$Maybe$isJust(oldValue)
					? value + ', ' + oldValue.a
					: value
				);
			}, headers);
		}
	}

	return headers;
}


// EXPECTORS

function _Http_expectStringResponse(responseToResult)
{
	return {
		$: 0,
		b: 'text',
		a: responseToResult
	};
}

var _Http_mapExpect = F2(function(func, expect)
{
	return {
		$: 0,
		b: expect.b,
		a: function(response) {
			var convertedResponse = expect.a(response);
			return A2(elm_lang$core$Result$map, func, convertedResponse);
		}
	};
});


// BODY

function _Http_multipart(parts)
{


	for (var formData = new FormData(); parts.b; parts = parts.b) // WHILE_CONS
	{
		var part = parts.a;
		formData.append(part.a, part.b);
	}

	return elm_lang$http$Http$Internal$FormDataBody(formData);
}


function _Url_percentEncode(string)
{
	return encodeURIComponent(string);
}

function _Url_percentDecode(string)
{
	try
	{
		return elm_lang$core$Maybe$Just(decodeURIComponent(string));
	}
	catch (e)
	{
		return elm_lang$core$Maybe$Nothing;
	}
}



// HELPERS


var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, object)
{
	// NOTE: this function needs _Platform_export available to work
	object['embed'] = function(node)
	{
		node.parentNode.replaceChild(
			_VirtualDom_render(virtualNode, function() {}),
			node
		);
	};
	return object;
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^\s*javascript:/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^\s*javascript:/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = elm_lang$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			A3(elm_lang$json$Json$Decode$map2,
				!tag
					? _VirtualDom_mapTimed
					:
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				elm_lang$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapTimed = F2(function(func, timed)
{
	return {
		$: timed.$,
		a: func(timed.a)
	};
});

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(
		_VirtualDom_mapTimed(func, tuple.a),
		tuple.b
	);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: _VirtualDom_mapTimed(func, record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		(key !== 'value' || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		value
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		value
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: elm_lang$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!elm_lang$core$Result$isOk(result))
		{
			return;
		}

		var ok = result.a;
		var timedMsg = _VirtualDom_eventToTimedMsg(event, elm_lang$virtual_dom$VirtualDom$toHandlerInt(handler), ok);
		var message = timedMsg.a;
		var currentEventNode = eventNode;
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
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
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, elm_lang$virtual_dom$VirtualDom$isSync(timedMsg));
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ === y.$ && _Json_equality(x.a, y.a);
}

function _VirtualDom_eventToTimedMsg(event, tag, value)
{
	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	if (!tag)
	{
		return value;
	}

	if (tag === 1 ? value.b : tag === 3 && value.stopPropagation) event.stopPropagation();
	if (tag === 2 ? value.b : tag === 3 && value.preventDefault) event.preventDefault();

	return tag < 3 ? value.a : value.message;
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
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

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, xLen - yLen);
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, yKids.slice(xLen));
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			var oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			var newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			v: localPatches,
			w: inserts,
			x: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			y: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, z: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, z: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.y, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			v: subPatches,
			z: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			y: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.y, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			v: subPatches,
			z: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.v;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.z.s = domNode;
				var subPatches = data.v;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var i = patch.s;
			while (i--)
			{
				domNode.removeChild(domNode.lastChild);
			}
			return domNode;

		case 7:
			var newNodes = patch.s;
			for (var i = 0; i < newNodes.length; i++)
			{
				_VirtualDom_appendChild(domNode, _VirtualDom_render(newNodes[i], patch.u));
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.z;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.v);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Error_throw(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.x, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.v);

	// inserts
	var inserts = data.w;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.z;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.y, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.z;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.y, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}
	// else is normal NODE


	// ATTRIBUTES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	// NODES

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}



// FAKE NAVIGATION


function _Browser_go(n)
{
	return _Scheduler_binding(function(callback)
	{
		if (n !== 0)
		{
			history.go(n);
		}
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


function _Browser_pushState(url)
{
	return _Scheduler_binding(function(callback)
	{
		history.pushState({}, '', url);
		callback(_Scheduler_succeed(_Browser_getUrl()));
	});
}


function _Browser_replaceState(url)
{
	return _Scheduler_binding(function(callback)
	{
		history.replaceState({}, '', url);
		callback(_Scheduler_succeed(_Browser_getUrl()));
	});
}



// REAL NAVIGATION


function _Browser_reload(skipCache)
{
	return _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	});
}

function _Browser_load(url)
{
	return _Scheduler_binding(function(callback)
	{
		try
		{
			window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	});
}



// GET URL


function _Browser_getUrl()
{
	return _VirtualDom_doc.location.href;
}



// DETECT IE11 PROBLEMS


function _Browser_isInternetExplorer11()
{
	return window.navigator.userAgent.indexOf('Trident') !== -1;
}



// INVALID URL


function _Browser_invalidUrl(url)
{
	_Error_throw(1, url);
}


// PROGRAMS


var _Browser_staticPage = F4(function(virtualNode, flagDecoder, debugMetadata, object)
{
	object['embed'] = function(node)
	{
		node.parentNode.replaceChild(
			_VirtualDom_render(virtualNode, function() {}),
			node
		);
	};
	return object;
});


var _Debugger_embed;

var _Browser_embed = _Debugger_embed || F4(function(impl, flagDecoder, debugMetadata, object)
{
	object['embed'] = function(node, flags)
	{
		return _Platform_initialize(
			flagDecoder,
			flags,
			impl.init,
			impl.update,
			impl.subscriptions,
			_Browser_makeStepperBuilder(node, impl.view)
		);
	};
	return object;
});

var _Debugger_fullscreen;

var _Browser_fullscreen = _Debugger_fullscreen || F4(function(impl, flagDecoder, debugMetadata, object)
{
	object['fullscreen'] = function(flags)
	{
		return _Platform_initialize(
			A2(elm_lang$json$Json$Decode$map, _Browser_toEnv, flagDecoder),
			flags,
			impl.init,
			impl.update,
			impl.subscriptions,
			_Browser_makeStepperBuilder(_VirtualDom_doc.body, function(model) {
				var ui = impl.view(model);
				if (_VirtualDom_doc.title !== ui.title)
				{
					_VirtualDom_doc.title = ui.title;
				}
				return _VirtualDom_node('body')(_List_Nil)(ui.body);
			})
		);
	};
	return object;
});


function _Browser_toEnv(flags)
{
	return {
		url: _Browser_getUrl(),
		flags: flags
	};
}



// RENDERER


function _Browser_makeStepperBuilder(domNode, view)
{
	return function(sendToApp, initialModel)
	{
		var currNode = _VirtualDom_virtualize(domNode);

		return _Browser_makeAnimator(initialModel, function(model)
		{
			var nextNode = view(model);
			var patches = _VirtualDom_diff(currNode, nextNode);
			domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
			currNode = nextNode;
		});
	};
}



// ANIMATION


var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function()
		{
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail(elm_lang$browser$Browser$NotFound(id))
			);
		});
	});
}


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// SCROLLING


function _Browser_getScroll(id)
{
	return _Browser_withNode(id, function(node) {
		return _Utils_Tuple2(node.scrollLeft, node.scrollTop);
	});
}

var _Browser_setPositiveScroll = F3(function(scroll, id, offset)
{
	return _Browser_withNode(id, function(node) {
		node[scroll] = offset;
		return _Utils_Tuple0;
	});
});

var _Browser_setNegativeScroll = F4(function(scroll, scrollMax, id, offset)
{
	return _Browser_withNode(id, function(node) {
		node[scroll] = node[scrollMax] - offset;
		return _Utils_Tuple0;
	});
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_document = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F4(function(node, passive, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: passive });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return elm_lang$core$Result$isOk(result)
		? (result.a.b && event.preventDefault(), elm_lang$core$Maybe$Just(result.a.a))
		: elm_lang$core$Maybe$Nothing
});

// CREATE

var _Regex_never = /.^/;

var _Regex_fromStringWith = F2(function(options, string)
{
	var flags = 'g';
	if (options.multiline) { flags += 'm'; }
	if (options.caseInsensitive) { flags += 'i'; }

	try
	{
		return elm_lang$core$Maybe$Just(new RegExp(string, flags));
	}
	catch(error)
	{
		return elm_lang$core$Maybe$Nothing;
	}
});


// USE

var _Regex_contains = F2(function(re, string)
{
	return string.match(re) !== null;
});


var _Regex_findAtMost = F3(function(n, re, str)
{
	var out = [];
	var number = 0;
	var string = str;
	var lastIndex = re.lastIndex;
	var prevLastIndex = -1;
	var result;
	while (number++ < n && (result = re.exec(string)))
	{
		if (prevLastIndex == re.lastIndex) break;
		var i = result.length - 1;
		var subs = new Array(i);
		while (i > 0)
		{
			var submatch = result[i];
			subs[--i] = submatch
				? elm_lang$core$Maybe$Just(submatch)
				: elm_lang$core$Maybe$Nothing;
		}
		out.push(A4(elm_lang$regex$Regex$Match, result[0], result.index, number, _List_fromArray(subs)));
		prevLastIndex = re.lastIndex;
	}
	re.lastIndex = lastIndex;
	return _List_fromArray(out);
});


var _Regex_replaceAtMost = F4(function(n, re, replacer, string)
{
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
			submatches[--i] = submatch
				? elm_lang$core$Maybe$Just(submatch)
				: elm_lang$core$Maybe$Nothing;
		}
		return replacer(A4(elm_lang$regex$Regex$Match, match, arguments[arguments.length - 2], count, _List_fromArray(submatches)));
	}
	return string.replace(re, jsReplacer);
});

var _Regex_splitAtMost = F3(function(n, re, str)
{
	var string = str;
	var out = [];
	var start = re.lastIndex;
	var restoreLastIndex = re.lastIndex;
	while (n--)
	{
		var result = re.exec(string);
		if (!result) break;
		out.push(string.slice(start, result.index));
		start = re.lastIndex;
	}
	out.push(string.slice(start));
	re.lastIndex = restoreLastIndex;
	return _List_fromArray(out);
});

var _Regex_infinity = Infinity;




// VIRTUAL-DOM WIDGETS


var _Markdown_toHtml = F3(function(options, factList, rawMarkdown)
{
	return _VirtualDom_custom(
		factList,
		{
			a: options,
			b: rawMarkdown
		},
		_Markdown_render,
		_Markdown_diff
	);
});



// WIDGET IMPLEMENTATION


function _Markdown_render(model)
{
	return A2(_Markdown_replace, model, _VirtualDom_doc.createElement('div'));
}


function _Markdown_diff(x, y)
{
	return x.b === y.b && x.a === y.a
		? false
		: _Markdown_replace(y);
}


var _Markdown_replace = F2(function(model, div)
{
	div.innerHTML = _Markdown_marked(model.b, _Markdown_formatOptions(model.a));
	return div;
});



// ACTUAL MARKDOWN PARSER


var _Markdown_marked = function() {
	// catch the `marked` object regardless of the outer environment.
	// (ex. a CommonJS module compatible environment.)
	// note that this depends on marked's implementation of environment detection.
	var module = {};
	var exports = module.exports = {};

	/**
	 * marked - a markdown parser
	 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
	 * https://github.com/chjj/marked
	 * commit cd2f6f5b7091154c5526e79b5f3bfb4d15995a51
	 */
	(function(){var block={newline:/^\n+/,code:/^( {4}[^\n]+\n*)+/,fences:noop,hr:/^( *[-*_]){3,} *(?:\n+|$)/,heading:/^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,nptable:noop,lheading:/^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,blockquote:/^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,list:/^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,html:/^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,table:noop,paragraph:/^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,text:/^[^\n]+/};block.bullet=/(?:[*+-]|\d+\.)/;block.item=/^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;block.item=replace(block.item,"gm")(/bull/g,block.bullet)();block.list=replace(block.list)(/bull/g,block.bullet)("hr","\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))")("def","\\n+(?="+block.def.source+")")();block.blockquote=replace(block.blockquote)("def",block.def)();block._tag="(?!(?:"+"a|em|strong|small|s|cite|q|dfn|abbr|data|time|code"+"|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo"+"|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b";block.html=replace(block.html)("comment",/<!--[\s\S]*?-->/)("closed",/<(tag)[\s\S]+?<\/\1>/)("closing",/<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)(/tag/g,block._tag)();block.paragraph=replace(block.paragraph)("hr",block.hr)("heading",block.heading)("lheading",block.lheading)("blockquote",block.blockquote)("tag","<"+block._tag)("def",block.def)();block.normal=merge({},block);block.gfm=merge({},block.normal,{fences:/^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\s*\1 *(?:\n+|$)/,paragraph:/^/,heading:/^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/});block.gfm.paragraph=replace(block.paragraph)("(?!","(?!"+block.gfm.fences.source.replace("\\1","\\2")+"|"+block.list.source.replace("\\1","\\3")+"|")();block.tables=merge({},block.gfm,{nptable:/^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,table:/^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/});function Lexer(options){this.tokens=[];this.tokens.links={};this.options=options||marked.defaults;this.rules=block.normal;if(this.options.gfm){if(this.options.tables){this.rules=block.tables}else{this.rules=block.gfm}}}Lexer.rules=block;Lexer.lex=function(src,options){var lexer=new Lexer(options);return lexer.lex(src)};Lexer.prototype.lex=function(src){src=src.replace(/\r\n|\r/g,"\n").replace(/\t/g,"    ").replace(/\u00a0/g," ").replace(/\u2424/g,"\n");return this.token(src,true)};Lexer.prototype.token=function(src,top,bq){var src=src.replace(/^ +$/gm,""),next,loose,cap,bull,b,item,space,i,l;while(src){if(cap=this.rules.newline.exec(src)){src=src.substring(cap[0].length);if(cap[0].length>1){this.tokens.push({type:"space"})}}if(cap=this.rules.code.exec(src)){src=src.substring(cap[0].length);cap=cap[0].replace(/^ {4}/gm,"");this.tokens.push({type:"code",text:!this.options.pedantic?cap.replace(/\n+$/,""):cap});continue}if(cap=this.rules.fences.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"code",lang:cap[2],text:cap[3]||""});continue}if(cap=this.rules.heading.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"heading",depth:cap[1].length,text:cap[2]});continue}if(top&&(cap=this.rules.nptable.exec(src))){src=src.substring(cap[0].length);item={type:"table",header:cap[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:cap[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:cap[3].replace(/\n$/,"").split("\n")};for(i=0;i<item.align.length;i++){if(/^ *-+: *$/.test(item.align[i])){item.align[i]="right"}else if(/^ *:-+: *$/.test(item.align[i])){item.align[i]="center"}else if(/^ *:-+ *$/.test(item.align[i])){item.align[i]="left"}else{item.align[i]=null}}for(i=0;i<item.cells.length;i++){item.cells[i]=item.cells[i].split(/ *\| */)}this.tokens.push(item);continue}if(cap=this.rules.lheading.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"heading",depth:cap[2]==="="?1:2,text:cap[1]});continue}if(cap=this.rules.hr.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"hr"});continue}if(cap=this.rules.blockquote.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"blockquote_start"});cap=cap[0].replace(/^ *> ?/gm,"");this.token(cap,top,true);this.tokens.push({type:"blockquote_end"});continue}if(cap=this.rules.list.exec(src)){src=src.substring(cap[0].length);bull=cap[2];this.tokens.push({type:"list_start",ordered:bull.length>1});cap=cap[0].match(this.rules.item);next=false;l=cap.length;i=0;for(;i<l;i++){item=cap[i];space=item.length;item=item.replace(/^ *([*+-]|\d+\.) +/,"");if(~item.indexOf("\n ")){space-=item.length;item=!this.options.pedantic?item.replace(new RegExp("^ {1,"+space+"}","gm"),""):item.replace(/^ {1,4}/gm,"")}if(this.options.smartLists&&i!==l-1){b=block.bullet.exec(cap[i+1])[0];if(bull!==b&&!(bull.length>1&&b.length>1)){src=cap.slice(i+1).join("\n")+src;i=l-1}}loose=next||/\n\n(?!\s*$)/.test(item);if(i!==l-1){next=item.charAt(item.length-1)==="\n";if(!loose)loose=next}this.tokens.push({type:loose?"loose_item_start":"list_item_start"});this.token(item,false,bq);this.tokens.push({type:"list_item_end"})}this.tokens.push({type:"list_end"});continue}if(cap=this.rules.html.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:this.options.sanitize?"paragraph":"html",pre:!this.options.sanitizer&&(cap[1]==="pre"||cap[1]==="script"||cap[1]==="style"),text:cap[0]});continue}if(!bq&&top&&(cap=this.rules.def.exec(src))){src=src.substring(cap[0].length);this.tokens.links[cap[1].toLowerCase()]={href:cap[2],title:cap[3]};continue}if(top&&(cap=this.rules.table.exec(src))){src=src.substring(cap[0].length);item={type:"table",header:cap[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:cap[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:cap[3].replace(/(?: *\| *)?\n$/,"").split("\n")};for(i=0;i<item.align.length;i++){if(/^ *-+: *$/.test(item.align[i])){item.align[i]="right"}else if(/^ *:-+: *$/.test(item.align[i])){item.align[i]="center"}else if(/^ *:-+ *$/.test(item.align[i])){item.align[i]="left"}else{item.align[i]=null}}for(i=0;i<item.cells.length;i++){item.cells[i]=item.cells[i].replace(/^ *\| *| *\| *$/g,"").split(/ *\| */)}this.tokens.push(item);continue}if(top&&(cap=this.rules.paragraph.exec(src))){src=src.substring(cap[0].length);this.tokens.push({type:"paragraph",text:cap[1].charAt(cap[1].length-1)==="\n"?cap[1].slice(0,-1):cap[1]});continue}if(cap=this.rules.text.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"text",text:cap[0]});continue}if(src){throw new Error("Infinite loop on byte: "+src.charCodeAt(0))}}return this.tokens};var inline={escape:/^\\([\\`*{}\[\]()#+\-.!_>])/,autolink:/^<([^ >]+(@|:\/)[^ >]+)>/,url:noop,tag:/^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,link:/^!?\[(inside)\]\(href\)/,reflink:/^!?\[(inside)\]\s*\[([^\]]*)\]/,nolink:/^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,strong:/^_\_([\s\S]+?)_\_(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,em:/^\b_((?:[^_]|_\_)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,code:/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,br:/^ {2,}\n(?!\s*$)/,del:noop,text:/^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/};inline._inside=/(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/;inline._href=/\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;inline.link=replace(inline.link)("inside",inline._inside)("href",inline._href)();inline.reflink=replace(inline.reflink)("inside",inline._inside)();inline.normal=merge({},inline);inline.pedantic=merge({},inline.normal,{strong:/^_\_(?=\S)([\s\S]*?\S)_\_(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,em:/^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/});inline.gfm=merge({},inline.normal,{escape:replace(inline.escape)("])","~|])")(),url:/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,del:/^~~(?=\S)([\s\S]*?\S)~~/,text:replace(inline.text)("]|","~]|")("|","|https?://|")()});inline.breaks=merge({},inline.gfm,{br:replace(inline.br)("{2,}","*")(),text:replace(inline.gfm.text)("{2,}","*")()});function InlineLexer(links,options){this.options=options||marked.defaults;this.links=links;this.rules=inline.normal;this.renderer=this.options.renderer||new Renderer;this.renderer.options=this.options;if(!this.links){throw new Error("Tokens array requires a `links` property.")}if(this.options.gfm){if(this.options.breaks){this.rules=inline.breaks}else{this.rules=inline.gfm}}else if(this.options.pedantic){this.rules=inline.pedantic}}InlineLexer.rules=inline;InlineLexer.output=function(src,links,options){var inline=new InlineLexer(links,options);return inline.output(src)};InlineLexer.prototype.output=function(src){var out="",link,text,href,cap;while(src){if(cap=this.rules.escape.exec(src)){src=src.substring(cap[0].length);out+=cap[1];continue}if(cap=this.rules.autolink.exec(src)){src=src.substring(cap[0].length);if(cap[2]==="@"){text=cap[1].charAt(6)===":"?this.mangle(cap[1].substring(7)):this.mangle(cap[1]);href=this.mangle("mailto:")+text}else{text=escape(cap[1]);href=text}out+=this.renderer.link(href,null,text);continue}if(!this.inLink&&(cap=this.rules.url.exec(src))){src=src.substring(cap[0].length);text=escape(cap[1]);href=text;out+=this.renderer.link(href,null,text);continue}if(cap=this.rules.tag.exec(src)){if(!this.inLink&&/^<a /i.test(cap[0])){this.inLink=true}else if(this.inLink&&/^<\/a>/i.test(cap[0])){this.inLink=false}src=src.substring(cap[0].length);out+=this.options.sanitize?this.options.sanitizer?this.options.sanitizer(cap[0]):escape(cap[0]):cap[0];continue}if(cap=this.rules.link.exec(src)){src=src.substring(cap[0].length);this.inLink=true;out+=this.outputLink(cap,{href:cap[2],title:cap[3]});this.inLink=false;continue}if((cap=this.rules.reflink.exec(src))||(cap=this.rules.nolink.exec(src))){src=src.substring(cap[0].length);link=(cap[2]||cap[1]).replace(/\s+/g," ");link=this.links[link.toLowerCase()];if(!link||!link.href){out+=cap[0].charAt(0);src=cap[0].substring(1)+src;continue}this.inLink=true;out+=this.outputLink(cap,link);this.inLink=false;continue}if(cap=this.rules.strong.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.strong(this.output(cap[2]||cap[1]));continue}if(cap=this.rules.em.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.em(this.output(cap[2]||cap[1]));continue}if(cap=this.rules.code.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.codespan(escape(cap[2],true));continue}if(cap=this.rules.br.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.br();continue}if(cap=this.rules.del.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.del(this.output(cap[1]));continue}if(cap=this.rules.text.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.text(escape(this.smartypants(cap[0])));continue}if(src){throw new Error("Infinite loop on byte: "+src.charCodeAt(0))}}return out};InlineLexer.prototype.outputLink=function(cap,link){var href=escape(link.href),title=link.title?escape(link.title):null;return cap[0].charAt(0)!=="!"?this.renderer.link(href,title,this.output(cap[1])):this.renderer.image(href,title,escape(cap[1]))};InlineLexer.prototype.smartypants=function(text){if(!this.options.smartypants)return text;return text.replace(/---/g,"—").replace(/--/g,"–").replace(/(^|[-\u2014\/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014\/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…")};InlineLexer.prototype.mangle=function(text){if(!this.options.mangle)return text;var out="",l=text.length,i=0,ch;for(;i<l;i++){ch=text.charCodeAt(i);if(Math.random()>.5){ch="x"+ch.toString(16)}out+="&#"+ch+";"}return out};function Renderer(options){this.options=options||{}}Renderer.prototype.code=function(code,lang,escaped){if(this.options.highlight){var out=this.options.highlight(code,lang);if(out!=null&&out!==code){escaped=true;code=out}}if(!lang){return"<pre><code>"+(escaped?code:escape(code,true))+"\n</code></pre>"}return'<pre><code class="'+this.options.langPrefix+escape(lang,true)+'">'+(escaped?code:escape(code,true))+"\n</code></pre>\n"};Renderer.prototype.blockquote=function(quote){return"<blockquote>\n"+quote+"</blockquote>\n"};Renderer.prototype.html=function(html){return html};Renderer.prototype.heading=function(text,level,raw){return"<h"+level+' id="'+this.options.headerPrefix+raw.toLowerCase().replace(/[^\w]+/g,"-")+'">'+text+"</h"+level+">\n"};Renderer.prototype.hr=function(){return this.options.xhtml?"<hr/>\n":"<hr>\n"};Renderer.prototype.list=function(body,ordered){var type=ordered?"ol":"ul";return"<"+type+">\n"+body+"</"+type+">\n"};Renderer.prototype.listitem=function(text){return"<li>"+text+"</li>\n"};Renderer.prototype.paragraph=function(text){return"<p>"+text+"</p>\n"};Renderer.prototype.table=function(header,body){return"<table>\n"+"<thead>\n"+header+"</thead>\n"+"<tbody>\n"+body+"</tbody>\n"+"</table>\n"};Renderer.prototype.tablerow=function(content){return"<tr>\n"+content+"</tr>\n"};Renderer.prototype.tablecell=function(content,flags){var type=flags.header?"th":"td";var tag=flags.align?"<"+type+' style="text-align:'+flags.align+'">':"<"+type+">";return tag+content+"</"+type+">\n"};Renderer.prototype.strong=function(text){return"<strong>"+text+"</strong>"};Renderer.prototype.em=function(text){return"<em>"+text+"</em>"};Renderer.prototype.codespan=function(text){return"<code>"+text+"</code>"};Renderer.prototype.br=function(){return this.options.xhtml?"<br/>":"<br>"};Renderer.prototype.del=function(text){return"<del>"+text+"</del>"};Renderer.prototype.link=function(href,title,text){if(this.options.sanitize){try{var prot=decodeURIComponent(unescape(href)).replace(/[^\w:]/g,"").toLowerCase()}catch(e){return""}if(prot.indexOf("javascript:")===0||prot.indexOf("vbscript:")===0||prot.indexOf("data:")===0){return""}}var out='<a href="'+href+'"';if(title){out+=' title="'+title+'"'}out+=">"+text+"</a>";return out};Renderer.prototype.image=function(href,title,text){var out='<img src="'+href+'" alt="'+text+'"';if(title){out+=' title="'+title+'"'}out+=this.options.xhtml?"/>":">";return out};Renderer.prototype.text=function(text){return text};function Parser(options){this.tokens=[];this.token=null;this.options=options||marked.defaults;this.options.renderer=this.options.renderer||new Renderer;this.renderer=this.options.renderer;this.renderer.options=this.options}Parser.parse=function(src,options,renderer){var parser=new Parser(options,renderer);return parser.parse(src)};Parser.prototype.parse=function(src){this.inline=new InlineLexer(src.links,this.options,this.renderer);this.tokens=src.reverse();var out="";while(this.next()){out+=this.tok()}return out};Parser.prototype.next=function(){return this.token=this.tokens.pop()};Parser.prototype.peek=function(){return this.tokens[this.tokens.length-1]||0};Parser.prototype.parseText=function(){var body=this.token.text;while(this.peek().type==="text"){body+="\n"+this.next().text}return this.inline.output(body)};Parser.prototype.tok=function(){switch(this.token.type){case"space":{return""}case"hr":{return this.renderer.hr()}case"heading":{return this.renderer.heading(this.inline.output(this.token.text),this.token.depth,this.token.text)}case"code":{return this.renderer.code(this.token.text,this.token.lang,this.token.escaped)}case"table":{var header="",body="",i,row,cell,flags,j;cell="";for(i=0;i<this.token.header.length;i++){flags={header:true,align:this.token.align[i]};cell+=this.renderer.tablecell(this.inline.output(this.token.header[i]),{header:true,align:this.token.align[i]})}header+=this.renderer.tablerow(cell);for(i=0;i<this.token.cells.length;i++){row=this.token.cells[i];cell="";for(j=0;j<row.length;j++){cell+=this.renderer.tablecell(this.inline.output(row[j]),{header:false,align:this.token.align[j]})}body+=this.renderer.tablerow(cell)}return this.renderer.table(header,body)}case"blockquote_start":{var body="";while(this.next().type!=="blockquote_end"){body+=this.tok()}return this.renderer.blockquote(body)}case"list_start":{var body="",ordered=this.token.ordered;while(this.next().type!=="list_end"){body+=this.tok()}return this.renderer.list(body,ordered)}case"list_item_start":{var body="";while(this.next().type!=="list_item_end"){body+=this.token.type==="text"?this.parseText():this.tok()}return this.renderer.listitem(body)}case"loose_item_start":{var body="";while(this.next().type!=="list_item_end"){body+=this.tok()}return this.renderer.listitem(body)}case"html":{var html=!this.token.pre&&!this.options.pedantic?this.inline.output(this.token.text):this.token.text;return this.renderer.html(html)}case"paragraph":{return this.renderer.paragraph(this.inline.output(this.token.text))}case"text":{return this.renderer.paragraph(this.parseText())}}};function escape(html,encode){return html.replace(!encode?/&(?!#?\w+;)/g:/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function unescape(html){return html.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/g,function(_,n){n=n.toLowerCase();if(n==="colon")return":";if(n.charAt(0)==="#"){return n.charAt(1)==="x"?String.fromCharCode(parseInt(n.substring(2),16)):String.fromCharCode(+n.substring(1))}return""})}function replace(regex,opt){regex=regex.source;opt=opt||"";return function self(name,val){if(!name)return new RegExp(regex,opt);val=val.source||val;val=val.replace(/(^|[^\[])\^/g,"$1");regex=regex.replace(name,val);return self}}function noop(){}noop.exec=noop;function merge(obj){var i=1,target,key;for(;i<arguments.length;i++){target=arguments[i];for(key in target){if(Object.prototype.hasOwnProperty.call(target,key)){obj[key]=target[key]}}}return obj}function marked(src,opt,callback){if(callback||typeof opt==="function"){if(!callback){callback=opt;opt=null}opt=merge({},marked.defaults,opt||{});var highlight=opt.highlight,tokens,pending,i=0;try{tokens=Lexer.lex(src,opt)}catch(e){return callback(e)}pending=tokens.length;var done=function(err){if(err){opt.highlight=highlight;return callback(err)}var out;try{out=Parser.parse(tokens,opt)}catch(e){err=e}opt.highlight=highlight;return err?callback(err):callback(null,out)};if(!highlight||highlight.length<3){return done()}delete opt.highlight;if(!pending)return done();for(;i<tokens.length;i++){(function(token){if(token.type!=="code"){return--pending||done()}return highlight(token.text,token.lang,function(err,code){if(err)return done(err);if(code==null||code===token.text){return--pending||done()}token.text=code;token.escaped=true;--pending||done()})})(tokens[i])}return}try{if(opt)opt=merge({},marked.defaults,opt);return Parser.parse(Lexer.lex(src,opt),opt)}catch(e){e.message+="\nPlease report this to https://github.com/chjj/marked.";if((opt||marked.defaults).silent){return"<p>An error occured:</p><pre>"+escape(e.message+"",true)+"</pre>"}throw e}}marked.options=marked.setOptions=function(opt){merge(marked.defaults,opt);return marked};marked.defaults={gfm:true,tables:true,breaks:false,pedantic:false,sanitize:false,sanitizer:null,mangle:true,smartLists:false,silent:false,highlight:null,langPrefix:"lang-",smartypants:false,headerPrefix:"",renderer:new Renderer,xhtml:false};marked.Parser=Parser;marked.parser=Parser.parse;marked.Renderer=Renderer;marked.Lexer=Lexer;marked.lexer=Lexer.lex;marked.InlineLexer=InlineLexer;marked.inlineLexer=InlineLexer.output;marked.parse=marked;if(typeof module!=="undefined"&&typeof exports==="object"){module.exports=marked}else if(typeof define==="function"&&define.amd){define(function(){return marked})}else{this.marked=marked}}).call(function(){return this||(typeof window!=="undefined"?window:global)}());

	return module.exports;
}();


// FORMAT OPTIONS FOR MARKED IMPLEMENTATION

function _Markdown_formatOptions(options)
{
	function toHighlight(code, lang)
	{
		if (!lang && elm_lang$core$Maybe$isJust(options.defaultHighlighting))
		{
			lang = options.defaultHighlighting.a;
		}

		if (typeof hljs !== 'undefined' && lang && hljs.listLanguages().indexOf(lang) >= 0)
		{
			return hljs.highlight(lang, code, true).value;
		}

		return code;
	}

	var gfm = options.githubFlavored.a;

	return {
		highlight: toHighlight,
		gfm: gfm,
		tables: gfm && gfm.tables,
		breaks: gfm && gfm.breaks,
		sanitize: options.sanitize,
		smartypants: options.smartypants
	};
}
var author$project$Main$Loaded = function (a) {
	return {$: 'Loaded', a: a};
};
var elm_lang$core$Array$branchFactor = 32;
var elm_lang$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var elm_lang$core$Basics$EQ = {$: 'EQ'};
var elm_lang$core$Basics$GT = {$: 'GT'};
var elm_lang$core$Basics$LT = {$: 'LT'};
var elm_lang$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3(elm_lang$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var elm_lang$core$List$cons = _List_cons;
var elm_lang$core$Dict$toList = function (dict) {
	return A3(
		elm_lang$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					elm_lang$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var elm_lang$core$Dict$keys = function (dict) {
	return A3(
		elm_lang$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2(elm_lang$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var elm_lang$core$Set$toList = function (_n0) {
	var dict = _n0.a;
	return elm_lang$core$Dict$keys(dict);
};
var elm_lang$core$Elm$JsArray$foldr = _JsArray_foldr;
var elm_lang$core$Array$foldr = F3(
	function (func, baseCase, _n0) {
		var tree = _n0.c;
		var tail = _n0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3(elm_lang$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3(elm_lang$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			elm_lang$core$Elm$JsArray$foldr,
			helper,
			A3(elm_lang$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var elm_lang$core$Array$toList = function (array) {
	return A3(elm_lang$core$Array$foldr, elm_lang$core$List$cons, _List_Nil, array);
};
var elm_lang$core$Basics$ceiling = _Basics_ceiling;
var elm_lang$core$Basics$fdiv = _Basics_fdiv;
var elm_lang$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(_Basics_e);
	});
var elm_lang$core$Basics$toFloat = _Basics_toFloat;
var elm_lang$core$Array$shiftStep = elm_lang$core$Basics$ceiling(
	A2(elm_lang$core$Basics$logBase, 2, elm_lang$core$Array$branchFactor));
var elm_lang$core$Elm$JsArray$empty = _JsArray_empty;
var elm_lang$core$Array$empty = A4(elm_lang$core$Array$Array_elm_builtin, 0, elm_lang$core$Array$shiftStep, elm_lang$core$Elm$JsArray$empty, elm_lang$core$Elm$JsArray$empty);
var elm_lang$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var elm_lang$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var elm_lang$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var elm_lang$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var elm_lang$core$List$reverse = function (list) {
	return A3(elm_lang$core$List$foldl, elm_lang$core$List$cons, _List_Nil, list);
};
var elm_lang$core$Array$compressNodes = F2(
	function (nodes, acc) {
		var _n0 = A2(elm_lang$core$Elm$JsArray$initializeFromList, elm_lang$core$Array$branchFactor, nodes);
		var node = _n0.a;
		var remainingNodes = _n0.b;
		var newAcc = A2(
			elm_lang$core$List$cons,
			elm_lang$core$Array$SubTree(node),
			acc);
		if (!remainingNodes.b) {
			return elm_lang$core$List$reverse(newAcc);
		} else {
			return A2(elm_lang$core$Array$compressNodes, remainingNodes, newAcc);
		}
	});
var elm_lang$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var elm_lang$core$Basics$eq = _Utils_equal;
var elm_lang$core$Tuple$first = function (_n0) {
	var x = _n0.a;
	return x;
};
var elm_lang$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = elm_lang$core$Basics$ceiling(nodeListSize / elm_lang$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2(elm_lang$core$Elm$JsArray$initializeFromList, elm_lang$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2(elm_lang$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var elm_lang$core$Basics$add = _Basics_add;
var elm_lang$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var elm_lang$core$Basics$floor = _Basics_floor;
var elm_lang$core$Basics$gt = _Utils_gt;
var elm_lang$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var elm_lang$core$Basics$mul = _Basics_mul;
var elm_lang$core$Basics$sub = _Basics_sub;
var elm_lang$core$Elm$JsArray$length = _JsArray_length;
var elm_lang$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				elm_lang$core$Array$Array_elm_builtin,
				elm_lang$core$Elm$JsArray$length(builder.tail),
				elm_lang$core$Array$shiftStep,
				elm_lang$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * elm_lang$core$Array$branchFactor;
			var depth = elm_lang$core$Basics$floor(
				A2(elm_lang$core$Basics$logBase, elm_lang$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? elm_lang$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2(elm_lang$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				elm_lang$core$Array$Array_elm_builtin,
				elm_lang$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2(elm_lang$core$Basics$max, 5, depth * elm_lang$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var elm_lang$core$Basics$False = {$: 'False'};
var elm_lang$core$Basics$idiv = _Basics_idiv;
var elm_lang$core$Basics$lt = _Utils_lt;
var elm_lang$core$Elm$JsArray$initialize = _JsArray_initialize;
var elm_lang$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					elm_lang$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / elm_lang$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = elm_lang$core$Array$Leaf(
					A3(elm_lang$core$Elm$JsArray$initialize, elm_lang$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - elm_lang$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2(elm_lang$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var elm_lang$core$Basics$le = _Utils_le;
var elm_lang$core$Basics$remainderBy = _Basics_remainderBy;
var elm_lang$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return elm_lang$core$Array$empty;
		} else {
			var tailLen = len % elm_lang$core$Array$branchFactor;
			var tail = A3(elm_lang$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - elm_lang$core$Array$branchFactor;
			return A5(elm_lang$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var elm_lang$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var elm_lang$core$Maybe$Nothing = {$: 'Nothing'};
var elm_lang$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var elm_lang$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var elm_lang$core$Basics$True = {$: 'True'};
var elm_lang$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var elm_lang$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var elm_lang$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var elm_lang$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var elm_lang$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var elm_lang$json$Json$Decode$succeed = _Json_succeed;
var NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$decode = elm_lang$json$Json$Decode$succeed;
var elm_lang$json$Json$Decode$map2 = _Json_map2;
var NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$custom = elm_lang$json$Json$Decode$map2(elm_lang$core$Basics$apR);
var elm_lang$json$Json$Decode$field = _Json_decodeField;
var NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required = F3(
	function (key, valDecoder, decoder) {
		return A2(
			NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$custom,
			A2(elm_lang$json$Json$Decode$field, key, valDecoder),
			decoder);
	});
var author$project$Data$AuthToken$AuthToken = function (a) {
	return {$: 'AuthToken', a: a};
};
var elm_lang$core$Basics$identity = function (x) {
	return x;
};
var elm_lang$json$Json$Decode$map = _Json_map1;
var elm_lang$json$Json$Decode$string = _Json_decodeString;
var author$project$Data$AuthToken$decoder = A2(elm_lang$json$Json$Decode$map, author$project$Data$AuthToken$AuthToken, elm_lang$json$Json$Decode$string);
var author$project$Data$User$User = F7(
	function (email, token, username, bio, image, createdAt, updatedAt) {
		return {bio: bio, createdAt: createdAt, email: email, image: image, token: token, updatedAt: updatedAt, username: username};
	});
var author$project$Data$User$Photo$UserPhoto = function (a) {
	return {$: 'UserPhoto', a: a};
};
var elm_lang$json$Json$Decode$null = _Json_decodeNull;
var elm_lang$json$Json$Decode$oneOf = _Json_oneOf;
var elm_lang$json$Json$Decode$nullable = function (decoder) {
	return elm_lang$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				elm_lang$json$Json$Decode$null(elm_lang$core$Maybe$Nothing),
				A2(elm_lang$json$Json$Decode$map, elm_lang$core$Maybe$Just, decoder)
			]));
};
var author$project$Data$User$Photo$decoder = A2(
	elm_lang$json$Json$Decode$map,
	author$project$Data$User$Photo$UserPhoto,
	elm_lang$json$Json$Decode$nullable(elm_lang$json$Json$Decode$string));
var author$project$Data$User$Username$Username = function (a) {
	return {$: 'Username', a: a};
};
var author$project$Data$User$Username$decoder = A2(elm_lang$json$Json$Decode$map, author$project$Data$User$Username$Username, elm_lang$json$Json$Decode$string);
var author$project$Data$User$decoder = A3(
	NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
	'updatedAt',
	elm_lang$json$Json$Decode$string,
	A3(
		NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
		'createdAt',
		elm_lang$json$Json$Decode$string,
		A3(
			NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
			'image',
			author$project$Data$User$Photo$decoder,
			A3(
				NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
				'bio',
				elm_lang$json$Json$Decode$nullable(elm_lang$json$Json$Decode$string),
				A3(
					NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
					'username',
					author$project$Data$User$Username$decoder,
					A3(
						NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
						'token',
						author$project$Data$AuthToken$decoder,
						A3(
							NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
							'email',
							elm_lang$json$Json$Decode$string,
							NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$decode(author$project$Data$User$User))))))));
var elm_lang$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var elm_lang$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (maybeValue.$ === 'Just') {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return elm_lang$core$Maybe$Nothing;
		}
	});
var elm_lang$core$Result$toMaybe = function (result) {
	if (result.$ === 'Ok') {
		var v = result.a;
		return elm_lang$core$Maybe$Just(v);
	} else {
		return elm_lang$core$Maybe$Nothing;
	}
};
var elm_lang$json$Json$Decode$decodeString = _Json_runOnString;
var elm_lang$json$Json$Decode$decodeValue = _Json_run;
var author$project$Main$decodeUserFromJson = function (json) {
	return A2(
		elm_lang$core$Maybe$andThen,
		function ($) {
			return elm_lang$core$Result$toMaybe(
				A2(elm_lang$json$Json$Decode$decodeString, author$project$Data$User$decoder, $));
		},
		elm_lang$core$Result$toMaybe(
			A2(elm_lang$json$Json$Decode$decodeValue, elm_lang$json$Json$Decode$string, json)));
};
var author$project$Main$Blank = {$: 'Blank'};
var author$project$Main$initialPage = author$project$Main$Blank;
var author$project$Main$ArticleLoaded = function (a) {
	return {$: 'ArticleLoaded', a: a};
};
var author$project$Main$EditArticleLoaded = F2(
	function (a, b) {
		return {$: 'EditArticleLoaded', a: a, b: b};
	});
var author$project$Main$Editor = F2(
	function (a, b) {
		return {$: 'Editor', a: a, b: b};
	});
var author$project$Main$HomeLoaded = function (a) {
	return {$: 'HomeLoaded', a: a};
};
var author$project$Main$Login = function (a) {
	return {$: 'Login', a: a};
};
var author$project$Main$NotFound = {$: 'NotFound'};
var author$project$Main$ProfileLoaded = F2(
	function (a, b) {
		return {$: 'ProfileLoaded', a: a, b: b};
	});
var author$project$Main$Register = function (a) {
	return {$: 'Register', a: a};
};
var author$project$Main$Settings = function (a) {
	return {$: 'Settings', a: a};
};
var author$project$Main$TransitioningFrom = function (a) {
	return {$: 'TransitioningFrom', a: a};
};
var author$project$Main$getCurrentPage = function (pageState) {
	if (pageState.$ === 'Loaded') {
		var page = pageState.a;
		return page;
	} else {
		var page = pageState.a;
		return page;
	}
};
var author$project$Main$Errored = function (a) {
	return {$: 'Errored', a: a};
};
var author$project$Page$Errored$PageLoadError = function (a) {
	return {$: 'PageLoadError', a: a};
};
var author$project$Page$Errored$pageLoadError = F2(
	function (activePage, errorMessage) {
		return author$project$Page$Errored$PageLoadError(
			{activePage: activePage, errorMessage: errorMessage});
	});
var elm_lang$core$Platform$Cmd$batch = _Platform_batch;
var elm_lang$core$Platform$Cmd$none = elm_lang$core$Platform$Cmd$batch(_List_Nil);
var author$project$Main$pageErrored = F3(
	function (model, activePage, errorMessage) {
		var error = A2(author$project$Page$Errored$pageLoadError, activePage, errorMessage);
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{
					pageState: author$project$Main$Loaded(
						author$project$Main$Errored(error))
				}),
			elm_lang$core$Platform$Cmd$none);
	});
var author$project$Page$Article$Model = F5(
	function (errors, commentText, commentInFlight, article, comments) {
		return {article: article, commentInFlight: commentInFlight, commentText: commentText, comments: comments, errors: errors};
	});
var author$project$Data$Article$Article = function (description) {
	return function (slug) {
		return function (title) {
			return function (tags) {
				return function (createdAt) {
					return function (updatedAt) {
						return function (favorited) {
							return function (favoritesCount) {
								return function (author) {
									return function (body) {
										return {author: author, body: body, createdAt: createdAt, description: description, favorited: favorited, favoritesCount: favoritesCount, slug: slug, tags: tags, title: title, updatedAt: updatedAt};
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
var author$project$Data$Article$Author$Author = F4(
	function (username, bio, image, following) {
		return {bio: bio, following: following, image: image, username: username};
	});
var elm_lang$json$Json$Decode$bool = _Json_decodeBool;
var author$project$Data$Article$Author$decoder = A3(
	NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
	'following',
	elm_lang$json$Json$Decode$bool,
	A3(
		NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
		'image',
		author$project$Data$User$Photo$decoder,
		A3(
			NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
			'bio',
			elm_lang$json$Json$Decode$nullable(elm_lang$json$Json$Decode$string),
			A3(
				NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
				'username',
				author$project$Data$User$Username$decoder,
				NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$decode(author$project$Data$Article$Author$Author)))));
var author$project$Data$Article$Slug$Slug = function (a) {
	return {$: 'Slug', a: a};
};
var author$project$Data$Article$Slug$decoder = A2(elm_lang$json$Json$Decode$map, author$project$Data$Article$Slug$Slug, elm_lang$json$Json$Decode$string);
var elm_lang$time$Time$Posix = function (a) {
	return {$: 'Posix', a: a};
};
var elm_lang$time$Time$millisToPosix = elm_lang$time$Time$Posix;
var author$project$Iso8601$fromParts = F6(
	function (monthYearDayMs, hour, minute, second, ms, utcOffsetMinutes) {
		return elm_lang$time$Time$millisToPosix((((monthYearDayMs + (((hour * 60) * 60) * 1000)) + (((minute - utcOffsetMinutes) * 60) * 1000)) + (second * 1000)) + ms);
	});
var elm_lang$core$Basics$append = _Utils_append;
var elm_lang$core$Basics$and = _Basics_and;
var elm_lang$core$Char$toCode = _Char_toCode;
var elm_lang$core$Char$isDigit = function (_char) {
	var code = elm_lang$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var elm_lang$core$String$fromInt = _String_fromNumber;
var elm_lang$core$String$length = _String_length;
var elm_lang$core$String$toInt = _String_toInt;
var elm_lang$core$Basics$or = _Basics_or;
var elm_lang$parser$Parser$Advanced$Bad = F2(
	function (a, b) {
		return {$: 'Bad', a: a, b: b};
	});
var elm_lang$parser$Parser$Advanced$Good = F3(
	function (a, b, c) {
		return {$: 'Good', a: a, b: b, c: c};
	});
var elm_lang$parser$Parser$Advanced$Parser = function (a) {
	return {$: 'Parser', a: a};
};
var elm_lang$parser$Parser$Advanced$andThen = F2(
	function (callback, _n0) {
		var parseA = _n0.a;
		return elm_lang$parser$Parser$Advanced$Parser(
			function (s0) {
				var _n1 = parseA(s0);
				if (_n1.$ === 'Bad') {
					var p = _n1.a;
					var x = _n1.b;
					return A2(elm_lang$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p1 = _n1.a;
					var a = _n1.b;
					var s1 = _n1.c;
					var _n2 = callback(a);
					var parseB = _n2.a;
					var _n3 = parseB(s1);
					if (_n3.$ === 'Bad') {
						var p2 = _n3.a;
						var x = _n3.b;
						return A2(elm_lang$parser$Parser$Advanced$Bad, p1 || p2, x);
					} else {
						var p2 = _n3.a;
						var b = _n3.b;
						var s2 = _n3.c;
						return A3(elm_lang$parser$Parser$Advanced$Good, p1 || p2, b, s2);
					}
				}
			});
	});
var elm_lang$parser$Parser$andThen = elm_lang$parser$Parser$Advanced$andThen;
var elm_lang$core$Basics$negate = function (n) {
	return -n;
};
var elm_lang$parser$Parser$Advanced$isSubChar = _Parser_isSubChar;
var elm_lang$parser$Parser$Advanced$chompWhileHelp = F5(
	function (isGood, offset, row, col, s0) {
		chompWhileHelp:
		while (true) {
			var newOffset = A3(elm_lang$parser$Parser$Advanced$isSubChar, isGood, offset, s0.src);
			if (_Utils_eq(newOffset, -1)) {
				return A3(
					elm_lang$parser$Parser$Advanced$Good,
					_Utils_cmp(s0.offset, offset) < 0,
					_Utils_Tuple0,
					{col: col, context: s0.context, indent: s0.indent, offset: offset, row: row, src: s0.src});
			} else {
				if (_Utils_eq(newOffset, -2)) {
					var $temp$isGood = isGood,
						$temp$offset = offset + 1,
						$temp$row = row + 1,
						$temp$col = 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				} else {
					var $temp$isGood = isGood,
						$temp$offset = newOffset,
						$temp$row = row,
						$temp$col = col + 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				}
			}
		}
	});
var elm_lang$parser$Parser$Advanced$chompWhile = function (isGood) {
	return elm_lang$parser$Parser$Advanced$Parser(
		function (s) {
			return A5(elm_lang$parser$Parser$Advanced$chompWhileHelp, isGood, s.offset, s.row, s.col, s);
		});
};
var elm_lang$parser$Parser$chompWhile = elm_lang$parser$Parser$Advanced$chompWhile;
var elm_lang$core$Basics$always = F2(
	function (a, _n0) {
		return a;
	});
var elm_lang$core$String$slice = _String_slice;
var elm_lang$parser$Parser$Advanced$mapChompedString = F2(
	function (func, _n0) {
		var parse = _n0.a;
		return elm_lang$parser$Parser$Advanced$Parser(
			function (s0) {
				var _n1 = parse(s0);
				if (_n1.$ === 'Bad') {
					var p = _n1.a;
					var x = _n1.b;
					return A2(elm_lang$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p = _n1.a;
					var a = _n1.b;
					var s1 = _n1.c;
					return A3(
						elm_lang$parser$Parser$Advanced$Good,
						p,
						A2(
							func,
							A3(elm_lang$core$String$slice, s0.offset, s1.offset, s0.src),
							a),
						s1);
				}
			});
	});
var elm_lang$parser$Parser$Advanced$getChompedString = function (parser) {
	return A2(elm_lang$parser$Parser$Advanced$mapChompedString, elm_lang$core$Basics$always, parser);
};
var elm_lang$parser$Parser$getChompedString = elm_lang$parser$Parser$Advanced$getChompedString;
var elm_lang$parser$Parser$Problem = function (a) {
	return {$: 'Problem', a: a};
};
var elm_lang$parser$Parser$Advanced$AddRight = F2(
	function (a, b) {
		return {$: 'AddRight', a: a, b: b};
	});
var elm_lang$parser$Parser$Advanced$Empty = {$: 'Empty'};
var elm_lang$parser$Parser$Advanced$Problem = F4(
	function (row, col, problem, contextStack) {
		return {col: col, contextStack: contextStack, problem: problem, row: row};
	});
var elm_lang$parser$Parser$Advanced$fromState = F2(
	function (s, x) {
		return A2(
			elm_lang$parser$Parser$Advanced$AddRight,
			elm_lang$parser$Parser$Advanced$Empty,
			A4(elm_lang$parser$Parser$Advanced$Problem, s.row, s.col, x, s.context));
	});
var elm_lang$parser$Parser$Advanced$problem = function (x) {
	return elm_lang$parser$Parser$Advanced$Parser(
		function (s) {
			return A2(
				elm_lang$parser$Parser$Advanced$Bad,
				false,
				A2(elm_lang$parser$Parser$Advanced$fromState, s, x));
		});
};
var elm_lang$parser$Parser$problem = function (msg) {
	return elm_lang$parser$Parser$Advanced$problem(
		elm_lang$parser$Parser$Problem(msg));
};
var elm_lang$parser$Parser$Advanced$succeed = function (a) {
	return elm_lang$parser$Parser$Advanced$Parser(
		function (s) {
			return A3(elm_lang$parser$Parser$Advanced$Good, false, a, s);
		});
};
var elm_lang$parser$Parser$succeed = elm_lang$parser$Parser$Advanced$succeed;
var author$project$Iso8601$paddedInt = function (quantity) {
	return A2(
		elm_lang$parser$Parser$andThen,
		function (str) {
			if (_Utils_eq(
				elm_lang$core$String$length(str),
				quantity)) {
				var _n0 = elm_lang$core$String$toInt(str);
				if (_n0.$ === 'Just') {
					var intVal = _n0.a;
					return elm_lang$parser$Parser$succeed(intVal);
				} else {
					return elm_lang$parser$Parser$problem('Invalid integer: \"' + (str + '\"'));
				}
			} else {
				return elm_lang$parser$Parser$problem(
					'Expected ' + (elm_lang$core$String$fromInt(quantity) + (' digits, but got ' + elm_lang$core$String$fromInt(
						elm_lang$core$String$length(str)))));
			}
		},
		elm_lang$parser$Parser$getChompedString(
			elm_lang$parser$Parser$chompWhile(elm_lang$core$Char$isDigit)));
};
var author$project$Iso8601$epochYear = 1970;
var author$project$Iso8601$invalidDay = function (day) {
	return elm_lang$parser$Parser$problem(
		'Invalid day: ' + elm_lang$core$String$fromInt(day));
};
var elm_lang$core$Basics$modBy = _Basics_modBy;
var elm_lang$core$Basics$neq = _Utils_notEqual;
var author$project$Iso8601$isLeapYear = function (year) {
	return (!A2(elm_lang$core$Basics$modBy, 4, year)) && (A2(elm_lang$core$Basics$modBy, 100, year) || (!A2(elm_lang$core$Basics$modBy, 400, year)));
};
var author$project$Iso8601$leapYearsBetween = F2(
	function (lower, higher) {
		leapYearsBetween:
		while (true) {
			if (_Utils_eq(lower, higher)) {
				return 0;
			} else {
				if (_Utils_cmp(lower, higher) > 0) {
					var $temp$lower = higher,
						$temp$higher = lower;
					lower = $temp$lower;
					higher = $temp$higher;
					continue leapYearsBetween;
				} else {
					var nonLeapYears = (((lower / 100) | 0) - (((higher - 1) / 100) | 0)) - (((lower / 400) | 0) - (((higher - 1) / 400) | 0));
					var defaultLeapYears = ((lower / 4) | 0) - (((higher - 1) / 4) | 0);
					return defaultLeapYears - nonLeapYears;
				}
			}
		}
	});
var author$project$Iso8601$msPerDay = 86400000;
var author$project$Iso8601$msPerYear = 31536000000;
var elm_lang$core$Basics$not = _Basics_not;
var author$project$Iso8601$yearMonthDay = function (_n0) {
	var year = _n0.a;
	var month = _n0.b;
	var dayInMonth = _n0.c;
	if (dayInMonth < 0) {
		return author$project$Iso8601$invalidDay(dayInMonth);
	} else {
		var succeedWith = function (extraMs) {
			var yearMs = author$project$Iso8601$msPerYear * (year - author$project$Iso8601$epochYear);
			var days = ((month < 3) || (!author$project$Iso8601$isLeapYear(year))) ? (dayInMonth - 1) : dayInMonth;
			var dayMs = author$project$Iso8601$msPerDay * (days + A2(author$project$Iso8601$leapYearsBetween, author$project$Iso8601$epochYear, year));
			return elm_lang$parser$Parser$succeed((extraMs + yearMs) + dayMs);
		};
		switch (month) {
			case 1:
				return (dayInMonth > 31) ? author$project$Iso8601$invalidDay(dayInMonth) : succeedWith(0);
			case 2:
				return ((dayInMonth > 29) || ((dayInMonth === 29) && (!author$project$Iso8601$isLeapYear(year)))) ? author$project$Iso8601$invalidDay(dayInMonth) : succeedWith(2678400000);
			case 3:
				return (dayInMonth > 31) ? author$project$Iso8601$invalidDay(dayInMonth) : succeedWith(5097600000);
			case 4:
				return (dayInMonth > 30) ? author$project$Iso8601$invalidDay(dayInMonth) : succeedWith(7776000000);
			case 5:
				return (dayInMonth > 31) ? author$project$Iso8601$invalidDay(dayInMonth) : succeedWith(10368000000);
			case 6:
				return (dayInMonth > 30) ? author$project$Iso8601$invalidDay(dayInMonth) : succeedWith(13046400000);
			case 7:
				return (dayInMonth > 31) ? author$project$Iso8601$invalidDay(dayInMonth) : succeedWith(15638400000);
			case 8:
				return (dayInMonth > 31) ? author$project$Iso8601$invalidDay(dayInMonth) : succeedWith(18316800000);
			case 9:
				return (dayInMonth > 30) ? author$project$Iso8601$invalidDay(dayInMonth) : succeedWith(20995200000);
			case 10:
				return (dayInMonth > 31) ? author$project$Iso8601$invalidDay(dayInMonth) : succeedWith(23587200000);
			case 11:
				return (dayInMonth > 30) ? author$project$Iso8601$invalidDay(dayInMonth) : succeedWith(26265600000);
			case 12:
				return (dayInMonth > 31) ? author$project$Iso8601$invalidDay(dayInMonth) : succeedWith(28857600000);
			default:
				return elm_lang$parser$Parser$problem(
					'Invalid month: \"' + (elm_lang$core$String$fromInt(month) + '\"'));
		}
	}
};
var elm_lang$parser$Parser$Advanced$map2 = F3(
	function (func, _n0, _n1) {
		var parseA = _n0.a;
		var parseB = _n1.a;
		return elm_lang$parser$Parser$Advanced$Parser(
			function (s0) {
				var _n2 = parseA(s0);
				if (_n2.$ === 'Bad') {
					var p = _n2.a;
					var x = _n2.b;
					return A2(elm_lang$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p1 = _n2.a;
					var a = _n2.b;
					var s1 = _n2.c;
					var _n3 = parseB(s1);
					if (_n3.$ === 'Bad') {
						var p2 = _n3.a;
						var x = _n3.b;
						return A2(elm_lang$parser$Parser$Advanced$Bad, p1 || p2, x);
					} else {
						var p2 = _n3.a;
						var b = _n3.b;
						var s2 = _n3.c;
						return A3(
							elm_lang$parser$Parser$Advanced$Good,
							p1 || p2,
							A2(func, a, b),
							s2);
					}
				}
			});
	});
var elm_lang$parser$Parser$Advanced$ignorer = F2(
	function (keepParser, ignoreParser) {
		return A3(elm_lang$parser$Parser$Advanced$map2, elm_lang$core$Basics$always, keepParser, ignoreParser);
	});
var elm_lang$parser$Parser$ignorer = elm_lang$parser$Parser$Advanced$ignorer;
var elm_lang$parser$Parser$Advanced$keeper = F2(
	function (parseFunc, parseArg) {
		return A3(elm_lang$parser$Parser$Advanced$map2, elm_lang$core$Basics$apL, parseFunc, parseArg);
	});
var elm_lang$parser$Parser$keeper = elm_lang$parser$Parser$Advanced$keeper;
var elm_lang$parser$Parser$ExpectingSymbol = function (a) {
	return {$: 'ExpectingSymbol', a: a};
};
var elm_lang$parser$Parser$Advanced$Token = F2(
	function (a, b) {
		return {$: 'Token', a: a, b: b};
	});
var elm_lang$core$String$isEmpty = function (string) {
	return string === '';
};
var elm_lang$parser$Parser$Advanced$isSubString = _Parser_isSubString;
var elm_lang$parser$Parser$Advanced$token = function (_n0) {
	var str = _n0.a;
	var expecting = _n0.b;
	var progress = !elm_lang$core$String$isEmpty(str);
	return elm_lang$parser$Parser$Advanced$Parser(
		function (s) {
			var _n1 = A5(elm_lang$parser$Parser$Advanced$isSubString, str, s.offset, s.row, s.col, s.src);
			var newOffset = _n1.a;
			var newRow = _n1.b;
			var newCol = _n1.c;
			return _Utils_eq(newOffset, -1) ? A2(
				elm_lang$parser$Parser$Advanced$Bad,
				false,
				A2(elm_lang$parser$Parser$Advanced$fromState, s, expecting)) : A3(
				elm_lang$parser$Parser$Advanced$Good,
				progress,
				_Utils_Tuple0,
				{col: newCol, context: s.context, indent: s.indent, offset: newOffset, row: newRow, src: s.src});
		});
};
var elm_lang$parser$Parser$Advanced$symbol = elm_lang$parser$Parser$Advanced$token;
var elm_lang$parser$Parser$symbol = function (str) {
	return elm_lang$parser$Parser$Advanced$symbol(
		A2(
			elm_lang$parser$Parser$Advanced$Token,
			str,
			elm_lang$parser$Parser$ExpectingSymbol(str)));
};
var author$project$Iso8601$monthYearDayInMs = A2(
	elm_lang$parser$Parser$andThen,
	author$project$Iso8601$yearMonthDay,
	A2(
		elm_lang$parser$Parser$keeper,
		A2(
			elm_lang$parser$Parser$keeper,
			A2(
				elm_lang$parser$Parser$keeper,
				elm_lang$parser$Parser$succeed(
					F3(
						function (year, month, day) {
							return _Utils_Tuple3(year, month, day);
						})),
				A2(
					elm_lang$parser$Parser$ignorer,
					author$project$Iso8601$paddedInt(4),
					elm_lang$parser$Parser$symbol('-'))),
			A2(
				elm_lang$parser$Parser$ignorer,
				author$project$Iso8601$paddedInt(2),
				elm_lang$parser$Parser$symbol('-'))),
		author$project$Iso8601$paddedInt(2)));
var author$project$Iso8601$utcOffsetMinutesFromParts = F3(
	function (multiplier, hours, minutes) {
		return multiplier * ((hours * 60) + minutes);
	});
var elm_lang$parser$Parser$Advanced$map = F2(
	function (func, _n0) {
		var parse = _n0.a;
		return elm_lang$parser$Parser$Advanced$Parser(
			function (s0) {
				var _n1 = parse(s0);
				if (_n1.$ === 'Good') {
					var p = _n1.a;
					var a = _n1.b;
					var s1 = _n1.c;
					return A3(
						elm_lang$parser$Parser$Advanced$Good,
						p,
						func(a),
						s1);
				} else {
					var p = _n1.a;
					var x = _n1.b;
					return A2(elm_lang$parser$Parser$Advanced$Bad, p, x);
				}
			});
	});
var elm_lang$parser$Parser$map = elm_lang$parser$Parser$Advanced$map;
var elm_lang$parser$Parser$Advanced$Append = F2(
	function (a, b) {
		return {$: 'Append', a: a, b: b};
	});
var elm_lang$parser$Parser$Advanced$oneOfHelp = F3(
	function (s0, bag, parsers) {
		oneOfHelp:
		while (true) {
			if (!parsers.b) {
				return A2(elm_lang$parser$Parser$Advanced$Bad, false, bag);
			} else {
				var parse = parsers.a.a;
				var remainingParsers = parsers.b;
				var _n1 = parse(s0);
				if (_n1.$ === 'Good') {
					var step = _n1;
					return step;
				} else {
					var step = _n1;
					var p = step.a;
					var x = step.b;
					if (p) {
						return step;
					} else {
						var $temp$s0 = s0,
							$temp$bag = A2(elm_lang$parser$Parser$Advanced$Append, bag, x),
							$temp$parsers = remainingParsers;
						s0 = $temp$s0;
						bag = $temp$bag;
						parsers = $temp$parsers;
						continue oneOfHelp;
					}
				}
			}
		}
	});
var elm_lang$parser$Parser$Advanced$oneOf = function (parsers) {
	return elm_lang$parser$Parser$Advanced$Parser(
		function (s) {
			return A3(elm_lang$parser$Parser$Advanced$oneOfHelp, s, elm_lang$parser$Parser$Advanced$Empty, parsers);
		});
};
var elm_lang$parser$Parser$oneOf = elm_lang$parser$Parser$Advanced$oneOf;
var author$project$Iso8601$iso8601 = A2(
	elm_lang$parser$Parser$keeper,
	A2(
		elm_lang$parser$Parser$keeper,
		A2(
			elm_lang$parser$Parser$keeper,
			A2(
				elm_lang$parser$Parser$keeper,
				A2(
					elm_lang$parser$Parser$keeper,
					A2(
						elm_lang$parser$Parser$keeper,
						elm_lang$parser$Parser$succeed(author$project$Iso8601$fromParts),
						A2(
							elm_lang$parser$Parser$ignorer,
							author$project$Iso8601$monthYearDayInMs,
							elm_lang$parser$Parser$symbol('T'))),
					A2(
						elm_lang$parser$Parser$ignorer,
						author$project$Iso8601$paddedInt(2),
						elm_lang$parser$Parser$symbol(':'))),
				A2(
					elm_lang$parser$Parser$ignorer,
					author$project$Iso8601$paddedInt(2),
					elm_lang$parser$Parser$symbol(':'))),
			A2(
				elm_lang$parser$Parser$ignorer,
				author$project$Iso8601$paddedInt(2),
				elm_lang$parser$Parser$symbol('.'))),
		author$project$Iso8601$paddedInt(3)),
	elm_lang$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				elm_lang$parser$Parser$map,
				function (_n0) {
					return 0;
				},
				elm_lang$parser$Parser$symbol('Z')),
				A2(
				elm_lang$parser$Parser$keeper,
				A2(
					elm_lang$parser$Parser$keeper,
					A2(
						elm_lang$parser$Parser$keeper,
						elm_lang$parser$Parser$succeed(author$project$Iso8601$utcOffsetMinutesFromParts),
						elm_lang$parser$Parser$oneOf(
							_List_fromArray(
								[
									A2(
									elm_lang$parser$Parser$map,
									function (_n1) {
										return 1;
									},
									elm_lang$parser$Parser$symbol('+')),
									A2(
									elm_lang$parser$Parser$map,
									function (_n2) {
										return -1;
									},
									elm_lang$parser$Parser$symbol('-'))
								]))),
					A2(
						elm_lang$parser$Parser$ignorer,
						author$project$Iso8601$paddedInt(2),
						elm_lang$parser$Parser$symbol(':'))),
				author$project$Iso8601$paddedInt(2))
			])));
var elm_lang$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							elm_lang$core$List$foldl,
							fn,
							acc,
							elm_lang$core$List$reverse(r4)) : A4(elm_lang$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var elm_lang$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4(elm_lang$core$List$foldrHelper, fn, acc, 0, ls);
	});
var elm_lang$core$List$map = F2(
	function (f, xs) {
		return A3(
			elm_lang$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						elm_lang$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var elm_lang$parser$Parser$DeadEnd = F3(
	function (row, col, problem) {
		return {col: col, problem: problem, row: row};
	});
var elm_lang$parser$Parser$problemToDeadEnd = function (p) {
	return A3(elm_lang$parser$Parser$DeadEnd, p.row, p.col, p.problem);
};
var elm_lang$parser$Parser$Advanced$bagToList = F2(
	function (bag, list) {
		bagToList:
		while (true) {
			switch (bag.$) {
				case 'Empty':
					return list;
				case 'AddRight':
					var bag1 = bag.a;
					var x = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2(elm_lang$core$List$cons, x, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
				default:
					var bag1 = bag.a;
					var bag2 = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2(elm_lang$parser$Parser$Advanced$bagToList, bag2, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
			}
		}
	});
var elm_lang$parser$Parser$Advanced$run = F2(
	function (_n0, src) {
		var parse = _n0.a;
		var _n1 = parse(
			{col: 1, context: _List_Nil, indent: 1, offset: 0, row: 1, src: src});
		if (_n1.$ === 'Good') {
			var value = _n1.b;
			return elm_lang$core$Result$Ok(value);
		} else {
			var bag = _n1.b;
			return elm_lang$core$Result$Err(
				A2(elm_lang$parser$Parser$Advanced$bagToList, bag, _List_Nil));
		}
	});
var elm_lang$parser$Parser$run = F2(
	function (parser, source) {
		var _n0 = A2(elm_lang$parser$Parser$Advanced$run, parser, source);
		if (_n0.$ === 'Ok') {
			var a = _n0.a;
			return elm_lang$core$Result$Ok(a);
		} else {
			var problems = _n0.a;
			return elm_lang$core$Result$Err(
				A2(elm_lang$core$List$map, elm_lang$parser$Parser$problemToDeadEnd, problems));
		}
	});
var author$project$Iso8601$toTime = function (str) {
	return A2(elm_lang$parser$Parser$run, author$project$Iso8601$iso8601, str);
};
var elm_lang$json$Json$Decode$fail = _Json_fail;
var author$project$Util$fromResult = F2(
	function (source, result) {
		if (result.$ === 'Ok') {
			var successValue = result.a;
			return elm_lang$json$Json$Decode$succeed(successValue);
		} else {
			return elm_lang$json$Json$Decode$fail('Failed to parse: ' + source);
		}
	});
var elm_lang$json$Json$Decode$andThen = _Json_andThen;
var author$project$Util$dateStringDecoder = A2(
	elm_lang$json$Json$Decode$andThen,
	function (str) {
		return A2(
			author$project$Util$fromResult,
			str,
			author$project$Iso8601$toTime(str));
	},
	elm_lang$json$Json$Decode$string);
var elm_lang$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var elm_lang$json$Json$Decode$int = _Json_decodeInt;
var elm_lang$json$Json$Decode$list = _Json_decodeList;
var author$project$Data$Article$baseArticleDecoder = A3(
	NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
	'author',
	author$project$Data$Article$Author$decoder,
	A3(
		NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
		'favoritesCount',
		elm_lang$json$Json$Decode$int,
		A3(
			NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
			'favorited',
			elm_lang$json$Json$Decode$bool,
			A3(
				NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
				'updatedAt',
				author$project$Util$dateStringDecoder,
				A3(
					NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
					'createdAt',
					author$project$Util$dateStringDecoder,
					A3(
						NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
						'tagList',
						elm_lang$json$Json$Decode$list(elm_lang$json$Json$Decode$string),
						A3(
							NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
							'title',
							elm_lang$json$Json$Decode$string,
							A3(
								NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
								'slug',
								author$project$Data$Article$Slug$decoder,
								A3(
									NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
									'description',
									A2(
										elm_lang$json$Json$Decode$map,
										elm_lang$core$Maybe$withDefault(''),
										elm_lang$json$Json$Decode$nullable(elm_lang$json$Json$Decode$string)),
									NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$decode(author$project$Data$Article$Article))))))))));
var author$project$Data$Article$Body = function (a) {
	return {$: 'Body', a: a};
};
var author$project$Data$Article$bodyDecoder = A2(elm_lang$json$Json$Decode$map, author$project$Data$Article$Body, elm_lang$json$Json$Decode$string);
var author$project$Data$Article$decoderWithBody = A3(NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required, 'body', author$project$Data$Article$bodyDecoder, author$project$Data$Article$baseArticleDecoder);
var author$project$Data$Article$Slug$toString = function (_n0) {
	var slug = _n0.a;
	return slug;
};
var elm_lang$http$Http$Internal$Header = F2(
	function (a, b) {
		return {$: 'Header', a: a, b: b};
	});
var elm_lang$http$Http$header = elm_lang$http$Http$Internal$Header;
var lukewestby$http_builder$HttpBuilder$withHeader = F3(
	function (key, value, builder) {
		return _Utils_update(
			builder,
			{
				headers: A2(
					elm_lang$core$List$cons,
					A2(elm_lang$http$Http$header, key, value),
					builder.headers)
			});
	});
var author$project$Data$AuthToken$withAuthorization = F2(
	function (maybeToken, builder) {
		if (maybeToken.$ === 'Just') {
			var token = maybeToken.a.a;
			return A3(lukewestby$http_builder$HttpBuilder$withHeader, 'authorization', 'Token ' + token, builder);
		} else {
			return builder;
		}
	});
var author$project$Request$Helpers$apiUrl = function (str) {
	return 'https://conduit.productionready.io/api' + str;
};
var elm_lang$core$Dict$LBlack = {$: 'LBlack'};
var elm_lang$core$Dict$RBEmpty_elm_builtin = function (a) {
	return {$: 'RBEmpty_elm_builtin', a: a};
};
var elm_lang$core$Dict$empty = elm_lang$core$Dict$RBEmpty_elm_builtin(elm_lang$core$Dict$LBlack);
var elm_lang$core$Basics$compare = _Utils_compare;
var elm_lang$core$Dict$Insert = {$: 'Insert'};
var elm_lang$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var elm_lang$core$Dict$Red = {$: 'Red'};
var elm_lang$core$Dict$Remove = {$: 'Remove'};
var elm_lang$core$Dict$Same = {$: 'Same'};
var elm_lang$core$Dict$Black = {$: 'Black'};
var elm_lang$core$Dict$NBlack = {$: 'NBlack'};
var elm_lang$core$Dict$lessBlack = function (color) {
	switch (color.$) {
		case 'BBlack':
			return elm_lang$core$Dict$Black;
		case 'Black':
			return elm_lang$core$Dict$Red;
		case 'Red':
			return elm_lang$core$Dict$NBlack;
		default:
			return _Error_dictBug(0);
	}
};
var elm_lang$core$Dict$balancedTree = function (col) {
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
												elm_lang$core$Dict$RBNode_elm_builtin,
												elm_lang$core$Dict$lessBlack(col),
												yk,
												yv,
												A5(elm_lang$core$Dict$RBNode_elm_builtin, elm_lang$core$Dict$Black, xk, xv, a, b),
												A5(elm_lang$core$Dict$RBNode_elm_builtin, elm_lang$core$Dict$Black, zk, zv, c, d));
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
var elm_lang$core$Dict$redden = function (t) {
	if (t.$ === 'RBEmpty_elm_builtin') {
		return _Error_dictBug(0);
	} else {
		var k = t.b;
		var v = t.c;
		var l = t.d;
		var r = t.e;
		return A5(elm_lang$core$Dict$RBNode_elm_builtin, elm_lang$core$Dict$Red, k, v, l, r);
	}
};
var elm_lang$core$Dict$balanceHelp = function (tree) {
	_n0$0:
	while (true) {
		_n0$1:
		while (true) {
			_n0$2:
			while (true) {
				_n0$3:
				while (true) {
					_n0$4:
					while (true) {
						_n0$5:
						while (true) {
							_n0$6:
							while (true) {
								if (tree.$ === 'RBNode_elm_builtin') {
									if (tree.d.$ === 'RBNode_elm_builtin') {
										if (tree.e.$ === 'RBNode_elm_builtin') {
											switch (tree.d.a.$) {
												case 'Red':
													switch (tree.e.a.$) {
														case 'Red':
															if ((tree.d.d.$ === 'RBNode_elm_builtin') && (tree.d.d.a.$ === 'Red')) {
																break _n0$0;
															} else {
																if ((tree.d.e.$ === 'RBNode_elm_builtin') && (tree.d.e.a.$ === 'Red')) {
																	break _n0$1;
																} else {
																	if ((tree.e.d.$ === 'RBNode_elm_builtin') && (tree.e.d.a.$ === 'Red')) {
																		break _n0$2;
																	} else {
																		if ((tree.e.e.$ === 'RBNode_elm_builtin') && (tree.e.e.a.$ === 'Red')) {
																			break _n0$3;
																		} else {
																			break _n0$6;
																		}
																	}
																}
															}
														case 'NBlack':
															if ((tree.d.d.$ === 'RBNode_elm_builtin') && (tree.d.d.a.$ === 'Red')) {
																break _n0$0;
															} else {
																if ((tree.d.e.$ === 'RBNode_elm_builtin') && (tree.d.e.a.$ === 'Red')) {
																	break _n0$1;
																} else {
																	if (((((tree.a.$ === 'BBlack') && (tree.e.d.$ === 'RBNode_elm_builtin')) && (tree.e.d.a.$ === 'Black')) && (tree.e.e.$ === 'RBNode_elm_builtin')) && (tree.e.e.a.$ === 'Black')) {
																		break _n0$4;
																	} else {
																		break _n0$6;
																	}
																}
															}
														default:
															if ((tree.d.d.$ === 'RBNode_elm_builtin') && (tree.d.d.a.$ === 'Red')) {
																break _n0$0;
															} else {
																if ((tree.d.e.$ === 'RBNode_elm_builtin') && (tree.d.e.a.$ === 'Red')) {
																	break _n0$1;
																} else {
																	break _n0$6;
																}
															}
													}
												case 'NBlack':
													switch (tree.e.a.$) {
														case 'Red':
															if ((tree.e.d.$ === 'RBNode_elm_builtin') && (tree.e.d.a.$ === 'Red')) {
																break _n0$2;
															} else {
																if ((tree.e.e.$ === 'RBNode_elm_builtin') && (tree.e.e.a.$ === 'Red')) {
																	break _n0$3;
																} else {
																	if (((((tree.a.$ === 'BBlack') && (tree.d.d.$ === 'RBNode_elm_builtin')) && (tree.d.d.a.$ === 'Black')) && (tree.d.e.$ === 'RBNode_elm_builtin')) && (tree.d.e.a.$ === 'Black')) {
																		break _n0$5;
																	} else {
																		break _n0$6;
																	}
																}
															}
														case 'NBlack':
															if (tree.a.$ === 'BBlack') {
																if ((((tree.e.d.$ === 'RBNode_elm_builtin') && (tree.e.d.a.$ === 'Black')) && (tree.e.e.$ === 'RBNode_elm_builtin')) && (tree.e.e.a.$ === 'Black')) {
																	break _n0$4;
																} else {
																	if ((((tree.d.d.$ === 'RBNode_elm_builtin') && (tree.d.d.a.$ === 'Black')) && (tree.d.e.$ === 'RBNode_elm_builtin')) && (tree.d.e.a.$ === 'Black')) {
																		break _n0$5;
																	} else {
																		break _n0$6;
																	}
																}
															} else {
																break _n0$6;
															}
														default:
															if (((((tree.a.$ === 'BBlack') && (tree.d.d.$ === 'RBNode_elm_builtin')) && (tree.d.d.a.$ === 'Black')) && (tree.d.e.$ === 'RBNode_elm_builtin')) && (tree.d.e.a.$ === 'Black')) {
																break _n0$5;
															} else {
																break _n0$6;
															}
													}
												default:
													switch (tree.e.a.$) {
														case 'Red':
															if ((tree.e.d.$ === 'RBNode_elm_builtin') && (tree.e.d.a.$ === 'Red')) {
																break _n0$2;
															} else {
																if ((tree.e.e.$ === 'RBNode_elm_builtin') && (tree.e.e.a.$ === 'Red')) {
																	break _n0$3;
																} else {
																	break _n0$6;
																}
															}
														case 'NBlack':
															if (((((tree.a.$ === 'BBlack') && (tree.e.d.$ === 'RBNode_elm_builtin')) && (tree.e.d.a.$ === 'Black')) && (tree.e.e.$ === 'RBNode_elm_builtin')) && (tree.e.e.a.$ === 'Black')) {
																break _n0$4;
															} else {
																break _n0$6;
															}
														default:
															break _n0$6;
													}
											}
										} else {
											switch (tree.d.a.$) {
												case 'Red':
													if ((tree.d.d.$ === 'RBNode_elm_builtin') && (tree.d.d.a.$ === 'Red')) {
														break _n0$0;
													} else {
														if ((tree.d.e.$ === 'RBNode_elm_builtin') && (tree.d.e.a.$ === 'Red')) {
															break _n0$1;
														} else {
															break _n0$6;
														}
													}
												case 'NBlack':
													if (((((tree.a.$ === 'BBlack') && (tree.d.d.$ === 'RBNode_elm_builtin')) && (tree.d.d.a.$ === 'Black')) && (tree.d.e.$ === 'RBNode_elm_builtin')) && (tree.d.e.a.$ === 'Black')) {
														break _n0$5;
													} else {
														break _n0$6;
													}
												default:
													break _n0$6;
											}
										}
									} else {
										if (tree.e.$ === 'RBNode_elm_builtin') {
											switch (tree.e.a.$) {
												case 'Red':
													if ((tree.e.d.$ === 'RBNode_elm_builtin') && (tree.e.d.a.$ === 'Red')) {
														break _n0$2;
													} else {
														if ((tree.e.e.$ === 'RBNode_elm_builtin') && (tree.e.e.a.$ === 'Red')) {
															break _n0$3;
														} else {
															break _n0$6;
														}
													}
												case 'NBlack':
													if (((((tree.a.$ === 'BBlack') && (tree.e.d.$ === 'RBNode_elm_builtin')) && (tree.e.d.a.$ === 'Black')) && (tree.e.e.$ === 'RBNode_elm_builtin')) && (tree.e.e.a.$ === 'Black')) {
														break _n0$4;
													} else {
														break _n0$6;
													}
												default:
													break _n0$6;
											}
										} else {
											break _n0$6;
										}
									}
								} else {
									break _n0$6;
								}
							}
							return tree;
						}
						var _n23 = tree.a;
						var zk = tree.b;
						var zv = tree.c;
						var _n24 = tree.d;
						var _n25 = _n24.a;
						var xk = _n24.b;
						var xv = _n24.c;
						var a = _n24.d;
						var _n26 = a.a;
						var _n27 = _n24.e;
						var _n28 = _n27.a;
						var yk = _n27.b;
						var yv = _n27.c;
						var b = _n27.d;
						var c = _n27.e;
						var d = tree.e;
						return A5(
							elm_lang$core$Dict$RBNode_elm_builtin,
							elm_lang$core$Dict$Black,
							yk,
							yv,
							A5(
								elm_lang$core$Dict$balance,
								elm_lang$core$Dict$Black,
								xk,
								xv,
								elm_lang$core$Dict$redden(a),
								b),
							A5(elm_lang$core$Dict$RBNode_elm_builtin, elm_lang$core$Dict$Black, zk, zv, c, d));
					}
					var _n17 = tree.a;
					var xk = tree.b;
					var xv = tree.c;
					var a = tree.d;
					var _n18 = tree.e;
					var _n19 = _n18.a;
					var zk = _n18.b;
					var zv = _n18.c;
					var _n20 = _n18.d;
					var _n21 = _n20.a;
					var yk = _n20.b;
					var yv = _n20.c;
					var b = _n20.d;
					var c = _n20.e;
					var d = _n18.e;
					var _n22 = d.a;
					return A5(
						elm_lang$core$Dict$RBNode_elm_builtin,
						elm_lang$core$Dict$Black,
						yk,
						yv,
						A5(elm_lang$core$Dict$RBNode_elm_builtin, elm_lang$core$Dict$Black, xk, xv, a, b),
						A5(
							elm_lang$core$Dict$balance,
							elm_lang$core$Dict$Black,
							zk,
							zv,
							c,
							elm_lang$core$Dict$redden(d)));
				}
				var col = tree.a;
				var xk = tree.b;
				var xv = tree.c;
				var a = tree.d;
				var _n13 = tree.e;
				var _n14 = _n13.a;
				var yk = _n13.b;
				var yv = _n13.c;
				var b = _n13.d;
				var _n15 = _n13.e;
				var _n16 = _n15.a;
				var zk = _n15.b;
				var zv = _n15.c;
				var c = _n15.d;
				var d = _n15.e;
				return elm_lang$core$Dict$balancedTree(col)(xk)(xv)(yk)(yv)(zk)(zv)(a)(b)(c)(d);
			}
			var col = tree.a;
			var xk = tree.b;
			var xv = tree.c;
			var a = tree.d;
			var _n9 = tree.e;
			var _n10 = _n9.a;
			var zk = _n9.b;
			var zv = _n9.c;
			var _n11 = _n9.d;
			var _n12 = _n11.a;
			var yk = _n11.b;
			var yv = _n11.c;
			var b = _n11.d;
			var c = _n11.e;
			var d = _n9.e;
			return elm_lang$core$Dict$balancedTree(col)(xk)(xv)(yk)(yv)(zk)(zv)(a)(b)(c)(d);
		}
		var col = tree.a;
		var zk = tree.b;
		var zv = tree.c;
		var _n5 = tree.d;
		var _n6 = _n5.a;
		var xk = _n5.b;
		var xv = _n5.c;
		var a = _n5.d;
		var _n7 = _n5.e;
		var _n8 = _n7.a;
		var yk = _n7.b;
		var yv = _n7.c;
		var b = _n7.d;
		var c = _n7.e;
		var d = tree.e;
		return elm_lang$core$Dict$balancedTree(col)(xk)(xv)(yk)(yv)(zk)(zv)(a)(b)(c)(d);
	}
	var col = tree.a;
	var zk = tree.b;
	var zv = tree.c;
	var _n1 = tree.d;
	var _n2 = _n1.a;
	var yk = _n1.b;
	var yv = _n1.c;
	var _n3 = _n1.d;
	var _n4 = _n3.a;
	var xk = _n3.b;
	var xv = _n3.c;
	var a = _n3.d;
	var b = _n3.e;
	var c = _n1.e;
	var d = tree.e;
	return elm_lang$core$Dict$balancedTree(col)(xk)(xv)(yk)(yv)(zk)(zv)(a)(b)(c)(d);
};
var elm_lang$core$Dict$BBlack = {$: 'BBlack'};
var elm_lang$core$Dict$blackish = function (dict) {
	if (dict.$ === 'RBNode_elm_builtin') {
		var color = dict.a;
		return _Utils_eq(color, elm_lang$core$Dict$Black) || _Utils_eq(color, elm_lang$core$Dict$BBlack);
	} else {
		return true;
	}
};
var elm_lang$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		var dict = A5(elm_lang$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
		return elm_lang$core$Dict$blackish(dict) ? elm_lang$core$Dict$balanceHelp(dict) : dict;
	});
var elm_lang$core$Dict$blacken = function (t) {
	if (t.$ === 'RBEmpty_elm_builtin') {
		return elm_lang$core$Dict$RBEmpty_elm_builtin(elm_lang$core$Dict$LBlack);
	} else {
		var k = t.b;
		var v = t.c;
		var l = t.d;
		var r = t.e;
		return A5(elm_lang$core$Dict$RBNode_elm_builtin, elm_lang$core$Dict$Black, k, v, l, r);
	}
};
var elm_lang$core$Dict$isBBlack = function (dict) {
	_n0$2:
	while (true) {
		if (dict.$ === 'RBNode_elm_builtin') {
			if (dict.a.$ === 'BBlack') {
				var _n1 = dict.a;
				return true;
			} else {
				break _n0$2;
			}
		} else {
			if (dict.a.$ === 'LBBlack') {
				var _n2 = dict.a;
				return true;
			} else {
				break _n0$2;
			}
		}
	}
	return false;
};
var elm_lang$core$Dict$lessBlackTree = function (dict) {
	if (dict.$ === 'RBNode_elm_builtin') {
		var c = dict.a;
		var k = dict.b;
		var v = dict.c;
		var l = dict.d;
		var r = dict.e;
		return A5(
			elm_lang$core$Dict$RBNode_elm_builtin,
			elm_lang$core$Dict$lessBlack(c),
			k,
			v,
			l,
			r);
	} else {
		return elm_lang$core$Dict$RBEmpty_elm_builtin(elm_lang$core$Dict$LBlack);
	}
};
var elm_lang$core$Dict$moreBlack = function (color) {
	switch (color.$) {
		case 'Black':
			return elm_lang$core$Dict$BBlack;
		case 'Red':
			return elm_lang$core$Dict$Black;
		case 'NBlack':
			return elm_lang$core$Dict$Red;
		default:
			return _Error_dictBug(0);
	}
};
var elm_lang$core$Dict$bubble = F5(
	function (color, key, value, left, right) {
		return (elm_lang$core$Dict$isBBlack(left) || elm_lang$core$Dict$isBBlack(right)) ? A5(
			elm_lang$core$Dict$balance,
			elm_lang$core$Dict$moreBlack(color),
			key,
			value,
			elm_lang$core$Dict$lessBlackTree(left),
			elm_lang$core$Dict$lessBlackTree(right)) : A5(elm_lang$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
	});
var elm_lang$core$Dict$ensureBlackRoot = function (dict) {
	if ((dict.$ === 'RBNode_elm_builtin') && (dict.a.$ === 'Red')) {
		var _n1 = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var right = dict.e;
		return A5(elm_lang$core$Dict$RBNode_elm_builtin, elm_lang$core$Dict$Black, key, value, left, right);
	} else {
		return dict;
	}
};
var elm_lang$core$Dict$LBBlack = {$: 'LBBlack'};
var elm_lang$core$Dict$maxWithDefault = F3(
	function (k, v, r) {
		maxWithDefault:
		while (true) {
			if (r.$ === 'RBEmpty_elm_builtin') {
				return _Utils_Tuple2(k, v);
			} else {
				var kr = r.b;
				var vr = r.c;
				var rr = r.e;
				var $temp$k = kr,
					$temp$v = vr,
					$temp$r = rr;
				k = $temp$k;
				v = $temp$v;
				r = $temp$r;
				continue maxWithDefault;
			}
		}
	});
var elm_lang$core$Dict$removeMax = F5(
	function (color, key, value, left, right) {
		if (right.$ === 'RBEmpty_elm_builtin') {
			return A3(elm_lang$core$Dict$rem, color, left, right);
		} else {
			var cr = right.a;
			var kr = right.b;
			var vr = right.c;
			var lr = right.d;
			var rr = right.e;
			return A5(
				elm_lang$core$Dict$bubble,
				color,
				key,
				value,
				left,
				A5(elm_lang$core$Dict$removeMax, cr, kr, vr, lr, rr));
		}
	});
var elm_lang$core$Dict$rem = F3(
	function (color, left, right) {
		var _n0 = _Utils_Tuple2(left, right);
		if (_n0.a.$ === 'RBEmpty_elm_builtin') {
			if (_n0.b.$ === 'RBEmpty_elm_builtin') {
				switch (color.$) {
					case 'Red':
						return elm_lang$core$Dict$RBEmpty_elm_builtin(elm_lang$core$Dict$LBlack);
					case 'Black':
						return elm_lang$core$Dict$RBEmpty_elm_builtin(elm_lang$core$Dict$LBBlack);
					default:
						return _Error_dictBug(0);
				}
			} else {
				var cl = _n0.a.a;
				var _n2 = _n0.b;
				var cr = _n2.a;
				var k = _n2.b;
				var v = _n2.c;
				var l = _n2.d;
				var r = _n2.e;
				var _n3 = _Utils_Tuple3(color, cl, cr);
				if (((_n3.a.$ === 'Black') && (_n3.b.$ === 'LBlack')) && (_n3.c.$ === 'Red')) {
					var _n4 = _n3.a;
					var _n5 = _n3.b;
					var _n6 = _n3.c;
					return A5(elm_lang$core$Dict$RBNode_elm_builtin, elm_lang$core$Dict$Black, k, v, l, r);
				} else {
					return _Error_dictBug(0);
				}
			}
		} else {
			if (_n0.b.$ === 'RBEmpty_elm_builtin') {
				var _n7 = _n0.a;
				var cl = _n7.a;
				var k = _n7.b;
				var v = _n7.c;
				var l = _n7.d;
				var r = _n7.e;
				var cr = _n0.b.a;
				var _n8 = _Utils_Tuple3(color, cl, cr);
				if (((_n8.a.$ === 'Black') && (_n8.b.$ === 'Red')) && (_n8.c.$ === 'LBlack')) {
					var _n9 = _n8.a;
					var _n10 = _n8.b;
					var _n11 = _n8.c;
					return A5(elm_lang$core$Dict$RBNode_elm_builtin, elm_lang$core$Dict$Black, k, v, l, r);
				} else {
					return _Error_dictBug(0);
				}
			} else {
				var _n12 = _n0.a;
				var cl = _n12.a;
				var kl = _n12.b;
				var vl = _n12.c;
				var ll = _n12.d;
				var rl = _n12.e;
				var _n13 = _n0.b;
				var newLeft = A5(elm_lang$core$Dict$removeMax, cl, kl, vl, ll, rl);
				var _n14 = A3(elm_lang$core$Dict$maxWithDefault, kl, vl, rl);
				var k = _n14.a;
				var v = _n14.b;
				return A5(elm_lang$core$Dict$bubble, color, k, v, newLeft, right);
			}
		}
	});
var elm_lang$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var up = function (dict) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				var _n1 = alter(elm_lang$core$Maybe$Nothing);
				if (_n1.$ === 'Nothing') {
					return _Utils_Tuple2(elm_lang$core$Dict$Same, elm_lang$core$Dict$empty);
				} else {
					var v = _n1.a;
					return _Utils_Tuple2(
						elm_lang$core$Dict$Insert,
						A5(elm_lang$core$Dict$RBNode_elm_builtin, elm_lang$core$Dict$Red, targetKey, v, elm_lang$core$Dict$empty, elm_lang$core$Dict$empty));
				}
			} else {
				var color = dict.a;
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _n2 = A2(elm_lang$core$Basics$compare, targetKey, key);
				switch (_n2.$) {
					case 'EQ':
						var _n3 = alter(
							elm_lang$core$Maybe$Just(value));
						if (_n3.$ === 'Nothing') {
							return _Utils_Tuple2(
								elm_lang$core$Dict$Remove,
								A3(elm_lang$core$Dict$rem, color, left, right));
						} else {
							var newValue = _n3.a;
							return _Utils_Tuple2(
								elm_lang$core$Dict$Same,
								A5(elm_lang$core$Dict$RBNode_elm_builtin, color, key, newValue, left, right));
						}
					case 'LT':
						var _n4 = up(left);
						var flag = _n4.a;
						var newLeft = _n4.b;
						switch (flag.$) {
							case 'Same':
								return _Utils_Tuple2(
									elm_lang$core$Dict$Same,
									A5(elm_lang$core$Dict$RBNode_elm_builtin, color, key, value, newLeft, right));
							case 'Insert':
								return _Utils_Tuple2(
									elm_lang$core$Dict$Insert,
									A5(elm_lang$core$Dict$balance, color, key, value, newLeft, right));
							default:
								return _Utils_Tuple2(
									elm_lang$core$Dict$Remove,
									A5(elm_lang$core$Dict$bubble, color, key, value, newLeft, right));
						}
					default:
						var _n6 = up(right);
						var flag = _n6.a;
						var newRight = _n6.b;
						switch (flag.$) {
							case 'Same':
								return _Utils_Tuple2(
									elm_lang$core$Dict$Same,
									A5(elm_lang$core$Dict$RBNode_elm_builtin, color, key, value, left, newRight));
							case 'Insert':
								return _Utils_Tuple2(
									elm_lang$core$Dict$Insert,
									A5(elm_lang$core$Dict$balance, color, key, value, left, newRight));
							default:
								return _Utils_Tuple2(
									elm_lang$core$Dict$Remove,
									A5(elm_lang$core$Dict$bubble, color, key, value, left, newRight));
						}
				}
			}
		};
		var _n8 = up(dictionary);
		var finalFlag = _n8.a;
		var updatedDict = _n8.b;
		switch (finalFlag.$) {
			case 'Same':
				return updatedDict;
			case 'Insert':
				return elm_lang$core$Dict$ensureBlackRoot(updatedDict);
			default:
				return elm_lang$core$Dict$blacken(updatedDict);
		}
	});
var elm_lang$core$Maybe$isJust = function (maybe) {
	if (maybe.$ === 'Just') {
		return true;
	} else {
		return false;
	}
};
var elm_lang$core$Result$map = F2(
	function (func, ra) {
		if (ra.$ === 'Ok') {
			var a = ra.a;
			return elm_lang$core$Result$Ok(
				func(a));
		} else {
			var e = ra.a;
			return elm_lang$core$Result$Err(e);
		}
	});
var elm_lang$http$Http$BadPayload = F2(
	function (a, b) {
		return {$: 'BadPayload', a: a, b: b};
	});
var elm_lang$http$Http$BadStatus = function (a) {
	return {$: 'BadStatus', a: a};
};
var elm_lang$http$Http$BadUrl = function (a) {
	return {$: 'BadUrl', a: a};
};
var elm_lang$http$Http$NetworkError = {$: 'NetworkError'};
var elm_lang$http$Http$Timeout = {$: 'Timeout'};
var elm_lang$http$Http$Internal$FormDataBody = function (a) {
	return {$: 'FormDataBody', a: a};
};
var elm_lang$http$Http$Internal$isStringBody = function (body) {
	if (body.$ === 'StringBody') {
		return true;
	} else {
		return false;
	}
};
var elm_lang$http$Http$expectStringResponse = _Http_expectStringResponse;
var elm_lang$core$Char$isLower = function (_char) {
	var code = elm_lang$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var elm_lang$core$Char$isUpper = function (_char) {
	var code = elm_lang$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var elm_lang$core$Char$isAlpha = function (_char) {
	return elm_lang$core$Char$isLower(_char) || elm_lang$core$Char$isUpper(_char);
};
var elm_lang$core$Char$isAlphaNum = function (_char) {
	return elm_lang$core$Char$isLower(_char) || (elm_lang$core$Char$isUpper(_char) || elm_lang$core$Char$isDigit(_char));
};
var elm_lang$core$List$length = function (xs) {
	return A3(
		elm_lang$core$List$foldl,
		F2(
			function (_n0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var elm_lang$core$List$map2 = _List_map2;
var elm_lang$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2(elm_lang$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var elm_lang$core$List$range = F2(
	function (lo, hi) {
		return A3(elm_lang$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var elm_lang$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			elm_lang$core$List$map2,
			f,
			A2(
				elm_lang$core$List$range,
				0,
				elm_lang$core$List$length(xs) - 1),
			xs);
	});
var elm_lang$core$String$all = _String_all;
var elm_lang$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var elm_lang$core$String$uncons = _String_uncons;
var elm_lang$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var elm_lang$json$Json$Decode$indent = function (str) {
	return A2(
		elm_lang$core$String$join,
		'\n    ',
		A2(elm_lang$core$String$split, '\n', str));
};
var elm_lang$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + (elm_lang$core$String$fromInt(i + 1) + (') ' + elm_lang$json$Json$Decode$indent(
			elm_lang$json$Json$Decode$errorToString(error))));
	});
var elm_lang$json$Json$Encode$encode = _Json_encode;
var elm_lang$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _n1 = elm_lang$core$String$uncons(f);
						if (_n1.$ === 'Nothing') {
							return false;
						} else {
							var _n2 = _n1.a;
							var _char = _n2.a;
							var rest = _n2.b;
							return elm_lang$core$Char$isAlpha(_char) && A2(elm_lang$core$String$all, elm_lang$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2(elm_lang$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + (elm_lang$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2(elm_lang$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									elm_lang$core$String$join,
									'',
									elm_lang$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										elm_lang$core$String$join,
										'',
										elm_lang$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + (elm_lang$core$String$fromInt(
								elm_lang$core$List$length(errors)) + ' ways:'));
							return A2(
								elm_lang$core$String$join,
								'\n\n',
								A2(
									elm_lang$core$List$cons,
									introduction,
									A2(elm_lang$core$List$indexedMap, elm_lang$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								elm_lang$core$String$join,
								'',
								elm_lang$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + (elm_lang$json$Json$Decode$indent(
						A2(elm_lang$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var elm_lang$json$Json$Decode$errorToString = function (error) {
	return A2(elm_lang$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var elm_lang$http$Http$expectJson = function (decoder) {
	return elm_lang$http$Http$expectStringResponse(
		function (response) {
			var _n0 = A2(elm_lang$json$Json$Decode$decodeString, decoder, response.body);
			if (_n0.$ === 'Err') {
				var decodeError = _n0.a;
				return elm_lang$core$Result$Err(
					elm_lang$json$Json$Decode$errorToString(decodeError));
			} else {
				var value = _n0.a;
				return elm_lang$core$Result$Ok(value);
			}
		});
};
var elm_lang$http$Http$Internal$EmptyBody = {$: 'EmptyBody'};
var elm_lang$http$Http$emptyBody = elm_lang$http$Http$Internal$EmptyBody;
var lukewestby$http_builder$HttpBuilder$requestWithMethodAndUrl = F2(
	function (method, url) {
		return {
			body: elm_lang$http$Http$emptyBody,
			cacheBuster: elm_lang$core$Maybe$Nothing,
			expect: elm_lang$http$Http$expectStringResponse(
				function (_n0) {
					return elm_lang$core$Result$Ok(_Utils_Tuple0);
				}),
			headers: _List_Nil,
			method: method,
			queryParameters: _List_Nil,
			timeout: elm_lang$core$Maybe$Nothing,
			url: url,
			withCredentials: false
		};
	});
var lukewestby$http_builder$HttpBuilder$get = lukewestby$http_builder$HttpBuilder$requestWithMethodAndUrl('GET');
var elm_lang$http$Http$Internal$Request = function (a) {
	return {$: 'Request', a: a};
};
var elm_lang$http$Http$request = elm_lang$http$Http$Internal$Request;
var elm_lang$url$Url$toQueryPair = function (_n0) {
	var key = _n0.a;
	var value = _n0.b;
	return key + ('=' + value);
};
var elm_lang$url$Url$toQuery = function (parameters) {
	if (!parameters.b) {
		return '';
	} else {
		return '?' + A2(
			elm_lang$core$String$join,
			'&',
			A2(elm_lang$core$List$map, elm_lang$url$Url$toQueryPair, parameters));
	}
};
var elm_lang$url$Url$crossOrigin = F3(
	function (prePath, pathSegments, parameters) {
		return prePath + ('/' + (A2(elm_lang$core$String$join, '/', pathSegments) + elm_lang$url$Url$toQuery(parameters)));
	});
var lukewestby$http_builder$HttpBuilder$toRequest = function (builder) {
	return elm_lang$http$Http$request(
		{
			body: builder.body,
			expect: builder.expect,
			headers: builder.headers,
			method: builder.method,
			timeout: builder.timeout,
			url: A3(elm_lang$url$Url$crossOrigin, builder.url, _List_Nil, builder.queryParameters),
			withCredentials: builder.withCredentials
		});
};
var lukewestby$http_builder$HttpBuilder$withExpect = F2(
	function (expect, builder) {
		return {body: builder.body, cacheBuster: builder.cacheBuster, expect: expect, headers: builder.headers, method: builder.method, queryParameters: builder.queryParameters, timeout: builder.timeout, url: builder.url, withCredentials: builder.withCredentials};
	});
var author$project$Request$Article$get = F2(
	function (maybeToken, slug) {
		var expect = elm_lang$http$Http$expectJson(
			A2(elm_lang$json$Json$Decode$field, 'article', author$project$Data$Article$decoderWithBody));
		return lukewestby$http_builder$HttpBuilder$toRequest(
			A2(
				author$project$Data$AuthToken$withAuthorization,
				maybeToken,
				A2(
					lukewestby$http_builder$HttpBuilder$withExpect,
					expect,
					lukewestby$http_builder$HttpBuilder$get(
						author$project$Request$Helpers$apiUrl(
							'/articles/' + author$project$Data$Article$Slug$toString(slug))))));
	});
var author$project$Data$Article$Comment$Comment = F5(
	function (id, body, createdAt, updatedAt, author) {
		return {author: author, body: body, createdAt: createdAt, id: id, updatedAt: updatedAt};
	});
var author$project$Data$Article$Comment$CommentId = function (a) {
	return {$: 'CommentId', a: a};
};
var author$project$Data$Article$Comment$commentIdDecoder = A2(elm_lang$json$Json$Decode$map, author$project$Data$Article$Comment$CommentId, elm_lang$json$Json$Decode$int);
var author$project$Data$Article$Comment$decoder = A3(
	NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
	'author',
	author$project$Data$Article$Author$decoder,
	A3(
		NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
		'updatedAt',
		author$project$Util$dateStringDecoder,
		A3(
			NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
			'createdAt',
			author$project$Util$dateStringDecoder,
			A3(
				NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
				'body',
				elm_lang$json$Json$Decode$string,
				A3(
					NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
					'id',
					author$project$Data$Article$Comment$commentIdDecoder,
					NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$decode(author$project$Data$Article$Comment$Comment))))));
var author$project$Request$Article$Comments$list = F2(
	function (maybeToken, slug) {
		return lukewestby$http_builder$HttpBuilder$toRequest(
			A2(
				author$project$Data$AuthToken$withAuthorization,
				maybeToken,
				A2(
					lukewestby$http_builder$HttpBuilder$withExpect,
					elm_lang$http$Http$expectJson(
						A2(
							elm_lang$json$Json$Decode$field,
							'comments',
							elm_lang$json$Json$Decode$list(author$project$Data$Article$Comment$decoder))),
					lukewestby$http_builder$HttpBuilder$get(
						author$project$Request$Helpers$apiUrl(
							'/articles/' + (author$project$Data$Article$Slug$toString(slug) + '/comments'))))));
	});
var author$project$Views$Page$Other = {$: 'Other'};
var elm_lang$core$Maybe$map = F2(
	function (f, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return elm_lang$core$Maybe$Just(
				f(value));
		} else {
			return elm_lang$core$Maybe$Nothing;
		}
	});
var elm_lang$core$Task$andThen = _Scheduler_andThen;
var elm_lang$core$Task$succeed = _Scheduler_succeed;
var elm_lang$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			elm_lang$core$Task$andThen,
			function (a) {
				return A2(
					elm_lang$core$Task$andThen,
					function (b) {
						return elm_lang$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var elm_lang$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var elm_lang$core$Task$fail = _Scheduler_fail;
var elm_lang$core$Task$onError = _Scheduler_onError;
var elm_lang$core$Task$mapError = F2(
	function (convert, task) {
		return A2(
			elm_lang$core$Task$onError,
			function ($) {
				return elm_lang$core$Task$fail(
					convert($));
			},
			task);
	});
var elm_lang$http$Http$toTask = function (_n0) {
	var request_ = _n0.a;
	return A2(_Http_toTask, request_, elm_lang$core$Maybe$Nothing);
};
var author$project$Page$Article$init = F2(
	function (session, slug) {
		var maybeAuthToken = A2(
			elm_lang$core$Maybe$map,
			function ($) {
				return $.token;
			},
			session.user);
		var loadComments = elm_lang$http$Http$toTask(
			A2(author$project$Request$Article$Comments$list, maybeAuthToken, slug));
		var loadArticle = elm_lang$http$Http$toTask(
			A2(author$project$Request$Article$get, maybeAuthToken, slug));
		var handleLoadError = function (_n0) {
			return A2(author$project$Page$Errored$pageLoadError, author$project$Views$Page$Other, 'Article is currently unavailable.');
		};
		return A2(
			elm_lang$core$Task$mapError,
			handleLoadError,
			A3(
				elm_lang$core$Task$map2,
				A3(author$project$Page$Article$Model, _List_Nil, '', false),
				loadArticle,
				loadComments));
	});
var author$project$Data$Article$bodyToMarkdownString = function (_n0) {
	var markdown = _n0.a;
	return markdown;
};
var elm_lang$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			elm_lang$core$Task$andThen,
			function (a) {
				return elm_lang$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var author$project$Page$Article$Editor$initEdit = F2(
	function (session, slug) {
		var maybeAuthToken = A2(
			elm_lang$core$Maybe$map,
			function ($) {
				return $.token;
			},
			session.user);
		return A2(
			elm_lang$core$Task$map,
			function (article) {
				return {
					body: author$project$Data$Article$bodyToMarkdownString(article.body),
					description: article.description,
					editingArticle: elm_lang$core$Maybe$Just(slug),
					errors: _List_Nil,
					isSaving: false,
					tags: article.tags,
					title: article.title
				};
			},
			A2(
				elm_lang$core$Task$mapError,
				function (_n0) {
					return A2(author$project$Page$Errored$pageLoadError, author$project$Views$Page$Other, 'Article is currently unavailable.');
				},
				elm_lang$http$Http$toTask(
					A2(author$project$Request$Article$get, maybeAuthToken, slug))));
	});
var author$project$Page$Article$Editor$initNew = {body: '', description: '', editingArticle: elm_lang$core$Maybe$Nothing, errors: _List_Nil, isSaving: false, tags: _List_Nil, title: ''};
var author$project$Page$Home$Model = F2(
	function (tags, feed) {
		return {feed: feed, tags: tags};
	});
var author$project$Data$Article$Tag$Tag = function (a) {
	return {$: 'Tag', a: a};
};
var author$project$Data$Article$Tag$decoder = A2(elm_lang$json$Json$Decode$map, author$project$Data$Article$Tag$Tag, elm_lang$json$Json$Decode$string);
var elm_lang$http$Http$get = F2(
	function (url, decoder) {
		return elm_lang$http$Http$request(
			{
				body: elm_lang$http$Http$emptyBody,
				expect: elm_lang$http$Http$expectJson(decoder),
				headers: _List_Nil,
				method: 'GET',
				timeout: elm_lang$core$Maybe$Nothing,
				url: url,
				withCredentials: false
			});
	});
var author$project$Request$Article$tags = A2(
	elm_lang$http$Http$get,
	author$project$Request$Helpers$apiUrl('/tags'),
	A2(
		elm_lang$json$Json$Decode$field,
		'tags',
		elm_lang$json$Json$Decode$list(author$project$Data$Article$Tag$decoder)));
var author$project$Views$Article$Feed$Model = function (a) {
	return {$: 'Model', a: a};
};
var author$project$Request$Article$defaultFeedConfig = {limit: 10, offset: 0};
var author$project$Request$Article$defaultListConfig = {author: elm_lang$core$Maybe$Nothing, favorited: elm_lang$core$Maybe$Nothing, limit: 20, offset: 0, tag: elm_lang$core$Maybe$Nothing};
var NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$hardcoded = function ($) {
	return NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$custom(
		elm_lang$json$Json$Decode$succeed($));
};
var author$project$Data$Article$decoder = A2(NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$hardcoded, _Utils_Tuple0, author$project$Data$Article$baseArticleDecoder);
var author$project$Data$Article$Feed$Feed = F2(
	function (articles, articlesCount) {
		return {articles: articles, articlesCount: articlesCount};
	});
var author$project$Data$Article$Feed$decoder = A3(
	NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
	'articlesCount',
	elm_lang$json$Json$Decode$int,
	A3(
		NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
		'articles',
		elm_lang$json$Json$Decode$list(author$project$Data$Article$decoder),
		NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$decode(author$project$Data$Article$Feed$Feed)));
var lukewestby$http_builder$HttpBuilder$withQueryParameters = F2(
	function (queryParameters, builder) {
		return _Utils_update(
			builder,
			{
				queryParameters: _Utils_ap(builder.queryParameters, queryParameters)
			});
	});
var author$project$Request$Article$buildFromQueryParams = F2(
	function (url, queryParams) {
		return A2(
			lukewestby$http_builder$HttpBuilder$withQueryParameters,
			queryParams,
			A2(
				lukewestby$http_builder$HttpBuilder$withExpect,
				elm_lang$http$Http$expectJson(author$project$Data$Article$Feed$decoder),
				lukewestby$http_builder$HttpBuilder$get(
					author$project$Request$Helpers$apiUrl(url))));
	});
var elm_lang$url$Url$QueryParameter = F2(
	function (a, b) {
		return {$: 'QueryParameter', a: a, b: b};
	});
var elm_lang$url$Url$percentEncode = _Url_percentEncode;
var elm_lang$url$Url$int = F2(
	function (key, value) {
		return A2(
			elm_lang$url$Url$QueryParameter,
			elm_lang$url$Url$percentEncode(key),
			elm_lang$core$String$fromInt(value));
	});
var author$project$Request$Article$feed = F2(
	function (config, token) {
		return lukewestby$http_builder$HttpBuilder$toRequest(
			A2(
				author$project$Data$AuthToken$withAuthorization,
				elm_lang$core$Maybe$Just(token),
				A2(
					author$project$Request$Article$buildFromQueryParams,
					'/articles/feed',
					_List_fromArray(
						[
							A2(elm_lang$url$Url$int, 'limit', config.limit),
							A2(elm_lang$url$Url$int, 'offset', config.offset)
						]))));
	});
var author$project$Data$Article$Tag$toString = function (_n0) {
	var slug = _n0.a;
	return slug;
};
var author$project$Data$User$Username$toString = function (_n0) {
	var username = _n0.a;
	return username;
};
var elm_lang$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _n0 = f(mx);
		if (_n0.$ === 'Just') {
			var x = _n0.a;
			return A2(elm_lang$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var elm_lang$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			elm_lang$core$List$foldr,
			elm_lang$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var elm_lang$url$Url$string = F2(
	function (key, value) {
		return A2(
			elm_lang$url$Url$QueryParameter,
			elm_lang$url$Url$percentEncode(key),
			elm_lang$url$Url$percentEncode(value));
	});
var author$project$Request$Article$list = F2(
	function (config, maybeToken) {
		return lukewestby$http_builder$HttpBuilder$toRequest(
			A2(
				author$project$Data$AuthToken$withAuthorization,
				maybeToken,
				A2(
					author$project$Request$Article$buildFromQueryParams,
					'/articles',
					A2(
						elm_lang$core$List$filterMap,
						elm_lang$core$Basics$identity,
						_List_fromArray(
							[
								A2(
								elm_lang$core$Maybe$map,
								function ($) {
									return A2(
										elm_lang$url$Url$string,
										'tag',
										author$project$Data$Article$Tag$toString($));
								},
								config.tag),
								A2(
								elm_lang$core$Maybe$map,
								function ($) {
									return A2(
										elm_lang$url$Url$string,
										'author',
										author$project$Data$User$Username$toString($));
								},
								config.author),
								A2(
								elm_lang$core$Maybe$map,
								function ($) {
									return A2(
										elm_lang$url$Url$string,
										'favorited',
										author$project$Data$User$Username$toString($));
								},
								config.favorited),
								elm_lang$core$Maybe$Just(
								A2(elm_lang$url$Url$int, 'limit', config.limit)),
								elm_lang$core$Maybe$Just(
								A2(elm_lang$url$Url$int, 'offset', config.offset))
							])))));
	});
var author$project$Views$Article$Feed$limit = function (feedSource) {
	switch (feedSource.$) {
		case 'YourFeed':
			return 10;
		case 'GlobalFeed':
			return 10;
		case 'TagFeed':
			var tagName = feedSource.a;
			return 10;
		case 'FavoritedFeed':
			var username = feedSource.a;
			return 5;
		default:
			var username = feedSource.a;
			return 5;
	}
};
var author$project$Views$Article$Feed$fetch = F3(
	function (token, page, feedSource) {
		var defaultListConfig = author$project$Request$Article$defaultListConfig;
		var articlesPerPage = author$project$Views$Article$Feed$limit(feedSource);
		var offset = (page - 1) * articlesPerPage;
		var listConfig = _Utils_update(
			defaultListConfig,
			{limit: articlesPerPage, offset: offset});
		var task = function () {
			switch (feedSource.$) {
				case 'YourFeed':
					var defaultFeedConfig = author$project$Request$Article$defaultFeedConfig;
					var feedConfig = _Utils_update(
						defaultFeedConfig,
						{limit: articlesPerPage, offset: offset});
					return A2(
						elm_lang$core$Maybe$withDefault,
						elm_lang$core$Task$fail(
							elm_lang$http$Http$BadUrl('You need to be signed in to view your feed.')),
						A2(
							elm_lang$core$Maybe$map,
							function ($) {
								return elm_lang$http$Http$toTask(
									A2(author$project$Request$Article$feed, feedConfig, $));
							},
							token));
				case 'GlobalFeed':
					return elm_lang$http$Http$toTask(
						A2(author$project$Request$Article$list, listConfig, token));
				case 'TagFeed':
					var tagName = feedSource.a;
					return elm_lang$http$Http$toTask(
						A2(
							author$project$Request$Article$list,
							_Utils_update(
								listConfig,
								{
									tag: elm_lang$core$Maybe$Just(tagName)
								}),
							token));
				case 'FavoritedFeed':
					var username = feedSource.a;
					return elm_lang$http$Http$toTask(
						A2(
							author$project$Request$Article$list,
							_Utils_update(
								listConfig,
								{
									favorited: elm_lang$core$Maybe$Just(username)
								}),
							token));
				default:
					var username = feedSource.a;
					return elm_lang$http$Http$toTask(
						A2(
							author$project$Request$Article$list,
							_Utils_update(
								listConfig,
								{
									author: elm_lang$core$Maybe$Just(username)
								}),
							token));
			}
		}();
		return A2(
			elm_lang$core$Task$map,
			function (feed) {
				return _Utils_Tuple2(page, feed);
			},
			task);
	});
var rtfeldman$selectlist$SelectList$selected = function (_n0) {
	var sel = _n0.b;
	return sel;
};
var author$project$Views$Article$Feed$init = F2(
	function (session, feedSources) {
		var toModel = function (_n0) {
			var activePage = _n0.a;
			var feed = _n0.b;
			return author$project$Views$Article$Feed$Model(
				{activePage: activePage, errors: _List_Nil, feed: feed, feedSources: feedSources, isLoading: false});
		};
		var source = rtfeldman$selectlist$SelectList$selected(feedSources);
		return A2(
			elm_lang$core$Task$map,
			toModel,
			A3(
				author$project$Views$Article$Feed$fetch,
				A2(
					elm_lang$core$Maybe$map,
					function ($) {
						return $.token;
					},
					session.user),
				1,
				source));
	});
var author$project$Views$Article$Feed$Source$GlobalFeed = {$: 'GlobalFeed'};
var author$project$Views$Article$Feed$Source$globalFeed = author$project$Views$Article$Feed$Source$GlobalFeed;
var author$project$Views$Article$Feed$Source$YourFeed = {$: 'YourFeed'};
var author$project$Views$Article$Feed$Source$yourFeed = author$project$Views$Article$Feed$Source$YourFeed;
var author$project$Views$Page$Home = {$: 'Home'};
var rtfeldman$selectlist$SelectList$SelectList = F3(
	function (a, b, c) {
		return {$: 'SelectList', a: a, b: b, c: c};
	});
var rtfeldman$selectlist$SelectList$fromLists = rtfeldman$selectlist$SelectList$SelectList;
var rtfeldman$selectlist$SelectList$singleton = function (sel) {
	return A3(rtfeldman$selectlist$SelectList$SelectList, _List_Nil, sel, _List_Nil);
};
var author$project$Page$Home$init = function (session) {
	var loadTags = elm_lang$http$Http$toTask(author$project$Request$Article$tags);
	var handleLoadError = function (_n0) {
		return A2(author$project$Page$Errored$pageLoadError, author$project$Views$Page$Home, 'Homepage is currently unavailable.');
	};
	var feedSources = _Utils_eq(session.user, elm_lang$core$Maybe$Nothing) ? rtfeldman$selectlist$SelectList$singleton(author$project$Views$Article$Feed$Source$globalFeed) : A3(
		rtfeldman$selectlist$SelectList$fromLists,
		_List_Nil,
		author$project$Views$Article$Feed$Source$yourFeed,
		_List_fromArray(
			[author$project$Views$Article$Feed$Source$globalFeed]));
	var loadSources = A2(author$project$Views$Article$Feed$init, session, feedSources);
	return A2(
		elm_lang$core$Task$mapError,
		handleLoadError,
		A3(elm_lang$core$Task$map2, author$project$Page$Home$Model, loadTags, loadSources));
};
var author$project$Page$Login$initialModel = {email: '', errors: _List_Nil, password: ''};
var author$project$Page$Profile$Model = F3(
	function (errors, profile, feed) {
		return {errors: errors, feed: feed, profile: profile};
	});
var author$project$Views$Article$Feed$Source$AuthorFeed = function (a) {
	return {$: 'AuthorFeed', a: a};
};
var author$project$Views$Article$Feed$Source$authorFeed = author$project$Views$Article$Feed$Source$AuthorFeed;
var author$project$Views$Article$Feed$Source$FavoritedFeed = function (a) {
	return {$: 'FavoritedFeed', a: a};
};
var author$project$Views$Article$Feed$Source$favoritedFeed = author$project$Views$Article$Feed$Source$FavoritedFeed;
var author$project$Page$Profile$defaultFeedSources = function (username) {
	return A3(
		rtfeldman$selectlist$SelectList$fromLists,
		_List_Nil,
		author$project$Views$Article$Feed$Source$authorFeed(username),
		_List_fromArray(
			[
				author$project$Views$Article$Feed$Source$favoritedFeed(username)
			]));
};
var author$project$Data$Profile$Profile = F4(
	function (username, bio, image, following) {
		return {bio: bio, following: following, image: image, username: username};
	});
var author$project$Data$Profile$decoder = A3(
	NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
	'following',
	elm_lang$json$Json$Decode$bool,
	A3(
		NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
		'image',
		author$project$Data$User$Photo$decoder,
		A3(
			NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
			'bio',
			elm_lang$json$Json$Decode$nullable(elm_lang$json$Json$Decode$string),
			A3(
				NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$required,
				'username',
				author$project$Data$User$Username$decoder,
				NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$decode(author$project$Data$Profile$Profile)))));
var author$project$Request$Profile$get = F2(
	function (username, maybeToken) {
		return lukewestby$http_builder$HttpBuilder$toRequest(
			A2(
				author$project$Data$AuthToken$withAuthorization,
				maybeToken,
				A2(
					lukewestby$http_builder$HttpBuilder$withExpect,
					elm_lang$http$Http$expectJson(
						A2(elm_lang$json$Json$Decode$field, 'profile', author$project$Data$Profile$decoder)),
					lukewestby$http_builder$HttpBuilder$get(
						author$project$Request$Helpers$apiUrl(
							'/profiles/' + author$project$Data$User$Username$toString(username))))));
	});
var author$project$Views$Page$Profile = function (a) {
	return {$: 'Profile', a: a};
};
var author$project$Page$Profile$init = F2(
	function (session, username) {
		var maybeAuthToken = A2(
			elm_lang$core$Maybe$map,
			function ($) {
				return $.token;
			},
			session.user);
		var loadProfile = elm_lang$http$Http$toTask(
			A2(author$project$Request$Profile$get, username, maybeAuthToken));
		var loadFeedSources = A2(
			author$project$Views$Article$Feed$init,
			session,
			author$project$Page$Profile$defaultFeedSources(username));
		var handleLoadError = function (_n0) {
			return A2(
				author$project$Page$Errored$pageLoadError,
				author$project$Views$Page$Profile(username),
				'Profile is currently unavailable.');
		};
		var config = _Utils_update(
			author$project$Request$Article$defaultListConfig,
			{
				author: elm_lang$core$Maybe$Just(username),
				limit: 5
			});
		return A2(
			elm_lang$core$Task$mapError,
			handleLoadError,
			A3(
				elm_lang$core$Task$map2,
				author$project$Page$Profile$Model(_List_Nil),
				loadProfile,
				loadFeedSources));
	});
var author$project$Page$Register$initialModel = {email: '', errors: _List_Nil, password: '', username: ''};
var author$project$Data$User$Photo$toMaybeString = function (_n0) {
	var maybeUrl = _n0.a;
	return maybeUrl;
};
var author$project$Page$Settings$init = function (user) {
	return {
		bio: A2(elm_lang$core$Maybe$withDefault, '', user.bio),
		email: user.email,
		errors: _List_Nil,
		image: author$project$Data$User$Photo$toMaybeString(user.image),
		password: elm_lang$core$Maybe$Nothing,
		username: author$project$Data$User$Username$toString(user.username)
	};
};
var elm_lang$core$Maybe$destruct = F3(
	function (_default, func, maybe) {
		if (maybe.$ === 'Just') {
			var a = maybe.a;
			return func(a);
		} else {
			return _default;
		}
	});
var elm_lang$json$Json$Encode$null = _Json_encodeNull;
var elm_lang$json$Json$Encode$string = _Json_wrap;
var author$project$Ports$storeSession = _Platform_outgoingPort(
	'storeSession',
	function ($) {
		return A3(elm_lang$core$Maybe$destruct, elm_lang$json$Json$Encode$null, elm_lang$json$Json$Encode$string, $);
	});
var author$project$Route$Home = {$: 'Home'};
var author$project$Route$routeToString = function (page) {
	var pieces = function () {
		switch (page.$) {
			case 'Home':
				return _List_Nil;
			case 'Root':
				return _List_Nil;
			case 'Login':
				return _List_fromArray(
					['login']);
			case 'Logout':
				return _List_fromArray(
					['logout']);
			case 'Register':
				return _List_fromArray(
					['register']);
			case 'Settings':
				return _List_fromArray(
					['settings']);
			case 'Article':
				var slug = page.a;
				return _List_fromArray(
					[
						'article',
						author$project$Data$Article$Slug$toString(slug)
					]);
			case 'Profile':
				var username = page.a;
				return _List_fromArray(
					[
						'profile',
						author$project$Data$User$Username$toString(username)
					]);
			case 'NewArticle':
				return _List_fromArray(
					['editor']);
			default:
				var slug = page.a;
				return _List_fromArray(
					[
						'editor',
						author$project$Data$Article$Slug$toString(slug)
					]);
		}
	}();
	return '#/' + A2(elm_lang$core$String$join, '/', pieces);
};
var elm_lang$browser$Browser$Navigation$Manager$Replace = function (a) {
	return {$: 'Replace', a: a};
};
var elm_lang$browser$Browser$Navigation$Manager$State = F2(
	function (subs, popWatcher) {
		return {popWatcher: popWatcher, subs: subs};
	});
var elm_lang$browser$Browser$Navigation$Manager$init = elm_lang$core$Task$succeed(
	A2(elm_lang$browser$Browser$Navigation$Manager$State, _List_Nil, elm_lang$core$Maybe$Nothing));
var elm_lang$browser$Browser$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var elm_lang$virtual_dom$VirtualDom$isSync = function (timed) {
	if (timed.$ === 'Sync') {
		return true;
	} else {
		return false;
	}
};
var elm_lang$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var elm_lang$browser$Browser$Navigation$Manager$go = _Browser_go;
var elm_lang$browser$Browser$Navigation$Manager$ignore = F2(
	function (task, b) {
		return A2(
			elm_lang$core$Task$andThen,
			function (_n0) {
				return elm_lang$core$Task$succeed(b);
			},
			task);
	});
var elm_lang$core$Platform$sendToApp = _Platform_sendToApp;
var elm_lang$core$Task$sequence = function (tasks) {
	return A3(
		elm_lang$core$List$foldr,
		elm_lang$core$Task$map2(elm_lang$core$List$cons),
		elm_lang$core$Task$succeed(_List_Nil),
		tasks);
};
var elm_lang$browser$Browser$Navigation$Manager$notify = F3(
	function (router, subs, url) {
		var send = function (_n0) {
			var tagger = _n0.a;
			return A2(
				elm_lang$core$Platform$sendToApp,
				router,
				tagger(url));
		};
		return A2(
			elm_lang$browser$Browser$Navigation$Manager$ignore,
			elm_lang$core$Task$sequence(
				A2(elm_lang$core$List$map, send, subs)),
			_Utils_Tuple0);
	});
var elm_lang$browser$Browser$Navigation$Manager$pushState = _Browser_pushState;
var elm_lang$browser$Browser$Navigation$Manager$replaceState = _Browser_replaceState;
var elm_lang$browser$Browser$Navigation$Manager$cmdHelp = F3(
	function (router, subs, cmd) {
		switch (cmd.$) {
			case 'Go':
				var n = cmd.a;
				return elm_lang$browser$Browser$Navigation$Manager$go(n);
			case 'Push':
				var url = cmd.a;
				return A2(
					elm_lang$core$Task$andThen,
					A2(elm_lang$browser$Browser$Navigation$Manager$notify, router, subs),
					elm_lang$browser$Browser$Navigation$Manager$pushState(url));
			default:
				var url = cmd.a;
				return A2(
					elm_lang$core$Task$andThen,
					A2(elm_lang$browser$Browser$Navigation$Manager$notify, router, subs),
					elm_lang$browser$Browser$Navigation$Manager$replaceState(url));
		}
	});
var elm_lang$core$Process$kill = _Scheduler_kill;
var elm_lang$browser$Browser$Navigation$Manager$killPopWatcher = function (popWatcher) {
	if (popWatcher.$ === 'Normal') {
		var pid = popWatcher.a;
		return elm_lang$core$Process$kill(pid);
	} else {
		var pid1 = popWatcher.a;
		var pid2 = popWatcher.b;
		return A2(
			elm_lang$core$Task$andThen,
			function (_n1) {
				return elm_lang$core$Process$kill(pid2);
			},
			elm_lang$core$Process$kill(pid1));
	}
};
var elm_lang$browser$Browser$Navigation$Manager$InternetExplorer = F2(
	function (a, b) {
		return {$: 'InternetExplorer', a: a, b: b};
	});
var elm_lang$browser$Browser$Navigation$Manager$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var elm_lang$core$Platform$sendToSelf = _Platform_sendToSelf;
var elm_lang$browser$Browser$Navigation$Manager$reportUrl = F2(
	function (name, router) {
		return A4(
			_Browser_on,
			_Browser_window,
			true,
			name,
			function (_n0) {
				return A2(
					elm_lang$core$Platform$sendToSelf,
					router,
					_Browser_getUrl(_Utils_Tuple0));
			});
	});
var elm_lang$browser$Browser$Navigation$Manager$spawnPopWatcher = function (router) {
	return _Browser_isInternetExplorer11(_Utils_Tuple0) ? A3(
		elm_lang$core$Task$map2,
		elm_lang$browser$Browser$Navigation$Manager$InternetExplorer,
		A2(elm_lang$browser$Browser$Navigation$Manager$reportUrl, 'popstate', router),
		A2(elm_lang$browser$Browser$Navigation$Manager$reportUrl, 'hashchange', router)) : A2(
		elm_lang$core$Task$map,
		elm_lang$browser$Browser$Navigation$Manager$Normal,
		A2(elm_lang$browser$Browser$Navigation$Manager$reportUrl, 'popstate', router));
};
var elm_lang$browser$Browser$Navigation$Manager$onEffects = F4(
	function (router, cmds, subs, _n0) {
		var popWatcher = _n0.popWatcher;
		var stepState = function () {
			var _n2 = _Utils_Tuple2(subs, popWatcher);
			_n2$2:
			while (true) {
				if (!_n2.a.b) {
					if (_n2.b.$ === 'Just') {
						var watcher = _n2.b.a;
						return A2(
							elm_lang$browser$Browser$Navigation$Manager$ignore,
							elm_lang$browser$Browser$Navigation$Manager$killPopWatcher(watcher),
							A2(elm_lang$browser$Browser$Navigation$Manager$State, subs, elm_lang$core$Maybe$Nothing));
					} else {
						break _n2$2;
					}
				} else {
					if (_n2.b.$ === 'Nothing') {
						var _n3 = _n2.a;
						var _n4 = _n2.b;
						return A2(
							elm_lang$core$Task$map,
							function ($) {
								return A2(
									elm_lang$browser$Browser$Navigation$Manager$State,
									subs,
									elm_lang$core$Maybe$Just($));
							},
							elm_lang$browser$Browser$Navigation$Manager$spawnPopWatcher(router));
					} else {
						break _n2$2;
					}
				}
			}
			return elm_lang$core$Task$succeed(
				A2(elm_lang$browser$Browser$Navigation$Manager$State, subs, popWatcher));
		}();
		return A2(
			elm_lang$core$Task$andThen,
			function (_n1) {
				return stepState;
			},
			elm_lang$core$Task$sequence(
				A2(
					elm_lang$core$List$map,
					A2(elm_lang$browser$Browser$Navigation$Manager$cmdHelp, router, subs),
					cmds)));
	});
var elm_lang$browser$Browser$Navigation$Manager$onSelfMsg = F3(
	function (router, url, state) {
		return A2(
			elm_lang$browser$Browser$Navigation$Manager$ignore,
			A3(elm_lang$browser$Browser$Navigation$Manager$notify, router, state.subs, url),
			state);
	});
var elm_lang$browser$Browser$Navigation$Manager$Go = function (a) {
	return {$: 'Go', a: a};
};
var elm_lang$browser$Browser$Navigation$Manager$Push = function (a) {
	return {$: 'Push', a: a};
};
var elm_lang$browser$Browser$Navigation$Manager$cmdMap = F2(
	function (_n0, myCmd) {
		switch (myCmd.$) {
			case 'Go':
				var n = myCmd.a;
				return elm_lang$browser$Browser$Navigation$Manager$Go(n);
			case 'Push':
				var url = myCmd.a;
				return elm_lang$browser$Browser$Navigation$Manager$Push(url);
			default:
				var url = myCmd.a;
				return elm_lang$browser$Browser$Navigation$Manager$Replace(url);
		}
	});
var elm_lang$browser$Browser$Navigation$Manager$Listen = function (a) {
	return {$: 'Listen', a: a};
};
var elm_lang$browser$Browser$Navigation$Manager$subMap = F2(
	function (func, _n0) {
		var tagger = _n0.a;
		return elm_lang$browser$Browser$Navigation$Manager$Listen(
			function ($) {
				return func(
					tagger($));
			});
	});
_Platform_effectManagers['Browser.Navigation.Manager'] = _Platform_createManager(elm_lang$browser$Browser$Navigation$Manager$init, elm_lang$browser$Browser$Navigation$Manager$onEffects, elm_lang$browser$Browser$Navigation$Manager$onSelfMsg, elm_lang$browser$Browser$Navigation$Manager$cmdMap, elm_lang$browser$Browser$Navigation$Manager$subMap);
var elm_lang$browser$Browser$Navigation$Manager$command = _Platform_leaf('Browser.Navigation.Manager');
var elm_lang$browser$Browser$Navigation$Manager$subscription = _Platform_leaf('Browser.Navigation.Manager');
var elm_lang$browser$Browser$Navigation$Manager$replaceUrl = function (url) {
	return elm_lang$browser$Browser$Navigation$Manager$command(
		elm_lang$browser$Browser$Navigation$Manager$Replace(url));
};
var elm_lang$browser$Browser$Navigation$replaceUrl = elm_lang$browser$Browser$Navigation$Manager$replaceUrl;
var author$project$Route$replaceUrl = function ($) {
	return elm_lang$browser$Browser$Navigation$replaceUrl(
		author$project$Route$routeToString($));
};
var author$project$Views$Page$NewArticle = {$: 'NewArticle'};
var author$project$Views$Page$Settings = {$: 'Settings'};
var elm_lang$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var elm_lang$core$Task$init = elm_lang$core$Task$succeed(_Utils_Tuple0);
var elm_lang$core$Task$spawnCmd = F2(
	function (router, _n0) {
		var task = _n0.a;
		return _Scheduler_spawn(
			A2(
				elm_lang$core$Task$andThen,
				elm_lang$core$Platform$sendToApp(router),
				task));
	});
var elm_lang$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			elm_lang$core$Task$map,
			function (_n0) {
				return _Utils_Tuple0;
			},
			elm_lang$core$Task$sequence(
				A2(
					elm_lang$core$List$map,
					elm_lang$core$Task$spawnCmd(router),
					commands)));
	});
var elm_lang$core$Task$onSelfMsg = F3(
	function (_n0, _n1, _n2) {
		return elm_lang$core$Task$succeed(_Utils_Tuple0);
	});
var elm_lang$core$Task$cmdMap = F2(
	function (tagger, _n0) {
		var task = _n0.a;
		return elm_lang$core$Task$Perform(
			A2(elm_lang$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager(elm_lang$core$Task$init, elm_lang$core$Task$onEffects, elm_lang$core$Task$onSelfMsg, elm_lang$core$Task$cmdMap);
var elm_lang$core$Task$command = _Platform_leaf('Task');
var elm_lang$core$Task$attempt = F2(
	function (resultToMessage, task) {
		return elm_lang$core$Task$command(
			elm_lang$core$Task$Perform(
				A2(
					elm_lang$core$Task$onError,
					function ($) {
						return elm_lang$core$Task$succeed(
							resultToMessage(
								elm_lang$core$Result$Err($)));
					},
					A2(
						elm_lang$core$Task$andThen,
						function ($) {
							return elm_lang$core$Task$succeed(
								resultToMessage(
									elm_lang$core$Result$Ok($)));
						},
						task))));
	});
var author$project$Main$setRoute = F2(
	function (maybeRoute, model) {
		var transition = F2(
			function (toMsg, task) {
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							pageState: author$project$Main$TransitioningFrom(
								author$project$Main$getCurrentPage(model.pageState))
						}),
					A2(elm_lang$core$Task$attempt, toMsg, task));
			});
		var errored = author$project$Main$pageErrored(model);
		if (maybeRoute.$ === 'Nothing') {
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{
						pageState: author$project$Main$Loaded(author$project$Main$NotFound)
					}),
				elm_lang$core$Platform$Cmd$none);
		} else {
			switch (maybeRoute.a.$) {
				case 'NewArticle':
					var _n1 = maybeRoute.a;
					var _n2 = model.session.user;
					if (_n2.$ === 'Just') {
						var user = _n2.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									pageState: author$project$Main$Loaded(
										A2(author$project$Main$Editor, elm_lang$core$Maybe$Nothing, author$project$Page$Article$Editor$initNew))
								}),
							elm_lang$core$Platform$Cmd$none);
					} else {
						return A2(errored, author$project$Views$Page$NewArticle, 'You must be signed in to post an article.');
					}
				case 'EditArticle':
					var slug = maybeRoute.a.a;
					var _n3 = model.session.user;
					if (_n3.$ === 'Just') {
						var user = _n3.a;
						return A2(
							transition,
							author$project$Main$EditArticleLoaded(slug),
							A2(author$project$Page$Article$Editor$initEdit, model.session, slug));
					} else {
						return A2(errored, author$project$Views$Page$Other, 'You must be signed in to edit an article.');
					}
				case 'Settings':
					var _n4 = maybeRoute.a;
					var _n5 = model.session.user;
					if (_n5.$ === 'Just') {
						var user = _n5.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									pageState: author$project$Main$Loaded(
										author$project$Main$Settings(
											author$project$Page$Settings$init(user)))
								}),
							elm_lang$core$Platform$Cmd$none);
					} else {
						return A2(errored, author$project$Views$Page$Settings, 'You must be signed in to access your settings.');
					}
				case 'Home':
					var _n6 = maybeRoute.a;
					return A2(
						transition,
						author$project$Main$HomeLoaded,
						author$project$Page$Home$init(model.session));
				case 'Root':
					var _n7 = maybeRoute.a;
					return _Utils_Tuple2(
						model,
						author$project$Route$replaceUrl(author$project$Route$Home));
				case 'Login':
					var _n8 = maybeRoute.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								pageState: author$project$Main$Loaded(
									author$project$Main$Login(author$project$Page$Login$initialModel))
							}),
						elm_lang$core$Platform$Cmd$none);
				case 'Logout':
					var _n9 = maybeRoute.a;
					var session = model.session;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								session: _Utils_update(
									session,
									{user: elm_lang$core$Maybe$Nothing})
							}),
						elm_lang$core$Platform$Cmd$batch(
							_List_fromArray(
								[
									author$project$Ports$storeSession(elm_lang$core$Maybe$Nothing),
									author$project$Route$replaceUrl(author$project$Route$Home)
								])));
				case 'Register':
					var _n10 = maybeRoute.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								pageState: author$project$Main$Loaded(
									author$project$Main$Register(author$project$Page$Register$initialModel))
							}),
						elm_lang$core$Platform$Cmd$none);
				case 'Profile':
					var username = maybeRoute.a.a;
					return A2(
						transition,
						author$project$Main$ProfileLoaded(username),
						A2(author$project$Page$Profile$init, model.session, username));
				default:
					var slug = maybeRoute.a.a;
					return A2(
						transition,
						author$project$Main$ArticleLoaded,
						A2(author$project$Page$Article$init, model.session, slug));
			}
		}
	});
var author$project$Route$Root = {$: 'Root'};
var elm_lang$url$Url$Parser$Parser = function (a) {
	return {$: 'Parser', a: a};
};
var elm_lang$url$Url$Parser$State = F5(
	function (visited, unvisited, params, frag, value) {
		return {frag: frag, params: params, unvisited: unvisited, value: value, visited: visited};
	});
var elm_lang$url$Url$Parser$custom = F2(
	function (tipe, stringToSomething) {
		return elm_lang$url$Url$Parser$Parser(
			function (_n0) {
				var visited = _n0.visited;
				var unvisited = _n0.unvisited;
				var params = _n0.params;
				var frag = _n0.frag;
				var value = _n0.value;
				if (!unvisited.b) {
					return _List_Nil;
				} else {
					var next = unvisited.a;
					var rest = unvisited.b;
					var _n2 = stringToSomething(next);
					if (_n2.$ === 'Just') {
						var nextValue = _n2.a;
						return _List_fromArray(
							[
								A5(
								elm_lang$url$Url$Parser$State,
								A2(elm_lang$core$List$cons, next, visited),
								rest,
								params,
								frag,
								value(nextValue))
							]);
					} else {
						return _List_Nil;
					}
				}
			});
	});
var author$project$Data$Article$Slug$parser = A2(
	elm_lang$url$Url$Parser$custom,
	'SLUG',
	function ($) {
		return elm_lang$core$Maybe$Just(
			author$project$Data$Article$Slug$Slug($));
	});
var author$project$Data$User$Username$parser = A2(
	elm_lang$url$Url$Parser$custom,
	'USERNAME',
	function ($) {
		return elm_lang$core$Maybe$Just(
			author$project$Data$User$Username$Username($));
	});
var author$project$Route$Article = function (a) {
	return {$: 'Article', a: a};
};
var author$project$Route$EditArticle = function (a) {
	return {$: 'EditArticle', a: a};
};
var author$project$Route$Login = {$: 'Login'};
var author$project$Route$Logout = {$: 'Logout'};
var author$project$Route$NewArticle = {$: 'NewArticle'};
var author$project$Route$Profile = function (a) {
	return {$: 'Profile', a: a};
};
var author$project$Route$Register = {$: 'Register'};
var author$project$Route$Settings = {$: 'Settings'};
var elm_lang$url$Url$Parser$mapState = F2(
	function (func, _n0) {
		var visited = _n0.visited;
		var unvisited = _n0.unvisited;
		var params = _n0.params;
		var frag = _n0.frag;
		var value = _n0.value;
		return A5(
			elm_lang$url$Url$Parser$State,
			visited,
			unvisited,
			params,
			frag,
			func(value));
	});
var elm_lang$url$Url$Parser$map = F2(
	function (subValue, _n0) {
		var parseArg = _n0.a;
		return elm_lang$url$Url$Parser$Parser(
			function (_n1) {
				var visited = _n1.visited;
				var unvisited = _n1.unvisited;
				var params = _n1.params;
				var frag = _n1.frag;
				var value = _n1.value;
				return A2(
					elm_lang$core$List$map,
					elm_lang$url$Url$Parser$mapState(value),
					parseArg(
						A5(elm_lang$url$Url$Parser$State, visited, unvisited, params, frag, subValue)));
			});
	});
var elm_lang$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3(elm_lang$core$List$foldr, elm_lang$core$List$cons, ys, xs);
		}
	});
var elm_lang$core$List$concat = function (lists) {
	return A3(elm_lang$core$List$foldr, elm_lang$core$List$append, _List_Nil, lists);
};
var elm_lang$core$List$concatMap = F2(
	function (f, list) {
		return elm_lang$core$List$concat(
			A2(elm_lang$core$List$map, f, list));
	});
var elm_lang$url$Url$Parser$oneOf = function (parsers) {
	return elm_lang$url$Url$Parser$Parser(
		function (state) {
			return A2(
				elm_lang$core$List$concatMap,
				function (_n0) {
					var parser = _n0.a;
					return parser(state);
				},
				parsers);
		});
};
var elm_lang$url$Url$Parser$s = function (str) {
	return elm_lang$url$Url$Parser$Parser(
		function (_n0) {
			var visited = _n0.visited;
			var unvisited = _n0.unvisited;
			var params = _n0.params;
			var frag = _n0.frag;
			var value = _n0.value;
			if (!unvisited.b) {
				return _List_Nil;
			} else {
				var next = unvisited.a;
				var rest = unvisited.b;
				return _Utils_eq(next, str) ? _List_fromArray(
					[
						A5(
						elm_lang$url$Url$Parser$State,
						A2(elm_lang$core$List$cons, next, visited),
						rest,
						params,
						frag,
						value)
					]) : _List_Nil;
			}
		});
};
var elm_lang$url$Url$Parser$slash = F2(
	function (_n0, _n1) {
		var parseBefore = _n0.a;
		var parseAfter = _n1.a;
		return elm_lang$url$Url$Parser$Parser(
			function (state) {
				return A2(
					elm_lang$core$List$concatMap,
					parseAfter,
					parseBefore(state));
			});
	});
var author$project$Route$route = elm_lang$url$Url$Parser$oneOf(
	_List_fromArray(
		[
			A2(
			elm_lang$url$Url$Parser$map,
			author$project$Route$Home,
			elm_lang$url$Url$Parser$s('')),
			A2(
			elm_lang$url$Url$Parser$map,
			author$project$Route$Login,
			elm_lang$url$Url$Parser$s('login')),
			A2(
			elm_lang$url$Url$Parser$map,
			author$project$Route$Logout,
			elm_lang$url$Url$Parser$s('logout')),
			A2(
			elm_lang$url$Url$Parser$map,
			author$project$Route$Settings,
			elm_lang$url$Url$Parser$s('settings')),
			A2(
			elm_lang$url$Url$Parser$map,
			author$project$Route$Profile,
			A2(
				elm_lang$url$Url$Parser$slash,
				elm_lang$url$Url$Parser$s('profile'),
				author$project$Data$User$Username$parser)),
			A2(
			elm_lang$url$Url$Parser$map,
			author$project$Route$Register,
			elm_lang$url$Url$Parser$s('register')),
			A2(
			elm_lang$url$Url$Parser$map,
			author$project$Route$Article,
			A2(
				elm_lang$url$Url$Parser$slash,
				elm_lang$url$Url$Parser$s('article'),
				author$project$Data$Article$Slug$parser)),
			A2(
			elm_lang$url$Url$Parser$map,
			author$project$Route$NewArticle,
			elm_lang$url$Url$Parser$s('editor')),
			A2(
			elm_lang$url$Url$Parser$map,
			author$project$Route$EditArticle,
			A2(
				elm_lang$url$Url$Parser$slash,
				elm_lang$url$Url$Parser$s('editor'),
				author$project$Data$Article$Slug$parser))
		]));
var elm_lang$url$Url$Parser$getFirstMatch = function (states) {
	getFirstMatch:
	while (true) {
		if (!states.b) {
			return elm_lang$core$Maybe$Nothing;
		} else {
			var state = states.a;
			var rest = states.b;
			var _n1 = state.unvisited;
			if (!_n1.b) {
				return elm_lang$core$Maybe$Just(state.value);
			} else {
				if ((_n1.a === '') && (!_n1.b.b)) {
					return elm_lang$core$Maybe$Just(state.value);
				} else {
					var $temp$states = rest;
					states = $temp$states;
					continue getFirstMatch;
				}
			}
		}
	}
};
var elm_lang$url$Url$Parser$removeFinalEmpty = function (segments) {
	if (!segments.b) {
		return _List_Nil;
	} else {
		if ((segments.a === '') && (!segments.b.b)) {
			return _List_Nil;
		} else {
			var segment = segments.a;
			var rest = segments.b;
			return A2(
				elm_lang$core$List$cons,
				segment,
				elm_lang$url$Url$Parser$removeFinalEmpty(rest));
		}
	}
};
var elm_lang$url$Url$Parser$preparePath = function (path) {
	var _n0 = A2(elm_lang$core$String$split, '/', path);
	if (_n0.b && (_n0.a === '')) {
		var segments = _n0.b;
		return elm_lang$url$Url$Parser$removeFinalEmpty(segments);
	} else {
		var segments = _n0;
		return elm_lang$url$Url$Parser$removeFinalEmpty(segments);
	}
};
var elm_lang$url$Url$percentDecode = _Url_percentDecode;
var elm_lang$url$Url$Parser$addToParametersHelp = F2(
	function (value, maybeList) {
		if (maybeList.$ === 'Nothing') {
			return elm_lang$core$Maybe$Just(
				_List_fromArray(
					[value]));
		} else {
			var list = maybeList.a;
			return elm_lang$core$Maybe$Just(
				A2(elm_lang$core$List$cons, value, list));
		}
	});
var elm_lang$url$Url$Parser$addParam = F2(
	function (segment, dict) {
		var _n0 = A2(elm_lang$core$String$split, '=', segment);
		if ((_n0.b && _n0.b.b) && (!_n0.b.b.b)) {
			var rawKey = _n0.a;
			var _n1 = _n0.b;
			var rawValue = _n1.a;
			var _n2 = elm_lang$url$Url$percentDecode(rawKey);
			if (_n2.$ === 'Nothing') {
				return dict;
			} else {
				var key = _n2.a;
				var _n3 = elm_lang$url$Url$percentDecode(rawValue);
				if (_n3.$ === 'Nothing') {
					return dict;
				} else {
					var value = _n3.a;
					return A3(
						elm_lang$core$Dict$update,
						key,
						elm_lang$url$Url$Parser$addToParametersHelp(value),
						dict);
				}
			}
		} else {
			return dict;
		}
	});
var elm_lang$url$Url$Parser$prepareQuery = function (maybeQuery) {
	if (maybeQuery.$ === 'Nothing') {
		return elm_lang$core$Dict$empty;
	} else {
		var qry = maybeQuery.a;
		return A3(
			elm_lang$core$List$foldr,
			elm_lang$url$Url$Parser$addParam,
			elm_lang$core$Dict$empty,
			A2(elm_lang$core$String$split, '&', qry));
	}
};
var elm_lang$url$Url$Parser$parse = F2(
	function (_n0, url) {
		var parser = _n0.a;
		return elm_lang$url$Url$Parser$getFirstMatch(
			parser(
				A5(
					elm_lang$url$Url$Parser$State,
					_List_Nil,
					elm_lang$url$Url$Parser$preparePath(url.path),
					elm_lang$url$Url$Parser$prepareQuery(url.query),
					url.fragment,
					elm_lang$core$Basics$identity)));
	});
var elm_lang$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			elm_lang$core$String$slice,
			n,
			elm_lang$core$String$length(string),
			string);
	});
var elm_lang$core$String$startsWith = _String_startsWith;
var elm_lang$url$Url$Parser$Http = {$: 'Http'};
var elm_lang$url$Url$Parser$Https = {$: 'Https'};
var elm_lang$core$String$indexes = _String_indexes;
var elm_lang$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3(elm_lang$core$String$slice, 0, n, string);
	});
var elm_lang$core$String$contains = _String_contains;
var elm_lang$url$Url$Parser$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
	});
var elm_lang$url$Url$Parser$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if (elm_lang$core$String$isEmpty(str) || A2(elm_lang$core$String$contains, '@', str)) {
			return elm_lang$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm_lang$core$String$indexes, ':', str);
			if (!_n0.b) {
				return elm_lang$core$Maybe$Just(
					A6(elm_lang$url$Url$Parser$Url, protocol, str, elm_lang$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_n0.b.b) {
					var i = _n0.a;
					var _n1 = elm_lang$core$String$toInt(
						A2(elm_lang$core$String$dropLeft, i + 1, str));
					if (_n1.$ === 'Nothing') {
						return elm_lang$core$Maybe$Nothing;
					} else {
						var port_ = _n1;
						return elm_lang$core$Maybe$Just(
							A6(
								elm_lang$url$Url$Parser$Url,
								protocol,
								A2(elm_lang$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return elm_lang$core$Maybe$Nothing;
				}
			}
		}
	});
var elm_lang$url$Url$Parser$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if (elm_lang$core$String$isEmpty(str)) {
			return elm_lang$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm_lang$core$String$indexes, '/', str);
			if (!_n0.b) {
				return A5(elm_lang$url$Url$Parser$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _n0.a;
				return A5(
					elm_lang$url$Url$Parser$chompBeforePath,
					protocol,
					A2(elm_lang$core$String$dropLeft, i, str),
					params,
					frag,
					A2(elm_lang$core$String$left, i, str));
			}
		}
	});
var elm_lang$url$Url$Parser$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if (elm_lang$core$String$isEmpty(str)) {
			return elm_lang$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm_lang$core$String$indexes, '?', str);
			if (!_n0.b) {
				return A4(elm_lang$url$Url$Parser$chompBeforeQuery, protocol, elm_lang$core$Maybe$Nothing, frag, str);
			} else {
				var i = _n0.a;
				return A4(
					elm_lang$url$Url$Parser$chompBeforeQuery,
					protocol,
					elm_lang$core$Maybe$Just(
						A2(elm_lang$core$String$dropLeft, i + 1, str)),
					frag,
					A2(elm_lang$core$String$left, i, str));
			}
		}
	});
var elm_lang$url$Url$Parser$chompAfterProtocol = F2(
	function (protocol, str) {
		if (elm_lang$core$String$isEmpty(str)) {
			return elm_lang$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm_lang$core$String$indexes, '#', str);
			if (!_n0.b) {
				return A3(elm_lang$url$Url$Parser$chompBeforeFragment, protocol, elm_lang$core$Maybe$Nothing, str);
			} else {
				var i = _n0.a;
				return A3(
					elm_lang$url$Url$Parser$chompBeforeFragment,
					protocol,
					elm_lang$core$Maybe$Just(
						A2(elm_lang$core$String$dropLeft, i + 1, str)),
					A2(elm_lang$core$String$left, i, str));
			}
		}
	});
var elm_lang$url$Url$Parser$toUrl = function (str) {
	return A2(elm_lang$core$String$startsWith, 'http://', str) ? A2(
		elm_lang$url$Url$Parser$chompAfterProtocol,
		elm_lang$url$Url$Parser$Http,
		A2(elm_lang$core$String$dropLeft, 7, str)) : (A2(elm_lang$core$String$startsWith, 'https://', str) ? A2(
		elm_lang$url$Url$Parser$chompAfterProtocol,
		elm_lang$url$Url$Parser$Https,
		A2(elm_lang$core$String$dropLeft, 8, str)) : elm_lang$core$Maybe$Nothing);
};
var author$project$Route$fragmentToRoute = function (fragment) {
	var _n0 = elm_lang$url$Url$Parser$toUrl(fragment);
	if (_n0.$ === 'Nothing') {
		return elm_lang$core$Maybe$Nothing;
	} else {
		var segments = _n0.a;
		return A2(elm_lang$url$Url$Parser$parse, author$project$Route$route, segments);
	}
};
var author$project$Route$fromUrl = function (url) {
	var _n0 = url.fragment;
	if (_n0.$ === 'Nothing') {
		return elm_lang$core$Maybe$Just(author$project$Route$Root);
	} else {
		var fragment = _n0.a;
		return author$project$Route$fragmentToRoute(fragment);
	}
};
var author$project$Main$init = function (_n0) {
	var url = _n0.url;
	var flags = _n0.flags;
	return A2(
		author$project$Main$setRoute,
		author$project$Route$fromUrl(url),
		{
			pageState: author$project$Main$Loaded(author$project$Main$initialPage),
			session: {
				user: author$project$Main$decodeUserFromJson(flags)
			}
		});
};
var author$project$Main$SetRoute = function (a) {
	return {$: 'SetRoute', a: a};
};
var author$project$Main$onNavigation = function (url) {
	return author$project$Main$SetRoute(
		author$project$Route$fromUrl(url));
};
var author$project$Main$SetUser = function (a) {
	return {$: 'SetUser', a: a};
};
var elm_lang$core$Platform$Sub$batch = _Platform_batch;
var elm_lang$core$Platform$Sub$none = elm_lang$core$Platform$Sub$batch(_List_Nil);
var author$project$Main$pageSubscriptions = function (page) {
	switch (page.$) {
		case 'Blank':
			return elm_lang$core$Platform$Sub$none;
		case 'Errored':
			return elm_lang$core$Platform$Sub$none;
		case 'NotFound':
			return elm_lang$core$Platform$Sub$none;
		case 'Settings':
			return elm_lang$core$Platform$Sub$none;
		case 'Home':
			return elm_lang$core$Platform$Sub$none;
		case 'Login':
			return elm_lang$core$Platform$Sub$none;
		case 'Register':
			return elm_lang$core$Platform$Sub$none;
		case 'Profile':
			return elm_lang$core$Platform$Sub$none;
		case 'Article':
			return elm_lang$core$Platform$Sub$none;
		default:
			return elm_lang$core$Platform$Sub$none;
	}
};
var elm_lang$json$Json$Decode$value = _Json_decodeValue;
var author$project$Ports$onSessionChange = _Platform_incomingPort('onSessionChange', elm_lang$json$Json$Decode$value);
var author$project$Main$sessionChange = author$project$Ports$onSessionChange(
	function ($) {
		return elm_lang$core$Result$toMaybe(
			A2(elm_lang$json$Json$Decode$decodeValue, author$project$Data$User$decoder, $));
	});
var elm_lang$core$Platform$Sub$map = _Platform_map;
var author$project$Main$subscriptions = function (model) {
	return elm_lang$core$Platform$Sub$batch(
		_List_fromArray(
			[
				author$project$Main$pageSubscriptions(
				author$project$Main$getCurrentPage(model.pageState)),
				A2(elm_lang$core$Platform$Sub$map, author$project$Main$SetUser, author$project$Main$sessionChange)
			]));
};
var author$project$Main$Article = function (a) {
	return {$: 'Article', a: a};
};
var author$project$Main$ArticleMsg = function (a) {
	return {$: 'ArticleMsg', a: a};
};
var author$project$Main$EditorMsg = function (a) {
	return {$: 'EditorMsg', a: a};
};
var author$project$Main$Home = function (a) {
	return {$: 'Home', a: a};
};
var author$project$Main$HomeMsg = function (a) {
	return {$: 'HomeMsg', a: a};
};
var author$project$Main$LoginMsg = function (a) {
	return {$: 'LoginMsg', a: a};
};
var author$project$Main$Profile = F2(
	function (a, b) {
		return {$: 'Profile', a: a, b: b};
	});
var author$project$Main$ProfileMsg = function (a) {
	return {$: 'ProfileMsg', a: a};
};
var author$project$Main$RegisterMsg = function (a) {
	return {$: 'RegisterMsg', a: a};
};
var author$project$Main$SettingsMsg = function (a) {
	return {$: 'SettingsMsg', a: a};
};
var author$project$Data$Article$addBody = F2(
	function (body, article) {
		return {author: article.author, body: body, createdAt: article.createdAt, description: article.description, favorited: article.favorited, favoritesCount: article.favoritesCount, slug: article.slug, tags: article.tags, title: article.title, updatedAt: article.updatedAt};
	});
var author$project$Data$Session$attempt = F3(
	function (attemptedAction, toCmd, session) {
		var _n0 = A2(
			elm_lang$core$Maybe$map,
			function ($) {
				return $.token;
			},
			session.user);
		if (_n0.$ === 'Nothing') {
			return _Utils_Tuple2(
				_List_fromArray(
					['You have been signed out. Please sign back in to ' + (attemptedAction + '.')]),
				elm_lang$core$Platform$Cmd$none);
		} else {
			var token = _n0.a;
			return _Utils_Tuple2(
				_List_Nil,
				toCmd(token));
		}
	});
var author$project$Page$Article$ArticleDeleted = function (a) {
	return {$: 'ArticleDeleted', a: a};
};
var author$project$Page$Article$CommentDeleted = F2(
	function (a, b) {
		return {$: 'CommentDeleted', a: a, b: b};
	});
var author$project$Page$Article$CommentPosted = function (a) {
	return {$: 'CommentPosted', a: a};
};
var author$project$Page$Article$FavoriteCompleted = function (a) {
	return {$: 'FavoriteCompleted', a: a};
};
var author$project$Page$Article$FollowCompleted = function (a) {
	return {$: 'FollowCompleted', a: a};
};
var elm_lang$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			elm_lang$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2(elm_lang$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var author$project$Page$Article$withoutComment = function (id) {
	return elm_lang$core$List$filter(
		function (comment) {
			return !_Utils_eq(comment.id, id);
		});
};
var lukewestby$http_builder$HttpBuilder$delete = lukewestby$http_builder$HttpBuilder$requestWithMethodAndUrl('DELETE');
var author$project$Request$Article$delete = F2(
	function (slug, token) {
		return lukewestby$http_builder$HttpBuilder$toRequest(
			A2(
				author$project$Data$AuthToken$withAuthorization,
				elm_lang$core$Maybe$Just(token),
				lukewestby$http_builder$HttpBuilder$delete(
					author$project$Request$Helpers$apiUrl(
						'/articles/' + author$project$Data$Article$Slug$toString(slug)))));
	});
var author$project$Request$Article$buildFavorite = F3(
	function (builderFromUrl, slug, token) {
		var url = A2(
			elm_lang$core$String$join,
			'/',
			_List_fromArray(
				[
					author$project$Request$Helpers$apiUrl('/articles'),
					author$project$Data$Article$Slug$toString(slug),
					'favorite'
				]));
		var expect = elm_lang$http$Http$expectJson(
			A2(elm_lang$json$Json$Decode$field, 'article', author$project$Data$Article$decoder));
		return lukewestby$http_builder$HttpBuilder$toRequest(
			A2(
				lukewestby$http_builder$HttpBuilder$withExpect,
				expect,
				A2(
					author$project$Data$AuthToken$withAuthorization,
					elm_lang$core$Maybe$Just(token),
					builderFromUrl(url))));
	});
var lukewestby$http_builder$HttpBuilder$post = lukewestby$http_builder$HttpBuilder$requestWithMethodAndUrl('POST');
var author$project$Request$Article$favorite = author$project$Request$Article$buildFavorite(lukewestby$http_builder$HttpBuilder$post);
var author$project$Request$Article$unfavorite = author$project$Request$Article$buildFavorite(lukewestby$http_builder$HttpBuilder$delete);
var author$project$Request$Article$toggleFavorite = F2(
	function (article, authToken) {
		return article.favorited ? A2(author$project$Request$Article$unfavorite, article.slug, authToken) : A2(author$project$Request$Article$favorite, article.slug, authToken);
	});
var author$project$Data$Article$Comment$idToString = function (_n0) {
	var id = _n0.a;
	return elm_lang$core$String$fromInt(id);
};
var author$project$Request$Article$Comments$delete = F3(
	function (slug, commentId, token) {
		return lukewestby$http_builder$HttpBuilder$toRequest(
			A2(
				author$project$Data$AuthToken$withAuthorization,
				elm_lang$core$Maybe$Just(token),
				lukewestby$http_builder$HttpBuilder$delete(
					author$project$Request$Helpers$apiUrl(
						'/articles/' + (author$project$Data$Article$Slug$toString(slug) + ('/comments/' + author$project$Data$Article$Comment$idToString(commentId)))))));
	});
var elm_lang$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			elm_lang$core$List$foldl,
			F2(
				function (_n0, obj) {
					var k = _n0.a;
					var v = _n0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(_Utils_Tuple0),
			pairs));
};
var author$project$Request$Article$Comments$encodeCommentBody = function (body) {
	return elm_lang$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'comment',
				elm_lang$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'body',
							elm_lang$json$Json$Encode$string(body))
						])))
			]));
};
var elm_lang$http$Http$Internal$StringBody = F2(
	function (a, b) {
		return {$: 'StringBody', a: a, b: b};
	});
var elm_lang$http$Http$jsonBody = function (value) {
	return A2(
		elm_lang$http$Http$Internal$StringBody,
		'application/json',
		A2(elm_lang$json$Json$Encode$encode, 0, value));
};
var lukewestby$http_builder$HttpBuilder$withBody = F2(
	function (body, builder) {
		return _Utils_update(
			builder,
			{body: body});
	});
var author$project$Request$Article$Comments$post = F3(
	function (slug, body, token) {
		return lukewestby$http_builder$HttpBuilder$toRequest(
			A2(
				author$project$Data$AuthToken$withAuthorization,
				elm_lang$core$Maybe$Just(token),
				A2(
					lukewestby$http_builder$HttpBuilder$withExpect,
					elm_lang$http$Http$expectJson(
						A2(elm_lang$json$Json$Decode$field, 'comment', author$project$Data$Article$Comment$decoder)),
					A2(
						lukewestby$http_builder$HttpBuilder$withBody,
						elm_lang$http$Http$jsonBody(
							author$project$Request$Article$Comments$encodeCommentBody(body)),
						lukewestby$http_builder$HttpBuilder$post(
							author$project$Request$Helpers$apiUrl(
								'/articles/' + (author$project$Data$Article$Slug$toString(slug) + '/comments')))))));
	});
var author$project$Request$Profile$buildFollow = F3(
	function (builderFromUrl, username, token) {
		return lukewestby$http_builder$HttpBuilder$toRequest(
			A2(
				lukewestby$http_builder$HttpBuilder$withExpect,
				elm_lang$http$Http$expectJson(
					A2(elm_lang$json$Json$Decode$field, 'profile', author$project$Data$Profile$decoder)),
				A2(
					author$project$Data$AuthToken$withAuthorization,
					elm_lang$core$Maybe$Just(token),
					builderFromUrl(
						A2(
							elm_lang$core$String$join,
							'/',
							_List_fromArray(
								[
									author$project$Request$Helpers$apiUrl('/profiles'),
									author$project$Data$User$Username$toString(username),
									'follow'
								]))))));
	});
var author$project$Request$Profile$follow = author$project$Request$Profile$buildFollow(lukewestby$http_builder$HttpBuilder$post);
var author$project$Request$Profile$unfollow = author$project$Request$Profile$buildFollow(lukewestby$http_builder$HttpBuilder$delete);
var author$project$Request$Profile$toggleFollow = F3(
	function (username, following, authToken) {
		return following ? A2(author$project$Request$Profile$unfollow, username, authToken) : A2(author$project$Request$Profile$follow, username, authToken);
	});
var author$project$Util$appendErrors = F2(
	function (model, errors) {
		return _Utils_update(
			model,
			{
				errors: _Utils_ap(model.errors, errors)
			});
	});
var elm_lang$core$Tuple$mapFirst = F2(
	function (func, _n0) {
		var x = _n0.a;
		var y = _n0.b;
		return _Utils_Tuple2(
			func(x),
			y);
	});
var elm_lang$http$Http$send = F2(
	function (resultToMessage, request_) {
		return A2(
			elm_lang$core$Task$attempt,
			resultToMessage,
			elm_lang$http$Http$toTask(request_));
	});
var author$project$Page$Article$update = F3(
	function (session, msg, model) {
		var article = model.article;
		var author = article.author;
		switch (msg.$) {
			case 'DismissErrors':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{errors: _List_Nil}),
					elm_lang$core$Platform$Cmd$none);
			case 'ToggleFavorite':
				var cmdFromAuth = function (authToken) {
					return A2(
						elm_lang$core$Task$attempt,
						author$project$Page$Article$FavoriteCompleted,
						A2(
							elm_lang$core$Task$map,
							author$project$Data$Article$addBody(article.body),
							elm_lang$http$Http$toTask(
								A2(author$project$Request$Article$toggleFavorite, model.article, authToken))));
				};
				return A2(
					elm_lang$core$Tuple$mapFirst,
					author$project$Util$appendErrors(model),
					A3(author$project$Data$Session$attempt, 'favorite', cmdFromAuth, session));
			case 'FavoriteCompleted':
				if (msg.a.$ === 'Ok') {
					var newArticle = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{article: newArticle}),
						elm_lang$core$Platform$Cmd$none);
				} else {
					var error = msg.a.a;
					return _Utils_Tuple2(
						A2(
							author$project$Util$appendErrors,
							model,
							_List_fromArray(
								['There was a server error trying to record your Favorite. Sorry!'])),
						elm_lang$core$Platform$Cmd$none);
				}
			case 'ToggleFollow':
				var cmdFromAuth = function (authToken) {
					return A2(
						elm_lang$http$Http$send,
						author$project$Page$Article$FollowCompleted,
						A3(author$project$Request$Profile$toggleFollow, author.username, author.following, authToken));
				};
				return A2(
					elm_lang$core$Tuple$mapFirst,
					author$project$Util$appendErrors(model),
					A3(author$project$Data$Session$attempt, 'follow', cmdFromAuth, session));
			case 'FollowCompleted':
				if (msg.a.$ === 'Ok') {
					var following = msg.a.a.following;
					var newArticle = _Utils_update(
						article,
						{
							author: _Utils_update(
								author,
								{following: following})
						});
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{article: newArticle}),
						elm_lang$core$Platform$Cmd$none);
				} else {
					var error = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								errors: A2(elm_lang$core$List$cons, 'Unable to follow user.', model.errors)
							}),
						elm_lang$core$Platform$Cmd$none);
				}
			case 'SetCommentText':
				var commentText = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{commentText: commentText}),
					elm_lang$core$Platform$Cmd$none);
			case 'PostComment':
				var comment = model.commentText;
				if (model.commentInFlight || elm_lang$core$String$isEmpty(comment)) {
					return _Utils_Tuple2(model, elm_lang$core$Platform$Cmd$none);
				} else {
					var cmdFromAuth = function (authToken) {
						return A2(
							elm_lang$http$Http$send,
							author$project$Page$Article$CommentPosted,
							A3(author$project$Request$Article$Comments$post, model.article.slug, comment, authToken));
					};
					return A2(
						elm_lang$core$Tuple$mapFirst,
						author$project$Util$appendErrors(
							_Utils_update(
								model,
								{commentInFlight: true})),
						A3(author$project$Data$Session$attempt, 'post a comment', cmdFromAuth, session));
				}
			case 'CommentPosted':
				if (msg.a.$ === 'Ok') {
					var comment = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								commentInFlight: false,
								comments: A2(elm_lang$core$List$cons, comment, model.comments)
							}),
						elm_lang$core$Platform$Cmd$none);
				} else {
					var error = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								errors: _Utils_ap(
									model.errors,
									_List_fromArray(
										['Server error while trying to post comment.']))
							}),
						elm_lang$core$Platform$Cmd$none);
				}
			case 'DeleteComment':
				var id = msg.a;
				var cmdFromAuth = function (authToken) {
					return A2(
						elm_lang$http$Http$send,
						author$project$Page$Article$CommentDeleted(id),
						A3(author$project$Request$Article$Comments$delete, model.article.slug, id, authToken));
				};
				return A2(
					elm_lang$core$Tuple$mapFirst,
					author$project$Util$appendErrors(model),
					A3(author$project$Data$Session$attempt, 'delete comments', cmdFromAuth, session));
			case 'CommentDeleted':
				if (msg.b.$ === 'Ok') {
					var id = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								comments: A2(author$project$Page$Article$withoutComment, id, model.comments)
							}),
						elm_lang$core$Platform$Cmd$none);
				} else {
					var id = msg.a;
					var error = msg.b.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								errors: _Utils_ap(
									model.errors,
									_List_fromArray(
										['Server error while trying to delete comment.']))
							}),
						elm_lang$core$Platform$Cmd$none);
				}
			case 'DeleteArticle':
				var cmdFromAuth = function (authToken) {
					return A2(
						elm_lang$http$Http$send,
						author$project$Page$Article$ArticleDeleted,
						A2(author$project$Request$Article$delete, model.article.slug, authToken));
				};
				return A2(
					elm_lang$core$Tuple$mapFirst,
					author$project$Util$appendErrors(model),
					A3(author$project$Data$Session$attempt, 'delete articles', cmdFromAuth, session));
			default:
				if (msg.a.$ === 'Ok') {
					return _Utils_Tuple2(
						model,
						author$project$Route$replaceUrl(author$project$Route$Home));
				} else {
					var error = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								errors: _Utils_ap(
									model.errors,
									_List_fromArray(
										['Server error while trying to delete article.']))
							}),
						elm_lang$core$Platform$Cmd$none);
				}
		}
	});
var author$project$Page$Article$Editor$CreateCompleted = function (a) {
	return {$: 'CreateCompleted', a: a};
};
var author$project$Page$Article$Editor$EditCompleted = function (a) {
	return {$: 'EditCompleted', a: a};
};
var author$project$Page$Article$Editor$Form = {$: 'Form'};
var author$project$Page$Article$Editor$Body = {$: 'Body'};
var author$project$Page$Article$Editor$Title = {$: 'Title'};
var rtfeldman$elm_validate$Validate$Validator = function (a) {
	return {$: 'Validator', a: a};
};
var rtfeldman$elm_validate$Validate$all = function (validators) {
	var newGetErrors = function (subject) {
		var accumulateErrors = F2(
			function (_n0, totalErrors) {
				var getErrors = _n0.a;
				return _Utils_ap(
					totalErrors,
					getErrors(subject));
			});
		return A3(elm_lang$core$List$foldl, accumulateErrors, _List_Nil, validators);
	};
	return rtfeldman$elm_validate$Validate$Validator(newGetErrors);
};
var rtfeldman$elm_validate$Validate$ifTrue = F2(
	function (test, error) {
		var getErrors = function (subject) {
			return test(subject) ? _List_fromArray(
				[error]) : _List_Nil;
		};
		return rtfeldman$elm_validate$Validate$Validator(getErrors);
	});
var elm_lang$regex$Regex$Match = F4(
	function (match, index, number, submatches) {
		return {index: index, match: match, number: number, submatches: submatches};
	});
var elm_lang$regex$Regex$contains = _Regex_contains;
var elm_lang$regex$Regex$fromStringWith = _Regex_fromStringWith;
var elm_lang$regex$Regex$fromString = function (string) {
	return A2(
		elm_lang$regex$Regex$fromStringWith,
		{caseInsensitive: false, multiline: false},
		string);
};
var elm_lang$regex$Regex$never = _Regex_never;
var rtfeldman$elm_validate$Validate$lacksNonWhitespaceChars = A2(
	elm_lang$core$Maybe$withDefault,
	elm_lang$regex$Regex$never,
	elm_lang$regex$Regex$fromString('^\\s*$'));
var rtfeldman$elm_validate$Validate$isBlank = function (str) {
	return A2(elm_lang$regex$Regex$contains, rtfeldman$elm_validate$Validate$lacksNonWhitespaceChars, str);
};
var rtfeldman$elm_validate$Validate$ifBlank = F2(
	function (subjectToString, error) {
		return A2(
			rtfeldman$elm_validate$Validate$ifTrue,
			function (subject) {
				return rtfeldman$elm_validate$Validate$isBlank(
					subjectToString(subject));
			},
			error);
	});
var author$project$Page$Article$Editor$modelValidator = rtfeldman$elm_validate$Validate$all(
	_List_fromArray(
		[
			A2(
			rtfeldman$elm_validate$Validate$ifBlank,
			function ($) {
				return $.title;
			},
			_Utils_Tuple2(author$project$Page$Article$Editor$Title, 'title can\'t be blank.')),
			A2(
			rtfeldman$elm_validate$Validate$ifBlank,
			function ($) {
				return $.body;
			},
			_Utils_Tuple2(author$project$Page$Article$Editor$Body, 'body can\'t be blank.'))
		]));
var elm_lang$core$String$trim = _String_trim;
var author$project$Page$Article$Editor$tagsFromString = function (str) {
	return A2(
		elm_lang$core$List$filter,
		function ($) {
			return !elm_lang$core$String$isEmpty($);
		},
		A2(
			elm_lang$core$List$map,
			elm_lang$core$String$trim,
			A2(elm_lang$core$String$split, ' ', str)));
};
var elm_lang$json$Json$Encode$list = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				elm_lang$core$List$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(_Utils_Tuple0),
				entries));
	});
var author$project$Request$Article$create = F2(
	function (config, token) {
		var expect = elm_lang$http$Http$expectJson(
			A2(elm_lang$json$Json$Decode$field, 'article', author$project$Data$Article$decoderWithBody));
		var article = elm_lang$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'title',
					elm_lang$json$Json$Encode$string(config.title)),
					_Utils_Tuple2(
					'description',
					elm_lang$json$Json$Encode$string(config.description)),
					_Utils_Tuple2(
					'body',
					elm_lang$json$Json$Encode$string(config.body)),
					_Utils_Tuple2(
					'tagList',
					A2(elm_lang$json$Json$Encode$list, elm_lang$json$Json$Encode$string, config.tags))
				]));
		var body = elm_lang$http$Http$jsonBody(
			elm_lang$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2('article', article)
					])));
		return lukewestby$http_builder$HttpBuilder$toRequest(
			A2(
				lukewestby$http_builder$HttpBuilder$withExpect,
				expect,
				A2(
					lukewestby$http_builder$HttpBuilder$withBody,
					body,
					A2(
						author$project$Data$AuthToken$withAuthorization,
						elm_lang$core$Maybe$Just(token),
						lukewestby$http_builder$HttpBuilder$post(
							author$project$Request$Helpers$apiUrl('/articles'))))));
	});
var lukewestby$http_builder$HttpBuilder$put = lukewestby$http_builder$HttpBuilder$requestWithMethodAndUrl('PUT');
var author$project$Request$Article$update = F3(
	function (slug, config, token) {
		var expect = elm_lang$http$Http$expectJson(
			A2(elm_lang$json$Json$Decode$field, 'article', author$project$Data$Article$decoderWithBody));
		var article = elm_lang$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'title',
					elm_lang$json$Json$Encode$string(config.title)),
					_Utils_Tuple2(
					'description',
					elm_lang$json$Json$Encode$string(config.description)),
					_Utils_Tuple2(
					'body',
					elm_lang$json$Json$Encode$string(config.body))
				]));
		var body = elm_lang$http$Http$jsonBody(
			elm_lang$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2('article', article)
					])));
		return lukewestby$http_builder$HttpBuilder$toRequest(
			A2(
				lukewestby$http_builder$HttpBuilder$withExpect,
				expect,
				A2(
					lukewestby$http_builder$HttpBuilder$withBody,
					body,
					A2(
						author$project$Data$AuthToken$withAuthorization,
						elm_lang$core$Maybe$Just(token),
						lukewestby$http_builder$HttpBuilder$put(
							author$project$Request$Helpers$apiUrl(
								'/articles/' + author$project$Data$Article$Slug$toString(slug)))))));
	});
var author$project$Util$pair = F2(
	function (first, second) {
		return _Utils_Tuple2(first, second);
	});
var rtfeldman$elm_validate$Validate$validate = F2(
	function (_n0, subject) {
		var getErrors = _n0.a;
		return getErrors(subject);
	});
var author$project$Page$Article$Editor$update = F3(
	function (user, msg, model) {
		switch (msg.$) {
			case 'Save':
				var _n1 = A2(rtfeldman$elm_validate$Validate$validate, author$project$Page$Article$Editor$modelValidator, model);
				if (!_n1.b) {
					var _n2 = model.editingArticle;
					if (_n2.$ === 'Nothing') {
						return A2(
							author$project$Util$pair,
							_Utils_update(
								model,
								{errors: _List_Nil, isSaving: true}),
							A2(
								elm_lang$http$Http$send,
								author$project$Page$Article$Editor$CreateCompleted,
								A2(author$project$Request$Article$create, model, user.token)));
					} else {
						var slug = _n2.a;
						return A2(
							author$project$Util$pair,
							_Utils_update(
								model,
								{errors: _List_Nil, isSaving: true}),
							A2(
								elm_lang$http$Http$send,
								author$project$Page$Article$Editor$EditCompleted,
								A3(author$project$Request$Article$update, slug, model, user.token)));
					}
				} else {
					var errors = _n1;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{errors: errors}),
						elm_lang$core$Platform$Cmd$none);
				}
			case 'SetTitle':
				var title = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{title: title}),
					elm_lang$core$Platform$Cmd$none);
			case 'SetDescription':
				var description = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{description: description}),
					elm_lang$core$Platform$Cmd$none);
			case 'SetTags':
				var tags = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							tags: author$project$Page$Article$Editor$tagsFromString(tags)
						}),
					elm_lang$core$Platform$Cmd$none);
			case 'SetBody':
				var body = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{body: body}),
					elm_lang$core$Platform$Cmd$none);
			case 'CreateCompleted':
				if (msg.a.$ === 'Ok') {
					var article = msg.a.a;
					return A2(
						author$project$Util$pair,
						model,
						author$project$Route$replaceUrl(
							author$project$Route$Article(article.slug)));
				} else {
					var error = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								errors: _Utils_ap(
									model.errors,
									_List_fromArray(
										[
											_Utils_Tuple2(author$project$Page$Article$Editor$Form, 'Server error while attempting to publish article')
										])),
								isSaving: false
							}),
						elm_lang$core$Platform$Cmd$none);
				}
			default:
				if (msg.a.$ === 'Ok') {
					var article = msg.a.a;
					return A2(
						author$project$Util$pair,
						model,
						author$project$Route$replaceUrl(
							author$project$Route$Article(article.slug)));
				} else {
					var error = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								errors: _Utils_ap(
									model.errors,
									_List_fromArray(
										[
											_Utils_Tuple2(author$project$Page$Article$Editor$Form, 'Server error while attempting to save article')
										])),
								isSaving: false
							}),
						elm_lang$core$Platform$Cmd$none);
				}
		}
	});
var author$project$Page$Home$FeedMsg = function (a) {
	return {$: 'FeedMsg', a: a};
};
var author$project$Views$Article$Feed$FeedLoadCompleted = F2(
	function (a, b) {
		return {$: 'FeedLoadCompleted', a: a, b: b};
	});
var author$project$Views$Article$Feed$Source$TagFeed = function (a) {
	return {$: 'TagFeed', a: a};
};
var author$project$Views$Article$Feed$Source$tagFeed = author$project$Views$Article$Feed$Source$TagFeed;
var author$project$Views$Article$Feed$selectTag = F2(
	function (maybeAuthToken, tagName) {
		var source = author$project$Views$Article$Feed$Source$tagFeed(tagName);
		return A2(
			elm_lang$core$Task$attempt,
			author$project$Views$Article$Feed$FeedLoadCompleted(source),
			A3(author$project$Views$Article$Feed$fetch, maybeAuthToken, 1, source));
	});
var author$project$Views$Article$Feed$FavoriteCompleted = function (a) {
	return {$: 'FavoriteCompleted', a: a};
};
var author$project$Views$Article$Feed$replaceArticle = F2(
	function (newArticle, oldArticle) {
		return _Utils_eq(newArticle.slug, oldArticle.slug) ? newArticle : oldArticle;
	});
var author$project$Views$Page$bodyId = 'page-body';
var elm_lang$browser$Browser$setScrollTop = _Browser_setPositiveScroll('scrollTop');
var author$project$Views$Article$Feed$scrollToTop = A2(
	elm_lang$core$Task$onError,
	function (_n0) {
		return elm_lang$core$Task$succeed(_Utils_Tuple0);
	},
	A2(elm_lang$browser$Browser$setScrollTop, author$project$Views$Page$bodyId, 0));
var author$project$Views$Article$Feed$isTagFeed = function (source) {
	if (source.$ === 'TagFeed') {
		return true;
	} else {
		return false;
	}
};
var rtfeldman$selectlist$SelectList$selectHelp = F4(
	function (isSelectable, beforeList, selectedElem, afterList) {
		var _n0 = _Utils_Tuple2(beforeList, afterList);
		if (!_n0.a.b) {
			if (!_n0.b.b) {
				return elm_lang$core$Maybe$Nothing;
			} else {
				var _n1 = _n0.b;
				var first = _n1.a;
				var rest = _n1.b;
				if (isSelectable(selectedElem)) {
					return elm_lang$core$Maybe$Just(
						_Utils_Tuple3(beforeList, selectedElem, afterList));
				} else {
					if (isSelectable(first)) {
						return elm_lang$core$Maybe$Just(
							_Utils_Tuple3(
								_Utils_ap(
									beforeList,
									_List_fromArray(
										[selectedElem])),
								first,
								rest));
					} else {
						var _n2 = A4(rtfeldman$selectlist$SelectList$selectHelp, isSelectable, _List_Nil, first, rest);
						if (_n2.$ === 'Nothing') {
							return elm_lang$core$Maybe$Nothing;
						} else {
							var _n3 = _n2.a;
							var newBefore = _n3.a;
							var newSelected = _n3.b;
							var newAfter = _n3.c;
							return elm_lang$core$Maybe$Just(
								_Utils_Tuple3(
									A2(elm_lang$core$List$cons, selectedElem, newBefore),
									newSelected,
									newAfter));
						}
					}
				}
			}
		} else {
			var _n4 = _n0.a;
			var first = _n4.a;
			var rest = _n4.b;
			if (isSelectable(first)) {
				return elm_lang$core$Maybe$Just(
					_Utils_Tuple3(
						_List_Nil,
						first,
						_Utils_ap(
							rest,
							A2(elm_lang$core$List$cons, selectedElem, afterList))));
			} else {
				var _n5 = A4(rtfeldman$selectlist$SelectList$selectHelp, isSelectable, rest, selectedElem, afterList);
				if (_n5.$ === 'Nothing') {
					return elm_lang$core$Maybe$Nothing;
				} else {
					var _n6 = _n5.a;
					var newBefore = _n6.a;
					var newSelected = _n6.b;
					var newAfter = _n6.c;
					return elm_lang$core$Maybe$Just(
						_Utils_Tuple3(
							A2(elm_lang$core$List$cons, first, newBefore),
							newSelected,
							newAfter));
				}
			}
		}
	});
var rtfeldman$selectlist$SelectList$select = F2(
	function (isSelectable, original) {
		var beforeSel = original.a;
		var sel = original.b;
		var afterSel = original.c;
		var _n0 = A4(rtfeldman$selectlist$SelectList$selectHelp, isSelectable, beforeSel, sel, afterSel);
		if (_n0.$ === 'Nothing') {
			return original;
		} else {
			var _n1 = _n0.a;
			var newBefore = _n1.a;
			var newSel = _n1.b;
			var newAfter = _n1.c;
			return A3(rtfeldman$selectlist$SelectList$SelectList, newBefore, newSel, newAfter);
		}
	});
var rtfeldman$selectlist$SelectList$toList = function (_n0) {
	var beforeSel = _n0.a;
	var sel = _n0.b;
	var afterSel = _n0.c;
	return _Utils_ap(
		beforeSel,
		A2(elm_lang$core$List$cons, sel, afterSel));
};
var author$project$Views$Article$Feed$selectFeedSource = F2(
	function (source, sources) {
		var withoutTags = A2(
			elm_lang$core$List$filter,
			function ($) {
				return !author$project$Views$Article$Feed$isTagFeed($);
			},
			rtfeldman$selectlist$SelectList$toList(sources));
		var newSources = function () {
			switch (source.$) {
				case 'YourFeed':
					return withoutTags;
				case 'GlobalFeed':
					return withoutTags;
				case 'FavoritedFeed':
					return withoutTags;
				case 'AuthorFeed':
					return withoutTags;
				default:
					return _Utils_ap(
						withoutTags,
						_List_fromArray(
							[source]));
			}
		}();
		if (!newSources.b) {
			return sources;
		} else {
			var first = newSources.a;
			var rest = newSources.b;
			return A2(
				rtfeldman$selectlist$SelectList$select,
				elm_lang$core$Basics$eq(source),
				A3(rtfeldman$selectlist$SelectList$fromLists, _List_Nil, first, rest));
		}
	});
var author$project$Views$Article$Feed$updateInternal = F3(
	function (session, msg, model) {
		switch (msg.$) {
			case 'DismissErrors':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{errors: _List_Nil}),
					elm_lang$core$Platform$Cmd$none);
			case 'SelectFeedSource':
				var source = msg.a;
				return A2(
					author$project$Util$pair,
					_Utils_update(
						model,
						{isLoading: true}),
					A2(
						elm_lang$core$Task$attempt,
						author$project$Views$Article$Feed$FeedLoadCompleted(source),
						A3(
							author$project$Views$Article$Feed$fetch,
							A2(
								elm_lang$core$Maybe$map,
								function ($) {
									return $.token;
								},
								session.user),
							1,
							source)));
			case 'FeedLoadCompleted':
				if (msg.b.$ === 'Ok') {
					var source = msg.a;
					var _n1 = msg.b.a;
					var activePage = _n1.a;
					var feed = _n1.b;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								activePage: activePage,
								feed: feed,
								feedSources: A2(author$project$Views$Article$Feed$selectFeedSource, source, model.feedSources),
								isLoading: false
							}),
						elm_lang$core$Platform$Cmd$none);
				} else {
					var error = msg.b.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								errors: _Utils_ap(
									model.errors,
									_List_fromArray(
										['Server error while trying to load feed'])),
								isLoading: false
							}),
						elm_lang$core$Platform$Cmd$none);
				}
			case 'ToggleFavorite':
				var article = msg.a;
				var _n2 = session.user;
				if (_n2.$ === 'Nothing') {
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								errors: _Utils_ap(
									model.errors,
									_List_fromArray(
										['You are currently signed out. You must sign in to favorite articles.']))
							}),
						elm_lang$core$Platform$Cmd$none);
				} else {
					var user = _n2.a;
					return A2(
						author$project$Util$pair,
						model,
						A2(
							elm_lang$http$Http$send,
							author$project$Views$Article$Feed$FavoriteCompleted,
							A2(author$project$Request$Article$toggleFavorite, article, user.token)));
				}
			case 'FavoriteCompleted':
				if (msg.a.$ === 'Ok') {
					var article = msg.a.a;
					var feed = model.feed;
					var newFeed = _Utils_update(
						feed,
						{
							articles: A2(
								elm_lang$core$List$map,
								author$project$Views$Article$Feed$replaceArticle(article),
								feed.articles)
						});
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{feed: newFeed}),
						elm_lang$core$Platform$Cmd$none);
				} else {
					var error = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								errors: _Utils_ap(
									model.errors,
									_List_fromArray(
										['Server error while trying to favorite article.']))
							}),
						elm_lang$core$Platform$Cmd$none);
				}
			default:
				var page = msg.a;
				var source = rtfeldman$selectlist$SelectList$selected(model.feedSources);
				return A2(
					author$project$Util$pair,
					model,
					A2(
						elm_lang$core$Task$attempt,
						author$project$Views$Article$Feed$FeedLoadCompleted(source),
						A2(
							elm_lang$core$Task$andThen,
							function (feed) {
								return A2(
									elm_lang$core$Task$map,
									function (_n3) {
										return feed;
									},
									author$project$Views$Article$Feed$scrollToTop);
							},
							A3(
								author$project$Views$Article$Feed$fetch,
								A2(
									elm_lang$core$Maybe$map,
									function ($) {
										return $.token;
									},
									session.user),
								page,
								source))));
		}
	});
var author$project$Views$Article$Feed$update = F3(
	function (session, msg, _n0) {
		var internalModel = _n0.a;
		return A2(
			elm_lang$core$Tuple$mapFirst,
			author$project$Views$Article$Feed$Model,
			A3(author$project$Views$Article$Feed$updateInternal, session, msg, internalModel));
	});
var elm_lang$core$Platform$Cmd$map = _Platform_map;
var author$project$Page$Home$update = F3(
	function (session, msg, model) {
		if (msg.$ === 'FeedMsg') {
			var subMsg = msg.a;
			var _n1 = A3(author$project$Views$Article$Feed$update, session, subMsg, model.feed);
			var newFeed = _n1.a;
			var subCmd = _n1.b;
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{feed: newFeed}),
				A2(elm_lang$core$Platform$Cmd$map, author$project$Page$Home$FeedMsg, subCmd));
		} else {
			var tagName = msg.a;
			var subCmd = A2(
				author$project$Views$Article$Feed$selectTag,
				A2(
					elm_lang$core$Maybe$map,
					function ($) {
						return $.token;
					},
					session.user),
				tagName);
			return _Utils_Tuple2(
				model,
				A2(elm_lang$core$Platform$Cmd$map, author$project$Page$Home$FeedMsg, subCmd));
		}
	});
var author$project$Page$Login$Form = {$: 'Form'};
var author$project$Page$Login$LoginCompleted = function (a) {
	return {$: 'LoginCompleted', a: a};
};
var author$project$Page$Login$NoOp = {$: 'NoOp'};
var author$project$Page$Login$SetUser = function (a) {
	return {$: 'SetUser', a: a};
};
var NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$optionalDecoder = F3(
	function (pathDecoder, valDecoder, fallback) {
		var nullOr = function (decoder) {
			return elm_lang$json$Json$Decode$oneOf(
				_List_fromArray(
					[
						decoder,
						elm_lang$json$Json$Decode$null(fallback)
					]));
		};
		var handleResult = function (input) {
			var _n0 = A2(elm_lang$json$Json$Decode$decodeValue, pathDecoder, input);
			if (_n0.$ === 'Ok') {
				var rawValue = _n0.a;
				var _n1 = A2(
					elm_lang$json$Json$Decode$decodeValue,
					nullOr(valDecoder),
					rawValue);
				if (_n1.$ === 'Ok') {
					var finalResult = _n1.a;
					return elm_lang$json$Json$Decode$succeed(finalResult);
				} else {
					var finalErr = _n1.a;
					return elm_lang$json$Json$Decode$fail(
						elm_lang$json$Json$Decode$errorToString(finalErr));
				}
			} else {
				return elm_lang$json$Json$Decode$succeed(fallback);
			}
		};
		return A2(elm_lang$json$Json$Decode$andThen, handleResult, elm_lang$json$Json$Decode$value);
	});
var NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$optional = F4(
	function (key, valDecoder, fallback, decoder) {
		return A2(
			NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$custom,
			A3(
				NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$optionalDecoder,
				A2(elm_lang$json$Json$Decode$field, key, elm_lang$json$Json$Decode$value),
				valDecoder,
				fallback),
			decoder);
	});
var author$project$Page$Login$optionalError = function (fieldName) {
	var errorToString = function (errorMessage) {
		return A2(
			elm_lang$core$String$join,
			' ',
			_List_fromArray(
				[fieldName, errorMessage]));
	};
	return A3(
		NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$optional,
		fieldName,
		elm_lang$json$Json$Decode$list(
			A2(elm_lang$json$Json$Decode$map, errorToString, elm_lang$json$Json$Decode$string)),
		_List_Nil);
};
var author$project$Page$Login$errorsDecoder = A2(
	author$project$Page$Login$optionalError,
	'password',
	A2(
		author$project$Page$Login$optionalError,
		'username',
		A2(
			author$project$Page$Login$optionalError,
			'email',
			A2(
				author$project$Page$Login$optionalError,
				'email or password',
				NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$decode(
					F4(
						function (emailOrPassword, email, username, password) {
							return elm_lang$core$List$concat(
								_List_fromArray(
									[emailOrPassword, email, username, password]));
						}))))));
var author$project$Page$Login$Email = {$: 'Email'};
var author$project$Page$Login$Password = {$: 'Password'};
var author$project$Page$Login$modelValidator = rtfeldman$elm_validate$Validate$all(
	_List_fromArray(
		[
			A2(
			rtfeldman$elm_validate$Validate$ifBlank,
			function ($) {
				return $.email;
			},
			_Utils_Tuple2(author$project$Page$Login$Email, 'email can\'t be blank.')),
			A2(
			rtfeldman$elm_validate$Validate$ifBlank,
			function ($) {
				return $.password;
			},
			_Utils_Tuple2(author$project$Page$Login$Password, 'password can\'t be blank.'))
		]));
var elm_lang$http$Http$post = F3(
	function (url, body, decoder) {
		return elm_lang$http$Http$request(
			{
				body: body,
				expect: elm_lang$http$Http$expectJson(decoder),
				headers: _List_Nil,
				method: 'POST',
				timeout: elm_lang$core$Maybe$Nothing,
				url: url,
				withCredentials: false
			});
	});
var author$project$Request$User$login = function (_n0) {
	var email = _n0.email;
	var password = _n0.password;
	var user = elm_lang$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'email',
				elm_lang$json$Json$Encode$string(email)),
				_Utils_Tuple2(
				'password',
				elm_lang$json$Json$Encode$string(password))
			]));
	var body = elm_lang$http$Http$jsonBody(
		elm_lang$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2('user', user)
				])));
	return A3(
		elm_lang$http$Http$post,
		author$project$Request$Helpers$apiUrl('/users/login'),
		body,
		A2(elm_lang$json$Json$Decode$field, 'user', author$project$Data$User$decoder));
};
var author$project$Data$AuthToken$encode = function (_n0) {
	var token = _n0.a;
	return elm_lang$json$Json$Encode$string(token);
};
var author$project$Data$User$Photo$encode = function (_n0) {
	var maybeUrl = _n0.a;
	return A2(
		elm_lang$core$Maybe$withDefault,
		elm_lang$json$Json$Encode$null,
		A2(elm_lang$core$Maybe$map, elm_lang$json$Json$Encode$string, maybeUrl));
};
var author$project$Data$User$Username$encode = function (_n0) {
	var username = _n0.a;
	return elm_lang$json$Json$Encode$string(username);
};
var author$project$Data$User$encode = function (user) {
	return elm_lang$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'email',
				elm_lang$json$Json$Encode$string(user.email)),
				_Utils_Tuple2(
				'token',
				author$project$Data$AuthToken$encode(user.token)),
				_Utils_Tuple2(
				'username',
				author$project$Data$User$Username$encode(user.username)),
				_Utils_Tuple2(
				'bio',
				A2(
					elm_lang$core$Maybe$withDefault,
					elm_lang$json$Json$Encode$null,
					A2(elm_lang$core$Maybe$map, elm_lang$json$Json$Encode$string, user.bio))),
				_Utils_Tuple2(
				'image',
				author$project$Data$User$Photo$encode(user.image)),
				_Utils_Tuple2(
				'createdAt',
				elm_lang$json$Json$Encode$string(user.createdAt)),
				_Utils_Tuple2(
				'updatedAt',
				elm_lang$json$Json$Encode$string(user.updatedAt))
			]));
};
var author$project$Request$User$storeSession = function (user) {
	return author$project$Ports$storeSession(
		elm_lang$core$Maybe$Just(
			A2(
				elm_lang$json$Json$Encode$encode,
				0,
				author$project$Data$User$encode(user))));
};
var elm_lang$core$Result$withDefault = F2(
	function (def, result) {
		if (result.$ === 'Ok') {
			var a = result.a;
			return a;
		} else {
			return def;
		}
	});
var author$project$Page$Login$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'SubmitForm':
				var _n1 = A2(rtfeldman$elm_validate$Validate$validate, author$project$Page$Login$modelValidator, model);
				if (!_n1.b) {
					return _Utils_Tuple2(
						_Utils_Tuple2(
							_Utils_update(
								model,
								{errors: _List_Nil}),
							A2(
								elm_lang$http$Http$send,
								author$project$Page$Login$LoginCompleted,
								author$project$Request$User$login(model))),
						author$project$Page$Login$NoOp);
				} else {
					var errors = _n1;
					return _Utils_Tuple2(
						_Utils_Tuple2(
							_Utils_update(
								model,
								{errors: errors}),
							elm_lang$core$Platform$Cmd$none),
						author$project$Page$Login$NoOp);
				}
			case 'SetEmail':
				var email = msg.a;
				return _Utils_Tuple2(
					_Utils_Tuple2(
						_Utils_update(
							model,
							{email: email}),
						elm_lang$core$Platform$Cmd$none),
					author$project$Page$Login$NoOp);
			case 'SetPassword':
				var password = msg.a;
				return _Utils_Tuple2(
					_Utils_Tuple2(
						_Utils_update(
							model,
							{password: password}),
						elm_lang$core$Platform$Cmd$none),
					author$project$Page$Login$NoOp);
			default:
				if (msg.a.$ === 'Err') {
					var error = msg.a.a;
					var errorMessages = function () {
						if (error.$ === 'BadStatus') {
							var response = error.a;
							return A2(
								elm_lang$core$Result$withDefault,
								_List_Nil,
								A2(
									elm_lang$json$Json$Decode$decodeString,
									A2(elm_lang$json$Json$Decode$field, 'errors', author$project$Page$Login$errorsDecoder),
									response.body));
						} else {
							return _List_fromArray(
								['unable to perform login']);
						}
					}();
					return _Utils_Tuple2(
						_Utils_Tuple2(
							_Utils_update(
								model,
								{
									errors: A2(
										elm_lang$core$List$map,
										function (errorMessage) {
											return _Utils_Tuple2(author$project$Page$Login$Form, errorMessage);
										},
										errorMessages)
								}),
							elm_lang$core$Platform$Cmd$none),
						author$project$Page$Login$NoOp);
				} else {
					var user = msg.a.a;
					return _Utils_Tuple2(
						_Utils_Tuple2(
							model,
							elm_lang$core$Platform$Cmd$batch(
								_List_fromArray(
									[
										author$project$Request$User$storeSession(user),
										author$project$Route$replaceUrl(author$project$Route$Home)
									]))),
						author$project$Page$Login$SetUser(user));
				}
		}
	});
var author$project$Page$Profile$FeedMsg = function (a) {
	return {$: 'FeedMsg', a: a};
};
var author$project$Page$Profile$FollowCompleted = function (a) {
	return {$: 'FollowCompleted', a: a};
};
var author$project$Page$Profile$update = F3(
	function (session, msg, model) {
		var profile = model.profile;
		switch (msg.$) {
			case 'DismissErrors':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{errors: _List_Nil}),
					elm_lang$core$Platform$Cmd$none);
			case 'ToggleFollow':
				var _n1 = session.user;
				if (_n1.$ === 'Nothing') {
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								errors: _Utils_ap(
									model.errors,
									_List_fromArray(
										['You are currently signed out. You must be signed in to follow people.']))
							}),
						elm_lang$core$Platform$Cmd$none);
				} else {
					var user = _n1.a;
					return A2(
						author$project$Util$pair,
						model,
						A2(
							elm_lang$http$Http$send,
							author$project$Page$Profile$FollowCompleted,
							A3(author$project$Request$Profile$toggleFollow, profile.username, profile.following, user.token)));
				}
			case 'FollowCompleted':
				if (msg.a.$ === 'Ok') {
					var newProfile = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{profile: newProfile}),
						elm_lang$core$Platform$Cmd$none);
				} else {
					var error = msg.a.a;
					return _Utils_Tuple2(model, elm_lang$core$Platform$Cmd$none);
				}
			default:
				var subMsg = msg.a;
				var _n2 = A3(author$project$Views$Article$Feed$update, session, subMsg, model.feed);
				var newFeed = _n2.a;
				var subCmd = _n2.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{feed: newFeed}),
					A2(elm_lang$core$Platform$Cmd$map, author$project$Page$Profile$FeedMsg, subCmd));
		}
	});
var author$project$Page$Register$Form = {$: 'Form'};
var author$project$Page$Register$NoOp = {$: 'NoOp'};
var author$project$Page$Register$RegisterCompleted = function (a) {
	return {$: 'RegisterCompleted', a: a};
};
var author$project$Page$Register$SetUser = function (a) {
	return {$: 'SetUser', a: a};
};
var author$project$Page$Register$optionalError = function (fieldName) {
	var errorToString = function (errorMessage) {
		return A2(
			elm_lang$core$String$join,
			' ',
			_List_fromArray(
				[fieldName, errorMessage]));
	};
	return A3(
		NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$optional,
		fieldName,
		elm_lang$json$Json$Decode$list(
			A2(elm_lang$json$Json$Decode$map, errorToString, elm_lang$json$Json$Decode$string)),
		_List_Nil);
};
var author$project$Page$Register$errorsDecoder = A2(
	author$project$Page$Register$optionalError,
	'password',
	A2(
		author$project$Page$Register$optionalError,
		'username',
		A2(
			author$project$Page$Register$optionalError,
			'email',
			NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$decode(
				F3(
					function (email, username, password) {
						return elm_lang$core$List$concat(
							_List_fromArray(
								[email, username, password]));
					})))));
var author$project$Page$Register$Email = {$: 'Email'};
var author$project$Page$Register$Username = {$: 'Username'};
var author$project$Page$Register$Password = {$: 'Password'};
var author$project$Page$Register$minPasswordChars = 6;
var author$project$Page$Register$passwordLength = function (_n0) {
	var password = _n0.password;
	return (_Utils_cmp(
		elm_lang$core$String$length(password),
		author$project$Page$Register$minPasswordChars) < 0) ? _List_fromArray(
		[
			_Utils_Tuple2(
			author$project$Page$Register$Password,
			'password must be at least ' + (elm_lang$core$String$fromInt(author$project$Page$Register$minPasswordChars) + ' characters long.'))
		]) : _List_Nil;
};
var rtfeldman$elm_validate$Validate$fromErrors = function (toErrors) {
	return rtfeldman$elm_validate$Validate$Validator(toErrors);
};
var author$project$Page$Register$modelValidator = rtfeldman$elm_validate$Validate$all(
	_List_fromArray(
		[
			A2(
			rtfeldman$elm_validate$Validate$ifBlank,
			function ($) {
				return $.username;
			},
			_Utils_Tuple2(author$project$Page$Register$Username, 'username can\'t be blank.')),
			A2(
			rtfeldman$elm_validate$Validate$ifBlank,
			function ($) {
				return $.email;
			},
			_Utils_Tuple2(author$project$Page$Register$Email, 'email can\'t be blank.')),
			rtfeldman$elm_validate$Validate$fromErrors(author$project$Page$Register$passwordLength)
		]));
var author$project$Request$User$register = function (_n0) {
	var username = _n0.username;
	var email = _n0.email;
	var password = _n0.password;
	var user = elm_lang$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'username',
				elm_lang$json$Json$Encode$string(username)),
				_Utils_Tuple2(
				'email',
				elm_lang$json$Json$Encode$string(email)),
				_Utils_Tuple2(
				'password',
				elm_lang$json$Json$Encode$string(password))
			]));
	var body = elm_lang$http$Http$jsonBody(
		elm_lang$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2('user', user)
				])));
	return A3(
		elm_lang$http$Http$post,
		author$project$Request$Helpers$apiUrl('/users'),
		body,
		A2(elm_lang$json$Json$Decode$field, 'user', author$project$Data$User$decoder));
};
var author$project$Page$Register$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'SubmitForm':
				var _n1 = A2(rtfeldman$elm_validate$Validate$validate, author$project$Page$Register$modelValidator, model);
				if (!_n1.b) {
					return _Utils_Tuple2(
						_Utils_Tuple2(
							_Utils_update(
								model,
								{errors: _List_Nil}),
							A2(
								elm_lang$http$Http$send,
								author$project$Page$Register$RegisterCompleted,
								author$project$Request$User$register(model))),
						author$project$Page$Register$NoOp);
				} else {
					var errors = _n1;
					return _Utils_Tuple2(
						_Utils_Tuple2(
							_Utils_update(
								model,
								{errors: errors}),
							elm_lang$core$Platform$Cmd$none),
						author$project$Page$Register$NoOp);
				}
			case 'SetEmail':
				var email = msg.a;
				return _Utils_Tuple2(
					_Utils_Tuple2(
						_Utils_update(
							model,
							{email: email}),
						elm_lang$core$Platform$Cmd$none),
					author$project$Page$Register$NoOp);
			case 'SetUsername':
				var username = msg.a;
				return _Utils_Tuple2(
					_Utils_Tuple2(
						_Utils_update(
							model,
							{username: username}),
						elm_lang$core$Platform$Cmd$none),
					author$project$Page$Register$NoOp);
			case 'SetPassword':
				var password = msg.a;
				return _Utils_Tuple2(
					_Utils_Tuple2(
						_Utils_update(
							model,
							{password: password}),
						elm_lang$core$Platform$Cmd$none),
					author$project$Page$Register$NoOp);
			default:
				if (msg.a.$ === 'Err') {
					var error = msg.a.a;
					var errorMessages = function () {
						if (error.$ === 'BadStatus') {
							var response = error.a;
							return A2(
								elm_lang$core$Result$withDefault,
								_List_Nil,
								A2(
									elm_lang$json$Json$Decode$decodeString,
									A2(elm_lang$json$Json$Decode$field, 'errors', author$project$Page$Register$errorsDecoder),
									response.body));
						} else {
							return _List_fromArray(
								['unable to process registration']);
						}
					}();
					return _Utils_Tuple2(
						_Utils_Tuple2(
							_Utils_update(
								model,
								{
									errors: A2(
										elm_lang$core$List$map,
										function (errorMessage) {
											return _Utils_Tuple2(author$project$Page$Register$Form, errorMessage);
										},
										errorMessages)
								}),
							elm_lang$core$Platform$Cmd$none),
						author$project$Page$Register$NoOp);
				} else {
					var user = msg.a.a;
					return _Utils_Tuple2(
						_Utils_Tuple2(
							model,
							elm_lang$core$Platform$Cmd$batch(
								_List_fromArray(
									[
										author$project$Request$User$storeSession(user),
										author$project$Route$replaceUrl(author$project$Route$Home)
									]))),
						author$project$Page$Register$SetUser(user));
				}
		}
	});
var author$project$Page$Settings$Form = {$: 'Form'};
var author$project$Page$Settings$NoOp = {$: 'NoOp'};
var author$project$Page$Settings$SaveCompleted = function (a) {
	return {$: 'SaveCompleted', a: a};
};
var author$project$Page$Settings$SetUser = function (a) {
	return {$: 'SetUser', a: a};
};
var author$project$Page$Settings$optionalError = function (fieldName) {
	var errorToString = function (errorMessage) {
		return A2(
			elm_lang$core$String$join,
			' ',
			_List_fromArray(
				[fieldName, errorMessage]));
	};
	return A3(
		NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$optional,
		fieldName,
		elm_lang$json$Json$Decode$list(
			A2(elm_lang$json$Json$Decode$map, errorToString, elm_lang$json$Json$Decode$string)),
		_List_Nil);
};
var author$project$Page$Settings$errorsDecoder = A2(
	author$project$Page$Settings$optionalError,
	'password',
	A2(
		author$project$Page$Settings$optionalError,
		'username',
		A2(
			author$project$Page$Settings$optionalError,
			'email',
			NoRedInk$json_decode_pipeline$Json$Decode$Pipeline$decode(
				F3(
					function (email, username, password) {
						return elm_lang$core$List$concat(
							_List_fromArray(
								[email, username, password]));
					})))));
var author$project$Page$Settings$Email = {$: 'Email'};
var author$project$Page$Settings$Username = {$: 'Username'};
var author$project$Page$Settings$modelValidator = rtfeldman$elm_validate$Validate$all(
	_List_fromArray(
		[
			A2(
			rtfeldman$elm_validate$Validate$ifBlank,
			function ($) {
				return $.username;
			},
			_Utils_Tuple2(author$project$Page$Settings$Username, 'username can\'t be blank.')),
			A2(
			rtfeldman$elm_validate$Validate$ifBlank,
			function ($) {
				return $.email;
			},
			_Utils_Tuple2(author$project$Page$Settings$Email, 'email can\'t be blank.'))
		]));
var elm_lang$core$List$singleton = function (value) {
	return _List_fromArray(
		[value]);
};
var author$project$Request$User$edit = F2(
	function (_n0, maybeToken) {
		var username = _n0.username;
		var email = _n0.email;
		var bio = _n0.bio;
		var password = _n0.password;
		var image = _n0.image;
		var updates = A2(
			elm_lang$core$List$filterMap,
			elm_lang$core$Basics$identity,
			_List_fromArray(
				[
					elm_lang$core$Maybe$Just(
					_Utils_Tuple2(
						'username',
						elm_lang$json$Json$Encode$string(username))),
					elm_lang$core$Maybe$Just(
					_Utils_Tuple2(
						'email',
						elm_lang$json$Json$Encode$string(email))),
					elm_lang$core$Maybe$Just(
					_Utils_Tuple2(
						'bio',
						elm_lang$json$Json$Encode$string(bio))),
					elm_lang$core$Maybe$Just(
					_Utils_Tuple2(
						'image',
						A2(
							elm_lang$core$Maybe$withDefault,
							elm_lang$json$Json$Encode$null,
							A2(elm_lang$core$Maybe$map, elm_lang$json$Json$Encode$string, image)))),
					A2(
					elm_lang$core$Maybe$map,
					function (pass) {
						return _Utils_Tuple2(
							'password',
							elm_lang$json$Json$Encode$string(pass));
					},
					password)
				]));
		var expect = elm_lang$http$Http$expectJson(
			A2(elm_lang$json$Json$Decode$field, 'user', author$project$Data$User$decoder));
		var body = elm_lang$http$Http$jsonBody(
			elm_lang$json$Json$Encode$object(
				elm_lang$core$List$singleton(
					_Utils_Tuple2(
						'user',
						elm_lang$json$Json$Encode$object(updates)))));
		return lukewestby$http_builder$HttpBuilder$toRequest(
			A2(
				author$project$Data$AuthToken$withAuthorization,
				maybeToken,
				A2(
					lukewestby$http_builder$HttpBuilder$withBody,
					body,
					A2(
						lukewestby$http_builder$HttpBuilder$withExpect,
						expect,
						lukewestby$http_builder$HttpBuilder$put(
							author$project$Request$Helpers$apiUrl('/user'))))));
	});
var author$project$Page$Settings$update = F3(
	function (session, msg, model) {
		switch (msg.$) {
			case 'SubmitForm':
				var _n1 = A2(rtfeldman$elm_validate$Validate$validate, author$project$Page$Settings$modelValidator, model);
				if (!_n1.b) {
					return _Utils_Tuple2(
						A2(
							author$project$Util$pair,
							_Utils_update(
								model,
								{errors: _List_Nil}),
							A2(
								elm_lang$http$Http$send,
								author$project$Page$Settings$SaveCompleted,
								A2(
									author$project$Request$User$edit,
									model,
									A2(
										elm_lang$core$Maybe$map,
										function ($) {
											return $.token;
										},
										session.user)))),
						author$project$Page$Settings$NoOp);
				} else {
					var errors = _n1;
					return _Utils_Tuple2(
						_Utils_Tuple2(
							_Utils_update(
								model,
								{errors: errors}),
							elm_lang$core$Platform$Cmd$none),
						author$project$Page$Settings$NoOp);
				}
			case 'SetEmail':
				var email = msg.a;
				return _Utils_Tuple2(
					_Utils_Tuple2(
						_Utils_update(
							model,
							{email: email}),
						elm_lang$core$Platform$Cmd$none),
					author$project$Page$Settings$NoOp);
			case 'SetUsername':
				var username = msg.a;
				return _Utils_Tuple2(
					_Utils_Tuple2(
						_Utils_update(
							model,
							{username: username}),
						elm_lang$core$Platform$Cmd$none),
					author$project$Page$Settings$NoOp);
			case 'SetPassword':
				var passwordStr = msg.a;
				var password = elm_lang$core$String$isEmpty(passwordStr) ? elm_lang$core$Maybe$Nothing : elm_lang$core$Maybe$Just(passwordStr);
				return _Utils_Tuple2(
					_Utils_Tuple2(
						_Utils_update(
							model,
							{password: password}),
						elm_lang$core$Platform$Cmd$none),
					author$project$Page$Settings$NoOp);
			case 'SetBio':
				var bio = msg.a;
				return _Utils_Tuple2(
					_Utils_Tuple2(
						_Utils_update(
							model,
							{bio: bio}),
						elm_lang$core$Platform$Cmd$none),
					author$project$Page$Settings$NoOp);
			case 'SetImage':
				var imageStr = msg.a;
				var image = elm_lang$core$String$isEmpty(imageStr) ? elm_lang$core$Maybe$Nothing : elm_lang$core$Maybe$Just(imageStr);
				return _Utils_Tuple2(
					_Utils_Tuple2(
						_Utils_update(
							model,
							{image: image}),
						elm_lang$core$Platform$Cmd$none),
					author$project$Page$Settings$NoOp);
			default:
				if (msg.a.$ === 'Err') {
					var error = msg.a.a;
					var errorMessages = function () {
						if (error.$ === 'BadStatus') {
							var response = error.a;
							return A2(
								elm_lang$core$Result$withDefault,
								_List_Nil,
								A2(
									elm_lang$json$Json$Decode$decodeString,
									A2(elm_lang$json$Json$Decode$field, 'errors', author$project$Page$Settings$errorsDecoder),
									response.body));
						} else {
							return _List_fromArray(
								['unable to save changes']);
						}
					}();
					var errors = A2(
						elm_lang$core$List$map,
						function (errorMessage) {
							return _Utils_Tuple2(author$project$Page$Settings$Form, errorMessage);
						},
						errorMessages);
					return _Utils_Tuple2(
						_Utils_Tuple2(
							_Utils_update(
								model,
								{errors: errors}),
							elm_lang$core$Platform$Cmd$none),
						author$project$Page$Settings$NoOp);
				} else {
					var user = msg.a.a;
					return _Utils_Tuple2(
						_Utils_Tuple2(
							model,
							elm_lang$core$Platform$Cmd$batch(
								_List_fromArray(
									[
										author$project$Request$User$storeSession(user),
										author$project$Route$replaceUrl(author$project$Route$Home)
									]))),
						author$project$Page$Settings$SetUser(user));
				}
		}
	});
var author$project$Main$updateCurrentPage = F3(
	function (page, msg, model) {
		var toPage = F5(
			function (toModel, toMsg, subUpdate, subMsg, subModel) {
				var _n18 = A2(subUpdate, subMsg, subModel);
				var newModel = _n18.a;
				var newCmd = _n18.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							pageState: author$project$Main$Loaded(
								toModel(newModel))
						}),
					A2(elm_lang$core$Platform$Cmd$map, toMsg, newCmd));
			});
		var session = model.session;
		var errored = author$project$Main$pageErrored(model);
		var _n0 = _Utils_Tuple2(msg, page);
		_n0$17:
		while (true) {
			_n0$18:
			while (true) {
				switch (_n0.a.$) {
					case 'SetRoute':
						var route = _n0.a.a;
						return A2(author$project$Main$setRoute, route, model);
					case 'HomeLoaded':
						if (_n0.a.a.$ === 'Ok') {
							var subModel = _n0.a.a.a;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										pageState: author$project$Main$Loaded(
											author$project$Main$Home(subModel))
									}),
								elm_lang$core$Platform$Cmd$none);
						} else {
							var error = _n0.a.a.a;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										pageState: author$project$Main$Loaded(
											author$project$Main$Errored(error))
									}),
								elm_lang$core$Platform$Cmd$none);
						}
					case 'ProfileLoaded':
						if (_n0.a.b.$ === 'Ok') {
							var _n1 = _n0.a;
							var username = _n1.a;
							var subModel = _n1.b.a;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										pageState: author$project$Main$Loaded(
											A2(author$project$Main$Profile, username, subModel))
									}),
								elm_lang$core$Platform$Cmd$none);
						} else {
							var _n2 = _n0.a;
							var username = _n2.a;
							var error = _n2.b.a;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										pageState: author$project$Main$Loaded(
											author$project$Main$Errored(error))
									}),
								elm_lang$core$Platform$Cmd$none);
						}
					case 'ArticleLoaded':
						if (_n0.a.a.$ === 'Ok') {
							var subModel = _n0.a.a.a;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										pageState: author$project$Main$Loaded(
											author$project$Main$Article(subModel))
									}),
								elm_lang$core$Platform$Cmd$none);
						} else {
							var error = _n0.a.a.a;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										pageState: author$project$Main$Loaded(
											author$project$Main$Errored(error))
									}),
								elm_lang$core$Platform$Cmd$none);
						}
					case 'EditArticleLoaded':
						if (_n0.a.b.$ === 'Ok') {
							var _n3 = _n0.a;
							var slug = _n3.a;
							var subModel = _n3.b.a;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										pageState: author$project$Main$Loaded(
											A2(
												author$project$Main$Editor,
												elm_lang$core$Maybe$Just(slug),
												subModel))
									}),
								elm_lang$core$Platform$Cmd$none);
						} else {
							var _n4 = _n0.a;
							var slug = _n4.a;
							var error = _n4.b.a;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										pageState: author$project$Main$Loaded(
											author$project$Main$Errored(error))
									}),
								elm_lang$core$Platform$Cmd$none);
						}
					case 'SetUser':
						var user = _n0.a.a;
						var cmd = ((!_Utils_eq(session.user, elm_lang$core$Maybe$Nothing)) && _Utils_eq(user, elm_lang$core$Maybe$Nothing)) ? author$project$Route$replaceUrl(author$project$Route$Home) : elm_lang$core$Platform$Cmd$none;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									session: _Utils_update(
										session,
										{user: user})
								}),
							cmd);
					case 'SettingsMsg':
						switch (_n0.b.$) {
							case 'Settings':
								var subMsg = _n0.a.a;
								var subModel = _n0.b.a;
								var _n5 = A3(author$project$Page$Settings$update, model.session, subMsg, subModel);
								var _n6 = _n5.a;
								var pageModel = _n6.a;
								var cmd = _n6.b;
								var msgFromPage = _n5.b;
								var newModel = function () {
									if (msgFromPage.$ === 'NoOp') {
										return model;
									} else {
										var user = msgFromPage.a;
										return _Utils_update(
											model,
											{
												session: {
													user: elm_lang$core$Maybe$Just(user)
												}
											});
									}
								}();
								return _Utils_Tuple2(
									_Utils_update(
										newModel,
										{
											pageState: author$project$Main$Loaded(
												author$project$Main$Settings(pageModel))
										}),
									A2(elm_lang$core$Platform$Cmd$map, author$project$Main$SettingsMsg, cmd));
							case 'NotFound':
								break _n0$17;
							default:
								break _n0$18;
						}
					case 'LoginMsg':
						switch (_n0.b.$) {
							case 'Login':
								var subMsg = _n0.a.a;
								var subModel = _n0.b.a;
								var _n8 = A2(author$project$Page$Login$update, subMsg, subModel);
								var _n9 = _n8.a;
								var pageModel = _n9.a;
								var cmd = _n9.b;
								var msgFromPage = _n8.b;
								var newModel = function () {
									if (msgFromPage.$ === 'NoOp') {
										return model;
									} else {
										var user = msgFromPage.a;
										return _Utils_update(
											model,
											{
												session: {
													user: elm_lang$core$Maybe$Just(user)
												}
											});
									}
								}();
								return _Utils_Tuple2(
									_Utils_update(
										newModel,
										{
											pageState: author$project$Main$Loaded(
												author$project$Main$Login(pageModel))
										}),
									A2(elm_lang$core$Platform$Cmd$map, author$project$Main$LoginMsg, cmd));
							case 'NotFound':
								break _n0$17;
							default:
								break _n0$18;
						}
					case 'RegisterMsg':
						switch (_n0.b.$) {
							case 'Register':
								var subMsg = _n0.a.a;
								var subModel = _n0.b.a;
								var _n11 = A2(author$project$Page$Register$update, subMsg, subModel);
								var _n12 = _n11.a;
								var pageModel = _n12.a;
								var cmd = _n12.b;
								var msgFromPage = _n11.b;
								var newModel = function () {
									if (msgFromPage.$ === 'NoOp') {
										return model;
									} else {
										var user = msgFromPage.a;
										return _Utils_update(
											model,
											{
												session: {
													user: elm_lang$core$Maybe$Just(user)
												}
											});
									}
								}();
								return _Utils_Tuple2(
									_Utils_update(
										newModel,
										{
											pageState: author$project$Main$Loaded(
												author$project$Main$Register(pageModel))
										}),
									A2(elm_lang$core$Platform$Cmd$map, author$project$Main$RegisterMsg, cmd));
							case 'NotFound':
								break _n0$17;
							default:
								break _n0$18;
						}
					case 'HomeMsg':
						switch (_n0.b.$) {
							case 'Home':
								var subMsg = _n0.a.a;
								var subModel = _n0.b.a;
								return A5(
									toPage,
									author$project$Main$Home,
									author$project$Main$HomeMsg,
									author$project$Page$Home$update(session),
									subMsg,
									subModel);
							case 'NotFound':
								break _n0$17;
							default:
								break _n0$18;
						}
					case 'ProfileMsg':
						switch (_n0.b.$) {
							case 'Profile':
								var subMsg = _n0.a.a;
								var _n14 = _n0.b;
								var username = _n14.a;
								var subModel = _n14.b;
								return A5(
									toPage,
									author$project$Main$Profile(username),
									author$project$Main$ProfileMsg,
									author$project$Page$Profile$update(model.session),
									subMsg,
									subModel);
							case 'NotFound':
								break _n0$17;
							default:
								break _n0$18;
						}
					case 'ArticleMsg':
						switch (_n0.b.$) {
							case 'Article':
								var subMsg = _n0.a.a;
								var subModel = _n0.b.a;
								return A5(
									toPage,
									author$project$Main$Article,
									author$project$Main$ArticleMsg,
									author$project$Page$Article$update(model.session),
									subMsg,
									subModel);
							case 'NotFound':
								break _n0$17;
							default:
								break _n0$18;
						}
					default:
						switch (_n0.b.$) {
							case 'Editor':
								var subMsg = _n0.a.a;
								var _n15 = _n0.b;
								var slug = _n15.a;
								var subModel = _n15.b;
								var _n16 = model.session.user;
								if (_n16.$ === 'Nothing') {
									return _Utils_eq(slug, elm_lang$core$Maybe$Nothing) ? A2(errored, author$project$Views$Page$NewArticle, 'You must be signed in to post articles.') : A2(errored, author$project$Views$Page$Other, 'You must be signed in to edit articles.');
								} else {
									var user = _n16.a;
									return A5(
										toPage,
										author$project$Main$Editor(slug),
										author$project$Main$EditorMsg,
										author$project$Page$Article$Editor$update(user),
										subMsg,
										subModel);
								}
							case 'NotFound':
								break _n0$17;
							default:
								break _n0$18;
						}
				}
			}
			return _Utils_Tuple2(model, elm_lang$core$Platform$Cmd$none);
		}
		var _n17 = _n0.b;
		return _Utils_Tuple2(model, elm_lang$core$Platform$Cmd$none);
	});
var author$project$Main$update = F2(
	function (msg, model) {
		return A3(
			author$project$Main$updateCurrentPage,
			author$project$Main$getCurrentPage(model.pageState),
			msg,
			model);
	});
var elm_lang$virtual_dom$VirtualDom$map = _VirtualDom_map;
var elm_lang$html$Html$map = elm_lang$virtual_dom$VirtualDom$map;
var author$project$Main$mapBody = F2(
	function (transform, _n0) {
		var body = _n0.body;
		var title = _n0.title;
		return {
			body: A2(
				elm_lang$core$List$map,
				elm_lang$html$Html$map(transform),
				body),
			title: title
		};
	});
var elm_explorations$markdown$Markdown$defaultOptions = {
	defaultHighlighting: elm_lang$core$Maybe$Nothing,
	githubFlavored: elm_lang$core$Maybe$Just(
		{breaks: false, tables: false}),
	sanitize: true,
	smartypants: false
};
var elm_explorations$markdown$Markdown$toHtmlWith = _Markdown_toHtml;
var elm_explorations$markdown$Markdown$toHtml = elm_explorations$markdown$Markdown$toHtmlWith(elm_explorations$markdown$Markdown$defaultOptions);
var author$project$Data$Article$bodyToHtml = F2(
	function (_n0, attributes) {
		var markdown = _n0.a;
		return A2(elm_explorations$markdown$Markdown$toHtml, attributes, markdown);
	});
var author$project$Data$User$Photo$defaultPhotoUrl = 'https://static.productionready.io/images/smiley-cyrus.jpg';
var author$project$Data$User$Photo$photoToUrl = function (_n0) {
	var maybeUrl = _n0.a;
	if (maybeUrl.$ === 'Nothing') {
		return author$project$Data$User$Photo$defaultPhotoUrl;
	} else {
		if (maybeUrl.a === '') {
			return author$project$Data$User$Photo$defaultPhotoUrl;
		} else {
			var url = maybeUrl.a;
			return url;
		}
	}
};
var elm_lang$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			elm_lang$json$Json$Encode$string(string));
	});
var elm_lang$html$Html$Attributes$src = function (url) {
	return A2(
		elm_lang$html$Html$Attributes$stringProperty,
		'src',
		_VirtualDom_noJavaScriptOrHtmlUri(url));
};
var author$project$Data$User$Photo$src = function ($) {
	return elm_lang$html$Html$Attributes$src(
		author$project$Data$User$Photo$photoToUrl($));
};
var author$project$Page$Article$PostComment = {$: 'PostComment'};
var author$project$Page$Article$SetCommentText = function (a) {
	return {$: 'SetCommentText', a: a};
};
var elm_lang$html$Html$Attributes$href = function (url) {
	return A2(
		elm_lang$html$Html$Attributes$stringProperty,
		'href',
		_VirtualDom_noJavaScriptUri(url));
};
var author$project$Route$href = function (targetRoute) {
	return elm_lang$html$Html$Attributes$href(
		author$project$Route$routeToString(targetRoute));
};
var elm_lang$html$Html$a = _VirtualDom_node('a');
var elm_lang$html$Html$button = _VirtualDom_node('button');
var elm_lang$html$Html$div = _VirtualDom_node('div');
var elm_lang$html$Html$form = _VirtualDom_node('form');
var elm_lang$html$Html$img = _VirtualDom_node('img');
var elm_lang$html$Html$p = _VirtualDom_node('p');
var elm_lang$virtual_dom$VirtualDom$text = _VirtualDom_text;
var elm_lang$html$Html$text = elm_lang$virtual_dom$VirtualDom$text;
var elm_lang$html$Html$textarea = _VirtualDom_node('textarea');
var elm_lang$virtual_dom$VirtualDom$attribute = F2(
	function (key, value) {
		return A2(
			_VirtualDom_attribute,
			_VirtualDom_noOnOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var elm_lang$html$Html$Attributes$attribute = elm_lang$virtual_dom$VirtualDom$attribute;
var elm_lang$html$Html$Attributes$class = elm_lang$html$Html$Attributes$stringProperty('className');
var elm_lang$json$Json$Encode$bool = _Json_wrap;
var elm_lang$html$Html$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			_VirtualDom_property,
			key,
			elm_lang$json$Json$Encode$bool(bool));
	});
var elm_lang$html$Html$Attributes$disabled = elm_lang$html$Html$Attributes$boolProperty('disabled');
var elm_lang$html$Html$Attributes$placeholder = elm_lang$html$Html$Attributes$stringProperty('placeholder');
var elm_lang$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var elm_lang$virtual_dom$VirtualDom$Sync = function (a) {
	return {$: 'Sync', a: a};
};
var elm_lang$virtual_dom$VirtualDom$on = _VirtualDom_on;
var elm_lang$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			elm_lang$virtual_dom$VirtualDom$on,
			event,
			elm_lang$virtual_dom$VirtualDom$Normal(
				A2(elm_lang$json$Json$Decode$map, elm_lang$virtual_dom$VirtualDom$Sync, decoder)));
	});
var elm_lang$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3(elm_lang$core$List$foldr, elm_lang$json$Json$Decode$field, decoder, fields);
	});
var elm_lang$html$Html$Events$targetValue = A2(
	elm_lang$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	elm_lang$json$Json$Decode$string);
var elm_lang$html$Html$Events$onInput = function (tagger) {
	return A2(
		elm_lang$html$Html$Events$on,
		'input',
		A2(elm_lang$json$Json$Decode$map, tagger, elm_lang$html$Html$Events$targetValue));
};
var elm_lang$html$Html$Events$alwaysPreventDefault = function (msg) {
	return _Utils_Tuple2(msg, true);
};
var elm_lang$html$Html$Events$syncTuple = function (_n0) {
	var msg = _n0.a;
	var bool = _n0.b;
	return _Utils_Tuple2(
		elm_lang$virtual_dom$VirtualDom$Sync(msg),
		bool);
};
var elm_lang$virtual_dom$VirtualDom$MayPreventDefault = function (a) {
	return {$: 'MayPreventDefault', a: a};
};
var elm_lang$html$Html$Events$preventDefaultOn = F2(
	function (event, decoder) {
		return A2(
			elm_lang$virtual_dom$VirtualDom$on,
			event,
			elm_lang$virtual_dom$VirtualDom$MayPreventDefault(
				A2(elm_lang$json$Json$Decode$map, elm_lang$html$Html$Events$syncTuple, decoder)));
	});
var elm_lang$html$Html$Events$onSubmit = function (msg) {
	return A2(
		elm_lang$html$Html$Events$preventDefaultOn,
		'submit',
		A2(
			elm_lang$json$Json$Decode$map,
			elm_lang$html$Html$Events$alwaysPreventDefault,
			elm_lang$json$Json$Decode$succeed(msg)));
};
var author$project$Page$Article$viewAddComment = F2(
	function (postingDisabled, maybeUser) {
		if (maybeUser.$ === 'Nothing') {
			return A2(
				elm_lang$html$Html$p,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						elm_lang$html$Html$a,
						_List_fromArray(
							[
								author$project$Route$href(author$project$Route$Login)
							]),
						_List_fromArray(
							[
								elm_lang$html$Html$text('Sign in')
							])),
						elm_lang$html$Html$text(' or '),
						A2(
						elm_lang$html$Html$a,
						_List_fromArray(
							[
								author$project$Route$href(author$project$Route$Register)
							]),
						_List_fromArray(
							[
								elm_lang$html$Html$text('sign up')
							])),
						elm_lang$html$Html$text(' to add comments on this article.')
					]));
		} else {
			var user = maybeUser.a;
			return A2(
				elm_lang$html$Html$form,
				_List_fromArray(
					[
						elm_lang$html$Html$Attributes$class('card comment-form'),
						elm_lang$html$Html$Events$onSubmit(author$project$Page$Article$PostComment)
					]),
				_List_fromArray(
					[
						A2(
						elm_lang$html$Html$div,
						_List_fromArray(
							[
								elm_lang$html$Html$Attributes$class('card-block')
							]),
						_List_fromArray(
							[
								A2(
								elm_lang$html$Html$textarea,
								_List_fromArray(
									[
										elm_lang$html$Html$Attributes$class('form-control'),
										elm_lang$html$Html$Attributes$placeholder('Write a comment...'),
										A2(elm_lang$html$Html$Attributes$attribute, 'rows', '3'),
										elm_lang$html$Html$Events$onInput(author$project$Page$Article$SetCommentText)
									]),
								_List_Nil)
							])),
						A2(
						elm_lang$html$Html$div,
						_List_fromArray(
							[
								elm_lang$html$Html$Attributes$class('card-footer')
							]),
						_List_fromArray(
							[
								A2(
								elm_lang$html$Html$img,
								_List_fromArray(
									[
										elm_lang$html$Html$Attributes$class('comment-author-img'),
										author$project$Data$User$Photo$src(user.image)
									]),
								_List_Nil),
								A2(
								elm_lang$html$Html$button,
								_List_fromArray(
									[
										elm_lang$html$Html$Attributes$class('btn btn-sm btn-primary'),
										elm_lang$html$Html$Attributes$disabled(postingDisabled)
									]),
								_List_fromArray(
									[
										elm_lang$html$Html$text('Post Comment')
									]))
							]))
					]));
		}
	});
var author$project$Page$Article$DismissErrors = {$: 'DismissErrors'};
var author$project$Page$Article$DeleteArticle = {$: 'DeleteArticle'};
var elm_lang$html$Html$i = _VirtualDom_node('i');
var elm_lang$html$Html$Events$onClick = function (msg) {
	return A2(
		elm_lang$html$Html$Events$on,
		'click',
		elm_lang$json$Json$Decode$succeed(msg));
};
var author$project$Page$Article$deleteButton = function (article) {
	return A2(
		elm_lang$html$Html$button,
		_List_fromArray(
			[
				elm_lang$html$Html$Attributes$class('btn btn-outline-danger btn-sm'),
				elm_lang$html$Html$Events$onClick(author$project$Page$Article$DeleteArticle)
			]),
		_List_fromArray(
			[
				A2(
				elm_lang$html$Html$i,
				_List_fromArray(
					[
						elm_lang$html$Html$Attributes$class('ion-trash-a')
					]),
				_List_Nil),
				elm_lang$html$Html$text(' Delete Article')
			]));
};
var author$project$Page$Article$editButton = function (article) {
	return A2(
		elm_lang$html$Html$a,
		_List_fromArray(
			[
				elm_lang$html$Html$Attributes$class('btn btn-outline-secondary btn-sm'),
				author$project$Route$href(
				author$project$Route$EditArticle(article.slug))
			]),
		_List_fromArray(
			[
				A2(
				elm_lang$html$Html$i,
				_List_fromArray(
					[
						elm_lang$html$Html$Attributes$class('ion-edit')
					]),
				_List_Nil),
				elm_lang$html$Html$text(' Edit Article')
			]));
};
var author$project$Page$Article$ToggleFavorite = {$: 'ToggleFavorite'};
var elm_lang$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 'MayStopPropagation', a: a};
};
var elm_lang$html$Html$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			elm_lang$virtual_dom$VirtualDom$on,
			event,
			elm_lang$virtual_dom$VirtualDom$MayStopPropagation(
				A2(elm_lang$json$Json$Decode$map, elm_lang$html$Html$Events$syncTuple, decoder)));
	});
var author$project$Util$onClickStopPropagation = function (msg) {
	return A2(
		elm_lang$html$Html$Events$stopPropagationOn,
		'click',
		elm_lang$json$Json$Decode$succeed(
			_Utils_Tuple2(msg, true)));
};
var author$project$Views$Article$Favorite$button = F4(
	function (toggleFavorite, article, extraAttributes, extraChildren) {
		var favoriteButtonClass = article.favorited ? 'btn-primary' : 'btn-outline-primary';
		var children = _Utils_ap(
			_List_fromArray(
				[
					A2(
					elm_lang$html$Html$i,
					_List_fromArray(
						[
							elm_lang$html$Html$Attributes$class('ion-heart')
						]),
					_List_Nil)
				]),
			extraChildren);
		var attributes = _Utils_ap(
			_List_fromArray(
				[
					elm_lang$html$Html$Attributes$class('btn btn-sm ' + favoriteButtonClass),
					author$project$Util$onClickStopPropagation(
					toggleFavorite(article))
				]),
			extraAttributes);
		return A2(elm_lang$html$Html$button, attributes, children);
	});
var author$project$Page$Article$favoriteButton = function (article) {
	var favoriteText = ' Favorite Article (' + (elm_lang$core$String$fromInt(article.favoritesCount) + ')');
	return A4(
		author$project$Views$Article$Favorite$button,
		function (_n0) {
			return author$project$Page$Article$ToggleFavorite;
		},
		article,
		_List_Nil,
		_List_fromArray(
			[
				elm_lang$html$Html$text(favoriteText)
			]));
};
var author$project$Page$Article$ToggleFollow = {$: 'ToggleFollow'};
var author$project$Views$User$Follow$button = F2(
	function (toggleFollow, _n0) {
		var following = _n0.following;
		var username = _n0.username;
		var _n1 = following ? _Utils_Tuple2('Unfollow', 'btn-secondary') : _Utils_Tuple2('Follow', 'btn-outline-secondary');
		var prefix = _n1.a;
		var secondaryClass = _n1.b;
		var classes = elm_lang$html$Html$Attributes$class(
			A2(
				elm_lang$core$String$join,
				' ',
				_List_fromArray(
					['btn', 'btn-sm', secondaryClass, 'action-btn'])));
		return A2(
			elm_lang$html$Html$button,
			_List_fromArray(
				[
					classes,
					elm_lang$html$Html$Events$onClick(
					toggleFollow(username))
				]),
			_List_fromArray(
				[
					A2(
					elm_lang$html$Html$i,
					_List_fromArray(
						[
							elm_lang$html$Html$Attributes$class('ion-plus-round')
						]),
					_List_Nil),
					elm_lang$html$Html$text(
					' ' + (prefix + (' ' + author$project$Data$User$Username$toString(username))))
				]));
	});
var author$project$Page$Article$followButton = author$project$Views$User$Follow$button(
	function (_n0) {
		return author$project$Page$Article$ToggleFollow;
	});
var author$project$Page$Article$viewButtons = F3(
	function (article, author, maybeUser) {
		var isMyArticle = _Utils_eq(
			A2(
				elm_lang$core$Maybe$map,
				function ($) {
					return $.username;
				},
				maybeUser),
			elm_lang$core$Maybe$Just(author.username));
		return isMyArticle ? _List_fromArray(
			[
				author$project$Page$Article$editButton(article),
				elm_lang$html$Html$text(' '),
				author$project$Page$Article$deleteButton(article)
			]) : _List_fromArray(
			[
				author$project$Page$Article$followButton(author),
				elm_lang$html$Html$text(' '),
				author$project$Page$Article$favoriteButton(article)
			]);
	});
var author$project$Views$Article$formattedTimestamp = function (article) {
	return 'TODO';
};
var elm_lang$html$Html$span = _VirtualDom_node('span');
var author$project$Views$Article$viewTimestamp = function (article) {
	return A2(
		elm_lang$html$Html$span,
		_List_fromArray(
			[
				elm_lang$html$Html$Attributes$class('date')
			]),
		_List_fromArray(
			[
				elm_lang$html$Html$text(
				author$project$Views$Article$formattedTimestamp(article))
			]));
};
var author$project$Data$User$Username$toHtml = function (_n0) {
	var username = _n0.a;
	return elm_lang$html$Html$text(username);
};
var author$project$Views$Author$view = function (username) {
	return A2(
		elm_lang$html$Html$a,
		_List_fromArray(
			[
				elm_lang$html$Html$Attributes$class('author'),
				author$project$Route$href(
				author$project$Route$Profile(username))
			]),
		_List_fromArray(
			[
				author$project$Data$User$Username$toHtml(username)
			]));
};
var elm_lang$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var elm_lang$virtual_dom$VirtualDom$style = _VirtualDom_style;
var elm_lang$html$Html$Attributes$style = elm_lang$virtual_dom$VirtualDom$style;
var author$project$Views$Errors$view = F2(
	function (dismissErrors, errors) {
		return elm_lang$core$List$isEmpty(errors) ? elm_lang$html$Html$text('') : A2(
			elm_lang$html$Html$div,
			_List_fromArray(
				[
					elm_lang$html$Html$Attributes$class('error-messages'),
					A2(elm_lang$html$Html$Attributes$style, 'position', 'fixed'),
					A2(elm_lang$html$Html$Attributes$style, 'top', '0'),
					A2(elm_lang$html$Html$Attributes$style, 'background', 'rgb(250, 250, 250)'),
					A2(elm_lang$html$Html$Attributes$style, 'padding', '20px'),
					A2(elm_lang$html$Html$Attributes$style, 'border', '1px solid')
				]),
			_Utils_ap(
				A2(
					elm_lang$core$List$map,
					function (error) {
						return A2(
							elm_lang$html$Html$p,
							_List_Nil,
							_List_fromArray(
								[
									elm_lang$html$Html$text(error)
								]));
					},
					errors),
				_List_fromArray(
					[
						A2(
						elm_lang$html$Html$button,
						_List_fromArray(
							[
								elm_lang$html$Html$Events$onClick(dismissErrors)
							]),
						_List_fromArray(
							[
								elm_lang$html$Html$text('Ok')
							]))
					])));
	});
var elm_lang$html$Html$h1 = _VirtualDom_node('h1');
var author$project$Page$Article$viewBanner = F4(
	function (errors, article, author, maybeUser) {
		var buttons = A3(author$project$Page$Article$viewButtons, article, author, maybeUser);
		return A2(
			elm_lang$html$Html$div,
			_List_fromArray(
				[
					elm_lang$html$Html$Attributes$class('banner')
				]),
			_List_fromArray(
				[
					A2(
					elm_lang$html$Html$div,
					_List_fromArray(
						[
							elm_lang$html$Html$Attributes$class('container')
						]),
					_List_fromArray(
						[
							A2(
							elm_lang$html$Html$h1,
							_List_Nil,
							_List_fromArray(
								[
									elm_lang$html$Html$text(article.title)
								])),
							A2(
							elm_lang$html$Html$div,
							_List_fromArray(
								[
									elm_lang$html$Html$Attributes$class('article-meta')
								]),
							_Utils_ap(
								_List_fromArray(
									[
										A2(
										elm_lang$html$Html$a,
										_List_fromArray(
											[
												author$project$Route$href(
												author$project$Route$Profile(author.username))
											]),
										_List_fromArray(
											[
												A2(
												elm_lang$html$Html$img,
												_List_fromArray(
													[
														author$project$Data$User$Photo$src(author.image)
													]),
												_List_Nil)
											])),
										A2(
										elm_lang$html$Html$div,
										_List_fromArray(
											[
												elm_lang$html$Html$Attributes$class('info')
											]),
										_List_fromArray(
											[
												author$project$Views$Author$view(author.username),
												author$project$Views$Article$viewTimestamp(article)
											]))
									]),
								buttons)),
							A2(author$project$Views$Errors$view, author$project$Page$Article$DismissErrors, errors)
						]))
				]));
	});
var author$project$Page$Article$DeleteComment = function (a) {
	return {$: 'DeleteComment', a: a};
};
var author$project$Page$Article$formatCommentTimestamp = function (_n0) {
	return '';
};
var author$project$Util$viewIf = F2(
	function (condition, content) {
		return condition ? content : elm_lang$html$Html$text('');
	});
var author$project$Page$Article$viewComment = F2(
	function (user, comment) {
		var isAuthor = _Utils_eq(
			A2(
				elm_lang$core$Maybe$map,
				function ($) {
					return $.username;
				},
				user),
			elm_lang$core$Maybe$Just(comment.author.username));
		var author = comment.author;
		return A2(
			elm_lang$html$Html$div,
			_List_fromArray(
				[
					elm_lang$html$Html$Attributes$class('card')
				]),
			_List_fromArray(
				[
					A2(
					elm_lang$html$Html$div,
					_List_fromArray(
						[
							elm_lang$html$Html$Attributes$class('card-block')
						]),
					_List_fromArray(
						[
							A2(
							elm_lang$html$Html$p,
							_List_fromArray(
								[
									elm_lang$html$Html$Attributes$class('card-text')
								]),
							_List_fromArray(
								[
									elm_lang$html$Html$text(comment.body)
								]))
						])),
					A2(
					elm_lang$html$Html$div,
					_List_fromArray(
						[
							elm_lang$html$Html$Attributes$class('card-footer')
						]),
					_List_fromArray(
						[
							A2(
							elm_lang$html$Html$a,
							_List_fromArray(
								[
									elm_lang$html$Html$Attributes$class('comment-author'),
									elm_lang$html$Html$Attributes$href('')
								]),
							_List_fromArray(
								[
									A2(
									elm_lang$html$Html$img,
									_List_fromArray(
										[
											elm_lang$html$Html$Attributes$class('comment-author-img'),
											author$project$Data$User$Photo$src(author.image)
										]),
									_List_Nil),
									elm_lang$html$Html$text(' ')
								])),
							elm_lang$html$Html$text(' '),
							A2(
							elm_lang$html$Html$a,
							_List_fromArray(
								[
									elm_lang$html$Html$Attributes$class('comment-author'),
									author$project$Route$href(
									author$project$Route$Profile(author.username))
								]),
							_List_fromArray(
								[
									elm_lang$html$Html$text(
									author$project$Data$User$Username$toString(comment.author.username))
								])),
							A2(
							elm_lang$html$Html$span,
							_List_fromArray(
								[
									elm_lang$html$Html$Attributes$class('date-posted')
								]),
							_List_fromArray(
								[
									elm_lang$html$Html$text(
									author$project$Page$Article$formatCommentTimestamp(comment.createdAt))
								])),
							A2(
							author$project$Util$viewIf,
							isAuthor,
							A2(
								elm_lang$html$Html$span,
								_List_fromArray(
									[
										elm_lang$html$Html$Attributes$class('mod-options'),
										elm_lang$html$Html$Events$onClick(
										author$project$Page$Article$DeleteComment(comment.id))
									]),
								_List_fromArray(
									[
										A2(
										elm_lang$html$Html$i,
										_List_fromArray(
											[
												elm_lang$html$Html$Attributes$class('ion-trash-a')
											]),
										_List_Nil)
									])))
						]))
				]));
	});
var elm_lang$html$Html$hr = _VirtualDom_node('hr');
var author$project$Page$Article$view = F2(
	function (session, model) {
		var postingDisabled = model.commentInFlight;
		var article = model.article;
		var author = article.author;
		var buttons = A3(author$project$Page$Article$viewButtons, article, author, session.user);
		return {
			content: A2(
				elm_lang$html$Html$div,
				_List_fromArray(
					[
						elm_lang$html$Html$Attributes$class('article-page')
					]),
				_List_fromArray(
					[
						A4(author$project$Page$Article$viewBanner, model.errors, article, author, session.user),
						A2(
						elm_lang$html$Html$div,
						_List_fromArray(
							[
								elm_lang$html$Html$Attributes$class('container page')
							]),
						_List_fromArray(
							[
								A2(
								elm_lang$html$Html$div,
								_List_fromArray(
									[
										elm_lang$html$Html$Attributes$class('row article-content')
									]),
								_List_fromArray(
									[
										A2(
										elm_lang$html$Html$div,
										_List_fromArray(
											[
												elm_lang$html$Html$Attributes$class('col-md-12')
											]),
										_List_fromArray(
											[
												A2(author$project$Data$Article$bodyToHtml, article.body, _List_Nil)
											]))
									])),
								A2(elm_lang$html$Html$hr, _List_Nil, _List_Nil),
								A2(
								elm_lang$html$Html$div,
								_List_fromArray(
									[
										elm_lang$html$Html$Attributes$class('article-actions')
									]),
								_List_fromArray(
									[
										A2(
										elm_lang$html$Html$div,
										_List_fromArray(
											[
												elm_lang$html$Html$Attributes$class('article-meta')
											]),
										_Utils_ap(
											_List_fromArray(
												[
													A2(
													elm_lang$html$Html$a,
													_List_fromArray(
														[
															author$project$Route$href(
															author$project$Route$Profile(author.username))
														]),
													_List_fromArray(
														[
															A2(
															elm_lang$html$Html$img,
															_List_fromArray(
																[
																	author$project$Data$User$Photo$src(author.image)
																]),
															_List_Nil)
														])),
													A2(
													elm_lang$html$Html$div,
													_List_fromArray(
														[
															elm_lang$html$Html$Attributes$class('info')
														]),
													_List_fromArray(
														[
															author$project$Views$Author$view(author.username),
															author$project$Views$Article$viewTimestamp(article)
														]))
												]),
											buttons))
									])),
								A2(
								elm_lang$html$Html$div,
								_List_fromArray(
									[
										elm_lang$html$Html$Attributes$class('row')
									]),
								_List_fromArray(
									[
										A2(
										elm_lang$html$Html$div,
										_List_fromArray(
											[
												elm_lang$html$Html$Attributes$class('col-xs-12 col-md-8 offset-md-2')
											]),
										A2(
											elm_lang$core$List$cons,
											A2(author$project$Page$Article$viewAddComment, postingDisabled, session.user),
											A2(
												elm_lang$core$List$map,
												author$project$Page$Article$viewComment(session.user),
												model.comments)))
									]))
							]))
					])),
			title: article.title
		};
	});
var author$project$Page$Article$Editor$Save = {$: 'Save'};
var author$project$Page$Article$Editor$SetBody = function (a) {
	return {$: 'SetBody', a: a};
};
var author$project$Page$Article$Editor$SetDescription = function (a) {
	return {$: 'SetDescription', a: a};
};
var author$project$Page$Article$Editor$SetTags = function (a) {
	return {$: 'SetTags', a: a};
};
var author$project$Page$Article$Editor$SetTitle = function (a) {
	return {$: 'SetTitle', a: a};
};
var elm_lang$html$Html$fieldset = _VirtualDom_node('fieldset');
var author$project$Views$Form$control = F3(
	function (element, attributes, children) {
		return A2(
			elm_lang$html$Html$fieldset,
			_List_fromArray(
				[
					elm_lang$html$Html$Attributes$class('form-group')
				]),
			_List_fromArray(
				[
					A2(
					element,
					A2(
						elm_lang$core$List$cons,
						elm_lang$html$Html$Attributes$class('form-control'),
						attributes),
					children)
				]));
	});
var elm_lang$html$Html$input = _VirtualDom_node('input');
var elm_lang$html$Html$Attributes$type_ = elm_lang$html$Html$Attributes$stringProperty('type');
var author$project$Views$Form$input = function (attrs) {
	return A2(
		author$project$Views$Form$control,
		elm_lang$html$Html$input,
		A2(
			elm_lang$core$List$cons,
			elm_lang$html$Html$Attributes$type_('text'),
			attrs));
};
var author$project$Views$Form$textarea = author$project$Views$Form$control(elm_lang$html$Html$textarea);
var elm_lang$html$Html$Attributes$value = elm_lang$html$Html$Attributes$stringProperty('value');
var author$project$Page$Article$Editor$viewForm = function (model) {
	var isEditing = !_Utils_eq(model.editingArticle, elm_lang$core$Maybe$Nothing);
	var saveButtonText = isEditing ? 'Update Article' : 'Publish Article';
	return A2(
		elm_lang$html$Html$form,
		_List_fromArray(
			[
				elm_lang$html$Html$Events$onSubmit(author$project$Page$Article$Editor$Save)
			]),
		_List_fromArray(
			[
				A2(
				elm_lang$html$Html$fieldset,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						author$project$Views$Form$input,
						_List_fromArray(
							[
								elm_lang$html$Html$Attributes$class('form-control-lg'),
								elm_lang$html$Html$Attributes$placeholder('Article Title'),
								elm_lang$html$Html$Events$onInput(author$project$Page$Article$Editor$SetTitle),
								elm_lang$html$Html$Attributes$value(model.title)
							]),
						_List_Nil),
						A2(
						author$project$Views$Form$input,
						_List_fromArray(
							[
								elm_lang$html$Html$Attributes$placeholder('What\'s this article about?'),
								elm_lang$html$Html$Events$onInput(author$project$Page$Article$Editor$SetDescription),
								elm_lang$html$Html$Attributes$value(model.description)
							]),
						_List_Nil),
						A2(
						author$project$Views$Form$textarea,
						_List_fromArray(
							[
								elm_lang$html$Html$Attributes$placeholder('Write your article (in markdown)'),
								A2(elm_lang$html$Html$Attributes$attribute, 'rows', '8'),
								elm_lang$html$Html$Events$onInput(author$project$Page$Article$Editor$SetBody),
								elm_lang$html$Html$Attributes$value(model.body)
							]),
						_List_Nil),
						A2(
						author$project$Views$Form$input,
						_List_fromArray(
							[
								elm_lang$html$Html$Attributes$placeholder('Enter tags'),
								elm_lang$html$Html$Events$onInput(author$project$Page$Article$Editor$SetTags),
								elm_lang$html$Html$Attributes$value(
								A2(elm_lang$core$String$join, ' ', model.tags))
							]),
						_List_Nil),
						A2(
						elm_lang$html$Html$button,
						_List_fromArray(
							[
								elm_lang$html$Html$Attributes$class('btn btn-lg pull-xs-right btn-primary'),
								elm_lang$html$Html$Attributes$disabled(model.isSaving)
							]),
						_List_fromArray(
							[
								elm_lang$html$Html$text(saveButtonText)
							]))
					]))
			]));
};
var elm_lang$html$Html$li = _VirtualDom_node('li');
var elm_lang$html$Html$ul = _VirtualDom_node('ul');
var author$project$Views$Form$viewErrors = function (errors) {
	return A2(
		elm_lang$html$Html$ul,
		_List_fromArray(
			[
				elm_lang$html$Html$Attributes$class('error-messages')
			]),
		A2(
			elm_lang$core$List$map,
			function (_n0) {
				var error = _n0.b;
				return A2(
					elm_lang$html$Html$li,
					_List_Nil,
					_List_fromArray(
						[
							elm_lang$html$Html$text(error)
						]));
			},
			errors));
};
var author$project$Page$Article$Editor$view = function (model) {
	return {
		content: A2(
			elm_lang$html$Html$div,
			_List_fromArray(
				[
					elm_lang$html$Html$Attributes$class('editor-page')
				]),
			_List_fromArray(
				[
					A2(
					elm_lang$html$Html$div,
					_List_fromArray(
						[
							elm_lang$html$Html$Attributes$class('container page')
						]),
					_List_fromArray(
						[
							A2(
							elm_lang$html$Html$div,
							_List_fromArray(
								[
									elm_lang$html$Html$Attributes$class('row')
								]),
							_List_fromArray(
								[
									A2(
									elm_lang$html$Html$div,
									_List_fromArray(
										[
											elm_lang$html$Html$Attributes$class('col-md-10 offset-md-1 col-xs-12')
										]),
									_List_fromArray(
										[
											author$project$Views$Form$viewErrors(model.errors),
											author$project$Page$Article$Editor$viewForm(model)
										]))
								]))
						]))
				])),
		title: 'Edit Article'
	};
};
var elm_lang$html$Html$main_ = _VirtualDom_node('main');
var elm_lang$html$Html$Attributes$id = elm_lang$html$Html$Attributes$stringProperty('id');
var elm_lang$html$Html$Attributes$tabindex = function (n) {
	return A2(
		_VirtualDom_attribute,
		'tabIndex',
		elm_lang$core$String$fromInt(n));
};
var author$project$Page$Errored$view = F2(
	function (session, _n0) {
		var model = _n0.a;
		return {
			content: A2(
				elm_lang$html$Html$main_,
				_List_fromArray(
					[
						elm_lang$html$Html$Attributes$id('content'),
						elm_lang$html$Html$Attributes$class('container'),
						elm_lang$html$Html$Attributes$tabindex(-1)
					]),
				_List_fromArray(
					[
						A2(
						elm_lang$html$Html$h1,
						_List_Nil,
						_List_fromArray(
							[
								elm_lang$html$Html$text('Error Loading Page')
							])),
						A2(
						elm_lang$html$Html$div,
						_List_fromArray(
							[
								elm_lang$html$Html$Attributes$class('row')
							]),
						_List_fromArray(
							[
								A2(
								elm_lang$html$Html$p,
								_List_Nil,
								_List_fromArray(
									[
										elm_lang$html$Html$text(model.errorMessage)
									]))
							]))
					])),
			title: 'Error'
		};
	});
var author$project$Page$Home$viewBanner = A2(
	elm_lang$html$Html$div,
	_List_fromArray(
		[
			elm_lang$html$Html$Attributes$class('banner')
		]),
	_List_fromArray(
		[
			A2(
			elm_lang$html$Html$div,
			_List_fromArray(
				[
					elm_lang$html$Html$Attributes$class('container')
				]),
			_List_fromArray(
				[
					A2(
					elm_lang$html$Html$h1,
					_List_fromArray(
						[
							elm_lang$html$Html$Attributes$class('logo-font')
						]),
					_List_fromArray(
						[
							elm_lang$html$Html$text('conduit')
						])),
					A2(
					elm_lang$html$Html$p,
					_List_Nil,
					_List_fromArray(
						[
							elm_lang$html$Html$text('A place to share your knowledge.')
						]))
				]))
		]));
var author$project$Views$Article$view = F2(
	function (toggleFavorite, article) {
		var author = article.author;
		return A2(
			elm_lang$html$Html$div,
			_List_fromArray(
				[
					elm_lang$html$Html$Attributes$class('article-preview')
				]),
			_List_fromArray(
				[
					A2(
					elm_lang$html$Html$div,
					_List_fromArray(
						[
							elm_lang$html$Html$Attributes$class('article-meta')
						]),
					_List_fromArray(
						[
							A2(
							elm_lang$html$Html$a,
							_List_fromArray(
								[
									author$project$Route$href(
									author$project$Route$Profile(author.username))
								]),
							_List_fromArray(
								[
									A2(
									elm_lang$html$Html$img,
									_List_fromArray(
										[
											author$project$Data$User$Photo$src(author.image)
										]),
									_List_Nil)
								])),
							A2(
							elm_lang$html$Html$div,
							_List_fromArray(
								[
									elm_lang$html$Html$Attributes$class('info')
								]),
							_List_fromArray(
								[
									author$project$Views$Author$view(author.username),
									author$project$Views$Article$viewTimestamp(article)
								])),
							A4(
							author$project$Views$Article$Favorite$button,
							toggleFavorite,
							article,
							_List_fromArray(
								[
									elm_lang$html$Html$Attributes$class('pull-xs-right')
								]),
							_List_fromArray(
								[
									elm_lang$html$Html$text(
									' ' + elm_lang$core$String$fromInt(article.favoritesCount))
								]))
						])),
					A2(
					elm_lang$html$Html$a,
					_List_fromArray(
						[
							elm_lang$html$Html$Attributes$class('preview-link'),
							author$project$Route$href(
							author$project$Route$Article(article.slug))
						]),
					_List_fromArray(
						[
							A2(
							elm_lang$html$Html$h1,
							_List_Nil,
							_List_fromArray(
								[
									elm_lang$html$Html$text(article.title)
								])),
							A2(
							elm_lang$html$Html$p,
							_List_Nil,
							_List_fromArray(
								[
									elm_lang$html$Html$text(article.description)
								])),
							A2(
							elm_lang$html$Html$span,
							_List_Nil,
							_List_fromArray(
								[
									elm_lang$html$Html$text('Read more...')
								]))
						]))
				]));
	});
var author$project$Views$Article$Feed$ToggleFavorite = function (a) {
	return {$: 'ToggleFavorite', a: a};
};
var author$project$Views$Article$Feed$SelectPage = function (a) {
	return {$: 'SelectPage', a: a};
};
var elm_lang$core$Tuple$second = function (_n0) {
	var y = _n0.b;
	return y;
};
var elm_lang$html$Html$Attributes$classList = function (classes) {
	return elm_lang$html$Html$Attributes$class(
		A2(
			elm_lang$core$String$join,
			' ',
			A2(
				elm_lang$core$List$map,
				elm_lang$core$Tuple$first,
				A2(elm_lang$core$List$filter, elm_lang$core$Tuple$second, classes))));
};
var author$project$Views$Article$Feed$pageLink = F2(
	function (page, isActive) {
		return A2(
			elm_lang$html$Html$li,
			_List_fromArray(
				[
					elm_lang$html$Html$Attributes$classList(
					_List_fromArray(
						[
							_Utils_Tuple2('page-item', true),
							_Utils_Tuple2('active', isActive)
						]))
				]),
			_List_fromArray(
				[
					A2(
					elm_lang$html$Html$a,
					_List_fromArray(
						[
							elm_lang$html$Html$Attributes$class('page-link'),
							elm_lang$html$Html$Attributes$href('javascript:void(0);'),
							elm_lang$html$Html$Events$onClick(
							author$project$Views$Article$Feed$SelectPage(page))
						]),
					_List_fromArray(
						[
							elm_lang$html$Html$text(
							elm_lang$core$String$fromInt(page))
						]))
				]));
	});
var author$project$Views$Article$Feed$pagination = F3(
	function (activePage, feed, feedSource) {
		var articlesPerPage = author$project$Views$Article$Feed$limit(feedSource);
		var totalPages = elm_lang$core$Basics$ceiling(feed.articlesCount / articlesPerPage);
		return (totalPages > 1) ? A2(
			elm_lang$html$Html$ul,
			_List_fromArray(
				[
					elm_lang$html$Html$Attributes$class('pagination')
				]),
			A2(
				elm_lang$core$List$map,
				function (page) {
					return A2(
						author$project$Views$Article$Feed$pageLink,
						page,
						_Utils_eq(page, activePage));
				},
				A2(elm_lang$core$List$range, 1, totalPages))) : elm_lang$html$Html$text('');
	});
var author$project$Views$Article$Feed$viewArticles = function (_n0) {
	var activePage = _n0.a.activePage;
	var feed = _n0.a.feed;
	var feedSources = _n0.a.feedSources;
	return _Utils_ap(
		A2(
			elm_lang$core$List$map,
			author$project$Views$Article$view(author$project$Views$Article$Feed$ToggleFavorite),
			feed.articles),
		_List_fromArray(
			[
				A3(
				author$project$Views$Article$Feed$pagination,
				activePage,
				feed,
				rtfeldman$selectlist$SelectList$selected(feedSources))
			]));
};
var author$project$Views$Article$Feed$DismissErrors = {$: 'DismissErrors'};
var author$project$Views$Article$Feed$SelectFeedSource = function (a) {
	return {$: 'SelectFeedSource', a: a};
};
var author$project$Views$Article$Feed$sourceName = function (source) {
	switch (source.$) {
		case 'YourFeed':
			return 'Your Feed';
		case 'GlobalFeed':
			return 'Global Feed';
		case 'TagFeed':
			var tagName = source.a;
			return '#' + author$project$Data$Article$Tag$toString(tagName);
		case 'FavoritedFeed':
			var username = source.a;
			return 'Favorited Articles';
		default:
			var username = source.a;
			return 'My Articles';
	}
};
var rtfeldman$selectlist$SelectList$Selected = {$: 'Selected'};
var author$project$Views$Article$Feed$viewFeedSource = F2(
	function (position, source) {
		return A2(
			elm_lang$html$Html$li,
			_List_fromArray(
				[
					elm_lang$html$Html$Attributes$class('nav-item')
				]),
			_List_fromArray(
				[
					A2(
					elm_lang$html$Html$a,
					_List_fromArray(
						[
							elm_lang$html$Html$Attributes$classList(
							_List_fromArray(
								[
									_Utils_Tuple2('nav-link', true),
									_Utils_Tuple2(
									'active',
									_Utils_eq(position, rtfeldman$selectlist$SelectList$Selected))
								])),
							elm_lang$html$Html$Attributes$href('javascript:void(0);'),
							elm_lang$html$Html$Events$onClick(
							author$project$Views$Article$Feed$SelectFeedSource(source))
						]),
					_List_fromArray(
						[
							elm_lang$html$Html$text(
							author$project$Views$Article$Feed$sourceName(source))
						]))
				]));
	});
var author$project$Views$Spinner$spinner = A2(
	elm_lang$html$Html$li,
	_List_fromArray(
		[
			elm_lang$html$Html$Attributes$class('sk-three-bounce'),
			A2(elm_lang$html$Html$Attributes$style, 'float', 'left'),
			A2(elm_lang$html$Html$Attributes$style, 'margin', '8px')
		]),
	_List_fromArray(
		[
			A2(
			elm_lang$html$Html$div,
			_List_fromArray(
				[
					elm_lang$html$Html$Attributes$class('sk-child sk-bounce1')
				]),
			_List_Nil),
			A2(
			elm_lang$html$Html$div,
			_List_fromArray(
				[
					elm_lang$html$Html$Attributes$class('sk-child sk-bounce2')
				]),
			_List_Nil),
			A2(
			elm_lang$html$Html$div,
			_List_fromArray(
				[
					elm_lang$html$Html$Attributes$class('sk-child sk-bounce3')
				]),
			_List_Nil)
		]));
var rtfeldman$selectlist$SelectList$AfterSelected = {$: 'AfterSelected'};
var rtfeldman$selectlist$SelectList$BeforeSelected = {$: 'BeforeSelected'};
var rtfeldman$selectlist$SelectList$mapBy = F2(
	function (transform, _n0) {
		var beforeSel = _n0.a;
		var sel = _n0.b;
		var afterSel = _n0.c;
		return A3(
			rtfeldman$selectlist$SelectList$SelectList,
			A2(
				elm_lang$core$List$map,
				transform(rtfeldman$selectlist$SelectList$BeforeSelected),
				beforeSel),
			A2(transform, rtfeldman$selectlist$SelectList$Selected, sel),
			A2(
				elm_lang$core$List$map,
				transform(rtfeldman$selectlist$SelectList$AfterSelected),
				afterSel));
	});
var author$project$Views$Article$Feed$viewFeedSources = function (_n0) {
	var feedSources = _n0.a.feedSources;
	var isLoading = _n0.a.isLoading;
	var errors = _n0.a.errors;
	return A2(
		elm_lang$html$Html$ul,
		_List_fromArray(
			[
				elm_lang$html$Html$Attributes$class('nav nav-pills outline-active')
			]),
		_Utils_ap(
			rtfeldman$selectlist$SelectList$toList(
				A2(rtfeldman$selectlist$SelectList$mapBy, author$project$Views$Article$Feed$viewFeedSource, feedSources)),
			_List_fromArray(
				[
					A2(author$project$Views$Errors$view, author$project$Views$Article$Feed$DismissErrors, errors),
					A2(author$project$Util$viewIf, isLoading, author$project$Views$Spinner$spinner)
				])));
};
var author$project$Page$Home$viewFeed = function (feed) {
	return A2(
		elm_lang$core$List$cons,
		A2(
			elm_lang$html$Html$div,
			_List_fromArray(
				[
					elm_lang$html$Html$Attributes$class('feed-toggle')
				]),
			_List_fromArray(
				[
					A2(
					elm_lang$html$Html$map,
					author$project$Page$Home$FeedMsg,
					author$project$Views$Article$Feed$viewFeedSources(feed))
				])),
		A2(
			elm_lang$core$List$map,
			elm_lang$html$Html$map(author$project$Page$Home$FeedMsg),
			author$project$Views$Article$Feed$viewArticles(feed)));
};
var author$project$Page$Home$SelectTag = function (a) {
	return {$: 'SelectTag', a: a};
};
var author$project$Page$Home$viewTag = function (tagName) {
	return A2(
		elm_lang$html$Html$a,
		_List_fromArray(
			[
				elm_lang$html$Html$Attributes$class('tag-pill tag-default'),
				elm_lang$html$Html$Attributes$href('javascript:void(0)'),
				elm_lang$html$Html$Events$onClick(
				author$project$Page$Home$SelectTag(tagName))
			]),
		_List_fromArray(
			[
				elm_lang$html$Html$text(
				author$project$Data$Article$Tag$toString(tagName))
			]));
};
var author$project$Page$Home$viewTags = function (tags) {
	return A2(
		elm_lang$html$Html$div,
		_List_fromArray(
			[
				elm_lang$html$Html$Attributes$class('tag-list')
			]),
		A2(elm_lang$core$List$map, author$project$Page$Home$viewTag, tags));
};
var author$project$Page$Home$view = F2(
	function (session, model) {
		return {
			content: A2(
				elm_lang$html$Html$div,
				_List_fromArray(
					[
						elm_lang$html$Html$Attributes$class('home-page')
					]),
				_List_fromArray(
					[
						author$project$Page$Home$viewBanner,
						A2(
						elm_lang$html$Html$div,
						_List_fromArray(
							[
								elm_lang$html$Html$Attributes$class('container page')
							]),
						_List_fromArray(
							[
								A2(
								elm_lang$html$Html$div,
								_List_fromArray(
									[
										elm_lang$html$Html$Attributes$class('row')
									]),
								_List_fromArray(
									[
										A2(
										elm_lang$html$Html$div,
										_List_fromArray(
											[
												elm_lang$html$Html$Attributes$class('col-md-9')
											]),
										author$project$Page$Home$viewFeed(model.feed)),
										A2(
										elm_lang$html$Html$div,
										_List_fromArray(
											[
												elm_lang$html$Html$Attributes$class('col-md-3')
											]),
										_List_fromArray(
											[
												A2(
												elm_lang$html$Html$div,
												_List_fromArray(
													[
														elm_lang$html$Html$Attributes$class('sidebar')
													]),
												_List_fromArray(
													[
														A2(
														elm_lang$html$Html$p,
														_List_Nil,
														_List_fromArray(
															[
																elm_lang$html$Html$text('Popular Tags')
															])),
														author$project$Page$Home$viewTags(model.tags)
													]))
											]))
									]))
							]))
					])),
			title: 'Conduit'
		};
	});
var author$project$Page$Login$SetEmail = function (a) {
	return {$: 'SetEmail', a: a};
};
var author$project$Page$Login$SetPassword = function (a) {
	return {$: 'SetPassword', a: a};
};
var author$project$Page$Login$SubmitForm = {$: 'SubmitForm'};
var author$project$Views$Form$password = function (attrs) {
	return A2(
		author$project$Views$Form$control,
		elm_lang$html$Html$input,
		A2(
			elm_lang$core$List$cons,
			elm_lang$html$Html$Attributes$type_('password'),
			attrs));
};
var author$project$Page$Login$viewForm = A2(
	elm_lang$html$Html$form,
	_List_fromArray(
		[
			elm_lang$html$Html$Events$onSubmit(author$project$Page$Login$SubmitForm)
		]),
	_List_fromArray(
		[
			A2(
			author$project$Views$Form$input,
			_List_fromArray(
				[
					elm_lang$html$Html$Attributes$class('form-control-lg'),
					elm_lang$html$Html$Attributes$placeholder('Email'),
					elm_lang$html$Html$Events$onInput(author$project$Page$Login$SetEmail)
				]),
			_List_Nil),
			A2(
			author$project$Views$Form$password,
			_List_fromArray(
				[
					elm_lang$html$Html$Attributes$class('form-control-lg'),
					elm_lang$html$Html$Attributes$placeholder('Password'),
					elm_lang$html$Html$Events$onInput(author$project$Page$Login$SetPassword)
				]),
			_List_Nil),
			A2(
			elm_lang$html$Html$button,
			_List_fromArray(
				[
					elm_lang$html$Html$Attributes$class('btn btn-lg btn-primary pull-xs-right')
				]),
			_List_fromArray(
				[
					elm_lang$html$Html$text('Sign in')
				]))
		]));
var author$project$Page$Login$view = F2(
	function (session, model) {
		return {
			content: A2(
				elm_lang$html$Html$div,
				_List_fromArray(
					[
						elm_lang$html$Html$Attributes$class('auth-page')
					]),
				_List_fromArray(
					[
						A2(
						elm_lang$html$Html$div,
						_List_fromArray(
							[
								elm_lang$html$Html$Attributes$class('container page')
							]),
						_List_fromArray(
							[
								A2(
								elm_lang$html$Html$div,
								_List_fromArray(
									[
										elm_lang$html$Html$Attributes$class('row')
									]),
								_List_fromArray(
									[
										A2(
										elm_lang$html$Html$div,
										_List_fromArray(
											[
												elm_lang$html$Html$Attributes$class('col-md-6 offset-md-3 col-xs-12')
											]),
										_List_fromArray(
											[
												A2(
												elm_lang$html$Html$h1,
												_List_fromArray(
													[
														elm_lang$html$Html$Attributes$class('text-xs-center')
													]),
												_List_fromArray(
													[
														elm_lang$html$Html$text('Sign in')
													])),
												A2(
												elm_lang$html$Html$p,
												_List_fromArray(
													[
														elm_lang$html$Html$Attributes$class('text-xs-center')
													]),
												_List_fromArray(
													[
														A2(
														elm_lang$html$Html$a,
														_List_fromArray(
															[
																author$project$Route$href(author$project$Route$Register)
															]),
														_List_fromArray(
															[
																elm_lang$html$Html$text('Need an account?')
															]))
													])),
												author$project$Views$Form$viewErrors(model.errors),
												author$project$Page$Login$viewForm
											]))
									]))
							]))
					])),
			title: 'Login'
		};
	});
var author$project$Views$Assets$Image = function (a) {
	return {$: 'Image', a: a};
};
var author$project$Views$Assets$error = author$project$Views$Assets$Image('/assets/images/error.jpg');
var author$project$Views$Assets$src = function (_n0) {
	var url = _n0.a;
	return elm_lang$html$Html$Attributes$src(url);
};
var elm_lang$html$Html$Attributes$alt = elm_lang$html$Html$Attributes$stringProperty('alt');
var author$project$Page$NotFound$view = function (session) {
	return {
		content: A2(
			elm_lang$html$Html$main_,
			_List_fromArray(
				[
					elm_lang$html$Html$Attributes$id('content'),
					elm_lang$html$Html$Attributes$class('container'),
					elm_lang$html$Html$Attributes$tabindex(-1)
				]),
			_List_fromArray(
				[
					A2(
					elm_lang$html$Html$h1,
					_List_Nil,
					_List_fromArray(
						[
							elm_lang$html$Html$text('Not Found')
						])),
					A2(
					elm_lang$html$Html$div,
					_List_fromArray(
						[
							elm_lang$html$Html$Attributes$class('row')
						]),
					_List_fromArray(
						[
							A2(
							elm_lang$html$Html$img,
							_List_fromArray(
								[
									author$project$Views$Assets$src(author$project$Views$Assets$error),
									elm_lang$html$Html$Attributes$alt('giant laser walrus wreaking havoc')
								]),
							_List_Nil)
						]))
				])),
		title: 'Page Not Found'
	};
};
var author$project$Page$Profile$DismissErrors = {$: 'DismissErrors'};
var author$project$Page$Profile$viewFeed = function (feed) {
	return A2(
		elm_lang$html$Html$div,
		_List_fromArray(
			[
				elm_lang$html$Html$Attributes$class('col-xs-12 col-md-10 offset-md-1')
			]),
		A2(
			elm_lang$core$List$cons,
			A2(
				elm_lang$html$Html$div,
				_List_fromArray(
					[
						elm_lang$html$Html$Attributes$class('articles-toggle')
					]),
				_List_fromArray(
					[
						A2(
						elm_lang$html$Html$map,
						author$project$Page$Profile$FeedMsg,
						author$project$Views$Article$Feed$viewFeedSources(feed))
					])),
			A2(
				elm_lang$core$List$map,
				elm_lang$html$Html$map(author$project$Page$Profile$FeedMsg),
				author$project$Views$Article$Feed$viewArticles(feed))));
};
var author$project$Page$Profile$ToggleFollow = {$: 'ToggleFollow'};
var author$project$Page$Profile$followButton = author$project$Views$User$Follow$button(
	function (_n0) {
		return author$project$Page$Profile$ToggleFollow;
	});
var elm_lang$html$Html$h4 = _VirtualDom_node('h4');
var author$project$Page$Profile$viewProfileInfo = F2(
	function (isMyProfile, profile) {
		return A2(
			elm_lang$html$Html$div,
			_List_fromArray(
				[
					elm_lang$html$Html$Attributes$class('col-xs-12 col-md-10 offset-md-1')
				]),
			_List_fromArray(
				[
					A2(
					elm_lang$html$Html$img,
					_List_fromArray(
						[
							elm_lang$html$Html$Attributes$class('user-img'),
							author$project$Data$User$Photo$src(profile.image)
						]),
					_List_Nil),
					A2(
					elm_lang$html$Html$h4,
					_List_Nil,
					_List_fromArray(
						[
							author$project$Data$User$Username$toHtml(profile.username)
						])),
					A2(
					elm_lang$html$Html$p,
					_List_Nil,
					_List_fromArray(
						[
							elm_lang$html$Html$text(
							A2(elm_lang$core$Maybe$withDefault, '', profile.bio))
						])),
					A2(
					author$project$Util$viewIf,
					!isMyProfile,
					author$project$Page$Profile$followButton(profile))
				]));
	});
var author$project$Page$Profile$view = F2(
	function (session, model) {
		var profile = model.profile;
		var isMyProfile = A2(
			elm_lang$core$Maybe$withDefault,
			false,
			A2(
				elm_lang$core$Maybe$map,
				function (_n1) {
					var username = _n1.username;
					return _Utils_eq(username, profile.username);
				},
				session.user));
		return {
			content: A2(
				elm_lang$html$Html$div,
				_List_fromArray(
					[
						elm_lang$html$Html$Attributes$class('profile-page')
					]),
				_List_fromArray(
					[
						A2(author$project$Views$Errors$view, author$project$Page$Profile$DismissErrors, model.errors),
						A2(
						elm_lang$html$Html$div,
						_List_fromArray(
							[
								elm_lang$html$Html$Attributes$class('user-info')
							]),
						_List_fromArray(
							[
								A2(
								elm_lang$html$Html$div,
								_List_fromArray(
									[
										elm_lang$html$Html$Attributes$class('container')
									]),
								_List_fromArray(
									[
										A2(
										elm_lang$html$Html$div,
										_List_fromArray(
											[
												elm_lang$html$Html$Attributes$class('row')
											]),
										_List_fromArray(
											[
												A2(author$project$Page$Profile$viewProfileInfo, isMyProfile, profile)
											]))
									]))
							])),
						A2(
						elm_lang$html$Html$div,
						_List_fromArray(
							[
								elm_lang$html$Html$Attributes$class('container')
							]),
						_List_fromArray(
							[
								A2(
								elm_lang$html$Html$div,
								_List_fromArray(
									[
										elm_lang$html$Html$Attributes$class('row')
									]),
								_List_fromArray(
									[
										author$project$Page$Profile$viewFeed(model.feed)
									]))
							]))
					])),
			title: function () {
				if (isMyProfile) {
					return 'My Profile';
				} else {
					var _n0 = session.user;
					if (_n0.$ === 'Just') {
						var username = _n0.a.username;
						return 'Profile — ' + author$project$Data$User$Username$toString(username);
					} else {
						return 'Profile';
					}
				}
			}()
		};
	});
var author$project$Page$Register$SetEmail = function (a) {
	return {$: 'SetEmail', a: a};
};
var author$project$Page$Register$SetPassword = function (a) {
	return {$: 'SetPassword', a: a};
};
var author$project$Page$Register$SetUsername = function (a) {
	return {$: 'SetUsername', a: a};
};
var author$project$Page$Register$SubmitForm = {$: 'SubmitForm'};
var author$project$Page$Register$viewForm = A2(
	elm_lang$html$Html$form,
	_List_fromArray(
		[
			elm_lang$html$Html$Events$onSubmit(author$project$Page$Register$SubmitForm)
		]),
	_List_fromArray(
		[
			A2(
			author$project$Views$Form$input,
			_List_fromArray(
				[
					elm_lang$html$Html$Attributes$class('form-control-lg'),
					elm_lang$html$Html$Attributes$placeholder('Username'),
					elm_lang$html$Html$Events$onInput(author$project$Page$Register$SetUsername)
				]),
			_List_Nil),
			A2(
			author$project$Views$Form$input,
			_List_fromArray(
				[
					elm_lang$html$Html$Attributes$class('form-control-lg'),
					elm_lang$html$Html$Attributes$placeholder('Email'),
					elm_lang$html$Html$Events$onInput(author$project$Page$Register$SetEmail)
				]),
			_List_Nil),
			A2(
			author$project$Views$Form$password,
			_List_fromArray(
				[
					elm_lang$html$Html$Attributes$class('form-control-lg'),
					elm_lang$html$Html$Attributes$placeholder('Password'),
					elm_lang$html$Html$Events$onInput(author$project$Page$Register$SetPassword)
				]),
			_List_Nil),
			A2(
			elm_lang$html$Html$button,
			_List_fromArray(
				[
					elm_lang$html$Html$Attributes$class('btn btn-lg btn-primary pull-xs-right')
				]),
			_List_fromArray(
				[
					elm_lang$html$Html$text('Sign up')
				]))
		]));
var author$project$Page$Register$view = F2(
	function (session, model) {
		return {
			content: A2(
				elm_lang$html$Html$div,
				_List_fromArray(
					[
						elm_lang$html$Html$Attributes$class('auth-page')
					]),
				_List_fromArray(
					[
						A2(
						elm_lang$html$Html$div,
						_List_fromArray(
							[
								elm_lang$html$Html$Attributes$class('container page')
							]),
						_List_fromArray(
							[
								A2(
								elm_lang$html$Html$div,
								_List_fromArray(
									[
										elm_lang$html$Html$Attributes$class('row')
									]),
								_List_fromArray(
									[
										A2(
										elm_lang$html$Html$div,
										_List_fromArray(
											[
												elm_lang$html$Html$Attributes$class('col-md-6 offset-md-3 col-xs-12')
											]),
										_List_fromArray(
											[
												A2(
												elm_lang$html$Html$h1,
												_List_fromArray(
													[
														elm_lang$html$Html$Attributes$class('text-xs-center')
													]),
												_List_fromArray(
													[
														elm_lang$html$Html$text('Sign up')
													])),
												A2(
												elm_lang$html$Html$p,
												_List_fromArray(
													[
														elm_lang$html$Html$Attributes$class('text-xs-center')
													]),
												_List_fromArray(
													[
														A2(
														elm_lang$html$Html$a,
														_List_fromArray(
															[
																author$project$Route$href(author$project$Route$Login)
															]),
														_List_fromArray(
															[
																elm_lang$html$Html$text('Have an account?')
															]))
													])),
												author$project$Views$Form$viewErrors(model.errors),
												author$project$Page$Register$viewForm
											]))
									]))
							]))
					])),
			title: 'Register'
		};
	});
var author$project$Page$Settings$SetBio = function (a) {
	return {$: 'SetBio', a: a};
};
var author$project$Page$Settings$SetEmail = function (a) {
	return {$: 'SetEmail', a: a};
};
var author$project$Page$Settings$SetImage = function (a) {
	return {$: 'SetImage', a: a};
};
var author$project$Page$Settings$SetPassword = function (a) {
	return {$: 'SetPassword', a: a};
};
var author$project$Page$Settings$SetUsername = function (a) {
	return {$: 'SetUsername', a: a};
};
var author$project$Page$Settings$SubmitForm = {$: 'SubmitForm'};
var author$project$Page$Settings$viewForm = function (model) {
	return A2(
		elm_lang$html$Html$form,
		_List_fromArray(
			[
				elm_lang$html$Html$Events$onSubmit(author$project$Page$Settings$SubmitForm)
			]),
		_List_fromArray(
			[
				A2(
				elm_lang$html$Html$fieldset,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						author$project$Views$Form$input,
						_List_fromArray(
							[
								elm_lang$html$Html$Attributes$placeholder('URL of profile picture'),
								elm_lang$html$Html$Attributes$value(
								A2(elm_lang$core$Maybe$withDefault, '', model.image)),
								elm_lang$html$Html$Events$onInput(author$project$Page$Settings$SetImage)
							]),
						_List_Nil),
						A2(
						author$project$Views$Form$input,
						_List_fromArray(
							[
								elm_lang$html$Html$Attributes$class('form-control-lg'),
								elm_lang$html$Html$Attributes$placeholder('Username'),
								elm_lang$html$Html$Attributes$value(model.username),
								elm_lang$html$Html$Events$onInput(author$project$Page$Settings$SetUsername)
							]),
						_List_Nil),
						A2(
						author$project$Views$Form$textarea,
						_List_fromArray(
							[
								elm_lang$html$Html$Attributes$class('form-control-lg'),
								elm_lang$html$Html$Attributes$placeholder('Short bio about you'),
								A2(elm_lang$html$Html$Attributes$attribute, 'rows', '8'),
								elm_lang$html$Html$Attributes$value(model.bio),
								elm_lang$html$Html$Events$onInput(author$project$Page$Settings$SetBio)
							]),
						_List_Nil),
						A2(
						author$project$Views$Form$input,
						_List_fromArray(
							[
								elm_lang$html$Html$Attributes$class('form-control-lg'),
								elm_lang$html$Html$Attributes$placeholder('Email'),
								elm_lang$html$Html$Attributes$value(model.email),
								elm_lang$html$Html$Events$onInput(author$project$Page$Settings$SetEmail)
							]),
						_List_Nil),
						A2(
						author$project$Views$Form$password,
						_List_fromArray(
							[
								elm_lang$html$Html$Attributes$class('form-control-lg'),
								elm_lang$html$Html$Attributes$placeholder('Password'),
								elm_lang$html$Html$Attributes$value(
								A2(elm_lang$core$Maybe$withDefault, '', model.password)),
								elm_lang$html$Html$Events$onInput(author$project$Page$Settings$SetPassword)
							]),
						_List_Nil),
						A2(
						elm_lang$html$Html$button,
						_List_fromArray(
							[
								elm_lang$html$Html$Attributes$class('btn btn-lg btn-primary pull-xs-right')
							]),
						_List_fromArray(
							[
								elm_lang$html$Html$text('Update Settings')
							]))
					]))
			]));
};
var author$project$Page$Settings$view = F2(
	function (session, model) {
		return {
			content: A2(
				elm_lang$html$Html$div,
				_List_fromArray(
					[
						elm_lang$html$Html$Attributes$class('settings-page')
					]),
				_List_fromArray(
					[
						A2(
						elm_lang$html$Html$div,
						_List_fromArray(
							[
								elm_lang$html$Html$Attributes$class('container page')
							]),
						_List_fromArray(
							[
								A2(
								elm_lang$html$Html$div,
								_List_fromArray(
									[
										elm_lang$html$Html$Attributes$class('row')
									]),
								_List_fromArray(
									[
										A2(
										elm_lang$html$Html$div,
										_List_fromArray(
											[
												elm_lang$html$Html$Attributes$class('col-md-6 offset-md-3 col-xs-12')
											]),
										_List_fromArray(
											[
												A2(
												elm_lang$html$Html$h1,
												_List_fromArray(
													[
														elm_lang$html$Html$Attributes$class('text-xs-center')
													]),
												_List_fromArray(
													[
														elm_lang$html$Html$text('Your Settings')
													])),
												author$project$Views$Form$viewErrors(model.errors),
												author$project$Page$Settings$viewForm(model)
											]))
									]))
							]))
					])),
			title: 'Settings'
		};
	});
var elm_lang$html$Html$footer = _VirtualDom_node('footer');
var author$project$Views$Page$viewFooter = A2(
	elm_lang$html$Html$footer,
	_List_Nil,
	_List_fromArray(
		[
			A2(
			elm_lang$html$Html$div,
			_List_fromArray(
				[
					elm_lang$html$Html$Attributes$class('container')
				]),
			_List_fromArray(
				[
					A2(
					elm_lang$html$Html$a,
					_List_fromArray(
						[
							elm_lang$html$Html$Attributes$class('logo-font'),
							elm_lang$html$Html$Attributes$href('/')
						]),
					_List_fromArray(
						[
							elm_lang$html$Html$text('conduit')
						])),
					A2(
					elm_lang$html$Html$span,
					_List_fromArray(
						[
							elm_lang$html$Html$Attributes$class('attribution')
						]),
					_List_fromArray(
						[
							elm_lang$html$Html$text('An interactive learning project from '),
							A2(
							elm_lang$html$Html$a,
							_List_fromArray(
								[
									elm_lang$html$Html$Attributes$href('https://thinkster.io')
								]),
							_List_fromArray(
								[
									elm_lang$html$Html$text('Thinkster')
								])),
							elm_lang$html$Html$text('. Code & design licensed under MIT.')
						]))
				]))
		]));
var author$project$Views$Page$isActive = F2(
	function (page, route) {
		var _n0 = _Utils_Tuple2(page, route);
		_n0$6:
		while (true) {
			switch (_n0.a.$) {
				case 'Home':
					if (_n0.b.$ === 'Home') {
						var _n1 = _n0.a;
						var _n2 = _n0.b;
						return true;
					} else {
						break _n0$6;
					}
				case 'Login':
					if (_n0.b.$ === 'Login') {
						var _n3 = _n0.a;
						var _n4 = _n0.b;
						return true;
					} else {
						break _n0$6;
					}
				case 'Register':
					if (_n0.b.$ === 'Register') {
						var _n5 = _n0.a;
						var _n6 = _n0.b;
						return true;
					} else {
						break _n0$6;
					}
				case 'Settings':
					if (_n0.b.$ === 'Settings') {
						var _n7 = _n0.a;
						var _n8 = _n0.b;
						return true;
					} else {
						break _n0$6;
					}
				case 'Profile':
					if (_n0.b.$ === 'Profile') {
						var pageUsername = _n0.a.a;
						var routeUsername = _n0.b.a;
						return _Utils_eq(pageUsername, routeUsername);
					} else {
						break _n0$6;
					}
				case 'NewArticle':
					if (_n0.b.$ === 'NewArticle') {
						var _n9 = _n0.a;
						var _n10 = _n0.b;
						return true;
					} else {
						break _n0$6;
					}
				default:
					break _n0$6;
			}
		}
		return false;
	});
var author$project$Views$Page$navbarLink = F3(
	function (page, route, linkContent) {
		return A2(
			elm_lang$html$Html$li,
			_List_fromArray(
				[
					elm_lang$html$Html$Attributes$classList(
					_List_fromArray(
						[
							_Utils_Tuple2('nav-item', true),
							_Utils_Tuple2(
							'active',
							A2(author$project$Views$Page$isActive, page, route))
						]))
				]),
			_List_fromArray(
				[
					A2(
					elm_lang$html$Html$a,
					_List_fromArray(
						[
							elm_lang$html$Html$Attributes$class('nav-link'),
							author$project$Route$href(route)
						]),
					linkContent)
				]));
	});
var author$project$Views$Page$viewSignIn = F2(
	function (page, maybeUser) {
		var linkTo = author$project$Views$Page$navbarLink(page);
		if (maybeUser.$ === 'Nothing') {
			return _List_fromArray(
				[
					A2(
					linkTo,
					author$project$Route$Login,
					_List_fromArray(
						[
							elm_lang$html$Html$text('Sign in')
						])),
					A2(
					linkTo,
					author$project$Route$Register,
					_List_fromArray(
						[
							elm_lang$html$Html$text('Sign up')
						]))
				]);
		} else {
			var user = maybeUser.a;
			return _List_fromArray(
				[
					A2(
					linkTo,
					author$project$Route$NewArticle,
					_List_fromArray(
						[
							A2(
							elm_lang$html$Html$i,
							_List_fromArray(
								[
									elm_lang$html$Html$Attributes$class('ion-compose')
								]),
							_List_Nil),
							elm_lang$html$Html$text(' New Post')
						])),
					A2(
					linkTo,
					author$project$Route$Settings,
					_List_fromArray(
						[
							A2(
							elm_lang$html$Html$i,
							_List_fromArray(
								[
									elm_lang$html$Html$Attributes$class('ion-gear-a')
								]),
							_List_Nil),
							elm_lang$html$Html$text(' Settings')
						])),
					A2(
					linkTo,
					author$project$Route$Profile(user.username),
					_List_fromArray(
						[
							A2(
							elm_lang$html$Html$img,
							_List_fromArray(
								[
									elm_lang$html$Html$Attributes$class('user-pic'),
									author$project$Data$User$Photo$src(user.image)
								]),
							_List_Nil),
							author$project$Data$User$Username$toHtml(user.username)
						])),
					A2(
					linkTo,
					author$project$Route$Logout,
					_List_fromArray(
						[
							elm_lang$html$Html$text('Sign out')
						]))
				]);
		}
	});
var elm_lang$html$Html$nav = _VirtualDom_node('nav');
var elm_lang$virtual_dom$VirtualDom$lazy2 = _VirtualDom_lazy2;
var elm_lang$html$Html$Lazy$lazy2 = elm_lang$virtual_dom$VirtualDom$lazy2;
var author$project$Views$Page$viewHeader = F3(
	function (page, user, isLoading) {
		return A2(
			elm_lang$html$Html$nav,
			_List_fromArray(
				[
					elm_lang$html$Html$Attributes$class('navbar navbar-light')
				]),
			_List_fromArray(
				[
					A2(
					elm_lang$html$Html$div,
					_List_fromArray(
						[
							elm_lang$html$Html$Attributes$class('container')
						]),
					_List_fromArray(
						[
							A2(
							elm_lang$html$Html$a,
							_List_fromArray(
								[
									elm_lang$html$Html$Attributes$class('navbar-brand'),
									author$project$Route$href(author$project$Route$Home)
								]),
							_List_fromArray(
								[
									elm_lang$html$Html$text('conduit')
								])),
							A2(
							elm_lang$html$Html$ul,
							_List_fromArray(
								[
									elm_lang$html$Html$Attributes$class('nav navbar-nav pull-xs-right')
								]),
							A2(
								elm_lang$core$List$cons,
								A3(elm_lang$html$Html$Lazy$lazy2, author$project$Util$viewIf, isLoading, author$project$Views$Spinner$spinner),
								A2(
									elm_lang$core$List$cons,
									A3(
										author$project$Views$Page$navbarLink,
										page,
										author$project$Route$Home,
										_List_fromArray(
											[
												elm_lang$html$Html$text('Home')
											])),
									A2(author$project$Views$Page$viewSignIn, page, user))))
						]))
				]));
	});
var author$project$Views$Page$frame = F4(
	function (isLoading, user, page, _n0) {
		var title = _n0.title;
		var content = _n0.content;
		return {
			body: _List_fromArray(
				[
					A3(author$project$Views$Page$viewHeader, page, user, isLoading),
					content,
					author$project$Views$Page$viewFooter
				]),
			title: title + ' — Conduit'
		};
	});
var author$project$Main$viewCurrentPage = F3(
	function (session, isLoading, page) {
		var frame = A2(author$project$Views$Page$frame, isLoading, session.user);
		switch (page.$) {
			case 'NotFound':
				return A2(
					frame,
					author$project$Views$Page$Other,
					author$project$Page$NotFound$view(session));
			case 'Blank':
				return A2(
					frame,
					author$project$Views$Page$Other,
					{
						content: elm_lang$html$Html$text(''),
						title: 'Loading'
					});
			case 'Errored':
				var subModel = page.a;
				return A2(
					frame,
					author$project$Views$Page$Other,
					A2(author$project$Page$Errored$view, session, subModel));
			case 'Settings':
				var subModel = page.a;
				return A2(
					author$project$Main$mapBody,
					author$project$Main$SettingsMsg,
					A2(
						frame,
						author$project$Views$Page$Other,
						A2(author$project$Page$Settings$view, session, subModel)));
			case 'Home':
				var subModel = page.a;
				return A2(
					author$project$Main$mapBody,
					author$project$Main$HomeMsg,
					A2(
						frame,
						author$project$Views$Page$Home,
						A2(author$project$Page$Home$view, session, subModel)));
			case 'Login':
				var subModel = page.a;
				return A2(
					author$project$Main$mapBody,
					author$project$Main$LoginMsg,
					A2(
						frame,
						author$project$Views$Page$Other,
						A2(author$project$Page$Login$view, session, subModel)));
			case 'Register':
				var subModel = page.a;
				return A2(
					author$project$Main$mapBody,
					author$project$Main$RegisterMsg,
					A2(
						frame,
						author$project$Views$Page$Other,
						A2(author$project$Page$Register$view, session, subModel)));
			case 'Profile':
				var username = page.a;
				var subModel = page.b;
				return A2(
					author$project$Main$mapBody,
					author$project$Main$ProfileMsg,
					A2(
						frame,
						author$project$Views$Page$Profile(username),
						A2(author$project$Page$Profile$view, session, subModel)));
			case 'Article':
				var subModel = page.a;
				return A2(
					author$project$Main$mapBody,
					author$project$Main$ArticleMsg,
					A2(
						frame,
						author$project$Views$Page$Other,
						A2(author$project$Page$Article$view, session, subModel)));
			default:
				var maybeSlug = page.a;
				var subModel = page.b;
				var framePage = _Utils_eq(maybeSlug, elm_lang$core$Maybe$Nothing) ? author$project$Views$Page$NewArticle : author$project$Views$Page$Other;
				return A2(
					author$project$Main$mapBody,
					author$project$Main$EditorMsg,
					A2(
						frame,
						framePage,
						author$project$Page$Article$Editor$view(subModel)));
		}
	});
var author$project$Main$view = function (model) {
	var _n0 = model.pageState;
	if (_n0.$ === 'Loaded') {
		var page = _n0.a;
		return A3(author$project$Main$viewCurrentPage, model.session, false, page);
	} else {
		var page = _n0.a;
		return A3(author$project$Main$viewCurrentPage, model.session, true, page);
	}
};
var elm_lang$browser$Browser$Env = F2(
	function (flags, url) {
		return {flags: flags, url: url};
	});
var elm_lang$browser$Browser$unsafeToUrl = function (string) {
	var _n0 = elm_lang$url$Url$Parser$toUrl(string);
	if (_n0.$ === 'Nothing') {
		return _Browser_invalidUrl(string);
	} else {
		var url = _n0.a;
		return url;
	}
};
var elm_lang$browser$Browser$Navigation$Manager$addListen = F3(
	function (toMsg, toSubs, model) {
		return elm_lang$core$Platform$Sub$batch(
			_List_fromArray(
				[
					elm_lang$browser$Browser$Navigation$Manager$subscription(
					elm_lang$browser$Browser$Navigation$Manager$Listen(toMsg)),
					toSubs(model)
				]));
	});
var elm_lang$browser$Browser$fullscreen = function (impl) {
	return _Browser_fullscreen(
		{
			init: function (_n0) {
				var flags = _n0.flags;
				var url = _n0.url;
				return impl.init(
					A2(
						elm_lang$browser$Browser$Env,
						flags,
						elm_lang$browser$Browser$unsafeToUrl(url)));
			},
			subscriptions: function () {
				var _n1 = impl.onNavigation;
				if (_n1.$ === 'Nothing') {
					return impl.subscriptions;
				} else {
					var toMsg = _n1.a;
					return A2(
						elm_lang$browser$Browser$Navigation$Manager$addListen,
						function ($) {
							return toMsg(
								elm_lang$browser$Browser$unsafeToUrl($));
						},
						impl.subscriptions);
				}
			}(),
			update: impl.update,
			view: impl.view
		});
};
var author$project$Main$main = elm_lang$browser$Browser$fullscreen(
	{
		init: author$project$Main$init,
		onNavigation: elm_lang$core$Maybe$Just(author$project$Main$onNavigation),
		subscriptions: author$project$Main$subscriptions,
		update: author$project$Main$update,
		view: author$project$Main$view
	});
_Platform_export({'Main':author$project$Main$main(elm_lang$json$Json$Decode$value)(0)({})});}(this));