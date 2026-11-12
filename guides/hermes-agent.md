# Hermes Agent and Phase Router

[Hermes Agent](https://github.com/NousResearch/hermes-agent) by Nous Research works with any OpenAI-compatible
endpoint. Phase Router plugs in as its model provider (one key for about 400 models, the router can pick the model per
request) and, optionally, as an MCP server.

You need a Phase API key `phk_...` from https://router.phase.xyz/dashboard.

## 1. Model provider

Put the key in `~/.hermes/.env`:

```bash
PHASE_API_KEY=phk_...
```

**Interactive:** run `hermes model` (in the terminal, outside a chat session), choose
"Custom endpoint (self-hosted / VLLM / etc.)" and enter:

| Prompt | Value |
|---|---|
| API base URL | `https://router.phase.xyz/v1` |
| API key | your `phk_...` key |
| Model name | `auto` (the router picks), or an id from https://router.phase.xyz/models such as `qwen3-coder-480b`, `kimi-k2.6`, `glm-5.3`, `deepseek-v3.2` |

**Or in `~/.hermes/config.yaml`:**

```yaml
model:
  default: auto
  provider: custom
  base_url: https://router.phase.xyz/v1
  key_env: PHASE_API_KEY
```

Several providers side by side: define Phase Router as a named provider and switch inside a session with
`/model custom:phase-router:<model id>`:

```yaml
providers:
  phase-router:
    api: https://router.phase.xyz/v1
    key_env: PHASE_API_KEY
    transport: chat_completions
    default_model: auto
```

The full file: [`configs/hermes-agent/config.yaml`](../configs/hermes-agent/config.yaml).

Notes:

- Hermes reads the context window from the endpoint's `/models` (Phase Router returns `phase.context_window` per model)
  or from models.dev; if it guesses wrong, pin `model.context_length`.
- Auxiliary tasks (compression, titles, vision) use the main model by default; point `auxiliary.*` at a cheap Phase
  model such as `gpt-oss-120b` if you want them cheaper.
- For tool use pick a model whose `capabilities` include `tools` (`GET https://router.phase.xyz/v1/models`), or `agentic`.

## 2. MCP server (optional)

Gives the agent Phase Router as tools: `list_models`, `quote`, `chat`, `embed`, `receipt`, `key`, `session`.

```yaml
mcp_servers:
  phase-router:
    url: "https://mcp.ai.phase.xyz/mcp"
    headers:
      Authorization: "Bearer ${PHASE_API_KEY}"
```

Hermes resolves `${PHASE_API_KEY}` from `~/.hermes/.env`. Reload with `/reload-mcp` or restart the session.

## Check

```bash
curl -s https://router.phase.xyz/v1/chat/completions \
  -H "Authorization: Bearer $PHASE_API_KEY" -H "content-type: application/json" \
  -d '{"model": "auto", "messages": [{"role": "user", "content": "ping"}]}' | jq '.usage.cost, .phase.routed_model'
```

Every answer carries its price (`usage.cost`, USD) and a receipt id (`phase.task_id`, page
https://router.phase.xyz/receipts/<task_id>).
