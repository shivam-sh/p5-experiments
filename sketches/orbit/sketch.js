// A simple simulation to practice working with vectors in p5.js
// This code is a customized version of the gravitational orbit ecanple created by Dan Schiffman

var numOrbiting = 5;

function setup() {
  createCanvas(windowWidth, windowHeight);
  attractor = new Attractor(width/2, height/2, 50);
  orbiters = [numOrbiting];

  for (let i = 0; i < numOrbiting; i++) {
    orbiters[i] = new Orbiter(random(0, width), random(0, height), random(10, -10), random(5, 20));
  }
}

function draw() {
  background(190, 190, 190, 200);

  for (let i = 0; i < numOrbiting; i++) {
    attractor.attract(orbiters[i]);
    orbiters[i].update();
  
    if (orbiters[i].pos.z >= 0) {
      attractor.show();
      orbiters[i].show();
    } else {
      orbiters[i].show();
      attractor.show();
    }
  }
  console.log(orbiters[1].pos.z)
}