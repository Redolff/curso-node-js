const os = require('node:os')

console.log('Informacion sobre el sistema operativo: ')
console.log('------------------------')

console.log('Sistema operativo:', os.platform())
console.log('Arquitectura:', os.arch())
console.log('Total de memoria:', os.totalmem() / 1024 / 1024, "en GB")
console.log('Memoria utilizada:', os.freemem() / 1024 / 1024, "en GB")
console.log('CPUs:', os.cpus())
console.log('Cantidad de CPUs:', os.cpus().length)
console.log('Uptime:', os.uptime())