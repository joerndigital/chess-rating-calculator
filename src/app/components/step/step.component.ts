import { Component, Input } from "@angular/core";
import { Step } from "src/app/service/step.service";

@Component({
  selector: "rating-step",
  templateUrl: "./step.component.html",
  styleUrls: ["./step.component.scss"],
})
export class StepComponent {
  @Input() step!: Step;
}
