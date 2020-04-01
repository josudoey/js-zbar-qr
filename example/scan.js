const PNG = require('pngjs').PNG
const zbarScan = require('../dist/zbar')
const fs = require('fs')
const path = require('path')
const imgData = PNG.sync.read(fs.readFileSync(path.join(__dirname, 'test.png')))
const result = zbarScan(imgData)
console.log(JSON.stringify(result, null, 4))