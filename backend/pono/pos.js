/**
 * SALES and SALE_ITEM — point of sale and checkout. Owner: Pono.
 * The cart lives in req.session.cart as { "<product_id>": quantity }.
 */
import { todo } from '../shared/stub.js';
import { loginRequired } from '../shared/auth.js';

export default function register(router) {
  // DB: fn_list_products(null, null, false) for the product picker and the cart lines
  router.get('/pos', 'pos.index', loginRequired, todo({
    owner: 'Pono',
    feature: 'SALES — point of sale',
    routines: 'fn_list_products(null, null, false)',
    template: 'pos.html',
  }));

  // DB: fn_list_products — validate the product and cap the quantity at current stock
  router.post('/pos/cart/add', 'pos.add', loginRequired, todo({
    owner: 'Pono',
    feature: 'SALES — add to cart',
    routines: 'fn_list_products',
    template: 'pos.html',
  }));

  // DB: fn_list_products — keep the cart quantity within stock
  router.post('/pos/cart/update', 'pos.update', loginRequired, todo({
    owner: 'Pono',
    feature: 'SALES — change cart quantity',
    routines: 'fn_list_products',
    template: 'pos.html',
  }));

  // No database: clear req.session.cart.
  router.post('/pos/cart/clear', 'pos.clear', loginRequired, todo({
    owner: 'Pono',
    feature: 'SALES — clear cart',
    routines: '— (session only)',
    template: 'pos.html',
  }));

  // DB: sp_create_sale(user_id, fulfillment_type, payment_method, customer_name,
  //                     customer_contact, delivery_address, items_json)
  // items_json: [{ product_id, quantity }]
  router.post('/pos/checkout', 'pos.checkout', loginRequired, todo({
    owner: 'Pono',
    feature: 'SALES — checkout',
    routines: 'sp_create_sale',
    template: 'pos.html',
  }));
}
