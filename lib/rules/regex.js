var check = require('validator').check;

module.exports = {

  validate: function (x, regex) {
    return check(x).regex(regex);
  },
  message: '{0} should match {1}.'
};
