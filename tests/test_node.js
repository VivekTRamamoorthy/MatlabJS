// This script will test the Matlab.js file's functions by importing them into node and running test cases
// To run test, type the following in terminal from the parent folder
// `node tests/test_node.js`
// It's recommended that contributors run this locally using node but raising pull requests
// This script will also be run in github actions on every pull request for CI/CD


// LOADING MATLAB JS
const fs = require('fs');
eval( fs.readFileSync("Matlab.js", 'utf8')) // loading the library
eval( fs.readFileSync("tests/run_tests.js", 'utf8')) // loading run_tests() function
console.log(add([1,2],1))

// calling test suite
run_tests() 

// testing function test("script1","script2")
function test(scriptString, expectedResult,functionName=""){
    let PASSED = false;
    try{
            PASSED = equal(  eval(scriptString) , eval(expectedResult)   )

    }catch{
        PASSED =false
    }
    if(PASSED === true){
        console.log('\x1b[32m%s\x1b[0m',"TEST PASSED: "+scriptString+" === "+expectedResult);
    }else{
        console.log( '\x1b[31m%s\x1b[0m ',"TEST FAILED "+scriptString+" != "+expectedResult);
    }
    return PASSED
}

// output of test for node
function printLine(string){
    console.log(string);
}

// equality check equal(object1,object2)
function equal(one,two){
    if(one === two){
        return true
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
}














