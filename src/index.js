window.conversion = async (height, width, format, json) => {
  // call svgString2Image function
    svgString2Image(height, width, format, /* callback that gets png data URL passed to it */function (data) {
      // data is base64 string
      FileMaker.PerformScriptWithOption("Get Result", data, 5);
    }, json);
};

function svgString2Image(width, height, format, callback, json) {
  // set default for format parameter
  format = format ? format : 'png';
  // SVG data URL from SVG string
  let svgData = 'data:image/svg+xml;base64,' + json;
  // create canvas in memory(not in DOM)
  let canvas = document.createElement('canvas');
  // get canvas context for drawing on canvas
  let context = canvas.getContext('2d');
  // set canvas size
  canvas.width = width;
  canvas.height = height;
  // create image in memory(not in DOM)
  let image = new Image();
  // later when image loads run this
  image.onload = function () { // async (happens later)
      // clear canvas
      context.clearRect(0, 0, width, height);
      // draw image with SVG data to canvas
      context.drawImage(image, 0, 0, width, height);
      // snapshot canvas as png
      let pngData = canvas.toDataURL('image/' + format);
      // pass png data URL to callback
      callback(pngData);
  }; // end async
  // start loading SVG data into in memory image
  image.src = svgData;
}
