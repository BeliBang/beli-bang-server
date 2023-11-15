async function errorHandling(error, req, res, next) {
  let message = error.message || "Internal Server Error";
  let status = error.status || 500;

  switch (error.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      status = 400;
      message = error.errors[0].message;
      break;
    case "EmailNull":
      status = 400;
      message = "Email is required"
      break;
    case "PasswordNull":
      status = 400;
      message = "Password is required"
      break;
    case "EmailInvalid":
    case "PasswordInvalid":
      status = 400;
      message = "Invalid email / password"
      break;
    case "Unauthenticated":
    case "JsonWebTokenError":
      status = 401;
      message = "Invalid token"
      break;
    case "SellerAuthorization":
      status = 403;
      message = "Not a seller"
      break;
    case "OwnerAuthorization":
      status = 403;
      message = "Not the owner"
      break;
    case "NotFound":
      status = 404;
      message = "Data not found"
      break;
  }

  res.status(status).json({ message });
}

module.exports = errorHandling;
