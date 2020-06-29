import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable("users", (tbl) => {
    tbl.string("id").primary();
    tbl.text("username").notNullable();
    tbl.text("email").notNullable().unique();
    tbl.text("avatar").notNullable();
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists("users");
}
