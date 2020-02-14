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