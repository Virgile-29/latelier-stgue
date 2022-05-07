class Canima {
    static define() {
        function canvarea(id, className = "Canvarea") {
            let htmlCanvas = document.createElement("canvas");
            htmlCanvas.id = id;
            htmlCanvas.className = className;
            return new Canvarea(htmlCanvas);
        }
        return {
            canvarea: canvarea,
        };
    }
    static bind() {
        function adaptative(canvarea, htmlElement) {
            let htmlElementRect = htmlElement.getBoundingClientRect();
            canvarea.setDimensions(htmlElementRect.width, htmlElementRect.height);
            htmlElement.appendChild(canvarea);
        }
        return {
            adaptative: adaptative,
        };
    }
}