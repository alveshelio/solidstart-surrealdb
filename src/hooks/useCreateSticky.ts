import { createMutation } from '@tanstack/solid-query';
import { AxiosError } from 'axios';
import { Sticky } from '~/models/sticky';
import { createSticky, CreateStickyInput } from '~/services/stickies';

export function useCreateSticky() {
  return createMutation<Sticky, AxiosError, CreateStickyInput>(createSticky);
}
