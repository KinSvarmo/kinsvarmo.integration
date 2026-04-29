# Known Limitations

- The marketplace includes seeded catalog agents. `Alkaloid Predictor v2` and `Classroom Pulse Reviewer` have deterministic local demo coverage; the remaining domain agents are preview listings.
- Job state is currently in memory for local demo speed. A future production store should act as an app index/cache while 0G/onchain references remain the durable source of truth.
- Scientific analysis will be deterministic and modest in scope.
- The phytochemistry output is a demo-safe screening summary, not publication-grade or clinical analysis.
- iNFT behavior depends on the configured testnet registry address for wallet authorization.
- 0G compute may begin as an adapter abstraction if full compute integration is too large.
- Classroom datasets must stay anonymized before they are added to `demo-data`.
