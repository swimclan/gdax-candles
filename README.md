# GDAX Candles

## Synopsis

GDAX Candles is a simple module used to stream numeric models of the GDAX cryptocurrency charts in candlestick form.  Users of this module can use this tool to get event-driven data models of price charts on the GDAX exchange.  

## Code Example

Installation and instantiation is very easy to get started.  Here is a basic usage example:

```js
const Chart = require('gdax-candles');

const product = 'ETH-USD';
const timeframe = '1m'; // supports second, minute and hour intervals (i.e. 1h, 30s, 10m, etc)
const ethereumChart = new Chart({ product, timeframe }).start();

ethereumChart.on('close', candle => {
  console.log(candle);
});

/*
Candlestick {
  timestamp: 2018-07-04T16:38:31.004Z,
  product: 'ETH-USD',
  open: 472.13,
  price: 472.13,
  close: 472.13,
  high: 472.13,
  low: 472.13,
  closed: true,
  height: 0,
  spread: 0,
  volume: 0,
  sma: 
   { '10': 472.13599999999997,
     '20': 472.134,
     '50': 472.13579999999985 },
  ema: 
   { '10': 472.134909090909,
     '20': 472.13361904761905,
     '50': 472.13557254901946 },
  color: 'green',
  regression: 
   { '10': 
      { slope: -0.001454545454524,
        intercept: 472.14254545454537,
        r2: 0.727272727272211 },
     '20': 
      { slope: 0.000240601503756,
        intercept: 472.1317142857144,
        r2: 0.080200501253026 },
     '50': 
      { slope: -0.000161824729885,
        intercept: 472.13976470588204,
        r2: 0.223870829119643 } } }
*/

ethereumChart.on('change', candle => {
  console.log(candle);
});

/*
Candlestick {
  timestamp: 2018-07-04T16:41:25.577Z,
  product: 'ETH-USD',
  open: 472.14,
  price: 472.14,
  close: 472.14,
  high: 472.14,
  low: 472.14,
  closed: false,
  height: 0,
  spread: 0,
  volume: 0.2122,
  sma: {},
  ema: {},
  color: 'green',
  regression: {} }
*/

console.log(ethereumChart.candles); // ==> An array of closed candlesticks: [{Candlestick}, {Candlestick}, ...]
```

## Motivation

This module was created to help cryptocurrency traders to implement chart-based algorithmic trading strategies based on candlestick patterns.  With the numeric models of the candlesticks provided by this library, many quantitative trading strategies can be derived easily.  

## Installation

Installation into a Node project is as simple as:

```shell
npm i gdax-candles --save
```

## API Reference

See code example above.

## Tests

Will be implementing a testing framework when the module reaches a high level of popularity on npm

## Contributors

Contributors are welcome to send pull requests on the project.  Please write a short synopsis of any enhancements or defect fixing is being proposed in the PR.

## License

This software is made public by way of the GNU General Public Licence.  No warranties are given and software is made available "as-is."