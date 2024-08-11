//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.scene.Scene
 *
 * @param {rune.display.Stage} stage ...
 *
 * @class
 * @classdesc
 * 
 * Represents a handler for bullets.
 */
poisonedX.entity.Monsters = function(stage, bullets, game) {

    //--------------------------------------------------------------------------
    // Public properties
    //--------------------------------------------------------------------------

    
    /**
     * A monster object.
     * 
     * @type {poisonedX.entity.Monster}
     */
    this.monster = null;
    this.amount = 3; // the standard amount of monsters in the beginning of the game

    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------
    
    this.m_gameStage = stage;
    this.m_bullets = bullets;
    this.m_game = game;
    this.m_points = game.points;   
    this.m_level = game.level;
    this.m_lastLevelUpPoints = 0;
    this.spawnTickCounter = 0;
    this.strength = 5;  // the strength of the monsters
    this.level = 1; // the level of the game

    //--------------------------------------------------------------------------
    //  Constructor call
    //--------------------------------------------------------------------------

    rune.display.DisplayGroup.call(this, stage);
};

//------------------------------------------------------------------------------
//  Inheritance
//------------------------------------------------------------------------------

poisonedX.entity.Monsters.prototype = Object.create(rune.display.DisplayGroup.prototype);
poisonedX.entity.Monsters.prototype.constructor = poisonedX.entity.Monsters;

//------------------------------------------------------------------------------
// Public prototype methods
//------------------------------------------------------------------------------

/**
 * Creates a new monster at a specific position.
 *
 * @param {number} [x=0] ...
 * @param {number} [y=0] ...
 *
 * @return {undefined}
 */
poisonedX.entity.Monsters.prototype.create = function(x, y) {
    var monster = new poisonedX.entity.Monster(x, y, this.m_game, this.m_bullets, this.strength, this.speed, this);
   
        monster.x = (x || 0) - (monster.width  >> 1);
        monster.y = (y || 0) - (monster.height >> 1);  

    this.addMember(monster);
    return monster; 
};


poisonedX.entity.Monsters.prototype.init = function() {
    rune.display.Sprite.prototype.init.call(this);
    this.m_goreParticles();
};


poisonedX.entity.Monsters.prototype.update = function(step) {
    rune.display.DisplayGroup.prototype.update.call(this, step);
    this.m_points = this.m_game.points; 
    this.m_progression(step);   
};


/**
 * Resets all monsters
 *
 * @return {undefined}
 */
poisonedX.entity.Monsters.prototype.reset = function() { 
    this.removeChildren(); 
};


//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------


/**
 * 
 * Progression of the game and monsters for each level
 * Each level the monsters get stronger and more numerous
 * 
 * 
 * @param {*} step 
 */
poisonedX.entity.Monsters.prototype.m_progression = function(step) {
   if (this.m_points - this.m_lastLevelUpPoints >= 250) { 
    this.level++;
    this.m_lastLevelUpPoints = this.m_points; 
    this.strength++;
    this.amount++;

    if(this.amount >= 10) {
        this.amount = 10;
    };
    };   
};


/**
 * 
 * Creates the gore particles for the monsters
 * 
 */
poisonedX.entity.Monsters.prototype.m_goreParticles = function() {  

    this.bloodEmitter = new rune.particle.Emitter(0, 0, 20, 30, {
        particles: [poisonedX.entity.Particle],
        capacity: 250,
        accelerationY: 0.025,
        maxVelocityX:  1.25,
        minVelocityX: -1.25,
        maxVelocityY: -1.25,
        minVelocityY: -0.85,
        minRotation:  -2,
        maxRotation:   2
    });
    
    this.m_gameStage.addChild(this.bloodEmitter);


    this.goreEmitter = new rune.particle.Emitter(0, 0, 20, 30, {
        particles: [poisonedX.entity.Head, poisonedX.entity.Arm, poisonedX.entity.Leg],
        capacity: 250,
        accelerationY: 0.025,
        maxVelocityX:  1.25,
        minVelocityX: -1.25,
        maxVelocityY: -1.25,
        minVelocityY: -0.85,
        minRotation:  -2,
        maxRotation:   2
    });

    this.m_gameStage.addChild(this.goreEmitter);
};