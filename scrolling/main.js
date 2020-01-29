/**
 * DATE: 1/23/20
 * NAME: Collision and Interaction and Platform Generator Prototype 1.
 * Author: Tyler Jackson
 * 
 */
function Animation(spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse) {
    this.spriteSheet = spriteSheet;
    this.startX = startX;
    this.startY = startY;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.reverse = reverse;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y, scaleBy) {
    var scaleBy = scaleBy || 1;
    this.elapsedTime += tick;
    if (this.loop) {
        if (this.isDone()) {
            this.elapsedTime = 0;
        }
    } else if (this.isDone()) {
        return;
    }
    var index = this.reverse ? this.frames - this.currentFrame() - 1 : this.currentFrame();
    var vindex = 0;
    if ((index + 1) * this.frameWidth + this.startX > this.spriteSheet.width) {
        index -= Math.floor((this.spriteSheet.width - this.startX) / this.frameWidth);
        vindex++;
    }
    while ((index + 1) * this.frameWidth > this.spriteSheet.width) {
        index -= Math.floor(this.spriteSheet.width / this.frameWidth);
        vindex++;
    }

    var locX = x;
    var locY = y;
    var offset = vindex === 0 ? this.startX : 0;
    ctx.drawImage(this.spriteSheet,
                  index * this.frameWidth + offset, vindex * this.frameHeight + this.startY,  // source from sheet
                  this.frameWidth, this.frameHeight,
                  locX, locY,
                  this.frameWidth * scaleBy,
                  this.frameHeight * scaleBy);
	
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

function Background(game) {
    Entity.call(this, game, 0, 400);
    this.radius = 200;
}

Background.prototype = new Entity();
Background.prototype.constructor = Background;

Background.prototype.update = function () {
}

Background.prototype.draw = function (ctx) {
    ctx.fillStyle = "SaddleBrown";
    ctx.fillRect(0,500,800,300);
    Entity.prototype.draw.call(this);
}
function BoundingBox(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.left = x;
    this.top = y;
    this.right = this.left + width;
    this.bottom = this.top + height;
    
    this.color = color
   
}

BoundingBox.prototype.collide = function (oth) {
	if (oth === null) {
		return false;
	}
    if (this.right > oth.left && this.left < oth.right && this.top < oth.bottom && this.bottom > oth.top){
    	oth.color = "Green"
    	return true;
    }
    return false;
}




function Sidewalk(game) {
	this.sidewalk = new Animation(ASSET_MANAGER.getAsset("./img/Sidewalk.png"), 0, 0, 128, 60, 0.03, 1, true, false);
	
	this.radius = 200;
	Entity.call(this, game, 0, 500);
	this.boundingbox = null;
}

Sidewalk.prototype = new Entity();
Sidewalk.prototype.constructor = Sidewalk;

Sidewalk.prototype.update = function() { 
}

Sidewalk.prototype.draw = function(ctx) {
	for (var i = 0; i <= 12; i++) {
		this.sidewalk.drawFrame(this.game.clockTick, ctx, this.x + (i * 128) - this.game.camera.x, this.y);
	}
	Entity.prototype.draw.call(this);
}

/**
 * This function creates a generic platform
 * @param 
 * game is the standard game engine
 * x is an double that holds X-Value coordinates of the platform.
 * y is a double that holds the Y-Value of the platform.
 * length is a double that holds the length value of the platform drawn.
 * Height is a double that holds the height of the platform drawn.
 * 
 * @returns a generic platform with an entity call.
 * 
 * TODO: Add an addition paramater with a sprite animation to 
 * 		 fill in over the platform/shape drawn.
 */
function Platform(game, x, y, length, height, color) {
	this.radius = 100;
	this.color = color
	this.length = length;
	this.height = height
	this.x = x;
	this.y = y;
	
    this.boundingbox = new BoundingBox(x, y, length, height);

	
	Entity.call(this, game, x, y)
}
Platform.prototype = new Entity();
Platform.prototype.constructor = Platform;

Platform.prototype.draw = function (ctx) {
	ctx.fillStyle = this.color;
    ctx.fillRect(this.x - this.game.camera.x,this.y,this.length,this.height);
    Entity.prototype.draw.call(this);
}
function Enemy(game, x, y) {
	this.left = new Animation(ASSET_MANAGER.getAsset("./img/dog.png"), 0, 250, 153, 115, 0.1, 4, true, false);
	this.right = new Animation(ASSET_MANAGER.getAsset("./img/dog.png"), 0, 0, 153, 115, 0.1, 6, true, false);
	this.l = true;
	this.r = false
	this.color = "Gold"
	this.length = 50;
	this.height = 100
	this.start = x
	this.x = x;
	this.y = y;
	this.count = 0;
	this.leftCheck = true;
	this.rightCheck = false
	Entity.call(this, game, x - 50, y -12)
}
Enemy.prototype = new Entity();
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update= function() {
	this.x -= 4;
    if (this.x < -150) this.x = 1600;
    Entity.prototype.update.call(this);
	
}

Enemy.prototype.draw = function (ctx) {
	ctx.fillStyle = this.color;
	if(this.r){
		this.right.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y); 
	} else if(this.l){
		this.left.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y); 
	}
	
    //ctx.fillRect(this.x,this.y,this.length,this.height);
    Entity.prototype.draw.call(this);
}


var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./img/catBeta.png");
ASSET_MANAGER.queueDownload("./img/dog.png");
ASSET_MANAGER.queueDownload("./img/Sidewalk.png");
ASSET_MANAGER.downloadAll(function () {
    console.log("starting up da sheild");
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');

    var gameEngine = new GameEngine();
   // var bg = new Background(gameEngine);
	var bg = new Platform(gameEngine, 0, 500, 128 * 13, 300, "SaddleBrown")
    gameEngine.addEntity(bg);	

	/**
	 * Generic platforms can be created, no more need to make a function for each
	 * platform made in the game.
	 * 
	 * var platformName = new Platform(gameEngine, X-Coordinate, Y-Coordinate, Length, Height)
	 *  
	 */
	var plat = new Platform(gameEngine, 100, 250, 100, 50, "Green");
	var p2 = new Platform(gameEngine, 400, 250, 100, 50, "Green")
	var death = new Platform(gameEngine, 350, 500, 100, 20, "Red")
	var bad = new Enemy(gameEngine, 700, 400)
	var sidewalk = new Sidewalk(gameEngine);
    gameEngine.addEntity(plat);
    gameEngine.addEntity(p2);
	gameEngine.addEntity(sidewalk); 
    gameEngine.addEntity(death)
    gameEngine.addEntity(bad)
	gameEngine.addEntity(gameEngine.cat);
	gameEngine.addEntity(gameEngine.camera);
	console.log(gameEngine.entities);
    gameEngine.init(ctx);
    gameEngine.start();
});
