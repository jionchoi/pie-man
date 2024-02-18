/*
    Pie man object. 
    if right, Changex = 1, if left Changex = -1, if up Chagney = 1, if down, Changey = -1

*/
const pieMaxX = window.screen.width - 100;
const pieMinX = 0;
const pieMaxY = 0;
const pieMinY = 90;
var pieMan = {
    x: 50,
    y: 50,
    changeX: 7,
    changeY: 0.7,
    make(){
        $("#pieMan").css({"left": this.x + "px", "top": this.y + "%"});
    }
}

var pellet = {
    x: 60,
    y: 60,
    make(){

    }
}
console.log(window.screen.width);
//get a key code for right, left, up, and down
$(document).ready(function(){
    $(document).on("keydown", function(event){
        var key = event.which; //get keyCode of the pressed keyboard
        changeDir(key);
    });
});

/*
    Check if the pie-man is at the end of the screen
*/
function checkEdge(){
    if(pieMan.x <= pieMinX || pieMan.x >= pieMaxX){
        pieMan.changeX = 0;
    }
    if(pieMan.y <= pieMaxY || pieMan.y >= pieMinY){
        pieMan.changeY = 0;
    }
}

/*
    Change the direction of Pie-Man if the return is true, it moves right or left, if the return is false, it moves up or down
*/
var priviousKey = 39;
function changeDir(keyCode){
    if(keyCode == priviousKey){
        return ;
    }
    switch(keyCode){
        //right
        case 39:
            pressed = true;
            priviousKey = keyCode;
            pieMan.changeX = 7;
            break;
        //left
        case 37:
            pressed = true;
            priviousKey = keyCode;
            pieMan.changeX = -7;
            break;
        //up
        case 38:
            pressed = false;
            priviousKey = keyCode;
            pieMan.changeY = -0.7;
            break;
        //down
        case 40:
            pressed = false;
            priviousKey = keyCode;
            pieMan.changeY = 0.7;
            break;
    }
};

//array for storing the pellets created
var pellets = [];
var pressed = true; //true for left and right, false for up and down
var moveMent = 1;

/*
    Pie-Man animation
*/
function movePie(){
    if(moveMent > 12){
        moveMent = 1;
    }
    checkEdge();
    requestAnimationFrame(movePie);
    
    if(pressed){
        if(pieMan.changeX < 0){
            if(moveMent < 10) // ask Sahil if I can change this to 1, 2, 3, ... instead of 01, 02, 03
                $("#pieMan").attr("src", "images/Left0" + moveMent + ".PNG");
            else
                $("#pieMan").attr("src", "images/Left" + moveMent + ".PNG");
        }
        else if(pieMan.changeX > 0){
            if(moveMent < 10) 
                $("#pieMan").attr("src", "images/Right0" + moveMent + ".PNG");
            else
                $("#pieMan").attr("src", "images/Right" + moveMent + ".PNG");

        }
        else{

        }
        //move pie-man horizontally 
        pieMan.x += pieMan.changeX; 
    }
    else if(pressed == false){
        if(pieMan.changeY <= 0){
            if(moveMent < 10) 
                $("#pieMan").attr("src", "images/Up0" + moveMent + ".PNG");
            else
                $("#pieMan").attr("src", "images/Up" + moveMent + ".PNG");

        }
        else{
            if(moveMent < 10) 
                $("#pieMan").attr("src", "images/Down0" + moveMent + ".PNG");
            else
                $("#pieMan").attr("src", "images/Down" + moveMent + ".PNG");
        }
            //move pie-man vertiacally 
            pieMan.y += pieMan.changeY;   
    }
    pieMan.make();
    moveMent++;
}
movePie();

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
    pieMan.make();
    //create one pellet at random place
    createPellet();
}
/*
    create additional pellet
*/
function createPellet(){
    //max and min is 100 and 0 because the pellet can be placed anywhere in the screen
    const max = 94;
    const min = 5;

    $("#game").prepend('<img id="pellet" src="images/stopped.PNG" alt="pallet"/>')
    $("#pellet").css({"top": randNum(min, max) + "%", "right": randNum(min, max) + "%"});
}