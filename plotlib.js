// Javascript mini plotting library
// Vivek T R
// updated:2022 February 2
// MIT license 2.0

// global objects: PLOT_GLOBAL_CONTROLS
// functions: gcf, figure, plot, colormap, closeall

const PLOT_GLOBAL_CONTROLS={
    noOfFigures: 0,
    gcf: 0,
    fontSize: 10,
    lineWidth: 1,
    figureCanvasIds: [],
    figureHandles: [],
    colors: ['blue','red','green', 'cyan', 'black','teal','maroon','magenta'],
    markers: [ 'none','x','o','.','*','square', 'diamond','>','<','^'],
    lineStyles: [ '-','--','none','-.']
}

const gcf = function(){ // get current figure no
    if(PLOT_GLOBAL_CONTROLS.gcf == 0){
        figure(1)
    }
    let canvasId = PLOT_GLOBAL_CONTROLS.figureCanvasIds[PLOT_GLOBAL_CONTROLS.gcf-1];
    let canvas = document.getElementById(canvasId)
    PLOT_GLOBAL_CONTROLS.c = canvas.getContext('2d');
    let figureNo = PLOT_GLOBAL_CONTROLS.gcf;
    // console.log({canvasId: canvasId, figureNo:figureNo })
    return figureNo;
}

const figure = function(figureNo = null,parentElementId = null){
    // DIFFERENT CASES
    // No input
    if (figureNo == null){ 
        PLOT_GLOBAL_CONTROLS.noOfFigures+=1;
        figureNo = PLOT_GLOBAL_CONTROLS.noOfFigures
        let figureId = 'Figure'+ figureNo;
        createNewCanvas(figureId,parentElementId)
        updateGCF(figureNo,figureId)
        
        return figureId;
    }
    // Number
    if(typeof figureNo =="number"){ // fetching the handle of an existing figure canvas
        let figureId =PLOT_GLOBAL_CONTROLS.figureCanvasIds[figureNo-1];
        if (typeof figureId =="undefined"){ 
            figureId = 'Figure'+figureNo
            createNewCanvas(figureId,parentElementId);
        }
        updateGCF(figureNo,figureId)
        return figureId;
    }
    // String
    if(typeof figureNo == 'string'){
        let figureId = figureNo;
        let figureIndex = PLOT_GLOBAL_CONTROLS.figureCanvasIds.indexOf(figureId); // location of the current figure elem Id
        if (figureIndex == -1){ // No matches found:= create new canvas with first non empty figure no
            let canvas = document.getElementById(figureId);
            if (canvas ==null){

                createNewCanvas(figureId,parentElementId)
            }
            let index=0;
            while(index<100){
                if (typeof PLOT_GLOBAL_CONTROLS.figureCanvasIds[index] =="undefined"){
                    break;
                }
                index+=1;
            }
            figureNo = index+1; // first non empty figure

        } else{

            figureNo = figureIndex+1;
        }
        updateGCF(figureNo,figureId)
        PLOT_GLOBAL_CONTROLS.noOfFigures=PLOT_GLOBAL_CONTROLS.figureCanvasIds.length;

        return figureId
        
    }
    
    
    function createNewCanvas(newCanvasId,parentElementId){
        // Determining parent Element: either given or body
        let parentElement
        if(parentElementId == null){
            parentElement = document.querySelector('body') 
        }
        else{
            parentElement = document.getElementById(parentElementId)
        }
        let canvas = document.createElement("canvas"); // creating new canvas
        canvas.style='border:1px solid black';
        canvas.id = newCanvasId;
        parentElement.appendChild(canvas);
        console.log('Creating new figure canvas with id ',newCanvasId)
    }


    function updateGCF(figureNo,canvasId){
        PLOT_GLOBAL_CONTROLS.gcf=figureNo;
        PLOT_GLOBAL_CONTROLS.figureCanvasIds[figureNo-1] = canvasId;
        
    }
    
}

const plot = function(x,y,...args) {
    let figureNo = gcf();
    let canvasId = PLOT_GLOBAL_CONTROLS.figureCanvasIds[figureNo-1]
    let figure = new Figure(canvasId);
    let line = new Line(x,y);
    if (figure.hold){
        figure.append(line)
    }
    else{
        figure.lines=[];
        figure.lines[0]=line;
    }
    if(args!=null){
        args.forEach((argument,index) =>{
            switch (argument) {
                case 'linewidth':
                    figure.lineWidth = args[index+1]
                    break;
                case 'padding':
                    figure.padding = args[index+1]
                    break;
                case 'xscale':
                    figure.xscale = args[index+1]
                    break;
                case 'yscale':
                    figure.yscale = args[index+1]
                    break;
                case 'title':
                    figure.title = args[index+1]
                    break;
            
                default:
                    break;
            }

        })
    figure.draw()

    }




    return figure;    
}

class Figure{
    constructor(canvasId){ // creating new canvas figure
        this.canvasId = canvasId;
        this.figureNo=PLOT_GLOBAL_CONTROLS.figureCanvasIds.indexOf(canvasId)+1;
        this.lines=[];
        this.xlim = [0, 1];
        this.ylim = [0, 1];
        function convertRemToPixels(rem) {    
            return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
        }
        this.padding = convertRemToPixels(3);
        this.fontSize = convertRemToPixels(1);
        let canvaselem = document.getElementById(canvasId);
        if(canvaselem ==null){console.error('No such canvas exists in DOM')}
        canvaselem.width =  canvaselem.clientWidth 
        canvaselem.height = canvaselem.clientHeight
        this.parentElement = canvaselem.parentElement.id;
        this.c = canvaselem.getContext('2d')
        this.width = canvaselem.width;
        this.height = canvaselem.height;
        this.lineWidth = 2;
        this.hold = false;
        this.xscale='linear';
        this.yscale='linear';
        this.xlabel='x';
        this.ylabel='y';
        this.title='';
    }

    append(line){
        line.color = PLOT_GLOBAL_CONTROLS.colors[this.lines.length];
        this.lines.push(line);
    }

    clf(){
        this.c.clearRect(0,0,this.width,this.height)
    }

    draw(){
        this.clf()
        this.axisUpdate()
        this.drawAxes()
        this.lines.forEach(line => this.drawLine(line));
    }
    axisUpdate(){
        let xLowerLimit = this.xlim[0];
        let xUpperLimit = this.xlim[1];
        let yLowerLimit = this.ylim[0];
        let yUpperLimit = this.ylim[1];
        this.lines.forEach(({x,y},i)=>{
            if (i==0){
                xLowerLimit = min(x);
                xUpperLimit = max(x);
                yLowerLimit = min(y);
                yUpperLimit = max(y);
            }
            else{
            xLowerLimit = min(xLowerLimit, min(x));
            xUpperLimit = max(xUpperLimit, max(x));
            yLowerLimit = min(yLowerLimit, min(y));
            yUpperLimit = max(yUpperLimit, max(y));
            }
        })
        this.xlim[0] = xLowerLimit;
        this.xlim[1] = xUpperLimit;
        this.ylim[0] = yLowerLimit;
        this.ylim[1] = yUpperLimit;
    }
    axisExtend(){
        let xLowerLimit = this.xlim[0];
        let xUpperLimit = this.xlim[1];
        let yLowerLimit = this.ylim[0];
        let yUpperLimit = this.ylim[1];
        this.lines.forEach(({x,y})=>{
            xLowerLimit = min(xLowerLimit, min(x));
            xUpperLimit = max(xUpperLimit, max(x));
            yLowerLimit = min(yLowerLimit, min(y));
            yUpperLimit = max(yUpperLimit, max(y));
        })
        this.xlim[0] = xLowerLimit;
        this.xlim[1] = xUpperLimit;
        this.ylim[0] = yLowerLimit;
        this.ylim[1] = yUpperLimit;
    }

    drawAxes(){
        // Draws the axes
        let fontSizePx=this.fontSize; 
        let c=this.c;
        let xlim = this.xlim;
        let ylim = this.ylim;


        c.font = fontSizePx+ 'px Arial';
        c.fillStyle='#000000' ;
        c.textAlign='center';
        c.strokeStyle = '#333';
        c.lineWidth = this.lineWidth;
        
        // box
        c.beginPath();
        c.moveTo(this.xtoPx(xlim[0]),this.ytoPx(ylim[0]));
        c.lineTo(this.xtoPx(xlim[1]),this.ytoPx(ylim[0]));
        c.lineTo(this.xtoPx(xlim[1]),this.ytoPx(ylim[1]));
        c.lineTo(this.xtoPx(xlim[0]),this.ytoPx(ylim[1]));
        c.lineTo(this.xtoPx(xlim[0]),this.ytoPx(ylim[0]));
        c.stroke();     
        
        // x Ticks
        let xspan = xlim[1] - xlim[0];
        let yspan = ylim[1] - ylim[0];
        let noOfxTicks = Math.max(2,Math.round((this.width-2*this.padding)/(5*this.fontSize)))
        let xTicks=range(xlim[0],xspan/noOfxTicks,xlim[1])
        if(this.xscale == 'log'){
            xTicks=logspace(xlim[0],xlim[1],noOfxTicks)
        }
        for (let i = 0; i < xTicks.length; i++) {
            let xvalue = xTicks[i];
            c.moveTo( this.xtoPx(xvalue),this.ytoPx(ylim[0])+.01*this.height) ;
            c.lineTo( this.xtoPx(xvalue),this.ytoPx(ylim[0])-.01*this.height );
            c.fillText(xvalue.toPrecision(4), this.xtoPx(xvalue),this.ytoPx(ylim[0])+.01*this.height+fontSizePx );
            c.stroke();
            
        }
        
        // y Ticks
        let noOfyTicks = Math.max(2,Math.round((this.height-2*this.padding)/(5*this.fontSize)))
        let yTicks=range(ylim[0],yspan/noOfyTicks,ylim[1])
        if(this.yscale == 'log'){
            yTicks=logspace(ylim[0],ylim[1],noOfyTicks)
        }
        for (let i = 0; i < yTicks.length; i++) {
            let yvalue = yTicks[i];
            c.moveTo( this.xtoPx(xlim[0])+.01*this.width,this.ytoPx( yvalue)) ;
            c.lineTo( this.xtoPx(xlim[0])-.01*this.width,this.ytoPx( yvalue) );
            c.fillText(yvalue.toPrecision(4), this.xtoPx(xlim[0])-.01*this.width-fontSizePx, this.ytoPx(yvalue),);
            
        }
        c.stroke();
    }

    xtoPx(xvalue){
        let xlim = this.xlim;
        let paddingPx = this.padding;
        if( this.xscale == 'log'){
            return (Math.log(xvalue) - Math.log(xlim[0]))/(Math.log(xlim[1])-Math.log(xlim[0]))*(this.width-2*paddingPx)+paddingPx
        }
        return (xvalue - xlim[0])/(xlim[1]-xlim[0])*(this.width-2*paddingPx)+paddingPx
    }
    
    ytoPx(yvalue){
        let ylim = this.ylim;
        let paddingPx = this.padding;
        if( this.yscale == 'log'){
            return this.height -((Math.log(yvalue) - Math.log(ylim[0]))/(Math.log(ylim[1])-Math.log(ylim[0]))*(this.height-2*paddingPx)+paddingPx)
        }
        return this.height -((yvalue - ylim[0])/(ylim[1]-ylim[0])*(this.height-2*paddingPx)+paddingPx)
    }

    drawLine(line){
        let c = this.c;
        let x = line.x;
        let y = line.y;

        let  colorCode= line.color// "rgba("+color[0]+ "," +color[1]+","+ color[2]+",0.8)";
        c.strokeStyle= colorCode//"rgb(200,200,200)"; // from color value
        c.beginPath()
        c.moveTo(this.xtoPx(x[0]), this.ytoPx(y[0]))
        for (let index = 0; index <= x.length; index++) {
            c.lineTo(this.xtoPx(x[index]), this.ytoPx(y[index]));
        }
        c.stroke();
    }
    
    drawCircle(cx,cy,r,color){
        let c = this.c;
        let  colorCode="rgba("+color[0]+ "," +color[1]+","+ color[2]+",0.8)";
        c.strokeStyle= colorCode//"rgb(200,200,200)"; // from color value
        c.beginPath()
        c.moveTo(this.xtoPx(cx+r*Math.cos(0)), this.ytoPx(cx+r*Math.sin(0)))
        for (let theta = 0; theta <= Math.PI*2; theta=theta+0.01*Math.PI) {
            c.lineTo(this.xtoPx(cx+r*Math.cos(theta)), this.ytoPx(cy+r*Math.sin(theta)));
        }
    
        c.stroke();
    }
    
}

class Line{
    constructor(x,y){
        this.x=x;
        this.y=y;
        this.displayName='data';
        this.color = 'black';
        this.lineWidth = 2;
        this.handleVisibility = true;
    }
}



function closeall(){
    PLOT_GLOBAL_CONTROLS.figureCanvasIds.forEach((canvasid)=>{
        let canvas = document.getElementById(canvasid);
        console.log(canvas)
        if(canvas != null){ // if canvas exists
            canvas.parentElement.removeChild(canvas); //  remove canvas
        }
    })
    PLOT_GLOBAL_CONTROLS.noOfFigures   = 0
    PLOT_GLOBAL_CONTROLS.gcf   = -1
    PLOT_GLOBAL_CONTROLS.figureCanvasIds   = []
    return 0;
}

// COLORMAPS
PLOT_GLOBAL_CONTROLS.colormap=[
    [   0,     0,   143],
    [   0,     0,   159],
    [   0,     0,   175],
    [   0,     0,   191],
    [   0,     0,   207],
    [   0,     0,   223],
    [   0,     0,   239],
    [   0,     0,   255],
    [   0,    16,   255],
    [   0,    32,   255],
    [   0,    48,   255],
    [   0,    64,   255],
    [   0,    80,   255],
    [   0,    96,   255],
    [   0,   112,   255],
    [   0,   128,   255],
    [   0,   143,   255],
    [   0,   159,   255],
    [   0,   175,   255],
    [   0,   191,   255],
    [   0,   207,   255],
    [   0,   223,   255],
    [   0,   239,   255],
    [   0,   255,   255],
    [  16,   255,   239],
    [  32,   255,   223],
    [  48,   255,   207],
    [  64,   255,   191],
    [  80,   255,   175],
    [  96,   255,   159],
    [ 112,   255,   143],
    [ 128,   255,   128],
    [ 143,   255,   112],
    [ 159,   255,    96],
    [ 175,   255,    80],
    [ 191,   255,    64],
    [ 207,   255,    48],
    [ 223,   255,    32],
    [ 239,   255,    16],
    [ 255,   255,     0],
    [ 255,   239,     0],
    [ 255,   223,     0],
    [ 255,   207,     0],
    [ 255,   191,     0],
    [ 255,   175,     0],
    [ 255,   159,     0],
    [ 255,   143,     0],
    [ 255,   128,     0],
    [ 255,   112,     0],
    [ 255,    96,     0],
    [ 255,    80,     0],
    [ 255,    64,     0],
    [ 255,    48,     0],
    [ 255,    32,     0],
    [ 255,    16,     0],
    [ 255,     0,     0],
    [ 239,     0,     0],
    [ 223,     0,     0],
    [ 207,     0,     0],
    [ 191,     0,     0],
    [ 175,     0,     0],
    [ 159,     0,     0],
    [ 143,     0,     0],
    [ 128,     0,     0]
]
