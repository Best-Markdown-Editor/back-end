import { setSession, validateEmail } from "./../../helpers/index";
import { ExpressContext } from "./../../types/index";
import bcrypt from "bcryptjs";
import db from "../../data/dbConfig";
import { ValidationError } from "apollo-server-express";
import { User } from "../../types";

interface LoginData {
  data: {
    email: string;
    password: string;
  };
}

interface RegisterData {
  data: User;
}

export const login = async (
  _: void,
  { data }: LoginData,
  ctx: ExpressContext
) => {
  const user = await db("users").where({ email: data.email }).first();

  if (!user) throw new ValidationError("No user with that email found. 🤷‍♂");

  const valid = await bcrypt.compare(data.password, user.password);

  if (!valid) throw new Error("Password is not valid. 💀");

  setSession(ctx, user);

  return user;
};

export const register = async (
  _: void,
  { data }: RegisterData,
  ctx: ExpressContext
) => {
  const validate = await validateEmail(data);

  if (!validate) throw new ValidationError("That is not an valid email. 💀");

  if (data.password.length < 6)
    throw new ValidationError("Password must be 6 or more characters long. 💀");

  try {
    const user = await db("users").insert(data).returning("*");

    if (!user) throw new Error("Something went wrong... 💩");

    setSession(ctx, user);

    return user[0];
  } catch (err) {
    const user = await db("users").insert(data).returning("*");

    if (!user) throw new Error("Something went wrong... 💩");

    setSession(ctx, user);

    return user[0];
  }
};

export const logout = (_: void, __: void, ctx: ExpressContext) => {
  return new Promise((res, rej) =>
    ctx.req.session!.destroy((err) => {
      if (err) {
        console.log("Logout error: ", err);
        return rej(false);
      }

      ctx.res?.clearCookie("qid");
      return res(true);
    })
  );
};
