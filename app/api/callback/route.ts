import { NextResponse } from 'next/server';
import crypto from 'crypto';

// Decap CMS login, step 2: trade the GitHub code for a token and hand it
// back to the /admin window with the postMessage handshake Decap expects.
export const dynamic = 'force-dynamic';

function page(status: 'success' | 'error', content: object) {
  const msg = `authorization:github:${status}:${JSON.stringify(content)}`;
  const html = `<!doctype html><html><body><script>
(function(){
  function receive(e){ window.opener.postMessage(${JSON.stringify(msg)}, e.origin); window.removeEventListener('message', receive, false); }
  window.addEventListener('message', receive, false);
  window.opener.postMessage('authorizing:github', '*');
})();
</script></body></html>`;
  const res = new NextResponse(html, { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } });
  res.cookies.set('decap_oauth_state', '', { path: '/api', maxAge: 0 });
  return res;
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state') || '';
  const cookie = req.headers.get('cookie')?.match(/(?:^|;\s*)decap_oauth_state=([^;]+)/)?.[1] || '';
  const ok = state.length > 0 && state.length === cookie.length && crypto.timingSafeEqual(Buffer.from(state), Buffer.from(cookie));
  if (!code || !ok) return page('error', { message: 'Login check failed. Close this window and try again.' });

  const r = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ client_id: process.env.GITHUB_CLIENT_ID, client_secret: process.env.GITHUB_CLIENT_SECRET, code, redirect_uri: `${url.origin}/api/callback` }),
  });
  const data = await r.json().catch(() => ({}));
  if (!data.access_token) return page('error', { message: data.error_description || 'GitHub did not return a token.' });
  return page('success', { token: data.access_token, provider: 'github' });
}
