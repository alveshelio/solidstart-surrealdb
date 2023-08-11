import {
  createQuery,
  MutationObserverErrorResult,
} from '@tanstack/solid-query';
import { AxiosError } from 'axios';
import { Sticky } from '~/models/sticky';
import { fetchStickies } from '~/services/stickies';

export function useAllStickies() {
  const key = () => ['stickies'];
  type Key = typeof key;
  const query = createQuery<
    Sticky[],
    AxiosError<MutationObserverErrorResult, Sticky[]>,
    Sticky[],
    Key
  >(key, fetchStickies);

  return { key, query };
}
