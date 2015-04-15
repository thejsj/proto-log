var consoleStub = require('./console-overwrite');
var should = require('should');
var expect = require('chai').expect;
var l = require('../index')( {
  loggingFunction: consoleStub,
  appendToPrototype: false
});

describe('Log function', function () {

  it('should log a string, when given a string', function () {
    l('hello');
    consoleStub.getLastLog().should.equal('hello');
    l('not-hello');
    consoleStub.getLastLog().should.not.equal('hello');
  });

  it('should log a number, when given an number', function () {
    l(5);
    consoleStub.getLastLog().should.equal(5);
  });

  it('should log an Object when given an object', function () {
    l({ value: 5 });
    consoleStub.getLastLog().should.eql({ value: 5 });
  });

  it('should log an array when given an array', function () {
    l([1, 2, 3]);
    consoleStub.getLastLog().should.eql([1, 2, 3]);
  });

});

describe('Global Prototype Function', function () {

  it('should not set the global `.log` method if indicated in the option', function () {
    expect('hello'.log).to.equal(undefined);
  });

  it('should console.log from the prototype `.log` method', function () {
    var l = require('../index')( {
      loggingFunction: consoleStub,
      appendToPrototype: true
    });
    'hello'.log();
    consoleStub.getLastLog().should.equal('hello');
    'not-hello'.log();
    consoleStub.getLastLog().should.not.equal('hello');
  });

  it('should set the propertyName of the method according to the `propertyName` option', function () {
    var l = require('../index')( {
      loggingFunction: consoleStub,
      appendToPrototype: true,
      propertyName: 'print'
    });
    'hello'.print();
    consoleStub.getLastLog().should.equal('hello');
    'not-hello'.print();
    consoleStub.getLastLog().should.not.equal('hello');
  });

});

describe('Colors', function () {

  it('should display the color red correcltly', function () {
    l.color('wow', 'red');
    consoleStub.getLastLog().should.equal([ '\u001b[31m', 'wow', '\u001b[0m' ].join(''));
    l.color('goowdbye', 'red');
    consoleStub.getLastLog().should.equal([ '\u001b[31m', 'goowdbye', '\u001b[0m' ].join(''));
  });
});

desribe('table', function () {

  it('should display a string, a number of a boolean as a single cell', function () {
    l.table('hello');
    consoleStub.getLastLog().split('\n').should.eql(['+-------+', '| hello |', '+-------+']);
    l.table('2');
    consoleStub.getLastLog().split('\n').should.eql(['+---+', '| 2 |', '+---+']);
    l.table(true);
    consoleStub.getLastLog().split('\n').should.eql(['+------+', '| true |', '+------+']);
  });

  it('should display null or undefined as a single cell', function () {
    l.table(null);
    consoleStub.getLastLog().split('\n').should.eql(['+------+', '| null |', '+------+']);
    l.table(undefined);
    consoleStub.getLastLog().split('\n').should.eql(['+-----------+', '| undefined |', '+-----------+']);
  });

  // One dimensional arrays
  it('should display single level arrays as a single row, width the indexes as the table header', function () {
    l.table(['hello', 'goodbye', 'wow']);
    consoleStub.getLastLog().split('\n').should.eql(
      [
       '+-------+---------+-----+',
       '| 0     | 1       | 2   |',
       '+-------+---------+-----+'
       '| hello | goodbye | wow |',
       '+-------+---------+-----+'
      ]);
  });

  // Array of arrays
  it('shoud display a two dimensional array with a row for every child array', function () {
    l.table([[1, 'hello', 3], ['wow', 5, 6], [7,'goodbye', 9]]);
    consoleStub.getLastLog().split('\n').should.eql(
      [
       '+---+-----+---------+---+',
       '|   | 0   | 1       | 2 |',
       '+---+-----+---------+---+'
       '| 0 | 1   | hello   | 3 |',
       '+---+-----+---------+---+'
       '| 1 | wow | 5       | 6 |',
       '+---+-----+---------+---+'
       '| 2 | 7   | goodbye | 9 |',
       '+---+-----+---------+---+'
      ]);

  });
  // Array of objects

});
