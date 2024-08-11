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
 */
poisonedX.scene.ScoreHUD = function(x, y, game) {  

    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------
    
    this.m_game = game;  
    this.m_score = game.points;
    
    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * Calls the constructor method of the super class.
     */
    rune.display.Sprite.call(this, x, y, 80, 40, "Score_UI"); 
};  

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

poisonedX.scene.ScoreHUD.prototype = Object.create(rune.display.Sprite.prototype);
poisonedX.scene.ScoreHUD.prototype.constructor = poisonedX.scene.ScoreHUD;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @returns {undefined}
 */
poisonedX.scene.ScoreHUD.prototype.init = function() {
    rune.display.Sprite.prototype.init.call(this);
    this.m_initHitbox();
    this.m_initScoreDisplay();
    
};

/**
 * ...
 *
 * @param {number} step Fixed time step. 
 *
 * @returns {undefined}
 */
poisonedX.scene.ScoreHUD.prototype.update = function(step) { 
    rune.display.Sprite.prototype.update.call(this, step);
    this.m_updateScore(step); 
};

/**
 * ...
 *
 * @returns {undefined}
 */
poisonedX.scene.ScoreHUD.prototype.dispose = function() {
    rune.display.Sprite.prototype.dispose.call(this);
};


//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------

poisonedX.scene.ScoreHUD.prototype.m_initHitbox = function() {
    this.hitbox.debug = false;
    this.hitbox.set(
        0,
        0, 
        80,
        40
    );
};

/**
 * 
 * Creates the bitmapfield object for the score display.
 * 
 */
poisonedX.scene.ScoreHUD.prototype.m_initScoreDisplay = function() {

    this.scoreText = new rune.text.BitmapField("P", "PoisonedX_font_red");
    this.scoreText.autosize = true; 
    this.scoreText.x = 0;
    this.scoreText.y = 0;
    this.scoreText.debug = false;  
    this.addChild(this.scoreText); 
};

/**
 * 
 * Updates the score display.
 * 
 * @type {*} step
 */
poisonedX.scene.ScoreHUD.prototype.m_updateScore = function(step) {

    this.scoreText.text = String(this.m_score); 
};


