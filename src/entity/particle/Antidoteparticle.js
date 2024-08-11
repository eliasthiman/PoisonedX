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
poisonedX.entity.Antidoteparticle = function() {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * Extend rune.particle.Particle.
     */
    rune.particle.Particle.call(this, 0, 0, 16, 16, "antidote_particle");
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

poisonedX.entity.Antidoteparticle.prototype = Object.create(rune.particle.Particle.prototype);
poisonedX.entity.Antidoteparticle.prototype.constructor = poisonedX.entity.Antidoteparticle; 


//--------------------------------------------------------------------------
// Override public prototype methods
//--------------------------------------------------------------------------

/**
 * @override
 */
poisonedX.entity.Antidoteparticle.prototype.init = function() {
    rune.particle.Particle.prototype.init.call(this);
};

/**
 * @override
 */
poisonedX.entity.Antidoteparticle.prototype.update = function(step) {
    rune.particle.Particle.prototype.update.call(this, step); 
};



