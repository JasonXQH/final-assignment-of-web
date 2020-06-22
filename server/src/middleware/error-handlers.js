// https://github.com/wesbos/Learn-Node/blob/master/stepped-solutions/45%20-%20Finished%20App/handlers/errorHandlers.js

/**
 * Handler to catch `async` operation errors.
 * Reduces having to write `try-catch` all the time.
 */
exports.catchErrors = (action) => {
  return (req, res, next) => {
    action(req, res).catch(next)
  }
}

/**
 * Handle any invalid routes.
 */
exports.invalidRoute = (req, res, next) => {
  const err = new Error('Invalid route: ' + req.method + ':' + req.route)
  err.status = 404
  next(err)
}

/**
 * Validation error handler for Mongo.
 * The client app should handle displaying the errors.
 */
exports.validationErrors = (err, req, res, next) => {
  // catch unique field error
  if (err.code && err.code === 11000) {
    err.status = 400
    err.message = err.errmsg
    return next(err)
  }

  if (!err.errors) {
    return next(err)
  }
  res.status(400).json({
    status: 400,
    error: err.errors,
    data: {}
  })
}
