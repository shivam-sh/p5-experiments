const states = {
	OPEN: "open",
	BLOCKED: "blocked",
	FINISH: "end-node",
	QUEUED: "queued",
	CLOSED: "closed",
	FOUND: "found",
	FAILED: "failed",
};

class MapNode {
	constructor(c, r, w, h, state) {
		// f, g, and h values
		this.f = -1;
		this.g = -1;
		this.h = -1;

		// Array to store all connections
		this.connected = [];

		// Ref to previous node
		this.cameFrom = undefined;

		// Data for visuals
		this.column = c;
		this.row = r;
		this.width = w;
		this.height = h;
		this.state = state;
	}

	getConnections(grid) {
		if (!this.connected == []) {
			if (
				this.column != 0 &&
				(grid[this.column - 1][this.row].state == states.OPEN ||
				grid[this.column - 1][this.row].state == states.FINISH)
			) {
				this.connected.push(grid[this.column - 1][this.row]);
			}
			if (
				this.row != 0 &&
				(grid[this.column][this.row - 1].state == states.OPEN ||
				grid[this.column][this.row - 1].state == states.FINISH)
			) {
				this.connected.push(grid[this.column][this.row - 1]);
			}
			if (
				this.column != grid.length - 1 &&
				(grid[this.column + 1][this.row].state == states.OPEN ||
				grid[this.column + 1][this.row].state == states.FINISH)
			) {
				this.connected.push(grid[this.column + 1][this.row]);
			}
			if (
				this.row != grid[0].length - 1 &&
				(grid[this.column][this.row + 1].state == states.OPEN ||
				grid[this.column][this.row + 1].state == states.FINISH)
			) {
				this.connected.push(grid[this.column][this.row + 1]);
			}

			return this.connected;
		} else {
			return this.connected;
		}
	}

	show() {
		switch (this.state) {
			case states.OPEN:
				fill(255, 255, 255);
				break;
			case states.BLOCKED:
				fill(50, 50, 50);
				break;
			case states.FINISH:
				fill(100, 100, 200);
				break;
			case states.QUEUED:
				fill(255, 200, 100);
				break;
			case states.CLOSED:
				fill(150, 150, 150);
				break;
			case states.FOUND:
				fill(50, 200, 50);
				break;
			case states.FAILED:
				fill(200, 100, 100);
				break;
		}


		let canvasDiv = document.getElementById("canvas");
		let width = canvasDiv.offsetWidth;
		let height = canvasDiv.offsetHeight;

		let xOffset = (width % this.width) / 2;
		let yOffset = (height % this.height) / 2;

		strokeWeight(1);
		stroke(0);
		rect(
			this.column * this.width + xOffset,
			this.row * this.height + yOffset,
			this.width,
			this.height,
			3
		);
	}

	setState(state) {
		this.state = state;
	}

	setCameFrom(node) {
		this.cameFrom = node;
	}
}
