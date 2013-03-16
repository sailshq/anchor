var _ = require('underscore');
var rules = require('./rules');

module.exports = deepMatch;

// Max depth value
var maxDepth = 50;

/**
*
*
*
* Match a complex collection or model against a schema
*
*
*/
function deepMatch (data, ruleset, ctx, depth, keyName) {
	
	// If ruleset is not an object or array, use the provided function to validate
	if (!_.isObject(ruleset)) {
		return match(data,ruleset,ctx, keyName);
	}

	// Default value for depth
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
			return match(data, ruleset, ctx, keyName);
		}
		else return _.all(ruleset,matchDict);
	}

	// Leaf rules land here and execute the iterator
	else return match(data, ruleset, ctx, keyName);


	// Iterate through rules in dictionary until error is detected
	function matchDict(subRule,key) {
		if (ctx && ctx.error) return false;
		else return deepMatch(data[key], ruleset[key], ctx, depth+1, key);
	}

	// Match each object in array against ruleset until error is detected
	function matchArray(model) {
		if (ctx && ctx.error) return false;
		else return deepMatch(model, ruleset[0], ctx, depth+1, keyName);
	}
}






/**
*
*
*
*
*
*
*
* Return whether a piece of data matches a rule
* ruleName :: (STRING)
*/
function match (datum, ruleName, ctx, keyName) {


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
		// Lookup rule
		else rule = rules[ruleName];
		

		// Determine outcome
		if (!rule) {
			throw new Error ('Unknown rule: ' + ruleName);
		}
		else outcome = rule(datum);

		// False outcome is a failure
		if (!outcome) return failure(datum,ruleName, keyName);
		else return outcome;
	}
	catch (e) {
		failure(datum, ruleName, keyName);
	}

	// On failure-- stop and get out.  
	// If a cb was specified, call it with a first-arity error object. 
	// Otherwise, throw an error.
	function failure(datum, ruleName, keyName) {

		// Construct error
		var err = '';
		err += 'Validation error: "'+datum+'" ';
		err += keyName ? '('+keyName+') ' : '';
		err += 'is not of type "'+ruleName+'"';
		err = new Error(err);

		// Handle the error in callback instead of throwing it
		if (ctx.cb) {
			ctx.error = err;
			return false;
		}

		// Or throw error if there was no callback
		else throw err;
	}
}