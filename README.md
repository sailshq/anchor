anchor
======
[![Build Status](https://travis-ci.org/sailsjs/anchor.svg?branch=master)](https://travis-ci.org/sailsjs/anchor)
[![npm version](https://badge.fury.io/js/anchor.svg)](http://badge.fury.io/js/anchor)

Anchor is a javascript library that lets you define strict types. It is used in Waterline and Sails.

This makes it really useful for things like:
+ Form validation on the client or server
+ Ensuring compliance with an API
+ Ensuring that the proper arguments were passed into a function or command-line script
+ Validating objects before storing them in a data store
+ Normalizing polymorphic behaviors

Adds support for strongly typed arguments, like http://lea.verou.me/2011/05/strongly-typed-javascript/, but goes a step further by adding support for array and object sub-validation.
It's also the core validation library for the Sails ecosystem.

(Built on top of the great work with https://github.com/chriso/validator.js)

## Installation

### Client-side
```html
<script type='text/javscript' src="/js/anchor.js"></script>
```

### node.js
```bash
npm install anchor
```


## Tests
```
npm test
```


## License

MIT

© 2012-2016 Mike McNeil, [Balderdash Design Co](http://balderdash.co), The Treeline Company and contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
