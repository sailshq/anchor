var check = require('validator').check;

module.exports = {

  validate: function (x, date) {
    return check(x).isAfter(date);
  },
  message: '{0} should be a date after {1}.'
};
