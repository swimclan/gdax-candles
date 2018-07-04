const _ = require('lodash');
const {average} = require('./utils');
const regression = require('regression');
const PriceVectors = require('./PriceVectors');

class Candlestick {
  constructor(open, product) {
    this.timestamp = new Date();
    this.product = product;
    this.open = open;
    this.price = this.open;
    this.close = this.open;
    this.high = this.open;
    this.low = this.open;
    this.closed = false;
    this.height = Math.abs(this.open - this.close) / this.close;
    this.spread = Math.abs(this.high - this.low) / this.close;
    this.volume = 0;
    this.sma = {};
    this.ema = {};
    this.setColor();
    this.regression = {};
  }

  setColor() {
    let colors = {
      true: 'green',
      false: 'red'
    }
    this.color = colors[this.price >= this.open];
  }

  setClose() {
    this.closed = true;
    const priceVectors = PriceVectors.getInstance(this.product);
    // Calculate all the moving averages and linear regressions
    this.processSimpleMovingAverages(priceVectors, this.price);
    this.processExponentialMovingAverages(this.price);
    this.processLeastSqaresRegressions(priceVectors);
  }

  processSimpleMovingAverages(vectors, price) {
    Object.keys(vectors).forEach(period => {
      vectors[period].push(price);
      if (vectors[period].length > period) {
        vectors[period].shift();
        this.sma[period] = average(vectors[period]);
      }
    });
  }
  
  processExponentialMovingAverages(price) {
    Object.keys(this.sma).forEach(period => {
      const prevEMA = this.ema[period] || this.sma[period];
      const k = 2 / (parseInt(period, 10) + 1);
      this.ema[period] = (price * k) + (prevEMA * (1 - k));
    });
  }

  processLeastSqaresRegressions(vectors) {
    Object.keys(this.sma).forEach(period => {
      if (!this.regression[period]) { this.regression[period] = {} };
      let data = vectors[period].map((price, i) => [i, price]);
      let model = regression.linear(data, {order: 2, precision: 15});
      this.regression[period].slope = model.equation[0];
      this.regression[period].intercept = model.equation[1];
      this.regression[period].r2 = model.r2;
    });
  }

  updatePrice(price, size, time) {
    this.timestamp = new Date(time);
    this.price = !this.closed ? price : this.price;
    this.high = this.price > this.high ? this.price : this.high;
    this.low = this.price < this.low ? this.price : this.low;
    this.close = this.price;
    this.height = Math.abs(this.open - this.close) / this.close;
    this.spread = Math.abs(this.high - this.low) / this.close;
    this.volume += size;
    this.setColor();
  }
}

module.exports = Candlestick;
