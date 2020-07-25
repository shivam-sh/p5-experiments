const states = {
	OPEN: "open",
	BLOCKED: "blocked",
	GOAL: "goal-node",
	QUEUED: "queued",
	CLOSED: "closed",
	SUCCESS: "success",
	FAILED: "failed",
};

class MapNode {
	constructor(c, r, w, h, state) {
		// f, g, and h values
		this.f = Infinity;
		this.g = Infinity;
		this.h = Infinity;

		// Array to store all connections
		this.connected = [];

		// Reference to previous node
		this.cameFrom = undefined;

		// Data for visuals
		this.column = c;
		this.row = r;
		this.width = w;
		this.height = h;
		this.state = state;
	}
}