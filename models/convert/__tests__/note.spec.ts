import { Note, NoteDTO } from '@/models/note';
import { describe, expect, it } from 'vitest';
import { convertToNote, convertToNoteDTO } from '../note';

describe('note converters', () => {
  describe('to Note', () => {
    const testCases: { name: string; value: NoteDTO; expected: Note }[] = [
      {
        name: 'converts an equipment note',
        value: {
          id: 42,
          name: 'Do the needful',
          description: 'The needful was not really that needed',
          equipment_rid: 3,
          event_rid: null,
          place_rid: null,
        },
        expected: {
          id: 42,
          name: 'Do the needful',
          description: 'The needful was not really that needed',
          eventRid: null,
          placeRid: null,
          equipmentRid: 3,
        },
      },
      {
        name: 'converts an event note',
        value: {
          id: 42,
          name: 'Do the needful',
          description: 'The needful was not really that needed',
          equipment_rid: null,
          event_rid: 321,
          place_rid: null,
        },
        expected: {
          id: 42,
          name: 'Do the needful',
          description: 'The needful was not really that needed',
          eventRid: 321,
          placeRid: null,
          equipmentRid: null,
        },
      },
      {
        name: 'converts a place note',
        value: {
          id: 42,
          name: 'Do the needful',
          description: 'The needful was not really that needed',
          equipment_rid: null,
          event_rid: null,
          place_rid: 73,
        },
        expected: {
          id: 42,
          name: 'Do the needful',
          description: 'The needful was not really that needed',
          eventRid: null,
          placeRid: 73,
          equipmentRid: null,
        },
      },
    ];

    it.each(testCases)('$name', ({ value, expected }) => expect(convertToNote(value)).toEqual(expected));
  });

  describe('to Note DTO', () => {
    const testCases: { name: string; value: Note; expected: NoteDTO }[] = [
      {
        name: 'converts an equipment note for update',
        value: {
          id: 42,
          name: 'Do the needful',
          description: 'The needful was not really that needed',
          eventRid: null,
          placeRid: null,
          equipmentRid: 3,
        },
        expected: {
          name: 'Do the needful',
          description: 'The needful was not really that needed',
          equipment_rid: 3,
          event_rid: null,
          place_rid: null,
        },
      },
      {
        name: 'converts an event note for update',
        value: {
          id: 42,
          name: 'Do the needful',
          description: 'The needful was not really that needed',
          eventRid: 314,
          placeRid: null,
          equipmentRid: null,
        },
        expected: {
          name: 'Do the needful',
          description: 'The needful was not really that needed',
          equipment_rid: null,
          event_rid: 314,
          place_rid: null,
        },
      },
      {
        name: 'converts a place note for update',
        value: {
          id: 42,
          name: 'Do the needful',
          description: 'The needful was not really that needed',
          eventRid: null,
          placeRid: 783,
          equipmentRid: null,
        },
        expected: {
          name: 'Do the needful',
          description: 'The needful was not really that needed',
          equipment_rid: null,
          event_rid: null,
          place_rid: 783,
        },
      },
      {
        name: 'converts an equipment note for create',
        value: {
          name: 'Do the needful',
          description: 'The needful was not really that needed',
          equipmentRid: 3,
        },
        expected: {
          name: 'Do the needful',
          description: 'The needful was not really that needed',
          equipment_rid: 3,
          event_rid: null,
          place_rid: null,
        },
      },
      {
        name: 'converts an event note for create',
        value: {
          name: 'Do the needful',
          description: 'The needful was not really that needed',
          eventRid: 314,
        },
        expected: {
          name: 'Do the needful',
          description: 'The needful was not really that needed',
          equipment_rid: null,
          event_rid: 314,
          place_rid: null,
        },
      },
      {
        name: 'converts a place note for create',
        value: {
          name: 'Do the needful',
          description: 'The needful was not really that needed',
          placeRid: 783,
        },
        expected: {
          name: 'Do the needful',
          description: 'The needful was not really that needed',
          equipment_rid: null,
          event_rid: null,
          place_rid: 783,
        },
      },
      {
        name: 'converts a empty description to null',
        value: {
          id: 42,
          name: 'Do the needful',
          description: '     ',
          eventRid: null,
          placeRid: 783,
          equipmentRid: null,
        },
        expected: {
          name: 'Do the needful',
          description: null,
          equipment_rid: null,
          event_rid: null,
          place_rid: 783,
        },
      },
      {
        name: 'trims the string fields',
        value: {
          id: 42,
          name: ' Do the needful  ',
          description: '   The needful was not all that full of need.     ',
          eventRid: null,
          placeRid: 783,
          equipmentRid: null,
        },
        expected: {
          name: 'Do the needful',
          description: 'The needful was not all that full of need.',
          equipment_rid: null,
          event_rid: null,
          place_rid: 783,
        },
      },
    ];

    it.each(testCases)('$name', ({ value, expected }) => expect(convertToNoteDTO(value)).toEqual(expected));
  });
});
