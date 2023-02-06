import { Router } from "express";
import * as userController from "../controllers/user-controller.js";
import { body } from "express-validator";
import authMiddleware from "../middlewares/auth-middleware.js";
import adminMiddleware from "../middlewares/admin-middleware.js";
import * as stationController from "../controllers/station-controller.js";

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
router.post(
  "/station",
  authMiddleware,
  adminMiddleware,
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

export default router;
