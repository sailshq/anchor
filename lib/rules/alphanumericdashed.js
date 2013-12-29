module.exports = {

  validate: function (x) {
    return /^[a-zA-Z0-9-_]*$/.test(x);
  },
  message: '{0} should contain only alphabet and numeric characters or dashes.'
};
