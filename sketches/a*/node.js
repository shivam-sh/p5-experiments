const states = {
	OPEN: "open",
	BLOCKED: "blocked",
	START: "start-node",
	FINISH: "end-node",
	QUEUED: "queued",
	CLOSED: "closed",
	PATH: "path",
	FAILED: "failed"
};

class MapNode {
	constructor(x, y, w, h, state) {
		// f, g, and h values
		this.f = Infinity;
		this.g = Infinity;
		this.h = Infinity;

		// Array to store all connections
		this.connected = [];

		// Ref to previous node
		this.cameFrom = undefined;

		// Data for visuals
		this.xPos = x;
		this.yPos = y;
		this.width = w;
		this.height = h;
		this.state = state;
	}
}
