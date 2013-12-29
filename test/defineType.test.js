var _ = require('lodash');
var anchor = require('../index.js');
var async = require('async');
var assert = require("assert");

describe('Custom Types', function() {

	describe('Single Definition', function() {
		it(' should properly validate a simple object with a custom type', function() {
			var rules = {
				houseNumber: 'five'
			},
			example = {
				houseNumber: 5
			},

			isfive = {
				validate: function(val){
					return val === 5;
				},
				message: "{0} should be equal to 5."
			};

			assert.equal(false, anchor(example).define("five", isfive).to({type:rules}));
		});
	});

	describe('Dictonary of Definitions', function() {
		it(' should properly validate a simple object with a custom type', function() {
			var rules = {
				houseNumber: 'five',
				fish: 'yummyFish'
			},
			example = {
				houseNumber: 5,
				fish: 'tuna'
			},

			definition = {
				five: {
					validate: function(val){
						return val === 5;
					},
					message: "{0} should be equal to 5."
				},
				yummyFish: {
					validate: function(val){
						return val === "tuna";
					},
					message: "{0} should be equal to tuna."
				}
			};

			assert.equal(false, anchor(example).define(definition).to({type:rules}));
		});
	});

	describe('Context', function() {
		it(' should support providing context for rules via',function () {
			var user = { password: 'passW0rd', passwordConfirmation: 'passW0rd' };

			anchor.define('password', {
				validate: function (password) {
					return password === this.passwordConfirmation;
				},
				message: "{0} should equals the confirmation."
			});

			var outcome = anchor(user.password).to({ type: 'password' }, user);

			assert.equal(false, outcome);
		});
	});
});
