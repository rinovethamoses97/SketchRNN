let model;
let penStroke=null;
let x;
let y;
let prevPen=null;
let inputs=[];
let drawing=false;
function preload(){
    model=ml5.sketchRNN("cat");
}
function setup(){
    createCanvas(600,600);
    background(200);
}
function mousePressed(){
    x=mouseX;
    y=mouseY;
    drawing=true;
}
function mouseReleased(){
    drawing=false;
    generateSketch();
}
function generateSketch(){
    model.generate(inputs,gotResult);
}
function gotResult(err,res){
    if(err){
        console.log(err);
    }
    else{
        penStroke=res;
        // console.log(penStroke); 
    }
}
function draw(){
    if(drawing){
        let obj={
            dx:mouseX-pmouseX,
            dy:mouseY-pmouseY,
            pen:"down"
        }
        stroke(0);
        line(x,y,x+obj.dx,y+obj.dy);
        x+=obj.dx;
        y+=obj.dy;
        if(obj.dx!=0 || obj.dy!=0)
            inputs.push(obj);
    }
    if(penStroke!=null){
        stroke(0);
        if(prevPen=="end"){
            noLoop();
            console.log("Donw Drawing");
            return;
        }
        if(prevPen=="down")
            line(x,y,x+penStroke.dx,y+penStroke.dy);
        x+=penStroke.dx;
        y+=penStroke.dy;
        prevPen=penStroke.pen;
        penStroke=null;
        model.generate(gotResult);
    }
}