// STEP 1: setting up the environment
// creating the starting objects and variables before starting the main loop
// for example: 
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.focus();

let counter = 0
let stepCounter = 0

putWallsAround(0, 0, canvas.clientWidth, canvas.clientHeight);
let smartCaps = []
for(let i=0; i<3; i++){
    smartCaps[i] = new SmartCaps(320, 230, 320, 250, 10, 5);
    smartCaps[i].createSteps(100)
}

// STEP 2: defining the game logic
function gameLogic(){
    if(counter % 3 === 0){
        smartCaps.forEach(caps => {
            if(stepCounter < caps.brain.length){
                caps.makeMove(stepCounter);
            } else {
                caps.stop()
            }
        })
        stepCounter++
        counter = 0
    }
    counter++
}

// STEP 3: handling the user input and the game loop
requestAnimationFrame(mainLoop);