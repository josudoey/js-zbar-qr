var args = Array.prototype.slice.call(arguments);
var imgData = args[0];
if(!imgData){
  throw new Error('require image data')
}
var result = [];