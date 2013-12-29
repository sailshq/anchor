var check = require('validator').check;

module.exports = {

  validate: function (x) {
    return check(x).isDecimal();
  },
  message: '{0} should be a valid floating point number.'
};
