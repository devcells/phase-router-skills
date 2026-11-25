# Pay for Phase Router from your own wallet

How a team moves its Phase Router usage onto its own balance: sign in, top up with USDT from your wallet, use a key of your account. No subscription; you pay per call from the balance you put in.

## English

1. Open https://router.phase.xyz/dashboard and sign in with your work email (we email you a one-time code).
2. Make sure your wallet (MetaMask or any WalletConnect wallet) holds USDT on Phase L1. If your USDT is on Ethereum, BNB Chain, Arbitrum, Base or Polygon, bridge it first: https://phase.xyz/docs/md/bridge.md (send from a personal wallet, not from an exchange; it arrives at the same address in 1–15 minutes, minimum 1 USDT).
3. In the dashboard, click **Top up with USDT** and pick $5, $20, $50 or $100.
4. Connect the wallet and approve the network switch to Phase if asked.
5. Sign the USDT authorization. No gas is needed; the balance appears once the payment settles.
6. Create an API key in the dashboard (skip this if your current key already belongs to this account).
7. Replace the old key in your integration: `Authorization: Bearer <new key>`, base URL `https://router.phase.xyz/v1`.
8. Send one test request and check that the answer comes back and the balance goes down.
9. Top up again before the balance runs out; the dashboard shows balance and spend per day.

For a monitoring bot or health pings: put the new key in the bot's config, keep pings on a cheap model, and check the balance in the dashboard once a week (a $5 top-up covers months of pings).

## Русский

1. Откройте https://router.phase.xyz/dashboard и войдите рабочей почтой (придёт одноразовый код).
2. Нужен USDT в сети Phase L1 на вашем кошельке (MetaMask или любой WalletConnect). Если USDT в Ethereum, BNB Chain, Arbitrum, Base или Polygon — сначала переведите через мост: https://phase.xyz/docs/md/bridge.md (с личного кошелька, не с биржи; приходит на тот же адрес за 1–15 минут, минимум 1 USDT).
3. В кабинете нажмите **Top up with USDT** и выберите $5, $20, $50 или $100.
4. Подключите кошелёк и разрешите переключение на сеть Phase, если спросит.
5. Подпишите разрешение USDT. Газ не нужен; баланс появится после расчёта.
6. Создайте API-ключ в кабинете (не нужно, если ваш текущий ключ уже принадлежит этому аккаунту).
7. Замените старый ключ в интеграции: `Authorization: Bearer <новый ключ>`, адрес `https://router.phase.xyz/v1`.
8. Отправьте один тестовый запрос: ответ пришёл, баланс уменьшился.
9. Пополняйте заранее; в кабинете видны баланс и расход по дням.

Для бота мониторинга (пинги): новый ключ — в конфиг бота, пинги на дешёвой модели, баланс проверять раз в неделю ($5 хватает на месяцы пингов).

## Notes

- Bridge details and limits: https://phase.xyz/docs/md/bridge.md (one-way for now; the USDT arrives at the address you sent from).
- Pay per request without an account (x402): https://router.phase.xyz/docs
- Questions: ai@phase.xyz
