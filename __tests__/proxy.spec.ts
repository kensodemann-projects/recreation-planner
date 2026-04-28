import { NextRequest, NextResponse } from 'next/server';
import { afterEach, beforeEach, describe, expect, it, vi, type Mock } from 'vitest';

vi.mock('@/utils/supabase/proxy');

import { updateSession } from '@/utils/supabase/proxy';
import { proxy } from '../proxy';

describe('proxy', () => {
  let mockGetUser: Mock;
  let mockResponse: NextResponse;

  beforeEach(() => {
    mockGetUser = vi.fn();
    mockResponse = NextResponse.next();
    vi.mocked(updateSession).mockResolvedValue({
      response: mockResponse,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      supabase: { auth: { getUser: mockGetUser } } as any,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('for a non-adventure path', () => {
    it('returns the response from updateSession', async () => {
      const request = new NextRequest('http://localhost/');
      expect(await proxy(request)).toBe(mockResponse);
    });
  });

  describe('for an adventure path', () => {
    describe('when the user is authenticated', () => {
      beforeEach(() => {
        mockGetUser.mockResolvedValue({ data: { user: { id: 'user-123' } } });
      });

      it('returns the response from updateSession for /adventure', async () => {
        const request = new NextRequest('http://localhost/adventure');
        expect(await proxy(request)).toBe(mockResponse);
      });

      it('returns the response from updateSession for /adventure/places', async () => {
        const request = new NextRequest('http://localhost/adventure/places');
        expect(await proxy(request)).toBe(mockResponse);
      });
    });

    describe('when the user is not authenticated', () => {
      beforeEach(() => {
        mockGetUser.mockResolvedValue({ data: { user: null } });
      });

      it('redirects to /login for /adventure', async () => {
        const request = new NextRequest('http://localhost/adventure');
        const result = await proxy(request);
        expect(result.headers.get('location')).toBe('http://localhost/login');
      });

      it('redirects to /login for /adventure/places', async () => {
        const request = new NextRequest('http://localhost/adventure/places');
        const result = await proxy(request);
        expect(result.headers.get('location')).toBe('http://localhost/login');
      });

      it('includes cookies from the updateSession response in the redirect', async () => {
        mockResponse.cookies.set('sb-token', 'test-value');
        const request = new NextRequest('http://localhost/adventure');
        const result = await proxy(request);
        expect(result.cookies.get('sb-token')?.value).toBe('test-value');
      });
    });
  });
});
