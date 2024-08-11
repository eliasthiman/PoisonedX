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
poisonedX.scene.PlayerHUD = function(x, y, sprite, game, player) {  

    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------
    
    this.m_sprite = sprite; 
    this.m_game = game;  
    this.m_player = player;
    this.m_iconSprite = null;
    this.powerupIcon = null;
    this.m_powerupIcons = [];

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * Calls the constructor method of the super class.
     */
    rune.display.Sprite.call(this, x, y, 100, 40, this.m_sprite); 
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

poisonedX.scene.PlayerHUD.prototype = Object.create(rune.display.Sprite.prototype);
poisonedX.scene.PlayerHUD.prototype.constructor = poisonedX.scene.PlayerHUD;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @returns {undefined}
 */
poisonedX.scene.PlayerHUD.prototype.init = function() {
    rune.display.Sprite.prototype.init.call(this); 
    this.m_initHitbox(); 
    this.m_initTimeDisplay(); 
};

/**
 * ...
 *
 * @param {number} step Fixed time step. 
 *
 * @returns {undefined}
 */
poisonedX.scene.PlayerHUD.prototype.update = function(step) { 
    rune.display.Sprite.prototype.update.call(this, step);
    this.m_updateTime(step);
    this.m_updatePowerupIcon(step); 
};

/**
 * ...
 *
 * @returns {undefined}
 */
poisonedX.scene.PlayerHUD.prototype.dispose = function() {
    rune.display.Sprite.prototype.dispose.call(this);
};


//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------

poisonedX.scene.PlayerHUD.prototype.m_initHitbox = function() {
    this.hitbox.debug = false;
    this.hitbox.set(
        0,
        0, 
        100,
        40
    );
};

/**
 * 
 * Creates and shows the time left for the player on their HUD.
 * 
 */
poisonedX.scene.PlayerHUD.prototype.m_initTimeDisplay = function() {

    this.playerTime = new rune.text.BitmapField(String(this.m_player.timeLeft), "PoisonedX_font_white" ); 
    this.playerTime.autoSize = true;
    this.playerTime.debug = false;   
    this.playerTime.y = 12; 

    switch(this.m_player.name) {
        case "Cook":
            this.playerTime.x = 5;
            break;
        case "Repairo":
            this.playerTime.x = 43;
            break;
    }; 
 
    this.addChild(this.playerTime); 
};

/**
 * 
 * Updates the time left for the player on their HUD.
 * 
 * @param {*} step 
 */
poisonedX.scene.PlayerHUD.prototype.m_updateTime = function(step) {    
   this.playerTime.text = String(this.m_player.timeLeft);  
};

/**
 * 
 * Creates the powerup icon for doublePoints for the player.
 * 
 */
poisonedX.scene.PlayerHUD.prototype.m_initdoublePointsIcon = function() {
    this.m_doublePointsIcon = new poisonedX.entity.PowerupIcon(this.x, this.y, "doublePoints_Icon", this.m_game);
    if(this.m_player.name == "Cook") {  
        this.m_doublePointsIcon.x = 0;
        this.m_doublePointsIcon.y = 0;
    } else{
        this.m_doublePointsIcon.x = 84;
        this.m_doublePointsIcon.y = 0;
    };
    this.addChild(this.m_doublePointsIcon);
    this.m_powerupIcons.push(this.m_doublePointsIcon);  
    this.m_doublePointsIcon.visible = false;
};

/**
 * 
 * Creates the powerup icon for repairFaster for the player.
 * 
 */
poisonedX.scene.PlayerHUD.prototype.m_initrepairFasterIcon = function() {
    this.m_repairFasterIcon = new poisonedX.entity.PowerupIcon(this.x, this.y, "repairFaster_Icon", this.m_game); 
    this.m_repairFasterIcon.x = 84;
    this.m_repairFasterIcon.y = 0;
    this.addChild(this.m_repairFasterIcon);
    this.m_powerupIcons.push(this.m_repairFasterIcon);
    this.m_repairFasterIcon.visible = false;
};

/**
 * 
 * Creates the powerup icon for stronWeapon for the player.
 * 
 */
poisonedX.scene.PlayerHUD.prototype.m_initstrongWeaponIcon = function() {
    this.m_strongWeaponIcon = new poisonedX.entity.PowerupIcon(this.x, this.y, "strongWeapon_Icon", this.m_game); 
    this.m_strongWeaponIcon.x = 0;
    this.m_strongWeaponIcon.y = 0;
    this.addChild(this.m_strongWeaponIcon); 
    this.m_powerupIcons.push(this.m_strongWeaponIcon);
    this.m_strongWeaponIcon.visible = false;
};

/**
 * 
 * Updates the powerup icon for the player.
 * Runs clearIcons() if the powerup is no longer active.
 * 
 * @param {*} step 
 */
poisonedX.scene.PlayerHUD.prototype.m_updatePowerupIcon = function(step) {  

    if(this.m_player.powerupActive === true && this.m_powerupIcons.length === 0) {

        switch(this.m_player.pickedUpPow) {
            case "doublePoints":
                this.m_initdoublePointsIcon();
                this.m_doublePointsIcon.visible = true;
                break;
            case "repairFaster":
                this.m_initrepairFasterIcon();
                this.m_repairFasterIcon.visible = true; 
                break;
            case "strongWeapon":
                this.m_initstrongWeaponIcon();
                this.m_strongWeaponIcon.visible = true;
                break;
        };
    };

    if(this.m_player.powerupActive === false && this.m_powerupIcons.length > 0) {
        this.m_clearIcons();
    };       
};


/**
 * 
 * Clears the powerup icons from the player HUD when the powerup is no longer active.
 * Disposes of the inactive powerup icons. 
 * 
 */
poisonedX.scene.PlayerHUD.prototype.m_clearIcons = function() {    
    for(var i = 0; i < this.m_powerupIcons.length; i++) {
        this.m_powerupIcons[i].dispose();
        this.m_powerupIcons.splice(i, 1);
    }  
};