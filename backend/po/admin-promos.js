/**
 * DISCOUNT — admin promo manager. Owner: Po.
 * Admin pages require roleRequired('AD'); management POSTs also pass the approval-PIN guard.
 */
import { todo } from '../shared/stub.js';
import { roleRequired } from '../shared/auth.js';

export default function register(router) {
  // DB: sp_expire_promos(), fn_list_discounts(), fn_discount_product_names(discount_id)
  router.get('/admin/promos', 'admin_promos.index', roleRequired('AD'), todo({
    owner: 'Po',
    feature: 'DISCOUNT — admin list',
    routines: 'sp_expire_promos, fn_list_discounts, fn_discount_product_names',
    template: 'admin/promos.html',
  }));

  // DB: fn_list_products(null, null, false) for the product picker
  router.get('/admin/promos/new', 'admin_promos.new', roleRequired('AD'), todo({
    owner: 'Po',
    feature: 'DISCOUNT — create form',
    routines: 'fn_list_products',
    template: 'admin/promo_form.html',
  }));

  // DB: sp_create_discount(...), sp_apply_discount(...)
  router.post('/admin/promos/new', 'admin_promos.new', roleRequired('AD'), todo({
    owner: 'Po',
    feature: 'DISCOUNT — create promo',
    routines: 'sp_create_discount, sp_apply_discount',
    template: 'admin/promo_form.html',
  }));

  // DB: fn_get_discount(discount_id), fn_discount_products(discount_id), fn_list_products
  router.get('/admin/promos/:discount_id(\\d+)', 'admin_promos.edit', roleRequired('AD'), todo({
    owner: 'Po',
    feature: 'DISCOUNT — edit form',
    routines: 'fn_get_discount, fn_discount_products, fn_list_products',
    template: 'admin/promo_form.html',
  }));

  // DB: sp_update_discount(...)
  router.post('/admin/promos/:discount_id(\\d+)', 'admin_promos.edit', roleRequired('AD'), todo({
    owner: 'Po',
    feature: 'DISCOUNT — update promo',
    routines: 'sp_update_discount',
    template: 'admin/promo_form.html',
  }));

  // DB: fn_get_discount(discount_id), fn_discount_products(discount_id)
  router.get('/admin/promos/:discount_id(\\d+)/view', 'admin_promos.view', roleRequired('AD'), todo({
    owner: 'Po',
    feature: 'DISCOUNT — promo detail',
    routines: 'fn_get_discount, fn_discount_products',
    template: 'admin/promo_detail.html',
  }));

  // DB: sp_update_discount(...) with the end date set to now
  router.post('/admin/promos/:discount_id(\\d+)/end', 'admin_promos.end_now', roleRequired('AD'), todo({
    owner: 'Po',
    feature: 'DISCOUNT — end promo now',
    routines: 'sp_update_discount',
    template: 'admin/promo_detail.html',
  }));

  // DB: sp_apply_discount(discount_id, product_ids, unit_price)
  router.post('/admin/promos/:discount_id(\\d+)/apply', 'admin_promos.apply', roleRequired('AD'), todo({
    owner: 'Po',
    feature: 'DISCOUNT — apply to products',
    routines: 'sp_apply_discount',
    template: 'admin/promo_form.html',
  }));

  // DB: sp_clear_product_discount(product_id)
  router.post('/admin/promos/unlink/:product_id(\\d+)', 'admin_promos.unlink', roleRequired('AD'), todo({
    owner: 'Po',
    feature: 'DISCOUNT — unlink product',
    routines: 'sp_clear_product_discount',
    template: 'admin/promo_form.html',
  }));

  // DB: sp_delete_unused_discount(discount_id)
  router.post('/admin/promos/:discount_id(\\d+)/delete', 'admin_promos.delete_unused', roleRequired('AD'), todo({
    owner: 'Po',
    feature: 'DISCOUNT — delete unused promo',
    routines: 'sp_delete_unused_discount',
    template: 'admin/promos.html',
  }));
}
