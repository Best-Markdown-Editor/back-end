import * as Knex from "knex";
import bcrypt from "bcryptjs";

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries 💀
  return knex("users")
    .del()
    .then(async function () {
      // Inserts seed entries 🌱
      return knex("users").insert([
        {
          username: "TestUser",
          email: "testUser@gmail.com",
          password: await bcrypt.hash("password", 12),
        },
      ]);
    });
}
