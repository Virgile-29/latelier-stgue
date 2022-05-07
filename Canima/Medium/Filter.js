class Filter{

    constructor(xCanvasTrigger, yCanvasTrigger, intensity,threshold=0){
        this.xCanvasTrigger = xCanvasTrigger;
        this.yCanvasTrigger = yCanvasTrigger;
        this.intensity = intensity;
        this.threshold = threshold;
    }

    fadeOut(value){//Threshold between 0. and 1.
        let filteredValue = value;
        return (Math.random() <= this.threshold) ?
            filteredValue * Math.random() * 0.95 :
            1 - filteredValue * 0.5;
    }

}