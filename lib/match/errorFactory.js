/**
 * Module dependencies
 */

var _ = require('lodash');



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

  // Construct error message
  var errMsg;
  if (_.isString(customMessage)) {
    errMsg = customMessage;
  }
  else if (_.isFunction(customMessage)) {
    errMsg = customMessage(value, ruleName, keyName);
  }
  else {
    errMsg = 'Validation error: "' + value + '" ';
    errMsg += keyName ? '(' + keyName + ') ' : '';
    errMsg += 'is not of type "' + ruleName + '"';
  }


  // Construct error object
  return [{
    property: keyName,
    data: value,
    message: errMsg,
    rule: ruleName
  }];
};
