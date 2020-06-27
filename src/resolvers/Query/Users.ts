import db from "../../data/dbConfig";

export const users = async () => await db("users");
