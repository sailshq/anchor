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
Anchor.prototype.to = function (ruleset) {

	var errors = [];

	// If ruleset doesn't contain any explicit rule keys,
	// assume that this is a type


	// Look for explicit rules
	for (var rule in ruleset) {

		if (rule === 'type') {
			
			// Use deep match to descend into the collection and verify each item and/or key
			// Stop at default maxDepth (50) to prevent infinite loops in self-associations
			errors = errors.concat(Anchor.match.type(this.data, ruleset['type']));
		}

		// Validate a non-type rule
		else {
		// 	errors = errors.concat(Anchor.match.rule(this.data, ruleset[rule]));
		}
	}

	// If errors exist, return the list of them
	if (errors.length) {
		return errors;
	}

	// No errors, so return false
	else return false;

};
Anchor.prototype.hasErrors = Anchor.prototype.to;


// Coerce the data to the specified ruleset if possible
// otherwise throw an error
Anchor.prototype.cast = function (ruleset) {
	todo();
};

// Coerce the data to the specified ruleset no matter what
Anchor.prototype.hurl = function (ruleset) {

	// Iterate trough given data attributes
	// to check if they exists in the ruleset
	for(var attr in this.data) {
		if(this.data.hasOwnProperty(attr)) {

			// If it doesnt...
			if(!ruleset[attr]) {

				// Declaring err here as error helpers live in match.js
				var err = new Error('Validation error: Attribute \"' + attr + '\" is not in the ruleset.');

				// just throw it
				throw err;
			}
		}
	}

	// Once we make sure that attributes match
	// we can just proceed to deepMatch
	Anchor.match(this.data, ruleset, this);
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