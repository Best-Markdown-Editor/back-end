import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return knex("files")
    .del()
    .then(() => {
      // Inserts seed entries 🌱
      return knex("files").insert([
        { title: "This File", slug: "this-file", userId: 1 },
        { title: "That File", slug: "that-file", userId: 1 },
        { title: "Any File", slug: "any-file", userId: 1 },
      ]);
    });
}
