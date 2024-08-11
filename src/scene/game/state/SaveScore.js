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
 * SaveScore scene.
 */
poisonedX.scene.SaveScore = function (points) {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    this.m_gamepad = this.gamepads.get(0);

    this.m_points = points;
    this.m_indexFirstBox = 0;
    this.m_indexSecondBox = 0;
    this.m_indexThirdBox = 0;
    this.m_currentBox = 0;


    /**
     * Calls the constructor method of the super class.
     */
    rune.scene.Scene.call(this);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

poisonedX.scene.SaveScore.prototype = Object.create(rune.scene.Scene.prototype);
poisonedX.scene.SaveScore.prototype.constructor = poisonedX.scene.SaveScore;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * This method is automatically executed once after the scene is instantiated. 
 * The method is used to create objects to be used within the scene. 
 *
 * @returns {undefined}
 */
poisonedX.scene.SaveScore.prototype.init = function () {
    rune.scene.Scene.prototype.init.call(this);
    this.m_initSaveScore();
};

/**
 * This method is automatically executed once per "tick". The method is used for 
 * calculations such as application logic.
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
poisonedX.scene.SaveScore.prototype.update = function (step) {
    rune.scene.Scene.prototype.update.call(this, step);
    this.m_updateInput(step);
};

/**
 * This method is automatically called once just before the scene ends. Use 
 * the method to reset references and remove objects that no longer need to 
 * exist when the scene is destroyed. The process is performed in order to 
 * avoid memory leaks.
 *
 * @returns {undefined}
 */
poisonedX.scene.SaveScore.prototype.dispose = function () {
    rune.scene.Scene.prototype.dispose.call(this);
};





/**
 * 
 * Creates and updates the input for the save score scene.  
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
poisonedX.scene.SaveScore.prototype.m_updateInput = function (step) {
    this.stage.removeChild(this.marker);
    this.stage.removeChild(this.saveMarker);
    var gamepad = this.m_gamepad;

    var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    this.marker = new rune.display.Graphic(23, 86, 40, 52, "marker");

    if (this.m_gamepad.stickLeftJustRight) {
        this.m_currentBox++;
    };

    if (this.m_gamepad.stickLeftJustLeft) {
        this.m_currentBox--;
    };

    if (this.m_currentBox > 3) {
        this.m_currentBox = 3;
    };

    if (this.m_currentBox < 0) {
        this.m_currentBox = 0;
    };
    //-----------------------------------------------------------

    if (this.m_currentBox === 0) {
        this.marker.x = 23;
        this.stage.addChild(this.marker);
        this.stage.removeChild(this.firstLetterBox);

        var currentLetterFirstBox = letters[this.m_indexFirstBox];

        if (this.m_gamepad.stickLeftJustDown) {
            this.m_indexFirstBox--;

        };

        if (this.m_gamepad.stickLeftJustUp) {
            this.m_indexFirstBox++;

        };

        if (this.m_indexFirstBox < 0) {
            this.m_indexFirstBox = 35;
        }

        if (this.m_indexFirstBox > 35) {
            this.m_indexFirstBox = 0;
        }


        this.firstLetterBox = new rune.text.BitmapField(currentLetterFirstBox, "PoisonedX_font_red");
        this.firstLetterBox.autoSize = true;
        this.firstLetterBox.y = 103;
        this.firstLetterBox.x = 34;
        this.stage.addChild(this.firstLetterBox);

    }

    //-----------------------------------------------------------

    else if (this.m_currentBox === 1) {
        this.marker.x = 93;
        this.stage.addChild(this.marker);
        this.stage.removeChild(this.secondLetterBox);



        var currentLetterSecondBox = letters[this.m_indexSecondBox];

        if (this.m_gamepad.stickLeftJustDown) {
            this.m_indexSecondBox--;

        };

        if (this.m_gamepad.stickLeftJustUp) {
            this.m_indexSecondBox++;

        };

        if (this.m_indexSecondBox < 0) {
            this.m_indexSecondBox = 35;
        }

        if (this.m_indexSecondBox > 35) {
            this.m_indexSecondBox = 0;
        }

        this.secondLetterBox = new rune.text.BitmapField(currentLetterSecondBox, "PoisonedX_font_red");
        this.secondLetterBox.autoSize = true;
        this.secondLetterBox.y = 103;
        this.secondLetterBox.x = 104;
        this.stage.addChild(this.secondLetterBox);
    }

    //-----------------------------------------------------------

    else if (this.m_currentBox === 2) {
        this.marker.x = 163;
        this.stage.addChild(this.marker);
        this.stage.removeChild(this.thirdLetterBox);

        var currentLetterThirdBox = letters[this.m_indexThirdBox];

        if (this.m_gamepad.stickLeftJustDown) {
            this.m_indexThirdBox--;

        };

        if (this.m_gamepad.stickLeftJustUp) {
            this.m_indexThirdBox++;

        };

        if (this.m_indexThirdBox < 0) {
            this.m_indexThirdBox = 35;
        }

        if (this.m_indexThirdBox > 35) {
            this.m_indexThirdBox = 0;
        }

        this.thirdLetterBox = new rune.text.BitmapField(currentLetterThirdBox, "PoisonedX_font_red");
        this.thirdLetterBox.autoSize = true;
        this.thirdLetterBox.y = 103;
        this.thirdLetterBox.x = 174;
        this.stage.addChild(this.thirdLetterBox);
    };

    if (this.m_currentBox === 3) {
        this.saveMarker = new rune.display.Graphic(231, 86, 146, 52, "save_marker");
        this.stage.addChild(this.saveMarker);

        if (gamepad.justPressed(0)) {

           var userName = this.firstLetterBox.m_text + this.secondLetterBox.m_text + this.thirdLetterBox.m_text;

            this.m_handleScore(userName);

            this.application.scenes.load([new poisonedX.scene.Menu()
            ]);
    };
};
};

/**
 * 
 * Updates the save score scene.
 * 
 */
poisonedX.scene.SaveScore.prototype.m_initSaveScore = function () {
    this.graphic = new rune.display.Graphic(this.centerX, this.centerY, 400, 225, "save_score_state");
    this.stage.addChild(this.graphic);

    this.arrowLtop = new rune.display.Graphic(35, 70, 16, 16, "menu_arrow");
    this.stage.addChild(this.arrowLtop);

    this.arrowLBot = new rune.display.Graphic(35, 139, 16, 16, "menu_arrow");
    this.stage.addChild(this.arrowLBot);
    this.arrowLBot.flippedY = true;

    this.arrowMtop = new rune.display.Graphic(105, 70, 16, 16, "menu_arrow");
    this.stage.addChild(this.arrowMtop);

    this.arrowMBot = new rune.display.Graphic(105, 139, 16, 16, "menu_arrow");
    this.stage.addChild(this.arrowMBot);
    this.arrowMBot.flippedY = true;

    this.arrowRtop = new rune.display.Graphic(175, 70, 16, 16, "menu_arrow");
    this.stage.addChild(this.arrowRtop);

    this.arrowRBot = new rune.display.Graphic(175, 139, 16, 16, "menu_arrow");
    this.stage.addChild(this.arrowRBot);
    this.arrowRBot.flippedY = true;

    this.showScore = new rune.text.BitmapField("YOUR SCORE IS " + this.m_points + " POINTS", "PoisonedX_font_white");
    this.showScore.autoSize = true;
    this.showScore.y = 20;
    this.showScore.x = 10;
    this.stage.addChild(this.showScore);

    this.cameras.getCameraAt(0).bounderies = new rune.geom.Rectangle(0, 0, 448, 608);
    this.cameras.getCameraAt(0).targets.add(this.graphic);
};

/**
 * 
 * Takes the name of the player and sends the score to the highscore handler.
 * 
 * @param {String} userName 
 */
poisonedX.scene.SaveScore.prototype.m_handleScore = function (userName) {

    this.m_userName = userName;
    this.m_highscoreHandler = new rune.data.Highscores("poisonedX", 10, 1);
    this.m_highscoreHandler.send(this.m_points, this.m_userName, 0);
};








