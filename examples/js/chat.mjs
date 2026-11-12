// Phase Router with the OpenAI JS SDK: npm i openai; PHASE_API_KEY=phk_... node chat.mjs
import OpenAI from "openai";

const client = new OpenAI({ baseURL: "https://router.phase.xyz/v1", apiKey: process.env.PHASE_API_KEY });

const r = await client.chat.completions.create({
  model: "auto", // or any id from GET https://router.phase.xyz/v1/models
  messages: [{ role: "user", content: "Explain x402 in one sentence." }],
});
console.log(r.choices[0].message.content);
console.log("model:", r.phase?.routed_model ?? r.phase?.model, "| cost USD:", r.usage?.cost, "| receipt:", `https://router.phase.xyz/receipts/${r.phase?.task_id}`);

const stream = await client.chat.completions.create({
  model: "gpt-oss-120b",
  messages: [{ role: "user", content: "Count to five." }],
  stream: true,
  stream_options: { include_usage: true },
});
for await (const chunk of stream) process.stdout.write(chunk.choices[0]?.delta?.content ?? "");
console.log();
