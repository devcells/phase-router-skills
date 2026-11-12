#!/bin/sh
# Adds the Phase Router MCP server to Claude Code (user scope). Needs PHASE_API_KEY in the environment.
claude mcp add --scope user --transport http phase-router https://mcp.ai.phase.xyz/mcp \
  --header "Authorization: Bearer ${PHASE_API_KEY:?set PHASE_API_KEY=phk_...}"
