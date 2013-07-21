var _ = require('underscore');
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
			
			isfive = function(val){
				return val === 5;
			};

			assert.equal(false, anchor(example).define("five", isfive).to({type:rules}));
		});
	});

	describe('Dictonary odf Definitions', function() {
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
				five: function(val){
					return val === 5;
				},
				yummyFish: function(val){
					return val === "tuna";
				}
			};

			assert.equal(false, anchor(example).define(definition).to({type:rules}));
		});
	});
});
