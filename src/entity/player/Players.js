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
 */

poisonedX.entity.Players = function(stage, bullets, monsters, generators, game) {

    //--------------------------------------------------------------------------
    // Public properties
    //--------------------------------------------------------------------------

    /**
     * A Player object.
     * 
     * @type {poisonedX.entity.Player} 
     */
    this.player = null; 

    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------

   /// Personal properties ///////////////////
    this.m_alive = true;
    this.m_immortal = false;
    this.m_time = null;
    this.m_repairLength = null; 
    this.m_falling = false; 
    this.m_fallTicker = 0;
   //////////////////////////////////////////


   // Reference to other objects ////////////
    this.m_gameStage = stage;
    this.m_game = game; 
    this.m_bullets = bullets;
    this.m_monsters = monsters;
    this.m_generators = generators;
   //////////////////////////////////////////
    
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

poisonedX.entity.Players.prototype = Object.create(rune.display.DisplayGroup.prototype);
poisonedX.entity.Players.prototype.constructor = poisonedX.entity.Players;

//------------------------------------------------------------------------------
// Public prototype methods
//------------------------------------------------------------------------------

/**
 * Creates a new player at a specific position.
 *
 * @param {number} [x=0] ...
 * @param {number} [y=0] ...
 *
 * @return {undefined}
 */
poisonedX.entity.Players.prototype.create = function(x, y) {
    var xPos = (x || 0);
    var yPos = (y || 0);

    var Cook = new poisonedX.entity.Cook(x, y, this.m_game, this.m_gameStage, this.m_bullets, this.m_generators, this.m_monsters);  
    var Repairo = new poisonedX.entity.Repairo(x, y, this.m_game, this.m_gameStage, this.m_bullets, this.m_generators, this.m_monsters);

    Cook.x = xPos - (Cook.width  >> 1); 
    Cook.y = yPos - (Cook.height >> 1); 

    Repairo.x = xPos - (Repairo.width  >> 1);
    Repairo.y = yPos - (Repairo.height >> 1);  

    this.addMember(Cook);
    this.addMember(Repairo);    

    return {cook: Cook, repairo: Repairo}; 
};


poisonedX.entity.Players.prototype.update = function(step) {
    rune.display.DisplayGroup.prototype.update.call(this, step); 
  
};


/**
 * Resets all Players
 *
 * @return {undefined}
 */
poisonedX.entity.Players.prototype.reset = function() { 
    this.removeChildren(); 
};