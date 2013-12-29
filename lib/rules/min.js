var check = require('validator').check;

module.exports = {

  validate: function (x, val) {
    return check(x).min(val);
  },
  message: '{0} should be at min {1}.'
};
