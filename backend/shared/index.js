import auth from './auth.js';
import dashboard from './dashboard.js';

/** Provided screens: sign-in, guards and the dashboard reference implementation. */
export default function register(router) {
  auth(router);
  dashboard(router);
}
