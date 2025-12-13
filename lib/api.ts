// lib/api.ts
import axios from 'axios';
import type { Note, NoteTag } from '@/types/note';

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
  tag?: NoteTag; 
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: NoteTag;
}

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN as string | undefined;

if (!token) {
  if (process.env.NODE_ENV !== 'production') {
    throw new Error('Missing NEXT_PUBLIC_NOTEHUB_TOKEN env variable');
  } else {
    console.error('NEXT_PUBLIC_NOTEHUB_TOKEN is missing at build time');
  }
}

const api = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: token
    ? {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    : { 'Content-Type': 'application/json' },
});

export async function fetchNotes(
  params: FetchNotesParams
): Promise<FetchNotesResponse> {
  const { data } = await api.get<FetchNotesResponse>('/notes', { params });
  return data;
}

export async function createNote(
  payload: CreateNotePayload
): Promise<Note> {
  const { data } = await api.post<Note>('/notes', payload);
  return data;
}

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
}
