# Phase Router: listing card

Use these texts and files when listing Phase Router in a catalog. Machine-readable: [`card.json`](card.json).

| Field | Value |
|---|---|
| Name | Phase Router |
| One line | One OpenAI-compatible API for every model: price of each call in the answer, signed receipt for each call. |
| Short description | OpenAI-compatible model router: about 400 models behind one API key, pay per call by key or per request in USDT (x402), a signed receipt for every call. |
| Website | https://router.phase.xyz |
| Docs | https://router.phase.xyz/docs |
| API base URL | `https://router.phase.xyz/v1` (OpenAI-compatible; Anthropic Messages at `/v1/messages`) |
| Models and prices | https://router.phase.xyz/models |
| MCP server | `https://mcp.ai.phase.xyz/mcp` (Streamable HTTP, API key; registry `xyz.phase.ai/gateway`) |
| x402 | https://router.phase.xyz/.well-known/x402 (USDT on Phase L1, `eip155:1015`) |
| Categories | AI gateway, LLM router, Model aggregator, Developer tools, Payments / x402 |
| Tags | llm, openai-compatible, anthropic-compatible, model-router, ai-gateway, mcp, x402, usdt, pay-per-call, receipts, open-models, embeddings, image-generation |
| Pricing | Pay per call: model token price plus a small fixed per-call fee; no subscription. Prices: https://router.phase.xyz/models |
| Company | Phase Labs Technologies Inc |
| Contact | ai@phase.xyz |

## Long description

Phase Router is an OpenAI-compatible model router. One base URL and one API key give access to about 400 models: open LLMs (DeepSeek, Qwen, Llama, gpt-oss, Kimi, GLM, MiniMax and others), Claude models, and image, video, speech, embedding and rerank models. The model `auto` sends each request to the cheapest model that can do it well; any model can also be called by id. Every answer states the model that ran and its price (`usage.cost`), and every paid call has a signed receipt; receipts roll into weekly epochs anchored on the Phase L1 blockchain. Pay with a prepaid API key, per request in USDT on Phase L1 via x402 (no account), or bring your own provider key for closed models. It also speaks the Anthropic Messages API (Claude Code, Claude Agent SDK) and ships a remote MCP server for agents.

## Logo

| File | Use |
|---|---|
| [`logo.svg`](logo.svg) | Square icon, dark background `#00040f`, accent `#4da3ff` |
| [`logo-mono.svg`](logo-mono.svg) | Monochrome (`currentColor`), no background, for catalogs that tint icons |
| [`logo-512.png`](logo-512.png) | 512x512 PNG |
| [`logo-400.png`](logo-400.png) | 400x400 PNG |
| https://router.phase.xyz/og.png | Social preview image |

The name and logo identify the service; use them only to refer to Phase Router.
