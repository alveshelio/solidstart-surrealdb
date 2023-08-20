import AwaitedSurreal from '@theopensource-company/awaited-surrealdb';
import { getToken } from '~/lib/session.server';
// import { Surreal } from 'surrealdb.js';

const SurrealInstance = new AwaitedSurreal({
  endpoint: 'http://localhost:80/rpc',
  namespace: 'test',
  database: 'test',
  token: async function () {
    // Retrieve token from local storage for example
    return await getToken();
  },
});

export { SurrealInstance };
// export const SurrealInstance = new Surreal('http://localhost:80/rpc', {
//   ns: 'test',
//   db: 'test',
//   auth: {
//     user: 'root',
//     pass: 'root',
//   },
// });
