let table
let values = [];

let chartTop = 50;
let chartBottom = 400;
let chartLeft = 60;
let chartRight = 1430
let chartWidth = 20;

function preload(){
  table = loadTable('us-parks.csv', 'csv', 'header')
}

function setup() {
  createCanvas(1450, 500);
  numberOfRows = table.getRowCount();
  numberOfColumns = table.getColumnCount();
  noLoop(); // setup only once
}

function draw() {
  background(220); 

  // Axes
  stroke(0);
  strokeWeight(1); 
  line(chartLeft, chartBottom, chartRight, chartBottom);; // x-axis
  line(chartLeft, chartTop, chartLeft, chartBottom); // y-axis

  // Find max
  let maxVal = 0;                                         
  for (let i = 0; i < numberOfRows; i++) {                
    let v = table.getNum(i, 1);                            
    values[i] = v;                                         
    if (v > maxVal) maxVal = v;                            
  }

  // label y-axes
  fill(0);
  textAlign(RIGHT, CENTER); 
  for (let k = 0; k <= 5; k++) {
    let val = (maxVal / 5) * k;
    let y = map(val, 0, maxVal, chartBottom, chartTop); // https://p5js.org/reference/p5/map/
    stroke(0); 
    line(chartLeft - 5, y, chartLeft, y);
    noStroke();
    text(nf(val / 1000000, 0, 1) + "M", chartLeft - 10, y); //label based on csv
  }

  fill(100, 200, 200); // light turquise
  noStroke();

  // Draw bars
  // Loop through each row in table
  for (var i = 0; i < numberOfRows; i++) {
    //draw graph
    let barH = map(values[i], 0, maxVal, 0, chartBottom - chartTop);
    rect(i * 30 + 60, chartBottom - barH, 20, barH);

    // x-labels
    fill(0);
    textAlign(CENTER);
    text(table.getString(i, 0), i * 30 + chartLeft, chartBottom + 20);
    fill(100, 200, 200);
  }

  // title
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(15);
  text("US National Park Recreation Visits", 725, 30);

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

/*source: lecture + https://editor.p5js.org/jsarachan/sketches/ry8TEc_0b*/
