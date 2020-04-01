mergeInto(LibraryManager.library, {
  js_get_width: function () { return imgData.width },
  js_get_height: function () { return imgData.height },
  js_set_data: function (dataPtr, len) {
    var HEAPU8 = Module['HEAPU8'];
    var grayData = HEAPU8.subarray(dataPtr, dataPtr + len);
    var data = imgData.data
    if (!data) {
      return array.length;
    }
    var d = imgData.data;
    for (var i = 0, j = 0; i < d.length; i += 4, j++) {
      grayData[j] = (d[i] * 66 + d[i + 1] * 129 + d[i + 2] * 25 + 4096) >> 8;
    }
  },
  js_emit_type: function (symbol, addon) {
    result.push({
      symbol: UTF8ToString(symbol),
      addon: UTF8ToString(addon),
      data: null,
      loc: []
    })
  },
  js_emit_data: function (data) {
    result[result.length - 1].data = UTF8ToString(data)
  },
  js_emit_loc: function (x, y) {
    result[result.length - 1].loc.push({
      x: x,
      y: y
    })
  }
});
