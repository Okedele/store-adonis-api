'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CartSchema extends Schema {
  up () {
    this.create('carts', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable()
      table.boolean('CheckedOut').notNullable().defaultTo(0)
      table.timestamps()
    })
  }

  down () {
    this.drop('carts')
  }
}

module.exports = CartSchema
