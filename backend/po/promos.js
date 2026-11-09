/**
 * DISCOUNT — staff-only read view. Owner: Po.
 * The admin promo manager lives in admin-promos.js.
 */
import { todo } from '../shared/stub.js';
import { loginRequired } from '../shared/auth.js';

export default function register(router) {
  // DB: fn_list_discounts() — keep only rows whose status is 'Active'
  router.get('/promos', 'promos.index', loginRequired, todo({
    owner: 'Po',
    feature: 'DISCOUNT — active promos (staff)',
    routines: 'fn_list_discounts()',
    template: 'promos.html',
  }));
}
