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

    const onPointer = (e: Event) => {
      const target = e.target as Element | null;
      const inside = target?.closest('.site-header details') ?? null;
      // Following a link keeps the header mounted, so close the menu it sat in too.
      closeAll(inside && target?.closest('a') ? null : inside);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      const open = menus().find((d) => d.open);
      if (!open) return;
      closeAll();
      open.querySelector('summary')?.focus();
    };

    document.addEventListener('click', onPointer);
    document.addEventListener('focusin', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onPointer);
      document.removeEventListener('focusin', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  return null;
}
