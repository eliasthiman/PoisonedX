
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
poisonedX.entity.Leg = function() {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * Extend rune.particle.Particle.
     */
    rune.particle.Particle.call(this, 0, 0, 24, 24, "Leg");
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

poisonedX.entity.Leg.prototype = Object.create(rune.particle.Particle.prototype);
poisonedX.entity.Leg.prototype.constructor = poisonedX.entity.Leg; 

//--------------------------------------------------------------------------
// Override public prototype methods
//--------------------------------------------------------------------------

/**
 * @override
 */
poisonedX.entity.Leg.prototype.init = function() {
    rune.particle.Particle.prototype.init.call(this);
};

/**
 * @override
 */
poisonedX.entity.Leg.prototype.update = function(step) {
    rune.particle.Particle.prototype.update.call(this, step); 
};