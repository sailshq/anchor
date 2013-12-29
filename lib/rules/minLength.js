var check = require('validator').check;

module.exports = {

  validate: function (x, min) {
    return check(x).len(min);
  },
  message: '{0} length should be more than {1}.'
};
