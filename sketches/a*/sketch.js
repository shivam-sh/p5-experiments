// Init
let percentFilled = 60;

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
	let columns = floor(width / nodeWidth);
	let rows = floor(height / nodeHeight);

	// Create 2D grid
	let grid = new Array(columns);
	for (let i = 0; i < columns; i++) {
		grid[i] = new Array(rows);
	}

	// Create storage for nodes
	let queue = [];
	let closed = [];

	// Fill the grid with nodes based on the % that should be open
	for (let x = 0; x < columns; x++) {
		for (let y = 0; y < rows; y++) {
			if (Math.random() * 100 < percentFilled) {
				grid[x][y] = new MapNode(
					x * nodeWidth,
					y * nodeHeight,
					nodeWidth,
					nodeHeight,
					states.OPEN
				);
			} else {
				grid[x][y] = new MapNode(
					x * nodeWidth,
					y * nodeHeight,
					nodeWidth,
					nodeHeight,
					states.CLOSED
				);
			}
		}
	}

	// Set start and end points
	let start = grid[0][0];
	let finish = grid[columns - 1][rows - 1];
	start.setState(states.START);
	start.g = 0;
	finish.setState(states.FINISH);

	// Add the start node to the queue
	queue.push(start);
}

function draw() {
	if (queue.length > 0) {
		// Run main search
		let currentNode = queue[0];
		let newNodes = currentNode.getConnections();

		// Draw the path if done
		if (currentNode == finish) {
			queue = [];
			while (currentNode.cameFrom() != undefined) {
				currentNode.setState(states.PATH);
				currentNode = currentNode.cameFrom;
			}
		}
		
		// Remove node from queue
		closed.push(queue[0]);
		queue.shift();
		
		// Insert each new node into the queue according to its f score
		newNodes.forEach((node) => {
			// Check if this is the quickest path to this node
			let tempG =
			currentNode.g +
			dist(currentNode.x, currentNode.y, node.x, node.y);
			if (tempG < node.g) {
				node.cameFrom = currentNode;
				node.g = tempG;
				node.f = node.g + dist(node.x, node.y, finish.x, finish.y);
			}
			
			// Sort through the array to find where to position the new node
			let lowerBound = 0;
			let upperBound = queue.length - 1;
			while (lowerBound < upperBound) {
				let pivot = floor((lowerBound + upperBound) / 2);
				
				if (f <= queue[pivot].getF()) {
					upperBound = pivot;
				} else if (f > queue[pivot].getF()) {
					lowerBound = pivot;
				}
			}
			
			queue.splice(lowerBound, 0, node);
		});
	} else {
		// Search failed, end task
		currentNode = closed[closed.length - 1];
		while (currentNode.cameFrom() != undefined) {
			currentNode.setState(states.PATH);
			currentNode = currentNode.cameFrom;
		}
	}
	
	// Output the grid
	for (let x = 0; x < columns; x++) {
		for (let y = 0; y < rows; y++) {
			grid[x][y].show();
		}
	}
}
