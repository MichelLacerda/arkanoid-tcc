const colors = ["#540d6e", "#ee4266", "#ffd23f", "#3bceac", "#0ead69", "#f4845f"]

function setup() {
  createCanvas(480, 640);
}

function draw() {
  background('#2a9d8f');
  background('#005f73');
  background('#59656f');

  noStroke();
  fill(colors[0]);
  rect(0, 0, 60, 24);

  fill(colors[1]);
  rect(0, 24*1, 60, 24);

  fill(colors[2]);
  rect(0, 24*2, 60, 24);

  fill(colors[3]);
  rect(0, 24*3, 60, 24);

  fill(colors[4]);
  rect(0, 24*4, 60, 24);

  fill(colors[5]);
  rect(0, 24*5, 60, 24);
  
  fill("#f7aef8");
  rect(480/2-60/2, 640 - 24, 100, 16);
}