var _ = require('underscore');
var sanitize = require('validator').sanitize;


// Public access
module.exports = function (entity) {
	return new Anchor(entity);
};


// Specify the function, object, or list to be anchored
function Anchor (entity) {
	if (_.isFunction(entity)) {
		this.fn = entity;
		throw new Error ('Anchor does not support functions yet!');
	}
	else this.data = entity;


	return this;
}

// Built-in data type rules
Anchor.prototype.rules = require('./lib/rules');

// Enforce that the data matches the specified ruleset
// If it doesn't, throw an error.
// If the callback is specified, instead of throwing, use first arg
Anchor.prototype.to = function (ruleset, cb) {

	// If callback is specififed, trigger it at the end
	// also, handle error instead of throwing it
	if (cb) this.cb = cb;

	// Use deep match to descend into the collection and verify each item and/or key
	// Stop at default maxDepth (50) to prevent infinite loops in self-associations
	Anchor.match(this.data, ruleset, this);

	// If a callback was specified, trigger it
	// If an error object was stowed away in the ctx, pass it along
	// (otherwise we never should have made it this far, the error should have been thrown)
	cb && cb(this.error);
};

// Coerce the data to the specified ruleset if possible
// otherwise throw an error
Anchor.prototype.cast = function (ruleset) {
	todo();
};

// Coerce the data to the specified ruleset no matter what
Anchor.prototype.hurl = function (ruleset, cb) {
	// If callback is specififed, trigger it at the end
	// also, handle error instead of throwing it
	if (cb) this.cb = cb;

	// Iterate trough given data attributes
	// to check if they exists in the ruleset
	for(var attr in this.data) {
		if(this.data.hasOwnProperty(attr)) {

			// If it doesnt...
			if(!ruleset[attr]) {

				// Declaring err here as error helpers live in match.js
				var err = new Error('Validation error: Attribute \"' + attr + '\" is not in the ruleset.');

				// If a callback has been passed pass the error there
				if(typeof cb === 'function') {
					return cb(err);
				}

				// Or just throw it
				else throw err;
			}
		}
	}

	// Once we make sure that attributes match
	// we can just proceed to deepMatch
	Anchor.match(this.data, ruleset, this);

	// If a callback was specified, trigger it
	// If an error object was stowed away in the ctx, pass it along
	// (otherwise we never should have made it this far, the error should have been thrown)
	cb && cb(this.error);
};

// Specify default values to automatically populated when undefined
Anchor.prototype.defaults = function (ruleset) {
	todo();
};

// Declare name of custom data type
Anchor.prototype.define = function (name) {
	todo();
};

// Specify custom ruleset
Anchor.prototype.as = function (ruleset) {
	todo();
};


// Specify named arguments and their rulesets as an object
Anchor.prototype.args = function (args) {
	todo();
};

// Specify each of the permitted usages for this function
Anchor.prototype.usage = function () {
	var usages = _.toArray(arguments);
	todo();
};

// Deep-match a complex collection or model against a schema
Anchor.match = require('./lib/match.js');

function todo() {
	throw new Error("Not implemented yet! If you'd like to contribute, tweet @mikermcneil.");
}