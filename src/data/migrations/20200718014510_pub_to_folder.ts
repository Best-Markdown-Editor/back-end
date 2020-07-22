import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable("pubToFolder", (tbl) => {
    tbl.integer("id").primary();
    tbl.text("folderId").notNullable();
    tbl.text("pubId").notNullable();
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists("pubToFolder");
}
