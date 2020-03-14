
//~.~.~.~.~.~.~.~.~.~.~.~. code for a generic tile ~.~.~.~.~.~.~.~.~.~.~.~.//
function Tile(game, img, framex, framey, x, y, posX, posY, width, height, frameW, frameH, allSides, canMove, isVertical, start, end) {
	this.game = game;
	//Buffer added to make detection of cat less sensitive on right side.
	this.buffer = 30
	this.x = x; this.y = y;
	this.width = width; this.height = height; 
	this.frameW = frameW; this.frameH = this.frameH;
	this.allSides = allSides; //what is allSides
	this.posX = posX; this.posY = posY
	//collision specifics suite
	this.VERT_COLL_RADIUS = 16; //how far a tile's hitbox extends out to the left and right
	this.FLOOR_MAGNET_RADIUS = 32; //how vertically close the cat has to be to be "standing on" the tile
	this.BOTTOM_EXTENSION = 42; //how far down a tile's hitbox extends
	
	
	//Experimental code add-on for moving platform.
	this.speed = 2
	this.canMove = canMove
	this.isVertical = isVertical
	this.start = start
	this.end = end
	if(this.isVertical){
		this.down = true
		this.up = false	
	} else {
		this.left = true
		this.right = false
	}
	
	
	
	//Animation(spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse)
	this.animation = new Animation(ASSET_MANAGER.getAsset(img), framex, framey, frameW, frameH, 1, 1, true, false);
}
Tile.prototype = new Entity();
Tile.prototype.constructor = Tile;

Tile.prototype.handleCollision = function(entity) {
//checking if the cat is colliding with this tile. last else = a collision is occuring
	if(entity.y < this.y - this.FLOOR_MAGNET_RADIUS || entity.y > this.y + this.height + this.BOTTOM_EXTENSION) {}
		//Modified check, added buffer space for draw frame check.
		else if (entity.x + this.buffer + entity.width < this.x - this.VERT_COLL_RADIUS || entity.x > this.x + this.width + this.VERT_COLL_RADIUS) {}
		//a collision has occured, displace cat out of tile
		else {
				//cases: (this code is seriously frikking incomprehensible, i hope to god i never ahve to look at it again)
				//all the conditions for the cat's collsion are somehow encoded into those disgusting boolean statements, and even a minor change can potentially ruin them
				
				//a tile's left/right colliders extends VCR units into and out of the tile, starts 4 units down from the top of the tile, and extends BE units beneath it
				// ~+LEFT CASE+~
				if(entity.x + entity.width > this.x - this.VERT_COLL_RADIUS && entity.x + entity.width < this.x + this.VERT_COLL_RADIUS 
						&& entity.y > this.y + 4 && entity.y < this.y + this.height + this.BOTTOM_EXTENSION) {
					entity.x = this.x - entity.width - this.VERT_COLL_RADIUS;
					entity.hspeed = 0;
					
					//console.log("cat hit wall while going in an easterly direction" + ", tile data: (" + this.x + ", " + this.y + ")");
				// ~+RIGHT CASE+~
				} else if (entity.x > this.x + this.width - this.VERT_COLL_RADIUS && entity.x < this.x + this.width + this.VERT_COLL_RADIUS 
						&& entity.y > this.y + 4 && entity.y < this.y + this.height + this.BOTTOM_EXTENSION) {
					entity.x = this.x + this.width + this.VERT_COLL_RADIUS;
					entity.hspeed = 0;
					//console.log("cat hit wall while going in a westerly direction" + ", tile data: (" + this.x + ", " + this.y + ")");
				}
				
				//if the cat is within FMR units above or below the tile's top, cat gets sucked to the surface
				//BUG W THIS, i think the top is too wide, the cat can stand on vertical walls
				// ~+TOP OF TILE CASE+~
				if(entity.y < this.y + this.FLOOR_MAGNET_RADIUS && entity.y > this.y - this.FLOOR_MAGNET_RADIUS
						&& entity.x + entity.width > this.x && entity.x < this.x + this.width) {
					entity.y = this.y;
					entity.vspeed = 0;
					if(this.canMove){
						//In order to ensure the entity does not fall through platform on the assent
						if(this.up){
							entity.y -= this.speed 
						} else if(this.down){ //Will allow the entity to not feel like he is not hovering above the falling platform.
							entity.y += this.speed 
						}
						if(this.right){
							entity.x += this.speed
						} else if (this.left){
							entity.x -= this.speed
						}
					}
					//console.log("cat hit ground" + " tile data: (" + this.x + ", " + this.y + ")");
				}
				if (this.allSides.bottom) {
					//the cat isn't allowed to get within BE units of the bottom of the tile, cause otherwise the cat could visually enter the tile
					//~+BOTTOM OF OR INSIDE OF TILE CASE+~
					if (entity.y > this.y + this.FLOOR_MAGNET_RADIUS && entity.y < this.y + this.height + this.BOTTOM_EXTENSION 
							&& entity.x + entity.width > this.x + this.VERT_COLL_RADIUS && entity.x < this.x + this.width - this.VERT_COLL_RADIUS) {
						entity.y = this.y + this.height + this.BOTTOM_EXTENSION + entity.height;
						entity.vspeed = 0;
						//console.log("cat hit ceiling" + " tile data: (" + this.x + ", " + this.y + ")");
					}
				}
	}
	return;
}
Tile.prototype.update = function(ctx) { //Tile.update pretty must just handles displacing the cat when it collides with the tile (enters the tile)
	
	if (this.allSides.allDir) {
		this.handleCollision(this.game.cat);
		for (var i = 0; i < this.game.enemies.length; i++) {
			var enemy = this.game.enemies[i];
			//console.log(enemy);
			this.handleCollision(enemy);
		}
	}
	
	if(this.canMove){
		if(this.isVertical){
			//Determines when it should move up or down
			if(this.y <= this.start){
				this.down = true
				this.up = false
				
			}else if(this.y >= this.end){
				this.up = true
				this.down = false
			}
			//Determines how it should move vertically
			if(this.down){
				this.y += this.speed
				this.posY += this.speed
			} else if (this.up){
				this.y -= this.speed
				this.posY -= this.speed
			}
		} else {
			//Determines when it should move left or right
			if(this.x <= this.start){
				this.right = true
				this.left = false
				
			}else if(this.x >= this.end){
				this.left = true
				this.right = false
			}
			//Determines how it should move horrizontally
			/**
			if(this.down){
				this.y += this.speed
				this.posY += this.speed
			} else if (this.up){
				this.y -= this.speed
				this.posY -= this.speed
			}
			*/
			if(this.right){
				this.x += this.speed
				this.posX += this.speed
			} else if (this.left){
				this.x -= this.speed
				this.posX -= this.speed
			}
		}
		
	}
	
}
Tile.prototype.draw = function(ctx) { //i dont understand drawing funcs
	this.animation.drawFrame(this.game.clockTick, ctx, this.posX - this.game.camera.x, this.posY, 1);
	if(this.canMove){
			ctx.strokeStyle = "Black";
			ctx.rect(this.x - this.game.camera.x, 0, 128, 128);
			ctx.fill()
			ctx.moveTo(this.x + 64- this.game.camera.x,0);
			ctx.lineWidth = 3

			ctx.lineTo(this.x + 64- this.game.camera.x,this.y)

			//ctx.line(this.x)
			ctx.stroke()
		
		
	}
	Entity.prototype.draw.call(this);
}
