let mic, fft;
let cols, rows;
let particles = [];

function setup() {
  createCanvas(windowWidth, 300);
  background(0);

  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);

  cols = 20; // Number of columns
  rows = 10; // Number of rows

  let particleWidth = width / cols;
  let particleHeight = height / rows;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      particles.push({
        x: i * particleWidth + particleWidth / 2,
        y: j * particleHeight + particleHeight / 2,
        color: color(255),
        size: 10
      });
    }
  }
}

function draw() {
  // Create a dynamic gradient background
  let bgCol1 = color(0, 0, 0);
  let bgCol2 = color(70, 20, 70);
  background(lerpColor(bgCol1, bgCol2, 0.5));

  let spectrum = fft.analyze();

  for (let i = 0; i < particles.length; i++) {
    let particle = particles[i];
    let index = i % spectrum.length;
    let freq = spectrum[index];

    // Update particle properties based on frequency
    particle.color = color(map(freq, 0, 255, 100, 255), map(freq, 0, 255, 100, 200), 255);
    particle.size = map(freq, 0, 255, 5, 20);

    // Draw particles
    noStroke();
    fill(particle.color);
    ellipse(particle.x, particle.y, particle.size, particle.size);
  }
}
