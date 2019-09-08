// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Custom_Error_Types
function NotImplementedError(symbolName, message, fileName, lineNumber) {
  var instance = new Error(message, fileName, lineNumber);
  instance.name = !symbolName
    ? `NotImplementedError`
    : `NotImplementedError. '${symbolName}' is not implemented`;
  instance.symbolName = symbolName;
  Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
  if (Error.captureStackTrace) {
    Error.captureStackTrace(instance, NotImplementedError);
  }
  return instance;
}

NotImplementedError.prototype = Object.create(Error.prototype, {
  constructor: {
    value: Error,
    enumerable: false,
    writable: true,
    configurable: true
  }
});

if (Object.setPrototypeOf){
  Object.setPrototypeOf(NotImplementedError, Error);
} else {
  NotImplementedError.__proto__ = Error;
}

export default NotImplementedError;
