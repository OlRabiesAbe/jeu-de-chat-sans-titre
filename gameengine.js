// This game shell was happily copied from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (/* function */ callback, /* DOMElement */ element) {
                window.setTimeout(callback, 1000 / 60);
            };
})();


function Timer() {
    this.gameTime = 0;
    this.maxStep = 0.05;
    this.wallLastTimestamp = 0;
}

Timer.prototype.tick = function () {
    var wallCurrent = Date.now();
    var wallDelta = (wallCurrent - this.wallLastTimestamp) / 1000;
    this.wallLastTimestamp = wallCurrent;

    var gameDelta = Math.min(wallDelta, this.maxStep);
    this.gameTime += gameDelta;
    return gameDelta;
}

function GameEngine() {
	this.camera = new Camera(this);
	this.cat = new Cat(this);
	this.sceneManager = new SceneManager(this);
	this.entities = [];
	this.platforms = [];
    this.enemies = [];
	this.otherEntities = [];
    this.showOutlines = false;
    this.ctx = null;
    this.click = false;
    this.mouse = null;
    this.wheel = null;
    this.surfaceWidth = null;
    this.surfaceHeight = null;
}

GameEngine.prototype.init = function (ctx) {
    this.ctx = ctx;
	this.cat.platform = this.platforms[0];
	//this.cat.platform = this.entities[0];
    this.surfaceWidth = this.ctx.canvas.width;
    this.surfaceHeight = this.ctx.canvas.height;
    this.startInput();
    this.timer = new Timer();
    //console.log('game initialized');
}

GameEngine.prototype.start = function () {
    //console.log("starting game");
    var that = this;
    (function gameLoop() {
        that.loop();
        requestAnimFrame(gameLoop, that.ctx.canvas);
    })();
}

GameEngine.prototype.startInput = function () {
    //console.log('Starting input');
	var getXandY = function (e) {
        var x = e.clientX - that.ctx.canvas.getBoundingClientRect().left;
        var y = e.clientY - that.ctx.canvas.getBoundingClientRect().top;

        if (x < 1024) {
            x = Math.floor(x / 32);
            y = Math.floor(y / 32);
        }

        return { x: x, y: y };
    }
    var that = this;
	this.ctx.canvas.addEventListener("mousemove", function (e) {
		that.btnHover = e.clientX < 559 || e.clientX > 791 || e.clientY < 54 || e.clientY > 155 ? false : true;
	
	}, false);
	//console.log("CLICK" + that.click);
	this.ctx.canvas.addEventListener("click", function (e) {
		that.click = true;
		that.mouseTimer = 0;
	}, false);

    this.ctx.canvas.addEventListener("keydown", function (e) {	
		if (String.fromCharCode(e.which) === 'W') that.w = true;
			if (String.fromCharCode(e.which) === ' ') that.space = true;
			if (String.fromCharCode(e.which) === 'D') that.right = true;
			if (String.fromCharCode(e.which) === 'A') that.left = true;
			if (String.fromCharCode(e.which) === 'S') that.down = true;
			e.preventDefault();
    }, false);

	this.ctx.canvas.addEventListener("keyup", function(e) {
		if (String.fromCharCode(e.which) === 'D') that.right = false;
		if (String.fromCharCode(e.which) === 'A') that.left = false;
		if (String.fromCharCode(e.which) === 'S') that.down = false;
		if (String.fromCharCode(e.which) === 'W') that.w = false;
		if (String.fromCharCode(e.which) === ' ') that.space = false;
	}, false);
    console.log('Input started');
}

GameEngine.prototype.addEntity = function (entity) {
    console.log('added entity');
	this.entities.push(entity);
    this.otherEntities.push(entity);
}

GameEngine.prototype.addPlatform = function (entity) {
    console.log('added entity');
	this.entities.push(entity);
    this.platforms.push(entity);
}
GameEngine.prototype.addEnemy= function (entity) {
    console.log('added entity');
	this.entities.push(entity);
    this.enemies.push(entity);
}
GameEngine.prototype.draw = function () {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.save();
	//console.log(this.click);
	//console.log(this.entities);
    for (var i = 0; i < this.entities.length; i++) {
		//console.log(this.entities[i]);
        this.entities[i].draw(this.ctx);
    }
    this.ctx.restore();
}

GameEngine.prototype.update = function () {
    var entitiesCount = this.entities.length;
	this.mouseTimer += this.clockTick;
	if (this.click && this.mouseTimer >= 0.05) {
		this.click = false;
		this.mouseTimer = 0;
	}
	//console.log(this.camera);
	//console.log(typeof(this.camera));
	//console.log(this.camera.update)
	console.log(this.entities);
	console.log(this.sceneManager);
	this.camera.update();
    for (var i = 0; i < entitiesCount; i++) {
        var entity = this.entities[i];
		//console.log(this.entities[i]);
        if (!entity.removeFromWorld) {
            entity.update();
        }
    }
    for (var i = this.entities.length - 1; i >= 0; --i) {
        if (this.entities[i].removeFromWorld) {
            this.entities.splice(i, 1);
        }
    }
}

GameEngine.prototype.loop = function () {
    this.clockTick = this.timer.tick();
    this.update();
    this.draw();
    this.w = null;
	this.space = null;
}

function Entity(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.removeFromWorld = false;
}

Entity.prototype.update = function () {
}

Entity.prototype.draw = function (ctx) {
    if (this.game.showOutlines && this.radius) {
        this.game.ctx.beginPath();
        this.game.ctx.strokeStyle = "green";
        this.game.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.game.ctx.stroke();
        this.game.ctx.closePath();
    }
}

Entity.prototype.rotateAndCache = function (image, angle) {
    var offscreenCanvas = document.createElement('canvas');
    var size = Math.max(image.width, image.height);
    offscreenCanvas.width = size;
    offscreenCanvas.height = size;
    var offscreenCtx = offscreenCanvas.getContext('2d');
    offscreenCtx.save();
    offscreenCtx.translate(size / 2, size / 2);
    offscreenCtx.rotate(angle);
    offscreenCtx.translate(0, 0);
    offscreenCtx.drawImage(image, -(image.width / 2), -(image.height / 2));
    offscreenCtx.restore();
    //offscreenCtx.strokeStyle = "red";
    //offscreenCtx.strokeRect(0,0,size,size);
    return offscreenCanvas;
}
