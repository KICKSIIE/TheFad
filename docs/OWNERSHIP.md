# Ownership map

Assignments follow the entity table. One folder per person, so two people never edit the same file.
The backend owner named here also verifies the UI for those screens, because the HTML/CSS is already
built (see the UI notes below if you split UI and backend between different people).

## Entities

| # | Entity | Owner | Backend files (edit these) | Screens to verify (templates) |
|---|---|---|---|---|
| 1 | PRODUCT | Batiola | `backend/batiola/catalog.js`, `admin-products.js` | `catalog.html`, `product.html`, `admin/products.html`, `admin/product_form.html`, `admin/product_photos.html` |
| 2 | USERS | Decembrano | `backend/decembrano/admin-staff.js` | `admin/staff.html`, `admin/staff_form.html` |
| 3 | DISCOUNT | Po | `backend/po/promos.js`, `admin-promos.js` | `promos.html`, `admin/promos.html`, `admin/promo_form.html`, `admin/promo_detail.html` |
| 4 | SALES | Pono | `backend/pono/pos.js` (checkout), `backend/pono/orders.js` | `pos.html`, `orders.html`, `order_detail.html` |
| 5 | INVENTORY_LOGS | Rivera | `backend/rivera/inventory.js` | `inventory.html`, `inventory_history.html`, `inventory_item.html`, `_movements.html` |
| 6 | CATEGORY | Batiola | `backend/batiola/admin-products.js` (categories section) | `admin/categories.html`, category filters in `catalog.html` |
| 7 | DAILY_TIME_RECORD | Decembrano | `backend/decembrano/attendance.js` | `attendance.html`, `attendance_everyone.html`, `overtime.html`, `overtime_form.html`, `shift_form.html`, `schedule.html` |
| 8 | REFUND | Po | `backend/po/refunds.js` | `admin/refunds.html`, `admin/refund_sale.html` |
| 9 | SALE_ITEM | Pono | `backend/pono/orders.js` (receipt lines) | `order_detail.html` |

Extra screen (not in the table): audit log → `backend/po/audit.js` → `audit.html`.

## Workload at a glance

| Owner | Entities | Backend files | Routes |
|---|---|---|---|
| Batiola | PRODUCT, CATEGORY | 2 | 19 |
| Decembrano | USERS, DAILY_TIME_RECORD | 2 | 24 |
| Po | DISCOUNT, REFUND (+ audit) | 4 | 16 |
| Pono | SALES, SALE_ITEM | 2 | 8 |
| Rivera | INVENTORY_LOGS | 1 | 4 |

Decembrano has the most routes because attendance has many admin screens. If you want to rebalance,
move `attendance.js` screens (overtime and schedule) to another owner — attendance is self-contained
in that one file plus `backend/shared/access.js`.

## Splitting UI and backend

The UI is already built, so "UI work" means: open each screen with the real handler, check the markup
still fits the data (column names, form fields, empty states, money formatting), and fix the template.
It is not a redesign. Suggested split if you pair people up:

| Owner (backend) | UI partner (verify + fix templates) |
|---|---|
| Batiola | _assigned in class_ |
| Decembrano | _assigned in class_ |
| Po | _assigned in class_ |
| Pono | _assigned in class_ |
| Rivera | _assigned in class_ |

Rules when two people touch one entity:

1. The UI partner edits **only** the template files listed for that entity.
2. The backend owner edits **only** the matching `backend/<owner>/` files.
3. If a template needs a new value, the backend owner adds it to the `renderPage(...)` locals and tells
   the UI partner; the UI partner does not edit backend files.
4. Template edits and backend edits go in separate commits so a revert is easy.

## Shared files and who may touch them

| File | Rule |
|---|---|
| `backend/index.js`, `backend/router.js` | Nobody edits. Route files are already registered. |
| `backend/shared/auth.js` | Provided. Only change `HOME` back to `/attendance/` when attendance gating is ready — announce it first. |
| `backend/shared/access.js` | Decembrano only (shift gating). |
| `backend/shared/stub.js`, `templates/todo.html` | Provided helper; leave alone. |
| `db.js`, `app.js`, `config.js`, `render.js`, `menu.js`, `urls.js` | Provided. Ask the lead before changing. |
| `sql/` | Provided. Do not change the routines; call them. |
| `templates/_macros.html`, `base.html`, shared partials | Lead only. |
