var check = require('validator').check;

module.exports = {

  validate: function (x) {
    return check(x).isNumeric();
  },
  message: '{0} should contain only numeric characters.'
};
