/**
 * http://usejsdoc.org/
 */
function getLevelTwoEnts(gameEngine) {
	var lTwoEnts = [];
	
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
		lTwoEnts.push({type:"Platform", ent:tile});
	}
	
	// This is saying from block 0 to block 20, place a ground tile
	for (var i = 0; i < 7; i++) {
		var platform = new Tile(gameEngine, "./img/ground.png", 0, 0,
									i * 128, 768 - 128, i * 128, 768 - 128, 
									128, 128, 128, 128, {allDir:true, bottom:true})
		lTwoEnts.push({type:"Platform", ent:platform})
	}

	for (var i = 0; i < 6; i++) {
		var craneV = new Tile(gameEngine, "./img/crane_piece_v.png", 0, 0,
										128 * 12, 128 * i, 128 * 12, 128 * i,
										129, 128, 128, 128, {allDir:false, bottom:false});
		lTwoEnts.push({type:"Platform", ent:craneV});
	}
	var box = new Tile(gameEngine, "./img/box.png", 0, 0,
			128 * 13, 128 * 4.8, 128 * 13, 128 * 4.8,
			128, 128, 128, 128, {allDir:true, bottom:true});
	lTwoEnts.push({type:"Platform", ent:box});
	var box2 = new Tile(gameEngine, "./img/box.png", 0, 0,
			128 * 14, 128 * 4.8, 128 * 14, 128 * 4.8,
			128, 128, 128, 128, {allDir:true, bottom:true});
	lTwoEnts.push({type:"Platform", ent:box2});
	for (var i = 7; i < 17; i++) {
		
		var water = new Platform(gameEngine, i * 128, 704, 64, 64, "Red");
		var water2 = new Platform(gameEngine, i * 128 + 64, 704, 64, 64, "Red");
		lTwoEnts.push({type:"Platform", ent:water2});
		lTwoEnts.push({type:"Platform", ent:water});
	}
	
	
	var box = new Tile(gameEngine, "./img/box.png", 0, 0,
			128 * 5, 640 - 128, 128 * 5, 640 - 128,
			128, 128, 128, 128, {allDir:true, bottom:true});
	lTwoEnts.push({type:"Platform", ent:box});
	var box2 = new Tile(gameEngine, "./img/box.png", 0, 0,
			128 * 6, 640 - 128, 128 * 6, 640 - 128,
			128, 128, 128, 128, {allDir:true, bottom:true});
	lTwoEnts.push({type:"Platform", ent:box2});
	
	var box3 = new Tile(gameEngine, "./img/box.png", 0, 0,
			128 * 8, 250 - 128, 128 * 8, 250 - 128,
			128, 128, 128, 128, {allDir:true, bottom:true}, true, true, 250 - 128, 128 * 4.5);
	lTwoEnts.push({type:"Platform", ent:box3});
	
	var box4 = new Tile(gameEngine, "./img/box.png", 0, 0,
			128 * 9, 250 - 128, 128 * 9, 250 - 128,
			128, 128, 128, 128, {allDir:true, bottom:true}, true, true, 250 - 128, 128 * 4.5);
	lTwoEnts.push({type:"Platform", ent:box4});
	var box5 = new Tile(gameEngine, "./img/box.png", 0, 0,
			128 * 10, 250 - 128, 128 * 10, 250 - 128,
			128, 128, 128, 128, {allDir:true, bottom:true}, true, true, 250 - 128, 128 * 4.5);
	lTwoEnts.push({type:"Platform", ent:box5});
	
	
	
	var box6 = new Tile(gameEngine, "./img/box.png", 0, 0,
			128 * 15, (128 * 2), 128 * 15, (128 * 2),
			128, 128, 128, 128, {allDir:true, bottom:true}, true, true, 250 - 128, 128 * 4.2);
	lTwoEnts.push({type:"Platform", ent:box6});
	
	
	for (var i = 17; i < 38; i++) {
		var platform = new Tile(gameEngine, "./img/ground.png", 0, 0,
									i * 128, 768 - 128, i * 128, 768 - 128, 
									128, 128, 128, 128, {allDir:true, bottom:true})
		lTwoEnts.push({type:"Platform", ent:platform})
	}
	
	for(var i = 2; i < 5; i++){
		var brick = new Tile(gameEngine, "./img/brick2.png", 0, 0,
				128 * 17, 128 * i, 128 * 17, i * 128,
				128, 128, 128, 128, {allDir:true, bottom:true});
		lTwoEnts.push({type:"Platform", ent:brick});
	}
	for(var i = 2; i < 5; i++){
		var brick = new Tile(gameEngine, "./img/brick2.png", 0, 0,
				128 * 20, 128 * i, 128 * 20, i * 128,
				128, 128, 128, 128, {allDir:true, bottom:true});
		lTwoEnts.push({type:"Platform", ent:brick});
	}
	for (var i = 17; i < 21; i++) {
		var brick= new Tile(gameEngine, "./img/brick2.png", 0, 0,
										128 * i, (128 * 2), 128 * i, 128 * 2,
										128, 128, 128, 128, {allDir:true, bottom:true})
		lTwoEnts.push({type:"Platform", ent:brick})
	}
	
	
	var box7 = new Tile(gameEngine, "./img/box.png", 0, 0,
			128 * 24, 640 - 128, 128 * 24, 640 - 128,
			128, 128, 128, 128, {allDir:true, bottom:true});
	lTwoEnts.push({type:"Platform", ent:box7});
	var box7 = new Tile(gameEngine, "./img/box.png", 0, 0,
			128 * 28, 640 - 128, 128 * 28, 640 - 128,
			128, 128, 128, 128, {allDir:true, bottom:true});
	lTwoEnts.push({type:"Platform", ent:box7});
	
	
	//Debug
	for (var i = 26; i < 27; i++) {
		var brick= new Tile(gameEngine, "./img/box.png", 0, 0,
										128 * i, (128 * 1), 128 * i, 128 * 1,
										128, 128, 128, 128, {allDir:true, bottom:false}, true, true, 128 * 1, 128 * 1)
		lTwoEnts.push({type:"Platform", ent:brick})
	}
	
	var checkpoint = new Checkpoint(gameEngine, 128 * 30, 640 - 128);
	lTwoEnts.push({type:"Other", ent:checkpoint});
	
	var dump = new Tile(gameEngine, "./img/dumpster.png", 0, 0, 
			128 * 35, 640 - 192, 128 * 35, 640 - 192, 
			384, 60,384, 192, {allDir:true, bottom:false});
	lTwoEnts.push({type:"Platform", ent:dump});
	for (var i = 0; i < 5; i++) {
		var craneV = new Tile(gameEngine, "./img/crane_piece_v.png", 0, 0,
										128 * 43, 128 * i, 128 * 43, 128 * i,
										129, 128, 128, 128, {allDir:false, bottom:false});
		lTwoEnts.push({type:"Platform", ent:craneV});
	}
	
	var box= new Tile(gameEngine, "./img/box.png", 0, 0,
			128 * 38, (128 * 2), 128 * 38, 128 * 2,
			128, 128, 128, 128, {allDir:true, bottom:true}, true, false, 128 * 38, 128 * 42 )
	lTwoEnts.push({type:"Platform", ent:box})
	
	
	for (var i = 38; i < 43; i++) {
		
		var water = new Platform(gameEngine, i * 128, 704, 64, 64, "Red");
		var water2 = new Platform(gameEngine, i * 128 + 64, 704, 64, 64, "Red");
		lTwoEnts.push({type:"Platform", ent:water2});
		lTwoEnts.push({type:"Platform", ent:water});
	}
	for (var i = 43; i < 56; i++) {
		var platform = new Tile(gameEngine, "./img/ground.png", 0, 0,
									i * 128, 768 - 128, i * 128, 768 - 128, 
									128, 128, 128, 128, {allDir:true, bottom:true})
		lTwoEnts.push({type:"Platform", ent:platform})
	}
	var dump = new Tile(gameEngine, "./img/dumpster.png", 0, 0, 
			128 * 44, 640 - 192, 128 * 44, 640 - 192, 
			384, 60,384, 192, {allDir:true, bottom:false});
	lTwoEnts.push({type:"Platform", ent:dump});
	
	var checkpoint = new Checkpoint(gameEngine, 128 * 51, 640 - 128);
	lTwoEnts.push({type:"Other", ent:checkpoint});
	
	for (var i = 0; i < 6; i++) {
		var craneV = new Tile(gameEngine, "./img/crane_piece_v.png", 0, 0,
										128 * 60, 128 * i, 128 * 60, 128 * i,
										129, 128, 128, 128, {allDir:false, bottom:false});
		lTwoEnts.push({type:"Platform", ent:craneV});
	}
	for (var i = 56; i < 64; i++) {
		
		var water = new Platform(gameEngine, i * 128, 704, 64, 64, "Red");
		var water2 = new Platform(gameEngine, i * 128 + 64, 704, 64, 64, "Red");
		lTwoEnts.push({type:"Platform", ent:water2});
		lTwoEnts.push({type:"Platform", ent:water});
	}
	for (var i = 64; i < 73; i++) {
		var platform = new Tile(gameEngine, "./img/ground.png", 0, 0,
									i * 128, 768 - 128, i * 128, 768 - 128, 
									128, 128, 128, 128, {allDir:true, bottom:true})
		lTwoEnts.push({type:"Platform", ent:platform})
	}
	
	var box= new Tile(gameEngine, "./img/box.png", 0, 0,
			128 * 55, 640 - 128, 128 * 55, 640 - 128,
			128, 128, 128, 128, {allDir:true, bottom:true})
	lTwoEnts.push({type:"Platform", ent:box})
	for (var i = 56; i < 58; i++) {
		var box= new Tile(gameEngine, "./img/box.png", 0, 0,
										128 * i, 640 - (128 * 1), 128 * i, 640 - (128 * 1),
										128, 128, 128, 128, {allDir:true, bottom:true}, true, true, 250 - 128, 128 * 4)
		lTwoEnts.push({type:"Platform", ent:box})
	}
	var box= new Tile(gameEngine, "./img/box.png", 0, 0,
			128 * 58, 640 - (128 * 2), 128 * 58, 640 - (128 * 2),
			128, 128, 128, 128, {allDir:true, bottom:true}, true, false, 128 * 59, 128 * 62)
	lTwoEnts.push({type:"Platform", ent:box})
	for (var i = 3; i < 5; i++) {
		var box = new Tile(gameEngine, "./img/box.png", 0, 0,
										128 * 64, 128 * i, 128 * 64, 128 * i,
										129, 128, 128, 128, {allDir:true, bottom:true});
		lTwoEnts.push({type:"Platform", ent:box});
	}
	//
	for (var i = 0; i < 6; i++) {
		var craneV = new Tile(gameEngine, "./img/crane_piece_v.png", 0, 0,
										128 * 80, 128 * i, 128 * 80, 128 * i,
										129, 128, 128, 128, {allDir:false, bottom:false});
		lTwoEnts.push({type:"Platform", ent:craneV});
	}
	for (var i = 73; i < 95; i++) {
		
		var water = new Platform(gameEngine, i * 128, 704, 64, 64, "Red");
		var water2 = new Platform(gameEngine, i * 128 + 64, 704, 64, 64, "Red");
		lTwoEnts.push({type:"Platform", ent:water2});
		lTwoEnts.push({type:"Platform", ent:water});
	}
	for (var i = 95; i < 500; i++) {
		var platform = new Tile(gameEngine, "./img/ground.png", 0, 0,
									i * 128, 768 - 128, i * 128, 768 - 128, 
									128, 128, 128, 128, {allDir:true, bottom:true})
		lTwoEnts.push({type:"Platform", ent:platform})
	}
	
	var box = new Tile(gameEngine, "./img/box.png", 0, 0,
			128 * 73, 640 - 128 , 128 * 73, 640 - 128,
			129, 128, 128, 128, {allDir:true, bottom:true}, true, false, 128 * 73, 128 * 78);
	lTwoEnts.push({type:"Platform", ent:box});
	var box = new Tile(gameEngine, "./img/box.png", 0, 0,
			128 * 73, 640 - 128 , 128 * 73, 640 - 128,
			129, 128, 128, 128, {allDir:true, bottom:true}, true, false, 128 * 79, 128 * 83);
	lTwoEnts.push({type:"Platform", ent:box});
	
	var box = new Tile(gameEngine, "./img/box.png", 0, 0,
			128 * 78, 128 * 2 , 128 * 78, 128 * 2,
			129, 128, 128, 128, {allDir:true, bottom:true});
	lTwoEnts.push({type:"Platform", ent:box});
	
	var box = new Tile(gameEngine, "./img/box.png", 0, 0,
			128 * 79, 128 * 2, 128 * 79, 128 * 2,
			129, 128, 128, 128, {allDir:true, bottom:true});
	lTwoEnts.push({type:"Platform", ent:box});
	var box6 = new Tile(gameEngine, "./img/box.png", 0, 0,
			128 * 84, (128 * 2), 128 * 84, (128 * 2),
			128, 128, 128, 128, {allDir:true, bottom:true}, true, true, 128 * 2, 128 * 4.2);
	lTwoEnts.push({type:"Platform", ent:box6});
	var box6 = new Tile(gameEngine, "./img/box.png", 0, 0,
			128 * 85.5, (128 * 4), 128 * 85.5, (128 * 4),
			128, 128, 128, 128, {allDir:true, bottom:true}, true, true, 128 * 2, 128 * 4.2);
	lTwoEnts.push({type:"Platform", ent:box6});
	var box6 = new Tile(gameEngine, "./img/box.png", 0, 0,
			128 * 87, (128 * 3), 128 * 87, (128 * 3),
			128, 128, 128, 128, {allDir:true, bottom:true}, true, true, 128 * 2, 128 * 4.2);
	lTwoEnts.push({type:"Platform", ent:box6});
	var box6 = new Tile(gameEngine, "./img/box.png", 0, 0,
			128 * 88.5, (128 * 3.5), 128 * 88.5, (128 * 3.5),
			128, 128, 128, 128, {allDir:true, bottom:true}, true, true, 128 * 2, 128 * 4.2);
	lTwoEnts.push({type:"Platform", ent:box6});
	var box = new Tile(gameEngine, "./img/box.png", 0, 0,
			128 * 73, 128 * 3 , 128 * 73, 128 * 3,
			129, 128, 128, 128, {allDir:true, bottom:true}, true, false, 128 * 90, 128 * 93);
	lTwoEnts.push({type:"Platform", ent:box});
	for (var i = 95; i < 100; i++) {
		lTwoEnts.push({type:"Other", ent:new Lamp(gameEngine, 128 * i, 640 - 128 * 3)})
	}	
	var sign = new Tile(gameEngine, "./img/achtung.png", 0, 0, 128 * 3, 128 * 3, 128 * 3, 128 * 3, 128, 256, 128, 256, {allDir:false, bottom:false});
	lTwoEnts.push({type:"Platform", ent:sign});
	var sign = new Tile(gameEngine, "./img/achtung.png", 0, 0, 128 * 33, 128 * 3, 128 * 33, 128 * 3, 128, 256, 128, 256, {allDir:false, bottom:false});
	lTwoEnts.push({type:"Platform", ent:sign});
	var sign = new Tile(gameEngine, "./img/achtung.png", 0, 0, 128 * 69, 128 * 3, 128 * 69, 128 * 3, 128, 256, 128, 256, {allDir:false, bottom:false});
	lTwoEnts.push({type:"Platform", ent:sign});
	for (var i = 8; i < 16; i++) {
		var crane= new Tile(gameEngine, "./img/crane_piece_h.png", 0, 0,
										128 * i, 640 - (128 * 5), 128 * i, 640 - (128 * 5),
										128, 128, 128, 128, {allDir:false, bottom:false})
		lTwoEnts.push({type:"Platform", ent:crane})
	}	
	for (var i = 38; i < 48; i++) {
		var crane= new Tile(gameEngine, "./img/crane_piece_h.png", 0, 0,
										128 * i, 640 - (128 * 5), 128 * i, 640 - (128 * 5),
										128, 128, 128, 128, {allDir:false, bottom:false})
		lTwoEnts.push({type:"Platform", ent:crane})
	}
	for (var i = 25; i < 32; i++) {
		var crane= new Tile(gameEngine, "./img/crane_piece_h.png", 0, 0,
										128 * i, 640 - (128 * 5), 128 * i, 640 - (128 * 5),
										128, 128, 128, 128, {allDir:false, bottom:false})
		lTwoEnts.push({type:"Platform", ent:crane})
	}
	for (var i = 0; i < 5; i++) {
		var craneV = new Tile(gameEngine, "./img/crane_piece_v.png", 0, 0,
										128 * 31, 128 * i, 128 * 31, 128 * i,
										129, 128, 128, 128, {allDir:false, bottom:false});
		lTwoEnts.push({type:"Platform", ent:craneV});
	}
	for (var i = 55; i < 65; i++) {
		var crane= new Tile(gameEngine, "./img/crane_piece_h.png", 0, 0,
										128 * i, 640 - (128 * 5), 128 * i, 640 - (128 * 5),
										128, 128, 128, 128, {allDir:false, bottom:false})
		lTwoEnts.push({type:"Platform", ent:crane})
	}
	for (var i = 73; i < 95; i++) {
		var crane= new Tile(gameEngine, "./img/crane_piece_h.png", 0, 0,
										128 * i, 640 - (128 * 5), 128 * i, 640 - (128 * 5),
										128, 128, 128, 128, {allDir:false, bottom:false})
		lTwoEnts.push({type:"Platform", ent:crane})
	}
	var box6 = new Tile(gameEngine, "./img/box.png", 0, 0,
			128 * 72, (128 * 4), 128 * 72, (128 * 4),
			128, 128, 128, 128, {allDir:true, bottom:true});
	lTwoEnts.push({type:"Platform", ent:box6});
	var box6 = new Tile(gameEngine, "./img/box.png", 0, 0,
			128 * 72, (128 * 3), 128 * 72, (128 * 3),
			128, 128, 128, 128, {allDir:true, bottom:true});
	lTwoEnts.push({type:"Platform", ent:box6});
	lTwoEnts.push({type:"Enemy", ent:new Range(gameEngine, 128 * 19, 128 * 5 - 150)})
	lTwoEnts.push({type:"Enemy", ent:new EnemyIdle(gameEngine, 128 * 36, 128 * 3 - 37 )})
	lTwoEnts.push({type:"Enemy", ent:new EnemyIdle(gameEngine, 128 * 45, 128 * 3 - 37 )})
	lTwoEnts.push({type:"Enemy", ent:new EnemyPace(gameEngine, 128 * 68, 768 - 128 - 95)})
	
	lTwoEnts.push({type:"Enemy", ent:new Rat(gameEngine, 128 * 31, 640 - 64)})
	lTwoEnts.push({type:"Enemy", ent:new Rat(gameEngine, 128 * 50, 640 - 64)})

	var checkpoint = new Checkpoint(gameEngine, 128 * 72, 128 * 2);
	lTwoEnts.push({type:"Other", ent:checkpoint});
	
	var hearts = new Health(gameEngine);
	lTwoEnts.push({type:"Other", ent:hearts});
	
	
	lTwoEnts.push({type:"Other", ent:gameEngine.cat});
	
	lTwoEnts.push({type:"Enemy", ent:new Wire(gameEngine, 128 * 26.5, 128 * 2)})
	var wire = new Wire(gameEngine, 128 * 79, 128 * 2)	
	lTwoEnts.push({type:"Enemy", ent:wire})
	

	return lTwoEnts;
}