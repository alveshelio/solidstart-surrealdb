import axios, { AxiosResponse } from 'axios';
import { Sticky } from '~/models/sticky';

export const fetchStickies = async () => {
  const response = await axios.get<Sticky[]>('/api/stickies/all');

  console.warn('resolved', response.data);
  return response.data;
};

export type CreateStickyInput = {
  content: string;
};
export const createSticky = async (data: CreateStickyInput) => {
  const response = await axios.post<
    Sticky,
    AxiosResponse<Sticky>,
    CreateStickyInput
  >('/api/stickies/new', data);
  return response.data;
};

export type UpdateStickyInput = {
  id: string;
  content: string;
};
export const updateSticky = async ({ id, content }: UpdateStickyInput) => {
  const response = await axios.put<Sticky>(`/api/stickies/${id}`, { content });
  return response.data;
};

export type DeleteStickyOutput =
  | {
      success: true;
      error: null;
    }
  | {
      success: false;
      error: string;
    };

export const deleteSticky = async (id: string) => {
  const response = await axios.delete(`/api/stickies/${id}`);
  return response.data;
};
