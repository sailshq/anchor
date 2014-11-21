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
            },4,3);
        });
        it (' should support "greaterThan" rule ', function () {
            return testRules({
                greaterThan: 3.5
            },3.6,3.5);
        });
        it (' should support "lessThan" rule ', function () {
            return testRules({
                lessThan: 3.5
            },3,4);
        });
        it (' should support "lessThan" rule ', function () {
            return testRules({
                lessThan: 3.5
            },3.4,3.5);
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

});
