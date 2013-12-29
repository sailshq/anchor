var check = require('validator').check;

module.exports = {

  validate: function (x) {
    return check(x).isCreditCard();
  },
  message: '{0} should be a valid credit card number.'
};
