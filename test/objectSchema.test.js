var _           = require('lodash')
  , anchor      = require('../index.js')
  , testSchema  = require('./util/testSchema.js')
  ;

describe('Object Schema', function() {
  "use strict";

  it('should properly validate a simple object against a ruleset with a type', function() {
    testSchema({
      name: { type: 'string' }
    }, {
      name: 'Rachael'
    }, {
      name: 292935
    });
  });

  it('should properly validate a simple object against a ruleset with rules and type', function() {
    testSchema({
      age:  { type: 'int', max: 3 }
    }, {
      age: 2
    }, {
      age: 'a'
    });
  });

  it('should treat property as optional if ruleset does not include `required` rule', function() {
    testSchema({
      name: { type: 'string' },
      age:  { type: 'int', max: 3 }
    }, {
      name: 'Rachael'
    }, {
      name: 1
    });

    testSchema({
      name: { type: 'string' },
      age:  { type: 'int', max: 3 }
    }, {
      age: 1
    }, {
      age: 4
    });

    testSchema({
      name: { type: 'string' },
      age:  { type: 'int', max: 3 }
    }, {
    }, {
      name: 1,
      age: 4
    });
  });

  it('should treat property as required if ruleset includes `required` rule', function() {
    testSchema({
      name: { type: 'string', required: true },
      age:  { type: 'int', max: 3, required: true }
    }, {
      name: 'Rachael', age: 1
    }, {
      name: 1
    });

    testSchema({
      name: { type: 'string', required: true },
      age:  { type: 'int', max: 3, required: true }
    }, {
      name: 'Rachael', age: 1
    }, {
      age: 1
    });

    testSchema({
      name: { type: 'string', required: true },
      age:  { type: 'int', max: 3, required: true }
    }, {
      name: 'Rachael', age: 1
    }, {
    });
  });

  it('should treat `string` ruleset as a shortcut for `{ type: typeName, required: true }`', function() {
    testSchema({
      name: 'string'
    }, {
      name: 'Rachael'
    }, {
      name: 292935
    });

    testSchema({
      name: 'string'
    }, {
      name: 'Rachael'
    }, {
    });
  });

  it(' should properly validate simple object with multiple properties', function() {
    testSchema({
      name: { type: 'string', minLength: 5 },
      id: { type: 'numeric', max: 3 }
    }, {
      name: 'Rachael',
      id: 2
    }, {
      name: 'Rachael',
      id: 5
    });
    testSchema({
      name: { type: 'string', minLength: 5 },
      id: { type: 'numeric', max: 3 }
    }, {
      name: 'Rachael',
      id: 2
    }, {
      name: 'Jack',
      id: 2
    });
    testSchema({
      name: { type: 'string', minLength: 5 },
      id: { type: 'numeric', max: 3 }
    }, {
      name: 'Rachael',
      id: 2
    }, {
      name: 'Jack',
      id: 5
    });
  });

  it(' should ignore unspecified attribute', function() {
    testSchema({
      name: 'string',
      id: 'numeric'
    }, {
      name: 'Rachael',
      id: '235',
      someUnspecifiedAttribute: 'asg!'
    }, {
      name: 'Rachael',
      id: 'a'
    });
  });

  it(' should properly validate nested objects against nested schema with type def only', function() {
    testSchema({
        name: 'string',
        id: 'numeric',
        friend: {
          name: { type: 'string' },
          friend: {
            name: { type: 'string' }
          }
        }
      },
      {
        name: 'Rachael',
        id: 235,
        someOtherAttr: 'ga@$Gg',
        friend: {
          name: 'Jerry',
          friend: {
            name: 'Alonzo'
          }
        }
      },
      {
        name: 'Sebastian',
        id: 235,
        someOtherAttr: 'ga@$Gg',
        friend: {
          name: 'Jerry',
          friend: {
            name: 29239239
          }
        }
      });
  });

  it('should properly validate nested objects against nested schema with ruleset', function () {
    testSchema({
      name: 'string',
      id: 'numeric',
      friend: {
        name: { type: 'string', minLength: 5 },
        friend: {
          name: { type: 'string', maxLength: 5 }
        }
      }
    },
    {
      name: 'Rachael',
      id: 235,
      someOtherAttr: 'ga@$Gg',
      friend: {
        name: 'Alonzo',
        friend: {
          name: 'Jerry'
        }
      }
    },
    {
      name: 'Rachael',
      id: 235,
      someOtherAttr: 'ga@$Gg',
      friend: {
        name: 'John',
        friend: {
          name: 'Jerry'
        }
      }
    });

    testSchema({
        name: 'string',
        id: 'numeric',
        friend: {
          name: { type: 'string', minLength: 5 },
          friend: {
            name: { type: 'string', maxLength: 5 }
          }
        }
      },
      {
        name: 'Rachael',
        id: 235,
        someOtherAttr: 'ga@$Gg',
        friend: {
          name: 'Alonzo',
          friend: {
            name: 'Jerry'
          }
        }
      },
      {
        name: 'Rachael',
        id: 235,
        someOtherAttr: 'ga@$Gg',
        friend: {
          name: 'Alonzo',
          friend: {
            name: 'Alonzo'
          }
        }
      });
  });

  it(' should handle anonymous object type', function() {
    testSchema({
      friend: {}
    }, {
      friend: { id: 2, name: 'Rachael', favoriteColor: 'red' }
    }, {
      friend: 'd'
    });
  });

  it('should handle sub-validation with type rule (`$validate` syntax) for object type', function () {
    testSchema({
      friend: { $validate: { type: 'object' } }
    }, {
      friend: { id: 2, name: 'Rachael', favoriteColor: 'red' }
    }, {
      friend: 'd'
    });
  });

  it('should treat `type` with ruleset as property', function () {
    testSchema({
      car: {
        type: { type: 'string' }
      }
    }, {
      car: { type: 'SUV' }
    }, {
      car: { type: 1 }
    });
  });

  it('should handle sub-validation with misc rule (`$validate` syntax) for object type', function () {
    testSchema({
      friend: { $validate: { required: true } }
    }, {
      friend: { id: 2, name: 'Rachael', favoriteColor: 'red' }
    }, {});
  });

  it('should handle sub-validation with nested schema and misc rule', function () {
    testSchema({
      friend: {
        $validate: { required: true },
        id: { type: 'int', max: 3 }
      }
    }, {
      friend: { id: 2, name: 'Rachael', favoriteColor: 'red' }
    }, {
      friend: { id: 5 }
    });

    testSchema({
      name: { type: 'string' },
      friend: {
        $validate: { required: true },
        id: { type: 'int', max: 3 }
      }
    }, {
      friend: { id: 2, name: 'Rachael', favoriteColor: 'red' }
    }, {
      name: 'John'
    });
  });

  it('should handle nested property as optional by default', function () {
    testSchema({
      friend: {
        id: { type: 'int', max: 3 }
      }
    }, {
      friend: { name: 'Rachael', favoriteColor: 'red' }
    }, {
      friend: { id: 5 }
    });
  });

});