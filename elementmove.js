export class ElementMove {
    constructor(options) {
        this.boundary = {
            target: options.boundary.target,
            width: options.boundary.target.clientWidth,
            height: options.boundary.target.clientHeight,
            allow: options.boundary.allow === undefined ? true : options.boundary.allow,
        };
        this.elePosition = {
            target: options.target,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
        };
    }
    close() {
        this.elePosition.target.removeEventListener("mousedown", this.mouseDownMethod);
    }
    onMove(callback) {
        this.cursorDetection.start();
        this.mouseDownMethod = (e) => {
            let eleTop = e.offsetY;
            let eleLeft = e.offsetX;
            this.mouseMoveMethod = (e) => {
                this.elePosition.target.style.left =
                    this.cursorDetection.getCursorX() - eleTop + "px";
                this.elePosition.target.style.top =
                    this.cursorDetection.getCursorY() - eleLeft + "px";
                this.elePosition.top = Number(this.elePosition.target.style.top.replace("px", ""));
                this.elePosition.left = Number(this.elePosition.target.style.left.replace("px", ""));
                this.elePosition.right =
                    e.clientX + this.elePosition.target.clientWidth;
                this.elePosition.bottom =
                    e.clientY + this.elePosition.target.clientHeight;
                this.boundary.width = this.boundary.target.clientWidth;
                this.boundary.height = this.boundary.target.clientHeight;
            };
            this.elePosition.target.addEventListener("mousemove", this.mouseMoveMethod);
        };
        this.elePosition.target.onmouseup = () => {
            this.isBoundaryExceed();
            this.elePosition.target.removeEventListener("mousemove", this.mouseMoveMethod);
        };
        this.elePosition.target.onmouseleave = () => {
            this.isBoundaryExceed();
            this.elePosition.target.removeEventListener("mousemove", this.mouseMoveMethod);
        };
        this.elePosition.target.onmousedown = this.mouseDownMethod;
    }
    isBoundaryExceed() {
        if (this.elePosition.right > this.boundary.width) {
            this.elePosition.target.style.left =
                this.boundary.width - 30 - this.elePosition.target.clientWidth + "px";
        }
        if (this.elePosition.bottom > this.boundary.height) {
            this.elePosition.target.style.top =
                this.boundary.height - 30 - this.elePosition.target.clientHeight + "px";
        }
        console.log(this.elePosition.left);
        if (this.elePosition.left <= 0) {
            this.elePosition.target.style.left = 30 + "px";
        }
        if (this.elePosition.top <= 0) {
            this.elePosition.target.style.top = 30 + "px";
        }
    }
    getBoundary() {
        return {
            width: this.boundary.width,
            height: this.boundary.height,
        };
    }
    addCursorDetection(args) {
        this.cursorDetection = args;
    }
}
