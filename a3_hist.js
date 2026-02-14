// Starter code - a2_barchart.js

let table
let visits = []; // Store from csv

// Chart boundaries
let chartTop = 50;
let chartBottom = 400;
let chartLeft = 60;
let chartRight = 1430
let chartWidth = 20;

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

  let numBins = 10;
  let bSize = (maxVal - minVal) / numBins;
  let bins = [];

  for (let i = 0; i < numBins; i++) {
    bins[i] = 0;
  }

  for (let i = 0; i < visits.length; i++) {
    let bIndex = int((visits[i] - minVal) / bSize);
    if (bIndex >= numBins) {
      bIndex = numBins - 1;
    }
    bins[bIndex]++;
  }

  let maxCount = 0;
  for (let i = 0; i < numBins; i++) {
    if (bins[i] > maxCount) maxCount = bins[i];
  }

  // Label y-axes
  fill(0);
  textAlign(RIGHT, CENTER); 
  for (let k = 0; k <= 5; k++) {
    let val = (maxCount / 5) * k;
    let y = map(val, 0, maxCount, chartBottom, chartTop); // https://p5js.org/reference/p5/map/, map() scales val from data range to screen range
    stroke(0); 
    line(chartLeft - 5, y, chartLeft, y);
    noStroke();
    text(int(val), chartLeft - 10, y); //label based on csv
  }

  fill(100, 200, 200); // light turquise
  noStroke();

  // Draw bars
  // Loop through each row in table
  let barWidth = (chartRight - chartLeft) / numBins;
  for (let i = 0; i < numBins; i++) {
    let barH = map(bins[i], 0, maxCount, 0, chartBottom - chartTop);
    rect(chartLeft + i * barWidth, chartBottom - barH, barWidth - 2, barH);

    // uniformly placed marks
    if (i % 5 === 0) { 
      stroke(0);
      line(i * 30 + chartLeft + 10, chartBottom, i * 30 + chartLeft + 10, chartBottom + 10);
      noStroke();
    }

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
  text("Frequency of Visits", 0, 0);

  rotate(PI / 2);
  translate(-15, -(chartTop + chartBottom) / 2); // reset
}