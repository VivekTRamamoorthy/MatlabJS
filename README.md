# MATLAB functions in Web browser

This is a library for common Matlab functions in the web browser.

## Test it in your browser
Open
[https://VivekTRamamoorthy.github.io/MatlabJS](https://VivekTRamamoorthy.github.io/MatlabJS) 
and try the examples in the console.

## Examples
    tic()
    a=linspace(0,1,100) 
    disp(a) ;
    b=eye(4); 
    c=rand(4); 
    d=mul(b,c) ;
    disp(d)
    toc();

## How to use?
Add `Matlab.js` file to your project and include a script tab in your html:

    <script src="Matlab.js"></script>
## How to use in your project:
- Add `Matlab.js`file  [MatlabJS]("https://github.com/VivekTRamamoorthy/MatlabJS") to your project.
- Throw in a script tag:
```
    <script src="Matlab.js"></script>
```
        
## Drawbacks:
- Unfortunately, operator overloading is not permitted in JS. So we cannot yet write `c=A*b` for matrices and instead have to write `c=mul(A,b)`.
- The code is not optimised for efficiency.
- This project is in its primitive stage. More functions will be included as time permits. And no guarantees are provided.

## License

MIT License 2.0 

Vivek T. Ramamoorthy

