var _ = require('lodash');
var anchor = require('../index.js');
var testMultiple = require('./util/testMultiple.js');

describe('anchor toss', function() {

    it(' should properly support multiple validation rules', function() {
        testMultiple({
            name: {
                type: 'string',
                alpha: true
            },
            avatar: {
                type: 'string'
            }
        }, {
            name: 'Connor',
            avatar: 'http://example.com/connor.png'
        }, {
            name: 'N0t ALPH4',
            avatar: 'http://example.com/foobar.png'
        });
    });

    it(' works well with "required"', function() {
        testMultiple({
            name: {
                type: 'string',
                required: true
            },
            avatar: {
                type: 'string'
            }
        }, {
            name: 'Connor'
        }, {
            
        });
    });
});