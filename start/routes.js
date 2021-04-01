'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.post('/signup', 'UserController.signup')
Route.post('/login', 'UserController.login')
Route.get('/products', 'ProductController.index').middleware('auth')
Route.get('/cart', 'CartController.index').middleware('auth')
Route.post('/cart', 'CartController.store').middleware('auth')
Route.post('/cart/delete', 'CartController.delete').middleware('auth')
Route.post('/cart/delete/all', 'CartController.deleteAll').middleware('auth')
Route.post('/cart/checkout', 'CartController.checkout').middleware('auth')
