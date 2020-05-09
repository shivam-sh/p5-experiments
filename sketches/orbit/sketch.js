// A simple simulation to practice working with vectors in p5.js
// This code is a customized version of the gravitational orbit ecanple created by Dan Schiffman

var numOrbiting = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0, 0, 0);

  attractor = new Attractor(width/2, height/2, 900);
  orbiters = [numOrbiting];

  for (let i = 0; i < numOrbiting; i++) {
    orbiters[i] = new Orbiter(random(0, width), random(0, height), random(-30, -30), random(80, 200));
  }
}

function draw() {
  background(0, 0, 0, 30);

  for (let i = 0; i < numOrbiting; i++) {
    attractor.attract(orbiters[i]);
    orbiters[i].update();
  }

  for (let i = 0; i < numOrbiting; i++) {
    if (orbiters[i].pos.z >= 0) {
      orbiters[i].show();
      attractor.show();
    } else {
      attractor.show();
      orbiters[i].show();
    }
  }
}