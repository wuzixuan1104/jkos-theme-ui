export class CustomizeError extends Error {
  constructor(name, ...params) {
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomizeError);
    }

    this.name = 'CustomizeError';
    // Custom debugging information

    this[name] = name;
    this.date = new Date();

    // format error
  }
}

export class TokenExpiredError extends CustomizeError {
  constructor(...params) {
    super('TokenExpiredError', ...params)
  }
}