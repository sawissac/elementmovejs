type CursorUtilType = "inner" | "outer";

interface CursorUtilArgs {
  el: HTMLElement | undefined | null;
  type: CursorUtilType;
}

interface CursorPosition {
  x: number;
  y: number;
}

interface CursorListener {
  (options: { cursorX: number; cursorY: number }): void;
}

export class CursorUtil {
  private type: CursorUtilType = "outer";
  private cursorPos: CursorPosition = { x: 0, y: 0 };
  private container: HTMLElement | undefined | null = null;
  private cursorMoveMethod: Function | undefined | null = null;

  constructor(options: CursorUtilArgs) {
    this.container = options.el;
    this.type = options.type;
  }

  public getCursorX(): number {
    return this.cursorPos.x;
  }
  public getCursorY(): number {
    return this.cursorPos.y;
  }

  public closeEvent(): void {
    let close = this.cursorMoveMethod as Function;
    close();
  }

  public listen(callback?: CursorListener): void {
    let cursorMoveHandler = (e: MouseEvent) => {
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
    
    this.container?.addEventListener("mousemove", cursorMoveHandler, true);

    this.cursorMoveMethod = () => {
      this.container?.addEventListener("mousemove",cursorMoveHandler,true);
    }
  }
}
