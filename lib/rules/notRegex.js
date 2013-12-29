var check = require('validator').check;

module.exports = {

  validate: function (x, regex) {
    return check(x).notRegex(regex);
  },
  message: '{0} should not match {1}.'
};
