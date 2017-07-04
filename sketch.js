var board;

function setup() {
	board = new Board(windowWidth, windowHeight, 10);
	board.create();
}

function draw() {
	board.run();
}
