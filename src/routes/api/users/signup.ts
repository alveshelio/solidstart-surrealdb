import { APIEvent, json } from 'solid-start/api';
import { SurrealInstance } from '~/lib/surrealdb';

export async function POST({ request }: APIEvent) {
  const body = await new Response(request.body).json();
  console.warn('POST', body);

  if (!body) {
    return json({ error: 'No body' }, 400);
  }

  try {
    const token = await SurrealInstance.signup({
      NS: 'liquiditly',
      DB: 'liquiditly',
      SC: 'user',
      name: body.name,
      user: body.email,
      pass: body.password,
    });

    return json({ token }, 2000);
  } catch (e) {
    console.warn('error___', e);
    return json({ error: e.message }, 400);
  }

  return json({ success: true }, 200);
}
