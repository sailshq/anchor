var check = require('validator').check;

module.exports = {

  validate: function (x) {
    return check(x).isUUIDv3();
  },
  message: '{0} should be a valid UUID of version 3.'
};
