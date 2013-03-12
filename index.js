var _ = require('underscore');
var check = require('validator').check;
var sanitize = require('validator').sanitize;

// Public access
module.exports = function (entity) {
	return new Anchor(entity);
};


// Specify the function, object, or list to be anchored
function Anchor (entity) {
	if (_.isFunction(entity)) {
		this.fn = entity;
		throw new Error ('Anchor does not support functions yet!');
	}
	else this.data = entity;


	return this;
}

// Built-in data type rules
Anchor.prototype.rules = {
	
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

// Enforce that the data matches the specified ruleset
// If it doesn't, throw an error.
// If the callback is specified, instead of throwing, use first arg
Anchor.prototype.to = function (ruleset, cb) {
	var self = this;

	// If callback is specififed, handle error instead of throwing it
	if (cb) self.cb = cb;

	// Use deep match to descend into the collection and verify each item and/or key
	// Stop at default maxDepth (50) to prevent infinite loops in self-associations
	return Anchor.deepMatch(self.data, ruleset, self);
};

// Coerce the data to the specified ruleset if possible
// otherwise throw an error
Anchor.prototype.cast = function (ruleset) {
	todo();
};

// Coerce the data to the specified ruleset no matter what
Anchor.prototype.hurl = function (ruleset) {
	todo();
};

// Specify default values to automatically populated when undefined
Anchor.prototype.defaults = function (ruleset) {
	todo();
};

// Declare name of custom data type
Anchor.prototype.define = function (name) {
	todo();
};

// Specify custom ruleset
Anchor.prototype.as = function (ruleset) {
	todo();
};


// Specify named arguments and their rulesets as an object
Anchor.prototype.args = function (args) {
	todo();
};

// Specify each of the permitted usages for this function
Anchor.prototype.usage = function () {
	var usages = _.toArray(arguments);
	todo();
};


// Return whether a piece of data matches a rule
// ruleName :: (STRING)
Anchor.match = function match (datum, ruleName, ctx) {


	try {
		var outcome, rule;


		// Determine rule
		if (_.isEqual(ruleName,[])) {
			// [] specified as data type checks for an array
			rule = _.isArray;
		}
		else if (_.isEqual(ruleName,{})) {
			// {} specified as data type checks for any object
			rule = _.isObject;	
		}
		else if (_.isRegExp(ruleName)) {
			// Allow regexes to be used
			rule = function (x) {
				if (!_.isString(x)) return false;
				x.match(ruleName);
			};
		}
		else rule = Anchor.prototype.rules[ruleName];
		

		// Determine outcome
		if (!rule) {
			throw new Error ('Unknown rule: ' + ruleName);
		}
		else outcome = rule(datum);

		// Return outcome or handle failure
		if (!outcome) return failure(datum,ruleName, outcome);
		else return success(outcome);
	}
	catch (e) {
		failure(datum, ruleName, e);
	}

	function failure(datum, ruleName, err) {
		// Allow .error() to handle the error instead of throwing it
		if (ctx.cb) {
			ctx.cb(err);
			return err || new Error ('Validation error: "'+datum+'" is not of type "'+ruleName+'"');
		}
		else if (err) throw new Error(err);
		else throw new Error ('Validation error: "'+datum+'" is not of type "'+ruleName+'"');
	}

	function success(outcome) {
		if (ctx.cb) {
			return ctx.cb(null, outcome);
		}
		else return outcome;
	}
};


// Match a complex collection or model against a schema
Anchor.deepMatch = function deepMatch (data, ruleset, ctx, depth, maxDepth) {
	
	// If ruleset is not an object or array, use the provided function to validate
	if (!_.isObject(ruleset)) {
		return Anchor.match(data,ruleset,ctx);
	}

	// Default value for maxDepth and depth
	maxDepth = maxDepth || 50;
	depth = depth || 0;

	if (depth > maxDepth) {
		throw new Error ('Depth of object being parsed exceeds maxDepth ().  Maybe it links to itself?');
	}

	// If this is a schema rule, check each item in the data collection
	if (_.isArray(ruleset) && ruleset.length !== 0) {
		if (ruleset.length > 1) {
			throw new Error ('[] (or schema) rules can contain only one item.');
		}
		
		// Handle plurals (arrays with a schema rule)
		else return _.all(data, function (model) {
			return Anchor.deepMatch(model, ruleset[0], ctx, depth+1);
		});
	}

	// If the current rule is an object, check each key
	else if (!_.isArray(ruleset) && _.isObject(ruleset)) {

		// Don't treat empty object as a ruleset
		if (_.keys(ruleset).length === 0) {
			return Anchor.match(data, ruleset, ctx);
		}
		else return _.all(ruleset,function(subRule,key) {
			return Anchor.deepMatch(data[key], ruleset[key], ctx, depth+1);
		});
	}

	// Leaf rules land here and execute the iterator
	else return Anchor.match(data, ruleset, ctx);
};

function todo() {
	throw new Error("Not implemented yet! If you'd like to contribute, tweet @mikermcneil.");
}