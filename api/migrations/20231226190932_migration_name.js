/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// Creates boats table
exports.up = function(knex) {
  return knex.schema.createTable('time_entries', function(table) {
    table.increments('id').primary();
    table.integer('employeeId').notNullable().references('id').inTable('employees').onDelete('CASCADE');
    table.date('date').notNullable();
    table.time('startTime').notNullable();
    table.time('endTime').notNullable();
    table.decimal('totalHours').notNullable()
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// drops boats table
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('time_entries')
};
