const states = {
    OPEN: 'open',
    BLOCKED: 'blocked',
    START: 'start-node',
    FINISH: 'end-node',
    QUEUED: 'queued',
    CLOSED: 'closed'
}

class MapNode {
	constructor(x, y, w, h, state) {
        // f, g, and h values
        this.f = 0;
        this.g = 0;
        this.h = 0;

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
