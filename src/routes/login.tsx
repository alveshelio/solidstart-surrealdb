import { createServerAction$ } from 'solid-start/server';
import { FormData } from 'undici';
import { storeToken } from '~/lib/session.server';
import { SurrealInstance } from '~/lib/surrealdb';

export default function SignInPage() {
  const [signingIn, { Form }] = createServerAction$(
    async (form: FormData, { request }) => {
      const email = form.get('email') as string;
      const password = form.get('password') as string;
      try {
        const token = await SurrealInstance.signin({
          NS: 'liquiditly',
          DB: 'liquiditly',
          SC: 'user',
          user: email,
          pass: password,
        });

        if (token) {
          console.warn('token', token);
          await storeToken(request, token);
          // await createUserSession()
        }
      } catch (e) {
        console.log('error:', e);
      }
    }
  );

  return (
    <div>
      <h1>Sign In</h1>
      <Form>
        <label>
          Email:
          <input type="email" name="email" />
        </label>
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        <button type="submit" disabled={signingIn.pending}>
          Sign In
        </button>
      </Form>
    </div>
  );
}
