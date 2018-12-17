var util = require('util');
var _ = require('@sailshq/lodash');
var anchor = require('../../index.js');

// Test a rule given a deliberate example and nonexample
// Test WITH and WITHOUT callback
module.exports = function testRules (rules, example, nonexample) {

  // Throw an error if there's any trouble
  // (not a good production usage pattern-- just here for testing)

  var exampleOutcome = anchor(example, rules);
  if (exampleOutcome.length > 0) {
    throw new Error('Valid input marked with error: '+util.inspect(exampleOutcome,{depth:null})+ '\nExample: '+util.inspect(example,{depth:null})+'\nDetails: '+util.inspect(exampleOutcome));
  }

  var nonexampleOutcome = anchor(nonexample, rules);
  if (!_.isArray(nonexampleOutcome) || nonexampleOutcome.length === 0) {
    throw new Error('Invalid input (' + nonexample + ') allowed through.  '+util.inspect(rules,{depth:null})+ '\nNon-example: '+util.inspect(nonexample,{depth:null})+'\nDetails: '+util.inspect(nonexampleOutcome));
  }

};
