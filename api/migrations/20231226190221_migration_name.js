/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// Creates users table
exports.up = function(knex) {
  return knex.schema.createTable('employees', function(table) {
    table.increments('id').primary();
    table.string('name', 50).unique().notNullable();
    table.integer('payRate').notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// drops users table
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('employees')
};
