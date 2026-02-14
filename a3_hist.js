// Starter code - a2_barchart.js

let table
let visits = []; // Store from csv

// Chart boundaries
let chartTop = 50;
let chartBottom = 400;
let chartLeft = 60;
let chartRight = 1430

function preload(){
  table = loadTable('us-parks_a3.csv', 'csv', 'header')
}

function setup() {
  createCanvas(1450, 500);
  numberOfRows = table.getRowCount();
  noLoop(); // setup only once
}

function draw() {
  background(220); 

  // Draw axes
  stroke(0);
  strokeWeight(1); 
  line(chartLeft, chartBottom, chartRight + 10, chartBottom);; // x-axis
  line(chartLeft, chartTop, chartLeft, chartBottom); // y-axis

  // Find max and min
  let maxVal = 0;
  let minVal = 100000000;                                       
  for (let i = 0; i < numberOfRows; i++) {                
    let v = table.getNum(i, 4);                            
    visits[i] = v;                                         
    if (v > maxVal) {
      maxVal = v; 
    }
    if (v < minVal) {
      minVal = v; 
    }                      
  }

  // Histogram bins
  let numBins = 10;
  let bSize = (maxVal - minVal) / numBins;
  let bins = []; // bin counts
  for (let i = 0; i < numBins; i++) { // initialize
    bins[i] = 0;
  }

  for (let i = 0; i < visits.length; i++) {
    let bIndex = int((visits[i] - minVal) / bSize); // which bin?

    // out of bounds
    if (bIndex >= numBins) {
      bIndex = numBins - 1;
    }
    bins[bIndex]++;
  }

  // find bin with highest value
  let maxFreq = 0;
  for (let i = 0; i < numBins; i++) {
    if (bins[i] > maxFreq) maxFreq = bins[i];
  }

  // Label y-axes
  fill(0);
  textAlign(RIGHT, CENTER);

  for (let k = 0; k <= 5; k++) {
    // adjust to percentage ratio
    let val = (maxFreq / 5) * k;
    let y = map(val, 0, maxFreq, chartBottom, chartTop); // https://p5js.org/reference/p5/map/

    stroke(0); 
    line(chartLeft - 5, y, chartLeft, y);
    noStroke();
    text(int(val), chartLeft - 10, y); // count number of each percentage
  }

  fill(100, 200, 200); // light turquise
  noStroke();


  let barWidth = (chartRight - chartLeft) / numBins;

  // grid
  stroke(200);
  strokeWeight(0.5);
  for (let k = 0; k <= 5; k++) {
    let v = (maxFreq / 5) * k;
    // y-coordinate
    let y = map(v, 0, maxFreq, chartBottom, chartTop);
    line(chartLeft, y, chartRight, y);
  }

  for (let i = 0; i <= numBins; i++) {
    // x-coordinate
    let x = chartLeft + i * barWidth;
    line(x, chartTop, x, chartBottom);
  }

  // Draw bars
  for (let i = 0; i < numBins; i++) {
    let barH = map(bins[i], 0, maxFreq, 0, chartBottom - chartTop);
    rect(chartLeft + i * barWidth, chartBottom - barH, barWidth - 2, barH);

    /// uniformly placed marks
    stroke(0);
    line(chartLeft + i * barWidth, chartBottom, chartLeft + i * barWidth, chartBottom + 10);
    noStroke();

    // x-labels
    fill(0);
    textAlign(CENTER);
    let binStart = minVal + i * bSize;
    text(nf(binStart / 1000000, 0, 1) + "M", chartLeft + i * barWidth + barWidth/2, chartBottom + 20); // nf() Converts a Number into a String, https://p5js.org/reference/p5/nf/
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
  text("Recreation Visits", (chartLeft + chartRight) / 2, chartBottom + 40);

  translate(15, (chartTop + chartBottom) / 2); // https://p5js.org/reference/p5/translate/
  rotate(-PI / 2); // https://p5js.org/reference/p5/rotate/
  text("Frequency", 0, 0);

  rotate(PI / 2);
  translate(-15, -(chartTop + chartBottom) / 2); // reset
}