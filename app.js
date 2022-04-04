import { ElementMove } from "./elementmove.js";
import { CursorDetect } from "./cursordetectjs/cursordetect.js";

const em = new ElementMove({
  target: document.getElementById("move-target"),
  boundary: {
    target: document.getElementById("boundary"),
  },
});

em.addCursorDetection(
  new CursorDetect({
    target: document.getElementById("boundary"),
    type: "outer",
  })
);
em.onMove();
