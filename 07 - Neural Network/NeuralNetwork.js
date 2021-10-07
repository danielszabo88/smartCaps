class NeuralNetwork{
    constructor(i, h, o){
        this.iLayerSize = i
        this.hLayerSize = h
        this.oLayerSize = o
        this.iInputValues = Array.from({length: i}, v => 1) 
        this.hPerc = []
        for(let i=0; i<this.hLayerSize; i++){
            this.hPerc.push(new Perceptron(this.iLayerSize))
        }
        this.hOutputValues = []
        this.oPerc = []
        for(let i=0; i<this.oLayerSize; i++){
            this.oPerc.push(new Perceptron(this.hLayerSize))
        }
        this.oOutputValues = []
    }

    feedForward(){
        this.hOutputValues = []
        this.oOutputValues = []
        this.hPerc.forEach(perc => {
            perc.setInputs(this.iInputValues)
            this.hOutputValues.push(perc.getOutput())
        })
        this.oPerc.forEach(perc => {
            perc.setInputs(this.hOutputValues)
            this.oOutputValues.push(perc.getOutput())
        })
        return this.oOutputValues
    }
}