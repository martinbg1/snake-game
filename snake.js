//Simple snake game
var canvas = document.getElementById("snakeCanvas");
var ctx = canvas.getContext("2d");

var keys = []; //Array for storing what keys are clicked. Key is clicked if key[keyCode] = true
var tileSize = canvas.width / 25;
//var points = 0;
var direction = {x: 1, y: 0}
//snake is represented by an array of coordinates
var snake = [{x:2, y:0}, {x:1, y:0}, {x:0, y:0}];
var apple = {x: 5, y: 5}


//Event listener for keyes clicked
window.addEventListener("keydown", addClick, true);
window.addEventListener("keyup", deleteClick, true);

function addClick(event) {
	keys[event.keyCode] = true;
}
function deleteClick(event) {
	delete keys[event.keyCode];
}

setInterval(update, 100); //1000/10 = 10 fps
function update(){
	//W | UP
	if ((keys[87] || keys[38]) && direction.y == 0) {
		direction = {x: 0, y: -1}
	}
	//S | DOWN
	else if ((keys[83] || keys[40]) && direction.y == 0) {
		direction = {x: 0, y: 1}
	}
	//A | LEFT
	else if ((keys[65] || keys[37]) && direction.x == 0) {
		direction = {x: -1, y: 0}
	}
	//D | RIGHT
	else if ((keys[68] || keys[39]) && direction.x == 0) {
		direction = {x: 1, y: 0}
	}

	for (var i = snake.length - 1; i > 0; i--) {
		snake[i].x = snake[i-1].x;
		snake[i].y = snake[i-1].y;
	}

	//Move the snake
	snake[0].x += direction.x;
	snake[0].y += direction.y;

	//if the snake eats an apple
	if (snake[0].x == apple.x && snake[0].y == apple.y) {
		//give the apple a random coordinate and make the snake longer
		apple.x = parseInt(Math.random()*tileSize);
		apple.y = parseInt(Math.random()*tileSize);
		snake.push({x: snake[snake.length-1].x, 
					y: snake[snake.length-1].y});

	}
	//if the snake eat itself
	for (var i = 1; i < snake.length; i++) {
		if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
			window.location.reload(false);
		}
	}

	//if the snake hits the wall
	//can change this so i comes out the other side
	if (snake[0].x > 24 || snake[0].x < 0 || snake[0].y > 24 || snake[0].y < 0) {
		window.location.reload(false);
	}
	//Draw
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "black";
	for (var i = 0; i < snake.length; i++) {
		ctx.fillRect((snake[i].x * tileSize), (snake[i].y * tileSize), tileSize-1, tileSize-1);
	}

	ctx.fillStyle = "red";
	ctx.fillRect((apple.x * tileSize), (apple.y * tileSize), tileSize, tileSize);
}