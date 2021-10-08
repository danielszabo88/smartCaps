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
        this.reward = 0
        this.sensors = {
            start: new Vector(0,0),
            dist: 200,
            dir: [],
            line: new Line(0,0,0,0)
        }
        this.sensors.line.color = "grey"
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

    // counting the checklines crossed
    getReward(){
        if(collide(this, checkLines[this.reward])){
            this.reward++
        }
    }

    getSensorData(wallArray){
        this.sensors.start.set(this.comp[1].pos.x, this.comp[1].pos.y)
        this.sensors.line.vertex[0] = this.sensors.start
        this.sensors.dir[0] = this.comp[1].pos.subtr(this.comp[2].pos).unit()
        this.sensors.dir[1] = this.sensors.dir[0].normal()
        this.sensors.dir[2] = this.sensors.dir[1].normal().normal()
        this.sensors.dir[3] = this.sensors.dir[0].add(this.sensors.dir[1]).unit()
        this.sensors.dir[4] = this.sensors.dir[0].add(this.sensors.dir[2]).unit()
        for(let i=0; i<5; i++){
            let closestPoint = this.sensors.start.add(this.sensors.dir[i].mult(this.sensors.dist))
            wallArray.forEach(wall => {
                let intersection = lineSegmentIntersection(
                    this.sensors.line.vertex[0], closestPoint, wall.start, wall.end)
                if(intersection && 
                    intersection.subtr(this.sensors.start).mag() < 
                    closestPoint.subtr(this.sensors.start).mag()){
                        closestPoint = intersection
                        this.sensors.line.color = "red"
                    }
            })
            ctx.fillStyle = "red"
            ctx.fillText(`${i}: ${round(closestPoint.subtr(this.sensors.start).mag(),4)}`, 520, i*10+10)
            testCircle(closestPoint.x, closestPoint.y, "green")
            this.sensors.line.vertex[1] = closestPoint
            this.sensors.line.draw()
            this.sensors.line.color = "grey"
        }
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