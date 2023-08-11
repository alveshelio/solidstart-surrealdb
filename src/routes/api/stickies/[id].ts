import { APIEvent, json } from 'solid-start/api';

import { db } from '~/lib/surrealdb';
import { Sticky } from '~/models/sticky';

export async function PUT({ request, params }: APIEvent) {
  const { id } = params;
  const body = await new Response(request.body).json();

  if (!id) {
    return json({ error: 'Id is missing' }, 400);
  }

  if (!body?.content) {
    return json({ error: 'Content is missing' }, 400);
  }

  const existingSticky = await db.select<Sticky>(id);

  if (!existingSticky.length) {
    return json({ message: 'Sticky not found' }, 404);
  }

  const response = await db.merge(id, {
    updatedAt: new Date(),
    content: body.content,
  });

  return json({ sticky: response[0] }, 200);
}

export async function DELETE({ params }: APIEvent) {
  const { id } = params;

  if (!id) {
    return new Response('Id is missing', { status: 400 });
  }

  const existingSticky = await db.select<Sticky>(id);

  if (!existingSticky.length) {
    return json({ message: 'Sticky not found' }, 404);
  }

  const result = await db.delete(id);

  return result.length
    ? json({ success: true, error: null }, 200)
    : json({ success: false, error: 'Failed to delete' }, 500);
}
