const base = require('./base.json')

console.log(
  JSON.stringify(base.sort((a, b) => Math.random() > .5 ? 1 : -1))
)