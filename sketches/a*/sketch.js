// GLOBAL VARIABLES
let queue = [];
let closed = [];

let grid;
let columns;
let rows;

function setup() {
	// Code to create an adaptive canvas
	let canvasDiv = document.getElementById("canvas");
	let width = canvasDiv.offsetWidth;
	let height = canvasDiv.offsetHeight;
	let canvas = createCanvas(width, height);
	canvas.parent("canvas");
	background(0, 0, 0);

	// Setup values for grid
	columns = floor(width / nodeWidth);
	rows = floor(height / nodeHeight);

	// Create 2D grid
	grid = new Array(columns);
	for (let i = 0; i < columns; i++) {
		grid[i] = new Array(rows);
	}

	// Create storage for nodes
	queue = [];
	closed = [];
}

function draw() {}