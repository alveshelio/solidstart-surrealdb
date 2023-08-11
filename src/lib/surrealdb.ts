import { Surreal } from 'surrealdb.js';

export const db = new Surreal('http://localhost:80/rpc', {
  ns: 'test',
  db: 'test',
  auth: {
    user: 'root',
    pass: 'root',
  },
});
