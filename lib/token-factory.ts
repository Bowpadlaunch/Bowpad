export type CreateTokenInput = { name: string; ticker: string; description: string; imageUri: string; twitter?: string; telegram?: string; website?: string };
export type TokenFactoryAdapter = {
  createToken(input: CreateTokenInput): Promise<{ tokenAddress: `0x${string}`; transactionHash: `0x${string}` }>;
  quoteBuy(tokenAddress: `0x${string}`, amountEth: bigint): Promise<bigint>;
  quoteSell(tokenAddress: `0x${string}`, tokenAmount: bigint): Promise<bigint>;
};
// Production implementation waits for a verified factory ABI and address.
export const tokenFactoryAdapter: TokenFactoryAdapter | null = null;
