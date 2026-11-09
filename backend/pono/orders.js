/**
 * SALES list and SALE_ITEM lines — order tracking and receipts. Owner: Pono.
 */
import { todo } from '../shared/stub.js';
import { loginRequired } from '../shared/auth.js';

export default function register(router) {
  // DB: fn_list_sales(start, end, status)
  router.get('/orders', 'orders.index', loginRequired, todo({
    owner: 'Pono',
    feature: 'SALES — order list',
    routines: 'fn_list_sales(start, end, status)',
    template: 'orders.html',
  }));

  // DB: fn_get_sale(sale_id), fn_sale_items(sale_id)
  router.get('/orders/:sale_id(\\d+)', 'orders.detail', loginRequired, todo({
    owner: 'Pono',
    feature: 'SALE_ITEM — order receipt',
    routines: 'fn_get_sale, fn_sale_items',
    template: 'order_detail.html',
  }));

  // DB: sp_update_order_status(user_id, sale_id, new_status, rider_service, rider_contact)
  router.post('/orders/:sale_id(\\d+)/status', 'orders.set_status', loginRequired, todo({
    owner: 'Pono',
    feature: 'SALES — update order status',
    routines: 'sp_update_order_status',
    template: 'order_detail.html',
  }));
}
