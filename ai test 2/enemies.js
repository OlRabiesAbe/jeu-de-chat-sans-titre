function Bird(game, x, y) {	
	this.bird = new Animation(ASSET_MANAGER.getAsset("./img/bird.png"), 35, 35, 185,70, 0.1, 4, true, false)
	this.reverseBird = new Animation(ASSET_MANAGER.getAsset("./img/bird.png"), 30, 600, 185,70, 0.1, 4, true, false)
	this.attackBird = new Animation(ASSET_MANAGER.getAsset("./img/bird.png"), 30, 400, 185,100, 0.1, 1, true, false)
	this.reverseAttack = new Animation(ASSET_MANAGER.getAsset("./img/bird.png"), 200, 770, 185,100, 0.1, 1, true, false)
	
	this.tx = 0; //Target Location
	this.ty = 0; 
	
	this.vx = 0; //Velocity
	this.vy = 0;
	
	this.scale = 64
	
	this.distance = 0;
	this.defaultHeight = y - 100
	this.type = "Fly"
	this.length = 50;
	this.height = 100
	this.start = x
	this.x = x;
	this.by = y;
	
	this.ax = x		//Determines x coordinate of the attack box
	this.ay = y		//Determines y coodinate of the attack box.
	this.length = 50	//Determines length of the attack box.
	this.height = 50	//Determines height of the attack box.
	
	this.count = 0;  	//To determine how long the bird will go in an attack dive
	this.count2 = 0;	//To determine how long the bird will retreat upwards
	this.leftCheck = true;	//To determine when to go left or right.
	this.rightCheck = false
	this.lastX = x	
	this.lastY = y
	this.leftAttack = false;	
	this.rightAttack = false;
	this.leftRetreat = false;
	this.rightRetreat = false;
	
	this.boundingbox = new BoundingBox(this.x, this.y, 100, 100, "Purple");
	Entity.call(this, game, this.x , this.by )
}
Bird.prototype = new Entity();
Bird.prototype.constructor = Bird;

Bird.prototype.update= function() {
		
	this.lastX = this.x
	this.lastY = this.by
		
	/**
	 * This will detect when it should switch from the default passive mode to attack mode.
	 * Fly mode will have the bird fly back and forth from one fixed position to another.
	 * Attack mode will be permenant when the bird detects the cat and attacks it.
	 */
	
	if (this.game.cat.x >= this.x - 100 && this.game.cat.x <= this.x + 100) {
		
		//this.boundingbox.color = "Red"
		this.type = "Attack"
		
	} 
	var cat = this.game.cat
	this.boundingbox = new BoundingBox(this.x, this.by, 10, 10, "Purple");
	if(this.count === 0){	//This will determine where the cat is located at and attack at that position.
		this.boundingbox.color = "Red"
		var tx = cat.x 	+ 65//Target Location
		var ty = cat.y - 40
		var dx = tx - this.x;
	    var dy = ty - this.by;
	    this.vx = dx
	    this.vy = dy
	    this.distance = Math.sqrt(dx * dx + dy * dy);
	   
	}
	
	if(this.type === "Fly"){
		if(this.count2 === 0){
			this.leftCheck = false;
			this.rightCheck = true
		}
		if(this.count2 === 100){
			this.leftCheck = true;
			this.rightCheck = false
		} 
		if(this.leftCheck){
			this.x -= 4
			this.count2--
			
		}
		if(this.rightCheck){
			this.x += 4
			this.count2++
		}
		
		if(this.y > this.defaultHeight){
			this.y -= 5
		}
		if(this.y < this.defaultHeight){
			this.y = this.defaultHeight
		}
		
	}
	if(this.type === "Attack"){
		this.count++
		if(this.count === 100){
			this.leftCheck = false;
			this.rightCheck = true
		}
		if(this.count === 250){
			
			this.leftCheck = true;
			this.rightCheck = false
			this.count = 0
		}
		
		if(this.by < 0){
			this.leftCheck = true;
			this.rightCheck = false
			this.count = 0
		}
		if(this.by > 500){
			this.leftCheck = false;
			this.rightCheck = true
			this.count = 100
		}
				
		if(this.leftCheck){
			this.x += this.vx/this.distance * 6
			this.by += this.vy/this.distance * 6 
		}
		if(this.rightCheck){
			this.by -= this.vy/this.distance * 6 
			this.x += this.vx/this.distance * 6 
		}
		
		//Check if the bird is attacking at a downward left angle.
		//Adjust animation to left attack
		if(this.lastX > this.x && this.lastY < this.by  ){
			this.leftAttack = true;
			this.rightAttack = false
			this.leftRetreat = false
			this.rightRetreat = false
		}
		//Check if the bird is attacking at a downward right angle.
		//Adjust animation to left attack
		if(this.lastX < this.x && this.lastY < this.y  ){
			this.leftAttack = false;
			this.rightAttack = true
			this.leftRetreat = false
			this.rightRetreat = false
		}
		//Check if the bird is attacking at a upward left angle.
		//Adjust animation to left movement
		if(this.lastX > this.x && this.lastY > this.by  ){
			this.leftAttack = false;
			this.rightAttack = false
			this.leftRetreat = true
			this.rightRetreat = false
		}
		//Check if the bird is attacking at a upward right angle.
		//Adjust animation to right movement
		if(this.lastX < this.x && this.lastY > this.by  ){
			this.leftAttack = false;
			this.rightAttack = false
			this.leftRetreat = false
			this.rightRetreat = true
		}
		if(this.leftAttack){ //Draws the attack box when attacking to the left
			this.ax = this.x + 25	
			this.ay = this.by + 30
			this.boundingbox = new BoundingBox(this.ax, this.ay, this.length, this.height, "Purple");
		} 
		if(this.rightAttack){	//Draws the attack box when attacking to the right.
			this.ax = this.x + 60	
			this.ay = this.by + 30
			this.boundingbox = new BoundingBox(this.ax, this.ay, this.length, this.height, "Purple");

		}
	}	
	Entity.prototype.update.call(this);	

}
Bird.prototype.draw = function (ctx) {
	
	if(this.type === "Fly" && this.leftCheck || this.type === "Attack" && this.leftRetreat){
		this.bird.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.by)

	} 
	if(this.type === "Fly" && this.rightCheck|| this.type === "Attack" && this.rightRetreat){
		this.reverseBird.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.by)

	} 
	if(this.type === "Attack" && this.leftAttack){
		this.attackBird.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.by)
		ctx.strokeStyle = this.boundingbox.color;
	    ctx.strokeRect(this.boundingbox.x - this.game.camera.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
	} 
	if(this.type === "Attack" && this.rightAttack){
		this.reverseAttack.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.by)
		ctx.strokeStyle = this.boundingbox.color;
	    ctx.strokeRect(this.boundingbox.x - this.game.camera.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
	}
	
	
    Entity.prototype.draw.call(this);
}

function Range(game, x, y) {
	//Action animation of the cowboy firing.
	this.ready = new Animation(ASSET_MANAGER.getAsset("./img/cowboy.png"), 240, 370, 190, 160, 0.12, 3, false, false);
	this.readyL = new Animation(ASSET_MANAGER.getAsset("./img/cowboy.png"), 280, 750, 190, 160, 0.12, 3, false, false);
	//Default stance of cowboy when he is not firing.
	this.stance = new Animation(ASSET_MANAGER.getAsset("./img/cowboy.png"), 27, 740, 95, 160, 0.12, 1, true, false);
	this.stanceR = new Animation(ASSET_MANAGER.getAsset("./img/cowboy.png"), 20, 370, 95, 160, 0.12, 1, true, false);
	
	//Animation of first and second bullet facing right. 
	this.bullet = new Animation(ASSET_MANAGER.getAsset("./img/bullet.png"), 15, 240, 61.75, 70, 0.12, 7, true, false);
	this.bullet2 = new Animation(ASSET_MANAGER.getAsset("./img/bullet.png"), 15, 240, 61.75, 70, 0.12, 7, true, false);
	//Animation of first and second bullet facing left.
	this.bulletL = new Animation(ASSET_MANAGER.getAsset("./img/bullet.png"), 5, 0, 61.75, 70, 0.12, 7, true, false);
	this.bullet2L = new Animation(ASSET_MANAGER.getAsset("./img/bullet.png"), 5, 0, 61.75, 70, 0.12, 7, true, false);


	this.game = game
	
	this.left = false;
	this.right = false;
	
	this.rightX = x
	this.leftX = x - 100
	
	this.bx = x + 120;	//Bullet location
	this.by = y - 15;
	
	this.ax = this.bx	//X-Coordinate of the first bullets attack box
	this.ay = this.by	//Y-Coordinate of the first bullets attack box
	this.ax2 = this.bx	//X-Coordinate of the second bullets attack box
	this.ay2 = this.by	//Y-Coordinate of the second bullets attack box
	this.length = 50	//Length of the attack box
	this.height = 25	//Height of the attack box
	
	this.bx2 = x + 120;	//Bullet2 location
	this.by2 = y - 15;
	
	this.vx = 0;	//Velocity
	this.vy = 0;
	
	this.vx2 = 0	//Velocity2
	this.vy2 = 0;
	
	this.bStart = false;	//When each bullet can be fired.
	this.b2Start = false;
	
	this.bleft = false;		//Which direction that bullet will face.
	this.bright = false
	
	this.speed = 6
	this.scale = 64
	//this.type = type
	
	this.start = x
	this.x = x;
	this.y = y;
	
	this.boundingbox = new BoundingBox(this.x, this.y, 300, 100, "Purple"); //For testing detection purposes
	this.bound2 = new BoundingBox(this.x, this.y, 300, 100, "Purple"); //For testing detection purposes

	this.shoot = false;			//To determine when it can take action against the play through detection
	this.fire = false			//To determine when it can fire a shot at the player.
	this.defaultLeft = false
	this.defaultRight = false
	this.defaultTest = true
	this.count = 0;
	this.accel = 0;
	this.distance = 0;
	this.distance2 = 0;
	
	Entity.call(this, game, this.x , this.y)
}
Range.prototype = new Entity();
Range.prototype.constructor = Range;

Range.prototype.update= function() {
	var cat = this.game.cat
	if(this.left){	//Draws both bounding boxes of each bullet when the bullet is traveling to the left
		this.ax = this.bx		
		this.ay = this.by + 20
		this.ax2 = this.bx2		
		this.ay2 = this.by2 + 20
		this.bound2 = new BoundingBox(this.ax2, this.ay2, this.length, this.height, "Green"); //For testing detection purposes
		this.boundingbox = new BoundingBox(this.ax, this.ay, this.length, this.height, "Red"); //For testing detection purposes
	} else {//Draws both bounding boxes of each bullet when the bullet is traveling to the right
		this.ax = this.bx + 10		
		this.ay = this.by + 35
		this.ax2 = this.bx2	+ 10	
		this.ay2 = this.by2 + 35
		this.bound2 = new BoundingBox(this.ax2, this.ay2, this.length, this.height, "Green"); //For testing detection purposes
		this.boundingbox = new BoundingBox(this.ax, this.ay, this.length, this.height, "Green"); //For testing detection purposes
	}
	
	if (this.game.cat.x >= this.x - 500 && this.game.cat.x <= this.x + 500) {
		this.shoot = true
		
	} else {
		this.shoot = false
	}
	if(this.game.cat.x < this.x){
		this.left = true;
		this.right = false;
	} else {
		this.left = false;
		this.right = true;
	}
	
	if(this.count === 0 && this.shoot){
		this.defaultTest = false
		this.defaultLeft = false
	    this.defaultRight = false
	    this.fire = true
		this.readyL.elapsedTime = 0
		this.ready.elapsedTime = 0
				
		if(this.left){
	    	this.bx = this.x - 120
	    	this.bleft = true
	    	this.bright = false
	    } else {
	    	this.bx = this.x + 120;
	    	this.bleft = false
	    	this.bright = true
	    }
		if(this.right){
	    	var tx = cat.x 	+ 65//Target Location
			var ty = cat.y - 40
	    } else {
	    	var tx = cat.x 	+ 65//Target Location
			var ty = cat.y - 50
	    }
		var dx = tx - this.bx; //Distance between the x and y axis
	    var dy = ty - this.by;
	    this.vx = dx //Velocity Calculated
	    this.vy = dy
	    this.distance = Math.sqrt(dx * dx + dy * dy); //Total Distance Calculated
	    
	    this.bStart = true
	}
	
	this.count++
	if(this.count === 50 && this.shoot){
	    this.defaultLeft = false
	    this.defaultRight = false
	    this.fire = true
		this.ready.elapsedTime = 0
		this.readyL.elapsedTime = 0
		if(this.left){
		    this.bx2 = this.x - 120
		  } else {
		    this.bx2 = this.x + 120;
		}
	    if(this.right){
	    	var tx = cat.x 	+ 65//Target Location
			var ty = cat.y - 40
	    } else {
	    	var tx = cat.x 	+ 65//Target Location
			var ty = cat.y - 50
	    }
		
		var dx = tx - this.bx2; //Distance between the x and y axis
	    var dy = ty - this.by2;
	    this.vx2 = dx //Velocity Calculated
	    this.vy2 = dy
	    this.distance2 = Math.sqrt(dx * dx + dy * dy); //Total Distance Calculated
	   
		this.b2Start = true
	}
	if(this.ready.isDone() || this.readyL.isDone()){
		if(this.left){
		    this.defaultLeft = true
		    this.defaultRight = false
		    this.fire = false
		  } else {
		    this.defaultRight = true
		    this.defaultLeft = false
		    this.fire = false
		}
	}
	if(this.bStart){
		this.bx += this.vx/this.distance * this.speed  //The constant is a scalar to determine speed of the bullet.
		this.by += this.vy/this.distance * this.speed
		
	}
	if(this.b2Start){
		this.bx2 += this.vx2/this.distance2 * this.speed	//The constant is a scalar to determine speed of the bullet.
		this.by2 += this.vy2/this.distance2 * this.speed
	}
	

	if(this.count === 100){
		this.bx = this.x + 120;	//Bullet location
		this.by = this.y - 15;
		this.bStart = false
	}
	if(this.count === 150){
		this.bx2 = this.x + 120;	//Bullet location
		this.by2 = this.y - 15;
		this.count = 0;
		this.b2Start = false
	}
	if(!this.bStart && !this.bright ){
		this.ax = 1000
		this.ay = 1000
	} else if(!this.bleft && !this.bStart){
		this.ax = 1000
		this.ay = 1000
	}
	if(!this.b2Start && !this.bright ){
		this.ax2 = 1000
		this.ay2 = 1000
	} else if(!this.bleft && !this.b2Start){
		this.ax2 = 1000
		this.ay2 = 1000
	}
	this.bound2 = new BoundingBox(this.ax2, this.ay2, this.length, this.height, "Green"); //For testing detection purposes
	this.boundingbox = new BoundingBox(this.ax, this.ay, this.length, this.height, "Red"); //For testing detection purposes
	Entity.prototype.update.call(this);	
}
    

Range.prototype.draw = function (ctx) {

	if(this.left && this.fire ){
		this.readyL.drawFrame(this.game.clockTick, ctx, this.leftX - this.game.camera.x, this.y)
	} 
	if(this.right && this.fire ){
		this.ready.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y)
	} 
	if(this.defaultRight) {
		this.stanceR.drawFrame(this.game.clockTick, ctx, this.rightX - this.game.camera.x, this.y)
	}
	if(this.defaultLeft || this.defaultTest){
		this.stance.drawFrame(this.game.clockTick, ctx, this.rightX - this.game.camera.x, this.y)
	}
	
	if(this.bStart && this.bright ){
		
		this.bullet.drawFrame(this.game.clockTick, ctx, this.bx - this.game.camera.x, this.by)
	} else if(this.bleft && this.bStart) {
		
		this.bulletL.drawFrame(this.game.clockTick, ctx, this.bx - this.game.camera.x, this.by)
	}
	if(this.b2Start && this.bright){
		
	   
		this.bullet2.drawFrame(this.game.clockTick, ctx, this.bx2 - this.game.camera.x, this.by2);
	} else if (this.bleft && this.b2Start){
		
	   
		this.bullet2L.drawFrame(this.game.clockTick, ctx, this.bx2 - this.game.camera.x, this.by2);
	}
	//For testing the attack box of both bullets
	ctx.strokeStyle = this.bound2.color;
    ctx.strokeRect(this.bound2.x - this.game.camera.x, this.bound2.y, this.bound2.width, this.bound2.height);
	ctx.strokeStyle = this.boundingbox.color;
	
    ctx.strokeRect(this.boundingbox.x - this.game.camera.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
   
	
}
function distance(a, bx, by) {
    var dx = a.x - bx;
    var dy = a.y - by;
    return Math.sqrt(dx * dx + dy * dy);
}