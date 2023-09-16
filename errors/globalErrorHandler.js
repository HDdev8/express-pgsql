const globalErrorHandler = (err, req, res, next) => {
  err.name = err.name || "Error";
  err.statusCode = err.statusCode || 500;
  err.message = err.message || res.statusMessage;

  res.status(err.statusCode).json({
    name: err.name,
    statusCode: err.statusCode,
    message: err.message,
    stack: err.stack,
  });
};

module.exports = globalErrorHandler;
