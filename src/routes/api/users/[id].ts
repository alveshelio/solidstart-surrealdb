import { APIEvent, json } from 'solid-start/api';
import { SurrealInstance } from '~/lib/surrealdb';
import { User } from '~/models/user';

export async function GET({ params }: APIEvent) {
  const { id } = params;

  if (!id) {
    return json({ error: 'Id is missing' }, 400);
  }

  const user = await SurrealInstance.select<User>(id);

  if (!user.length) {
    return json({ message: 'User not found' }, 404);
  }

  return json({ user: user[0] }, 200);
}
