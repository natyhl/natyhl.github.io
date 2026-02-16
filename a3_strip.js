// Strip chart for Sleep Hours
let table;
let hours = [];

// Chart boundaries
let chartTop = 50;
let chartBottom = 400;
let chartLeft = 150;
let chartRight = 250;

function preload(){
  table = loadTable('Smartphone.csv', 'csv', 'header');
}

function setup() {
  createCanvas(400, 450);
  numberOfRows = table.getRowCount();
  numberOfColumns = table.getColumnCount();
  noLoop(); // setup only once
}

function draw() {
  background(220); 

  // Draw axis
  stroke(0);
  strokeWeight(1); 
  line(chartLeft, chartTop, chartLeft, chartBottom); // y-axis

  let max = 0;
  let min = 100;                                         
  for (let i = 0; i < numberOfRows; i++) {                
    let v = table.getNum(i, 8);                          
    hours[i] = v;                                        
    if (v > max) {
      max = v; 
    }
    if (v < min) {
      min = v;
    }                           
  }

  // Label y-axes
  fill(0);
  textAlign(RIGHT, CENTER); 
  for (let k = 0; k <= 5; k++) {
    let val = min + ((max - min) / 5) * k;
    let y = map(val, min, max, chartBottom, chartTop);
    stroke(0); 
    line(chartLeft - 5, y, chartLeft, y);
    noStroke();
    text(nf(val, 0, 1), chartLeft - 10, y);
  }

  // Chart
  fill(100, 200, 200); // light turquoise
  noStroke();

  for (let i = 0; i < numberOfRows; i++) {
    let y = map(hours[i], min, max, chartBottom, chartTop);
    let x = chartLeft + (chartRight - chartLeft) / 2 + random(-30, 30);
    circle(x, y, 4);
  }

  // title
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(15);
  text("Sleep Hours - Strip Chart", 200, 30);

  // name axes
  textSize(12);
  fill(0);
  textAlign(CENTER);

  translate(15, (chartTop + chartBottom) / 2); // https://p5js.org/reference/p5/translate/
  rotate(-PI / 2); // https://p5js.org/reference/p5/rotate/
  text("Sleep Hours", 0, 0);

  rotate(PI / 2);
  translate(-15, -(chartTop + chartBottom) / 2); // reset
}