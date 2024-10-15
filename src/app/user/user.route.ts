import { Router } from "express";
import { userController } from "./user.controller";
import { userRoles } from "./user.constants";
import { authentication, authorization } from "../../middlewares/auth";

const router = Router();

router.get(
  "/",
  authorization(userRoles.SUPER_ADMIN, userRoles.ADMIN, userRoles.MANAGER),
  userController.getAllUsers
);

router.post(
  "/add",
  authorization(userRoles.SUPER_ADMIN, userRoles.ADMIN),
  userController.addUser
);

router.post("/update", authentication, userController.updateUser);

router.delete(
  "/:id",
  authorization(userRoles.SUPER_ADMIN, userRoles.ADMIN),
  userController.updateUser
);

router.post("/login", userController.login);

export const userRoute = router;
