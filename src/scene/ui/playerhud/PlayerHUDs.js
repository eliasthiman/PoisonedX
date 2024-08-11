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
 * Represents a handler for all player HUDs.
 */
poisonedX.scene.PlayerHUDs = function(game) {

    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------
    
  
    this.m_gameStage = game.stage;
    this.m_game = game;
    this.m_player1 = game.player1;
    this.m_player2 = game.player2;
        

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

poisonedX.scene.PlayerHUDs.prototype = Object.create(rune.display.DisplayGroup.prototype);
poisonedX.scene.PlayerHUDs.prototype.constructor = poisonedX.scene.PlayerHUDs; 

//------------------------------------------------------------------------------
// Public prototype methods
//------------------------------------------------------------------------------

/**
 * Creates the player HUDs.
 *
 * @param {number} [x=0] ...
 * @param {number} [y=0] ...
 *
 * @return {undefined}
 */
poisonedX.scene.PlayerHUDs.prototype.create = function(x, y) {
    
    var CookHUD = new poisonedX.scene.PlayerHUD(x, y, "CookHUD", this.m_game, this.m_player1);
    var RepairoHUD = new poisonedX.scene.PlayerHUD(x, y, "RepairoHUD", this.m_game, this.m_player2);

        CookHUD.x = (x || 0) - (CookHUD.width  >> 1);
        CookHUD.y = (y || 0) - (CookHUD.height >> 1); 

        RepairoHUD.x = (x || 0) - (RepairoHUD.width  >> 1);
        RepairoHUD.y = (y || 0) - (RepairoHUD.height >> 1);

    return {cookHUD: CookHUD, repairoHUD: RepairoHUD}; 
};


poisonedX.scene.PlayerHUDs.prototype.update = function(step) {
    rune.display.DisplayGroup.prototype.update.call(this, step);
    
};


/**
 * Resets HUDs.
 *
 * @return {undefined}
 */
poisonedX.scene.PlayerHUDs.prototype.reset = function() {
    this.removeChildren(); 
};







