import { Prisma } from "@prisma/client";
import { Request } from "express";
import { ZodError, ZodIssue } from "zod";
import { IErrorMessages } from "../../utils/sendResponse";

// ------------------------------------------
// format prisma error
// ------------------------------------------
export const formatPrismaValidationError = (
  error: Prisma.PrismaClientValidationError,
  req: Request
) => {
  const errors = [
    {
      path: req.originalUrl,
      message: error.message,
    },
  ];
  return {
    message: "Validation Error",
    errorMessages: errors,
  };
};

export function formatPrismaClientKnownError(
  error: Prisma.PrismaClientKnownRequestError,
  req: Request
) {
  let errorMessages: IErrorMessages[] = [];
  let message = error.name;
  if (error.code === "P2025") {
    message = (error.meta?.cause as string) || "Record not found!";
    errorMessages = [
      {
        path: "",
        message,
      },
    ];
  } else if (error.code === "P2003") {
    if (error.message.includes("delete()` invocation:")) {
      message = "Delete failed";
      errorMessages = [
        {
          path: "",
          message,
        },
      ];
    }
  } else {
    errorMessages = [
      {
        path: req.originalUrl,
        message: error?.message || "An unknown error occurred",
      },
    ];
  }
  return { message, errorMessages };
}

// ------------------------------------------
// format zod error
// ------------------------------------------
export const formatZodError = (error: ZodError) => {
  const errors = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });

  return {
    message: "Validation Error",
    errorMessages: errors,
  };
};
