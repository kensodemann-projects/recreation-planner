/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { Note, NoteDTO } from '@/models';
import { convertToNote, convertToNoteDTO } from '@/models/convert';
import { executeQuery } from '@/utils/data';
import { withAuth } from '@/utils/supabase/auth';
import { SupabaseClient } from '@supabase/supabase-js';

const selectColumns = '*';
const notesTable = 'notes';

const noteQuery = (supabase: SupabaseClient, id: number): any => {
  return supabase.from(notesTable).select(selectColumns).eq('id', id).single();
};

const noteInsert = (supabase: SupabaseClient, note: Note): any => {
  return supabase.from(notesTable).insert(convertToNoteDTO(note)).select(selectColumns).single();
};

const noteUpdate = (supabase: SupabaseClient, note: Note): any => {
  return supabase.from(notesTable).update(convertToNoteDTO(note)).eq('id', note.id).select(selectColumns).single();
};

const noteDelete = (supabase: SupabaseClient, note: Note): any => {
  return supabase.from(notesTable).delete().eq('id', note.id);
};

export const fetchNote = async (id: number): Promise<Note | null> => {
  const { success, data } = await withAuth((supabase: SupabaseClient) =>
    executeQuery<NoteDTO>(noteQuery(supabase, id)),
  );
  return success ? convertToNote(data) : null;
};

export const addNote = async (note: Note): Promise<Note | null> => {
  const { success, data } = await withAuth((supabase: SupabaseClient) =>
    executeQuery<NoteDTO>(noteInsert(supabase, note)),
  );
  return success ? convertToNote(data) : null;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const canDeleteNote = async (note: Note): Promise<boolean> => {
  const { success } = await withAuth(async () => ({ success: true, data: true }));
  return success;
};

export const deleteNote = async (note: Note): Promise<void> => {
  await withAuth((supabase: SupabaseClient) => executeQuery<void>(noteDelete(supabase, note)));
};

export const updateNote = async (note: Note): Promise<Note | null> => {
  const { success, data } = await withAuth((supabase: SupabaseClient) =>
    executeQuery<NoteDTO>(noteUpdate(supabase, note)),
  );
  return success ? convertToNote(data) : null;
};
