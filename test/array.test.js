var _ = require('underscore');
var anchor = require('../index.js');

describe('arrays', function() {

	it(' should properly support arrays', function() {
		testRule({
			name: 'string',
			id: 'numeric',
			friends: [],
			moreFriends: []
		}, {
			name: 'Rachael',
			id: '235',
			friends: ['a','b'],
			moreFriends: [{
				name: 'Rachael'
			}, {
				name: 'Sebastian'
			}, {
				name: 'Heather'
			}]
		}, {
			name: 'Sebastian',
			id: '235',
			friends: 'd'
		});
	});


	it(' should properly parse lists defined with schema rule ', function() {
		testRule({
			name: 'string',
			id: 'numeric',

			// Require a collection of friend objects as defined:
			friends: [{
				name: 'string',
				id: 'integer'
			}]
		}, {
			name: 'Rachael',
			id: '235',
			friends: [{
				id: 2,
				name: 'Rachael',
				favoriteColor: 'red'
			}, {
				id: 3,
				name: 'Sebastian'
			}, {
				id: 4,
				name: 'Heather'
			}]
		}, {
			name: 'Sebastian',
			id: '235',
			friends: 'd'
		});
	});

});