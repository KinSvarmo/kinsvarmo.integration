"use client";

import { useEffect, useState } from "react";

type Section = {
  id: string;
  title: string;
};

type Props = {
  sections: Section[];
};

export function DocsSidebarNav({ sections }: Props) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "");

  useEffect(() => {
    const elements = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        const first = visible[0];
        if (first?.target.id) {
          setActiveId(first.target.id);
        }
      },
      {
        root: null,
        rootMargin: "-15% 0px -65% 0px",
        threshold: 0,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveId(id);
    window.history.replaceState(null, "", `#${id}`);
  }

  return (
    <nav aria-label="Table of contents" style={{ top: 96 }}>
      <p
        style={{
          fontSize: "0.7rem",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--text-3)",
          marginBottom: 10,
          paddingLeft: 10,
        }}
      >
        On this page
      </p>

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {sections.map((s) => {
          const isActive = s.id === activeId;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={isActive ? "true" : undefined}
                onClick={(e) => handleClick(e, s.id)}
                style={{
                  display: "block",
                  padding: "6px 10px",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "0.85rem",
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? "var(--teal)" : "var(--text-2)",
                  background: isActive ? "var(--teal-dim)" : "transparent",
                  borderLeft: isActive
                    ? "2px solid var(--teal)"
                    : "2px solid transparent",
                  transition: "color 0.15s, background 0.15s, border-color 0.15s",
                  textDecoration: "none",
                }}
              >
                {s.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}