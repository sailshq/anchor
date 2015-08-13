var _           = require('lodash')
  , anchor      = require('../index.js')
  , testSchema  = require('./util/testSchema.js')
  ;

describe('Array Schema', function() {

  it(' should properly support both flavors of basic array validation rules', function() {
    testSchema({
      name: 'string',
      id: 'numeric',
      friends: [],
      moreFriends: 'array'
    }, {
      name: 'Rachael',
      id: '235',
      friends: ['a','b'],
      moreFriends: [{
        name: 'Rachael'
      }, {
        name: 'Sebastian'
      }, {
        name: 'Heather'
      }]
    }, {
      name: 'Sebastian',
      id: '235',
      friends: 'd'
    });
  });

  it(' should properly parse lists defined with schema ruleset (type shortcut)', function() {
    testSchema({
      // Require a collection of friend objects as defined:
      friends: [{
        name: 'string',
        id: 'integer'
      }]
    }, {
      friends: [{
        id: 2,
        name: 'Mike******************',
        favoriteColor: 'red'
      }, {
        id: 3,
        name: 'Sebastian'
      }, {
        id: 4,
        name: 'Heather'
      }]
    }, {
      friends: [{
        id: 2,
        name: 'Rachael'
      },{
        id: 'foo',
        name: 'Sebastian'
      }]
    });
  });

  it(' should properly parse lists defined with schema ruleset', function() {
    testSchema({
      // Require a collection of friend objects as defined:
      friends: [{
        name: { type: 'string', maxLength: 5 },
        id: { type: 'integer', max: 5 }
      }]
    }, {
      friends: [{
        id: 2,
        name: 'Mike',
        favoriteColor: 'red'
      }, {
        name: 'John',
        id: 3
      }]
    }, {
      friends: [{
        id: 2,
        name: 'Rachael'
      },{
        id: 6,
        name: 'Sebastian'
      }]
    });
  });

  it(' should properly parse lists defined with optional schema ruleset', function() {
    testSchema({
      // Require a collection of friend objects as defined:
      friends: [{
        name: { type: 'string', maxLength: 5 },
        id: { type: 'integer', max: 5, required: true }
      }]
    }, {
      friends: [{
        id: 2,
        name: 'Mike',
        favoriteColor: 'red'
      }, {
        name: 'John',
        id: 3
      }]
    }, {
      friends: [{
        id: 2,
        name: 'Rachael'
      },{
        name: 'John'
      }]
    });
  });

  it(' should properly parse deep nested lists defined with schema ruleset', function() {
    testSchema({
      name: { type: 'string', required: true },
      id:   { type: 'numeric', required: true },

      // Require a collection of friend objects as defined:
      friends: [{
        name: { type: 'string', required: true },
        id: { type: 'integer', required: true },
        children: [{
          id: { type: 'integer', required: true }
        }]
      }]
    }, {
      name: 'Rachael',
      id: '235',
      friends: [{
        id: 2,
        name: 'Mike******************',
        children: [{id:1}]
      }, {
        id: 3,
        name: 'Sebastian',
        children: [{id:2}]
      }, {
        id: 4,
        name: 'Heather',
        children: [{id:3}]
      }]
    }, {
      name: 'Sebastian',
      id: '235',
      friends: [{
        id: 2,
        name: 'Rachael'
      },{
        id: 6,
        name: 'Sebastian',
        children: [{id:'bar'}]
      }]
    });
  });

  it(' should properly parse top-level lists ', function() {
    testSchema([{
      name: 'string',
      id: 'int'
    }], [{
      id: 2,
      name: 'Rachael',
      favoriteColor: 'red'
    }, {
      id: 3,
      name: 'Sebastian'
    }, {
      id: 4,
      name: 'Heather'
    }], [{
      name: 'Sebastian',
      id: 'abc'
    }]);
  });

  it(' should properly parse top-level lists defined with schema ruleset', function() {
    testSchema([{
      name: { type: 'string', notEmpty: true },
      id: { type: 'int', min: 0 }
    }], [{
      id: 2,
      name: 'Rachael',
      favoriteColor: 'red'
    }, {
      id: 3,
      name: 'Sebastian'
    }, {
      id: '4',
      name: 'Heather'
    }], [{
      name: 'Sebastian',
      id: -1
    }]);

    testSchema([{
      name: { type: 'string', notEmpty: true },
      id: { type: 'int', min: 0, required: true }
    }], [{
      id: 3
    }], [{
      name: 'Sebastian'
    }]);
  });

  it(' should properly parse lists defined with array of simple type', function () {
    "use strict";
    testSchema({
      friends: ['string']
    }, {
      friends: ['a', 'b', 'c']
    }, {
      friends: [1, 2, 3]
    });

    testSchema({
      friends: ['int']
    }, {
      friends: [1, 2, 3]
    }, {
      friends: ['a', 'b', 'c']
    });
  });

  it(' should properly parse lists defined with array of simple ruleset', function () {
    "use strict";
    testSchema({
      friends: [{ type: 'string', notEmpty: true }]
    }, {
      friends: ['a', 'b', 'c']
    }, {
      friends: [1, 2, 3]
    });

    testSchema({
      friends: [{ type: 'string', notEmpty: true }]
    }, {
      friends: ['a', 'b', 'c']
    }, {
      friends: ['a', '']
    });

    testSchema({
      friends: [{ type: 'string', notEmpty: true }]
    }, {
      friends: []
    }, {
      friends: [null]
    });
  });

  it(' should properly handle no-array', function () {
    "use strict";
    testSchema({
      friends: [{ type: 'string', notEmpty: true }]
    }, {
      friends: ['a', 'b', 'c']
    }, {
      friends: 1
    });

    testSchema({
      friends: [{ type: 'string', notEmpty: true }]
    }, {
      friends: ['a', 'b', 'c']
    }, {
      friends: { name: 'Mike' }
    });
  });
});
