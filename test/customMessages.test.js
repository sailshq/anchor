var _ = require('lodash');
var anchor = require('../index.js');
var testType = require('./util/testType.js');



describe('custom validation messages ($message syntax)', function() {

  it(' should use custom validation message when `$message` is a string', function() {
    
    var errors = anchor({
      name: 'Sebastian',
      id: '235',
      friends: 'd'
    })
    .to({
      type: {
        name: {
          $validate: {
            type: 'string'
          },
          $message: 'oops0'
        },
        id: {
          $validate: {
            type: 'numeric'
          },
          $message: 'oops1'
        },
        friends: {
          $validate: {
            type: []
          },
          $message: 'oops2'
        },
        moreFriends: {
          $validate: {
            type: 'array'
          },
          $message: 'oops3'
        }

      }
    });

    console.log(errors);

  });

});