export const isDefined = (result, validators) => !!result;

export const isAllowedZero = (result, validators) =>
  !validators.includeZero ||
  result > 0 ||
  (result === 0 && validators.includeZero);

export const isNumber = (result, validators) => Number.isInteger(result);

export const isBigEnough = (result, validators) =>
  !validators.min ||
  (!!validators.min && result > validators.min);

export const isSmallEnough = (result, validators) =>
  !validators.max ||
  (!!validators.max && result < validators.max);
