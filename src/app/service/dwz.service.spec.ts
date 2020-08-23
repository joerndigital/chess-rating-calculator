import { TestBed } from "@angular/core/testing";

import { DwzService } from "./dwz.service";

describe("CalculatorService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));


  /*it("should be created", () => {
    expect(service).toBeTruthy();
  });*/

  it("calculates the expected points correctly", () => {
    const service: DwzService = TestBed.get(DwzService);

    expect(service.calculateExpectedPoints(1864, 1900)).toBe(0.45);
    expect(service.calculateExpectedPoints(0, 1900)).toBe(0);
    expect(service.calculateExpectedPoints(1900, 0)).toBe(1);
    expect(service.calculateExpectedPoints(1800, 1900)).toBe(0.36);
    expect(service.calculateExpectedPoints(1900, 1900)).toBe(0.5);
    expect(service.calculateExpectedPoints(1650, 1900)).toBe(0.19);

  });

  it("calculates the development coefficient correctly", () => {
    const service: DwzService = TestBed.get(DwzService);

    expect(service.calculateDevelopmentCoefficient(2000, 1990, 0.36, 1, 6)).toBe(30);
    expect(service.calculateDevelopmentCoefficient(1337, 1990, 0.20, 4, 20)).toBe(18);
    expect(service.calculateDevelopmentCoefficient(1200, 1998, 1.80, 0.5, 20)).toBe(13);
    expect(service.calculateDevelopmentCoefficient(1500, 2011, 0.75, 4, 4)).toBe(8);


  });


  it("calculates the rating correctly", () => {
    const service: DwzService = TestBed.get(DwzService);

    expect(service.calculateNewDWZ(1500, 8, 5, 4, 1.2)).toBe(1672.3);


  });
});
