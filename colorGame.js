var numSquares = 6;
var pickedColor;
var colors = [];
// selecting divs with class as square
var squares = document.querySelectorAll(".square");
// selecting h1 with id colorDisplay
var colorDisplay = document.getElementById("colorDisplay");
// selecting h1
var h1 = document.querySelector("h1");
// selecting the new colors button
var reset = document.querySelector("#reset");
// selecting easy and hard buttons
var modeBtns = document.querySelectorAll(".mode");

var message = document.getElementById("message");

// gets called whenever page is reloaded
init();

function init(){
	setUpModes();
	setUpSquares();
	resetFun();
}

function setUpModes(){
	for (var i=0; i<modeBtns.length; i++){
		modeBtns[i].addEventListener("click", function(){
			modeBtns[0].classList.remove("selected");
			modeBtns[1].classList.remove("selected");
			modeBtns[2].classList.remove("selected");
			this.classList.add("selected");
			// this.textContent === "Easy" ? numSquares = 3 : numSquares = 6
			if (this.textContent==="Easy"){
				numSquares = 3;
			}
			else if (this.textContent==="Normal"){
				numSquares = 6;
			}
			else{
				numSquares = 9;
			}
			resetFun();
		});
	}
}

function setUpSquares(){
	for (var i=0; i<squares.length; i++){
		// creating a click event for the guessing game
		squares[i].addEventListener("click", function(){
			var clickedColor = this.style.backgroundColor;
			if (pickedColor === clickedColor){
				message.textContent = "Correct!";
				colorChange(pickedColor);
				h1.style.backgroundColor = pickedColor;
				reset.textContent = "Play Again";
			}
			else{
				message.textContent = "Try Again";
				// to make the background color of incorrect guessed square fade into background color of body
				this.style.backgroundColor = "#232323";
			}
		});
	}
}

function resetFun(){
	// generate new colors
	colors = generateColors(numSquares);
	// pick a new random color
	pickedColor = pickColor();
	// change colorDisplay to match picked color
	colorDisplay.textContent = pickedColor;
	// resetting the message
	message.textContent = "";
	// changing button text to new colors
	reset.textContent = "New colors";
	// change colors of squares
	for (var i=0; i<squares.length; i++){
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		}
		else{
			squares[i].style.display = "none";
		}
		
	}
	h1.style.backgroundColor = "steelblue";
}

// if the guess is correct, this function will change the background color of all the squares to the right color
function colorChange(color){
	for (var i=0; i<squares.length; i++){
		squares[i].style.backgroundColor = color;
	}
}

// to pick up a random color
function pickColor(){
	// Math.random picks up a value between 0 and 1(excluding), so we multiply to increase the range and then take floor value to get integer value
	var num = Math.floor(Math.random()*colors.length);
	return colors[num];
}

// to generate random colors for the game
function generateColors(num){
	var colors = [];
	for (var i=0; i<num; i++){
		// generate random colors and push to colors array
		colors.push(randomColor());
	}
	return colors;
}

// for generating random colors
function randomColor(){
	// pick a red from 0-255
	var red = Math.floor(Math.random()*256);
	// pick a green from 0-255
	var green = Math.floor(Math.random()*256);
	// pick a blue from 0-255
	var blue = Math.floor(Math.random()*256);

	// creating a color string containing rgb values
	var color = "rgb(" + red + ", " + green + ", " + blue + ")";
	return color;
}

reset.addEventListener("click", resetFun);


// easy.addEventListener("click", function(){
// 	easy.classList.add("selected");
// 	hard.classList.remove("selected");
// 	numSquares = 3;
// 	colors = generateColors(numSquares);
// 	pickedColor = pickColor();
// 	colorDisplay.textContent = pickedColor;
// 	for (var i=0; i<squares.length; i++){
// 		if(colors[i]){
// 			squares[i].style.background = colors[i];
// 		}
// 		else{
// 			squares[i].style.display = "none";
// 		}
// 	}
// });

// hard.addEventListener("click", function(){
// 	hard.classList.add("selected");
// 	easy.classList.remove("selected");
// 	numSquares = 6;
// 	colors = generateColors(numSquares);
// 	pickedColor = pickColor();
// 	colorDisplay.textContent = pickedColor;
// 	for (var i=0; i<squares.length; i++){
// 		squares[i].style.background = colors[i];
// 		squares[i].style.display = "block";
// 	}
// });