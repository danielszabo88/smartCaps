class SmartCapsPop {
    constructor(popSize){
        this.caps = []
        this.popSize = popSize
        this.mutationRate = 0.01
        this.targetPoint = new Vector(500, 100)
        this.startingPoint = new Vector(60, 420)
        this.generation = 1
        this.nextGenBrains = []
    }

    // creating a population with the size of the popSize property
    init(){
        for(let i=0; i<this.popSize; i++){
            if(this.caps[i]){
                this.caps[i].remove()
            }
            this.caps[i] = new SmartCaps(this.startingPoint.x, this.startingPoint.y+10, this.startingPoint.x, this.startingPoint.y-10, 10, 5)
            this.caps[i].createSteps(250)
        }
    }

    // the sum of the populations members velocities
    velocitySum(){
        let vSum = 0
        this.caps.forEach(caps => {
            vSum += caps.vel.mag()
        })
        return vSum
    }
 
    // the average distance of the members from the target
    targetDistanceAvg() {
        let dSum = 0
        this.caps.forEach(caps => {
            dSum += caps.distance(this.targetPoint)
        })
        return dSum / this.popSize
    }

    // gives a fitness value to each members of the population
    setFitness(){
        this.caps.forEach(caps => {
            caps.fitness = caps.reward**4
        })
    }

    // the sum of the members fitness values
    fitnessSum(){
        let fSum = 0
        this.caps.forEach(caps => {
            fSum += caps.fitness
        })
        return fSum
    }

    // selecting a member based on their fitness values
    pickCaps(){
        let picker = Math.random()
        let fitnessSum = this.fitnessSum()
        let currentSum = 0
        for(let i=0; i<=this.caps.length; i++){
            currentSum += this.caps[i].fitness / fitnessSum
            if(picker < currentSum){
                this.caps[i].comp[1].color = "orange"
                return this.caps[i]
            }
        }
    }

    // creating a new brain array by mixing two
    crossover(parent1, parent2){
        let newBrain = []
        for(let i=0; i < parent1.brain.length; i++){
            newBrain[i] = 
            Math.random() < parent1.reward / (parent1.reward+parent2.reward) ?
            parent1.brain[i] : parent2.brain[i]
        }
        return newBrain
    }

    // modifying any element of the brain array with a certain probability
    mutation(brain){
        for(let i=0; i<brain.length; i++){
            if(this.mutationRate > Math.random()){
                brain[i] = randInt(0,15).toString(2).padStart(4, "0")
            }
        }
    }

    // creating a new array of brains by selection, crossover and mutation
    createNextGen(){
        for(let i=0; i < this.popSize; i++){
            let parent1 = this.pickCaps()
            let parent2 = this.pickCaps()
            let newBrain = this.crossover(parent1, parent2)
            this.mutation(newBrain)
            this.nextGenBrains.push(newBrain)
        }
    }

    // the old brains get replaced by the new brains
    // population members are set to original position
    replaceNextGen(){
        for(let i=0; i < this.popSize; i++){
            this.caps[i].brain = this.nextGenBrains[i]
            this.caps[i].setPosition(this.startingPoint.x, this.startingPoint.y, 0)
            this.caps[i].setColor("lightgreen")
            this.caps[i].comp[1].color = "yellowgreen"
            this.caps[i].reward = 0
        }
        this.nextGenBrains = []
        this.generation++
    }
}