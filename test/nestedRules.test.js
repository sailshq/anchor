var _ = require('@sailshq/lodash');
var anchor = require('../index.js');
var testType = require('./util/testType.js');

describe('nested rules ($validate syntax)', function() {

  it(' should solve recursive rules when $validate syntax is used', function() {
    testType({
      // Ruleset
      name: {
        $validate: { type: 'string' }
      },
      id: {
        $validate: { type: 'numeric' }
      },
      friends: {
        $validate: { type: [] }
      },
      moreFriends: {
        $validate: {type: 'array' }
      }
    }, {
    // Example
      name: 'Rachael',
      id: '235',
      friends: ['a', 'b'],
      moreFriends: [{
        name: 'Rachael'
      }, {
        name: 'Sebastian'
      }, {
        name: 'Heather'
      }]
    }, {
    // Non-example
      name: 'Sebastian',
      id: '235',
      friends: 'd'
    });
  });

});