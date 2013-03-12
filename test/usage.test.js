var _ = require('underscore');
var anchor = require('../index.js');
var testRule = require('./util/testRule.js');
var shouldFail = require('./util/shouldFail.js');


describe('usage', function() {

	it(' should trigger callback properly on success',function (cb) {
		anchor(7).to('number', cb);
	});

	it(' should trigger callback properly on failure',function (cb) {
		anchor(7).to('string', shouldFail(cb));
	});

	it('should trigger cb in empty object success case',function (cb) {
		anchor({}).to({}, cb);
	});
	it('should trigger cb in empty object failure case',function (cb) {
		anchor('agaghigdhsg').to({}, shouldFail(cb));
	});
	it('should trigger cb in deepMatch success case',function (cb) {
		anchor({
			name: 'julie'
		}).to({
			name: 'string'
		}, cb);
	});
	it('should trigger cb in deepMatch failure case',function (cb) {
		anchor({
			name: 34
		}).to({
			name: 'string'
		}, shouldFail(cb));
	});

	it('should trigger cb in aggregate success case',function (cb) {
		anchor(
			[{name: 'Rocky'},{name: 'Ibo'}]).to(
			[{name: 'string'}], 
			cb);
	});
	it('should trigger cb in aggregate failure case',function (cb) {
		anchor(
			[{name: 'Rocky'},{name: 'Ibo'}]).to(
			[{name: 'number'}], 
			shouldFail(cb));
	});
});