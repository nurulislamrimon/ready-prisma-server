import { User, Prisma } from "@prisma/client";

export const userFilterableFields: (keyof User)[] = [
  "id",
  "name",
  "phone_number",
  "email",
  "role",

  "created_at",
  "updated_at",
  "deleted_at",
];
export const userSearchableFields: (keyof User)[] = [
  "name",
  "phone_number",
  "email",
];

// ------------------------------------
// user roles
// ------------------------------------
export const userRoles = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  MANAGER: "manager",
  USER: "user",
};

// ------------------------------------
// select fields
// ------------------------------------

type UserSelectedFields = {
  [key in keyof Partial<Prisma.UserGetPayload<{}>>]: boolean;
};

export const userSelectedFields: UserSelectedFields = {
  id: true,
  name: true,
  phone_number: true,
  email: true,
  role: true,
  //   password:true,
  created_at: true,
  //   updated_at:true,
  //   deleted_at:true,
};
