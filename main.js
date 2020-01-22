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

function Cat(game) {
	this.neutral = new Animation(ASSET_MANAGER.getAsset("./img/catBeta.png"), 0, 0, 80, 150, 0.03, 1, true, false);
	this.attackAnim = new Animation(ASSET_MANAGER.getAsset("./img/catBeta.png"), 0, 0, 80, 150, 0.03, 9, false, false);
	this.jumpAnim = new Animation(ASSET_MANAGER.getAsset("./img/catBeta.png"), 0, 155, 80, 150, 0.03, 9, false, false);
	this.runRAnim = new Animation(ASSET_MANAGER.getAsset("./img/catBeta.png"), 0, 310, 80, 150, 0.03, 9, true, false);
	this.runLAnim = new Animation(ASSET_MANAGER.getAsset("./img/catBeta.png"), 0, 465, 80, 150, 0.03, 9, true, false);
	this.duckAnim = new Animation(ASSET_MANAGER.getAsset("./img/catBeta.png"), 0, 621, 80, 75, 0.03, 9, true, false);
	this.running = false;
	this.attacking = false;
	this.ducking = false;
	this.jumping = false;
	this.radius = 100;
	this.ground = 400;
	Entity.call(this, game, 0, 400);
}

Cat.prototype = new Entity();
Cat.prototype.constructor = Cat;

Cat.prototype.update = function() {
	if (this.game.space) this.attacking = true;
	if (this.game.w) this.jumping = true;
	this.running = (this.game.right || this.game.left);
	this.ducking = this.game.down;
	if (this.attacking) {
		if (this.attackAnim.isDone()) {
			this.attackAnim.elapsedTime = 0;
			this.attacking = false;
		}
	}
	if (this.jumping) {
        if (this.jumpAnim.isDone()) {
            this.jumpAnim.elapsedTime = 0;
			this.jumping = false;
        }
        var jumpDistance = this.jumpAnim.elapsedTime / this.jumpAnim.totalTime;
        var totalHeight = 26;
        if (jumpDistance > 0.5)
            jumpDistance = 1 - jumpDistance;
		
        var height = totalHeight*(-4 * (jumpDistance * jumpDistance - jumpDistance));
        //var height = jumpDistance * 2 * totalHeight;
        this.y = this.ground - height;
    }
	Entity.prototype.update.call(this);
}

Cat.prototype.draw = function(ctx) {
	if (this.attacking) {
		this.attackAnim.drawFrame(this.game.clockTick, ctx, this.x + 20, this.y - 50);
	} else if (this.jumping) {
		this.jumpAnim.drawFrame(this.game.clockTick, ctx, this.x + 20, this.y - 100);
	} else if (this.running && this.game.right) {
		this.runRAnim.drawFrame(this.game.clockTick, ctx, this.x + 20, this.y - 50);
	} else if (this.running && this.game.left) {
		this.runLAnim.drawFrame(this.game.clockTick, ctx, this.x + 20, this.y - 50);
	} else if (this.ducking) {
		this.duckAnim.drawFrame(this.game.clockTick, ctx, this.x + 20, this.y + 25);
	} else {
		this.neutral.drawFrame(this.game.clockTick, ctx, this.x + 20, this.y - 50);
	}
	Entity.prototype.draw.call(this);
}

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./img/catBeta.png");
ASSET_MANAGER.downloadAll(function () {
    console.log("starting up da sheild");
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');

    var gameEngine = new GameEngine();
    var bg = new Background(gameEngine);
	var cat = new Cat(gameEngine);
    gameEngine.addEntity(bg);
	gameEngine.addEntity(cat);
    gameEngine.init(ctx);
    gameEngine.start();
});
