let font;

function preload() {
  // Load a font (Google Fonts link, replace with your preferred font if necessary)
  font = loadFont('https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Bold.otf');
}

function setup() {
  createCanvas(600, 400);
  background(255);
  textFont(font);
  textSize(48);
  textAlign(CENTER, CENTER);
  noLoop(); // Prevent draw from looping
}

function draw() {
  background(255);
  fill(50);

  let message = "Malaika Noor";
  let x = width / 2;
  let y = height / 2;

  // Draw the main text
  text(message, x, y);

  // Apply transformations for effect
  fill(150, 0, 0, 150);
  for (let i = 0; i < 10; i++) {
    push();
    translate(x + random(-5, 5), y + random(-5, 5));
    rotate(random(-0.05, 0.05));
    text(message, 0, 0);
    pop();
  }
}
