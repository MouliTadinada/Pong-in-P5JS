function Ball(x, y) {
	this.d = 20;
	this.originPos = createVector(x, y);
	this.pos = createVector(x, y);
	this.vel = this.setVel();
	this.vel.mult(ballSpeed);
	this.acc;
}

Ball.prototype.setVel = function() {
	if (random(1) > 0.5) {
		return(p5.Vector.fromAngle((random(-PI/4, PI/4))));
	} else {
		return(p5.Vector.fromAngle(random(3*PI/4, 5*PI/4)))
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

Ball.prototype.edges = function (bar1, bar2) {
	if (this.pos.y < 0 || this.pos.y > height) {
		this.vel.y *= -1;
	}
	if (this.pos.x < 0) {
		bar2.score++;
		this.reset();
	} else if (this.pos.x > width) {
		bar1.score++;
		this.reset();
	}
}

Ball.prototype.show = function () {
	fill(255, 0, 0);
	stroke(0, 255, 0);
	ellipse(this.pos.x, this.pos.y, this.d, this.d);
}

Ball.prototype.hit = function(bar1, bar2) {
	var hit = false;
	if(ball.pos.x <= bar1.x && ball.pos.y > bar1.y - (bar1.h / 2) && ball.pos.y < bar1.y + (bar1.h / 2)) {
		/*var angle;
		var offset = this.pos.y - bar1.y;
		angle = floor(map(offset, -bar1.h/2, bar1.h/2, -3, 3));
		angle = map(angle, -3, 3, 45, -45);
		console.log(angle);
		ball.vel.rotate(degrees(angle));*/
		hit = true;
	} 
	else if(ball.pos.x >= bar2.x && ball.pos.y > bar2.y - (bar2.h / 2) && ball.pos.y < bar2.y + (bar2.h / 2)) {
//		var angle;
//		var offset = this.pos.y - bar2.y;
//		angle = map(offset, -bar2.h/2, bar2.h/2, -135, 135);
//		console.log(angle);
//		ball.vel.rotate(angle);
		hit = true;
	}
	if(hit) {
		this.vel.x *= -1;
		ballSpeed += 0.01;
	}
}

Ball.prototype.render = function (bar1, bar2) {
	this.update();
	this.edges(bar1, bar2);
	this.hit(bar1, bar2);
	this.show();
}
