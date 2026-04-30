import { AgentsMarketplaceClient } from "./AgentsMarketplaceClient";
import { agentStore } from "../api/agents/store";

export const metadata = {
  title: "Marketplace - KinSvarmo",
  description: "Find private expert agents that run paid, auditable workflows on user-provided files.",
};

export const dynamic = "force-dynamic";

export default function AgentsPage() {
  return <AgentsMarketplaceClient agents={[...agentStore]} />;
}
