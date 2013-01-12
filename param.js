/**
 * Return fn which enforces required request params
 * (Req parameter validation should be lenient, and marshal rowdy values)
 */
exports.required = function(validationRules, cb) {
	return function(req, res, next) {

		// Keep track of list of validation errors
		var errors = [];

		// Validate that validation rules are satisfied
		var valid = _.recursive.all(validationRules, function(rule, keyChain) {
			var paramVal, actualType;

			// Get top-level request param name and value
			var topLevelParamName = keyChain.shift();
			var topLevelParamVal = req.param(topLevelParamName);

			// Get full .-delimited parameter name
			var paramName = _.reduce(keyChain,function(memo,key) {
				return memo+"."+key;
			},topLevelParamName);

			// Get parameter value
			paramVal = topLevelParamVal && _.reduce(keyChain,function(memo,key) {
				return memo && memo[key];
			}, topLevelParamVal); 

			// Determine actual type, starting with the most specific
			actualType = 
				(paramVal === "") ? "empty" :
				(_.isString(paramVal)) ? "string" : 
				(Math.floor(+paramVal) === +paramVal) ? "integer" :
				(_.isFinite(+paramVal)) ? "number" :
				(_.contains([true,false,"true","false"],paramVal)) ? "boolean" :
				(_.isArray(paramVal)) ? "array" :
				(_.isObject(paramVal)) ? "object" :
				(_.isDate(paramVal)) ? "date" :
				(_.isString(paramVal)) ? "text" : 
				(_.isUndefined(paramVal)) ? "undefined" :
				null;

			// Validate that the parameter's type matches it's stated value
			// AND if the top level param exists and the actual type matches
			if (actualType !== rule || !topLevelParamVal) {
				if (actualType === 'undefined') {
					errors.push(paramName + " is not defined (should be a "+rule+")");
				}
				else {
					errors.push(paramName + " has type "+actualType +" ("+ paramVal +").  But it should have type " + rule+"!");
				}
				return false;
			}
			return true;
		});

		// If they are, run proper route action
		if(valid) {
			cb(req, res, next);
		} 
		// Otherwise, respond with an error
		else {
			res.json({
				error: 'Invalid parameter(s) supplied to '+req.path+'.',
				invalidParameters: errors,
				suppliedParameters: {
					url		: req.params,
					query	: req.query,
					body	: req.body
				},
				type: "Error",
				apiVersion: config.apiVersion
			});
		}
	};
};

// Recursive underscore methods
_.recursive = {
	
	// fn(value,keyChain)
	all: function(collection,fn,maxDepth) {
		if (!_.isObject(collection)) {
			return true;
		}

		// Default value for maxDepth
		maxDepth = maxDepth || 50;

		// Kick off recursive function
		return _all(collection,null,[],fn,0);

		function _all(item,key,keyChain,fn,depth) {
			var lengthenedKeyChain = [];

			if (depth > maxDepth) {
				throw new Error ('Depth of object being parsed exceeds maxDepth ().  Maybe it links to itself?');
			}

			// If the key is null, this is the root item, so skip this step
			// Descend
			if (key !== null && keyChain) {
				lengthenedKeyChain = keyChain.slice(0);
				lengthenedKeyChain.push(key);
			}

			// If the current item is a collection
			if (_.isObject(item)) {
				return _.all(item,function(subval,subkey) {
					return _all(subval,subkey,lengthenedKeyChain,fn,depth+1);
				});
			}
			// Leaf items land here and execute the iterator
			else {
				return fn(item,lengthenedKeyChain);
			}
		}
	}
};