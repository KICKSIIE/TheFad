import promos from './promos.js';
import adminPromos from './admin-promos.js';
import refunds from './refunds.js';
import audit from './audit.js';

/** Po — DISCOUNT and REFUND (plus the audit log). */
export default function register(router) {
  promos(router);
  adminPromos(router);
  refunds(router);
  audit(router);
}
