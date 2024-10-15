import { Prisma, User } from "@prisma/client";
import { Request } from "express";
import {
  userFilterableFields,
  userSearchableFields,
  userSelectedFields,
} from "./user.constants";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { searchFilterAndPagination } from "../../utils/searchFilterAndPagination";
import prisma from "../../orm";

// -----------------------------
// get all users
// -----------------------------
const getAllUsers = async (req: Request) => {
  const query = searchFilterAndPagination<"user">({
    req,
    filterableFields: userFilterableFields,
    searchableFields: userSearchableFields,
  });

  const users = await prisma.user.findMany({
    where: query.where,
    select: userSelectedFields,
    skip: query.skip,
    take: query.limit,
    orderBy: {
      [query.sortBy]: query.sortOrder,
    },
  });

  const total = await prisma.user.count({
    where: query.where,
  });

  return {
    users,
    meta: { total, page: query.page, limit: query.limit },
  };
};

// -----------------------------
// add new user
// -----------------------------
const addUsers = async ({ data }: { data: User }) => {
  const users = await prisma.user.create({
    data,
  });
  return users;
};

// ---------------------------------------------
// get a user by query
// ---------------------------------------------
const getAnUser = async (query: Prisma.UserFindFirstArgs) => {
  const users = await prisma.user.findFirst(query);
  return users;
};

// -----------------------------
// update an user
// -----------------------------
const updateUsers = async (data: Prisma.UserUpdateArgs<DefaultArgs>) => {
  const users = await prisma.user.update(data);
  return users;
};
// -----------------------------
// delete an user
// -----------------------------
const deleteUsers = async (query: Prisma.UserDeleteArgs<DefaultArgs>) => {
  const users = await prisma.user.delete(query);
  return users;
};

// export
export const userService = {
  getAllUsers,
  addUsers,
  getAnUser,
  updateUsers,
  deleteUsers,
};
