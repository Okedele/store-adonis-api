'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CartItemSchema extends Schema {
  up () {
    this.create('cart_items', (table) => {
      table.increments()
      table.integer('cart_id').unsigned().notNullable()
      table.integer('product_id').unsigned().notNullable()
      table.string('qty', 254).defaultTo(1)
      table.string('price', 254).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('cart_items')
  }
}

module.exports = CartItemSchema
