let table
let visits = []; // Store from csv

// Chart boundaries
let chartTop = 50;
let chartBottom = 400;
let chartLeft = 200;
let chartRight = 400
let chartWidth = 40;

function preload(){
  table = loadTable('us-parks_a3.csv', 'csv', 'header')
}

function setup() {
  createCanvas(600, 500);
  numberOfRows = table.getRowCount();
  numberOfColumns = table.getColumnCount();
  noLoop(); // setup only once
}

function draw() {
  background(220); 

  // Draw axes
  stroke(0);
  strokeWeight(1); 
  line(chartLeft, chartTop, chartLeft, chartBottom); // y-axis

  // Load visits
  for (let i = 0; i < numberOfRows; i++) {                
    let v = table.getNum(i, 4);                         
    visits[i] = v;
  }

  visits = sort(visits); // https://p5js.org/reference/p5/sort/

  // Get Median
  let median;
  if (visits.length % 2 == 0) {
    median = (visits[visits.length / 2 - 1] + visits[visits.length / 2]) / 2;
  } else {
    median = visits[int(visits.length / 2)];
  }

  let l = visits.length;
  let Q1;
  let half = int(l / 2);
  if (half % 2 == 0) {
    Q1 = (visits[half / 2 - 1] + visits[half / 2]) / 2;
  } else {
    Q1 = visits[int(half / 2)];
  }

  let Q3;
  let upperS = half;
  if (l % 2 != 0) {
    upperS = upperS + 1;
  }

  let upperLen = l - upperS;
   if (upperLen % 2 == 0) {
     Q3 = (visits[upperS + upperLen / 2 - 1] + visits[upperS + upperLen / 2]) / 2;
   } else {
     Q3 = visits[upperS + int(upperLen / 2)];
   }

  let iqr = Q3 - Q1;
  let lowerLim = Q1 - 1.5 * iqr;
  let upperLim = Q3 + 1.5 * iqr;

  // Min and max
  let min = visits[0];
  let max = visits[l - 1];
  for (let i = 0; i < l; i++) {
    if (visits[i] >= lowerLim) {
      min = visits[i];
      break;
    }
  }
  for (let i = l - 1; i >= 0; i--) {
    if (visits[i] <= upperLim) {
      max = visits[i];
      break;
    }
  }

  let maxScale = visits[l - 1];

  // Label y-axes
  fill(0);
  noStroke();
  textAlign(RIGHT, CENTER); 
  for (let k = 0; k <= 5; k++) {
    let val = (maxScale / 5) * k;
    let y = map(val, 0, maxScale, chartBottom, chartTop); // https://p5js.org/reference/p5/map/, map() scales val from data range to screen range
    stroke(0); 
    line(chartLeft - 5, y, chartLeft, y);
    noStroke();
    text(nf(val / 1000000, 0, 1) + "M", chartLeft - 10, y); //label based on csv, nf() converts a Number into a String
  }

  let minY = map(min, 0, maxScale, chartBottom, chartTop);
  let Q1Y = map(Q1, 0, maxScale, chartBottom, chartTop);
  let medianY = map(median, 0, maxScale, chartBottom, chartTop);
  let Q3Y = map(Q3, 0, maxScale, chartBottom, chartTop);
  let maxY = map(max, 0, maxScale, chartBottom, chartTop);
  let bCenter= chartLeft + (chartRight - chartLeft) / 2; // map from median

  // Draw Chart
  stroke(0);
  strokeWeight(1);
  line(bCenter, minY, bCenter, Q1Y); 
  line(bCenter, Q3Y, bCenter, maxY); 
  line(chartLeft + 20, minY, chartRight - 20, minY); 
  line(chartLeft + 20, maxY, chartRight - 20, maxY); 

  fill(100, 200, 200); // light turquise
  stroke(0);
  rect(chartLeft, Q3Y, chartRight - chartLeft, Q1Y - Q3Y);

  // Median line
  stroke(255, 0, 0);
  strokeWeight(3);
  line(chartLeft, medianY, chartRight, medianY);

  // labels
  fill(0);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(10);
  text("Max: " + nf(max / 1000000, 0, 1) + "M", chartRight + 10, maxY);
  text("Q3: " + nf(Q3 / 1000000, 0, 1) + "M", chartRight + 10, Q3Y);
  text("Median: " + nf(median / 1000000, 0, 1) + "M", chartRight + 10, medianY);
  text("Q1: " + nf(Q1 / 1000000, 0, 1) + "M", chartRight + 10, Q1Y);
  text("Min: " + nf(min / 1000000, 0, 1) + "M", chartRight + 10, minY);

  // title
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(15);
  text("US National Park Recreation Visits", 300, 30);

  // name axes
  textSize(12);
  fill(0);
  textAlign(CENTER);

  translate(15, (chartTop + chartBottom) / 2); // https://p5js.org/reference/p5/translate/
  rotate(-PI / 2); // https://p5js.org/reference/p5/rotate/
  text("Recreation Visits", 0, 0);

  rotate(PI / 2);
  translate(-15, -(chartTop + chartBottom) / 2); // reset
}