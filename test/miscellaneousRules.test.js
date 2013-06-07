var _ = require('underscore');
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

	describe('before/after date', function () {
		it (' should support "before" rule ', function () {
			return testRules({
				before: new Date()
			},new Date(Date.now() - 100000),new Date(Date.now() + 1000000));
		});
	});

});
