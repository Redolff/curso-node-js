/* import fs from 'node:fs'
const moviesJSON = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'))*/

import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
export const readJSON = (path) => require(path)