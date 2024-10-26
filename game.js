// This is a 6 buttons version of the Simon Game!

var btnColours = ["red", "blue", "green", "yellow", "orange", "pink"];  //Stores all colours
var colourPattern = [];  //Stores randomly generated colour pattern
var clickPattern = [];  //Stores user click pattern
var start = false;  //Helps check first keydown
var level = 0;  //Stores current level

$(document).on("keydown", function() {  //Listens to keyboard clicks
    if (!start) {  //Carries the steps below if game hasn't started 
        $("h1").text("Level " + level);  //Updates game level information
        gameSequence();  //Calling function executing game logic
        start = true;  //Changes var start to stop other keyboard clicks from interfering
    }
});

$(".btn").on("click", function() {  //Listens to clicks on the buttons
    var clickedColour = $(this).attr("id");  //Gets id of clicked button
    clickPattern.push(clickedColour); //Id of clicked button is pushed into clickPattern array

    btnSound(clickedColour);  //Calling function that plays relevant sound 
    animate(clickedColour);  //Calling function that animates relevant button 

    answer(clickPattern.length - 1);  //Calling function that checks if user has clicked the right coloured buttons and resets game colourPattern once the user has completed a pattern
});

function gameSequence() {  //Function for main game logic
    clickPattern = [];  //User's click pattern is reset everytime this function is called
    level++;  //Increments level with every call
    $("h1").text("Level " + level);  //Updates level information accordingly

    var randomNumber = Math.round(Math.random()*5);  //Stores randomly generated number
    var chosenColour = btnColours[randomNumber];  //Chooses colour using random number
    colourPattern.push(chosenColour);  //Pushes the chosen colour into colourPattern array
    
    $("#" + chosenColour).fadeIn(100).fadeOut(100).fadeIn(100);  //Animates the chosen colour

    btnSound(chosenColour);  //Plays sound relvant to chosen colour 
}

function btnSound(colour) {  //Function playing sound relevant to chosen colour/clicked button
    var audio = new Audio("sounds/" + colour + ".mp3");
    audio.play();
}

function animate(colour) {  //Function animating buttons relevant to chosen colour/clicked button
    $("#" + colour).addClass("pressed");

    setTimeout(function() {
        $("#" + colour).removeClass("pressed");
    }, 100);
}

function answer(yourLevel) {  //Function checking if right buttons are pressed to continue or end game and check if a level has been finished 
    if (colourPattern[yourLevel] === clickPattern[yourLevel]) {  //Constantly checks colourPattern with clickPattern
        console.log("Sucess");
        if (colourPattern.length === clickPattern.length) {  //Resets clickPattern once a level has been finished

            setTimeout(function() {
                gameSequence();
                clickPattern = [];
            }, 1000);
    } 
    
    } else {
        console.log("Wrong");
        btnSound("wrong");  //plays wrong sound on wrong button clicks
        $("h1").text("Game Over, Press Any Key to Restart");  //Displays game over

        $("body").addClass("game-over");  //Animates background to show game over
        setTimeout(function() {  
            $("body").removeClass("game-over");
        }, 200);

        reset(); //Calling function that resets the game memory
    }
}

function reset() {  //Function resetting variables once game is over 
    colourPattern = [];
    start = false;
    level = 0;
}