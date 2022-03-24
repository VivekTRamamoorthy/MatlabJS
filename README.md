# A Javascript mini-library for MATLAB users

When I started to convert some of my Matlab projects to Javascript to deploy in the web, I could not find any easy to use library. Although many excellent libraries exist (mathjs, ndarray, scijs), they are not very ready to use. I wrote my own functions to ease the process and I thought I should share it with others. This mini-library gives you some essential array and matrix functions for easing code convertion from Matlab or Octave to Javascript, or deploy your own scientific computing projects with less pain. 

## TEST HOW IT WORKS
To see how it works, open [https://VivekTRamamoorthy.github.io/MatlabJS](https://VivekTRamamoorthy.github.io/MatlabJS) 
and start typing matlab-like code in the console.

## EXAMPLE CONSOLE INPUTS 
    tic()
    a=linspace(0,1,100) 
    disp(a) ;
    b=eye(4); 
    c=rand(4); 
    d=mul(b,c) ;
    disp(d)
    toc();

The webpage also contains a cheatsheet.

## HOW TO USE IN YOUR PROJECTS
### Method 1 (Recommended):
- Include  the following script tag to your html. This will include all updates and bug fixes.
```
    <script src="https://cdn.jsdelivr.net/gh/VivekTRamamoorthy/MatlabJS/Matlab.js"></script>
```

### Method 2:
- Download the `Matlab.js`file from the [Github repository](https://github.com/VivekTRamamoorthy/MatlabJS) to your project folder.
- Include the file in a script tag:
```
    <script src="Matlab.js"></script>
```

        
## LIMITATIONS
- Operator overloading is not permitted in JS. So we this library does not permit you to write `c=A*b` for matrices. Instead one has to write `c=mul(A,b)`.
- Beware that all functions are loaded into global scope using `var`s. You can overwrite these declarations.
- The code is not optimised for efficiency. 
- This project is in its primitive stage. More functions will be included as time permits. 

## LICENSE

MIT License 2.0 
Vivek Thaminni Ramamoorthy
