# Phase Router

The `phase-router` MCP server gives you Phase Router, an OpenAI-compatible router for about 400 models:

- `list_models`: models with prices (micro-USD per 1M tokens) and capabilities.
- `quote`: the price ceiling of a call before running it.
- `chat`, `embed`: run a model; the answer includes its actual price and a receipt id.
- `receipt`: the signed receipt of a call; `key`: balance and daily cap of the API key; `session`: saved conversations.

Use `auto` when the user does not name a model. Tell the user the price before expensive calls. Direct API use:
base URL `https://router.phase.xyz/v1`, key in `PHASE_API_KEY`. Docs: https://router.phase.xyz/llms.txt
