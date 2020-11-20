import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  AfterViewInit,
  ChangeDetectionStrategy,
  SimpleChanges,
  OnChanges,
} from "@angular/core";
import { Step } from "src/app/service/step.service";

@Component({
  selector: "rating-input",
  templateUrl: "./input-field.component.html",
  styleUrls: ["./input-field.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements OnChanges, AfterViewInit {
  @Input() step: Step;
  @Input() result: number;
  @Input() helperResult: number;
  @Output() valueChanged: EventEmitter<{
    [key: string]: number;
  }> = new EventEmitter<{ [key: string]: number }>(undefined);

  public showDropdown = false;
  public dropdownClicked = false;

  @ViewChild("inputField", { static: false }) inputRef;

  ngOnChanges(change: SimpleChanges) {
    this.focusInput(change);
    this.resetInput(change);
  }

  ngAfterViewInit() {
    this.focusInput();
  }

  private focusInput(change?: SimpleChanges): void {
    if (this.changedStep(change) || this.hasEmptyHelperResult(change)) {
      if (!!this.inputRef && !!this.inputRef.nativeElement) {
        this.inputRef.nativeElement.focus();
        return;
      }
    }

    if (!change) {
      this.inputRef.nativeElement.focus();
    }
  }

  private changedStep(change: SimpleChanges): boolean {
    return (
      !!change &&
      !!change.step &&
      !!change.step.previousValue &&
      change.step.previousValue.id !== change.step.currentValue.id
    );
  }

  private hasEmptyHelperResult(change: SimpleChanges): boolean {
    return (
      !!change && !!change.helperResult && change.helperResult.currentValue === undefined
    );
  }

  private resetInput(change?: SimpleChanges): void {
    if (!!change.step && change.step.currentValue.id === 2) {
      this.result = undefined;
      this.helperResult = undefined;
    }
  }

  public onChange(key, value: number): void {
    if (key === "gameResult") {
      value = this.validateGameResult(value);
    }

    if (!!value || value === 0) {
      this.emitValue(key, value);
    }
  }

  private validateGameResult(value: number): number {
    if (!!value || value === 0) {
      value = Number(("" + value).replace(/,/g, "."));

      const regex = new RegExp("^[01]$|^0.5*$", "g");
      if (!regex.test("" + value)) {
        value = 1;
      }
    }

    return value;
  }

  private emitValue(key, value: number): void {
    this.dropdownClicked = true;
    this.valueChanged.emit({ key, value: Number(value) });
  }

  public showOrHideDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }
}
