var pendulums = [];
var xOffset = 0;
var position = [];

var file;
var song = [];
var current = 0;

function preload() {
    file = ['1.mp3'];

    for (var i = 0; i < file.length; i++) {
        song.push(loadSound('music/' + file[i]));
    }
}

function setup() {
    createCanvas(windowWidth * 0.95, windowHeight * 0.95);
    frameRate(50);

    song[current].play();

    strokeWeight(0.1);

    for (var i = 0; i < 30; i++) {
        pendulums.push(new Pendulum(random(100, height), random(PI / 5, PI / 3)));
    }
}

function draw() {
    background(0, 50);
    translate(width / 2, 0);
    fill(0);

    for (var i = 0; i < pendulums.length; i++) {
        var p = pendulums[i];

        p.display(frameCount * 0.02);
        p.display(frameCount * 0.04);
        p.display(frameCount * 0.06);

        if (i == 1) {
            p.plotGraph();
        }
    }
}

class Pendulum {
    constructor(length, maxAngle) {
        this.gravity = 9.8;
        this.length = length;
        this.maxAngle = maxAngle;
    }

    display(time) {
        var angle = this.maxAngle * sin(Math.sqrt(this.gravity / this.length) * time);
        this.x = this.length * Math.sin(angle);
        this.y = this.length * Math.cos(angle);

        strokeWeight(0.1);
        stroke(250, 180);

        line(0, 0, this.x, this.y);

        var radius = random(10, 50);
        fill(random(100, 250), random(100, 250), 120, 100);
        ellipse(this.x, this.y, radius, radius);
    }

    plotGraph() {
        var xL = xOffset - position[height];

        for (var y = width; y > 0; y--) {
            var x = xOffset - position[y - 1];

            strokeWeight(5);
            stroke(random(150, 255), random(100, 150));
            line(x, y + this.length, xL, y + this.length + 1);

            strokeWeight(0.1);
            line(x, y, xL + this.length, y + this.length + 1);
            line(x, y, xL + this.length, this.length + 1);
            line(x, y, y + this.length, y + this.length + 1);

            xL = x;
            position[y] = position[y - 1];
        }

        position[0] = this.x * -1;
    }
}