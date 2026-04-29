"use client";

import { useState } from "react";

export type Token = {
  text: string;
  color?: string;
};

export type CodeLine = Token[];

type Props = {
  lines: CodeLine[];
};

export function CodeBlock({ lines }: Props) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    const text = lines
      .map((line) => line.map((t) => t.text).join(""))
      .join("\n");

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="docs-code-block">
      <button
        className={`docs-copy-btn${copied ? " copied" : ""}`}
        onClick={handleCopy}
        aria-label="Copy code to clipboard"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
      <pre>
        {lines.map((line, i) => (
          <div key={i}>
            {line.length === 0 ? (
              "\n"
            ) : (
              line.map((token, j) =>
                token.color ? (
                  <span key={j} style={{ color: token.color }}>
                    {token.text}
                  </span>
                ) : (
                  <span key={j}>{token.text}</span>
                )
              )
            )}
          </div>
        ))}
      </pre>
    </div>
  );
}