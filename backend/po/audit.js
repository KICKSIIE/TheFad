/**
 * Audit log — extra screen kept with Po (matches the project ownership notes).
 * This is not one of the nine entities in the assignment table.
 */
import { todo } from '../shared/stub.js';
import { roleRequired } from '../shared/auth.js';

export default function register(router) {
  // DB: fn_audit_logs(start, end, actor, entity, action, offset), fn_list_staff()
  router.get('/admin/audit', 'audit.index', roleRequired('AD'), todo({
    owner: 'Po',
    feature: 'Audit log',
    routines: 'fn_audit_logs, fn_list_staff',
    template: 'audit.html',
  }));
}
