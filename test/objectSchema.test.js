var _           = require('lodash')
  , anchor      = require('../index.js')
  , testSchema  = require('./util/testSchema.js')
  ;

describe('Object Schema', function() {
  "use strict";

  it('should properly validate a simple object against a type', function() {
    testSchema({
      name: 'string'
    }, {
      name: 'Rachael'
    }, {
      name: 292935
    });
  });

  it('should properly validate a simple object against a ruleset with a type', function() {
    testSchema({
      name: { type: 'string' }
    }, {
      name: 'Rachael'
    }, {
      name: 292935
    });
  });

  it('should properly validate a simple object against a ruleset with a rule', function() {
    testSchema({
      age: { max: 3 }
    }, {
      age: 2
    }, {
      age: 5
    });
  });

  it('should properly validate a simple object against a ruleset with a rule and a type', function() {
    testSchema({
      age: { type: 'int', max: 3 }
    }, {
      age: 2
    }, {
      age: 'a'
    });
  });

  it(' should properly validate another simple object', function() {
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

  it(' should properly validate nested objects', function() {
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

  it(' should handle anonymous object type ', function() {
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
  });

  it('should handle property as optional by default', function () {
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