
//~.~.~.~.~.~.~.~.~.~.~.~. code for a generic tile ~.~.~.~.~.~.~.~.~.~.~.~.//
function Tile(game, img, framex, framey, x, y,) {
	this.game = game;
	this.x = x * 128; this.y = y * 128;
	this.x = x * 128; this.y = y * 128; 
	this.width = 128; this.height = 128; 
	
	//collision specifics suite
	this.VERT_COLL_RADIUS = 16; //how far a tile's hitbox extends out to the left and right
	this.FLOOR_MAGNET_RADIUS = 32; //how vertically close the cat has to be to be "standing on" the tile
	this.BOTTOM_EXTENSION = 48; //how far down a tile's hitbox extends
	
	//Animation(spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse)
	this.animation = new Animation(ASSET_MANAGER.getAsset(img), framex, framey, 128, 128, 1, 1, true, false);
}
Tile.prototype = new Entity();
Tile.prototype.constructor = Tile;
Tile.prototype.update = function(ctx) { //Tile.update pretty must just handles displacing the cat when it collides with the tile (enters the tile)
	
	//checking if the cat is colliding with this tile. last else = a collision is occuring
	if(this.game.cat.y < this.y - this.FLOOR_MAGNET_RADIUS || this.game.cat.y > this.y + this.height + this.BOTTOM_EXTENSION) {}
	else if (this.game.cat.x + this.game.cat.width < this.x - this.VERT_COLL_RADIUS || this.game.cat.x > this.x + this.width + this.VERT_COLL_RADIUS) {}
	//a collision has occured, displace cat out of tile
	else {
		for(var i = 0; i < 3; i++) {
			//cases: (this code is seriously frikking incomprehensible, i hope to god i never ahve to look at it again)
			//all the conditions for the cat's collsion are somehow encoded into those disgusting boolean statements, and even a minor change can potentially ruin them
			
			//a tile's left/right colliders extends VCR units into and out of the tile, starts 4 units down from the top of the tile, and extends BE units beneath it
			// ~+LEFT CASE+~
			if(this.game.cat.x + this.game.cat.width > this.x - this.VERT_COLL_RADIUS && this.game.cat.x + this.game.cat.width < this.x + this.VERT_COLL_RADIUS 
					&& this.game.cat.y > this.y + 4 && this.game.cat.y < this.y + this.height + this.BOTTOM_EXTENSION && i == 0) {
				this.game.cat.x = this.x - this.game.cat.width - this.VERT_COLL_RADIUS;
				this.game.cat.hspeed = 0;
				//console.log("cat hit wall while going in an easterly direction" + ", tile data: (" + this.x + ", " + this.y + ")");
			// ~+RIGHT CASE+~
			} else if (this.game.cat.x > this.x + this.width - this.VERT_COLL_RADIUS && this.game.cat.x < this.x + this.width + this.VERT_COLL_RADIUS 
					&& this.game.cat.y > this.y + 4 && this.game.cat.y < this.y + this.height + this.BOTTOM_EXTENSION && i == 0) {
				this.game.cat.x = this.x + this.width + this.VERT_COLL_RADIUS;
				this.game.cat.hspeed = 0;
				//console.log("cat hit wall while going in a westerly direction" + ", tile data: (" + this.x + ", " + this.y + ")");
			}
			
			//if the cat is within FMR units above or below the tile's top, cat gets sucked to the surface
			//BUG W THIS, i think the top is too wide, the cat can stand on vertical walls
			// ~+TOP OF TILE CASE+~
			if(this.game.cat.y < this.y + this.FLOOR_MAGNET_RADIUS && this.game.cat.y > this.y - this.FLOOR_MAGNET_RADIUS && i == 1) {
				this.game.cat.y = this.y;
				this.game.cat.vspeed = 0;
				console.log("cat hit ground" + " tile data: (" + this.x + ", " + this.y + ")");
			}
			
			//the cat isn't allowed to get within BE units of the bottom of the tile, cause otherwise the cat could visually enter the tile
			//~+BOTTOM OF OR INSIDE OF TILE CASE+~
			if (this.game.cat.y > this.y + this.FLOOR_MAGNET_RADIUS && this.game.cat.y < this.y + this.height + this.BOTTOM_EXTENSION 
					&& this.game.cat.x + this.game.cat.width > this.x + this.VERT_COLL_RADIUS && this.game.cat.x < this.x + this.width - this.VERT_COLL_RADIUS && i == 2) {
				this.game.cat.y = this.y + this.height + this.BOTTOM_EXTENSION + this.game.cat.height;
				this.game.cat.vspeed = 0;
				//console.log("cat hit ceiling" + " tile data: (" + this.x + ", " + this.y + ")");
			}
		}
	}

}
Tile.prototype.draw = function(ctx) { //i dont understand drawing funcs
	this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 1);
	Entity.prototype.draw.call(this);
}

//https://www.youtube.com/watch?v=aZkLTFKV-fU