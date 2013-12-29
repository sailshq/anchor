var check = require('validator').check;

module.exports = {

  validate: function (x, max) {
    return check(x).len(0, max);
  },
  message: '{0} length should be less than {1}.'
};
