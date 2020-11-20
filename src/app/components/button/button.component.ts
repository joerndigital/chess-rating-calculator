import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChange,
  OnChanges,
} from "@angular/core";
import { Step } from "src/app/service/step.service";
import { tap, debounceTime } from "rxjs/operators";
import { Subscription } from "rxjs";
import { hintAnimation } from "./hint.animation";

@Component({
  selector: "rating-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"],
  animations: [hintAnimation],
})
export class InputButtonComponent implements OnChanges {
  @Input() stepId: number;
  @Input() step: Step;
  @Input() size: string;
  @Input() showHint = false;

  private _numberOfOpponents = 0;
  get numberOfOpponents(): number {
    return this._numberOfOpponents;
  }

  @Input() set numberOfOpponents(n: number) {
    this._numberOfOpponents = n;
  }

  @Output() continue: EventEmitter<any> = new EventEmitter<any>();
  @Output() action: EventEmitter<any> = new EventEmitter<any>();

  public disabled = true;

  private changeSubscription: Subscription;

  ngOnChanges(change: { stepId: SimpleChange, showHint: SimpleChange }) {
    if (!!change.stepId) {
      this.subscribeToStepChange();
      this.setDisabled();
      this.setShowHint();
    }
  }

  private subscribeToStepChange(): void {
    if (this.changeSubscription) {
      this.changeSubscription.unsubscribe();
    }

    this.changeSubscription = this.step.change$
      .pipe(
        debounceTime(100),
        tap(() => {
          if (this.step.isValidStep) {
            this.disabled = false;
            this.showHint = false;
          } else {
            this.disabled = true;
          }
        })
      )
      .subscribe();
  }

  private setDisabled(): void {
    this.disabled = !this.step.isValidStep;
  }

  private setShowHint(): void {
    this.showHint =
      !!this.step.hint && !!this.step.result && !this.step.isValidStep;
  }

  public onClick(): void {
    if (!this.disabled || this.numberOfOpponents > 0) {
      this.continue.emit();
      this.showHint = false;
    } else {
      this.showHint = !!this.step.hint;
    }
  }

  public onHelperClick(): void {
    this.action.emit();
  }
}
