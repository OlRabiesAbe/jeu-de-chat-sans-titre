
//~.~.~.~.~.~.~.~.~.~.~.~. code for a generic tile ~.~.~.~.~.~.~.~.~.~.~.~.//
function Tile(game, img, framex, framey, x, y, posX, posY, width, height, frameW, frameH) {
	this.game = game;
	this.x = x; this.y = y;
	this.width = width; this.height = height; 
	this.frameW = frameW; this.frameH = this.frameH;
	this.posX = posX; this.posY = posY
	//collision specifics suite
	this.VERT_COLL_RADIUS = this.height / 8; //how far a tile's hitbox extends out to the left and right
	this.FLOOR_MAGNET_RADIUS = this.height / 4; //how vertically close the cat has to be to be "standing on" the tile
	this.BOTTOM_EXTENSION = Math.floor(this.height / 2.66); //how far down a tile's hitbox extends
	
	//Animation(spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse)
	this.animation = new Animation(ASSET_MANAGER.getAsset(img), framex, framey, frameW, frameH, 1, 1, true, false);
}
Tile.prototype = new Entity();
Tile.prototype.constructor = Tile;

Tile.prototype.handleCollision = function(entity) {
//checking if the cat is colliding with this tile. last else = a collision is occuring
	if(entity.y < this.y - this.FLOOR_MAGNET_RADIUS || entity.y > this.y + this.height + this.BOTTOM_EXTENSION) {}
	else if (entity.x + entity.width < this.x - this.VERT_COLL_RADIUS || entity.x > this.x + this.width + this.VERT_COLL_RADIUS) {}
	//a collision has occured, displace cat out of tile
	else {
		for(var i = 0; i < 3; i++) {
			//cases: (this code is seriously frikking incomprehensible, i hope to god i never ahve to look at it again)
			//all the conditions for the cat's collsion are somehow encoded into those disgusting boolean statements, and even a minor change can potentially ruin them
			
			//a tile's left/right colliders extends VCR units into and out of the tile, starts 4 units down from the top of the tile, and extends BE units beneath it
			// ~+LEFT CASE+~
			if(entity.x + entity.width > this.x - this.VERT_COLL_RADIUS && entity.x + entity.width < this.x + this.VERT_COLL_RADIUS 
					&& entity.y > this.y + 4 && entity.y < this.y + this.height + this.BOTTOM_EXTENSION && i == 0) {
				entity.x = this.x - entity.width - this.VERT_COLL_RADIUS;
				entity.hspeed = 0;
				//console.log("cat hit wall while going in an easterly direction" + ", tile data: (" + this.x + ", " + this.y + ")");
			// ~+RIGHT CASE+~
			} else if (entity.x > this.x + this.width - this.VERT_COLL_RADIUS && entity.x < this.x + this.width + this.VERT_COLL_RADIUS 
					&& entity.y > this.y + 4 && entity.y < this.y + this.height + this.BOTTOM_EXTENSION && i == 0) {
				entity.x = this.x + this.width + this.VERT_COLL_RADIUS;
				entity.hspeed = 0;
				//console.log("cat hit wall while going in a westerly direction" + ", tile data: (" + this.x + ", " + this.y + ")");
			}
			
			//if the cat is within FMR units above or below the tile's top, cat gets sucked to the surface
			//BUG W THIS, i think the top is too wide, the cat can stand on vertical walls
			// ~+TOP OF TILE CASE+~
			if(entity.y < this.y + this.FLOOR_MAGNET_RADIUS && entity.y > this.y - this.FLOOR_MAGNET_RADIUS && i == 1) {
				entity.y = this.y;
				entity.vspeed = 0;
				//console.log("cat hit ground" + " tile data: (" + this.x + ", " + this.y + ")");
			}
			
			//the cat isn't allowed to get within BE units of the bottom of the tile, cause otherwise the cat could visually enter the tile
			//~+BOTTOM OF OR INSIDE OF TILE CASE+~
			if (entity.y > this.y + this.FLOOR_MAGNET_RADIUS && entity.y < this.y + this.height + this.BOTTOM_EXTENSION 
					&& entity.x + entity.width > this.x + this.VERT_COLL_RADIUS && entity.x < this.x + this.width - this.VERT_COLL_RADIUS && i == 2) {
				entity.y = this.y + this.height + this.BOTTOM_EXTENSION + entity.height;
				entity.vspeed = 0;
				//console.log("cat hit ceiling" + " tile data: (" + this.x + ", " + this.y + ")");
			}
		}
	}
	return;
}
Tile.prototype.update = function(ctx) { //Tile.update pretty must just handles displacing the cat when it collides with the tile (enters the tile)
	this.handleCollision(this.game.cat);
	for (var i = 0; i < this.game.enemies.length; i++) {
		var enemy = this.game.enemies[i];
		//console.log(enemy);
		this.handleCollision(enemy);
	}

}
Tile.prototype.draw = function(ctx) { //i dont understand drawing funcs
	this.animation.drawFrame(this.game.clockTick, ctx, this.posX - this.game.camera.x, this.posY, 1);
	Entity.prototype.draw.call(this);
}
