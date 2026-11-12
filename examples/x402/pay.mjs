// Pay one Phase Router request in USDT on Phase L1 with x402, no account and no API key.
//   npm i viem
//   PHASE_WALLET_KEY=0x... MAX_USD=0.01 node pay.mjs "Hello"
// The wallet needs USDT on Phase L1 (network eip155:1015). Nothing moves on-chain until the gateway settles the
// actual price of the answer, which is never above the ceiling you sign.
import { privateKeyToAccount } from "viem/accounts";

const BASE = process.env.PHASE_BASE_URL ?? "https://router.phase.xyz";
const MAX_USD = Number(process.env.MAX_USD ?? "0.01"); // refuse quotes above this (USD; USDT has 6 decimals)
const account = privateKeyToAccount(process.env.PHASE_WALLET_KEY);

const url = `${BASE}/v1/chat/completions`;
const body = JSON.stringify({
  model: "gpt-oss-120b",
  max_tokens: 256, // bounds the price ceiling
  messages: [{ role: "user", content: process.argv[2] ?? "Hello" }],
});
const headers = { "content-type": "application/json" };

// 1. Ask without payment: the gateway answers 402 with the quote (x402 v2: PAYMENT-REQUIRED header, same JSON body).
const first = await fetch(url, { method: "POST", headers, body });
if (first.status !== 402) throw new Error(`expected 402, got ${first.status}: ${await first.text()}`);
const required = await first.json();
const req = required.accepts.find((a) => a.scheme === "upto" || a.scheme === "exact");
const ceiling = BigInt(req.amount); // micro-USDT
console.error(`quote: ${req.extra.quote?.model}, ceiling ${Number(ceiling) / 1e6} USDT on ${req.network}`);
if (Number(ceiling) / 1e6 > MAX_USD) throw new Error(`ceiling above MAX_USD=${MAX_USD}`);

// 2. Sign the EIP-712 authorization. The nonce is the gateway's task id; validBefore must cover maxTimeoutSeconds.
const chainId = Number(req.network.split(":")[1]);
const validBefore = BigInt(Math.floor(Date.now() / 1000) + (req.maxTimeoutSeconds ?? 600) + 30);
const nonce = req.extra.taskId;
const upto = req.scheme === "upto";
const fields = [
  { name: "from", type: "address" },
  { name: "to", type: "address" },
  { name: upto ? "maxValue" : "value", type: "uint256" },
  { name: "validAfter", type: "uint256" },
  { name: "validBefore", type: "uint256" },
  { name: "nonce", type: "bytes32" },
];
const primaryType = upto ? "ReceiveWithAuthorizationUpTo" : "ReceiveWithAuthorization";
const message = { from: account.address, to: req.payTo, [upto ? "maxValue" : "value"]: ceiling, validAfter: 0n, validBefore, nonce };
const signature = await account.signTypedData({
  domain: { name: req.extra.name, version: req.extra.version, chainId, verifyingContract: req.asset },
  types: { [primaryType]: fields },
  primaryType,
  message,
});

const payment = {
  x402Version: 2,
  resource: { url: required.resource?.url },
  accepted: req,
  payload: {
    signature,
    authorization: {
      from: account.address,
      to: req.payTo,
      [upto ? "maxValue" : "value"]: req.amount,
      validAfter: "0",
      validBefore: validBefore.toString(),
      nonce,
    },
  },
};

// 3. Repeat the same request with the signed payment. Do not follow redirects with a signed authorization.
const paid = await fetch(url, {
  method: "POST",
  redirect: "manual",
  headers: { ...headers, "PAYMENT-SIGNATURE": Buffer.from(JSON.stringify(payment)).toString("base64") },
  body,
});
const out = await paid.json();
if (!paid.ok) throw new Error(`${paid.status}: ${JSON.stringify(out)}`);
console.log(out.choices[0].message.content);
console.error(`charged ${out.usage?.cost} USD, receipt ${BASE}/receipts/${out.phase?.task_id}`);
