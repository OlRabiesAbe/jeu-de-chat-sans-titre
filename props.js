/**
 * A lamp will turn on when the cat is near it.
 */
function Lamp(game, x, y) {
	this.offAnim = new Animation(ASSET_MANAGER.getAsset("./img/lamp.png"), 1023, 0, 128, 384, 1, 1, true, false);
	this.onAnim = new Animation(ASSET_MANAGER.getAsset("./img/lamp.png"), 0, 0, 128, 384, 0.02, 8, true, false);
	this.flag = false;
	Entity.call(this, game, x, y);
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
	this.name = "Checkpoint";
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