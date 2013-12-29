/**
 * Module dependencies
 */

var fs = require('fs');

var files = fs.readdirSync('./lib/rules/');
for (var i in files) {
  var fileName = './rules/' + files[i];
  var ruleName = files[i].replace('.js', '');
  module.exports[ruleName] = require(fileName);
}
