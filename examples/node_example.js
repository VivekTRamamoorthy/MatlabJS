// This is an example nodejs script using MatlabJS
// Before running this ensure you have installed MatlabJS
// Install: `npm install -g MatlabJS `
var {add, linspace, zeros} = require("matlabjs")

let f= linspace(0,1,20)
let A = add(f,200)
console.log(A)
console.log(zeros(10,1));

// test using `node examples/node_examples.js`
