'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {

  item () {
    return this.belongsTo('App/Models/CartItem')
  }

}

module.exports = Product
