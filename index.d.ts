type CursorUtilType = "inner" | "outer";
interface CursorUtilArgs {
    el: HTMLElement | undefined | null;
    type: CursorUtilType;
}
interface CursorListener {
    (options: {
        cursorX: number;
        cursorY: number;
    }): void;
}
declare class CursorUtil {
    private type;
    private cursorPos;
    private container;
    private cursorMoveMethod;
    constructor(options: CursorUtilArgs);
    getCursorX(): number;
    getCursorY(): number;
    closeEvent(): void;
    listen(callback?: CursorListener): void;
}

interface ElementPosition {
    top: number;
    left: number;
    right: number;
    bottom: number;
}
interface MoveUtilArgs {
    el: HTMLElement;
    boundary: HTMLElement | undefined | null;
    detection: CursorUtil;
    pushBackDistance?: number;
}
declare const ScreenBoundaryDetection: (el: HTMLElement) => {
    boundary: HTMLElement | null;
    detection: CursorUtil;
};
declare class MoveUtil {
    private element;
    private screen;
    private boundaryPadding;
    private cursorUtil;
    private closeMethod;
    private boundary;
    private position;
    constructor(options: MoveUtilArgs);
    private setBoundaryLimit;
    private isBoundaryExceed;
    private setEvent;
    closeEvent(): void;
    setPosition(options: ElementPosition): void;
}

export { MoveUtil, ScreenBoundaryDetection };
