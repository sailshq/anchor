var check = require('validator').check;

module.exports = {

  validate: function (x, arrayOrString) {
    return check(x).isIn(arrayOrString);
  },
  message: '{0} should be in {1}.'
};
