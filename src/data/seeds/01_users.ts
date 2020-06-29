import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries 💀
  return knex("users")
    .del()
    .then(async function () {
      // Inserts seed entries 🌱
      return knex("users").insert([
        {
          id: "KLSDf23lkh756sdf34LK6S87DH2fo7IWSef",
          username: "TestUser",
          email: "testUser@gmail.com",
        },
      ]);
    });
}
