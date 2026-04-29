# KinSvarmo — Pitch Deck

> Structure for Google Slides / PowerPoint presentation.
> Suggested design: dark background (#070b10), accent color teal (#00d4aa), headings in Space Grotesk.

---

## Slide 1 — Title

**Headline:** Scientific Agents as Private iNFTs

**Subheadline:** A decentralized marketplace where researchers monetize encrypted analysis logic and users get auditable scientific results — powered by 0G, Gensyn AXL, and KeeperHub.

**Visual:** KinSvarmo logo + teal waveform icon. Sponsor badges (0G · Gensyn AXL · KeeperHub).

---

## Slide 2 — The Problem

**Title:** Science has an IP and reproducibility problem

**3 pain points:**

1. **IP exposure** — Researchers share analysis methods to get paid, losing competitive advantage.
2. **No provenance** — Results can't be verified: who ran what, on what data, with which version?
3. **Fragmented monetization** — No native way to sell scientific compute as a product without a SaaS company.

**Visual:** Three red X icons next to each pain point.

---

## Slide 3 — The Solution

**Title:** KinSvarmo: Encrypted intelligence, auditable execution

**One-liner:** Researchers publish encrypted analysis agents on 0G. Users pay per run and receive structured results with cryptographic provenance.

**Visual:** Simple left-to-right diagram:
```
[Researcher] → Encrypts script → Mints iNFT on 0G
[User]       → Uploads dataset → Pays OG token → Receives Report + Provenance
```

---

## Slide 4 — How It Works (User Flow)

**Title:** Four steps to auditable science

| Step | Who | What |
|------|-----|------|
| 1. Researchers Mint | Researcher | Uploads encrypted script → iNFT on 0G Chain |
| 2. Users Upload | User | Drag & drop dataset, get cost quote in OG |
| 3. Swarm Runs | Platform | Planner → Analyzer → Critic → Reporter via AXL |
| 4. Results Delivered | User | Structured report, confidence score, 0G provenance ID |

**Visual:** 4-step horizontal flow with icons (🔬 📤 🤖 📄).

---

## Slide 5 — The Agent Swarm (Gensyn AXL)

**Title:** Multi-agent execution over Gensyn AXL

**Description:** Every analysis is handled by a coordinated 4-module swarm communicating through peer-to-peer AXL messages:

```
job.created → [Planner]  → plan.generated
           → [Analyzer] → analysis.completed
           → [Critic]   → critic.reviewed
           → [Reporter] → report.generated
```

**Module breakdown:**
- **Planner** — validates request, creates execution plan
- **Analyzer** — runs deterministic scientific computation
- **Critic** — reviews output, assigns confidence score (0–1)
- **Reporter** — packages final structured report with provenance

**Visual:** 4-module pipeline diagram with AXL message arrows between them.

---

## Slide 6 — Encrypted Intelligence on 0G

**Title:** Private by design, verifiable by chain

**Three pillars:**

1. **AES-256-GCM encryption** — Script encrypted before upload; key embedded in iNFT token URI.
2. **0G Storage** — Decentralized blob storage with Merkle-proof integrity verification.
3. **ERC-7857 iNFT** — Ownership token on 0G Chain; transfers intelligence rights, not just metadata.

**Key insight:** The researcher never reveals their algorithm — the TEE execution environment decrypts and runs it. The user gets results; the chain records provenance.

**Visual:** Lock icon → 0G blob → NFT token → execution → report.

---

## Slide 7 — Creator Studio (Demo)

**Title:** Mint your analysis agent in 4 steps

**Screenshot / mockup of `/creator` page:**

1. Enter agent info (name, domain, description)
2. Set price per run in OG token
3. Upload script — encrypted on the client before upload
4. Mint iNFT → tx hash + 0G intelligence reference

**Callout:** Revenue flows directly to the researcher's wallet per execution. No platform subscription. No middleman.

---

## Slide 8 — Live Demo

**Title:** Alkaloid Predictor v2 — End-to-end in 90 seconds

**Demo flow:**
1. Open `/agents` → select "Alkaloid Predictor v2"
2. Upload `alkaloid-sample.csv`
3. Review cost breakdown (0.25 OG + storage + 5% protocol fee)
4. Authorize run → watch Planner → Analyzer → Critic → Reporter execute live
5. View final report: candidate compound families, confidence 0.82, provenance ID on 0G

**Visual:** Screenshots or live walkthrough of the 4-step run wizard + job monitor page.

---

## Slide 9 — Tech Stack

**Title:** Built on sponsor infrastructure

| Technology | Role |
|---|---|
| **0G Network** | Encrypted storage + EVM chain for iNFT ownership and payment |
| **Gensyn AXL** | Peer-to-peer message routing between Planner / Analyzer / Critic / Reporter |
| **KeeperHub** | Workflow orchestration, retry logic, execution guarantees |
| **Next.js 15 + Wagmi** | Frontend with native wallet integration |
| **Fastify 5** | High-performance API service |
| **ERC-7857** | iNFT standard — encrypted URI + TEE execution rights |

---

## Slide 10 — What's Built

**Title:** Demo-ready today

**Left column — Done:**
- All 5 pages implemented (landing, marketplace, run wizard, job monitor, creator studio)
- Wallet connection (MetaMask / EIP-6963)
- 0G Storage upload with AES-256-GCM encryption
- Full AXL agent swarm pipeline (Planner → Analyzer → Critic → Reporter)
- Live job monitor with real-time AXL message log
- API: job lifecycle, agent registry, message history, results

**Right column — Next:**
- Smart contract deployment (AnalysisEscrow, INFTRegistry)
- KeeperHub integration
- Multiple agent domains (Genomics, Materials, Imaging)
- Persistent database

---

## Slide 11 — Opportunity

**Title:** The science compute market is untapped

**3 key points:**

1. **$50B+** global scientific research software market, largely locked in paywalled SaaS.
2. **Zero native monetization** for individual researchers — institutions capture the value.
3. **No provenance standard** — results can't be audited, reproduced, or traded as verifiable assets.

**KinSvarmo's wedge:** Start with the long tail of researchers (bioinformatics, cheminformatics, materials science) who have valuable niche analysis scripts and no path to monetize them.

---

## Slide 12 — Closing

**Title:** Scientific Agents as Private iNFTs

**Tagline:** Researchers keep their IP. Users get auditable results. The chain keeps the record.

**Call to action:**
- Try the demo: `[app URL]`
- Browse the code: `github.com/[repo]`
- Contact: `[contact info]`

**Sponsor badges:** 0G · Gensyn AXL · KeeperHub

---

*12 slides · ~2 min presentation · target: hackathon judges / early adopters*
