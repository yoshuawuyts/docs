#!/usr/bin/env node

const summary = require('server-summary')
const cliclopts = require('cliclopts')
const isStream = require('is-stream')
const router = require('@docs/build')
const minimist = require('minimist')
const assert = require('assert')
const http = require('http')
const url = require('url')

const copts = cliclopts([
  {
    name: 'port',
    abbr: 'p',
    default: 1337,
    help: 'port for the server to listen on'
  }
])

const argv = minimist(process.argv.slice(2), copts.options())
const cmd = argv._[0]

// help
if (argv.help || !cmd) {
  console.log('Usage: command [options]')
  copts.print()
  process.exit()
}

// listen
if (cmd === 'listen' || cmd === 'server' || cmd === 'start') {
  server().listen(argv.port, summary)
}

// build
if (cmd === 'build') router.build(__dirname + '/build', function(err, res) {
  if (err) {
    console.log('error:', err)
    process.exit(1)
  }
  process.exit()
})

// create a server
// null -> null
function server() {
  return http.createServer(function(req, res) {
    const pathname = url.parse(req.url).pathname
    console.log(JSON.stringify({url: pathname, type: 'static'}))
    router.match(pathname, function(err, body) {
      err = typeof err === 'object' ? err.toString() : err
      if (err) console.log(JSON.stringify({level: 'error', url: pathname, message: err}))
      if (isStream(body)) return body.pipe(res)
      res.end(body)
    })
  })
}
