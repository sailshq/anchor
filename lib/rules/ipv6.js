var check = require('validator').check;

module.exports = {

  validate: function (x) {
    return check(x).isIPv6();
  },
  message: '{0} should be a valid IPv6.'
};
