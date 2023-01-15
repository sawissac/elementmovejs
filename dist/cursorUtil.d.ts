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
export declare class CursorUtil {
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
export {};
//# sourceMappingURL=cursorUtil.d.ts.map