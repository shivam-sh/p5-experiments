// Values for graphical output
let nodeHeight = 30;
let nodeWidth = 30;

function setup() {
	// Code to create an adaptive canvas
	let canvasDiv = document.getElementById("canvas");
	let width = canvasDiv.offsetWidth;
	let height = canvasDiv.offsetHeight;
	let canvas = createCanvas(width, height);
	canvas.parent("canvas");
	background(0, 0, 0);

	// Setup values for grid
	let columns = Math.floor(width / nodeWidth);
	let rows = Math.floor(height / nodeHeight);

	// Create 2D grid
	let grid = new Array(columns);
	for (let i = 0; i < columns; i++) {
		grid[i] = new Array(rows);
	}

	// Create storage for nodes
	let queue = [];
	let closed = [];
}

function draw() {
}
