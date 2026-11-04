'use client';
import { useState } from 'react';

// Vertical YouTube Short that loads only when tapped. The poster image is a
// local copy in public/images/videos/<id>.webp so nothing calls YouTube until play.
export default function ShortVideo({ id, title, size = 'card' }: { id: string; title: string; size?: 'hero' | 'card' }) {
  const [play, setPlay] = useState(false);
  return (
    <div className={`short short-${size}`}>
      {play ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`}
          title={title}
          allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button type="button" onClick={() => setPlay(true)} aria-label={`Play video: ${title}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/images/videos/${id}.webp`} alt="" width={360} height={640} loading={size === 'hero' ? 'eager' : 'lazy'} />
          <span className="play" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
          </span>
        </button>
      )}
    </div>
  );
}
