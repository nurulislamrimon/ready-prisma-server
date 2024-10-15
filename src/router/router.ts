import { Router } from "express";
import { userRoute } from "../app/user/user.route";

const router = Router();

const routes = [
  {
    path: "/administrators",
    element: userRoute,
  },
];

routes.forEach((route) => router.use(route.path, route.element));

export default router;
