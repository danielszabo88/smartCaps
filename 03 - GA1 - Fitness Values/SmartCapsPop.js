class SmartCapsPop {
    constructor(popSize){
        this.caps = []
        this.popSize = popSize
        this.targetPoint = new Vector(500, 100)
        this.startingPoint = new Vector(100, 400)
    }

    init(){
        for(let i=0; i<this.popSize; i++){
            if(this.caps[i]){
                this.caps[i].remove()
            }
            this.caps[i] = new SmartCaps(this.startingPoint.x, this.startingPoint.y+10, this.startingPoint.x, this.startingPoint.y-10, 10, 5)
            this.caps[i].createSteps(100)
        }
    }

    velocitySum(){
        let vSum = 0
        this.caps.forEach(caps => {
            vSum += caps.vel.mag()
        })
        return vSum
    }

    setFitness(){
        this.caps.forEach(caps => {
            caps.fitness = 1000 / caps.distance(this.targetPoint)
            console.log(caps.fitness)
        })
    }
}