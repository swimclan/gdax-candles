const _ = require('lodash');
const {average} = require('./utils');

let priceVectors = {
  10: [],
  20: [],
  50: [],
  100: [],
  200: [],
  500: [],
  1000: []
};

class Candlestick {
  constructor(open) {
    this.timestamp = new Date();
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
    // Calculate all the sma averages
    this.processSimpleMovingAverages(priceVectors, this.price);
    this.processExponentialMovingAverages(this.price);
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
