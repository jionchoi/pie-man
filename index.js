class pieMan{
    constructor(){

    }

}

class pellet{
    constructor(){
        
    }
}

/*
    Generates random number between min and max
*/
function randNum(min, max){
    return Math.floor(Math.random() * max) + min;
}

/*
    reset/restart the game
*/
function resetGame(){
    //max and min is 100 and 0 because the pellet can be placed anywhere in the screen
    const max = 94;
    const min = 0;
    //make a pieMan
    $("#pieMan").css({"bottom": "50%", "right": "50%"});
    //create one pellet at random place
    createPellet();
}
/*
    create additional pellet
*/
function createPellet(){
    //max and min is 100 and 0 because the pellet can be placed anywhere in the screen
    const max = 94;
    const min = 0;

    $("#game").prepend('<img id="pellet" src="images/stopped.PNG" alt="pallet"/>')
    $("#pellet").css({"top": randNum(min, max) + "%", "right": randNum(min, max) + "%"});
}

function removePellet(){

}

/*
    move the pie-man (IIFE function)
*/
function movePie(key){

    switch(key){
        case right:
            break;
        case left:

            break;
        case up:
            break;
        case down:
            break;
    }
}
