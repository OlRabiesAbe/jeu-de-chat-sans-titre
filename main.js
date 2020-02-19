
var GREEN_PLATFORM_WIDTH = 358;
var GREEN_PLATFORM_HEIGHT = 83;
var DEATH_PUDDLE_WIDTH = 287;
var DEATH_PUDDLE_HEIGHT = 214;

var TITLE_SCENE = 0;
var LEVEL_ONE_SCENE = 1;
var STATUS_SCENE = 2;
var GAME_OVER_SCENE = 3;
var WIN_SCREEN = 4;
var PROTOTYPE_SCENE = 5;
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
ASSET_MANAGER.queueDownload("./img/box.png");
ASSET_MANAGER.queueDownload("./img/Dumpster.png");
ASSET_MANAGER.queueDownload("./img/building.png");

ASSET_MANAGER.downloadAll(function () {
    console.log("starting up da sheild");
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');

    var gameEngine = new GameEngine();
   // var bg = new Background(gameEngine);
	//var skyscraper = new Background(gameEngine);
	//var skyscraper = new Background(gameEngine);

    //gameEngine.addPlatform(bg);	
	//gameEngine.addEntity(skyscraper);
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
	
	// Title scren entities
	var title = new Title(gameEngine, "./img/title.png", 350, 200, 0, 0);
	var icon = new Title(gameEngine, "./img/catLogo.png", 450, 527, 150, 175);
	var startBtn = new StartBtn(gameEngine, 550, 50);

	// Declaring all entities for a title screen
	var titleScene = new Scene(gameEngine,
		[{type:"Other", ent:title}, {type:"Other", ent:icon},{type:"Other", ent:startBtn}]);

	// STATUS SCREEN ENTITIES
	var lives = new Lives(gameEngine, 453, 275);
	var livesIcon = new Title(gameEngine, "./img/livesIcon.png", 144, 104, 303, 248);
	var levelIcon = new Level(gameEngine, 303, 178);
	//console.log(gameEngine.sceneManager)
	var statusScreen = new Scene(gameEngine, [{type:"Other", ent:lives}, {type:"Other", ent:livesIcon}, {type:"Other", ent:levelIcon}]);
		
	// GAME OVER SCREEN ENTITIES 
	var gameover = new Title(gameEngine, "./img/gameOver.png", 647, 112, 76, 234);
	var continueBtn = new ContinueBtn(gameEngine, 148, 355);
	var endBtn = new EndBtn(gameEngine, 412, 355);
	var gameOverScreen = new Scene(gameEngine, [{type:"Other", ent:gameover}, {type:"Other", ent:continueBtn}, {type:"Other", ent:endBtn}]);

	var lOneEnts = [];
	for (var i = -4; i <= 4; i++) {
		var tile = new Tile(gameEngine, "./img/placeholder_tile.png", 0, 0, -128, i * 128, 128, 128, 128, 128)
		lOneEnts.push({type:"Platform", ent:tile});
	}
	for (var i = 0; i < 56; i++) {
		var platform = new Tile(gameEngine, "./img/Sidewalk.png", 0, 0, i * 64, 472, 64, 64, 64, 64)
		var platform2 = new Tile(gameEngine, "./img/road.png", 0, 0, i * 64, 536, 64, 64, 64, 64)
		lOneEnts.push({type:"Platform", ent:platform})
		lOneEnts.push({type:"Platform", ent:platform2});
	}
	for (var i = 56; i < 60; i++) {
		var bridge = new Tile(gameEngine, "./img/bridge.png", 0, 0, i * 64, 472, 64, 32, 64, 32);
		var water = new Platform(gameEngine, i * 64, 536, 64, 64, "Red");
		lOneEnts.push({type:"Platform", ent:bridge});
		lOneEnts.push({type:"Platform", ent:water});
	}
		for (var i = 60; i < 67; i++) {
		var platform = new Tile(gameEngine, "./img/Sidewalk.png", 0, 0, i * 64, 472, 64, 64, 64, 64)
		var platform2 = new Tile(gameEngine, "./img/road.png", 0, 0, i * 64, 536, 64, 64, 64, 64)
		lOneEnts.push({type:"Platform", ent:platform})
		lOneEnts.push({type:"Platform", ent:platform2});
	}
	for (var i = 67; i < 71; i++) {
		var platform = new Platform(gameEngine, i * 64, 536, 64, 64, "Red"); 
		lOneEnts.push({type:"Platform", ent:platform})
	}
	for (var i = 71; i < 86; i++) {
		var platform = new Tile(gameEngine, "./img/Sidewalk.png", 0, 0, i * 64, 472, 64, 64, 64, 64)
		var platform2 = new Tile(gameEngine, "./img/road.png", 0, 0, i * 64, 536, 64, 64, 64, 64)
		lOneEnts.push({type:"Platform", ent:platform})
		lOneEnts.push({type:"Platform", ent:platform2});
	}
	for (var i = 86; i < 90; i++) {
		var platform = new Platform(gameEngine, i * 64, 536, 64, 64, "Red"); 
		lOneEnts.push({type:"Platform", ent:platform})
	}
	for (var i = 90; i < 154; i++) {
		var platform = new Tile(gameEngine, "./img/Sidewalk.png", 0, 0, i * 64, 472, 64, 64, 64, 64)
		var platform2 = new Tile(gameEngine, "./img/road.png", 0, 0, i * 64, 536, 64, 64, 64, 64)
		lOneEnts.push({type:"Platform", ent:platform})
		lOneEnts.push({type:"Platform", ent:platform2});
	}
	for (var i = 154; i < 158; i++) {
		var platform = new Platform(gameEngine, i * 64, 536, 64, 64, "Red"); 
		lOneEnts.push({type:"Platform", ent:platform})
	}
	for (var i = 158; i < 224; i++) {
		var platform = new Tile(gameEngine, "./img/Sidewalk.png", 0, 0, i * 64, 472, 64, 64, 64, 64)
		var platform2 = new Tile(gameEngine, "./img/road.png", 0, 0, i * 64, 536, 64, 64, 64, 64)
		lOneEnts.push({type:"Platform", ent:platform})
		lOneEnts.push({type:"Platform", ent:platform2});
	}
	var dump = new Tile(gameEngine, "./img/Dumpster.png", 0, 0, 64 * 18, 472 - 192, 384, 60,384, 192);
	lOneEnts.push({type:"Platform", ent:dump});
	var box = new Tile(gameEngine, "./img/box.png", 0, 0, 64 * 28, 472 - 128, 128, 128, 128, 128);
	var box2 = new Tile(gameEngine, "./img/box.png", 0, 0, 64 * 38, 472 - 128, 128, 128, 128, 128);
	var box3 = new Tile(gameEngine, "./img/box.png", 0, 0, 64 * 45, 472 - 128, 128, 128, 128, 128);
	var box4 = new Tile(gameEngine, "./img/box.png", 0, 0, 64 * 45, 472 - 256, 128, 128, 128, 128);
	lOneEnts.push({type:"Platform", ent:box});
	lOneEnts.push({type:"Platform", ent:box2});
	lOneEnts.push({type:"Platform", ent:box3});
	lOneEnts.push({type:"Platform", ent:box4});

	
	var checkpoint = new Checkpoint(gameEngine, 112 * 64, 472 - 128);
	var light = new Lamp(gameEngine, 64 * 6, 472 - 64 * 6);
	var light2 = new Lamp(gameEngine, 64 * 15, 472 - 64 * 6);
	lOneEnts.push({type:"Other", ent:light});
	lOneEnts.push({type:"Other", ent:light2});
	var building = new Tile(gameEngine, "./img/building.png", 0, 0, 64 * 10, 472 - (64*7), 192, 1, 192, 448)
	var building2 = new Tile(gameEngine, "./img/building.png", 0, 0, 64, 472 - (64*4), 64*3, 1, 64 * 3, 64 * 4)
	lOneEnts.push({type:"Other", ent:checkpoint});
	lOneEnts.push({type:"Other", ent:building});
	lOneEnts.push({type:"Other", ent:building2});

	lOneEnts.push({type:"Enemy", ent:new EnemyPace(gameEngine, 1152, 1792, 1492, 472-115)})
	
	var hearts = new Health(gameEngine);
	lOneEnts.push({type:"Other", ent:hearts});
	lOneEnts.push({type:"Other", ent:gameEngine.cat});
	
	//lOneEnts.push({type:"Enemy", ent:new EnemyIdle(gameEngine, 1472, 472-95)})
	//lOneEnts.push({type:"Platform", ent:new Tile(gameEngine, "./img/placeholder_tile.png", 0, 0, 128, 128, 128, 128)});
	var levelOne = new Scene(gameEngine, lOneEnts);
	
	var winScreen = new Scene(gameEngine, []);
	gameEngine.sceneManager.addScene(titleScene);
	gameEngine.sceneManager.addScene(levelOne);
	gameEngine.sceneManager.addScene(statusScreen);
	gameEngine.sceneManager.addScene(gameOverScreen);
	gameEngine.sceneManager.addScene(winScreen);
	/*gameEngine.addEntity(gameEngine.cat);
	gameEngine.addEntity(gameEngine.camera);
	
	
	gameEngine.addPlatform(new Tile(gameEngine, "./img/placeholder_tile.png", 0, 0, 3, 2, 128, 128));
	gameEngine.addPlatform(new Tile(gameEngine, "./img/placeholder_tile.png", 0, 0, 3, 3, 128, 128));
	gameEngine.addPlatform(new Tile(gameEngine, "./img/placeholder_tile.png", 0, 0, 0, 4, 128, 128));
	gameEngine.addPlatform(new Tile(gameEngine, "./img/placeholder_tile.png", 0, 0, 1, 4, 128, 128));
	gameEngine.addPlatform(new Tile(gameEngine, "./img/placeholder_tile.png", 0, 0, 2, 4, 128, 128));
	gameEngine.addPlatform(new Tile(gameEngine, "./img/placeholder_tile.png", 0, 0, 3, 4, 128, 128));
	gameEngine.addPlatform(new Tile(gameEngine, "./img/placeholder_tile.png", 0, 0, 4, 4, 128, 128));
	gameEngine.addPlatform(new Tile(gameEngine, "./img/placeholder_tile.png", 0, 0, 5, 4, 128, 128));
	gameEngine.addPlatform(new Tile(gameEngine, "./img/placeholder_tile.png", 0, 0, 6, 4, 128, 128));
	gameEngine.addPlatform(new Tile(gameEngine, "./img/placeholder_tile.png", 0, 0, 7, 4, 128, 128));
	gameEngine.addPlatform(new Tile(gameEngine, "./img/placeholder_tile.png", 0, 0, 8, 4, 128, 128));
	gameEngine.addPlatform(new Tile(gameEngine, "./img/placeholder_tile.png", 0, 0, 6, 1, 128, 128));
	gameEngine.addPlatform(new Tile(gameEngine, "./img/placeholder_tile.png", 0, 0, 7, 1, 128, 128));
	gameEngine.addPlatform(new Tile(gameEngine, "./img/placeholder_tile.png", 0, 0, 8, 1, 128, 128));*/
	//console.log(gameEngine.entities);
	gameEngine.sceneManager.setScene(gameEngine.sceneManager.scenes[TITLE_SCENE]);
	//console.log(gameEngine.platforms);
	//console.log(gameEngine.enemies);
	//console.log(gameEngine.otherEntities);
	
    gameEngine.init(ctx);
	gameEngine.start();
});
