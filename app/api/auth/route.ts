import { NextResponse } from 'next/server';
import crypto from 'crypto';

// Decap CMS login, step 1: send the editor to GitHub.
// 302 only (a cached 301 breaks later fixes). SameSite=Lax so the cookie
// survives the top-level return trip from github.com.
export const dynamic = 'force-dynamic';

export function GET(req: Request) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  if (!clientId) return new NextResponse('GITHUB_CLIENT_ID is not set', { status: 500, headers: { 'Cache-Control': 'no-store' } });
  const origin = new URL(req.url).origin;
  const state = crypto.randomBytes(24).toString('hex');
  const gh = new URL('https://github.com/login/oauth/authorize');
  gh.searchParams.set('client_id', clientId);
  gh.searchParams.set('redirect_uri', `${origin}/api/callback`);
  gh.searchParams.set('scope', 'repo,user');
  gh.searchParams.set('state', state);
  const res = NextResponse.redirect(gh.toString(), 302);
  res.headers.set('Cache-Control', 'no-store');
  res.cookies.set('decap_oauth_state', state, { httpOnly: true, secure: true, sameSite: 'lax', path: '/api', maxAge: 600 });
  return res;
}
