let table
let values = []

function preload(){
  table = loadTable('us-parks.csv', 'csv', 'header')
}

function setup() {
  createCanvas(800, 500);
  numberOfRows = table.getRowCount();
  numberOfColumns = table.getColumnCount();
}

function draw() {
  background(220); // white

  // Axes
  stroke(0);
  strokeWeight(1); 
  line(50, 400, 750, 400); // x-axis
  line(50, 50, 50, 400); // y-axis

  fill(100, 200, 200); // light turquise

  for (var i = 0; i < numberOfRows; i++) {
    let val = table.getNum(i, 1); // https://p5js.org/reference/p5/p5.Table/

    values[i] = val / 10000; // Scale down to fit canvas

    //draw graph
    rect(i * 30 + 60, 400 - values[i], 20, values[i]);
}

/*source: lecture + https://editor.p5js.org/jsarachan/sketches/ry8TEc_0b*/
