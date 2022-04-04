export interface CursorDetectionInterface {
  getCursorX(): number;
  getCursorY(): number;
  start(
    callback?: (options: { cursorX: number; cursorY: number }) => void
  ): void;
  close(): void;
}

export interface ElementMoveInterface {
  onMove(
    callback: (position: {
      top: number;
      left: number;
      right: number;
      bottom: number;
    }) => void
  ): void;
  addCursorDetection(args: CursorDetectionInterface): void;
  getBoundary(): {
    width: number;
    height: number;
  };
  isBoundaryExceed(): void;
  close(): void;
}

export class ElementMove implements ElementMoveInterface {
  private cursorDetection: CursorDetectionInterface;
  private elePosition: {
    target: HTMLElement;
    top: number;
    left: number;
    right: number;
    bottom: number;
  };
  private boundary: {
    target: HTMLElement;
    width: number;
    height: number;
    allow: boolean;
  };
  private mouseMoveMethod;
  private mouseDownMethod;

  constructor(options: {
    target: HTMLElement;
    boundary: { target: HTMLElement; allow?: boolean };
  }) {
    this.boundary = {
      target: options.boundary.target,
      width: options.boundary.target.clientWidth,
      height: options.boundary.target.clientHeight,
      allow:
        options.boundary.allow === undefined ? true : options.boundary.allow,
    };
    this.elePosition = {
      target: options.target,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    };
  }
  public close(): void {
    this.elePosition.target.removeEventListener(
      "mousedown",
      this.mouseDownMethod
    );
  }
  public onMove(
    callback?: (position: {
      top: number;
      left: number;
      right: number;
      bottom: number;
    }) => void
  ) {
    this.cursorDetection.start();
    this.mouseDownMethod = (e: MouseEvent) => {
      let eleTop = e.offsetY;
      let eleLeft = e.offsetX;

      this.mouseMoveMethod = (e: MouseEvent) => {
        this.elePosition.target.style.left =
          this.cursorDetection.getCursorX() - eleTop + "px";
        this.elePosition.target.style.top =
          this.cursorDetection.getCursorY() - eleLeft + "px";
        this.elePosition.top = Number(this.elePosition.target.style.top.replace("px",""));
        this.elePosition.left = Number(this.elePosition.target.style.left.replace("px",""));
        this.elePosition.right =
          e.clientX + this.elePosition.target.clientWidth;
        this.elePosition.bottom =
          e.clientY + this.elePosition.target.clientHeight;
        this.boundary.width = this.boundary.target.clientWidth;
        this.boundary.height = this.boundary.target.clientHeight;
      };

      this.elePosition.target.addEventListener(
        "mousemove",
        this.mouseMoveMethod
      );
    };

    this.elePosition.target.onmouseup = () => {
      this.isBoundaryExceed();
      this.elePosition.target.removeEventListener(
        "mousemove",
        this.mouseMoveMethod
      );
    };
    this.elePosition.target.onmouseleave = () => {
      this.isBoundaryExceed();
      this.elePosition.target.removeEventListener(
        "mousemove",
        this.mouseMoveMethod
      );
    };

    this.elePosition.target.onmousedown = this.mouseDownMethod;
  }
  public isBoundaryExceed(): void {
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
    if(this.elePosition.top <= 0){
      this.elePosition.target.style.top = 30 + "px";
    }
  }
  public getBoundary(): { width: number; height: number } {
    return {
      width: this.boundary.width,
      height: this.boundary.height,
    };
  }

  public addCursorDetection(args: CursorDetectionInterface): void {
    this.cursorDetection = args;
  }
}
