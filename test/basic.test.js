var check = require('validator').check,
    sanitize = require('validator').sanitize;

//Validate
check('test@email.com').len(6, 64).isEmail();        //Methods are chainable
check('abc').isInt();                                //Throws 'Invalid integer'
check('abc', 'Please enter a number').isInt();       //Throws 'Please enter a number'
check('abcdefghijklmnopzrtsuvqxyz').is(/^[a-z]+$/);

//Sanitize / Filter
var int = sanitize('0123').toInt();                  //123
var bool = sanitize('true').toBoolean();             //true
var str = sanitize(' \t\r hello \n').trim();       //'hello'
var str = sanitize('aaaaaaaaab').ltrim('a');         //'b'
var str = sanitize(large_input_str).xss();
var str = sanitize('&lt;a&gt;').entityDecode();      //'<a>'


describe('validator', function() {

	should(' should pass pass its baseline tests',function () {
		
	});

});