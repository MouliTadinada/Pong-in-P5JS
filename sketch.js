var board;

function setup() {
	board = new Board(windowWidth, windowHeight, 4);
	board.create();
}

function draw() {
	board.run();
}
