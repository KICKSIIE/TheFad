# Rivera — INVENTORY_LOGS

## Backend (your folder)
| File | Routes | Database |
|---|---|---|
| `inventory.js` | stock overview, movement history, one product, stock move | `fn_list_inventory`, `fn_list_categories`, `fn_inventory_history`, `fn_get_product`, `sp_stock_in`, `sp_stock_out`, `sp_adjust_stock` |

## UI (provided — wire it, don't redesign it)
- `templates/inventory.html`, `templates/inventory_history.html`, `templates/inventory_item.html`
- `templates/_movements.html` (shared partial)

## Done when
- [ ] Stock list filters by search, low-stock-only, category and threshold.
- [ ] History shows stock-in, stock-out and stock count rows with who did it and when.
- [ ] A product page shows its movements and offers in/out/count.
- [ ] Each move calls the right routine and flashes the new balance.
- [ ] Quantity is validated before calling the database; every row is logged by the routine.
