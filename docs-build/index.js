const viewApi = require('@docs/view-api')
const browserify = require('browserify')
const html = require('@docs/html-base')
const brick = require('brick-router')
const watchify = require('watchify')
const trumpet = require('trumpet')
const npm = require('rework-npm')
const assert = require('assert')
const rework = require('rework')
const myth = require('myth')
const path = require('path')
const bl = require('bl')
const fs = require('fs')

const root = path.dirname(require.main.filename)
const router = brick()

var b = browserify({
  cache: {},
  packageCache: {},
  entries: [path.join(root, 'index.js')],
  fullPaths: true
})
if (process.env.NODE_ENV === 'development') b = watchify(b)

module.exports = router

// browserify bundle
router.on('/bundle.js', function(cb) {
  b.bundle().pipe(bl(function(err, buffer) {
    if (err) return cb(err)
    cb(null, buffer)
  }))
})

// myth bundle
router.on('/build.css', function(cb) {
  const route = path.join(root, 'index.css')
  fs.readFile(route, 'utf8', function(err, styles) {
    if (err) return cb(err)
    const res = rework(styles, {source: route})
      .use(myth({source: route}))
      .use(npm({root: root}))
      .toString()
    cb(null, res)
  })
})

// html ico
router.on('/images/wercker.ico', function(cb) {
  const route = path.join(root, 'wercker-logo/wercker.ico')
  fs.readFile(route, 'utf8', function(err, ico) {
    if (err) return cb(err)
    cb(null, ico)
  })
})

// html
router.on('/', function(cb) {
  const tr = trumpet()
  const str = tr.select('[role="content"]').createStream({outer: true})
  str.once('data', function() {
    viewApi().pipe(str)
  })

  html().pipe(tr).pipe(bl(function(err, res) {
    if (err) return cb(err)
    cb(null, res)
  }))
})
