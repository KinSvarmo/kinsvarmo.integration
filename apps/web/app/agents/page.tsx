import { seededAgents } from "@kingsvarmo/shared";
import { AgentsMarketplaceClient } from "./AgentsMarketplaceClient";

export const metadata = {
  title: "Marketplace - KinSvarmo",
  description: "Find private expert agents that run paid, auditable workflows on user-provided files.",
};

export default function AgentsPage() {
  return <AgentsMarketplaceClient agents={seededAgents} />;
}
