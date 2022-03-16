import { Coincap } from './coincap';
import { assetEnum } from './asset-enum';

describe('Coincap', () => {
  test('Init Populates All Prices', async () => {
    await Coincap.init();

    Object.keys(assetEnum).forEach((asset) => {
      const value = Coincap.getPriceInUsd(asset);

      expect(value).toBeTruthy();
    });

    await Coincap.closeConnection();
  });
});
