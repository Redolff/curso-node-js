const http = require('node:http')
// const PORT = 0
const { findAvailablePort } = require('./10.free-port.js')
const desiredPort = process.env.PORT ?? 3000

const server = http.createServer((req, res) => {
  console.log('request received')
  res.end('Hola mundo')
})

findAvailablePort(desiredPort).then(port => {
  server.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`)
  })
})

/*
server.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${server.address().port}`)
}) */
