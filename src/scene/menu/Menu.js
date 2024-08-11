//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.scene.Scene
 *
 * @class
 * @classdesc
 * 
 * Game scene.
 */
poisonedX.scene.Menu = function () {
    this.m_gamepad = this.gamepads.get(0);
    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    /**
     * Calls the constructor method of the super class.
     */
    rune.scene.Scene.call(this);
};
//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------
poisonedX.scene.Menu.prototype = Object.create(rune.scene.Scene.prototype);
poisonedX.scene.Menu.prototype.constructor = poisonedX.scene.Menu;
//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------
/**
 * This method is automatically executed once after the scene is instantiated. 
 * The method is used to create objects to be used within the scene.
 *
 * @returns {undefined}
 */
poisonedX.scene.Menu.prototype.init = function () {
    rune.scene.Scene.prototype.init.call(this);
    this.menu = new rune.ui.VTMenu({ resource: "PoisonedX_font_white" });
    this.backgroundmusic = this.application.sounds.music.get("music");
    this.backgroundmusic.play();
    this.backgroundmusic.volume = 0.3;
    this.backgroundmusic.loop = true;

    this.switchOption = this.application.sounds.music.get("jump");
    this.pickedOption = this.application.sounds.music.get("gunPowerup");
    this.graphic = new rune.display.Sprite(this.centerX, this.centerY, 400, 225, "animated_background");
    this.stage.addChild(this.graphic);

    this.m_initAnimation();
    this.m_initHighscore();

    this.menu.add("START GAME");
    this.menu.add("HOW TO PLAY");
    this.menu.add("CONTROLS");
    this.menu.add("CREDITS");

    this.menu.centerX = 290;
    this.menu.centerY = 150;
    this.menu.onSelect(this.selectOption, this);
    this.stage.addChild(this.menu);

};
/**
 * This method is automatically executed once per "tick". The method is used for 
 * calculations such as application logic.
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
poisonedX.scene.Menu.prototype.update = function (step) {
    rune.scene.Scene.prototype.update.call(this, step);
    if (this.keyboard.justPressed("SPACE")) {
        this.application.scenes.load([new poisonedX.scene.Game()]);
    };
    this.m_updateAnimation(step);
    this.m_menuControll(step);
};
/**
 * This method is automatically called once just before the scene ends. Use 
 * the method to reset references and remove objects that no longer need to 
 * exist when the scene is destroyed. The process is performed in order to 
 * avoid memory leaks.
 *
 * @returns {undefined}
 */
poisonedX.scene.Menu.prototype.dispose = function () {
    rune.scene.Scene.prototype.dispose.call(this);
};

/**
 * 
 * Controls the menu.
 * 
 * @param {*} option 
 */

poisonedX.scene.Menu.prototype.selectOption = function (option) {
    switch (option.text) {
        case "START GAME":
            this.cameras.getCameraAt(0).fade.out(300)
            var countDown = this.timers.create({duration: 500, onComplete: function(){
                this.application.scenes.load([new poisonedX.scene.Game()]);
            }}, true);
            countDown.start();
            break;

        case "HOW TO PLAY":
            this.application.scenes.load([new poisonedX.scene.Howtoplay()]);
            break;

        case "CONTROLS":
            this.application.scenes.load([new poisonedX.scene.Controls()]);
            break;

        case "CREDITS":
            this.application.scenes.load([new poisonedX.scene.Credits()]);
            break;
    };
};
///////////////////////////////////////////////////////////////////////////
//                      Private methods                                 //    
/////////////////////////////////////////////////////////////////////////

/**
 * 
 * Controls and input for the mnenu.
 * 
 * @param {*} step 
 */
poisonedX.scene.Menu.prototype.m_menuControll = function (step) {
    if (this.m_gamepad.stickLeftJustDown) {
        this.menu.down();
        this.switchOption.play();
    };
    if (this.m_gamepad.stickLeftJustUp) {
        this.menu.up();
        this.switchOption.play();
    };
    if (this.m_gamepad.justPressed(0)) {
        this.menu.select();
        this.pickedOption.play();
    };
};


/**
 * 
 * Creates the highscore list and fetches the data from the highscore handler (localstorage).
 * 
 * 
 */
poisonedX.scene.Menu.prototype.m_initHighscore = function () {
    this.highscoreList = new rune.display.Graphic(10, 70, 170, 150, "highscore_list");
    this.stage.addChild(this.highscoreList);

    this.m_highscoreHandler = new rune.data.Highscores("poisonedX", 10, 1);
    var topFive = this.m_highscoreHandler.m_data[0];
    this.m_increment = 105;

    for (var i = 0; i < 5; i++) {
        this.showHighScore = new rune.text.BitmapField(topFive[i].name + " " + topFive[i].score, "PoisonedX_font_red");
        this.showHighScore.y = this.m_increment
        this.m_increment += 20;
        this.showHighScore.autoSize = true;
        this.showHighScore.x = 30;
        this.stage.addChild(this.showHighScore);
    };
};

/**
 * 
 * Initializes the animation of the background.
 * 
 */
poisonedX.scene.Menu.prototype.m_initAnimation = function () {

    this.graphic.animation.create("background", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34], 10, true);
};

/**
 * 
 * Updates the animation of the background.
 * @param {*} step 
 */
poisonedX.scene.Menu.prototype.m_updateAnimation = function (step) {
    this.graphic.animation.gotoAndPlay("background");
};
