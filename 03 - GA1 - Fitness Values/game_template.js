// STEP 1: setting up the environment
// creating the starting objects and variables before starting the main loop
// for example: 
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.focus();

let counter = 0
let stepCounter = 0

putWallsAround(0, 0, canvas.clientWidth, canvas.clientHeight);
let smartCapsPop = new SmartCapsPop(20)
let targetSign = new Ball(smartCapsPop.targetPoint.x, smartCapsPop.targetPoint.y, 20, 5)
targetSign.layer = -2
targetSign.setColor("red")
let capsAreMoving = false

let starterButton = document.getElementById("relaunch")
starterButton.onclick = () => {
    starterButton.disabled = true
    capsAreMoving = true
    smartCapsPop.init();
    counter = 0
    stepCounter = 0
}

// STEP 2: defining the game logic
function gameLogic(){
    if(capsAreMoving){
        if(counter % 3 === 0){
            smartCapsPop.caps.forEach(caps => {
                if(stepCounter < caps.brain.length){
                    caps.makeMove(stepCounter);
                } else {
                    caps.stop()
                }
            })
            if(smartCapsPop.velocitySum() < 0.01 && stepCounter > 0){
                starterButton.disabled = false
                capsAreMoving = false
                smartCapsPop.setFitness()
            }
            stepCounter++
            counter = 0
        }
        counter++
    }
}

// STEP 3: handling the user input and the game loop
requestAnimationFrame(mainLoop);