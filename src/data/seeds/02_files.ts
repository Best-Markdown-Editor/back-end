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
          userId: "KLSDf23lkh756sdf34LK6S87DH2fo7IWSef",
        },
        {
          title: "That File",
          slug: "that-file",
          userId: "KLSDf23lkh756sdf34LK6S87DH2fo7IWSef",
        },
        {
          title: "Any File",
          slug: "any-file",
          userId: "KLSDf23lkh756sdf34LK6S87DH2fo7IWSef",
        },
      ]);
    });
}
