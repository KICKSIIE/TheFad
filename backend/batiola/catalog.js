/**
 * PRODUCT — public shop. Owner: Batiola.
 * The screens already exist; implement the handlers and render the template named in each stub.
 */
import { todo } from '../shared/stub.js';

export default function register(router) {
  // Storefront listing: search, category, in-stock and sort filters.
  // DB: fn_list_products(q, category_id, include_inactive), fn_list_categories()
  router.get('/', 'catalog.index', todo({
    owner: 'Batiola',
    feature: 'PRODUCT — shop catalog',
    routines: 'fn_list_products(q, category_id, include_inactive), fn_list_categories()',
    template: 'catalog.html',
  }));

  // JSON suggestions for the search box (first 6 matches).
  // DB: fn_list_products(q, category_id, false) · returns JSON, not a template
  router.get('/search-suggestions', 'catalog.suggestions', todo({
    owner: 'Batiola',
    feature: 'PRODUCT — search suggestions',
    routines: 'fn_list_products(q, category_id, false)',
    template: '— (JSON response)',
  }));

  // Product page: colour picker, sizes, prices, gallery.
  // DB: fn_get_product(product_id), fn_list_variants(product_id),
  //     fn_list_product_photos(product_id), fn_list_categories()
  router.get('/product/:product_id(\\d+)', 'catalog.product', todo({
    owner: 'Batiola',
    feature: 'PRODUCT — product page',
    routines: 'fn_get_product, fn_list_variants, fn_list_product_photos, fn_list_categories',
    template: 'product.html',
  }));

  // Serves a photo stored in the database.
  // DB: fn_get_image(image_id) · returns the binary image, not a template
  router.get('/media/product/:image_id(\\d+)', 'catalog.product_image', todo({
    owner: 'Batiola',
    feature: 'PRODUCT — product photo',
    routines: 'fn_get_image(image_id)',
    template: '— (binary image response)',
  }));
}
