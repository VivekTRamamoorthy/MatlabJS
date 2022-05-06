// TO RUN TESTS, ENTER THE FOLLOWING IN THE TERMINAL 
// node tests/test_node.js


// LOADING MATLAB JS
const fs = require('fs');
eval( fs.readFileSync("Matlab.js", 'utf8')) // loading library
eval( fs.readFileSync("tests/run_tests.js", 'utf8')) // loading test suite
console.log(add([1,2],1))
run_tests() // calling test suite


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














