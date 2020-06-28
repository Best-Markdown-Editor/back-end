import { setSession, validateEmail } from "./../../helpers/index";
import { ExpressContext } from "./../../types/index";
import bcrypt from "bcryptjs";
import db from "../../data/dbConfig";
import { ValidationError } from "apollo-server-express";

interface LoginData {
  data: {
    email: string;
    password: string;
  };
}

interface RegisterData {
  data: {
    email: string;
    username: string;
    password1: string;
    password2: string;
  };
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
  const checkUser = await db("users").where({ email: data.email }).first();
  if (checkUser)
    throw new ValidationError("A user with that email already exits... 🐒");
  const validate = await validateEmail(data.email);

  if (!validate) throw new ValidationError("That is not an valid email. 💀");

  if (data.password1 !== data.password2)
    throw new ValidationError("Passwords must match. 👯");

  if (data.password2.length < 6)
    throw new ValidationError("Password must be 6 or more characters long. 💀");

  const hashedPassword = await bcrypt.hash(data.password1, 12);

  const user = await db("users")
    .insert({
      username: data.username,
      email: data.email,
      password: hashedPassword,
    })
    .returning("*");

  if (!user[0]) throw new Error("Something went wrong... 💩");

  setSession(ctx, user[0]);

  return user[0];
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

// try {
//   const user = await db("users")
//     .insert({
//       username: data.username,
//       email: data.email,
//       password: data.password2,
//     })
//     .returning("*");

//   if (!user) throw new Error("Something went wrong... 💩");

//   setSession(ctx, user);

//   return user[0];
// } catch (err) {
//   const user = await db("users")
//     .insert({
//       username: data.username,
//       email: data.email,
//       password: data.password2,
//     })
//     .returning("*");

//   if (!user) throw new Error("Something went wrong... 💩");

//   setSession(ctx, user);

//   return user[0];
// }
