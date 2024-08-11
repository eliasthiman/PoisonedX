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
 * Represents a powerup icon.
 * 
 */
poisonedX.entity.PowerupIcon = function(x, y, sprite, game) {  

    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------
    
    this.m_game = game; 
    this.m_sprite = sprite;

    //-------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * Calls the constructor method of the super class.
     */
    rune.display.Sprite.call(this, x, y, 20, 20, this.m_sprite); 
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

poisonedX.entity.PowerupIcon.prototype = Object.create(rune.display.Sprite.prototype);
poisonedX.entity.PowerupIcon.prototype.constructor = poisonedX.entity.PowerupIcon;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @returns {undefined}
 */
poisonedX.entity.PowerupIcon.prototype.init = function() {
    rune.display.Sprite.prototype.init.call(this);
    this.m_initHitbox();
};

/**
 * ...
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
poisonedX.entity.PowerupIcon.prototype.update = function(step) {
    rune.display.Sprite.prototype.update.call(this, step); 
};

/**
 * ...
 *
 * @returns {undefined}
 */
poisonedX.entity.PowerupIcon.prototype.dispose = function() {
    rune.display.Sprite.prototype.dispose.call(this);
};


//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------


poisonedX.entity.PowerupIcon.prototype.m_initHitbox = function() {
    this.hitbox.debug = false;
    this.hitbox.set(
        0,
        0, 
        20,
        20
    );
};









