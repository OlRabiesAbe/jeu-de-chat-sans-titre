/**
 * UPDATE 2/21/20
 * @param game
 * @param x
 * @param y
 * @returns
 */
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
	
	this.length = 75	//Determines length of the attack box.
	this.height = 60	//Determines height of the attack box.
	this.ax = this.x;	//Determines x coordinate of the attack box
	this.ay = this.y	//Determines y coodinate of the attack box.
	
	this.hx = x
	this.hy = y
	this.Hlength = 50
	this.Hheight = 50
	
	
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
	if(this.l){
		this.hx = this.x + 12
		this.hy = this.y +10
		this.Hlength = 110
		this.Hheight = 100
		
		this.length = 100	//Determines length of the attack box.
		this.height = 90	//Determines height of the attack box.
		this.ax = this.x + 25;	//Determines x coordinate of the attack box
		this.ay = this.y + 10	//Determines y coodinate of the attack box.
	} else {
		this.hx = this.x + 30
		this.hy = this.y + 10
		this.Hlength = 110
		this.Hheight = 100
		
		this.length = 90	//Determines length of the attack box.
		this.height = 100	//Determines height of the attack box.
		this.ax = this.x + 25;	//Determines x coordinate of the attack box
		this.ay = this.y + 10	//Determines y coodinate of the attack box.
	}
	this.boundingbox = new BoundingBox(this.ax, this.ay, this.length, this.height, "Orange");

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
	ctx.strokeStyle = this.boundingbox.color;
	ctx.strokeRect(this.boundingbox.x - this.game.camera.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
    Entity.prototype.draw.call(this);
}

/**
 * This function handles the AI implementation of the dogs.
 * 
 */
function EnemyPace(game, x, y) {
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
	this.minX = x - 200;	//To determine how far it can walk before it must turn around when pacing.
	this.maxX = x + 200;
	this.spawn = x
	this.length = 75	//Determines length of the attack box.
	this.height = 60	//Determines height of the attack box.
	this.ax = this.x;	//Determines x coordinate of the attack box
	this.ay = this.y	//Determines y coodinate of the attack box.
	
	this.hx = x
	this.hy = y
	this.Hlength = 50
	this.Hheight = 50
	
	this.type = "pace"
	Entity.call(this, game, this.x, y)
}
EnemyPace.prototype = new Entity();
EnemyPace.prototype.constructor = EnemyIdle;

EnemyPace.prototype.update= function() {
	
	

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
		
		if(this.game.cat.y + 50 < this.y ){
			this.type = "pace"
		}
		//if (this.game.cat.x >= this.x - 60 && this.game.cat.x <= this.x + 140) {
		if (this.game.cat.x >= this.x - 60 && this.game.cat.x <= this.x + 100) {
			if(this.attackL.isDone() || this.attackR.isDone()){
				if(this.l){
					this.attackL.elapsedTime = 0
				} else {
					this.attackR.elapsedTime = 0
				}
			} 
			//this.boundingbox.color = "Red"
			this.attack = true
			if(this.l){ //Draw the attack box when facing left.
				this.ax = this.x + 20
				this.ay = this.y + 20
				this.boundingbox = new BoundingBox(this.ax, this.ay, this.length, this.height, "Green");
			} else {//Draw the attack box when facing right.
				this.ax = this.x + 70
				this.ay = this.y + 20
				this.boundingbox = new BoundingBox(this.ax, this.ay, this.length, this.height, "Orange");

			}
			
		} else {
			this.ax = 1000
			this.ay = 1000
			this.attack = false
		}
		this.boundingbox = new BoundingBox(this.ax, this.ay, this.length, this.height, "Orange");

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
	if (this.l && !this.attack) {
		this.hx = this.x
		this.hy = this.y + 35
		this.Hlength = 148
		this.Hheight = 80
	} else if(this.r && !this.attack ){
		this.hx = this.x + 5
		this.hy = this.y + 40
		this.Hlength = 148
		this.Hheight = 80
	}
	if(this.l && this.attack){
		this.hx = this.x
		this.hy = this.y + 15
		this.Hlength = 148
		this.Hheight = 107
	} else if(this.r && this.attack){
		this.hx = this.x
		this.hy = this.y + 15
		this.Hlength = 148
		this.Hheight = 107
	}
	this.boundingbox = new BoundingBox(this.hx, this.hy, this.Hlength, this.Hheight, "Orange");
}

EnemyPace.prototype.draw = function(ctx) {
	/** For Debugging purposes*/
	
	//ctx.strokeStyle = this.boundingbox.color;
	//ctx.strokeRect(this.boundingbox.x - this.game.camera.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
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