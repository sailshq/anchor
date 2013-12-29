var check = require('validator').check;

module.exports = {

  validate: function (x, min, max) {
    return check(x).len(min, max);
  },
  message: '{0} should be between {1} and {2}.'
};
