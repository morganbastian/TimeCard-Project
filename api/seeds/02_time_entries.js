/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const mockTimeEntriesData = require('./data/mockTimeEntriesData.json')
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('time_entries').del()
  await knex('time_entries').insert(mockTimeEntriesData);
  // Correct the incrementing id to prevent conflict
  await knex.raw(`ALTER SEQUENCE time_entries_id_seq RESTART WITH ${mockTimeEntriesData.length + 1}`)
};
