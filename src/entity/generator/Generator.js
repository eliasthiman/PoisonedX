//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.display.Sprite
 *
 * @class
 * @classdesc
 * 
 * Game scene.
 */
poisonedX.entity.Generator = function(x, y, game, monsters, player1, player2, generators) { 


//--------------------------------------------------------------------------
// Public properties
//--------------------------------------------------------------------------

this.broken = false; // If the generator is broken
this.charged = false; // If the generator is charged
this.healthArray = []; // Array to store the health of the generator
this.healthPoints = 20; // Health points that the generator gives to the player (aka time).

//--------------------------------------------------------------------------
// Private properties
//--------------------------------------------------------------------------

/**
 * 
 * Represents the health of the Generator.
 * 
 * @type {number} 
 * @private
 */

this.health = 100; 
this.oldHealth = this.health;


/**
 * 
 * 
 *  Represents the strength of the Generator.
 * 
 *  @type {number}
 *  @private
 * 
 */

this.m_strength = 10;

this.m_game = game; // game
this.m_monsters = monsters; // monsters
this.m_generators = generators; // generators
this.cook = player1; // player1
this.repairo = player2;  // player2
this.m_immortal = false; // Immortality for the generator
this.m_charging = false; // If the generator is charging   
this.m_chargingTicker = 0; // Charging ticker
this.m_tickCounter = 0; // Tick counter
this.m_chargingTime = 15;  // Charging time

this.m_repair = this.application.sounds.sound.get("repair");   // Repair sound
this.m_genReady = this.application.sounds.sound.get("genReady");   // Generator repaired sound

//--------------------------------------------------------------------------
// Super call
//--------------------------------------------------------------------------

/**
 * Calls the constructor method of the super class.
 */
rune.display.Sprite.call(this, x, y, 80, 100, "new_generator"); 
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

poisonedX.entity.Generator.prototype = Object.create(rune.display.Sprite.prototype);
poisonedX.entity.Generator.prototype.constructor = poisonedX.entity.Generator;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @returns {undefined}
 */
poisonedX.entity.Generator.prototype.init = function() {
    rune.display.Sprite.prototype.init.call(this);
    this.m_initPhysics();
    this.m_initAnimation();
    this.m_initHitbox();
    this.progressBar = new rune.ui.Progressbar(50, 5, "#000000", "#5f7b53"); 
    this.progressBar.y += 10; 
    this.progressBar.x += 15;
    this.addChild(this.progressBar); 

};

/**
 * ...
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
poisonedX.entity.Generator.prototype.update = function(step) {
    rune.display.Sprite.prototype.update.call(this, step);
    this.m_updateCollision(step); 
    this.m_updateSprite(step); 
    this.m_charge(step);
    this.m_updateProgressbar(step); 
    this.m_updateTimer(step);   
};

/**
 * ...
 *
 * @returns {undefined}
 */
poisonedX.entity.Generator.prototype.dispose = function() {
    rune.display.Sprite.prototype.dispose.call(this);
};


/**
 * 
 * @param {Number} playerRepPow 
 * 
 * Repairs the generator with the player's repair power for each time the player presses the repair button.
 * 
 */
poisonedX.entity.Generator.prototype.repair = function(playerRepPow) {

    if(this.broken || this.health <= 100){
        if(this.health !== this.oldHealth){
            this.oldHealth = this.health;
        }
        if(this.healthArray.length === 0 || playerRepPow > 0) {
            this.healthArray[0] = this.oldHealth;   
        }
        this.m_repair.play(true);
        this.health += playerRepPow; 
        this.m_metalParticles(); 
    }
    if(this.health >= 100){  
        this.health = 100; 
    }
    if(this.health === 100){
        this.broken = false; 

        var healthRepaired = this.health - this.healthArray[0];
        var pointsReward = Math.round((healthRepaired / 100) * 15);
        
        this.m_game.addPoints(pointsReward); 
        this.m_emittCheckmark();
        this.m_genReady.play(true);  

        this.healthArray = []; 
    }
}; 


//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @returns {undefined}
 * @private
 */
poisonedX.entity.Generator.prototype.m_initPhysics = function() {
    this.velocity.max.y = 1.8; 
    this.velocity.acceleration.y = 0.33;
};


poisonedX.entity.Generator.prototype.m_initHitbox = function() {
    this.hitbox.debug = false;
    this.hitbox.set(
        14,
        0, 
        50,
        100
    );
};

/**
 * 
 * Hittests the generator against the monsters.
 * 
 * @param {*} step 
 */
poisonedX.entity.Generator.prototype.m_updateCollision = function(step) {
    var monstersLength = this.m_monsters.numMembers; 
    var monsters = this.m_monsters.getMembers();   

    for (var i = 0; i < monstersLength; i++) {
        this.hitTestObject(monsters[i], this.m_onHitMonster, this);  // Lägger på hitTestObject mot varje monster 
    };      
}; 


/**
 * Initializes the animation of the generator.
 *
 * @returns {undefined}
 * @private
 */
poisonedX.entity.Generator.prototype.m_initAnimation = function() {
    this.animation.create("no_dmg", [0,1,2,3,4,5,6], 10, true);
    this.animation.create("low_dmg", [7,8,9,10,11,12,13], 10, true); 
    this.animation.create("mid_dmg", [14,15,16,17,18,19,20], 10, true);
    this.animation.create("high_dmg", [21,22,23,24,25,26,27], 10, true); 
    this.animation.create("full_dmg", [28,29,30,31,32,33,34,35], 10, true);
    this.animation.create("explosion", [36,37,38,39,40,41,42,43], 10, false);   
};

/**
 * Updates the sprite of the generator depending on the health. 
 *
 * @returns {undefined}
 * @private
 */

poisonedX.entity.Generator.prototype.m_updateSprite = function(step) {
    switch(this.health) {
        case 100:
            this.animation.gotoAndPlay("no_dmg");
            break;
        case 80:
            this.animation.gotoAndPlay("low_dmg");
            break;
        case 60:
            this.animation.gotoAndPlay("mid_dmg"); 
            break;
        case 30:
            this.animation.gotoAndPlay("high_dmg"); 
            break;
        case 0:
            this.broken = true;
            this.charged = false;
            this.animation.gotoAndPlay("full_dmg"); 
            break;
    }
}; 


/**
 * 
 * Updates the progressbar of the generator depending on how much the generator is charged.
 * 
 * @param {*} step 
 */

poisonedX.entity.Generator.prototype.m_updateProgressbar = function(step) { 

    var progress = this.m_chargingTicker / this.m_chargingTime;
    this.progressBar.progress = progress;

    if (progress <= 0.2) {
        this.progressBar.forgroundColor = "#ff0000";
    } else if (progress <= 0.4) {
        this.progressBar.forgroundColor = "#ff6600";
    } else if (progress <= 0.6) {
        this.progressBar.forgroundColor = "#ffff00";
    } else if (progress <= 0.8) {
        this.progressBar.forgroundColor = "#90ee90"; 
    } else if (progress === 1) {
        this.progressBar.forgroundColor = "#33cc33";  
    }

    if(this.charged === true){
        this.progressBar.progress = 1;
        this.progressBar.forgroundColor ="#33cc33"; 
    };
};



/**
 * 
 * Updates the timer objects and removes them if they are no longer needed.
 * 
 * @param {*} step 
 */
poisonedX.entity.Generator.prototype.m_updateTimer = function(step) {
   if(this.m_immortalTimer != undefined && this.m_immortalTimer.elapsed >= 2000){
       this.m_game.timers.remove(this.m_immortalTimer);
       this.m_immortalTimer = null;
    };
};

/**
 * 
 * If the generator is hit by a monster, the generator will take damage.
 * 
 * @param {*} step 
 */
poisonedX.entity.Generator.prototype.m_onHitMonster = function(step) {
    if(this.m_immortal === false && this.health > 0) {
        this.m_dmg(); 
    };
};

/**
 * 
 * Decreases the health of the generator when called.
 * 
 */
poisonedX.entity.Generator.prototype.m_dmg = function(){

    this.m_immortalTimer = this.m_game.timers.create({ 
        duration : 2000,
        onComplete : function() {
            this.m_immortal = false;
        }, 
        scope : this}, 
        false);  

    this.flicker.start(500, 60); 
    this.health -= 10;
    this.m_immortal = true;
    this.m_immortalTimer.start();  
};

/**
 * 
 * Charges the generator when called.
 * 
 * @param {*} step 
 */
poisonedX.entity.Generator.prototype.m_charge = function(step){

    if (!this.charged && !this.broken) {
        this.m_tickCounter++;
        if (this.m_tickCounter >= 60) {
            this.m_chargingTicker++;
            this.m_tickCounter = 0;
        };
        if (this.m_chargingTicker >= this.m_chargingTime) { 
            this.charged = true;
            this.m_chargingTicker = 0;
        }; 
    };
};

/**
 * 
 * Method for emitting a checkmark particle.
 * 
 */
poisonedX.entity.Generator.prototype.m_emittCheckmark = function() {

    this.m_generators.checkmarkEmitter.centerX = this.centerX;
    this.m_generators.checkmarkEmitter.centerY = this.centerY;
    this.m_generators.checkmarkEmitter.emit(1); 
};

/**
 * 
 * Method for emitting metal particles.
 * 
 */
poisonedX.entity.Generator.prototype.m_metalParticles = function() {  

    this.m_generators.metalEmitter.centerX = this.centerX;
    this.m_generators.metalEmitter.centerY = this.centerY;
    this.m_generators.metalEmitter.emit(2); 
};

/**
 * 
 * Method for emitting a vail particle.
 * 
 */
poisonedX.entity.Generator.prototype.m_vailParticles = function() {

    this.m_generators.vailEmitter.centerX = this.centerX;
    this.m_generators.vailEmitter.centerY = this.centerY;
    this.m_generators.vailEmitter.emit(1); 
};