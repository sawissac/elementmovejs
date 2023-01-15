import { CursorUtil } from "./cursorUtil";

interface ElementPosition {
  top: number;
  left: number;
  right: number;
  bottom: number;
}

interface ScreenBoundary {
  width: number;
  height: number;
}

interface MoveUtilArgs {
  el: HTMLElement;
  boundary: HTMLElement | undefined | null;
  detection: CursorUtil;
  pushBackDistance?: number;
}

export const ScreenBoundaryDetection = (el: HTMLElement) => {
  const element = el ? el : document.getElementById("move-util-boundary");
  return {
    boundary: element,
    detection: new CursorUtil({
      el: element,
      type: "outer",
    }),
  };
};

export class MoveUtil {
  private element: HTMLElement | undefined | null = null;
  private screen: HTMLElement | undefined | null = null;
  private boundaryPadding: number | undefined | null = null;
  private cursorUtil: CursorUtil | null = null;
  private closeMethod: Function | undefined | null = null;
  private boundary: ScreenBoundary = {
    width: 0,
    height: 0,
  };
  private position: ElementPosition = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };
  constructor(options: MoveUtilArgs) {
    this.element = options.el;
    this.screen = options.boundary;
    this.cursorUtil = options.detection;
    this.boundaryPadding = options.pushBackDistance;
    this.setBoundaryLimit();
    this.cursorUtil.listen();
    this.setEvent();
  }

  private setBoundaryLimit() {
    this.boundary.width = this.screen?.clientWidth as number;
    this.boundary.height = this.screen?.clientHeight as number;
  }

  private isBoundaryExceed() {
    const el = this.element as HTMLElement;
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

  private setEvent() {
    const element = this.element as HTMLElement;
    const screen = this.screen as HTMLElement;
    const elementStyle = element.style as CSSStyleDeclaration;

    elementStyle.position = "absolute";

    let mouseMoveHandler: any = null;

    let mouseDownHandler = (ev: MouseEvent) => {
      const elementLeft = ev.offsetX;
      const elementTop = ev.offsetY;
      mouseMoveHandler = (ev2: MouseEvent) => {
        const elementInnerLeft = ev2.clientX;
        const elementInnerTop = ev2.clientY;
        let { clientWidth, clientHeight } = this.element as HTMLElement;
        elementStyle.top =
          (this.cursorUtil?.getCursorY() as number) - elementTop + "px";
        elementStyle.left =
          (this.cursorUtil?.getCursorX() as number) - elementLeft + "px";
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

  public closeEvent() {
    const close = this.closeMethod as Function;
    close();
  }

  public setPosition(options: ElementPosition) {
    
    this.position = {...this.position, ...options};

    const element = this.element as HTMLElement;
    const elementStyle = element.style as CSSStyleDeclaration;

    elementStyle.top = this.position.top + "px";
    elementStyle.left = this.position.left + "px";
  }
}
