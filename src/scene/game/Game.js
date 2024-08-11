//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.scene.Scene
 *
 * @class
 * @classdesc
 * 
 * Game scene.
 */
poisonedX.scene.Game = function() {

//--------------------------------------------------------------------------
// Public properties
//--------------------------------------------------------------------------

/**
 * ...
 *
 * @type {poisonedX.entity.Player}
 */
    this.player = null;

/**
* 
* @type {poisonedX.entity.Monsters}
*/
    this.monsters = null; 

/**
 * 
 * @type {poisonedX.entity.Generators}
 */

    this.generators = null; 

/**
 *  
 *  The game points or score if you would like to call it that.
 *  The points are used to determine the player's score in the game.
 *  The points are increased when the player kills a monster or repairs a generator.           
 * 
 * @type {Number}
 */
    this.points = 0;  // Game starts with 0 points 


/**
 * 
 * 
 *  @type {Number}
 */
    this.killCounter = 0;

/**
 * This the mulitplyer for the points/score when a powerup for extra points/score is picked up.
 * 
 * @type {Number}
 */

    this.pointsMultiplyer = 1;


//--------------------------------------------------------------------------
// Private properties
//--------------------------------------------------------------------------

this.m_timeTickCounter = 0;
this.m_spawnTickCounter = 0;    
this.m_fallTicker = 0;
this.m_falling = false; 
this.m_playerDistance = 0;
this.m_mainHUD = null;
this.m_player1HUD = null;   
this.m_player2HUD = null;   

//--------------------------------------------------------------------------
// Super call
//--------------------------------------------------------------------------

/**
 * Calls the constructor method of the super class.
 * 
 * 
 */
rune.scene.Scene.call(this);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

poisonedX.scene.Game.prototype = Object.create(rune.scene.Scene.prototype);
poisonedX.scene.Game.prototype.constructor = poisonedX.scene.Game;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * This method is automatically executed once after the scene is instantiated. 
 * The method is used to create objects to be used within the scene. 
 *
 * @returns {undefined}
 */
poisonedX.scene.Game.prototype.init = function() {

  
    rune.scene.Scene.prototype.init.call(this); 
    this.m_renderMap();
    
    this.backgroundmusic = this.application.sounds.music.get("music");
    this.backgroundmusic.play(true);
    this.backgroundmusic.volume = 0.3;
    this.backgroundmusic.loop = true;

    this.monsters = new poisonedX.entity.Monsters(this.stage, null, this); 
    this.bullets = new poisonedX.entity.Bullets(this.stage, this.monsters);
    this.generators = new poisonedX.entity.Generators(this.stage, this.monsters, null, null, this); 
    this.powerups = new poisonedX.entity.Powerups(null, this); 

    this.m_spawnMonsters();
    this.m_spawnGenerators(this.player1, this.player2);
    this.m_spawnPlayers(); 
    this.m_initCameras();
    this.m_initHUD();
    this.m_initplayer1HUD();
    this.m_initplayer2HUD();
    this.m_initGameTimer();

};

/**
 * This method is automatically executed once per "tick". The method is used for 
 * calculations such as application logic.
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
poisonedX.scene.Game.prototype.update = function(step) {
    rune.scene.Scene.prototype.update.call(this, step);
    this.m_updatePhysics(step); 
    this.timeTicker(step);  
    this.m_respawnMonsters(step);
    this.m_gameState(step);
    this.m_updatePlayerDistance(step);
    this.m_updateCameraBehavior(step);  
    this.m_musicTempo(step);
};

/**
 * This method is automatically called once just before the scene ends. Use 
 * the method to reset references and remove objects that no longer need to 
 * exist when the scene is destroyed. The process is performed in order to 
 * avoid memory leaks.
 *
 * @returns {undefined}
 */
poisonedX.scene.Game.prototype.dispose = function() {
    rune.scene.Scene.prototype.dispose.call(this);
};

/**
 * Renders the map for the game.    
 * 
 */
poisonedX.scene.Game.prototype.m_renderMap = function() {    
    this.stage.map.load("map");

};

/**
 * 
 * @param {*} step 
 * 
 * Changes the tempo of the background music when the time left for the players is less than 20 seconds. 
 *  
 * 
 */
poisonedX.scene.Game.prototype.m_musicTempo = function(step) {

    if(this.player1.timeLeft <= 20 || this.player2.timeLeft <= 20) {
        this.backgroundmusic.rate = 1.2;
    } else {this.backgroundmusic.rate = 1.0        
    };
};

/**
 * @param {*} step
 * 
 * Decreases the players time left by 1 second every 60th frame.
 */
poisonedX.scene.Game.prototype.timeTicker = function(step) {

    this.m_timeTickCounter++;

    if (this.m_timeTickCounter >= 60) {
    [this.player1, this.player2].forEach(function(player) { 
        if (player) {
            player.decreaseTime();
        };
    });
    this.m_timeTickCounter = 0;
    };
};

/**
 * @param {*} pointIncrement 
 * 
 * Adds points to the game's score.   
 * 
 */
poisonedX.scene.Game.prototype.addPoints = function(pointIncrement) { 
    this.points += ((pointIncrement || 10) * this.pointsMultiplyer);    
};

/**
 * 
 * Initializes the cameras for the game.
 * 
 */
poisonedX.scene.Game.prototype.m_initCameras = function() {

    this.cameras.addCamera(this.cameras.createCamera(0, 0, 200, 225));
    this.cameras.addCamera(this.cameras.createCamera(200, 0, 200, 225)); 

    this.cameras.getCameraAt(0).bounderies = new rune.geom.Rectangle(0, 0, 448, 608);  
    this.cameras.getCameraAt(1).bounderies = new rune.geom.Rectangle(0, 0, 448, 608);
    this.cameras.getCameraAt(2).bounderies = new rune.geom.Rectangle(0, 0, 448, 608);

    this.cameras.getCameraAt(0).visible = true;    
    this.cameras.getCameraAt(1).visible = false;    
    this.cameras.getCameraAt(2).visible = false; 

    this.cameras.getCameraAt(0).targets.add(this.player1); 
    this.cameras.getCameraAt(0).targets.add(this.player2); 
    this.cameras.getCameraAt(1).targets.add(this.player2); 
    this.cameras.getCameraAt(2).targets.add(this.player1);
};

/**
 * 
 * @param {*} step
 * 
 * Updates the camera behavior depending on the distance between the players.    
 */
poisonedX.scene.Game.prototype.m_updateCameraBehavior = function(step) {

    if(this.m_playerDistance > 200) {
    this.cameras.getCameraAt(0).visible = false;    
    this.cameras.getCameraAt(1).visible = true;    
    this.cameras.getCameraAt(2).visible = true;    
    }
    else if(this.m_playerDistance < 200) {  
    this.cameras.getCameraAt(0).visible = true;    
    this.cameras.getCameraAt(1).visible = false;    
    this.cameras.getCameraAt(2).visible = false;  
    }; 
};

/**
 * 
 * Initializes the game timer.
 * 
 */
poisonedX.scene.Game.prototype.m_initGameTimer = function() {   
    
    this.countDown = this.timers.create({
        duration: 2000, 
        onComplete: function () {
            this.application.scenes.load([new poisonedX.scene.GameStateOver(this.points)]);
        }
    }, false);
};

/**
 * 
 * Changes the game state when the time left for the players is less than or equal to 0.
 * Fades out the camera and starts the countdown timer for the game over state.
 * Disposes of the monsters, generators, powerups and bullets that still exists.  
 * 
 */
poisonedX.scene.Game.prototype.m_gameState = function() {
    
    if (this.player1.timeLeft <= 0 && this.player2.timeLeft <= 0) {
        if(this.cameras.getCameraAt(0).visible === true) {
        this.cameras.getCameraAt(0).fade.out(300)
        this.countDown.start();
        this.monsters.dispose();
        this.generators.dispose();
        this.powerups.dispose();
        this.bullets.dispose();
        this.backgroundmusic.stop(); 
        }
        else if(this.cameras.getCameraAt(1).visible === true || this.cameras.getCameraAt(2).visible === true) { 
        this.cameras.getCameraAt(1).fade.out(300);
        this.cameras.getCameraAt(2).fade.out(300);
        this.countDown.start();
        this.monsters.dispose();
        this.generators.dispose();
        this.powerups.dispose();
        this.bullets.dispose();
        this.backgroundmusic.stop(); 
        };
    };
};

/**
 * 
 * @param {*} step 
 * 
 * Makes sure that the players and the monsters are not falling through the platforms.
 * 
 */
poisonedX.scene.Game.prototype.m_updatePhysics = function(step) {   
 
    if(this.player1.m_falling === false) {  
        this.stage.map.back.hitTestAndSeparate(this.player1); 
    };

    if(this.player2.m_falling === false) {
        this.stage.map.back.hitTestAndSeparate(this.player2); 
    }; 
        this.stage.map.back.hitTestAndSeparate(this.monsters); 
        this.stage.map.back.hitTestAndSeparate(this.generators); 
        this.stage.map.back.hitTestAndSeparate(this.powerups);
};

/**
 * 
 * The inital spawn of monsters, 3 monsters on each platform during the 1st level
 * The amount of monsters will increase with each level.    
 * The monsters will also increase their strength with each level.
 * 
 */
poisonedX.scene.Game.prototype.m_spawnMonsters = function() {   
    this.monsters = new poisonedX.entity.Monsters(this.stage, this.bullets, this); 
    this.application.scenes.selected.groups.add(this.monsters);    

    var amount = this.monsters.amount; 
    var ycoord = [100, 200, 300, 400, 540];  

    for(var i = 0; i < ycoord.length; i++) {
        for(var j = 0; j < amount; j++) {
            var monster = this.monsters.create(100 , ycoord[i]); 
        };
    };
};

/**
 * 
 * Respawns 1 monster at a random platform
 * 
 */
poisonedX.scene.Game.prototype.m_spawnSingleMonster = function() { 
    var ycoord = [100, 200, 300, 400, 540]; 
    var randomYcoord = ycoord[Math.floor(Math.random() * ycoord.length)];
    var monster = this.monsters.create(100 , randomYcoord); 
};

/**
 * 
 * @param {*} step 
 * 
 * Respawns monsters every 150th frame if the total number of monsters is less than 5 times the amount of monsters.
 * 
 */
poisonedX.scene.Game.prototype.m_respawnMonsters = function(step) {  

    this.m_spawnTickCounter++;

    if (this.m_spawnTickCounter >= 150) { 
        if(this.monsters.numMembers < (this.monsters.amount * 5)) {
            this.m_spawnSingleMonster();   
        };
        this.m_spawnTickCounter = 0; 
    };
};

/**
 * 
 * @param {Object} player1 
 * @param {Object} player2 
 * 
 * Spawn generators on the left and right side of the map for every even and odd index in the ycoord array.
 * Which means that one generator will be spawned on every platform.
 * They are given references to the players, monsters, the game and the game stage.
 * 
 */
poisonedX.scene.Game.prototype.m_spawnGenerators = function(player1, player2) {

    this.generators = new poisonedX.entity.Generators(this.stage, this.monsters, player1, player2, this); 
    this.application.scenes.selected.groups.add(this.generators);   

    var ycoord = [50, 200, 300, 400, 540];

    for(var i = 0; i < ycoord.length; i++) {
        if (i % 2 === 0) {
            generator = this.generators.create(100 , ycoord[i]); 
        } else {
            generator = this.generators.create(400 , ycoord[i]); 
        };
    };
};

/**
 * 
 * Spawns players on the map and adds them to the stage.
 * The players are given refences to the stage, bullets, monsters, generators and the game.
 * 
 */
poisonedX.scene.Game.prototype.m_spawnPlayers = function() {

    this.players = new poisonedX.entity.Players(this.stage, this.bullets, this.monsters, this.generators, this);
    this.application.scenes.selected.groups.add(this.players);  
    var players = this.players.create(250, 550); 
    this.player1 = players.cook;
    this.player2 = players.repairo; 

    this.player1.groupMember = this.player2;
    this.player2.groupMember = this.player1; 

    this.stage.addChild(players.cook);
    this.stage.addChild(players.repairo);   
};

/**
 * 
 * @param {*} step 
 * 
 * This calculates the distance between the players.    
 * 
 */
poisonedX.scene.Game.prototype.m_updatePlayerDistance = function(step) {   

    var p1Point = new rune.geom.Point(this.player1.x, this.player1.y);
    var p2Point = new rune.geom.Point(this.player2.x, this.player2.y);       
    this.m_playerDistance = p1Point.distance(p2Point);   
}; 

/**
 * 
 * Initializes the standard main HUD for the game.
 * 
 */
poisonedX.scene.Game.prototype.m_initHUD = function() {  

    this.m_mainHUD = new poisonedX.scene.MainHUD(0, 0, this.application.screen.width, this.application.screen.height, this);       
    this.cameras.getCameraAt(0).addChild(this.m_mainHUD);
};

/**
 * 
 * Initializes the player 1 HUD for the game.
 * 
 */
poisonedX.scene.Game.prototype.m_initplayer1HUD = function() {

    this.m_player1HUD = new poisonedX.scene.SplittHUD(0, 0, (this.application.screen.width / 2), this.application.screen.height, this.player1, this);
    this.cameras.getCameraAt(2).addChild(this.m_player1HUD);
};

/**
 * 
 * Initializes the player 2 HUD for the game.
 * 
 */
poisonedX.scene.Game.prototype.m_initplayer2HUD = function() {  

    this.m_player2HUD = new poisonedX.scene.SplittHUD(0, 0, (this.application.screen.width / 2), this.application.screen.height, this.player2, this);
    this.cameras.getCameraAt(1).addChild(this.m_player2HUD);
};
