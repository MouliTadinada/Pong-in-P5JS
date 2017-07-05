function Board(w, h, speed) {
	this.w = windowWidth / 2;
	this.h = windowHeight / 2;
	this.puck;
	this.paddles = [];
	this.scores = [];
	this.ballSpeed = speed;
	this.canvas;
	this.isAndroid;
}

Board.prototype.create = function () {
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
		this.isAndroid = true;
	} else {
		this.isAndroid = false;
	}
	this.canvas = createCanvas(this.w, this.h + this.h / 2);
	if (this.isAndroid) {
		this.canvas.position(this.w / 2, 0);
	} else {
		this.canvas.position(this.w / 2, this.h / 2);
	}
	this.puck = new Puck(this.w / 2, this.h / 2, this.ballSpeed);
	this.paddles.push(new Paddle(20));
	this.paddles.push(new Paddle(this.w - 20));
	this.scores[0] = 0;
	this.scores[1] = 0;
}

Board.prototype.run = function () {
	background(0, 50);
	fill(166, 138, 230);
	rectMode(CENTER);
	rect(this.w / 2, this.h + this.h / 4, this.w, this.h / 2);
	if (this.isAndroid) {
		fill(0);
		textAlign(CENTER, CENTER);
		text("Drag here to move the paddle !!", this.w / 2, this.h + this.h / 3);
	}
	for (var i = 0; i < this.paddles.length; i++) {
		this.paddles[i].render(mouseY, this.puck);
		this.scores[i] = this.paddles[i].score;
	}
	this.puck.render(this.paddles[0], this.paddles[1]);
	fill(255);
	textSize(32);
	text(this.scores[0], 3 * this.w / 15, 2 * this.h / 15);
	text(this.scores[1], 13 * this.w / 15, 2 * this.h / 15);
	if (this.gameOver()) {
		this.scores[0] = this.paddles[0].score = 0;
		this.scores[1] = this.paddles[1].score = 0;
		this.puck.reset();
	}
}

Board.prototype.gameOver = function () {
	var i;
	for (i = 0; i < this.paddles.length; i++) {
		if (this.paddles[i].score >= 10) {
			break;
		}
	}
	if (i < 2) {
		fill(255, 0, 0);
		textSize(this.h / 5);
		textAlign(CENTER);
		text("GAME OVER", this.w / 2, this.h / 2);
		return true;
	} else {
		return false;
	}
}
