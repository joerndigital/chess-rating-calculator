import { Component, Input } from "@angular/core";
import { progressbarAnimation } from "./progressbar.animation";

@Component({
  selector: "rating-progressbar",
  templateUrl: "./progressbar.component.html",
  styleUrls: ["./progressbar.component.scss"],
  animations: [progressbarAnimation],
})
export class ProgressbarComponent {
  private _step: number;
  public isOpen = "step0";

  get step() {
    return this._step;
  }

  @Input() set step(next: number) {
    this.isOpen = "step" + next;
    next = next * 2 + 2 === 10 ? next * 2 + 4 : next * 2 + 2;
    this._step = next;
  }
}
