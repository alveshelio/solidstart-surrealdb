import { json } from 'solid-start/api';

import { SurrealInstance } from '~/lib/surrealdb';
import { Sticky } from '~/models/sticky';

export async function GET() {
  const stickies = await SurrealInstance.select<Sticky>('sticky');

  return json(stickies, 200);
}
