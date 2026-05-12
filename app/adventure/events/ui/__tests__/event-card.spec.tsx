import { cleanup } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('Event Card', () => {
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => cleanup());

  it('is a placeholder', () => {
    expect(true).toBe(true);
  });
});
