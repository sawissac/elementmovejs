import { CursorUtil } from "./cursorUtil";
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
export declare const ScreenBoundaryDetection: (el: HTMLElement) => {
    boundary: HTMLElement | null;
    detection: CursorUtil;
};
export declare class MoveUtil {
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
export {};
//# sourceMappingURL=moveutil.d.ts.map