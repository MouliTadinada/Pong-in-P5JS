function Bar(x) {
	this.x = x;
	this.y = height / 2;
	this.h = height / 5;
	this.w = 10;
	this.isMovable = false;
	this.score = 0;
	this.red = 255;
}

Bar.prototype.show = function () {
	fill(this.red, 255, 255);
	stroke(0);
	rectMode(CENTER);
	rect(this.x, this.y, this.w, this.h);
}

Bar.prototype.update = function (ball) {
	if (this.x > width / 2) {
		if (ball.vel.x > 0) {
			this.isMovable = true;
		} else {
			this.isMovable = false;
		}
	} else {
		if (ball.vel.x > 0) {
			this.isMovable = false;
		} else {
			this.isMovable = true;
		}
	}
}

Bar.prototype.move = function (mY) {
	if (this.isMovable) {
		this.y = mY;
	}
	this.y = constrain(this.y, this.h / 2, height - this.h / 2);
}

Bar.prototype.render = function (mY, ball) {
	this.update(ball);
	this.move(mY);
	this.show();
}

