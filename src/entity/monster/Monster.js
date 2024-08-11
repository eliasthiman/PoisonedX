//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.display.Sprite
 *
 * @class
 * @classdesc
 * 
 * Game scene.
 */
poisonedX.entity.Monster = function(x, y, game, bullets, strength, speed, monsters) { 


    this.strength = strength;


    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------
    
    /**
     * 
     * Represents the health of the monster.
     * 
     * @type {number}
     * @private
     */
    this.m_health = 100;

    this.m_immortal = false;
    this.m_b = rune.util.Math.random(1,1.5);  // represents the monsters walking speed
    this.m_v = this.m_b;
    this.m_game = game;
    this.m_alive = true;
    this.m_bullets = bullets;
    this.m_lastSpawnKillCount = 0;
    this.m_monsters = monsters; 
    this.m_speed = speed;

    
    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * Calls the constructor method of the super class.
     */
    rune.display.Sprite.call(this, x, y, 40, 40, "Monster");    
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

poisonedX.entity.Monster.prototype = Object.create(rune.display.Sprite.prototype);
poisonedX.entity.Monster.prototype.constructor = poisonedX.entity.Monster; 

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @returns {undefined}
 */
poisonedX.entity.Monster.prototype.init = function() {
    rune.display.Sprite.prototype.init.call(this);
    this.m_initPhysics();
    this.m_initAnimation();
    this.m_initHitbox();
};

/**
 * ...
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
poisonedX.entity.Monster.prototype.update = function(step) {
    rune.display.Sprite.prototype.update.call(this, step);
    this.m_updateMovement(step);
    this.m_updateCollision(step);
    this.m_updateHitbox(step); 
};

/**
 * ...
 *
 * @returns {undefined}
 */
poisonedX.entity.Monster.prototype.dispose = function() {
    rune.display.Sprite.prototype.dispose.call(this);
};


//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------

/**
 * Initializes the physics of the monster.
 *
 * @returns {undefined}
 * @private
 */
poisonedX.entity.Monster.prototype.m_initPhysics = function() {
    this.velocity.drag.x = 0.05;
    this.velocity.drag.y = 0.05;
    this.velocity.max.x = 1.8;
    this.velocity.max.y = 1.8; 
    this.velocity.x = -2;
    this.velocity.acceleration.y = 0.33; 
};


/**
 * 
 * Initiates the hitbox of the monster.
 * 
 * 
 */
poisonedX.entity.Monster.prototype.m_initHitbox = function() {
    this.hitbox.debug = false;
    this.hitbox.set(
        5,
        0, 
        15,
        40
    );
};

/**
 * 
 * Updates the hitbox of the monster depending on the direction it's facing.
 * This is a fix for the hitbox not following the monster properly when it's flipped.
 * 
 * @param {*} step 
 */

poisonedX.entity.Monster.prototype.m_updateHitbox = function(step) {    
    if(this.flippedX && this.m_alive){
        this.hitbox.set(
            18,
            0, 
            15,
            40
        );
    }else if(!this.flippedX && this.m_alive){
        this.hitbox.set(
            5,
            0, 
            15,
            40
        );
    };
};


/**
 * 
 * Adds collision detection to the monster agains bullets.
 * 
 * @param {*} step 
 */
poisonedX.entity.Monster.prototype.m_updateCollision = function(step) {

    var bulletsLength = this.m_bullets.numMembers;
    var bullets = this.m_bullets.getMembers(); 

    for (var i = 0; i < bulletsLength; i++) {
        if(this.hitTestObject(bullets[i])){ 
            this.m_onHitBullet(bullets[i]);
        };
        this.hitTestAndSeparate(bullets[i]);  
    }; 
};

/**
 * 
 * Calls the m_dmg function when the monster is hit by a bullet.
 * Disposes the bullet when it hits the monster.
 * 
 * @param {Object} bullet 
 */
poisonedX.entity.Monster.prototype.m_onHitBullet = function(bullet) {
    if(this.m_alive){
        this.m_monsters.bloodEmitter.centerX = this.centerX;
        this.m_monsters.bloodEmitter.centerY = this.centerY;
        this.m_monsters.bloodEmitter.emit(1);
        this.m_dmg(bullet);
    };
};


/**
 * 
 * Emits blood and gore when monster dies.
 * Disposes the monster when it's dead.
 * 
 */

poisonedX.entity.Monster.prototype.m_kill = function(){
    if(!this.m_alive){
        this.m_monsters.bloodEmitter.centerX = this.centerX;
        this.m_monsters.bloodEmitter.centerY = this.centerY;
        this.m_monsters.bloodEmitter.emit(20);
        this.m_monsters.goreEmitter.centerX = this.centerX; 
        this.m_monsters.goreEmitter.centerY = this.centerY;
        this.m_monsters.goreEmitter.emit(2);
        this.dispose();
        this.center
    };
};


/**
 * 
 * Damages the monster when hit by a bullet
 * The damage is based on the bullet's damage
 * 
 * @param {Object} bullet 
 */
poisonedX.entity.Monster.prototype.m_dmg = function(bullet){
    if(!this.m_immortal && this.m_alive){   
        this.m_immortal = true;
        this.flicker.start(500, 60);  
        this.m_health -= bullet.damage;
        bullet.dispose();
        this.m_immortal = false;
    };

    if(this.m_health <= 0){
        this.m_alive = false;
        this.m_game.addPoints(5);
        this.m_game.killCounter++;
        this.m_game.totalKillCounter++; 
        this.m_powerUpChance(); 
        this.m_kill();
    };
};


/**
 * Initializes the animation of the monster.
 *
 * @returns {undefined}
 * @private
 */
poisonedX.entity.Monster.prototype.m_initAnimation = function() {
    this.animation.create("walk", [20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38], 20, true); 
};


/**
 * 
 * Updates the movement of the monster.
 *
 * @returns {undefined}
 * @private
 */
poisonedX.entity.Monster.prototype.m_updateMovement = function(step) {

    if (this.m_alive) {
        this.velocity.x = this.m_v;
        if(this.right > 448) {
            this.m_v = -this.m_b;
            this.right = 448;
            this.flippedX = true;
        };
        if(this.x < 16) {
            this.m_v = this.m_b;
            this.x = 16;
            this.flippedX = false;
        };
    }
    else{
        this.velocity.x = 0;
    };
};


/**
 *  
 * Chance of spawning a powerup when monster dies   
 * 
 */
poisonedX.entity.Monster.prototype.m_powerUpChance = function() {

    var chance = Math.floor(Math.random() * 10) + 1;

    if(this.m_game.killCounter % 5 === 0 && this.m_game.killCounter !== this.m_lastSpawnKillCount && chance <= 4){   
        this.m_spawnPowerup();
        this.m_lastSpawnKillCount = this.m_game.killCounter; 
    };
};


/**
 * 
 * Spawns a powerup when monster dies
 * 
 */
poisonedX.entity.Monster.prototype.m_spawnPowerup = function() {
    
    this.powerups = new poisonedX.entity.Powerups(this, this.m_game);
    this.powerups.create(this.centerX, this.centerY); 
};