import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("pubToFolder", (tbl) => {
    tbl.increments();
    tbl.integer("folderId").notNullable();
    tbl.integer("pubId").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("pubToFolder");
}
