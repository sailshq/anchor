var anchor = require('../../index.js');

module.exports = function testRule(rule, example, nonexample) {
	var err = false;

	// Should not throw error
	anchor(example).to(rule);

	
	// Should throw error
	try {
		anchor(nonexample).to(rule);

		// Should never reach here
		err = 'Invalid input (' + nonexample + ') allowed through as a ' + rule + '.';
	} catch(e) {
		return true;
	}

	if(err) {
		console.error('*****************');
		console.error('nonexample', nonexample);
		console.error('rule', rule);
		throw new Error(err);
	}
};