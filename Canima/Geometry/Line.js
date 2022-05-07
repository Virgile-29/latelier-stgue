// @ts-nocheck
class Line extends Figure {
    constructor(
        xBegin,
        yBegin,
        xEnd,
        yEnd,
        strokeStyle,
        width,
        mode,
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
        this.name = "line";
        this.specialMode = false;
    }

    get totalSteps() {
        if (Math.abs(this.xDistance) > Math.abs(this.yDistance)) {
            return Math.abs(this.xDistance);
        } else {
            return Math.abs(this.yDistance);
        }
    }

    get xIncrement() {
        return this.xDistance / this.totalSteps;
    }

    get yIncrement() {
        return this.yDistance / this.totalSteps;
    }

    get isDone() {
        return this.currentStep == this.totalSteps;
    }

    getComposingLines() {
        let composingLines = new Array(this.width);

        for (let i = 0; i < this.width; i++) {
            let line = new Line(
                this.xBegin,
                this.yBegin + i,
                this.xEnd,
                this.yEnd + i,
                this.strokeStyle,
                0
            );
            composingLines[i] = line;
        }

        return composingLines;
    }

    draw(frequency = 1, canvas) {
        for (let cycle = 0; cycle < frequency; cycle++) {
            if (!this.isDone) {
                canvas.drawFigure(this);
            }
        }
    }

    incrementPosition() {
        this.xCurrent += this.xIncrement;
        this.yCurrent += this.yIncrement;
    }

    updateDrawingStep() {
        this.currentStep++;
    }
}