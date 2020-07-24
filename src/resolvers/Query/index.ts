import db from "../../data/dbConfig";
import { ValidationError } from "apollo-server-express";

interface HelloArgs {
  name: string;
}

const hello = async (_: void, { name }: HelloArgs) =>
  `Hello, ${name || "world"}!`;

const users = async () => await db("users");

interface MyId {
  id: string;
}

const user = async (_: void, { id }: MyId) => {
  const user = await db("users").where({ id }).first();

  if (!user) throw new ValidationError("That is not a valid userId... 💩");

  return user;
};

interface UserId {
  userId: string;
}

const getFiles = async (_: void, { userId }: UserId) => {
  const files = await db("files")
    .where({ userId })
    .orderBy("updatedAt", "desc");
  return files;
};

interface GetFile {
  id: number | string;
}

const getFile = async (_: void, { id }: GetFile) => {
  const file = await db("files").where({ id }).first();
  return file;
};

interface GetFileBySlugArgs {
  data: {
    slug: string;
    userId: string;
  };
}

const getFileBySlug = async (_: void, { data }: GetFileBySlugArgs) => {
  const file = await db("files")
    .where({ slug: data.slug, userId: data.userId })
    .first();
  return file;
};

const getPubFileBySlug = async (_: void, { data }: GetFileBySlugArgs) => {
  const file = await db("pub")
    .where({ slug: data.slug, userId: data.userId })
    .first();
  return file;
};

const isSubscribed = async (_: void, { id }: MyId) => {
  const user = await db("users").where({ id }).first();

  return user.subscriber;
};

const getFolder = async (_: void, { id }: MyId) => {
  const folder = await db("folder").where({ id }).first();

  if (!folder) throw new Error("No folder with this ID 💀");

  return folder;
};

const getFolders = async (_: void, { userId }: UserId) => {
  const folders = await db("folder").where({ userId });

  if (!folders) throw new Error("No folders belong to  💀");

  return folders;
};

const getPubFiles = async (_: void, { userId }: UserId) => {
  const pubs = await db("pub").where({ userId });

  // if (pubs.length === 0) throw new Error("This user has no published files 💀");

  return pubs;
};

const getPubFile = async (_: void, { id }: MyId) => {
  const pub = await db("pub").where({ id }).first();

  if (!pub) throw new Error("This file has not been published yet 💀");

  return pub;
};

const isFilePub = async (_: void, { id }: MyId) => {
  const pub = await db("pub").where({ id }).first();

  if (!pub) return false;

  return true;
};

const Query = {
  hello,
  users,
  user,
  getFiles,
  getFile,
  getFileBySlug,
  isSubscribed,
  getFolder,
  getFolders,
  getPubFiles,
  getPubFile,
  isFilePub,
  getPubFileBySlug,
};

export default Query;
