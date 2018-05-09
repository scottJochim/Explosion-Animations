/*
Attributions: 
Sprite animation tutorial:
	http://www.williammalone.com/articles/create-html5-canvas-javascript-sprite-animation/
Spritesheets:
	http://1.bp.blogspot.com/-h4gHvGnPfH0/UmFUg1riZlI/AAAAAAAAAFU/FGgUImTIGbU/s640/explosjon3.png
Audio:
	https://www.soundeffectsplus.com/product/explosion-01/
*/

//Define the canvas
let canvas = document.getElementById('canvas');
canvas.width = 512;
canvas.height = 512;

//Define global vars
let tickCount,
	frameXPos,
	frameYPos;

function init() {
	"use strict";
	//Define the explosion image and sound
	let explosionImage = new Image();
	explosionImage.src = "images/e1.png";
	let explosionSound = new Audio();
	explosionSound.src = "audio/explosion1.mp3";
	tickCount = 0;
	frameXPos = 0;
	frameYPos = 0;
	// Create a sprite object
	let explosion = Explosion({
		image: explosionImage,
		sound: explosionSound,
		imageWidth: 512,
		imageHeight: 512,
		frameWidth: 128,
		frameHeight: 128,
		ticksPerFrame: 2
	});
	explosion.render();
}

//Define the spite object
function Explosion(options) {
	"use strict";
	let that = {};
	that.image = options.image;
	that.sound = options.sound;
	that.imageWidth = options.imageWidth;
	that.imageHeight = options.imageHeight;
	that.frameWidth = options.frameWidth;
	that.frameHeight = options.frameHeight;
	that.ticksPerFrame = options.ticksPerFrame;
	that.context = canvas.getContext('2d');

	that.render = function() {
		//Prevents error: "Uncaught TypeError: Cannot read property 'render' of null at that.render"
		if (that !== null) {
			requestAnimationFrame(that.render);
			that.sound.play();
			that.context.clearRect((that.imageWidth - that.frameWidth)/2, (that.imageHeight - that.frameHeight)/2, that.frameWidth, that.frameHeight);
			that.context.drawImage(
				that.image,
				//The top left corner of the selected portion of the sprite sheet:
				frameXPos,
				frameYPos,
				//The portion of the sprite sheet that will be drawn:
				that.frameWidth,
				that.frameHeight,
				//Where the top left corner will be drawn (calculated for center of canvas):
				(that.imageWidth - that.frameWidth)/2,
				(that.imageHeight - that.frameHeight)/2,
				//The size of the drawing:
				that.frameWidth,
				that.frameHeight
			);
			that.update();
		}
	};

	that.update = function() {
		if(tickCount >= that.ticksPerFrame) {
			tickCount = 0;
			if(frameXPos < that.imageWidth - that.frameWidth) {
				frameXPos += that.frameWidth;
			} else {
				frameXPos = 0;
				if(frameYPos < that.imageHeight - that.frameHeight) {
					frameYPos += that.frameHeight;
				} else {
					that.context.clearRect((that.imageWidth - that.frameWidth)/2, (that.imageHeight - that.frameHeight)/2, that.frameWidth, that.frameHeight);
					that = null;
				}
			}
		} else {
			tickCount++;
		}
	};
	return that;
}