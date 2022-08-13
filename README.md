# MatlabJS: A Javascript mini-library for MATLAB users

This mini-library gives you some essential array and matrix functions written in JavaScript for easing your scientific computing projects or code conversion from Matlab or Octave.

## Documentation
To see how it works, go to [https://VivekTRamamoorthy.github.io/MatlabJS](https://VivekTRamamoorthy.github.io/MatlabJS).
The library is loaded on the webpage and you may start testing it in the console.
The webpage also contains a cheat sheet.

## Examples 
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
### Method 1: CDN
- Include the following script tag to your html. This will include all updates and bug fixes.
```html
<script src="https://cdn.jsdelivr.net/gh/VivekTRamamoorthy/MatlabJS/Matlab.js"></script>
```
This would only give the standard functions.
To use plotting tools and linsolve function, additionally include `plotlib.js` and `ndarray.js` files.
### Method 2: Include file using script tag
- Download the `Matlab.js`file from the [Github repository](https://github.com/VivekTRamamoorthy/MatlabJS) to your project folder.
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
let A = MatlabJS.zeros(10,10)
```
or
```javascript
const {add, linspace} = require("matlabjs")
let A = add(linspace(0,1),200)
```



## Limitations
- Operator overloading is not permitted in JS. So we cannot yet write `c=A*b` for matrices. Instead, one has to use the universal functions to multiply, for example, `c=mul(A,b)`.
- A note of caution that all functions are loaded into the global scope using `var`s so that users may overwrite them if needed like in Matlab.
- The code may not be optimised for efficiency. For intensive computations, users are advised to manually optimise for their use case if performance is an issue. 
- This project is in its primitive stage, and more functionalities will be included as time progresses.

## License

MIT License 2.0
Vivek Thaminni Ramamoorthy

## How to contribute

You can contribute to this repository by following these steps:

- Fork the repository and clone it locally, and create a new branch.
- Include your contribution in the `Matlab.js` file. For example:
```javascript
    var add2 = function(a){
     return a+2;
     }
```
- Write testing scripts for the new function in `tests/run_tests.js` file by including `test("your_function_name(args)","expectedoutput")`.
    - An example would be `test("add2(4)",6)`
- Test on the browser
    - Serve and open `index.html` and click the `Run tests` button on the web page displayed. This will call `run_tests.js` and print results in a popup.
- Test on Node
    - To test that `require('matlabjs')` would work for node users, run `node tests/test_export.js` from the terminal.
    - To run the testing suite, run `npm test` from the terminal.
- If these tests pass, you may commit and raise a pull request to the `main` branch.


