# The Fad — group starter

This is the blank version of the app for the group project.

**Kept for you:** the HTML templates (`templates/`), CSS and browser scripts (`static/`), and the whole
database (`sql/`) including every stored function and procedure.

**Left blank for the team:** the backend route handlers under `backend/`. Every screen route exists and
answers with a "Backend not built yet" page that names its owner, the database routines to call and the
template to render. Replace the stub with a real handler.

The app shell, sign-in, CSRF protection, approval-PIN guard and database layer are already working.

---

## 1. Set up the database (once)

1. Restore your backup into a database named `THEFAD`.
2. Run `sql/setup_all.sql`, then `sql/check_setup.sql` (every row should say `OK`).

## 2. Run the starter

```powershell
cd starter
copy .env.example .env     # then edit DATABASE_URL / SECRET_KEY
npm install
npm start
```

Open <http://127.0.0.1:5000>. Sign in with `dev_admin / Admin@1234` (admin) or
`dev_cashier / Cashier@1234` (cashier).

Expected right now:

| Page | Result |
|---|---|
| `/login`, `/dashboard`, `/account` | works (provided) |
| Shop, POS, Orders, Inventory, Products, Staff, Attendance, Promos, Refunds, Audit | **501 — Backend not built yet**, showing the owner and routines |

Every 501 page is a checklist item: when it renders the real template instead, that route is done.

## 3. Where everything lives

```
starter/
├── app.js, run.js, config.js, db.js, render.js, ...   provided infrastructure
├── templates/     HTML screens (provided)
├── static/        CSS + browser JS (provided)
├── sql/           database schema, routines, seed (provided)
├── backend/
│   ├── index.js   route registry (do not edit)
│   ├── router.js  route helper (do not edit)
│   ├── shared/    sign-in, guards, dashboard reference (provided)
│   ├── batiola/   PRODUCT + CATEGORY
│   ├── decembrano/ USERS + DAILY_TIME_RECORD
│   ├── po/        DISCOUNT + REFUND
│   ├── pono/      SALES + SALE_ITEM
│   └── rivera/    INVENTORY_LOGS
└── docs/
    ├── OWNERSHIP.md   who owns which entity, files and screens
    ├── WORKFLOW.md    setup, git flow, how to replace a stub
    └── design-system.md (provided UI reference)
```

## Rules of thumb

- Work only inside your own `backend/<owner>/` folder and your assigned templates.
- Never edit `backend/index.js`, `backend/router.js`, `db.js`, `app.js` or another owner's folder.
- Keep the existing route paths and endpoint names — `urls.js` and the templates depend on them.
- All database access goes through `db.js`; no SQL strings in route files.
- `backend/shared/dashboard.js` is the reference implementation; copy its shape.

Read `docs/WORKFLOW.md` before your first commit, and `docs/OWNERSHIP.md` for your assignment.
