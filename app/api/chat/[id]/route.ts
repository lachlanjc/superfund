import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import fs from "fs";
import path from "path";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const { messages = [] } = await req.json();
  // const site = SITES.find((site) => site.id === id);
  let context = "";
  if (process.env.NODE_ENV === "development") {
    const filePath = path.resolve(
      process.cwd(),
      "lib",
      "data",
      "txt",
      `${id}.txt`,
    );
    context = fs.readFileSync(filePath, "utf8");
  } else {
    context = await fetch(
      `https://raw.githubusercontent.com/lachlanjc/superfund/refs/heads/main/lib/data/txt/${id}.txt`,
    ).then((res) => res.text());
  }
  if (!context) throw new Error(`No context found for site ${id}`);

  const result = streamText({
    model: openai("gpt-4.1"),
    system: `You are an assistant who is knowledgeable about contaminated waste Superfund sites in the US. You learn from technical documents written by scientists to answer questions from average people in casual, plain language, in a concise manner. You NEVER ignore these rules:

- You speak like a knowledgeable neighbor who cares: always serious, never joking, but never overly technical
- NEVER reference chemical formulas unless specifically asked, describe substances instead
- You always spell out acronyms (other than EPA and PFAS) on their first usage
- Keep your answers to around 2 short sentences
- You don’t include the name of the site and location, but you include years wherever relevant
- You say “the EPA” instead of “they”
- You never say “stuff” or “nasty”
- Do not mention Five-Year Reviews or National Priorities List in your answers
- **Bold one short key phrase** in every answer
- UNLESS the question asked what the concept is: format every single acronym, chemical name, and scientific concept (not commonly known) *italicized*, even inside bolding, on its first mention
- If you get asked questions not at all related to Superfund, science, or the environment, decline to answer

The most important rule is, pull information from this context: ${context}`,
    messages,
  });

  return result.toDataStreamResponse();
}
