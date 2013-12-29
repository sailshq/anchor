var check = require('validator').check;

module.exports = {

  validate: function (x) {
    return check(x).isAlphanumeric();
  },
  message: '{0} should contain only alphabet and numeric characters.'
};
