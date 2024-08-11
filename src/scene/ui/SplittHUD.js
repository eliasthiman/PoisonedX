//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.display.DisplayObjectContainer
 *
 * @class
 * @classdesc
 * 
 * 
 * Represents a splitted HUD for a player.
 * 
 */
poisonedX.scene.SplittHUD = function(x, y, width, height, player, game) {  

    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------
    
    this.m_player = player;
    this.m_game = game; 
    
    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * Calls the constructor method of the super class.
     */
    rune.display.DisplayObjectContainer.call(this, x, y, width, height); 
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

poisonedX.scene.SplittHUD.prototype = Object.create(rune.display.DisplayObjectContainer.prototype);
poisonedX.scene.SplittHUD.prototype.constructor = poisonedX.scene.SplittHUD;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @returns {undefined}
 */
poisonedX.scene.SplittHUD.prototype.init = function() {
    rune.display.DisplayObjectContainer.prototype.init.call(this);
    this.m_initPlayerHUD(); 
    this.m_initScoreHUD();    
};

/**
 * ...
 *
 * @param {number} step Fixed time step. 
 *
 * @returns {undefined}
 */
poisonedX.scene.SplittHUD.prototype.update = function(step) { 
    rune.display.DisplayObjectContainer.prototype.update.call(this, step);
    this.m_updateScore(step);
};

/**
 * ...
 *
 * @returns {undefined}
 */
poisonedX.scene.SplittHUD.prototype.dispose = function() {
    rune.display.DisplayObjectContainer.prototype.dispose.call(this);
};


//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------


/**
 * 
 * Creates the player HUD and positions it depending on the player.
 * 
 */
poisonedX.scene.SplittHUD.prototype.m_initPlayerHUD = function() {  

    if(this.m_player.name == "Cook") {
        this.m_sprite = "CookHUD"; 
    }else {
        this.m_sprite = "RepairoHUD";
    };
    
    this.playerHUD = new poisonedX.scene.PlayerHUD(0, 0, this.m_sprite, this.m_game, this.m_player); 
    this.playerHUD.bottomLeft = this.application.screen.bottomLeft; 

    if(this.m_sprite == "CookHUD"){
        this.playerHUD.bottomRight = this.application.screen.bottomRight; 
        this.playerHUD.x -= 200;
    };

    this.addChild(this.playerHUD);  

};

/**
 * 
 * Initializes the score HUD for the players splitted HUD.
 * 
 */
poisonedX.scene.SplittHUD.prototype.m_initScoreHUD = function() { 
    this.scoreHUD = new rune.text.BitmapField(String(this.m_game.points), "PoisonedX_font_red");
    this.scoreHUD.topLeft = this.application.screen.topLeft;    
    this.scoreHUD.y += 10;
    this.scoreHUD.x += 10;
    this.scoreHUD.autoSize = true;
    this.scoreHUD.scaleX = 0.8;
    this.scoreHUD.scaleY = 0.8;
    this.scoreHUD.backgroundColor = "#e3ddd1"; 
    this.addChild(this.scoreHUD);
};

/**
 * 
 * Updates the score HUD.
 * @param {*} step 
 */
poisonedX.scene.SplittHUD.prototype.m_updateScore = function(step) {
    this.scoreHUD.text = String(this.m_game.points);    
};