var _ = require('lodash');
var anchor = require('../index.js');
var assert = require('assert');


describe('handles missing rules', function() {

  it(' should throw an error by default', function() {

    assert(anchor('foo').to({type: 'string', somesillyrule: true}) !== false);

  });

  it(' should be ok ignoring missing rules', function() {

    assert(anchor('foo').ignore().to({type: 'string', somesillyrule: true}) === false);

  });

});