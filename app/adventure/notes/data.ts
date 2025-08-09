'use server';

import { Note, NoteDTO } from '@/models';
import { convertToNote, convertToNoteDTO } from '@/models/convert';
import { executeQuery } from '@/utils/data';
import { isNotLoggedIn } from '@/utils/supabase/auth';
import { createClient } from '@/utils/supabase/server';
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
  if (await isNotLoggedIn()) {
    return null;
  }

  const supabase = createClient();
  const query = noteQuery(supabase, id);
  const data = await executeQuery<NoteDTO>(query);
  return data ? convertToNote(data) : null;
};

export const addNote = async (note: Note): Promise<Note | null> => {
  if (await isNotLoggedIn()) {
    return null;
  }

  const supabase = createClient();
  const query = noteInsert(supabase, note);
  const data = await executeQuery<NoteDTO>(query);
  return data ? convertToNote(data) : null;
};

export const canDeleteNote = async (note: Note): Promise<boolean> => {
  if (await isNotLoggedIn()) {
    return false;
  }
  return true;
};

export const deleteNote = async (note: Note): Promise<void> => {
  if (await isNotLoggedIn()) {
    return;
  }

  const supabase = createClient();
  const query = noteDelete(supabase, note);
  await executeQuery<void>(query);
};

export const updateNote = async (note: Note): Promise<Note | null> => {
  if (await isNotLoggedIn()) {
    return null;
  }

  const supabase = createClient();
  const query = noteUpdate(supabase, note);
  const data = await executeQuery<NoteDTO>(query);
  return data ? convertToNote(data) : null;
};
