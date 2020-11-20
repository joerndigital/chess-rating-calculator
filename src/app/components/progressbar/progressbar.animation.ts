import {
  trigger,
  state,
  style,
  animate,
  transition,
} from "@angular/animations";

export const progressbarAnimation = trigger("openClose", [
  state(
    "step0",
    style({
      width: "0",
    })
  ),
  state(
    "step1",
    style({
      width: "28%",
    })
  ),
  state(
    "step2",
    style({
      width: "46%",
    })
  ),
  state(
    "step3",
    style({
      width: "64%",
    })
  ),
  state(
    "step4",
    style({
      width: "100%",
    })
  ),
  transition("step0 => step1", [animate("0.5s")]),
  transition("step1 => step2", [animate("0.5s")]),
  transition("step2 => step3", [animate("0.5s")]),
  transition("step3 => step4", [animate("0.5s")]),
]);
