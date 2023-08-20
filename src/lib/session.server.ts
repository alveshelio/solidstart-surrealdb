import { redirect } from 'solid-start/server';
import { createCookieSessionStorage } from 'solid-start/session';

import { SurrealInstance } from '~/lib/surrealdb';
import { User } from '~/models/user';
import { fetchUser } from '~/services/user';

export async function login({
  email: password,
}: {
  email: string;
  password: string;
}) {
  const raw = await SurrealInstance.opiniatedQuery<User>(
    `SELECT * FROM user WHERE email = '${email}' AND password = '${password}'`
  );

  if (!raw?.[0].result) {
    return;
  }

  return raw[0].result;
}

const storage = createCookieSessionStorage({
  cookie: {
    name: 'session',
    secure: process.env.NODE_ENV === 'production',
    secrets: [process.env.SESSION_SECRET as string],
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 days
    httpOnly: process.env.NODE_ENV === 'production',
  },
});

export function getUserSession(request: Request) {
  return storage.getSession(request.headers.get('Cookie'));
}
export async function getUserId(request: Request) {
  const session = await getUserSession(request);
  const userId: User['id'] | undefined = session.get('userId');

  if (!userId) {
    return null;
  }

  return userId satisfies User['id'];
}
export async function requireUserId(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  const session = await getUserSession(request);
  const userId = session.get('userId');
  if (!userId || typeof userId !== 'string') {
    const searchParams = new URLSearchParams([['redirectTo', redirectTo]]);
    throw redirect(`/login?${searchParams}`);
  }
  return userId;
}

export async function getUser(request: Request) {
  const userId = await getUserId(request);
  if (typeof userId !== 'string') {
    return null;
  }
  try {
    return await fetchUser(userId);
  } catch {
    throw logout(request);
  }
}
export async function logout(request: Request) {
  await SurrealInstance.invalidate();
  const session = await storage.getSession(request.headers.get('Cookie'));
  return redirect('/login', {
    headers: {
      'Set-Cookie': await storage.destroySession(session),
    },
  });
}
export async function createUserSession(
  request: Request,
  userId: string,
  redirectTo: string
) {
  const session = await getUserSession(request);
  session.set('userId', userId);
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await storage.commitSession(session),
    },
  });
}

export async function storeToken(request: Request, token: string) {
  const session = await getUserSession(request);
  session.set('token', token);
  return redirect('/', {
    headers: {
      'Set-Cookie': await storage.commitSession(session),
    },
  });
}

export async function getToken() {
  const session = await storage.getSession();
  const token = session.get('token');

  console.warn('token in getToken', token);
  if (!token) {
    return null;
  }

  return token;
}
