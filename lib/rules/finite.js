var _ = require('lodash');

module.exports = {

  validate: _.isFinite,
  message: '{0} should be finite.'
};
