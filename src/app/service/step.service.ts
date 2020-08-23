import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class StepService {
  public currentStep = 0;

  public steps = [
    {
      id: "currentDwz",
      step: "Schritt 1",
      title: "Deine DWZ",
      question: "Wie lautet deine aktuelle DWZ?",
      placeholder: 2100,
      buttonText: "Weiter",
      errorMessage:
        "Deine Wertzahl muss eine vierstellige Zahl sein. Gewäöhnlich liegt sie irgendwo zwischen 0 und 2900.",
      result: undefined,
      helperQuestion: "Index",
    },
    {
      id: "yearOfBirth",
      step: "Schritt 2",
      title: "Geburtsjahr",
      question: "In welchem Jahr wurdest du geboren?",
      placeholder: 1964,
      buttonText: "Weiter",
      errorMessage:
        "Bitte gib dein Geburtsjahr ein. Es wird für die Rechnung deiner neuen DWZ benötigt.",
      result: undefined,
    },
    {
      id: "currentDwzOfOpponent",
      step: "Schritt 3",
      title: "Gegner",
      question: "Wie hoch war die DWZ deines Gegners?",
      placeholder: 2200,
      buttonText: "Berechnen",
      errorMessage:
        "Die Wertzahl muss eine vierstellige Zahl sein. Gewäöhnlich liegt sie irgendwo zwischen 0 und 2900.",
      result: undefined,
      helperQuestion: "Ergebnis",
    },
    {
      id: "result",
      step: "Schritt 4",
      title: "Ergebnis",
      buttonText: "Berechnen",
      result: undefined,
    },
  ];
}
