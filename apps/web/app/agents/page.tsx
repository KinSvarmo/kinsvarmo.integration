import type { AgentListing } from "@kingsvarmo/shared";
import { AgentsMarketplaceClient } from "./AgentsMarketplaceClient";

export const metadata = {
  title: "Marketplace - KinSvarmo",
  description: "Find private expert agents that run paid, auditable workflows on user-provided files.",
};

export const dynamic = "force-dynamic";

async function fetchAgents(): Promise<AgentListing[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"}/api/agents`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.agents ?? [];
  } catch {
    return [];
  }
}

export default async function AgentsPage() {
  const agents = await fetchAgents();
  return <AgentsMarketplaceClient agents={agents} />;
}
