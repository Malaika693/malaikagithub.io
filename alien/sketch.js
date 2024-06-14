function setup() {
  createCanvas(400, 400);
  background(0);
}

function draw() {
  // set the drawing stle
  strokeWeight(2);
  stroke(255)
  fill(300, 150, 40);
  // move the origin to the center of the canvas 
  translate(width / 2, height / 2);
  
  // Draw the body
  beginShape();
  curveVertex(-50, -100);
  curveVertex(-50, -100);
  curveVertex(-30, 0);
  curveVertex(30, 0);
  curveVertex(50, -100);
  curveVertex(50, -100);
  endShape(CLOSE)
  
  // Draw the head
  fill(20, 200, 150);
  ellipse(0, -120, 100, 80);
  
  // Draw the left eye
  fill(17);
  ellipse(-25, -140, 20, 20);
  
  // Draw the right eye
  ellipse(25, -140, 20, 20);
  
  // Draw the mouth
  noFill();
  stroke(255, 0, 0);
  beginShape();
  vertex(-20, -110);
  bezierVertex(-10, -100, 10, -100, 20, -110);
  endShape();
  
  // Draw the antenna 
  fill(-100, -250, 70);
  ellipse(0, -160, 10, 40);
  ellipse(0, -180, 20, 20);
}
