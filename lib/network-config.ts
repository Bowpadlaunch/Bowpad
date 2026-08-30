export type BowpadNetworkConfig = { chainId: number | null; chainName: string; rpcUrl: string | null; explorerUrl: string | null; factoryAddress: `0x${string}` | null; creationFeeBps: number; buyFeeBps: number; sellFeeBps: number };

// Verified Robinhood Chain values belong here when publicly available.
export const bowpadNetwork: BowpadNetworkConfig = {
  chainId: null, chainName: 'Robinhood Chain Testnet', rpcUrl: null,
  explorerUrl: null, factoryAddress: null,
  creationFeeBps: 0, buyFeeBps: 100, sellFeeBps: 100,
};
export const formatFee = (bps: number) => `${bps / 100}%`;
