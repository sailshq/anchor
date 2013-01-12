anchor
======

Anchor is a javascript library that lets you define strict types.  It also helps you validate and normalize the usage of command line scripts and even individual functions.

This makes it really useful for things like:
+ Form validation on the client or server
+ Ensuring compliance with an API
+ Ensuring that the proper arguments were passed into a function or command-line script
+ Validating objects before storing them in a data store
+ Normalizing polymorphic behaviors

Adds support for strongly typed arguments, like http://lea.verou.me/2011/05/strongly-typed-javascript/, but goes a step further by adding support for array and object sub-validation.
It's also the core validation library for the Sails ecosystem. 

(Built on top of the great work with https://github.com/chriso/node-validator)

> This is an unfinished work in progress!  Please follow/star and keep up to date as the project develops.
> If you're interested in contributing, drop me a note at @mikermcneil.  I welcome your thoughts, feature requests, and pull requests.

## Installation
```
npm install anchor
```

## Basic Usage
```javascript
var anchor = new require('anchor')();

var userData = 'some string';

// This will guarantee that userData is a string
// If it's not, an error will be thrown
userData = anchor(userData).to('string');


// If you want to handle the error instead of throwing it, add .error
anchor('something').to("string").error(function (err) {
  // Err is an error object with a subset of the original data that didn't pass
  // Specifying .error will prevent an error from being thrown
});

```

## Objects
```javascript

// Limit data to match these requirements
var requirements = anchor({
  name: 'string',
  avatar: {
    path: 'string'
    name: 'string',
    size: 'int',
    type: 'string'
  }
});

// Unvalidated data from the user
var userData = {
  name: 'Elvis',
  avatar: {
    path: '/tmp/2Gf8ahagjg42.jpg',
    name: '2Gf8ahagjg42.jpg',
    size: 382944
    type: 'image/jpeg'
  }
};

// Verify that the data matches your requirements
anchor(userData).to(requirements);

```



## Functions
It also has built-in usage to verify the arguments of a function.
This lets you be confident that the arguments are what you expect.
```javascript
$.get = anchor($.get).usage(
  ['urlish',{}, 'function']
);
```

But sometimes you want to support several different argument structures.  
And to do that, you have to, either explicitly or implicitly, name those arguments so your function can know which one was which, irrespective of how the arguments are specified.
Here's how you specify multiple usages:
> TODO


Then you can call your function any of the following ways:
```javascript
fn(url,data,cb);
fn(url,cb);
fn(url).done(cb);
fn(url).data(data).done(cb);
fn().url(url).data(data).done(cb);
```

## Custom data types

Anchor also supports custom data-types.
```javascript

// Define a compound validation rule using anchor types
anchor.define('file').as({
  name: 'string',
  type: 'string',
  size: 'int',
  type: 'int'
});

// Define a custom rule using a function
anchor.define('supportedFruit').as(function (fruit) {
  return fruit === 'orange' || fruit === 'apple' || fruit === 'grape';
});


// you can use your new validation rules like any standard anchor data type:
anchor(someUserData).to({
  name: 'string',
  avatar: 'file'
});

anchor(someUserData).to({
  fruit: 'supportedFruit'
});
```

We bundled a handful of useful defaults:
```javascript
anchor(someUserData).to({
  id: 'int',
  name: 'string',
  phone: 'phone',
  creditcard: 'creditcard',
  joinDate: 'date',
  email: 'email',
  twitterHandle: 'twitter'
});
```


The example below demonstrates the complete list of supported default data types:
```javascript
anchor(userData).to({
  id: 'int',
  name: 'string',
  phone: 'phone',
  creditcard: 'creditcard',
  joinDate: 'date',
  email: 'email',
  twitterHandle: 'twitter',
  homepage: 'url',
  
  // This requires any data
  someData: {},
  
  // This will require a list of >=0 hex colors
  favoriteColors: ['htmlcolor'],
  
  // This will require a list of >=0 badge objects, as defined:
  badges: [{
    name: 'string',
    // This will require a list of privilege objects, as defined:
    privileges: [{
      id: 'int'
      permission: 'string'
    }]
  }]
});
```

## Asynchronous Usage / Promises
Anchor can also help you normalize your synchronous and asynchronous functions into a uniform api.  It allows you to support both last-argument-callback (Node standard) and promise usage out of the box.

> TODO


## Plans

#### waterline-anchor
Pre & Post Adapter/Model validation

#### sails-anchor
Pre & Post request validation

#### cannonball
Automatic integration test generation using pre+postconditions from sails-anchor

#### Mast.Model / Mast.Socket
Validate outgoing (i.e. form submission or terminal command) or incoming (i.e. realtime chat, fetched data for a table) on the client side


Dependencies and Compatibility
--

Tested with node 0.8.1
Sails is built on the rock-solid foundations of ExpressJS and Socket.io.  


## Who Built This?
The Sails framework was developed by @mikermcneil and is supported by Balderdash Co (@balderdashy).  We build realtime web and mobile apps as a service for our customers, and over time, after trying lots of different methodologies, I ended up crystallizing all our best code and conventions into Sails.  
Then, we open-sourced it, because no one should have to go through that again.  Seriously.  Hopefully, it makes your life a little bit easier!


The MIT License (MIT)
--

Copyright © 2012-2013 Mike McNeil

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/18e6e2459aed1edbdee85d77d63b623b "githalytics.com")](http://githalytics.com/balderdashy/anchor)

