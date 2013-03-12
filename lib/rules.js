var _ = require('underscore');
var check = require('validator').check;

module.exports = {
	
	'empty'		: function (x) { return x === ''; },
	'undefined'	: _.isUndefined,

	'string'	: _.isString,
	'alpha'		: function (x){ return check(x).isAlpha();},
	'numeric'	: function (x){ return check(x).isNumeric();},
	'alphanumeric'	: function (x){ return check(x).isAlphanumeric();},
	'email'		: function (x){ return check(x).isEmail();},
	'url'		: function (x){ return check(x).isUrl();},
	'urlish'	: /^\s([^\/]+\.)+.+\s*$/g,
	'ip'		: function (x){ return check(x).isIP(); },
	'creditcard': function (x){ return check(x).isCreditCard();},
	'uuid'		: function (x, version){ return check(x).isUUID(version);},

	'int'		: function (x) { return check(x).isInt(); },
	'integer'	: function (x) { return check(x).isInt(); },
	'number'	: _.isNumber,
	'finite'	: _.isFinite,

	'decimal'	: function (x) { return check(x).isDecimal(); },
	'float'		: function (x) { return check(x).isDecimal(); },

	'falsey'	: function (x) { return !x; },
	'truthy'	: function (x) { return !!x; },
	'null'		: _.isNull,

	'boolean'	: _.isBoolean,

	'array'		: _.isArray,

	'date'		: _.isDate,
	'after'		: function (x,date) { return check(x).isAfter(date); },
	'before'	: function (x,date) { return check(x).isBefore(date); }

};