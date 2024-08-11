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
poisonedX.entity.Bullets = function(stage) {

    //--------------------------------------------------------------------------
    // Public properties
    //--------------------------------------------------------------------------

    /**
     * Maximum number of bullets that can exist simultaneously.
     *
     * @type {number}
     * @default 10
     */
    this.maxNumBullets = 10;

    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------
    
    /**
     * Sound for when a new bullet is created.
     *
     * @type {rune.media.Sound}
     * @private
     */
    this.m_pistolShot = this.application.sounds.sound.get("pistolShot");
    this.m_rifleShot = this.application.sounds.sound.get("rifleShot"); 

    //--------------------------------------------------------------------------
    //  Constructor call
    //--------------------------------------------------------------------------
    
    /**
     *  ...
     */
    rune.display.DisplayGroup.call(this, stage);
};

//------------------------------------------------------------------------------
//  Inheritance
//------------------------------------------------------------------------------

poisonedX.entity.Bullets.prototype = Object.create(rune.display.DisplayGroup.prototype);
poisonedX.entity.Bullets.prototype.constructor = poisonedX.entity.Bullets;

//------------------------------------------------------------------------------
// Public prototype methods
//------------------------------------------------------------------------------

/**
 * Creates a new bullet at a specific position.
 * And plays a sound effect depending on the player's name and attack damage.
 *
 * @param {number} [x=0] ...
 * @param {number} [y=0] ...
 *
 * @return {undefined} 
 */
poisonedX.entity.Bullets.prototype.create = function(x, y, flippedX, name, playerAtkDmg) {
    if (this.numChildren == this.maxNumBullets) {
        this.removeChild(this.getChildAt(0));
    }

    var bullet = new poisonedX.entity.Bullet(x, y, flippedX, name, playerAtkDmg);
        bullet.x = (x || 0) - (bullet.width  >> 1);
        bullet.y = (y || 0) - (bullet.height >> 1);

    this.addMember(bullet);
       
    if(name == "Cook" && playerAtkDmg == 20){ 
    this.m_pistolShot.play(true);
    }
    else if(name == "Cook" && playerAtkDmg == 40){
    this.m_rifleShot.play(true);
    }
    else if(name == "Repairo"){ 
    this.m_pistolShot.play(true);
    };	    

    return bullet;
};

/**
 * Resets all bullets.
 *
 * @return {undefined}
 */
poisonedX.entity.Bullets.prototype.reset = function() {
    this.removeChildren();
};