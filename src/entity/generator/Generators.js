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
poisonedX.entity.Generators = function(stage, monsters, player1, player2, game) {

    //--------------------------------------------------------------------------
    // Public properties
    //--------------------------------------------------------------------------

    /**
     * Maximum number of generators that can exist simultaneously.
     *
     * @type {number} 
     * @default 5
     */
    this.maxNumGenerators = 5;  // 5 generators in total, 1 for each platform

    /**
     * A Generator object.
     * 
     * @type {poisonedX.entity.Generator}
     */
    this.Generator = null;


    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------
    
    this.m_gameStage = stage;   // game stage
    this.m_monsters = monsters; // monsters
    this.m_player1 = player1;  // player 1
    this.m_player2 = player2;  // player 2
    this.m_game = game; // game

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

poisonedX.entity.Generators.prototype = Object.create(rune.display.DisplayGroup.prototype);
poisonedX.entity.Generators.prototype.constructor = poisonedX.entity.Generators;

//------------------------------------------------------------------------------
// Public prototype methods
//------------------------------------------------------------------------------


poisonedX.entity.Generators.prototype.init = function() {
    rune.display.Sprite.prototype.init.call(this);
    this.m_antidoteParticle();
    this.m_checkmarkParticle();
    this.m_metalParticle();
    this.m_vailParticle();  
};



/**
 * Creates a new Generator at a specific position.
 *
 * @param {number} [x=0] ...
 * @param {number} [y=0] ...
 *
 * @return {undefined}
 */
poisonedX.entity.Generators.prototype.create = function(x, y) { 
    var generator = new poisonedX.entity.Generator(x, y, this.m_game, this.m_monsters, this.m_player1, this.m_player2, this);
        generator.x = (x || 0) - (generator.width  >> 1);
        generator.y = (y || 0) - (generator.height >> 1); 

    this.addMember(generator);
    return generator; 
};


poisonedX.entity.Generators.prototype.update = function(step) {
    rune.display.DisplayGroup.prototype.update.call(this, step);
};

/**
 * Removes all the children.
 *
 * @return {undefined}
 */
poisonedX.entity.Generators.prototype.reset = function() {
    this.removeChildren(); 
};



//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------



/**
 * 
 * Initializes the antidote particle emitter object.
 * 
 */
poisonedX.entity.Generators.prototype.m_antidoteParticle = function() {  

    this.antidoteEmitter = new rune.particle.Emitter(0, 0, 20, 30, {
        particles: [poisonedX.entity.Antidoteparticle  ],
        capacity: 250,
        accelerationY: 0.025,
        maxVelocityX:  1.25,
        minVelocityX: -1.25,
        maxVelocityY: -1.25,
        minVelocityY: -0.85,
        minRotation:  -2,
        maxRotation:   2
    });
    
    this.m_gameStage.addChild(this.antidoteEmitter);

};

/**
 * 
 * Initializes the checkmark particle emitter object.
 * 
 */
poisonedX.entity.Generators.prototype.m_checkmarkParticle = function() {  

    this.checkmarkEmitter = new rune.particle.Emitter(0, 0, 20, 30, {
        particles: [poisonedX.entity.Checkmark],
        capacity: 250,
        accelerationY: -0.025,
        maxVelocityX:  1.25,
        minVelocityX: -1.25,
        maxVelocityY: -1.25,
        minVelocityY: -0.85,
        minRotation:  0,
        maxRotation:  0
    });
    
    this.m_gameStage.addChild(this.checkmarkEmitter); 

};

/**
 * 
 * Initializes the metal particle emitter object.
 *
 */
poisonedX.entity.Generators.prototype.m_metalParticle = function() {  

    this.metalEmitter = new rune.particle.Emitter(0, 0, 20, 30, {
        particles: [poisonedX.entity.Nut, poisonedX.entity.Wrench],
        capacity: 250,
        accelerationY: 0.1,
        maxVelocityX:  3,
        minVelocityX: -1.25,
        maxVelocityY: -3,
        minVelocityY: -0.85,
        minRotation:  -2,
        maxRotation:   2
    });
    
    this.m_gameStage.addChild(this.metalEmitter);

};

/**
 * 
 * Initializes the vail particle emitter object.
 * 
 */
poisonedX.entity.Generators.prototype.m_vailParticle = function() {  

    this.vailEmitter = new rune.particle.Emitter(0, 0, 20, 30, {
        particles: [poisonedX.entity.Vailparticle],
        capacity: 250,
        accelerationY: 0.025,
        maxVelocityX:  1.25,
        minVelocityX: -1.25,
        maxVelocityY: -1.25,
        minVelocityY: -0.85,
        minRotation:  -2,
        maxRotation:   2
    });
    
    this.m_gameStage.addChild(this.vailEmitter);

};



