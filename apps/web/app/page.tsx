import Link from "next/link";

const workflow = [
  {
    title: "Researchers mint agents",
    copy: "Scientific logic is encrypted, packaged with accepted formats and minted as an ERC-7857 iNFT on 0G.",
  },
  {
    title: "Users submit datasets",
    copy: "A user chooses the right agent, uploads compatible data, reviews cost and pays once in OG token.",
  },
  {
    title: "The network returns results",
    copy: "0G Compute runs the analysis, AXL coordinates agent messages, and KeeperHub records reliable execution state.",
  },
];

const networkLayers = [
  { label: "0G Chain", value: "iNFT ownership, payment receipts and execution references" },
  { label: "0G Storage", value: "dataset and intelligence references for reproducible runs" },
  { label: "0G Compute", value: "private runtime for scientific analysis logic" },
  { label: "Gensyn AXL", value: "planner, analyzer, critic and reporter coordination" },
  { label: "KeeperHub", value: "trusted automation for onchain job execution" },
];

const featuredAgents = [
  {
    name: "Phytochemistry Insight",
    domain: "Plant compounds",
    price: "0.25 OG",
    formats: "CSV, TSV",
    copy: "Screens alkaloid datasets for known patterns and confidence bands.",
  },
  {
    name: "Genomics Variant Scout",
    domain: "Sequence analysis",
    price: "0.42 OG",
    formats: "FASTA, JSON",
    copy: "Flags variants, annotations and review targets for lab teams.",
  },
  {
    name: "Materials Stability Lab",
    domain: "Materials science",
    price: "0.36 OG",
    formats: "CSV, H5",
    copy: "Evaluates experiment tables for stability and anomaly signals.",
  },
];

const researcherSignals = [
  "Publish analysis IP without exposing the underlying method",
  "Earn per run through tokenized access instead of consulting bottlenecks",
  "Define formats, domain scope, pricing and provenance metadata",
];

const userSignals = [
  "Find domain-specific agents instead of adapting generic AI tools",
  "Upload data, approve a single payment and follow job status",
  "Receive structured results with provenance and execution context",
];

const runLog = [
  "dataset.csv -> 0G Storage reference created",
  "payment receipt -> 0G Chain confirmed",
  "planner -> analyzer -> critic -> reporter via AXL",
  "KeeperHub -> result provenance finalized",
];

export default function HomePage() {
  return (
    <div className="landing-shell">
      <section className="landing-hero">
        <div className="landing-grid" />
        <div className="landing-beam landing-beam-left" />
        <div className="landing-beam landing-beam-right" />

        <div className="container landing-hero-inner">
          <div className="landing-copy">
            <div className="landing-kicker">
              <span className="landing-live-dot" />
              Scientific agent marketplace on 0G
            </div>

            <h1>Encrypted AI agents for real scientific datasets.</h1>
            <p className="landing-lede">
              KinSvarmo is a marketplace where researchers mint private scientific
              agents as iNFTs and users pay in OG token to run auditable analysis
              through 0G Compute, Gensyn AXL and KeeperHub.
            </p>

            <div className="landing-actions">
              <Link href="/agents" className="btn btn-primary btn-lg">
                Explore Marketplace
              </Link>
              <Link href="/creator" className="btn btn-secondary btn-lg">
                Mint an Agent
              </Link>
            </div>

            <div className="landing-proofline" aria-label="Core value pillars">
              <div>
                <strong>Private logic</strong>
                <span>Researchers keep scientific methods encrypted.</span>
              </div>
              <div>
                <strong>Paid runs</strong>
                <span>Users access agents per dataset with OG token.</span>
              </div>
              <div>
                <strong>Visible provenance</strong>
                <span>Results link back to storage, compute and execution state.</span>
              </div>
            </div>
          </div>

          <aside className="hero-console" aria-label="KinSvarmo run preview">
            <div className="console-topbar">
              <span />
              <span />
              <span />
              <strong>run.axl/0482</strong>
            </div>

            <div className="agent-preview">
              <div className="agent-sigil">KS</div>
              <div>
                <p className="agent-status">Encrypted agent selected</p>
                <h2>Phytochemistry Insight Agent</h2>
                <p>
                  Screens compound tables for alkaloid signatures, confidence
                  bands and research-ready observations.
                </p>
              </div>
            </div>

            <div className="landing-run-card">
              <div>
                <span>Dataset</span>
                <strong>alkaloid-sample.csv</strong>
              </div>
              <div>
                <span>Price</span>
                <strong>0.25 OG</strong>
              </div>
              <div>
                <span>Status</span>
                <strong>AXL consensus</strong>
              </div>
            </div>

            <div className="landing-terminal" aria-label="Execution log">
              {runLog.map((line, index) => (
                <div key={line}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {line}
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="landing-band">
        <div className="container landing-band-inner">
          {networkLayers.map((layer) => (
            <div key={layer.label}>
              <strong>{layer.label}</strong>
              <span>{layer.value}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section landing-section">
        <div className="container split-section">
          <div>
            <p className="eyebrow">What KinSvarmo is</p>
            <h2>A scientific marketplace where expertise becomes runnable infrastructure.</h2>
          </div>
          <p>
            Instead of selling static reports or exposing raw prompts, researchers
            publish specialized agents with encrypted analysis logic. Users bring
            datasets, pay for exactly the run they need, and receive structured
            outputs with an execution trail that can be inspected after the fact.
          </p>
        </div>
      </section>

      <section className="section landing-section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Marketplace preview</p>
            <h2>Purpose-built agents for scientific workflows.</h2>
          </div>

          <div className="landing-agent-grid">
            {featuredAgents.map((agent) => (
              <article className="landing-agent-card" key={agent.name}>
                <div className="landing-agent-card-top">
                  <span>{agent.domain}</span>
                  <strong>{agent.price}</strong>
                </div>
                <h3>{agent.name}</h3>
                <p>{agent.copy}</p>
                <div className="landing-agent-meta">
                  <span>{agent.formats}</span>
                  <span>0G indexed</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section landing-section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">How it works</p>
            <h2>Mint agent, upload data, pay once, get results.</h2>
          </div>

          <div className="workflow-grid workflow-grid-three">
            {workflow.map((step, index) => (
              <article className="workflow-card" key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section landing-section">
        <div className="container actor-grid">
          <article className="actor-panel">
            <p className="eyebrow">For Researchers</p>
            <h2>Turn private scientific methods into paid agents.</h2>
            <p>
              Mint an iNFT that carries metadata, accepted input formats, price
              per run and encrypted analysis logic.
            </p>
            <ul>
              {researcherSignals.map((signal) => (
                <li key={signal}>{signal}</li>
              ))}
            </ul>
          </article>

          <article className="actor-panel">
            <p className="eyebrow">For Users</p>
            <h2>Run expert analysis without rebuilding the pipeline.</h2>
            <p>
              Choose an agent, upload a dataset and follow the execution trail
              until a structured result is ready.
            </p>
            <ul>
              {userSignals.map((signal) => (
                <li key={signal}>{signal}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="section-sm landing-section">
        <div className="container landing-cta">
          <div>
            <p className="eyebrow">Ready for the demo path</p>
            <h2>Start in the marketplace, then run the full scientific workflow.</h2>
            <p>
              Browse seeded agents, connect a wallet, upload demo data and trace
              the result through storage, compute, AXL coordination and KeeperHub.
            </p>
          </div>
          <div className="landing-cta-actions">
            <Link href="/agents" className="btn btn-primary btn-lg">
              Open Marketplace
            </Link>
            <Link href="/creator" className="btn btn-secondary btn-lg">
              Publish Agent
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
