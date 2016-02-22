/**
 * Module dependencies
 */

var util = require('util');
var _ = require('lodash');
var rules = require('./rules');


/**
 * Match a miscellaneous rule
 * Returns an empty list on success,
 * or a list of errors if things go wrong
 */

module.exports = function matchRule (data, ruleName, args) {
  var self = this,
    errors = [];

  // supporting custom error messages
  if (_.isObject(args)){
    message = args.message.replace('{data}', data).replace('{rule}', args.value) || "No custom message provided.";
    args = args.value || true;
  }

  // if args is an array we need to make it a nested array
  if (Array.isArray(args) && ruleName !== 'len') {
    args = [args];
  }

  // Ensure args is a list, then prepend it with data
  if (!_.isArray(args)) {
    args = [args];
  }

  // push data on to front
  args.unshift(data);

  // Lookup rule and determine outcome
  var outcome;
  var rule = rules[ruleName];
  if (!rule) {
    throw new Error('Unknown rule: ' + ruleName);
  }
  try {
    outcome = rule.apply(self, args);
  } catch (e) {
    outcome = false;
  }

  // If outcome is false, an error occurred
  if (!outcome) {
    var output = (message) ? message : util.format('"%s" validation rule failed for input: %s', ruleName, util.inspect(data));
    return [{
      rule: ruleName,
      data: data,
      message: output
    }];
  }
  else {
    return [];
  }

};
