/*
 * Terra
 * Shivam Sh | https://github.com/shivam-sh
 * 
 * A terrain generator/3D world 
 * designed to push the limits of what p5.js can create
 */

function setup() {
	// Get the "canvas" from the webpage and set it as the output
	let canvasDiv = document.getElementById("canvas");
	let width = canvasDiv.offsetWidth;
	let height = canvasDiv.offsetHeight;
	let canvas = createCanvas(width, height);
	canvas.parent("canvas");

	background(0, 0, 0);
}

function draw() {}
