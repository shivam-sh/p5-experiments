// Grid Options
let percentFilled = 30;
let nodeHeight = 30;
let nodeWidth = 30;

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

	// Fill the grid with nodes based on the % that should be open
	for (let x = 0; x < columns; x++) {
		for (let y = 0; y < rows; y++) {
			if (Math.random() * 100 > percentFilled) {
				grid[x][y] = new MapNode(
					x,
					y,
					nodeWidth,
					nodeHeight,
					states.OPEN
				);
			} else {
				grid[x][y] = new MapNode(
					x,
					y,
					nodeWidth,
					nodeHeight,
					states.BLOCKED
				);
			}
		}
	}

	// Set/init start and end points
	start = grid[0][0];
	finish = grid[columns - 1][rows - 1];
	start.setState(states.OPEN);
	finish.setState(states.FINISH);

	start.g = 0;
	start.h = dist(start.column * nodeWidth, start.row * nodeHeight, finish.column * nodeWidth, finish.row * nodeHeight);
	start.f = start.g + start.h;

	// Add the start node to the queue
	queue.push(start);

	// Output the base grid
	for (let x = 0; x < columns; x++) {
		for (let y = 0; y < rows; y++) {
			grid[x][y].show();
		}
	}
}

function draw() {
	if (queue.length < 0) {
		// Run main search loop
	} else if (start.state != states.SUCCESS) {
		// Search failed
	}
}
