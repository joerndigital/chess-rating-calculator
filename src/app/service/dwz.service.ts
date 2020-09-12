import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { roundTo } from "../utils/math.utils";

@Injectable({
  providedIn: "root",
})
export class DwzService {
  public change$ = new BehaviorSubject(0); // rename

  public result; // rename

  private _currentDwz: number;
  private _numberOfDwzEvaluations: number;
  private _yearOfBirth: number;

  private _opponents: {
    currentDwz: number;
    achievedPoints: number;
    expectedPoints: number;
    newDwz: number;
    change: number;
  }[] = [];

  private _averageDwz: number;

  constructor() {}

  calculate(): number {
    const numberOfGames = this.opponents.length || 1;

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
      this.yearOfBirth || 1964,
      expectedPoints,
      achievedPoints,
      this.numberOfDwzEvaluations || 6
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

    const developmentCoefficient = this.calculateDevelopmentCoefficient(
      this.currentDwz,
      this.yearOfBirth || 1964,
      expectedPoints,
      gameResult || 1,
      this.numberOfDwzEvaluations || 6
    ); // TODO Parameter auslagern

    const newDwz = this.calculateNewDWZ(
      this.currentDwz,
      developmentCoefficient,
      1,
      gameResult,
      expectedPoints
    );

    this.opponents.push({
      currentDwz,
      achievedPoints: gameResult,
      expectedPoints,
      newDwz,
      change: roundTo(newDwz - this.currentDwz, 2),
    });

    this.calculateAverageDwz();
  }

  public deleteOpponent(index: number) {
    this.opponents.splice(index, 1);
  }

  public calculateAverageDwz() {
    this.averageDwz = this.opponents.reduce(
      (average, opponent) =>
        average + opponent.currentDwz / this.opponents.length,
      0
    );
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

  public set averageDwz(averageDwz: number) {
    this._averageDwz = averageDwz;
  }

  public get averageDwz() {
    return this._averageDwz;
  }
}
