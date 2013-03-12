var _ = require('underscore');
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
Anchor.prototype.rules = require('./rules');

// Enforce that the data matches the specified ruleset
// If it doesn't, throw an error.
// If the callback is specified, instead of throwing, use first arg
Anchor.prototype.to = function (ruleset, cb) {
	var self = this;

	// If callback is specififed, trigger it at the end
	// also, handle error instead of throwing it
	if (cb) self.cb = cb;

	// Use deep match to descend into the collection and verify each item and/or key
	// Stop at default maxDepth (50) to prevent infinite loops in self-associations
	Anchor.deepMatch(self.data, ruleset, self);

	// If a callback was specified, trigger it
	// If an error object was stowed away in the ctx, pass it along
	// (otherwise we never should have made it this far, the error should have been thrown)
	cb && cb(self.error);
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

		// False outcome is a failure
		if (!outcome) return failure(datum,ruleName);
		else return outcome;
	}
	catch (e) {
		failure(datum, ruleName);
	}

	// On failure-- stop and get out.  
	// If a cb was specified, call it with a first-arity error object. 
	// Otherwise, throw an error.
	function failure(datum, ruleName) {

		// Construct error
		var err = new Error ('Validation error: "'+datum+'" is not of type "'+ruleName+'"');

		// Handle the error in callback instead of throwing it
		if (ctx.cb) {
			ctx.error = err;
			return false;
		}

		// Or throw error if there was no callback
		else throw err;
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
		return _.all(data, matchArray);
	}

	// If the current rule is an object, check each key
	else if (!_.isArray(ruleset) && _.isObject(ruleset)) {

		// Don't treat empty object as a ruleset
		if (_.keys(ruleset).length === 0) {
			return Anchor.match(data, ruleset, ctx);
		}
		else return _.all(ruleset,matchDict);
	}

	// Leaf rules land here and execute the iterator
	else return Anchor.match(data, ruleset, ctx);


	// Iterate through rules in dictionary until error is detected
	function matchDict(subRule,key) {
		if (ctx && ctx.error) return false;
		else return Anchor.deepMatch(data[key], ruleset[key], ctx, depth+1);
	}

	// Match each object in array against ruleset until error is detected
	function matchArray(model) {
		if (ctx && ctx.error) return false;
		else return Anchor.deepMatch(model, ruleset[0], ctx, depth+1);
	}
};

function todo() {
	throw new Error("Not implemented yet! If you'd like to contribute, tweet @mikermcneil.");
}