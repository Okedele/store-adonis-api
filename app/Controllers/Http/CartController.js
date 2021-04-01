'use strict'
const Cart = use('App/Models/Cart')
const CartItem = use('App/Models/CartItem')
const Product = use('App/Models/Product')
const axios = require('axios')
const Mail = use('Mail')

class CartController {

  async index({response, auth, params}) {
    const cart = await Cart.query()
      .where({
        user_id: auth.current.user.id,
        CheckedOut:  0
      }).with('items').first()

    if (cart){
      const cartItems = await CartItem.query()
        .where({
          cart_id: cart.id
        }).with('product').fetch()

      return response.json({
        status: 'success',
        data: cartItems
      })
    }else {
      return response.json({
        message: "No items in cart"
      })
    }

  }

  async store({ request, auth, response }) {
    const cart = await Cart.query()
      .where({
        user_id: auth.current.user.id,
        CheckedOut:  0
      }).with('items').first()

      // if (!cart) {
      // const product = await Product.query()
      //   .where('id', request.input('product_id')).first()
      // const new_cart = new Cart()
      // new_cart.user_id = auth.current.user.id
      // await new_cart.save()
      // const new_cartItem = new CartItem()
      // new_cartItem.cart_id = new_cart.id
      // new_cartItem.product_id = request.input('product_id')
      // new_cartItem.price = product.price
      // await new_cartItem.save()
    // }else
      if (cart) {
        const cartItems = await CartItem.query()
          .where({
            cart_id: cart.id,
            product_id: request.input('product_id')
          }).first()
        if (cartItems) {
          const new_qty = Number(cartItems.qty) + 1
          cartItems.qty = new_qty
          await cartItems.save()
        } else if (!cartItems) {
          const product = await Product.query()
            .where('id', request.input('product_id')).first()
          const new_cartItem = new CartItem()
          new_cartItem.cart_id = cart.id
          new_cartItem.product_id = request.input('product_id')
          new_cartItem.price = product.price
          await new_cartItem.save()
        }
      }

    const updated_cart = await Cart.query()
      .where({
        user_id: auth.current.user.id,
        CheckedOut:  0
      }).with('items').first()

    const updated_cartItems = await CartItem.query()
      .where({
        cart_id: updated_cart.id
      }).with('product').fetch()

    return response.json({
      status: 'success',
      data: updated_cartItems
    })
  }

  async delete({ request, auth, response }) {
    const cart = await Cart.query()
      .where({
        user_id: auth.current.user.id,
        CheckedOut:  0
      }).with('items').first()

    if(cart) {
      const cartItems = await CartItem.query()
        .where({
          cart_id: cart.id,
          product_id:  request.input('product_id')
        }).first()

        if (Number(cartItems.qty) === 1) {
          await cartItems.delete()
        }else if (Number(cartItems.qty) > 1) {
          const new_qty = Number(cartItems.qty) - 1
          cartItems.qty = new_qty
          await cartItems.save()
        }
    }

    const updated_cart = await Cart.query()
      .where({
        user_id: auth.current.user.id,
        CheckedOut:  0
      }).with('items').first()

    const updated_cartItems = await CartItem.query()
      .where({
        cart_id: updated_cart.id
      }).with('product').fetch()

    return response.json({
      status: 'success',
      data: updated_cartItems
    })
  }

  async deleteAll({ request, auth, response }) {
    const cart = await Cart.query()
      .where({
        user_id: auth.current.user.id,
        CheckedOut:  0
      }).with('items').first()

    const cartItems = await CartItem.query()
      .where('cart_id', cart.id).delete()

    const updated_cart = await Cart.query()
      .where({
        user_id: auth.current.user.id,
        CheckedOut:  0
      }).with('items').first()

    const updated_cartItems = await CartItem.query()
      .where({
        cart_id: updated_cart.id
      }).with('product').fetch()

    return response.json({
      status: 'success',
      data: updated_cartItems
    })
  }

  async checkout ({ request, auth, response }) {
    const cart = await Cart.query()
      .where({
        user_id: auth.current.user.id,
        CheckedOut:  0
      }).with('items').first()

    const cartItems = await CartItem.query()
      .where({
        cart_id: cart.id
      }).with('product').fetch()

    let message = `Order no ${cart.id} has been confirmed!\n\n`
    const cartItems_arr =  cartItems.toJSON()
    let total = 0

    cartItems_arr.forEach((item, index) => {
      message += `Title: ${item.product.title}\nPrice: $${item.price}\nQuantity: ${item.qty}\n\n`
      total += Number(item.price) * Number (item.qty)
    })
    message += `Total: $${total.toFixed(2)}`
    message += `\nThanks for shopping with VUE STORE`

    axios.post("https://app.multitexter.com/v2/app/sms", {
      email: 'tech@chronosng.com',
      password: 'gxXaua9L6Sw63W6',
      message: message,
      sender_name: 'VUE STORE',
      recipients: auth.current.user.phone
    }).then(response => {
      console.log(response)
    })

    if (await Mail.raw(message, (message) => {
      message.to(auth.current.user.email)
      message.subject('Order Confirmation')
    })) {
      cart.CheckedOut =  1
      await cart.save()
      const new_cart = new Cart()
      new_cart.user_id = auth.current.user.id
      await new_cart.save()
      const updated_cart = await Cart.query()
        .where({
          user_id: auth.current.user.id,
          CheckedOut:  0
        }).with('items').first()

      const updated_cartItems = await CartItem.query()
        .where({
          cart_id: updated_cart.id
        }).with('product').fetch()

      return response.json({
        status: 'success',
        data: updated_cartItems
      })
    }else{
      return 'no'
    }


  }

}

module.exports = CartController
