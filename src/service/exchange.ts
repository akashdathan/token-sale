import BigNumber from 'bignumber.js';
import { Coincap } from './coincap';
import { assetEnum } from './asset-enum';

const baseCurrency = 'ethereum';

export class Exchange {
  private static validate(
    outputDecimalRound: string,
    purchaseAmount: string,
  ) {
    if (Number(outputDecimalRound) < 0) {
      throw new Error(`outputDecimalRound should be a positive number. Provided: ${outputDecimalRound}`);
    }

    if (Number(purchaseAmount) < 0) {
      throw new Error(`purchaseAmount should be a positive number. Provided: ${purchaseAmount}`);
    }
  }

  private static getCurrencyMapping(purchaseCurrencySymbol: string): string {
    // @ts-ignore
    // eslint-disable-next-line consistent-return
    const filteredAsset = Object.keys(assetEnum)
      .find((asset) => assetEnum[asset].symbol === purchaseCurrencySymbol);

    if (filteredAsset) return filteredAsset;

    throw new Error(`Invalid Input Symbol ${purchaseCurrencySymbol}`);
  }

  static async getExchangeRate(
    ethSaleRate: string,
    outputDecimalRound: string,
    purchaseCurrencyCode: string,
    purchaseAmount: string,
  ) {
    this.validate(outputDecimalRound, purchaseAmount);

    const ethToUsd = Coincap.getPriceInUsd(baseCurrency);
    const mappedCurrency = this.getCurrencyMapping(purchaseCurrencyCode);
    const purchaseCurrencyToUsd = Coincap.getPriceInUsd(mappedCurrency);
    const purchaseCurrencyToEth = new BigNumber(purchaseCurrencyToUsd).dividedBy(ethToUsd);

    const saleValue = purchaseCurrencyToEth
      .multipliedBy(purchaseAmount)
      .multipliedBy(ethSaleRate);

    return saleValue.toFixed(Number(outputDecimalRound), BigNumber.ROUND_DOWN);
  }
}
