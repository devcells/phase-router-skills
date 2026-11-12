"""Phase Router with the OpenAI Python SDK: pip install openai; export PHASE_API_KEY=phk_..."""
import os

from openai import OpenAI

client = OpenAI(base_url="https://router.phase.xyz/v1", api_key=os.environ["PHASE_API_KEY"])

# The router picks the cheapest model that can do the task well; any id from GET /v1/models works too.
r = client.chat.completions.create(
    model="auto",
    messages=[{"role": "user", "content": "Explain x402 in one sentence."}],
)
print(r.choices[0].message.content)

extra = r.model_extra or {}
phase = extra.get("phase") or {}
usage = r.usage.model_extra if r.usage else {}
print("model:", phase.get("routed_model") or phase.get("model"), "| cost USD:", (usage or {}).get("cost"),
      "| receipt: https://router.phase.xyz/receipts/" + str(phase.get("task_id")))

# Streaming: the last chunk carries usage.cost and the phase object.
stream = client.chat.completions.create(
    model="gpt-oss-120b",
    messages=[{"role": "user", "content": "Count to five."}],
    stream=True,
    stream_options={"include_usage": True},
)
for chunk in stream:
    if chunk.choices and chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="", flush=True)
print()
