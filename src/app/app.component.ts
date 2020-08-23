import { Component, HostListener } from "@angular/core";
import { DwzService } from "./service/dwz.service";
import { StepService } from "./service/step.service";

@Component({
  selector: "rating-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "chess-rating-calculator";

  @HostListener("window:keyup", ["$event"])
  keyEvent(event: KeyboardEvent) {
    console.log(event);

    // enter
    if (event.key === "Enter") {
      this.goToNextStep();
    }

    // backspace
    if (event.key === "Backspace") {
      this.goToPreviousStep();
    }
  }

  constructor(public dwzService: DwzService, public stepService: StepService) {}

  goToNextStep() {
    // rename to gotToNextStep
    this.stepService.steps[this.stepService.currentStep].result =
      this.dwzService.currentValue ||
      this.stepService.steps[this.stepService.currentStep].placeholder;

    if (this.stepService.currentStep === 0) {
      this.dwzService.currentDwz = Number(this.dwzService.currentValue);
      this.dwzService.numberOfDwzEvaluations = 6;
    }

    if (this.stepService.currentStep === 1) {
      this.dwzService.yearOfBirth = Number(this.dwzService.currentValue);
    }

    if (this.stepService.currentStep === 2) {
      this.dwzService.addOpponent({
        currentDwz: Number(this.dwzService.currentValue),
        gameResult: 1,
      });
      this.stepService.steps[3].result = this.dwzService.calculate();
    }

    this.dwzService.currentValue = null;

    if (this.stepService.currentStep < 3) {
      this.stepService.currentStep++;
      console.log(this.stepService.currentStep);
    } else if (this.stepService.currentStep === 3) {
    }

    console.log(this.dwzService);
  }

  onInputChange(input) {
    this.dwzService.currentValue = input; // auslagern: Ist Aufgabe des dwzService
  }

  goToPreviousStep() {
    if (this.stepService.currentStep > 0) {
      this.stepService.currentStep -= 1; // auslagern: Ist Aufgabe des stepService
    }
  }
}
