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

// Enforce the data with the specified ruleset
Anchor.prototype.to = function (ruleset, error) {
	var self = this;

	// If error is specififed, handle error instead of throwing it
	if (error) {
		this.errorFn = error;
	}

	if (_.isObject(ruleset)) {
		recursiveMatch(ruleset, function (rule, keyChain) {
			var topLevelAttrName = keyChain.shift();
			var topLevelAttrVal = self.data[topLevelAttrName];

			// Get full .-delimited parameter name
			var attrName = _.reduce(keyChain,function(memo,key) {
				return memo+"."+key;
			},topLevelAttrName);

			// Get parameter value
			var attrVal = topLevelAttrName && _.reduce(keyChain,function(memo,key) {
				return memo && memo[key];
			}, topLevelAttrVal);

			return matchRule(attrVal, rule, this);
		});
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
		if (!outcome) failure(datum,ruleName, outcome);
		else return outcome;
	}
	catch (e) {
		failure(datum, ruleName, e);
	}

	function failure(datum, ruleName, err) {
		// Allow .error() to handle the error instead of throwing it
		if (ctx.errorFn) {
			ctx.errorFn(err);
			return err;
		}
		else if (err) throw new Error(err);
		else throw new Error ('Validation error: "'+datum+'" is not of type "'+ruleName+'"');
	}
}


// Match collection using function
function recursiveMatch (collection, fn, maxDepth) {
	if (!_.isObject(collection)) {
		return true;
	}

	// Default value for maxDepth
	maxDepth = maxDepth || 50;

	// Kick off recursive function
	return _all(collection,null,[],fn,0);

	function _all(item,key,keyChain,fn,depth) {
		var lengthenedKeyChain = [];

		if (depth > maxDepth) {
			throw new Error ('Depth of object being parsed exceeds maxDepth ().  Maybe it links to itself?');
		}

		// If the key is null, this is the root item, so skip this step
		// Descend
		if (key !== null && keyChain) {
			lengthenedKeyChain = keyChain.slice(0);
			lengthenedKeyChain.push(key);
		}

		// If the current item is an array, check each item
		if (_.isArray(item)) {

			// Don't treat empty array as a collection
			if (item.length === 0) return fn(item, lengthenedKeyChain);
			else return _.all(item, function(subval, subkey) {
				return _all(subval,subkey,lengthenedKeyChain,fn,depth+1);
			});
		}
		// If the current item is an object, check each key
		else if (_.isObject(item)) {
			// Don't treat empty object as a collection
			if (_.keys(item).length === 0) return fn(item, lengthenedKeyChain);
			return _.all(item,function(subval,subkey) {
				return _all(subval,subkey,lengthenedKeyChain,fn,depth+1);
			});
		}
		// Leaf items land here and execute the iterator
		else {
			return fn(item,lengthenedKeyChain);
		}
	}
}