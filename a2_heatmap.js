let table;
let grid = [];
let chartTop = 100;
let chartLeft = 100;
let squareWidth = 30; 
let squareHeight = 40;
let yearsPerRow = 10;

function preload(){
  table = loadTable('us-parks.csv', 'csv', 'header');
}

function setup() {
  createCanvas(1450, 500);
  numberOfRows = table.getRowCount();
  
  let maxVal = 0;
  let minVal = 0;
  
  // Find min and max
  for (let i = 0; i < numberOfRows; i++) {
    let v = table.getNum(i, 1);
    if (v > maxVal) maxVal = v;
    if (v < minVal) minVal = v;
  }
  
  // edit color based on stored information
  for (let i = 0; i < numberOfRows; i++) {
    let row = int(i / yearsPerRow);
    let col = i % yearsPerRow;
    let v = table.getNum(i, 1);
    
    if (!grid[row]) grid[row] = []; // initialize
    grid[row][col] = map(v, minVal, maxVal, 0, 1); // store color value
  }
  
  noLoop();
}

function draw() {
  background(220); 
  
  // Draw grid
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      let v = grid[i][j];
      
      let bri = map(v, 0, 1, 200, 50);
      fill(0, bri, bri); // turquoise
      
      noStroke();
      rect(chartLeft + j * squareWidth, chartTop + i * squareHeight, squareWidth, squareHeight);
    }
  }
  
  // labels
  fill(0);
  textAlign(RIGHT, CENTER);
  text("1979-1988", chartLeft - 10, chartTop + 0 * squareHeight + squareHeight/2);
  text("1989-1998", chartLeft - 10, chartTop + 1 * squareHeight + squareHeight/2);
  text("1999-2008", chartLeft - 10, chartTop + 2 * squareHeight + squareHeight/2);
  text("2009-2018", chartLeft - 10, chartTop + 3 * squareHeight + squareHeight/2);
  text("2019-2024", chartLeft - 10, chartTop + 4 * squareHeight + squareHeight/2);
  
  // title
  fill(0);
  textSize(15);
  textAlign(CENTER);
  text("US National Park Recreation Visits - Heatmap", 500, 30);
  
  // name axes
  text("Years", chartLeft + 150, chartTop + grid.length * squareHeight + 20);
  
  translate(20, chartTop + 100);
  rotate(-PI / 2);
  text("Time Period", 0, 0);
  translate(-20, -(chartTop + chartBottom) / 2); // reset


}

/*source: lecture + https://editor.p5js.org/greggelong/sketches/tZ6MvMLUa*/