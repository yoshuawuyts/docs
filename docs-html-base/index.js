const path = require('path');
const fs = require('fs');

module.exports = html;

// read `index.html` and return a stream
// null -> stream
function html() {
  const location = path.join(__dirname, 'index.html');
  return fs.readFileStream(location);
}
