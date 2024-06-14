let trails = [];

function setup() {
  createCanvas(800, 600);
  noStroke();
}

function draw() {
  background(0);

  // Draw all trails
  for (let i = trails.length - 1; i >= 0; i--) {
    let t = trails[i];
    fill(t.color);
    ellipse(t.x, t.y, t.size, t.size);

    // Update the trail properties
    t.size += t.growth;
    t.alpha -= 5;
    t.color.setAlpha(t.alpha);

    // Remove the trail if it's too small or transparent
    if (t.alpha < 0) {
      trails.splice(i, 1);
    }
  }
}

function mouseMoved() {
  let trail = {
    x: mouseX,
    y: mouseY,
    size: random(10, 30),
    growth: random(0.5, 2),
    alpha: 255,
    color: color(random(255), random(255), random(255), 255)
  };
  trails.push(trail);
}
