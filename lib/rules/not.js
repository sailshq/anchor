var check = require('validator').check;

module.exports = {

  validate: function (x, regex) {
    return check(x).not(regex);
  },
  message: '{0} should not be {1}.'
};
