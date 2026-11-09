/** Start The Fad starter:  node run.js  (or npm start). */
import { createApp } from './app.js';
import { initDb } from './db.js';

initDb();
const app = createApp();
const port = Number(process.env.PORT || 5000);
const host = process.env.HOST || '127.0.0.1';

app.listen(port, host, () => {
  console.log(`The Fad starter is running at http://${host}:${port}`);
});
