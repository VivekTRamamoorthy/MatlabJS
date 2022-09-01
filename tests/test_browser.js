// This file is a part of MatlabJS: a Javascript minilibrary 
// This file defines printLine(), test(), equal() functions to use run_tests() function
// It also wraps run_tests() in a run_tests_frontend() function
// run_tests_frontend() when called in the browser will display a pop of the test results.
// This file and run_tests.js need to be included to make this work in the browser.

function run_tests_frontend(){
    
    let existingDiv = document.getElementById("testDiv")
    if(existingDiv){existingDiv.remove()}
    
    
    const testDiv = document.createElement("div");
    testDiv.classList.add("testDiv")
    testDiv.id="testDiv"
    testDiv.innerHTML="<h1>Running tests ...</h1>";
    const closeBtn = document.createElement("button");
    closeBtn.classList.add("close-button")
    closeBtn.innerText="X";
    closeBtn.style="position:absolute;top:0;right:0;"
    closeBtn.onclick=()=>{document.getElementById("testDiv").remove()}
    testDiv.appendChild(closeBtn)
    document.body.appendChild(testDiv)
    
    run_tests()

}

function test(scriptString, expectedResult,functionName=""){
    let PASSED = false;
    let EvaluationError = false

    try{
            PASSED = equal(  eval(scriptString) , eval(expectedResult)   )

    }catch{
        PASSED =false
        EvaluationError = true

    }
    if(PASSED === true){
        let elem = document.createElement("div")
        elem.classList.add("passed")
        elem.innerHTML="TEST PASSED: "+scriptString+" === "+expectedResult;
        let testDiv = document.getElementById("testDiv");
        testDiv.appendChild(elem)
    }else{
        let elem = document.createElement("div")
        elem.classList.add("failed")
        let testDiv = document.getElementById("testDiv");
        testDiv.appendChild(elem)

        if(EvaluationError){
            elem.innerHTML="TEST FAILED: Could not evaluate: "+scriptString+" or " +expectedResult;
        }else{
            elem.innerHTML="TEST FAILED: <br>"+scriptString+" evaluated to " +eval(scriptString)+"<br>"+expectedResult+" evaluated to " +eval(expectedResult);
        }
    }
    return PASSED
}

function printLine(string){
    let elem = document.createElement("div")
    elem.innerHTML=string;
    let testDiv = document.getElementById("testDiv");
    testDiv.appendChild(elem)
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















