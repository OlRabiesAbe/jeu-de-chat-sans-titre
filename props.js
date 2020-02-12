function Lamp(game, x, y) {
	this.offAnim = new Animation(ASSET_MANAGER.getAsset("./img/lamp.png"), 0, 0, 74, 373, 1, 1, true, false);
	this.onAnim = new Animation(ASSET_MANAGER.getAsset("./img/lamp.png"), 76, 0, 74, 373, 1, 1, true, false);
	this.flag = false;
	Entity.call(this, game, x, 130);
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