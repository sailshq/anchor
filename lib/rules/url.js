var check = require('validator').check;

module.exports = {

  validate: function (x) {
    return check(x).isUrl();
  },
  message: '{0} should be a valid URL.'
};
