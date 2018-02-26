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
  timestamp: 2018-01-29T04:56:58.798Z,
  open: 1176.6,
  price: 1177,
  close: 1177,
  high: 1177,
  low: 1176.6,
  closed: true,
  height: 0.0003398470688191087,
  spread: 0.0003398470688191087,
  volume: 2.02715,
  sma: { 
    '10': 1176.775, 
    '20': 1175.99112,
    '50': 1175.021282,
    '100': 1174.76111111111,
    '200': 1172.98989898989,
    '1000': 1170.5454545454 },
  ema: {
    '10': 1176.113333333333, 
    '20': 1176.81762,
    '50': 1175.04,
    '100': 1174.972367,
    '200': 1173.11111111112,
    '1000': 1171.0112238479 }
  color: 'green' }
*/

ethereumChart.on('change', candle => {
  console.log(candle);
});

/*
Candlestick {
  timestamp: 2018-01-29T04:59:01.112Z,
  open: 1176.6,
  price: 1177,
  close: 1177,
  high: 1177,
  low: 1176.6,
  closed: false,
  height: 0.0003398470688191087,
  spread: 0.0003398470688191087,
  volume: 2.02715,
  sma: { 
    '10': 1176.775, 
    '20': 1175.99112,
    '50': 1175.021282,
    '100': 1174.76111111111,
    '200': 1172.98989898989,
    '1000': 1170.5454545454 },
  ema: {
    '10': 1176.113333333333, 
    '20': 1176.81762,
    '50': 1175.04,
    '100': 1174.972367,
    '200': 1173.11111111112,
    '1000': 1171.0112238479 }
  color: 'green' }
*/

console.log(ethereumChart.candles); // ==> An array of closed candlesticks: [{Candlestick}, {Candlestick}, ...]
```

## Motivation

This module was created to help cryptocurrency traders to implement chart-based algorithmic trading strategies based on candlestick patterns.  With the numeric models of the candlesticks provided by this library, any quantitative trading strategy can be derived easily.  

## Installation

Installation into a Node project is as simple as:

```shell
npm i gdax-candles --save
```

## API Reference

See code example above.

## Tests

As of now, no tests are available and no plans are in the works to add a testing framework.

## Contributors

Contributors are welcome to send pull requests on the project.  Please write a short synopsis of any enhancements or defect fixing is being proposed in the PR.

## License

This software is made public by way of the GNU General Public Licence.  No warranties are given and software is made available "as-is."