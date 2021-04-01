'use strict'

/*
|--------------------------------------------------------------------------
| ProductSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')

class ProductSeeder {
  static async run () {
    await Database.table('products').insert([
      {
        "title": "Fullstack Hoodie",
        "description": "Lightweight, breathable hoodie with the Fullstack Crest. Guaranteed to keep you looking fresh while warm.",
        "product_type": "hoodies/jackets",
        "image_tag": "hoodie.png",
        "price": 19.99
      },
      {
        "title": "Fullstack Tee",
        "description": "The original Fullstack clothing item. Always prepared to keep your style in check.",
        "product_type": "shirts/t-shirts",
        "image_tag": "tee.png",
        "price": 15.99
      },
      {
        "title": "Fullstack Fitted Cap",
        "description": "Stay comfortable and cool with the first Fullstack Fitted Cap, featuring a normal bill and medium crown.",
        "product_type": "caps/hats",
        "image_tag": "cap.png",
        "price": 15.99
      },
      {
        "title": "Fullstack Jacket",
        "description": "Keep warm and protected with the rugged, durable Fullstack lightweight jacket.",
        "product_type": "hoodies/jackets",
        "image_tag": "jacket.png",
        "price": 49.99
      }
    ])
  }
}

module.exports = ProductSeeder
