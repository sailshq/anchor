/**
 * Module dependencies
 */

var _ = require('@sailshq/lodash');
var validator = require('validator');

/**
 * Type rules
 */

module.exports = {

  'isEmail' : validator.isEmail,
  'isURL'   : function(x, opt) { return validator.isURL(x, opt === true ? undefined : opt); },
  'isIP'      : validator.isIP,
  'isCreditCard': validator.isCreditCard,
  'isUUID'    : validator.isUUID,
  'isInteger' : validator.isInt,
  'isHexColor': validator.isHexColor,
  // Miscellaneous rules
  'isAfter'   : validator.isAfter,
  'isBefore'  : validator.isBefore,
  'enum'      : validator.isIn,
  'isIn'      : validator.isIn,
  'isNotIn'   : function (x, arrayOrString) { return !validator.isIn(x, arrayOrString); },
  'max'     : function (x, val) {
    var number = parseFloat(x);
    return isNaN(number) || number <= val;
  },
  'min'     : function (x, val) {
    var number = parseFloat(x);
    return isNaN(number) || number >= val;
  },
  'minLength' : function (x, min) { return validator.isLength(x, min); },
  'maxLength' : function (x, max) { return validator.isLength(x, 0, max); },
  'regex' : function (x, regex) {
    if (!_.isRegExp(regex)) { throw new Error('`regex` validation rule must be provided a true regular expression (instead got `'+typeof regex+'`)'); }
    return validator.matches(x, regex);
  },
  'custom': function(x, fn) {
    return fn(x);
  }
};
