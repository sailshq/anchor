var _ = require('underscore');
var anchor = require('../index.js');

describe('objects', function() {

	it(' should properly validate a simple object', function() {
		testRule({
			name: 'string'
		}, {
			name: 'Rachael'
		}, {
			name: 292935
		});
	});

	it(' should properly validate another simple object', function() {
		testRule({
			name: 'string',
			id: 'numeric'
		}, {
			name: 'Rachael',
			id: 235
		}, {
			name: 292935,
			id: '2sdasg35'
		});
	});

	it(' should ignore unspecified attribute', function() {
		testRule({
			name: 'string',
			id: 'numeric'
		}, {
			name: 'Rachael',
			id: '235',
			someUnspecifiedAttribute: 'asg!'
		}, {
			name: 'Rachael',
			id: 'a'
		});
	});

	it(' should properly validate nested objects', function() {
		testRule({
			name: 'string',
			id: 'numeric',
			friend: {
				name: 'string',
				friend: {
					name: 'string'
				}
			}
		},
		{
			name: 'Rachael',
			id: 235,
			someOtherAttr: 'ga@$Gg',
			friend: {
				name: 'Jerry',
				friend: {
					name: 'Alonzo'
				}
			}
		},
		{
			name: 'Sebastian',
			id: 235,
			someOtherAttr: 'ga@$Gg',
			friend: {
				name: 'Jerry',
				friend: {
					name: 29239239
				}
			}
		});
	});

	it(' should handle anonymous object type ', function() {
		testRule({
			name: 'string',
			id: 'numeric',

			// Require some kind of object
			friend: {}
		}, {
			name: 'Rachael',
			id: '235',
			friend: {
				id: 2,
				name: 'Rachael',
				favoriteColor: 'red'
			}
		}, {
			name: 'Sebastian',
			id: '235',
			friend: 'd'
		});
	});


});