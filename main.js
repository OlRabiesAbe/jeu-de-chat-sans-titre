var TITLE_SCENE = 0;
var LEVEL_ONE_SCENE = 1;
var LEVEL_TWO_SCENE = 2;
var LEVEL_THREE_SCENE = 3;
var WIN_SCREEN = 4;
var STATUS_SCENE = 5;
var GAME_OVER_SCENE = 6;
var PROTOTYPE_SCENE = 7;
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

ASSET_MANAGER.queueDownload("./img/bird_sheet.png");
ASSET_MANAGER.queueDownload("./img/box.png");
ASSET_MANAGER.queueDownload("./img/bridge.png");
ASSET_MANAGER.queueDownload("./img/building.png");
ASSET_MANAGER.queueDownload("./img/brick2.png");
ASSET_MANAGER.queueDownload("./img/bullet.png");
ASSET_MANAGER.queueDownload("./img/cat_logo.png");
ASSET_MANAGER.queueDownload("./img/cat_sheet.png")
ASSET_MANAGER.queueDownload("./img/checkpoint.png");
ASSET_MANAGER.queueDownload("./img/gunslinger_sheet.png");
ASSET_MANAGER.queueDownload("./img/crane.png");
ASSET_MANAGER.queueDownload("./img/dog_sheet.png");
ASSET_MANAGER.queueDownload("./img/dumpster.png");
ASSET_MANAGER.queueDownload("./img/game_end_btn.png");
ASSET_MANAGER.queueDownload("./img/game_over.png");
ASSET_MANAGER.queueDownload("./img/heart_sheet.png");
ASSET_MANAGER.queueDownload("./img/lamp.png");
ASSET_MANAGER.queueDownload("./img/level_text.png");
ASSET_MANAGER.queueDownload("./img/lives_icon.png");
ASSET_MANAGER.queueDownload("./img/numbers.png");
ASSET_MANAGER.queueDownload("./img/placeholder_tile.png");
ASSET_MANAGER.queueDownload("./img/platform.png");
ASSET_MANAGER.queueDownload("./img/puddle.png");
ASSET_MANAGER.queueDownload("./img/skyscraper.png");
ASSET_MANAGER.queueDownload("./img/start_btn.png");
ASSET_MANAGER.queueDownload("./img/title.png");
ASSET_MANAGER.queueDownload("./img/water.png");
ASSET_MANAGER.queueDownload("./img/window.png");
ASSET_MANAGER.queueDownload("./img/ground.png");
ASSET_MANAGER.queueDownload("./img/crane_piece_h.png");
ASSET_MANAGER.queueDownload("./img/crane_piece_v.png");
ASSET_MANAGER.queueDownload("./img/victory_text.png");
ASSET_MANAGER.queueDownload("./img/trophy.png");
ASSET_MANAGER.queueDownload("./img/win_btn.png");
ASSET_MANAGER.queueDownload("./img/fence.png");
ASSET_MANAGER.queueDownload("./img/tileset.png");
ASSET_MANAGER.queueDownload("./img/rat.png");
ASSET_MANAGER.queueDownload("./img/lv1_background.png");
ASSET_MANAGER.queueDownload("./img/electric.png");
ASSET_MANAGER.queueDownload("./music/level_1.wav");
ASSET_MANAGER.queueDownload("./music/level_2.wav");
ASSET_MANAGER.queueDownload("./music/level_3_and_pound.wav");
ASSET_MANAGER.queueDownload("./img/lv2_background.png");
ASSET_MANAGER.queueDownload("./img/achtung.png");
ASSET_MANAGER.queueDownload("./img/cage.png");
ASSET_MANAGER.queueDownload("./img/cage_dog.png");
ASSET_MANAGER.queueDownload("./img/cage_cat.png");

ASSET_MANAGER.downloadAll(function () {
    console.log("starting up da sheild");
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');

    var gameEngine = new GameEngine();
	
	
	// Title screen entities
	var title = new Title(gameEngine, "./img/title.png", 525, 300, -10, 0);
	var icon = new Title(gameEngine, "./img/cat_logo.png", 563, 494, 400, 200);
	var startBtn = new StartBtn(gameEngine, 1280 - 400, 50);

	// Declaring all entities for a title screen
	var titleScene = new Scene(gameEngine,
		[{type:"Other", ent:title}, {type:"Other", ent:icon},{type:"Other", ent:startBtn}]);

	// STATUS SCREEN ENTITIES
	var lives = new Lives(gameEngine, 1280 / 2 + 130, 320);
	var livesIcon = new Title(gameEngine, "./img/lives_icon.png", 432, 312, 1280 / 2 - 432 / 2 - 90, 248);
	var levelIcon = new Level(gameEngine, 1280 / 2 - 531 / 2 - 20, 50);
	//console.log(gameEngine.sceneManager)
	var statusScreen = new Scene(gameEngine, [{type:"Other", ent:lives}, {type:"Other", ent:livesIcon}, {type:"Other", ent:levelIcon}]);
		
	// GAME OVER SCREEN ENTITIES 
	var gameover = new Title(gameEngine, "./img/game_over.png", 971, 168, 1280 / 2 - 971 / 2, 234);
	var continueBtn = new ContinueBtn(gameEngine, 1280 / 2 - 370, 234 + 168 + 10);
	var endBtn = new EndBtn(gameEngine, 1280 / 2 + 20, 234 + 168 + 10);
	var gameOverScreen = new Scene(gameEngine, [{type:"Other", ent:gameover}, {type:"Other", ent:continueBtn}, {type:"Other", ent:endBtn}]);

	// VICTORY SCREEN ENTITIES
	var winner = new Title(gameEngine, "./img/victory_text.png", 764, 366, 1280 / 2 - 350, 768 / 2 - 75)
	var trophy = new Title(gameEngine, "./img/trophy.png", 438, 416, 0, 0)
	var winBtn = new WinBtn(gameEngine, 1280 - 400, 50);
	
	var winScreen = new Scene(gameEngine, [{type:"Other", ent:winner}, {type:"Other", ent:trophy}, {type:"Other", ent:winBtn}]);
	
	var levelOne = new Scene(gameEngine, getLevelOneEnts(gameEngine));
	var levelTwo = new Scene(gameEngine, getLevelTwoEnts(gameEngine));
	var levelString = ";" +
"    SSSSSSSSSS               X   bI         SSS                    c I       b               ;" +
"    SSSS   SSSSC             CXX  I          SS          KK        X I         g             ;" +
"    SSSS s SSSSS             CCC  I  C      g S        XKSCK       C I          C            ;" +
"   SSSSSSSSSSSSS  X       c  CCC  I  C  X   SSS       XSSSSXX      C I   X     CC   X        ;" +
" lCSSSSSSSSSSSSSpCX      BB  KXXKXI rC  K l SSS  pC  SSSSSSSK   K  C I  lXK   pCC ssX     l l l l l;" +
"GGGGGGGGGGGGGGGGGGGWWWWGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGWWWWWWWWGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG;";
	var testLevel = new LevelBuilder(levelString, gameEngine);
	console.log(testLevel)
	gameEngine.sceneManager.addScene(titleScene);
	
	
	// IF YOU WANT YOUR LEVEL TO BE FIRST FOR TESTING PURPOSES, just have it be added before the other levels. 
	//gameEngine.sceneManager.addScene(new Scene(gameEngine, testLevel.getLevel()));
	gameEngine.sceneManager.addScene(levelOne);
	gameEngine.sceneManager.addScene(levelTwo);
	gameEngine.sceneManager.addScene(new Scene(gameEngine, testLevel.getLevel()));

	gameEngine.sceneManager.addScene(winScreen);
	gameEngine.sceneManager.addScene(statusScreen);
	gameEngine.sceneManager.addScene(gameOverScreen);

	gameEngine.sceneManager.setScene(gameEngine.sceneManager.scenes[TITLE_SCENE]);
	
    gameEngine.init(ctx);
	gameEngine.start();
});