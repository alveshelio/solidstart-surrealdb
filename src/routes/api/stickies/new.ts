import { APIEvent, json } from 'solid-start/api';

import { SurrealInstance } from '~/lib/surrealdb';

export async function POST({ request }: APIEvent) {
  const body = await new Response(request.body).json();
  console.warn('POST', body);

  if (!body) {
    return json({ error: 'No body' }, 400);
  }

  if (!body.content) {
    return json({ error: 'No content' }, 400);
  }

  const now = new Date();

  const response = await SurrealInstance.create('sticky', {
    content: body.content,
    createdAt: now,
    updatedAt: now,
  });

  return json({ success: true, sticky: response }, 200);
}
