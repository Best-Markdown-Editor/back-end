import * as Knex from "knex";
import moment from "moment";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable("files", (tbl) => {
    tbl.increments();
    tbl.text("title").notNullable();
    tbl.text("slug").notNullable();
    tbl.text("body").defaultTo("").notNullable();
    tbl.integer("userId").notNullable();
    tbl.text("date").defaultTo(moment().unix()).notNullable();
    tbl.text("updatedAt").defaultTo(moment().unix()).notNullable();
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists("files");
}
