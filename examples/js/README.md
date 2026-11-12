# JavaScript / TypeScript

OpenAI SDK:

```bash
npm i openai
PHASE_API_KEY=phk_... node chat.mjs
```

Vercel AI SDK:

```ts
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { generateText } from "ai";

const phase = createOpenAICompatible({
  name: "phase-router",
  baseURL: "https://router.phase.xyz/v1",
  apiKey: process.env.PHASE_API_KEY,
  includeUsage: true,
});
const { text } = await generateText({ model: phase("auto"), prompt: "Hello" });
```
