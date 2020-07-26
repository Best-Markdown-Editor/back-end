import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable("folder", (tbl) => {
    tbl.increments();
    tbl.text("name").notNullable();
    tbl.text("userId").notNullable();
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists("folder");
}
