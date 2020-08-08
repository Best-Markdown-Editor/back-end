import { User } from "./../../types/index";
import db from "../../data/dbConfig";
import { ValidationError } from "apollo-server-express";
import { v4 } from "uuid";

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

interface MyId {
  id: string;
}

export const subUser = async (_: void, { id }: MyId) => {
  const isSubscribed = await db("users").where({ id }).first();
  if (isSubscribed.subscriber) return isSubscribed;
  if (isSubscribed.token === null)
    await db("users").where({ id }).update({
      token: v4(),
    });
  const user = await db("users")
    .update({
      subscriber: true,
    })
    .where({ id })
    .returning("*");
  if (!user) throw new Error("No user with that ID exists 💀");
  return user[0];
};

export const unSubUser = async (_: void, { id }: MyId) => {
  const isSubscribed = await db("users").where({ id }).first();
  if (!isSubscribed.subscriber) return isSubscribed;
  const user = await db("users")
    .update({
      subscriber: false,
    })
    .where({ id })
    .returning("*");
  if (!user) throw new Error("No user with that ID exists 💀");
  return user[0];
};

export const regenToken = async (_: void, { id }: MyId) => {
  const user = await db("users")
    .where({ id })
    .update({
      token: v4(),
    })
    .returning("*");
  return user[0];
};
