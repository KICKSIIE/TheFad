# Decembrano — USERS and DAILY_TIME_RECORD

## Backend (your folder)
| File | Routes | Database |
|---|---|---|
| `admin-staff.js` | staff list, create, edit, activate | `fn_list_staff`, `fn_get_staff`, `sp_create_staff`, `sp_update_staff`, `sp_set_staff_active` |
| `attendance.js` | clock in/out, overtime, everyone, shift records, schedule | `fn_my_attendance`, `fn_staff_access`, `sp_clock_in`, `sp_clock_out`, `sp_overtime_in`, `sp_overtime_out`, `fn_attendance_board`, `sp_save_shift`, `sp_allow_overtime`, `sp_update_overtime`, `sp_cancel_overtime`, `fn_get_shift_setting`, `sp_save_shift_setting` |

## Shared file you may change (only this one)
`backend/shared/access.js` — replace the permissive `allowed: true` with real shift/overtime gating
(`fn_staff_access`). If attendance becomes required, also switch `HOME` in `backend/shared/auth.js`
back to `/attendance/` together with the team.

## UI (provided — wire it, don't redesign it)
- `templates/admin/staff.html`, `admin/staff_form.html`
- `templates/attendance.html`, `attendance_everyone.html`, `overtime.html`, `overtime_form.html`, `shift_form.html`, `schedule.html`

## Done when
- [ ] Staff accounts can be created, edited and deactivated; an admin cannot deactivate themselves.
- [ ] A cashier can clock in once per scheduled day; the shift closes at the scheduled end.
- [ ] Admins can record/edit shifts, approve/extend/cancel overtime and save the schedule.
- [ ] The "everyone" board and overtime list filter by date range.
- [ ] Shift gating is enforced again for staff pages (update `access.js`).
