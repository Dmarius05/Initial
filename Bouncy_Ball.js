let balls = [];
let gravity;
let floorPos;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  gravity = createVector(0, 0.5); // 0.5g gravity in the y-direction
  floorPos = height / 2; // Position of the floor
  background(0); // Set background to black
}

function draw() {
  background(0);

  // Handle balls
  for (let i = balls.length - 1; i >= 0; i--) {
    balls[i].applyGravity();
    balls[i].update();
    balls[i].display();
    
    if (balls[i].isOffScreen()) {
      balls.splice(i, 1);
    }
  }
}

function mousePressed() {
  let colors = ['#800080', '#FF0000', '#FFFF00', '#FFA500', '#EE82EE']; // Purple, Red, Yellow, Orange, Violet
  let randomColor = random(colors);
  let ball = new Ball(mouseX - width / 2, mouseY - height / 2, 0, randomColor);
  balls.push(ball);
}

class Ball {
  constructor(x, y, z, color) {
    this.position = createVector(x, y, z);
    this.velocity = createVector(0, 0, 0);
    this.radius = 20; // Radius of the ball
    this.color = color;
    this.COR = 0.8; // Coefficient of Restitution (bounciness)
  }

  applyGravity() {
    this.velocity.add(gravity);
  }

  update() {
    this.position.add(this.velocity);
    
    // Check for collision with the floor
    if (this.position.y > floorPos - this.radius / 2) {
      this.position.y = floorPos - this.radius / 2;
      this.velocity.y *= -this.COR; // Bounce off the floor
    }
  }

  isOffScreen() {
    return this.position.y > height / 2 + this.radius;
  }

  display() {
    push();
    translate(this.position.x, this.position.y, this.position.z);
    noStroke();
    fill(this.color);
    sphere(this.radius);
    pop();
  }
}
