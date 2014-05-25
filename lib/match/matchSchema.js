/**
 * Module dependencies
 */

var _             = require('lodash')
  , rules         = require('./rules')
  , errorFactory  = require('./errorFactory')
  , matchType     = require('./matchType')
  , matchRuleset  = require('./matchRuleset')
  ;

// var JSValidationError

// Exposes `matchType` as `deepMatchType`.
module.exports = deepMatchType;


var RESERVED_KEYS = {
  $validate: '$validate',
  $message: '$message'
};

// Max depth value
var MAX_DEPTH = 50;



/**
 * Match a complex collection or model against a schema
 *
 * @param {?} data
 * @param {?} schema
 * @param {Number} depth
 * @param {String} keyName
 * @param {String} customMessage
 *                   (optional)
 *
 * @returns {[]} a list of errors (or an empty list if no errors were found)
 */

function deepMatchType(data, schema, depth, keyName, customMessage) {
  "use strict";

  var self = this;

  // Prevent infinite recursion
  depth = depth || 0;
  if (depth > MAX_DEPTH) {
    return [
      new Error({ message: 'Exceeded MAX_DEPTH when validating object.  Maybe it\'s recursively referencing itself?'})
    ];
  }

  // (1) Base case - primitive
  // ----------------------------------------------------
  // If schema is not an object or array, use the provided function to validate
  if (!_.isObject(schema)) {
    return matchType.call(self, data, schema, keyName, customMessage);
  }


  // (2) Recursive case - Array
  // ----------------------------------------------------
  // If this is a schema rule, check each item in the data collection
  else if (_.isArray(schema)) {
    if (schema.length !== 0) {
      if (schema.length > 1) {
        return [
          new Error({ message: '[] (or schema) rules must contain exactly one item.'})
        ];
      }

      // Handle plurals (arrays with a schema rule)
      // Match each object in data array against schema until error is detected
      return _.reduce(data, function getErrors(errors, datum) {
        errors = errors.concat(deepMatchType.call(self, datum, schema[0], depth + 1, keyName, customMessage));
        return errors;
      }, []);
    }
    // Leaf rules land here and execute the iterator fn
    else return matchType.call(self, data, schema, keyName, customMessage);
  }

  // (3) Recursive case - POJO
  // ----------------------------------------------------
  // If the current rule is an object, check each key
  else {

    // Note:
    // 
    // We take advantage of a couple of preconditions at this point:
    // (a) schema must be an Object
    // (b) schema must NOT be an Array

    // Don't treat empty object as a schema
    // Instead, treat it as 'object'
    if (_.keys(schema).length === 0) {
      return matchType.call(self, data, schema, keyName, customMessage);
    }

    //  *** Check for special reserved keys ***

    // { $message: '...' } specified as data type
    // uses supplied message instead of the default
    var _customMessage = schema[RESERVED_KEYS.$message];

    // { $validate: {...} } specified as data type
    // runs a sub-validation (recursive)
    var subValidation = schema[RESERVED_KEYS.$validate];

    // Don't allow a `$message` without a `$validate`
    if (_customMessage) {
      if (!subValidation) {
        return [{
          code: 'E_USAGE',
          status: 500,
          $message: _customMessage,
          property: keyName,
          message: 'Custom messages ($message) require a sub-validation - please specify a `$validate` option on `' + keyName + '`'
        }];
      }
      else {
        // Use the specified message as the `customMessage`
        customMessage = _customMessage;
      }
    }

    if (!_.isPlainObject(data) && schema.type) {
      return matchRuleset.call(self, data, subValidation || schema, keyName);
    }

    // Iterate through rules in dictionary until error is detected
    return _.reduce(schema, function(errors, ruleset, key) {

      // Execute sub-validation rules
      if (key === RESERVED_KEYS.$validate) {
        return errors.concat(matchRuleset.call(self, data, ruleset, keyName));
      }

      // Prevent throwing when encountering unexpectedly "shallow" data
      // (instead- this should be pushed as an error where "undefined" is
      // not of the expected type: "object")
      if (!_.isObject(data)) {
        return errors.concat(errorFactory(data, 'object', key, customMessage));
      } else {
        return errors.concat(deepMatchType.call(self, data[key], ruleset, depth + 1, key, customMessage));
      }
    }, []);

  }
}

