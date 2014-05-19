/**
 * Module dependencies
 */

var util = require('util');
var _ = require('lodash');
var rules = require('./rules');
var errorFactory = require('./errorFactory');


/**
 * `matchType()`
 * 
 * Return whether a piece of data matches a rule
 *
 * @param {?} datum
 * @param {Array|Object|String|RegExp} ruleName
 * @param {String} keyName
 * @param {String} customMessage
 *                      (optional)
 *
 * @returns {[]} a list of errors, or an empty list in the absense of them
 * @api private
 */

module.exports = function matchType(datum, ruleName, keyName, customMessage) {

  var self = this;

  try {
    var rule;
    var outcome;

    // Determine rule
    if (_.isEqual(ruleName, [])) {
      // [] specified as data type checks for an array
      rule = _.isArray;
    }
    else if (_.isEqual(ruleName, {})) {
      // {} specified as data type checks for any object
      rule = _.isObject;
    }
    else if (_.isRegExp(ruleName)) {
      // Allow regexes to be used
      rule = function(x) {
        // If argument to regex rule is not a string,
        // fail on 'string' validation
        if (!_.isString(x)) {
          rule = rules['string'];
        } else x.match.call(self, ruleName);
      };
    }
    // Lookup rule
    else rule = rules[ruleName];


    // Determine outcome
    if (!rule) {
      return [
        new Error({message:'Unknown rule: ' + ruleName})
      ];
    }
    else outcome = rule.call(self, datum);

    // If validation failed, return an error
    if (!outcome) {
      return errorFactory(datum, ruleName, keyName, customMessage);
    }

    // If everything is ok, return an empty list
    else return [];
  }
  catch (e) {
    return errorFactory(datum, ruleName, keyName, customMessage);
  }

}

