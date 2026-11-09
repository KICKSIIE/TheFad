import pos from './pos.js';
import orders from './orders.js';

/** Pono — SALES and SALE_ITEM. */
export default function register(router) {
  pos(router);
  orders(router);
}
