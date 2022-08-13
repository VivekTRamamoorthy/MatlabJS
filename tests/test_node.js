// This script will test the Matlab.js file's functions by importing them into node and running test cases
// To run test, type the following in terminal from the parent folder
// `node tests/test_node.js`
// It's recommended that contributors run this locally using node but raising pull requests
// This script will also be run in github actions on every pull request for CI/CD


// LOADING MATLAB JS
// const fs = require('fs');
// eval( fs.readFileSync("Matlab.js", 'utf8')) // loading the library
// eval( fs.readFileSync("tests/run_tests.js", 'utf8')) // loading run_tests() function


// export directly from Matlab.js
var { clc , tic , toc , isfield , linspace , logspace , size , length , find , sort ,
    sum , norm , abs , sqrt , setdiff , min , max , range , concatRows , concatCols , transpose ,
    ones , zeros , eye, rand , randi , randn_bm , randn , diag , triu , display , reshape , get , set ,
    repmat , kron , union , unique , sparse , colon , add , sub , mul , div , pow , dotmul , dotdiv ,
    deepcopy , copy , disp , linsolve , all , any , map , exp , real , imag , angle , conj,
     cx, pi,
     MATLABJS_GLOBAL, ticTime } = require("../Matlab.js");

     var {run_tests} = require("./run_tests.js");
// var run_tests = require("./run_tests.js");
// calling test suite

// testing function test("script1","script2")
var test = function(scriptString, expectedResult,functionName=""){
    let PASSED = false
    let EvaluationError = false
    try{
            PASSED = equal(  eval(scriptString) , eval(expectedResult)   )

    }catch{
        PASSED =false
        EvaluationError = true
    }
    if(PASSED === true){
        console.log('\x1b[32m%s\x1b[0m',"TEST PASSED: "+scriptString+" === "+expectedResult)
    }else{
        console.log( '\x1b[31m%s\x1b[0m ',"TEST FAILED "+scriptString+" != "+expectedResult)
        if(EvaluationError){
            console.log('\x1b[31m%s\x1b[0m ',"Could not evaluate: "+scriptString+" and " +expectedResult)
        }else{
        console.log( '\x1b[31m%s\x1b[0m ',""+scriptString+" evaluated to " +eval(scriptString))
        console.log( '\x1b[31m%s\x1b[0m ',""+expectedResult+" evaluated to " +eval(expectedResult))
        }
    }
    return PASSED
}

// output of test for node
var printLine = function(string){
    console.log(string);
}

// equality check equal(object1,object2)
function equal(one,two){
    if(one === two){
        return true
    }
    if(typeof(one) === "number" && typeof(two) === "number" ){
        let tolerance = 1e-9;
        if(Math.abs(one-two) <tolerance){
            return true
        }

    }
    if(one instanceof Array && two instanceof Array){
        if (one.length != two.length){return false}
        for (let index = 0; index < one.length; index++) {
            if(!equal(one[index],two[index])){
                return false;
            }
        }
        return true
    }
    if(one instanceof cx && two instanceof cx){
        return one.re === two.re && one.im === two.im
    }
    return false
}

run_tests() 













