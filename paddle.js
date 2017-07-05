function Paddle(x) {
	this.x = x;
	this.y = board.h / 2;
	this.h = board.h / 5;
	this.w = 20;
	this.isMovable = false;
	this.score = 0;
}

Paddle.prototype.show = function () {
	//fill(this.red, 255, 255);
	//stroke(0);
	fill(255);
	noStroke();
	rectMode(CENTER);
	rect(this.x, this.y, this.w, this.h);
}

Paddle.prototype.update = function (puck) {
	if (this.x > board.w / 2) {
		if (puck.vel.x > 0) {
			this.isMovable = true;
		} else {
			this.isMovable = false;
		}
	} else {
		if (puck.vel.x > 0) {
			this.isMovable = false;
		} else {
			this.isMovable = true;
		}
	}
}

Paddle.prototype.move = function (mY) {
	if (board.isAndroid) {
		mY = map(mouseY, board.h, board.h + board.h / 2, 0, board.h);
	}
	if (this.isMovable) {
		this.y = mY;
	}
	this.y = constrain(this.y, this.h / 2, board.h - this.h / 2);

}

Paddle.prototype.render = function (mY, puck) {
	this.update(puck);
	this.move(mY);
	this.show();
}
