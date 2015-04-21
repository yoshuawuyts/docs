# docs-html-base
Create a read stream that returns a base html template.

## Usage
```js
const html = require('@docs/html-base')
const trumpet = require('trumpet')

const tr = trumpet()
const ws = tr.select('#content').createWriteStream()
ws.end('<div>my amazing content</div>')

html()
  .pipe(tr)
  .pipe(process.stdout)
```

## License
[MIT](https://tldrlegal.com/license/mit-license)
