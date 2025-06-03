const http = require('node:http')
const fs = require('node:fs')

const PORT = process.env.PORT || 3000

const server = http.createServer((req, res) => {
  res.setHeader('Content-type', 'text/html; charset=utf-8')
  if (req.url === '/') {
    res.statusCode = 200
    res.end('<h3> Bienvenido a la pagina de inicio </h3>')
  } else if (req.url === '/image') {
    fs.readFile('./enzo-perez.webp', (err, data) => {
      if (err) {
        res.statusCode = 500
        res.end('<h1> 505 Internal Server Error </h1>')
      } else {
        res.statusCode = 200 // No es necesario, ya que es el ESTADO POR DEFECTO.
        res.setHeader('Content-type', 'image/webp')
        res.end(data)
      }
    })
  } else if (req.url === '/contacto') {
    res.statusCode = 200
    res.end('Contacto')
  } else {
    res.statusCode = 404
    res.end('<h1> 404 Not Found </h1>')
  }
})

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
