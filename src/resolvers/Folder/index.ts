import db from "../../data/dbConfig";

const files = async (folder: any) => {
  const files = await db("pubToFolder")
    .where({ folderId: folder.id })
    .join("pub", "pubToFolder.pubId", "pub.id")
    .select("*");
  console.log("files", files);
  return files;
};

const Folder = {
  files,
};

export default Folder;
