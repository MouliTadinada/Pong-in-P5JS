var ball;
var bar1, bar2;
var score1, score2;
var ballSpeed = 5;

function setup() {
	createCanvas(windowWidth, 400);
	ball = new Ball(width/2, height/2);
	bar1 = new Bar(0 + 5);
	bar2 = new Bar(width - 5);
	score1 = createElement("h1", "");
	score2 = createElement("h1", "");
	score1.position(2*width/15, 0);
	score2.position(13*width/15, 0);
}

function draw() {
	background(51, 100);
	bar1.render(mouseY, ball);
	bar2.render(mouseY, ball);
	ball.render(bar1, bar2);
	score1.html(bar1.score);
	score2.html(bar2.score);
}
