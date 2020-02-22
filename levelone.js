/**
 * This is a file dictating where all the elements for the first level will go.
 * the purpose of this file is to have things be spread out. The level is split 
 * into 128 x 128 tileset blocks.
 */

function getLevelOneEnts(gameEngine) {
	var lOneEnts = [];
	
	// TILE PARAMATERS: GAME, ASSET, FRAMEX, FRAMEY, X, Y, POSX, POSY, WIDTH, HEIGHT, FRAMEWIDTH, FRAMEHEIGHT,
	// OBJECT. The object will have two fields, allDir means that it has to push out in all directions (the
	// cat cannot walk through at all), and bottom which means the cat can or cannot jump above it.
	
	// A typical for loop to put lots of platforms at once. This one
	// places multiple blocks stacked on top of each other.
	for (var i = -4; i <= 4; i++) {
		// A tile pushes a cat out in all directions
		var tile = new Tile(gameEngine, "./img/placeholder_tile.png", 0, 0, 
							-128, i * 128, -128, i * 128, 
							128, 128, 128, 128, {allDir:true, bottom:true})
		lOneEnts.push({type:"Platform", ent:tile});
	}
	
	// This is saying from block 0 to block 20, place a ground tile
	for (var i = 0; i < 20; i++) {
		var platform = new Tile(gameEngine, "./img/ground.png", 0, 0,
									i * 128, 768 - 128, i * 128, 768 - 128, 
									128, 128, 128, 128, {allDir:true, bottom:true})
		lOneEnts.push({type:"Platform", ent:platform})
	}
	// From block 20 to 22, add these things. The rest of the for loops are handled similarly.
	for (var i = 20; i < 22; i++) {
		var bridge = new Tile(gameEngine, "./img/bridge.png", 0, 0, 
									i * 128, 640, i * 128, 640,
									128, 128, 128, 128, {allDir:true, bottom:true});
		var water = new Platform(gameEngine, i * 128, 704, 64, 64, "Red");
		var water2 = new Platform(gameEngine, i * 128 + 64, 704, 64, 64, "Red");
		lOneEnts.push({type:"Platform", ent:bridge});
		lOneEnts.push({type:"Platform", ent:water});
		lOneEnts.push({type:"Platform", ent:water2});
	}
	for (var i = 22; i < 28; i++) {
		var platform = new Tile(gameEngine, "./img/ground.png", 0, 0,
									i * 128, 768 - 128, i * 128, 768 - 128, 
									128, 128, 128, 128, {allDir:true, bottom:true})
		lOneEnts.push({type:"Platform", ent:platform})
	}
	for (var i = 28; i < 30; i++) {
		var platform = new Platform(gameEngine, i * 128, 704, 64, 64, "Red"); 
		var water2 = new Platform(gameEngine, i * 128 + 64, 704, 64, 64, "Red");
		lOneEnts.push({type:"Platform", ent:platform})
		lOneEnts.push({type:"Platform", ent:water2})
	}
	for (var i = 30; i < 36; i++) {
		var platform = new Tile(gameEngine, "./img/ground.png", 0, 0,
									i * 128, 640, i * 128, 640, 
									128, 128, 128, 128, {allDir:true, bottom:true})
		lOneEnts.push({type:"Platform", ent:platform})
	}
	for (var i = 36; i < 38; i++) {
		var platform = new Platform(gameEngine, i * 128, 704, 64, 64, "Red"); 
		var water2 = new Platform(gameEngine, i * 128 + 64, 704, 64, 64, "Red");
		lOneEnts.push({type:"Platform", ent:platform})
		lOneEnts.push({type:"Platform", ent:water2})
	}
	for (var i = 38; i < 44; i++) {
		var platform = new Tile(gameEngine, "./img/ground.png", 0, 0,
									i * 128, 640, i * 128, 640, 
									128, 128, 128, 128, {allDir:true, bottom:true})
		lOneEnts.push({type:"Platform", ent:platform})
	}
	for (var i = 44; i < 46; i++) {
		var platform = new Platform(gameEngine, i * 128, 704, 64, 64, "Red"); 
		var platform2 = new Platform(gameEngine, i * 128 + 64, 704, 64, 64, "Red"); 
		lOneEnts.push({type:"Platform", ent:platform})
		lOneEnts.push({type:"Platform", ent:platform2})
	}
	for (var i = 46; i < 52; i++) {
		var platform = new Tile(gameEngine, "./img/ground.png", 0, 0,
									i * 128, 640, i * 128, 640, 
									128, 128, 128, 128, {allDir:true, bottom:true})
		lOneEnts.push({type:"Platform", ent:platform})
	}
	
	for (var i = 52; i < 55; i++) {
		var platform = new Platform(gameEngine, i * 128, 704, 64, 64, "Red"); 
		var platform2 = new Platform(gameEngine, i * 128 + 64, 704, 64, 64, "Red"); 
		lOneEnts.push({type:"Platform", ent:platform})
		lOneEnts.push({type:"Platform", ent:platform2})
	}
	
	for (var i = 55; i < 75; i++) {
		var platform = new Tile(gameEngine, "./img/ground.png", 0, 0,
									i * 128, 640, i * 128, 640, 
									128, 128, 128, 128, {allDir:true, bottom:true})
		lOneEnts.push({type:"Platform", ent:platform})
	}
	
	for (var i = 75; i < 77; i++) {
		var platform = new Platform(gameEngine, i * 128, 704, 64, 64, "Red"); 
		var platform2 = new Platform(gameEngine, i * 128 + 64, 704, 64, 64, "Red"); 
		lOneEnts.push({type:"Platform", ent:platform})
		lOneEnts.push({type:"Platform", ent:platform2})
	}
	
	lOneEnts.push({type:"Platform", ent:new Tile(gameEngine, "./img/ground.png", 0, 0,
									i * 128, 640, i * 128, 640, 
									128, 128, 128, 128, {allDir:true, bottom:true})})
									
	for (var i = 78; i < 80; i++) {
		var platform = new Platform(gameEngine, i * 128, 704, 64, 64, "Red"); 
		var platform2 = new Platform(gameEngine, i * 128 + 64, 704, 64, 64, "Red"); 
		lOneEnts.push({type:"Platform", ent:platform})
		lOneEnts.push({type:"Platform", ent:platform2})
	}
	
	for (var i = 80; i < 100; i++) {
		var platform = new Tile(gameEngine, "./img/ground.png", 0, 0,
									i * 128, 640, i * 128, 640, 
									128, 128, 128, 128, {allDir:true, bottom:true})
		lOneEnts.push({type:"Platform", ent:platform})
	}
	
	// The cat can walk through the buildings, so both parameters on the object can be
	// false.
	for (var i = 1; i < 3; i++) {
		var building_blk = new Tile(gameEngine, "./img/building.png", 0, 0,
									128 * i, 640 - 128, 128 * i, 640 - 128,
									128, 128, 128, 128, {allDir:false, bottom:false});
		var building_blk2 = new Tile(gameEngine, "./img/building.png", 0, 0,
									128 * i, 640 - 128 * 2, 128 * i, 640 - 128 * 2,
									128, 128, 128, 128, {allDir:false, bottom:false});
		var building_blk3 = new Tile(gameEngine, "./img/building.png", 0, 0,
									128 * i, 640 - 128 * 3, 128 * i, 640 - 128 * 3,
									128, 128, 128, 128, {allDir:false, bottom:false});
		var building_blk4 = new Tile(gameEngine, "./img/building.png", 0, 0,
									128 * i, 640 - 128 * 4, 128 * i, 640 - 128 * 4,
									128, 128, 128, 128, {allDir:false, bottom:false});
		lOneEnts.push({type:"Other", ent:building_blk});
		lOneEnts.push({type:"Other", ent:building_blk2});
		lOneEnts.push({type:"Other", ent:building_blk3});
		lOneEnts.push({type:"Other", ent:building_blk4});
	}
	
	for (var i = 61; i < 66; i++) {
		var building_blk = new Tile(gameEngine, "./img/building.png", 0, 0,
									128 * i, 640 - 128, 128 * i, 640 - 128,
									128, 128, 128, 128, {allDir:false, bottom:false});
		var building_blk2 = new Tile(gameEngine, "./img/building.png", 0, 0,
									128 * i, 640 - 128 * 2, 128 * i, 640 - 128 * 2,
									128, 128, 128, 128, {allDir:false, bottom:false});
		var building_blk3 = new Tile(gameEngine, "./img/building.png", 0, 0,
									128 * i, 640 - 128 * 3, 128 * i, 640 - 128 * 3,
									128, 128, 128, 128, {allDir:false, bottom:false});
		var building_blk4 = new Tile(gameEngine, "./img/building.png", 0, 0,
									128 * i, 640 - 128 * 4, 128 * i, 640 - 128 * 4,
									128, 128, 128, 128, {allDir:false, bottom:false});
		lOneEnts.push({type:"Other", ent:building_blk});
		lOneEnts.push({type:"Other", ent:building_blk2});
		lOneEnts.push({type:"Other", ent:building_blk3});
		lOneEnts.push({type:"Other", ent:building_blk4});
	}
	
	for (var i = 47; i < 51; i++) {
		var building_blk = new Tile(gameEngine, "./img/building.png", 0, 0,
									128 * i, 640 - 128, 128 * i, 640 - 128,
									128, 128, 128, 128, {allDir:false, bottom:false});
		var building_blk2 = new Tile(gameEngine, "./img/building.png", 0, 0,
									128 * i, 640 - 128 * 2, 128 * i, 640 - 128 * 2,
									128, 128, 128, 128, {allDir:false, bottom:false});
		var building_blk3 = new Tile(gameEngine, "./img/building.png", 0, 0,
									128 * i, 640 - 128 * 3, 128 * i, 640 - 128 * 3,
									128, 128, 128, 128, {allDir:false, bottom:false});
		var building_blk4 = new Tile(gameEngine, "./img/building.png", 0, 0,
									128 * i, 640 - 128 * 4, 128 * i, 640 - 128 * 4,
									128, 128, 128, 128, {allDir:false, bottom:false});
		var building_blk5 = new Tile(gameEngine, "./img/building.png", 0, 0,
									128 * i, 640 - 128 * 5, 128 * i, 640 - 128 * 5,
									128, 128, 128, 128, {allDir:false, bottom:false});							
		lOneEnts.push({type:"Other", ent:building_blk});
		lOneEnts.push({type:"Other", ent:building_blk2});
		lOneEnts.push({type:"Other", ent:building_blk3});
		lOneEnts.push({type:"Other", ent:building_blk4});
		lOneEnts.push({type:"Other", ent:building_blk5});
	}
	
	for (var i = 82; i < 89; i++) {
		var building_blk = new Tile(gameEngine, "./img/building.png", 0, 0,
									128 * i, 640 - 128, 128 * i, 640 - 128,
									128, 128, 128, 128, {allDir:false, bottom:false});
		var building_blk2 = new Tile(gameEngine, "./img/building.png", 0, 0,
									128 * i, 640 - 128 * 2, 128 * i, 640 - 128 * 2,
									128, 128, 128, 128, {allDir:false, bottom:false});
		var building_blk3 = new Tile(gameEngine, "./img/building.png", 0, 0,
									128 * i, 640 - 128 * 3, 128 * i, 640 - 128 * 3,
									128, 128, 128, 128, {allDir:false, bottom:false});
		var building_blk4 = new Tile(gameEngine, "./img/building.png", 0, 0,
									128 * i, 640 - 128 * 4, 128 * i, 640 - 128 * 4,
									128, 128, 128, 128, {allDir:false, bottom:false});
		lOneEnts.push({type:"Other", ent:building_blk});
		lOneEnts.push({type:"Other", ent:building_blk2});
		lOneEnts.push({type:"Other", ent:building_blk3});
		lOneEnts.push({type:"Other", ent:building_blk4});
	}
	
	// Boxes are placed sporadically, so there isn't a convenient way to put them in a for loop
	var box = new Tile(gameEngine, "./img/box.png", 0, 0,
										128 * 14, 640 - 128, 128 * 14, 640 - 128,
										128, 128, 128, 128, {allDir:true, bottom:true});
	var box2 = new Tile(gameEngine, "./img/box.png", 0, 0,
										128 * 18, 640 - 128, 128 * 18, 640 - 128,
										128, 128, 128, 128, {allDir:true, bottom:true});
	var box3 = new Tile(gameEngine, "./img/box.png", 0, 0, 
										128 * 23, 640 - 128, 128 * 23, 640 - 128, 
										128, 128, 128, 128, {allDir:true, bottom:true});
	var box4 = new Tile(gameEngine, "./img/box.png", 0, 0,
										128 * 23, 640 - 256, 128 * 23, 640 - 256,
										128, 128, 128, 128, {allDir:true, bottom:true});
	var box5 = new Tile(gameEngine, "./img/box.png", 0, 0, 
										128 * 77, 640 - 128, 128 * 77, 640 - 128,
										128, 128, 128, 128, {allDir:true, bottom:true});
	var box6 = new Tile(gameEngine, "./img/box.png", 0, 0, 
										128 * 80, 640 - 128, 128 * 80, 640 - 128, 
										128, 128, 128, 128, {allDir:true, bottom:true});
	var box7 = new Tile(gameEngine, "./img/box.png", 0, 0, 
										128 * 31, 640 - 128, 128 * 31, 640 - 128, 
										128, 128, 128, 128, {allDir:true, bottom:true});
	var box8 = new Tile(gameEngine, "./img/box.png", 0, 0, 
										128 * 32, 640 - 128, 128 * 32, 640 - 128, 
										128, 128, 128, 128, {allDir:true, bottom:true});
	var box9 = new Tile(gameEngine, "./img/box.png", 0, 0, 
										128 * 32, 640 - 256, 128 * 32, 640 - 256, 
										128, 128, 128, 128, {allDir:true, bottom:true});
	var box10 = new Tile(gameEngine, "./img/box.png", 0, 0, 
										128 * 50, 640 - 128, 128 * 50, 640 - 128, 
										128, 128, 128, 128, {allDir:true, bottom:true});
	var box11 = new Tile(gameEngine, "./img/box.png", 0, 0, 
										128 * 51, 640 - 128, 128 * 51, 640 - 128, 
										128, 128, 128, 128, {allDir:true, bottom:true});									
	var box12 = new Tile(gameEngine, "./img/box.png", 0, 0, 
										128 * 51, 640 - 256, 128 * 51, 640 - 256, 
										128, 128, 128, 128, {allDir:true, bottom:true});	
	var box13 = new Tile(gameEngine, "./img/box.png", 0, 0, 
										128 * 70, 640 - 128, 128 * 70, 640 - 128, 
										128, 128, 128, 128, {allDir:true, bottom:true});									
	var box14 = new Tile(gameEngine, "./img/box.png", 0, 0, 
										128 * 70, 640 - 256, 128 * 70, 640 - 256, 
										128, 128, 128, 128, {allDir:true, bottom:true});
	var box15 = new Tile(gameEngine, "./img/box.png", 0, 0, 
										128 * 71, 640 - 128, 128 * 71, 640 - 128, 
										128, 128, 128, 128, {allDir:true, bottom:true});	
	var box16 = new Tile(gameEngine, "./img/box.png", 0, 0, 
										128 * 90, 640 - 128, 128 * 90, 640 - 128, 
										128, 128, 128, 128, {allDir:true, bottom:true});	
										
	lOneEnts.push({type:"Platform", ent:box});
	lOneEnts.push({type:"Platform", ent:box2});
	lOneEnts.push({type:"Platform", ent:box3});
	lOneEnts.push({type:"Platform", ent:box4});
	lOneEnts.push({type:"Platform", ent:box5});
	lOneEnts.push({type:"Platform", ent:box6});
	lOneEnts.push({type:"Platform", ent:box7});
	lOneEnts.push({type:"Platform", ent:box8});
	lOneEnts.push({type:"Platform", ent:box9});
	lOneEnts.push({type:"Platform", ent:box10});
	lOneEnts.push({type:"Platform", ent:box11});
	lOneEnts.push({type:"Platform", ent:box12});
	lOneEnts.push({type:"Platform", ent:box13});
	lOneEnts.push({type:"Platform", ent:box14});
	lOneEnts.push({type:"Platform", ent:box15});
	lOneEnts.push({type:"Platform", ent:box16});
	
	// The cat can jump above the dump, this parameter helps prevent it from dying like before
	var dump = new Tile(gameEngine, "./img/dumpster.png", 0, 0, 
						64 * 15, 640 - 192, 64 * 15, 640 - 192, 
						384, 60,384, 192, {allDir:true, bottom:false});
	lOneEnts.push({type:"Platform", ent:dump});
	
	// The cat can walk through a vertical crane section
	for (var i = 1; i < 5; i++) {
		var craneV = new Tile(gameEngine, "./img/crane_piece_v.png", 0, 0,
										128 * 39, 128 * i, 128 * 39, 128 * i,
										129, 128, 128, 128, {allDir:false, bottom:false});
		lOneEnts.push({type:"Platform", ent:craneV});
	}
	for (var i = 35; i < 41; i++) {
		var crane= new Tile(gameEngine, "./img/crane_piece_h.png", 0, 0,
										128 * i, 640 - (128 * 4), 128 * i, 640 - (128 * 4),
										128, 128, 128, 128, {allDir:true, bottom:true})
		lOneEnts.push({type:"Platform", ent:crane})
	}

	for (var i = 58; i < 70; i++) {
		if (i < 62 || i > 64) {
		var fence = new Tile(gameEngine, "./img/fence.png", 0, 0,
							128 * i, 640 - 128, 128 * i, 640 - 128,
							128, 4, 128, 128, {allDir:true, bottom:false})
		lOneEnts.push({type:"Platform", ent:fence});
		}
							
	}


	// This part adds the checkpoint to block 42
	var checkpoint = new Checkpoint(gameEngine, 128 * 42, 640 - 128);
	lOneEnts.push({type:"Other", ent:checkpoint});
	
	// Lamps are placed throughout the stage 
	var lamp = new Lamp(gameEngine, 128 * 5, 640 - 64 * 6);
	var lamp2 = new Lamp(gameEngine, 128 * 12, 640 - 64 * 6);
	lOneEnts.push({type:"Other", ent:new Lamp(gameEngine, 128 * 56, 640 - 128 * 3)})
	lOneEnts.push({type:"Other", ent:new Lamp(gameEngine, 128 * 63, 640 - 128 * 3)})
	lOneEnts.push({type:"Other", ent:new Lamp(gameEngine, 128 * 92, 640 - 128 * 3)})
	lOneEnts.push({type:"Other", ent:new Lamp(gameEngine, 128 * 73, 640 - 128 * 3)})
	lOneEnts.push({type:"Other", ent:new Lamp(gameEngine, 128 * 94, 640 - 128 * 3)})
	lOneEnts.push({type:"Other", ent:new Lamp(gameEngine, 128 * 96, 640 - 128 * 3)})
	lOneEnts.push({type:"Other", ent:new Lamp(gameEngine, 128 * 98, 640 - 128 * 3)})
	lOneEnts.push({type:"Other", ent:lamp})
	lOneEnts.push({type:"Other", ent:lamp2})
	
	// Idle dogs and rats are placed throughout the stage
	lOneEnts.push({type:"Enemy", ent:new EnemyIdle(gameEngine, 128 * 11, 768 - 128 - 100)})
	lOneEnts.push({type:"Enemy", ent:new EnemyIdle(gameEngine, 128 * 26, 768 - 128 - 100)})
	lOneEnts.push({type:"Enemy", ent:new EnemyIdle(gameEngine, 128 * 39, 768 - 128 - 100)})
	lOneEnts.push({type:"Enemy", ent:new EnemyIdle(gameEngine, 128 * 47, 768 - 128 - 100)})
	lOneEnts.push({type:"Enemy", ent:new EnemyIdle(gameEngine, 128 * 86, 768 - 128 - 100)})
	lOneEnts.push({type:"Enemy", ent:new EnemyIdle(gameEngine, 128 * 88, 768 - 128 - 100)})
	lOneEnts.push({type:"Enemy", ent:new EnemyIdle(gameEngine, 128 * 47, 768 - 128 - 100)})
	lOneEnts.push({type:"Enemy", ent:new EnemyIdle(gameEngine, 128 * 67, 768 - 128 - 95)})
	
	
	lOneEnts.push({type:"Enemy", ent:new EnemyPace(gameEngine, 128 * 8, 768 - 128 - 95)})
	lOneEnts.push({type:"Enemy", ent:new Bird(gameEngine, 128 * 4, 128)})
	lOneEnts.push({type:"Enemy", ent:new Range(gameEngine, 128 * 6, 640 -150)})
	
	lOneEnts.push({type:"Enemy", ent:new Rat(gameEngine, 64 * 33, 640 - 64)})
	lOneEnts.push({type:"Enemy", ent:new Rat(gameEngine, 128 * 60, 640 - 64)})
	lOneEnts.push({type:"Enemy", ent:new Rat(gameEngine, 128 * 83, 640 - 64)})
	var hearts = new Health(gameEngine);
	lOneEnts.push({type:"Other", ent:hearts});
	lOneEnts.push({type:"Other", ent:gameEngine.cat});
	return lOneEnts;
}