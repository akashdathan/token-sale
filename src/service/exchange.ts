import BigNumber from 'bignumber.js';
import { Coincap } from './coincap';

const baseCurrency = 'ethereum';

export class Exchange {
  static async getExchangeRate(
    ethSaleRate: string,
    outputDecimalRound: string,
    purchaseCurrency: string,
    purchaseAmount: string,
  ) {
    const ethToUsd = Coincap.getPriceInUsd(baseCurrency);
    const purchaseCurrencyToUsd = Coincap.getPriceInUsd(purchaseCurrency);
    const purchaseCurrencyToEth = new BigNumber(purchaseCurrencyToUsd).dividedBy(ethToUsd);

    const saleValue = purchaseCurrencyToEth
      .multipliedBy(purchaseAmount)
      .multipliedBy(ethSaleRate);

    return saleValue.toFixed(Number(outputDecimalRound), BigNumber.ROUND_DOWN);
  }
}
