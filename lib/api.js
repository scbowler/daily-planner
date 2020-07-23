exports.validateFields = (day, description, time) => {
  const errors = [];

  if (isNaN(day) || day < 0 || day > 6) {
    errors.push('Invalid day given');
  }
  if (!description) {
    errors.push('No description given');
  }
  if (isNaN(time) || time < 0 || time >= 2400) {
    errors.push('Invalid time given');
  }

  return errors;
}
