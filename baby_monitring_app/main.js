img = ""
status = ""
object = []
audio=""
function preload() {
    audio = loadSound("alarm.mp3");

}
function setup() {
    canvas = createCanvas(640, 420)
    canvas.center()
    video=createCapture(VIDEO)
    video.size(640,420)
    video.hide()
    object_detector = ml5.objectDetector("cocossd", modelLoaded)
    document.getElementById("status").innerHTML = "status: detecting objects"

}

function modelLoaded() {
    console.log("Model is loaded")
    status = true;
}

function gotResult(error, results) {
    if (error) {
        console.log(error)
    } else {
        console.log(results);
        object = results;
    }
}

function draw() {
    image(video, 0, 0, 640, 420)
    if (status != "person") {
        r=random(255)
        g=random(255)
        b=random(255)
        object_detector.detect(video, gotResult)
        for (i = 0; i < object.length; i++) {
            document.getElementById("status").innerHTML="status:baby is detected"
            audio.stop()
            fill(r,g,b)
            percentage = floor(object[i].confidence * 100)
            text(object[i].label + " " + percentage + "%", object[i].x + 15, object[i].y + 15);
            noFill()
            stroke(r,g,b)
            rect(object[i].x, object[i].y, object[i].width, object[i].height)
        }
        
    }
    else
    {
      
        document.getElementById("status").innerHTML="status:baby is missing"
             audio.play()
    }

}




