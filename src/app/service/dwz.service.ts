import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { roundTo } from "../utils/utils";

@Injectable({
  providedIn: "root",
})
export class DwzService {
  public change$ = new BehaviorSubject(0); // rename

  public result; // rename
  public currentValue: number; // rename

  private _currentDwz: number;
  private _numberOfDwzEvaluations: number;
  private _yearOfBirth: number;

  private _opponents: {
    currentDwz: number;
    achievedPoints: number;
    expectedPoints: number;
  }[] = [];

  constructor() {
    console.log("PERFORMANCE", this.calculatePerformance(2198, 6.5, 6.548, 7));
    /* const expected = this.calculateExpectedPoints(1500, 1700);
    const dev = this.calculateDevelopmentCoefficient(
      1500,
      2000,
      expected,
      1,
      6
    );
    const newDWZ = this.calculateNewDWZ(1500, dev, 1, 1, expected);
    console.log(newDWZ);*/
  }

  calculate(): number {
    const numberOfGames = this.opponents.length;

    const expectedPoints = this.opponents.reduce(
      (_expectedPoints, opponent) => opponent.expectedPoints + _expectedPoints,
      0
    );
    const achievedPoints = this.opponents.reduce(
      (_achievedPoints, opponent) => opponent.achievedPoints + _achievedPoints,
      0
    );

    const developmentCoefficient = this.calculateDevelopmentCoefficient(
      this.currentDwz,
      this.yearOfBirth,
      expectedPoints,
      achievedPoints,
      this.numberOfDwzEvaluations
    ); // TODO Parameter auslagern

    const newDwz = this.calculateNewDWZ(
      this.currentDwz,
      developmentCoefficient,
      numberOfGames,
      achievedPoints,
      expectedPoints
    );

    return newDwz;
  }

  calculateNewDWZ(
    currentDwz,
    developmentCoefficient,
    numberOfGames,
    pointsScored,
    pointsExpected
  ) {
    const newDwz =
      currentDwz +
      (800 / (developmentCoefficient + numberOfGames)) *
        (pointsScored - pointsExpected);

    return roundTo(newDwz, 1);
  }

  calculatePerformance(
    currentDwz,
    pointsScored,
    pointsExpected,
    numberOfGames
  ) {
    return currentDwz + ((pointsScored - pointsExpected) * 800) / numberOfGames;
  }

  calculateExpectedPoints(currentDwz, currentDwzOfOpponent) {
    const expectedPoints =
      1 / (1 + 10 ** ((currentDwzOfOpponent - currentDwz) / 400));
    return roundTo(expectedPoints, 2);
  }

  calculateDevelopmentCoefficient(
    currentDwz,
    yearOfBirth,
    expectedPoints,
    achievedPoints,
    numberOfDwzEvaluations
  ) {
    const ageFactor =
      2020 - yearOfBirth <= 20 ? 5 : 2020 - yearOfBirth <= 25 ? 10 : 15;

    let accelerationFactor = 1;
    if (achievedPoints > expectedPoints && ageFactor === 5) {
      // not srp in function
      accelerationFactor = Math.min(Math.max(0.5, currentDwz / 2000), 1);
    }

    let additionalBrake = 0;
    if (achievedPoints < expectedPoints && currentDwz < 1300) {
      // not srp in function
      console.log("BREMSE");
      additionalBrake = Math.E ** ((1300 - currentDwz) / 150) - 1;
    }

    const basicValue = (currentDwz / 1000) ** 4 + ageFactor;

    console.log(accelerationFactor, basicValue, additionalBrake);
    let developmentCoefficient =
      accelerationFactor * basicValue + additionalBrake;

    if (developmentCoefficient < 5) {
      // als Funktion auslagern
      developmentCoefficient = 5;
    } else if (additionalBrake === 0) {
      developmentCoefficient = Math.min(
        developmentCoefficient,
        Math.min(30, 5 * numberOfDwzEvaluations)
      );
    } else if (additionalBrake > 0) {
      developmentCoefficient = Math.min(developmentCoefficient, 150);
    }

    console.log(developmentCoefficient);
    developmentCoefficient = Math.round(developmentCoefficient);

    return developmentCoefficient;
  }

  calculateAgeFactor() {}

  addOpponent({
    currentDwz,
    gameResult,
  }: {
    currentDwz: number;
    gameResult: number;
  }) {
    const expectedPoints = this.calculateExpectedPoints(
      this.currentDwz,
      currentDwz
    );

    this.opponents.push({
      currentDwz,
      achievedPoints: gameResult,
      expectedPoints,
    });
  }

  public set currentDwz(__currentDwz: number) {
    this._currentDwz = __currentDwz;
  }

  public get currentDwz(): number {
    return this._currentDwz;
  }

  public set yearOfBirth(__yearOfBirth: number) {
    this._yearOfBirth = __yearOfBirth;
  }

  public get yearOfBirth(): number {
    return this._yearOfBirth;
  }

  public set numberOfDwzEvaluations(__numberOfDwzEvaluations: number) {
    this._numberOfDwzEvaluations = __numberOfDwzEvaluations;
  }

  public get numberOfDwzEvaluations(): number {
    return this._numberOfDwzEvaluations;
  }

  public get opponents() {
    return this._opponents;
  }
}
