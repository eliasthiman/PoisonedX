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
 */
poisonedX.entity.Wrench = function() {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * Extend rune.particle.Particle.
     */
    rune.particle.Particle.call(this, 0, 0, 16, 16, "wrench");
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

poisonedX.entity.Wrench.prototype = Object.create(rune.particle.Particle.prototype);
poisonedX.entity.Wrench.prototype.constructor = poisonedX.entity.Wrench; 

//--------------------------------------------------------------------------
// Override public prototype methods
//--------------------------------------------------------------------------

/**
 * @override
 */
poisonedX.entity.Wrench.prototype.init = function() {
    rune.particle.Particle.prototype.init.call(this);
};

/**
 * @override
 */
poisonedX.entity.Wrench.prototype.update = function(step) {
    rune.particle.Particle.prototype.update.call(this, step); 
};