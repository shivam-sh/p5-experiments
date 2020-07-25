// Init
let percentFilled = 20;

// Values for graphical output
let nodeHeight = 10;
let nodeWidth = 10;

// GLOBAL VARIABLES
let queue = [];
let closed = [];

let grid;
let columns;
let rows;
let start;
let finish;

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

	// Set start and end points
	start = grid[0][0];
	finish = grid[columns - 1][rows - 1];
	start.setState(states.OPEN);
	start.g = 0;
	finish.setState(states.FINISH);

	// Add the start node to the queue
	queue.push(start);

	// Output the base
	for (let x = 0; x < columns; x++) {
		for (let y = 0; y < rows; y++) {
			grid[x][y].show();
		}
	}
}

function draw() {
	// Output the nodes
	for (let x = 0; x < columns; x++) {
		for (let y = 0; y < rows; y++) {
			if (grid[x][y].state == states.QUEUED) {
				grid[x][y].show();
			}
		}
	}


	if (queue.length > 0) {
		// Run main search
		let currentNode = queue[0];
		let newNodes = currentNode.getConnections(grid);

		newNodes.forEach((node) => {
			node.setState(states.QUEUED);
		});

		// Draw the path if done
		if (currentNode == finish) {
			queue = [];
			newNodes = [];
			while (currentNode.cameFrom != undefined) {
				currentNode.setState(states.FOUND);
				currentNode.show();
				currentNode = currentNode.cameFrom;
			}
			start.setState(states.FOUND);
			start.show();
		} else {
			// Remove node from queue
			currentNode.setState(states.CLOSED);
			currentNode.show();
			closed.push(currentNode);
			queue.shift();

			// Insert each new node into the queue according to its f score
			newNodes.forEach((node) => {
				// Check if this is the quickest path to this node
				let tempG;
				if (node.g == -1) {
					tempG = dist(
						currentNode.column * nodeWidth,
						currentNode.row * nodeHeight,
						node.column * nodeWidth,
						node.row * nodeHeight
					);
				} else {
					tempG =
						currentNode.g +
						dist(
							currentNode.column * nodeWidth,
							currentNode.row * nodeHeight,
							node.column * nodeWidth,
							node.row * nodeHeight
						);
				}

				if (tempG < node.g || node.g == -1) {
					node.cameFrom = currentNode;
					node.g = tempG;
					node.f =
						node.g +
						dist(
							node.column * nodeWidth,
							node.row * nodeHeight,
							finish.column * nodeWidth,
							finish.row * nodeHeight
						);
				}

				// Sort through the array to find where to position the new node
				let lowerBound = 0;
				let upperBound = queue.length - 1;
				while (lowerBound < upperBound) {
					let pivot = floor((lowerBound + upperBound) / 2);

					if (node.f <= queue[pivot].f) {
						upperBound = pivot - 1;
					} else if (node.f > queue[pivot].f) {
						lowerBound = pivot + 1;
					}
				}
				node.setState(states.QUEUED);
				node.show()
				queue.splice(lowerBound, 0, node);
			});
		}
	} else if (start.state != states.FOUND) {
		// Search failed, end task
		for (let x = 0; x < columns; x++) {
			for (let y = 0; y < rows; y++) {
				if (grid[x][y].state == states.CLOSED) {
					grid[x][y].setState(states.FAILED);
					grid[x][y].show();
				}
			}
		}
	}
}
