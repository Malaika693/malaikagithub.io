function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(200);
  
  // Draw car body
  fill(255, 150, 0);
  rect(50, 100, 200, 50);
  rect(100, 70, 100, 30);
  
  // Draw wheels
  fill(0);
  ellipse(100, 150, 50, 50);
  ellipse(200, 150, 50, 50);
  
  // Draw windows
  fill(0, 200, 200);
  rect(100, 70, 90, 30);
  rect(140, 70, 60, 30);
}
