# curl

```bash
export PHASE_API_KEY=phk_...   # https://router.phase.xyz/dashboard
```

Models and prices (public, no key). Prices are micro-USD per 1M tokens: `38500` = $0.0385 per 1M.

```bash
curl -s https://router.phase.xyz/v1/models | jq -r '.data[] | select(.phase.kind=="chat") | [.id, .phase.input_per_m, .phase.output_per_m, .phase.context_window] | @tsv'
```

Chat, the router picks the model:

```bash
curl -s https://router.phase.xyz/v1/chat/completions \
  -H "Authorization: Bearer $PHASE_API_KEY" -H "content-type: application/json" \
  -d '{"model": "auto", "messages": [{"role": "user", "content": "Write a haiku about routers"}]}' \
  | jq '{answer: .choices[0].message.content, cost_usd: .usage.cost, model: .phase.routed_model, receipt: .phase.task_id}'
```

Streaming (the last chunk carries `usage.cost` and the `phase` object):

```bash
curl -N https://router.phase.xyz/v1/chat/completions \
  -H "Authorization: Bearer $PHASE_API_KEY" -H "content-type: application/json" \
  -d '{"model": "gpt-oss-120b", "stream": true, "messages": [{"role": "user", "content": "Count to five"}]}'
```

Embeddings:

```bash
curl -s https://router.phase.xyz/v1/embeddings \
  -H "Authorization: Bearer $PHASE_API_KEY" -H "content-type: application/json" \
  -d '{"model": "bge-m3", "input": ["first text", "second text"]}' | jq '.data[0].embedding | length'
```

Anthropic Messages format (same key):

```bash
curl -s https://router.phase.xyz/v1/messages \
  -H "x-api-key: $PHASE_API_KEY" -H "anthropic-version: 2023-06-01" -H "content-type: application/json" \
  -d '{"model": "qwen3-coder-480b", "max_tokens": 256, "messages": [{"role": "user", "content": "Hello"}]}'
```

Key balance and daily cap:

```bash
curl -s https://router.phase.xyz/v1/key -H "Authorization: Bearer $PHASE_API_KEY"
```

Receipt of a call: `https://router.phase.xyz/receipts/<task_id>` (page) or `GET /v1/receipts/<task_id>` (JSON).
