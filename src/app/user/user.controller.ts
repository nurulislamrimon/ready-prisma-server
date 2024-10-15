import bcrypt from "bcrypt";
import { RequestHandler } from "express";
import { userService } from "./user.service";
import { accessTokenExpireTime, refreshTokenExpireTime } from "../../constants";
import { sendResponse } from "../../utils/sendResponse";
import { catchAsync } from "../../utils/catchAsync";
import { ApiError } from "../../utils/ApiError";
import { generateToken } from "../helpers/jwt";
import { config } from "../../config";
import { User } from "@prisma/client";

/**
 *@api{GET}/ GET Request.
 *@apiDescription This is a GET request for / api.
 *@apiPermission Admin
 *@apiHeader accessToken
 *@apiBody none
 *@apiParam none
 *@apiQuery fieldName, limit,sort,page
 *@apiSuccess Array - Array of users
 *@apiError 401 unauthorized or 401 or 403 forbidden or 404 not found
 */

const getAllUsers: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await userService.getAllUsers(req);
  sendResponse<Partial<User>[]>({
    res,
    success: true,
    message: "Users retrieved successfully!",
    data: result.users,
    meta: result.meta,
    statusCode: 200,
  });
});

/**
 *@api{POST}/add POST Request.
 *@apiDescription This is a POST request for /add api.
 *@apiPermission Admin
 *@apiHeader accessToken
 *@apiBody Object - user data
 *@apiParam none
 *@apiQuery none,
 *@apiSuccess Object - user data
 *@apiError 401 unauthorized or 401 or 403 forbidden or 404 not found
 */

const addUser: RequestHandler = catchAsync(async (req, res) => {
  const newUser = req.body;

  const isAlreadyExist = await userService.getAnUser({
    where: { email: newUser.email },
  });
  if (isAlreadyExist) {
    throw new ApiError(403, "User already exist");
  }
  // hash the password
  newUser.password = await bcrypt.hash(newUser.password, 10);
  const result = await userService.addUsers({
    data: newUser,
  });
  if (!result) {
    throw new ApiError(404, "Something went wrong");
  }
  const { password, ...rest } = result;
  sendResponse<Partial<User>>({
    res,
    success: true,
    message: "Users added successfully!",
    data: rest,
    statusCode: 200,
  });
});

/**
 *@api{POST}/update POST Request.
 *@apiDescription This is a POST request for /update api.
 *@apiPermission Admin
 *@apiHeader accessToken
 *@apiBody Object - user data
 *@apiParam none
 *@apiQuery none,
 *@apiSuccess Object - user data
 *@apiError 401 unauthorized or 401 or 403 forbidden or 404 not found
 */

const updateUser: RequestHandler = catchAsync(async (req, res) => {
  const user = req.user;
  const newUser = req.body;
  const isAlreadyExist = await userService.getAnUser({
    where: { email: user?.email },
  });

  if (!isAlreadyExist) {
    throw new ApiError(404, "User not found!");
  }
  if (newUser?.password) {
    newUser.password = await bcrypt.hash(newUser.password, 10);
  }
  // hash the password
  const result = await userService.updateUsers({
    where: { email: user?.email },
    data: newUser,
  });
  if (!result) {
    throw new ApiError(404, "Something went wrong");
  }
  const { password, ...rest } = result;
  sendResponse<Partial<User>>({
    res,
    success: true,
    message: "Users updated successfully!",
    data: rest,
    statusCode: 200,
  });
});

/**
 *@api{POST}/login POST Request.
 *@apiDescription This is a POST request for /login api.
 *@apiPermission none
 *@apiHeader none
 *@apiBody Object - {email, password}
 *@apiParam none
 *@apiQuery none
 *@apiSuccess Object - {accessToken, refreshToken, user}
 *@apiError 401 unauthorized or 401 or 403 forbidden or 404 not found
 */
const login: RequestHandler = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const isUserExist = await userService.getAnUser({
    where: { email },
  });

  if (!isUserExist) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordMatched = await bcrypt.compare(
    password,
    isUserExist.password
  );
  if (!isPasswordMatched) {
    throw new ApiError(401, "Invalid credentials");
  }

  const { password: pass, ...rest } = isUserExist;
  // generate access token
  const accessToken = generateToken(
    isUserExist,
    config.accessTokenSecret,
    accessTokenExpireTime
  );
  // generate refresh token
  const refreshToken = generateToken(
    isUserExist,
    config.refreshTokenSecret,
    refreshTokenExpireTime
  );

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: config.env === "production",
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: config.env === "production",
  });

  sendResponse({
    res,
    success: true,
    message: "User logged in successfully!",
    data: { user: rest, accessToken, refreshToken },
    statusCode: 200,
  });
});

/**
 *@api{delete}/update delete Request.
 *@apiDescription This is a delete request for /update api.
 *@apiPermission Admin
 *@apiHeader accessToken
 *@apiBody Object - user data
 *@apiParam none
 *@apiQuery none,
 *@apiSuccess Object - user data
 *@apiError 401 unauthorized or 401 or 403 forbidden or 404 not found
 */

const deleteUser: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const isAlreadyExist = await userService.getAnUser({
    where: { id: Number(id) },
  });

  if (!isAlreadyExist) {
    throw new ApiError(404, "User not found!");
  }
  // hash the password
  const result = await userService.deleteUsers({
    where: { id: Number(id) },
  });
  if (!result) {
    throw new ApiError(404, "Something went wrong");
  }
  const { password, ...rest } = result;
  sendResponse<Partial<User>>({
    res,
    success: true,
    message: "Users deleted successfully!",
    data: rest,
    statusCode: 200,
  });
});

// export user controller
export const userController = {
  getAllUsers,
  addUser,
  login,
  updateUser,
  deleteUser,
};
