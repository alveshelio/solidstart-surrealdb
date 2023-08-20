import { useRouteData } from 'solid-start';
import { For, createResource } from 'solid-js';
import { fetchStickies } from '~/services/stickies';

export function routeData() {
  const [stickies] = createResource(async () => await fetchStickies());

  return { stickies };
}

export default function Home() {
  const { stickies } = useRouteData<typeof routeData>();

  return (
    <div>
      <h1>Stickies</h1>
      <ul>
        <For each={stickies()}>
          {(sticky) => <li>Content: {sticky.content}</li>}
        </For>
      </ul>
    </div>
  );
}
