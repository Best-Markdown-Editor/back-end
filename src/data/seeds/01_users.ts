import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries 💀
  return knex("users")
    .del()
    .then(async function () {
      // Inserts seed entries 🌱
      return knex("users").insert([
        {
          id: "OpXrOo1X72fQkg6bkFSj5i2dokl1",
          username: "TestUser",
          email: "testUser@gmail.com",
          avatar:
            "http://chrisalensula.org/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png",
          subscriber: true,
        },
      ]);
    });
}
