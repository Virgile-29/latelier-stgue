function mainBs() {
	let curve = new Curve(
		windowWidth,
		0,
		0,
		windowHeight,
		'black',
		1,
		0.01,
		[
			{
				x: windowWidth * 1.4,
				y: windowHeight * 0.32,
			},
			{
				x: windowWidth * 0.1,
				y: windowHeight * 0.32,
			},
		],
		'unstable'
	);
	curve.specialMode = true;
	curve.granularityCoefficients['spatial'] = 20;
	curve.granularityCoefficients['width'] = 1;
	let bs = new BrushStroke(
		curve,
		windowHeight * 0.04
	);
	bs.deviation = 75;
	bs.widthDistribution('random', [1, 10]);
	bs.colorDistribution('gradient', [
		'#97c9d9',
		'#97c9d1',
	]);

	return bs;
}

function ContactBs() {
	let curve = new Curve(
		-windowWidth,
		windowHeight,
		windowWidth,
		windowHeight * 0.35,
		'black',
		1,
		0.01,
		[
			{
				x: -windowWidth * 0.5,
				y: windowHeight * 0.2,
			},
			{
				x: -windowWidth * 0.05,
				y: windowHeight * -0.8,
			},
		],
		'unstable'
	);
	curve.granularityCoefficients['spatial'] = 20;
	curve.granularityCoefficients['width'] = 1;

	let bs = new BrushStroke(
		curve,
		windowHeight * 0.12
	);
	bs.deviation = 50;
	bs.widthDistribution('random', [1, 1]);
	bs.colorDistribution('gradient', [
		'#bfd7ea',
		'#bfd7ea',
	]);

	return bs;
}
function initializeNavBs(i) {
	let line = new Line(
		10,
		navCanvareas[i].htmlCanvas.height * 0.75,
		navCanvareas[i].htmlCanvas.width - 10,
		navCanvareas[i].htmlCanvas.height * 0.75,
		'black',
		1,
		'unstable',
		false
	);
	line.granularityCoefficients['spatial'] = 2;
	line.granularityCoefficients['width'] = 1;
	let bs = new BrushStroke(line, 5);
	bs.deviation = 2;
	bs.widthDistribution('linear', [2, 2]);
	bs.colorDistribution('gradient', [
		'#cdc1ff',
		'#cdc1ff',
	]);

	return bs;
}
function initializeNavBsPink(i) {
	let line = new Line(
		10,
		navCanvareas[i].htmlCanvas.height * 0.75,
		navCanvareas[i].htmlCanvas.width - 10,
		navCanvareas[i].htmlCanvas.height * 0.75,
		'black',
		1,
		'unstable',
		false
	);
	line.granularityCoefficients['spatial'] = 2;
	line.granularityCoefficients['width'] = 1;
	let bs = new BrushStroke(line, 5);
	bs.deviation = 2;
	bs.widthDistribution('linear', [2, 2]);
	bs.colorDistribution('gradient', [
		'#cdc1ff',
		'#cdc1ff',
	]);

	return bs;
}
function initializeNavBsGreen(i) {
	let line = new Line(
		10,
		navCanvareas[i].htmlCanvas.height * 0.75,
		navCanvareas[i].htmlCanvas.width - 10,
		navCanvareas[i].htmlCanvas.height * 0.75,
		'black',
		1,
		'unstable',
		false
	);
	line.granularityCoefficients['spatial'] = 2;
	line.granularityCoefficients['width'] = 1;
	let bs = new BrushStroke(line, 5);
	bs.deviation = 2;
	bs.widthDistribution('linear', [2, 2]);
	bs.colorDistribution('gradient', [
		'#839788',
		'#839788',
	]);

	return bs;
}
function initializeNavBsBlue(i) {
	let line = new Line(
		10,
		navCanvareas[i].htmlCanvas.height * 0.75,
		navCanvareas[i].htmlCanvas.width - 10,
		navCanvareas[i].htmlCanvas.height * 0.75,
		'black',
		1,
		'unstable',
		false
	);
	line.granularityCoefficients['spatial'] = 2;
	line.granularityCoefficients['width'] = 1;
	let bs = new BrushStroke(line, 5);
	bs.deviation = 2;
	bs.widthDistribution('linear', [2, 2]);
	bs.colorDistribution('gradient', [
		'#bfd7ea',
		'#bfd7ea',
	]);

	return bs;
}
function initializeNavBsBeige(i) {
	let line = new Line(
		10,
		navCanvareas[i].htmlCanvas.height * 0.75,
		navCanvareas[i].htmlCanvas.width - 10,
		navCanvareas[i].htmlCanvas.height * 0.75,
		'black',
		1,
		'unstable',
		false
	);
	line.granularityCoefficients['spatial'] = 2;
	line.granularityCoefficients['width'] = 1;
	let bs = new BrushStroke(line, 5);
	bs.deviation = 2;
	bs.widthDistribution('linear', [2, 2]);
	bs.colorDistribution('gradient', [
		'#eee0cb',
		'#eee0cb',
	]);

	return bs;
}
