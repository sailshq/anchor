var check = require('validator').check;

module.exports = {

  validate: function (x, version) {
    return check(x).isUUID(version);
  },
  message: '{0} should be a valid UUID of version {1}.'
};
