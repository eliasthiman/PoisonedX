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
 * Game scene.
 */
 poisonedX.scene.Howtoplay = function () {
    this.m_gamepad = this.gamepads.get(0);
    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    this.m_currentSlide = 0;
    /**
     * Calls the constructor method of the super class.
     */
    rune.scene.Scene.call(this);
};
//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------
poisonedX.scene.Howtoplay.prototype = Object.create(rune.scene.Scene.prototype);
poisonedX.scene.Howtoplay.prototype.constructor = poisonedX.scene.Howtoplay;
//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------
/**
 * This method is automatically executed once after the scene is instantiated. 
 * The method is used to create objects to be used within the scene.
 *
 * @returns {undefined}
 */
poisonedX.scene.Howtoplay.prototype.init = function () {
    rune.scene.Scene.prototype.init.call(this);
    this.m_initGraphics();
};
/**
 * This method is automatically executed once per "tick". The method is used for 
 * calculations such as application logic.
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
poisonedX.scene.Howtoplay.prototype.update = function (step) {
    rune.scene.Scene.prototype.update.call(this, step);
    this.m_menuControll(step);  
};


/**
 * This method is automatically called once just before the scene ends. Use 
 * the method to reset references and remove objects that no longer need to 
 * exist when the scene is destroyed. The process is performed in order to 
 * avoid memory leaks.
 *
 * @returns {undefined}
 */
poisonedX.scene.Howtoplay.prototype.dispose = function () {
    rune.scene.Scene.prototype.dispose.call(this);
};

poisonedX.scene.Howtoplay.prototype.selectOption = function (option) {
   
}
///////////////////////////////////////////////////////////////////////////
//                      Private methods                                 //    
/////////////////////////////////////////////////////////////////////////

/**
 * 
 * Creates the graphics for the how to play scene.
 * 
 * 
 */
poisonedX.scene.Howtoplay.prototype.m_initGraphics = function () {  

    this.m_slides = [];
    var slideNames = ["first_slide", "second_slide", "third_slide", "fourth_slide", "fifth_slide", "sixth_slide", "seventh_slide"];
    for (var i = 0; i < slideNames.length; i++) {
        this.m_slides.push(new rune.display.Graphic(this.centerX, this.centerY, 400, 225, slideNames[i]));
    };
};

/**
 * 
 * Controlls the how to play scene.
 * 
 * @param {*} step 
 */
poisonedX.scene.Howtoplay.prototype.m_menuControll = function (step) {
    
    if (this.m_gamepad.justPressed(1)) {
        this.m_currentSlide--;
    };
    if (this.m_gamepad.justPressed(0)) {
        this.m_currentSlide++;
    };
    if (this.m_currentSlide < 0 || this.m_currentSlide > 6) {
        this.application.scenes.load([new poisonedX.scene.Menu()]);
    } else {
        this.stage.addChild(this.m_slides[this.m_currentSlide]);
    };
};


