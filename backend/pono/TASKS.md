# Pono — SALES and SALE_ITEM

## Backend (your folder)
| File | Routes | Database |
|---|---|---|
| `pos.js` | cart add/update/clear, checkout | `fn_list_products`, `sp_create_sale` |
| `orders.js` | order list, receipt with line items, status update | `fn_list_sales`, `fn_get_sale`, `fn_sale_items`, `sp_update_order_status` |

## UI (provided — wire it, don't redesign it)
- `templates/pos.html`
- `templates/orders.html`, `templates/order_detail.html`

## Done when
- [ ] POS lists products with stock, search and category filter; out-of-stock items cannot be added.
- [ ] Cart quantities are capped at available stock; clear works.
- [ ] Checkout calls `sp_create_sale` once, clears the cart and opens the receipt.
- [ ] Orders filter by date and status; the total ignores cancelled/refunded orders.
- [ ] Receipt shows every sale item with quantity, unit price and discount.
- [ ] Status moves between Pending, Out_for_Delivery, Completed and Cancelled.
