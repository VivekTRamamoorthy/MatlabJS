# [MatlabJS](https://VivekTRamamoorthy.github.io/MatlabJS)
### A lightweight JavaScript library for MATLAB/Octave users

This library gives you some essential array and matrix functions written in JavaScript for easing your scientific computing projects or code conversion from Matlab or Octave.

## Documentation
To see how it works, go to [https://VivekTRamamoorthy.github.io/MatlabJS](https://VivekTRamamoorthy.github.io/MatlabJS).
The library is loaded on the webpage and you may start testing it in the console.
The website also contains a cheatsheet.

### Examples 

```javascript
    tic()
    a=linspace(0,1,100) 
    disp(a) ;
    b=eye(4); 
    c=rand(4); 
    d=mul(b,c) ;
    disp(d)
    toc();
```


## Using in your projects
### Method 1: CDN (Loads the latest update)
- Include the following script tag to your html. This will include all updates and bug fixes.
```html
<script src="https://cdn.jsdelivr.net/gh/VivekTRamamoorthy/MatlabJS/Matlab.js"></script>
```
This would only give the standard functions.
To use plotting tools and linsolve function, additionally include`plotlib.js` and`ndarray.js` files.

### Method 2: Including file using script tag
- Download the`Matlab.js`file to your project folder.
- Include the file in a script tag:
```html
<script src="Matlab.js"></script>
```

### Node:
Install using
``` npm install matlabjs```

Use in your projects like below
```javascript
const MatlabJS = require("matlabjs")
let A = MatlabJS.zeros(10,10) // [[0,0,0,...],  [0,0,0,...], [0,0,0,...], .... ]
```
or
```javascript
const {add, linspace} = require("matlabjs")
let A = add(linspace(0,1),200) // [ 200, 201.010101... , 202.020202... , ...]
```





## A note of caution
- Operator overloading is not yet permitted in JavaScript and doesn't seem like it will be anytime soon. So it is not possible to write`c=A*b` for matrices in Javascript. Instead, one has to resort to the syntactically inconvenient universal functions, for example,`c=mul(A,b)`.
- When using the script tag method, all functions are loaded into the global scope using`var`s and users may overwrite them if needed like in Matlab. If you prefer a namespace import, use it as a module.
- The code may not be optimised for efficiency. For intensive computations, users can manually optimise the code for their use case if performance is an issue. 
- This project is in its initial stage. Additional functionalities may be included as time progresses. 



## Contributing

You can contribute to this repository by following these steps:

- Fork the repository and clone it locally, and create a new branch.
- Include your contribution in the`Matlab.js` file. For example:
```javascript
    var add2 = function(a){
     return a+2;
     }
```
- Write testing scripts for the new function in`tests/run_tests.js` file by including`test("your_function_name(args)","expectedoutput")`.
    - An example would be`test("add2(4)",6)`
- Test on the browser
    - Serve and open`index.html` and click the`Run tests` button on the web page displayed. This will call`run_tests.js` and print results in a popup.
- Test on Node
    - To initiate the testing suite, execute`npm test` from the terminal.
- If these tests pass, you may commit and raise a pull request to the`main` branch.


## List of functions
Matlab function	| MatlabJS equivalent |	Example usage	| Description
:---------------|:--------------------|:---------------|:---------------
`tic`           |	`tic()`           |                 | Starts recording time
`toc`           |	`toc()`           | `tic();` <br>`t=toc();` |	Prints elapsed time since start
`clc`              |`clc()` |`clc()` |   Clears console  
`linspace` | `linspace` |   `A=linspace(0,1)`<br>`// [0 .1010.. 1]`<br>   `B=linspace(10,20,3)`<br>`   // [10,15,20] `|      Produces linearly spaced array.  
`logspace` |`logspace` |`A=logspace(1,1000,4)`<br>`// [1 10 100 1000]`<br>` B=logspace(1,25,3)`<br>` // [1,5,25]`|  Produces logarithmically spaced arrays.   
`disp`,`display` |`disp`,`display` |`A=linspace(0,1)`<br>`B=linspace(10,20,3)`<br>`disp(A)`<br>` display(B)`<br> |  Displays matrices and arrays in console    
`isfield`|` isfield(struc,fieldname) `|` struc={x:10,y:100}`<br>` isfield(struc,'x')`<br>` // true`<br>` isfield(struc,'a')`<br>` // false` |  Checks the presence of  <br>fieldnames in a structure   
`size`|` size(A) `|` A=[[1,2,3],[3,4,5]]`<br>` size(A) // [2,3]`|  Dimensions of a matrix or array      
`length`|` A.length`<br>` length(A)`|` A=[1,2,3,3,4,5]`<br>` A.length // 6`<br>` length(A) // 6`|  Length of an array    
`find`|` find `|` A=[1,2,0,0,4,5]`<br>` find(A) // [1, 2, 5, 6]`|  Find nonzero elements    
`sort`|` sort()`|` A=[3,2,1,5,7];`<br>`[sortedA,indices]=sort(A);`<br>` disp(sortedA);`<br>` // [1,2,3,5,7]`<br>` disp(indices);`<br>` // [3,2,1,4,5] `|  Sorts numbers ascending   
`sum`|` sum`|` A=[1,2,3]`<br>`sum(A) // 6`<br>`B=[[1,2,3],[4,5,6],[7,8,9]]`<br>` disp(sum(B,1))`<br>`// column sum [12,15,18]`<br>` disp(sum(B,2))`<br>`// row sum [[6],[15],[24]]`|<br> Sum of an array <br> <br>Column sum of a matrix <br> Row sum of a matrix   
`abs`|` abs`|` A=[1,-2,3]`<br>`abs(A) // [1,2,3]`<br>`B=[[1,-2,3],[-4,5,6],[-7,8,-9]]`<br>` disp(abs(B))`<br>`//[1,2,3],[4,5,6],[7,8,9]`|  Absolute value of  <br>num, array or matrix   
`sqrt`|` sqrt`|` A=[1,4,2]`<br>`disp(sqrt(A))`<br>` // [1,2,1.414] A=rand(4)`<br>` disp(A)`<br>` disp(sqrt(A))`|  Square root of  <br> a number, array or matrix   
`setdiff`|` setdiff`|` A=[4,3,1,5]`<br>`B=[5,3,7,8]`<br>` setdiff(A,B) // [1,4]`|  Set difference (sorted)  
`min`|` min`|` A=[1,3,-5,9]`<br>` disp(min(A)) // -5`<br>` B=[[1,2,3],[4,5,6],[7,8,9]]`<br>` disp(B)`<br>` disp(min(B,1)) // elemwise min`<br>` disp(min(B,4)) //`<br>` disp(min(B,[],1)) // column min`<br>` disp(min(B,[],2)) // row min`|  Minimum of an array or matrix   
`max`|` max`|` Similar to min`|  Maximum of an array or matrix   
`a:b:c`|` range(a,b,c)`|` range(2,0.5,4)`<br>`// [2,2.5,3,3.5,4]`|  Array from a to c in steps of b   
`triu`|` triu(Matrix,k)`|` disp(triu(rand(4)))`<br>` disp(triu(rand(4),1))`|  Upper trianular matrix   
`[A, B]`|` concatRows(A,B)`|` A=ones(3,3)`<br>` disp(A)`<br>` B=rand(3,3)`<br>` disp(B)`<br>` C=concatRows(A,B)`<br>`disp(C)`<br>`// 3 x 6 matrix`|  Concatenate rows of two matrices   
`[A; B]`|` concatCols(A,B)`|` A=ones(3,3)`<br>` disp(A)`<br>` B=rand(3,3)`<br>` disp(B)`<br>` C=concatCols(A,B)`<br>`disp(C)`<br>`// 6 x 3 matrix`|  Concatenate columns of two matrices   
`A'`|` transpose(A)`|` A=[[1,2,3],[4,5,6]]`<br>` transpose(A)`<br>`// [[1,4],[2,5],[3,6]]`|  Transposes a matrix   
`ones`|` ones`|` disp(ones(3))`<br>`// 3x3 matrix of 1s`<br>` disp(ones(3,2))`<br>` // 3x2 matrix of 1s`<br>` disp(ones(3,1))`<br>` // column of 1s`|  Matrix of ones   
`eye`|` eye`|` disp(eye(3))`<br>`// 3x3 identity matrix`<br>` disp(eye(4))`<br>` // 4x4 matrix of 1s`<br>` disp(eye(10))`<br>` // column of 1s`| Generates identity matrices   
`zeros`|` zeros`|` disp(zeros(3))`<br>` // 3x3 matrix of 0s`<br>` disp(zeros(3,2))`<br>` // 3x2 matrix of 0s`<br>` disp(zeros(3,1))`<br>` // column of 0s` |  Generates zero matrices   
`rand`|`rand`|`disp(rand())`<br>`// random no in [0,1]`<br>` disp(rand(3))`<br>`// 3x3  random`<br>` disp(rand(3,2))`<br>` // 3x2  random`<br>` disp(rand(3,1))`<br>` // column of random`|  Generates matrix with values uniformly random in [0,1]   
`randi`|` randi(N,rows,cols)`|` disp(randi(5))`<br>`// random num in {1,2...5}`<br>` disp(randi(5,3))`<br>` disp(randi(5,3,2))`<br>` // 3x2  random in {1,2...5}` |  Generate random integer matrices with values in`[0,1,2,...,N]` 
`diag`|` diag(D)`|` disp(diag([5,3,2]))`<br>` // returns:`<br>` // [ [5, 0, 0],`<br>` // [0, 3, 0],`<br>` // [0, 0, 2] ]`|  Diagonal matrix from an array   
`reshape`|` reshape`|` reshape([1,2,3,4,5,6],2,3)`<br>` // [1,2,3; 4,5,6]`| Reshape a vector or a matrix   
Getting values <br>`A(rowrange,colrange)`<br>`A(1:3,1:3)`<br>`A(10,10)`<br>`A(end,end-1)`|` get(A,rowrange,colrange)`<br>`get(A,[1,2,3],[1,2,3])`<br>`get(A,10,10)`<br>`get(A,0,-1)`|` A=rand(10,10);disp(A)`<br>` B=get(A,[1,2,3],[2,5,7])`<br>` disp(B)`<br>` B=get(A,':',[1,2,3])`<br>` disp(B)`<br>` // gets all rows & first 3 cols`|  Get values of a submatrix   
Setting values in matrices <br>`A(rowrange,colrange)=B`<br>` A(1:3,1:3)=B`<br>` A(end-5:end,:)=2`<br>` a(arrayrange)=b`<br>` a(1:3)=[10 20 30]`<br>` a(1)=10`<br>` a(end-2)=8` |  <br>`set(A,rowrange,colrange,B)`<br>` set(A,[1,2,3],[1,2,3],B)`<br>` set(A,range(-5,0),':',2)`<br>` set(a,arrayrange,b)`<br>` set(a,[1,2,3],[10,20,30])`<br>` set(a,1,10)`<br>` set(a,-2,8)`|` Matrix example:`<br>` A=rand(5,5)`<br>` set(A,range(1,3),range(1,3),0)`<br>` disp(A)`<br>` // sets first 3 rows and cols to 0`<br>`set(`<br>`  A,`<br>`  range(1,3),`<br>`  range(1,3),`<br>`  randi(2,3,3)`<br>`)`<br>` disp(A)`<br>` // sets first 3 rows and cols`<br>`// to random in {1,2}`<br><br> Array example: <br>` A=[1,2,3,4,5,6]`<br>` set(A,2,10)// A(2)=10`<br>` set(A,0,100) // A(end)=20`<br>` set(A,-1,20) // A(end-1)=20`<br>` disp(A) // [1, 10, 3, 4, 20, 100]`|  Set values to a submatrix 
`repmat`|` repmat(mat,rows,cols)`|` A=rand(2,3)`<br>` B=repmat(A,4,5)`<br>` disp(B)`|  Repeat matrix   
`kron`|` kron(X,Y)`|` A=[[1,2,3],[2,3,4]];`<br>` Y=[[1],[1],[1]];`<br>` display(kron(A,Y))`|  Kronecker tensor product   
`union`|` union(X,Y)`|` A=[1,2,3,4];`<br>` B=[5,3,10];`<br>` display(union(A,B))`<br>` //[1,2,3,4,5,10]`|  Union of two sets   
`unique`|` unique(A)`|` A=[10,2,3,3,4];`<br>` display(unique(A))`<br>` //[2,3,4,10]`|  Unique items of a set   
`sparse(I,J,K)`|` sparse(I,J,K,nRows,nCols)`|` A=sparse([1,2],[1,2],[10,10],10,10);`<br>` disp(A)`|  Initiate a sparse matrix  <br> I - row indices <br> J - column indices <br> K - element values <br> nRows - no of rows<br> nCols - no of cols  
`B=A`|` B=copy(A)`|` A=rand(4)`<br>` disp(A)`<br>` B=A`<br>` B[0][0]=20`<br>` disp(A)`<br>`// note: A changes`<br>`// when B is changed`<br>` C=copy(A); C[0][0]=100`<br>` disp(A)`<br>` disp(C)`|   For array and matrices <br> B=A;  will not actually copy A <br> but only creates a reference  <br> Use B=copy(A) instead.  
`C=A+B`|` C=add(A,B)`|` disp(add(3,4))`<br>` disp(add(ones(4,1),100))`<br>` disp(add(100,rand(1,4)))`<br>` disp(add(ones(4),100))`<br>` disp(add(100,rand(4)))`<br>` disp(add(ones(4),rand(4)))` |  Universal add  <br> for  <br> number + number <br> array + number <br> array + array  <br> number + matrix   
`C=A-B`|` C=sub(A,B)`|` disp(sub(3,4))`<br>` disp(sub(ones(4,1),100))`<br>` disp(sub(100,rand(1,4)))`<br>` disp(sub(ones(4),100))`<br>` disp(sub(100,rand(4)))`<br>` disp(sub(ones(4),rand(4)))` |   Universal subtract   <br>  for   <br>  number - number  <br>  array - number  <br>  array - array   <br>  number - matrix   
`C=A*B`|` C=mul(A,B)`|` disp(mul(3,4))`<br>` disp(mul(ones(4,1),100))`<br>` disp(mul(100,rand(1,4)))`<br>` disp(mul(ones(4),100))`<br>` disp(mul(100,rand(4)))`<br>` disp(mul(ones(4),rand(4)))`<br>` disp(mul(eye(4),rand(4)))`<br>` disp(mul(rand(5,4),rand(4,3)))`<br>` disp(mul(rand(5),rand(5,1)))`<br>` disp(mul(rand(1,10),rand(10,1)))` |   Universal multiply   <br>  for   <br>  number * number  <br>  array * number  <br>  array * array   <br>  matrix(n by k) * matrix(k by m)   
`C=A.*B`|` C=dotmul(A,B)`|` disp(dotmul(3,4))`<br>` A=ones(4)`<br>` B=rand(4)`<br>` disp(dotmul(rand(10,1),rand(10,1)))`<br>` disp(dotmul(A,B))`<br>` disp(dotmul(eye(4),B))` |   Elementwise multiply   <br>  for   <br>  number .* number  <br>  array .* array  <br>  matrix .* matrix   
`C=A/B`|` C=div(A,B)`|` disp(div(3,4))`<br>` disp(div(ones(4,1),100))`<br>` disp(div(100,rand(1,4)))`<br>` disp(div(ones(4),100))`<br>` disp(div(100,rand(4)))`<br>` disp(div(ones(4),rand(4)))` |   Universal divide   <br>  for   <br>  number /  number  <br>  array /  number  <br>  array  / array   <br>  number /  matrix   
`C=A./B`|` C=dotdiv(A,B)`|` A=rand(1,4)`<br>` B=mul(100,ones(1,4))`<br>` disp(dotdiv(A,B))`<br>` C=add(rand(10),1)`<br>` disp(dotdiv(rand(10),C))`<br>` disp(dotdiv(eye(4),rand(4)))` |   Elementwise divide   <br>  for   <br>  number ./ number  <br>  array ./ array   <br>  matrix ./ matrix   
`C=A^B`|` C=pow(A,B)`|` disp(pow(3,4))`<br>` disp(pow(ones(4,1),100))`<br>` disp(pow(100,rand(1,4)))`<br>` disp(pow(ones(4),100))`<br>` disp(pow(100,rand(4)))`<br>` disp(pow(ones(4),rand(4)))`<br>` disp(pow(eye(4),rand(4)))` |   Universal power   <br>  for   <br>  number ^ number  <br>  array ^ number  <br>  array ^ array   <br>  number ^ matrix  <br>  matrix ^ number  <br>  matrix ^  matrix    
`A(:)`|` colon(A)`|` disp(A=rand(4))`<br>` disp(colon(A))`|  List all columns as vector   
`x=A\b`|` x=linsolve(A,b)`|` A=[[2,3,4],[1,1,1],[1,0,1]]`<br>` b=[[9],[3],[2]]`<br>` x=linsolve(A,b)`<br>` disp(x)`<br>` disp(mul(A,x))`|   Linear solve (or)   <br>  mldivide   <br>  solve a sys of   <br>  linear equations  <br>  Uses [ndarrayjs](https://www.npmjs.com/package/ndarray)   <br>  Include ndarray.js file in your project.   
`all`|` all`|` all([[true,true],[true,false]])`<br>`// false`<br>` all([true,true],[true,true]])`<br>`// true`|   If all elements are true, returns true   <br>  Multi-dimensional   
`any`|` any`|` any([[false,false],[false,false]]) `<br>`// false`<br>` any([false,false],[true,false]]) `<br>`// true`|   If any element is true, returns true   <br>  Multi-dimensional    
Not available |` map(function,`<br>`   arg1,arg2,arg3...)`|` map(x=>x>3, [1,2,3,4,5])`<br>` // [false,false,false,true,true]`<br>` map(x=>x>3, [[1,2,3],[4,5,6]])`<br>` // [[false,false,false],`<br>`[true,true,true]]`<br>` map((a,b)=>a>b, [[1,2,3],[4,5,6]],3)`<br>` // [[false,false,false],`<br>`[true,true,true]]`<br>` map((a,b)=>a+b, [[1,2,3],[4,5,6]],3,[[1,2,3],[4,5,6]] )`<br>` // [[5,7,9],[11,13,15]]`|   Multi dimensional map:  <br>  Applies function across all elements,  <br>  If any arg is not an array, uses the value instead  <br>  Considers two arguments at a time until the last   
`exp`|`exp(number or complex or array or complex array`|`exp(1) // 2.718..`<br>` a=exp(new cx(0,Math.PI/2))`<br>`disp(a)// 0+1i i.e. a.re=0 a.im=1`|   Multi dimensional universal exponention function   
   

## License 
MIT License 2.0

Vivek Thaminni Ramamoorthy
