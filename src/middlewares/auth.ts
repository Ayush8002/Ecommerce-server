import { User } from "../models/user.js";
import ErrorHandler from "../utils/utility-class.js";
import { TryCatch } from "./error.js";

// Middleware to make sure only admin is allowed
export const adminOnly = TryCatch(async (req, res, next) => {
  const { id } = req.query;

  if (!id) return next(new ErrorHandler("please Login first", 401));

  const user = await User.findById(id);
  if (!user) return next(new ErrorHandler("Your id is not correct", 401));
  if (user.role !== "admin")
    return next(new ErrorHandler("you are not admin", 403));

  next();
});