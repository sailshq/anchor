var _ = require('underscore');
var anchor = require('../index.js');

describe('error usage', function() {

	it(' should catch errors if .error() is specified',function (cb) {
		anchor('error test').to('numeric', function (err) {
			cb();
		});
	});
});