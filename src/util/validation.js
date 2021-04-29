export const getHasMissingValues = (watch, names) => {
  const lookForMissingValues = valueMap => {
    const keys = Object.keys(valueMap);
    return keys.length === 0 ? true : keys.some(key => !valueMap[key]);
  };

  const values = watch(names);
  if (typeof names === 'string') {
    return !values;
  } else {
    return lookForMissingValues(values);
  }
};

export const getHasErrors = errors => {
  return Object.keys(errors)?.length > 0;
};

export const getHasErrorsOrMissingValues = (errors, watch, names) => {
  return getHasErrors(errors) || getHasMissingValues(watch, names);
};
