var check = require('validator').check;

module.exports = {

  validate: function (x, str) {
    return check(x).contains(str);
  },
  message: '{0} should contain {1}.'
};
