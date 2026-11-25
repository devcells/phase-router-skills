# Client configs

| Client | File | How |
|---|---|---|
| Claude Code | [`claude-code/`](claude-code) | `mcp-add.sh` (MCP server), `mcp.json` (project `.mcp.json`), `settings.json` (`env` block to run Claude Code on Phase Router). Guide: [`../guides/claude-code.md`](../guides/claude-code.md) |
| Cursor | [`cursor/mcp.json`](cursor/mcp.json) | Copy to `~/.cursor/mcp.json` (or `.cursor/mcp.json` in a project); `${env:PHASE_API_KEY}` is read from the environment. Models: Cursor Settings → Models → OpenAI API key = your `phk_...` key, "Override OpenAI Base URL" = `https://router.phase.xyz/v1`, then add model ids such as `qwen3-coder-480b` |
| Cline, Kilo Code, Roo Code | [`cline-kilo-roo/`](cline-kilo-roo) | OpenAI Compatible provider |
| LiteLLM Proxy | [`litellm/config.yaml`](litellm/config.yaml) | `litellm --config config.yaml` |
| Hermes Agent | [`hermes-agent/config.yaml`](hermes-agent/config.yaml) | `~/.hermes/config.yaml`. Guide: [`../guides/hermes-agent.md`](../guides/hermes-agent.md) |
| Goose | [`goose/phase_router.json`](goose/phase_router.json) | Custom provider: copy to `~/.config/goose/custom_providers/` (Windows: `%APPDATA%\Block\goose\config\custom_providers\`), set `PHASE_API_KEY`, then `goose session --provider phase_router` or pick **Phase Router** in goose Desktop. `auto` and five models are listed; the rest of the catalog loads from `/v1/models` |
| Gemini CLI | [`../gemini-extension.json`](../gemini-extension.json) | `gemini extensions install https://github.com/devcells/phase-router-skills` |

Keys never go into these files: they are read from `PHASE_API_KEY` in the environment (or the client's secret store),
except `claude-code/settings.json`, which belongs in your personal `~/.claude/settings.json` only.
