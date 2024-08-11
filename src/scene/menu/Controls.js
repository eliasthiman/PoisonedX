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
 poisonedX.scene.Controls = function () {
    this.m_gamepad = this.gamepads.get(0);
    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    /**
     * Calls the constructor method of the super class.
     */
    rune.scene.Scene.call(this);
};
//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------
poisonedX.scene.Controls.prototype = Object.create(rune.scene.Scene.prototype);
poisonedX.scene.Controls.prototype.constructor = poisonedX.scene.Controls;
//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------
/**
 * This method is automatically executed once after the scene is instantiated. 
 * The method is used to create objects to be used within the scene.
 *
 * @returns {undefined}
 */
poisonedX.scene.Controls.prototype.init = function () {
    rune.scene.Scene.prototype.init.call(this);
    this.controlsGraphic = new rune.display.Graphic(this.centerX, this.centerY, 400, 225, "controls");
    this.stage.addChild(this.controlsGraphic);
};
/**
 * This method is automatically executed once per "tick". The method is used for 
 * calculations such as application logic.
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
poisonedX.scene.Controls.prototype.update = function (step) {
    rune.scene.Scene.prototype.update.call(this, step);
    if (this.m_gamepad.justPressed(1)) {
        this.application.scenes.load([new poisonedX.scene.Menu()
        ]);
    }
};
/**
 * This method is automatically called once just before the scene ends. Use 
 * the method to reset references and remove objects that no longer need to 
 * exist when the scene is destroyed. The process is performed in order to 
 * avoid memory leaks.
 *
 * @returns {undefined}
 */
poisonedX.scene.Controls.prototype.dispose = function () {
    rune.scene.Scene.prototype.dispose.call(this);
};
