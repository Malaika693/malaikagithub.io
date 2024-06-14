let font /*to load a custom font*/, button /*to enable/disable automatic cube rotation*/;
let rotation = true; //cube's automatic rotation is active

//for the rotation mechanics
let currentAngleX = 0; //current rotation angle around X axis
let currentAngleZ = 0; //current rotation angle around Z axis
//for bg color changing mechanics
let colorChange = 0; //to store the time of the last color change
let colorChangeInterval = 2000; //interval for changing colors (in milliseconds)


function preload() {
  font = loadFont('CabinSketch-Bold.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL); //canvas size takes the size of screen. WEBGL is added to work with 3d shapes
  textFont(font); //set text font to the preloaded
  
  //BUTTON 
  let txt='˚ ༘ Interactೀ⋆｡˚';
  button = createButton(txt);
  button.position(20, 20); //put button at TOP-LEFT of screen
  button.mousePressed(rotateCube); //rotateCube() runs when button is clicked
}

function draw() {
  //ROTATION MECHANICS
  if (rotation) {
    background(0);
    //increase currentAngles by a value
    currentAngleX += 0.01;
    currentAngleZ += 0.01;
    rotateX(currentAngleX);
    rotateZ(currentAngleZ);
  }

  //ENABLE cube interaction when it's NOT rotating
  if (!rotation) {
    orbitControl(); //enable interaction w/ box
  }
  if (!rotation && millis() - colorChange > colorChangeInterval) {
    background(random(255), random(255), random(255)); //change bg color randomly
    colorChange = millis(); //update the time of the last color change
  }
  
  normalMaterial(); //add the color-changing property of the box
  box(250); //create cube
  addText(); //call function to add text to box sides
}

//function to enable/disable cube rotation
function rotateCube() {
  rotation = !rotation;
  //make rotation continue from the angle the user last drags the cube to
  if (!rotation) {
    //store current rotation angles
    currentAngleX = radians(rotationX);
    currentAngleZ = radians(rotationZ);
    txt = '˚ ༘ Rotateೀ⋆｡˚'; //change text when in interaction mode
  } 
  else {
    txt = '˚ ༘ Interactೀ⋆｡˚'; //change text when in rotation mode
  }
  button.html(txt); //updates button text
}

//function to add text on sides of the cube
function addText() {
  //FRONT
  push();
  translate(0, 0, 125);
  textAlign(CENTER);
  textSize(50);
  fill(255);
  text("Welcome", 0, 0);
  pop();

  //TOP
  push();
  translate(0, -125, 0);
  rotateX(-HALF_PI);
  rotateY(PI);
  textAlign(CENTER);
  textSize(50);
  fill(255);
  text("SPA", 0, 0);
  pop();

  //LEFT
  push();
  translate(-125, -80, 0);
  rotateY(-HALF_PI);
  textAlign(CENTER);
  textSize(24);
  fill(255);
  text("by", 0, 0);
  pop();
  
  push();
  translate(-125, -40, 0);
  rotateY(-HALF_PI);
  textAlign(CENTER);
  textSize(24);
  fill(255);
  text("Marwa Noorullah", 0, 0);
  pop();
  
  push();
  translate(-125, -15, 0);
  rotateY(-HALF_PI);
  textAlign(CENTER);
  textSize(24);
  fill(255);
  text("Precyleigh Diokno", 0, 0);
  pop();
  
  push();
  translate(-125, 15, 0);
  rotateY(-HALF_PI);
  textAlign(CENTER);
  textSize(24);
  fill(255);
  text("Malaika Noor", 0, 0);
  pop();
  
  push();
  translate(-125, 40, 0);
  rotateY(-HALF_PI);
  textAlign(CENTER);
  textSize(24);
  fill(255);
  text("Alexa Mabag", 0, 0);
  pop();
  
  push();
  translate(-125, 85, 0);
  rotateY(-HALF_PI);
  textAlign(CENTER);
  textSize(24);
  fill(255);
  text("CC Yr 1 Gr 1", 0, 0);
  pop();

  //RIGHT
  push();
  translate(125, 0, 0);
  rotateX(-HALF_PI);
  rotateY(HALF_PI);
  textAlign(CENTER);
  textSize(50);
  fill(255);
  text("BATH", 0, 0);
  pop();
  
  //BACK
  push();
  translate(0, 0, -125);
  rotateY(PI);
  textAlign(CENTER);
  textSize(40);
  fill(255);
  text("UNIVERSITY", 0, 0);
  pop();
  
  //BOT
  push();
  translate(0, 125, 0);
  rotateX(-HALF_PI);
  textAlign(CENTER);
  textSize(50);
  fill(255);
  text("to", 0, 0);
  pop();
}

//ensures that the canvas takes whatever is the size of the screen
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
