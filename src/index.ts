import * as readline from 'readline';
import { Coincap } from './service/coincap';

export class TokenSale {
  private static async init() {
    await Coincap.init();
  }

  static async run() {
    await this.init();

    const rl = readline.createInterface({
      input: process.stdin,
    });

    rl.on('line', (line: string) => {
      console.log(line);
      const price = Coincap.getPriceInUsd('bitcoin');
      console.log(price);
    });
  }
}

TokenSale.run();
