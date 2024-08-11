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
 * 
 * The powerup is dropped by the monster and picked up by the player.
 * 
 */
poisonedX.entity.Powerup = function(x, y, type) { 


    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------
    

    this.powerupType = type; // the powerup type that is determined by the Powerups class.

    this.m_effect = null;  
    this.m_ticker = 0;

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * Calls the constructor method of the super class.
     */
    rune.display.Sprite.call(this, x, y, 24, 24, this.powerupType); 
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

poisonedX.entity.Powerup.prototype = Object.create(rune.display.Sprite.prototype);
poisonedX.entity.Powerup.prototype.constructor = poisonedX.entity.Powerup;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * Initializes the powerup's methods
 *
 * @returns {undefined}
 */
poisonedX.entity.Powerup.prototype.init = function() {
    rune.display.Sprite.prototype.init.call(this);
    this.m_initPhysics();
    this.m_initAnimation();
    this.m_initHitbox();
    this.m_initPowerupEffects();

};

/**
 * Updates the powerup.
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
poisonedX.entity.Powerup.prototype.update = function(step) {
    rune.display.Sprite.prototype.update.call(this, step);
   // this.m_updateAnimation(step);
    this.m_updateStatus(step); 

};

/**
 * disposes the powerup.
 *
 * @returns {undefined}
 */
poisonedX.entity.Powerup.prototype.dispose = function() {
    rune.display.Sprite.prototype.dispose.call(this);
};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------

/**
 * Initializes the powerup physics.
 *
 * @returns {undefined}
 * @private
 */
poisonedX.entity.Powerup.prototype.m_initPhysics = function() {
    this.velocity.drag.x = 0.05;
    this.velocity.drag.y = 0.05;
    this.velocity.max.x = 1.8;
    this.velocity.max.y = 1.8; 
};

/**
 * 
 * Initializes the powerup hitbox.
 * 
 */
poisonedX.entity.Powerup.prototype.m_initHitbox = function() { 
    this.hitbox.debug = false;
    this.hitbox.set(
        0,
        0, 
        24,
        24
    );
};

/**
 * Initializes the powerup animation.
 *
 * @returns {undefined}
 * @private
 */
poisonedX.entity.Powerup.prototype.m_initAnimation = function() {
    this.animation.create("idle", [0,1,2,3,4,5], 10, true);
};

/**
 * 
 * Detirmines the effect of the powerup.
 * 
 */
poisonedX.entity.Powerup.prototype.m_initPowerupEffects = function() {   

    switch(this.powerupType) {
        case "doublePoints":
            this.m_effect = 2;
            break;
        case "repairFaster":
            this.m_effect = 2; 
            break;
        case "strongWeapon":
            this.m_effect = 2;
            break;
        default:
            this.m_effect = "health"; 
    };
};

/**
 * 
 * If the powerup has not been picked up within 1200 frames, it will be removed.
 * 
 * @param {*} step 
 */
poisonedX.entity.Powerup.prototype.m_updateStatus = function(step) {

    this.m_ticker++;
    if(this.m_ticker == 1000) {  
        this.flicker.start(10000, 60);
    };
    if(this.m_ticker >= 1200) {  
        this.dispose();
    };
};


