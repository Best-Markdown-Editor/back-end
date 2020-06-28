import { slugify } from "./../../helpers/index";
import { ExpressContext } from "../../types";
import db from "../../data/dbConfig";
import { ValidationError } from "apollo-server-express";
import moment from "moment";

interface FileTile {
  title: string;
}
export const addFile = async (
  _: void,
  { title }: FileTile,
  ctx: ExpressContext
) => {
  const fileData = {
    title,
    slug: slugify(title),
    userId: ctx.req?.session!.userId,
  };

  const myFiles = await db("files")
    .where({
      userId: ctx.req?.session!.userId,
      title,
    })
    .first();

  console.log("My files:", myFiles);

  if (myFiles)
    throw new ValidationError(
      "You already have a file with the same name as that. 💀"
    );

  const file = await db("files").insert(fileData).returning("*");

  if (!file) throw new Error("Something went wrong. 💀");

  return file[0];
};

interface EditFileData {
  data: {
    id: number;
    title: string;
    body: string;
  };
}

export const editFile = async (_: void, { data }: EditFileData) => {
  const file = await db("files").where({ id: data.id }).first();

  if (!file) throw new Error("That files does not exist. 💀");

  const fileData = {
    title: data.title,
    slug: slugify(data.title),
    body: data.body,
    updatedAt: moment().unix(),
  };

  const updatedFile = await db("files")
    .update(fileData)
    .where({ id: data.id })
    .returning("*");

  console.log("file:", updatedFile);

  return updatedFile[0];
};

export const deleteFile = async (
  _: void,
  { title }: FileTile,
  ctx: ExpressContext
) => {
  const destroy = await db("files")
    .where({
      title,
      userId: ctx.req?.session!.userId,
    })
    .del();

  if (!destroy) return false;

  return true;
};
