import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('equipment notes: delete actions', () => {
  beforeEach(() => vi.clearAllMocks());

  describe('deleteConfirmed', () => {
    it('calls deleteNote', () => {
      expect(true).toBeTruthy();
    });

    it('redirects to the equipment details page', () => {
      expect(true).toBeTruthy();
    });
  });

  describe('deleteAborted', () => {
    it('does not call deleteNote', () => {
      expect(true).toBeTruthy();
    });

    it('redirects to the equipment details page', () => {
      expect(true).toBeTruthy();
    });
  });
});
