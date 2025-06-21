import { describe, expect, it } from 'vitest';
import { convertToEquipment, convertToEquipmentDTO } from '../equipment';

describe('equipment convertions', () => {
  describe('to equipment', () => {
    it('handles a "common data" conversion', () => {
      expect(
        convertToEquipment({
          id: 42,
          name: 'Planet Destroyer',
          description: 'The Vogons should destroy the Earth using this.',
        }),
      ).toEqual({
        id: 42,
        name: 'Planet Destroyer',
        description: 'The Vogons should destroy the Earth using this.',
      });
    });

    it('converts a full equipment', () => {
      expect(
        convertToEquipment({
          id: 42,
          name: 'Planet Destroyer',
          description: 'The Vogons should destroy the Earth using this.',
          purchase_date: '2025-03-28',
          cost: 2954932.34,
        }),
      ).toEqual({
        id: 42,
        name: 'Planet Destroyer',
        description: 'The Vogons should destroy the Earth using this.',
        purchaseDate: '2025-03-28',
        cost: 2954932.34,
      });
    });
  });

  describe('to DTO', () => {
    it('converts a full Equipment for CRUD', () => {
      expect(
        convertToEquipmentDTO({
          id: 42,
          name: 'Planet Destroyer',
          description: 'The Vogons should destroy the Earth using this.',
          purchaseDate: '2025-03-28',
          cost: 2954932.34,
        }),
      ).toEqual({
        name: 'Planet Destroyer',
        description: 'The Vogons should destroy the Earth using this.',
        purchase_date: '2025-03-28',
        cost: 2954932.34,
      });
    });

    it('sets unspecified values to null', () => {
      expect(
        convertToEquipmentDTO({
          id: 42,
          name: 'Planet Destroyer',
          description: '',
          purchaseDate: '',
          cost: null,
        }),
      ).toEqual({
        name: 'Planet Destroyer',
        description: null,
        purchase_date: null,
        cost: null,
      });
    });
  });
});
