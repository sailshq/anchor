var check = require('validator').check;

module.exports = {

  validate: function (x) {
    return check(x).isIPv4();
  },
  message: '{0} should be a valid IPv4.'
};
