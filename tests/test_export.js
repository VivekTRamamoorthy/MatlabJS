// LOADING NODE MODULE EXPORT
// This is test script to ensure that the require in node exports correctly
// To test this, run `node tests/test_export`

// let MATLABJS =require("../node/main.js")
let MATLABJS =require("../Matlab.js")

console.log(MATLABJS.isfield(MATLABJS,"clc")) // true
console.log(MATLABJS.add(1,22)); // 23

// if this and the test is successful, follow the steps to update the published package in npm 
// npm version 0.x.x
// npm publish // This automatically creates a commit with the version number.