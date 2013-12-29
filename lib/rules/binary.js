var check = require('validator').check;

module.exports = {

  validate: function (x) {
    return Buffer.isBuffer(x) || _.isString(x);
  },
  message: '{0} should be binary.'
};
