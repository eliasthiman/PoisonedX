//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends  rune.display.Sprite
 *
 * @class
 * @classdesc
 * 
 * Game scene.
 */
poisonedX.entity.Cook = function(x, y, game, gameStage, bullets, generators, monsters, players) {

     //--------------------------------------------------------------------------
    // Public properties
    //--------------------------------------------------------------------------

    this.timeLeft = 90;   // players start with 60 seconds
    this.name = "Cook"; 
    this.groupMember = null;
    this.powerups = []; 
    this.pickedUpPow = null;
    this.powerupActive = false;
    this.tookDmg = false;  
    this.inactive = false;   


    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------
    
    this.m_players = players;
    this.m_gamepad = this.gamepads.get(0);
    this.m_alive = true;
    this.m_game = game;
    this.m_time = null;
    this.m_repairSpeed = 10; 
    this.m_sprite = "SGT_cook_handgun_and_assault_rifle"; 
    this.m_gameStage = gameStage;
    this.m_bullets = bullets;
    this.m_monsters = monsters;
    this.m_generators = generators; 
    this.m_immortal = false;  
    this.m_falling = false; 
    this.m_fallTicker = 0;
    this.m_powerupTicker = 0;
    this.m_atkDmg = 25; 
    this.m_repairing = false;
    this.m_deathSoundPlayed = false;
    this.m_jump = this.application.sounds.sound.get("jump");
    this.m_gunPowerup = this.application.sounds.sound.get("gunPowerup");    
    this.m_powerup = this.application.sounds.sound.get("powerUp");
    this.m_genCollect = this.application.sounds.sound.get("genCollect");
    this.m_dmgSound = this.application.sounds.sound.get("hitHurt2");    
    this.m_deathSound = this.application.sounds.sound.get("deathsound"); 

 
     //--------------------------------------------------------------------------
     // Super call
     //--------------------------------------------------------------------------
     
     /**
      * Calls the constructor method of the super class.
      */
     rune.display.Sprite.call(this, x, y, 40, 40, this.m_sprite); 

 };
 
 //------------------------------------------------------------------------------
 // Inheritance
 //------------------------------------------------------------------------------
 
 poisonedX.entity.Cook.prototype = Object.create(rune.display.Sprite.prototype);
 poisonedX.entity.Cook.prototype.constructor = poisonedX.entity.Cook;
 
 //------------------------------------------------------------------------------
 // Override public prototype methods (ENGINE)
 //------------------------------------------------------------------------------
 
 /**
  * ...
  *
  * @returns {undefined}
  */
 poisonedX.entity.Cook.prototype.init = function() {
     rune.display.Sprite.prototype.init.call(this);
     this.m_initPhysics();
     this.m_initAnimation();
     this.m_initHitbox();
     this.m_initTimer();
     this.m_initRevArrow();
     this.m_initButtonInstruction();
 };
 
 /**
  * ...
  *
  * @param {number} step Fixed time step.
  *
  * @returns {undefined}
  */
 poisonedX.entity.Cook.prototype.update = function(step) {
     rune.display.Sprite.prototype.update.call(this, step); 
     this.m_updateInput(step); 
     this.m_fallingTicker(step); 
     this.m_updateCollision(step);
     this.m_updateHitbox(step); 
     this.m_updateTimer(step);  
     this.m_playerStatus(step);
 };
 
 /**
  * ...
  *
  * @returns {undefined}
  */
 poisonedX.entity.Cook.prototype.dispose = function() {
     rune.display.Sprite.prototype.dispose.call(this);
 };
 
/**
 * Decreases the time left for the player.
 */
poisonedX.entity.Cook.prototype.decreaseTime = function() {
    if (this.timeLeft > 0) {
        this.timeLeft--;
    };
    if (this.timeLeft <= 0) {
        this.kill();
    };
};

/**
 * Increases the time left for the player.
 *
 * @param {number} time The amount of time to add.
 */
poisonedX.entity.Cook.prototype.addTime = function(time) {
    this.timeLeft += time || 10;
};

/**
 * 
 * The player is "dead" and can be resurrected by another player
 * 
 */
poisonedX.entity.Cook.prototype.kill = function(){  
    this.animation.gotoAndPlay("dead");
    this.m_alive = false;
    if(this.m_deathSoundPlayed === false){
        this.m_deathSound.play(false);
        this.m_deathSoundPlayed = true;
    };
    this.timeLeft = 0; 
};

/**
 * Resurrects the player.   
 * 
 */
poisonedX.entity.Cook.prototype.resurrect = function(){
    this.m_powerup.play(true); 
    this.m_antidoteParticles(); 
    this.m_vailParticles(); 
    this.timeLeft += 16;
    this.m_alive = true;
    this.m_deathSoundPlayed = false;
};




 //------------------------------------------------------------------------------
 // Private prototype methods
 //------------------------------------------------------------------------------
 
/**
 * Initializes the physics properties of the player.
 *
 * @returns {undefined}
 * @private
 */
poisonedX.entity.Cook.prototype.m_initPhysics = function() {
    this.velocity.drag.x = 0.05;
    this.velocity.max.x = 3; 
    this.velocity.acceleration.y = 0.33;
};

/**
 * 
 * Initializes the hitbox of the player
 * 
 */
poisonedX.entity.Cook.prototype.m_initHitbox = function() {

    this.hitbox.debug = false;
    this.hitbox.set(
        5,
        0, 
        15,
        40
    );
};    

/**
 * 
 * Creates and shoots a bullet object
 * 
 */
poisonedX.entity.Cook.prototype.m_shoot = function() {

    this.timer.stop();

    var offset = 0;

    if(this.m_alive){
        if(this.flippedX){
            offset = (-15);
        }else{
            offset = 15; 
        }

        var bullet = this.m_bullets.create(this.centerX + offset, this.centerY - 4, this.flippedX, this.name, this.m_atkDmg); 
        bullet.flippedX = this.flippedX; 
    };
 };

/**
 * 
 * Damages the player and makes it immortal for a short period of time.
 * The damage taken is based on the monster strength.
 * The player flickers and the camera shakes.
 * 
 * @param {Number} monsterStrength 
 */
poisonedX.entity.Cook.prototype.m_dmg = function(monsterStrength){ 

    this.m_immortalTimer = this.m_game.timers.create({ 
        duration : 2000,
        onComplete : function() {
            this.m_immortal = false;
        }, 
        scope : this}, 
        false);  

    this.m_dmgSound.play(true);
    this.m_immortal = true;
    this.tookDmg = true;    
    this.flicker.start(500, 60);
    this.m_game.cameras.getCameraAt(0).shake.start(250, 5);
    this.m_game.cameras.getCameraAt(2).shake.start(250, 5);  
    this.addTime(monsterStrength); 
    this.m_immortalTimer.start();  
       
};
/**
 * 
 * Updates the hitbox of the player
 * 
 * @param {*} step 
 */
poisonedX.entity.Cook.prototype.m_updateHitbox = function(step) {   

    if(this.flippedX && !this.isXSubtracted){
        this.hitbox.set(
            20,
            0, 
            15,
            40
        );
        this.x -= 20;
        this.isXSubtracted = true;
        this.isXAdded = false;
    }else if(!this.flippedX && !this.isXAdded){
        this.hitbox.set(
            5,
            0, 
            15,
            40
        );
        this.x += 20;   
        this.isXSubtracted = false;
        this.isXAdded = true;
    };
};

/**
  * Checks for collision with other objects and calls the appropriate function
  *
  * @returns {undefined}
  * @private
  */
poisonedX.entity.Cook.prototype.m_updateCollision = function(step) { 

    var generators = this.m_generators.getMembers();   

    for (var i = 0; i < this.m_generators.numMembers; i++) {
        if (this.hitTestObject(generators[i])) {
            this.m_onHitGenerator(generators[i]); 
        }
        else{
            this.m_repairing = false;
        };
    };

    if(this.m_monsters){
        var monsters = this.m_monsters.getMembers();    
        for (var i = 0; i < this.m_monsters.numMembers; i++) {
            if (this.hitTestObject(monsters[i])) {
                this.m_onHitMonster(monsters[i]);
            };
        };
    };
    
    if (this.hitTestObject(this.groupMember)) {
        this.m_onHitPlayer(); 
    };

    if(this.powerups){
        var powerups = this.powerups;
        for (var i = 0; i < this.powerups.length; i++) {
            if (this.hitTestObject(powerups[i])) {
                this.onHitPowerup(powerups[i]); 
            };
        };
    };
};

/**
 * 
 * Checks if the player is alive or dead.
 * If the player is dead the revive arrow is displayed.
 * 
 * @param {*} step 
 */
poisonedX.entity.Cook.prototype.m_playerStatus = function(step) {

    if(this.m_alive === false){
        this.revArrow.visible = true;
        this.revArrow.x = this.x;
        this.revArrow.y = this.y - 10;
    }
    else if (this.m_alive === true && this.revArrow !== undefined && this.revArrow.visible === true){
        this.revArrow.visible = false;  
    };
};

/**
 * 
 * Creates the revive arrow that is displayed when the player is dead.
 * 
 */
poisonedX.entity.Cook.prototype.m_initRevArrow = function() {   

    this.revArrow = new rune.display.Sprite(this.centerX, this.centerY, 30, 30, "Revive_arrow");
    this.revArrow.animation.create("idle", [0,1,2,3,4,5,6,7], 10, true);   
    this.revArrow.visible = false;
    this.m_gameStage.addChild(this.revArrow); 
};

/**
 * 
 * Creates the button instruction that is displayed when the player is near a generator.
 * @param {*} step 
 */
poisonedX.entity.Cook.prototype.m_initButtonInstruction = function() {

    this.yButton = new rune.display.Sprite(this.centerX, this.centerY, 48, 48, "press_y_animation");
    this.yButton.animation.create("idle", [0,1,2,3,4,5,6,7,8,9], 20, true);   
    this.yButton.visible = false;
    this.m_gameStage.addChild(this.yButton); 
};

/**
 * 
 * Determines what happens when the player collides with a generator.
 * The player can repair the generator.
 * The player can collect the generator's health points.
 * The player object will display a button instruction when the player is near a generator,
 * but only if the gerneator is charged.
 * 
 * @param {poisonedX.entity.Generator} generator 
 */
poisonedX.entity.Cook.prototype.m_onHitGenerator = function(generator) {      

    var p1 = this.m_gamepad;   

    if(this.m_alive){
        this.m_repairing = false;    

    if (p1.pressed(6) && p1.pressed(7) && generator.health <= 90) {
        this.m_repairing = true;
        this.animation.gotoAndPlay("repairing"); 
    }; 

    if(generator.broken && p1.pressed(6) && p1.pressed(7) && p1.justPressed(3) || generator.health <= 90 && p1.pressed(6) && p1.pressed(7) && p1.justPressed(3)){
        this.inactive = false;
        this.m_repairing = true;    
        generator.repair(this.m_repairSpeed); 
        this.m_repairing = false;
    };

    if(!generator.broken && generator.charged && p1.justPressed(3)){ 
        this.m_genCollect.play(true);
        this.m_antidoteParticles();  
        this.m_vailParticles();
        this.addTime(generator.healthPoints);
        generator.charged = false; 
        };

    if(generator.broken === false && generator.charged === true){
        this.yButton.visible = true;
        this.yButton.x = generator.centerX;
        this.yButton.y = generator.centerY;
    }
    else {
        this.yButton.visible = false;  
    };
    };
};

/**
 * 
 * On hit monster the player takes damage:
 * The damage taken is based on the monster strength.
 * 
 * @param {poisonedX.entity.Monster} monster 
 */
poisonedX.entity.Cook.prototype.m_onHitMonster = function(monster) {    

    if(!this.m_immortal && this.m_alive){
        this.m_dmg((monster.strength * -1)); 
    }
};

/**
 * 
 * The player can resurrect another player if the player is dead.
 * The player that resurrects loses 5 seconds.
 * The player that is resurrected gets 15 seconds added to the time.
 * 
 */
poisonedX.entity.Cook.prototype.m_onHitPlayer = function() {

    var p1 = this.m_gamepad; 

    if(this.m_alive && !this.groupMember.m_alive && p1.justPressed(3) && this.timeLeft >= 15){
        this.groupMember.resurrect(); 
        this.addTime(-5);
    };
};

/**
 * 
 * Determines what happens when the player collides with a powerup.
 * The player can pick up the powerup and activate it.
 * The player can only have one powerup active at a time.
 * The powerup is disposed after it has been picked up.
 * The effect of the powerup is active for 10 seconds.
 * 
 * If the powerup is not picked up within 20 seconds it is disposed.
 * 
 * @param {poisonedX.entity.Powerup} powerup 
 * @returns 
 */
poisonedX.entity.Cook.prototype.onHitPowerup = function(powerup) {   

    if (this.powerupActive === true) { 
        return;
    };

    switch(powerup.powerupType){
        case "strongWeapon":
            this.powerupActive = true;
            this.m_gunPowerup.play(true);
            var originalAtkDmg = this.m_atkDmg; 
            this.m_atkDmg = this.m_atkDmg * powerup.m_effect;
            this.pickedUpPow = powerup.powerupType;  
            powerup.dispose();
            this.m_weaponTimer = this.m_game.timers.create({ 
                duration : 10000,
                onComplete : function() {
                    this.m_atkDmg = originalAtkDmg;
                    this.powerupActive = false; 
                }, 
                scope : this});  
            break;
        case "doublePoints":
            this.powerupActive = true;
            this.m_powerup.play(true);  
            var originalPointsMultiplier = this.m_game.pointsMultiplyer; 
            this.m_game.pointsMultiplyer *= powerup.m_effect;
            this.pickedUpPow = powerup.powerupType; 
            powerup.dispose();    
            this.m_doublePTimer = this.m_game.timers.create({ 
                duration : 10000,
                onComplete : function() {
                    this.m_game.pointsMultiplyer = originalPointsMultiplier;
                    this.powerupActive = false; 
                }, 
                scope : this});  
            break;
        case "repairFaster":
            break;
    };
};

/**
 * 
 * The player is falling when it drops down from a platform.
 * 
 * @param {*} step 
 */
poisonedX.entity.Cook.prototype.m_fallingTicker = function(step) {

    if(this.m_falling === true) {
        this.m_fallTicker++;

        if(this.m_fallTicker >= 5){
            this.m_fallTicker = 0;
            this.m_falling = false;
        };
    };
};

/**
 * Initializes the animation of the player
 * Cook is a bit special since he has two different animations for the same actions.
 * This is because he has two different weapons. He will get his different weapon from a powerup.
 *
 * @returns {undefined}
 * @private
 */
 poisonedX.entity.Cook.prototype.m_initAnimation = function() {

    this.animation.create("rifle_repairing", [92,93,94,95,96,97,98], 10, false);    
    this.animation.create("rifle_dying", [83,84,85,86,87,88,89,90,91], 10, true);
    this.animation.create("rifle_idle", [68,69,70,71,72,73,74,75,76,77,78,79,80,81,82], 10, true);
    this.animation.create("rifle_jump", [58,59,60,61,62,63,64,65,66,67], 10, true);   
    this.animation.create("rifle_walk", [53,54,55,56,57], 10, true);
    this.animation.create("rifle_shooting", [49,50,51,52], 10, true);

    this.animation.create("repairing", [44,45,46,47,48], 10, false);   
    this.animation.create("dead", [33,34,35,36,37,38,39,40,41,42,43], 10, false);
    this.animation.create("idle", [19,20,21,22,23,24,25,26,27,28,29,30,31,32], 10, true);
    this.animation.create("jump", [9,10,11,12,13,14,15,16,17,18], 10, true);
    this.animation.create("walk", [4,5,6,7,8], 10, true);
    this.animation.create("attack", [0,1,2,3], 10, true); 
 };
 
 /**
  * Updates the input of the player
  *
  * @returns {undefined}
  * @private
  */
 poisonedX.entity.Cook.prototype.m_updateInput = function() {

    this.inactive = false; 

    var p1 = this.m_gamepad;    

    if(this.m_atkDmg > 20 && this.powerupActive === true){

        if(p1.justPressed(0) && this.touching && p1.stickLeftUp && this.m_alive){
            this.velocity.y = -10;
            this.animation.gotoAndPlay("rifle_jump");
            this.m_jump.play(true);    
        }
        else if(p1.justPressed(0) && this.touching && this.m_alive){
            this.velocity.y = -7;
            this.m_jump.play(true);   
        };
        if(p1.justPressed(2) && this.m_alive && this.m_repairing === false){
            this.animation.gotoAndPlay("rifle_shooting"); 
            this.inactive = false;
            this.m_shoot();
        };
        if (p1.stickLeftRight && this.m_alive) {
            this.velocity.x += 0.15;
            this.flippedX = false;
            this.animation.gotoAndPlay("rifle_walk");
        };
        if (p1.stickLeftLeft && this.m_alive) {
            this.velocity.x -= 0.15;
            this.flippedX = true;
            this.animation.gotoAndPlay("rifle_walk");
        };
    }
    else if(this.m_atkDmg = 20){

        if(p1.justPressed(0) && this.touching && p1.stickLeftUp && this.m_alive){
            this.velocity.y = -10;
            this.animation.gotoAndPlay("jump");
            this.m_jump.play(true);   
        }
        else if(p1.justPressed(0) && this.touching && this.m_alive){
            this.velocity.y = -7;
            this.m_jump.play(true);   
        };
        if(p1.justPressed(2) && this.m_alive && this.m_repairing === false){
            this.animation.gotoAndPlay("attack"); 
            this.inactive = false;
            this.m_shoot();
        };
        if (p1.stickLeftRight && this.m_alive) { 
            this.velocity.x += 0.15;
            this.flippedX = false;
            this.animation.gotoAndPlay("walk");
        };
        if (p1.stickLeftLeft && this.m_alive) {
            this.velocity.x -= 0.15;
            this.flippedX = true;
            this.animation.gotoAndPlay("walk");
        };
    };
    if(p1.justPressed(1) && p1.stickLeftDown && this.m_alive && this.touching && this.y <= 550){    
        this.m_falling = true; 
        this.touching = false;  
        this.m_jump.play(true);   
    };
    if (rune.util.Math.abs(this.velocity.x) <= 0 && rune.util.Math.abs(this.velocity.y) <= 0 && this.m_alive) {
       if(this.powerupActive === true && this.pickedUpPow === "strongWeapon"){
        this.animation.gotoAndPlay("rifle_idle");
       }
       else{
        this.animation.gotoAndPlay("idle");
       };
    };

    if (rune.util.Math.abs(this.velocity.x) <= 0 && rune.util.Math.abs(this.velocity.y) <= 0) {
        this.inactive = true;  
    };

     
 };

/**
 * 
 * If the player is inactive for 60 seconds the game switches to the screen "InactiveGameOver"
 * 
 */
 poisonedX.entity.Cook.prototype.m_initTimer = function() {       
    this.timer = this.m_game.timers.create({
        duration : 60000, 
        onComplete : function() {
            this.application.scenes.load([new poisonedX.scene.InactiveGameOver()]);
        }}, false);
};

/**
 * 
 * Updates the timer of the player depending on the player's activity.
 * 
 * @param {*} step 
 */
 poisonedX.entity.Cook.prototype.m_updateTimer = function(step) {
    if(this.inactive === false){
        this.timer.stop();
    }
    else if(this.inactive === true){
        this.timer.start();
    };

    if(this.m_immortalTimer != undefined && this.m_immortalTimer.elapsed >= 2000){
        this.m_game.timers.remove(this.m_immortalTimer);
        this.m_immortalTimer = null;
    };

    if(this.m_weaponTimer != undefined && this.m_weaponTimer.elapsed >= 10000){
        this.m_game.timers.remove(this.m_weaponTimer);
        this.m_weaponTimer = null;
    };
    
    if(this.m_doublePTimer != undefined && this.m_doublePTimer.elapsed >= 10000){
        this.m_game.timers.remove(this.m_doublePTimer);
        this.m_doublePTimer = null;
    };
 };

/**
 * 
 * Particles that are emitted when the player resurrects or picks up antidote generator
 * 
 */
 poisonedX.entity.Cook.prototype.m_antidoteParticles = function() {
   
    this.m_generators.antidoteEmitter.centerX = this.centerX;
    this.m_generators.antidoteEmitter.centerY = this.centerY;
    this.m_generators.antidoteEmitter.emit(10); 
 };

/**
 * 
 * Particles that are emitted when the player resurrects or picks up antidote generator
 * 
 */
 poisonedX.entity.Cook.prototype.m_vailParticles = function() { 

    this.m_generators.vailEmitter.centerX = this.centerX;
    this.m_generators.vailEmitter.centerY = this.centerY;
    this.m_generators.vailEmitter.emit(1); 
 };