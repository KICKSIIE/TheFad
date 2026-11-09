/**
 * PRODUCT and CATEGORY — admin screens. Owner: Batiola.
 * Admin pages require roleRequired('AD'); management POSTs also pass the approval-PIN guard.
 */
import { todo } from '../shared/stub.js';
import { roleRequired } from '../shared/auth.js';

export default function register(router) {
  // ---------------------------------------------------------------- products
  // DB: fn_list_products(q, category_id, include_inactive), fn_list_categories()
  router.get('/admin/products', 'admin_products.index', roleRequired('AD'), todo({
    owner: 'Batiola',
    feature: 'PRODUCT — admin list',
    routines: 'fn_list_products, fn_list_categories',
    template: 'admin/products.html',
  }));

  // DB: fn_list_categories() for the category dropdown
  router.get('/admin/products/new', 'admin_products.new', roleRequired('AD'), todo({
    owner: 'Batiola',
    feature: 'PRODUCT — create form',
    routines: 'fn_list_categories()',
    template: 'admin/product_form.html',
  }));

  // DB: sp_create_product(name, price, category_id, description, sizes, colors, photo_mimes, photo_data)
  router.post('/admin/products/new', 'admin_products.new', roleRequired('AD'), todo({
    owner: 'Batiola',
    feature: 'PRODUCT — create product',
    routines: 'sp_create_product',
    template: 'admin/product_form.html',
  }));

  // DB: fn_get_product(product_id), fn_list_variants(product_id), fn_list_categories()
  router.get('/admin/products/:product_id(\\d+)/edit', 'admin_products.edit', roleRequired('AD'), todo({
    owner: 'Batiola',
    feature: 'PRODUCT — edit form',
    routines: 'fn_get_product, fn_list_variants, fn_list_categories',
    template: 'admin/product_form.html',
  }));

  // DB: sp_update_product(product_id, name, price, category_id, size, color, description, apply_all)
  router.post('/admin/products/:product_id(\\d+)/edit', 'admin_products.edit', roleRequired('AD'), todo({
    owner: 'Batiola',
    feature: 'PRODUCT — update product',
    routines: 'sp_update_product',
    template: 'admin/product_form.html',
  }));

  // DB: fn_get_product, fn_list_product_photos, fn_list_variants
  router.get('/admin/products/:product_id(\\d+)/photos', 'admin_products.photos', roleRequired('AD'), todo({
    owner: 'Batiola',
    feature: 'PRODUCT — photo gallery',
    routines: 'fn_get_product, fn_list_product_photos, fn_list_variants',
    template: 'admin/product_photos.html',
  }));

  // DB: sp_add_product_photo(product_id, mime_type, image_data, apply_all)
  router.post('/admin/products/:product_id(\\d+)/photos/upload', 'admin_products.upload_photos', roleRequired('AD'), todo({
    owner: 'Batiola',
    feature: 'PRODUCT — upload photos',
    routines: 'sp_add_product_photo',
    template: 'admin/product_photos.html',
  }));

  // DB: sp_remove_product_photo(product_id, image_id, apply_all)
  router.post('/admin/products/:product_id(\\d+)/photos/:image_id(\\d+)/remove', 'admin_products.remove_photo', roleRequired('AD'), todo({
    owner: 'Batiola',
    feature: 'PRODUCT — remove photo',
    routines: 'sp_remove_product_photo',
    template: 'admin/product_photos.html',
  }));

  // DB: sp_set_cover_photo(product_id, image_id, apply_all)
  router.post('/admin/products/:product_id(\\d+)/photos/:image_id(\\d+)/cover', 'admin_products.cover_photo', roleRequired('AD'), todo({
    owner: 'Batiola',
    feature: 'PRODUCT — set cover photo',
    routines: 'sp_set_cover_photo',
    template: 'admin/product_photos.html',
  }));

  // DB: sp_add_variant(product_id, size, color)
  router.post('/admin/products/:product_id(\\d+)/add-variant', 'admin_products.add_variant', roleRequired('AD'), todo({
    owner: 'Batiola',
    feature: 'PRODUCT — add size/colour variant',
    routines: 'sp_add_variant',
    template: 'admin/product_form.html',
  }));

  // DB: sp_set_product_active(product_id, active)
  router.post('/admin/products/:product_id(\\d+)/active', 'admin_products.set_active', roleRequired('AD'), todo({
    owner: 'Batiola',
    feature: 'PRODUCT — activate/deactivate',
    routines: 'sp_set_product_active',
    template: 'admin/products.html',
  }));

  // -------------------------------------------------------------- categories
  // DB: fn_list_categories()
  router.get('/admin/products/categories', 'admin_products.categories', roleRequired('AD'), todo({
    owner: 'Batiola',
    feature: 'CATEGORY — list',
    routines: 'fn_list_categories()',
    template: 'admin/categories.html',
  }));

  // DB: sp_create_category(category_name, display_order)
  router.post('/admin/products/categories', 'admin_products.categories', roleRequired('AD'), todo({
    owner: 'Batiola',
    feature: 'CATEGORY — create',
    routines: 'sp_create_category',
    template: 'admin/categories.html',
  }));

  // DB: sp_update_category(category_id, category_name, display_order)
  router.post('/admin/products/categories/:category_id(\\d+)', 'admin_products.update_category', roleRequired('AD'), todo({
    owner: 'Batiola',
    feature: 'CATEGORY — update',
    routines: 'sp_update_category',
    template: 'admin/categories.html',
  }));

  // DB: sp_delete_category(category_id)
  router.post('/admin/products/categories/:category_id(\\d+)/delete', 'admin_products.delete_category', roleRequired('AD'), todo({
    owner: 'Batiola',
    feature: 'CATEGORY — delete',
    routines: 'sp_delete_category',
    template: 'admin/categories.html',
  }));
}
