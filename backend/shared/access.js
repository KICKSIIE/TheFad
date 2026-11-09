/**
 * Decides whether a signed-in user may use the staff pages.
 *
 * The starter answers "yes" for every active account so the shell is usable before
 * attendance exists. The DAILY_TIME_RECORD owner replaces the TODO with the real
 * shift/overtime gate (the database already has fn_staff_access for this).
 */
import * as db from '../../db.js';

export async function getAccess(userId) {
  const staff = await db.callFunctionOne('fn_get_staff', userId);
  if (!staff) return null;
  return {
    active: staff.is_active,
    allowed: true,                 // TODO(Decembrano): allow only an open shift or approved overtime
    can_clock_in: true,
    user_type: staff.user_type,
    schedule: null,
  };
}
