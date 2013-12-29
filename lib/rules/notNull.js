var check = require('validator').check;

module.exports = {

  validate: function (x) {
    return check(x).notNull();
  },
  message: '{0} should not be null.'
};
