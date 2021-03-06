// This file is a part of MatlabJS: a JavaScript minilibrary

// This is considered the MAIN TEST SUITE for MatlabJS both in browser and node.
// This is also part of github actions CI/CD workflow that is triggered on every pull request.
// Contributors are encouraged to include their tests in this script for any new functions they may include in Matlab.js
// While this is the test suite script, it needs to be invoked in node by `node tests/test_node.js`

// This defines a function run_tests() that needs printLine(), test() and equal() functions predefined
// Irrespective of where the test results need to be displayed, this function can be used
// as long as equal, test and printLine are predefined
// equal(string1,string2) should return true if both string1 and string2 are deemed to be the same 
// printLine will determine the way in which comment statements should be printed: "Testing add()"


function run_tests(){
    // clc
    printLine("Testing clc: Check console");
    clc()
    
    // tic and toc
    printLine("Testing tic and toc");
    tic();
    let t=toc();
    printLine("Elapsed time is "+t)
    // disp({t})
    

    
    // linspace
    printLine("Testing linspace");
    var A=linspace(0,1)
    // [0 .1010.. 1]
    var B=linspace(10,20,3)
    // [10,15,20]
    test("linspace(0,1,2)","[0,1]")
    test("linspace(0,0,5)","[0,0,0,0,0]")
    test("linspace(0,-4,5)","[0,-1,-2,-3,-4]")
    
    
    // logspace
    printLine("Testing logspace");
    var A=logspace(1,1000,4) // [1,10,100,1000]
    var B=logspace(1,25,3) // [1,5,25]
    test("logspace(1,1000,4)",[1,10,100,1000])
    printLine("Known issue with logspace. Produces: ")
    printLine(logspace(1,1000,4).toString())
    test("logspace(1,25,3)",[1,5,25])
    
    
    // disp display
    printLine("Testing disp display")
    var A=linspace(0,1)
    var B=linspace(10,20,3)
    printLine("See console for output")
    // disp(A)
    // display(B)
    
    // isfield
    printLine("Testing isfield")
    struc={x:10,y:100}
    isfield(struc,'x') // true
    isfield(struc,'a') // false
    test("isfield({x:10,y:100},'x')",true)
    test("isfield({x:10,y:100},'y')",true)
    test("isfield({x:10,y:100},'z')",false)
    
    // size
    printLine("Testing size")
    test("size([[1,2,3],[3,4,5]])","[2,3]")
    
    // length
    printLine("Testing length")
    var A=[1,2,3,3,4,5]
    A.length // 6
    length(A) // 6
    test('length(0)','1')
    test('length(1)','1')
    test('length(1.2)','1')
    test('length(-1.2)','1')
    test('length(new cx(0))','1')
    test('length([])','0')
    test('length([1]])','1')
    test('length([1,2,3,4])','4')
    test('length([[1,2,3,4]])','4')
    test('length([[[1,2,3,4]]])','4')
    test('length(undefined)','0')
        
    
    // find
    printLine("Testing find")
    var A=[1,2,0,0,4,5]
    find(A) // [1, 2, 5, 6]
    
    // sort
    printLine("Testing sort");
    var A=[3,2,1,5,7];
    [sortedA,indices]=sort(A);
    // disp(sortedA); // [1,2,3,5,7]
    // disp(indices); // [3,2,1,4,5]
    
    
    // sum
    printLine("Testing sum");
    var A=[1,2,3]
    sum(A) // 6
    var B=[[1,2,3],[4,5,6],[7,8,9]]
    // disp(sum(B,1))
    // column sum [12,15,18]
    // disp(sum(B,2))
    // row sum [[6],[15],[24]]
    
    
    // abs
    printLine("Testing abs");
    var A=[1,-2,3]
    abs(A) // [1,2,3]
    var B=[[1,-2,3],[-4,5,6],[-7,8,-9]]
    // disp(abs(B))
    //[1,2,3],[4,5,6],[7,8,9]
    
    
    // universal sqrt
    printLine("Testing universal sqrt");
    var A=[1,4,2]
    // disp(sqrt(A))
    // [1,2,1.414] A=rand(4)
    // disp(A)
    // disp(sqrt(A))
    
    
    // setdiff
    printLine("Testing setdiff");
    var A=[4,3,1,5]
    var B=[5,3,7,8]
    setdiff(A,B) // [1,4]
    
    
    // min
    printLine("Testing min");
    var A=[1,3,-5,9]
    // disp(min(A)) // -5
    var B=[[1,2,3],[4,5,6],[7,8,9]]
    // disp(B)
    // disp(min(B,1)) // elemwise min
    // disp(min(B,4)) //
    // disp(min(B,[],1)) // column min
    // disp(min(B,[],2)) // row min
    
    // max
    printLine("Testing max");
   var  A=[1,3,-5,9]
    // disp(max(A)) // -5
    var B=[[1,2,3],[4,5,6],[7,8,9]]
    // disp(B)
    // disp(max(B,1)) // elemwise min
    // disp(max(B,4)) //
    // disp(max(B,[],1)) // column min
    // disp(max(B,[],2)) // row min
    
    
    // range
    printLine("Testing range");
    test("range(10)","[1,2,3,4,5,6,7,8,9,10]")
    test("range(2,0.5,4)","[2,2.5,3,3.5,4]")
    
    // triu
    printLine("Testing triu");
    // disp(triu(rand(4)))
    // disp(triu(rand(4),1))
    
    
    // concatRows
    printLine("Testing concatRows");
    var A=ones(3,3)
    // disp(A)
    var B=rand(3,3)
    // disp(B)
    var C=concatRows(A,B)
    // disp(C)
    // 3 x 6 matrix
    
    // concatCols
    printLine("Testing concatCols");
    var A=ones(3,3)
    // disp(A)
    var B=rand(3,3)
    // disp(B)
    var C=concatCols(A,B)
    // disp(C)
    // 6 x 3 matrix
    
    
    // transpose
    printLine("Testing transpose");
    var A=[[1,2,3],[4,5,6]]
    transpose(A)
    // [[1,4],[2,5],[3,6]]
    
    
    // ones
    printLine("Testing ones");
    // disp(ones(3))
    // 3x3 matrix of 1s
    // disp(ones(3,2))
    // 3x2 matrix of 1s
    // disp(ones(3,1))
    // column of 1s
    
    
    // eye
    printLine("Testing eye");
    // disp(eye(3))// 3x3 identity matrix
    // disp(eye(4)) // 4x4 matrix of 1s
    // disp(eye(10)) // column of 1s
    
    
    // zeros
    printLine("Testing zeros");
    // disp(zeros(3))
    // 3x3 matrix of 0s
    // disp(zeros(3,2))
    // 3x2 matrix of 0s
    // disp(zeros(3,1))
    // column of 0s
    
    
    // rand
    printLine("Testing rand");
    // disp(rand())
    // random no in [0,1]
    // disp(rand(3))
    // 3x3 random
    // disp(rand(3,2))
    // 3x2 random
    // disp(rand(3,1))
    // column of random
    
    
    // randi
    printLine("Testing randi");
    // disp(randi(5))
    // random integer in {1,2...5}
    // disp(randi(5,3))
    //3x3 matrix of random integers in {1,2...5}
    // disp(randi(5,3,2))
    // 3x2 random in {1,2...5}
    
    // diag
    printLine("Testing diag");
    // disp(diag([5,3,2]))
    // returns:
    // [ [5, 0, 0],
    // [0, 3, 0],
    // [0, 0, 2] ]
    
    // reshape
    printLine("Testing reshape");
    reshape([1,2,3,4,5,6],2,3)
    // [1,2,3; 4,5,6]
    
    // get values from arrays or matrices
    printLine("Testing get values from arrays or matrices");
    var A=rand(10,10);// disp(A)
    var B=get(A,[1,2,3],[2,5,7])
    // disp(B)
    var B=get(A,':',[1,2,3])
    // disp(B) // gets all rows & first 3 cols
    
    // set values in arrays or matrices
    printLine("Testing set values in arrays or matrices");
    // Matrix example:
    var A=rand(5,5)
    set(A,range(1,3),range(1,3),0)
    // disp(A)
    // sets first 3 rows and cols to 0 set(A,range(1,3),range(1,3),randi(2,3,3))
    // disp(A)
    // sets first 3 rows and cols to random in {1,2}
    
    // Array example:
    var A=[1,2,3,4,5,6]
    set(A,2,10)// A(2)=10 :: sets 2nd elem to 10
    set(A,0,100) // A(end)=20 :: sets last elem to 100
    set(A,-1,20) // A(end-1)=20 :: sets end-1 (last but one) elem to 20
    // disp(A) // [1, 10, 3, 4, 20, 100]
    
    // repmat
    printLine("Testing repmat");
    var A=rand(2,3)
    var B=repmat(A,4,5)
    // disp(B)
    
    // kron
    printLine("Testing kron");
    var A=[[1,2,3],[2,3,4]];
    var Y=[[1],[1],[1]];
    test("kron([[1,2,3],[2,3,4]],[[1],[1],[1]])","[[1,2,3],[1,2,3],[1,2,3],[2,3,4],[2,3,4],[2,3,4]]" )
    
    
    // union
    printLine("Testing union");
    test("union([1,2,3,4],[5,3,10])","[1,2,3,4,5,10] ");
    test("union([1,2,3,4],[5,3,10])", "[1,2,3,4,5,10]", "union" )
    
    
    var A=[10,2,3,3,4];
    // display(unique(A))
    //[2,3,4,10]
    test("unique([10,2,3,3,4])","[2,3,4,10]")
    
    // sparse
    var A=sparse([1,2],[1,2],[10,10],10,10);
    // disp(A)
    test("sparse([1,2],[1,2],[10,10],2,2)","[[10,0],[0,10]]")
    
    // copy
    var A=rand(4)
    // disp(A)
    var B=A
    B[0][0]=20
    // disp(A)
    // note: A changes
    // when B is changed
    var C=copy(A); C[0][0]=100
    // disp(A)
    // disp(C)
    



    // Universal functions
    printLine("Universal functions")
    // add
    // disp(add(3,4))
    // disp(add(ones(4,1),100))
    // disp(add(100,rand(1,4)))
    // disp(add(ones(4),100))
    // disp(add(100,rand(4)))
    // disp(add(ones(4),rand(4)))
    test("add([1,1],[0,1])","[1,2]")
    test("add(3,4)","7")
    test("add(ones(4,1),100)","[[101],[101],[101],[101]]")
    test("add(ones(4),100)","mul(101,ones(4))")
    test("add(100,eye(4))","[[101,100,100,100],[100,101,100,100],[100,100,101,100],[100,100,100,101]]")
    test("all(map(x=> (x>1 && x<2),add(ones(4),rand(4))))","true")
    test("all(map(x=> (x>1 && x<2),add(ones(4),rand(4))))","true")
    
    

    // sub
    // disp(sub(3,4))
    // disp(sub(ones(4,1),100))
    // disp(sub(100,rand(1,4)))
    // disp(sub(ones(4),100))
    // disp(sub(100,rand(4)))
    // disp(sub(ones(4),rand(4)))
    
    // mul
    // disp(mul(3,4))
    // disp(mul(ones(4,1),100))
    // disp(mul(100,rand(1,4)))
    // disp(mul(ones(4),100))
    // disp(mul(100,rand(4)))
    // disp(mul(ones(4),rand(4)))
    // disp(mul(eye(4),rand(4)))
    // disp(mul(rand(5,4),rand(4,3)))
    // disp(mul(rand(5),rand(5,1)))
    // disp(mul(rand(1,10),rand(10,1)))
    printLine("Testing universal mul")
    test("mul(1,3)","3")
    test("mul([1],2)","[2]")
    test("mul([1,2,3],[3])","[3,6,9]")
    test("mul([3],[1,2,3])","[3,6,9]")

    test("mul([1,2,3],[1,2,3])","[1,4,9]")
    test("mul([1,2,3],[1,2,3])","[1,4,9]")
    test("mul([[1,2,3]],[[1],[2],[3]])","[[14]]")
    test("mul([[1,2,3],[4,5,6]],[[10]])","[[10,20,30],[40,50,60]]")

    
    
    
    // disp(dotmul(3,4))
    var A=ones(4)
    var B=rand(4)
    // disp(dotmul(rand(10,1),rand(10,1)))
    // disp(dotmul(A,B))
    // disp(dotmul(eye(4),B))
    
    
    // disp(div(3,4))
    // disp(div(ones(4,1),100))
    // disp(div(100,rand(1,4)))
    // disp(div(ones(4),100))
    // disp(div(100,rand(4)))
    // disp(div(ones(4),rand(4)))
    
    // dotdiv
    var A=rand(1,4)
    var B=mul(100,ones(1,4))
    // disp(dotdiv(A,B))
    C=add(rand(10),1)
    // disp(dotdiv(rand(10),C))
    // disp(dotdiv(eye(4),rand(4)))
    
    // pow
    // disp(pow(3,4))
    // disp(pow(ones(4,1),100))
    // disp(pow(100,rand(1,4)))
    // disp(pow(ones(4),100))
    // disp(pow(100,rand(4)))
    // disp(pow(ones(4),rand(4)))
    // disp(pow(eye(4),rand(4)))
    
    // colon
    // disp(A=rand(4))
    // disp(colon(A))
    

    // linsolve
    var A=[[2,3,4],[1,1,1],[1,0,1]]
    var b=[[9],[3],[2]]
//    var  x=linsolve(A,b)
    // disp(x)
    // disp(mul(A,x))
    
// map
    printLine("<br>")
    printLine("function maps")
    test("map((a,b)=>a+b,ones(2),ones(2))","[[2,2],[2,2]]")
    test("map((a,b)=>add(a,b),ones(2),ones(2),ones(2))","[[3,3],[3,3]]")
    test("map((a,b)=>add(a,b),ones(2),ones(2),ones(2),4)","[[7,7],[7,7]]")

}