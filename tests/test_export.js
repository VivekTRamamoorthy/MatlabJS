// LOADING NODE MODULE EXPORT
// To test this, run `node tests/test_export`

let MATLABJS =require("../node/main.js")

console.log(MATLABJS.isfield(MATLABJS,"clc")) // true
console.log(MATLABJS.add(1,22)); // 23

// if this and the test is successful, follow the steps to update the published package
// npm version 0.x.x
// npm publish