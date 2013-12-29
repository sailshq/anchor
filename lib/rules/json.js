var _ = require('lodash');

module.exports = {

  validate: function (x) {
    if (_.isUndefined(x)) {
      return false;
    }
    try {
      JSON.stringify(x);
    } catch(err) {
      return false;
    }
    return true;
  },
  message: '{0} should be a JSON object.'
};
