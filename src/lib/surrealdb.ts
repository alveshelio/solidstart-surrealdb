import { Surreal } from 'surrealdb.js';

export const db = new Surreal('http://localhost:80/rpc', {
  // Set the namespace and database for the connection
  ns: 'test',
  db: 'test',
  auth: {
    user: 'root',
    pass: 'root',
  },

  // Set the authentication details for the connection
  // auth: {
  //   user: 'root',
  //   pass: 'root',
  // },
});
