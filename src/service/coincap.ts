import { w3cwebsocket as Websocket } from 'websocket';
import { appConfig } from '../config';
import { assetEnum } from './asset-enum';

const { coincapHost } = appConfig;

export class Coincap {
  private static priceCache: { [index: string]: string } = {};

  private static connection: Websocket;

  private static getAssets() {
    return Object.keys(assetEnum);
  }

  static async init() {
    const assets = this.getAssets();
    const connection = new Websocket(`${coincapHost}/prices?assets=${assets.join(',')}`);

    this.connection = connection;

    return new Promise((resolve, reject) => {
      connection.onopen = () => {
        console.log('Market Price: Connection Established');
      };

      connection.onerror = (error) => {
        console.log(`WebSocket error: ${error}`);

        return reject(new Error('Market Price: Websocket Connection Failed'));
      };

      connection.onmessage = (msg: any) => {
        const marketData = JSON.parse(msg.data);

        Object.keys(marketData).forEach((asset: string) => {
          if (!assetEnum[asset]) return;

          if (!this.priceCache) this.priceCache = {};
          this.priceCache[asset] = marketData[asset];

          // Wait till all asset prices are available before resolving.
          if (Object.keys(assetEnum).length === Object.keys(this.priceCache).length) {
            resolve('All asset prices updated');
          }
        });
      };
    });
  }

  public static getPriceInUsd(symbol: string) {
    return this.priceCache[symbol];
  }

  public static async closeConnection() {
    await this.connection.close();

    return new Promise((resolve) => {
      this.connection.onclose = () => {
        console.log('Market Price: Connection Closed');

        return resolve('Market Price: Connection Closed');
      };
    });
  }
}
