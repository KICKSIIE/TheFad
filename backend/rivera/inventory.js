/**
 * INVENTORY_LOGS — stock levels and movements. Owner: Rivera.
 * Cashiers may move stock too, so these routes use loginRequired, not roleRequired.
 */
import { todo } from '../shared/stub.js';
import { loginRequired } from '../shared/auth.js';

export default function register(router) {
  // DB: fn_list_inventory(q, low_only, limit), fn_list_categories()
  router.get('/inventory', 'inventory.index', loginRequired, todo({
    owner: 'Rivera',
    feature: 'INVENTORY_LOGS — stock overview',
    routines: 'fn_list_inventory(q, low_only, limit), fn_list_categories()',
    template: 'inventory.html',
  }));

  // DB: fn_inventory_history(null, 200)
  router.get('/inventory/history', 'inventory.history', loginRequired, todo({
    owner: 'Rivera',
    feature: 'INVENTORY_LOGS — movement history',
    routines: 'fn_inventory_history(null, 200)',
    template: 'inventory_history.html',
  }));

  // DB: fn_get_product(product_id), fn_inventory_history(product_id, 50)
  router.get('/inventory/:product_id(\\d+)', 'inventory.item', loginRequired, todo({
    owner: 'Rivera',
    feature: 'INVENTORY_LOGS — one product',
    routines: 'fn_get_product, fn_inventory_history',
    template: 'inventory_item.html',
  }));

  // DB: sp_stock_in / sp_stock_out / sp_adjust_stock
  //     (user_id, product_id, quantity); pick the routine from req.body.action
  router.post('/inventory/:product_id(\\d+)/move', 'inventory.move', loginRequired, todo({
    owner: 'Rivera',
    feature: 'INVENTORY_LOGS — stock in/out/count',
    routines: 'sp_stock_in | sp_stock_out | sp_adjust_stock',
    template: 'inventory_item.html',
  }));
}
