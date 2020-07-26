import db from "../data/dbConfig";

export const slugify = (title: string) => {
  return title
    .toLowerCase()
    .replace(/-/g, " ")
    .replace(/_/g, " ")
    .replace(/^\s+|\s+$/g, "")
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
    .replace(/ /g, "-");
};

export const auth = async (token: string | string[] | undefined) => {
  if (token === undefined)
    throw new Error("Please add your token to the request headers 🙏");

  const user = await db("users").where({ token }).first();

  if (!user) throw new Error("Invalid token 💀");

  if (!user.subscriber)
    throw new Error(
      "You must be a subscriber to use the CMS feature of Best Markdown Editor ⚔️"
    );

  return user.id;
};
