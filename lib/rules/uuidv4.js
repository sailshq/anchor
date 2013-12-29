var check = require('validator').check;

module.exports = {

  validate: function (x) {
    return check(x).isUUIDv4();
  },
  message: '{0} should be a valid UUID of version 4.'
};
