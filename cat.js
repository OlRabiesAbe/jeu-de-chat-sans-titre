LIVES = 2;
HEALTH = 9;
function Cat(game) {
	//					Animation(spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse)
	this.neutralR = new Animation(ASSET_MANAGER.getAsset("./img/cat_sheet.png"), 0, 257, 128, 128, 0.03, 1, true, false);
	this.neutralL = new Animation(ASSET_MANAGER.getAsset("./img/cat_sheet.png"), 129, 257, 128, 128, 0.03, 1, true, false);
	this.attackAnim = new Animation(ASSET_MANAGER.getAsset("./img/cat_sheet.png"), 769, 129, 128, 128, 0.03, 8, false, false);
	this.jumpAnim = new Animation(ASSET_MANAGER.getAsset("./img/cat_sheet.png"), 769, 0, 128, 128, 0.03, 8, false, false);
	
	this.fallAnim = new Animation(ASSET_MANAGER.getAsset("./img/cat_sheet.png"), 769, 20, 128, 128, 0.03, 8, true, false);
	
	this.runRAnim = new Animation(ASSET_MANAGER.getAsset("./img/cat_sheet.png"), 0, 0, 128, 128, 0.1, 6, true, false);
	this.runLAnim = new Animation(ASSET_MANAGER.getAsset("./img/cat_sheet.png"), 0, 129, 128, 128, 0.1, 6, true, true);
	this.duckAnim = new Animation(ASSET_MANAGER.getAsset("./img/cat_sheet.png"), 769, 0, 128, 128, 0.03, 8, true, false);
	
    this.falling = false;
	this.x = 0;
	this.height = 128;
	this.width = 128;
	this.running = false;
	this.attacking = false;
	this.attackRange = 150		//The default attack range of the cat.
	this.ducking = false;
	this.jumping = false;
	this.left = false; 
	this.right = true;
	this.falling = false;
	this.radius = 100;
	this.jumpHeight = 20;
	this.totalHeight = 200;
	this.spawn = 64;
	this.ground = 255;
	this.invincTimer = 0;
	this.invincTick = false;
	this.invinc = false;
	
	//suite of variables for the cat's horizontal movement		(ALL_CAPS = psuedo constant)
	this.hspeed = 0;
	this.MAX_HSPEED = 8;
	this.HACCEL = 1;
	this.HDECCEL = this.HACCEL;
	
	//suite of variables for the cat's vertical movement
	this.vspeed = 0;
	this.MAX_VSPEED = 52;
	this.VDECCEL = 4;
	this.MAX_VDECCEL = -16; //be very careful with MAX_VDECCEL, values too negative will lead to the cat falling through floors
	
	this.boxes = true;
	this.boundingbox = new BoundingBox(this.x, this.y + 30, this.neutralR.frameWidth, this.neutralR.frameHeight, "Purple");
	
	Entity.call(this, game, 64, 64);
}

Cat.prototype = new Entity();
Cat.prototype.constructor = Cat;
function distance(a, b) {
    var dx = a.x - b.x;
    var dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
}

Cat.prototype.collideDeath = function (other) {
    return this.y + this.height === other.y  && this.x < other.x + other.length
    		&& this.x + this.radius > other.x ;
    		
};
Cat.prototype.collideEnemy = function (other) {
    var a = this.x < other.x + other.length
			&& this.x + this.attackRange > other.x ;
	//console.log(a)
	return a;
	
};
Cat.prototype.collidePlatform = function (other) {
	var a = this.x <= other.boundingbox.width + other.x
			&& this.x > other.x && this.boundingbox.bottom >= other.boundingbox.top &&
			this.boundingbox.top < other.boundingbox.bottom;
	return a;
}
/**
 * This function will detect if the cat reaches the 
 * leftmost boundary.
 */
Cat.prototype.collideLeft = function () {
    return (this.x - this.radius) < -100;
};
/**
 * This function will detect if the cat reaches the 
 * rightmost boundary.
 */
Cat.prototype.collideRight = function () {
    return (this.x + this.radius) > 800;
};

Cat.prototype.collisionHelper = function(ctx) {
	for (var i = 0; i < this.game.platforms.length; i++) {
			//console.log(this.game.platforms);
           var pf = this.game.platforms[i];
			// console.log(pf);
			if (pf.color === "Red" && this.collideDeath(pf)) {
				//alert(this.boundingbox.bottom + " " + this.y + " " + pf.boundingbox.top + " " + pf.y)
				pf.color = "Blue"
				pf.animation = new Animation(ASSET_MANAGER.getAsset("./img/puddle.png"), 0, 0, 286, 214, 0.3, 3, false, false); 
				this.removeFromWorld = true;
			} 
	}
	for (var i = 0; i < this.game.enemies.length; i++) {
		if (!this.game.enemies[i].removeFromWorld) {
			if (this.collideEnemy(this.game.enemies[i]) && this.attacking) {
					this.game.enemies[i].removeFromWorld = true;
			} if (this.collideEnemy(this.game.enemies[i]) && !this.attacking && !this.invinc) {
				HEALTH--;
				this.invinc = true;
				break;
			}
		}
	}
}


Cat.prototype.update = function() {
	if (this.game.space) this.attacking = true;
	if (this.game.w) this.jumping = true;
	else this.jumping = false;
	this.running = (this.game.right || this.game.left);
	this.ducking = this.game.down;
	
	if (this.invinc) {
		this.invincTimer += 0.05;
		this.invincTick = !this.invincTick;
		if (this.invincTimer >= 3) {
			this.invinc = false;
			this.invincTimer = 0;
			this.invincTick = false;
		}
	}
	if (this.attacking) { 
		if (this.attackAnim.isDone()) {
			this.attackAnim.elapsedTime = 0;
			this.attacking = false;	
		}
	}
	
	//=====setting ground=====//
	var highest_ground_beneath_me = 999999;
	for(var i = 0; i < this.game.platforms.length; i++){
		//if a platform is beneath cat and is higher than last highest ground, set as new highest ground
		if ((this.x + this.width < this.game.platforms[i].x 
			|| this.game.platforms[i].x + this.game.platforms[i].width < this.x) 
			|| this.game.platforms[i].y < this.y) {}
		else if (this.game.platforms[i].y < highest_ground_beneath_me){
			highest_ground_beneath_me = this.game.platforms[i].y;
		}
	}
	this.ground = highest_ground_beneath_me;
	//console.log("highest ground beneath me is " + this.ground);
	
	//~.~.~.~.~.~.~.~.~.~. code for momentuous movement ~.~.~.~.~.~.~.~.~.~.~.~.//
	if(this.running) {
		//sanitizing input (why is no press = undefined?  not false?)
		this.right = isNaN(this.game.right) ? false : this.game.right;
		this.left = isNaN(this.game.left) ? false : this.game.left;
		//add or subtract from hspeed depending on right/left
		this.hspeed += ((+this.right * this.HACCEL) - (+this.left * this.HACCEL));
	} else if(Math.abs(this.hspeed) < this.HDECCEL) {
		//if hspeed is < HDECCEL, we dont want to subtract from it,
		//cause that would mean slight backwards acceleration from decceleration, which is jank.
		this.hspeed = 0;
	} else if(this.hspeed != 0) {
		//subtracts decceleration from hspeed if hspeed positive, else adds it.
		this.hspeed -= (+this.right * this.HDECCEL) - (+this.left * this.HDECCEL);
	}
	//handling top speed
	if(Math.abs(this.hspeed) > this.MAX_HSPEED) 
		this.hspeed = this.MAX_HSPEED * Math.sign(this.hspeed);
	if (0 < this.x + this.hspeed < MAP_SIZE) {
		this.x += this.hspeed;
	}
	
	//~.~.~.~.~.~.~.~.~.~.~.~.~.~. code for momentuous jumping ~.~.~.~.~.~.~.~.~.~.~.//
	//if ur on the ground your not falling, and the inverse of that
	if(this.y == this.ground) this.vspeed = 0;
	// if jump is pressed while on the ground, vspeed = MAX_VSPEED
	if(this.jumping && this.y + this.height >= this.ground) {
		this.vspeed = this.MAX_VSPEED;
	// otherwise, decelerate
	} else if (this.y < this.ground && this.vspeed > this.MAX_VDECCEL){
		this.vspeed -= this.VDECCEL;
	}
	//console.log("vspeed " + this.vspeed + ", ground " + this.ground + ", y " + this.y);
	this.y -= this.vspeed;
	
	
	if (this.ducking) {
		this.boundingbox = new BoundingBox(this.x, this.y + 75, this.duckAnim.frameWidth - 6, this.duckAnim.frameHeight);
	}
	if (!this.running && !this.jumping && !this.attacking && !this.ducking) {
		if (this.right) {
			this.boundingbox = new BoundingBox(this.x, this.y + 60, this.neutralR.frameWidth , this.neutralR.frameHeight);
		}
		else {
			this.boundingbox = new BoundingBox(this.x, this.y + 60, this.neutralL.frameWidth, this.neutralL.frameHeight);
		}
	}
	
	this.collisionHelper();
	if (this.y > 800 || HEALTH === 0) {
		this.removeFromWorld = true;
		this.y = 50;
		this.falling = false;
		LIVES--;
		HEALTH = 9;
		if (LIVES >= 0) {
			this.game.sceneManager.setScene(this.game.sceneManager.scenes[STATUS_SCENE])
			this.game.cat.x = this.game.cat.spawn;
		} else {
			this.game.sceneManager.setScene(this.game.sceneManager.scenes[GAME_OVER_SCENE]);
			LIVES = 2;
			this.game.cat.x = 0;
			this.game.cat.spawn = 0;
		}
	}
	if (this.x >= MAP_SIZE - 64) {
		this.game.sceneManager.setScene(this.game.sceneManager.scenes[WIN_SCREEN]);
		alert("YOU'RE WINNER")
	}
	Entity.prototype.update.call(this);
}

Cat.prototype.draw = function(ctx) {
	console.log(this.invincTimer);
	if (!this.invincTick) {
	//console.log(this.boundingbox.color);
	if(this.boxes){
		//ctx.strokeStyle = "red";
        //ctx.strokeRect(this.x + 25, this.y + 60, this.neutralL.frameWidth - 35, this.neutralL.frameHeight - 10);
        ctx.strokeStyle = this.boundingbox.color;
        ctx.strokeRect(this.x - this.game.camera.x, this.y - this.height + 2, this.width, this.height);
	}
	
	if (this.attacking) {
		this.attackAnim.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.height + 2); 
		ctx.strokeStyle = this.boundingbox.color;
        ctx.strokeRect(this.x - this.game.camera.x, this.y - this.height + 2, this.width, this.height);
	
	
	} else if (this.y > this.ground) {
		this.jumpAnim.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.height + 2);
		if (this.jumpAnim.isDone()) {
            this.jumpAnim.elapsedTime = 0;
            this.jumping = false;
            this.falling = true;
        }
		ctx.strokeStyle = this.boundingbox.color;
        ctx.strokeRect(this.x - this.game.camera.x, this.y - this.height + 2, this.width, this.height);
	
		
	} else if (this.running && this.game.right) {
		this.runRAnim.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.height + 2);
		ctx.strokeStyle = this.boundingbox.color;
        ctx.strokeRect(this.x - this.game.camera.x, this.y - this.height + 2, this.width, this.height);
	
		
	} else if (this.running && this.game.left) {
		this.runLAnim.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.height + 2);
		ctx.strokeStyle = this.boundingbox.color;
        ctx.strokeRect(this.x - this.game.camera.x, this.y - this.height + 2, this.width, this.height);
	
		
	} else if (this.ducking) {
		this.duckAnim.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.height + 2);
		ctx.strokeStyle = this.boundingbox.color;
        ctx.strokeRect(this.x - this.game.camera.x, this.y - this.height + 2, this.width, this.height);
	
	
	} else {
		if (this.right) {
			this.neutralR.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.height + 2);
			ctx.strokeStyle = this.boundingbox.color;
			ctx.strokeRect(this.x - this.game.camera.x, this.y - this.height + 2, this.width, this.height);
	
		}
		if (this.left) {
			this.neutralL.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y -this.height + 2);
			ctx.strokeStyle = this.boundingbox.color;
			ctx.strokeRect(this.x - this.game.camera.x, this.y - this.height + 2, this.width, this.height);
	
		}
	}

	Entity.prototype.draw.call(this);
	}
}
