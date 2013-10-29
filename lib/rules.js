/**
 * Module dependencies
 */

var _ = require('lodash');
var check = require('validator').check;



/**
 * Type rules
 */

module.exports = {

	'empty'		: _.isEmpty,

	'required'	: function (x) {

		// Transform data to work properly with node validator
		if(!x && x !== 0) x = '';
		else if(typeof x.toString !== 'undefined') x = x.toString();
		else x = '' + x;

		return check(x).notEmpty();
	},

	'notEmpty'	: function (x) {

		// Transform data to work properly with node validator
		if(!x) x = '';
		else if(typeof x.toString !== 'undefined') x = x.toString();
		else x = '' + x;

		return check(x).notEmpty();
	},

	'undefined'	: _.isUndefined,

	'object'  : _.isObject,
	'json'    : function (x) {
		if(_.isUndefined(x)) return false;
		try { JSON.stringify(x); }
		catch(err) { return false; }
		return true;
	},

	'text'		: _.isString,
	'string'	: _.isString,
	'alpha'		: function (x){ return check(x).isAlpha();},
	'numeric'	: function (x){ return check(x).isNumeric();},
	'alphanumeric'	: function (x){ return check(x).isAlphanumeric();},
	'email'		: function (x){ return check(x).isEmail();},
	'url'		: function (x){ return check(x).isUrl();},
	'urlish'	: /^\s([^\/]+\.)+.+\s*$/g,
	'ip'		: function (x){ return check(x).isIP(); },
	'ipv4'		: function (x){ return check(x).isIPv4(); },
	'ipv6'		: function (x){ return check(x).isIPv6(); },
	'creditcard': function (x){ return check(x).isCreditCard();},
	'uuid'		: function (x, version){ return check(x).isUUID(version);},
	'uuidv3'	: function (x){ return check(x).isUUIDv3();},
	'uuidv4'	: function (x){ return check(x).isUUIDv4();},

	'int'		: function (x) { return check(x).isInt(); },
	'integer'	: function (x) { return check(x).isInt(); },
	'number'	: _.isNumber,
	'finite'	: _.isFinite,

	'decimal'	: function (x) { return check(x).isDecimal(); },
	'float'		: function (x) { return check(x).isDecimal(); },

	'falsey'	: function (x) { return !x; },
	'truthy'	: function (x) { return !!x; },
	'null'		: _.isNull,
	'notNull'	: function (x) { return check(x).notNull(); },

	'boolean'	: _.isBoolean,

	'array'		: _.isArray,

	'binary'	: function (x) { return Buffer.isBuffer(x) || _.isString(x); },

	'date'		: function (x) { return check(x).isDate(); },
	'datetime': function (x) { return check(x).isDate(); },

	'hexadecimal': function (x) { return check(x).hexadecimal(); },
	'hexColor': function (x) { return check(x).hexColor(); },

	'lowercase': function (x) { return check(x).lowercase(); },
	'uppercase': function (x) { return check(x).uppercase(); },

	// Miscellaneous rules
	'after'		: function (x,date) { return check(x).isAfter(date); },
	'before'	: function (x,date) { return check(x).isBefore(date); },

	'is'		: function (x, regex) { return check(x).is(regex); },
	'regex'		: function (x, regex) { return check(x).regex(regex); },
	'not'		: function (x, regex) { return check(x).not(regex); },
	'notRegex'	: function (x, regex) { return check(x).notRegex(regex); },

	'equals'	: function (x, equals) { return check(x).equals(equals); },
	'contains'	: function (x, str) { return check(x).contains(str); },
	'notContains': function (x, str) { return check(x).notContains(str); },
	'len'		: function (x, min, max) { return check(x).len(min, max); },
	'in'		: function (x, arrayOrString) { return check(x).isIn(arrayOrString); },
	'notIn'		: function (x, arrayOrString) { return check(x).notIn(arrayOrString); },
	'max'		: function (x, val) { return check(x).max(val); },
	'min'		: function (x, val) { return check(x).min(val); },
	'minLength'	: function (x, min) { return check(x).len(min); },
	'maxLength'	: function (x, max) { return check(x).len(0, max); }

};
