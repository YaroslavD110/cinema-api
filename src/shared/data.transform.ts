export const parseIntTransform = value =>
  isNaN(value) ? NaN : parseInt(value);

export const parseFloatTransform = value =>
  isNaN(value) ? NaN : parseFloat(value);

export const parseIntArrayTransform = values =>
  Array.isArray(values)
    ? values.map(parseIntTransform)
    : [parseIntTransform(values)];
