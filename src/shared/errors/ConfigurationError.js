// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Custom_Error_Types

function ConfigurationError(configProperty, message, fileName, lineNumber) {
  var instance = new Error(message, fileName, lineNumber);
  instance.name = `ConfigurationError [${configProperty}]`;
  instance.configProperty = configProperty;
  Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
  if (Error.captureStackTrace) {
    Error.captureStackTrace(instance, ConfigurationError);
  }
  return instance;
}

ConfigurationError.prototype = Object.create(Error.prototype, {
  constructor: {
    value: Error,
    enumerable: false,
    writable: true,
    configurable: true
  }
});

if (Object.setPrototypeOf){
  Object.setPrototypeOf(ConfigurationError, Error);
} else {
  ConfigurationError.__proto__ = Error;
}

export default ConfigurationError;
