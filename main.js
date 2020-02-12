
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





var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./img/cat_sheet.png")
ASSET_MANAGER.queueDownload("./img/dog.png");
ASSET_MANAGER.queueDownload("./img/Sidewalk.png");
ASSET_MANAGER.queueDownload("./img/skyscraper.png");
ASSET_MANAGER.queueDownload("./img/platform.png");
ASSET_MANAGER.queueDownload("./img/puddle.png");
ASSET_MANAGER.queueDownload("./img/lamp.png");
ASSET_MANAGER.queueDownload("./img/bird.png");
ASSET_MANAGER.queueDownload("./img/cowboy.png");
ASSET_MANAGER.queueDownload("./img/bullet.png");
ASSET_MANAGER.queueDownload("./img/placeholder_tile.png");
ASSET_MANAGER.downloadAll(function () {
    console.log("starting up da sheild");
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');

    var gameEngine = new GameEngine();
   // var bg = new Background(gameEngine);
	var skyscraper = new Background(gameEngine);
	//var skyscraper = new Background(gameEngine);

    //gameEngine.addPlatform(bg);	
	gameEngine.addEntity(skyscraper);
	/**
	 * Generic platforms can be created, no more need to make a function for each
	 * platform made in the game.
	 * 
	 * var platformName = new Platform(gameEngine, X-Coordinate, Y-Coordinate, Length, Height)
	 *  
	 */
	/*var bad = new Enemy(gameEngine, 700, 400);
	var bad2 = new Enemy(gameEngine, 1400, 400);
	var bad3 = new EnemyIdle(gameEngine, 500, 400);
	var bad4 = new EnemyIdle(gameEngine, 1300);
	var bad5 = new EnemyPace(gameEngine, 100, 600, 390);
	var bad6 = new EnemyPace(gameEngine, 900, 1300, 390);
	var lamp = new Lamp(gameEngine, 950, 400); 
	var lamp2 = new Lamp(gameEngine, 1300, 400);
	var lamp3 = new Lamp(gameEngine, 1600, 400);*/
		
	/*var birdFly = new Bird(gameEngine,  600, 100, "Fly");
	var birdAttack = new Bird(gameEngine,  400, 150, "Attack");
	var range = new Range(gameEngine,  500, 200, "Attack");
	var bullet = new Bullet(gameEngine,  620, 185);
	
	gameEngine.addEntity(lamp);
	gameEngine.addEntity(lamp2);
	gameEngine.addEntity(lamp3);
	
    gameEngine.addEnemy(bad);
	gameEngine.addEnemy(bad2);
	gameEngine.addEnemy(bad3);
	gameEngine.addEnemy(bad4);
	gameEngine.addEnemy(bad5);
	gameEngine.addEnemy(bad6);
	gameEngine.addEnemy(birdFly);
	gameEngine.addEnemy(birdAttack);
	gameEngine.addEnemy(range)
	gameEngine.addEntity(bullet);*/
	
	gameEngine.addEntity(gameEngine.cat);
	gameEngine.addEntity(gameEngine.camera);
	
	
	gameEngine.addPlatform(new Tile(gameEngine, "./img/placeholder_tile.png", 0, 0, 3, 2));
	gameEngine.addPlatform(new Tile(gameEngine, "./img/placeholder_tile.png", 0, 0, 3, 3));
	gameEngine.addPlatform(new Tile(gameEngine, "./img/placeholder_tile.png", 0, 0, 0, 4));
	gameEngine.addPlatform(new Tile(gameEngine, "./img/placeholder_tile.png", 0, 0, 1, 4));
	gameEngine.addPlatform(new Tile(gameEngine, "./img/placeholder_tile.png", 0, 0, 2, 4));
	gameEngine.addPlatform(new Tile(gameEngine, "./img/placeholder_tile.png", 0, 0, 3, 4));
	gameEngine.addPlatform(new Tile(gameEngine, "./img/placeholder_tile.png", 0, 0, 4, 4));

	
	console.log(gameEngine.platforms);
	//console.log(gameEngine.enemies);
	//console.log(gameEngine.otherEntities);
	
    gameEngine.init(ctx);
    console.log(gameEngine.cat.platform)
	gameEngine.start();
});
