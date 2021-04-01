'use strict'

/*
|--------------------------------------------------------------------------
| DatabaseSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const ProductSeeder = require('./ProductSeeder')

class DatabaseSeeder {
  async run () {
    await ProductSeeder.run()
  }
}

module.exports = DatabaseSeeder
