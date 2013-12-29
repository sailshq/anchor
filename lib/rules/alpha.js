var check = require('validator').check;

module.exports = {

  validate: function (x) {
    return check(x).isAlpha();
  },
  message: '{0} should contain only alphabet characters.'
};
