# Pay per request with x402 (USDT on Phase L1)

No account and no API key: the wallet pays each call. Phase Router speaks x402 v2 with the `upto` scheme.

1. Send the request as usual, without `Authorization`. The answer is `402 Payment Required`; the JSON body (and the
   base64 `PAYMENT-REQUIRED` header) lists `accepts`: `scheme` `upto`, `network` `eip155:1015` (Phase L1), `asset`
   (USDT), `payTo`, `amount` = the price ceiling in micro-USDT (input tokens + `max_tokens` at the model's price + a
   fixed per-call fee), `extra.taskId`, `extra.quote` (model, prices).
2. Sign an EIP-712 `ReceiveWithAuthorizationUpTo(from, to, maxValue, validAfter, validBefore, nonce)` on the USDT
   contract's domain (`extra.name`, `extra.version`, chain id, `asset`), with `maxValue = amount`,
   `nonce = extra.taskId`, `validAfter = 0` and `validBefore` at least `maxTimeoutSeconds` in the future.
3. Repeat the same request with the header `PAYMENT-SIGNATURE: base64(JSON payment payload)`. The gateway settles the
   actual cost of the answer (never more than `maxValue`); the answer has `usage.cost` and the receipt id.

```bash
npm i
PHASE_WALLET_KEY=0x... MAX_USD=0.01 node pay.mjs "Hello"
```

`pay.mjs` refuses quotes above `MAX_USD`. Keep the wallet key in an environment variable or a secret store, never in
code. Many calls in a row: open a payment batch (`POST /v1/batches`, one signature for many calls); see
https://router.phase.xyz/docs#x402. The list of paid endpoints is at https://router.phase.xyz/.well-known/x402.
