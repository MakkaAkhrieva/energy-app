import { Router } from "express";
import * as userController from "../controllers/user-controller.js";
import { body } from "express-validator";
import authMiddleware from "../middlewares/auth-middleware.js";
import adminMiddleware from "../middlewares/admin-middleware.js";
import * as stationController from "../controllers/station-controller.js";
import * as questionController from "../controllers/questions-controller.js";

const router = new Router();

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  userController.registration
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);
router.get("/stations", stationController.getStations);
router.get("/station/:id", authMiddleware, stationController.getStation);
router.post(
  "/station",
  /*   authMiddleware,
  adminMiddleware, */
  stationController.addStation
);
router.get("/users", authMiddleware, adminMiddleware, userController.getUsers);
router.delete(
  "/station/:id",
  authMiddleware,
  adminMiddleware,
  stationController.remove
);
router.patch(
  "/station/:id",
  authMiddleware,
  adminMiddleware,
  stationController.editStation
);
router.patch("/user/:id", authMiddleware, userController.editUser);
router.patch(
  "/user/favourites/:id",
  authMiddleware,
  userController.editUserFavourites
);

router.get("/stations", stationController.dropStations);
router.get("/questions", questionController.getQuestions);
router.post("/question", questionController.addQuestion);
export default router;
