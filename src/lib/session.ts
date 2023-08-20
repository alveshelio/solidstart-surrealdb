import { createCookieSessionStorage } from 'solid-start';
import { fetchUser } from '~/services/user';

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

export async function getUser(request: Request) {
  const cookie = request.headers.get('Cookie') ?? '';
  const session = await storage.getSession(cookie);
  const userId = session.get('userId');

  if (!userId) {
    return null;
  }

  return await fetchUser(userId);
}
