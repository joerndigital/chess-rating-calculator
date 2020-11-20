import {
  Component,
  HostListener,
  ChangeDetectionStrategy,
} from "@angular/core";
import { DwzService } from "./service/dwz.service";
import { StepService, Step } from "./service/step.service";

@Component({
  selector: "rating-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public showErrorHint = false;

  @HostListener("window:keyup", ["$event"])
  keyEvent(event: KeyboardEvent) {
    // enter
    if (event.key === "Enter" || event.key === "ArrowRight") {
      this.goToNextStep();
      this.toggleErrorHint();
    }

    // next
    if (event.key === "ArrowLeft") {
      this.goToPreviousStep();
      this.toggleErrorHint();
    }

    // space
    if (event.key === " ") {
      this.onAction();
      this.toggleErrorHint();
    }
  }

  constructor(public dwzService: DwzService, public stepService: StepService) {}

  private toggleErrorHint(): void {
    if (!this.stepService.currentStep.isValidStep) {
      this.showErrorHint = true;
    } else {
      this.showErrorHint = false;
    }
  }

  goToNextStep() {
    if (
      !this.stepService.currentStep.isValidStep &&
      !(this.stepService.currentStep.id === 2 &&
        this.dwzService.opponents.length > 0)
    ) {
      return;
    }

    if (this.stepService.currentStep.id < 3) {
      switch (this.stepService.currentStep.key) {
        case "currentDwz":
          this.dwzService.currentDwz = Number(
            this.stepService.currentStep.result
          );
          this.dwzService.numberOfDwzEvaluations = Number(
            this.stepService.currentStep.helper.result
          );

          break;

        case "yearOfBirth":
          this.dwzService.yearOfBirth = Number(
            this.stepService.currentStep.result
          );
          break;

        case "currentDwzOfOpponent":
          this.stepService.currentStep.helper.result =
            this.stepService.currentStep.helper.result !== undefined
              ? this.stepService.currentStep.helper.result
              : this.stepService.currentStep.helper.placeholder;

          if (!!this.stepService.currentStep.result) {
            this.dwzService.addOpponent({
              currentDwz: Number(this.stepService.currentStep.result),
              gameResult: Number(this.stepService.currentStep.helper.result),
            });
          }

          this.stepService.steps.newDwz.result = this.dwzService.calculate();

          break;

        default:
          break;
      }

      const id = this.stepService.currentStep.id;
      const newId = id + 1;

      this.stepService.currentStep = Object.values(this.stepService.steps).find(
        (step) => step.id === newId
      );
    }
  }

  onInputChange({ key, value }) {
    let step: Step = Object.values(this.stepService.steps).find(
      (_step) => _step.key === key
    );

    if (!!step) {
      step.result = Number(value);
      return;
    }

    step = Object.values(this.stepService.steps).find(
      (_step) => _step.helper.key === key
    );

    if (!!step) {
      step.helper.result = Number(value);
      return;
    }

    // auslagern: Ist Aufgabe des dwzService
  }

  goToPreviousStep() {
    if (this.stepService.currentStep.id > 0) {
      const id = this.stepService.currentStep.id;
      const newId = id - 1;

      this.stepService.currentStep = Object.values(this.stepService.steps).find(
        (step) => step.id === newId
      );

      // this.stepService.currentStep -= 1; // auslagern: Ist Aufgabe des stepService
    }
  }

  onAction() {
    if (
      this.stepService.currentStep.id === 2 &&
      !!this.stepService.currentStep.result &&
      this.stepService.currentStep.isValidStep
    ) {
      const helperResult = this.stepService.currentStep.helper.result;

      const isValidHelperResult = !!helperResult || helperResult === 0;

      this.dwzService.addOpponent({
        currentDwz: Number(this.stepService.currentStep.result),
        gameResult: Number(isValidHelperResult ? helperResult : 1),
      });

      this.stepService.currentStep.result = undefined;
      this.stepService.currentStep.helper.result = undefined;
    }
  }
}
