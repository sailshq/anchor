var check = require('validator').check;

module.exports = {

  validate: function (x) {
    return check(x).isEmail();
  },
  message: '{0} should be a valid email.'
};
