"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { AgentListing } from "@kingsvarmo/shared";

type Props = {
  agents: AgentListing[];
};

const FILTERS = ["all", "research", "classroom", "operations", "phytochemistry"] as const;

const DOMAIN_LABELS: Record<string, string> = {
  all: "All",
  research: "Research",
  classroom: "Classroom",
  operations: "Operations",
  phytochemistry: "Phytochemistry",
};

const DOMAIN_MARKS: Record<string, string> = {
  phytochemistry: "PX",
  genomics: "GX",
  materials: "MX",
  imaging: "IX",
  classroom: "CL",
  toxicology: "TX",
  "research-ops": "RO",
  default: "AI",
};

const DOMAIN_GROUPS: Record<string, (typeof FILTERS)[number]> = {
  phytochemistry: "research",
  genomics: "research",
  materials: "research",
  imaging: "research",
  toxicology: "research",
  "research-ops": "operations",
  classroom: "classroom",
};

const USE_CASES = [
  {
    title: "Research review",
    copy: "Run private methods on experimental files without exposing the agent logic.",
  },
  {
    title: "Classroom grading",
    copy: "Review anonymized class metrics for follow-up priorities and teaching interventions.",
  },
  {
    title: "Internal workflows",
    copy: "Package repeatable file checks, reviews and reports as paid or gated runs.",
  },
];

function formatRuntime(seconds: number) {
  if (seconds < 60) return `${seconds} sec`;
  return `${Math.round(seconds / 60)} min`;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
  }).format(new Date(value));
}

export function AgentsMarketplaceClient({ agents }: Props) {
  const [activeDomain, setActiveDomain] = useState<(typeof FILTERS)[number]>("all");
  const [query, setQuery] = useState("");

  const visibleAgents = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return agents.filter((agent) => {
      const agentGroup = DOMAIN_GROUPS[agent.domain] ?? agent.domain;
      const matchesDomain =
        activeDomain === "all" ||
        agent.domain === activeDomain ||
        agentGroup === activeDomain;
      const searchable = [
        agent.name,
        agent.creatorName,
        agent.description,
        agent.domain,
        agent.supportedFormats.join(" "),
      ]
        .join(" ")
        .toLowerCase();

      return matchesDomain && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [activeDomain, agents, query]);

  const publishedCount = agents.filter((agent) => agent.status === "published").length;
  const formatCount = new Set(agents.flatMap((agent) => agent.supportedFormats)).size;
  const lowestPrice = agents.reduce<number | null>((lowest, agent) => {
    const price = Number(agent.priceIn0G);
    if (Number.isNaN(price)) return lowest;
    return lowest === null ? price : Math.min(lowest, price);
  }, null);

  return (
    <main className="market-shell">
      <div className="market-bg-grid" />

      <section className="container market-hero">
        <div className="market-hero-copy">
          <p className="eyebrow">Marketplace</p>
          <h1>Private expert agents for paid file runs.</h1>
          <p>
            Find agents that accept a file, run a specialized workflow, and return
            an auditable result. The first demo agent is scientific, but the model
            works for classrooms, research teams and internal reviews.
          </p>
        </div>

        <div className="market-stats" aria-label="Marketplace summary">
          <div>
            <span>Published</span>
            <strong>{publishedCount}</strong>
          </div>
          <div>
            <span>File types</span>
            <strong>{formatCount}</strong>
          </div>
          <div>
            <span>From</span>
            <strong>{lowestPrice === null ? "--" : `${lowestPrice.toFixed(2)} OG`}</strong>
          </div>
        </div>
      </section>

      <section className="container market-toolbar" aria-label="Marketplace filters">
        <div className="market-filter-row">
          {FILTERS.map((domain) => (
            <button
              key={domain}
              type="button"
              className={`market-filter ${activeDomain === domain ? "active" : ""}`}
              onClick={() => setActiveDomain(domain)}
            >
              {DOMAIN_LABELS[domain]}
            </button>
          ))}
        </div>

        <label className="market-search">
          <span>Search</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Agent, creator, format..."
          />
        </label>
      </section>

      <section className="container market-layout">
        <aside className="market-side-panel" aria-label="Marketplace context">
          <div>
            <span className="market-panel-kicker">Execution path</span>
            <ol className="market-steps">
              <li>
                <strong>Choose agent</strong>
                <span>Review use case, file types and run price.</span>
              </li>
              <li>
                <strong>Upload file</strong>
                <span>Accepted inputs are checked before payment.</span>
              </li>
              <li>
                <strong>Get result</strong>
                <span>AXL modules coordinate the run and produce the report.</span>
              </li>
            </ol>
          </div>

          <div className="market-use-cases">
            <span className="market-panel-kicker">Use cases</span>
            {USE_CASES.map((useCase) => (
              <div key={useCase.title}>
                <strong>{useCase.title}</strong>
                <span>{useCase.copy}</span>
              </div>
            ))}
          </div>

          <Link href="/creator" className="btn btn-secondary w-full justify-center">
            Publish an agent
          </Link>
        </aside>

        <div className="market-results">
          <div className="market-results-top">
            <div>
              <span>{visibleAgents.length} result{visibleAgents.length === 1 ? "" : "s"}</span>
              <strong>{DOMAIN_LABELS[activeDomain]}</strong>
            </div>
          </div>

          {visibleAgents.length > 0 ? (
            <div className="market-grid">
              {visibleAgents.map((agent) => (
                <Link key={agent.id} href={`/agents/${agent.slug}`} className="market-card">
                  <div className="market-card-header">
                    <div className="market-agent-mark">
                      {DOMAIN_MARKS[agent.domain] ?? DOMAIN_MARKS.default}
                    </div>
                    <div>
                      <div className="market-card-badges">
                        <span className="badge badge-teal">{agent.status}</span>
                        {agent.intelligenceReference && (
                          <span className="badge badge-blue">0G indexed</span>
                        )}
                      </div>
                      <h2>{agent.name}</h2>
                      <p>by {agent.creatorName}</p>
                    </div>
                  </div>

                  <p className="market-description">{agent.description}</p>

                  <div className="market-preview">
                    <span>Example result</span>
                    <strong>{agent.previewOutput}</strong>
                  </div>

                  <div className="market-meta-grid">
                    <div>
                      <span>Price</span>
                      <strong>{agent.priceIn0G} OG</strong>
                    </div>
                    <div>
                      <span>Runtime</span>
                      <strong>{formatRuntime(agent.runtimeEstimateSeconds)}</strong>
                    </div>
                    <div>
                      <span>Published</span>
                      <strong>{formatDate(agent.createdAt)}</strong>
                    </div>
                  </div>

                  <div className="market-card-footer">
                    <div>
                      {agent.supportedFormats.map((format) => (
                        <span key={format}>.{format}</span>
                      ))}
                    </div>
                    <strong>Run agent -&gt;</strong>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="market-empty">
              <strong>No agents match this search.</strong>
              <span>Try another domain or remove the search terms.</span>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
