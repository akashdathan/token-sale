# Token Sale
Multi Currency Token Sale

### Test
``npm test``

### Build
``npm num build``

### Run
``npm start``

### Run In Developer Mode
``npm run start:dev``

### Bonus question
Q: Why do you think SALE amount is rounded down, instead of rounded off or rounded up?
<br>
A: Rounded down so that the platform don't incur any loss.
Round off or round up might result in a fractional loss per trade and this fraction
could accumulate over time. 

### Sample Output
```shell
~/Private/token-sale main* ❯ npm run build                                                                                           03:16:34 PM
> token-sale@1.0.0 build /Users/akashdathan/Private/token-sale
> tsc

~/Private/token-sale main* ❯ npm run start < input.txt                                                                               03:16:38 PM

> token-sale@1.0.0 start /Users/akashdathan/Private/token-sale
> node dist

Initialising Service...
Fetching Latest Asset Prices...
Market Price: Connection Established
Asset Prices Fetched.
Service Initialisation Done.

------------------------------------------------------------------------------------------
Please Provide Input In The Following Format:
<ETHSALE rate> <SALE decimal places> <Purchase currency> <BTC/ETH/DOGE purchase amount>
------------------------------------------------------------------------------------------

{
        "input": "1.5 3 ETH 3.5",
        "ethSaleRate": "1.5",
        "outputDecimalRound": "3",
        "purchaseCurrency": "ETH",
        "purchaseAmount": "3.5",
        "outputPrice": "5.250"
}
{
        "input": "1.5 3 BTC 3.5",
        "ethSaleRate": "1.5",
        "outputDecimalRound": "3",
        "purchaseCurrency": "BTC",
        "purchaseAmount": "3.5",
        "outputPrice": "79.262"
}
{
        "input": "1.5 3 DOGE 3.5",
        "ethSaleRate": "1.5",
        "outputDecimalRound": "3",
        "purchaseCurrency": "DOGE",
        "purchaseAmount": "3.5",
        "outputPrice": "0.000"
}
{
        "input": "1.5 3 DOGE 350000",
        "ethSaleRate": "1.5",
        "outputDecimalRound": "3",
        "purchaseCurrency": "DOGE",
        "purchaseAmount": "350000",
        "outputPrice": "22.396"
}
{
        "input": "1.5 1 ETH 3.5",
        "ethSaleRate": "1.5",
        "outputDecimalRound": "1",
        "purchaseCurrency": "ETH",
        "purchaseAmount": "3.5",
        "outputPrice": "5.2"
}
{
        "input": "6540825.876543210987654325 18 ETH 992465.123456789012345678",
        "ethSaleRate": "6540825.876543210987654325",
        "outputDecimalRound": "18",
        "purchaseCurrency": "ETH",
        "purchaseAmount": "992465.123456789012345678",
        "outputPrice": "6491541561072.818099748528072316"
}
{
        "input": "6540825.876543210987654325 18 DOGE 992465.123456789012345678",
        "ethSaleRate": "6540825.876543210987654325",
        "outputDecimalRound": "18",
        "purchaseCurrency": "DOGE",
        "purchaseAmount": "992465.123456789012345678",
        "outputPrice": "276933725.802180519800389300"
}
{
        "input": "6540825.876543210987654325 18 BTC 992465.123456789012345678",
        "ethSaleRate": "6540825.876543210987654325",
        "outputDecimalRound": "18",
        "purchaseCurrency": "BTC",
        "purchaseAmount": "992465.123456789012345678",
        "outputPrice": "98006259517257.169913665170984651"
}
```
