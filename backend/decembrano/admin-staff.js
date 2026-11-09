/**
 * USERS — staff accounts. Owner: Decembrano.
 * Sign-in itself is provided in ../shared/auth.js; this file is the account CRUD.
 */
import { todo } from '../shared/stub.js';
import { roleRequired } from '../shared/auth.js';

export default function register(router) {
  // DB: fn_list_staff()
  router.get('/admin/staff', 'admin_staff.index', roleRequired('AD'), todo({
    owner: 'Decembrano',
    feature: 'USERS — staff list',
    routines: 'fn_list_staff()',
    template: 'admin/staff.html',
  }));

  // DB: none (renders the empty form)
  router.get('/admin/staff/new', 'admin_staff.new', roleRequired('AD'), todo({
    owner: 'Decembrano',
    feature: 'USERS — create form',
    routines: '— (form only)',
    template: 'admin/staff_form.html',
  }));

  // DB: sp_create_staff(username, password, first_name, last_name, user_type, email, station, hired_on)
  router.post('/admin/staff/new', 'admin_staff.new', roleRequired('AD'), todo({
    owner: 'Decembrano',
    feature: 'USERS — create account',
    routines: 'sp_create_staff',
    template: 'admin/staff_form.html',
  }));

  // DB: fn_get_staff(user_id)
  router.get('/admin/staff/:user_id(\\d+)/edit', 'admin_staff.edit', roleRequired('AD'), todo({
    owner: 'Decembrano',
    feature: 'USERS — edit form',
    routines: 'fn_get_staff(user_id)',
    template: 'admin/staff_form.html',
  }));

  // DB: sp_update_staff(user_id, first_name, last_name, user_type, email, station, hired_on)
  router.post('/admin/staff/:user_id(\\d+)/edit', 'admin_staff.edit', roleRequired('AD'), todo({
    owner: 'Decembrano',
    feature: 'USERS — update account',
    routines: 'sp_update_staff',
    template: 'admin/staff_form.html',
  }));

  // DB: sp_set_staff_active(user_id, active)
  router.post('/admin/staff/:user_id(\\d+)/active', 'admin_staff.set_active', roleRequired('AD'), todo({
    owner: 'Decembrano',
    feature: 'USERS — activate/deactivate',
    routines: 'sp_set_staff_active',
    template: 'admin/staff.html',
  }));
}
