
global.irequest = require('../')
require('./mock/')


describe("src/irequest.ts", function () {
  var assert = require('should');
  var util = require('util');
  var examplejs_printLines;
  function examplejs_print() {
    examplejs_printLines.push(util.format.apply(util, arguments));
  }
  
  

  it("RequestBase:success", function (done) {
    examplejs_printLines = [];
  const rb = new irequest.RequestBase()

  rb.request(`http://localhost:3030/api/user`).then(reply => {
    examplejs_print(JSON.stringify(reply))
    assert.equal(examplejs_printLines.join("\n"), "{\"name\":\"zswang\",\"city\":\"beijing\"}"); examplejs_printLines = [];
    done();
  })
  });
          
  it("RequestBase:custom parse", function (done) {
    examplejs_printLines = [];
  const rb = new irequest.RequestBase()

  rb.request(`http://localhost:3030/api/list`, {}, s => s.split(',')).then(reply => {
    examplejs_print(JSON.stringify(reply))
    assert.equal(examplejs_printLines.join("\n"), "[\"z\",\"s\",\"w\",\"a\",\"n\",\"g\"]"); examplejs_printLines = [];
    done();
  })
  });
          
  it("RequestBase:parse error", function (done) {
    examplejs_printLines = [];
  const rb = new irequest.RequestBase()

  rb.request(`http://localhost:3030/api/name`).then(reply => {
  }).catch(err => {
    examplejs_print(err.status)
    assert.equal(examplejs_printLines.join("\n"), "400"); examplejs_printLines = [];
    done();
  })
  });
          
  it("RequestBase:parse error & debug", function (done) {
    examplejs_printLines = [];
  const rb = new irequest.RequestBase(true)

  rb.request(`http://localhost:3030/api/name`).then(reply => {
  }).catch(err => {
    examplejs_print(err.status)
    assert.equal(examplejs_printLines.join("\n"), "400"); examplejs_printLines = [];
    done();
  })
  });
          
  it("RequestBase:network error", function (done) {
    examplejs_printLines = [];
  const rb = new irequest.RequestBase()

  rb.request(`http://localhost:3033/none`).then(reply => {
  }).catch(err => {
    examplejs_print(err.status)
    assert.equal(examplejs_printLines.join("\n"), "500"); examplejs_printLines = [];
    done();
  })
  });
          
  it("RequestBase:network error & debug", function (done) {
    examplejs_printLines = [];
  const rb = new irequest.RequestBase(true)

  rb.request(`http://localhost:3033/none`).then(reply => {
  }).catch(err => {
    examplejs_print(err.status)
    assert.equal(examplejs_printLines.join("\n"), "500"); examplejs_printLines = [];
    done();
  })
  });
          
});
         