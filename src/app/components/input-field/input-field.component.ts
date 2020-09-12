import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  AfterViewInit,
  ChangeDetectionStrategy,
} from "@angular/core";
import { Step } from 'src/app/service/step.service';

@Component({
  selector: "rating-input",
  templateUrl: "./input-field.component.html",
  styleUrls: ["./input-field.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent implements AfterViewInit {

  @Input() step: Step;

  @Input() value: number | string;
  @Input() helperValue: number | string;
  @Output() valueChanged: EventEmitter<{[key: string]: number}> = new EventEmitter<{[key: string]: number}>(undefined);

  @ViewChild("inputField", { static: false }) inputRef;

  ngAfterViewInit() {
    this.inputRef.nativeElement.focus(); // als Directive? ja, da gegeg SRP

  }

  onChange(key, value) {
    if (!!this.inputRef.nativeElement && (!!value || value === 0)) {
      this.valueChanged.emit({key, value: Number(value)});
    }
  }
}
