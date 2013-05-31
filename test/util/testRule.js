var _ = require('underscore');
var anchor = require('../../index.js');
var async = require('async');

// Test a rule given a deliberate example and nonexample
// Test WITH and WITHOUT callback
module.exports = function testRule(rule, example, nonexample) {

	// Throw an error if there's any trouble
	// (not a good production usage pattern-- just here for testing)
	withoutCallback(rule,example,nonexample);
	// withCallback(rule,example,nonexample);

};


// Without callback
function withoutCallback(rule, example, nonexample) {
	var exampleOutcome, nonexampleOutcome;

	// Should be falsy
	exampleOutcome = anchor(example).to(rule);

	// Should be an array
	nonexampleOutcome = anchor(nonexample).to(rule);

	if (exampleOutcome) {
		return gotErrors(exampleOutcome);
	}
	if (!_.isArray(nonexampleOutcome)) {
		return gotErrors('Invalid input (' + nonexample + ') allowed through as a ' + rule + '.');
	}
	
	function gotErrors (err) {
		console.error('*****************');
		console.error('err', err);
		console.error('nonexampleOutcome', nonexampleOutcome);
		console.error('nonexample', nonexample);
		console.error('rule', rule);
		throw new Error(err);
	}
}

// With callback
function withCallback(rule, example, nonexample) {

	async.series([
		// Should not throw error
		function (cb) {
			anchor(example).to(rule, cb);
		},

		// Should throw error
		function (cb) {
			anchor(nonexample).to(rule, function (err) {
				if (!err) cb('Invalid input (' + nonexample + ') allowed through as a ' + rule + '.');
				else cb();
			});
		}], 

	function (err) {
		if(err) {
			console.error('*****************');
			console.error('nonexample', nonexample);
			console.error('rule', rule);
			throw new Error(err);
		}
	});
}