
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
	if(this.game.cat.y < this.y - 32 || this.game.cat.y > this.y + this.height + 48) {}
	else if (this.game.cat.x + this.game.cat.width < this.x - 16 || this.game.cat.x > this.x + this.width + 16) {}
	//a collision has occured, displace cat out of tile
	else {
		//console.log("a coll has occured");
		//console.log("cat data: (" + this.game.cat.x + ", " + this.game.cat.y + ") " + this.game.cat.hspeed + "hs " + this.game.cat.vspeed + "vs " + this.game.cat.ground + "ground");
		//console.log("tile data: (" + this.x + ", " + this.y + ")");
		for(var i = 0; i < 3; i++) {
			//new vers: cases:
			//cat to left or right of tile respective,d cat must be within 16 units of border to trigger
			//console.log("Clause 1: " + (this.game.cat.x + this.game.cat.width > this.x - 16));
			//console.log("Clause 2: " + (this.game.cat.x + this.game.cat.width < this.x + 16));
			//console.log("Clause 3: " + (this.game.cat.y > this.y + 4));
			//console.log("Clause 4: " + (this.game.cat.y < this.y + this.height + 16));
			if(this.game.cat.x + this.game.cat.width > this.x - 16 && this.game.cat.x + this.game.cat.width < this.x + 16 && this.game.cat.y > this.y + 4 && this.game.cat.y < this.y + this.height + 48 && i == 0) {
				//alert(this.x - this.game.cat.width - 16);
				this.game.cat.x = this.x - this.game.cat.width - 16;
				this.game.cat.hspeed = 0;
				console.log("cat hit wall while going in an easterly direction" + ", tile data: (" + this.x + ", " + this.y + ")");
			} else if (this.game.cat.x > this.x + this.width - 16 && this.game.cat.x < this.x + this.width + 16 && this.game.cat.y > this.y + 4 && this.game.cat.y < this.y + this.height + 48 && i == 0) {
				this.game.cat.x = this.x + this.width + 16;
				this.game.cat.hspeed = 0;
				console.log("cat hit wall while going in a westerly direction" + ", tile data: (" + this.x + ", " + this.y + ")");
			}
			//cat above tile
			if(this.game.cat.y < this.y + 32 && this.game.cat.y > this.y - 32 && i == 1) {
				this.game.cat.y = this.y;
				this.game.cat.vspeed = 0;
				console.log("cat hit ground" + " tile data: (" + this.x + ", " + this.y + ")");
			}
			//cat inside/below tile
			if (this.game.cat.y > this.y + 32 && this.game.cat.y < this.y + this.height + 48 && this.game.cat.x + this.game.cat.width > this.x + 16 && this.game.cat.x < this.x + this.width - 16 && i == 2) {
				this.game.cat.y = this.y + this.height + 48 + this.game.cat.height;
				this.game.cat.vspeed = 0;
				console.log("cat hit ceiling" + " tile data: (" + this.x + ", " + this.y + ")");
			}
		}
	}

}
Tile.prototype.draw = function(ctx) { //i dont understand drawing funcs
	this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 1);
	Entity.prototype.draw.call(this);
}