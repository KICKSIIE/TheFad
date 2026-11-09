/**
 * DAILY_TIME_RECORD — clock in/out, overtime and attendance reports. Owner: Decembrano.
 *
 * The shared access check in ../shared/access.js is deliberately permissive until this
 * feature exists. When you build the shift gate, implement it there (or in a service file
 * in this folder) and keep the SIGN_IN_EXEMPT endpoints working.
 */
import { todo } from '../shared/stub.js';
import { loginRequired, roleRequired } from '../shared/auth.js';

export default function register(router) {
  // DB: fn_my_attendance(user_id), fn_staff_access(user_id), fn_get_shift_setting()
  // If you add a service file, keep it in this folder and import it here.
  router.get('/attendance', 'attendance.index', loginRequired, todo({
    owner: 'Decembrano',
    feature: 'DAILY_TIME_RECORD — my attendance',
    routines: 'fn_my_attendance, fn_staff_access, fn_get_shift_setting',
    template: 'attendance.html',
  }));

  // DB: sp_clock_in(user_id, shift_start, grace_minutes, max_hours)
  router.post('/attendance/clock-in', 'attendance.clock_in', loginRequired, todo({
    owner: 'Decembrano',
    feature: 'DAILY_TIME_RECORD — clock in',
    routines: 'sp_clock_in',
    template: 'attendance.html',
  }));

  // DB: sp_clock_out / fn_close_expired_shifts
  router.post('/attendance/clock-out', 'attendance.clock_out', loginRequired, todo({
    owner: 'Decembrano',
    feature: 'DAILY_TIME_RECORD — clock out',
    routines: 'sp_clock_out, fn_close_expired_shifts',
    template: 'attendance.html',
  }));

  // DB: sp_overtime_in(user_id, permit_id)
  router.post('/attendance/overtime-in', 'attendance.overtime_in', loginRequired, todo({
    owner: 'Decembrano',
    feature: 'DAILY_TIME_RECORD — start overtime',
    routines: 'sp_overtime_in',
    template: 'attendance.html',
  }));

  // DB: sp_overtime_out
  router.post('/attendance/overtime-out', 'attendance.overtime_out', loginRequired, todo({
    owner: 'Decembrano',
    feature: 'DAILY_TIME_RECORD — end overtime',
    routines: 'sp_overtime_out',
    template: 'attendance.html',
  }));

  // ---------------------------------------------------------------- admin: everyone
  // DB: fn_attendance_board(start, end), fn_list_overtime(start, end)
  router.get('/attendance/everyone', 'attendance.everyone', roleRequired('AD'), todo({
    owner: 'Decembrano',
    feature: 'DAILY_TIME_RECORD — everyone',
    routines: 'fn_attendance_board, fn_list_overtime',
    template: 'attendance_everyone.html',
  }));

  // DB: fn_list_staff(), fn_get_shift_setting()
  router.get('/attendance/shift', 'attendance.new_shift', roleRequired('AD'), todo({
    owner: 'Decembrano',
    feature: 'DAILY_TIME_RECORD — record a shift',
    routines: 'fn_list_staff, fn_get_shift_setting',
    template: 'shift_form.html',
  }));

  // DB: sp_save_shift(dtr_id, user_id, time_in, time_out, note, ...rules)
  router.post('/attendance/shift', 'attendance.new_shift', roleRequired('AD'), todo({
    owner: 'Decembrano',
    feature: 'DAILY_TIME_RECORD — save a shift',
    routines: 'sp_save_shift',
    template: 'shift_form.html',
  }));

  // DB: fn_get_shift(dtr_id), fn_list_staff()
  router.get('/attendance/shift/:dtr_id(\\d+)', 'attendance.edit_shift', roleRequired('AD'), todo({
    owner: 'Decembrano',
    feature: 'DAILY_TIME_RECORD — edit a shift',
    routines: 'fn_get_shift, fn_list_staff',
    template: 'shift_form.html',
  }));

  // DB: sp_save_shift(dtr_id, ...)
  router.post('/attendance/shift/:dtr_id(\\d+)', 'attendance.edit_shift', roleRequired('AD'), todo({
    owner: 'Decembrano',
    feature: 'DAILY_TIME_RECORD — update a shift',
    routines: 'sp_save_shift',
    template: 'shift_form.html',
  }));

  // DB: fn_list_overtime(start, end), fn_list_staff()
  router.get('/attendance/overtime', 'attendance.overtime', roleRequired('AD'), todo({
    owner: 'Decembrano',
    feature: 'DAILY_TIME_RECORD — overtime list',
    routines: 'fn_list_overtime, fn_list_staff',
    template: 'overtime.html',
  }));

  // DB: fn_list_staff()
  router.get('/attendance/overtime/new', 'attendance.new_overtime', roleRequired('AD'), todo({
    owner: 'Decembrano',
    feature: 'DAILY_TIME_RECORD — approve overtime form',
    routines: 'fn_list_staff',
    template: 'overtime_form.html',
  }));

  // DB: sp_allow_overtime(user_id, work_date, start_time, end_time, grace_minutes, note)
  router.post('/attendance/overtime/new', 'attendance.new_overtime', roleRequired('AD'), todo({
    owner: 'Decembrano',
    feature: 'DAILY_TIME_RECORD — approve overtime',
    routines: 'sp_allow_overtime',
    template: 'overtime_form.html',
  }));

  // DB: fn_get_overtime(permit_id), fn_list_staff()
  router.get('/attendance/overtime/:permit_id(\\d+)', 'attendance.edit_overtime', roleRequired('AD'), todo({
    owner: 'Decembrano',
    feature: 'DAILY_TIME_RECORD — edit overtime',
    routines: 'fn_get_overtime, fn_list_staff',
    template: 'overtime_form.html',
  }));

  // DB: sp_update_overtime(...)
  router.post('/attendance/overtime/:permit_id(\\d+)', 'attendance.edit_overtime', roleRequired('AD'), todo({
    owner: 'Decembrano',
    feature: 'DAILY_TIME_RECORD — update overtime',
    routines: 'sp_update_overtime',
    template: 'overtime_form.html',
  }));

  // DB: sp_cancel_overtime(permit_id, actor_user_id)
  router.post('/attendance/overtime/:permit_id(\\d+)/cancel', 'attendance.cancel_overtime', roleRequired('AD'), todo({
    owner: 'Decembrano',
    feature: 'DAILY_TIME_RECORD — cancel overtime',
    routines: 'sp_cancel_overtime',
    template: 'overtime.html',
  }));

  // DB: fn_get_shift_setting()
  router.get('/attendance/schedule', 'attendance.schedule', roleRequired('AD'), todo({
    owner: 'Decembrano',
    feature: 'DAILY_TIME_RECORD — shift schedule',
    routines: 'fn_get_shift_setting',
    template: 'schedule.html',
  }));

  // DB: sp_save_shift_setting(shift_start, shift_end, grace_minutes, ...)
  router.post('/attendance/schedule', 'attendance.schedule', roleRequired('AD'), todo({
    owner: 'Decembrano',
    feature: 'DAILY_TIME_RECORD — save schedule',
    routines: 'sp_save_shift_setting',
    template: 'schedule.html',
  }));
}
