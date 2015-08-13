/**
 * Module dependencies
 */

var _             = require('lodash')
  , util          = require('util')
  , matchType     = require('./matchType')
  , matchRule     = require('./matchRule')
  ;


/**
 * Match a value against a ruleset.
 *
 * @param {*}       data
 * @param {{}}      ruleset
 * @param {string}  keyName
 *
 * @returns {[]} a list of errors, or an empty list in the absence of them
 */
module.exports = function matchRuleset (data, ruleset, keyName) {
  "use strict";

  var errors = [], self = this;

  if (!_.isPlainObject(ruleset)) {
    return [{
      property: keyName,
      message: util.format('Ruleset definition for property `%s` should be a plain object.', keyName)
    }];
  }

  if (!_.has(ruleset, 'type')) {
    ruleset['type'] = {};
  }

  // if no explicit `required` rule, then treat as optional TODO: What about `null` and empty string same?
  if (data === undefined && !ruleset.required) {
    return errors;
  }

  _.forOwn(ruleset, function (value, key) {
    "use strict";

    if (key === 'type') {
      // Validate a type rule
      errors = errors.concat(matchType.call(self, data, value, keyName));
    } else {
      // Validate a non-type rule
      errors = errors.concat(matchRule.call(self, data, key, value, keyName));
    }
  });

  return errors;
};