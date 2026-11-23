# Installing the Phase Router MCP server (for AI agents)

This file tells an AI coding agent (Cline and similar) how to set up the Phase Router MCP server for its user.

Phase Router MCP is a **remote** server over Streamable HTTP. There is nothing to clone, build or run locally.

## What you need

- A Phase Router API key (`phk_...`). The user creates it at https://router.phase.xyz/dashboard. Ask the user for the key; never invent one.

## Steps

1. Ask the user for their Phase Router API key.
2. Add this entry to the MCP settings file (in Cline: `cline_mcp_settings.json`), keeping the entries already there:

```json
{
  "mcpServers": {
    "phase-router": {
      "type": "streamableHttp",
      "url": "https://mcp.ai.phase.xyz/mcp",
      "headers": { "Authorization": "Bearer phk_..." }
    }
  }
}
```

3. Replace `phk_...` with the user's key.
4. Check the connection: the server should list the tools `list_models`, `quote`, `chat`, `embed`, `receipt`, `key` and `session`. `initialize` and `tools/list` answer even without a key; the paid tools need the key.

With the Cline CLI the same server installs in one command:

```bash
cline mcp install phase-router --transport http https://mcp.ai.phase.xyz/mcp --header "Authorization: Bearer $PHASE_API_KEY"
```

## Troubleshooting

- `401` on a tool call: the key is missing or wrong. Check the `Authorization` header.
- `402` on a tool call: the key has no balance. The user tops it up in the dashboard.
- The client only supports stdio servers: use any stdio-to-HTTP MCP bridge and point it at `https://mcp.ai.phase.xyz/mcp` with the same header.

More: [configs for other clients](configs/) · docs https://router.phase.xyz/docs
