import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { InputComponent } from "./components/input-field/input-field.component";
import { InputButtonComponent } from "./components/button/button.component";
import { StepComponent } from "./components/step/step.component";
import { ProgressbarComponent } from "./components/progressbar/progressbar.component";

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    InputButtonComponent,
    StepComponent,
    ProgressbarComponent,
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
