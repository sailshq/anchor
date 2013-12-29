var check = require('validator').check;

module.exports = {

  validate: function (x) {
    return check(x).isHexColor();
  },
  message: '{0} should be a valid hex color.'
};
