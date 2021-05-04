import React from 'react';

type Props = {
  parts: string[];
  searchWords: string[];
};

export default function TextMatchingFilter({ parts, searchWords }: Props) {
  return (
    <span>
      {parts.length > 0 &&
        parts.map((part, i) => {
          const isMatchingPart =
            searchWords.length > 0
              ? searchWords.indexOf(part.toLowerCase()) > -1
              : false;
          return (
            <span
              key={i}
              {...(isMatchingPart && { style: { backgroundColor: 'yellow' } })}
            >
              {part}
            </span>
          );
        })}
    </span>
  );
}
