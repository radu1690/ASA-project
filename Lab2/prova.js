const fs = require('fs')

const data = fs.readFileSync('./problem.pddl', 'utf8')
console.log(data)