/**
 * REFUND — refund report and processing. Owner: Po.
 */
import { todo } from '../shared/stub.js';
import { roleRequired } from '../shared/auth.js';

export default function register(router) {
  // DB: fn_refund_report(start, end), fn_list_refunds(start, end)
  router.get('/admin/refunds', 'refunds.index', roleRequired('AD'), todo({
    owner: 'Po',
    feature: 'REFUND — report',
    routines: 'fn_refund_report, fn_list_refunds',
    template: 'admin/refunds.html',
  }));

  // Reads ?sale_id= and redirects to the refund page; no database call.
  router.get('/admin/refunds/find', 'refunds.find', roleRequired('AD'), todo({
    owner: 'Po',
    feature: 'REFUND — find an order',
    routines: '— (validate sale_id, then redirect)',
    template: 'admin/refunds.html',
  }));

  // DB: fn_get_sale(sale_id), fn_sale_items(sale_id)
  router.get('/admin/refunds/sale/:sale_id(\\d+)', 'refunds.sale', roleRequired('AD'), todo({
    owner: 'Po',
    feature: 'REFUND — order and refundable items',
    routines: 'fn_get_sale, fn_sale_items',
    template: 'admin/refund_sale.html',
  }));

  // DB: sp_process_refund(user_id, sale_id, item_id, quantity, reason, method)
  router.post('/admin/refunds/sale/:sale_id(\\d+)', 'refunds.sale', roleRequired('AD'), todo({
    owner: 'Po',
    feature: 'REFUND — process a refund',
    routines: 'sp_process_refund',
    template: 'admin/refund_sale.html',
  }));
}
