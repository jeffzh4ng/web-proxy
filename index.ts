import http from 'http'

http
  .createServer((clientReq, clientRes) => {
    console.log('serve: ' + clientReq.url)

    var options = {
      hostname: 'www.google.com',
      port: 80,
      path: clientReq.url,
      method: clientReq.method,
      headers: clientReq.headers,
    }

    var proxy = http.request(options, (res) => {
      clientRes.writeHead(res.statusCode!, res.headers)
      res.pipe(clientRes, {
        end: true,
      })
    })

    clientReq.pipe(proxy, {
      end: true,
    })
  })
  .listen(3000, () => {
    console.log('listening on port 3000')
  })
