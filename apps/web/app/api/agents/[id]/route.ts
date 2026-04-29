import { NextResponse } from "next/server";
import { seededAgents } from "@kingsvarmo/shared";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const agent = seededAgents.find(
    (candidate) =>
      candidate.id === id ||
      candidate.slug === id ||
      candidate.onchainTokenId === id
  );

  if (!agent) {
    return NextResponse.json({ error: "Agent not found" }, { status: 404 });
  }

  return NextResponse.json({ agent });
}

