var check = require('validator').check;

module.exports = {

  validate: function (x, equals) {
    return check(x).equals(equals);
  },
  message: '{0} should equal {1}.'
};
