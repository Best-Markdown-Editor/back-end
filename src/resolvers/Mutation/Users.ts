import { User } from "./../../types/index";
import db from "../../data/dbConfig";
import { ValidationError } from "apollo-server-express";

interface UserProps {
  data: User;
}

export const login = async (_: void, { data }: UserProps) => {
  const checkUser = await db("users").where({ id: data.id }).first();

  if (checkUser) return checkUser;

  if (!data.username) throw new ValidationError("Try registering first. 🤠");

  const user = await db("users").insert(data).returning("*");

  if (user.length === 0)
    throw new ValidationError("Something went wrong... 💩");

  return user[0];
};

export const editUser = async (_: void, { data }: UserProps) => {
  const user = await db("users")
    .update(data)
    .where({ id: data.id })
    .returning("*");

  if (user.length === 0)
    throw new ValidationError("Something went wrong... 💩");

  return user[0];
};
