import { json } from 'solid-start/api';

import { db } from '~/lib/surrealdb';

export async function GET() {
  const stickies = await db.select('sticky');

  return json(stickies, 200);
}
