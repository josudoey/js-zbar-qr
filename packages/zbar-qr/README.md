# zbar-qr

[![Build Status](https://github.com/josudoey/js-zbar-qr/actions/workflows/test.yml/badge.svg)](https://github.com/josudoey/js-zbar-qr/tree/refs/heads/master)

> A lightweight JavaScript library for QR code scanning based on zbar, supporting both Node.js and browser environments. [online-demo](https://josudoey.github.io/webtool-zbar-qr/)

## Features

- 🚀 Lightweight and dependency-free
- 🛠️ Usable in Node.js and web environments

## Installation

```bash
npm install zbar-qr
# or
pnpm add zbar-qr
```

## API

### `ZbarProcess(imageData)`

- **Parameters:**
  - `imageData`: An object parsed by [pngjs](https://www.npmjs.com/package/pngjs) (must include `data`, `width`, and `height` fields).
- **Returns:** An array of QRCode result objects, each containing:
  - `symbol`: Barcode type (e.g., 'QR-Code')
  - `addon`: Addon information (usually an empty string)
  - `data`: Decoded string content
  - `loc`: Array of location points, each with `x` and `y` coordinates

#### Example return value:

```json
[
  {
    "symbol": "QR-Code",
    "addon": "",
    "data": "test",
    "loc": [
      { "x": 293, "y": 37 },
      { "x": 293, "y": 205 },
      { "x": 461, "y": 205 },
      { "x": 461, "y": 37 }
    ]
  }
]
```

## Usage Example

```js
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
// [...]
```
