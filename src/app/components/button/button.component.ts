import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output,
  SimpleChange,
  OnChanges,
} from "@angular/core";
import { Step } from "src/app/service/step.service";
import { tap, debounceTime, filter } from "rxjs/operators";
import { Subscription } from "rxjs";
import { DwzService } from "src/app/service/dwz.service";

@Component({
  selector: "rating-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"],
})
export class InputButtonComponent implements OnChanges {
  @Input() stepId: number;
  @Input() step: Step;
  @Input() size;

  @Output() continue: EventEmitter<any> = new EventEmitter<any>();
  @Output() action: EventEmitter<any> = new EventEmitter<any>();

  public showHint = false;
  public disabled = true;

  private changeSubscription: Subscription;

  constructor(private dwzService: DwzService) {}

  ngOnChanges(change: { stepId: SimpleChange }) {
    if (!!change.stepId) {
      if (this.changeSubscription) {
        this.changeSubscription.unsubscribe();
      }

      this.disabled = !this.step.isValidStep;
      this.showHint =
        !!this.step.hint && !!this.step.result && !this.step.isValidStep;

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
  }

  onClick() {
    if (!this.disabled || this.dwzService.opponents.length > 0) {
      this.continue.emit();
      this.showHint = false;
    } else {
      this.showHint = !!this.step.hint;
    }
  }

  onHelperClick() {
    this.action.emit();
  }
}
