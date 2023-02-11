let cols, rows;
let scale = 20;
let flowfield = [];
let particles = [];

function setup() {
  createCanvas(600, 600);
  cols = floor(width / scale);
  rows = floor(height / scale);
  for (let i = 0; i < 300; i++) {
    particles[i] = new Particle();
  }
  for (let i = 0; i < cols * rows; i++) {
    flowfield[i] = createVector(0, 0);
  }
}

function draw() {
  background(255);

  // Calculate the perlin noise values for each point in the flowfield
  let yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols;
      let angle = noise(xoff, yoff, frameCount * 0.01) * TWO_PI;
      let v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowfield[index] = v;
      xoff += 0.1;
    }
    yoff += 0.1;
  }

  // Update and display the particles
  for (let i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }

  // Draw the flowfield
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols;
      let v = flowfield[index];
      stroke(0, 50);
      push();
      translate(x * scale, y * scale);
      rotate(v.heading());
      strokeWeight(1);
      line(0, 0, scale, 0);
      pop();
    }
  }
}
