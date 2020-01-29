function Cat(game) {
	this.neutralR = new Animation(ASSET_MANAGER.getAsset("./img/catBeta.png"), 0, 967, 96, 96, 0.03, 1, true, false);
	this.neutralL = new Animation(ASSET_MANAGER.getAsset("./img/catBeta.png"), 104, 967, 96, 96, 0.03, 1, true, false);
	this.attackAnim = new Animation(ASSET_MANAGER.getAsset("./img/catBeta.png"), 0, 0, 80, 150, 0.03, 9, false, false);
	this.jumpAnim = new Animation(ASSET_MANAGER.getAsset("./img/catBeta.png"), 0, 155, 80, 150, 0.03, 9, false, false);
	
	this.fallAnim = new Animation(ASSET_MANAGER.getAsset("./img/catBeta.png"), 0, 621, 80, 75, 0.03, 9, true, false);
	
	this.runRAnim = new Animation(ASSET_MANAGER.getAsset("./img/catBeta.png"), 0, 701, 128, 128, 0.1, 6, true, false);
	this.runLAnim = new Animation(ASSET_MANAGER.getAsset("./img/catBeta.png"), 0, 834, 128, 128, 0.1, 6, true, true);
	this.duckAnim = new Animation(ASSET_MANAGER.getAsset("./img/catBeta.png"), 0, 621, 80, 75, 0.03, 9, true, false);
	
    this.falling = false;
	this.x = 0;
	this.height = 150
	this.running = false;
	this.attacking = false;
	this.attackRange = 150		//The default attack range of the cat.
	this.ducking = false;
	this.jumping = false;
	this.left = false; 
	this.right = true;
	this.radius = 100;
	this.ground = 350;
	this.totalHeight = 30;
	
	this.boxes = true
	this.boundingbox = new BoundingBox(this.x, this.y, this.neutralR.frameWidth - 30, this.neutralR.frameHeight - 20, "Black");
	
	Entity.call(this, game, 20, 350);
}

Cat.prototype = new Entity();
Cat.prototype.constructor = Cat;
function distance(a, b) {
    var dx = a.x - b.x;
    var dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
}

Cat.prototype.collideDeath = function (other) {
    return this.y + this.height== other.y  && this.x < other.x + other.length
    		&& this.x + this.radius > other.x ;
    		
};
Cat.prototype.collideEnemy = function (other) {
    return this.x < other.x + other.length
	&& this.x + this.attackRange > other.x ;
	
};

/**
 * This function will detect if the cat reaches the 
 * leftmost boundary.
 */
Cat.prototype.collideLeft = function () {
    return (this.x - this.radius) < -100;
};
/**
 * This function will detect if the cat reches the 
 * rightmost boundary.
 */
Cat.prototype.collideRight = function () {
    return (this.x + this.radius) > 800;
};


Cat.prototype.update = function() {
	//if (this.collideRight()) this.x = 800 - this.radius; //Checks boundry for right side of the map
	//if (this.collideLeft()) this.x = this.radius-100; //Checks boundary for left side of the map
	
	var death = this.game.entities[4]
	var bad = this.game.entities[5]

	if(this.collideDeath(death)){
		this.removeFromWorld = false;
		death.color = "Blue"
	} else {
		death.color = "Red"
	}
	
	if (this.game.space) this.attacking = true;
	if (this.game.w) this.jumping = true;
	this.running = (this.game.right || this.game.left);

	this.ducking = this.game.down;
	if (this.attacking) {
		if(this.collideEnemy(bad)){		//This will remove the enemy when the player hits it.
			bad.removeFromWorld = true;
			
		} 
		if (this.attackAnim.isDone()) {
			this.attackAnim.elapsedTime = 0;
			this.attacking = false;
		}
	}
	if (this.running) {
		if (this.game.right) {
	        this.boundingbox = new BoundingBox(this.x + 35, this.y + 60, this.neutralR.frameWidth - 30, this.neutralR.frameHeight - 10, "Orange");
			if (this.x + 7 <= 1490) {
				this.x += 7;
			}
			this.right = true;
			this.left = false;
		}
		else if (this.game.left) {
	        this.boundingbox = new BoundingBox(this.x, this.y + 60, this.neutralL.frameWidth - 35, this.neutralL.frameHeight - 10, "Purple");
			if (this.x - 7 >= 0) {
				this.x -= 7;
			}
			this.left = true;
			this.right = false;
		}
	}
	if (this.game.space && !this.jumping && !this.falling) {
        this.jumping = true;
        this.ground = this.y;
    }
	if (this.jumping) {		     
        if (this.jumpAnim.isDone()) {
            this.jumpAnim.elapsedTime = 0;
			this.jumping = false;
           // this.falling = true;
        }
        var jumpDistance = this.jumpAnim.elapsedTime / this.jumpAnim.totalTime;
       
        if (jumpDistance > 0.5)
            jumpDistance = 1 - jumpDistance;
		
        var height = this.totalHeight*(-40 * (jumpDistance * jumpDistance - jumpDistance)) ;
        //var height = jumpDistance * 2 * totalHeight;
        this.lastBottom = this.boundingbox.bottom;
        this.y = this.ground - height;
    	this.boundingbox = new BoundingBox(this.x + 40, this.y - 25, this.jumpAnim.frameWidth - 10, this.jumpAnim.frameHeight - 35, "Blue");
    	
        for (var i = 0; i < 3; i++) {
            var pf = this.game.entities[i];
            if (this.boundingbox.collide(pf.boundingbox) && this.lastBottom < pf.boundingbox.top) {
                this.jumping = false;
                this.y = pf.boundingbox.top - this.neutralR.frameHeight - 54;
      //          this.ground = this.y
                this.platform = pf;
                this.jumpAnim.elapsedTime = 0;
            } 
        }        
    }	
	if(this.falling){
		 //this.jumping = false
		 this.lastBottom = this.boundingbox.bottom;
         this.y += this.game.clockTick / this.jumpAnim.totalTime * 4 * this.totalHeight + 5;
    	 this.boundingbox = new BoundingBox(this.x + 35, this.y + 50, this.neutralL.frameWidth - 35, this.neutralL.frameHeight - 5, "Pink");
    	 
         for (var i = 0; i < 3; i++) {
             var pf = this.game.entities[i];
             if (this.boundingbox.collide(pf.boundingbox) && this.lastBottom < pf.boundingbox.top) {              
            	 this.falling = false;
                 this.y = pf.boundingbox.top - this.neutralR.frameHeight - 54;
             //    this.ground = this.y
                 this.platform = pf;
                 this.fallAnim.elapsedTime = 0;
             }
         }
	}
	if (!this.jumping && !this.falling) {
       // this.boundingbox = new BoundingBox(this.x + 35, this.y + 60, this.neutralL.frameWidth - 35, this.neutralL.frameHeight - 10, "Purple");
		/**
        if(this.game.right){
	        this.boundingbox = new BoundingBox(this.x + 35, this.y + 60, this.neutralL.frameWidth - 35, this.neutralL.frameHeight - 10, "Purple");
		} else if(this.game.left){
	        this.boundingbox = new BoundingBox(this.x - 5, this.y + 60, this.neutralL.frameWidth - 30, this.neutralL.frameHeight - 10, "Orange");
		}
		*/
        if (this.boundingbox.left > this.platform.boundingbox.right) this.falling = true;
    }
	//console.log(this.x + " " + this.y);
	Entity.prototype.update.call(this);
}

Cat.prototype.draw = function(ctx) {
	
	if(this.boxes){
		//ctx.strokeStyle = "red";
       // ctx.strokeRect(this.x + 25, this.y + 60, this.neutralL.frameWidth - 35, this.neutralL.frameHeight - 10);
        ctx.strokeStyle = this.boundingbox.color;
        ctx.strokeRect(this.boundingbox.x - this.game.camera.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
	}
	
	if (this.attacking) {
		this.attackAnim.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 2); 
	} 
	
	else if (this.jumping) {
		this.jumpAnim.drawFrame(this.game.clockTick, ctx, this.x + 50 - this.game.camera.x, this.y - 60);
		
	} else if (this.running && this.game.right) {
		this.runRAnim.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y + 25);
		
	} else if (this.running && this.game.left) {
		this.runLAnim.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y + 25);
		
	} else if (this.ducking) {
		this.duckAnim.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y + 75);
	} else {
		if (this.right) {
			this.neutralR.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y + 57);
		}
		if (this.left) {
			this.neutralL.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y + 57);
		}
	}

	Entity.prototype.draw.call(this);
}
