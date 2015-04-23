const hljs = require('highlight.js').highlight
const sliced = require('sliced')

const pre = document.querySelectorAll('pre')
sliced(pre).forEach(function(el) {
  console.log(el)
  el.innerHTML = hljs('javascript', el.innerHTML).value
})
