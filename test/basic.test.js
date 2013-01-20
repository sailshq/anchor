var _ = require('underscore');
var anchor = require('../index.js');

describe('basic usage', function() {

	it(' should create an anchor object in naive usage',function () {
		anchor('foo');
		return true;
	});

	describe ('falsey values',function () {
		it (' should support "empty" rule ', function () {
			return testRule('empty','','foo');
		});

		it (' should support "undefined" rule ', function () {
			return testRule('undefined',undefined,'foo');
		});

		it (' "null" rule should not work with undefined ', function () {
			return testRule('null',null,undefined);
		});

		it (' "null" rule should not work with empty string ', function () {
			return testRule('null',null,'');
		});

		it (' "falsey" rule should correctly identify falsy values ', function () {
			return testRule('falsey','','whatever');
		});
		it (' "falsey" rule should correctly identify falsy values ', function () {
			return testRule('falsey',null,'whatever');
		});
		it (' "falsey" rule should correctly identify falsy values ', function () {
			return testRule('falsey',undefined,'whatever');
		});
		it (' "falsey" rule should correctly identify falsy values ', function () {
			return testRule('falsey',0,'whatever');
		});
		it (' "falsey" rule should correctly identify falsy values ', function () {
			return testRule('falsey',false,'whatever');
		});
	});

	it (' should support "string" rule ', function () {
		return testRule('string','foo',22482);
	});

	it (' should support "email" rule ', function () {
		return testRule('email','fox.and.the.hound@theforest.com','foo');
	});

	describe('numbers', function() {

		it (' "finite" should identify integers and reject NaN ', function () {
			return testRule('finite',3,NaN);
		});

		it (' "number" should identify NaN ', function () {
			return testRule('number',NaN,'foo');
		});

		it (' "number" should identify integers ', function () {
			return testRule('number',28235,'foo');
		});
	});

	function testRule (rule, example, nonexample) {
		var err = false;

		// Should not throw error
		anchor(example).to(rule);
		
		// Should throw error
		try {
			anchor(nonexample).to(rule);

			// Should never reach here
			err = 'Invalid input ('+nonexample+') allowed through.';
		}
		catch (e) {
			return true;
		}

		if (err) throw new Error(err);
	}

});


//////////////////////////////////////////////////////
// REFERENCE:
//////////////////////////////////////////////////////
function xxxxx() {


	var check = require('validator').check,
	    sanitize = require('validator').sanitize;

	//Validate
	check('test@email.com').len(6, 64).isEmail();        //Methods are chainable
	check('abc').isInt();                                //Throws 'Invalid integer'
	check('abc', 'Please enter a number').isInt();       //Throws 'Please enter a number'
	check('abcdefghijklmnopzrtsuvqxyz').is(/^[a-z]+$/);

	//Sanitize / Filter
	var inte = sanitize('0123').toInt();                  //123
	var bool = sanitize('true').toBoolean();             //true
	var str0 = sanitize(' \t\r hello \n').trim();       //'hello'
	var str1 = sanitize('aaaaaaaaab').ltrim('a');         //'b'
	var str2 = sanitize(large_input_str).xss();
	var str3 = sanitize('&lt;a&gt;').entityDecode();      //'<a>'

}

