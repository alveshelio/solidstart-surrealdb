import { APIEvent, json } from 'solid-start/api';

import { SurrealInstance } from '~/lib/surrealdb';
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

  const existingSticky = await SurrealInstance.select<Sticky>(id);

  if (!existingSticky.length) {
    return json({ message: 'Sticky not found' }, 404);
  }

  const response = await SurrealInstance.change<Sticky>(id, {
    ...existingSticky[0],
    updatedAt: new Date(),
    content: body.content,
  });

  return json({ sticky: response }, 200);
}

export async function DELETE({ params }: APIEvent) {
  const { id } = params;

  if (!id) {
    return new Response('Id is missing', { status: 400 });
  }

  const existingSticky = await SurrealInstance.select<Sticky>(id);

  if (!existingSticky.length) {
    return json({ message: 'Sticky not found' }, 404);
  }

  try {
    await SurrealInstance.delete(id);
    return json({ success: true, error: null }, 200);
  } catch (error) {
    return json({ success: false, error: 'Failed to delete' }, 500);
  }
}
