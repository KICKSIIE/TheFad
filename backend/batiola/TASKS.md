# Batiola — PRODUCT and CATEGORY

## Backend (your folder)
| File | Routes | Database |
|---|---|---|
| `catalog.js` | shop list, search suggestions, product page, photo | `fn_list_products`, `fn_list_categories`, `fn_get_product`, `fn_list_variants`, `fn_list_product_photos`, `fn_get_image` |
| `admin-products.js` | product CRUD, variants, photos, categories | `sp_create_product`, `sp_update_product`, `sp_add_variant`, `sp_add_product_photo`, `sp_remove_product_photo`, `sp_set_cover_photo`, `sp_set_product_active`, `sp_create_category`, `sp_update_category`, `sp_delete_category` |

## UI (provided — wire it, don't redesign it)
- `templates/catalog.html`, `templates/product.html`
- `templates/admin/products.html`, `admin/product_form.html`, `admin/product_photos.html`, `admin/categories.html`

## Done when
- [ ] Storefront lists active products with search, category, in-stock and sort working.
- [ ] Product page shows colour choices, sizes, stock and gallery.
- [ ] Admin can create/edit products, add variants, upload/remove/cover photos.
- [ ] Categories can be created, renamed, reordered and deleted.
- [ ] Errors flash the database message; every POST form keeps `_csrf`.
- [ ] No shortcut: use `db.callFunction` / `callProcedure` only.
