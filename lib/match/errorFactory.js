/**
 * Module dependencies
 */

var _ = require('@sailshq/lodash');
var util = require('util');


/**
 * `errorFactory()`
 *
 * @param  {?} value
 * @param  {String} ruleName
 * @param  {String} keyName
 * @param  {String|Function} customMessage    (optional)
 *
 * @return {Object}
 *
 * @api private
 */

module.exports = function errorFactory(value, ruleName, keyName, customMessage) {
  // Avoid throwing errors by defaulting the `ruleName` value
  if (_.isUndefined(ruleName)) {
    ruleName = 'unknown';
  }
  // Construct error message
  var errMsg;
  if (_.isString(customMessage)) {
    errMsg = customMessage;
  }
  else if (_.isFunction(customMessage)) {
    errMsg = customMessage(value, ruleName, keyName);
  }
  else {

    // Get the type of the value that was passed here.
    var actualType = typeof value;

    // In the case of a NaN, don't bother saying "instead of NaN which is a NaN",
    // since it doesn't give you any more information.
    if (typeof value === 'number' && isNaN(value)) {
      errMsg = util.format(
        // Template:
        '%s should be a%s %s',
        // Token replacements:
        // -------------------
        // Default to just saying 'Value' if we don't have the property name of the value.
        keyName ? ('`' + keyName + '`') : 'Value',
        // Adjust the article ("a" or "an") based on whether the next word starts with a vowel.
        _.contains(['a','e','i','o','u'], ruleName[0]) ? 'n' : '',
        // Output the name of the expected data type (e.g. "string" or "boolean").
        ruleName
      );
    }

    // In all other cases, make a nicer error message comparing what was expected
    // to what was actually received.
    else {
      // Attempt to stringify the passed value.
      var stringifiedValue;
      try {
        stringifiedValue = JSON.stringify(value);
      }
      // Fall back to just displaying the `toString()` version of the value.
      catch(e) {
        stringifiedValue = value;
      }

      errMsg = util.format(
        // Template:
        '%s should be a%s %s (instead of %s, which is a%s %s)',
        // Token replacements:
        // -------------------
        // Default to just saying 'Value' if we don't have the property name of the value.
        keyName ? ('`' + keyName + '`') : 'Value',
        // Adjust the article ("a" or "an") based on whether the next word starts with a vowel.
        _.contains(['a','e','i','o','u'], ruleName[0]) ? 'n' : '',
        // Output the name of the expected data type (e.g. "string" or "boolean").
        ruleName,
        // Output the actual value that was passed in here.
        stringifiedValue,
        // Adjust the article ("a" or "an") based on whether the next word starts with a vowel.
        _.contains(['a','e','i','o','u'], actualType[0]) ? 'n' : '',
        // Output the type of the value that was passed in.
        actualType
      );

    }
  }


  // Construct error object
  return [{
    property: keyName,
    data: value,
    message: errMsg,
    rule: ruleName,
    actualType: typeof value,
    expectedType: ruleName
  }];
};
