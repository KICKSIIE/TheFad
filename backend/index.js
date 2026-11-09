/**
 * Route registry. Every owner folder exports default register(router).
 * Add new route files inside your own folder and call them from that folder's index.js —
 * do not edit another owner's folder or this file.
 */
import shared from './shared/index.js';
import batiola from './batiola/index.js';
import decembrano from './decembrano/index.js';
import po from './po/index.js';
import pono from './pono/index.js';
import rivera from './rivera/index.js';

const MODULES = [shared, batiola, decembrano, po, pono, rivera];

export function registerAll(router) {
  for (const register of MODULES) register(router);
}
