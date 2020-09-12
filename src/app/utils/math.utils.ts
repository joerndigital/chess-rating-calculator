export function roundTo(value: number, numberOfDecimalPlaces: number): number {
  return (
    Math.round(value * (10 ** numberOfDecimalPlaces)) /
    10 ** numberOfDecimalPlaces
  );
}
