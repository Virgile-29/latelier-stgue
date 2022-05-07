class Canvarea {
	filter;
	constructor(htmlCanvas) {
		this.htmlCanvas = htmlCanvas;
		this.context =
			this.htmlCanvas.getContext('2d');
	}

	get position() {
		return this.htmlCanvas.getBoundingClientRect();
	}

	get isWithinReach() {
		return (
			this.position.top <= 200 &&
			this.position.bottom >= -200
		); //original = 0
	}

	setDimensions(height, width) {
		this.htmlCanvas.height = height;
		this.htmlCanvas.width = width;
	}

	drawFigure(figure) {
		if (!figure.isDone) {
			let previousDrawingPosition = {
				x: figure.xCurrent,
				y: figure.yCurrent,
			};
			figure.incrementPosition();
			this.followDrawingPath(
				previousDrawingPosition,
				figure
			);
			figure.updateDrawingStep();
		}
	}

	followDrawingPath(
		previousDrawingPosition,
		figure
	) {
		for (
			let thickness = 0;
			thickness < 1;
			thickness++
		) {
			this.context.beginPath();
			this.defineStepCoordinates(
				previousDrawingPosition,
				thickness,
				figure
			);
			this.setDrawingStyle(figure);

			this.context.stroke();
		}
	}

	defineStepCoordinates(
		previousDrawingPosition,
		thickness,
		figure
	) {
		switch (figure.mode) {
			case 'stable':
				this.context.moveTo(
					previousDrawingPosition.x,
					previousDrawingPosition.y + thickness
				);
				this.context.lineTo(
					figure.xCurrent,
					figure.yCurrent + thickness
				);
				break;

			case 'unstable':
				this.context.moveTo(
					previousDrawingPosition.x +
						figure.spatialGrain,
					previousDrawingPosition.y +
						thickness +
						figure.spatialGrain
				);
				this.context.lineTo(
					figure.xCurrent + figure.spatialGrain,
					figure.yCurrent +
						thickness +
						figure.spatialGrain
				);
				break;
		}
	}

	setDrawingStyle(figure) {
		this.context.lineWidth =
			figure.mode !== 'stable'
				? figure.width + figure.widthGrain
				: figure.width;

		this.context.strokeStyle =
			figure.mode !== 'stable'
				? figure.strokeStyle
				: figure.strokeStyle;

		if (
			this.filter !== null &&
			this.filter !== undefined
		) {
			if (
				figure.xCurrent >=
					this.filter.xCanvasTrigger &&
				figure.yCurrent >=
					this.filter.yCanvasTrigger
			) {
				this.context.globalAlpha =
					this.filter.fadeOut(
						this.context.globalAlpha
					);
			} else {
				this.context.globalAlpha = figure.alpha;
			}

			// Original
			// const colors = [
			// 	'#fcbd83', // orange
			// 	//'#ebe34b', // jaune
			// 	'#a8d69c', // vert
			// 	'#97c9d9', //bleu
			// ];

			// const colors = [
			// 	'#ffa69e', // orange
			// 	//'#ebe34b', // jaune
			// 	'#faf3dd', // vert
			// 	'#b8f2e6', //bleu
			// 	'#aed9e0',
			// 	'5e6472',
			// ];

			const colors = [
				'#cdc1ff',

				'#839788',
				'#bfd7ea',
				'#eee0cb',
				'#baa898',
			];

			this.context.strokeStyle =
				colors[
					(Math.random() * colors.length) | 0
				];
		}
	}

	drawText(text, x, y) {
		if (!text.isDone) {
			text.alpha += text.alphaIncrement;
			this.context.globalAlpha = text.alpha;
			this.context.fillStyle = text.color;
			this.context.font =
				text.size + 'px ' + text.font;
			this.context.fillText(text.content, x, y);
		}
	}
}
