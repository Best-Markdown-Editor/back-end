import { ExpressContext } from "apollo-server-express/dist/ApolloServer";
import db from "../../data/dbConfig";

export const getFiles = async (_: void, __: void, ctx: ExpressContext) => {
  const files = await db("files").where({ userId: ctx.req?.session!.userId });
  return files.reverse();
};
