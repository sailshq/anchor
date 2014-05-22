var _ = require('lodash');
var anchor = require('../../index.js');
var async = require('async');

// Test a rule given a deliberate example and nonexample
// Test WITH and WITHOUT callback
module.exports = function testSchema (schema, example, nonexample) {

	// Throw an error if there's any trouble
	// (not a good production usage pattern-- just here for testing)
	var exampleOutcome, nonexampleOutcome;

	// Should be falsy
	exampleOutcome = anchor(example).to(schema);

	// Should be an array
	nonexampleOutcome = anchor(nonexample).to(schema);

	if (exampleOutcome) {
		return gotErrors(exampleOutcome);
	}
	if (!_.isArray(nonexampleOutcome)) {
		return gotErrors('Invalid input (' + nonexample + ') allowed through as a ' + schema + '.');
	}

	function gotErrors (err) {
		console.error('*****************');
		console.error('err', err);
		console.error('nonexampleOutcome', nonexampleOutcome);
		console.error('nonexample', nonexample);
		console.error('schema', schema);
		throw new Error(err);
	}
};
