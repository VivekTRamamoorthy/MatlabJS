// This file is a part of MatlabJS: a JavaScript minilibrary

// This is considered the MAIN TEST SUITE for MatlabJS both in browser and node.
// This is also part of github actions CI/CD workflow that is triggered on every pull request.
// Contributors are encouraged to include their tests in this script for any new functions they may include in Matlab.js
// While this is the test suite script, it needs to be invoked in node by `node tests/test_node.js`

// This defines a function run_tests() that needs printLine(), test() and equal() functions predefined
// Irrespective of where the test results need to be displayed, this function can be used
// as long as equal, test and printLine are predefined
// equal(string1,string2) should return true if both string1 and string2 are deemed to be the same
// printLine will determine the way in which comment statements should be printed: "\nTesting add()"

function run_tests() {

  // tic and toc
  printLine("\nTesting tic");
  tic();
  let t = toc();
  printLine("Elapsed time is " + t);

  // linspace
  printLine("\nTesting linspace");
  test("linspace(0,1,2)", "[0,1]");
  test("linspace(0,0,5)", "[0,0,0,0,0]");
  test("linspace(0,-4,5)", "[0,-1,-2,-3,-4]");
  test("linspace(1,100)", "new Array(100).fill().map((x,i)=>i+1)");

  // logspace
  printLine("\nTesting logspace");
  test("logspace(1,25,3)", [1, 5, 25]);
  test("logspace(1,1000,4)", [1, 10, 100, 1000]);
  test("logspace(1,2)"," new Array(100).fill(0).map((x,i)=>Math.pow(2,i/99))");

  // isfield
  printLine("\nTesting isfield");
  test("isfield({x:10,y:100},'x')", true);
  test("isfield({x:10,y:100},'y')", true);
  test("isfield({x:10,y:100},'z')", false);

  // size
  printLine("\nTesting size");
  test("size(1)", [1,1]);
  test("size([1])", "[1,1]");
  test("size([[1]])", "[1,1]");
  test("size([1,2,3,3,4,5])", "[1,6]");
  test("size([[1,2,3,3,4,5]])", "[1,6]");
  test("size([[1],[2],[3],[3],[4],[5]])", "[6,1]");
  test("size([[1,2,3],[3,4,5]])", "[2,3]");
  

  // length
  printLine("\nTesting length");
  test("length(0)", "1");
  test("length(1)", "1");
  test("length(1.2)", "1");
  test("length(-1.2)", "1");
  test("length([])", "0");
  test("length([1])", "1");
  test("length([1,2,3,4])", "4");
  test("length([[1,2,3,4]])", "4");
  test("length([[[1,2,3,4]]])", "4");
  test("length(undefined)", "0");
  test("length(null)", "0");

  // find
  printLine("\nTesting find");
  test("find([1,2,0,0,4,5])", "[1, 2, 5, 6]");
  test("find([[2,1,2,2], [ 2, 0, 1, 0], [ 0, 0, 1, 1], [2, 1, 0, 2] ])","[[1],[2],[4],[5],[8],[9],[10],[11],[13],[15],[16]]")

  // sort
  printLine("\nTesting sort");
  test("sort([3,2,1,5,7])", "[[1,2,3,5,7],[3,2,1,4,5]]");

  // sum
  printLine("\nTesting sum");
  test("sum(10)", "10");
  test("sum([10])", "10");
  test("sum([[10]])", "10");
  test("sum([1,2,3])", "6"); 
  test("sum([[1,2,3]])", "6"); 
  test("sum([[1,2,3],[1,2,3]])", "[[2,4,6]]"); 
  test("sum([[1,2,3]],1)", "[[1,2,3]]"); 
  test("sum([[1,2,3]],2)", "[[6]]"); 
  test("sum([[1,2,3],[1,2,3]], 1)", "[[2,4,6]]"); 
  test("sum([[1,2,3],[1,2,3]], 2)", "[[6],[6]]"); 
  test("sum([[1,2,3],[4,5,6],[7,8,9]] , 1)", "[[12,15,18]]");
  test("sum([[1,2,3],[4,5,6],[7,8,9]] , 2)", "[[6],[15],[24]]");


  // abs
  printLine("\nTesting abs");
  test("abs(12)","12")
  test("abs(-12)","12")
  test("abs(new cx(12,0))","12")
  test("abs([[1,-2,3],[-4,5,6],[-7,8,-9]])", "[[1,2,3],[4,5,6],[7,8,9]]");

  // universal sqrt
  printLine("\nTesting universal sqrt");
  test("sqrt(4)", "2");
  test("sqrt([25])", "[5]");
  test("sqrt([9,25,625])", "[3,5,25]");
  test("sqrt([[1,4,9],[16,25,36],[49,64,81]])", "[[1,2,3],[4,5,6],[7,8,9]]");


  // setdiff
  printLine("\nTesting setdiff");
  test("setdiff([4,3,1,5],[5,3,7,8])", "[1,4]");
  test("setdiff([1,2,3],[3,2,1])", "[]");

  // max
  printLine("\nTesting max");
  test("max([1, 3, -5, 9])","9")
  test("max([[1,2,3],[4,5,6],[7,8,9]] , [],1)","[[7,8,9]]" )
  test("max([[1,2,3],[4,5,6],[7,8,9]] , [],2)","[[3],[6],[9]]" )

  // max
  printLine("\nTesting min");
  test("min([1, 3, -5, 9])","-5")
  test("min([[1,2,3],[4,5,6],[7,8,9]] , [],1)","[[1,2,3]]" )
  test("min([[1,2,3],[4,5,6],[7,8,9]] , [],2)","[[1],[4],[7]]" )

  // range
  printLine("\nTesting range");
  test("range(10)", "[1,2,3,4,5,6,7,8,9,10]");
  test("range(2,0.5,4)", "[2,2.5,3,3.5,4]");

  // triu
  printLine("\nTesting triu");
  test("triu([[1,2,3],[4,5,6],[7,8,9]])","[[1,2,3],[0,5,6],[0,0,9]]")
  test("triu([[1,2,3,4],[5,6,7,8],[9,10,11,12]])", "[[1,2,3,4],[0,6,7,8],[0,0,11,12]]")
  test("triu([[1,2,3,4],[5,6,7,8],[9,10,11,12]],1)", "[[0,2,3,4],[0,0,7,8],[0,0,0,12]]")
  test("triu(4)","[[4]]")
  test("triu([4])","[[4]]")
  test("triu([[4]])","[[4]]")
  test("triu([[4,5,6,67,8]])","[[4,5,6,67,8]]")
  test("triu([[4,5,6,67,8]],1)","[[0,5,6,67,8]]")
  test("triu([[4,5,6,67,8]],2)","[[0,0,6,67,8]]")
  test("triu([[4,5,6,67,8]],4)","[[0,0,0,0,8]]")
  test("all(map(get(triu(randi(9,100,100)),range(2,100),[1]),x=>x==0))","true")
  test("triu([[1,1,1,1],  [2,2,2,2],[3,3,3,3]],2)","[[0,0,1,1],[0,0,0,2],[0,0,0,0]]") 
  // disp(triu(rand(4)))
  // disp(triu(rand(4),1))

  // concatRows
  printLine("\nTesting concatRows");
  var A = ones(3, 3);
  // disp(A)
  var B = rand(3, 3);
  // disp(B)
  var C = concatRows(A, B);
  test("concatRows([[1]],[[2]])",[[1,2]])
  test("concatRows([[1,  1]],[[1, 1]])",[[1, 1, 1, 1]])
  // disp(C)
  // 3 x 6 matrix

  // concatCols
  printLine("\nTesting concatCols");
  test("concatCols([[1]],[[2]])",[[1], [2]])
  test("concatCols([[1,1]],[[1, 1]])",[[1, 1], [1, 1]])


  // transpose
  printLine("\nTesting transpose");
  test("transpose([[1, 2]])", [[1],[2]])
  test("transpose([[1, 2, 3],[4, 5, 6]])", [[1,4],[2,5],[3,6]])

  // ones
  printLine("\nTesting ones");
  test("ones(1)","[[1]]")
  test("ones(2)","[[1,1],[1,1]]")
  test("ones(3)","[[1,1,1],[1,1,1],[1,1,1]]")
  test("ones(4)","[[1,1,1,1],[1,1,1,1],[1,1,1,1],[1,1,1,1]]")
  // disp(ones(3))
  // 3x3 matrix of 1s
  // disp(ones(3,2))
  // 3x2 matrix of 1s
  // disp(ones(3,1))
  // column of 1s

  // eye
  printLine("\nTesting eye");
  test("eye(1)","[[1]]")
  test("eye(2)","[[1,0],[0,1]]")
  test("eye(3)","[[1,0,0],[0,1,0],[0,0,1]]")
  test("eye(4)","[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]]")


  // zeros
  printLine("\nTesting zeros");
  test("zeros(1)","[[0]]")
  test("zeros(2)","[[0,0],[0,0]]")
  test("zeros(3)","[[0,0,0],[0,0,0],[0,0,0]]")
  test("zeros(4)","[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]")
  test("zeros(4,2)","[[0,0],[0,0],[0,0],[0,0]]")
  test("zeros(1,2)","[[0,0]]")
  test("zeros([1,1])","[[0]]")
  test("zeros([2,2])","[[0,0],[0,0]]")
  test("zeros([3,3])","[[0,0,0],[0,0,0],[0,0,0]]")
  test("zeros([4,4])","[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]")
  test("zeros([4,2])","[[0,0],[0,0],[0,0],[0,0]]")
  test("zeros([1,2])","[[0,0]]")


  // rand
  printLine("\nTesting rand");

  test("rand()>0 && rand()<1", "true")
  test("rand(1)>0 && rand(1)<1", "true")
  test("all(map(rand(2),(x,i)=>{return x>0})) && all(map(rand(2),x=>x<1))", "true")

  test("rand()>0 && rand()<1", "true")
  test("rand(1)>0 && rand(1)<1", "true")
  test("all(map(rand(2),(x,i)=>{return x>0})) && all(map(rand(2),x=>x<1))", "true")
  // disp(rand())
  // random no in [0,1]
  // disp(rand(3))
  // 3x3 random
  // disp(rand(3,2))
  // 3x2 random
  // disp(rand(3,1))
  // column of random

  // randi
  printLine("\nTesting randi");
  test("randi(1) ===1  ","true")
  test("randi(3) >=1  &&  randi(3)<=3 ","true")
  test("all(map(  randi(3,100,100), (x,i)=>{return x>=1}    )) && all(map(  randi(3,100,100),  x=>x<=3    ))","true")
  // disp(randi(5))
  // random integer in {1,2...5}
  // disp(randi(5,3))
  //3x3 matrix of random integers in {1,2...5}
  // disp(randi(5,3,2))
  // 3x2 random in {1,2...5}

  // randn
  printLine("\nTesting randn");
  test("typeof(randn()) === 'number'  ","true")
  test(" (randn(1)) instanceof Array && (randn(1)[0]) instanceof Array && typeof(randn(1)[0][0]) == 'number' ","true")

  // diag
  printLine("\nTesting diag");
  // disp(diag([5,3,2]))
  test("diag(1)", "[[1]]")
  test("diag(1002)", "[[1002]]")
  test("diag([5,3,2])", "[[5,0,0],[0,3,0],[0,0,2]]")
  // returns:
  // [ [5, 0, 0],
  // [0, 3, 0],
  // [0, 0, 2] ]

  // reshape
  printLine("\nTesting reshape");
  reshape([1, 2, 3, 4, 5, 6], 2, 3);
  test("reshape(1, 1, 1);"," [[1]] ")
  test("reshape([1], 1, 1);"," [[1]] ")
  test("reshape([1, 2, 3, 4, 5, 6], 2, 3);"," [[1,2,3],[4,5,6]] ")
  // [1,2,3; 4,5,6]

  // get values from arrays or matrices
  printLine("\nTesting get values from arrays or matrices");
  // var A = rand(10, 10); 
  // var B = get(A, [1, 2, 3], [2, 5, 7]);
  // var B = get(A, ":", [1, 2, 3]);
  test("get([[1]],':',':')","[[1]]")
  test("get([[1,1],[2,3]],':',':')","[[1,1],[2,3]]")
  test("get([[1,1],[2,3]],[2],[2])","[[3]]")
  test("get([1,2,3,4,5,6],[2,3])","[2,3]")
  test("get([1,2,3,4,5,6],[6])","[6]")
  test("get([1,2,3,4,5,6],':')","[1,2,3,4,5,6]")
  test("get([1,2,3,4,5,6],[1,6])","[1,6]")
  test("get([1,2,3,4,5,6],[0,-1])","[6,5]")
  test("get([1,2,3,4,5,6],range(-2,0))","[4,5,6]")



  // set values in arrays or matrices
  printLine("\nTesting set values in arrays or matrices");
  // Matrix example:
  var A = rand(5, 5);
  set(A, range(1, 3), range(1, 3), 0);
  // disp(A)
  // sets first 3 rows and cols to 0 set(A,range(1,3),range(1,3),randi(2,3,3))
  // disp(A)
  // sets first 3 rows and cols to random in {1,2}

  // Array example:
  var A = [1, 2, 3, 4, 5, 6];
  set(A, 2, 10); // A(2)=10 :: sets 2nd elem to 10
  set(A, 0, 100); // A(end)=20 :: sets last elem to 100
  set(A, -1, 20); // A(end-1)=20 :: sets end-1 (last but one) elem to 20
  // disp(A) // [1, 10, 3, 4, 20, 100]
  test("set([1, 2, 3, 4, 5, 6], 3,0)","[1, 2, 0, 4, 5, 6]")
  test("set([1, 2, 3, 4, 5, 6], 1,0)","[0, 2, 3, 4, 5, 6]")
  test("set([1, 2, 3, 4, 5, 6], [1,2,3],[6,7,8])","[6,7,8, 4, 5, 6]")
  test("set([1, 2, 3, 4, 5, 6], [1,2,3],0)","[0,0,0, 4, 5, 6]")

  // repmat
  printLine("\nTesting repmat");
  var A = rand(2, 3);
  var B = repmat(A, 4, 5);
  // disp(B)
  test("repmat([[1]],2,3)","[[1,1,1],[1,1,1]]")

  // kron
  printLine("\nTesting kron");
  test(
    "kron([[1,2,3],[2,3,4]],[[1],[1],[1]])",
    "[[1,2,3],[1,2,3],[1,2,3],[2,3,4],[2,3,4],[2,3,4]]"
  );

  // union
  printLine("\nTesting union");
  test("union([1,2,3,4],[5,3,10])", "[1,2,3,4,5,10] ");
  test("union([1,2,3,4],[5,3,10])", "[1,2,3,4,5,10]", "union");

  var A = [10, 2, 3, 3, 4];
  // display(unique(A))
  //[2,3,4,10]
  test("unique([10,2,3,3,4])", "[2,3,4,10]");

  // sparse
  printLine("\nTesting sparse")
  test("sparse([1,2],[1,2],[10,10],2,2)", "[[10,0],[0,10]]");

  // copy
  var A = rand(4);
  // disp(A)
  var B = A;
  B[0][0] = 20;
  // disp(A)
  // note: A changes
  // when B is changed
  var C = copy(A);
  C[0][0] = 100;
  // disp(A)
  // disp(C)

  // Universal functions
  printLine("\n\nUniversal functions\n");
  // add
  // disp(add(3,4))
  // disp(add(ones(4,1),100))
  // disp(add(100,rand(1,4)))
  // disp(add(ones(4),100))
  // disp(add(100,rand(4)))
  // disp(add(ones(4),rand(4)))
  test("add([1,1],[0,1])", "[1,2]");
  test("add(3,4)", "7");
  test("add(ones(4,1),100)", "[[101],[101],[101],[101]]");
  test("add(ones(4),100)", "mul(101,ones(4))");
  test(
    "add(100,eye(4))",
    "[[101,100,100,100],[100,101,100,100],[100,100,101,100],[100,100,100,101]]"
  );
  test("all(map(add(ones(4),rand(4)),x=> (x>1 && x<2)))", "true");
  test("all(map(add(ones(4),rand(4)),x=> (x>1 && x<2)))", "true");

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
  printLine("\nTesting mul");
  test("mul(1,3)", "3");
  test("mul([1],2)", "[2]");
  test("mul([1,2,3],[3])", "[3,6,9]");
  test("mul([3],[1,2,3])", "[3,6,9]");

  test("mul([1,2,3],[1,2,3])", "[1,4,9]");
  test("mul([1,2,3],[1,2,3])", "[1,4,9]");
  test("mul([[1,2,3]],[[1],[2],[3]])", "[[14]]");
  test("mul([[1,2,3],[4,5,6]],[[10]])", "[[10,20,30],[40,50,60]]");

  printLine("\nTesting dotmul")
  var A = ones(4);
  var B = rand(4);
  test("dotmul(11,7)",77)
  test("dotmul([11],[7])",[77])
  test("dotmul([[11]],[[7]])","[[77]]")
  test("dotmul([[[11]]],[[[7]]])","[[[77]]]")
  test("dotmul([[[[11]]]],[[[[7]]]])","[[[[77]]]]")
  test("dotmul([[[[11,10]]]],[[[[7,8]]]])","[[[[77,80]]]]")
  test("dotmul([[[[11,10],[12,5]]]],[[[[7,8],[5,10]]]])","[[[[77,80],[60,50]]]]")

  // dotdiv
  printLine("\nTesting dotdiv")
  test("dotdiv(11,7)",11/7)
  test("dotdiv([11],[7])",[11/7])
  test("dotdiv([[11]],[[7]])","[[11/7]]")
  test("dotdiv([[[11]]],[[[7]]])","[[[11/7]]]")
  test("dotdiv([[[[11]]]],[[[[7]]]])","[[[[11/7]]]]")
  test("dotdiv([[[[11,10]]]],[[[[7,8]]]])","[[[[11/7,10/8]]]]")
  test("dotdiv([[[[11,10],[12,5]]]],[[[[7,8],[5,10]]]])","[[[[11/7,10/8],[12/5,5/10]]]]")

  // pow
 test("pow(2,2)","4")
 test("pow(2,3)","8")
 test("pow(1,3)","1")
 test("pow([2],[2])","[4]")
 test("pow([2,3,4,5],2)","[4,9,16,25]")
 test("pow([2,3,4,5],[2,3,3,4])","[4,27,64,625]")

  // colon
  // disp(A=rand(4))
  // disp(colon(A))

  // linsolve
  printLine("\nTesting linsolve");
    test("linsolve([[1,1,1],[1,2,3],[4,5,5]],[[3],[6],[14]])","[[1],[1],[1]]")
  //    var  x=linsolve(A,b)
  // disp(x)
  // disp(mul(A,x))

  // map
  printLine("\nTesting maps");
  test("map(1,x=>x+1)","2")
  test("map([1],x=>x+1)","[2]")
  test("map([[1]],x=>x+1)","[[2]]")
  test("map([[[1]]],x=>x+1)","[[[2]]]")



  printLine("END OF TESTS \n \n \n");
}


try{
    module.exports = { run_tests };
}catch(err){
    // console.log(err)
}