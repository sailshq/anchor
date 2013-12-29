var check = require('validator').check;

module.exports = {

  validate: /^\s([^\/]+\.)+.+\s*$/g,
  message: '{0} should look like a URL.'
};
