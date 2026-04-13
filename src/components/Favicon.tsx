"use client";

import { useState } from "react";

export function Favicon({ src, alt = "" }: { src: string; alt?: string }) {
  const [hidden, setHidden] = useState(false);

  if (hidden) return null;

  return (
    <img
      src={src}
      alt={alt}
      className="w-4 h-4 rounded"
      onError={() => setHidden(true)}
    />
  );
}
