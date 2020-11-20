import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { InputComponent } from "./components/input-field/input-field.component";
import { InputButtonComponent } from "./components/button/button.component";
import { StepComponent } from "./components/step/step.component";
import { ProgressbarComponent } from "./components/progressbar/progressbar.component";
import { MenuComponent } from "./components/menu/menu.component";
import { TableComponent } from "./components/table/table.component";

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    InputButtonComponent,
    StepComponent,
    ProgressbarComponent,
    MenuComponent,
    TableComponent,
  ],
  imports: [BrowserModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
