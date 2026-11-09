import adminStaff from './admin-staff.js';
import attendance from './attendance.js';

/** Decembrano — USERS and DAILY_TIME_RECORD. */
export default function register(router) {
  adminStaff(router);
  attendance(router);
}
