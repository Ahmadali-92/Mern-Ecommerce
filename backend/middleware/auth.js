const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

//if user login the see the products etc....
exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const { token } = await req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  //req.user ma user ka sara data save kr liya
  req.user = await User.findById(decodedData.id);
  next();
});
//if user admin then change the products create,update,delete etc....
exports.authoraizeRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
    return next(  new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource.`,403));
    }
    next()
  };
};
