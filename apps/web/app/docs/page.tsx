import Link from "next/link";
import { DocsSidebarNav } from "./DocsSidebarNav";
import { CodeBlock, type CodeLine } from "./CodeBlock";
import { MobileToc } from "./MobileToc";
import "./docs.css";

export const metadata = {
  title: "Docs — KinSvarmo",
  description:
    "Technical documentation for the KinSvarmo scientific iNFT marketplace.",
};

/* ─── Data ────────────────────────────────────────────────────────────────── */

const CONTRACT_ADDRESSES: Record<string, string> = {
  INFTRegistry:               "0x0000000000000000000000000000000000000000",
  AnalysisEscrow:             "0x0000000000000000000000000000000000000000",
  UsageAuthorizationManager:  "0x0000000000000000000000000000000000000000",
};

const ARCH_LINES: CodeLine[] = [
  [{ text: "apps/web",    color: "var(--teal)" }, { text: "        Next.js 15 frontend" }],
  [{ text: "apps/api",    color: "var(--teal)" }, { text: "        Fastify 5 API service" }],
  [{ text: "packages/",   color: "var(--text-3)" }],
  [{ text: "  " }, { text: "shared",     color: "#a78bfa" }, { text: "        Domain types, schemas, seeded data" }],
  [{ text: "  " }, { text: "agents",     color: "#a78bfa" }, { text: "        Planner / Analyzer / Critic / Reporter" }],
  [{ text: "  " }, { text: "axl-client", color: "#a78bfa" }, { text: "    Gensyn AXL HTTP + in-memory client" }],
  [{ text: "  " }, { text: "zero-g",     color: "#a78bfa" }, { text: "        0G Storage upload/download + AES-256-GCM" }],
  [{ text: "  " }, { text: "keeperhub",  color: "#a78bfa" }, { text: "     KeeperHub execution client (interface)" }],
  [{ text: "  " }, { text: "contracts",  color: "#a78bfa" }, { text: "     ERC-7857 iNFT registry + AnalysisEscrow ABIs" }],
];

const SETUP_LINES: CodeLine[] = [
  [{ text: "# install dependencies", color: "var(--text-3)" }],
  [{ text: "pnpm", color: "var(--teal)" }, { text: " install" }],
  [],
  [{ text: "# start web + api", color: "var(--text-3)" }],
  [{ text: "pnpm", color: "var(--teal)" }, { text: " dev" }],
  [],
  [{ text: "# run AXL demo (3 terminals)", color: "var(--text-3)" }],
  [{ text: "pnpm", color: "var(--teal)" }, { text: " axl:nodes" }],
  [{ text: "pnpm", color: "var(--teal)" }, { text: " axl:workers" }],
  [{ text: "pnpm", color: "var(--teal)" }, { text: " axl:demo" }],
  [],
  [{ text: "# tests", color: "var(--text-3)" }],
  [{ text: "pnpm", color: "var(--teal)" }, { text: " test && " }, { text: "pnpm", color: "var(--teal)" }, { text: " typecheck" }],
];

const API_ROUTES = [
  { method: "GET",  path: "/health",                desc: "AXL node health check" },
  { method: "GET",  path: "/api/agents",            desc: "List all agents" },
  { method: "GET",  path: "/api/agents/:id",        desc: "Get agent by ID or slug" },
  { method: "POST", path: "/api/jobs",              desc: "Create analysis job" },
  { method: "POST", path: "/api/jobs/:id/start",    desc: "Launch AXL workflow" },
  { method: "GET",  path: "/api/jobs/:id",          desc: "Get job state" },
  { method: "GET",  path: "/api/jobs/:id/messages", desc: "AXL message history" },
  { method: "GET",  path: "/api/jobs/:id/result",   desc: "Final analysis result" },
] as const;

const JOB_STATES = [
  "created", "planning", "analyzing", "reviewing", "reporting", "completed",
];

const CONTRACTS = [
  {
    name: "INFTRegistry",
    desc: "ERC-7857 — mint agents, store encrypted URI, transfer ownership.",
  },
  {
    name: "AnalysisEscrow",
    desc: "Hold user payment per run; release to researcher on report delivery.",
  },
  {
    name: "UsageAuthorizationManager",
    desc: "TEE-gated execution rights — verify the caller is an authorized module.",
  },
];

/* ─── Sub-components ──────────────────────────────────────────────────────── */

function ApiPath({ path }: { path: string }) {
  const segments = path.split("/");
  return (
    <span className="docs-api-path">
      {segments.map((seg, i) => (
        <span key={i}>
          {i > 0 && "/"}
          {seg.startsWith(":") ? (
            <span className="docs-api-param">{seg}</span>
          ) : (
            seg
          )}
        </span>
      ))}
    </span>
  );
}

/* ─── Sections ────────────────────────────────────────────────────────────── */

const sections = [
  {
    id: "overview",
    title: "Overview",
    content: (
      <div className="docs-content">
        <p>
          KinSvarmo is a decentralized marketplace where researchers publish
          private scientific analysis agents as encrypted iNFTs on the 0G
          blockchain, and users run auditable workflows on their own datasets.
        </p>
        <p>
          The platform combines three sponsor technologies to deliver
          end-to-end scientific compute with full provenance:
        </p>
        <ul>
          <li>
            <strong style={{ color: "var(--teal)" }}>0G Network</strong> —
            encrypted blob storage and EVM-compatible chain for iNFT ownership.
          </li>
          <li>
            <strong style={{ color: "#a78bfa" }}>Gensyn AXL</strong> —
            peer-to-peer message routing between the four analysis modules.
          </li>
          <li>
            <strong style={{ color: "#93c5fd" }}>KeeperHub</strong> —
            workflow orchestration, retry logic, and execution guarantees.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "architecture",
    title: "Architecture",
    content: (
      <div className="docs-content">
        <p>
          The system is a pnpm monorepo with two applications and six shared
          packages:
        </p>
        <CodeBlock lines={ARCH_LINES} />
      </div>
    ),
  },
  {
    id: "execution-flow",
    title: "Execution flow",
    content: (
      <div className="docs-content">
        <p>
          When a user launches an analysis run, the following sequence executes:
        </p>
        <ol>
          <li>Frontend uploads the dataset to 0G Storage (AES-256-GCM encrypted).</li>
          <li>Frontend calls <code>POST /api/jobs</code> — API creates a job record.</li>
          <li>
            Frontend calls <code>POST /api/jobs/:id/start</code> — API sends{" "}
            <code>job.created</code> over AXL to the Planner.
          </li>
          <li><strong>Planner</strong> validates the request, builds an execution plan, sends <code>plan.generated</code>.</li>
          <li><strong>Analyzer</strong> runs the analysis, sends <code>analysis.completed</code>.</li>
          <li><strong>Critic</strong> reviews findings and assigns a confidence score, sends <code>critic.reviewed</code>.</li>
          <li><strong>Reporter</strong> packages the final structured report, sends <code>report.generated</code>.</li>
          <li>API stores the result; frontend polls every 2 s and displays live progress.</li>
        </ol>
        <div className="docs-flow-diagram" aria-label="Execution flow diagram">
          <div className="docs-flow-row">
            <span className="docs-flow-event">job.created</span>
            <span className="docs-flow-agent">→ [Planner]</span>
            <span className="docs-flow-result">→ plan.generated</span>
          </div>
          <div className="docs-flow-row">
            <span />
            <span className="docs-flow-agent">→ [Analyzer]</span>
            <span className="docs-flow-result">→ analysis.completed</span>
          </div>
          <div className="docs-flow-row">
            <span />
            <span className="docs-flow-agent">→ [Critic]</span>
            <span className="docs-flow-result">→ critic.reviewed</span>
          </div>
          <div className="docs-flow-row">
            <span />
            <span className="docs-flow-agent">→ [Reporter]</span>
            <span className="docs-flow-result">→ report.generated</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "job-states",
    title: "Job lifecycle",
    content: (
      <div className="docs-content">
        <p>
          Jobs transition through six states driven by inbound AXL messages:
        </p>
        <div className="docs-states-flow">
          {JOB_STATES.map((s, i) => (
            <span key={s} style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span
                className="badge badge-muted"
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem" }}
              >
                {s}
              </span>
              {i < JOB_STATES.length - 1 && (
                <span style={{ color: "var(--text-3)" }}>→</span>
              )}
            </span>
          ))}
        </div>
        <p>
          Any state can transition to <code>failed</code> if the Critic rejects
          the output or a module times out.
        </p>
      </div>
    ),
  },
  {
    id: "agent-minting",
    title: "Minting an agent",
    content: (
      <div className="docs-content">
        <p>
          Researchers use the{" "}
          <Link href="/creator" style={{ color: "var(--teal)" }}>
            Creator Studio
          </Link>{" "}
          to publish their analysis scripts as iNFTs. The four-step wizard:
        </p>
        <ol>
          <li><strong>Agent Info</strong> — name, domain, description, preview output.</li>
          <li><strong>Pricing & Config</strong> — price per run in OG, runtime estimate, supported formats.</li>
          <li>
            <strong>Upload Script</strong> — Python, R, JS, Jupyter, or Bash.
            Encrypted with AES-256-GCM before upload to 0G Storage.
          </li>
          <li>
            <strong>Review & Mint</strong> — keccak256 metadata hash computed,
            iNFT minted via <code>INFTRegistry.mint()</code> on 0G Chain.
          </li>
        </ol>
        <p>
          The encrypted script URI (<code>{"0g://<root>?key=<aes-key>"}</code>)
          is stored in the token so only authorized execution environments can
          decrypt and run it.
        </p>
      </div>
    ),
  },
  {
    id: "contracts",
    title: "Smart contracts",
    content: (
      <div className="docs-content">
        <p>
          Three contracts govern the on-chain lifecycle on{" "}
          <strong style={{ color: "var(--teal)" }}>0G Galileo Testnet</strong>:
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 4 }}>
          {CONTRACTS.map((c) => (
            <div key={c.name} className="docs-contract-card">
              <div className="docs-contract-header">
                <code className="docs-contract-name">{c.name}</code>
                <span className="docs-contract-desc">{c.desc}</span>
              </div>
              <span className="docs-contract-address">
                {CONTRACT_ADDRESSES[c.name]}
              </span>
            </div>
          ))}
        </div>
        <p className="docs-contract-note">
          Contract addresses are currently configured for the testnet deployment
          and will be updated after final deployment before submission.
        </p>
      </div>
    ),
  },
  {
    id: "api",
    title: "API reference",
    content: (
      <div className="docs-content">
        <p>The Fastify API runs on port 4000 in development.</p>
        <div className="docs-api-list">
          {API_ROUTES.map(({ method, path, desc }) => (
            <div key={path} className="docs-api-row">
              <span className={`docs-api-method docs-api-method-${method.toLowerCase()}`}>
                {method}
              </span>
              <ApiPath path={path} />
              <span className="docs-api-desc">{desc}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "local-setup",
    title: "Local setup",
    content: (
      <div className="docs-content">
        <CodeBlock lines={SETUP_LINES} />
      </div>
    ),
  },
];

const NAV_SECTIONS = sections.map((s) => ({ id: s.id, title: s.title }));

/* ─── Page ────────────────────────────────────────────────────────────────── */

export default function DocsPage() {
  return (
    <div className="container" style={{ paddingTop: 48, paddingBottom: 96 }}>

      {/* Header */}
      <div style={{ marginBottom: 48 }}>
        <p className="eyebrow" style={{ marginBottom: 8 }}>Documentation</p>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", marginBottom: 16 }}>
          KinSvarmo Docs
        </h1>
        <p style={{ color: "var(--text-2)", maxWidth: "none", lineHeight: 1.6 }}>
          Technical reference for the scientific iNFT marketplace —
          architecture, execution flow, smart contracts, and API.
        </p>
      </div>

      <div className="divider" style={{ marginBottom: 48 }} />

      {/* Mobile TOC */}
      <MobileToc sections={NAV_SECTIONS} />

      {/* Main grid */}
      <div className="docs-grid">

        {/* Sidebar */}
        <aside className="docs-sidebar">
          <DocsSidebarNav sections={NAV_SECTIONS} />
        </aside>

        {/* Content */}
        <main style={{ display: "flex", flexDirection: "column", gap: 64 }}>
          {sections.map((s) => (
            <section key={s.id} id={s.id} style={{ scrollMarginTop: 96 }}>
              <h2 className="docs-section-title">{s.title}</h2>
              {s.content}
            </section>
          ))}
        </main>

      </div>

      {/* Bottom CTA */}
      <div
        className="glass"
        style={{
          marginTop: 80,
          padding: "32px 40px",
          display: "flex",
          gap: 24,
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <div>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, marginBottom: 4 }}>
            Ready to try it?
          </p>
          <p style={{ fontSize: "0.85rem", color: "var(--text-2)" }}>
            Browse agents and run your first analysis in minutes.
          </p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <Link href="/agents" className="btn btn-primary">Browse Agents</Link>
          <Link href="/creator" className="btn btn-secondary">Mint an Agent</Link>
        </div>
      </div>

    </div>
  );
}