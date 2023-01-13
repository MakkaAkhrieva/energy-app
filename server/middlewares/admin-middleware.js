import ApiError from "../exceptions/api-error.js";

export default function (req, res, next) {
  try {
    if (req.user.role === "user") {
      return next(
        ApiError.ErrorResponse(401, "Пользователь не является админом")
      );
    }
    next();
  } catch (error) {
    return next(new Error());
  }
}
