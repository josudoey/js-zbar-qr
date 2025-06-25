/* eslint-env jest */
import fs from 'fs'
import path from 'path'
import { PNG } from 'pngjs'
import zbarProcess from '../dist/zbar'

const imgData = PNG.sync.read(
  fs.readFileSync(path.join(__dirname, '../', 'example', 'test.png'))
)



describe('zbar', () => {
  it('process', function () {
    const result = zbarProcess(imgData)
    expect(result).toEqual([
      {
        symbol: 'QR-Code',
        addon: '',
        data: 'test',
        loc: [
          {
            x: 293,
            y: 37
          },
          {
            x: 293,
            y: 205
          },
          {
            x: 461,
            y: 205
          },
          {
            x: 461,
            y: 37
          }
        ]
      },
      {
        symbol: 'QR-Code',
        addon: '',
        data: '中文',
        loc: [
          {
            x: 34,
            y: 31
          },
          {
            x: 34,
            y: 199
          },
          {
            x: 202,
            y: 199
          },
          {
            x: 202,
            y: 31
          }
        ]
      }
    ])
  })

  it('run 10 times', function () {
    for (let i = 0; i < 10; i++) {
      const result = zbarProcess(imgData)
      expect(result.length).toEqual(2)
    }
  })
})
