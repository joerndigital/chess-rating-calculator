import {
  Component,
  HostListener,
  ChangeDetectionStrategy,
} from "@angular/core";
import { DwzService } from "./service/dwz.service";
import { StepService, Step } from "./service/step.service";
import { StepInterface } from "./interfaces/step.interface";

@Component({
  selector: "rating-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = "DWZ Rechner";

  @HostListener("window:keyup", ["$event"])
  keyEvent(event: KeyboardEvent) {
    // enter
    if (event.key === "Enter") {
      this.goToNextStep();
    }

    // backspace
    if (event.key === " ") {
      this.goToPreviousStep();
    }
  }

  constructor(public dwzService: DwzService, public stepService: StepService) {}

  goToNextStep() {
    if (this.stepService.currentStep.id < 3) {
      switch (this.stepService.currentStep.key) {
        case "currentDwz":
          this.dwzService.currentDwz = Number(
            this.stepService.currentStep.result
          );
          this.dwzService.numberOfDwzEvaluations = Number(
            this.stepService.currentStep.helper.result
          );

          console.log(this.stepService.currentStep.result);

          break;

        case "yearOfBirth":
          this.dwzService.yearOfBirth = Number(
            this.stepService.currentStep.result
          );
          break;

        case "currentDwzOfOpponent":
          this.stepService.currentStep.helper.result =
            !!this.stepService.currentStep.helper.result ||
            this.stepService.currentStep.helper.result === 0
              ? this.stepService.currentStep.helper.result
              : this.stepService.currentStep.helper.placeholder;

          console.log(this.stepService.currentStep.helper.result);

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

      // this.stepService.currentStep -= 1; // auslagern: Ist Aufgabe des stepService
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
    if (!!this.stepService.currentStep.result) {
      this.dwzService.addOpponent({
        currentDwz: Number(this.stepService.currentStep.result),
        gameResult: Number(this.stepService.currentStep.helper.result || 1),
      });

      this.stepService.currentStep.result = undefined;
      this.stepService.currentStep.helper.result = undefined;
    }

    console.log(this.stepService.currentStep.helper);
  }

  onDelete(index: number) {
    console.log('DELETE');
    this.dwzService.deleteOpponent(index);
  }
}
