import { Note, NoteDTO } from '../note';

export const convertToNote = (dto: NoteDTO): Note => ({
  id: dto.id,
  name: dto.name,
  description: dto.description,
  equipmentRid: dto.equipment_rid,
  eventRid: dto.event_rid,
  placeRid: dto.place_rid,
});

export const convertToNoteDTO = (note: Note): NoteDTO => ({
  name: note.name.trim(),
  description: note.description?.trim() || null,
  equipment_rid: note.equipmentRid || null,
  event_rid: note.eventRid || null,
  place_rid: note.placeRid || null,
});
