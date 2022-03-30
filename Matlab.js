// MatlabJS
// This is a set of basic functions wtih Matlab/Octave-like syntax written in Javascript. 
// The purpose of this is to aid rapid prototyping of projects and they are NOT optimised for efficiency. 
// By Vivek T R 
// MIT License 2.0
// Updated: 2022 March
// Check for latest updates at www.github.com/VivekTRamamoorthy/MatlabJS

const MATLABJS_GLOBAL={
    dateUpdated: "2022 March 30",
    version: "0.1.0",
    url: "https://www.github.com/VivekTRamamoorthy/MatlabJS",
    documentation: "https://VivekTRamamoorthy.github.io/MatlabJS",
    newfeatures: "map,exp,all,any, testing suite",
    listOfFunctions:['clc','tic','toc','isfield','linspace','logspace','size','length','find','sort',
    'sum','norm','abs','sqrt','setdiff','min','max','range','concatRows','concatCols','transpose',
    'ones','zeros','rand','randi','randn_bm','randn','diag','triu','display','reshape','get','set',
    'repmat','kron','union','unique','sparse','colon','add','sub','mul','div','pow','dotmul','dotdiv',
    'deepcopy','copy','disp','linsolve','all','any','map','exp','real','imag','angle','conj'],
    classes:['cx']
}

var clc = function(){console.clear()};

var ticTime;

var tic = function(){
    const d = new Date();
    ticTime=d.getTime();
    console.log("Started recording time.")
    return 0;
}

var toc = function(){
    const d = new Date();
    var tocTime = d.getTime();
    const elTime=(tocTime-ticTime)/1000;
    console.log("Elapsed time is: "+ elTime + " secs" )
    return elTime;
}

var isfield = function(obj,fieldstr){return obj.hasOwnProperty(fieldstr)}


var linspace = function(a,b,n=100){
    let step= (b-a)/(n-1)
    return (new Array(n)).fill(0).map((x,i)=>a+i*step);
}

var logspace = function(a,b,n=100){
    let step= Math.pow((b/a),1/(n-1))
    return (new Array(n)).fill(0).map((x,i)=>a*Math.pow(step,i));
}

var size = function(a,dim=0){ // mimics matlabs size function size([10,10]) => [1,2]
    if(a.hasOwnProperty("stride")){return a.size;} // check for ndarray
    if(a instanceof Array){
        if(dim==0){
            if(a[0] instanceof Array){return [a.length,a[0].length];}
            return [a.length,1];
        }
        if(dim==1){return a.length;}
        if(dim==2){return a[0].length;}
    }
    console.error("cannot resolve the size of this object.")
    return [];
}

var length = function(a){
    return a.length;
}

var find = function(array){
    let found=[];
    for (let i = 0; i < array.length; i++) {
        if(array[i]!=0){
            found.push(i+1);
        }
    }
    return found;
}


var sort = function(array){ // indices start from 1
    let indices = new Array(array.length);
    for (var i = 0; i < array.length; ++i) {indices[i] = i;}
    indices=indices.sort(function (a, b) { return array[a] < array[b] ? -1 : array[a] > array[b] ? 1 : 0; });
    indices=indices.map(x=>x+1);
    let sortedarray=[...array].sort((a,b)=>a-b) ;    
    return [sortedarray, indices];
}



var sum = function(A,dim=0){ // 1 is column sum and 2 is row sum
    let s=0;
    if(typeof(A[0])=="number"){
        for (let elem = 0; elem < A.length; elem++) {
            s+=A[elem];
        }
        return s;
    }else{ 
        if(dim==0){ // if A is a row vector or a column vector
            if(size(A,1)==1){ return sum(A[0])}
            if(size(A,2)==1){ 
                for (let elem = 0; elem < A.length; elem++) {
                    s+=A[elem][0];
                }
                return s;
            }
        }
        // A is a matrix
        if(dim==1 || dim ==0){ // column sum
            let s=zeros(1,A[0].length);
            for (let col = 0; col < A[0].length; col++) {
                for (let row = 0; row < A.length; row++) {
                    s[0][col]+=  A[row][col];
                }
            }
            return s;
        }
        if(dim==2){ // row sum
            let s=zeros(A.length,1)
            for (let row = 0; row < A.length; row++) {
                for (let col = 0; col < A[0].length; col++) {
                    s[row][0]+=  A[row][col];
                }
            }
            return s;
        }
    }
}

var norm = function(V,p=2){
    if(typeof(V)=="number"){return V}
    if(size(V,1)==1 || size(V,2)==1){
        return pow(sum(pow(V,p)),1/p)
    }
    console.error("norm is undefined for this input type")
}

var abs = function(A){
    if(typeof(A)=="number"){return Math.abs(A);} // A is a number
    if(A instanceof Array){return A.map(x=>abs(x));} // A is an array
    if(A instanceof cx){return A.abs()}
    console.error("Cannot find absolute for this input type")
}

var sqrt = function(A){
    if(typeof(A)=="number"){return Math.sqrt(A);} // A is a number
    if(typeof(A[0])=="number"){return A.map(x=>Math.sqrt(x));} // A is an array
    if(typeof(A[0][0])=="number"){return A.map(subarr=>subarr.map(x=>Math.sqrt(x)));  } //  A is a matrix
    console.error(" cannot apply absolute for this input type")
    return [];
}

var setdiff = function(arr1,arr2){
    let result=[arr1[0]], indices=[1],donotinclude, current;
    for (let i = 1; i < arr1.length; i++) {
        current=arr1[i];
        donotinclude=0;
        // check to see if the current element exists in the result
        for (let j = 0; j < result.length; j++) {
            if(current==result[j]){donotinclude=1; break; }
        }
        if(donotinclude==1){break;}
        // check to see if the current element exists in the array 2
        for (let j = 0; j < arr2.length; j++) {
            if(current==arr2[j]){donotinclude=1;break; }
        }
        // if(donotinclude==1){break;}
        // if the element doesn't exist then push to the result and update the index
        if(donotinclude==0){result.push(current); indices.push(i); }
    }
    // return [result,indices] // alternative two output argument result
    result.sort((a,b)=>a-b);
    return result
}

var min = function(A,B=[],dim=1){ 
    if(typeof(A)=="number"){ // A is a number
        if(typeof(B)=="number"){return Math.min(A,B);}
        if(typeof(B[0])=="number"){return B.map(x=>Math.min(x,A));}
        if(typeof(B[0][0])=="number"){
            return B.map(subarr=>subarr.map(x=>Math.min(x,A)));
        }
    }
    if(typeof(A[0])=="number"){ // A is an array
        if(B.length==0){ return Math.min.apply(null,A);}
        if(typeof(B[0])=="number"){ // B is also an array
            if(A.length==B.length){ // two equal arrays returns min of each corresponding element
                return A.map((x,i)=>min(x,B[i])) 
            }
            else{ // if unequal arrays return the minimum of both arrays concatinated is returned
                return Math.min.apply(null,A.concat(B));
            }
        }
    }
    if(typeof(A[0][0])=="number") // A is a matrix
    {
        if(B.length==0 && dim == 1){ // column min // B==[] doesnt work
            if(A[0].length==1){// column vector case min to treat it as array
                A=A.map(x=>x[0]);
                return Math.min.apply(null,A);
            }
            let  colmin=[new Array(A.length).fill(0).map(x=>0)];
            for (let col = 0; col < A[0].length; col++) {
                let colarr=[];
                for (let row = 0; row < A.length; row++) {
                    colarr[row]=A[row][col];
                }
                colmin[0][col]=Math.min.apply(null,colarr);
            }
            return colmin;
        }
        if(B.length==0 && dim==2){ // row min // B==[] doesnt work
            let rowmin=zeros(A.length,1);
            for (let row = 0; row < A.length; row++) {
                let rowarr=[];
                for (let col = 0; col < A[0].length; col++) {
                    rowarr[col]=  A[row][col];
                }
                rowmin[row][0]=Math.min.apply(null,rowarr);
            }
            return rowmin;
        }
        if(typeof(B)=="number"){ // B is a number
            return min(B,A);
        }
        if(typeof(B[0])=="number"){console.error(" cant find max between matrix and a vector"); return [] ;}
        if(typeof(B[0][0])=="number"){ // B is a matrix
            let C=new Array(B.length).fill(0).map(x=>new Array(B[0].length).fill(0).map(x=>0));
            for (let row = 0; row < A.length; row++) {
                for (let col = 0; col < A[0].length; col++) {
                    C[row][col]=Math.min(A[row][col],B[row][col]);
                }
            }
            return C;
        }
    }
    console.error(" min function undefined for this input combination")
    return [];
}

var max = function(A,B=[],dim=1){ 
    if(typeof(A)=="number"){ // A is a number
        if(typeof(B)=="number"){return Math.max(A,B);}
        if(typeof(B[0])=="number"){return B.map(x=>Math.max(x,A));}
        if(typeof(B[0][0])=="number"){
            return B.map(subarr=>subarr.map(x=>Math.max(x,A)));
        }
    }
    if(typeof(A[0])=="number"){ // A is an array
        if(B.length==0){ return Math.max.apply(null,A);}
        if(typeof(B[0])=="number"){ // B is also an array
            if(A.length==B.length){ // two equal arrays returns max of each corresponding element
                return A.map((x,i)=>max(x,B[i])) 
            }
            else{ // if unequal arrays return the maximum of both arrays concatinated is returned
                return max(A.concat(B));
            }
        }
    }
    if(typeof(A[0][0])=="number") // A is a matrix
    {
        if(B.length==0 && dim == 1){ // column max
            if(A[0].length==1){// column vector case max to treat it as array
                A=A.map(x=>x[0]);
                return Math.max.apply(null,A);
            }
            let  colmax=[new Array(A.length).fill(0).map(x=>0)];
            for (let col = 0; col < A[0].length; col++) {
                let colarr=[];
                for (let row = 0; row < A.length; row++) {
                    colarr[row]=A[row][col];
                }
                colmax[0][col]=Math.max.apply(null,colarr);
            }
            return colmax;
        }
        if(B.length==0 && dim==2){ // row max
            let rowmax=zeros(A.length,1);
            for (let row = 0; row < A.length; row++) {
                let rowarr=[];
                for (let col = 0; col < A[0].length; col++) {
                    rowarr[col]=  A[row][col];
                }
                rowmax[row][0]=Math.max.apply(null,rowarr);
            }
            return rowmax;
        }
        if(typeof(B)=="number"){ // B is a number
            return max(B,A);
        }
        if(typeof(B[0][0])=="number"){ // B is a matrix
            let C=new Array(B.length).fill(0).map(x=>new Array(B[0].length).fill(0).map(x=>0));
            for (let row = 0; row < A.length; row++) {
                for (let col = 0; col < A[0].length; col++) {
                    C[row][col]=Math.max(A[row][col],B[row][col]);
                }
            }
            return C;
        }
    }
    console.error(" max function undefined for this input combination")
    return [];
}

var range = function(a,b=NaN,c=NaN){// 1:5 range(1,5) or  1:0.1:5 range(1,0.1,5) Matlab's colon and double colon
    let n,step;
    if(!isNaN(c)){step=b;n=Math.floor((c-a)/b)+1} // three inputs
    else if(!isNaN(b)) {step=1;n=Math.max(Math.round((b-a)/step)+1,0);} //  two inputs
    else {step=1;n=a;a=1;} // one input
    if(n<1){return [];} // return empty array is 
    return (new Array(n)).fill(0).map((x,i)=>a+i*step);
}

var concatRows = function(A,B)
{
    if(A.length==B.length)
    {
        let C=[];
        for(let row=0;row<A.length;row++)
        {
            C[row]=A[row].concat(B[row]);
        }
        return C;
    }
    else
    {
        console.error("Dimensions of arrays being horizontally concatenated are not equal")
        return [];
    }
}

var concatCols = function(A,B){
    
    if(A[0].length==B[0].length){
        
        let C=A.concat(B);
        return C;
    }
    console.error("Dimensions of arrays being horizontally concatenated are not equal")
    return [];
}


var transpose = function(A){
    let B;
    if(typeof(A[0])=="number"){
        B=A.map(x=>[x]);
        return B;
    }
    B=new Array(A[0].length).fill(0).map(x=>new Array(A.length).fill(0).map(x=>0));
    for(let row=0;row<A[0].length;row++){
        for(let col=0;col<A.length;col++){
            // console.log({row,col})
            B[row][col]=A[col][row];
        }
    }
    return B;
}

var ones = function(a,b=0){
    if(b==0){b=a;};
    let rows,cols;
    if(typeof(a)== "object"){rows=a[0]; cols=a[1]; }; // if a is an array and a(2) is not 1
    if(typeof(a)== "number"){rows=a;cols=b;};  
    return  new Array(rows).fill(0).map(x=>new Array(cols).fill(0).map(x=>1));
}

var eye = function(a){
    let res = new Array(a).fill(0).map(x=>new Array(a).fill(0))  ;
    return res.map((row,i)=>row.map((x,j)=> (i==j)? 1:0)); // the +0 is  to make true =1 and false=0
    
}

var zeros = function(a,b=0){
    if(b==0){b=a;};
    let rows,cols;
    if(a instanceof Array){rows=a[0]; cols=a[1]; }; // if a is an array and a(2) is not 1
    if(typeof(a)== "number"){rows=a;cols=b;};
    return  new Array(rows).fill(0).map(x=>new Array(cols).fill(0).map(x=>0));
}

var rand = function(a=0,b=0){
    if(a==0){return Math.random();}
    if(b==0){b=a;};
    let rows,cols;
    if(a instanceof Array){rows=a[0]; cols=a[1]; }; // if a is an array and a(2) is not 1
    if(typeof(a)== "number"){rows=a;cols=b;};
    return  new Array(rows).fill(0).map(x=>new Array(cols).fill(0).map(x=>Math.random()));
}

var randi = function(n,a=0,b=0){
    if(a==0 && b==0){return Math.floor(Math.random()*n);}
    if(b==0){b=a;};
    let rows,cols;
    if(a instanceof Array){rows=a[0]; cols=a[1]; }; // if a is an array and a(2) is not 1
    if(typeof(a)== "number"){rows=a;cols=b;};
    return  new Array(rows).fill(0).map(x=>new Array(cols).fill(0).map(x=>Math.ceil(Math.random()*(n-1))));
}


var randn_bm = function() {
    // Standard Normal variate using Box-Muller transform.
    let u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}

var randn = function(a=0,b=0){
    if(a==0){return randn_bm();}
    if(b==0){b=a;};
    let rows,cols;
    if(a instanceof Array){rows=a[0]; cols=a[1]; }; // if a is an array and a(2) is not 1
    if(typeof(a)== "number"){rows=a;cols=b;};
    return  new Array(rows).fill(0).map(x=>new Array(cols).fill(0).map(x=>randn_bm()));
}

var diag = function(D){
    if (typeof(D)=="number") {return D}
    if (D instanceof Array) {
        let diagonalMatrix=[];
        for (let row = 0; row < D.length; row++) {
            diagonalMatrix[row]=[];
            for (let col = 0; col < D.length; col++) {
                if (row==col){
                    diagonalMatrix[row][col]=D[row];
                }
                else{
                    diagonalMatrix[row][col]=0;
                }
            }
        }
        return diagonalMatrix;
    }
}

var triu = function(matrix,diagonal=0){
    let upperTriangularMatrix=deepcopy(matrix);
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < Math.min(row  + diagonal,matrix[0].length); col++) {
            upperTriangularMatrix[row][col]=0;
        }
    }
    return upperTriangularMatrix;
}

var display = function(a){
    if(typeof(a)=="number"){ // a is number
        console.log(a)
        return;
    }
    if(a instanceof cx){ // a is complex
        console.log("ans:\n"+a.re+" + 1i*"+a.im); 
        return;
    }
    if(a instanceof Array){  // a is an array
        if(typeof(a[0])=="number"){ // a is a number array
            let displayText="\n [";
            for(let i=0;i<a.length;i++){displayText=displayText.concat("  "+ a[i]+"  ")}
            displayText=displayText.concat(" ]");
            console.log(displayText);
            return;
        }
        if(a[0] instanceof cx){ // a is a complex array
            let displayText="\n [ ";
            for(let i=0;i<a.length;i++){displayText=displayText.concat("  "+a[i].re+" + 1i*"+a[i].im+"   ")}
            displayText=displayText.concat(" ]")
            console.log(displayText);
            return;
        }        
        if(a[0] instanceof Array){ // a is a matrix
            let displayText="  \n";
            for(let i=0;i<a.length;i++){
                for(let j=0;j<a[0].length;j++){
                    displayText=displayText.concat("  "+a[i][j]+"  ");
                }
                displayText=displayText.concat("\n");
            }
            displayText=displayText.concat("  \n ");
            console.log(displayText);
            return;
        }
    }
    if(a.hasOwnProperty("stride")){ // a is an ndarray
        var show=require("ndarray-show");
        let result=show(a);
        console.log(result);
        return;
    }
    console.log({a});
    
}


var reshape = function(vec,rows,cols){
    if (vec.length==rows*cols && typeof(vec[0])=="number"){
        let mat=[];
        for(let row=0;row<rows;row++){
            let start=row*cols;
            let end=(row+1)*cols;
            mat[row]=vec.slice(start,end)
        }
        return mat;
    }else if(vec.length*vec[0].length==rows*cols){     // for vec of type matrices,  read column by column
        let p=0;
        let mat= new Array(rows).fill(0).map(x=> new Array(cols).fill(0).map(x=>0));
        
        for(let col=0; col<cols; col++){
            for(let row=0; row<rows; row++){
                let vcols=vec[0].length;
                let vrows=vec.length;
                let vcol=Math.floor(p/vrows) ; // current col in v
                let vrow=p%vrows; // current row in v
                mat[row][col]=vec[vrow][vcol];
                p++;
            }
        }
        return mat;
    }
    console.error("cannot perform reshape operation. Check matrix dimensions")
    console.error("vector length: ",vec.length,"  rows: ",rows,"  cols: ", cols )
    return [];
}

var get = function(mat,rrange,crange=':'){
    // array indices in rrange and crange are assumed to start from 1 like in matlab
    // B=A(:,[5,6]) ; B=get(A,':',[5,6]);
    // If mat is an array, converting to a matrix.
    if(typeof(mat[0])=="number"){
        if (!(rrange==':' || typeof(rrange)=="number" || rrange instanceof Array)){ console.error("Get function: Invalid range, range should be ':' or number or array"); return}
        if (rrange==':'){ rrange=range(1,mat.length);   }
        if(typeof(rrange)=="number"){   rrange=[rrange];   } 
        rrange=rrange.map((x,i)=>{if(x<1){return mat.length+x;} return x}); // for negative values like -3 to be considered end-3
        let res=new Array(rrange.length).fill(0);
        for (let index = 0; index < rrange.length; index++) {
            res[index] = mat[rrange[index]-1]; // -1 since rrange array index starts from 1
        }
        return res;
    }
    // If mat is a matrix
    if(typeof(mat[0][0])=="number"){
        if (!(rrange==':' || typeof(rrange)=="number" || rrange instanceof Array)){ console.error("Get function: Invalid row range, should be ':' or number or array"); return}
        if (!(crange==':' || typeof(crange)=="number" || crange instanceof Array)){ console.error("Get function: Invalid col range, should be ':' or number or array"); return}
        // Dealing with all elements
        if (rrange==':'){ rrange=range(1,mat.length);   }
        if (crange==':'){ crange=range(1,mat[0].length);}
        // packing single element indices into an array
        if(typeof(rrange)=="number"){   rrange=[rrange];   } 
        if(typeof(crange)=="number"){   crange=[crange];   }
        // Correcting negative indices
        rrange=rrange.map((x,i)=>{if(x<1){return mat.length+x;} return x}); // for negative values like -3 to be considered end-3
        crange=crange.map((x,i)=>{if(x<1){return mat[0].length+x;} return x}); // x-1 minus one is to use array index starting from 1
        let res=zeros(rrange.length,crange.length);
        for(let ri=0;ri<rrange.length;ri++){
            for(let ci=0;ci<crange.length; ci++){
                res[ri][ci]=mat[rrange[ri]-1][crange[ci]-1]; // -1 is to use array index starting from 1
            }
        }
        return res;
    }
    console.error("get function not defined for this input type")
}

var set = function(mat,rrange=':',crange=':',submat){
    // if mat is an array then rrange is the range and crange is the input
    // array indices in rrange and crange are assumed to start from 1 like in matlab
    if(typeof(mat[0])=="number"){
        // range sanity check
        if (!(rrange==':' || typeof(rrange)=="number" || rrange instanceof Array)){ console.error("Get function: Invalid range, range should be ':' or number or array"); return}
        // dealing with all elements ':'
        if (rrange==':'){ rrange=range(1,rows);   }
        // dealing with number input
        if (typeof(rrange)=="number"){ rrange= [rrange] }
        // dealing with negative numbers : for negative values like -3 to be considered end-3
        rrange=rrange.map((x,i)=>{if(x<1){return mat.length+x;} return x}); 
        if (typeof(crange)=="number"){ // if the input is a number
            for (let index = 0; index < rrange.length; index++) {
                mat[rrange[index]-1]=crange; // here crange is the number
            }
            return mat;
        }
        for (let index = 0; index < rrange.length; index++) {
            mat[rrange[index]-1]=crange[index]; // here crange is the sub array
            return mat;
        }
    }
    // if mat is a matrix
    if(typeof(mat[0][0])=="number"){
        let rows=mat.length;
        let cols=mat[0].length;
        // range sanity check
        if (!(rrange==':' || typeof(rrange)=="number" || rrange instanceof Array)){ console.error("Get function: Invalid row range, should be ':' or number or array"); return}
        if (!(crange==':' || typeof(crange)=="number" || crange instanceof Array)){ console.error("Get function: Invalid col range, should be ':' or number or array"); return}
        // Dealing with all elements colon ':'
        if (rrange==':'){ rrange=range(1,rows);   }
        if (crange==':'){ crange=range(1,cols);   }
        // for input of type get(mat,1,2) to be get(mat,[1],[2])
        if(typeof(rrange)=="number"){   rrange=[rrange];   } 
        if(typeof(crange)=="number"){   crange=[crange];   } 
        // for negative values like -3 to be considered end-3
        rrange=rrange.map((x,i)=>{if(0<=x && x<=rows){ return x};if(x<1 && -rows<=x){return rows+x;}; console.error("get:Index exceeds matrix bounds"); }); 
        crange=crange.map((x,i)=>{if(0<=x && x<=cols){ return x};if(x<1 && -cols<=y){return cols+x;}; console.error("get:Index exceeds matrix bounds"); }); 
        if (typeof(submat)=="number"){
            for(let ri=0;ri<rrange.length;ri++){
                for(let ci=0;ci<crange.length; ci++){
                    mat[rrange[ri]-1][crange[ci]-1]=submat; // -1 is to use array index starting from 1
                }
            }
            return mat;
        }
        // sanity check: submatrix
        if(size(submat,1)!=rrange.length || size(submat,2) !=crange.length){
            console.error("Size of submatrix to be set does agree with input matrix")
        }
        for(let ri=0;ri<rrange.length;ri++){
            for(let ci=0;ci<crange.length; ci++){
                mat[rrange[ri]-1][crange[ci]-1]=submat[ri][ci]; // -1 is to use array index starting from 1
            }
        }
        return mat;
    }
    console.error("Error using get function: First argument must either be an array or a matrix");
    return;
}

var repmat= function(mat,rows,cols){
    let mrows=mat.length;
    let mcols=mat[0].length;
    let res = new Array(mrows*rows).fill(0).map(x=>  new Array(mcols*cols).fill(0).map(x=>0)  );
    res= res.map((resrow,row)=>{ return resrow.map((reselem,col) =>{return mat[row%mrows][col%mcols]}) } );
    return res;
}


var kron= function(X,Y){ // Kronecker tensor product
    let xrows=X.length;
    let xcols=X[0].length;
    // first row
    let resrow=mul(X[0][0],Y);
    for(let col=1; col<xcols; col++){
        resrow=concatRows(resrow,mul(X[0][col],Y));
    }
    let res=resrow;
    // remaining rows
    for(let row=1;row<xrows;row++){
        let resrow=mul(X[row][0],Y); // first col
        for(let col=1; col<xcols; col++){ // remaining cols
            resrow=concatRows(resrow,mul(X[row][col],Y));
        }
        res=concatCols(res,resrow);
    }
    return res;
    // A=[[1,2,3],[2,3,4]];
    // Y=[[1],[1],[1]];
    // display(kron(A,Y)) // verified function
}



var union = function(A,B){
    let  C=A.concat(B);
    C=C.sort((a,b)=>a-b);
    return unique(C);    
}


var unique = function(C){
    if(typeof C == "number"){return C}
    if(C instanceof Array ){
        let uniqueC=[];
        for(let i=0; i<C.length; i++){
            if(!uniqueC.includes(C[i])){
                uniqueC.push(C[i])
            }
        }
        let result = sort(uniqueC)
        return result[0];
    }else{
        console.error("Could not find unique for this input type.")
    }
}

var sparse = function(iK,jK,sK,m,n){
    let K=zeros(m,n);
    if(sK[0] instanceof Array){
        for (let i=0;i<iK.length;i++){
            K[iK[i]-1 ][jK[i] -1 ]=K[iK[i]-1 ][jK[i] -1 ]+sK[i][0]; // the minus ones to consider index starting from 1
        }
        return K;
    }
    else{
        for (let i=0;i<iK.length;i++){
            K[iK[i]-1 ][jK[i] -1 ]=K[iK[i]-1 ][jK[i] -1 ]+sK[i]; // the minus ones to consider index starting from 1
        }
        return K;
    }
}

var colon = function(K){
    let p=0,row=0,col=0;
    let Kcolon=zeros(K.length*K[0].length,1);
    for (let i=0;i<Kcolon.length;i++){
        row=i%K.length;
        col=Math.floor(i/K[0].length);
        Kcolon[i]=[K[row][col]];
    }
    return Kcolon;
}



// END OF BASIC FUNCTIONS





// UNIVERSAL FUNCTIONS ADD, MUL, DIV and SUB, POW

class cx {
    re;
    im;
    constructor(a,b=0,polar=false){
        this.re=a;
        this.im=b;
        if(polar){
            this.re = a*Math.cos(b);
            this.im = a*Math.sin(b);
        }
    }
    add = function(a){
        if(a instanceof Number){a=new cx(a);}
        let r= new cx(0,0);
        r.re=this.re+a.re;
        r.im=this.im+a.im;
        return r;
    }
    sub = function(a){
        if(a instanceof Number){a=new cx(a);}
        let r= new cx(0,0);
        r.re=this.re-a.re;
        r.im=this.im-a.im;
        return r;
    }
    mul = function(a){
        if(a instanceof Number){return new cx(this.re*a,this.im*a)}
        return new cx(this.re*a.re-this.im*a.im,this.re*a.im+this.im*a.re);
    }
    div = function(a){
        if(a instanceof Number){return new cx(this.re/a,this.im/a)}
        let r= new cx(this.re,this.im);
        r=r.mul(a.conj())/a.abs()
        return r;
    }
    conj = function(){
        return new cx(this.re,-this.im);
    }
    abs = function(){
        return Math.sqrt(this.re**2+this.im**2)
        
    }
    angle = function(){
        if (this.re ==0){
            return Math.PI/2*Math.sign(this.im)
        }
        return Math.atan(this.im/this.re)
    }
    inv = function(){
        return this.conj().div(this.abs())
    }
    pow = function(a){
        if(typeof a =="number"){
            return new cx(Math.pow(this.abs(),a),this.angle()*a,polar=true)
        }
        if(a instanceof cx){
            let r = this.abs();
            let theta = this.angle();
            let rpowa = new cx(Math.pow(r,a.re),a.im*Math.log(r),polar=true);
            let expithetapowa = new cx(Math.exp(-a.im*theta),theta*a.re,polar=true)
            return rpowa.mul(expithetapowa)
        }
    }
    
}
var real = z=> z.re
var imag = z=> z.im
var angle = z=> z.angle()
var conj = z=> z.conj()


// UNIVERSAL FUNCTIONS ADD, MUL, DIV and SUB, POW

var add = function(a,b){ // universal add function, not fully supported for ndarray vs complex
    if(typeof(a)=="number"){ // a is number
        if (typeof(b)=="number"){return a+b}; //b is number
        if (b instanceof cx){return b.add(a)}; // b is complex
        if (b instanceof Array){ 
            if(typeof(b[0])=="number"){return b.map(x=>x+a)}; // b is number array
            if(b[0] instanceof cx){ return b.map(x=>x.add(a))}; // b is complex array
            if(b[0] instanceof Array){ return b.map((brow)=>brow.map((bij)=>bij+a))} // b is matrix
        }
        if (b.hasOwnProperty("stride")){let c=pool.zeros(b.shape);ops.adds(c,b,a); return c  }; // b is ndarray
    }
    if(a instanceof cx){ // a is complex
        if (b instanceof Array){return b.map(x=>a.add(x))}; // b is numeric or complex array 
        return a.add(b); // b is number or complex
        // no support for a is complex and b is ndarray 
    }
    if(a instanceof Array){  // a is an array
        if(typeof(a[0])=="number"){ // a is a number array
            if(typeof(b)=="number"){return a.map(x=>x+b);} // b is a number
            if(b instanceof cx){return a.map(x=>b.add(x));} // b is complex
            if(b instanceof Array) { 
                if(typeof(b[0])=="number"){return a.map((x,i)=>x+b[i])};
                if (b[0] instanceof cx) {return b.map((x,i)=>x.add(a[i]));}
            }
        }
        if(a[0] instanceof cx){ // a is a complex array
            if(b instanceof Array) {return a.map((x,i)=>x.add(b[i])); } // b is  array
            return a.map(x=>x.add(b)); //  b is number or complex
        }        
        if(a[0] instanceof Array){ // a is a matrix
            if(typeof(b)=="number"){return a.map(Arow=>Arow.map(Aij=>Aij+b));} // b is a number
            if(b instanceof cx){return a.map(Arow=>Arow.map(Aij=>b.add(Aij)))} // b is complex
            if(b instanceof Array && b[0] instanceof Array){ // b is a matrix
                if(a.length==b.length && a[0].length==b[0].length){ // checking dimensions
                    return a.map((arow,row)=>arow.map((arowcol,col)=>arow[col]+b[row][col]))// a and b are matrices
                }
                else{ console.error("Matrix dimensions must agree"); return [] }
            }
        }
    }
    if(a.hasOwnProperty("stride")){ // a is an ndarray
        if(typeof(b)=="number"){let c=pool.zeros(a.shape); ops.adds(c,a,b); return c;} // b is number
        if(b instanceof cx){let c={re:pool.zeros(a.shape),im:pool.zeros(a.shape)}; ops.adds(c.re,a,b.re);ops.addseq(c.im,b.im); return c;} // b is complex
        if(b instanceof Array){
            if(typeof(b[0])=="number"){let c=pool.zeros(a.shape);ops.add(c,a,new ndarray(b)); return c;} // b is array
            if(b[0] instanceof cx){let c={re:pool.zeros(a.shape),im:new ndarray(b.map(x=>x.im))}; ops.add(c.re,a,new ndarray(b.map(x=>x.re))); return c;} // b is complex
        }
        if(b.hasOwnProperty("stride")){ 
            if (a.size[0]==b.size[0] && a.size[1]==b.size[1]){ console.error("matrix dimensions must agree")};
            let c=pool.zeros(a.shape);ops.add(c,a,b); return a; 
        }
    }
    
    
    console.error("universal add has not been implemented for this use case");
    return "bulb";
    
}


// UNIVERSAL SUBTRACT 
var sub = function(a,b){ 
    if(typeof(a)=="number"){ // a is number
        if (typeof(b)=="number"){return a-b}; //b is number
        if (b instanceof cx){return b.sub(a)}; // b is complex
        if (b instanceof Array){ 
            if(typeof(b[0])=="number"){return b.map(x=>a-x)}; // b is number array
            if(b[0] instanceof cx){ return b.map(x=>x.mul(new cx(-1,0)).add(a))}; // b is complex array
            if(b[0] instanceof Array){ return b.map((brow)=>brow.map((bij)=>a-bij))} // b is matrix
        }
        if (b.hasOwnProperty("stride")){let c=pool.zeros(b.shape);ops.subs(c,b,a); return c }; // b is ndarray
    }
    if(a instanceof cx){ // a is complex
        if (b instanceof Array){return b.map(x=>a.sub(x))}; // b is numeric or complex array 
        return a.sub(b); // b is number or complex
        // no support a is complex and b is ndarray 
    }
    if(a instanceof Array){  // a is an array
        if(typeof(a[0])=="number"){ // a is a number array
            if(typeof(b)=="number"){return a.map(x=>x-b);} // b is a number
            if(b instanceof cx){return a.map(x=>b.mul(new cx(-1,0)).add(x));} // b is complex
            if(b instanceof Array) { 
                if(typeof(b[0])=="number"){return a.map((x,i)=>x-b[i])};
                if (b[0] instanceof cx) {return b.map((x,i)=>x.mul(new cx(-1,0)).add(a[i]));}
            }
        }
        if(a[0] instanceof cx){ // a is a complex array
            if(b instanceof Array) {return a.map((x,i)=>x.sub(b[i])); } // b is  array
            return a.map(x=>x.sub(b)); //  b is number or complex
        }
        if(a[0] instanceof Array){ // a is a matrix
            if(typeof(b)=="number"){return a.map(Arow=>Arow.map(Aij=>Aij-b));} // b is a number
            if(b instanceof cx){return a.map(Arow=>Arow.map(Aij=>Aij.sub(b)))} // b is complex
            if(b instanceof Array && b[0] instanceof Array){ // b is a matrix
                if(a.length==b.length && a[0].length==b[0].length){ // checking dimensions
                    return a.map((arow,row)=>arow.map((arowcol,col)=>arow[col]-b[row][col]))// a and b are matrices
                }
                else{ console.error("Matrix dimensions must agree"); return [] }
            }
        }        
    }
    if(a.hasOwnProperty("stride")){ // a is an ndarray
        if(typeof(b)=="number"){let c=pool.zeros(a.shape); ops.subs(c,a,b); return c;} // b is number
        if(b instanceof cx){let c={re:pool.zeros(a.shape),im:pool.zeros(a.shape)}; ops.subs(c.re,a,b.re);ops.subseq(c.im,b.im); return c;} // b is complex
        if(b instanceof Array){
            if(typeof(b[0])=="number"){let c=pool.zeros(a.shape);ops.sub(c,a,new ndarray(b)); return c;} // b is array
            if(b[0] instanceof cx){let c={re:pool.zeros(a.shape),im:new ndarray(b.map(x=>-x.im))}; ops.sub(c.re,a,new ndarray(b.map(x=>x.re))); return c;} // b is complex
        }                       // careful with the direct assignment of imaginary part of b to c.im
        if(b.hasOwnProperty("stride")){ 
            if (a.size[0]==b.size[0] && a.size[1]==b.size[1]){ console.error("matrix dimensions must agree")};
            let c=pool.zeros(a.shape);ops.sub(c,a,b); return c ;
        }
    }
    console.error("universal sub has not been implemented for this use case");
    return "bulb";
    
}

// UNIVERSAL MULTIPLICATION 

var mul = function(a,b,...args){ 
    if (args.length>0){
        return mul(mul(a,b),...args)
    }
    if(typeof(a)=="number"){ // a is number
        if (typeof(b)=="number"){return a*b}; //b is number
        if (b instanceof cx){return b.mul(a)}; // b is complex
        if (b instanceof Array){ 
            if(typeof(b[0])=="number"){return b.map(x=>a*x)}; // b is number array
            if(b[0] instanceof cx){ return b.map(x=>x.mul(a))}; // b is complex array
            if(b[0] instanceof Array){ return b.map((brow)=>brow.map((bij)=>a*bij))} // b is matrix
        }
        if (b.hasOwnProperty("stride")){let c=pool.ones(b.shape);ops.muls(c,b,a); return c }; // b is ndarray
    }
    if(a instanceof cx){ // a is complex
        if (b instanceof Array){return b.map(x=>a.mul(x))}; // b is numeric or complex array 
        return a.mul(b); // b is number or complex
        // no support a is complex and b is ndarray 
    }
    if(a instanceof Array){  // a is an array
        if(typeof(a[0])=="number"){ // a is a number array
            if(typeof(b)=="number"){return a.map(x=>x*b);} // b is a number
            if(b instanceof cx){return a.map(x=>b.mul(x));} // b is complex
            if(b instanceof Array) { 
                if(typeof(b[0])=="number"){
                    if(b.length==a.length){
                        return a.map((x,i)=>x*b[i])
                    }else if( b.length==1){
                        return a.map((x,i)=>x*b[0])
                    }else if( a.length ==1){
                        return b.map((x,i)=>x*a[0])
                    }else{
                        console.error("array dimensions do not agree") 
                    };
                }
                if (b[0] instanceof cx) {return b.map((x,i)=>x.mul(a[i]));}
            }
        }
        if(a[0] instanceof cx){ // a is a complex array
            if(b instanceof Array) {return a.map((x,i)=>x.mul(b[i])); } // b is  array
            return a.map(x=>x.mul(b)); //  b is number or complex
        }        
        if(a[0] instanceof Array){ // a is a matrix
            if(typeof(b)=="number"){return a.map(Arow=>Arow.map(Aij=>Aij*b));} // b is a number
            if(b instanceof cx){return a.map(Arow=>Arow.map(Aij=>Aij.mul(b)))} // b is complex
            if(b instanceof Array && b[0] instanceof Array){ // b is a matrix
                let c=new Array(a.length).fill(0).map(x=>new Array(b[0].length).fill(0).map(x=>0));
                if(a[0].length==b.length){ // checking dimensions
                    for(let row=0;row<a.length;row++){
                        for(let col=0;col<b[0].length;col++){
                            let cij=0
                            for (let k = 0; k < a[row].length; k++) {
                                cij += a[row][k]*b[k][col];
                            }
                            // display(presum)
                            c[row][col]=cij;
                        }
                    }
                    return c; // matrix multiplication code
                }
                else{ // single element matrices
                    if(a.length==1 && a[0].length==1){
                        return mul(a[0][0],b)
                    }else if(b.length ==1 && b[0].length==1){
                        return mul(b[0][0],a)
                    }else{
                        console.error("Matrix dimensions do not agree"); return []; 
                    }
                }
            }
        }
    }
    if(a.hasOwnProperty("stride")){ // a is an ndarray
        if(typeof(b)=="number"){let c=pool.ones(a.shape); ops.muls(c,a,b); return c;} // b is number
        if(b instanceof cx){let c={re:pool.ones(a.shape),im:pool.ones(a.shape)}; ops.muls(c.re,a,b.re);ops.muls(c.im,a,b.im); return c;} // b is complex
        if(b instanceof Array){
            if(typeof(b[0])=="number"){let c=pool.ones(a.shape);ops.mul(c,a,new ndarray(b)); return c;} // b is array
            if(b[0] instanceof cx){let c={re:new ndarray(b.map(x=>x.re)),im:new ndarray(b.map(x=>x.im))}; ops.muleq(c.re,a); ops.muleq(c.im,a);return c;} // b is complex
        }                       // careful with the direct assignment of imaginary part of b to c.im
        if(b.hasOwnProperty("stride")){ 
            if (a.size[0]==b.size[0] && a.size[1]==b.size[1]){ console.error("matrix dimensions must agree")};
            let c=pool.ones(a.shape);ops.mul(c,a,b); return c;
        }
    }
    console.error("universal multiply has not been implemented for this use case");
    return "bulb";
    
}



// UNIVERSAL DIVISION

var div = function(a,b){ 
    if(typeof(a)=="number"){ // a is number
        if (typeof(b)=="number"){return a*b}; //b is number
        if (b instanceof cx){return b.div(a)}; // b is complex
        if (b instanceof Array){ 
            if(typeof(b[0])=="number"){return b.map(x=>a/x)}; // b is number array
            if(b[0] instanceof cx){ return b.map(x=>x.inv().mul(a))}; // b is complex array
            if(b[0] instanceof Array){ return b.map((brow)=>brow.map((bij)=>a/bij))} // b is matrix
        }
        if (b.hasOwnProperty("stride")){let c=pool.ones(b.shape);ops.divs(c,b,a); return c }; // b is ndarray
    }
    if(a instanceof cx){ // a is complex
        if (b instanceof Array){return b.map(x=>a.div(x))}; // b is numeric or complex array 
        return a.div(b); // b is number or complex
        // no support a is complex and b is ndarray 
    }
    if(a instanceof Array){  // a is an array
        if(typeof(a[0])=="number"){ // a is a number array
            if(typeof(b)=="number"){return a.map(x=>x/b);} // b is a number
            if(b instanceof cx){return a.map(x=>b.inv().mul(x));} // b is complex
            if(b instanceof Array) { 
                if(typeof(b[0])=="number"){return a.map((x,i)=>x/b[i])};
                if (b[0] instanceof cx) {return b.map((x,i)=>x.inv().mul(a[i]));}
            }
        }
        if(a[0] instanceof cx){ // a is a complex array
            if(b instanceof Array) {return a.map((x,i)=>x.div(b[i])); } // b is  array
            return a.map(x=>x.mul(b)); //  b is number or complex
        }
        if(a[0] instanceof Array){ // a is a matrix
            if(typeof(b)=="number"){return a.map(Arow=>Arow.map(Aij=>Aij/b));} // b is a number
            if(b instanceof cx){return a.map(Arow=>Arow.map(Aij=>new cx(Aij,0).div(b)))} // b is complex
            if(b instanceof Array && b[0] instanceof Array){ // b is a matrix
                console.error("Matrix division is not possible"); 
                return []; 
            }
        }        
    }
    if(a.hasOwnProperty("stride")){ // a is an ndarray
        if(typeof(b)=="number"){let c=pool.ones(a.shape); ops.divs(c,a,b); return c;} // b is number
        if(b instanceof cx){let c={re:pool.ones(a.shape),im:pool.ones(a.shape)}; ops.muls(c.re,a,(b.inv()).re);ops.muls(c.im,a,(b.inv()).im); return c;} // b is complex
        if(b instanceof Array){
            if(typeof(b[0])=="number"){let c=pool.ones(a.shape);ops.div(c,a,new ndarray(b)); return c;} // b is array
            if(b[0] instanceof cx){let c={re:new ndarray(b.map(x=>(x.inv()).re)),im:new ndarray(b.map(x=>(x.inv()).im))}; ops.muleq(c.re,a); ops.muleq(c.im,a);return c;} // b is complex
        }                       // careful with the direct assignment of imaginary part of b to c.im
        if(b.hasOwnProperty("stride")){ 
            if (a.size[0]==b.size[0] && a.size[1]==b.size[1]){ console.error("matrix dimensions must agree")};
            let c=pool.ones(a.shape);ops.div(c,a,b); return c;
        }
    }
    console.error("universal div has not been implemented for this use case");
    return "bulb";
    
}

// UNIVERSAL POW

var pow = function(a,b){ // universal add function, not fully supported for ndarray vs complex
    if(typeof(a)=="number"){ // a is number
        if (typeof(b)=="number"){return a**b}; //b is number
        if (b instanceof cx){return (new cx(a,0)).pow(b)}; // b is complex
        if (b instanceof Array){ 
            if(typeof(b[0])=="number"){return b.map(x=>a**x)}; // b is number array
            if(b[0] instanceof cx){ return b.map(x=>(new cx(a,0)).pow(x));}; // b is complex array
            if(b[0] instanceof Array){ return b.map((brow)=>brow.map((bij)=>a**bij))} // b is matrix
        }
        if (b.hasOwnProperty("stride")){let c=new ndarray(b.data.map(x=>a**x)); return c }; // b is ndarray
    }
    if(a instanceof cx){ // a is complex
        if (b instanceof Array){return b.map(x=>a.pow(x))}; // b is numeric or complex array 
        return a.pow(b); // b is number or complex
        // no support a is complex and b is ndarray 
    }
    if(a instanceof Array){  // a is an array
        if(typeof(a[0])=="number"){ // a is a number array
            if(typeof(b)=="number"){return a.map(x=>x**b);} // b is a number
            if(b instanceof cx){return a.map(x=>(new cx(x,0)).pow(b));} // b is complex
            if(b instanceof Array) { 
                if(typeof(b[0])=="number"){return a.map((x,i)=>x**b[i])};
                if (b[0] instanceof cx) {return a.map((x,i)=>(new cx(x,0)).pow(b[i]));}
            }
        }
        if(a[0] instanceof cx){ // a is a complex array
            if(b instanceof Array) {return a.map((x,i)=>x.pow(b[i])); } // b is  array
            return a.map(x=>x.pow(b)); //  b is number or complex
        }        
        if(a[0] instanceof Array){ // a is a matrix
            if(typeof(b)=="number"){return a.map(Arow=>Arow.map(Aij=>Aij**b));} // b is a number
            if(b instanceof cx){return a.map(Arow=>Arow.map(Aij=>(new cx(Aij,0)).pow(b)))} // b is complex
            if(b instanceof Array && b[0] instanceof Array){ // b is a matrix
                if(a.length==b.length && a[0].length==b[0].length){ // checking dimensions
                    return a.map((arow,row)=>arow.map((arowcol,col)=>Math.pow(arow[col],b[row][col])))// a and b are matrices then performs dot pow
                }
                else{ console.error("Matrix dimensions must agree"); return [] }
            }
        }
    }
    if(a.hasOwnProperty("stride")){ // a is an ndarray
        if(typeof(b)=="number"){return new ndarray( a.data.map(x=>x**b) ); } // b is number
        if(b instanceof cx){
            let c={
                re: new ndarray(a.data.map(x=>  ((new cx(x,0)).pow(b)).re ) ),
                im: new ndarray(a.data.map(x=> ((new cx(x,0)).pow(b)).im ) )
            } ;
            return c;
        } // b is complex
        if(b instanceof Array){
            if(typeof(b[0])=="number"){
                let c=new ndarray(   a.data.map((x,i)=> x**b[i])   ); 
                return c;
            } // b is array
            if(b[0] instanceof cx){
                let c={
                    re:new ndarray(a.data.map((x,i)=> ((new cx(x.re,0)).pow(b[i])).re  )  ),
                    im:new ndarray(a.data.map((x,i)=> ((new cx(x.re,0)).pow(b[i])).im  )  ),
                }; 
                return c;
            } // b is complex
        }   // careful with the direct assignment of imaginary part of b to c.im
        if(b.hasOwnProperty("stride")){ 
            if (a.size[0]==b.size[0] && a.size[1]==b.size[1]){ console.error("matrix dimensions must agree"); return "null"};
            return new ndarray(  a.data.map((x,i)=> x**b.data[i])  );
        } // b is complex
    }
    console.error("universal pow has not been implemented for this use case");
    return "bulb";
    
} 



var dotmul = function(A,B){
    if(typeof A == "number" && typeof B == "number" ){ return A*B}
    if(A.length==B.length && A[0].length==B[0].length){
        let C=zeros(size(A))
        for (let row = 0; row < A.length; row++) {
            for (let col = 0; col < A[0].length; col++) {
                C[row][col]=A[row][col]*B[row][col];
                
            }
            
        }
        return C;
    }
    console.error('Matrix dimensions do not agree for dot multiplication')
}


var dotdiv = function(A,B){
    if(A.length==B.length && A[0].length==B[0].length){
        let C=zeros(size(A))
        for (let row = 0; row < A.length; row++) {
            for (let col = 0; col < A[0].length; col++) {
                C[row][col]=A[row][col]/B[row][col];
                
            }
            
        }
        return C;
    }
    console.error('Matrix dimensions do not agree for dot division')
}

var deepcopy = function(A){
    if(A instanceof Array){
        let B=[];
        for (let index = 0; index < A.length; index++) {
            B[index] = deepcopy( A[index]); // recursive copy for all subarrays
        }
        return B;
    }
    else{
        let B=A;
        return B;
    }
}

var copy=deepcopy;
var disp=display;


// LINEAR SOLVE 
var linsolve = function(A,b){
    if(!mldivide){
        console.error("linsolve needs 'ndarray.js' file to be included to work. ")
    }
    b=transpose(b);
    let x= mldivide(transpose(A),b[0]);
    return transpose(x);
}

var all = function(booleans){
    for (let i = 0; i < booleans.length; i++) {
        if(!booleans[i]){
            return false
        }
    }
    return true
}
var any = function(booleans){
    for (let i = 0; i < booleans.length; i++) {
        if(!booleans[i]){
            return true
        }
    }
    return false
}

var map = function(fun,a,...args){// multidimensional map function
    if (args.length==0){ // single input to function
        if(a instanceof Array){
            let result=[];
            for (let i = 0; i < a.length; i++) {
                if(a[i]){
                    result[i]=map(fun,a[i])
                }
            }
            return result
        }else{
            return fun(a)
        }
    }else{// two or more inputs 
        let b, remargs;
        [b, ...remargs]=args // taking the second argument
        let result=[]   
        if (a instanceof Array && b instanceof Array && a.length === b.length){
            for (let i = 0; i < a.length; i++) {
                result[i]=map(fun,a[i],b[i])
            }
        }else if (a instanceof Array){
            for (let i = 0; i < a.length; i++) {
                result[i]=map(fun,a[i],b)
            }
        }else if(b instanceof Array){
            for (let i = 0; i < b.length; i++) {
                result[i]=map(fun,a,b[i])
            }
        }else{
            result =fun(a,b)
        }
        if (remargs.length>0){ // recursive call for for arguments
            result = map(fun,result,...remargs)
        }
        return result
    }
}

var exp = function(A){
    if(typeof(A)=="number"){return Math.exp(A);} // A is a number
    if(A instanceof cx){return new cx(Math.exp(1)).pow(A)}
    if(A instanceof Array){return A.map(x=>exp(x));} // A is an array
    console.error("Cannot find absolute for this input type")
}


