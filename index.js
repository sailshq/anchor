var _ = require('underscore');
var check = require('validator').check;
var sanitize = require('validator').sanitize;


// Specify the function, object, or list to be anchored
function Anchor (entity) {
	if (_.isFunction(entity)) {
		this.fn = entity;
		throw new Error ('Anchor does not support functions yet!');
	}
	else if (_.isArray(entity)) {
		this.list = entity;
		throw new Error ('Anchor does not support list data sets yet!');
	}
	else {
		this.data = entity;
	}
}

// Built-in data type rules
Anchor.prototype.rules = {
	
	'empty'		: function (x) { return x === ''; },
	'undefined'	: _.isUndefined,

	'string'	: _.isString,
	'email'		: function (x){ return check(x).isEmail();},
	'creditcard': function (x){ return check(x).isCreditCard();},
	'uuid'		: function (x, version){ return check(x).isUUID(version);},

	'integer'	: function (x) { return check(x).isInt(); },
	'number'	: _.isNumber,
	'finite'	: _.isFinite,

	'falsey'	: function (x) { return !x; },
	'truthy'	: function (x) { return !!x; },
	'null'		: _.isNull,

	'boolean'	: _.isBoolean,
	'array'		: _.isArray,

	'date'		: _.isDate

};

// Enforce the data with the specified ruleset
Anchor.prototype.to = function (ruleset, error) {

	// If error is specififed, handle error instead of throwing it
	if (error) this.error = error;

	if (_.isArray(ruleset)) {
		throw new Error ('Anchor does not support plural rulesets (arrays) yet!');
	}
	else if (_.isObject(ruleset)) {
		throw new Error ('Anchor does not support compound rulesets (objects) yet!');
	}
	else {
		return matchRule(this.data, ruleset, this);
	}
};

// Specify default values to automatically populated when undefined
Anchor.prototype.defaults = function (ruleset) {
	
};

// Declare name of custom data type
Anchor.prototype.define = function (name) {

};

// Specify custom ruleset
Anchor.prototype.as = function (ruleset) {
	
};


// Specify named arguments and their rulesets as an object
Anchor.prototype.args = function (args) {
	
};

// Specify each of the permitted usages for this function
Anchor.prototype.usage = function () {
	var usages = _.toArray(arguments);
};

// Public access
module.exports = function (entity) {
	return new Anchor(entity);
};


// Return whether a piece of data matches a rule
// ruleName :: (STRING)
function matchRule (datum, ruleName, ctx) {
	var rule = Anchor.prototype.rules[ruleName];
	if (!rule) throw new Error ('Unknown rule: ' + ruleName);

	// TODO: Allow for regexp rules
	var outcome = rule(datum);

	// Allow .error() to handle the error instead of throwing it
	if (!outcome) {
		if (ctx.error) {
			ctx.error(this.error);
		}
		throw new Error ('Validation error: "'+datum+'" is not of type "'+ruleName+'"');
	}
	else return outcome;
}

