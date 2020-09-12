import { Injectable, EventEmitter } from "@angular/core";
import { StepInterface } from "../interfaces/step.interface";
import {
  isDefined,
  isNumber,
  isAllowedZero,
  isBigEnough,
  isSmallEnough,
} from "../utils/validators.utils";

@Injectable({
  providedIn: "root",
})
export class StepService {
  public steps: { [key: string]: Step } = {
    currentDwz: new Step(
      {
        id: 0,
        key: "currentDwz",
      },
      {
        title: "Deine DWZ",
        question: "Wie lautet deine aktuelle DWZ?",
        placeholder: 2100,
        buttonText: "Weiter",
        hint:
          "Gib bitte eine korrekte DWZ-Zahl an! Für gewöhnlich liegt diese zwischen 700 und 3000.",
      },
      {
        validators: { min: 100, max: 4000, includeZero: true },
      },
      { key: "numberOfDwzEvaluations", placeholder: 6, question: "Index" }
    ),
    yearOfBirth: new Step(
      {
        id: 1,
        key: "yearOfBirth",
      },
      {
        title: "Geburtsjahr",
        question: "In welchem Jahr wurdest du geboren?",
        placeholder: new Date().getFullYear() - 40,
        buttonText: "Weiter",
        hint: `Gib bitte eine korrekte Jahreszahl! Von 1900 bis ${new Date().getFullYear()} kannst du jede Jahreszahl verwenden.`,
      },
      {
        validators: {
          min: 1900,
          max: new Date().getFullYear(),
          includeZero: false,
        },
      }
    ),
    currentDwzOfOpponent: new Step(
      {
        id: 2,
        key: "currentDwzOfOpponent",
      },
      {
        title: "Gegner",
        question: "Wie hoch ist die DWZ deines Gegners?",
        placeholder: 2200,
        buttonText: "Neue DWZ berechnen",
        hint:
          "Gib bitte eine korrekte DWZ-Zahl an! Für gewöhnlich liegt diese zwischen 700 und 3000.",
      },
      {
        validators: { min: 100, max: 4000, includeZero: true },
      },
      {
        key: "gameResult",
        placeholder: 1,
        question: "Ergebnis",
        buttonText: "Weiteren Gegner hinzufügen",
      }
    ),
    newDwz: new Step(
      { id: 3, key: "newDwz" },
      {
        title: "Ergebnis",
      }
    ),
  };

  public currentStep: Step = this.steps.currentDwz;
  public currentValue: number; // rename
}

export class Step {
  public id: number;
  public key: string;

  public title: string;
  public question: string;
  public placeholder: number;
  public buttonText: string;
  public hint: string;

  public isValidStep = false;
  private validators: { min?: number; max?: number; includeZero?: boolean };

  public helper: {
    result?: number;
    key?: string;
    question?: string;
    buttonText?: string;
    placeholder?: number;
  };

  public change$: EventEmitter<any> = new EventEmitter();

  private _result: number;

  get result() {
    return this._result;
  }

  set result(result: number) {
    this._result = result;
    this.isValid();
    this.change$.emit();
  }

  constructor(
    keys: { id: number; key: string },
    texts: {
      title: string;
      question?: string;
      placeholder?: number;
      buttonText?: string;
      hint?: string;
    },
    validation: {
      validators?: { min?: number; max?: number; includeZero?: boolean };
    } = {validators: {}},
    helper: {
      result?: number;
      key?: string;
      question?: string;
      buttonText?: string;
      placeholder?: number;
    } = {}
  ) {
    this.id = keys.id;
    this.key = keys.key;

    this.title = texts.title;
    this.question = texts.question;
    this.placeholder = texts.placeholder;
    this.buttonText = texts.buttonText;
    this.hint = texts.hint;

    this.validators = validation.validators;

    this.helper = helper;
  }

  private isValid(): void {
    const validators = [
      isDefined,
      isAllowedZero,
      isNumber,
      isBigEnough,
      isSmallEnough,
    ];

    this.isValidStep = validators.every((validator, index) => validator(this.result, this.validators));
  }
}
