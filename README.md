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
  timestamp: 2018-02-27T03:34:39.858Z,
  open: 868,
  price: 867.81,
  close: 867.81,
  high: 868,
  low: 867.79,
  closed: true,
  height: 0.0002189419342944361,
  spread: 0.00024198845369382283,
  volume: 0.9131210700000001,
  sma: 
   { '10': 867.8489999999999,
     '20': 867.7975,
     '50': 867.1592000000003,
     '100': 866.3179000000001 },
  ema: 
   { '10': 867.841909090909,
     '20': 867.7986904761906,
     '50': 867.1847215686278,
     '100': 866.3474465346535 },
  color: 'red',
  regression: 
   { '10': 
      { slope: 0.01412121212117,
        intercept: 867.7854545454546,
        r2: 0.268415926271891 },
     '20': 
      { slope: 0.011902255639084,
        intercept: 867.6844285714287,
        r2: 0.483667582510232 },
     '50': 
      { slope: 0.043914525810324,
        intercept: 866.0832941176474,
        r2: 0.906694650525467 },
     '100': 
      { slope: 0.035564536453645,
        intercept: 864.5574554455447,
        r2: 0.883706506660936 } } }
*/

ethereumChart.on('change', candle => {
  console.log(candle);
});

/*
Candlestick {
  timestamp: 2018-02-27T03:35:58.491Z,
  open: 867.95,
  price: 867.9,
  close: 867.9,
  high: 867.95,
  low: 867.79,
  closed: false,
  height: 0.00005761032377009818,
  spread: 0.000184353036064157,
  volume: 0.260548,
  sma: {},
  ema: {},
  color: 'red',
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