const http = require('http')
const url = require('url')
const server = http.createServer((req, res) => {
  let urlInfo = url.parse(req.url)
  switch (urlInfo.pathname) {
    case '/api/user':
      res.writeHead(200, { 'Content-Type': 'text/plain' })
      res.end(JSON.stringify({ name: 'zswang', city: 'beijing' }))
      return
    case '/api/name':
      res.writeHead(200, { 'Content-Type': 'text/plain' })
      res.end('zswang')
      return
    case '/api/list':
      res.writeHead(200, { 'Content-Type': 'text/plain' })
      res.end('z,s,w,a,n,g')
      return
  }
  res.writeHead(404)
  res.end('Not Found')
})
server.listen(3030)
