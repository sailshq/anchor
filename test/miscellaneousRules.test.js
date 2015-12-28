var _ = require('lodash');
var anchor = require('../index.js');
var testRules = require('./util/testRules.js');



describe('miscellaneous rules', function() {

  describe ('max/min',function () {
    it (' should support "max" rule ', function () {
      return testRules({
        max: 3
      },2,5);
    });
  });

  describe ('greaterThan/lessThan',function () {
    it (' should support "greaterThan" rule ', function () {
      return testRules({
        greaterThan: 3.5
      }, 4, 3);
    });
    it (' should support "greaterThan" rule ', function () {
      return testRules({
        greaterThan: 3.5
      }, 3.6, 3.5);
    });
    it (' should support "lessThan" rule ', function () {
      return testRules({
        lessThan: 3.5
      }, 3, 4);
    });
    it (' should support "lessThan" rule ', function () {
      return testRules({
        lessThan: 3.5
      }, 3.4, 3.5);
    });
  });

  describe('url', function () {

    it ('should support "url" rule with no options', function () {
      return testRules({ url: true }, 'http://sailsjs.org', 'sailsjs');
    });

    it ('should support "url" rule with options', function () {
      return testRules({ url: { require_protocol: true } }, 'http://sailsjs.org', 'www.sailsjs.org');
    });
  });

  describe('before/after date', function () {
    it (' should support "before" rule ', function () {
      return testRules({
        before: new Date()
      },new Date(Date.now() - 100000),new Date(Date.now() + 1000000));
    });
  });

  describe('required', function () {
    it(' should support "required" with boolean', function() {
      testRules({
        type: 'boolean',
        required: true
      }, true, undefined);
    });

    it(' should support "required" with boolean value false', function() {
      testRules({
        type: 'boolean',
        required: true
      }, false, null);
    });

    it(' should support "required" with integer value 0', function() {
      testRules({
        type: 'integer',
        required: true
      }, 0, NaN);
    });

    it(' should support "required" with string', function() {
      testRules({
        type: 'string',
        required: true
      }, 'some', '');
    });

    it(' should support "required" with empty object', function() {
      testRules({
        type: 'json',
        required: true
      }, {}, undefined);
    });

    it(' should support "required" with array', function() {
      testRules({
        type: [],
        required: true
      }, ['one'], []);
    });
  });

  describe('geojson', function () {
    var jsondef = {
      type: 'json',
      geojson: true
    };
    var stringdef = {
      type: 'string',
      geojson: true
    };
    var validGeoJson = [
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [125.6, 10.1]
        },
        "properties": {
          "name": "Dinagat Islands"
        }
      }
    ];

    it(' should support "json" type', function () {
      testRules(jsondef, validGeoJson[0], { foo: 'bar' });
    });
    it(' should support "string" type', function () {
      testRules(stringdef, JSON.stringify(validGeoJson[0]), JSON.stringify({ foo: 'bar' }));
    });
  });

  describe('dbType', function () {
    it(' should support "dbType" with existing validation rule', function() {
      testRules({
        type: 'float',
        dbType: 'float'
      }, 10.9, 'hi');
    });

    it(' should support "dbType" with non-existing validation rule', function() {
      testRules({
        type: 'float',
        dbType: 'age'
      }, 10, 'hi');
    });
  });

});
