# Python (OpenAI SDK)

```bash
pip install openai
export PHASE_API_KEY=phk_...
python chat.py
```

LangChain: `ChatOpenAI(model="auto", base_url="https://router.phase.xyz/v1", api_key=os.environ["PHASE_API_KEY"])`.

LiteLLM (SDK): `litellm.completion(model="openai/deepseek-v3.2", api_base="https://router.phase.xyz/v1", api_key=os.environ["PHASE_API_KEY"], messages=[...])`.
