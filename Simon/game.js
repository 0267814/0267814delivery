var botones = ["red", "blue", "green", "yellow"];

var patron = [];

var nivel = 0;  

var started = false;  

var userClickedPattern = [];


$(document).keydown(function(event) {
    if (event.key === "a" || event.key === "A") {
        if (!started) {
            $("#level-title").text("Level " + nivel);
            nextSequence();
            started = true;  
        }
    }
});


function nextSequence() {

    nivel++;

    userClickedPattern = [];

    $("#level-title").text("Nivel  " + nivel); 
    var numeroRandom = Math.floor(Math.random() * 4);

    console.log(numeroRandom)

    var randomEscogido = botones[numeroRandom]

    patron.push(randomEscogido);

    console.log(patron)

    $("#" + randomEscogido).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    sonido(randomEscogido)

}

function sonido(link){

    var audio = new Audio("sounds/" + link +".mp3")
    audio.play();
}

$(".btn").click(function() {
   
    var colorEscogido = $(this).attr("id");
    userClickedPattern.push(colorEscogido);
    
    sonido(colorEscogido);

    animatePress(colorEscogido);

    checkAnswer(userClickedPattern.length - 1); 
});

function animatePress(currentColor) {
    
    $("#" + currentColor).addClass("pressed");


    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}



function checkAnswer(currentLevel) {
    
    if (userClickedPattern[currentLevel] === patron[currentLevel]) {
        console.log("success");

        
        if (userClickedPattern.length === patron.length) {
            setTimeout(function() {
                nextSequence(); 
            }, 3000);
        }
    } else {
        console.log("mal");

        sonido("wrong");  

        $("body").addClass("game-over");

        $("#level-title").text("Mal hermano, presiona A para jugar otra vez");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 1000);

        reiniciarJuego();
    }

    function reiniciarJuego() {
        nivel = 0;
        patron = [];
        started = false;
    }
}
