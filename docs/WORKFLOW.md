# Workflow

## 1. First run

```powershell
cd starter
copy .env.example .env
npm install
npm start
```

`.env` needs a working `DATABASE_URL` and any long random `SECRET_KEY`. Database setup:
restore the `THEFAD` database, then run `sql/setup_all.sql` and `sql/check_setup.sql`.

Check <http://127.0.0.1:5000/health> — it must say `{"database":"ok"}`.

## 2. Git flow

- `main` is the shared branch. Never commit straight to it.
- One branch per owner: `batiola/products`, `decembrano/attendance`, `po/promos-refunds`,
  `pono/sales`, `rivera/inventory`.
- Pull `main` before starting a session; push your branch and open a pull request when a screen works.
- Commit in small steps, one screen or one route group per commit.
- Never force-push a shared branch and never rewrite someone else's commits.

Because each owner has a folder, merges should be clean. If two people must touch one file, agree in
chat first and let one person finish.

## 3. Your first job: replace a stub

Every stub looks like this:

```js
router.get('/inventory', 'inventory.index', loginRequired, todo({
  owner: 'Rivera',
  feature: 'INVENTORY_LOGS — stock overview',
  routines: 'fn_list_inventory(q, low_only, limit), fn_list_categories()',
  template: 'inventory.html',
}));
```

Replace the `todo(...)` argument with a real handler and keep the path, endpoint name and guard:

```js
import * as db from '../../db.js';
import { flash } from '../../flash.js';
import { renderPage } from '../../render.js';
import { loginRequired } from '../shared/auth.js';

router.get('/inventory', 'inventory.index', loginRequired, async (req, res) => {
  const q = String(req.query.q || '').trim();
  const lowOnly = req.query.low === '1';
  let items = [];
  try {
    items = await db.callFunction('fn_list_inventory', q || null, lowOnly, 20);
  } catch (error) {
    flash(req, 'error', error.message);          // database messages are safe to show
  }
  return renderPage(req, res, 'inventory.html', { items, q, low_only: lowOnly });
});
```

Rules for every handler:

1. Keep the route path and endpoint string exactly as the stub has them. Templates call `url_for()`
   with those endpoint names.
2. Use `loginRequired` or `roleRequired('AD')` as the stub does. Admin POSTs are also checked against
   the approval PIN by `approval.js`; you do not write that yourself.
3. Use `db.callFunction`, `db.callFunctionOne` or `db.callProcedure`. No SQL strings, no `pg` import.
4. Catch database errors and `flash(req, 'error', error.message)`.
5. Render the template named in the stub. Open the template to see which locals it expects
   (for example `items`, `rows`, `stock`) and pass exactly those.
6. POST forms carry `_csrf` already (see the templates). Do not remove it.
7. Redirect after a successful POST; do not re-render a stale form.

`backend/shared/dashboard.js` is a complete, working example of all of the above.

## 4. Reading the database contract

All routines are in `sql/` (or `sql/setup_all.sql`). Each stub names the routine it needs. To see the
arguments and result columns, search the SQL file:

```powershell
Select-String -Path sql/setup_all.sql -Pattern 'fn_list_inventory' -Context 0,25
```

Functions return rows: `db.callFunction('fn_x', arg1, arg2)` → array; `callFunctionOne` → first row or null.
Procedures take an INOUT last argument: pass `null` and read the returned `p_*` field.

## 5. Checks before you push

```powershell
node --check backend\<your-folder>\*.js
npm test          # smoke test; needs the database running
```

`npm test` checks that the app starts, sign-in works and unimplemented screens answer 501. It does not
test your feature yet — open the page in a browser and click through the happy path, then try the edge
cases (empty result, invalid number, out of stock, already refunded).

## 6. Definition of done (one route)

- [ ] The stub page no longer appears; the real screen renders with database data.
- [ ] The guard matches the stub (`loginRequired` or `roleRequired('AD')`).
- [ ] Errors flash the database message instead of crashing.
- [ ] Invalid input is rejected before the database call (use `toInt` / `toDecimal` from `utils.js`).
- [ ] Money, dates and stock render with the provided filters (`peso`, `dt`, `label`).
- [ ] After a POST, the page redirects and shows a success flash.
- [ ] CSRF still enforced (POST without `_csrf` returns 400).
- [ ] No other owner's files changed.
