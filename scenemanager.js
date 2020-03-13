/** 
 * A SceneManager to handle transitions between levels of the game.
 * @author Brent O'Neill
 * @version 13 February 2020
 */

/** 
 * Constructor for the scene manager
 */
function SceneManager(game) {
	// initializes the variables
	this.game = game;
	this.currentScene = null;
	this.currentSceneKey = null;
	this.sceneIdx = 0;
	this.transitionTime = 0;
	this.sounds = new SoundManager();
	this.scenes = [];
	// The Scene Manager will  handle the music
	this.songs = [];
	this.songs[1] = new Audio("./music/level_1.wav");
	this.songs[2] = new Audio("./music/level_2.wav");
	this.songs[3] = new Audio("./music/level_3_and_pound.wav");
}

SceneManager.prototype.constructor = SceneManager;

SceneManager.prototype.addScene = function(scene) {
	// Adds a scene to the list of scenes
	this.scenes.push(scene);
	scene.idx = this.sceneIdx;
	this.sceneIdx++;
}

/**
 * Transitions from the current scene to the scene in the parameter
 */
SceneManager.prototype.setScene = function(otherScene) {
	// Removes all entities from the current scene
	if (this.songs[this.currentSceneKey] !== undefined) {
		this.songs[this.currentSceneKey].pause();
	}
	for (var g = 0; g < this.game.entities.length; g++) {
		if (this.game.entities[g] != this.game.camera &&
			this.game.entities[g] != this.game.sceneManager) {
			this.game.entities[g].removeFromWorld = true;
			if (this.game.entities[g].name !== undefined && this.game.entities[g].name === "Checkpoint" 
						&& (otherScene.idx === GAME_OVER_SCENE || otherScene.idx === WIN_SCREEN)) {
				this.game.entities[g].on = false;
			}
			if (this.game.entities[g].spawn !== undefined) {
				this.game.entities[g].x = this.game.entities[g].spawn;
			}
		}
	}

	// Adds the entities from the new scene and makes sure they aren't destroyed
	for (var i = 0; i < otherScene.entities.length; i++) {
		var entity = otherScene.entities[i];
		entity.ent.removeFromWorld = false;
		// The entities need to keep track of what kind they are
		if (entity.type === "Platform") {
			this.game.addPlatform(entity.ent);
		} else if (entity.type === "Enemy") {
			this.game.addEnemy(entity.ent);
		} else {
			this.game.addEntity(entity.ent);
		}
	}
	// This keeps track of the index and current scene
	this.currentScene = otherScene;
	this.currentSceneKey = otherScene.idx;
	if (this.songs[this.currentSceneKey] !== undefined) {
		this.songs[this.currentSceneKey].currentTime = 0;
		this.songs[this.currentSceneKey].play();
		this.songs[this.currentSceneKey].loop = true;
	}
	//this.sounds.songs[this.currentSceneKey].play();
}

SceneManager.prototype.getScene = function() {
	return this.currentSceneKey;
}
/**
 * A function to create a scene. A scene is defined by having a game engine
 * and a list of entities. An entity in this format would be of the following:
 * {type: , ent: }. For example, a platform is {type:"Platform", ent:platform1}
 */
function Scene(game, ents) {
	this.game = game;
	this.entities = ents;
	
}

function SoundManager() {
	this.songs = [new Audio("./music/level_1.wav"),
	new Audio("./music/level_1.wav"),
	new Audio("./music/level_1.wav"),
	new Audio("./music/level_1.wav")];
	this.loop = true;
	this.volume = true;
}

