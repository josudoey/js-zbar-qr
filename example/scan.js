import { PNG } from 'pngjs'
import ZbarProcess from 'zbar-qr'
import fs from 'fs'
import path from 'path'

const imgData = PNG.sync.read(
  fs.readFileSync(
    path.join(path.dirname(new URL(import.meta.url).pathname), 'test.png')
  )
)
const result = ZbarProcess(imgData)
console.log(JSON.stringify(result, null, 4))
