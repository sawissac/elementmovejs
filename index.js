class CursorUtil {
    constructor(options) {
        this.type = "outer";
        this.cursorPos = { x: 0, y: 0 };
        this.container = null;
        this.cursorMoveMethod = null;
        this.container = options.el;
        this.type = options.type;
    }
    getCursorX() {
        return this.cursorPos.x;
    }
    getCursorY() {
        return this.cursorPos.y;
    }
    closeEvent() {
        let close = this.cursorMoveMethod;
        close();
    }
    listen(callback) {
        var _a;
        let cursorMoveHandler = (e) => {
            if (this.type === "outer") {
                this.cursorPos.x = e.clientX;
                this.cursorPos.y = e.clientY;
            }
            if (this.type === "inner") {
                this.cursorPos.x = e.offsetX;
                this.cursorPos.y = e.offsetY;
            }
            if (callback !== undefined) {
                callback({
                    cursorX: this.getCursorX(),
                    cursorY: this.getCursorY(),
                });
            }
        };
        (_a = this.container) === null || _a === void 0 ? void 0 : _a.addEventListener("mousemove", cursorMoveHandler, true);
        this.cursorMoveMethod = () => {
            var _a;
            (_a = this.container) === null || _a === void 0 ? void 0 : _a.addEventListener("mousemove", cursorMoveHandler, true);
        };
    }
}

const ScreenBoundaryDetection = (el) => {
    const element = el ? el : document.getElementById("move-util-boundary");
    return {
        boundary: element,
        detection: new CursorUtil({
            el: element,
            type: "outer",
        }),
    };
};
class MoveUtil {
    constructor(options) {
        this.element = null;
        this.screen = null;
        this.boundaryPadding = null;
        this.cursorUtil = null;
        this.closeMethod = null;
        this.boundary = {
            width: 0,
            height: 0,
        };
        this.position = {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
        };
        this.element = options.el;
        this.screen = options.boundary;
        this.cursorUtil = options.detection;
        this.boundaryPadding = options.pushBackDistance;
        this.setBoundaryLimit();
        this.cursorUtil.listen();
        this.setEvent();
    }
    setBoundaryLimit() {
        var _a, _b;
        this.boundary.width = (_a = this.screen) === null || _a === void 0 ? void 0 : _a.clientWidth;
        this.boundary.height = (_b = this.screen) === null || _b === void 0 ? void 0 : _b.clientHeight;
    }
    isBoundaryExceed() {
        const el = this.element;
        const padding = this.boundaryPadding ? this.boundaryPadding : 30;
        if (this.position.right > this.boundary.width) {
            el.style.left = this.boundary.width - padding - el.clientWidth + "px";
        }
        if (this.position.bottom > this.boundary.height) {
            el.style.top = this.boundary.height - padding - el.clientHeight + "px";
        }
        if (this.position.left <= 0) {
            el.style.left = padding + "px";
        }
        if (this.position.top <= 0) {
            el.style.top = padding + "px";
        }
    }
    setEvent() {
        const element = this.element;
        const screen = this.screen;
        const elementStyle = element.style;
        elementStyle.position = "absolute";
        let mouseMoveHandler = null;
        let mouseDownHandler = (ev) => {
            const elementLeft = ev.offsetX;
            const elementTop = ev.offsetY;
            mouseMoveHandler = (ev2) => {
                var _a, _b;
                const elementInnerLeft = ev2.clientX;
                const elementInnerTop = ev2.clientY;
                let { clientWidth, clientHeight } = this.element;
                elementStyle.top =
                    ((_a = this.cursorUtil) === null || _a === void 0 ? void 0 : _a.getCursorY()) - elementTop + "px";
                elementStyle.left =
                    ((_b = this.cursorUtil) === null || _b === void 0 ? void 0 : _b.getCursorX()) - elementLeft + "px";
                this.position.top = Number(elementStyle.top.replace("px", ""));
                this.position.left = Number(elementStyle.left.replace("px", ""));
                this.position.right = elementInnerLeft + clientWidth;
                this.position.bottom = elementInnerTop + clientHeight;
            };
            element.addEventListener("mousemove", mouseMoveHandler);
        };
        let screenChangeHandler = () => {
            this.setBoundaryLimit();
        };
        let removeMouseHandler = () => {
            this.isBoundaryExceed();
            element.removeEventListener("mousemove", mouseMoveHandler);
        };
        window.addEventListener("resize", screenChangeHandler);
        element.addEventListener("mouseup", removeMouseHandler);
        element.addEventListener("mouseleave", removeMouseHandler);
        element.addEventListener("mousedown", mouseDownHandler);
        this.closeMethod = () => {
            screen.removeEventListener("resize", screenChangeHandler);
            element.removeEventListener("mouseup", removeMouseHandler);
            element.removeEventListener("mouseleave", removeMouseHandler);
            element.removeEventListener("mousedown", mouseDownHandler);
        };
    }
    closeEvent() {
        const close = this.closeMethod;
        close();
    }
    setPosition(options) {
        this.position = Object.assign(Object.assign({}, this.position), options);
        const element = this.element;
        const elementStyle = element.style;
        elementStyle.top = this.position.top + "px";
        elementStyle.left = this.position.left + "px";
    }
}

export { MoveUtil, ScreenBoundaryDetection };
