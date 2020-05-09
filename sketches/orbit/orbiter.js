let showVectors = false

class Orbiter {
    constructor(x, y, z, m) {
        this.pos = createVector(x, y, z)
        this.vel = createVector( random(-5, 5), random(-5, 5), random(-5, 5))
        this.acc = createVector(0, 0, 0)
        this.mass = m
        this.rad = sqrt(m) * 5
        this.size = 0;
    }

    applyForce(f) {
        this.acc.set(f)
    }

    update() {
        this.vel.add(this.acc)
        this.pos.add(this.vel)

        // loop the orbiter around the screen if it exits the boundaries
        if (this.pos.x < 0) {
        //    this.pos.x += width
        } else if (this.pos.x > width) {
        //    this.pos.x -= width
        }
        if (this.pos.y < 0) {
        //    this.pos.y += height
        } else if (this.pos.y > height) {
        //    this.pos.y -= height
        }
    }

    show() {
        fill(220)
        strokeWeight(2)
        stroke(220)
        ellipse(this.pos.x, this.pos.y, this.rad * map(this.pos.z, -100, 100, 1.6, 2.4))

        if (showVectors) {
            strokeWeight(4)
            stroke(50, 50, 200)
            line(this.pos.x, this.pos.y, this.pos.x + this.vel.x, this.pos.y + this.vel.y)
            stroke
            stroke(200, 50, 50)
            line(this.pos.x, this.pos.y, this.pos.x + this.acc.x, this.pos.y + this.acc.y)
            stroke(200)
        }
    }
}