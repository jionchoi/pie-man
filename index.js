//get a key code for right, left, up, and down
$(document).ready(function(){
    $(document).on("keydown", function(event){
        key = event.which; //get keyCode of the pressed keyboard
        if(36 > key || key > 40) key = previousKey; //if the pressed key not up/down/left/right, don't change anything
    });
});

/*
    Generates random number between min and max
*/
function randNum(min, max){
    return Math.floor(Math.random() * max) + min;
}

/*
    Pie man object. 
    if right, ChangeX = 7, if left ChangeX = -7, if up ChagneY = 7, if down, ChangeY = -7

*/
const pieMaxX = window.innerWidth - 100;
const pieMinX = 0;
const pieMaxY = window.innerHeight - 100;
const pieMinY = 0;

var pieMan = {
    x: 40,
    y: 40,
    changeX: 7,
    changeY: 7,
    make(){
        $("#pieMan").css({"left": this.x + "px", "bottom": this.y + "px"});
    }
}

var timer = 5000; //10 seconds timer


//Since there are more than one pellet, create a class so that we can manage all pellets created
class Pellet {
    constructor(){
        this.x = randNum(pieMinX, pieMaxX);
        this.y = randNum(pieMinY, pieMaxY);
        this.width = 50;
        this.height = 50;
        this.count = pelletCount;
    }
    make(){
        $("#game").prepend(`<img id=${this.count} src="images/stopped.PNG" alt="pallet"/>`);
        $("#" + this.count).css({"width": this.width, "height": this.height, "position": "fixed"});
        $("#" + this.count).css({"left": this.x + "px","bottom": this.y + "px"});
        //remove uncollected pellet after "timer" time
        setTimeout(removePellet, timer, this.count, this);
        // setTimeout(function (){
        //     removePellet(this.count)
        // }, timer);
    }
}

//array for storing the pellets created
var pellets = [];
var collectNum = 0; //numer of pellet collected
var pelletCount = 0; //number of pellet in the game


//reset the game (1 pellet)
var resetGame = (function(){
    addPellet();
}());


function collectPellet(touched, index){
    //delete pellet
    pellets.splice(index, 1);
    $("#" + touched).remove();
    $("#count").html(`Pellet Count: <b>${collectNum}<b>`); //update count of pellet
}

//Add new pellet
function addPellet(){
    var pellet = new Pellet();
    pellets.push(pellet);
    pellet.make();
    pelletCount++; //increase the number of pellet
}

function removePellet(count, pellet){
    console.log(pellets);
    // var index = pellets.indexOf(pellet);
    if(pellets.includes(pellet)){
        //remove the pellet
        $("#" + count).remove();
        pellets.splice(pellet, 1); 
        timer *= 0.95;
    }
    console.log(pellets);
}

//check game end
function checkEnd(){
    //if there is no remaining pellet in the game, end the game 
    if(pellets.length == 0){
        cancelAnimationFrame(animation);
    }
}

/*
    if the middle of the pie-man and the middle of the pellet collides, remove the collided pellet and create two more
*/
function collisionCheck(pieMan, pelletInArray, index){
    let pieManCenterX = pieMan.x + (50);
    let pieManCenterY = pieMan.y + (50);
    var xDiff = pelletInArray.x < pieManCenterX + 30 && pieManCenterX - 30 < (pelletInArray.x + pelletInArray.width);
    var yDiff = pelletInArray.y < pieManCenterY + 30 && pieManCenterY - 30 < (pelletInArray.y + pelletInArray.height);
    var touched = pelletInArray.count; //pellet collided

    //if they collide,
    if(xDiff == true && yDiff == true){
        collectNum++; //add point
        collectPellet(touched, index); //remove the collided pellet
        //make two more
        addPellet();
        addPellet();
    }
}

var key = 39; 
var previousKey = 39;
var moveMent = 1; //left right up down
var animation;


function changeDir(){
    switch(key){
        //right
        case 39:
            pieMan.changeX = 7;
            pieMan.x = Math.min(pieMaxX, pieMan.x + pieMan.changeX);
            //change the image
            $("#pieMan").attr("src", "images/Right" + moveMent + ".PNG");
            break;
        //left
        case 37:
            pieMan.changeX = -7;
            pieMan.x = Math.max(pieMinX, pieMan.x + pieMan.changeX);
            //change the image
            $("#pieMan").attr("src", "images/Left" + moveMent + ".PNG");
            break;
        //up
        case 38:
            pieMan.changeY = 7;
            pieMan.y = Math.min(pieMaxY, pieMan.y + pieMan.changeY);
            //change the image
            $("#pieMan").attr("src", "images/Up" + moveMent + ".PNG");
            break;
        //down
        case 40:
            pieMan.changeY = -7;
            pieMan.y = Math.max(pieMinY, pieMan.y + pieMan.changeY);
            //change the image
            $("#pieMan").attr("src", "images/Down" + moveMent + ".PNG");
            break;
    }
}

//Move the pie-Man
function movePie(){
    if(moveMent > 12) moveMent = 1; //if the movement is 13, change it back to 1

    animation = requestAnimationFrame(movePie); //animation 
    changeDir(); //change the direction of pie-man
    previousKey = key; //change the previous key to pressed key

    //check all elements in the array and check collision
    pellets.forEach((a, i) =>{
        collisionCheck(pieMan, a, i);
    });

    //create new pieMan
    pieMan.make();
    moveMent++; //increment for pie image
    checkEnd();
}

//run the game
movePie();