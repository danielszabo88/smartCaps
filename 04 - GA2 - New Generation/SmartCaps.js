class SmartCaps extends Capsule{
    constructor(x1, y1, x2, y2, r, m){
        super(x1, y1, x2, y2, r, m)
        this.brain = []
        this.layer = -1
        this.friction = 0.06
        this.angFriction = 0.05
        this.maxSpeed = 5
        this.setColor("lightgreen")
        this.comp[1].color = "yellowgreen"
        this.fitness = 0
    }
    
    // initializes the brain array with random steps (sequence of 4 bits) 
    createSteps(size){
        for(let i=0; i<size; i++){
            this.brain[i] = randInt(0,15).toString(2).padStart(4, "0")
        }
    }

    // iterating through the brain array and changing the acceleration accordingly
    makeMove(currentStep){
        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;
    
        if(parseInt(this.brain[currentStep][0], 2)){
            this.left = true
        }
        if(parseInt(this.brain[currentStep][1], 2)){
            this.right = true
        }
        if(parseInt(this.brain[currentStep][2], 2)){
            this.up = true
        }
        if(parseInt(this.brain[currentStep][3], 2)){
            this.down = true
        }
    }

    // the distance between the caps and a given point
    distance(vec){
        return this.pos.subtr(vec).mag()
    }

    // stops modifying the direction properties and sets the acceleration vector to 0
    stop(){
        this.left = false
        this.right = false
        this.up = false
        this.down = false
        this.acc.set(0,0)
    }
}