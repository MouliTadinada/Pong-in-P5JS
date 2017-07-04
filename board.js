function Board(w, h, speed) {
	this.w = windowWidth;
	this.h = 400;
	this.puck;
	this.paddles = [];
	this.scores = [];
	this.ballSpeed = speed;
}

Board.prototype.create = function () {
	createCanvas(this.w, this.h);
	this.puck = new Puck(width / 2, height / 2, this.ballSpeed);
	this.paddles.push(new Paddle(5));
	this.paddles.push(new Paddle(width - 5));
	this.scores[0] = 0;
	this.scores[1] = 0;
}

Board.prototype.run = function () {
	background(0, 50);
	for (var i = 0; i < this.paddles.length; i++) {
		this.paddles[i].render(mouseY, this.puck);
		this.scores[i] = this.paddles[i].score;
	}
	this.puck.render(this.paddles[0], this.paddles[1]);
	fill(255);
	textSize(32);
	text(this.scores[0], 3 * this.w / 15, 2 * this.h / 15);
	text(this.scores[1], 13 * this.w / 15, 2 * this.h / 15);
}
