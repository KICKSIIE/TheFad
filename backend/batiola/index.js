import catalog from './catalog.js';
import adminProducts from './admin-products.js';

/** Batiola — PRODUCT and CATEGORY. */
export default function register(router) {
  catalog(router);
  adminProducts(router);
}
