var check = require('validator').check;

module.exports = {

  validate: function (x) {
    return check(x).uppercase();
  },
  message: '{0} should be uppercase.'
};
