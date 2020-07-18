import * as Knex from "knex";
import moment from "moment";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable("pub", (tbl) => {
    tbl.integer("id").primary();
    tbl.text("slug").notNullable();
    tbl.text("title").notNullable();
    tbl.text("thumbNail").notNullable();
    tbl.text("description").notNullable();
    tbl.text("body").defaultTo("").notNullable();
    tbl.string("userId").notNullable();
    tbl.text("publishedOn").defaultTo(moment().unix()).notNullable();
    tbl.text("updatedAt").defaultTo(moment().unix()).notNullable();
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists("pub");
}
