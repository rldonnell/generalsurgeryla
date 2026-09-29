'use client';
import { useState } from 'react';

export default function Video({ id, title }: { id: string; title: string }) {
  const [play, setPlay] = useState(false);
  return (
    <figure className="video" style={{ margin: 0 }}>
      {play ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button type="button" onClick={() => setPlay(true)} aria-label={`Play video: ${title}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" width={480} height={360} />
        </button>
      )}
      <p>{title}</p>
    </figure>
  );
}
