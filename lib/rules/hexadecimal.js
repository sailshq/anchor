var check = require('validator').check;

module.exports = {

  validate: function (x) {
    return check(x).hexadecimal();
  },
  message: '{0} should be a valid hexadecimal number.'
};
