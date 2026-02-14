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
  numberOfColumns = table.getColumnCount();
  noLoop(); // setup only once
}

function draw() {
}