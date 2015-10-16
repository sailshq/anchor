var _ = require('lodash');
var anchor = require('../../index.js');
var async = require('async');

// Test a rule given a deliberate example and nonexample
// Test WITH and WITHOUT callback
module.exports = function testRules (rules, example, nonexample) {

    // Throw an error if there's any trouble
    // (not a good production usage pattern-- just here for testing)
    var exampleOutcome, nonexampleOutcome;

    // Should be falsy
    exampleOutcome = anchor(example).toss(rules);

    // Should be an array
    nonexampleOutcome = anchor(nonexample).toss(rules);

    if (exampleOutcome !== false) {
        return gotErrors('Valid input marked with error!', exampleOutcome, example);
    }
    if (nonexampleOutcome === false) {
        return gotErrors('Invalid input (' + nonexample + ') allowed through.',
            rules, nonexample);
    }

    function gotErrors (errMsg, err, data) {
        console.error(err);
        console.error(data);
        throw new Error(errMsg);
    }
};
