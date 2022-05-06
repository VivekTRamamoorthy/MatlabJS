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
