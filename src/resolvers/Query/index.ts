import { ExpressContext } from "../../types";
import db from "../../data/dbConfig";

interface HelloArgs {
  name: string;
}

const hello = async (_: void, { name }: HelloArgs) =>
  `Hello, ${name || "world"}!`;

const users = async () => await db("users");

const getFiles = async (_: void, __: void, ctx: ExpressContext) => {
  const files = await db("files").where({ userId: ctx.req?.session!.userId });
  return files.reverse();
};

interface GetSlugProp {
  slug: string;
}

const getFile = async (_: void, { slug }: GetSlugProp, ctx: ExpressContext) => {
  const file = await db("files")
    .where({ userId: ctx.req?.session!.userId, slug })
    .first();
  return file;
};

const isAuth = (_: void, __: void, ctx: ExpressContext) => {
  if (!ctx.req?.session!.userId) return false;
  return true;
};

const Query = {
  hello,
  users,
  getFiles,
  isAuth,
  getFile,
};

export default Query;
