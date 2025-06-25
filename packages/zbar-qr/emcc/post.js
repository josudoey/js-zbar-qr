/* global Module */
/* global result  */
/* eslint-disable */

/** in pre.js */
// module.exports = function () {
/** ... */
  return function (img) {
    const d = img.data
    if (!d) {
      return
    }
    const grey=[]
    for (let i = 0, j = 0; i < d.length; i += 4, j++) {
      // grey color
      grey[j] = (d[i] * 66 + d[i + 1] * 129 + d[i + 2] * 25 + 4096) >> 8
    }
    const data = Module._malloc(d.length)
    HEAPU8.set(grey, data);
    Module.ccall('Process', 'number',
      ['number', 'number', 'number', 'number'],
      [data, d.length, img.width, img.height]
    )
    Module._free(data)
    return result.splice(0)
  }
}
