let table
let scores = []; // Store from csv

// Chart boundaries
let chartTop = 50;
let chartBottom = 400;
let chartLeft = 200;
let chartRight = 400
let chartWidth = 40;

function preload(){
  table = loadTable('Smartphone.csv', 'csv', 'header')
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

  // Load scores
  for (let i = 0; i < numberOfRows; i++) {                
    let v = table.getNum(i, 7);                         
    scores[i] = v;
  }

  scores = sort(scores); // https://p5js.org/reference/p5/sort/

  // Get Median
  let median;
  if (scores.length % 2 == 0) {
    median = (scores[scores.length / 2 - 1] + scores[scores.length / 2]) / 2;
  } else {
    median = scores[int(scores.length / 2)];
  }

  let l = scores.length;
  let Q1;
  let half = int(l / 2);
  if (half % 2 == 0) {
    Q1 = (scores[half / 2 - 1] + scores[half / 2]) / 2;
  } else {
    Q1 = scores[int(half / 2)];
  }

  let Q3;
  let upperS = half;
  if (l % 2 != 0) {
    upperS = upperS + 1;
  }

  let upperLen = l - upperS;
   if (upperLen % 2 == 0) {
     Q3 = (scores[upperS + upperLen / 2 - 1] + scores[upperS + upperLen / 2]) / 2;
   } else {
     Q3 = scores[upperS + int(upperLen / 2)];
   }

  let iqr = Q3 - Q1;
  let lowerLim = Q1 - 1.5 * iqr;
  let upperLim = Q3 + 1.5 * iqr;

  // Min and max
  let min = scores[0];
  let max = scores[l - 1];
  for (let i = 0; i < l; i++) {
    if (scores[i] >= lowerLim) {
      min = scores[i];
      break;
    }
  }
  for (let i = l - 1; i >= 0; i--) {
    if (scores[i] <= upperLim) {
      max = scores[i];
      break;
    }
  }

  let maxScale = scores[l - 1];

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
    text(nf(val, 0, 1), chartLeft - 10, y); //label based on csv, nf() converts a Number into a String
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
  text("Max: " + nf(max, 0, 1), chartRight + 10, maxY); 
  text("Q3: " + nf(Q3, 0, 1), chartRight + 10, Q3Y); 
  text("Median: " + nf(median, 0, 1), chartRight + 10, medianY); 
  text("Q1: " + nf(Q1, 0, 1), chartRight + 10, Q1Y); 
  text("Min: " + nf(min, 0, 1), chartRight + 10, minY); 

  // title
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(15);
  text("Work Productivity Score - Box Plot", 300, 30);

  // name axes
  textSize(12);
  fill(0);
  textAlign(CENTER);

  translate(15, (chartTop + chartBottom) / 2); // https://p5js.org/reference/p5/translate/
  rotate(-PI / 2); // https://p5js.org/reference/p5/rotate/
  text("Productivity Score", 0, 0);

  rotate(PI / 2);
  translate(-15, -(chartTop + chartBottom) / 2); // reset
}