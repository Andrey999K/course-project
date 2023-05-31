import validateRules from "./validateRules";

export function validator(data, config) {
  const errors = {};
  for (const name in data) {
    const validationRules = config[name];
    for (const rule in validationRules) {
      const { message, value } = validationRules[rule];
      const validator = validateRules[rule];
      const hasError = validator && !validator(data[name], value);
      if (hasError) {
        errors[name] = message;
        break;
      }
    }
  }
  return errors;
}
