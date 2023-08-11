import { createMutation } from '@tanstack/solid-query';
import { AxiosError } from 'axios';
import { Sticky } from '~/models/sticky';
import { updateSticky, UpdateStickyInput } from '~/services/stickies';

export function useCreateSticky() {
  return createMutation<Sticky, AxiosError, UpdateStickyInput>(updateSticky);
}
