const path = require('node:path')

// Barra separadora de carpetas segun sistema operativo
console.log(path.sep)

// Unir rutas con path.join
const filePath = path.join('content', 'subfolder', 'test.txt')
console.log(filePath)

const base = path.basename('/tmp/redolff-secret-files/password.txt')
console.log(base)

const fileName = path.basename('/tmp/redolff-secret-files/password.txt', '.txt')
console.log(fileName)

const extension = path.extname('my.super.image.jpg')
console.log(extension)