var state = ""
var num = 0
var objects = []

function preload() {
    video = createVideo("video.mp4")
}

function setup() {
    canvas = createCanvas(800, 600)
    canvas.position(450, 300)
    video.hide()
}

function draw() {
    image(video, 0, 0, 800, 600)
    if (state == true) {
        objectDetector.detect(video, gotResult)
        console.log(objects)
        for(i = 0; i < objects.length; i++) {
            text(objects[i].label + ": " + Math.trunc(objects[i].confidence * 100) + "%", objects[i].x, objects[i].y)
            noFill()
            stroke("red")
            rect(objects[i].x, objects[i].y + 10, objects[i].width, objects[i].height)
        }
    }
}

function modelLoaded() {
    document.getElementById("status").innerHTML = "Detecting Object..."
    video.loop()
    video.speed(1)
    video.volume(0)
    state = true
}

function gotResult(error, result) {
    if (error) {
        console.log("Ur dumb: " + error)
    } else {
        objects = result
        document.getElementById("status").innerHTML = "Objects Detected!"
        document.getElementById("stuff").innerHTML = "Number of objects detected: " + objects.length
    }
}

function start() {
    objectDetector = ml5.objectDetector("cocossd", modelLoaded)
    document.getElementById("status").innerHTML = "Loading..."
}