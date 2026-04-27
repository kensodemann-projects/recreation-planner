import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/utils/supabase/proxy';
import { createClient } from './utils/supabase/server';

export async function proxy(request: NextRequest) {
  const res = await updateSession(request);

  if (request.nextUrl.pathname.startsWith('/adventure/')) {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
