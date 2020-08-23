import { Component, OnInit, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "rating-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"],
})
export class InputButtonComponent {
  @Input() buttonText!: string;
  @Input() size: "big" | "small";

  @Output() continue: EventEmitter<any> = new EventEmitter<any>();

  onClick() {
    this.continue.emit();
  }
}
