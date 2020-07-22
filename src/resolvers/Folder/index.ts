import db from "../../data/dbConfig";

export const files = async (folder: any) => {
  const files = await db("pubToFolder")
    .where({ folderId: folder.id })
    .join("pub", "folder.pubId", "pub.id");
  console.log("files", files);
  return files;
};
