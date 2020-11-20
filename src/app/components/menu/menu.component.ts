import { Component, OnInit, Input, HostListener } from "@angular/core";
import { Step } from "src/app/service/step.service";

@Component({
  selector: "rating-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"],
})
export class MenuComponent implements OnInit {
  public isMobile = false;
  public sliceMobileStart = 0;
  public sliceMobileEnd = 0;

  private _steps: Step[];
  @Input() set steps(s) {
    this._steps = Object.values(s);
  }

  get steps() {
    return this._steps;
  }

  private _currentStep: Step;
  get currentStep(): Step {
    return this._currentStep;
  }

  @Input() set currentStep(cs: Step) {
    if (cs.id === 0) {
      this.onResize();
    }
    this._currentStep = cs;

  }

  @Input() averageDwz: number;

  @HostListener("window:resize", [])
  private onResize() {
    this.checkWindowWidth();
    this.sliceMenu();
  }

  ngOnInit() {
    this.onResize();
  }

  private checkWindowWidth(): void {
    if (window.innerWidth <= 480) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  private sliceMenu(): void {
    if (!!this.currentStep && this.isMobile) {
      this.sliceMobileStart = this.currentStep.id;
      this.sliceMobileEnd = this.currentStep.id + 1;
    } else {
      this.sliceMobileStart = 0;
      this.sliceMobileEnd = this.steps.length;
    }
  }
}
