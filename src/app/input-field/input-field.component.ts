import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  AfterViewInit,
  ChangeDetectionStrategy,
} from "@angular/core";

@Component({
  selector: "rating-input",
  templateUrl: "./input-field.component.html",
  styleUrls: ["./input-field.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent implements AfterViewInit {

  @Input() step: any;

  @Input() value: number | string;
  @Output() valueChanged: EventEmitter<number> = new EventEmitter<number>(undefined);

  @ViewChild("inputField", { static: false }) inputRef;

  ngAfterViewInit() {
    this.inputRef.nativeElement.focus(); // als Directive? ja, da gegeg SRP

  }

  onChange(change) {
    if (!!this.inputRef.nativeElement) {
      this.valueChanged.emit(this.inputRef.nativeElement.value);
    }
  }
}
