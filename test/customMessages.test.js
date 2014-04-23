var _ = require('lodash');
var anchor = require('../index.js');
var testType = require('./util/testType.js');
var assert = require('assert');


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
        },

        // This one will trigger an invalid usage error,
        // since $validate is required if $message is used:
        foo: {
          $message: 'oops4'
        }

      }
    });

    var ok = _.all(errors, function (err) {
      switch(err.property) {
        case 'name': return err.message === 'oops0';
        case 'id': return err.message === 'oops1';
        case 'friends': return err.message === 'oops2';
        case 'moreFriends': return err.message === 'oops3';
        
        // Check for proper usage error:
        case 'foo': return err.status === 500 && err.code === 'E_USAGE' && err.$message === 'oops4';
        default: return false;
      }
    });

    assert(ok, 'Failed to use the specified custom validation message(s)');

  });

});