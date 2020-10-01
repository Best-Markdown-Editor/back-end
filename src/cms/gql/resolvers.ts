import { Folder } from "./../../types";
import { auth } from "../../helpers";
import db from "../../data/dbConfig";
import { ExpressContext } from "apollo-server-express/dist/ApolloServer";

interface PubBySlugArg {
  slug: string;
}

interface PubByIdArg {
  id: string;
}

interface PubInFolderByNameArg {
  name: string;
}

interface PubInFolderByIdArg {
  folderId: number;
}

const resolvers = {
  Query: {
    async getPubFiles(_: void, __: void, ctx: ExpressContext) {
      const userId = await auth(ctx.req.headers.token);
      const pubs = await db("pub").where({ userId });

      return pubs;
    },
    async getPubFileBySlug(
      _: void,
      { slug }: PubBySlugArg,
      ctx: ExpressContext
    ) {
      const userId = await auth(ctx.req.headers.token);
      const file = await db("pub").where({ slug: slug, userId }).first();
      return file;
    },
    async getPubFileById(_: void, { id }: PubByIdArg, ctx: ExpressContext) {
      await auth(ctx.req.headers.token);
      const file = await db("pub").where({ id }).first();
      return file;
    },
    async getFilesInFolderByName(
      _: void,
      { name }: PubInFolderByNameArg,
      ctx: ExpressContext
    ) {
      const userId = await auth(ctx.req.headers.token);
      const { id: folderId } = await db("folder")
        .where({ name, userId })
        .first();
      console.log("folder id:", folderId);
      const pub = await db("pubToFolder")
        .where({ folderId })
        .join("pub", "pubToFolder.pubId", "pub.id");

      if (!pub) throw new Error("Something went wrong 💀");

      return pub;
    },
    async getFilesInFolderById(
      _: void,
      { folderId }: PubInFolderByIdArg,
      ctx: ExpressContext
    ) {
      await auth(ctx.req.headers.token);
      const pub = await db("pubToFolder")
        .where({ folderId })
        .join("pub", "pubToFolder.pubId", "pub.id");

      if (!pub) throw new Error("Something went wrong 💀");

      return pub;
    },
    async getUserFolders(_: void, __: void, ctx: ExpressContext) {
      const userId = await auth(ctx.req.headers.token);
      const folders = await db("folder").where({ userId });

      return folders;
    },
  },
  Folder: {
    async files(folder: Folder) {
      const files = await db("pubToFolder")
        .where({ folderId: folder.id })
        .join("pub", "pubToFolder.pubId", "pub.id");
      console.log("files", files);
      return files;
    },
  },
};

export default resolvers;
