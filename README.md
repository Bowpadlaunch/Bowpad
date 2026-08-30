# Bowpad

Bowpad is an independent, wallet-first token launchpad MVP designed for Robinhood Chain. It gives creators a simple flow for launching a token and gives traders a focused interface for discovering and trading bonding-curve tokens.

## Current MVP

- Wallet-based access with no username or password account
- Token creation with image, name, ticker, description, and optional social links
- Trending, New, Graduating, and Top Market Cap discovery views
- Token detail pages with bonding-curve progress and buy/sell controls
- Configurable creation and platform-fee architecture
- Responsive desktop and mobile interface
- Dedicated documentation, privacy, terms, and trust pages
- Network configuration placeholders for testnet integration

## Development

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
```

## Status and safety

Bowpad is currently an MVP. The smart-contract and trading interactions are testnet-ready abstractions until verified Robinhood Chain configuration and deployed contract addresses are published.

Bowpad is independent and is not affiliated with or endorsed by Robinhood. Tokens created through Bowpad are not automatically listed on Robinhood. Crypto assets are high risk; always verify contract addresses and transaction details before signing.

## Transparency

The public Trust Center tracks repository, contract-verification, audit, and mainnet readiness. No audit or mainnet deployment is claimed until evidence is publicly available.

Current platform-fee defaults are 1% on buys and 1% on sells. The disclosed Bowfee recipient is `0xf3455c1173378819c627b7196fe3fc5d95495f03`. These settings do not move real funds until matching smart contracts are deployed and connected.

Website: https://bowpad-launchpad.vannse159.chatgpt.site

