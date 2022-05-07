//@ts-nocheck
class BrushStroke {
    constructor(
        figure,
        hairs = 2,
        widths = [5, 5],
        colors = ["blue", "green"],
        deviation = 1
    ) {
        this.hairs = hairs;

        this.widths = widths;
        this.colors = colors;

        this.figure = figure;

        this.deviation = deviation;

        this.hairPaths = this.setHairPaths();
    }

    get isDone() {
        let donePaths = 0;

        for (let hp = 0; hp < this.hairPaths.length; hp++) {
            donePaths += this.hairPaths[hp].isDone; // How many hairpaths are completed (bool value => numerical value)
        }

        return donePaths >= this.hairPaths.length;
    }

    widthDistribution(mode = "linear", [a, b]) {
        switch (mode) {
            case "linear":
                for (let w = 0; w < this.hairs; w++) {
                    let ratio = (b - a) / (this.hairs - 1);
                    this.widths[w] = Math.round(a + ratio * w);
                }
                break;

            case "random":
                for (let w = 0; w < this.hairs; w++) {
                    this.widths[w] = Math.floor(Math.random() * Math.floor(b - a) + a);
                }
                break;
        }
        this.hairPaths = this.setHairPaths();
    }

    colorDistribution(mode = "gradient", [a, b]) {
        switch (mode) {
            case "gradient":
                let colorGradient = new Gradient("", this.hairs, [a, b]);
                colorGradient.setGradient(a, b);
                this.colors = colorGradient.getArray();
                break;

            case "random":
                for (let c = 0; c < this.hairs; c++) {
                    let randomHexValue = Math.floor(Math.random() * 16777215).toString(
                        16
                    );
                    let color = "#" + randomHexValue;
                    this.colors[c] = color;
                }
                break;
        }

        this.hairPaths = this.setHairPaths();
    }

    setHairPaths() {
        let hairPaths = new Array();
        let currentWidth = 0;

        for (let i = 0; i < this.hairs; i++) {
            //deviation = Math.round(Math.random()*15);
            currentWidth += this.widths[i];
            switch (this.figure.name) {
                case "line":
                    var hairPath = new Line(
                        this.figure.xBegin,
                        this.figure.yBegin + i * this.deviation,
                        this.figure.xEnd,
                        this.figure.yEnd + i * this.deviation,
                        this.colors[i],
                        this.widths[i],
                        this.figure.mode
                    );
                    hairPath.granularityCoefficients = this.figure.granularityCoefficients;
                    break;

                case "curve":
                    // @ts-ignore
                    var hairPath = new Curve(
                        this.figure.xBegin + i * this.deviation,
                        this.figure.yBegin + i * this.deviation,
                        this.figure.xEnd + i * this.deviation,
                        this.figure.yEnd + i * this.deviation,
                        this.colors[i],
                        this.widths[i],
                        this.figure.accuracy,
                        this.figure.controlPoints,
                        this.figure.mode
                    );
                    hairPath.granularityCoefficients = this.figure.granularityCoefficients;

                    break;
            }

            hairPaths.push(hairPath);
        }

        return hairPaths;
    }

    draw(frequency = 10, canvas) {
        for (let cycle = 0; cycle < frequency; cycle++) {
            if (!this.isDone) {
                this.hairPaths.forEach((p) => p.draw(1, canvas));
            }
        }
    }
}