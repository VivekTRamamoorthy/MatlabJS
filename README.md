# A Javascript mini-library for MATLAB users

This mini-library gives you some essential array and matrix functions written in JavaScript for easing your scientific computing projects or code conversion from Matlab or Octave. 

## Documentation
To see how it works, go to [https://VivekTRamamoorthy.github.io/MatlabJS](https://VivekTRamamoorthy.github.io/MatlabJS).
The library is loaded in the webpage and you may start testing it in the console.
The webpage also contains a cheatsheet.

## Examples 
```
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
- Include  the following script tag to your html. This will include all updates and bug fixes.
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
``` npm install -g matlabjs```
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
- Operator overloading is not permitted in JS. So we cannot yet write `c=A*b` for matrices. Instead we have to use the universal functions such as `c=mul(A,b)` to multiply.
- A note of caution that all functions are loaded into the global scope using `var`s so that you may overwrite them.
- The code is not optimised for efficiency. 
- This project is in its primitive stage. More functionalities will be included as time permits. 

## License

MIT License 2.0 
Vivek Thaminni Ramamoorthy

## How to contribute

You can contribute to this repository by following these steps:

- Fork the repository and clone it locally, and create a new branch.
- Include your contribution in the `Matlab.js` file
    - Copy these modifications also in `node/main.js` also. The node export is maintained in a separate file.
- Write testing scripts for the new function in `tests/run_tests.js` file
    - This can be done by including `test("your_function_name(args)","expectedoutput")` somewhere within the file.
    - An example would be `test("add2(4)",6)`
- Test in browser 
    - Serve and open `index.html` and click the `Run tests` button on the web page displayed. This will call `run_tests.js` and print results in a popup.
- Test in node
    - To test that `require('matlabjs')` would work, run `node tests/test_export.js` from Terminal.
    - To run the testing suite, run `node tests/test_node.js` from Terminal.
- If these tests pass, you may commit and raise a pull request to `main` branch.
