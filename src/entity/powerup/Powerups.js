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
poisonedX.entity.Powerups = function(monster, game) {

  
    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------
    
    this.m_gameStage = game.stage;     
    this.m_game = game; 
    this.m_monster = monster;                



    //--------------------------------------------------------------------------
    //  Constructor call
    //--------------------------------------------------------------------------
    
    /**
     *  ...
     */
    rune.display.DisplayGroup.call(this, this.m_gameStage);
};

//------------------------------------------------------------------------------
//  Inheritance
//------------------------------------------------------------------------------

poisonedX.entity.Powerups.prototype = Object.create(rune.display.DisplayGroup.prototype);
poisonedX.entity.Powerups.prototype.constructor = poisonedX.entity.Powerups;

//------------------------------------------------------------------------------
// Public prototype methods
//------------------------------------------------------------------------------

/**
 * Creates the powerup object and adds it to the display.
 * The powerup is dropped by the monster and picked up by the player.
 * The powerupType is determined randomly. 
 *
 * @param {number} [x=0] ...
 * @param {number} [y=0] ...
 *
 * @return {undefined}
 */
poisonedX.entity.Powerups.prototype.create = function(x, y) {

    var powerupTypes = ["doublePoints","repairFaster","strongWeapon"];
    var powerupType = powerupTypes[Math.floor(Math.random() * powerupTypes.length)];    

    var powerup = new poisonedX.entity.Powerup(x, y, powerupType);
        this.m_game.player1.powerups.push(powerup); 
        this.m_game.player2.powerups.push(powerup);
        powerup.x = (x || 0) - (powerup.width  >> 1);
        powerup.y = (y || 0) - (powerup.height >> 1); 

    this.addMember(powerup); 

    return powerup; 
};


poisonedX.entity.Powerups.prototype.update = function(step) {
    rune.display.DisplayGroup.prototype.update.call(this, step);
};


/**
 * Resets all powerups.
 *
 * @return {undefined}
 */
poisonedX.entity.Powerups.prototype.reset = function() {
    this.removeChildren(); 
};

