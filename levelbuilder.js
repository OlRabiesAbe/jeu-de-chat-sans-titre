function LevelBuilder(str, game, levelID = "") {
	this.level = [];
	
	// left side wall
	for (var i = -4; i <= 4; i++) {
		var tile = new Tile(game, "./img/placeholder_tile.png", 0, 0, 
							-128, i * 128, -128, i * 128, 
							128, 128, 128, 128, {allDir:true, bottom:true})
		this.level.push({type:"Platform", ent:tile});
	}
	
	var row = 0;
	var count = 0;
	var countBuffer = 0;
	for(var i = 0; i < str.length; i++) {
	//Tile(game, img, framex, framey, x, y, posX, posY, width, height, frameW, frameH, allSides)
	//types of entities: Platform, Enemy, Other
		switch(str.charAt(i)) {
			case 'C':
				var tile = new Tile(game, "./img/cage.png", 0, 0, 128 *  (i - count - 1), 128 * (row - 1), 
					128 *  (i - count - 1), 128 * (row - 1), 128, 128, 128, 128, {allDir:false, bottom:false});
				this.level.push({type:"Platform", ent:tile});
				break;
			case 'K':
				var tile = new Tile(game, "./img/cage_dog.png", 0, 0, 128 *  (i - count - 1), 128 * (row - 1), 
					128 *  (i - count - 1), 128 * (row - 1), 128, 128, 128, 128, {allDir:true, bottom:true});
				this.level.push({type:"Platform", ent:tile});
				break;
			case 'X':
				var tile = new Tile(game, "./img/cage_cat.png", 0, 0, 128 *  (i - count - 1), 128 * (row - 1), 
					128 *  (i - count - 1), 128 * (row - 1), 128, 128, 128, 128, {allDir:true, bottom:true});
				this.level.push({type:"Platform", ent:tile});
				break;
			case 'T': // placeholder tile
				var tile = new Tile(game, "./img/placeholder_tile.png", 0, 0, 128 *  (i - count - 1), 128 * (row - 1), 
					128 *  (i - count - 1), 128 * (row - 1), 128, 128, 128, 128, {allDir:true, bottom:true});
				this.level.push({type:"Platform", ent:tile});
				break;
			case 'G': // ground
				var tile = new Tile(game, "./img/" + levelID + "ground.png", 0, 0, 128 *  (i - count - 1), 128 * (row - 1), 
					128 *  (i - count - 1), 128 * (row - 1), 128, 128, 128, 128, {allDir:true, bottom:true});
				this.level.push({type:"Platform", ent:tile});
				break;
			case 'B': // box
				var tile = new Tile(game, "./img/" + levelID + "box.png", 0, 0, 128 *  (i - count - 1), 128 * (row - 1), 
					128 *  (i - count - 1), 128 * (row - 1), 128, 128, 128, 128, {allDir:true, bottom:true});
				this.level.push({type:"Platform", ent:tile});
				break;
			case 'F': // fence
				var tile = new Tile(game, "./img/" + levelID + "fence.png", 0, 0, 128 *  (i - count - 1), 128 * (row - 1), 
					128 *  (i - count - 1), 128 * (row - 1), 128, 128, 128, 128, {allDir:true, bottom:false});
				this.level.push({type:"Platform", ent:tile});
				break;
			case 'D': // dumpster
				var tile = new Tile(game, "./img/" + levelID + "dumpster.png", 0, 0, 128 *  (i - count - 1), 128 * (row - 1), 
					128 *  (i - count - 1), 128 * (row - 1), 128, 128, 128, 128, {allDir:true, bottom:false});
				this.level.push({type:"Platform", ent:tile});
				break;
			case 'S': // building
				var tile = new Tile(game, "./img/" + levelID + "building.png", 0, 0, 128 *  (i - count - 1), 128 * (row - 1), 
					128 *  (i - count - 1), 128 * (row - 1), 128, 128, 128, 128, {allDir:false, bottom:false});
				this.level.push({type:"Platform", ent:tile});
				break;
			case 'I': // crane piece vertical
				var tile = new Tile(game, "./img/" + levelID + "crane_piece_v.png", 0, 0, 128 *  (i - count - 1), 128 * (row - 1), 
					128 *  (i - count - 1), 128 * (row - 1), 128, 128, 128, 128, {allDir:false, bottom:false});
				this.level.push({type:"Platform", ent:tile});
				break;
			case '+': // crane piece horizontal
				var tile = new Tile(game, "./img/" + levelID + "crane_piece_h.png", 0, 0, 128 *  (i - count - 1), 128 * (row - 1), 
					128 *  (i - count - 1), 128 * (row - 1), 128, 128, 128, 128, {allDir:true, bottom:true});
				this.level.push({type:"Platform", ent:tile});
				break;
			case '=': // bridge
				var tile = new Tile(game, "./img/" + levelID + "bridge.png", 0, 0, 128 *  (i - count - 1), 128 * (row - 1), 
					128 *  (i - count - 1), 128 * (row - 1), 128, 128, 128, 128, {allDir:true, bottom:false});
				this.level.push({type:"Platform", ent:tile});
				break;
			case 'W':
				var water0 = new Platform(game, 128 *  (i - count - 1), 128 * (row - 1), 64, 64, "Red");
				var water1 = new Platform(game, 128 *  (i - count - 1) + 64, 128 * (row - 1), 64, 64, "Red");
				var water2 = new Platform(game, 128 *  (i - count - 1), 128 * (row - 1) + 64, 64, 64, "Red");
				var water3 = new Platform(game, 128 *  (i - count - 1) + 64, 128 * (row - 1) + 64, 64, 64, "Red");
				this.level.push({type:"Platform", ent:water0});
				this.level.push({type:"Platform", ent:water1});
				this.level.push({type:"Platform", ent:water2});
				this.level.push({type:"Platform", ent:water3});
				break;
				
			case 'l': // lamp
				var lamp = new Lamp(game, 128 *  (i - count - 1), 128 * (row - 1) - 256);
				this.level.push({type:"Other", ent:lamp});
				break;
			case 'c':  // checkpoint
				var checkpoint = new Checkpoint(game, 128 *  (i - count - 1) + 32, 128 * (row - 1));
				this.level.push({type:"Other", ent:checkpoint});
				break;
				
			case 's': // sitter dog
				this.level.push({type:"Enemy", ent:new EnemyIdle(game, 128 * (i-count) - 64, 128 * (row - 1) + 24)})
				break;
			case 'p': // pacer dog
				this.level.push({type:"Enemy", ent:new EnemyPace(game, 128 * (i-count), 128 * (row - 1) + 24)})
				break
			case 'r': // rat
				this.level.push({type:"Enemy", ent:new Rat(game, 128 *  (i - count - 1), 128 * (row - 1) + 64)})
				break;
			case 'b': // bird
				this.level.push({type:"Enemy", ent:new Bird(game, 128 * (i-count), 128 * (row - 1))})
				break;
			case 'g': // range
				this.level.push({type:"Enemy", ent:new Range(game, 128 * (i-count), 128 * (row - 1))})
				break;
				
			case ';': // newline
				row++;
				count += countBuffer;
				countBuffer = 0;
				
				
			default: break;
		}
		countBuffer++;
	}
	
	this.level.push({type:"Other", ent: new Health(game)});
	this.level.push({type:"Other", ent:game.cat});
}

LevelBuilder.prototype.getLevel = function() {
	return this.level;
}
