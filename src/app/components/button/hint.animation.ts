import {
  trigger,
  style,
  animate,
  transition,
  keyframes,
} from "@angular/animations";

export const hintAnimation = trigger("showHint", [
  transition(":enter", [
    animate(
      "0.3s",
      keyframes([
        style({ opacity: 0.1, transform: "scale(0)" }),
        style({ opacity: 0.6, transform: "scale(1.3)" }),
        style({ opacity: 1, transform: "scale(1)" }),
      ])
    ),
  ]),
  transition(":leave", [
    animate(
      "0.2s",
      keyframes([
        style({ opacity: 1, transform: "scale(1)" }),
        style({ opacity: 0.6, transform: "scale(1.3)" }),
        style({ opacity: 0, transform: "scale(0)" }),
      ])
    ),
  ]),
]);
