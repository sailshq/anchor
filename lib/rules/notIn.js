var check = require('validator').check;

module.exports = {

  validate: function (x, arrayOrString) {
    return check(x).notIn(arrayOrString);
  },
  message: '{0} should not be in {1}.'
};
