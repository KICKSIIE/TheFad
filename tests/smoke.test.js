/**
 * Starter smoke test: the shell runs, sign-in works, unimplemented screens answer 501.
 * Needs the database from sql/setup_all.sql. Run with: npm test
 */
import assert from 'node:assert/strict';
import test from 'node:test';

const { createApp } = await import('../app.js');
const { initDb, closeDb } = await import('../db.js');

initDb();
const app = createApp();
const server = await new Promise((resolve) => {
  const listener = app.listen(0, '127.0.0.1', () => resolve(listener));
});
const base = `http://127.0.0.1:${server.address().port}`;

const jar = new Map();
const cookies = () => [...jar.entries()].map(([name, value]) => `${name}=${value}`).join('; ');

function absorb(response) {
  for (const line of response.headers.getSetCookie ? response.headers.getSetCookie() : []) {
    const [pair] = line.split(';');
    const [name, ...rest] = pair.split('=');
    jar.set(name.trim(), rest.join('='));
  }
}

async function get(path) {
  const response = await fetch(base + path, { headers: { cookie: cookies() }, redirect: 'manual' });
  absorb(response);
  return response;
}

async function post(path, data = {}) {
  const response = await fetch(base + path, {
    method: 'POST',
    headers: { cookie: cookies(), 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(data),
    redirect: 'manual',
  });
  absorb(response);
  return response;
}

async function csrfFrom(path) {
  const html = await (await get(path)).text();
  return /name="_csrf" value="([^"]+)"/.exec(html)?.[1];
}

test.after(() => {
  server.close();
  return closeDb();
});

test('health reports the database', async () => {
  const response = await get('/health');
  assert.equal(response.status, 200);
  assert.match(await response.text(), /"database":"ok"/);
});

test('the sign-in page renders', async () => {
  const response = await get('/login');
  assert.equal(response.status, 200);
  assert.match(await response.text(), /The Fad/);
});

test('sign-in lands on the dashboard', async () => {
  const token = await csrfFrom('/login');
  const response = await post('/login', { _csrf: token, username: 'dev_admin', password: 'Admin@1234' });
  assert.equal(response.status, 302);
  assert.equal(response.headers.get('location'), '/dashboard');
});

test('the provided dashboard renders', async () => {
  const response = await get('/dashboard');
  assert.equal(response.status, 200);
});

test('unimplemented screens say who owns them', async () => {
  const response = await get('/pos/');
  assert.equal(response.status, 501);
  assert.match(await response.text(), /Pono/);
});

test('a POST without the CSRF token is rejected', async () => {
  const response = await post('/admin/staff/10/active', { active: '0' });
  assert.equal(response.status, 400);
});
