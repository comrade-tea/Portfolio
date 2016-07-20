window.onload = function () {

	const framesPerSec = 60;

	let canvas, ctx, canvasBound, ballX, ballY, ballSpeedX, ballSpeedY, ballIsTriggered, BALL_SPEED;
	let PADDLE_WIDTH, PADDLE_THICKLESS, paddleX;
	let BLOCK_WIDTH, BLOCK_HEIGHT, BLOCKS_QUANT, BLOCKS_PER_LINE, BLOCKS_COLOR;

	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");

	PADDLE_WIDTH = 100;
	PADDLE_THICKLESS = 6;
	paddleX = 200;

	ballX = canvas.width / 2;
	ballY = canvas.height - (PADDLE_THICKLESS + 10);
	BALL_SPEED = 4;
	ballSpeedX = 0;
	ballSpeedY = 0;
	ballIsTriggered = false;

	BLOCK_WIDTH = 36;
	BLOCK_HEIGHT = 16;

	BLOCKS_QUANT = 24;
	BLOCKS_PER_LINE = 8;
	BLOCKS_COLOR = "yellow";

	let blockArr = [];

	canvasBound = canvas.getBoundingClientRect(); //get object with offsets
	resetGrid(); // show bricks

	let cursorX, cursorY;
	canvas.addEventListener("mousemove", function (e) {
		cursorX = e.clientX - canvasBound.left;
		cursorY = e.clientY - canvasBound.top;

		// paddle exception
		if (cursorX < (canvas.width - PADDLE_WIDTH / 2) && cursorX > PADDLE_WIDTH / 2) {
			paddleX = cursorX;
		}
		// not triggered exception
		if (!ballIsTriggered && cursorX > PADDLE_WIDTH / 2 && cursorX < canvas.width - PADDLE_WIDTH / 2) {
			ballX = cursorX;
		}
	});
	//
	canvas.addEventListener("click", function () {
		if (!ballIsTriggered) {
			ballIsTriggered = true;
			ballSpeedY = -BALL_SPEED;
		}
	});


	let animation = setInterval(function () {
		moveAll();
		drawAll();
	}, 1000 / framesPerSec);

	function moveAll() {
		ballX += ballSpeedX;
		if (ballX > canvas.width - 10 || ballX < 10) {
			ballSpeedX *= -1;
		}

		ballY += ballSpeedY;

		if (ballY > canvas.height + 40) { // if lose
			ballX = cursorX;
			ballY = canvas.height - (PADDLE_THICKLESS + 10);
			ballSpeedX = 0;
			ballSpeedY = 0;
			ballIsTriggered = false;
			resetGrid();
		}
		if (ballY < 10) {
			ballSpeedY *= -1;
		}
		//bounce from paddle
		if (ballX >= paddleX - (PADDLE_WIDTH / 2) && ballX < paddleX + (PADDLE_WIDTH / 2) && ballY == canvas.height - (PADDLE_THICKLESS * 2)) {
			//ballSpeedY *= -1;

			/*increase speed*/
			let bounceDegree = 150 - 1.2 * (ballX - (paddleX - PADDLE_WIDTH / 2))

			ballSpeedX = BALL_SPEED * Math.cos((bounceDegree * Math.PI) / 180) * -1;
			ballSpeedY = BALL_SPEED * Math.sin((bounceDegree * Math.PI) / 180) * -1;
			//console.log(`increment: ${(paddleX - ballX) * 0.2}, currentSpeed:${ballSpeedX}`);

			/*reverse ball*/
			if (ballX < paddleX) ballSpeedX *= -1
			if (ballX > paddleX) ballSpeedX *= -1
		}
	}

	function drawAll() {
		colorRect(0, 0, canvas.width, canvas.height, "#000000"); //clear canvas
		colorCircle(ballX, ballY, 10, "red");  //draw circle, lol

		drawGrid();
		//colorText(`${cursorX}, ${cursorY}`, cursorX, cursorY, "yellow");

		// draw paddle
		colorRect(paddleX - (PADDLE_WIDTH / 2), canvas.height - PADDLE_THICKLESS, PADDLE_WIDTH, PADDLE_THICKLESS, "#ffffff");
	}


	/*helpers*/
	function colorRect(x, y, width, height, color) {
		ctx.fillStyle = color;
		ctx.fillRect(x, y, width, height)
	}

	function colorCircle(x, y, radius, fillColor) {
		ctx.beginPath();
		ctx.fillStyle = fillColor;
		ctx.arc(x, y, radius, 0, Math.PI * 2);
		ctx.fill();
	}

	function colorText(textData, x, y, textColor) {
		ctx.fillStyle = textColor;
		ctx.fillText(textData, x, y);
	}

	/*grid*/
	function resetGrid() {
		for (var i = 0; i < BLOCKS_QUANT; i++) {
			blockArr[i] = true;
		}
	}

	function drawGrid() {
		const protoBrickX = 20;
		let brickX = 20,
			brickY = 30;
		let readyForDouble = false;

		for (let i = 0; i < blockArr.length; i++) {

			if (
				(ballX + 10 >= brickX && ballX - 10 <= brickX + BLOCK_WIDTH)
				&&
				(ballY + 10 >= brickY && ballY - 10 <= brickY + BLOCK_HEIGHT)
				&&
				blockArr[i]
			) {
				if (!readyForDouble) {
					ballSpeedY *= -1;
				}

				readyForDouble = true;
				blockArr[i] = false;
			}

			if (blockArr[i]) { //show if visible
				colorRect(brickX, brickY, BLOCK_WIDTH, BLOCK_HEIGHT, BLOCKS_COLOR);
			}
			brickX += BLOCK_WIDTH + 10;

			//shift to next line
			if ((i + 1) % BLOCKS_PER_LINE == 0) {
				brickX = protoBrickX;
				brickY += BLOCK_HEIGHT + 10;
			}

		}

		//console.log(blockArr.every(el => el == false));
		if (blockArr.every(el => el == false)) {
			win();
		}
	}

	function win() {
		clearInterval(animation);
		$('#myModal').modal();
	}

};







