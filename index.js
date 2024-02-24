//get a key code for right, left, up, and down
$(document).ready(function(){
    $(document).on("keydown", function(event){
        key = event.which; //get keyCode of the pressed keyboard
        // console.log(key);
        if(36 > key || key > 40) key = previousKey; //if the pressed key not up/down/left/right
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
    if right, Changex = 1, if left Changex = -1, if up Chagney = 1, if down, Changey = -1

*/
const pieMaxX = window.innerWidth - 100;
const pieMinX = 0;
const pieMaxY = window.innerHeight - 100;
const pieMinY = 0;
var pieMan = {
    x: 50,
    y: 50,
    changeX: 7,
    changeY: 0.7,
    make(){
        $("#pieMan").css({"left": this.x + "px", "bottom": this.y + "px"});
       
    }
}

// //Since there are more than one pellet, create a class so that we can manage all pellets created
// class Pellet {
//     constructor(){
//         this.x = randNum(pieMinX, pieMaxX);
//         this.y = randNum(pieMaxY, pieMinY);
//         this.width = 70;
//         this.height = 70;
//     }
//     make(index){
//         $("#game").prepend(`<img id=${index} src="images/stopped.PNG" alt="pallet"/>`);
//         $(`#${index}`).css({"width": width, "height": height, "position": "absolute"});
//         $(`#${index}`).css({"left": x + "px","top": y + "px"});
//     }

//     delete(index){
//         //delete pellet
//         $(`#${index}`).css({"display": "none"});
//         //cancleAnimationFrame(movePie)

//     }
// }

var pellet = {
    x: randNum(pieMinX, pieMaxX),
    y: randNum(pieMinY, pieMaxY),
    width: 70,
    height: 70,
    make(index){
        $("#game").prepend(`<img id=${index} src="images/stopped.PNG" alt="pallet"/>`);
        $(`#${index}`).css({"width": this.width, "height": this.height, "position": "absolute"});
        $(`#${index}`).css({"left": this.x + "px","bottom": this.y + "px"});
    },
    delete(index){
        //delete pellet
        $(`#${index}`).css({"display": "none"});
    }
}

function removePellet(index){
    //delete pellet
    $(`#${index}`).css({"display": "none"});
}

var timer = 10000; //10 seconds timer
// setInterval(pellet.make(), timer);


//array for storing the pellets created
var pellets = ["pellet1"];

//reset the game (1 pellet)
var resetGame = (function(){
    pellet.make(pellets[0]);
}())

/*
    if the middle of the pie-man and the middle of the pellet collides, remove the collided pellet and create two more
*/
function collisionCheck(pellet, index){
    var xDiff = (pieMan.x + 50) - (pellet.x + 50);
    var yDiff = (pieMan.y - 35) - (pellet.y - 35);
    //if they collide,
    if(xDiff == 0 && yDiff == 0){
        removePellet();
    }
}

var pressed = true; //true for left and right, false for up and down
var key = 39; 
var previousKey = 39;
var moveMent = 1; //left right up down
var animation;

/*
    Check if the pie-man is at the end of the screen
*/
function checkEdge(){
    if(key != previousKey){
        if(36 < key || key > 41) {
            console.log("Changed?");
            changeDir();
            return ;
        }
    }

    if(pieMan.x <= pieMinX || pieMan.x >= pieMaxX){
        pieMan.changeX = 0;
    }
    if(pieMan.y <= pieMaxY || pieMan.y >= pieMinY){
        pieMan.changeY = 0;
    }
}

function changeDir(){
    switch(key){
        //right
        case 39:
            pressed = true;
            pieMan.changeX = 7;
            //change the image
            $("#pieMan").attr("src", "images/Right" + moveMent + ".PNG");
            break;
        //left
        case 37:
            pressed = true;
            pieMan.changeX = -7;
            //change the image
            $("#pieMan").attr("src", "images/Left" + moveMent + ".PNG");
            break;
        //up
        case 38:
            pressed = false;
            pieMan.changeY = -7;
            //change the image
            $("#pieMan").attr("src", "images/Up" + moveMent + ".PNG");
            break;
        //down
        case 40:
            pressed = false;
            pieMan.changeY = 7;
            //change the image
            $("#pieMan").attr("src", "images/Down" + moveMent + ".PNG");
            break;
    }
}



function movePie(){
    if(moveMent > 12) moveMent = 1; //if the movement is 13, change it back to 1
    animation = requestAnimationFrame(movePie); //animation 
    changeDir(); //change the direction of pie-man
    checkEdge(); //check if the pie-man is at the edge of the screen or not
    previousKey = key; 

    //increment x or y
    if(pressed) pieMan.x += pieMan.changeX;
    else pieMan.y += pieMan.changeY;

    pellets.forEach((a) =>{
        collisionCheck(a);
    });
    //collision check
        collisionCheck(pieMan, pellet);
    //create new pieMan
    pieMan.make();
    moveMent++; //increment for pie image
}

// movePie();




// /*
//     Change the direction of Pie-Man if the return is true, it moves right or left, if the return is false, it moves up or down
// */
// var previousKey = 39;
// function changeDir(keyCode){
//     if(keyCode == previousKey){
//         return ;
//     }
//     switch(keyCode){
//         //right
//         case 39:
//             pressed = true;
//             previousKey = keyCode;
//             pieMan.changeX = 7;
//             $("#pieMan").attr("src", "images/Right" + moveMent + ".PNG");
//             break;
//         //left
//         case 37:
//             pressed = true;
//             previousKey = keyCode;
//             pieMan.changeX = -7;
//             $("#pieMan").attr("src", "images/Left0" + moveMent + ".PNG");
//             break;
//         //up
//         case 38:
//             pressed = false;
//             previousKey = keyCode;
//             pieMan.changeY = -0.7;
//             $("#pieMan").attr("src", "images/Up" + moveMent + ".PNG");
//             break;
//         //down
//         case 40:
//             pressed = false;
//             previousKey = keyCode;
//             pieMan.changeY = 0.7;
//             $("#pieMan").attr("src", "images/Down" + moveMent + ".PNG");
//             break;
//     }
// };



// /*
//     Pie-Man animation
// */
// function movePie(){
//     if(moveMent > 12){
//         moveMent = 1;
//     }
//     checkEdge();
//     requestAnimationFrame(movePie);

    
//     if(pressed){
//         if(pieMan.changeX < 0){
//             if(moveMent < 10) // ask Sahil if I can change this to 1, 2, 3, ... instead of 01, 02, 03
//                 $("#pieMan").attr("src", "images/Left0" + moveMent + ".PNG");
//             else
//                 $("#pieMan").attr("src", "images/Left" + moveMent + ".PNG");
//         }
//         else if(pieMan.changeX > 0){
//             if(moveMent < 10) 
//                 $("#pieMan").attr("src", "images/Right0" + moveMent + ".PNG");
//             else
//                 $("#pieMan").attr("src", "images/Right" + moveMent + ".PNG");

//         }
//         else{

//         }
//         //move pie-man horizontally 
//         pieMan.x += pieMan.changeX; 
//     }
//     else if(pressed == false){
//         if(pieMan.changeY <= 0){
//             if(moveMent < 10) 
//                 $("#pieMan").attr("src", "images/Up0" + moveMent + ".PNG");
//             else
//                 $("#pieMan").attr("src", "images/Up" + moveMent + ".PNG");

//         }
//         else{
//             if(moveMent < 10) 
//                 $("#pieMan").attr("src", "images/Down0" + moveMent + ".PNG");
//             else
//                 $("#pieMan").attr("src", "images/Down" + moveMent + ".PNG");
//         }
//             //move pie-man vertiacally 
//             pieMan.y += pieMan.changeY;   
//     }
//     pieMan.make();
//     moveMent++;
// }
