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
	this.spawn = x;
	this.count = 0;
	this.leftCheck = true;
	this.rightCheck = false;
	Entity.call(this, game, x, y)
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
	this.boundingbox = new BoundingBox(x - 5, y + 10, this.idleL.frameWidth - 64, this.idleL.frameHeight, "Black");
	this.l = true;
	this.r = false;
	this.color = "Gold"
	this.width = 153;
	this.height = 100
	this.start = x
	this.x = x;
	this.spawn = x;
	this.y = y;
	this.count = 0;
	this.leftCheck = true;
	this.rightCheck = false
	Entity.call(this, game, x - 50, y)
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
	ctx.strokeStyle = this.color;
	ctx.strokeRect(this.boundingbox.x - this.game.camera.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
	
	if (this.l) {
		this.idleL.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y);
	} else {
		this.idle.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y);
	}
    //ctx.fillRect(this.x,this.y,this.length,this.height);
    Entity.prototype.draw.call(this);
}

/**
 * This function handles the AI implementation of the dogs.
 * 
 */
function EnemyPace(game, minX, maxX, x, y) {
	this.paceL = new Animation(ASSET_MANAGER.getAsset("./img/dog.png"),0, 250, 152, 115, 0.1, 4, true, false);
	this.pace = new Animation(ASSET_MANAGER.getAsset("./img/dog.png"), 145, 0, 152, 115, 0.1, 5, true, false);
	this.attackR = new Animation(ASSET_MANAGER.getAsset("./img/dog.png"),610, 247, 152, 115, 0.1, 4, false, false);
	this.attackL = new Animation(ASSET_MANAGER.getAsset("./img/dog.png"),305, 365, 152, 120, 0.1, 4, false, false);
	this.boundingbox = new BoundingBox(this.x, this.y, 100, 100, "Purple");
	this.l = true;
	this.r = false;
	this.attack = false
	this.y = y
	this.x = x
	this.minX = minX;	//To determine how far it can walk before it must turn around when pacing.
	this.maxX = maxX;
	this.length = 50;
	this.height = 100
	this.type = "pace"
	Entity.call(this, game, this.x, y)
}
EnemyPace.prototype = new Entity();
EnemyPace.prototype.constructor = EnemyIdle;

EnemyPace.prototype.update= function() {
	this.boundingbox = new BoundingBox(this.x - 400, this.game.cat.y + 50, 800, 100, "Green");
	/**
	 * Pace mode which has the dog walk back and forth in a gaurding pace.
	 */
	if(this.type === "pace"){
		/**
		 * When the dog detects the cat, it switches to attack mode.
		 */
		if (this.game.cat.x >= this.x - 500 && this.game.cat.x <= this.x + 400 && this.game.cat.y + 50 > this.y ) {
			//this.boundingbox.color = "Red"
			this.type = "attack"
		} 
		if(this.type === "pace"){
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
	}
	/**
	 * Attack mode which has the dog walk all the way to the player and have it attack it.
	 */
	if(this.type === "attack"){
		this.boundingbox = new BoundingBox(this.x , this.game.cat.y + 50, 200, 100, "Purple");
		this.bound2 = new BoundingBox(this.x , this.y, 200, 100, "Red");
		if(this.game.cat.y + 50 < this.y ){
			this.type = "pace"
		}
		if (this.game.cat.x >= this.x - 60 && this.game.cat.x <= this.x + 140) {
			
			if(this.attackL.isDone() || this.attackR.isDone()){
				if(this.l){
					this.attackL.elapsedTime = 0
				} else {
					this.attackR.elapsedTime = 0
				}
			} 
			this.boundingbox.color = "Red"
			this.attack = true
			
		} else {
			this.attack = false
		}
		/**
		 * This will handle having the dog move to the players ground position.
		 */
		if(this.game.cat.x >= this.x && !this.attack){
			this.x += 5;
			this.l = false
			this.r = true
		} else if(this.game.cat.x <= this.x && !this.attack){
			this.x -= 5;
			this.l = true
			this.r = false
		}
		
	}
}

EnemyPace.prototype.draw = function(ctx) {
	/** For Debugging purposes*/
	ctx.strokeStyle = this.boundingbox.color;
	ctx.strokeRect(this.boundingbox.x - this.game.camera.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
	//ctx.strokeStyle = this.bound2.color;
	//ctx.strokeRect(this.bound2.x - this.game.camera.x, this.bound2.y, this.bound2.width, this.bound2.height);
	
	if(this.type === "pace"){
		if (this.l ) {
			this.paceL.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y);
		} else if(this.r ){
			this.pace.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y);
		}
	} else {
		if (this.l && !this.attack) {
			this.paceL.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y);
		} else if(this.r && !this.attack ){
			this.pace.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y);
		}
		if(this.l && this.attack){
			this.attackL.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y);
		} else if(this.r && this.attack){
			this.attackR.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y);
		}
	}
		
}