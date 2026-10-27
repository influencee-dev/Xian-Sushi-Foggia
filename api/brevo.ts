// Funzione Vercel: risponde a POST /api/brevo sul sito online.
import { handleBrevo } from "../lib/brevo.js";

export async function POST(request: Request): Promise<Response> {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Dati non validi" }, { status: 400 });
  }
  const result = await handleBrevo(payload);
  return Response.json(result.body, { status: result.status });
}
