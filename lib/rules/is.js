var check = require('validator').check;

module.exports = {

  validate: function (x, regex) {
    return check(x).is(regex);
  },
  message: '{0} should be {1}.'
};
