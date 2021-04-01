'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.increments()
      table.string('title', 254).notNullable()
      table.text('description').notNullable()
      table.string('product_type', 254).notNullable()
      table.string('image_tag', 254).notNullable()
      table.string('price', 254).notNullable()
      table.timestamp('created_at').defaultTo(this.fn.now())
      table.timestamp('updated_at')
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductSchema
