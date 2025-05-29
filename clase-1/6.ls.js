const fs = require('node:fs/promises')

const folder = process.argv[2] ?? '.'

const ls = async (folder) => {
    let files
    try {
        files = await fs.readdir(folder)
    } catch {
        console.error(`No se pudo leer el directorio`)
        process.exit(1)
    }

    console.log(files)
}

ls(folder)