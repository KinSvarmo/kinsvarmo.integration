"use client";

type Section = {
  id: string;
  title: string;
};

type Props = {
  sections: Section[];
};

export function MobileToc({ sections }: Props) {
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const id = e.target.value;
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <div className="docs-mobile-toc" aria-label="Jump to section">
      <select defaultValue="" onChange={handleChange}>
        <option value="" disabled>
          Jump to section…
        </option>
        {sections.map((s) => (
          <option key={s.id} value={s.id}>
            {s.title}
          </option>
        ))}
      </select>
    </div>
  );
}