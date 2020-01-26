export const parseIntTransform = value =>
  isNaN(value) ? NaN : parseInt(value);

export const parseFloatTransform = value =>
  isNaN(value) ? NaN : parseFloat(value);

export const parseIntArrayTransform = values =>
  Array.isArray(values)
    ? values.map(parseIntTransform)
    : [parseIntTransform(values)];

export const parseDate = value => {
  const date = new Date(value);
  return isNaN(date.getTime()) ? null : date;
};
