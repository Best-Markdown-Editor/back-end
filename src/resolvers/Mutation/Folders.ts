import db from "../../data/dbConfig";

interface AddFolderArgs {
  data: {
    userId: string;
    name: string;
  };
}

interface EditFolderArgs {
  data: {
    id: number;
    name: string;
  };
}

interface DeleteFolderArg {
  id: number;
}

interface PubToFolderInput {
  data: {
    // userId: string;
    pubId: number;
    folderId: number;
  };
}

export const addFolder = async (_: void, { data }: AddFolderArgs) => {
  console.log("data", data);
  const { userId, name } = data;
  const check = await db("folder").where({ name, userId });
  if (check.length > 0)
    throw new Error("Already have a folder with that name 🤷‍♂");
  const folder = await db("folder").insert({ userId, name }).returning("*");
  return folder[0];
};

export const editFolder = async (_: void, { data }: EditFolderArgs) => {
  console.log("data", data);
  const { id, name } = data;
  const { userId, name: originalName } = await db("folder")
    .where({ id })
    .first();
  if (name === originalName) {
    const folder = await db("folder")
      .update({ name })
      .where({ id })
      .returning("*");
    return folder[0];
  }
  const check = await db("folder").where({ userId, name });
  if (check.length > 0)
    throw new Error("Already have a folder with that name 🤷‍♂");
  const folder = await db("folder")
    .update({ name })
    .where({ id })
    .returning("*");
  return folder[0];
};

export const deleteFolder = async (_: void, { id }: DeleteFolderArg) => {
  console.log("data", id);
  await db("folder").where({ id }).del();

  await db("pubToFolder").where({ folderId: id }).del();
  return true;
};

export const addPubToFolder = async (_: void, { data }: PubToFolderInput) => {
  console.log("data", data);
  const { pubId, folderId } = data;
  const res = await db("pubToFolder").insert({ pubId, folderId });

  if (!res) throw new Error("Did not publish");

  return true;
};
