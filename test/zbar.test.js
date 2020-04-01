const PNG = require('pngjs').PNG
const fs = require('fs')
const path = require('path')
const zbarScan = require('../dist/zbar')
const imgData = PNG.sync.read(fs.readFileSync(path.join(__dirname, '../', 'example', 'test.png')))
const assert = require('assert')

describe("zbar", () => {
  it('scan', function () {
    const result = zbarScan(imgData)
    assert.deepEqual(result,
      [
        {
          "symbol": "QR-Code",
          "addon": "",
          "data": "test",
          "loc": [
            {
              "x": 293,
              "y": 37
            },
            {
              "x": 293,
              "y": 205
            },
            {
              "x": 461,
              "y": 205
            },
            {
              "x": 461,
              "y": 37
            }
          ]
        },
        {
          "symbol": "QR-Code",
          "addon": "",
          "data": "中文",
          "loc": [
            {
              "x": 34,
              "y": 31
            },
            {
              "x": 34,
              "y": 199
            },
            {
              "x": 202,
              "y": 199
            },
            {
              "x": 202,
              "y": 31
            }
          ]
        }
      ])

  })
});