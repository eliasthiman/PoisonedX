//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends poisonedX.entity.Sprite
 *
 * @param {number} x ...
 * @param {number} y ...
 *
 * @class
 * @classdesc
 * 
 * Represents a bullet.
 */
poisonedX.entity.Bullet = function(x, y, flippedX, name, playerAtkDmg) { 

//--------------------------------------------------------------------------
// Public properties
//--------------------------------------------------------------------------

/**
 * The amount of damage the bullet causes.
 *
 * @type {number}
 * @default 20
 */
this.damage = playerAtkDmg;

/**
 * The orientation of the bullet.
 * 
 * @type {boolean}
 * 
 */
this.flippedX = flippedX;
this.playerName = name;


//--------------------------------------------------------------------------
// Protected properties
//--------------------------------------------------------------------------

/**
 * The speed of the bullet.
 *
 * @type {number}
 * @protected
 */
this.m_speed = 6;


/**
 * The monsters object.
 * 
 * @type {poisonedX.entity.Monsters}
 * @protected
 */

this.m_playerName = name;
this.m_bulletSprite = null;
this.m_width = null;
this.m_height = null;   

/**
 * 
 * Determines the bullet sprite and size based on the player name.
 * 
 */
switch(this.m_playerName){
    case "Cook":
        this.m_bulletSprite = "bullet";
        this.m_speed = 6;
        this.m_width = 16;
        this.m_height = 16;
        break;
    case "Repairo":
        this.m_bulletSprite = "melee"; 
        this.m_speed = 6;
        this.m_width = 32;
        this.m_height = 32;
        break;
}

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * ...
     */
    rune.display.Sprite.call(this, x, y, this.m_width, this.m_height, this.m_bulletSprite);
};

//------------------------------------------------------------------------------
//  Inheritance
//------------------------------------------------------------------------------

poisonedX.entity.Bullet.prototype = Object.create(rune.display.Sprite.prototype);
poisonedX.entity.Bullet.prototype.constructor = poisonedX.entity.Bullet;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------


/**
 * ...
 *
 * @returns {undefined}
 */
poisonedX.entity.Bullet.prototype.init = function() {
    this.m_initHitbox();
};


/**
 * @inheritDoc
 */
poisonedX.entity.Bullet.prototype.update = function(step) {
    rune.display.Sprite.prototype.update.call(this, step);
    this.m_updateMotion(step);
};


poisonedX.entity.Bullet.prototype.dispose = function() {
    rune.display.Sprite.prototype.dispose.call(this);
}; 



//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------

/**
 * Calculates the motion of the bullet and disposes it if it's out of bounds.   
 *
 * @param {number} step ...
 *
 * @return {undefined}
 * @private
 */
poisonedX.entity.Bullet.prototype.m_updateMotion = function(step) {
    this.velocity.x = this.flippedX ? this.m_speed * -1 : this.m_speed; 

    if(this.x > 800 || this.x < -800){
        this.dispose(); 
    };   
};


/**
 * 
 * Initiates the bullet's hitbox.
 * 
 * 
 */
poisonedX.entity.Bullet.prototype.m_initHitbox = function() {
    this.hitbox.debug = false;
    if(this.m_playerName == "Cook"){
        this.hitbox.set(
            9,
            5, 
            6,
            6
        );
    }
    else if(this.m_playerName == "Repairo"){
        this.hitbox.set(
            0,
            0, 
            32,
            32
        );
    };
};



