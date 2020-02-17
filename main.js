/**
 * DATE: 2/13/2020
 * NAME: Main file.
 * Author: Tyler Jackson, Elijah Cole, Brent O'Neill
 */
 
var GREEN_PLATFORM_WIDTH = 358;
var GREEN_PLATFORM_HEIGHT = 83;
var DEATH_PUDDLE_WIDTH = 287;
var DEATH_PUDDLE_HEIGHT = 214;

// USE CONSTANTS FOR SCENE INDEXES 
var TITLE_SCENE = 0;
var LEVEL_ONE_SCENE = 1;
var STATUS_SCENE = 2;
var GAME_OVER_SCENE = 3;
var PROTOTYPE_SCENE = 4;
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
 * A lamp will turn on when the cat is near it.
 */
function Lamp(game, x, y) {
	this.offAnim = new Animation(ASSET_MANAGER.getAsset("./img/lamp.png"), 1023, 0, 128, 384, 1, 1, true, false);
	this.onAnim = new Animation(ASSET_MANAGER.getAsset("./img/lamp.png"), 0, 0, 128, 384, 0.02, 8, true, false);
	this.flag = false;
	Entity.call(this, game, x, 120);
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

/**
 * A checkpoint is a light post that turns blue when active. This will save where the cat
 * has progressed so on death the cat will respawn there so long as the cat activates a new 
 * checkpoint.
 */
function Checkpoint(game, x, y) {
	this.offAnim = new Animation(ASSET_MANAGER.getAsset("./img/checkpoint.png"), 512, 0, 64, 128, 1, 1, true, false);
	this.onAnim = new Animation(ASSET_MANAGER.getAsset("./img/checkpoint.png"), 0, 0, 64, 128, 0.02, 8, true, false);
	this.on = false;
	Entity.call(this, game, x, y);
}

Checkpoint.prototype = new Entity();
Checkpoint.prototype.constructor = Checkpoint;

Checkpoint.prototype.update = function(ctx) {
	if (this.game.cat.x >= this.x -  5 && this.game.cat.x <= this.x + 5 && !this.on) {
		this.on = true;
		this.game.cat.spawn = this.x;
	}
}

Checkpoint.prototype.draw = function(ctx) {
	if (this.on) {
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


// This enemy will turn around to face you
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

// The enemy will walk back and forth by checking where it is
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



function Level(game, x, y) {
	this.game = game;
	this.anim = new Animation(ASSET_MANAGER.getAsset("./img/levelText.png"), 0, 0, 176, 64, 1, 1, true, false);
	this.zero = new Animation(ASSET_MANAGER.getAsset("./img/numbers.png"), 13, 7, 40, 50, 1, 1, true, false);
	this.one = new Animation(ASSET_MANAGER.getAsset("./img/numbers.png"), 84, 8, 18, 49, 1, 1, true, false);
	this.two = new Animation(ASSET_MANAGER.getAsset("./img/numbers.png"), 143, 7, 36, 50, 1, 1, true, false);
	this.three = new Animation(ASSET_MANAGER.getAsset("./img/numbers.png"), 206, 7, 38, 51, 1, 1, true, false);
	this.four = new Animation(ASSET_MANAGER.getAsset("./img/numbers.png"), 266, 7, 42, 49, 1, 1, true, false);
	this.five = new Animation(ASSET_MANAGER.getAsset("./img/numbers.png"), 337, 8, 36, 50, 1, 1, true, false);
	this.six = new Animation(ASSET_MANAGER.getAsset("./img/numbers.png"), 398, 7, 37, 50, 1, 1, true, false);
	this.seven = new Animation(ASSET_MANAGER.getAsset("./img/numbers.png"), 467, 9, 34, 49, 1, 1, true, false);
	this.eight = new Animation(ASSET_MANAGER.getAsset("./img/numbers.png"), 528, 9, 37, 51, 1, 1, true, false);
	this.nine = new Animation(ASSET_MANAGER.getAsset("./img/numbers.png"), 593, 8, 37, 50, 1, 1, true, false);
	this.nums = [this.zero, this.one, this.two, this.three, this.four, 
				this.five, this.six, this.seven, this.eight, this.nine];
	Entity.call(this, game, x, y);
}

Level.prototype = new Entity();
Level.prototype.constructor = Level;

Level.prototype.update = function() {
	
}

Level.prototype.draw = function(ctx) {
	this.anim.drawFrame(this.game.clockTick, ctx, this.x, this.y);
	this.nums[CURRENT_LEVEL].drawFrame(this.game.clockTick, ctx, this.x + this.anim.frameWidth + 20, this.y + 7);
}

function Health(game) {
	this.healthy = new Animation(ASSET_MANAGER.getAsset("./img/heart sheet.png"), 0, 0, 48, 48, 1, 1, true, false);
	this.unhealthy = new Animation(ASSET_MANAGER.getAsset("./img/heart sheet.png"), 96, 0, 48, 48, 1, 1, true, false);
	this.danger = new Animation(ASSET_MANAGER.getAsset("./img/heart sheet.png"), 0, 0, 48, 48, 0.05, 3, true, false);
	
	this.hearts = [{health:this.healthy, heart:1}, {health:this.healthy, heart:2}, {health:this.healthy, heart:3}];
	
	Entity.call(this, game, 0, 0);
	
}

Health.prototype = new Entity();
Health.prototype.constructor = Health;

Health.prototype.update = function() {
	for (var i = 0; i < this.hearts.length; i++) {
		if (this.hearts[i].heart <= HEALTH) {
			this.hearts[i].health = this.healthy;
		} else {
			this.hearts[i].health = this.unhealthy;
		}
	}
	if (HEALTH === 1) {
		this.hearts[0].health = this.danger;
	}
}
Health.prototype.draw = function(ctx) {
	for (var i = 0; i < this.hearts.length; i++) {
		this.hearts[i].health.drawFrame(this.game.clockTick, ctx, this.x + (this.hearts[i].health.frameWidth * i), this.y);
	}
}
function Lives(game, x, y) {
	this.game = game;
	this.zero = new Animation(ASSET_MANAGER.getAsset("./img/numbers.png"), 13, 7, 40, 50, 1, 1, true, false);
	this.one = new Animation(ASSET_MANAGER.getAsset("./img/numbers.png"), 84, 8, 18, 49, 1, 1, true, false);
	this.two = new Animation(ASSET_MANAGER.getAsset("./img/numbers.png"), 143, 7, 36, 50, 1, 1, true, false);
	this.three = new Animation(ASSET_MANAGER.getAsset("./img/numbers.png"), 206, 7, 38, 51, 1, 1, true, false);
	this.four = new Animation(ASSET_MANAGER.getAsset("./img/numbers.png"), 266, 7, 42, 49, 1, 1, true, false);
	this.five = new Animation(ASSET_MANAGER.getAsset("./img/numbers.png"), 337, 8, 36, 50, 1, 1, true, false);
	this.six = new Animation(ASSET_MANAGER.getAsset("./img/numbers.png"), 398, 7, 37, 50, 1, 1, true, false);
	this.seven = new Animation(ASSET_MANAGER.getAsset("./img/numbers.png"), 467, 9, 34, 49, 1, 1, true, false);
	this.eight = new Animation(ASSET_MANAGER.getAsset("./img/numbers.png"), 528, 9, 37, 51, 1, 1, true, false);
	this.nine = new Animation(ASSET_MANAGER.getAsset("./img/numbers.png"), 593, 8, 37, 50, 1, 1, true, false);
	this.nums = [this.zero, this.one, this.two, this.three, this.four, 
				this.five, this.six, this.seven, this.eight, this.nine];
	Entity.call(this, game, x, y);
	this.tens = Math.floor(LIVES / 10);
	this.ones = LIVES % 10;
}
Lives.prototype = new Entity()
Lives.prototype.constructor = Lives;

Lives.prototype.update = function() {
	this.tens = Math.floor(LIVES / 10);
	this.ones = LIVES % 10;
}

Lives.prototype.draw = function(ctx) {
	this.nums[this.tens].drawFrame(this.game.clockTick, ctx, this.x, this.y);
	this.nums[this.ones].drawFrame(this.game.clockTick, ctx, this.x + this.nums[this.tens].frameWidth + 5, this.y);
	
	//this.nums[LIVES].drawFrame(this.game.clockTick, ctx, this.x, this.y);
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
ASSET_MANAGER.queueDownload("./img/checkpoint.png");
ASSET_MANAGER.queueDownload("./img/catLogo.png");
ASSET_MANAGER.queueDownload("./img/title.png");
ASSET_MANAGER.queueDownload("./img/startBtn.png");
ASSET_MANAGER.queueDownload("./img/numbers.png");
ASSET_MANAGER.queueDownload("./img/gameOver.png");
ASSET_MANAGER.queueDownload("./img/GameEndBtn.png");
ASSET_MANAGER.queueDownload("./img/livesIcon.png");
ASSET_MANAGER.queueDownload("./img/levelText.png");
ASSET_MANAGER.queueDownload("./img/heart sheet.png");
ASSET_MANAGER.queueDownload("./img/water.png");
ASSET_MANAGER.queueDownload("./img/bridge.png");
ASSET_MANAGER.queueDownload("./img/road.png");
ASSET_MANAGER.downloadAll(function () {
    console.log("starting up da sheild");
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');

    var gameEngine = new GameEngine();
   // var bg = new Background(gameEngine);
	var bg = new Platform(gameEngine, 0, 500, 128 * 17, 100, "Black")
	var skyscraper = new Background(gameEngine);
	//var skyscraper = new Background(gameEngine);

 
	/**
	 * Generic platforms can be created, no more need to make a function for each
	 * platform made in the game.
	 * 
	 * var platformName = new Platform(gameEngine, X-Coordinate, Y-Coordinate, Length, Height)
	 *  
	 */
	 
	// PROTOTYPE ENTITIES
	var plat = new Platform(gameEngine, 100, 430, GREEN_PLATFORM_WIDTH, GREEN_PLATFORM_HEIGHT, "Green");
	var p2 = new Platform(gameEngine, 500, 350, GREEN_PLATFORM_WIDTH, GREEN_PLATFORM_HEIGHT, "Green");
	var p3 = new Platform(gameEngine, 900, 350, GREEN_PLATFORM_WIDTH, GREEN_PLATFORM_HEIGHT, "Green")
	//var death = new Platform(gameEngine, 600, 500, DEATH_PUDDLE_WIDTH, DEATH_PUDDLE_HEIGHT, "Red")
	var bad = new Enemy(gameEngine, 700, 400)
	var bad2 = new Enemy(gameEngine, 1400, 400);
	var bad3 = new EnemyIdle(gameEngine, 500, 400);
	var bad4 = new EnemyIdle(gameEngine, 1300);
	var bad5 = new EnemyPace(gameEngine, 100, 600, 390);
	var bad6 = new EnemyPace(gameEngine, 900, 1300, 390)
	//var lamp = new Lamp(gameEngine, 950, 400); 
	var lamp2 = new Lamp(gameEngine, 1300, 400);
	var lamp3 = new Lamp(gameEngine, 1600, 400);
		
	var birdFly = new Bird(gameEngine,  600, 100, "Fly")
	var birdAttack = new Bird(gameEngine,  400, 150, "Attack")
	var range = new Range(gameEngine,  500, 200, "Attack")
	var bullet = new Bullet(gameEngine,  620, 185)
	var checkpoint = new Checkpoint(gameEngine, 930, 375); 
	var sidewalk = new Sidewalk(gameEngine);
	
	// Title scren entities
	var title = new Title(gameEngine, "./img/title.png", 350, 200, 0, 0);
	var icon = new Title(gameEngine, "./img/catLogo.png", 450, 527, 150, 175);
	var startBtn = new StartBtn(gameEngine, 550, 50);

	// STATUS SCREEN ENTITIES
	var lives = new Lives(gameEngine, 453, 275);
	var livesIcon = new Title(gameEngine, "./img/livesIcon.png", 144, 104, 303, 248);
	var levelIcon = new Level(gameEngine, 303, 178);
	//console.log(gameEngine.sceneManager)
	
	// GAME OVER SCREEN ENTITIES 
	var gameover = new Title(gameEngine, "./img/gameOver.png", 647, 112, 76, 234);
	var continueBtn = new ContinueBtn(gameEngine, 148, 355);
	var endBtn = new EndBtn(gameEngine, 412, 355);

	// Declaring all entities for a title screen
	var titleScene = new Scene(gameEngine,
		[{type:"Other", ent:title}, {type:"Other", ent:icon},{type:"Other", ent:startBtn}]);
	//console.log(titleScene);
	
	var lOneEnts = [];
	for (var i = 0; i <= MAP_SIZE - (64 * 5); i++) {
		var platform = new Platform(gameEngine, i, 472, 64, 64,  "Grey");
		var platform2 = new Title(gameEngine, "./img/road.png", 64, 64, i, 536);
		lOneEnts.push({type:"Platform", ent:platform});
		lOneEnts.push({type:"Other", ent:platform2});
		i += 64;
	}
	for (var i = MAP_SIZE - (64 * 4); i <= MAP_SIZE; i++) {
		var bridge = new Platform(gameEngine, i, 472, 64, 32, "Brown");
		var death = new Platform(gameEngine, i, 536, 64, 64, "Red");
		lOneEnts.push({type:"Platform", ent:death});
		lOneEnts.push({type:"Platform", ent:bridge});
		i += 64; 
	}
	var hearts = new Health(gameEngine);
	//lOneEnts.push({type:"Platform", ent:death});
	lOneEnts.push({type:"Other", ent:gameEngine.cat});
	lOneEnts.push({type:"Other", ent:hearts});
	console.log(lOneEnts);
	var levelOne = new Scene(gameEngine, lOneEnts);
	// Declaring all entities for level 1
	var protoScene = new Scene(gameEngine,
		[{type:"Platform", ent:bg}, {type:"Other", ent:skyscraper}, 
		{type:"Platform", ent:plat}, {type:"Platform", ent:p2}, {type:"Other", ent:sidewalk},
			{type:"Platform", ent:death}, {type:"Other", ent:checkpoint}, {type:"Other", ent:lamp2},
			{type:"Other", ent:lamp3}, {type:"Enemy", ent:bad}, {type:"Enemy", ent:bad2}, {type:"Enemy", ent:bad3}, 
			{type:"Enemy", ent:bad4}, {type:"Enemy", ent:bad5}, {type:"Enemy", ent:bad6}, {type:"Enemy", ent:birdFly},
			{type:"Enemy", ent:birdAttack}, {type:"Other", ent:gameEngine.cat}, {type:"Enemy", ent:range}, {type:"Other", ent:bullet}]);
	
	var statusScreen = new Scene(gameEngine, [{type:"Other", ent:lives}, {type:"Other", ent:livesIcon}, {type:"Other", ent:levelIcon}]);
	var gameOverScreen = new Scene(gameEngine, [{type:"Other", ent:gameover}, {type:"Other", ent:continueBtn}, {type:"Other", ent:endBtn}]);
	
	gameEngine.sceneManager.addScene(titleScene);
	gameEngine.sceneManager.addScene(levelOne);
	gameEngine.sceneManager.addScene(statusScreen);
	gameEngine.sceneManager.addScene(gameOverScreen);
	gameEngine.sceneManager.addScene(protoScene);
	gameEngine.sceneManager.setScene(gameEngine.sceneManager.scenes[TITLE_SCENE]);

    gameEngine.init(ctx);
	gameEngine.start();
});
