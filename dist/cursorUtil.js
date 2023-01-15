export class CursorUtil {
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
//# sourceMappingURL=cursorUtil.js.map