// LOADING NODE MODULE EXPORT
// To test this, run `node tests/test_export`

let MATLABJS =require("../node/main.js")

console.log(MATLABJS.isfield(MATLABJS,"clc")) // true
console.log(MATLABJS.add(1,22)); // 23