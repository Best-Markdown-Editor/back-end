import { slugify } from "./../../helpers/index";
import db from "../../data/dbConfig";
import { ValidationError } from "apollo-server-express";
import moment from "moment";

interface FileId {
  id: string;
}
interface AddFileArgs {
  data: {
    title: string;
    userId: string;
    body: string;
  };
}
export const addFile = async (_: void, { data }: AddFileArgs) => {
  console.log("Args logger:", data);

  const fileData = {
    title: data.title,
    slug: slugify(data.title),
    userId: data.userId,
    body: data.body,
  };

  const myFiles = await db("files")
    .where({
      userId: data.userId,
      title: data.title,
    })
    .first();

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

export const deleteFile = async (_: void, { id }: FileId) => {
  const destroy = await db("files").where({ id }).del();

  if (!destroy) return false;

  return true;
};

interface PubFileArgs {
  data: {
    id: number;
    userId: string;
    description: string;
    thumbnail?: string;
  };
}

export const publishFile = async (_: void, { data }: PubFileArgs) => {
  console.log("Args logger:", data);
  const { id, userId, description, thumbnail } = data;
  const file = await db("files").where({ id }).first();
  const { title, slug, body } = file;
  const isPub = await db("pub").where({ id }).first();
  if (isPub) {
    const pub = await db("pub")
      .update({
        description,
        thumbnail,
        title,
        slug,
        body,
        updatedAt: moment().unix(),
      })
      .where({ id })
      .returning("*");
    return pub[0];
  }
  const pub = await db("pub")
    .insert({
      id,
      description,
      thumbnail,
      title,
      slug,
      body,
      publishedOn: moment().unix(),
      updatedAt: moment().unix(),
      userId,
    })
    .returning("*");
  return pub[0];
};
