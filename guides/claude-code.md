# Claude Code and Phase Router

Two independent ways to use Phase Router from [Claude Code](https://code.claude.com/docs):

1. **MCP server**: Claude Code keeps its own model and gets Phase Router as tools (`list_models`, `quote`, `chat`,
   `embed`, `receipt`, `key`, `session`): ask another model, compare prices, embed text, fetch a receipt.
2. **Phase Router as Claude Code's model endpoint**: Phase Router speaks the Anthropic Messages API
   (`/v1/messages`, `/v1/messages/count_tokens`), so Claude Code can run on it like on any LLM gateway.

You need a Phase API key `phk_...` from https://router.phase.xyz/dashboard.

## 1. MCP server

```bash
export PHASE_API_KEY=phk_...
claude mcp add --scope user --transport http phase-router https://mcp.ai.phase.xyz/mcp \
  --header "Authorization: Bearer $PHASE_API_KEY"
```

Or commit a project `.mcp.json` without the key (Claude Code expands `${PHASE_API_KEY}` from the environment):
[`configs/claude-code/mcp.json`](../configs/claude-code/mcp.json).

Check: `claude mcp list` shows `phase-router` connected; in a session, `/mcp` lists its tools. Without a key the server
still answers the handshake and lists tools, but every tool call asks for a key.

Optional: add your own provider key for Claude or GPT models called through the `chat` tool, as an extra header
`X-Phase-BYOK-Anthropic: sk-ant-...` or `X-Phase-BYOK-OpenAI: sk-...` (forwarded per call, never stored).

Also install the skill so Claude knows how to use the API directly:

```bash
mkdir -p ~/.claude/skills && cp -r skills/phase-router ~/.claude/skills/
```

## 2. Claude Code on Phase Router

Set the base URL and the key, following Claude Code's
[LLM gateway guide](https://code.claude.com/docs/en/llm-gateway-connect). Phase Router reads the key from either
`Authorization: Bearer` (`ANTHROPIC_AUTH_TOKEN`) or `x-api-key` (`ANTHROPIC_API_KEY`).

```bash
export ANTHROPIC_BASE_URL=https://router.phase.xyz
export ANTHROPIC_AUTH_TOKEN=phk_...
claude
```

To keep it for every session (including background agents), put the same values in the `env` block of
`~/.claude/settings.json` (never in a project's committed `.claude/settings.json`):
[`configs/claude-code/settings.json`](../configs/claude-code/settings.json).

Verify before starting Claude Code:

```bash
curl -sS -X POST "$ANTHROPIC_BASE_URL/v1/messages" \
  -H "Authorization: Bearer $ANTHROPIC_AUTH_TOKEN" -H "anthropic-version: 2023-06-01" -H "content-type: application/json" \
  -d '{"model": "claude-haiku-4-5", "max_tokens": 1, "messages": [{"role": "user", "content": "."}]}'
```

A JSON message means the URL and key work; `401 authentication_error` means the key is wrong. In Claude Code, `/status`
shows `Anthropic base URL: https://router.phase.xyz` and the credential source.

### Models

- Claude models are in the Phase Router catalog (`claude-sonnet-5-5`, `claude-opus-5-5`, `claude-haiku-4-5`, ...;
  see https://router.phase.xyz/models). Pick them with `ANTHROPIC_MODEL`, and set `ANTHROPIC_DEFAULT_HAIKU_MODEL` for
  background tasks.
- On your own Anthropic key (BYOK): add `ANTHROPIC_CUSTOM_HEADERS="X-Phase-BYOK-Anthropic: sk-ant-..."`. Phase Router
  then passes the request to Anthropic unchanged (prompt caching, thinking and server tools work as on a direct call)
  and still writes a signed receipt.
- Other models (`qwen3-coder-480b`, `kimi-k2.6`, `glm-5.3`, ...) also work: Phase Router translates the Messages API
  to the model's chat API (text, images, tools; no thinking blocks, no server tools, `cache_control` ignored). Note that
  Anthropic does not support running Claude Code on non-Claude models, so treat this as experimental.

```bash
export ANTHROPIC_MODEL=qwen3-coder-480b
export ANTHROPIC_DEFAULT_HAIKU_MODEL=gpt-oss-120b
```

### Cost and limits

Every call is billed from the key's balance at the model's price (https://router.phase.xyz/models) and has a receipt
(`X-Phase-Task-Id` header; https://router.phase.xyz/receipts/<task_id>). The key's balance and daily cap bound
the spending (`GET https://router.phase.xyz/v1/key` shows both).
