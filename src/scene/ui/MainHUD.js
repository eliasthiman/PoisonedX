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
 * Game scene.
 */
poisonedX.scene.MainHUD = function(x, y, width, height, game) {  



    //--------------------------------------------------------------------------
    // Public properties
    //--------------------------------------------------------------------------


    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------
    
    this.m_game = game; 
    this.m_flashed = false; 

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

poisonedX.scene.MainHUD.prototype = Object.create(rune.display.DisplayObjectContainer.prototype);
poisonedX.scene.MainHUD.prototype.constructor = poisonedX.scene.MainHUD;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @returns {undefined}
 */
poisonedX.scene.MainHUD.prototype.init = function() {
    rune.display.DisplayObjectContainer.prototype.init.call(this);
    this.m_initPlayerHUDs(); 
    this.m_initScoreHUD();  
    this.m_initLevelHUD();  
};

/**
 * ...
 *
 * @param {number} step Fixed time step. 
 *
 * @returns {undefined}
 */
poisonedX.scene.MainHUD.prototype.update = function(step) { 
    rune.display.DisplayObjectContainer.prototype.update.call(this, step);
    this.m_updateScore(step);   
    this.m_updateLevel(step);   
};

/**
 * ...
 *
 * @returns {undefined}
 */
poisonedX.scene.MainHUD.prototype.dispose = function() {
    rune.display.DisplayObjectContainer.prototype.dispose.call(this);
};


//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------


/**
 * 
 * Initializes the player HUDs. For the main HUD that is visible when the 
 * split screen is not.
 * 
 * 
 */
poisonedX.scene.MainHUD.prototype.m_initPlayerHUDs = function() {   

    this.playerHUDs = new poisonedX.scene.PlayerHUDs(this.m_game);
    this.playersHUD = this.playerHUDs.create(); 

    this.player1HUD = this.playersHUD.cookHUD;  
    this.player2HUD = this.playersHUD.repairoHUD;

    this.player1HUD.bottomRight = this.application.screen.bottomRight;
    this.player2HUD.bottomLeft = this.application.screen.bottomLeft;

    this.addChild(this.player1HUD); 
    this.addChild(this.player2HUD);
};

/**
 * 
 * Initializes the score HUD.
 * 
 * 
 */
poisonedX.scene.MainHUD.prototype.m_initScoreHUD = function() { 

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
 * 
 * @param {*} step 
 */
poisonedX.scene.MainHUD.prototype.m_updateScore = function(step) {

    this.scoreHUD.text = String(this.m_game.points);    
};

/**
 * 
 * Initializes the level HUD.
 * 
 */
poisonedX.scene.MainHUD.prototype.m_initLevelHUD = function() { 

    this.levelHUD = new rune.text.BitmapField("LVL:" + String(this.m_game.monsters.level), "PoisonedX_font_red");
    this.levelHUD.topLeft = this.application.screen.topLeft;    
    this.levelHUD.y = this.scoreHUD.y + 20;
    this.levelHUD.x = this.scoreHUD.x
    this.levelHUD.autoSize = true;
    this.levelHUD.scaleX = 0.8;
    this.levelHUD.scaleY = 0.8;
    this.levelHUD.backgroundColor = "#e3ddd1"; 
    this.addChild(this.levelHUD);
};

/**
 * 
 * Updates the level HUD.   
 * 
 * @param {*} step 
 */
poisonedX.scene.MainHUD.prototype.m_updateLevel = function(step) {  

    if (this.previousLevel === undefined) {
        this.previousLevel = this.m_game.monsters.level;
    };
    if (this.m_game.monsters.level > this.previousLevel && this.m_flashed === false) {
        this.levelHUD.flicker.start(2000, 400);
        this.m_flashed = true; 
    };
    this.previousLevel = this.m_game.level;

    if(this.m_game.monsters.level > 10) {
        this.levelHUD.text = "LVL:10+"; 
    } else{
        this.levelHUD.text = "LVL:" + String(this.m_game.monsters.level);
        this.m_flashed = false;
    };
};