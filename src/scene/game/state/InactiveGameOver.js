//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.scene.Scene
 *
 * @class
 * @classdesc
 * 
 * InactiveGameOver scene.
 */
poisonedX.scene.InactiveGameOver = function() { 

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    this.m_gamepad = this.gamepads.get(0);

   
    
    //this.m_inactiveGameOver = inactiveGameOver; 

    /**
     * Calls the constructor method of the super class.
     */
    rune.scene.Scene.call(this);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

poisonedX.scene.InactiveGameOver.prototype = Object.create(rune.scene.Scene.prototype);
poisonedX.scene.InactiveGameOver.prototype.constructor = poisonedX.scene.InactiveGameOver;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * This method is automatically executed once after the scene is instantiated. 
 * The method is used to create objects to be used within the scene. 
 *
 * @returns {undefined}
 */
poisonedX.scene.InactiveGameOver.prototype.init = function() {
    rune.scene.Scene.prototype.init.call(this);
    this.m_initGameOverlay();   
};

/**
 * This method is automatically executed once per "tick". The method is used for 
 * calculations such as application logic.
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
poisonedX.scene.InactiveGameOver.prototype.update = function(step) {
    rune.scene.Scene.prototype.update.call(this, step);
    this.m_updateInput(step);
};

/**
 * This method is automatically called once just before the scene ends. Use 
 * the method to reset references and remove objects that no longer need to 
 * exist when the scene is destroyed. The process is performed in order to 
 * avoid memory leaks.
 *
 * @returns {undefined}
 */
poisonedX.scene.InactiveGameOver.prototype.dispose = function() {
    rune.scene.Scene.prototype.dispose.call(this);
};

/**
 * 
 * This method is used to update the input for the scene.
 * Loads the SaveScore scene when the start button is pressed.
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
poisonedX.scene.InactiveGameOver.prototype.m_updateInput = function(step) {

    var gamepad = this.m_gamepad;

    if (gamepad.justPressed(9)) {
        this.application.scenes.load([new poisonedX.scene.Menu()]); 
    };  
}; 

/**
 * 
 * Creates objects for the game overlay.
 * 
 */
poisonedX.scene.InactiveGameOver.prototype.m_initGameOverlay = function() {

    this.graphic = new rune.display.Graphic(this.centerX, this.centerY, 400, 225, "background_no_text");
    this.stage.addChild(this.graphic);

    this.gameOver = new rune.display.Graphic(this.graphic.x + 50 , this.graphic.y + 30, 300, 100, "game_over");
    this.stage.addChild(this.gameOver);

    this.t1 = new rune.text.BitmapField("YOUR FRIEND WAS INACTIVE", "PoisonedX_font_white"); 
    this.t1.autoSize = true;
    this.t1.x = this.gameOver.x - 41;
    this.t1.y = this.gameOver.y + 110;
    this.stage.addChild(this.t1);

    this.t2 = new rune.text.BitmapField("PRESS START FOR MENU", "PoisonedX_font_white"); 
    this.t2.autoSize = true;
    this.t2.x = this.t1.x + 30;
    this.t2.y = this.t1.y + 40;   
    this.t2.flicker.start(20000000, 400); 
    this.stage.addChild(this.t2); 

    this.backgroundmusic = this.application.sounds.music.get("gameover");
    this.backgroundmusic.play(false);


    this.cameras.getCameraAt(0).bounderies = new rune.geom.Rectangle(0, 0, 448, 608);  
    this.cameras.getCameraAt(0).targets.add(this.graphic); 
};














