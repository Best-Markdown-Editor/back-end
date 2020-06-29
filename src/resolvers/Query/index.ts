import db from "../../data/dbConfig";
import { ValidationError } from "apollo-server-express";

interface HelloArgs {
  name: string;
}

const hello = async (_: void, { name }: HelloArgs) =>
  `Hello, ${name || "world"}!`;

const users = async () => await db("users");

interface UserId {
  userId: string;
}

const getFiles = async (_: void, { userId }: UserId) => {
  const files = await db("files").where({ userId });
  return files.reverse();
};

interface GetFile {
  id: number | string;
}

const getFile = async (_: void, { id }: GetFile) => {
  const file = await db("files").where({ id }).first();
  return file;
};

const getFileBySlug = async (_: void, { data }: any) => {
  const file = await db("files")
    .where({ slug: data.slug, userId: data.userId })
    .first();
  return file;
};

interface MyId {
  id: string;
}

const user = async (_: void, { id }: MyId) => {
  const user = await db("users").where({ id }).first();

  if (!user) throw new ValidationError("That is not a valid userId... 💩");

  return user;
};

const Query = {
  hello,
  users,
  user,
  getFiles,
  getFile,
  getFileBySlug,
};

export default Query;
