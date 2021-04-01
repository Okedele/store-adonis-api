'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class CartItem extends Model {

  cart () {
    return this.belongsTo('App/Models/Cart')
  }

  product () {
    return this.belongsTo('App/Models/Product')
  }

}

module.exports = CartItem
