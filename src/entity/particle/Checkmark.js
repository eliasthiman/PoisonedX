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
poisonedX.entity.Checkmark = function() {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * Extend rune.particle.Particle.
     */
    rune.particle.Particle.call(this, 0, 0, 24, 24, "check2");
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

poisonedX.entity.Checkmark.prototype = Object.create(rune.particle.Particle.prototype);
poisonedX.entity.Checkmark.prototype.constructor = poisonedX.entity.Checkmark; 


//--------------------------------------------------------------------------
// Override public prototype methods
//--------------------------------------------------------------------------

/**
 * @override
 */
poisonedX.entity.Checkmark.prototype.init = function() {
    rune.particle.Particle.prototype.init.call(this);
};

/**
 * @override
 */
poisonedX.entity.Checkmark.prototype.update = function(step) {
    rune.particle.Particle.prototype.update.call(this, step); 
};