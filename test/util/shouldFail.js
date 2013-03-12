// Return function which flip-flops error state of callback
module.exports = function shouldFail (cb) {
	return function (err) {
		if (!err) return cb('An error should have been passed in!');
		else return cb();
	};
};