// Entities for the title screen are static, so they can reuse this same constructor
function Title(game, asset, assetW, assetH, x, y) {
	this.animation = new Animation(ASSET_MANAGER.getAsset(asset), 0, 0, assetW, assetH, 1, 1, true, false);
	Entity.call(this, game, x, y);
}
Title.prototype = new Entity();
Title.prototype.constructor = Title;

Title.prototype.update = function() {
}
Title.prototype.draw = function(ctx) {
	this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
}

// This button is on the title screen and will start the game
function StartBtn(game, x, y) {
	this.animation = new Animation(ASSET_MANAGER.getAsset("./img/start_btn.png"), 0, 0, 239, 101, 1, 1, true, false);
	this.hoverAnim = new Animation(ASSET_MANAGER.getAsset("./img/start_btn.png"), 0, 102, 239, 101, 1, 1, true, false);
	this.hover = false;
	Entity.call(this, game, x, y);
}

StartBtn.prototype = new Entity();
StartBtn.prototype.constructor = StartBtn;

StartBtn.prototype.update = function() {
	this.hover = this.game.stBtnHover;
	if (this.game.click && this.hover && !this.removeFromWorld) {
		this.game.sceneManager.setScene(this.game.sceneManager.scenes[STATUS_SCENE]);
		this.game.sceneManager.scenes[STATUS_SCENE].timer = 0;
	}
}

StartBtn.prototype.draw = function(ctx) {
	if (!this.hover) {
		this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
	} else {
		this.hoverAnim.drawFrame(this.game.clockTick, ctx, this.x, this.y);
	}
}