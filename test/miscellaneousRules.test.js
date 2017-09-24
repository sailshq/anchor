var testRules = require('./util/testRules.js');



describe('miscellaneous rules', function() {

  describe('isInteger', function() {
    it ('should fail for strings', function() {
      return testRules({
        isInteger: true
      }, 2, '2');
    });
    it ('should fail for floats', function() {
      return testRules({
        isInteger: true
      }, 2, 2.5);
    });
    it ('should not allow nulls', function() {
      return testRules({
        isInteger: true
      }, 2, null);
    });
  });

  describe('notEmptyString', function() {
    it('should no allow nulls', function() {
      return testRules({
        isNotEmptyString: true
      }, 'sfsa', null);
    });
  });

  describe('max/min', function() {
    it(' should support "max" rule ', function() {
      return testRules({
        max: 3
      }, 2, 5);
    });
    it(' should support "min" rule ', function() {
      return testRules({
        min: 3
      }, 5, 2);
    });
    describe(' should support both "max" and "min" rules at the same time ', function() {
      it('with a val < min', function() {
        return testRules({
          min: 3,
          max: 5
        }, 4, 2);
      });
      it('with a val > max', function() {
        return testRules({
          min: 3,
          max: 5
        }, 4, 6);
      });
    });
    it('should not allow `null` values', function() {
      return testRules({
        min: 3,
        max: 5
      }, 4, null);
    });
  });

  describe('maxLength/minLength', function() {
    it(' should support "maxLength" rule ', function() {
      return testRules({
        maxLength: 3
      }, 'abc', 'abcde');
    });
    it(' should support "minLength" rule ', function() {
      return testRules({
        minLength: 3
      }, 'abc', 'ab');
    });
    describe(' should support both "maxLength" and "minLength" rules at the same time ', function() {
      it('with a val < minLength', function() {
        return testRules({
          minLength: 3,
          maxLength: 5
        }, 'abcd', 'ab');
      });
      it('with a val > maxLength', function() {
        return testRules({
          minLength: 3,
          maxLength: 5
        }, 'abcd', 'abcdef');
      });
    });
    it('should not allow null values', function() {
      return testRules({
        minLength: 3,
        maxLength: 5
      }, 'abcd', null);
    });
    it('should allow empty string values', function() {
      return testRules({
        minLength: 3,
        maxLength: 5
      }, '', 'abcdef');
    });

  });

  describe('isURL', function() {

    it('should support "isURL" rule with no options', function() {
      return testRules({
        isURL: true
      }, 'http://sailsjs.org', 'sailsjs');
    });

    it('should support "isURL" rule with options', function() {
      return testRules({
        isURL: {
          require_protocol: true//eslint-disable-line camelcase
        }
      }, 'http://sailsjs.org', 'www.sailsjs.org');
    });
  });

  describe('isBefore/isAfter date', function() {
    it(' should support "before" rule ', function() {
      return testRules({
        isBefore: new Date()
      }, new Date(Date.now() - 100000), new Date(Date.now() + 1000000));
    });
  });

  describe('custom rule', function() {
    it ('should support a custom rule as a function', function() {
      return testRules({
        custom: function(x) {
          return x.indexOf('foo') === 0;
        }
      }, 'foobar', 'notfoobar');
    });
  });


  describe('isNotIn rule', function() {
    it ('should support isNotIn', function() {
      return testRules({
        isNotIn: ['foo','bar','baz']
      }, 'bloop', 'foo');
    });
  });


  describe('regex rule', function() {
    it ('should support regex', function() {
      return testRules({
        regex: /^\w\d{2}!$/
      }, 'a12!', 'a1goop!');
    });
  });


});
