
//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new poisonedX particle instance.
 *
 * @constructor
 * @extends rune.particle.Particle
 *
 * @class
 * @classdesc
 * 
 * 
 */
poisonedX.entity.Head = function() {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * Extend rune.particle.Particle.
     */
    rune.particle.Particle.call(this, 0, 0, 24, 24, "Head");
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

poisonedX.entity.Head.prototype = Object.create(rune.particle.Particle.prototype);
poisonedX.entity.Head.prototype.constructor = poisonedX.entity.Head; 

//--------------------------------------------------------------------------
// Override public prototype methods
//--------------------------------------------------------------------------

/**
 * @override
 */
poisonedX.entity.Head.prototype.init = function() {
    rune.particle.Particle.prototype.init.call(this);
};

/**
 * @override
 */
poisonedX.entity.Head.prototype.update = function(step) {
    rune.particle.Particle.prototype.update.call(this, step); 
};