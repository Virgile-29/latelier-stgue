class Curve extends Figure {
    constructor(
        xBegin,
        yBegin,
        xEnd,
        yEnd,
        strokeStyle,
        width,
        accuracy = 0.01,
        controlPoints,
        mode = "stable",
        specialMode,
        alpha
    ) {
        super(
            xBegin,
            yBegin,
            xEnd,
            yEnd,
            strokeStyle,
            width,
            mode,
            specialMode,
            alpha
        );

        this.name = "curve";

        this.controlPoints = controlPoints;

        this.accuracy = accuracy;
    }

    get isDone() {
        return this.currentStep > 0.99;
    }

    draw(frequency = 1, canvas) {
        for (let cycle = 0; cycle < frequency; cycle++) {
            if (!this.isDone) {
                canvas.drawFigure(this);
            }
        }
    }

    incrementPosition() {
        var cX = 3 * (this.controlPoints[0].x - this.xBegin),
            bX = 3 * (this.controlPoints[1].x - this.controlPoints[0].x) - cX,
            aX = this.xEnd - this.xBegin - cX - bX;

        var cY = 3 * (this.controlPoints[0].y - this.yBegin),
            bY = 3 * (this.controlPoints[1].y - this.controlPoints[0].y) - cY,
            aY = this.yEnd - this.yBegin - cY - bY;

        var x =
            aX * Math.pow(this.currentStep, 3) +
            bX * Math.pow(this.currentStep, 2) +
            cX * this.currentStep +
            this.xBegin;
        var y =
            aY * Math.pow(this.currentStep, 3) +
            bY * Math.pow(this.currentStep, 2) +
            cY * this.currentStep +
            this.yBegin;
        this.xCurrent = x;
        this.yCurrent = y;
    }

    updateDrawingStep() {
        this.currentStep = this.currentStep + this.accuracy;
    }
}