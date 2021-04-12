var img;
var detector;

var myVid;
var objectResults = [];

var capturedResults = [];
var correctGuesses = 0;
var totalGuesses = 0;
let button, input, secondButton;

function preload(){
  // img = loadImage("images/dog-and-cat.jpg");
  detector = ml5.objectDetector("cocossd");
}

function setup() {
  button = createButton('MAKE GUESS');
  button.position(0,560);
  button.mousePressed(makeGuess);

  createCanvas(640, 550);
  // img.resize(width, height);
  myVid = createCapture(VIDEO, videoLoaded);
}

function videoLoaded(){
  myVid.size(640, 480);
  myVid.hide();
  detector.detect(myVid, objectsIDed);
}

// callbacks on ml5 functions are error first
function objectsIDed(error, results){
  if(error){
    console.error(error);
  } else {
    // console.log(results);
    objectResults = results;
    // function calling itself is called a recursive function
    detector.detect(myVid, objectsIDed);
  }
}

function draw() {
  background(220);
  image(myVid,0,0);
  for(var i=0; i<objectResults.length; i++){
    var obj = objectResults[i];
    // draw bounding box
    stroke(0,255,0);
    strokeWeight(5);
    noFill();
    rect(obj.x, obj.y, obj.width, obj.height);
    // write object label
    stroke(0);
    textSize(32);
    strokeWeight(1);
    fill(255,0,0);
    text(obj.label, obj.x + 10, obj.y + 10);
  }
  text("Guesses: "+correctGuesses+"/"+totalGuesses,0,520);
}

function makeGuess(){
  capturedResults = objectResults;
  totalGuesses = totalGuesses + capturedResults.length;
  input = createInput();
  input.position(0, 590);
  input.value('How many correct guesses did CoCo make?');
  secondButton = createButton('SUBMIT');
  secondButton.position(0,620);
  secondButton.mousePressed(submit);
}

function submit(){
  if(int(input.value())<=objectResults){
    correctGuesses = correctGuesses + int(input.value());
    input.hide();
    secondButton.hide();
  }
}