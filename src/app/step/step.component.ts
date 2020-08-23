import { Component, Input } from "@angular/core";

@Component({
  selector: "rating-step",
  templateUrl: "./step.component.html",
  styleUrls: ["./step.component.scss"],
})
export class StepComponent {
  @Input() step!: any;
}
