import { createMutation } from '@tanstack/solid-query';
import { AxiosError } from 'axios';
import { deleteSticky, DeleteStickyOutput } from '~/services/stickies';

export function useDeleteSticky() {
  return createMutation<DeleteStickyOutput, AxiosError, string>(deleteSticky);
}
