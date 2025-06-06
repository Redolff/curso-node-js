const http = require('node:http')
const dittoJSON = require('./pokemon/ditto.json')

const PORT = process.env.PORT || 3000

const processRequest = (req, res) => {
  const { method, url } = req

  switch (method) {
    case 'GET': {
      switch (url) {
        case '/': {
          res.setHeader('Content-Type', 'text/html; charset:utf-8')
          return res.end('Bienvenido a la pagina de inicio')
        }
        case '/pokemon/ditto': {
          res.setHeader('Content-Type', 'application/json; charset:utf-8')
          return res.end(JSON.stringify(dittoJSON))
        }
        case '/about': {
          res.setHeader('Content-Type', 'text/html; charset:utf-8')
          return res.end('Bienvenido a la pagina de About')
        }
        default: {
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/html; charset:utf-8')
          return res.end('404 Not Found')
        }
      }
    }

    case 'POST': {
      switch (url) {
        case '/': {
          res.setHeader('Content-type', 'application/json; charset-utf-8')
          let body = ''
          // Escuchar al evento data
          req.on('data', chunk => {
            body += chunk.toString()
          })
          req.on('end', () => {
            const data = JSON.parse(body)
            // llamar a una base de datos para guardar la info
            res.writeHead(201, { 'Content-Type': 'application/json; charset:utf-8' })
            res.end(JSON.stringify(data))
          })

          break
        }
        default: {
          res.statusCode = 404
          res.setHeader('Content-Type', 'text:html; charset:utf-8')
          return res.end('404 Not Found')
        }
      }
    }
  }
}

const server = http.createServer(processRequest)

server.listen(PORT, () => {
  console.log(`Server listening in port http://localhost:${PORT}`)
})
