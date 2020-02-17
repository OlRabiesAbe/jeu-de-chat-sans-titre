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
	if (this.color === "Grey") {
		this.animation = new Animation(ASSET_MANAGER.getAsset("./img/Sidewalk.png"), 0, 0, 64, 64, 1, 1, true, false);
		this.boundingbox = new BoundingBox(x, y, length, height);
	}
	if (this.color === "Brown") {
		this.animation = new Animation(ASSET_MANAGER.getAsset("./img/bridge.png"), 0, 0, 64, 32, 1, 1, true, false);
		this.boundingbox = new BoundingBox(x, y, length, height);
	}
	if (this.color === "Red") {
		this.animation = new Animation(ASSET_MANAGER.getAsset("./img/water.png"), 0, 0, 64, 64, 0.15, 7, true, false);
		this.boundingbox = new BoundingBox(x, y, 64, 64);
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
			this.animation = new Animation(ASSET_MANAGER.getAsset("./img/water.png"), 0, 0, 64, 64, 0.25, 7, true, false);
			LIVES--;
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
		
	}
}
Platform.prototype.draw = function (ctx) {
	if (this.animation !== null) {
		if (this.color === "Red") {
			this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y);
        ctx.strokeStyle = this.boundingbox.color;
        ctx.strokeRect(this.boundingbox.x - this.game.camera.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
		} else if (this.color === "Green" || this.color === "Grey" || this.color === "Brown") {
			this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y);
			
        ctx.strokeStyle = this.boundingbox.color;
        ctx.strokeRect(this.boundingbox.x - this.game.camera.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
		}
		 else if (this.color === "Blue") {
			this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y);
			
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
