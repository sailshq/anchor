# anchor

Anchor is a JavaScript library that lets you enforce high-level validation rules.  It is used in Waterline and Sails to complement the type safety imposed by [rttc](https://npmjs.com/package/rttc).

This makes it really useful for things like:
+ Form validation on the client or server
+ Ensuring compliance with an API
+ Ensuring that the proper arguments were passed into a function or command-line script
+ Validating objects before storing them in a data store
+ Normalizing polymorphic behaviors

Adds support for strongly typed arguments, like http://lea.verou.me/2011/05/strongly-typed-javascript/, but goes a step further by adding support for array and object sub-validation.  It's also the core validation rule library for the Sails ecosystem.

(Built on top of the great work with https://github.com/chriso/validator.js)

## Usage

#### Installation

For the browser:

```html
<script type='text/javscript' src="/js/anchor.js"></script>
```

For Node.js:

```bash
npm install anchor
```

```javascript
var anchor = require('anchor');
```

#### Documentation

The up-to-date documentation for high-level anchor validation rules is maintained on the [Sails framework website](http://sailsjs.com).

You can find a detailed reference of all validation rules under [Concepts > Models & ORM > Validations](http://sailsjs.com/documentation/concepts/models-and-orm/validations).  For more details on standalone usage, see the source code in this repo.

#### Help

Check out the recommended [community support options](http://sailsjs.com/support) for tutorials and other resources.  If you have a specific question, or just need to clarify how something works, [ask for help](https://gitter.im/balderdashy/sails) or reach out to the core team [directly](http://sailsjs.com/flagship).

You can keep up to date with security patches, the Sails/Waterline release schedule, new database adapters, and events in your area by following us ([@sailsjs](https://twitter.com/sailsjs)) and [@waterlineorm](https://twitter.com/waterlineorm) on Twitter.

## Bugs &nbsp; [![NPM version](https://badge.fury.io/js/anchor.svg)](http://npmjs.com/package/anchor)
To report a bug, [click here](http://sailsjs.com/bugs).

## Contribute &nbsp; [![Build Status](https://travis-ci.org/sailsjs/anchor.png?branch=master)](https://travis-ci.org/sailsjs/anchor)
Please observe the guidelines and conventions laid out in our [contribution guide](http://sailsjs.com/documentation/contributing) when opening issues or submitting pull requests.

#### Tests
All tests are written with [mocha](https://mochajs.org/) and should be run with [npm](https://www.npmjs.com/):

``` bash
  $ npm test
```


## License

This core package, like the rest of the [Sails framework](http://sailsjs.com), is free and open-source under the [MIT License](http://sailsjs.com/license).

[![image_squidhome@2x.png](http://sailsjs.com/images/bkgd_squiddy.png)](http://sailsjs.com/studio)
