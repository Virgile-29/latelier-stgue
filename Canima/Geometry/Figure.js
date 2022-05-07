class Figure {
    constructor(
        xBegin,
        yBegin,
        xEnd,
        yEnd,
        strokeStyle = "black",
        width = 1,
        mode = "stable",
        specialMode = true,
        alpha = 1.0
    ) {
        this.xBegin = xBegin;
        this.yBegin = yBegin;

        this.xEnd = xEnd;
        this.yEnd = yEnd;

        this.xDistance = xEnd - xBegin;
        this.yDistance = yEnd - yBegin;

        this.xCurrent = xBegin;
        this.yCurrent = yBegin;

        this.strokeStyle = strokeStyle;
        this.width = width; // To emulate the width of a figure we demultiply the figure and put the composing figures in an array

        this.currentStep = 0;

        this.granularityCoefficients = {
            color: 0,
            spatial: 0,
            width: 0,
        };

        this.mode = mode;

        this.alpha = 1.0;

        this.specialMode = specialMode;
    }

    get colorGrain() {
        return Math.random() * this.granularityCoefficients["color"];
    }

    get spatialGrain() {
        return Math.random() * this.granularityCoefficients["spatial"];
    }

    get widthGrain() {
        return Math.random() * this.granularityCoefficients["width"];
    }

    get isComposite() {
        return this.width > 1;
    }

    incrementPosition() {}

    applyDrawingMode(x, y) {
        switch (this.mode) {
            case "unstable":
                return { x: x + this.spatialGrain, y: y + this.spatialGrain };
            case "stable":
                return { x: x, y: y };
        }
    }

    updateDrawingStep() {}
}