import { Exchange } from './exchange';
import { Coincap } from './coincap';

describe('Exchange', () => {
  beforeAll(async () => {
    await Coincap.init();
  });

  afterAll(async () => {
    await Coincap.closeConnection();
  });

  test('Happy Path', async () => {
    const rate = await Exchange.getExchangeRate('1.5', '3', 'ETH', '3.5');

    expect(rate).toBeTruthy();
  });

  test('Precision Check', async () => {
    const rate = await Exchange.getExchangeRate('6540825.876543210987654325', '18', 'BTC', '992465.123456789012345678');

    const precision = rate.split('.')[1].length;
    expect(precision).toBe(18);
  });

  test('Invalid currency', async () => {
    expect.assertions(1);

    try {
      await Exchange.getExchangeRate('1.5', '3', 'testcoin', '3.5');
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});
