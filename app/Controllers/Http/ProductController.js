'use strict'
const Product = use('App/Models/Product')

class ProductController {

  async index({response, auth}) {
    const products = await Product.all()

    return response.json({
      status: 'success',
      data: products
    })
  }

}

module.exports = ProductController
