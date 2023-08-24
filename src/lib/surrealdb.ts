// import AwaitedSurreal from '@theopensource-company/awaited-surrealdb';
import { getToken } from '~/lib/session.server';
import { Surreal } from 'surrealdb.js';

// const SurrealInstance = new AwaitedSurreal({
//   endpoint: 'http://localhost:8000',
//   namespace: 'liquiditly',
//   database: 'liquiditly',
//   token: async function () {
//     // Retrieve token from local storage for example
//     console.warn('retrieve token');
//     try {
//       return await getToken();
//     } catch (e) {
//       console.warn('error', e);
//       return;
//     }
//   },
// });

// export { SurrealInstance };
export const SurrealInstance = new Surreal('ws://localhost:8000/rpc', {
  ns: 'liquiditly',
  db: 'liquiditly',
  auth: {
    user: 'root',
    pass: 'root',
  },
});
