function Ball(x, y) {
	this.r = 10;
	this.originPos = createVector(x, y);
	this.pos = createVector(x, y);
	this.vel = this.setVel();
	this.vel.mult(ballSpeed);
	this.acc;
}

Ball.prototype.setVel = function () {
	//return p5.Vector.fromAngle(PI);
	if (random(1) > 0.5) {
		return (p5.Vector.fromAngle((random(-PI / 4, PI / 4))));
	} else {
		return (p5.Vector.fromAngle(random(3 * PI / 4, 5 * PI / 4)))
	}
}

Ball.prototype.update = function () {
	this.pos.add(this.vel);
	//this.vel.add(this.acc);
}

Ball.prototype.reset = function () {
	ballSpeed += 0.1;
	ballSpeed = constrain(ballSpeed, 0, 8);
	this.pos = this.originPos.copy();
	this.vel = this.setVel();
	this.vel.mult(ballSpeed);
}

Ball.prototype.edges = function () {
	if (this.pos.y - this.r < 0 || this.pos.y + this.r > height) {
		this.vel.y *= -1;
	}
	if (this.pos.x + this.r < 0) {
		bar2.score++;
		this.reset();
	} else if (this.pos.x - this.r > width) {
		bar1.score++;
		this.reset();
	}
}

Ball.prototype.show = function () {
	//fill(255, 0, 0);
	//stroke(0, 255, 0);
	fill(255);
	noStroke();
	ellipse(this.pos.x, this.pos.y, 2 * this.r, 2 * this.r);
}

Ball.prototype.hit = function (bar1, bar2) {
	var hit = false;
	if (this.pos.x - this.r <= bar1.x && this.pos.y > bar1.y - (bar1.h / 2) && this.pos.y < bar1.y + (bar1.h / 2)) {
		/*var angle;
		var offset = this.pos.y - bar1.y;
		angle = floor(map(offset, -bar1.h/2, bar1.h/2, -3, 3));
		angle = map(angle, -3, 3, 45, -45);
		console.log(angle);
		ball.vel.rotate(degrees(angle));*/
		hit = true;
	} else if (this.pos.x + this.r >= bar2.x && this.pos.y > bar2.y - (bar2.h / 2) && this.pos.y < bar2.y + (bar2.h / 2)) {
		//		var angle;
		//		var offset = this.pos.y - bar2.y;
		//		angle = map(offset, -bar2.h/2, bar2.h/2, -135, 135);
		//		console.log(angle);
		//		ball.vel.rotate(angle);
		hit = true;
	}
	if (hit) {
		console.log("HIT");
		this.vel.x *= -1;
		ballSpeed += 0.01;
	}
}

Ball.prototype.render = function (bar1, bar2) {
	this.update();
	this.edges();
	this.hit(bar1, bar2);
	this.show();
}
