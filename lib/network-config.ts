export type BowpadNetworkConfig = {
  chainId: number | null;
  chainName: string;
  rpcUrl: string | null;
  explorerUrl: string | null;
  factoryAddress: `0x${string}` | null;
  feeRecipient: `0x${string}`;
  creationFeeBps: number;
  buyFeeBps: number;
  sellFeeBps: number;
};

// Verified Robinhood Chain values belong here when publicly available.
export const bowpadNetwork: BowpadNetworkConfig = {
  chainId: null,
  chainName: 'Robinhood Chain Testnet',
  rpcUrl: null,
  explorerUrl: null,
  factoryAddress: null,
  feeRecipient: '0xf3455c1173378819c627b7196fe3fc5d95495f03',
  creationFeeBps: 0,
  buyFeeBps: 100,
  sellFeeBps: 100,
};
export const formatFee = (bps: number) => `${bps / 100}%`;

