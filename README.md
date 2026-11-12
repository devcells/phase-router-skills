# Phase Router for agents

[Phase Router](https://router.phase.xyz) is an OpenAI-compatible model router: one API for about 400 models
(open models such as DeepSeek, Qwen, Llama, gpt-oss, Kimi, GLM, MiniMax, plus image, video, speech, embedding and
rerank models), the price of every call in the answer, and a signed receipt for each call.

This repository holds what an agent or a developer needs to connect: an agent skill, runnable examples and
ready-made configs for popular clients. It contains no product code.

| | |
|---|---|
| Base URL (OpenAI-compatible) | `https://router.phase.xyz/v1` |
| Anthropic Messages API | `https://router.phase.xyz/v1/messages` (Claude Code, Claude Agent SDK, Anthropic SDKs) |
| Auth | `Authorization: Bearer phk_...` (or `x-api-key: phk_...`); create a key at https://router.phase.xyz/dashboard |
| Models and prices | https://router.phase.xyz/models, `GET https://router.phase.xyz/v1/models` (public, no key) |
| Let the router pick | model `auto` (or the classes `eco`, `premium`, `agentic`) |
| Remote MCP server | `https://mcp.ai.phase.xyz/mcp` (Streamable HTTP, same key; MCP Registry name `xyz.phase.ai/gateway`) |
| Docs | https://router.phase.xyz/docs, for agents: https://router.phase.xyz/llms.txt and https://router.phase.xyz/index.md |
| Machine-readable | [`/.well-known/x402`](https://router.phase.xyz/.well-known/x402), [`/.well-known/mcp/server.json`](https://router.phase.xyz/.well-known/mcp/server.json) |

## How to pay

- **API key (prepaid balance).** Sign up at https://router.phase.xyz/dashboard, create a key `phk_...`.
  You pay the token price of the model that ran plus a small fixed fee per call; the key has a balance and a daily cap.
- **Per request in USDT, no account (x402).** Send the request without a key: the answer is `402 Payment Required`
  with the price ceiling of that request in USDT on Phase L1 (network `eip155:1015`). Sign the authorization with your
  wallet and repeat the request; you are charged what the answer actually cost, never more than the ceiling. See
  [`examples/x402`](examples/x402).
- **Your own provider key (BYOK)** for closed models: https://router.phase.xyz/models?access=byok

Every answer carries `usage.cost` (USD) and a `phase` object with the model that ran and the task id of its receipt
(`https://router.phase.xyz/receipts/<task_id>`).

## Quick start

```bash
export PHASE_API_KEY=phk_...
curl https://router.phase.xyz/v1/chat/completions \
  -H "Authorization: Bearer $PHASE_API_KEY" -H "content-type: application/json" \
  -d '{"model": "auto", "messages": [{"role": "user", "content": "Hello"}]}'
```

```python
import os
from openai import OpenAI

client = OpenAI(base_url="https://router.phase.xyz/v1", api_key=os.environ["PHASE_API_KEY"])
r = client.chat.completions.create(model="auto", messages=[{"role": "user", "content": "Hello"}])
```

## What is here

| Path | What |
|---|---|
| [`skills/phase-router/SKILL.md`](skills/phase-router/SKILL.md) | Agent skill (Claude Code, Claude Agent SDK and other clients that read `SKILL.md`) |
| [`examples/curl`](examples/curl) | curl: models, chat, streaming, embeddings, Anthropic Messages |
| [`examples/python`](examples/python) | OpenAI Python SDK |
| [`examples/js`](examples/js) | OpenAI JS SDK |
| [`examples/x402`](examples/x402) | Pay per request in USDT with a wallet (x402, viem) |
| [`guides/claude-code.md`](guides/claude-code.md) | Claude Code: MCP server, and Claude Code itself on Phase Router |
| [`guides/hermes-agent.md`](guides/hermes-agent.md) | Hermes Agent (Nous Research): provider and MCP server |
| [`configs/`](configs) | Claude Code, Cursor, Cline / Kilo Code / Roo Code, LiteLLM, Hermes Agent |
| [`gemini-extension.json`](gemini-extension.json) | Gemini CLI extension (the MCP server) |
| [`brand/`](brand) | Listing card: names, descriptions, logo, tags, contact |

## Install the skill

```bash
# Claude Code: personal skills folder
mkdir -p ~/.claude/skills && cp -r skills/phase-router ~/.claude/skills/
```

## Gemini CLI

```bash
gemini extensions install https://github.com/devcells/phase-router-skills
```

The extension asks for `PHASE_API_KEY` and adds the Phase Router MCP server.

## License

MIT for the contents of this repository (examples, configs, texts). The Phase Router name and logo are trademarks of
Phase Labs Technologies Inc and are included for listing the service; see [`brand/`](brand).
