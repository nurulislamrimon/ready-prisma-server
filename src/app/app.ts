import express from "express";
import cors from "cors";
import {
  globalErrorHandler,
  notFoundRouteHandler,
} from "../middlewares/errorHandler";
import router from "../router/router";
import greetings from "./greetings/greetings";

const app = express();

// static path or origin
app.use(express.static("public"));
// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// initial route
app.get("/", greetings);

// routers
app.use("/api/v1", router);

// not found route handler middleware
app.use(notFoundRouteHandler);

// error handler middleeware
app.use(globalErrorHandler);

export default app;
