/**
 * Module dependencies
 */

var util = require('util');
var _ = require('@sailshq/lodash');
var validator = require('validator');

/**
 * Type rules
 */

var rules = {

  //  ┬┌─┐┌┐┌┌─┐┬─┐┌─┐  ┌┐┌┬ ┬┬  ┬
  //  ││ ┬││││ │├┬┘├┤   ││││ ││  │
  //  ┴└─┘┘└┘└─┘┴└─└─┘  ┘└┘└─┘┴─┘┴─┘
  'isBoolean': {
    fn: function(x) {
      return typeof x === 'boolean';
    },
    defaultErrorMessage: 'Value was not a boolean.',
    expectedTypes: ['json', 'ref']
  },
  'isNotEmptyString': {
    fn: function(x) {
      return x !== '';
    },
    defaultErrorMessage: 'Value was an empty string.',
    expectedTypes: ['json', 'ref', 'string']
  },
  'isInteger': {
    fn: function(x) {
      return typeof x === 'number' && (parseInt(x) === x);
    },
    defaultErrorMessage: 'Value was not an integer.',
    expectedTypes: ['json', 'ref', 'number']
  },
  'isNumber': {
    fn: function(x) {
      return typeof x === 'number';
    },
    defaultErrorMessage: 'Value was not a number.',
    expectedTypes: ['json', 'ref']
  },
  'isString': {
    fn: function(x) {
      return typeof x === 'string';
    },
    defaultErrorMessage: 'Value was not a string.',
    expectedTypes: ['json', 'ref']
  },
  'max': {
    fn: function(x, val) {
      if (typeof x !== 'number') { throw new Error ('Value was not a number.'); }
      return x <= val;
    },
    defaultErrorMessage: function(x, val) { return 'Value was greater than the configured maximum (' + val + ')'; },
    expectedTypes: ['json', 'ref', 'number'],
    checkConfig: function(constraint) {
      if (typeof constraint !== 'number') {
        return 'Maximum must be specified as a number; instead got `' + util.inspect(constraint) + '`.';
      }
      return false;
    }
  },
  'min': {
    fn: function(x, val) {
      if (typeof x !== 'number') { throw new Error ('Value was not a number.'); }
      return x >= val;
    },
    defaultErrorMessage: function(x, val) { return 'Value was less than the configured minimum (' + val + ')'; },
    expectedTypes: ['json', 'ref', 'number'],
    checkConfig: function(constraint) {
      if (typeof constraint !== 'number') {
        return 'Minimum must be specified as a number; instead got `' + util.inspect(constraint) + '`.';
      }
      return false;
    }
  },


  //  ┬┌─┐┌┐┌┌─┐┬─┐┌─┐  ┌┐┌┬ ┬┬  ┬    ┌─┐┌┐┌┌┬┐  ┌─┐┌┬┐┌─┐┌┬┐┬ ┬  ┌─┐┌┬┐┬─┐┬┌┐┌┌─┐
  //  ││ ┬││││ │├┬┘├┤   ││││ ││  │    ├─┤│││ ││  ├┤ │││├─┘ │ └┬┘  └─┐ │ ├┬┘│││││ ┬
  //  ┴└─┘┘└┘└─┘┴└─└─┘  ┘└┘└─┘┴─┘┴─┘  ┴ ┴┘└┘─┴┘  └─┘┴ ┴┴   ┴  ┴   └─┘ ┴ ┴└─┴┘└┘└─┘
  'isAfter': {
    fn: function(x, val) {
      if (!_.isNaN(x)) {
        x = new Date(x);
      }
      if (!_.isNaN(val)) {
        val = new Date(val);
      }
      return validator.isAfter(x, val);
    },
    expectedTypes: ['json', 'ref', 'string', 'number'],
    defaultErrorMessage: function(x, val) { return 'Value was before the configured time (' + val + ')'; },
    ignoreEmptyString: true,
    checkConfig: function(constraint) {
      if (isNaN(constraint) && _.isNull(validator.toDate(constraint))) {
        return 'Date must be specified as a timestamp (number), a parsable date string, or a JavaScript date object; instead got `' + util.inspect(constraint) + '`.';
      }
      return false;
    }

  },
  'isBefore': {
    fn: function(x, val) {
      if (!_.isNaN(x)) {
        x = new Date(x);
      }
      if (!_.isNaN(val)) {
        val = new Date(val);
      }
      return validator.isBefore(x, val);
    },
    expectedTypes: ['json', 'ref', 'string', 'number'],
    defaultErrorMessage: function(x, val) { return 'Value was after the configured time (' + val + ')'; },
    ignoreEmptyString: true,
    checkConfig: function(constraint) {
      if (isNaN(constraint) && _.isNull(validator.toDate(constraint))) {
        return 'Date must be specified as a timestamp (number), a parsable date string, or a JavaScript date object; instead got `' + util.inspect(constraint) + '`.';
      }
      return false;
    }
  },
  'isCreditCard': {
    fn: validator.isCreditCard,
    expectedTypes: ['json', 'ref', 'string'],
    defaultErrorMessage: 'Value was not a valid credit card.',
    ignoreEmptyString: true
  },
  'isEmail': {
    fn: validator.isEmail,
    expectedTypes: ['json', 'ref', 'string'],
    defaultErrorMessage: 'Value was not a valid email address.',
    ignoreEmptyString: true
  },
  'isHexColor': {
    fn: validator.isHexColor,
    expectedTypes: ['json', 'ref', 'string'],
    defaultErrorMessage: 'Value was not a valid hex color.',
    ignoreEmptyString: true
  },
  'isIn': {
    fn: validator.isIn,
    expectedTypes: ['json', 'ref', 'string', 'number'],
    defaultErrorMessage: function(x, val) { return 'Value was not in the configured whitelist (' + val.join(', ') + ')'; },
    ignoreEmptyString: true,
    checkConfig: function(constraint) {
      if (!_.isArray(constraint)) {
        return 'Allowable values must be specified as an array; instead got `' + util.inspect(constraint) + '`.';
      }
      return false;
    }

  },
  'isIP': {
    fn: validator.isIP,
    expectedTypes: ['json', 'ref', 'string'],
    defaultErrorMessage: 'Value was not a valid IP address.',
    ignoreEmptyString: true
  },
  'isNotIn': {
    fn: function(x, arrayOrString) {
      return !validator.isIn(x, arrayOrString);
    },
    expectedTypes: ['json', 'ref', 'string', 'number'],
    defaultErrorMessage: function(x, val) { return 'Value was in the configured blacklist (' + val.join(', ') + ')'; },
    ignoreEmptyString: true,
    checkConfig: function(constraint) {
      if (!_.isArray(constraint)) {
        return 'Blacklisted values must be specified as an array; instead got `' + util.inspect(constraint) + '`.';
      }
      return false;
    }
  },
  'isURL': {
    fn: function(x, opt) {
      return validator.isURL(x, opt === true ? undefined : opt);
    },
    expectedTypes: ['json', 'ref', 'string'],
    defaultErrorMessage: 'Value was not a valid URL.',
    ignoreEmptyString: true
  },
  'isUUID': {
    fn: validator.isUUID,
    expectedTypes: ['json', 'ref', 'string'],
    defaultErrorMessage: 'Value was not a valid UUID.',
    ignoreEmptyString: true
  },

  'minLength': {
    fn: function(x, min) {
      if (typeof x !== 'string') { throw new Error ('Value was not a string.'); }
      return validator.isLength(x, min);
    },
    expectedTypes: ['json', 'ref', 'string'],
    defaultErrorMessage: function(x, val) { return 'Value was shorter than the configured minimum length (' + val + ')'; },
    ignoreEmptyString: true,
    checkConfig: function(constraint) {
      if (typeof constraint !== 'number' && parseInt(constraint) !== constraint) {
        return 'Minimum length must be specified as an integer; instead got `' + util.inspect(constraint) + '`.';
      }
      return false;
    }
  },
  'maxLength': {
    fn: function(x, max) {
      if (typeof x !== 'string') { throw new Error ('Value was not a string.'); }
      return validator.isLength(x, 0, max);
    },
    expectedTypes: ['json', 'ref', 'string'],
    defaultErrorMessage: function(x, val) { return 'Value was longer than the configured maximum length (' + val + ')'; },
    ignoreEmptyString: true,
    checkConfig: function(constraint) {
      if (typeof constraint !== 'number' && parseInt(constraint) !== constraint) {
        return 'Maximum length must be specified as an integer; instead got `' + util.inspect(constraint) + '`.';
      }
      return false;
    }
  },

  'regex': {
    fn: function(x, regex) {
      return validator.matches(x, regex);
    },
    defaultErrorMessage: function(x, val) { return 'Value did not match the configured regular expression (' + val + ')'; },
    expectedTypes: ['json', 'ref', 'string'],
    ignoreEmptyString: true,
    checkConfig: function(constraint) {
      if (!_.isRegExp(constraint)) {
        return 'Expected a regular expression as the constraint; instead got `' + util.inspect(constraint) + '`.';
      }
      return false;
    }

  },
  // //  ┬─┐┌─┐ ┬┌─┐┌─┐┌┬┐  ┌┐┌┬ ┬┬  ┬
  // //  ├┬┘├┤  │├┤ │   │   ││││ ││  │
  // //  ┴└─└─┘└┘└─┘└─┘ ┴   ┘└┘└─┘┴─┘┴─┘
  // 'isNotNull': {
  //   fn: function(x) {
  //     return !_.isNull(x);
  //   },
  //   expectedTypes: ['json', 'ref']
  // },

  //  ┌─┐┬ ┬┌─┐┌┬┐┌─┐┌┬┐
  //  │  │ │└─┐ │ │ ││││
  //  └─┘└─┘└─┘ ┴ └─┘┴ ┴
  // Custom rule function.
  'custom': {
    fn: function(x, fn) {
      return fn(x);
    },
    expectedTypes: ['json', 'ref', 'string', 'number', 'boolean'],
    defaultErrorMessage: 'Value failed custom validation.',
    checkConfig: function(constraint) {
      if (!_.isFunction(constraint)) {
        return 'Expected a function as the constraint; instead got `' + util.inspect(constraint) + '`.';
      }
      return false;
    }

  }

};

// Wrap a rule in a function that handles nulls and empty strings as requested,
// and adds an `expectedTypes` array that users of the rule can check to see
// if their value is of a type that the rule is designed to handle.  Note that
// this list of types is not necessarily validated in the rule itself; that is,
// just because it lists "json, ref, string" doesn't necessarily mean that it
// will automatically kick out numbers (it might stringify them).  It's up to
// you to decide whether to run the validation based on its `expectedTypes`.
module.exports = _.reduce(rules, function createRule(memo, rule, ruleName) {

  // Wrap the original rule in a function that kicks out null and empty string if necessary.
  var wrappedRule = function(x) {

    // Never allow null or undefined.
    if (_.isNull(x) || _.isUndefined(x)) {
      return 'Got invalid value `' + x + '`!';
    }

    // Don't allow empty strings unless we're explicitly ignoring them.
    if (x === '' && rule.ignoreEmptyString) {
      return false;
    }

    var passed;
    // Run the original rule function.
    try {
      passed = rule.fn.apply(rule, arguments);
    } catch (e) {
      return e.message;
    }

    if (passed) { return false; }
    return _.isFunction(rule.defaultErrorMessage) ? rule.defaultErrorMessage.apply(rule, arguments) : rule.defaultErrorMessage;

  };

  // If the rule doesn't declare its own config-checker, assume that the constraint is supposed to be `true`.
  // This is the case for most of the `is` rules like `isBoolean`, `isCreditCard`, `isEmail`, etc.
  if (_.isUndefined(rule.checkConfig)) {
    wrappedRule.checkConfig = function (constraint) {
      if (constraint !== true) {
        return 'This validation only accepts `true` as a constraint.  Instead, saw `' + constraint + '`.';
      }
      return false;
    };
  } else {
    wrappedRule.checkConfig = rule.checkConfig;
  }

  // Set the `expectedTypes` property of the wrapped function.
  wrappedRule.expectedTypes = rule.expectedTypes;

  // Return the wrapped function.
  memo[ruleName] = wrappedRule;

  return memo;

}, {});
