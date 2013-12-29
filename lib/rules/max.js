var check = require('validator').check;

module.exports = {

  validate: function (x, val) {
    return check(x).max(val);
  },
  message: '{0} should be at max {1}.'
};
