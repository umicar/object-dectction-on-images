img = "";
status = "";
object=[];
function preload() {
    img = loadImage("bed.jpg");
}

function setup() {
    canvas = createCanvas(600, 400);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
    console.log("Model Loaded");
    status=true;
    objectDetector.detect(img,gotResult);
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        object=results;
    }
}

function back(){
    window.location="index.html";
}

function draw() {
    image(img, 0, 0, 600, 400);
    if (status != "") {
        objectDetector.detect(img, gotResult);
        for (i = 0; i < object.length; i++) {
            document.getElementById("status").innerHTML = "Status :  Objects Detected";
            //document.getElementById("object").innerHTML = "Number 0f Objects Detected are " + object.length;
            fill("red");
            stroke("red");
            noFill();
            percent = floor(object[i].confidence * 100);
            text(object[i].label + "" + percent + "%",  object[i].x + 15, object[i].y + 15);
            rect(object[i].x +50, object[i].y, object[i].width +125, object[i].height +125);
        }
    }

}
