let table;
let visits = []; // Store from csv

// Chart boundaries
let chartTop = 50;
let chartBottom = 400;
let chartLeft = 60;
let chartRight = 1430;

function preload(){
  table = loadTable('us-parks.csv', 'csv', 'header');
}

function setup() {
  createCanvas(1450, 500);
  numberOfRows = table.getRowCount();
  numberOfColumns = table.getColumnCount();
  noLoop(); // setup only once
}

function draw() {
  background(220); 

  // Draw axes
  stroke(0);
  strokeWeight(1); 
  line(chartLeft, chartBottom, chartRight + 10, chartBottom); // x-axis
  line(chartLeft, chartTop, chartLeft, chartBottom); // y-axis

  // Find max
  let maxVal = 0;                                         
  for (let i = 0; i < numberOfRows; i++) {                
    let v = table.getNum(i, 1);                            
    visits[i] = v;                                         
    if (v > maxVal) maxVal = v;                            
  }

  // Label y-axes
  fill(0);
  textAlign(RIGHT, CENTER); 
  for (let k = 0; k <= 5; k++) {
    let val = (maxVal / 5) * k;
    let y = map(val, 0, maxVal, chartBottom, chartTop); // https://p5js.org/reference/p5/map/, map() scales val from data range to screen range
    stroke(0); 
    line(chartLeft - 5, y, chartLeft, y);
    noStroke();
    text(nf(val / 1000000, 0, 1) + "M", chartLeft - 10, y); //label based on csv, nf() converts a Number into a String
  }

  fill(100, 200, 200); // light turquoise
  noStroke();

  // grid for better orientation
  stroke(200)
  strokeWeight(0.7);
  for  (let i = 0; i < numberOfRows; i++) {
    if (i % 5 === 0) {
      line(i * 30 + chartLeft + 10, chartTop, i * 30 + chartLeft + 10, chartBottom);
    }
  }

  // Draw dots
  // Loop through each row in table
  for (var i = 0; i < numberOfRows; i++) {

    // dot position
    let dotY = map(visits[i], 0, maxVal, chartBottom, chartTop);
    let dotX = i * 30 + chartLeft + 10;
    
    fill(100, 200, 200);
    circle(dotX, dotY, 10);

    // uniformly placed marks
    if (i % 5 === 0) { 
      stroke(0);
      line(i * 30 + chartLeft + 10, chartBottom, i * 30 + chartLeft + 10, chartBottom + 10);
      noStroke();
    }

    // x-labels
    fill(0);
    textAlign(CENTER);
    text(table.getString(i, 0), i * 30 + chartLeft + 10, chartBottom + 20); // get from column
  }

  // title
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(15);
  text("US National Park Recreation Visits - Dot Plot", 725, 30);

  // name axes
  textSize(12);
  fill(0);
  textAlign(CENTER);
  text("Year", (chartLeft + chartRight) / 2, chartBottom + 40);

  translate(15, (chartTop + chartBottom) / 2); // https://p5js.org/reference/p5/translate/
  rotate(-PI / 2); // https://p5js.org/reference/p5/rotate/
  text("Recreation Visits", 0, 0);

  rotate(PI / 2);
  translate(-15, -(chartTop + chartBottom) / 2); // reset


}