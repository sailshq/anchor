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
* Return a list of errors (or an empty list if no errors were found)
*
*/
function deepMatch (data, ruleset, ctx, depth, keyName) {
	
	var errors;

	// If ruleset is not an object or array, use the provided function to validate
	if (!_.isObject(ruleset)) {
		return match(data,ruleset,ctx, keyName);
	}

	// Default value for depth
	depth = depth || 0;

	if (depth > maxDepth) {
		throw new Error ('Depth of object being parsed exceeds maxDepth ().  Maybe it\'s recursively referencing itself?');
	}

	// If this is a schema rule, check each item in the data collection
	if (_.isArray(ruleset) && ruleset.length !== 0) {
		if (ruleset.length > 1) {
			throw new Error ('[] (or schema) rules can contain only one item.');
		}
		
		// Handle plurals (arrays with a schema rule)
		errors = [];
		_.each(data, function (model) {
			errors.concat(matchArray(model));
		});
		return errors;
	}

	// If the current rule is an object, check each key
	else if (!_.isArray(ruleset) && _.isObject(ruleset)) {

		// Don't treat empty object as a ruleset
		// Instead, treat it as 'object'
		if (_.keys(ruleset).length === 0) {
			return match(data, ruleset, ctx, keyName);
		}
		else {
			errors = [];
			_.each(ruleset, function (subRule, key) {
				errors.concat(matchDict(subRule, key));
			});
			return errors;
		}
	}

	// Leaf rules land here and execute the iterator
	else return match(data, ruleset, ctx, keyName);


	// Iterate through rules in dictionary until error is detected
	function matchDict(subRule,key) {
		return deepMatch(data[key], ruleset[key], ctx, depth+1, key);
	}

	// Match each object in array against ruleset until error is detected
	function matchArray(model) {
		return deepMatch(model, ruleset[0], ctx, depth+1, keyName);
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
* returns a list of errors, or an empty list in the absense of them
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
				// If argument to regex rule is not a string,
				// fail on 'string' validation
				if (!_.isString(x)) {
					rule = rules['string'];
				}
				else x.match(ruleName);
			};
		}
		// Lookup rule
		else rule = rules[ruleName];
		

		// Determine outcome
		if (!rule) {
			throw new Error ('Unknown rule: ' + ruleName);
		}
		else outcome = rule(datum);

		// If validation failed, return an error
		if (!outcome) {
			return failure(datum,ruleName, keyName);
		}

		// If everything is ok, return an empty list
		else return [];
	}
	catch (e) {
		return failure(datum, ruleName, keyName);
	}

	// On failure-- stop and get out.  
	// If a cb was specified, call it with a first-arity error object. 
	// Otherwise, return a list of error objets.
	function failure(datum, ruleName, keyName) {

		// Construct error message
		var errMsg = '';
		errMsg += 'Validation error: "'+datum+'" ';
		errMsg += keyName ? '('+keyName+') ' : '';
		errMsg += 'is not of type "'+ruleName+'"';

		// Construct error object
		return [{
			property: keyName,
			message: errMsg,
			rule: ruleName
		}];
	}
}