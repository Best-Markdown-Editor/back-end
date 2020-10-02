import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  return knex("files")
    .del()
    .then(() => {
      // Inserts seed entries 🌱
      return knex("files").insert([
        {
          title: "This File",
          slug: "this-file",
          userId: "OpXrOo1X72fQkg6bkFSj5i2dokl1",
        },
        {
          title: "That File",
          slug: "that-file",
          userId: "OpXrOo1X72fQkg6bkFSj5i2dokl1",
        },
        {
          title: "Any File",
          slug: "any-file",
          userId: "OpXrOo1X72fQkg6bkFSj5i2dokl1",
        },
      ]);
    });
}
