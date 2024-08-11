//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new instance of the Main class.
 *
 * @constructor
 * 
 * @class
 * @classdesc
 * 
 * Entry point class.
 */
poisonedX.system.Main = function() {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * Extend (Rune) Application.
     */
    rune.system.Application.call(this, {
        developer: "se.lnu",
        app: "poisonedX",
        build: "0.0.0",
        scene: poisonedX.scene.Menu,
        resources: poisonedX.data.Requests,
        useGamepads:true,
        useKeyboard:true,
        framerate: 60,
        debug: false,
    });
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

poisonedX.system.Main.prototype = Object.create(rune.system.Application.prototype);  
poisonedX.system.Main.prototype.constructor = poisonedX.system.Main;