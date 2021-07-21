class ErrorResponse extends Error {
  // constructor(message, statusCode) {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = ErrorResponse;
