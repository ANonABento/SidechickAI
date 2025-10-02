// apps/dashboard/lib/api.ts
export async function askAI(prompt: string) {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
  const res = await fetch(`${base}/api/ai`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(`AI request failed: ${res.status} ${msg}`);
  }
  return (await res.json()) as { response: string; model?: string; usage?: any };
}
