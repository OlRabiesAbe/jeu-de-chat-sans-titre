
//~.~.~.~.~.~.~.~.~.~.~.~. code for a generic tile ~.~.~.~.~.~.~.~.~.~.~.~.//
function Tile(game, img, framex, framey, x, y,) {
	this.game = game;
	this.x = x * 128; this.y = y * 128;
	this.x = x * 128; this.y = y * 128; 
	this.width = 128; this.height = 128; 
	//Animation(spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse)
	this.animation = new Animation(ASSET_MANAGER.getAsset(img), framex, framey, 128, 128, 1, 1, true, false);
}
Tile.prototype = new Entity();
Tile.prototype.constructor = Tile;
Tile.prototype.update = function(ctx) { //Tile.update pretty must just handles displacing the cat when it collides with the tile (enters the tile)
	
	//checking if the cat is in this tile. last else = a collision is occuring
	for(var i = 0; i < 3; i++) {
		if(this.game.cat.y + this.game.cat.height < this.y - 32|| this.game.cat.y > this.y + 32) {}
		else if (this.game.cat.x + this.game.cat.width < this.x || this.game.cat.x > this.x + this.width) {}
		//a collision has occured, displace cat out of tile
		else {
			console.log("a coll has occured");
			//new vers: cases:
			//cat to left or right of tile respective, cat must be between border and 32 units in to trigger
			if(this.game.cat.x > this.x && this.game.cat.x < this.x + 32 && i == 0) {
				this.game.cat.x = this.x;
				this.game.cat.hspeed = 0;
			} else if (this.game.cat.x > this.x + this.width - 32 && this.game.cat.x < this.x + this.width && i == 0) {
				this.game.cat.x = this.x + this.width;
				this.game.cat.hspeed = 0;
			}
			//cat above tile
			if(this.game.cat.y < this.y + 32 && this.game.cat.y > this.y - 32 && i == 1) {
				this.game.cat.y = this.y;
				this.game.cat.vspeed = 0;
				console.log("cat hit ground");
			}
			//cat inside/below tile
			if (this.game.cat.y > this.y + 32 && this.game.cat.y < this.y + this.height + 32 && i == 2) {
				this.game.cat.y = this.y + this.height + 32;
				this.game.cat.vspeed = 0;
			}
		}
	}
}
Tile.prototype.draw = function(ctx) { //i dont understand drawing funcs
	this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 1);
	Entity.prototype.draw.call(this);
}