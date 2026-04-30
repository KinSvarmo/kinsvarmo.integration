import { Redis } from "@upstash/redis";
import type { AnalysisJob, AnalysisResult, AxlMessage } from "@kingsvarmo/shared";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

const TTL = 60 * 60 * 24; // 24 hours

export async function getJob(jobId: string): Promise<AnalysisJob | null> {
  return redis.get<AnalysisJob>(`job:${jobId}`);
}

export async function setJob(jobId: string, job: AnalysisJob): Promise<void> {
  await redis.set(`job:${jobId}`, job, { ex: TTL });
}

export async function getMessages(jobId: string): Promise<AxlMessage[]> {
  return (await redis.get<AxlMessage[]>(`messages:${jobId}`)) ?? [];
}

export async function setMessages(jobId: string, messages: AxlMessage[]): Promise<void> {
  await redis.set(`messages:${jobId}`, messages, { ex: TTL });
}

export async function getResult(resultId: string): Promise<AnalysisResult | null> {
  return redis.get<AnalysisResult>(`result:${resultId}`);
}

export async function setResult(resultId: string, result: AnalysisResult): Promise<void> {
  await redis.set(`result:${resultId}`, result, { ex: TTL });
}

export async function getKeeperHubRun(jobId: string): Promise<unknown> {
  return redis.get(`keeperhub:${jobId}`);
}

export async function setKeeperHubRun(jobId: string, run: unknown): Promise<void> {
  await redis.set(`keeperhub:${jobId}`, run, { ex: TTL });
}
