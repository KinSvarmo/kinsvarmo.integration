import { NextResponse } from "next/server";
import { seededAgents } from "@kingsvarmo/shared";

export async function GET() {
  return NextResponse.json({ agents: seededAgents });
}

