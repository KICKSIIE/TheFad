# Po — DISCOUNT and REFUND

## Backend (your folder)
| File | Routes | Database |
|---|---|---|
| `promos.js` | staff view of active promos | `fn_list_discounts` |
| `admin-promos.js` | create/edit/end/apply/unlink/delete promos | `sp_expire_promos`, `fn_list_discounts`, `fn_get_discount`, `fn_discount_products`, `fn_discount_product_names`, `sp_create_discount`, `sp_update_discount`, `sp_apply_discount`, `sp_clear_product_discount`, `sp_delete_unused_discount` |
| `refunds.js` | refund report, find order, process refund | `fn_refund_report`, `fn_list_refunds`, `fn_get_sale`, `fn_sale_items`, `sp_process_refund` |
| `audit.js` | audit log (extra) | `fn_audit_logs`, `fn_list_staff` |

## UI (provided — wire it, don't redesign it)
- `templates/promos.html`
- `templates/admin/promos.html`, `admin/promo_form.html`, `admin/promo_detail.html`
- `templates/admin/refunds.html`, `admin/refund_sale.html`
- `templates/audit.html`

## Done when
- [ ] A promo can be created, applied to selected products, viewed, ended and deleted when unused.
- [ ] The staff promos page shows only active promos; expired ones disappear.
- [ ] Refund report filters by date; an order shows its items and how many are still refundable.
- [ ] Processing a refund records it and returns stock (database routine does the work).
- [ ] Audit page filters by date, actor, entity and action.
