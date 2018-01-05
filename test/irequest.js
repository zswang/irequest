
global.irequest = require('../')
const http = require('http')
const server = http.createServer(function (req, res) {
  switch (req.url) {
    case '/api/user':
      res.writeHead(200, { 'Content-Type': 'text/plain' })
      res.end(JSON.stringify({ name: 'zswang', city: 'beijing' }))
      return
    case '/api/name':
      res.writeHead(200, { 'Content-Type': 'text/plain' })
      res.end('zswang')
      return
  }
  res.writeHead(404)
  res.end('Not Found')
})
server.listen(3030)
      

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
         