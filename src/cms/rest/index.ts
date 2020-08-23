import { auth } from "./../../helpers/index";
import Express, { Request, Response } from "express";
import db from "../../data/dbConfig";

const restRouter = Express.Router();

restRouter.get("/published-files", async (req: Request, res: Response) => {
  try {
    const userId = await auth(req.headers.token);
    const pubs = await db("pub").where({ userId });

    res.status(200).json(pubs);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

restRouter.get(
  "/published-file-by-id/:id",
  async (req: Request, res: Response) => {
    try {
      await auth(req.headers.token);
      const { id } = req.params;
      const pubs = await db("pub").where({ id }).first();

      res.status(200).json(pubs);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

restRouter.get(
  "/published-file-by-slug/:slug",
  async (req: Request, res: Response) => {
    try {
      const userId = await auth(req.headers.token);
      const { slug } = req.params;
      const pubs = await db("pub").where({ slug, userId }).first();

      res.status(200).json(pubs);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

restRouter.get("/folders", async (req: Request, res: Response) => {
  try {
    const userId = await auth(req.headers.token);
    const folders = await db("folder").select("id", "name").where({ userId });

    const foldersWithFiles = await Promise.all(
      folders.map(async (folder: any) => {
        const files = await db("pubToFolder")
          .where({ folderId: folder.id })
          .join("pub", "pubToFolder.pubId", "pub.id")
          .select("pub.*");
        return {
          ...folder,
          files,
        };
      })
    );

    res.status(200).json(foldersWithFiles);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

restRouter.get(
  "/published-files/folder-id/:folderId",
  async (req: Request, res: Response) => {
    try {
      await auth(req.headers.token);
      const { folderId } = req.params;

      const files = await db("pubToFolder")
        .where({ folderId })
        .join("pub", "pubToFolder.pubId", "pub.id")
        .select("pub.*");

      res.status(200).json(files);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

restRouter.get(
  "/published-files/folder-name/:name",
  async (req: Request, res: Response) => {
    try {
      const userId = await auth(req.headers.token);
      const { name } = req.params;

      const folder = await db("folder").where({ userId, name }).first();

      const files = await db("pubToFolder")
        .where({ folderId: folder.id })
        .join("pub", "pubToFolder.pubId", "pub.id")
        .select("pub.*");

      res.status(200).json(files);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

export default restRouter;
