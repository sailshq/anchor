var _ = require('lodash');
var anchor = require('../index.js');
var testType = require('./util/testType.js');



describe('basic rules', function() {

	it('should create an anchor object in naive usage',function () {
		anchor('foo');
		return true;
	});

	describe ('falsey values',function () {
		it ('should support "empty" rule ', function () {
			return testType('empty','','foo');
		});

		it ('should support "undefined" rule ', function () {
			return testType('undefined',undefined,'foo');
		});

		it ('"null" rule should not work with undefined ', function () {
			return testType('null',null,undefined);
		});

		it ('"null" rule should not work with empty string ', function () {
			return testType('null',null,'');
		});

		it ('"falsey" rule should correctly identify falsy values ', function () {
			return testType('falsey','','whatever');
		});
		it ('"falsey" rule should correctly identify falsy values ', function () {
			return testType('falsey',null,'whatever');
		});
		it ('"falsey" rule should correctly identify falsy values ', function () {
			return testType('falsey',undefined,'whatever');
		});
		it ('"falsey" rule should correctly identify falsy values ', function () {
			return testType('falsey',0,'whatever');
		});
		it ('"falsey" rule should correctly identify falsy values ', function () {
			return testType('falsey',false,'whatever');
		});
	});

	describe('strings', function () {

		it ('should support "string" rule ', function () {
			return testType('string','foo',22482);
		});

		it ('should support "email" rule ', function () {
			return testType('email','fox.and.the.hound@theforest.com','foo');
		});

		it ('should support "email" rule ', function () {
			return testType('email','fox.and.the.hound@theforest.com','foo');
		});

		it('should support "alphadashed" rule ', function () {
			return testType('alphadashed','test-Test_test','Inv@lid');
		});

		it('should support "alphanumericdashed" rule ', function () {
			return testType('alphanumericdashed','test123-Test456_test789','Inv@lid');
		});
    
		it ('should support "longtext" rule ', function () {
			return testType('string', 'foo', 22482);
		});

	});


	describe('numbers', function() {

		it ('"finite" should identify integers and reject NaN ', function () {
			return testType('finite',3,NaN);
		});

		it ('"number" should identify NaN ', function () {
			return testType('number',NaN,'foo');
		});

		it ('"number" should identify integers ', function () {
			return testType('number',28235,'foo');
		});
	});

});
