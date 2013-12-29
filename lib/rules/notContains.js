var check = require('validator').check;

module.exports = {

  validate: function (x, str) {
    return check(x).notContains(str);
  },
  message: '{0} should not contain {1}.'
};
