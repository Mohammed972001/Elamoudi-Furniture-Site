'use client';

import Image from 'next/image';
import { useState } from 'react';
import { FaPlay } from 'react-icons/fa';

interface VideoCardProps {
  file: string;
  title: string;
}

/**
 * A square poster with a play button. The video itself loads only after the tap, so a page with
 * several videos costs a few small JPEGs until someone chooses to watch.
 */
export default function VideoCard({ file, title }: VideoCardProps) {
  const [playing, setPlaying] = useState(false);
  const poster = `/furniture/${file}.jpg`;

  return (
    <figure className="overflow-hidden rounded-lg bg-white shadow-md">
      <div className="relative aspect-square bg-black">
        {playing ? (
          <video
            src={`/furniture/${file}.mp4`}
            poster={poster}
            controls
            autoPlay
            muted
            playsInline
            className="h-full w-full object-contain"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`تشغيل فيديو ${title}`}
            className="group absolute inset-0"
          >
            <Image src={poster} alt={title} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
            <span className="absolute inset-0 flex items-center justify-center bg-black/15 transition-colors group-hover:bg-black/30">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow-lg">
                <FaPlay className="h-5 w-5 translate-x-0.5" />
              </span>
            </span>
          </button>
        )}
      </div>
      <figcaption className="p-3 text-sm font-medium text-gray-800">{title}</figcaption>
    </figure>
  );
}
