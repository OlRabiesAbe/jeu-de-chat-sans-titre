function Level(game, x, y) {
	this.game = game;
	this.anim = new Animation(ASSET_MANAGER.getAsset("./img/levelText.png"), 0, 0, 176, 64, 1, 1, true, false);
	this.zero = new Animation(ASSET_MANAGER.getAsset("./img/numbers.png"), 13, 7, 40, 50, 1, 1, true, false);
	this.one = new Animation(ASSET_MANAGER.getAsset("./img/numbers.png"), 84, 8, 18, 49, 1, 1, true, false);
	this.two = new Animation(ASSET_MANAGER.getAsset("./img/numbers.png"), 143, 7, 36, 50, 1, 1, true, false);
	this.three = new Animation(ASSET_MANAGER.getAsset("./img/numbers.png"), 206, 7, 38, 51, 1, 1, true, false);
	this.four = new Animation(ASSET_MANAGER.getAsset("./img/numbers.png"), 266, 7, 42, 49, 1, 1, true, false);
	this.five = new Animation(ASSET_MANAGER.getAsset("./img/numbers.png"), 337, 8, 36, 50, 1, 1, true, false);
	this.six = new Animation(ASSET_MANAGER.getAsset("./img/numbers.png"), 398, 7, 37, 50, 1, 1, true, false);
	this.seven = new Animation(ASSET_MANAGER.getAsset("./img/numbers.png"), 467, 9, 34, 49, 1, 1, true, false);
	this.eight = new Animation(ASSET_MANAGER.getAsset("./img/numbers.png"), 528, 9, 37, 51, 1, 1, true, false);
	this.nine = new Animation(ASSET_MANAGER.getAsset("./img/numbers.png"), 593, 8, 37, 50, 1, 1, true, false);
	this.nums = [this.zero, this.one, this.two, this.three, this.four, 
				this.five, this.six, this.seven, this.eight, this.nine];
	Entity.call(this, game, x, y);
}

Level.prototype = new Entity();
Level.prototype.constructor = Level;

Level.prototype.update = function() {
	
}

Level.prototype.draw = function(ctx) {
	this.anim.drawFrame(this.game.clockTick, ctx, this.x, this.y);
	this.nums[CURRENT_LEVEL].drawFrame(this.game.clockTick, ctx, this.x + this.anim.frameWidth + 20, this.y + 7);
}

function Health(game) {
	this.healthy = new Animation(ASSET_MANAGER.getAsset("./img/heart sheet.png"), 0, 0, 48, 48, 1, 1, true, false);
	this.unhealthy = new Animation(ASSET_MANAGER.getAsset("./img/heart sheet.png"), 96, 0, 48, 48, 1, 1, true, false);
	this.danger = new Animation(ASSET_MANAGER.getAsset("./img/heart sheet.png"), 0, 0, 48, 48, 0.05, 3, true, false);
	
	this.hearts = [{health:this.healthy, heart:1}, {health:this.healthy, heart:2}, {health:this.healthy, heart:3}];
	this.hearts.push({health:this.healthy, heart:4})
	this.hearts.push({health:this.healthy, heart:5})
	this.hearts.push({health:this.healthy, heart:6})
	this.hearts.push({health:this.healthy, heart:7})
	this.hearts.push({health:this.healthy, heart:8})
	this.hearts.push({health:this.healthy, heart:9})
	Entity.call(this, game, 0, 0);
	
}

Health.prototype = new Entity();
Health.prototype.constructor = Health;

Health.prototype.update = function() {
	for (var i = 0; i < this.hearts.length; i++) {
		if (this.hearts[i].heart <= HEALTH) {
			this.hearts[i].health = this.healthy;
		} else {
			this.hearts[i].health = this.unhealthy;
		}
	}
	if (HEALTH === 1) {
		this.hearts[0].health = this.danger;
	}
}
Health.prototype.draw = function(ctx) {
	for (var i = 0; i < this.hearts.length; i++) {
		this.hearts[i].health.drawFrame(this.game.clockTick, ctx, this.x + (this.hearts[i].health.frameWidth * i), this.y);
	}
}

function Lives(game, x, y) {
	this.game = game;
	this.zero = new Animation(ASSET_MANAGER.getAsset("./img/numbers.png"), 13, 7, 40, 50, 1, 1, true, false);
	this.one = new Animation(ASSET_MANAGER.getAsset("./img/numbers.png"), 84, 8, 18, 49, 1, 1, true, false);
	this.two = new Animation(ASSET_MANAGER.getAsset("./img/numbers.png"), 143, 7, 36, 50, 1, 1, true, false);
	this.three = new Animation(ASSET_MANAGER.getAsset("./img/numbers.png"), 206, 7, 38, 51, 1, 1, true, false);
	this.four = new Animation(ASSET_MANAGER.getAsset("./img/numbers.png"), 266, 7, 42, 49, 1, 1, true, false);
	this.five = new Animation(ASSET_MANAGER.getAsset("./img/numbers.png"), 337, 8, 36, 50, 1, 1, true, false);
	this.six = new Animation(ASSET_MANAGER.getAsset("./img/numbers.png"), 398, 7, 37, 50, 1, 1, true, false);
	this.seven = new Animation(ASSET_MANAGER.getAsset("./img/numbers.png"), 467, 9, 34, 49, 1, 1, true, false);
	this.eight = new Animation(ASSET_MANAGER.getAsset("./img/numbers.png"), 528, 9, 37, 51, 1, 1, true, false);
	this.nine = new Animation(ASSET_MANAGER.getAsset("./img/numbers.png"), 593, 8, 37, 50, 1, 1, true, false);
	this.nums = [this.zero, this.one, this.two, this.three, this.four, 
				this.five, this.six, this.seven, this.eight, this.nine];
	Entity.call(this, game, x, y);
	this.tens = Math.floor(LIVES / 10);
	this.ones = LIVES % 10;
}
Lives.prototype = new Entity()
Lives.prototype.constructor = Lives;

Lives.prototype.update = function() {
	this.tens = Math.floor(LIVES / 10);
	this.ones = LIVES % 10;
}

Lives.prototype.draw = function(ctx) {
	this.nums[this.tens].drawFrame(this.game.clockTick, ctx, this.x, this.y);
	this.nums[this.ones].drawFrame(this.game.clockTick, ctx, this.x + this.nums[this.tens].frameWidth + 5, this.y);
	
	//this.nums[LIVES].drawFrame(this.game.clockTick, ctx, this.x, this.y);
}	
