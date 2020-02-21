MAP_SIZE = 12800;

function Camera(game) {
	Entity.call(this, game, 0, 0);
	this.mapSize = MAP_SIZE;
	this.screenSize = 1280;
	this.myMoveAmount = 0;
}

Camera.prototype = new Entity();
Camera.prototype.constructor = Camera;

Camera.prototype.update = function() {
	playerX = this.game.cat.x;
	//console.log(playerX);
	if (playerX >= this.screenSize / 2 && playerX <= this.mapSize - this.screenSize / 2) {
			this.x = playerX - this.screenSize / 2;
	}
	else if (playerX < this.screenSize / 2){ 
		this.x = 0;
	} else if (playerX >= this.mapSize) {
		this.x = this.mapSize - 800;
	}
}

Camera.prototype.draw = function() {
	
}
