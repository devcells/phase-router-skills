# Cline, Kilo Code, Roo Code

All three have an **OpenAI Compatible** API provider. In the extension's settings (API Provider / Providers):

| Field | Value |
|---|---|
| API Provider | `OpenAI Compatible` |
| Base URL | `https://router.phase.xyz/v1` |
| API Key | your Phase key `phk_...` (https://router.phase.xyz/dashboard) |
| Model ID | `auto`, or an id from https://router.phase.xyz/models, for example `qwen3-coder-480b`, `kimi-k2.6`, `glm-5.3`, `deepseek-v3.2` |

Model info (optional, so the extension shows cost and plans the context): take `context_window`, `max_output`,
`input_per_m` and `output_per_m` of the model from `GET https://router.phase.xyz/v1/models` (prices there are
micro-USD per 1M tokens; the extensions want USD per 1M, so divide by 1,000,000: `312000` -> `0.312`). Turn on
"Supports images" only for models whose `capabilities` list `vision`.

The MCP server works in all three as a remote (Streamable HTTP) server: URL `https://mcp.ai.phase.xyz/mcp`, header
`Authorization: Bearer phk_...` (see `../cursor/mcp.json` for the JSON shape; Cline and Roo keep it in their MCP
settings file, Kilo Code in its MCP settings).
