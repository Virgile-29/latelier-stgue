const totalSections = 4;

let boardCanvareas = new Array(2);
let navCanvareas = new Array(totalSections);

let { windowHeight, windowWidth } =
	setWindowDimensions();

let navLinks = Array.from(
	document.querySelectorAll('.navbar-item')
);

let mustPaintNavBs = [false, false, false, false];
let mustDeleteNavBs = [
	false,
	false,
	false,
	false,
];

let initBoardBrushStrokes = [mainBs, ContactBs];

let initNavBrushStrokes = [
	//Au cas ou l'on voudrait changer le style de certains surlignement de sections
	initializeNavBsPink,
	initializeNavBsGreen,
	initializeNavBsBlue,
	initializeNavBsBeige,
];

let boardBrushStrokes = new Array(2);
let navBrushStrokes = new Array(totalSections);

let secondsPassed = 0;
let oldTimeStamp = 0;

initBoardCanvareas();

createNavCanvarea();

initBrushStrokes();

startRenderLoop();

window.addEventListener(
	'orientationchange',
	function () {
		permuteCanvasDimensions();
		reSizeCanvas();
		initBrushStrokes();
		boardCanvareas[0].filter = new Filter(
			0,
			boardCanvareas[0].htmlCanvas.height / 3,
			0.8,
			0.85
		);
	},
	false
);

window.addEventListener(
	'resize',
	function () {
		setWindowDimensions();
		windowHeight = innerHeight;
		windowWidth = innerWidth;
		reSizeCanvas();
		initBrushStrokes();
		boardCanvareas[0].filter = new Filter(
			0,
			boardCanvareas[0].htmlCanvas.height / 3,
			0.8,
			0.85
		);
	},
	false
);
boardCanvareas[0].filter = new Filter(
	0,
	boardCanvareas[0].htmlCanvas.height / 3,
	0.8,
	0.85
);

for (let i = 0; i < navCanvareas.length; i++) {
	navLinks[i].addEventListener(
		'mouseenter',
		function () {
			mustPaintNavBs[i] = true;
		},
		false
	);
}
for (let i = 0; i < navCanvareas.length; i++) {
	navLinks[i].addEventListener(
		'mouseleave',
		function () {
			mustDeleteNavBs[i] = true;
		},
		false
	);
}

function startRenderLoop() {
	window.requestAnimationFrame(renderLoop);
}

function renderLoop(timeStamp) {
	secondsPassed =
		(timeStamp - oldTimeStamp) / 1000;
	oldTimeStamp = timeStamp;

	if (boardCanvareas[0].isWithinReach) {
		boardBrushStrokes[0].draw(
			1,
			boardCanvareas[0]
		);
	}
	boardBrushStrokes[1].draw(1, boardCanvareas[1]);

	for (
		let i = 0;
		i < mustPaintNavBs.length;
		i++
	) {
		if (mustPaintNavBs[i]) {
			navBrushStrokes[i].draw(
				10,
				navCanvareas[i]
			);
		}
		if (mustDeleteNavBs[i]) {
			navCanvareas[i].context.clearRect(
				0,
				0,
				navCanvareas[i].htmlCanvas.width,
				navCanvareas[i].htmlCanvas.height
			);
			resetNavBrushStrokes();
			mustDeleteNavBs[i] = false;
			mustPaintNavBs[i] = false;
		}
	}

	window.requestAnimationFrame(renderLoop);
}

function initBoardCanvareas() {
	boardCanvareas[0] = new Canvarea(
		document.getElementById('canvas1')
	);
	boardCanvareas[0].setDimensions(
		innerHeight * 3,
		innerWidth
	);
	boardCanvareas[1] = new Canvarea(
		document.getElementById('canvas2')
	);

	boardCanvareas[1].setDimensions(
		getSection4Height(),
		innerWidth
	);
}

function createNavCanvarea() {
	for (let i = 0; i < navLinks.length; i++) {
		let navLinkRect =
			navLinks[i].getBoundingClientRect(); // On aurait pu mettre navLinks[i] mais ainsi tous les canvas auront la meme dimension peu importe la longueur du texte du navlink
		let canvas = createCanvas(i, navLinkRect);
		navLinks[i].appendChild(canvas);
		navCanvareas[i] = new Canvarea(
			document.getElementById('Navcanvas' + i)
		);
	}

	function createCanvas(i, navLinkRect) {
		let canvas = document.createElement('canvas');
		canvas.className = 'Nav-Canvas';
		canvas.id = 'Navcanvas' + i;
		canvas.width = navLinkRect.width * 1.2;
		canvas.height = navLinkRect.height * 1.2;
		return canvas;
	}
}

function getSection4Height() {
	let section4 =
		document.getElementById('section4');
	return section4.offsetHeight;
}

function reSizeCanvas() {
	boardCanvareas[0].setDimensions(
		windowHeight * 3,
		windowWidth
	);
	let section4 = getSection4Height();
	boardCanvareas[1].setDimensions(
		getSection4Height(),
		innerWidth
	);

	//ResizeNavCanvases
	for (let i = 0; i < navCanvareas.length; i++) {
		let navLinkRect =
			navLinks[i].getBoundingClientRect();
		navCanvareas[i].setDimensions(
			navLinkRect.height,
			navLinkRect.width
		);
	}
}

function permuteCanvasDimensions() {
	let canvasHeightTemp = windowHeight;
	windowHeight = windowWidth; //holy shit i know
	windowWidth = canvasHeightTemp;
}

function initBrushStrokes() {
	resetBoardBrushStrokes();
	resetNavBrushStrokes();
}

function resetBoardBrushStrokes() {
	for (
		let i = 0;
		i < boardBrushStrokes.length;
		i++
	) {
		boardBrushStrokes[i] =
			initBoardBrushStrokes[i]();
	}
}

function resetNavBrushStrokes() {
	for (
		let i = 0;
		i < navBrushStrokes.length;
		i++
	) {
		navBrushStrokes[i] =
			initNavBrushStrokes[i](i);
	}
}

function setWindowDimensions() {
	let windowHeight = innerHeight;
	let windowWidth = innerWidth;
	return {
		windowHeight: windowHeight,
		windowWidth: windowWidth,
	};
}
