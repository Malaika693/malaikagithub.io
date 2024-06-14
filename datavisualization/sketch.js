
let data = [30, 80, 45, 60, 20, 90, 70]; // Example dataset
let labels = ['A', 'B', 'C', 'D', 'E', 'F', 'G']; // Corresponding labels for the data
let colors = []; // Array to hold colors for each bar

function setup() {
  createCanvas(600, 400);
  background(255);
  noLoop();
  
  // Generate neon colors for each bar
  for (let i = 0; i < data.length; i++) {
    colors.push(color(random(100, 255), random(100, 255), random(100, 255)));
  }
  
  drawBarChart(data, labels, colors);
}

function drawBarChart(data, labels, colors) {
  let maxData = max(data);
  let barWidth = width / data.length;
  
  for (let i = 0; i < data.length; i++) {
    let barHeight = map(data[i], 0, maxData, 0, height - 50);
    
    // Neon effect: increase brightness and saturation
    let neonColor = color(colors[i]);
    neonColor.setRed(red(neonColor) + 50); // Increase red component
    neonColor.setGreen(green(neonColor) + 50); // Increase green component
    neonColor.setBlue(blue(neonColor) + 50); // Increase blue component
    
    fill(neonColor);
    noStroke();
    rect(i * barWidth, height - barHeight - 30, barWidth - 10, barHeight);
    
    // Draw labels
    fill(0);
    textAlign(CENTER);
    text(labels[i], i * barWidth + (barWidth / 2), height - 10);
    
    // Draw values
    fill(50);
    text(data[i], i * barWidth + (barWidth / 2), height - barHeight - 40);
  }
}

// Animation (optional)
function draw() {
  // Uncomment if you want to animate
  // background(255);
  // drawBarChart(data, labels, colors);
}
