import * as readline from 'readline';
import { Coincap } from './service/coincap';
import { Exchange } from './service/exchange';

export class TokenSale {
  private static async init() {
    console.log('Fetching Latest Asset Prices...');
    await Coincap.init();
    console.log('Asset Prices Fetched.');
  }

  private static validateInput(inputArray: string[]) {
    if (inputArray.length !== 4) throw new Error('Invalid Input');
  }

  static async run() {
    console.log('Initialising Service...');
    await this.init();
    console.log('Service Initialisation Done.');

    console.log('\n------------------------------------------------------------------------------------------');
    console.log('Please Provide Input In The Following Format:');
    console.log('<ETHSALE rate> <SALE decimal places> <Purchase currency> <BTC/ETH/DOGE purchase amount>');
    console.log('------------------------------------------------------------------------------------------\n');

    const rl = readline.createInterface({
      input: process.stdin,
    });

    rl.on('line', async (line: string) => {
      const inputArray = line.split(' ');
      this.validateInput(inputArray);

      const [
        ethSaleRate,
        outputDecimalRound,
        purchaseCurrency,
        purchaseAmount,
      ] = inputArray;

      const price = await Exchange.getExchangeRate(
        ethSaleRate,
        outputDecimalRound,
        purchaseCurrency,
        purchaseAmount,
      );

      console.log(JSON.stringify({
        input: line,
        ethSaleRate,
        outputDecimalRound,
        purchaseCurrency,
        purchaseAmount,
        outputPrice: price,
      }, null, '\t'));
    });
  }
}

TokenSale.run();
