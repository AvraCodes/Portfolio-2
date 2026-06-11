"use client";

import React from "react";

interface SplitTextProps {
  text: string;
  className?: string;
  wordClassName?: string;
  charClassName?: string;
}

export function SplitText({ text, className = "", wordClassName = "", charClassName = "" }: SplitTextProps) {
  const words = text.split(" ");

  return (
    <span className={`inline-block ${className}`} aria-label={text}>
      {words.map((word, wordIndex) => (
        <span
          key={wordIndex}
          className={`inline-block whitespace-nowrap overflow-hidden ${wordClassName}`}
          aria-hidden="true"
        >
          {word.split("").map((char, charIndex) => (
            <span
              key={charIndex}
              className={`char inline-block ${charClassName}`}
            >
              {char}
            </span>
          ))}
          {/* Add a space after each word except the last one */}
          {wordIndex < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </span>
  );
}
