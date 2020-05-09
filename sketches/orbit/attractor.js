class Attractor {
    constructor(x, y, m) {
        this.pos = createVector(x, y);
        this.mass = m;
        this.rad = sqrt(m) * 5;
    }

    attract(orbiter) {
        let force = p5.Vector.sub(this.pos, orbiter.pos);
        let distancesq = constrain(force.magSq(), 1000, 1100);
        let G = 5;
        let strength = G * (this.mass * orbiter.mass / distancesq)
        force.setMag(strength);
        orbiter.applyForce(force);
    }

    show() {
        fill(0)
        ellipse(this.pos.x, this.pos.y, this.rad * 2)
    }
}