function ContinueBtn(game, x, y) {
	this.animation = new Animation(ASSET_MANAGER.getAsset("./img/GameEndBtn.png"), 0, 0, 239, 101, 1, 1, true, false);
	this.hoverAnim = new Animation(ASSET_MANAGER.getAsset("./img/GameEndBtn.png"), 0, 102, 239, 101, 1, 1, true, false);
	this.hover = false;
	Entity.call(this, game, x, y);
}

ContinueBtn.prototype = new Entity();
ContinueBtn.prototype.constructor = ContinueBtn;

ContinueBtn.prototype.update = function() {
	this.hover = this.game.contBtnHover;
	if (this.game.click && this.hover && !this.removeFromWorld) {
		this.game.sceneManager.setScene(this.game.sceneManager.scenes[STATUS_SCENE]);
		this.game.sceneManager.scenes[STATUS_SCENE].timer = 0;
	}
}

ContinueBtn.prototype.draw = function(ctx) {
	if (!this.hover) {
		this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
	} else {
		this.hoverAnim.drawFrame(this.game.clockTick, ctx, this.x, this.y);
	}
}

function EndBtn(game, x, y) {
	this.animation = new Animation(ASSET_MANAGER.getAsset("./img/GameEndBtn.png"), 241, 0, 239, 101, 1, 1, true, false);
	this.hoverAnim = new Animation(ASSET_MANAGER.getAsset("./img/GameEndBtn.png"), 241, 102, 239, 101, 1, 1, true, false);
	this.hover = false;
	Entity.call(this, game, x, y);
}

EndBtn.prototype = new Entity();
EndBtn.prototype.constructor = EndBtn;

EndBtn.prototype.update = function() {
	this.hover = this.game.endBtnHover;
	if (this.game.click && this.hover && !this.removeFromWorld) {
		this.game.sceneManager.setScene(this.game.sceneManager.scenes[TITLE_SCENE]);
	}
}

EndBtn.prototype.draw = function(ctx) {
	if (!this.hover) {
		this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
	} else {
		this.hoverAnim.drawFrame(this.game.clockTick, ctx, this.x, this.y);
	}
}