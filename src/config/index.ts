import dotenv from "dotenv";
// find .env file in root and load the environment variables from it.
dotenv.config({ path: process.cwd() + "/.env" });

//  exports from "./config";
export const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET!,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET!,

  // mail configuration
  mailHost: process.env.MAIL_HOST,
  mailPort: process.env.MAIL_PORT,
  isMailPortSecure: process.env.IS_MAIL_PORT_SECURE || true,
  mailUser: process.env.MAIL_USER,
  mailPass: process.env.MAIL_PASS,
};
