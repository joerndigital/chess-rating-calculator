import {
  Component,
  ElementRef,
  Input,
} from "@angular/core";

@Component({
  selector: "rating-progressbar",
  templateUrl: "./progressbar.component.html",
  styleUrls: ["./progressbar.component.scss"],
})
export class ProgressbarComponent {
  private _step: number;

  get step() {
    return this._step;
  }

  @Input() set step(next: number) {
    next = next * 2 + 2 === 8 ? next * 2 + 8 : next * 2 + 2; // als Funktion
    this.hostElement.nativeElement.style.gridColumnEnd = next; // todo use renderer2
    this._step = next;
  }

  constructor(private hostElement: ElementRef) {}
}
