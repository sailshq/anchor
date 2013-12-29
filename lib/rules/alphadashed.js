module.exports = {

  validate: function (x) {
    return /^[a-zA-Z-_]*$/.test(x);
  },
  message: '{0} should contain only alphabet characters or dashes.'
};
