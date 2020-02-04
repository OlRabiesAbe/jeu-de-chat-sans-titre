/**
 * DATE: 1/23/20
 * NAME: Collision and Interaction and Platform Generator Prototype 1.
 * Author: Tyler Jackson
 * 
 */
 
var GREEN_PLATFORM_WIDTH = 358;
var GREEN_PLATFORM_HEIGHT = 83;
var DEATH_PUDDLE_WIDTH = 287;
var DEATH_PUDDLE_HEIGHT = 214;
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
	this.bkgr = new Animation(ASSET_MANAGER.getAsset("./img/skyscraper.png"), 0, 0, 1238, 535, 1, 1, true, false);
	this.radius = 200;
	//this.removeFromWorld = false;
	 Entity.call(this, game, 0, 0);
	 this.boundingbox = null;
}

Background.prototype = new Entity();
Background.prototype.constructor = Background;

Background.prototype.update = function () {
}

Background.prototype.draw = function (ctx) {
   this.bkgr.drawFrame(this.game.clockTick, ctx, this.x, this.y);
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


BoundingBox.prototype.updateBoundingBox = function(theX, theY, theWidth, theHeight){ 
	this.x = theX;
	this.y = theY;
	this.width = theWidth;
	this.height = theHeight;
	this.left = theX;
    this.top = theY;
    this.right = this.left + this.width;
    this.bottom = this.top + this.height;
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
	for (var i = 0; i <= 17; i++) {
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
	this.color = color;
	this.length = length;
	this.height = height
	this.x = x;
	this.y = y;
 	this.animation = null;
	if (this.color === "Green") {
		this.length = 358;
		this.height = 83;
		this.animation = new Animation(ASSET_MANAGER.getAsset("./img/platform.png"), 48, 445, 358, 83, 1, 1, true, false);
		this.boundingbox = new BoundingBox(x, y, length, height);
	} 
	if (this.color === "Red") {
		this.animation = new Animation(ASSET_MANAGER.getAsset("./img/puddle.png"), 1732, 1070, 287, 214, 0.25, 3, true, false);
		this.boundingbox = new BoundingBox(x + 60, y, 200, 80);
	}
	else {
		this.boundingbox = new BoundingBox(x, y, length, height);
	}
    

	
	Entity.call(this, game, x, y)
}
Platform.prototype = new Entity();
Platform.prototype.constructor = Platform;

Platform.prototype.update = function (ctx) {
	if (this.color === "Red") {
		//alert(this.animation.elapsedTime + " " + this.animation.totalTime);
		if (this.animation.elapsedTime === 0) {
			//this.elapsedTime = 0;
			this.animation.reverse = !this.animation.reverse;
			this.animation.elapsedTime += this.animation.frameDuration;
			
			//alert(this.animation.reverse + " " + this.animation.elapsedTime);
		}
	} if (this.color === "Blue") {
		if (this.animation.isDone()) {
			this.color = "Red";
			this.animation = new Animation(ASSET_MANAGER.getAsset("./img/puddle.png"), 1732, 1070, 287, 214, 0.25, 3, true, false);
		}
		
	}
}
Platform.prototype.draw = function (ctx) {
	if (this.animation !== null) {
		if (this.color === "Red") {
			this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - 170);
			ctx.strokeStyle = this.boundingbox.color;
			ctx.strokeRect(this.boundingbox.x - this.game.camera.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
		} else if (this.color === "Green") {
			this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y);
			ctx.strokeStyle = this.boundingbox.color;
			ctx.strokeRect(this.boundingbox.x - this.game.camera.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
		}
		 else if (this.color === "Blue") {
			this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - 140);
			ctx.strokeStyle = this.boundingbox.color;
			ctx.strokeRect(this.boundingbox.x - this.game.camera.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
		}
	}
	else {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x - this.game.camera.x,this.y,this.length,this.height);
	}
    Entity.prototype.draw.call(this);
}

//~.~.~.~.~.~.~.~.~.~.~.~. code for a generic tile ~.~.~.~.~.~.~.~.~.~.~.~.//
function Tile(game, img, framex, framey, x, y,) {
	this.game = game;
	this.x = x * 128; this.y = y * 128;
	this.x = x * 128; this.y = y * 128;
	this.width = 128; this.height = 128; 
	//Animation(spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse)
	this.animation = new Animation(ASSET_MANAGER.getAsset(img), framex, framey, 32, 32, 1, 1, true, false);
}
Tile.prototype = new Entity();
Tile.prototype.constructor = Tile;
Tile.prototype.update = function(ctx) {
	
	//checking if the cat is in this tile. last else = a collision is occuring
	if(this.game.cat.y + this.game.cat.height < this.y || this.y + this.height < this.game.cat.y) {}
	else if (this.game.cat.x + this.game.cat.width < this.x || this.x + this.width < this.game.cat.x) {}
	else {
		//approach from left
		if (this.game.cat.x < this.x) this.game.cat.x = this.game.cat.x - (this.game.cat.x + this.game.cat.width - this.x);
		else if (this.game.cat.x >= this.x) this.game.cat.x = this.game.cat.x + (this.x + this.width - this.game.cat.x);
	}
}
Tile.prototype.draw = function(ctx) {
	this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 3);
	Entity.prototype.draw.call(this);
}

function Lamp(game, x, y) {
	this.offAnim = new Animation(ASSET_MANAGER.getAsset("./img/lamp.png"), 0, 0, 74, 373, 1, 1, true, false);
	this.onAnim = new Animation(ASSET_MANAGER.getAsset("./img/lamp.png"), 76, 0, 74, 373, 1, 1, true, false);
	this.flag = false;
	Entity.call(this, game, x, 130);
}

Lamp.prototype = new Entity();
Lamp.prototype.constructor = Lamp;

Lamp.prototype.update = function() {
	if (this.game.cat.x >= this.x - 150 && this.game.cat.x <= this.x + 150) {
		this.flag = true;
	} else {
		this.flag = false;
	}
}
Lamp.prototype.draw = function(ctx) {

	if (this.flag) {
		this.onAnim.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y);
	} else {
		this.offAnim.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y);
	}
		
}
function Bird(game, x, y, type) {	
	this.bird = new Animation(ASSET_MANAGER.getAsset("./img/bird.png"), 35, 35, 185,70, 0.1, 4, true, false)
	this.reverseBird = new Animation(ASSET_MANAGER.getAsset("./img/bird.png"), 30, 600, 185,70, 0.1, 4, true, false)
	this.attackBird = new Animation(ASSET_MANAGER.getAsset("./img/bird.png"), 30, 400, 185,100, 0.1, 1, true, false)
	
	this.type = type
	this.length = 50;
	this.height = 100
	this.start = x
	this.x = x;
	this.y = y;
	this.type = type
	this.count = 0;
	this.leftCheck = true;
	this.rightCheck = false
	Entity.call(this, game, x , y )
}
Bird.prototype = new Entity();
Bird.prototype.constructor = Enemy;

Bird.prototype.update= function() {
	
	if(this.type === "Fly"){
		if(this.x === 200){
			this.leftCheck = false;
			this.rightCheck = true
		}
		if(this.x === 604){
			this.leftCheck = true;
			this.rightCheck = false
		}
		if(this.leftCheck){
			this.x -= 4
		}
		if(this.rightCheck){
			this.x += 4
		}
	}
	if(this.type === "Attack"){
		if(this.x === 200){
			this.leftCheck = false;
			this.rightCheck = true
		}
		if(this.x === 404){
			this.leftCheck = true;
			this.rightCheck = false
		}
		if(this.leftCheck){
			this.y += 4
			this.x -= 4
		}
		if(this.rightCheck){
			this.y -= 4
			this.x += 4
		}
	}
	
}
Bird.prototype.draw = function (ctx) {
	if(this.type === "Fly" && this.leftCheck ){
		this.bird.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y)

	} 
	if(this.type === "Fly" && this.rightCheck|| this.type === "Attack" && this.rightCheck){
		this.reverseBird.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y)

	} 
	if(this.type === "Attack" && this.leftCheck){
		this.attackBird.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y)

	} 
    Entity.prototype.draw.call(this);
}
function Range(game, x, y, type) {
	this.ready = new Animation(ASSET_MANAGER.getAsset("./img/cowboy.png"), 240, 370, 190, 160, 0.12, 3, true, false);
	this.bullet = new Animation(ASSET_MANAGER.getAsset("./img/bullet.png"), 240, 370, 190, 160, 0.12, 3, true, false);
	this.l = true;
	this.r = false
	this.type = type
	this.color = "Gold"
	this.length = 50;
	this.height = 100
	this.start = x
	this.x = x;
	this.y = y;
	this.count = 0;
	this.leftCheck = true;
	this.rightCheck = false
	Entity.call(this, game, this.x , this.y)
}
Range.prototype = new Entity();
Range.prototype.constructor = Range;

Range.prototype.update= function() {
	
    Entity.prototype.update.call(this);
	
}

Range.prototype.draw = function (ctx) {
	this.ready.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y)
	
}
function Bullet(game, x, y) {
	this.bullet = new Animation(ASSET_MANAGER.getAsset("./img/bullet.png"), 15, 240, 61.75, 70, 0.12, 7, true, false);
	
	this.color = "Gold"
	this.length = 50;
	this.height = 100
	this.x = x;
	this.y = y;
	this.count = 0;
	this.leftCheck = true;
	this.rightCheck = false
	Entity.call(this, game, this.x , this.y)
}
Bullet.prototype = new Entity();
Bullet.prototype.constructor = Bullet;

Bullet.prototype.update= function() {
	this.x += 5
	if(this.x === 1100){
		this.x = 620
	}
    Entity.prototype.update.call(this);
	
}

Bullet.prototype.draw = function (ctx) {
	this.bullet.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y)
	
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
    if (this.x < -150) this.x = 2200;
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

function EnemyIdle(game, x, y) {
	this.idle = new Animation(ASSET_MANAGER.getAsset("./img/dog.png"), 0, 500, 153, 115, 0.6, 3, true, false);
//	this.idleRev = new Animation(ASSET_MANAGER.getAsset("./img/dog.png"), 0, 500, 153, 115, 0.8, 3, false, true);
	this.idleL = new Animation(ASSET_MANAGER.getAsset("./img/dog.png"), 460, 500, 153, 115, 0.6, 3, true, false);
//	this.idleRevL = new Animation(ASSET_MANAGER.getAsset("./img/dog.png"), 345, 500, 153, 115, 0.8, 3, false, true);
//	this.rev = false;
	this.l = true;
	this.r = false;
	this.color = "Gold"
	this.length = 50;
	this.height = 100
	this.start = x
	this.x = x;
	this.y = y;
	this.count = 0;
	this.leftCheck = true;
	this.rightCheck = false
	Entity.call(this, game, x - 50, 400)
}
EnemyIdle.prototype = new Entity();
EnemyIdle.prototype.constructor = EnemyIdle;

EnemyIdle.prototype.update= function() {
	if (this.game.cat.x < this.x) {
		this.l = true;
		this.r = false;
	} else {
		this.l = false;
		this.r = true;
	}
}
EnemyIdle.prototype.idleHelp = function(idleAnim, revAnim) {
	if (idleAnim.isDone()) {
		this.rev = true;
		idleAnim.elapsedTime = 0;
	}
	else if (this.idleRev.isDone()) {
		this.rev = false;
		revAnim.elapsedTime = 0;
	}
	return;
}
EnemyIdle.prototype.draw = function (ctx) {
	ctx.fillStyle = this.color;
	if (this.l) {
		this.idleL.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y);
	} else {
		this.idle.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y);
	}
    //ctx.fillRect(this.x,this.y,this.length,this.height);
    Entity.prototype.draw.call(this);
}

function EnemyPace(game, minX, maxX, y) {
	this.paceL = new Animation(ASSET_MANAGER.getAsset("./img/dog.png"),0, 250, 152, 115, 0.1, 4, true, false);
//	this.idleRev = new Animation(ASSET_MANAGER.getAsset("./img/dog.png"), 0, 500, 153, 115, 0.8, 3, false, true);
	this.pace = new Animation(ASSET_MANAGER.getAsset("./img/dog.png"),  0, 0, 152, 115, 0.1, 6, true, false);
	this.l = true;
	this.r = false;
	this.minX = minX;
	this.maxX = maxX;
	this.color = "Gold"
	this.length = 50;
	this.height = 100

	this.count = 0;
	this.leftCheck = true;
	this.rightCheck = false
	Entity.call(this, game, 400, y)
}
EnemyPace.prototype = new Entity();
EnemyPace.prototype.constructor = EnemyIdle;

EnemyPace.prototype.update= function() {
	if (this.l) {
		if (this.x - 5 >=	this.minX) {
			this.x -= 5;
		} else {
			this.l = false;
			this.r = true;
		}
	} else if (this.r) {
		if (this.x + 5 <= this.maxX) {
			this.x += 5;
		} else {
			this.l = true;
			this.r = false;
		}
	}
}

EnemyPace.prototype.draw = function(ctx) {
	if (this.l) {
		this.paceL.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y);
	} else {
		this.pace.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y);
	}
	
}
var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./img/catBeta.png");
ASSET_MANAGER.queueDownload("./img/dog.png");
ASSET_MANAGER.queueDownload("./img/Sidewalk.png");
ASSET_MANAGER.queueDownload("./img/skyscraper.png");
ASSET_MANAGER.queueDownload("./img/platform.png");
ASSET_MANAGER.queueDownload("./img/puddle.png");
ASSET_MANAGER.queueDownload("./img/lamp.png");
ASSET_MANAGER.queueDownload("./img/bird.png");
ASSET_MANAGER.queueDownload("./img/cowboy.png");
ASSET_MANAGER.queueDownload("./img/bullet.png");
ASSET_MANAGER.queueDownload("./img/template.png");
ASSET_MANAGER.downloadAll(function () {
    console.log("starting up da sheild");
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');

    var gameEngine = new GameEngine();
   // var bg = new Background(gameEngine);
	var bg = new Platform(gameEngine, 0, 500, 128 * 17, 100, "Black")
	var skyscraper = new Background(gameEngine);
	//var skyscraper = new Background(gameEngine);

    gameEngine.addPlatform(bg);	
	gameEngine.addEntity(skyscraper);
	/**
	 * Generic platforms can be created, no more need to make a function for each
	 * platform made in the game.
	 * 
	 * var platformName = new Platform(gameEngine, X-Coordinate, Y-Coordinate, Length, Height)
	 *  
	 */
	var plat = new Platform(gameEngine, 100, 430, GREEN_PLATFORM_WIDTH, GREEN_PLATFORM_HEIGHT, "Green");
	var p2 = new Platform(gameEngine, 500, 350, GREEN_PLATFORM_WIDTH, GREEN_PLATFORM_HEIGHT, "Green");
	var p3 = new Platform(gameEngine, 900, 350, GREEN_PLATFORM_WIDTH, GREEN_PLATFORM_HEIGHT, "Green")
	var death = new Platform(gameEngine, 1800, 500, DEATH_PUDDLE_WIDTH, DEATH_PUDDLE_HEIGHT, "Red")
	var bad = new Enemy(gameEngine, 700, 400)
	var bad2 = new Enemy(gameEngine, 1400, 400);
	var bad3 = new EnemyIdle(gameEngine, 500, 400);
	var bad4 = new EnemyIdle(gameEngine, 1300);
	var bad5 = new EnemyPace(gameEngine, 100, 600, 390);
	var bad6 = new EnemyPace(gameEngine, 900, 1300, 390)
	var lamp = new Lamp(gameEngine, 950, 400); 
	var lamp2 = new Lamp(gameEngine, 1300, 400);
	var lamp3 = new Lamp(gameEngine, 1600, 400);
		
	var birdFly = new Bird(gameEngine,  600, 100, "Fly")
	var birdAttack = new Bird(gameEngine,  400, 150, "Attack")
	var range = new Range(gameEngine,  500, 200, "Attack")
	var bullet = new Bullet(gameEngine,  620, 185)
	var sidewalk = new Sidewalk(gameEngine);
	
    gameEngine.addPlatform(plat);
    gameEngine.addPlatform(p2);
	gameEngine.addEntity(sidewalk); 
    gameEngine.addPlatform(death);
	
	gameEngine.addEntity(lamp);
	gameEngine.addEntity(lamp2);
	gameEngine.addEntity(lamp3);
	
    gameEngine.addEnemy(bad);
	gameEngine.addEnemy(bad2);
	gameEngine.addEnemy(bad3);
	gameEngine.addEnemy(bad4);
	gameEngine.addEnemy(bad5);
	gameEngine.addEnemy(bad6);
	
	gameEngine.addEntity(gameEngine.cat);
	gameEngine.addEntity(gameEngine.camera);
	gameEngine.addEnemy(birdFly);
	gameEngine.addEnemy(birdAttack);
	gameEngine.addEnemy(range)
	gameEngine.addEntity(bullet);
	
	gameEngine.addPlatform(new Tile(gameEngine, "./img/template.png", 0, 0, 3, 1));

	
	console.log(gameEngine.platforms);
	//console.log(gameEngine.enemies);
	//console.log(gameEngine.otherEntities);
	
    gameEngine.init(ctx);
    console.log(gameEngine.cat.platform)
	gameEngine.start();
});
