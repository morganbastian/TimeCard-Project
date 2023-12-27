/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const mockEmployeesData = require('./data/mockEmployeesData.json')
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('employees').del()
  await knex('employees').insert(mockEmployeesData);
  // Correct the incrementing id to prevent conflict
  await knex.raw(`ALTER SEQUENCE employees_id_seq RESTART WITH ${mockEmployeesData.length + 1}`)
};

