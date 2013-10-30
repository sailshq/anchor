/**
 * Module dependencies
 */

var _ = require('lodash');
var rules = require('./rules');


/**
 * Expose functions
 */

module.exports = {
	type: deepMatchType,
	rule: match
};


// Max depth value
var maxDepth = 50;


/**
 * Match a miscellaneous rule
 * Returns an empty list on success,
 * or a list of errors if things go wrong
 */

function match ( data, ruleName, args ) {
	var self = this,
			errors = [];

	// if args is an array we need to make it a nested array
	if (Array.isArray(args)) {
		args = [args];
	}

	// Ensure args is a list, then prepend it with data
	if ( !_.isArray(args) ) {
		args = [args];
	}

	// push data on to front
	args.unshift(data);

	// Lookup rule and determine outcome
	var outcome;
	var rule = rules[ruleName];
	if (!rule) {
		throw new Error ('Unknown rule: ' + ruleName);
	}
	try {
		outcome = rule.apply(self, args);
	}
	catch (e) {
		outcome = false;
	}

	// If outcome is false, an error occurred
	if (!outcome) return failure(data, ruleName, args);
	else return [];


	// On failure-- stop and get out.
	// If a cb was specified, call it with a first-arity error object.
	// Otherwise, return a list of error objets.
	function failure() {

		// remove data from the front
		args.shift();

		// Construct error message
		var errMsg = '';
		errMsg += 'Validation error: "'+data+'" ';
		errMsg += 'Rule "' + ruleName + '(' + args.join(',') + ')" failed.';

		// Construct error object
		return [{
			data: data,
			message: errMsg,
			rule: ruleName,
			args: args
		}];
	}
}






/**
 * Match a complex collection or model against a schema
 *
 * @param {} data
 * @param {} ruleset
 * @param {} depth
 * @param {} keyName
 * @returns a list of errors (or an empty list if no errors were found)
 */

function deepMatchType (data, ruleset, depth, keyName) {

	var self = this,
			errors = [];


	// If ruleset is not an object or array, use the provided function to validate
	if (!_.isObject(ruleset)) {
		return matchType.call(self, data,ruleset, keyName);
	}

	// Default value for depth
	depth = depth || 0;

	if (depth > maxDepth) {
		throw new Error ('Depth of object being parsed exceeds maxDepth ().  Maybe it\'s recursively referencing itself?');
	}

	// If this is a schema rule, check each item in the data collection
	if (_.isArray(ruleset)) {
		if (ruleset.length !== 0) {
			if (ruleset.length > 1) {
				throw new Error ('[] (or schema) rules can contain only one item.');
			}

			// Handle plurals (arrays with a schema rule)
			// Match each object in data array against ruleset until error is detected
			_.each(data, function (model) {
				errors = errors.concat(deepMatchType.call(self, model, ruleset[0], depth+1, keyName));
			});
			return errors;
		}
		// Leaf rules land here and execute the iterator
		else return matchType.call(self, data, ruleset, keyName);
	}

	// If the current rule is an object, check each key
	// && _.isObject(ruleset) is a redundant test (already tested aboved), always true at this point
	// !_.isArray(ruleset) is also redundant test, just need to refactor if else
	else {

		// Don't treat empty object as a ruleset
		// Instead, treat it as 'object'
		if (_.keys(ruleset).length === 0) {
			return matchType.call(self, data, ruleset, keyName);
		}
		else {
			// Iterate through rules in dictionary until error is detected
			_.each(ruleset, function (subRule, key) {
				errors = errors.concat(deepMatchType.call(self, data[key], ruleset[key], depth+1, key));
			});
			return errors;
		}
	}
}






/**
* Return whether a piece of data matches a rule
*
* @param {*} datum
* @param {Array|Object|String|Regexp} ruleName
* @param {String} keyName
* @returns a list of errors, or an empty list in the absense of them
*/

function matchType (datum, ruleName, keyName) {

	var self = this;

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
				else x.match.call(self, ruleName);
			};
		}
		// Lookup rule
		else rule = rules[ruleName];


		// Determine outcome
		if (!rule) {
			throw new Error ('Unknown rule: ' + ruleName);
		}
		else outcome = rule.call(self, datum);

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
			data: datum,
			message: errMsg,
			rule: ruleName
		}];
	}
}
