import BigNumber from 'bignumber.js';
import { Coincap } from './coincap';
import { assetEnum } from './asset-enum';

const baseCurrency = 'ethereum';

export class Exchange {
  private static validate(
    purchaseCurrency: string,
    outputDecimalRound: string,
    purchaseAmount: string,
  ) {
    if (!assetEnum[purchaseCurrency]) {
      throw new Error(`Invalid purchaseCurrency: ${purchaseCurrency}`);
    }

    if (Number(outputDecimalRound) < 0) {
      throw new Error(`outputDecimalRound should be a positive number. Provided: ${outputDecimalRound}`);
    }

    if (Number(purchaseAmount) < 0) {
      throw new Error(`purchaseAmount should be a positive number. Provided: ${purchaseAmount}`);
    }
  }

  static async getExchangeRate(
    ethSaleRate: string,
    outputDecimalRound: string,
    purchaseCurrency: string,
    purchaseAmount: string,
  ) {
    this.validate(purchaseCurrency, outputDecimalRound, purchaseAmount);

    const ethToUsd = Coincap.getPriceInUsd(baseCurrency);
    const purchaseCurrencyToUsd = Coincap.getPriceInUsd(purchaseCurrency);
    const purchaseCurrencyToEth = new BigNumber(purchaseCurrencyToUsd).dividedBy(ethToUsd);

    const saleValue = purchaseCurrencyToEth
      .multipliedBy(purchaseAmount)
      .multipliedBy(ethSaleRate);

    return saleValue.toFixed(Number(outputDecimalRound), BigNumber.ROUND_DOWN);
  }
}
