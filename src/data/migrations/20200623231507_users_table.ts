import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("users", (tbl) => {
    tbl.string("id").primary();
    tbl.text("username").notNullable();
    tbl.text("email").notNullable().unique();
    tbl.text("avatar").notNullable();
    tbl.boolean("subscriber").defaultTo(false).notNullable();
    tbl.text("token");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("users");
}
