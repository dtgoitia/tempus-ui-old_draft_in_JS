import ConfigurationError from '../errors/ConfigurationError';

function getFromReactEnv(propName) {
  const value = process.env[`REACT_APP_${propName}`];
  if (!value) {
    const msg = `it looks like this ${propName} is not set in the config`;
    throw new ConfigurationError(propName, msg);
  }
  return value;
}

function get(propName) {
  const value = getFromReactEnv(propName);
  return value;
}

function getNumber(propName) {
  const value = get(propName);
  // eslint-disable-next-line
  const castedValue = new Number(value).valueOf();
  if (Number.isNaN(castedValue)) {
    const msg = `${propName} must be a number`;
    throw new ConfigurationError(propName, msg);
  }
  return castedValue;
}

function getString(propName) {
  return get(propName);
}

const config = {
  getNumber,
  getString,
};

export default config;
