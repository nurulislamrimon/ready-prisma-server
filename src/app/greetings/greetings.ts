import { RequestHandler } from "express";
import { sendResponse } from "../../utils/sendResponse";

const greetings: RequestHandler = (req, res) => {
  sendResponse({
    res,
    success: true,
    message: "Welcome to the combination of power api!",
    data: "Thank you for using our service.",
    statusCode: 200,
  });
};

export default greetings;
