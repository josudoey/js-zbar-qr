/* global mergeInto, LibraryManager */
/* global UTF8ToString */
/* global result */
mergeInto(LibraryManager.library, {
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
})
