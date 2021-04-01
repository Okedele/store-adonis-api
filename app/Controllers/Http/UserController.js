'use strict'
const User = use('App/Models/User')
const Cart = use('App/Models/Cart')
const { validate } = use('Validator')

class UserController {

  async signup ({ request, auth, response }) {
    // get user data from signup form
    const rules = {
      first_name: 'required',
      last_name: 'required',
      email: 'required|email|unique:users,email',
      phone: 'required|number',
      password: 'required'
    }
    const userData = request.only(['first_name', 'last_name', 'email', 'phone', 'password'])
    const validation = await validate(userData, rules)
    try {
      // save user to database
    if (!validation.fails()) {
      const user = await User.create(userData)
      // generate JWT token for user
      const token = await auth.generate(user)


      // create a cart for the new user
      const new_cart = new Cart()
      new_cart.user_id = user.id
      await new_cart.save()

      return response.json({
        status: 'success',
        data: token
      })
    }else{
      return validation.messages()
    }
    } catch (error) {
      return response.status(400).json({
        status: 'error',
        message: 'There was a problem creating the user, please try again later.'
      })
    }
  }

  async login ({ request, auth, response }) {
    try {
      // validate the user credentials and generate a JWT token
      if (await auth.attempt(request.input('email'), request.input('password'))) {
        let user = await User.findBy('email', request.input('email'))
        let token = await auth.generate(user)

        return response.json({
          status: 'success',
          data: token
        })
      }
      // const token = await auth.attempt(
      //   request.input('email'),
      //   request.input('password')
      // )


    } catch (error) {
      response.status(400).json({
        status: 'error',
        message: 'Invalid email/password'
      })
    }
  }

}

module.exports = UserController
