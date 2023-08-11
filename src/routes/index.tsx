import { Switch, Match, For, createEffect } from 'solid-js';
import { useAllStickies } from '~/hooks/useAllStickies';

export default function Home() {
  const { query } = useAllStickies();

  createEffect(() => {
    console.log('data___', query);
  });

  return (
    <>
      <Switch>
        <Match when={query.isLoading}>Loading...</Match>
        <Match when={query.isError}>Error: {query.error?.message}</Match>
        <Match when={query.isSuccess}>
          <h1>Stickies</h1>
          <For each={query.data}>
            {(sticky) => <div>Content: {sticky.content}</div>}
          </For>
        </Match>
      </Switch>
    </>
  );
}
