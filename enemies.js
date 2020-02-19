function Bird(game, x, y, type) {	
	this.bird = new Animation(ASSET_MANAGER.getAsset("./img/bird.png"), 35, 35, 185,70, 0.1, 4, true, false)
	this.reverseBird = new Animation(ASSET_MANAGER.getAsset("./img/bird.png"), 30, 600, 185,70, 0.1, 4, true, false)
	this.attackBird = new Animation(ASSET_MANAGER.getAsset("./img/bird.png"), 30, 400, 185,100, 0.1, 1, true, false)
	this.reverseAttack = new Animation(ASSET_MANAGER.getAsset("./img/bird.png"), 200, 770, 185,100, 0.1, 1, true, false)
	
	this.tx = 0; //Target Location
	this.ty = 0; 
	
	this.vx = 0; //Velocity
	this.vy = 0;
	
	this.distance = 0;
	this.defaultHeight = y - 100
	this.type = "Fly"
	this.length = 50;
	this.height = 100
	this.start = x
	this.x = x;
	this.y = y - 150;
	this.type = type
	this.count = 0;  	//To determine how long the bird will go in an attack dive
	this.count2 = 0;	//To determine how long the bird will retreat upwards
	this.leftCheck = true;	//To determine when to go left or right.
	this.rightCheck = false
	this.boundingbox = new BoundingBox(this.x - 150, this.y, 300, 100, "Purple"); //For testing detection
	this.lastX = this.x	
	this.lastY = this.y
	this.leftAttack = false;	
	this.rightAttack = false;
	this.leftRetreat = false;
	this.rightRetreat = false;
	Entity.call(this, game, x , y )
}
Bird.prototype = new Entity();
Bird.prototype.constructor = Bird;

Bird.prototype.update= function() {
	this.lastX = this.x
	this.lastY = this.y
	this.boundingbox = new BoundingBox(this.x - 150, this.y, 300, 500, "Purple");
	/**
	 * This will detect when it should switch from the default passive mode to attack mode.
	 * Fly mode will have the bird fly back and forth from one fixed position to another.
	 * Attack mode will be permenant when the bird detects the cat and attacks it.
	 */
	if (this.game.cat.x >= this.x - 100 && this.game.cat.x <= this.x + 100) {
		
		this.boundingbox.color = "Red"
		this.type = "Attack"
		
	} 
	var cat = this.game.cat
	if(this.count === 0){	//This will determine where the cat is located at and attack at that position.
		this.tx = cat.x +50
		this.ty = cat.y +50
		var dx = this.tx - this.x;
	    var dy = this.ty - this.y;
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
		if(this.y < 0){
			this.leftCheck = true;
			this.rightCheck = false
			this.count = 0
		}
		if(this.y > 500){
			this.leftCheck = false;
			this.rightCheck = true
			this.count = 100
		}
		if(this.leftCheck){
			this.x += this.vx/this.distance * 6
			this.y += this.vy/this.distance * 6
		}
		if(this.rightCheck){
			this.y -= this.vy/this.distance * 6
			this.x += this.vx/this.distance * 6
		}
		//Check if the bird is attacking at a downward left angle.
		//Adjust animation to left attack
		if(this.lastX > this.x && this.lastY < this.y  ){
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
		if(this.lastX > this.x && this.lastY > this.y  ){
			this.leftAttack = false;
			this.rightAttack = false
			this.leftRetreat = true
			this.rightRetreat = false
		}
		//Check if the bird is attacking at a upward right angle.
		//Adjust animation to right movement
		if(this.lastX < this.x && this.lastY > this.y  ){
			this.leftAttack = false;
			this.rightAttack = false
			this.leftRetreat = false
			this.rightRetreat = true
		}
	}
	
}
Bird.prototype.draw = function (ctx) {
	
	if(this.type === "Fly" && this.leftCheck || this.type === "Attack" && this.leftRetreat){
		this.bird.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y)

	} 
	if(this.type === "Fly" && this.rightCheck|| this.type === "Attack" && this.rightRetreat){
		this.reverseBird.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y)

	} 
	if(this.type === "Attack" && this.leftAttack){
		this.attackBird.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y)

	} 
	if(this.type === "Attack" && this.rightAttack){
		this.reverseAttack.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y)
	}
	
	ctx.strokeStyle = this.boundingbox.color;
    ctx.strokeRect(this.boundingbox.x - this.game.camera.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
    Entity.prototype.draw.call(this);
}

function Range(game, x, y, type) {
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
	
	this.type = type
	this.length = 50;
	this.height = 100
	this.start = x
	this.x = x;
	this.y = y;
	
	this.boundingbox = new BoundingBox(this.x, this.y, 300, 100, "Purple"); //For testing detection purposes
	this.shoot = false;			//To determine when it can take action against the play through detection
	this.fire = false			//To determine when it can fire a shot at the player.
	this.defaultLeft = false
	this.defaultRight = false
	
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
	
	if (this.game.cat.x >= this.x - 500 && this.game.cat.x <= this.x + 500) {
		this.boundingbox.color = "Red"
		this.shoot = true
		
	} else {
		this.boundingbox.color = "Purple"
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
		var tx = cat.x +50 	//Target Location
		var ty = cat.y +50
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
		var tx = cat.x +50 	//Target Location
		var ty = cat.y +50
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
		this.bx += this.vx/this.distance * 5  //The constant is a scalar to determine speed of the bullet.
		this.by += this.vy/this.distance * 5
	}
	if(this.b2Start){
		this.bx2 += this.vx2/this.distance2 * 5	//The constant is a scalar to determine speed of the bullet.
		this.by2 += this.vy2/this.distance2 * 5
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
	if(this.defaultLeft){
		this.stance.drawFrame(this.game.clockTick, ctx, this.rightX - this.game.camera.x, this.y)
	}
	//ctx.strokeStyle = this.boundingbox.color;
   // ctx.strokeRect(this.boundingbox.x - this.game.camera.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
	
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
	
	

}

function distance(a, bx, by) {
    var dx = a.x - bx;
    var dy = a.y - by;
    return Math.sqrt(dx * dx + dy * dy);
}
