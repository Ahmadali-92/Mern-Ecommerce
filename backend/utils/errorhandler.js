class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}
module.exports = ErrorHandler;
//Errorhandler ko Error.js middleware k bygyr use ni kr skty ,phr isy app.js ma ja kr use bhi krna prta h