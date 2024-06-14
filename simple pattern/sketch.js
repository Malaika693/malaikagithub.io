function setup() {
  createCanvas(400, 400);
  noLoop(); // Prevent draw from looping
}

function draw() {
  background(255);
  let cols = 10; // Number of columns
  let rows = 10; // Number of rows
  let margin = 20; // Margin around the grid
  let spacing = (width - 2 * margin) / cols; // Spacing between rectangles

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = margin + i * spacing;
      let y = margin + j * spacing;
      let size = spacing; // Size of the rectangles

      if ((i + j) % 2 == 0) {
        fill(0); // Black fill for even sum of indices
      } else {
        fill(255); // White fill for odd sum of indices
      }
      rect(x, y, size, size);

      // Add diagonal stripes
      stroke(200);
      strokeWeight(2);
      for (let k = 0; k < size; k += 10) {
        line(x + k, y, x, y + k);
        line(x + size - k, y + size, x + size, y + size - k);
      }
    }
  }
}
