let particles = [];

function setup() {
    // Crea el lienzo y lo coloca en el contenedor de partículas
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent("particle-container");

    // Genera las partículas iniciales
    for (let i = 0; i < 150; i++) {
        particles.push(new Particle());
    }
}

function draw() {
    clear();
    particles.forEach(particle => {
        particle.move();
        particle.display();
    });
}

class Particle {
    constructor() {
        this.pos = createVector(random(width), random(height));
        this.vel = p5.Vector.random2D().mult(1.5);
        this.size = random(5, 15);
    }

    move() {
        this.pos.add(this.vel);

        // Rebote en los bordes
        if (this.pos.x < 0 || this.pos.x > width) this.vel.x *= -1;
        if (this.pos.y < 0 || this.pos.y > height) this.vel.y *= -1;

        // Atraer al mouse si está cerca
        let mouse = createVector(mouseX, mouseY);
        let distance = dist(mouse.x, mouse.y, this.pos.x, this.pos.y);

        if (distance < 100) {
            let attraction = p5.Vector.sub(mouse, this.pos);
            attraction.setMag(0.5);
            this.vel.add(attraction);
        }
    }

    display() {
        fill(255, 150);
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.size);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
