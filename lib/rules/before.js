var check = require('validator').check;

module.exports = {

  validate: function (x, date) {
    return check(x).isBefore(date);
  },
  message: '{0} should be a date before {1}.'
};
