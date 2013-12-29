var check = require('validator').check;

module.exports = {

  validate: function (x) {
    return check(x).lowercase();
  },
  message: '{0} should be lowercase.'
};
