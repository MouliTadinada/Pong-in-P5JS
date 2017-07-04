function Puck(x, y, speed) {
	this.r = 10;
	this.originPos = createVector(x, y);
	this.pos = createVector(x, y);
	this.vel = this.setVel();
	this.speed = speed;
	this.vel.mult(this.speed);
	this.acc;
}

Puck.prototype.setVel = function () {
	if (random(1) > 0.5) {
		return (p5.Vector.fromAngle((random(-PI / 4, PI / 4))));
	} else {
		return (p5.Vector.fromAngle(random(3 * PI / 4, 5 * PI / 4)))
	}
}

Puck.prototype.update = function () {
	this.pos.add(this.vel);
}

Puck.prototype.reset = function () {
	this.pos = this.originPos.copy();
	this.vel = this.setVel();
	this.vel.mult(this.speed);
}

Puck.prototype.edges = function (paddle1, paddle2) {
	if (this.pos.y - this.r < 0 || this.pos.y + this.r > height) {
		this.vel.y *= -1;
	}
	if (this.pos.x < 0) {
		paddle2.score++;
		this.reset();
	} else if (this.pos.x > width) {
		paddle1.score++;
		this.reset();
	}
}

Puck.prototype.show = function () {
	//fill(255, 0, 0);
	//stroke(0, 255, 0);
	fill(255);
	noStroke();
	ellipse(this.pos.x, this.pos.y, 2 * this.r, 2 * this.r);
}

Puck.prototype.hit = function (paddle1, paddle2) {
	var hit = false;
	if (this.pos.x - this.r <= paddle1.x + paddle1.w / 2 && this.pos.y > paddle1.y - (paddle1.h / 2) && this.pos.y < paddle1.y + (paddle1.h / 2)) {
		var offset = this.pos.y - (paddle1.y - paddle1.h / 2);
		this.pos.x = paddle1.x + paddle1.w / 2 + this.r;
		this.pos.y = paddle1.y - paddle1.h / 2 + offset;
		var angle = map(offset, 0, paddle1.h, -PI / 4, PI / 4);
		this.vel = p5.Vector.fromAngle(angle);
		hit = true;
	} else if (this.pos.x + this.r >= paddle2.x - paddle2.w / 2 && this.pos.y > paddle2.y - (paddle2.h / 2) && this.pos.y < paddle2.y + (paddle2.h / 2)) {
		var offset = this.pos.y - (paddle2.y - paddle2.h / 2);
		this.pos.x = paddle2.x - paddle2.w / 2 - this.r;
		this.pos.y = paddle2.y - paddle2.h / 2 + offset;
		var angle = map(offset, 0, paddle2.h, 5 * PI / 4, 3 * PI / 4);
		this.vel = p5.Vector.fromAngle(angle);
		hit = true;
	}
	if (hit) {
		this.speed += 0.01;
		this.vel.setMag(this.speed);
	}
}

Puck.prototype.render = function (paddle1, paddle2) {
	this.update();
	this.edges(paddle1, paddle2);
	this.hit(paddle1, paddle2);
	this.show();
}
