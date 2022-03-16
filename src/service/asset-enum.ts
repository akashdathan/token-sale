export type AssetEnumTYpe = { [index: string]: { symbol: string } };

export const assetEnum: AssetEnumTYpe = {
  bitcoin: {
    symbol: 'BTC',
  },
  ethereum: {
    symbol: 'ETH',
  },
  dogecoin: {
    symbol: 'DOGE',
  },
};
