var _ = require('underscore');
var anchor = require('../index.js');
var testType = require('./util/testType.js');

describe('arrays', function() {

	it(' should properly support both flavors of basic array validation rules', function() {
		testType({
			name: 'string',
			id: 'numeric',
			friends: [],
			moreFriends: 'array'
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
		testType({
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
				name: 'Mike******************',
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
			friends: [{
				id: 2,
				name: 'Rachael'
			},{
				id: "foo",
				name: 'Sebastian'
			}]
		});
	});

	it(' should properly parse more complex lists defined with schema rule ', function() {
		testType({
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
				name: 'Mike******************',
				favoriteColor: 'red'
			}, {
				id: 3,
				name: 'Sebastian',
				somethingElse: [{a:1,b:3}]
			}, {
				id: 4,
				name: 'Heather',
				somethingElse: [{a:1,b:5}]
			}]
		}, {
			name: 'Sebastian',
			id: '235',
			friends: [{
				id: 2,
				name: 'Rachael'
			},{
				id: "foo",
				name: 'Sebastian'
			}]
		});
	});


	it(' should properly parse top-level lists ', function() {
		testType([{
			name: 'string',
			id: 'int'
		}], [{
				id: 2,
				name: 'Rachael',
				favoriteColor: 'red'
			}, {
				id: 3,
				name: 'Sebastian'
			}, {
				id: 4,
				name: 'Heather'
			}], {
			name: 'Sebastian',
			id: '235',
			friends: 'd'
		});
	});

});