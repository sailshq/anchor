/**
 * Module dependencies
 */


/**
 * `errorFactory()`
 * 
 * @param  {?} datum
 * @param  {String} ruleName
 * @param  {String} keyName
 * @param  {String} customMessage
 *                     (optional)
 * 
 * @return {Object}
 * 
 * @api private
 */

module.exports = function errorFactory(datum, ruleName, keyName, customMessage) {

  // Construct error message
  var errMsg = '';
  errMsg += 'Validation error: "' + datum + '" ';
  errMsg += keyName ? '(' + keyName + ') ' : '';
  errMsg += 'is not of type "' + ruleName + '"';

  // Construct error object
  return [{
    property: keyName,
    data: datum,
    message: errMsg,
    rule: ruleName
  }];
};
