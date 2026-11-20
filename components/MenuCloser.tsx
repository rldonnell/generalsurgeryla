'use client';

import { useEffect } from 'react';

// The header menus are native <details> elements, which only close when their
// own summary is clicked. This closes them on an outside click, on Escape, when
// a link inside is followed, and when another menu opens.
export default function MenuCloser() {
  useEffect(() => {
    const menus = () =>
      Array.from(document.querySelectorAll<HTMLDetailsElement>('.site-header details'));
    const closeAll = (keep?: Element | null) =>
      menus().forEach((d) => {
        if (d !== keep) d.open = false;
      });

    const menuOf = (e: Event) =>
      (e.target as Element | null)?.closest('.site-header details') ?? null;

    // Focus moving elsewhere (tabbing, or the mousedown of a click) closes the
    // other menus only. It must never close the menu being used: a mouse press
    // on a menu link fires focusin before click, and hiding the link at that
    // point swallows the click.
    const onFocus = (e: Event) => closeAll(menuOf(e));
    const onClick = (e: Event) => {
      const inside = menuOf(e);
      // Following a link keeps the header mounted, so close the menu it sat in too.
      const followedLink = inside && (e.target as Element).closest('a');
      closeAll(followedLink ? null : inside);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      const open = menus().find((d) => d.open);
      if (!open) return;
      closeAll();
      open.querySelector('summary')?.focus();
    };

    document.addEventListener('click', onClick);
    document.addEventListener('focusin', onFocus);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('focusin', onFocus);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  return null;
}
