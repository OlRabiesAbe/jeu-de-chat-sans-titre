function Rat(game, x, y) {
	this.animationL = new Animation(ASSET_MANAGER.getAsset("./img/rat.png"), 0, 0, 64, 64, 0.05, 3, true, true);	
	this.animationR = new Animation(ASSET_MANAGER.getAsset("./img/rat.png"), 0, 65, 64, 64, 0.05, 3, true, false);
	this.xMin = x - 64 * 2;
	this.xMax = x + 64 * 2;
	this.l = false;
	this.name = "Rat";
	this.boundingbox = new BoundingBox(x, y + 30, this.animationL.frameWidth, this.animationL.frameHeight - 30, "Black")
	Entity.call(this, game, x, y);
}

Rat.prototype = new Entity();
Rat.prototype.constructor = Rat;

Rat.prototype.update = function() {
	if (this.l) {
		if (this.x - 4 >= this.xMin) {
			this.x -= 4;
			this.boundingbox = new BoundingBox(this.x, this.y + 30, this.animationL.frameWidth, this.animationR.frameHeight - 30, "Black");

		} else {
			this.l = false;
		}
	} else {
		if (this.x + 4 <= this.xMax) {
			this.x += 4;
			this.boundingbox = new BoundingBox(this.x, this.y + 30, this.animationL.frameWidth, this.animationL.frameHeight - 30, "Black");
		} else {
			this.l = true;
		}
	}
	//console.log(this.l)
}

Rat.prototype.draw = function(ctx) {
	//console.log(this.boundingbox)
	ctx.strokeSytle = "Red";
	ctx.strokeRect(this.boundingbox.x - this.game.camera.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
	if (this.l) {
		this.animationL.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y);
	} else {
		this.animationR.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y);
	}
}

	