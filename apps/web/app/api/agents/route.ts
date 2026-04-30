import { NextResponse } from "next/server";
import type { AgentListing } from "@kingsvarmo/shared";
import { agentStore } from "./store";

export async function GET() {
  return NextResponse.json({ agents: agentStore });
}

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.name || !body.slug || !body.domain) {
    return NextResponse.json({ error: "name, slug and domain are required" }, { status: 400 });
  }

  const agent: AgentListing = {
    id: `local-${Date.now()}`,
    slug: body.slug,
    name: body.name,
    description: body.description ?? "",
    longDescription: body.longDescription ?? body.description ?? "",
    domain: body.domain,
    creatorName: body.creatorName ?? "Anonymous",
    creatorWallet: body.creatorWallet ?? "",
    priceIn0G: body.priceIn0G ?? "0.25",
    runtimeEstimateSeconds: body.runtimeEstimateSeconds ?? 90,
    supportedFormats: body.supportedFormats ?? ["csv"],
    status: "published",
    previewOutput: body.previewOutput ?? "",
    expectedOutput: body.expectedOutput ?? "",
    intelligenceReference: body.intelligenceReference ?? "",
    promptTemplate: body.promptTemplate ?? "",
    privacyNotes: body.privacyNotes ?? "",
    createdAt: new Date().toISOString(),
  };

  agentStore.push(agent);

  return NextResponse.json({ agent }, { status: 201 });
}
